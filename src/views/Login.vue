<script setup>
import { ref } from "vue";
import { loginAPI } from "@/api/user";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const router = useRouter();
const store = useUserStore();

const form = ref({
  username: "",
  password: "",
});

const login = async () => {
  try {
    const res = await loginAPI(form.value);
    if (res.code === 200) {
      store.setToken(res.data.token);
      store.setUserInfo(res.data.userInfo);
      store.setIsAddRoutes(false);
      router.push(res.data.userInfo.role === "admin" ? "/admin" : "/home");
    } else {
      ElMessage.error(res.message);
    }
  } catch (e) {
    ElMessage.error("登录失败");
  }
};
</script>

<template>
  <el-form :model="form">
    <el-form-item label="用户名">
      <el-input v-model="form.username" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input type="password" v-model="form.password" />
    </el-form-item>
    <el-button type="primary" @click="login">登录</el-button>
    <el-button @click="$router.push('/register')">去注册</el-button>
  </el-form>
</template>
