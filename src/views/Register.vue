<template>
  <el-form :model="form">
    <el-form-item label="用户名">
      <el-input v-model="form.username" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input type="password" v-model="form.password" />
    </el-form-item>
    <el-button type="primary" @click="register">注册</el-button>
    <el-button @click="$router.push('/')">去登录</el-button>
  </el-form>
</template>

<script setup>
import { ref } from "vue";
import { registerAPI } from "@/api/user";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
const form = ref({
  username: "",
  password: "",
});

const router = useRouter();

const register = async () => {
  try {
    const res = await registerAPI(form.value);
    if (res.code === 200) {
      ElMessage.success("注册成功，请登录");
      router.push("/");
    } else {
      ElMessage.error(res.message);
    }
  } catch (e) {
    ElMessage.error("注册失败");
  }
};
</script>
