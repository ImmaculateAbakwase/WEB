import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export interface KTubeChannel {
  id: string
  name: string
  handle: string
  description: string
  category: string
  avatarUrl: string
  createdAt: string
}

export interface KTubeVideo {
  id: string
  title: string
  thumbnailUrl: string
  views: number
  likes: number
  duration: string
  createdAt: string
  isLiveReplay?: boolean
}

export interface KTubeLiveSession {
  id: string
  title: string
  gameOrTopic: string
  status: 'scheduled' | 'live' | 'ended'
  scheduledFor: string
  concurrentViewers: number
}

export const useKTubeStore = defineStore('ktube', () => {
  const channel = ref<KTubeChannel | null>(null)

  const videos = ref<KTubeVideo[]>([
    {
      id: 'v1',
      title: 'Welcome to K-TUBE: Getting Started',
      thumbnailUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
      views: 12450,
      likes: 980,
      duration: '08:24',
      createdAt: '2025-01-05'
    },
    {
      id: 'v2',
      title: 'Top 10 Afrobeats Performances Live on Stage',
      thumbnailUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800',
      views: 32640,
      likes: 2410,
      duration: '12:03',
      createdAt: '2025-01-14'
    },
    {
      id: 'v3',
      title: 'Pro Gamer Highlights – KFLIX Games Arena',
      thumbnailUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800',
      views: 18970,
      likes: 1540,
      duration: '09:51',
      createdAt: '2025-01-18',
      isLiveReplay: true
    }
  ])

  const liveSessions = ref<KTubeLiveSession[]>([
    {
      id: 'l1',
      title: 'Creator Q&A: Growing on K-TUBE',
      gameOrTopic: 'Creator Tips',
      status: 'scheduled',
      scheduledFor: 'Today • 19:30',
      concurrentViewers: 0
    }
  ])

  const estimatedEarnings = ref(1280.5)
  const totalSubscribers = ref(5420)
  const totalViews = ref(215_430)

  const hasChannel = computed(() => channel.value !== null)

  const createChannel = (payload: {
    name: string
    handle: string
    description: string
    category: string
    avatarUrl: string
  }) => {
    const now = new Date().toISOString()
    channel.value = {
      id: 'ch-1',
      name: payload.name,
      handle: payload.handle.startsWith('@') ? payload.handle : `@${payload.handle}`,
      description: payload.description,
      category: payload.category,
      avatarUrl: payload.avatarUrl,
      createdAt: now
    }
  }

  const updateChannelAvatar = (avatarUrl: string) => {
    if (!channel.value) return
    channel.value = {
      ...channel.value,
      avatarUrl
    }
  }

  const addVideo = (payload: {
    title: string
    thumbnailUrl: string
    duration: string
  }) => {
    const now = new Date().toISOString().slice(0, 10)
    const newVideo: KTubeVideo = {
      id: `v-${Date.now()}`,
      title: payload.title,
      thumbnailUrl: payload.thumbnailUrl,
      views: 0,
      likes: 0,
      duration: payload.duration,
      createdAt: now
    }
    videos.value.unshift(newVideo)
  }

  const scheduleLive = (payload: {
    title: string
    gameOrTopic: string
    scheduledFor: string
  }) => {
    const session: KTubeLiveSession = {
      id: `live-${Date.now()}`,
      title: payload.title,
      gameOrTopic: payload.gameOrTopic,
      status: 'scheduled',
      scheduledFor: payload.scheduledFor,
      concurrentViewers: 0
    }
    liveSessions.value.unshift(session)
  }

  return {
    channel,
    videos,
    liveSessions,
    estimatedEarnings,
    totalSubscribers,
    totalViews,
    hasChannel,
    createChannel,
    updateChannelAvatar,
    addVideo,
    scheduleLive
  }
})


