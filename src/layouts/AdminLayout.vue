<script setup>
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const store = useUserStore();
const router = useRouter();

function logout() {
  store.logout();
  router.push("/");
}
</script>

<template>
  <el-container class="container">
    <el-header class="header">
      <div class="title">后台管理</div>
      <el-button class="logout-btn" @click="logout">退出登录</el-button>
    </el-header>
    <el-main class="main">
      <slot name="content"></slot>
    </el-main>
  </el-container>
</template>

<style scoped>
.container {
  height: 100vh;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--header-bg);
  color: var(--header-text-color);
  line-height: 60px;
  padding: 0 20px;
}

.title {
  font-weight: bold;
  font-size: 18px;
}

.logout-btn {
  color: var(--button-text-color);
  background-color: var(--button-danger-bg);
}

.main {
  padding: 20px;
  background-color: var(--main-bg);
  color: var(--main-text-color);
}
</style>
