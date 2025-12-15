<template>
  <div class="main-content" :class="appStore.sidebarCollapsed ? 'collapsed' : 'expanded'">
    <PageHeader :title="route.meta.title as string" />

    <div class="d-flex justify-content-end mb-3 px-3">
      <router-link to="/auth/login" class="btn btn-outline-light btn-sm">
        <i class="bi-box-arrow-in-right me-1"></i>
        Sign In
      </router-link>
    </div>

    <HeroCarousel :slides="contentStore.heroSlides" />

    <!-- Rails -->
    <div v-for="rail in rails" :key="rail.id" class="content-section">
      <SectionHeader :title="rail.title" :show-view-all="true" />

      <div class="horizontal-scroll-wrapper">
        <button
          v-if="rail.canScrollLeft"
          type="button"
          class="scroll-arrow scroll-arrow-left"
          aria-label="Scroll left"
          @click="scrollRail(rail, -1)"
        >
          <i class="bi-chevron-left"></i>
        </button>

        <div :ref="(el) => setRailEl(rail, el)" class="horizontal-scroll with-arrows draggable">
          <ContentCard
            v-for="(item, idx) in rail.items"
            :key="item.id"
            class="horizontal-card"
            :title="item.title"
            :badge="item.badge"
            :rating="item.rating"
            :meta="item.meta"
            :image-url="item.imageUrl"
            :show-chevron="rail.canScrollRight && idx === rail.lastVisibleIndex"
            @chevron="scrollRail(rail, 1)"
          />
        </div>

        <button
          v-if="rail.canScrollRight"
          type="button"
          class="scroll-arrow scroll-arrow-right"
          aria-label="Scroll right"
          @click="scrollRail(rail, 1)"
        >
          <i class="bi-chevron-right"></i>
        </button>
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
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
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

type RailId = 'trending' | 'music' | 'creators' | 'games' | 'live' | 'podcasts'
type ContentItem = {
  id: number | string
  title: string
  badge?: string
  rating?: number
  meta: string
  imageUrl: string
}

type Rail = {
  id: RailId
  title: string
  items: ContentItem[]
  el: HTMLElement | null
  canScrollLeft: boolean
  canScrollRight: boolean
  lastVisibleIndex: number
}

// Extended content
const liveStreams: ContentItem[] = [
  { id: 'l1', title: 'Global Gaming Tournament', badge: 'LIVE', meta: '45K viewers', imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400' },
  { id: 'l2', title: 'Music Festival 2024', badge: 'LIVE', meta: '125K viewers', imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400' },
  { id: 'l3', title: 'Tech Conference Keynote', badge: 'LIVE', meta: '89K viewers', imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400' },
  { id: 'l4', title: 'Cooking Masterclass', badge: 'LIVE', meta: '12K viewers', imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400' },
  { id: 'l5', title: 'Sports Championship Final', badge: 'LIVE', meta: '250K viewers', imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400' },
  { id: 'l6', title: 'Art & Design Workshop', badge: 'LIVE', meta: '8K viewers', imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400' },
  { id: 'l7', title: 'Fitness Training Session', badge: 'LIVE', meta: '22K viewers', imageUrl: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=400' },
  { id: 'l8', title: 'Comedy Show Live', badge: 'LIVE', meta: '35K viewers', imageUrl: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=400' },
]

const podcasts: ContentItem[] = [
  { id: 'p1', title: 'The Daily Tech Briefing', badge: 'NEW', meta: '1.2M subscribers', imageUrl: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400' },
  { id: 'p2', title: 'True Crime Chronicles', badge: 'TOP', meta: '2.5M subscribers', imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400' },
  { id: 'p3', title: 'Business Insider Stories', meta: '890K subscribers', imageUrl: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400' },
  { id: 'p4', title: 'Science Explained', badge: 'POPULAR', meta: '1.8M subscribers', imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400' },
  { id: 'p5', title: 'Comedy Hour Podcast', meta: '650K subscribers', imageUrl: 'https://images.unsplash.com/photo-1527224538127-2104bb696c51?w=400' },
  { id: 'p6', title: 'History Uncovered', meta: '920K subscribers', imageUrl: 'https://images.unsplash.com/photo-1461360228754-6e81c478b882?w=400' },
  { id: 'p7', title: 'Wellness & Mindfulness', badge: 'TRENDING', meta: '1.1M subscribers', imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400' },
  { id: 'p8', title: 'Sports Talk Daily', meta: '780K subscribers', imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400' },
]

const buildRail = (id: RailId, title: string, items: ContentItem[]): Rail => ({
  id,
  title,
  items,
  el: null,
  canScrollLeft: false,
  canScrollRight: false,
  lastVisibleIndex: -1
})

const rails = ref<Rail[]>([
  buildRail('trending', '🔥 Top 10 Trending Movies', contentStore.trendingMovies.map(m => ({
    id: m.id,
    title: m.title,
    badge: m.badge,
    rating: m.rating,
    meta: String(m.year),
    imageUrl: m.imageUrl
  }))),
  buildRail('music', '🎵 Trending Music', contentStore.musicPlaylists.map(p => ({
    id: p.id,
    title: p.title,
    badge: p.badge,
    meta: `${p.tracks} tracks`,
    imageUrl: p.imageUrl
  }))),
  buildRail('live', '📺 Live Now', liveStreams),
  buildRail('creators', '⭐ Popular Creators', contentStore.creators.map(c => ({
    id: c.id,
    title: c.name,
    badge: c.badge,
    meta: `${c.subscribers} subs`,
    imageUrl: c.imageUrl
  }))),
  buildRail('games', '🎮 Popular Games', contentStore.games.map(g => ({
    id: g.id,
    title: g.title,
    badge: g.badge,
    meta: `${g.players} playing`,
    imageUrl: g.imageUrl
  }))),
  buildRail('podcasts', '🎙️ Top Podcasts', podcasts),
])

const initializedRails = new Set<RailId>()
const dragCleanups: (() => void)[] = []
const scrollStateCleanups: (() => void)[] = []

const enableDragScroll = (el: HTMLElement) => {
  let isDown = false
  let startX = 0
  let startScrollLeft = 0
  let moved = false

  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    isDown = true
    moved = false
    startX = e.clientX
    startScrollLeft = el.scrollLeft
    el.classList.add('dragging')
    el.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: PointerEvent) => {
    if (!isDown) return
    e.preventDefault()
    const dx = e.clientX - startX
    if (Math.abs(dx) > 6) moved = true
    el.scrollLeft = startScrollLeft - dx
  }

  const stop = (e: PointerEvent) => {
    if (!isDown) return
    isDown = false
    el.classList.remove('dragging')
    try {
      el.releasePointerCapture(e.pointerId)
    } catch {}
  }

  const onClickCapture = (e: MouseEvent) => {
    if (!moved) return
    e.preventDefault()
    e.stopPropagation()
    moved = false
  }

  el.addEventListener('pointerdown', onPointerDown)
  el.addEventListener('pointermove', onPointerMove)
  el.addEventListener('pointerup', stop)
  el.addEventListener('pointercancel', stop)
  el.addEventListener('pointerleave', stop)
  el.addEventListener('click', onClickCapture, true)

  dragCleanups.push(() => {
    el.removeEventListener('pointerdown', onPointerDown)
    el.removeEventListener('pointermove', onPointerMove)
    el.removeEventListener('pointerup', stop)
    el.removeEventListener('pointercancel', stop)
    el.removeEventListener('pointerleave', stop)
    el.removeEventListener('click', onClickCapture, true)
  })
}

const setupRailRuntime = (rail: Rail, el: HTMLElement) => {
  enableDragScroll(el)

  const update = () => updateScrollButtons(rail)
  update()
  el.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update)

  scrollStateCleanups.push(() => {
    el.removeEventListener('scroll', update)
    window.removeEventListener('resize', update)
    initializedRails.delete(rail.id)
  })
}

const setRailEl = (rail: Rail, el: Element | null) => {
  if (!el) {
    rail.el = null
    rail.canScrollLeft = false
    rail.canScrollRight = false
    rail.lastVisibleIndex = -1
    return
  }

  const node = el as HTMLElement
  rail.el = node

  if (!initializedRails.has(rail.id)) {
    initializedRails.add(rail.id)
    setupRailRuntime(rail, node)
  }

  scheduleUpdate()
}

const scrollRail = (rail: Rail, direction: -1 | 1) => {
  const el = rail.el
  if (!el) return

  const style = window.getComputedStyle(el)
  const gap = Number.parseFloat(style.columnGap || style.gap || '0') || 0
  const firstChild = el.firstElementChild as HTMLElement | null
  const cardWidth = firstChild ? firstChild.getBoundingClientRect().width : 0
  const step = cardWidth > 0 ? Math.round(cardWidth + gap) : 0
  const amount = step > 0 ? Math.max(step * 5, Math.floor(el.clientWidth * 0.9)) : Math.floor(el.clientWidth * 0.9)

  if (typeof el.scrollBy === 'function') {
    try {
      el.scrollBy({ left: direction * amount, behavior: 'smooth' })
      return
    } catch {}
  }

  el.scrollLeft += direction * amount
}

const updateScrollButtons = (rail: Rail) => {
  const el = rail.el
  if (!el) {
    rail.canScrollLeft = false
    rail.canScrollRight = false
    rail.lastVisibleIndex = -1
    return
  }

  const epsilon = 2
  const maxScrollLeft = el.scrollWidth - el.clientWidth
  rail.canScrollLeft = maxScrollLeft > epsilon && el.scrollLeft > epsilon
  rail.canScrollRight = maxScrollLeft > epsilon && el.scrollLeft < maxScrollLeft - epsilon

  if (!rail.canScrollRight) {
    rail.lastVisibleIndex = -1
    return
  }

  const children = Array.from(el.children) as HTMLElement[]
  if (children.length === 0) {
    rail.lastVisibleIndex = -1
    return
  }

  const leftEdge = el.scrollLeft
  const rightEdge = el.scrollLeft + el.clientWidth

  let lastFullyVisible = -1
  for (let i = 0; i < children.length; i++) {
    const child = children[i]
    const childLeft = child.offsetLeft
    const childRight = childLeft + child.offsetWidth
    if (childLeft >= leftEdge - 2 && childRight <= rightEdge + 2) {
      lastFullyVisible = i
    }
  }

  if (lastFullyVisible !== -1) {
    rail.lastVisibleIndex = lastFullyVisible
    return
  }

  let lastPartiallyVisible = -1
  for (let i = 0; i < children.length; i++) {
    const child = children[i]
    const childLeft = child.offsetLeft
    const childRight = childLeft + child.offsetWidth
    if (childLeft < rightEdge && childRight > leftEdge) {
      lastPartiallyVisible = i
    }
  }

  rail.lastVisibleIndex = lastPartiallyVisible
}

const scheduleUpdate = async () => {
  await nextTick()
  for (const rail of rails.value) updateScrollButtons(rail)

  if (typeof window === 'undefined') return
  if (typeof window.requestAnimationFrame === 'function') {
    window.requestAnimationFrame(() => {
      for (const rail of rails.value) updateScrollButtons(rail)
    })
  }
  window.setTimeout(() => {
    for (const rail of rails.value) updateScrollButtons(rail)
  }, 200)
  window.setTimeout(() => {
    for (const rail of rails.value) updateScrollButtons(rail)
  }, 800)
}

onMounted(() => {
  scheduleUpdate()

  if (typeof window !== 'undefined') {
    const onLoad = () => scheduleUpdate()
    window.addEventListener('load', onLoad)
    scrollStateCleanups.push(() => window.removeEventListener('load', onLoad))
  }
})

watch(
  () => appStore.sidebarCollapsed,
  () => scheduleUpdate()
)

watch(
  () => [
    contentStore.trendingMovies.length,
    contentStore.musicPlaylists.length,
    contentStore.creators.length,
    contentStore.games.length
  ],
  () => scheduleUpdate()
)

onUnmounted(() => {
  for (const cleanup of dragCleanups) cleanup()
  dragCleanups.length = 0

  for (const cleanup of scrollStateCleanups) cleanup()
  scrollStateCleanups.length = 0
})
</script>