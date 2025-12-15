<template>
  <div class="page-header">
    <div class="header-left">
      <button class="sidebar-toggle" @click="appStore.toggleSidebar">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </button>
      
      <router-link to="/" class="logo-link">
        <div class="page-logo">
          <img 
            :src="logoUrl" 
            :alt="title + ' Logo'" 
            class="logo-image"
          />
        </div>
        <h1 class="page-title">{{ title }}</h1>
      </router-link>
    </div>

    <div class="header-center">
      <div class="search-container">
        <input 
          type="text" 
          class="search-input" 
          placeholder="Search"
          v-model="searchQuery"
          @keyup.enter="handleSearch"
        />
        <button class="search-button" @click="handleSearch">
          <i class="bi-search"></i>
        </button>
      </div>
    </div>

    <div class="header-right">
      <button class="theme-toggle" @click="themeStore.toggleTheme" :aria-pressed="!themeStore.isDark" title="Toggle theme">
        <span class="theme-toggle-track">
          <span
            class="theme-toggle-thumb"
            :class="{ 'theme-toggle-thumb--light': !themeStore.isDark }"
          ></span>
        </span>
      </button>
      <button class="icon-button" title="Notifications">
        <i class="bi-bell"></i>
      </button>
      <button class="profile-button" title="Sign In" @click="goToLogin">
        <i class="bi-person-circle"></i>
        <span class="profile-label">Signin</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { useThemeStore } from '@/stores/theme'
import logo from '@/assets/images/logo.png'

defineProps<{
  logoUrl?: string
  title: string
}>()

const appStore = useAppStore()
const themeStore = useThemeStore()
const logoUrl = logo
const searchQuery = ref('')
const router = useRouter()

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    console.log('Searching for:', searchQuery.value)
    // Implement your search logic here
  }
}

const goToLogin = (): void => {
  router.push('/auth/login')
}
</script>

<style scoped>
.page-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background: #0a0a0a;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 1000;
  height: 60px;
}

/* Left Section */
.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 0 0 auto;
}

.sidebar-toggle {
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 4px;
  transition: all 0.3s;
  padding: 8px;
  flex-shrink: 0;
}

.sidebar-toggle:hover {
  background: rgba(255, 255, 255, 0.1);
}

.sidebar-toggle .bar {
  width: 18px;
  height: 2px;
  background: white;
  border-radius: 2px;
  transition: all 0.3s;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: white;
}

.page-logo {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(135deg, #e94560 0%, #8b2635 100%);
  flex-shrink: 0;
}

.logo-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

/* Center Section - Search */
.header-center {
  flex: 1;
  display: flex;
  justify-content: center;
  max-width: 600px;
  margin: 0 40px;
}

.search-container {
  display: flex;
  width: 100%;
  max-width: 600px;
}

.search-input {
  flex: 1;
  padding: 10px 16px;
  background: #121212;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-right: none;
  border-radius: 20px 0 0 20px;
  color: white;
  font-size: 14px;
  outline: none;
  transition: all 0.3s;
}

.search-input:focus {
  border-color: #e94560;
  background: #1a1a1a;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.search-button {
  padding: 0 24px;
  background: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-left: none;
  border-radius: 0 20px 20px 0;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-button:hover {
  background: #2a2a2a;
  color: white;
}

.search-button i {
  font-size: 18px;
}

/* Right Section */
.header-right {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;
}

.theme-toggle {
  width: 52px;
  height: 28px;
  padding: 0;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: #121212;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.25s ease, border-color 0.25s ease;
}

.theme-toggle:hover {
  background: #1f1f1f;
  border-color: rgba(255, 255, 255, 0.4);
}

.theme-toggle-track {
  width: 40px;
  height: 18px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
  position: relative;
}

.theme-toggle-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
  transition: transform 0.25s ease;
}

.theme-toggle-thumb--light {
  transform: translateX(18px);
}

.icon-button {
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.icon-button:hover {
  background: rgba(255, 255, 255, 0.1);
}

.icon-button i {
  font-size: 22px;
}

.profile-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  width: 48px;
  height: 48px;
  background: transparent;
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
}

.profile-button:hover {
  background: rgba(255, 255, 255, 0.1);
}

.profile-label {
  font-size: 10px;
}

/* Responsive */
@media (max-width: 768px) {
  .page-header {
    padding: 10px 15px;
  }

  .header-center {
    margin: 0 20px;
  }

  .page-title {
    font-size: 18px;
  }
}

@media (max-width: 640px) {
  .page-title {
    display: none;
  }

  .header-center {
    margin: 0 15px;
  }
}

@media (max-width: 480px) {
  .header-center {
    display: none;
  }
  
  .header-right {
    gap: 4px;
  }
}
</style>