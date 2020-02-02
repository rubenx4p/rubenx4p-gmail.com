import Vue from 'vue'
import Vuex from 'vuex'
import Login from './login'
import Register from './register'
Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {},
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
    }
  }
})
