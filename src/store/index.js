import Vue from 'vue'
import Vuex from 'vuex'
import Login from './login'
import Home from './home'
import Register from './register'
import Auth from './auth'
import Snackbar from './snackbar'
import Settings from './settings'
import AddAccount from './addAccount'
Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    drawer: true
  },
  mutations: {},
  actions: {},
  modules: {
    login: {
      namespaced: true,
      ...Login
    },
    register: {
      namespaced: true,
      ...Register
    },
    home: {
      namespaced: true,
      ...Home
    },
    auth: {
      namespaced: true,
      ...Auth
    },
    snackbar: {
      namespaced: true,
      ...Snackbar
    },
    settings: {
      namespaced: true,
      ...Settings
    },
    addAccount: {
      namespaced: true,
      ...AddAccount
    }
  }
})
