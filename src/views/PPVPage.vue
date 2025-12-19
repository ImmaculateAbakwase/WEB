<template>
  <div class="main-content" :class="appStore.sidebarCollapsed ? 'collapsed' : 'expanded'">
    <PageHeader :logo="route.meta.logo as string" :title="route.meta.title as string" />

    <section class="landing-hero">
      <div class="landing-hero-inner">
        <div>
          <div class="landing-hero-kicker"><i class="bi-ticket-perforated"></i> Pay‑Per‑View</div>
          <h1 class="landing-hero-title">Premium premieres. One‑time access.</h1>
          <p class="landing-hero-subtitle">
            Rent new releases, exclusive events, and special screenings — crystal clear streaming with a
            simple checkout.
          </p>

          <div class="landing-hero-actions">
            <button type="button" class="btn btn-danger btn-lg">
              <i class="bi-bag-check-fill me-1" /> Browse premieres
            </button>
            <button type="button" class="btn btn-outline-light btn-lg">
              <i class="bi-shield-check me-1" /> How PPV works
            </button>
          </div>
        </div>

        <div class="landing-hero-stats">
          <div class="landing-hero-stat">
            <div class="landing-hero-stat-value">HD</div>
            <div class="landing-hero-stat-label">crystal clear streaming</div>
          </div>
          <div class="landing-hero-stat">
            <div class="landing-hero-stat-value">24h</div>
            <div class="landing-hero-stat-label">watch window access</div>
          </div>
          <div class="landing-hero-stat">
            <div class="landing-hero-stat-value">Secure</div>
            <div class="landing-hero-stat-label">protected checkout</div>
          </div>
        </div>
      </div>
    </section>

    <div class="content-section">
      <SectionHeader title="Pay-Per-View Premieres" :show-view-all="false" />

      <div class="horizontal-scroll-wrapper">
        <button
          v-if="rail.canScrollLeft"
          type="button"
          class="scroll-arrow scroll-arrow-left"
          aria-label="Scroll left"
          @click="scrollRail(-1)"
        >
          <i class="bi-chevron-left"></i>
        </button>

        <div ref="setRailEl" class="horizontal-scroll with-arrows draggable">
          <ContentCard
            v-for="(item, idx) in ppvItems"
            :key="item.id"
            class="movie-rail-card"
            :title="item.title"
            :badge="item.badge"
            :rating="item.rating"
            :meta="item.meta"
            :image-url="item.imageUrl"
            :show-chevron="rail.canScrollRight && idx === rail.lastVisibleIndex"
            @chevron="scrollRail(1)"
          />
        </div>

        <button
          v-if="rail.canScrollRight"
          type="button"
          class="scroll-arrow scroll-arrow-right"
          aria-label="Scroll right"
          @click="scrollRail(1)"
        >
          <i class="bi-chevron-right"></i>
        </button>
      </div>

      <div class="stats-grid">
        <div class="stat-card purple">
          <div class="stat-value">HD</div>
          <div class="stat-label">Crystal clear streaming</div>
        </div>
        <div class="stat-card red">
          <div class="stat-value">24h</div>
          <div class="stat-label">Watch window access</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/app'
import PageHeader from '@/components/layout/PageHeader.vue'
import SectionHeader from '@/components/home/SectionHeader.vue'
import ContentCard from '@/components/home/ContentCard.vue'

const route = useRoute()
const appStore = useAppStore()

type Rail = {
  el: HTMLElement | null
  canScrollLeft: boolean
  canScrollRight: boolean
  lastVisibleIndex: number
}

const rail = reactive<Rail>({
  el: null,
  canScrollLeft: false,
  canScrollRight: false,
  lastVisibleIndex: -1,
})

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

const updateScrollButtons = () => {
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

const setupRailRuntime = (el: HTMLElement) => {
  enableDragScroll(el)

  const update = () => updateScrollButtons()
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
  })
}

const setRailEl = (el: HTMLElement | null) => {
  if (!el) return
  rail.el = el
  setupRailRuntime(el)
}

const scrollRail = (direction: -1 | 1) => {
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

const scheduleUpdate = async () => {
  await nextTick()
  updateScrollButtons()

  if (typeof window === 'undefined') return
  if (typeof window.requestAnimationFrame === 'function') {
    window.requestAnimationFrame(() => updateScrollButtons())
  }
  window.setTimeout(() => updateScrollButtons(), 200)
  window.setTimeout(() => updateScrollButtons(), 800)
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

const ppvItems = [
  {
    id: 1,
    title: 'Championship Boxing Night',
    badge: 'PPV',
    rating: 9.1,
    meta: 'Live Sat • Sports',
    imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800'
  },
  {
    id: 2,
    title: 'Exclusive Movie Premiere',
    badge: 'PREMIERE',
    rating: 8.7,
    meta: 'Tonight • Action',
    imageUrl: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=800'
  },
  {
    id: 3,
    title: 'Music Mega Concert',
    badge: 'LIVE',
    rating: 8.9,
    meta: 'Sun • Music',
    imageUrl: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d4?w=800'
  }
]
</script>


