<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue'
import { useUserStore } from '@/stores/user'
import { computed } from 'vue'

const store = useUserStore()
const username = computed(() => store.userInfo?.username || '管理员')
</script>

<template>
  <admin-layout>
    <template #content>
      <el-card>
        <h2>欢迎，{{ username }}！</h2>
        <p>这里是管理员的主页内容区域。</p>
      </el-card>
    </template>
  </admin-layout>
</template>
