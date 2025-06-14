import axios from 'axios'
import Cookies from 'js-cookie'
import { ElMessage } from 'element-plus'
import router from '@/router'

const request = axios.create({
  baseURL: '/api',
  timeout: 5000
})

// 请求拦截，带token
request.interceptors.request.use(
  config => {
    const token = Cookies.get('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

// 响应拦截
request.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response?.status === 401) {
      ElMessage.error('身份验证失败，请重新登录')
      router.push('/')
    } else {
      ElMessage.error(error.response?.data?.message || '请求错误')
    }
    return Promise.reject(error)
  }
)

export default request
