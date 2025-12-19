<template>
  <div class="main-content" :class="appStore.sidebarCollapsed ? 'collapsed' : 'expanded'">
    <PageHeader :logo="route.meta.logo as string" :title="route.meta.title as string" />

    <section class="landing-hero">
      <div class="landing-hero-inner">
        <div>
          <div class="landing-hero-kicker"><i class="bi-controller"></i> KFLIX PLAY</div>
          <h1 class="landing-hero-title">Play, compete, and stream your wins.</h1>
          <p class="landing-hero-subtitle">
            Discover top games, join tournaments, and watch creators live — all inside the KFLIX universe.
          </p>

          <div class="landing-hero-actions">
            <button type="button" class="btn btn-danger btn-lg">
              <i class="bi-lightning-charge-fill me-1" /> Explore games
            </button>
            <button type="button" class="btn btn-outline-light btn-lg">
              <i class="bi-trophy-fill me-1" /> Tournaments
            </button>
          </div>
        </div>

        <div class="landing-hero-stats">
          <div class="landing-hero-stat">
            <div class="landing-hero-stat-value">Top</div>
            <div class="landing-hero-stat-label">daily challenges</div>
          </div>
          <div class="landing-hero-stat">
            <div class="landing-hero-stat-value">Live</div>
            <div class="landing-hero-stat-label">creator game streams</div>
          </div>
          <div class="landing-hero-stat">
            <div class="landing-hero-stat-value">Rewards</div>
            <div class="landing-hero-stat-label">earn badges & perks</div>
          </div>
        </div>
      </div>
    </section>

    <div class="content-section">
      <SectionHeader title="Featured games" :show-view-all="true" />
      <div class="card-grid">
        <ContentCard
          v-for="game in featuredGames"
          :key="game.id"
          :title="game.title"
          :badge="game.badge"
          :meta="game.meta"
          :image-url="game.imageUrl"
        />
      </div>
    </div>

    <div class="content-section">
      <SectionHeader title="Trending creators" :show-view-all="true" />
      <div class="card-grid">
        <ContentCard
          v-for="creator in featuredCreators"
          :key="creator.id"
          :title="creator.title"
          :badge="creator.badge"
          :meta="creator.meta"
          :image-url="creator.imageUrl"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/app'
import PageHeader from '@/components/layout/PageHeader.vue'
import SectionHeader from '@/components/home/SectionHeader.vue'
import ContentCard from '@/components/home/ContentCard.vue'

const route = useRoute()
const appStore = useAppStore()

const featuredGames = [
  {
    id: 'g1',
    title: 'KFLIX Arena: Battle Royale',
    badge: 'NEW',
    meta: 'Action • 2.1M players',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800'
  },
  {
    id: 'g2',
    title: 'Street Legends Championship',
    badge: 'TOURNAMENT',
    meta: 'Sports • Starts Fri',
    imageUrl: 'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?w=800'
  },
  {
    id: 'g3',
    title: 'Puzzle City Nights',
    badge: 'CASUAL',
    meta: 'Relax • Daily rewards',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800'
  },
  {
    id: 'g4',
    title: 'Racing Underground',
    badge: 'HOT',
    meta: 'Racing • New season',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800'
  }
]

const featuredCreators = [
  {
    id: 'c1',
    title: 'Amina Plays',
    badge: 'LIVE',
    meta: 'Strategy • 18K watching',
    imageUrl: 'https://images.unsplash.com/photo-1541534401786-2077eed87a74?w=800'
  },
  {
    id: 'c2',
    title: 'KingKofi',
    badge: 'TOP',
    meta: 'FPS • 4.2M views',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800'
  },
  {
    id: 'c3',
    title: 'Nia Speedruns',
    badge: 'TRENDING',
    meta: 'Racing • 980K views',
    imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800'
  },
  {
    id: 'c4',
    title: 'ZedTheCoach',
    badge: 'TIPS',
    meta: 'Training • Pro guides',
    imageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800'
  }
]
</script>