<template>
  <div class="main-content" :class="appStore.sidebarCollapsed ? 'collapsed' : 'expanded'">
    <PageHeader title="K-TUBE" />

    <CreateChannelModal v-model="isCreateModalOpen" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import PageHeader from '@/components/layout/PageHeader.vue'
import CreateChannelModal from '@/components/ktube/CreateChannelModal.vue'

const appStore = useAppStore()
const router = useRouter()

const isCreateModalOpen = ref(true)

watch(isCreateModalOpen, (open) => {
  if (!open) router.push('/k-tube')
})
</script>

<style scoped src="@/assets/styles/KTube.css"></style>


