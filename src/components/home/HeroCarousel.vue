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
              <button class="btn btn-outline-light btn-lg">
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
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { HeroSlide } from '@/types'

const props = defineProps<{
  slides: HeroSlide[]
}>()

const currentIndex = ref(0)
let intervalId: number

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
})
</script>