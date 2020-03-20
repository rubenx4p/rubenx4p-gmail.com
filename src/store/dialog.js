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
    }
  },
  mutations: {
    resetState(state) {
      Object.assign(state, getDefaultState())
    }
  },
  getters: {}
}
