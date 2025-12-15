import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomePage.vue'),
    meta: { logo: 'K', title: 'KFLIX' }
  },
  {
    path: '/movies',
    name: 'movies',
    component: () => import('../views/MoviesPage.vue'),
    meta: { logo: 'M', title: 'MOVIES' }
  },
  {
    path: '/music',
    name: 'music',
    component: () => import('../views/MusicPage.vue'),
    meta: { logo: '♪', title: 'MUSIC' }
  },
  {
    path: '/k-tube',
    name: 'ktube',
    component: () => import('../views/KTubePage.vue'),
    meta: { logo: 'KT', title: 'K-TUBE' }
  },
  {
    path: '/gaming',
    name: 'gaming',
    component: () => import('../views/GamingPage.vue'),
    meta: { logo: 'G', title: 'KFLIX PLAY' }
  },
  {
    path: '/store',
    name: 'store',
    component: () => import('../views/StorePage.vue'),
    meta: { logo: 'S', title: 'STORE' }
  },
  {
    path: '/auth/login',
    name: 'auth-login',
    component: () => import('../views/auth/Login.vue'),
    meta: { title: 'Login' }
  },
  {
    path: '/auth/signup',
    name: 'auth-signup',
    component: () => import('../views/auth/Signup.vue'),
    meta: { title: 'Sign Up' }
  },
  {
    path: '/auth/forgot-password',
    name: 'auth-forgot-password',
    component: () => import('../views/auth/ForgotPassword.vue'),
    meta: { title: 'Forgot Password' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router

