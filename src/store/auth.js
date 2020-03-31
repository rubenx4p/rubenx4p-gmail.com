import router from '@/router/index'
const getDefaultState = () => {
  const token = localStorage.getItem('token') || ''
  return {
    token
  }
}

export default {
  state: getDefaultState(),
  actions: {
    authSucceeded({ commit }, token) {
      commit('saveToken', token)
      localStorage.setItem('token', token)
      router.push('/home')
    },
    logout({ commit, dispatch }) {
      localStorage.removeItem('token')
      localStorage.removeItem('accounts-storage')
      dispatch('dialog/closeAllDialogs', null, { root: true })
      commit('removeToken')
      router.replace('../login')
    }
  },
  mutations: {
    saveToken(state, token) {
      state.token = token
    },
    removeToken(state) {
      state.token = ''
    }
  },
  getters: {
    isAuthenticated: state => {
      return !!state.token
    }
  }
}
