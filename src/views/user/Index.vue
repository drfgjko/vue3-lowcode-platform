<script setup>
import { useUserStore } from '@/stores/user'
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const store = useUserStore()
const username = computed(() => store.userInfo?.username || '用户')

const router = useRouter()
const route = useRoute()

// 统一管理 Tabs 信息
const tabs = [
  { label: '请假申请', name: 'leave' },
  { label: '申请记录', name: 'records' }
]

const activeTab = ref('leave')

// 初始时同步路由的最后一级到 activeTab
const syncTabFromRoute = () => {
  const segments = route.path.split('/')
  activeTab.value = segments[segments.length - 1] || 'leave'
}

syncTabFromRoute()

watch(
  () => route.path,
  () => {
    syncTabFromRoute()
  }
)

function handleTabChange(newTabName) {
  router.push(`/user/${newTabName}`)
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
