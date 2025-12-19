<template>
  <div class="app-container">
    <router-view />
    <AuthModal v-if="authModal.isOpen" />
  </div>
</template>

<script setup lang="ts">
import { useAuthModalStore } from '@/stores/authModal'
import AuthModal from '@/components/auth/AuthModal.vue'

const authModal = useAuthModalStore()
</script>

<style scoped>
.app-container {
  display: flex;
  min-height: 100vh;
  width: 100%;
  background: transparent;
  color: inherit;
}
</style>