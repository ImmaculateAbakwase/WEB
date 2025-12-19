import { defineStore } from 'pinia'
import { ref } from 'vue'

export type AuthMode = 'login' | 'signup' | 'forgot'

export const useAuthModalStore = defineStore('authModal', () => {
  const isOpen = ref(false)
  const mode = ref<AuthMode>('login')

  const open = (nextMode: AuthMode) => {
    mode.value = nextMode
    isOpen.value = true
  }

  const close = () => {
    isOpen.value = false
  }

  return {
    isOpen,
    mode,
    open,
    close
  }
})


