export interface HeroSlide {
  id: number
  title: string
  description: string
  badge: string
  imageUrl: string
}

export interface Movie {
  id: number
  title: string
  badge: string
  rating: number
  year: number
  imageUrl: string
}

export interface MusicPlaylist {
  id: number
  title: string
  badge: string
  tracks: number
  imageUrl: string
}

export interface Creator {
  id: number
  name: string
  badge: string
  subscribers: string
  imageUrl: string
}

export interface Game {
  id: number
  title: string
  badge: string
  players: string
  imageUrl: string
}

export interface NavRoute {
  id: string
  path: string
  name: string
  title: string
  icon: string
}