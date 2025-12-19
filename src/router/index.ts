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
    path: '/k-tube/create-channel',
    name: 'ktube-create-channel',
    component: () => import('../views/KTubeCreateChannelPage.vue'),
    meta: { logo: 'KT', title: 'Create K-TUBE Channel' }
  },
  {
    path: '/k-tube/dashboard',
    name: 'ktube-dashboard',
    component: () => import('../views/KTubeDashboardPage.vue'),
    meta: { logo: 'KT', title: 'Creator Dashboard' }
  },
  {
    path: '/k-tube/upload',
    name: 'ktube-upload',
    component: () => import('../views/KTubeUploadPage.vue'),
    meta: { logo: 'KT', title: 'Upload Video' }
  },
  {
    path: '/k-tube/live',
    name: 'ktube-live',
    component: () => import('../views/KTubeLiveStudioPage.vue'),
    meta: { logo: 'KT', title: 'Go Live' }
  },
  {
    path: '/gaming',
    name: 'gaming',
    component: () => import('../views/GamingPage.vue'),
    meta: { logo: 'G', title: 'KFLIX PLAY' }
  },
  {
    path: '/live',
    name: 'live',
    component: () => import('../views/LivePage.vue'),
    meta: { logo: 'L', title: 'KFLIX LIVE' }
  },
  {
    path: '/ppv',
    name: 'ppv',
    component: () => import('../views/PPVPage.vue'),
    meta: { logo: 'P', title: 'PPV' }
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
  history: createWebHistory('/'),
  routes
})

export default router

