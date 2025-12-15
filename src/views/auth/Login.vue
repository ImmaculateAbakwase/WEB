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

            <h1 class="auth-title">Welcome Back</h1>
            <p class="auth-subtitle">Your entertainment starts here.</p>

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
                    v-model="formData.email"
                    placeholder="you@example.com"
                    class="auth-input"
                    @keyup.enter="handleLogin"
                  />
                </div>
              </div>

              <div class="input-group">
                <label for="password" class="input-label">Password</label>
                <div class="input-wrapper">
                  <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    id="password"
                    v-model="formData.password"
                    placeholder="••••••••"
                    class="auth-input"
                    @keyup.enter="handleLogin"
                  />
                  <button
                    type="button"
                    class="password-toggle"
                    @click="showPassword = !showPassword"
                  >
                    <svg v-if="showPassword" class="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                    <svg v-else class="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </div>

              <button @click="goToForgotPassword" class="forgot-link">
                Forgot Password?
              </button>

              <button @click="handleLogin" class="auth-button primary-button">
                <span>Sign In</span>
                <svg class="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>

            <p class="social-heading">Or Continue with</p>
            <div class="social-login">
              <button class="social-button google">
                <svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#EA4335" d="M12 10.2v3.6h5.09C16.72 15.96 14.6 17.4 12 17.4c-3 0-5.4-2.4-5.4-5.4S9 6.6 12 6.6c1.53 0 2.9.6 3.9 1.53l2.55-2.55C16.6 3.6 14.45 2.7 12 2.7 6.93 2.7 2.7 6.93 2.7 12s4.23 9.3 9.3 9.3c5.37 0 9.15-3.78 9.15-9.12 0-.63-.06-1.1-.15-1.65H12z"/>
                </svg>
                <span>Google</span>
              </button>
              <button class="social-button apple">
                <svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d="M16.365 1.43c0 1.14-.482 2.178-1.24 2.982-.82.862-2.04 1.53-3.286 1.44-.14-1.1.39-2.216 1.108-2.97.82-.832 2.13-1.42 3.3-1.452.04.16.06.32.06.5zm4.3 16.036c-.65 1.46-.97 2.12-1.82 3.42-1.18 1.8-2.84 4.06-4.9 4.08-1.82.02-2.29-1.2-4.77-1.18-2.48.02-2.99 1.2-4.81 1.18-2.06-.02-3.63-2.06-4.81-3.86-3.3-5.02-3.65-10.92-1.6-14.06 1.44-2.24 3.74-3.56 5.9-3.56 2.2 0 3.58 1.2 5.4 1.2 1.76 0 2.82-1.2 5.36-1.2 2.02 0 4.16 1.1 5.6 3.02-4.9 2.7-4.1 9.74.5 11.9z"/>
                </svg>
                <span>Apple</span>
              </button>
            </div>

            <div class="auth-footer">
              <p class="footer-text">
                Don't have an Account?
                <button @click="goToSignUp" class="link-button">
                  SIGN UP
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

interface LoginFormData {
  email: string
  password: string
}

const router = useRouter()
const route = useRoute()
const appStore = useAppStore()

const sidebarLeft = computed(() => {
  return appStore.sidebarCollapsed ? '80px' : '260px'
})

const formData = ref<LoginFormData>({
  email: '',
  password: ''
})

const showPassword = ref(false)

const handleLogin = (): void => {
  console.log('Login attempt:', formData.value)
  // Add your authentication logic here
  // Example: await authService.login(formData.value)
  router.push('/') // Redirect to dashboard (HomePage) after successful login
}

const goToSignUp = (): void => {
  router.push('/auth/signup')
}

const goToForgotPassword = (): void => {
  router.push('/auth/forgot-password')
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

/* Password Toggle Button */
.password-toggle {
  position: absolute;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 2;
}

.eye-icon {
  width: 20px;
  height: 20px;
  color: var(--text-secondary);
  transition: color 0.3s ease;
}

.password-toggle:hover .eye-icon {
  color: var(--kflix-blue);
}
</style>