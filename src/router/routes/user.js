import UserHome from '@/views/UserHome.vue'

export const userRoutes = [
  {
    path: '/home',
    name: 'UserHome',
    component: UserHome,
    meta: { role: 'user' },
  },
]
