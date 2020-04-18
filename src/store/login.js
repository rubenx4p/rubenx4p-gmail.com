import api from '@/api'
import to from '@/utils/to'
const getDefaultState = () => {
  return {
    email: '',
    password: '',
    showPassword: false,
    fetching: false,
    msg: '',
    snackbar: false
  }
}

export default {
  state: getDefaultState(),
  actions: {
    async tryLogin({ dispatch, commit }, credentials) {
      commit('fetching')
      const [res, err] = await to(api.post('auth', credentials))
      commit('stopFetching')

      if (err) {
        return dispatch('snackbar/snackbar', { msg: err.msg }, { root: true })
      }

      const { token } = res
      dispatch('auth/authSucceeded', token, { root: true })
    }
  },
  mutations: {
    setEmail(state, email) {
      state.email = email
    },
    setPassword(state, password) {
      state.password = password
    },
    setShowPassword(state, showPassword) {
      state.showPassword = showPassword
    },
    resetState(state) {
      Object.assign(state, getDefaultState())
    },
    fetching(state) {
      state.fetching = true
    },
    stopFetching(state) {
      state.fetching = false
    },
    snackbar(state, value) {
      state.snackbar = value
      state.msg = 'Not recognized'
    }
  },
  getters: {}
}
