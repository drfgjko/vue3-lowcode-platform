<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <h1 class="error-code">404</h1>
      <h2 class="error-message">页面未找到</h2>
      <p class="error-description">抱歉，您访问的页面不存在或已被移除</p>
      <el-button type="primary" @click="goHome">返回首页</el-button>
    </div>
  </div>
</template>

<style scoped>
.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f7fa;
}

.not-found-content {
  text-align: center;
  padding: 40px;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.error-code {
  font-size: 72px;
  color: #f56c6c;
  margin-bottom: 20px;
}

.error-message {
  font-size: 24px;
  color: #606266;
  margin-bottom: 16px;
}

.error-description {
  font-size: 16px;
  color: #909399;
  margin-bottom: 24px;
}

.home-link {
  text-decoration: none;
}
</style>
