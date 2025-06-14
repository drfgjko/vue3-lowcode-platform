import Mock from 'mockjs'

const usersKey = 'mock_users'

//  第一次初始化 localStorage，只执行一次
if (!localStorage.getItem(usersKey)) {
  const defaultUsers = [
    {
      id: Mock.Random.guid(),
      username: 'admin',
      password: 'admin123',
      role: 'admin'
    },
    {
      id: Mock.Random.guid(),
      username: 'user',
      password: 'user123',
      role: 'user'
    }
  ]
  localStorage.setItem(usersKey, JSON.stringify(defaultUsers))
}

// 读取已有用户
let users = JSON.parse(localStorage.getItem(usersKey) || '[]')

Mock.mock('/api/register', 'post', ({ body }) => {
  const { username, password } = JSON.parse(body)

  // 添加空值校验
  if (!username || !password) {
    return { code: 400, message: '用户名和密码不能为空' }
  }

  const exists = users.some(u => u.username === username)
  if (exists) {
    return { code: 400, message: '用户已存在' }
  }
  const newUser = {
    id: Mock.Random.guid(),
    username,
    password,
    role: 'user'
  }
  users.push(newUser)
  localStorage.setItem(usersKey, JSON.stringify(users))
  return { code: 200, message: '注册成功' }
})

Mock.mock('/api/login', 'post', ({ body }) => {
  const { username, password } = JSON.parse(body)
  const user = users.find(u => u.username === username && u.password === password)
  if (!user) {
    return { code: 401, message: '用户名或密码错误' }
  }
  return {
    code: 200,
    message: '登录成功',
    data: {
      token: Mock.Random.guid(),
      userInfo: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    }
  }
})
