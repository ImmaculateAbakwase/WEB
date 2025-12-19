import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export interface User {
  id: string
  name: string
  email: string
}

export const useUserStore = defineStore('user', () => {
  const currentUser = ref<User | null>(null)

  const initials = computed(() => {
    if (!currentUser.value) return ''
    const source = currentUser.value.name || currentUser.value.email
    const parts = source.trim().split(/\s+/)
    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase()
    }
    return (parts[0][0] + parts[1][0]).toUpperCase()
  })

  const login = (user: User) => {
    currentUser.value = user
  }

  const logout = () => {
    currentUser.value = null
  }

  return {
    currentUser,
    initials,
    login,
    logout
  }
})


