import router from '@/router/index'
import api from '@/api'
import to from '../utils/to'
import { storePassword, removePassword, accountsStorageJob } from './utils/home'
import { exportCSV } from '../utils/csv'
const getDefaultState = () => {
  return {
    accounts: {},
    search: '',
    intervalId: null
  }
}
export default {
  state: getDefaultState(),
  actions: {
    async getAccounts({ commit, dispatch }) {
      const [data, err] = await to(api.get('accounts'))

      if (err) {
        dispatch('snackbar/snackbar', { msg: err.msg }, { root: true })
      }

      const { accounts } = data

      const intervalId = accountsStorageJob(accounts, commit)

      commit('receiveIntervalId', intervalId)
    },
    deleteAccount({ commit, state }, { id }) {
      const accounts = { ...state.accounts }
      delete accounts[id]

      commit('updateAccounts', accounts)
    },
    receiveAccountPassword({ commit, state }, { id, password }) {
      const account = state.accounts[id]
      const accountWithPassword = { ...account, password }

      storePassword(accountWithPassword)

      const accounts = { ...state.accounts }
      accounts[accountWithPassword.id] = accountWithPassword

      commit('updateAccounts', accounts)
    },
    copy({ dispatch }, password) {
      window.navigator.clipboard.writeText(password)
      return dispatch('snackbar/snackbar', { msg: `${password} copied to the clipboard` }, { root: true })
    },
    exportCSV({ state }) {
      const arrList = [['Account', 'Username', 'Password']]

      const data = Object.values(state.accounts).reduce((acc, curr) => {
        if (curr.password) {
          acc.push([curr.accountName, curr.username, curr.password])
        }

        return acc
      }, arrList)

      exportCSV(data, 'accounts')
    },
    lock({ state, commit }, account) {
      removePassword(account)

      const accountWithoutPassword = { ...account, password: undefined }

      const accounts = { ...state.accounts, [account.id]: accountWithoutPassword }

      commit('updateAccounts', accounts)
    },
    edit(_, account) {
      router.push(`../add-account/${account.id}`)
    }
  },
  mutations: {
    receiveAccounts(state, accounts) {
      state.accounts = accounts
    },
    receiveIntervalId(state, intervalId) {
      state.intervalId = intervalId
    },
    setSearch(state, search) {
      state.search = search
    },
    resetState(state) {
      const { intervalId } = state

      if (intervalId) {
        clearInterval(intervalId)
      }

      Object.assign(state, getDefaultState())
    },

    updateAccounts(state, accounts) {
      state.accounts = { ...accounts }
    }
  },
  getters: {
    accounts: state => {
      const accounts = Object.values(state.accounts)
      if (!state.search) {
        return accounts
      }
      return accounts.filter(
        account =>
          account.accountName.toLowerCase().includes(state.search.toLowerCase()) ||
          account.username.toLowerCase().includes(state.search.toLowerCase())
      )
    },
    search: state => state.search,
    deleting: state => state.deleting,
    getingPassword: state => state.getingPassword
  }
}
