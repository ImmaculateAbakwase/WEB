<template>
  <header class="page-header">
    <div class="page-header-top">
      <div class="header-left">
        <router-link to="/" class="logo-link" aria-label="Go to KFLIX">
          <div class="page-logo">
            <img src="/logo.png" :alt="routeTitle + ' Logo'" class="logo-image" />
          </div>
          <div v-if="!isHome" class="brand-title">
            <span class="brand-text">KFLIX</span>
            <span v-if="sectionLabel" class="brand-section">{{ sectionLabel }}</span>
          </div>
        </router-link>
      </div>

      <div class="header-center">
        <div class="search-container">
          <input
            type="text"
            class="search-input"
            placeholder="Search movies, music, games..."
            v-model="searchQuery"
            @keyup.enter="handleSearch"
          />
          <button class="search-button" type="button" @click="handleSearch">
            <i class="bi-search"></i>
          </button>
        </div>
      </div>

      <div class="header-right">
        <button
          class="theme-toggle"
          @click="themeStore.toggleTheme"
          :aria-pressed="!themeStore.isDark"
          title="Toggle theme"
          type="button"
        >
          <span class="theme-toggle-track">
            <span
              class="theme-toggle-thumb"
              :class="{ 'theme-toggle-thumb--light': !themeStore.isDark }"
            ></span>
          </span>
        </button>

        <button class="icon-button" title="Notifications" type="button">
          <i class="bi-bell"></i>
        </button>

        <div ref="profileWrapper" class="profile-wrapper">
          <button
            class="profile-button"
            type="button"
            :title="isLoggedIn ? 'Account' : 'Sign in'"
            aria-haspopup="menu"
            :aria-expanded="isProfileMenuOpen"
            @click.stop="toggleProfileMenu"
          >
            <span v-if="isLoggedIn" class="profile-initials">{{ userStore.initials }}</span>
            <i v-else class="bi-person-circle" style="font-size: 22px"></i>
          </button>

          <div v-if="isProfileMenuOpen" class="profile-menu" role="menu">
            <div class="profile-menu-header">
              {{ isLoggedIn ? 'Account' : 'Welcome' }}
            </div>

            <template v-if="!isLoggedIn">
              <button class="profile-menu-item" type="button" role="menuitem" @click="openLogin">
                <i class="bi-box-arrow-in-right"></i>
                Sign in
              </button>
              <button class="profile-menu-item" type="button" role="menuitem" @click="openSignup">
                <i class="bi-person-plus"></i>
                Create account
              </button>
            </template>

            <template v-else>
              <div class="profile-menu-divider"></div>
              <button class="profile-menu-item danger" type="button" role="menuitem" @click="logout">
                <i class="bi-box-arrow-right"></i>
                Logout
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div class="primary-nav-bar">
      <nav class="primary-nav" aria-label="Primary navigation">
        <router-link v-for="item in navItems" :key="item.to" :to="item.to" class="nav-pill">
          {{ item.label }}
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthModalStore } from '@/stores/authModal'
import { useThemeStore } from '@/stores/theme'
import { useUserStore } from '@/stores/user'

const props = defineProps<{
  logo?: string
  title: string
}>()

const authModal = useAuthModalStore()
const themeStore = useThemeStore()
const userStore = useUserStore()
const route = useRoute()
const searchQuery = ref('')

const navItems = [
  { label: 'KFLIX', to: '/' },
  { label: 'K-MOVIES', to: '/movies' },
  { label: 'K-TUBE', to: '/k-tube' },
  { label: 'K-MUSIC', to: '/music' },
  { label: 'GAMES', to: '/gaming' },
  { label: 'KFLIX LIVE', to: '/live' },
  { label: 'PPV', to: '/ppv' },
] as const

const isHome = computed(() => route.path === '/')
const routeTitle = computed(() => (route.meta.title as string | undefined) ?? props.title)
const sectionLabel = computed(() => {
  const raw = (routeTitle.value || '').trim()
  if (!raw || raw.toUpperCase() === 'KFLIX') return ''
  const withoutBrand = raw.replace(/^KFLIX\s*/i, '').trim()
  return withoutBrand || raw
})
const isLoggedIn = computed(() => Boolean(userStore.currentUser))
const isProfileMenuOpen = ref(false)
const profileWrapper = ref<HTMLElement | null>(null)

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    console.log('Searching for:', searchQuery.value)
    // Implement your search logic here
  }
}

const toggleProfileMenu = () => {
  isProfileMenuOpen.value = !isProfileMenuOpen.value
}

const closeProfileMenu = () => {
  isProfileMenuOpen.value = false
}

const openLogin = () => {
  closeProfileMenu()
  authModal.open('login')
}

const openSignup = () => {
  closeProfileMenu()
  authModal.open('signup')
}

const logout = () => {
  userStore.logout()
  closeProfileMenu()
}

const onDocumentClick = (e: MouseEvent) => {
  if (!isProfileMenuOpen.value) return
  const wrapper = profileWrapper.value
  const target = e.target as Node | null
  if (!wrapper || !target) {
    closeProfileMenu()
    return
  }
  if (!wrapper.contains(target)) closeProfileMenu()
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick)
})
</script>

<style src="@/assets/styles/PageHeader.css"></style>