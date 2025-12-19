<template>
  <teleport to="body">
    <div
      v-if="authModal.isOpen"
      class="kflix-auth-backdrop"
      @click="close"
    >
      <div class="kflix-auth-modal" @click.stop>
        <button
          type="button"
          class="kflix-auth-close"
          aria-label="Close"
          @click="close"
        >
          <i class="bi-x-lg" />
        </button>

        <div class="kflix-auth-header">
          <img src="/logo.png" alt="KFLIX logo" class="kflix-auth-logo" />
          <h2 v-if="authModal.mode === 'login'">Welcome back</h2>
          <h2 v-else-if="authModal.mode === 'signup'">Create your account</h2>
          <h2 v-else>Reset password</h2>
          <p v-if="authModal.mode === 'login'">
            Sign in to continue enjoying movies, music, games and live events.
          </p>
          <p v-else-if="authModal.mode === 'signup'">
            Join KFLIX and sync your watchlist, playlists and K‑TUBE activity everywhere.
          </p>
          <p v-else>
            Enter your email address and we’ll send you a secure reset link.
          </p>
        </div>

        <form v-if="authModal.mode === 'login'" class="kflix-auth-body" @submit.prevent="handleLogin">
          <div class="ktube-form-row">
            <label class="ktube-form-label" for="loginEmail">Email</label>
            <input
              id="loginEmail"
              v-model="loginEmail"
              class="ktube-form-input"
              type="email"
              required
              placeholder="you@example.com"
            />
          </div>
          <div class="ktube-form-row">
            <label class="ktube-form-label" for="loginPassword">Password</label>
            <input
              id="loginPassword"
              v-model="loginPassword"
              class="ktube-form-input"
              type="password"
              required
              placeholder="••••••••"
            />
          </div>
          <div class="kflix-auth-footer-row">
            <button
              type="button"
              class="kflix-auth-link"
              @click="authModal.open('forgot')"
            >
              Forgot password?
            </button>
          </div>
          <div class="ktube-form-actions">
            <button type="submit" class="btn btn-danger btn-sm w-100">
              Sign in
            </button>
          </div>
          <p class="kflix-auth-switch">
            New to KFLIX?
            <button type="button" class="kflix-auth-link" @click="authModal.open('signup')">
              Create account
            </button>
          </p>
        </form>

        <form
          v-else-if="authModal.mode === 'signup'"
          class="kflix-auth-body"
          @submit.prevent="handleSignup"
        >
          <div class="ktube-form-row">
            <label class="ktube-form-label" for="signupName">Full name</label>
            <input
              id="signupName"
              v-model="signupName"
              class="ktube-form-input"
              type="text"
              required
              placeholder="John Doe"
            />
          </div>
          <div class="ktube-form-row">
            <label class="ktube-form-label" for="signupEmail">Email</label>
            <input
              id="signupEmail"
              v-model="signupEmail"
              class="ktube-form-input"
              type="email"
              required
              placeholder="you@example.com"
            />
          </div>
          <div class="ktube-form-row">
            <label class="ktube-form-label" for="signupPassword">Password</label>
            <input
              id="signupPassword"
              v-model="signupPassword"
              class="ktube-form-input"
              type="password"
              required
              placeholder="Create a strong password"
            />
          </div>
          <div class="ktube-form-actions">
            <button type="submit" class="btn btn-danger btn-sm w-100">
              Create account
            </button>
          </div>
          <p class="kflix-auth-switch">
            Already have an account?
            <button type="button" class="kflix-auth-link" @click="authModal.open('login')">
              Sign in
            </button>
          </p>
        </form>

        <form
          v-else
          class="kflix-auth-body"
          @submit.prevent="handleForgot"
        >
          <div class="ktube-form-row">
            <label class="ktube-form-label" for="forgotEmail">Email</label>
            <input
              id="forgotEmail"
              v-model="forgotEmail"
              class="ktube-form-input"
              type="email"
              required
              placeholder="you@example.com"
            />
          </div>
          <div class="ktube-form-actions">
            <button type="submit" class="btn btn-danger btn-sm w-100">
              Send reset link
            </button>
          </div>
          <p class="kflix-auth-switch">
            Remember your password?
            <button type="button" class="kflix-auth-link" @click="authModal.open('login')">
              Back to sign in
            </button>
          </p>
        </form>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthModalStore } from '@/stores/authModal'
import { useUserStore } from '@/stores/user'

const authModal = useAuthModalStore()
const userStore = useUserStore()

const loginEmail = ref('')
const loginPassword = ref('')

const signupName = ref('')
const signupEmail = ref('')
const signupPassword = ref('')

const forgotEmail = ref('')

const close = () => {
  authModal.close()
}

const handleLogin = () => {
  if (!loginEmail.value || !loginPassword.value) return
  userStore.login({
    id: 'user-login',
    name: loginEmail.value.split('@')[0],
    email: loginEmail.value
  })
  authModal.close()
}

const handleSignup = () => {
  if (!signupName.value || !signupEmail.value || !signupPassword.value) return
  userStore.login({
    id: 'user-signup',
    name: signupName.value,
    email: signupEmail.value
  })
  authModal.close()
}

const handleForgot = () => {
  if (!forgotEmail.value) return
  // In a real app we'd call an API here; for now we just close the modal.
  authModal.close()
}
</script>

<style scoped>
.kflix-auth-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.kflix-auth-modal {
  width: min(420px, 100%);
  border-radius: 20px;
  background: var(--bg-tertiary, #141419);
  border: 1px solid var(--border-color, rgba(255, 255, 255, 0.12));
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.8);
  padding: 22px 22px 20px;
  position: relative;
}

.kflix-auth-close {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 32px;
  height: 32px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.kflix-auth-header {
  text-align: center;
  margin-bottom: 16px;
}

.kflix-auth-logo {
  width: 46px;
  height: 46px;
  border-radius: 10px;
  margin-bottom: 8px;
}

.kflix-auth-header h2 {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 4px;
}

.kflix-auth-header p {
  font-size: 13px;
  color: var(--text-tertiary);
}

.kflix-auth-body {
  margin-top: 4px;
}

.kflix-auth-footer-row {
  display: flex;
  justify-content: flex-end;
  margin-top: 4px;
}

.kflix-auth-link {
  border: none;
  background: none;
  padding: 0;
  font-size: 12px;
  color: var(--accent-color, #e94560);
  cursor: pointer;
}

.kflix-auth-switch {
  margin-top: 12px;
  font-size: 12px;
  text-align: center;
  color: var(--text-secondary);
}
</style>


