<script setup>
import { ref, nextTick } from "vue";
import { loginAPI } from "@/api/user";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { getHomePathByRole } from "@/utils/redirect";
import { adminRoutes } from "@/router/routes/admin";
import { userRoutes } from "@/router/routes/user";
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

      // 跳转到角色首页
      const path = getHomePathByRole(res.data.userInfo.role);
      router.replace(path);
    } else {
      ElMessage.error(res.message);
    }
  } catch (e) {
    ElMessage.error("登录失败");
    console.log("err", e);
  }
};
</script>

<template>
  <el-container class="container">
    <el-form :model="form">
      <el-form-item label="用户名">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="form.password" />
      </el-form-item>
      <el-button type="primary" @click="login">登录</el-button>
      <el-button @click="$router.push({ name: 'Register' })">去注册</el-button>
    </el-form>
  </el-container>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: var(--main-bg);
}
</style>
