import Mock from 'mockjs'

// 获取 localStorage 数据
const getLeaves = () => JSON.parse(localStorage.getItem('leaves') || '[]')

// 保存到 localStorage
const saveLeaves = data => localStorage.setItem('leaves', JSON.stringify(data))

// 模拟新增
Mock.mock('/api/leave/add', 'post', options => {
  const body = JSON.parse(options.body)
  const list = getLeaves()
  // 追加
  body.id = Date.now()
  body.status = '待审批'
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
