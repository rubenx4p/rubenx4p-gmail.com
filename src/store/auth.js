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
    logout({ commit }) {
      localStorage.removeItem('token')
      commit('removeToken')
      router.push('/login')
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
