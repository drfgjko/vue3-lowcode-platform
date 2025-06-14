import Mock from 'mockjs'
const statusEnum = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
}

// 获取 localStorage 数据
const getLeaves = () => JSON.parse(localStorage.getItem('leaves') || '[]')

// 保存到 localStorage
const saveLeaves = data => localStorage.setItem('leaves', JSON.stringify(data))

// 第一次初始化请假记录（只执行一次）
const getUsers = () => JSON.parse(localStorage.getItem('mock_users') || '[]')

if (!localStorage.getItem('leaves')) {
  const users = getUsers()
  let leaves = []

  const normalUsers = users.filter(u => u.role === 'user')

  normalUsers.forEach(user => {
    for (let i = 0; i < 1000; i++) {
      leaves.push({
        id: Date.now() + Math.floor(Math.random() * 10000) + i,
        userId: user.id,
        type: Mock.Random.pick(['personal', 'sick', 'annual', 'other']),
        reason: Mock.Random.csentence(5, 10),
        startDate: Mock.Random.date('yyyy-MM-dd'),
        endDate: Mock.Random.date('yyyy-MM-dd'),
        status: Mock.Random.pick([statusEnum.PENDING, statusEnum.APPROVED, statusEnum.REJECTED])
      })
    }
  })

  saveLeaves(leaves)
}
// 模拟新增
Mock.mock('/api/leave/add', 'post', options => {
  const body = JSON.parse(options.body)
  const list = getLeaves()
  // 追加
  body.id = Date.now()
  body.status = statusEnum.PENDING
  list.push(body)
  saveLeaves(list)
  return { code: 200, message: '提交成功' }
})

// 模拟获取当前用户记录
Mock.mock(/\/api\/leave\/list/, 'get', options => {
  const url = new URL(options.url, 'http://localhost')
  const userId = url.searchParams.get('userId')
  const data = getLeaves().filter(item => item.userId === userId)
  // console.log('Mock 命中，userId:', userId)
  // console.log('data:', data)
  return {
    code: 200,
    data
  }
})

// 模拟用户修改接口
Mock.mock(/\/api\/leave\/update\/\d+/, 'patch', options => {
  const id = Number(options.url.split('/').pop())
  const body = JSON.parse(options.body)
  const list = getLeaves().map(item => {
    if (item.id === id && item.status === '待审批') {
      return { ...item, ...body }
    }
    return item
  })
  saveLeaves(list)
  return { code: 200, message: '修改成功' }
})

// 管理端获取所有
Mock.mock('/api/leave/manage', 'get', () => {
  return { code: 200, data: getLeaves() }
})

// 更改状态
Mock.mock(/\/api\/leave\/status\/\d+/, 'patch', options => {
  const id = Number(options.url.split('/').pop())
  const { status } = JSON.parse(options.body)
  const list = getLeaves().map(item => {
    if (item.id === id) item.status = status
    return item
  })
  saveLeaves(list)
  return { code: 200, message: '状态更新成功' }
})

// 删除接口物理删除
Mock.mock(/\/api\/leave\/delete\/\d+/, 'delete', options => {
  const id = Number(options.url.split('/').pop())
  const list = getLeaves().filter(item => item.id !== id)
  saveLeaves(list)
  return { code: 200, message: '删除成功' }
})
