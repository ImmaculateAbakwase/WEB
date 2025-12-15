// src/stores/theme.ts
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(true)

  // Derive initial state from document (initialized in main.ts)
  if (typeof window !== 'undefined') {
    const root = document.documentElement
    const isLightClassApplied = root.classList.contains('light')
    isDark.value = !isLightClassApplied
  }

  const applyTheme = () => {
    if (typeof window === 'undefined') return
    const root = document.documentElement

    if (isDark.value) {
      root.classList.remove('light')
      localStorage.setItem('kflix-theme', 'dark')
    } else {
      root.classList.add('light')
      localStorage.setItem('kflix-theme', 'light')
    }
  }

  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  watch(
    isDark,
    () => {
      applyTheme()
    },
    { immediate: true }
  )

  return {
    isDark,
    toggleTheme
  }
})