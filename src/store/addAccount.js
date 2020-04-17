import router from '@/router/index'
import api from '@/api'
import to from '@/utils/to'
import { removePassword } from './utils/home'

const getDefaultState = () => {
  return {
    accountName: '',
    username: '',
    password: '',
    showPassword: false,
    key: '',
    id: undefined,
    showKey: false,
    loading: false
  }
}

export default {
  state: getDefaultState(),
  actions: {
    async tryAddAccount({ dispatch, commit, state }) {
      const { accountName, username, password, key } = state

      commit('loading', true)
      const [data, err] = await to(api.post('accounts', { name: accountName, username, password, key }))
      commit('loading', false)

      if (err) {
        return dispatch('snackbar/snackbar', { msg: err.msg }, { root: true })
      }

      dispatch('snackbar/snackbar', { msg: data.msg }, { root: true })
      router.push('../home')
    },
    async trySave({ commit, state, dispatch }) {
      const { accountName, username, password, key, id } = state

      commit('loading', true)
      const [data, err] = await to(api.patch(`accounts/${id}`, { name: accountName, username, password, key }))
      commit('loading', false)

      if (err) {
        return dispatch('snackbar/snackbar', { msg: err.msg }, { root: true })
      }

      const account = {
        name: accountName,
        username,
        password,
        key,
        id
      }

      removePassword(account)

      dispatch('snackbar/snackbar', { msg: data.msg }, { root: true })
      router.push('../home')
    },
    getAccountData({ commit, rootState }, id) {
      const account = rootState.home.accounts[id]

      if (!account) {
        return router.push(`../home`)
      }

      commit('updateAccount', account)
    }
  },
  mutations: {
    setName(state, accountName) {
      state.accountName = accountName
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
    loading(state, value) {
      state.loading = value
    },
    updateAccount(state, account) {
      Object.assign(state, { ...state, ...account })
    },
    resetState(state) {
      Object.assign(state, getDefaultState())
    }
  },
  getters: {}
}
