import api from '@/api'
import to from '../utils/to'
const getDefaultState = () => {
  return {
    accounts: {},
    nextExpirationDate: null,
    search: '',
    accountId: null
  }
}
export default {
  state: getDefaultState(),
  actions: {
    async getAccounts({ commit, dispatch }) {
      const [{ accounts }, err] = await to(api.get('accounts'))
      if (err) {
        dispatch('snackbar/snackbar', { msg: err.msg }, { root: true })
      }

      const accountsObject = accounts.reduce((acc, curr) => {
        const account = {
          id: curr._id,
          accountName: curr.name,
          username: curr.username
        }
        acc[account.id] = account
        return acc
      }, {})

      commit('receiveAccounts', accountsObject)
    },
    async deleteAccount({ dispatch, commit, state }, { account, key }) {
      const { id } = account

      const [data, err] = await to(api.delete(`accounts/${id}`, { data: { key } }))

      if (err) {
        return dispatch('snackbar/snackbar', { msg: err.msg }, { root: true })
      }

      const accounts = { ...state.accounts }
      delete accounts[id]

      commit('deleteAccount', accounts)
      dispatch('snackbar/snackbar', { msg: data.msg }, { root: true })
    },
    async syncLocalStorage({ dispatch }) {
      console.log('!!!!!!!!!!')
      const data = window.localStorage.getItem('accounts-data')
    },
    async setAccounts({ commit }) {
      // commit()
    }
  },
  mutations: {
    receiveAccounts(state, accounts) {
      state.accounts = accounts
    },
    setSearch(state, search) {
      console.log('search = ', search)
      state.search = search
    },
    resetState(state) {
      Object.assign(state, getDefaultState())
    },
    selectAccount(state, account) {
      state.accountId = state.accountId === account.id ? '' : account.id
      console.log('account.id = ', account.id)
    },
    deleteAccount(state, accounts) {
      state.accounts = accounts
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
    account: state => state.accounts[state.accountId]
  }
}
