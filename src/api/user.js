import request from '@/api'

// 用户登录接口
export function loginAPI(data) {
  return request.post('/login', data)
}

// 用户注册接口
export function registerAPI(data) {
  return request.post('/register', data)
}

// 获取用户信息接口
export function getUserInfoAPI() {
  return request.get('/user/info')
}
