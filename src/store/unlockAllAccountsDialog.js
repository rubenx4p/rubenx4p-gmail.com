import api from '@/api'
import to from '../utils/to'

const getDefaultState = () => {
  return {
    key: undefined,
    showKey: false,
    show: false,
    loading: false
  }
}
export default {
  state: getDefaultState(),
  actions: {
    initState({ commit }) {
      commit('initState')
    },
    async madeAction({ commit, dispatch, state }) {
      const { key } = state

      let data, err

      commit('loading', true)
        ;[data, err] = await to(api.post(`accounts/unlockAll`, { key }))

      // dispatch('home/receiveAccountPassword', { id, password: data.password }, { root: true })
      // switch (mode) {
      //   case SingleAccountDialogModes.DELETE: {
      //     ;[data, err] = await to(api.delete(`accounts/${id}`, { data: { key } }))
      //     break
      //   }
      //   case SingleAccountDialogModes.UNLOCK: {
      //     ;[data, err] = await to(api.post(`accounts/${id}`, { key }))
      //     break
      //   }
      // }
      commit('loading', false)

      if (err) {
        return dispatch('snackbar/snackbar', { msg: err.msg }, { root: true })
      }

      // switch (mode) {
      //   case SingleAccountDialogModes.DELETE: {
      //     dispatch('home/deleteAccount', { id }, { root: true })
      //     break
      //   }
      //   case SingleAccountDialogModes.UNLOCK: {
      //     dispatch('home/receiveAccountPassword', { id, password: data.password }, { root: true })
      //     break
      //   }
      // }
      dispatch('snackbar/snackbar', { msg: data.msg }, { root: true })
      const accounts = data.accounts.reduce((acc, { id, password }) => {
        acc[id] = { id, password }
        return acc
      }, {})
      dispatch('home/receiveAllAccountPassword', accounts, { root: true })
      commit('resetState')
    }
  },
  mutations: {
    initState(state) {
      Object.assign(state, { show: true })
    },
    setKey(state, value) {
      state.key = value
    },
    setShow(state, value) {
      state.show = value
    },
    setShowKey(state, value) {
      state.showKey = value
    },
    loading(state, value) {
      state.loading = value
    },
    resetState(state) {
      Object.assign(state, getDefaultState())
    }
  },
  getters: {}
}
