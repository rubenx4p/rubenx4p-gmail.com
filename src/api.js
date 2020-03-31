import axios from 'axios'
import store from '@/store/index'

const api = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.authorization = 'Bearer ' + token
    }

    return config
  },
  err => {
    return Promise.reject(err)
  }
)

api.interceptors.response.use(
  response => {
    return response.data
  },
  err => {
    if (err.response.status === 401) {
      store.dispatch('auth/logout')
    }
    return Promise.reject(err.response.data)
  }
)

export default api
