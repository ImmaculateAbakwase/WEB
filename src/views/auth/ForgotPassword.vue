<template>
  <div>
    <PageHeader :logo="route.meta.logo as string" :title="route.meta.title as string" />
    
    <div class="auth-wrapper" :style="{ left: sidebarLeft }">
      <div class="auth-card-centered">
        <div class="auth-content-scroll">
          <div class="logo-container">
            <img src="@/assets/images/logo.png" alt="KFLIX Logo" class="logo-image" />
            <span class="logo-admin-text">APP</span>
          </div>

          <h1 class="auth-title">Reset Password</h1>
          <p class="auth-subtitle">We'll send you a reset link</p>

          <div class="auth-form">
            <div class="input-group">
              <label for="email" class="input-label">Email Address</label>
              <div class="input-wrapper">
                <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <input
                  type="email"
                  id="email"
                  v-model="email"
                  placeholder="you@example.com"
                  class="auth-input"
                  @keyup.enter="handleResetPassword"
                />
              </div>
            </div>

            <button @click="handleResetPassword" class="auth-button primary-button">
              <span>Send Reset Link</span>
              <svg class="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </button>
          </div>

          <div class="auth-footer">
            <p class="footer-text">
              Remember your password?
              <button @click="goToLogin" class="link-button">
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAppStore } from '@/stores/app'
import PageHeader from '@/components/layout/PageHeader.vue'

const router = useRouter()
const route = useRoute()
const appStore = useAppStore()

const sidebarLeft = computed(() => {
  return appStore.sidebarCollapsed ? '80px' : '260px'
})

const email = ref<string>('')

const handleResetPassword = (): void => {
  if (!email.value) {
    alert('Please enter your email address')
    return
  }
  
  console.log('Reset password for:', email.value)
  // Add your password reset logic here
  // Example: await authService.resetPassword(email.value)
  // router.push('/auth/login') // Redirect to login after sending reset link
}

const goToLogin = (): void => {
  router.push('/auth/login')
}
</script>

<style scoped src="@/assets/styles/AuthStyles.css"></style>
<style scoped>
/* Fix for auth-title visibility */
.auth-title {
  font-size: 32px !important;
  font-weight: 700 !important;
  color: #ffffff !important;
  text-align: center !important;
  margin-bottom: 8px !important;
  background: linear-gradient(135deg, #2196F3, #00BFA5) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  background-clip: text !important;
  display: block !important;
  line-height: 1.2 !important;
}

/* Fallback for browsers that don't support background-clip */
@supports not (-webkit-background-clip: text) {
  .auth-title {
    color: #2196F3 !important;
    -webkit-text-fill-color: initial !important;
  }
}
</style>