import router from '@/router/index'
import api from '@/api'
import to from '@/utils/to'

const getDefaultState = () => {
  return {
    name: '',
    username: '',
    password: '',
    showPassword: false,
    key: '',
    showKey: false,
    fetching: false
  }
}

export default {
  state: getDefaultState(),
  actions: {
    async tryAddAccount({ dispatch, commit, state }) {
      const { name, username, password, key } = state
      commit('fetching')

      const [data, err] = await to(api.post('accounts', { name, username, password, key }))
      commit('stopFetching')
      if (err) {
        return dispatch('snackbar/snackbar', { msg: err.msg }, { root: true })
      }
      dispatch('snackbar/snackbar', { msg: data.msg }, { root: true })
      router.push('home')
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
