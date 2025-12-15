<template>
  <div class="hero-carousel">
    <div class="carousel-inner">
      <div
        v-for="(slide, index) in slides"
        :key="slide.id"
        :class="['carousel-item', { active: index === currentIndex }]"
        :style="{ display: index === currentIndex ? 'block' : 'none' }"
      >
        <div class="carousel-slide" :style="{ backgroundImage: `url(${slide.imageUrl})` }">
          <div class="carousel-overlay">
            <span class="badge bg-danger mb-3">{{ slide.badge }}</span>
            <h2 class="carousel-title">{{ slide.title }}</h2>
            <p class="carousel-description">{{ slide.description }}</p>
            <div class="carousel-buttons">
              <button class="btn btn-danger btn-lg">
                <i class="bi-play-fill"></i> Watch Now
              </button>
              <button class="btn btn-outline-light btn-lg" type="button" @click="openInfo(slide)">
                <i class="bi-info-circle"></i> More Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <button class="carousel-control carousel-control-prev" @click="prevSlide">
      <i class="bi-chevron-left"></i>
    </button>
    <button class="carousel-control carousel-control-next" @click="nextSlide">
      <i class="bi-chevron-right"></i>
    </button>
  </div>

  <teleport to="body">
    <div
      v-if="isInfoOpen && selectedSlide"
      class="kflix-preview-backdrop"
      role="presentation"
      @click="closeInfo"
    >
      <div class="kflix-preview-modal" role="dialog" aria-modal="true" @click.stop>
        <button
          type="button"
          class="kflix-preview-close"
          aria-label="Close"
          @click="closeInfo"
        >
          <i class="bi-x-lg"></i>
        </button>

        <div class="kflix-preview-hero" :style="{ backgroundImage: `url(${selectedSlide.imageUrl})` }">
          <div class="kflix-preview-hero-overlay">
            <span class="badge bg-danger mb-2">{{ selectedSlide.badge }}</span>
            <h3 class="kflix-preview-title">{{ selectedSlide.title }}</h3>
            <p class="kflix-preview-description">{{ selectedSlide.description }}</p>
            <button type="button" class="btn btn-outline-light btn-sm" @click="closeInfo">
              <i class="bi-arrow-left"></i> Back
            </button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import type { HeroSlide } from '@/types'

const props = defineProps<{
  slides: HeroSlide[]
}>()

const currentIndex = ref(0)
let intervalId: number

const selectedSlide = ref<HeroSlide | null>(null)
const isInfoOpen = ref(false)

const openInfo = (slide: HeroSlide) => {
  selectedSlide.value = slide
  isInfoOpen.value = true
}

const closeInfo = () => {
  isInfoOpen.value = false
}

const onKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') closeInfo()
}

watch(isInfoOpen, (open) => {
  if (typeof window === 'undefined') return
  if (open) {
    window.addEventListener('keydown', onKeyDown)
  } else {
    window.removeEventListener('keydown', onKeyDown)
  }
})

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % props.slides.length
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + props.slides.length) % props.slides.length
}

onMounted(() => {
  intervalId = window.setInterval(nextSlide, 5000)
})

onUnmounted(() => {
  clearInterval(intervalId)
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', onKeyDown)
  }
})
</script>