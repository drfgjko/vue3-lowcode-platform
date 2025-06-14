<script setup>
import UserLayout from "@/layouts/UserLayout.vue";
import { useUserStore } from "@/stores/user";
import { computed } from "vue";

const store = useUserStore();
const username = computed(() => store.userInfo?.username || "用户");
</script>

<template>
  <user-layout>
    <template #content>
      <el-card>
        <h2>欢迎，{{ username }}！</h2>
        <p>这里是普通用户的主页内容区域。</p>
      </el-card>
    </template>
  </user-layout>
</template>
