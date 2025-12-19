<template>
  <div class="main-content" :class="appStore.sidebarCollapsed ? 'collapsed' : 'expanded'">
    <PageHeader title="K-TUBE" />

    <form class="ktube-live-form" @submit.prevent="handleSchedule">
      <h2 class="mb-3">Set up your live stream</h2>

      <div class="ktube-form-row">
        <label class="ktube-form-label" for="liveTitle">Title</label>
        <input
          id="liveTitle"
          v-model="title"
          class="ktube-form-input"
          type="text"
          required
          placeholder="Live: Gaming night with the community"
        />
      </div>

      <div class="ktube-form-row">
        <label class="ktube-form-label" for="topic">Game / topic</label>
        <input
          id="topic"
          v-model="gameOrTopic"
          class="ktube-form-input"
          type="text"
          required
          placeholder="e.g. Valorant, Music requests, Storytelling"
        />
      </div>

      <div class="ktube-form-row">
        <label class="ktube-form-label" for="schedule">When</label>
        <input
          id="schedule"
          v-model="scheduledFor"
          class="ktube-form-input"
          type="text"
          required
          placeholder="Today • 20:00"
        />
        <p class="ktube-form-help">
          For demo, this is a text field – in production this would be a date/time picker.
        </p>
      </div>

      <div class="ktube-form-row">
        <label class="ktube-form-label">Stream key</label>
        <input
          class="ktube-form-input"
          type="text"
          readonly
          value="kflix_live_demo_key_1234"
        />
        <p class="ktube-form-help">Use this key in your streaming software (OBS, etc.).</p>
      </div>

      <div class="ktube-form-actions">
        <button type="button" class="btn btn-outline-light btn-sm" @click="goBack">
          Cancel
        </button>
        <button type="submit" class="btn btn-danger btn-sm">
          Save & return to dashboard
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
const gameOrTopic = ref('')
const scheduledFor = ref('Tonight • 20:00')

const handleSchedule = () => {
  if (!title.value || !gameOrTopic.value || !scheduledFor.value) return

  ktubeStore.scheduleLive({
    title: title.value,
    gameOrTopic: gameOrTopic.value,
    scheduledFor: scheduledFor.value
  })

  router.push('/k-tube/dashboard')
}

const goBack = () => {
  router.push('/k-tube/dashboard')
}
</script>

<style scoped src="@/assets/styles/KTube.css"></style>


