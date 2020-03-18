import api from '@/api'
import to from '../utils/to'
import { fetchStoredPassword, storePassword } from './utils/home'
import { exportCSV } from '../utils/csv'
const getDefaultState = () => {
  return {
    accounts: {},
    nextExpirationDate: null,
    search: '',
    accountId: null,
    deleting: false,
    getingPassword: false
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

      const accountsObject = accounts.reduce((acc, curr) => {
        const account = {
          id: curr._id,
          accountName: curr.name,
          username: curr.username
        }

        account.password = fetchStoredPassword(account)

        acc[account.id] = account
        return acc
      }, {})

      commit('receiveAccounts', accountsObject)
    },
    async deleteAccount({ dispatch, commit, state }, { account, key }) {
      const { id } = account
      commit('deleting', true)
      const [data, err] = await to(api.delete(`accounts/${id}`, { data: { key } }))
      commit('deleting', false)
      if (err) {
        return dispatch('snackbar/snackbar', { msg: err.msg }, { root: true })
      }

      const accounts = { ...state.accounts }
      delete accounts[id]

      commit('deleteAccount', accounts)
      dispatch('snackbar/snackbar', { msg: data.msg }, { root: true })
    },
    async getPassword({ commit, dispatch, state }, { account, key }) {
      const { id } = account

      commit('getingPassword', true)
      const [data, err] = await to(api.post(`accounts/${id}`, { key }))
      commit('getingPassword', false)

      if (err) {
        return dispatch('snackbar/snackbar', { msg: err.msg }, { root: true })
      }

      const accountWithPassword = { ...account, password: data.password }

      storePassword(accountWithPassword)

      const accounts = { ...state.accounts }
      accounts[accountWithPassword.id] = accountWithPassword

      commit('updatePassword', accounts)
      dispatch('snackbar/snackbar', { msg: data.msg }, { root: true })
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
    }
  },
  mutations: {
    receiveAccounts(state, accounts) {
      state.accounts = accounts
    },
    setSearch(state, search) {
      state.search = search
    },
    resetState(state) {
      Object.assign(state, getDefaultState())
    },
    selectAccount(state, account) {
      state.accountId = state.accountId === account.id ? '' : account.id
    },
    deleting(state, value) {
      state.deleting = value
    },
    getingPassword(state, value) {
      state.getingPassword = value
    },
    deleteAccount(state, accounts) {
      state.accounts = accounts
    },
    updatePassword(state, accounts) {
      state.accounts = { ...accounts }
    }
  },
  getters: {
    accounts: state => {
      const accounts = Object.values(state.accounts)
      if (!state.search) {
        return accounts
      }
      return accounts.filter(account => account.accountName.toLowerCase().includes(state.search.toLowerCase()))
    },
    search: state => state.search,
    account: state => state.accounts[state.accountId],
    deleting: state => state.deleting,
    getingPassword: state => state.getingPassword
  }
}
