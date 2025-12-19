<template>
  <div class="main-content" :class="appStore.sidebarCollapsed ? 'collapsed' : 'expanded'">
    <PageHeader title="K-TUBE" />

    <form class="ktube-upload-form" @submit.prevent="handleUpload">
      <h2 class="mb-3">Upload a new video</h2>

      <div class="ktube-form-row">
        <label class="ktube-form-label" for="title">Title</label>
        <input
          id="title"
          v-model="title"
          class="ktube-form-input"
          type="text"
          required
          placeholder="My first K‑TUBE upload"
        />
      </div>

      <div class="ktube-form-row">
        <label class="ktube-form-label" for="thumbnail">Thumbnail URL</label>
        <input
          id="thumbnail"
          v-model="thumbnailUrl"
          class="ktube-form-input"
          type="url"
          required
          placeholder="https://..."
        />
      </div>

      <div class="ktube-form-row">
        <label class="ktube-form-label" for="duration">Duration</label>
        <input
          id="duration"
          v-model="duration"
          class="ktube-form-input"
          type="text"
          required
          placeholder="08:24"
        />
        <p class="ktube-form-help">For demo purposes, this is a text field – in production this comes from the video file.</p>
      </div>

      <div class="ktube-form-row">
        <label class="ktube-form-label" for="description">Description</label>
        <textarea
          id="description"
          v-model="description"
          class="ktube-form-textarea"
          placeholder="Tell viewers what this video is about..."
        />
      </div>

      <div class="ktube-form-actions">
        <button type="button" class="btn btn-outline-light btn-sm" @click="goBack">
          Cancel
        </button>
        <button type="submit" class="btn btn-danger btn-sm">
          Publish
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { useKTubeStore } from '@/stores/ktube'
import PageHeader from '@/components/layout/PageHeader.vue'

const appStore = useAppStore()
const ktubeStore = useKTubeStore()
const router = useRouter()

const title = ref('')
const thumbnailUrl = ref('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800')
const duration = ref('08:24')
const description = ref('')

const handleUpload = () => {
  if (!title.value || !thumbnailUrl.value || !duration.value) return

  ktubeStore.addVideo({
    title: title.value,
    thumbnailUrl: thumbnailUrl.value,
    duration: duration.value
  })

  router.push('/k-tube/dashboard')
}

const goBack = () => {
  router.push('/k-tube/dashboard')
}
</script>

<style scoped src="@/assets/styles/KTube.css"></style>


