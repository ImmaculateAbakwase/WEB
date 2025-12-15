<template>
  <div class="section-header">
    <h2 class="section-title">
      <i v-if="icon" :class="icon"></i> {{ title }}
    </h2>
    <a v-if="showViewAll" href="#" class="view-all" @click.prevent="$emit('view-all')">
      View All <i class="bi-arrow-right"></i>
    </a>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  icon?: string
  showViewAll?: boolean
}>()

defineEmits<{
  'view-all': []
}>()
</script>