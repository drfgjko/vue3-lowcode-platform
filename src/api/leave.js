import request from '@/api'
import { useUserStore } from '@/stores/user'
// 提交请假申请
export function submitLeaveAPI(data) {
  return request.post('/leave/add', data)
}

// 获取请假记录（当前用户）
export function getLeaveListAPI(userId) {
  return request.get('/leave/list', { params: { userId } })
}

// 管理端：查询所有申请
export function getAllLeavesAPI(params) {
  return request.get('/leave/manage', { params })
}

// 管理端：更新状态
export function updateLeaveStatusAPI(id, status) {
  return request.patch(`/leave/status/${id}`, { status })
}

// 删除记录
export function deleteLeaveAPI(id) {
  return request.delete(`/leave/delete/${id}`)
}
