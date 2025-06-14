export const adminRoutes = [
  {
    path: '/admin',
    name: 'AdminHome',
    component: () => import('@/views/admin'), // 懒加载
    meta: { role: 'admin' }
  }
]
