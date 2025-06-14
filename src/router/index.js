import { createRouter, createWebHashHistory } from 'vue-router'
import { publicRoutes } from './routes/public'
import { userRoutes } from '@/router/routes/user'
import { adminRoutes } from '@/router/routes/admin'
import { useUserStore } from '@/stores/user'
import { getHomePathByRole } from '@/utils/redirect'
const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes,
})

// 动态路由加载器
const loadDynamicRoutes = (role) => {
  const routes = role === 'admin' ? adminRoutes : userRoutes
  routes.forEach((route) => router.addRoute(route))
  useUserStore().setIsAddRoutes(true)
}

const whiteList = ['Login', 'Register']

router.beforeEach(async (to, from, next) => {
  const store = useUserStore()

  // 公共路由直接放行['Login', 'Register']
  if (whiteList.includes(to.name)) {
    return store.token ? next(getHomePathByRole(store.userInfo?.role)) : next()
  }

  if (!store.token) {
    return next({ name: 'Login' })
  }

  // 刷新时没添加动态路由，重新添加
  if (!store.isAddRoutes) {
    loadDynamicRoutes(store.userInfo?.role)
    return next({ ...to, replace: true })
  }

  next()
})

// router.afterEach((to) => {
//   console.log('当前路由:', to.fullPath)
// })

export default router
