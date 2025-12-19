<template>
  <div class="main-content" :class="appStore.sidebarCollapsed ? 'collapsed' : 'expanded'">
    <PageHeader title="K-TUBE" />

    <div class="ktube-dashboard-grid" v-if="channel">
      <aside class="ktube-dashboard-sidebar" v-if="channel">
        <img :src="channel.avatarUrl" alt="Channel avatar" class="ktube-dashboard-avatar" />
        <div class="ktube-dashboard-channel-name">{{ channel.name }}</div>
        <div class="ktube-dashboard-handle">{{ channel.handle }}</div>
        <div class="text-secondary small mb-2">
          {{ channel.category }}
        </div>

        <div class="ktube-dashboard-photo-card">
          <div class="ktube-dashboard-photo-title">Channel photo</div>
          <div class="ktube-dashboard-photo-row">
            <img :src="avatarPreviewUrl" alt="Channel photo preview" class="ktube-dashboard-photo-preview" />
            <div class="ktube-dashboard-photo-actions">
              <input
                ref="fileInputEl"
                class="ktube-dashboard-photo-file"
                type="file"
                accept="image/*"
                @change="onFileChange"
              />
              <button type="button" class="btn btn-outline-light btn-sm" @click="triggerFilePicker">
                <i class="bi-upload"></i> Upload
              </button>
            </div>
          </div>

          <div class="ktube-dashboard-photo-url">
            <input
              v-model="avatarUrlDraft"
              class="ktube-form-input"
              type="url"
              placeholder="Paste an image URL (https://...)"
              autocomplete="off"
            />
            <button type="button" class="btn btn-danger btn-sm" @click="saveAvatarUrl">
              Save
            </button>
          </div>
        </div>

        <div class="ktube-dashboard-nav">
          <button class="ktube-dashboard-nav-btn" type="button" @click="goToUpload">
            <i class="bi-cloud-upload" /> Upload video
          </button>
          <button class="ktube-dashboard-nav-btn" type="button" @click="goToLive">
            <i class="bi-broadcast-pin" /> Go live
          </button>
        </div>
      </aside>

      <main class="ktube-dashboard-main">
        <div class="ktube-stats-row">
          <div class="ktube-stat-card">
            <div class="ktube-stat-label">Subscribers</div>
            <div class="ktube-stat-value">{{ ktubeStore.totalSubscribers.toLocaleString() }}</div>
          </div>
          <div class="ktube-stat-card">
            <div class="ktube-stat-label">Channel views</div>
            <div class="ktube-stat-value">{{ ktubeStore.totalViews.toLocaleString() }}</div>
          </div>
          <div class="ktube-stat-card">
            <div class="ktube-stat-label">Estimated earnings</div>
            <div class="ktube-stat-value">${{ ktubeStore.estimatedEarnings.toFixed(2) }}</div>
          </div>
        </div>

        <div class="ktube-list-card">
          <div class="ktube-list-header">
            <h3>Your recent videos</h3>
            <button type="button" class="btn btn-outline-light btn-sm" @click="goToUpload">
              <i class="bi-plus-lg" /> New upload
            </button>
          </div>
          <table class="ktube-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Views</th>
                <th>Likes</th>
                <th>Duration</th>
                <th>Uploaded</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="video in ktubeStore.videos" :key="video.id">
                <td>{{ video.title }}</td>
                <td>{{ video.views.toLocaleString() }}</td>
                <td>{{ video.likes.toLocaleString() }}</td>
                <td>{{ video.duration }}</td>
                <td>{{ video.createdAt }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="ktube-list-card">
          <div class="ktube-list-header">
            <h3>Live & upcoming</h3>
            <button type="button" class="btn btn-outline-light btn-sm" @click="goToLive">
              <i class="bi-broadcast-pin" /> Schedule live
            </button>
          </div>
          <table class="ktube-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Topic</th>
                <th>Status</th>
                <th>When</th>
                <th>Viewers</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="session in ktubeStore.liveSessions" :key="session.id">
                <td>{{ session.title }}</td>
                <td>{{ session.gameOrTopic }}</td>
                <td>{{ session.status }}</td>
                <td>{{ session.scheduledFor }}</td>
                <td>{{ session.concurrentViewers }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>

    <div v-else class="content-section">
      <div class="empty-state">
        <i class="bi-person-video3"></i>
        <h2>Create your K‑TUBE channel</h2>
        <p>Set up your channel to upload videos, go live, and start building your audience.</p>
        <button type="button" class="btn btn-danger btn-lg" @click="isCreateModalOpen = true">
          <i class="bi-plus-lg"></i> Create channel
        </button>
      </div>
    </div>

    <CreateChannelModal v-model="isCreateModalOpen" />
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { useKTubeStore } from '@/stores/ktube'
import PageHeader from '@/components/layout/PageHeader.vue'
import CreateChannelModal from '@/components/ktube/CreateChannelModal.vue'

const appStore = useAppStore()
const ktubeStore = useKTubeStore()
const router = useRouter()
const isCreateModalOpen = ref(false)

const channel = computed(() => ktubeStore.channel)

const fileInputEl = ref<HTMLInputElement | null>(null)
const avatarPreviewUrl = ref('')
const avatarUrlDraft = ref('')
const objectUrl = ref<string | null>(null)

watch(
  channel,
  (ch) => {
    avatarPreviewUrl.value = ch?.avatarUrl ?? ''
    avatarUrlDraft.value = ch?.avatarUrl ?? ''
  },
  { immediate: true }
)

const triggerFilePicker = () => {
  fileInputEl.value?.click()
}

const onFileChange = (e: Event) => {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  if (objectUrl.value) URL.revokeObjectURL(objectUrl.value)
  objectUrl.value = URL.createObjectURL(file)
  avatarPreviewUrl.value = objectUrl.value

  const reader = new FileReader()
  reader.onload = () => {
    const result = typeof reader.result === 'string' ? reader.result : ''
    if (!result) return
    ktubeStore.updateChannelAvatar(result)
    avatarUrlDraft.value = result
  }
  reader.readAsDataURL(file)
}

const saveAvatarUrl = () => {
  if (!avatarUrlDraft.value) return
  ktubeStore.updateChannelAvatar(avatarUrlDraft.value)
  avatarPreviewUrl.value = avatarUrlDraft.value
}

onBeforeUnmount(() => {
  if (objectUrl.value) URL.revokeObjectURL(objectUrl.value)
})

const goToUpload = () => {
  router.push('/k-tube/upload')
}

const goToLive = () => {
  router.push('/k-tube/live')
}
</script>

<style scoped src="@/assets/styles/KTube.css"></style>


