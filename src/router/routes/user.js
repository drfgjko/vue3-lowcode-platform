export const userRoutes = [
  {
    path: '/user',
    component: () => import('@/layouts/UserLayout.vue'), // 公共前台布局
    children: [
      {
        path: '',
        component: () => import('@/views/user/Index.vue'), // 包含 Tabs 和 router-view
        children: [
          {
            path: 'leave',
            component: () => import('@/views/user/LeaveFormPage.vue'),
            meta: { title: '请假申请' }
          },
          {
            path: '',
            redirect: 'leave' // 默认进入 leave
          }
        ]
      }
    ]
  }
]
