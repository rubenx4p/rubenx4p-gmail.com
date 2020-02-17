import api from '@/api'
const getDefaultState = () => {
  return {
    name: 'Angular',
    username: 'username 1',
    password: 'password1',
    showPassword: false,
    key: 'asdasdasd',
    showKey: false,
    fetching: false
  }
}

export default {
  state: getDefaultState(),
  actions: {
    async tryAddAccount({ dispatch, commit, state }) {
      console.log('state = ', state)
      const { name, username, password, key } = state
      commit('fetching')
      try {
        const res = await api.post('accounts', { name, username, password, key })
        // const { token } = res.data
        // dispatch('auth/authSucceeded', token, { root: true })
        console.log('res = ', res)
      } catch (err) {
        console.log('err = ', err)
        // commit('snackbar', true)
      } finally {
        commit('stopFetching')
      }
    }
  },
  mutations: {
    setName(state, name) {
      state.name = name
    },
    setUsername(state, username) {
      state.username = username
    },
    setPassword(state, password) {
      state.password = password
    },
    setShowPassword(state, showPassword) {
      state.showPassword = showPassword
    },
    setKey(state, key) {
      state.key = key
    },
    setShowKey(state, showKey) {
      state.showKey = showKey
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
