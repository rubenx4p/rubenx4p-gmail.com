import Vue from 'vue'
import Vuex from 'vuex'
import Login from './login'
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
    }
  }
})
