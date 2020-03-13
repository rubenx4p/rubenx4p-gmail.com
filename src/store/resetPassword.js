import router from '@/router/index'
import api from '@/api'
import to from '@/utils/to'

const getDefaultState = () => {
  return {
    password: '',
    repeatPassword: '',
    showPassword: false,
    showRepeatPassword: false,
    fetching: false
  }
}

export default {
  state: getDefaultState(),
  actions: {
    async resetPassword({ commit, state, dispatch }) {
      const { token } = router.history.current.params
      const { password } = state

      commit('fetching')
      const [succeeded, failed] = await to(api.post('users/reset-password', { token, password }))
      commit('stopFetching')

      if (failed) {
        return dispatch('snackbar/snackbar', { msg: failed.msg }, { root: true })
      }

      dispatch('snackbar/snackbar', { msg: succeeded.msg }, { root: true })

      router.push('../login')
    }
  },
  mutations: {
    setPassword(state, password) {
      state.password = password
    },
    setRepeatPassword(state, repeatPassword) {
      state.repeatPassword = repeatPassword
    },
    setShowPassword(state, showPassword) {
      state.showPassword = showPassword
    },
    setShowRepeatPassword(state, showRepeatPassword) {
      state.showRepeatPassword = showRepeatPassword
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
