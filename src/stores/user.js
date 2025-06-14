import { defineStore } from 'pinia'
import { ref } from 'vue'
import Cookies from 'js-cookie'

export const useUserStore = defineStore('user', () => {
  const token = ref(Cookies.get('token') || '')
  const userInfo = ref(JSON.parse(localStorage.getItem('userInfo') || 'null'))
  const isAddRoutes = ref(false)

  function setToken(val) {
    token.value = val
    Cookies.set('token', val, { expires: 1 })
  }
  function setUserInfo(info) {
    userInfo.value = info
    if (info) {
      localStorage.setItem('userInfo', JSON.stringify(info))
    } else {
      localStorage.removeItem('userInfo')
    }
  }
  function setIsAddRoutes(val) {
    isAddRoutes.value = val
  }
  function logout() {
    token.value = ''
    userInfo.value = null
    isAddRoutes.value = false
    Cookies.remove('token')
    localStorage.removeItem('userInfo')
  }

  return {
    token,
    userInfo,
    isAddRoutes,
    setToken,
    setUserInfo,
    setIsAddRoutes,
    logout,
  }
})
