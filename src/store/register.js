import router from '@/router/index'
import api from '@/api'
import to from '@/utils/to'

const getDefaultState = () => {
  return {
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
    showPassword: false,
    showRepeatPassword: false,
    fetching: false
  }
}

export default {
  state: getDefaultState(),
  actions: {
    async register({ commit, state, dispatch }) {
      const { name, email, password } = state

      commit('fetching')
      const [data, dataErr] = await to(api.post('users', { name, email, password }))
      commit('stopFetching')

      if (dataErr) {
        return dispatch('snackbar/snackbar', { msg: dataErr.msg }, { root: true })
      }

      dispatch('snackbar/snackbar', { msg: data.msg }, { root: true })
      router.push('login')
    }
  },
  mutations: {
    setName(state, name) {
      state.name = name
    },
    setEmail(state, email) {
      state.email = email
    },
    setPassword(state, password) {
      state.password = password
    },
    setShowPassword(state, showPassword) {
      state.showPassword = showPassword
    },
    setRepeatPassword(state, repeatPassword) {
      state.repeatPassword = repeatPassword
    },
    setShowRepeatPassword(state, showRepeatPassword) {
      state.showRepeatPassword = showRepeatPassword
    },
    resetState(state) {
      Object.assign(state, getDefaultState())
    },
    fetching(state) {
      state.fetching = true
    },
    stopFetching(state) {
      state.fetching = false
    }
  },
  getters: {}
}
