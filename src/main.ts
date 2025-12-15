import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './assets/styles/main.css'

function initializeTheme() {
  if (typeof window === 'undefined') return

  const storedTheme = localStorage.getItem('kflix-theme') as 'light' | 'dark' | null

  let theme: 'light' | 'dark'

  if (storedTheme === 'light' || storedTheme === 'dark') {
    theme = storedTheme
  } else {
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
    theme = prefersLight ? 'light' : 'dark'
  }

  const root = document.documentElement
  if (theme === 'light') {
    root.classList.add('light')
  } else {
    root.classList.remove('light')
  }
}

initializeTheme()

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')