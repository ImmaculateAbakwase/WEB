<template>
  <div class="content-card" @click="handleClick">
    <div class="card-image">
      <img v-if="imageUrl" :src="imageUrl" :alt="title" draggable="false" />
      <div v-else class="card-placeholder" :style="{ background: randomGradient }">
        <i v-if="icon" :class="icon" class="card-icon"></i>
      </div>
      <span v-if="badge" class="card-badge">{{ badge }}</span>
      <button
        v-if="showChevron"
        type="button"
        class="card-chevron"
        aria-label="Scroll"
        @pointerdown.stop
        @click.stop="handleChevronClick"
      >
        <i class="bi-chevron-right"></i>
      </button>
    </div>
    <div class="card-content">
      <div class="card-title" :title="title">{{ title }}</div>
      <div class="card-meta">
        <span v-if="rating">
          <i class="bi-star-fill text-warning"></i> {{ rating }}
        </span>
        <span v-if="meta">{{ meta }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineProps<{
  title: string
  badge?: string
  rating?: number
  meta?: string
  icon?: string
  imageUrl?: string
  showChevron?: boolean
}>()

const emit = defineEmits<{
  click: []
  chevron: []
}>()

const randomGradient = computed(() => {
  const colors = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
  ]
  return colors[Math.floor(Math.random() * colors.length)]
})

const handleClick = () => {
  emit('click')
}

const handleChevronClick = () => {
  emit('chevron')
}
</script>