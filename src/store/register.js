const getDefaultState = () => {
  return {
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
    showPassword: false,
    showRepeatPassword: false
  }
}

export default {
  state: getDefaultState(),
  actions: {},
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
    }
  },
  getters: {}
}
