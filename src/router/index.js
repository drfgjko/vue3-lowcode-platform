import { createRouter, createWebHashHistory } from 'vue-router'
import { publicRoutes } from './routes/public'
import { userRoutes } from './routes/user'
import { adminRoutes } from './routes/admin'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes,
})

const whiteList = ['Login', 'Register']

router.beforeEach(async (to, from, next) => {
  const store = useUserStore()

  // 公共路由直接放行['Login', 'Register']
  if (whiteList.includes(to.name)) {
    if (store.token) {
      const role = store.userInfo?.role
      return next(role === 'admin' ? '/admin' : '/home')
    }
    if (store.token && to.name === 'Login') {
      return next(store.userInfo?.role === 'admin' ? '/admin' : '/home')
    }
    return next()
  }

  if (!store.token) {
    return next({ name: 'Login' })
  }

  // 刷新时没添加动态路由，重新添加
  if (!store.isAddRoutes) {
    let accessedRoutes = []
    if (store.userInfo?.role === 'admin') {
      accessedRoutes = adminRoutes
    } else if (store.userInfo?.role === 'user') {
      accessedRoutes = userRoutes
    }
    accessedRoutes.forEach((route) => router.addRoute(route))
    store.setIsAddRoutes(true)
    return next({ ...to, replace: true })
  }

  next()
})

export default router
