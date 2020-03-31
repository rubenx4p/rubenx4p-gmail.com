import { SingleAccountDialogModes } from '../constants'
const getDefaultState = () => {
  return {}
}
export default {
  state: getDefaultState(),
  actions: {
    openDialog({ dispatch }, { dialogName, account }) {
      switch (dialogName) {
        case 'deleteAccountDialog': {
          dispatch('singleAccountDialog/initState', { account, mode: SingleAccountDialogModes.DELETE }, { root: true })
          break
        }
        case 'unlockAccountDialog': {
          dispatch('singleAccountDialog/initState', { account, mode: SingleAccountDialogModes.UNLOCK }, { root: true })
        }
      }
    },
    closeAllDialogs({ commit }) {
      // add here all dialogs
      commit('singleAccountDialog/resetState', null, { root: true })
    }
  },
  mutations: {
    resetState(state) {
      Object.assign(state, getDefaultState())
    }
  },
  getters: {}
}
