import AdminHome from '@/views/AdminHome.vue'

export const adminRoutes = [
  {
    path: '/admin',
    name: 'AdminHome',
    component: AdminHome,
    meta: { role: 'admin' },
  },
]
