import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store' // your vuex store
Vue.use(VueRouter)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters['auth/isAuthenticated']) {
    next()
    return
  }
  next('/home')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters['auth/isAuthenticated']) {
    next()
    return
  }
  next('/login')
}

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    beforeEnter: ifAuthenticated
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue'),
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import(/* webpackChunkName: "forgotPassword" */ '../views/ForgotPassword.vue'),
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/add-account/',
    name: 'add-account',
    component: () => import(/* webpackChunkName: "addAccount" */ '../views/AddAccount.vue'),
    beforeEnter: ifAuthenticated
  },
  {
    path: '/add-account/:id',
    name: 'edit-account',
    component: () => import(/* webpackChunkName: "addAccount" */ '../views/AddAccount.vue')
  },
  {
    path: '/reset-password/:token',
    name: 'reset-password',
    component: () => import(/* webpackChunkName: "resetPassword" */ '../views/ResetPassword.vue')
    // beforeEnter: ifNotAuthenticated
  },
  {
    path: '*',
    name: 'page-not-found',
    component: () => import(/* webpackChunkName: "pageNotFound" */ '../views/PageNotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
