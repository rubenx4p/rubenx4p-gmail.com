const getDefaultState = () => {
  return {
    drawer: false
  }
}
export default {
  state: getDefaultState(),
  actions: {},
  mutations: {
    setDrawer(state, value) {
      state.drawer = value
    }
  },
  getters: {}
}
