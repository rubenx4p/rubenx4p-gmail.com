const getDefaultState = () => {
  return {
    msg: '',
    snackbar: false
  }
}

export default {
  state: getDefaultState(),
  actions: {
    snackbar({ commit }, { msg }) {
      commit('snackbar', { msg })
    }
  },
  mutations: {
    snackbar(state, { msg }) {
      state.msg = msg
      state.snackbar = true
    },
    stop(state) {
      Object.assign(state, getDefaultState())
    }
  },
  getters: {}
}
