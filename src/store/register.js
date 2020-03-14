import router from '@/router/index'
import api from '@/api'

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
      commit('fetching')
      try {
        const { name, email, password } = state
        await api.post('users', { name, email, password })
        dispatch('snackbar/snackbar', { msg: 'You have successfully registered' }, { root: true })
        router.push('login')
      } catch (err) {
        dispatch('snackbar/snackbar', { msg: 'You failed to registerּ' }, { root: true })
      } finally {
        commit('stopFetching')
      }
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
