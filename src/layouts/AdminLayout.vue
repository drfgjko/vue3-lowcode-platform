<template>
  <el-container style="height: 100vh">
    <el-header
      style="
        background: #303133;
        color: white;
        line-height: 60px;
        padding: 0 20px;
      "
    >
      <div style="float: left; font-weight: bold; font-size: 18px">
        后台管理
      </div>
      <el-button
        type="danger"
        style="float: right; color: white"
        @click="logout"
        >退出登录</el-button
      >
    </el-header>
    <el-main style="padding: 20px">
      <slot name="content"></slot>
    </el-main>
  </el-container>
</template>

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
