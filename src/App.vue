<template>
  <div class="app-container">
    <Sidebar />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import Sidebar from '@/components/layout/Sidebar.vue'
</script>

<style scoped>
.app-container {
  display: flex;
  min-height: 100vh;
  background: #0a0a0a;
  color: #fff;
}
</style>