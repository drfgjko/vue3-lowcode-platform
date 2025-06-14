<script setup lang="ts">
import { RouterView } from "vue-router";
import ThemeToggle from "@/components/ThemeToggle.vue";
</script>

<template>
  <div>
    <router-view />
    <ThemeToggle />
  </div>
</template>
