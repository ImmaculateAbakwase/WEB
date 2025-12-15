<template>
  <div class="main-content" :class="appStore.sidebarCollapsed ? 'collapsed' : 'expanded'">
    <PageHeader :title="route.meta.title as string" />

    <div class="d-flex justify-content-end mb-3">
      <router-link to="/auth/login" class="btn btn-outline-light btn-sm">
        <i class="bi-box-arrow-in-right me-1"></i>
        Sign In
      </router-link>
    </div>

    <HeroCarousel :slides="contentStore.heroSlides" />

    <!-- Top 10 Trending Movies -->
    <div class="content-section">
      <SectionHeader 
        title="Top 10 Trending Movies" 
        icon="bi-fire" 
        :show-view-all="true"
      />
      <div class="card-grid">
        <ContentCard
          v-for="movie in contentStore.trendingMovies"
          :key="movie.id"
          :title="movie.title"
          :badge="movie.badge"
          :rating="movie.rating"
          :meta="String(movie.year)"
          :image-url="movie.imageUrl"
        />
      </div>
    </div>

    <!-- Music Section -->
    <div class="content-section">
      <SectionHeader 
        title="Trending Music" 
        icon="bi-music-note-beamed" 
        :show-view-all="true"
      />
      <div class="horizontal-scroll">
        <ContentCard
          v-for="playlist in contentStore.musicPlaylists"
          :key="playlist.id"
          class="horizontal-card"
          :title="playlist.title"
          :badge="playlist.badge"
          :meta="`${playlist.tracks} tracks`"
          :image-url="playlist.imageUrl"
          icon="bi-music-note-list"
        />
      </div>
    </div>

    <!-- K-Tube Creators -->
    <div class="content-section">
      <SectionHeader 
        title="Popular Creators" 
        icon="bi-play-btn-fill" 
        :show-view-all="true"
      />
      <div class="horizontal-scroll">
        <ContentCard
          v-for="creator in contentStore.creators"
          :key="creator.id"
          class="horizontal-card"
          :title="creator.name"
          :badge="creator.badge"
          :meta="`${creator.subscribers} subs`"
          :image-url="creator.imageUrl"
          icon="bi-person-circle"
        />
      </div>
    </div>

    <!-- Gaming Section -->
    <div class="content-section">
      <SectionHeader 
        title="Popular Games" 
        icon="bi-controller" 
        :show-view-all="true"
      />
      <div class="horizontal-scroll">
        <ContentCard
          v-for="game in contentStore.games"
          :key="game.id"
          class="horizontal-card"
          :title="game.title"
          :badge="game.badge"
          :meta="`${game.players} playing`"
          :image-url="game.imageUrl"
          icon="bi-joystick"
        />
      </div>
    </div>

    <!-- Stats Section -->
    <div class="content-section">
      <div class="stats-grid">
        <div class="stat-card red">
          <div class="stat-value">1.2M+</div>
          <div class="stat-label">Active Users</div>
        </div>
        <div class="stat-card blue">
          <div class="stat-value">50K+</div>
          <div class="stat-label">Content Creators</div>
        </div>
        <div class="stat-card green">
          <div class="stat-value">10M+</div>
          <div class="stat-label">Hours Watched</div>
        </div>
        <div class="stat-card purple">
          <div class="stat-value">500+</div>
          <div class="stat-label">Live Events</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { useContentStore } from '@/stores/content'
import PageHeader from '@/components/layout/PageHeader.vue'
import HeroCarousel from '@/components/home/HeroCarousel.vue'
import SectionHeader from '@/components/home/SectionHeader.vue'
import ContentCard from '@/components/home/ContentCard.vue'

const route = useRoute()
const appStore = useAppStore()
const contentStore = useContentStore()
</script>