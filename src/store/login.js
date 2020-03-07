import api from '@/api'
const getDefaultState = () => {
  return {
    email: 'rubenx4p@gmail.com',
    password: 'asdasdasd',
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
      try {
        const res = await api.post('auth', credentials)
        const { token } = res
        dispatch('auth/authSucceeded', token, { root: true })
      } catch (err) {
        commit('snackbar', true)
      } finally {
        commit('stopFetching')
      }
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
