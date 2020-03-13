import router from '@/router/index'
import api from '@/api'
import to from '@/utils/to'

const getDefaultState = () => {
  return {
    email: 'rubenx4p@gmail.com',
    fetching: false
  }
}

export default {
  state: getDefaultState(),
  actions: {
    async resetPassword({ commit, state, dispatch }, email) {
      commit('fetching')
      const [ok, err] = await to(api.post('users/forgot-password', { email }))
      commit('stopFetching')
      if (err) {
        return dispatch('snackbar/snackbar', { msg: err.msg }, { root: true })
      }

      return dispatch('snackbar/snackbar', { msg: ok.msg }, { root: true })
    }
  },
  mutations: {
    setEmail(state, email) {
      state.email = email
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
