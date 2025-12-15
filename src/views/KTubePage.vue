<template>
  <div class="main-content" :class="appStore.sidebarCollapsed ? 'collapsed' : 'expanded'">
    <PageHeader :logo="route.meta.logo as string" :title="route.meta.title as string" />
    
    <div class="content-section">
      <div class="empty-state">
        <i class="bi-play-btn-fill"></i>
        <h2>K-TUBE</h2>
        <p>This section is under development. Soon you'll be able to explore amazing creator content!</p>
        <router-link to="/" class="btn btn-danger btn-lg">
          <i class="bi-house-door-fill"></i> Back to Home
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/app'
import PageHeader from '@/components/layout/PageHeader.vue'

const route = useRoute()
const appStore = useAppStore()
</script>
