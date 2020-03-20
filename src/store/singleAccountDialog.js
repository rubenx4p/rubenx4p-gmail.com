import api from '@/api'
import to from '../utils/to'
import { titleSelection } from './utils/singleAccountDialog'
import { SingleAccountDialogModes } from '../constants'

const getDefaultState = () => {
  return {
    title: undefined,
    id: undefined,
    accountName: undefined,
    username: undefined,
    key: undefined,
    showKey: false,
    show: false,
    mode: undefined,
    loading: false
  }
}
export default {
  state: getDefaultState(),
  actions: {
    initState({ commit }, { account, mode }) {
      const title = titleSelection(mode)
      commit('initState', { account, title, mode })
    },
    async madeAction({ commit, dispatch, state }) {
      const { id, mode, key } = state
      let data, err

      commit('loading', true)
      switch (mode) {
        case SingleAccountDialogModes.DELETE: {
          ;[data, err] = await to(api.delete(`accounts/${id}`, { data: { key } }))
          break
        }
        case SingleAccountDialogModes.UNLOCK: {
          ;[data, err] = await to(api.post(`accounts/${id}`, { key }))
          break
        }
      }
      commit('loading', false)

      if (err) {
        return dispatch('snackbar/snackbar', { msg: err.msg }, { root: true })
      }

      switch (mode) {
        case SingleAccountDialogModes.DELETE: {
          dispatch('home/deleteAccount', { id }, { root: true })
          break
        }
        case SingleAccountDialogModes.UNLOCK: {
          dispatch('home/receiveAccountPassword', { id, password: data.password }, { root: true })
          break
        }
      }
      dispatch('snackbar/snackbar', { msg: data.msg }, { root: true })
      commit('resetState')
    }
  },
  mutations: {
    initState(state, { account, title, mode }) {
      Object.assign(state, { ...account, title, show: true, mode })
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
