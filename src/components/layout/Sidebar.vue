<template>
  <div :class="['sidebar', appStore.sidebarCollapsed ? 'collapsed' : 'expanded']">
    <nav class="nav-items">
      <router-link
        v-for="route in navRoutes"
        :key="route.id"
        :to="route.path"
        class="nav-item"
      >
        <i :class="route.icon"></i>
        <span class="nav-label">{{ route.name }}</span>
      </router-link>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/app'
import type { NavRoute } from '@/types'

const appStore = useAppStore()
const route = useRoute()

const navRoutes: NavRoute[] = [
  { id: 'home', name: 'Home', icon: 'bi-house-door-fill', path: '/' },
  { id: 'movies', name: 'Movies', icon: 'bi-film', path: '/movies' },
  { id: 'music', name: 'Music', icon: 'bi-music-note-beamed', path: '/music' },
  { id: 'ktube', name: 'K-Tube', icon: 'bi-play-btn-fill', path: '/k-tube' },
  { id: 'gaming', name: 'Gaming', icon: 'bi-controller', path: '/gaming' },
  { id: 'store', name: 'Store', icon: 'bi-shop', path: '/store' }
]

const currentTitle = computed(() => route.meta.title as string || 'KFLIX')
</script>