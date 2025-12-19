<template>
  <teleport to="body">
    <div v-if="modelValue" class="ktube-modal-backdrop" @click.self="close">
      <div class="ktube-modal" role="dialog" aria-modal="true">
        <div class="ktube-modal-header">
          <div>
            <div class="ktube-modal-title">Create your K‑TUBE channel</div>
            <div class="ktube-modal-subtitle">Set up your creator profile in under a minute.</div>
          </div>
          <button class="ktube-modal-close" type="button" aria-label="Close" @click="close">
            <i class="bi-x-lg"></i>
          </button>
        </div>

        <form class="ktube-create-form ktube-create-form--modal" @submit.prevent="handleCreate">
          <div class="ktube-form-row">
            <label class="ktube-form-label" for="channelName">Channel name</label>
            <input
              id="channelName"
              v-model="channelName"
              class="ktube-form-input"
              type="text"
              required
              placeholder="My Awesome Channel"
              autocomplete="off"
            />
            <p class="ktube-form-help">This will be visible across KFLIX.</p>
          </div>

          <div class="ktube-form-row">
            <label class="ktube-form-label" for="handle">Channel handle</label>
            <input
              id="handle"
              v-model="handle"
              class="ktube-form-input"
              type="text"
              required
              placeholder="@mychannel"
              autocomplete="off"
            />
            <p class="ktube-form-help">Unique handle used for search and sharing.</p>
          </div>

          <div class="ktube-form-row">
            <label class="ktube-form-label" for="category">Primary category</label>
            <select id="category" v-model="category" class="ktube-form-select" required>
              <option disabled value="">Select a category</option>
              <option>Music & Performances</option>
              <option>Movies & Trailers</option>
              <option>Gaming & Esports</option>
              <option>Podcasts & Talk Shows</option>
              <option>Education & Tutorials</option>
              <option>Culture & Storytelling</option>
            </select>
          </div>

          <div class="ktube-form-row">
            <label class="ktube-form-label" for="description">Channel description</label>
            <textarea
              id="description"
              v-model="description"
              class="ktube-form-textarea"
              placeholder="Describe what you will be creating on K‑TUBE..."
            />
          </div>

          <div class="ktube-form-row">
            <label class="ktube-form-label" for="avatarUrl">Avatar image URL</label>
            <input
              id="avatarUrl"
              v-model="avatarUrl"
              class="ktube-form-input"
              type="url"
              placeholder="https://..."
              autocomplete="off"
            />
            <p class="ktube-form-help">Optional – you can change this later from your dashboard.</p>
          </div>

          <div class="ktube-form-actions">
            <button type="button" class="btn btn-outline-light btn-sm" @click="close">Cancel</button>
            <button type="submit" class="btn btn-danger btn-sm">Create channel</button>
          </div>
        </form>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useKTubeStore } from '@/stores/ktube'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  created: []
}>()

const router = useRouter()
const ktubeStore = useKTubeStore()

const channelName = ref('')
const handle = ref('')
const category = ref('')
const description = ref('')
const avatarUrl = ref('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400')

const close = () => {
  emit('update:modelValue', false)
}

const handleCreate = () => {
  if (!channelName.value || !handle.value || !category.value) return
  ktubeStore.createChannel({
    name: channelName.value,
    handle: handle.value,
    description: description.value,
    category: category.value,
    avatarUrl: avatarUrl.value
  })

  emit('created')
  emit('update:modelValue', false)
  router.push('/k-tube/dashboard')
}

const onKeyDown = (e: KeyboardEvent) => {
  if (!props.modelValue) return
  if (e.key === 'Escape') close()
}

onMounted(() => {
  window.addEventListener('keydown', onKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeyDown)
})
</script>

<style src="@/assets/styles/KTube.css"></style>
