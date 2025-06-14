<script setup>
import { useUserStore } from '@/stores/user'
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const store = useUserStore()
const username = computed(() => store.userInfo?.username || '用户')

const router = useRouter()
const route = useRoute()

// 统一管理 Tabs 信息
const tabs = [
  { label: '请假申请', name: 'leave', path: '/user/leave' },
  { label: '申请记录', name: 'records', path: '/user/records' }
]

// 计算当前激活的 tab name，方便绑定
const activeTab = computed(() => {
  // 取当前路由的最后一级路径作为tab标识
  const segments = route.path.split('/')
  return segments[segments.length - 1] || 'leave' // 默认leave
})

function handleTabChange(newTabName) {
  const tab = tabs.find(t => t.name === newTabName)
  if (tab) {
    console.log('当前路由path:', route.path)
    console.log('跳转到:', tab.path)

    router.push(tab.path)
  }
}
</script>

<template>
  <el-card>
    <div class="flex justify-between items-center mb-4">
      <h2>欢迎，{{ username }}！</h2>
    </div>

    <el-tabs v-model="activeTab" @tab-change="handleTabChange" type="card">
      <el-tab-pane v-for="tab in tabs" :key="tab.name" :label="tab.label" :name="tab.name" />
    </el-tabs>

    <router-view />
  </el-card>
</template>
