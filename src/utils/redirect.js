/* 处理根路由跳转 */
export function getHomePathByRole(role) {
  switch (role) {
    case 'admin':
      return '/admin'
    case 'user':
      return '/user/leave'
    default:
      return '/login'
  }
}
