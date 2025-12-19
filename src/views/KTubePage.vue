<template>
  <div class="main-content" :class="appStore.sidebarCollapsed ? 'collapsed' : 'expanded'">
    <PageHeader :title="route.meta.title as string" />

    <div class="ktube-layout">
      <section class="ktube-hero">
        <div>
          <h1 class="ktube-hero-main-title">Create. Stream. Earn on K‑TUBE.</h1>
          <p class="ktube-hero-subtitle">
            Launch your own channel, upload videos, go live to your audience, and grow your earnings
            across KFLIX movies, music, and games.
          </p>

          <div class="ktube-hero-actions">
            <button
              class="btn btn-danger btn-lg"
              type="button"
              @click="goPrimaryCta"
            >
              <i class="bi-play-btn-fill me-1" />
              {{ primaryCtaLabel }}
            </button>
            <button
              v-if="hasChannel"
              class="btn btn-outline-light btn-lg"
              type="button"
              @click="goToDashboard"
            >
              <i class="bi-speedometer2 me-1" />
              Creator dashboard
            </button>
          </div>

          <div class="ktube-hero-chip-row">
            <span class="ktube-hero-chip">Ad‑revenue share</span>
            <span class="ktube-hero-chip">Live tips</span>
            <span class="ktube-hero-chip">Channel memberships</span>
          </div>
        </div>

        <div class="ktube-hero-panel">
          <div class="ktube-hero-panel-title">Why creators love K‑TUBE</div>
          <div class="d-flex justify-content-between align-items-end">
            <div>
              <div class="ktube-hero-panel-metric">+125%</div>
              <div class="ktube-hero-panel-caption">Avg. year‑over‑year view growth</div>
            </div>
            <div class="text-end">
              <div class="ktube-hero-panel-metric">24 / 7</div>
              <div class="ktube-hero-panel-caption">Live streaming with ultra low‑latency</div>
            </div>
          </div>
        </div>
      </section>

      <section class="content-section">
        <SectionHeader title="🔥 Trending K‑TUBE Channels" :show-view-all="true" />
        <div class="horizontal-scroll-wrapper">
          <button
            v-if="featuredRail.canScrollLeft"
            type="button"
            class="scroll-arrow scroll-arrow-left"
            aria-label="Scroll left"
            @click="scrollRail(featuredRail, -1)"
          >
            <i class="bi-chevron-left"></i>
          </button>

          <div :ref="(el) => setRailEl(featuredRail, el)" class="horizontal-scroll with-arrows draggable">
            <ContentCard
              v-for="(creator, idx) in featuredCreators"
              :key="creator.id"
              class="horizontal-card"
              :title="creator.name"
              :badge="creator.badge"
              :meta="creator.meta"
              :image-url="creator.imageUrl"
              :show-chevron="featuredRail.canScrollRight && idx === featuredRail.lastVisibleIndex"
              @chevron="scrollRail(featuredRail, 1)"
            />
          </div>

          <button
            v-if="featuredRail.canScrollRight"
            type="button"
            class="scroll-arrow scroll-arrow-right"
            aria-label="Scroll right"
            @click="scrollRail(featuredRail, 1)"
          >
            <i class="bi-chevron-right"></i>
          </button>
        </div>
      </section>

      <section class="content-section">
        <SectionHeader title="📺 Live & Premieres" :show-view-all="true" />
        <div class="horizontal-scroll-wrapper">
          <button
            v-if="premieresRail.canScrollLeft"
            type="button"
            class="scroll-arrow scroll-arrow-left"
            aria-label="Scroll left"
            @click="scrollRail(premieresRail, -1)"
          >
            <i class="bi-chevron-left"></i>
          </button>

          <div :ref="(el) => setRailEl(premieresRail, el)" class="horizontal-scroll with-arrows draggable">
            <ContentCard
              v-for="(item, idx) in liveAndPremieres"
              :key="item.id"
              class="horizontal-card"
              :title="item.title"
              :badge="item.badge"
              :meta="item.meta"
              :image-url="item.imageUrl"
              :show-chevron="premieresRail.canScrollRight && idx === premieresRail.lastVisibleIndex"
              @chevron="scrollRail(premieresRail, 1)"
            />
          </div>

          <button
            v-if="premieresRail.canScrollRight"
            type="button"
            class="scroll-arrow scroll-arrow-right"
            aria-label="Scroll right"
            @click="scrollRail(premieresRail, 1)"
          >
            <i class="bi-chevron-right"></i>
          </button>
        </div>
      </section>
    </div>

    <CreateChannelModal v-model="isCreateModalOpen" />
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { useKTubeStore } from '@/stores/ktube'
import PageHeader from '@/components/layout/PageHeader.vue'
import SectionHeader from '@/components/home/SectionHeader.vue'
import ContentCard from '@/components/home/ContentCard.vue'
import CreateChannelModal from '@/components/ktube/CreateChannelModal.vue'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const ktubeStore = useKTubeStore()

const isCreateModalOpen = ref(false)

type Rail = {
  id: 'featured' | 'premieres'
  el: HTMLElement | null
  canScrollLeft: boolean
  canScrollRight: boolean
  lastVisibleIndex: number
}

const featuredRail = reactive<Rail>({
  id: 'featured',
  el: null,
  canScrollLeft: false,
  canScrollRight: false,
  lastVisibleIndex: -1,
})

const premieresRail = reactive<Rail>({
  id: 'premieres',
  el: null,
  canScrollLeft: false,
  canScrollRight: false,
  lastVisibleIndex: -1,
})

const initializedRails = new Set<Rail['id']>()
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

  const onWheel = (e: WheelEvent) => {
    const hasOverflow = el.scrollWidth > el.clientWidth + 1
    if (!hasOverflow) return
    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return
    e.preventDefault()
    el.scrollLeft += e.deltaY
  }

  el.addEventListener('pointerdown', onPointerDown)
  el.addEventListener('pointermove', onPointerMove)
  el.addEventListener('pointerup', stop)
  el.addEventListener('pointercancel', stop)
  el.addEventListener('pointerleave', stop)
  el.addEventListener('click', onClickCapture, true)
  el.addEventListener('wheel', onWheel, { passive: false })

  dragCleanups.push(() => {
    el.removeEventListener('pointerdown', onPointerDown)
    el.removeEventListener('pointermove', onPointerMove)
    el.removeEventListener('pointerup', stop)
    el.removeEventListener('pointercancel', stop)
    el.removeEventListener('pointerleave', stop)
    el.removeEventListener('click', onClickCapture, true)
    el.removeEventListener('wheel', onWheel as any)
  })
}

const updateScrollButtons = (rail: Rail) => {
  const el = rail.el
  if (!el) {
    rail.canScrollLeft = false
    rail.canScrollRight = false
    rail.lastVisibleIndex = -1
    return
  }

  const threshold = 4
  const hasOverflow = el.scrollWidth > el.clientWidth + threshold
  rail.canScrollLeft = hasOverflow && el.scrollLeft > threshold
  rail.canScrollRight = hasOverflow && el.scrollLeft + el.clientWidth < el.scrollWidth - threshold

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

const setupRailRuntime = (rail: Rail, el: HTMLElement) => {
  enableDragScroll(el)

  const update = () => updateScrollButtons(rail)
  update()
  el.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update)

  let resizeObserver: ResizeObserver | null = null
  if (typeof window !== 'undefined' && 'ResizeObserver' in window) {
    resizeObserver = new ResizeObserver(() => update())
    resizeObserver.observe(el)
  }

  const imageCleanups: (() => void)[] = []
  const images = Array.from(el.querySelectorAll('img'))
  for (const img of images) {
    const onImg = () => update()
    if (!img.complete) {
      img.addEventListener('load', onImg, { once: true })
      img.addEventListener('error', onImg, { once: true })
      imageCleanups.push(() => {
        img.removeEventListener('load', onImg)
        img.removeEventListener('error', onImg)
      })
    }
  }

  let settleInterval: number | null = null
  if (typeof window !== 'undefined') {
    let ticks = 0
    settleInterval = window.setInterval(() => {
      update()
      ticks += 1
      if (ticks > 16 && settleInterval) {
        window.clearInterval(settleInterval)
        settleInterval = null
      }
    }, 250)
  }

  scrollStateCleanups.push(() => {
    el.removeEventListener('scroll', update)
    window.removeEventListener('resize', update)
    if (resizeObserver) resizeObserver.disconnect()
    for (const cleanup of imageCleanups) cleanup()
    if (settleInterval) window.clearInterval(settleInterval)
    initializedRails.delete(rail.id)
  })
}

const setRailEl = (rail: Rail, el: any) => {
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
}

const scrollRail = (rail: Rail, direction: -1 | 1) => {
  const el = rail.el
  if (!el) return

  const style = window.getComputedStyle(el)
  const gap = Number.parseFloat((style as any).columnGap || (style as any).gap || '0') || 0
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

const hasChannel = computed(() => ktubeStore.hasChannel)

const primaryCtaLabel = computed(() =>
  hasChannel.value ? 'Upload your next video' : 'Create your channel'
)

const goPrimaryCta = () => {
  if (hasChannel.value) {
    router.push('/k-tube/upload')
  } else {
    isCreateModalOpen.value = true
  }
}

const goToDashboard = () => {
  router.push('/k-tube/dashboard')
}

const scheduleUpdate = async () => {
  await nextTick()
  updateScrollButtons(featuredRail)
  updateScrollButtons(premieresRail)

  if (typeof window === 'undefined') return
  if (typeof window.requestAnimationFrame === 'function') {
    window.requestAnimationFrame(() => {
      updateScrollButtons(featuredRail)
      updateScrollButtons(premieresRail)
    })
  }
  window.setTimeout(() => {
    updateScrollButtons(featuredRail)
    updateScrollButtons(premieresRail)
  }, 200)
  window.setTimeout(() => {
    updateScrollButtons(featuredRail)
    updateScrollButtons(premieresRail)
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

onUnmounted(() => {
  for (const cleanup of dragCleanups) cleanup()
  dragCleanups.length = 0

  for (const cleanup of scrollStateCleanups) cleanup()
  scrollStateCleanups.length = 0
})

const featuredCreators = [
  {
    id: 'c1',
    name: 'AfroGroove TV',
    badge: 'MUSIC',
    meta: '245K subscribers',
    imageUrl: 'https://images.unsplash.com/photo-1520454125516-134a66d9bf3f?w=800'
  },
  {
    id: 'c2',
    name: 'Game Night Africa',
    badge: 'GAMING',
    meta: '180K subscribers',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800'
  },
  {
    id: 'c3',
    name: 'Urban Stories',
    badge: 'STORYTELLING',
    meta: '96K subscribers',
    imageUrl: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=800'
  },
  {
    id: 'c4',
    name: 'Tech Deep Dive',
    badge: 'PODCAST',
    meta: '72K subscribers',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800'
  }
]

const liveAndPremieres = [
  {
    id: 'lp1',
    title: 'Live: Afrobeats Block Party',
    badge: 'LIVE',
    meta: '32K watching',
    imageUrl: 'https://images.unsplash.com/photo-1526481280695-3c687fd543c0?w=800'
  },
  {
    id: 'lp2',
    title: 'Premiere: Gaming Highlights 2025',
    badge: 'PREMIERE',
    meta: 'Starts in 2h',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800'
  },
  {
    id: 'lp3',
    title: 'Storytime Live from the Village',
    badge: 'LIVE',
    meta: '9K watching',
    imageUrl: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800'
  }
]
</script>

<style scoped src="@/assets/styles/KTube.css"></style>


