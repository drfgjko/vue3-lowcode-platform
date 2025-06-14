<template>
  <button class="theme-toggle" @click="toggleTheme" :title="isDark ? '浅色' : '深色'">
    <span v-if="isDark">🌞</span>
    <span v-else>🌙</span>
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(false)

function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark-theme')
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

onMounted(() => {
  const saved = localStorage.getItem('theme')
  isDark.value = saved === 'dark'
  if (isDark.value) {
    document.documentElement.classList.add('dark-theme')
  }
})
</script>

<style scoped>
.theme-toggle {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  font-size: 20px;
  background-color: var(--button-bg);
  color: var(--button-text-color);
  border: 1px solid var(--button-border-color);
  cursor: pointer;
}
</style>
