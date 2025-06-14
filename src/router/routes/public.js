import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'

export const publicRoutes = [
  {
    path: '/login', // 路径改成 /login
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/',
    redirect: '/login', // 默认重定向到登录页
  },
]
