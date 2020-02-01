export default {
  state: {
    email: '',
    password: '',
    showPassword: false
  },
  actions: {},
  mutations: {
    setEmail(state, email) {
      state.email = email
    },
    setPassword(state, password) {
      state.password = password
    },
    setShowPassword(state, showPassword) {
      state.showPassword = showPassword
    }
  },
  getters: {}
}
