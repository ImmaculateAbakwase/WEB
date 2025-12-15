import { defineStore } from 'pinia'

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

export const useContentStore = defineStore('content', {
  state: () => ({
    heroSlides: [
      {
        id: 1,
        title: 'Dune: Part Two',
        description: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
        badge: 'NEW RELEASE',
        imageUrl: 'https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg'
      },
      {
        id: 2,
        title: 'Oppenheimer',
        description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
        badge: 'AWARD WINNER',
        imageUrl: 'https://image.tmdb.org/t/p/original/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg'
      },
      {
        id: 3,
        title: 'The Batman',
        description: 'When a killer targets Gotham\'s elite with a series of sadistic machinations, Batman must investigate corruption.',
        badge: 'TRENDING',
        imageUrl: 'https://image.tmdb.org/t/p/original/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg'
      }
    ] as HeroSlide[],

    trendingMovies: [
      {
        id: 1,
        title: 'Inception',
        badge: '#1',
        rating: 8.8,
        year: 2010,
        imageUrl: 'https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg'
      },
      {
        id: 2,
        title: 'The Dark Knight',
        badge: '#2',
        rating: 9.0,
        year: 2008,
        imageUrl: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg'
      },
      {
        id: 3,
        title: 'Interstellar',
        badge: '#3',
        rating: 8.6,
        year: 2014,
        imageUrl: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg'
      },
      {
        id: 4,
        title: 'Pulp Fiction',
        badge: '#4',
        rating: 8.9,
        year: 1994,
        imageUrl: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg'
      },
      {
        id: 5,
        title: 'The Shawshank Redemption',
        badge: '#5',
        rating: 9.3,
        year: 1994,
        imageUrl: 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg'
      },
      {
        id: 6,
        title: 'The Matrix',
        badge: '#6',
        rating: 8.7,
        year: 1999,
        imageUrl: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg'
      },
      {
        id: 7,
        title: 'Forrest Gump',
        badge: '#7',
        rating: 8.8,
        year: 1994,
        imageUrl: 'https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg'
      },
      {
        id: 8,
        title: 'Fight Club',
        badge: '#8',
        rating: 8.8,
        year: 1999,
        imageUrl: 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg'
      },
      {
        id: 9,
        title: 'Goodfellas',
        badge: '#9',
        rating: 8.7,
        year: 1990,
        imageUrl: 'https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg'
      },
      {
        id: 10,
        title: 'The Godfather',
        badge: '#10',
        rating: 9.2,
        year: 1972,
        imageUrl: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg'
      }
    ] as Movie[],

    musicPlaylists: [
      {
        id: 1,
        title: 'Today\'s Top Hits',
        badge: 'UPDATED',
        tracks: 50,
        imageUrl: 'https://i.scdn.co/image/ab67706f00000002724554ed6bed6f051d9b0bfc'
      },
      {
        id: 2,
        title: 'RapCaviar',
        badge: 'HOT',
        tracks: 50,
        imageUrl: 'https://i.scdn.co/image/ab67706f00000002c6649de4bd78eb40e7590980'
      },
      {
        id: 3,
        title: 'Rock Classics',
        badge: 'POPULAR',
        tracks: 100,
        imageUrl: 'https://i.scdn.co/image/ab67706f000000029bb7e27583d2781cd84a92c9'
      },
      {
        id: 4,
        title: 'Chill Vibes',
        badge: 'RELAXING',
        tracks: 75,
        imageUrl: 'https://i.scdn.co/image/ab67706f000000027bb2676b7888dbce7e6ba1bb'
      },
      {
        id: 5,
        title: 'Electronic Dance',
        badge: 'PARTY',
        tracks: 60,
        imageUrl: 'https://i.scdn.co/image/ab67706f00000002e5a0b2c8dfa2c8aa23d8fa42'
      }
    ] as MusicPlaylist[],

    creators: [
      {
        id: 1,
        name: 'MrBeast',
        badge: 'VERIFIED',
        subscribers: '231M',
        imageUrl: 'https://yt3.googleusercontent.com/fxGKYucJAVme-Yz4fsdCroCFCrANWqw0ql4GYuvx8Uq4l_euNJHgE-w9MTkLQA805vWCi-kE0g=s900-c-k-c0x00ffffff-no-rj'
      },
      {
        id: 2,
        name: 'PewDiePie',
        badge: 'LEGEND',
        subscribers: '111M',
        imageUrl: 'https://yt3.googleusercontent.com/5oUY3tashyxfqsjO5SGhjT4dus8FkN9CsAHwXWISFrdPYii1FudD4ICtLfuCw6-THJsJbgoY=s900-c-k-c0x00ffffff-no-rj'
      },
      {
        id: 3,
        name: 'Markiplier',
        badge: 'GAMING',
        subscribers: '36.5M',
        imageUrl: 'https://yt3.googleusercontent.com/qGhn04ryDJIB3CZfp9HQH1jiT5XIF4zMfZcP6RXzPSe60qubpMK7E0PO58GnEJvg5WEqcwqk8Q=s900-c-k-c0x00ffffff-no-rj'
      },
      {
        id: 4,
        name: 'Dude Perfect',
        badge: 'SPORTS',
        subscribers: '60M',
        imageUrl: 'https://yt3.googleusercontent.com/kFh08FDqJYmi8S0ljy9V4kzTwV-hDqCtMM8s_Q-J9_sRuFZex9w7tKJdL_yZERg3pArcWw2Oxg=s900-c-k-c0x00ffffff-no-rj'
      },
      {
        id: 5,
        name: 'Like Nastya',
        badge: 'KIDS',
        subscribers: '114M',
        imageUrl: 'https://yt3.googleusercontent.com/bpzY-S4DgHAGdLr2gist2xPEqGfwLwP3GqhLMvhPXYuWJp78Y69zckbqPXV2RNneehk__Ybvvg=s900-c-k-c0x00ffffff-no-rj'
      }
    ] as Creator[],

    games: [
      {
        id: 1,
        title: 'Fortnite',
        badge: 'BATTLE ROYALE',
        players: '2.4M',
        imageUrl: 'https://cdn2.unrealengine.com/fortnite-og-default-image-1200x1600-1200x1600-3cd58c4a4cf0.jpg'
      },
      {
        id: 2,
        title: 'Minecraft',
        badge: 'SANDBOX',
        players: '1.8M',
        imageUrl: 'https://image.api.playstation.com/vulcan/ap/rnd/202407/0201/c2f0479e99820db262bbdea2eafc82dae4ad96e6e99e85ce.png'
      },
      {
        id: 3,
        title: 'Grand Theft Auto V',
        badge: 'OPEN WORLD',
        players: '890K',
        imageUrl: 'https://image.api.playstation.com/vulcan/ap/rnd/202202/2816/dsh62qrqU1vVJT9J6M8gtlnk.jpg'
      },
      {
        id: 4,
        title: 'League of Legends',
        badge: 'MOBA',
        players: '1.2M',
        imageUrl: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt1bd2e5d3e37c0804/65611c8b9e95f20f0e2a9a15/lol-article-generic.jpg'
      },
      {
        id: 5,
        title: 'Valorant',
        badge: 'FPS',
        players: '750K',
        imageUrl: 'https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/0b0afad0c71dbf1e4a8357d2c2eeffd56f6e0a10-1920x1080.jpg'
      },
      {
        id: 6,
        title: 'Apex Legends',
        badge: 'BATTLE ROYALE',
        players: '620K',
        imageUrl: 'https://cdn1.epicgames.com/offer/cbd5b3d310a54b12bf3fe8c41994174f/EGS_ApexLegends_RespawnEntertainment_S1_2560x1440-91c6cd7212eb2f7c55c5d7a77581b5f5'
      }
    ] as Game[]
  })
})