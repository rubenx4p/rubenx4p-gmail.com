import api from '@/api'
import to from 'await-to-js'
const getDefaultState = () => {
  return {
    accounts: {
      // id1: {
      //   id: 'id1',
      //   accountName: 'Brunch this weekend?',
      //   username: 'username1'
      // },
      // id2: {
      //   id: 'id2',
      //   accountName: 'Summer BBQ',
      //   username: 'username2'
      // },
      // id3: {
      //   id: 'id3',
      //   accountName: 'Oui oui',
      //   username: 'username3'
      // },
      // id4: {
      //   id: 'id4',
      //   accountName: 'Birthday gift',
      //   username: 'username4'
      // },
      // id5: {
      //   id: 'id5',
      //   accountName: 'Recipe to try',
      //   username: 'username5'
      // }
    },
    nextExpirationDate: null,
    search: '',
    accountId: null
  }
}
export default {
  state: getDefaultState(),
  actions: {
    async getAccounts({ dispatch, commit }) {
      const [err, { accounts }] = await to(api.get('accounts'))
      if (err) {
        console.error('err')
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
      console.log('accountsObject = ', accountsObject)
      commit('receiveAccounts', accountsObject)
      // dispatch('syncLocalStorage')
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
