<template>
  <div class="main-content" :class="appStore.sidebarCollapsed ? 'collapsed' : 'expanded'">
    <PageHeader :title="route.meta.title as string" />

    <!-- Featured Banner -->
    <div class="featured-banner">
      <div class="featured-content">
        <div class="featured-badge">FEATURED</div>
        <h1 class="featured-title">Dune: Part Two</h1>
        <p class="featured-description">
          Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.
        </p>
        <div class="featured-meta">
          <span><i class="bi-star-fill text-warning"></i> 8.6</span>
          <span>2024</span>
          <span>2h 46m</span>
          <span>Sci-Fi, Adventure</span>
        </div>
        <div class="featured-actions">
          <button class="btn btn-danger btn-lg">
            <i class="bi-play-fill"></i> Watch Now
          </button>
          <button class="btn btn-outline-light btn-lg">
            <i class="bi-plus-lg"></i> My List
          </button>
        </div>
      </div>
    </div>

    <!-- Filter Tabs -->
    <div class="filter-section">
      <div class="filter-tabs">
        <button class="filter-tab active">All Movies</button>
        <button class="filter-tab">New Releases</button>
        <button class="filter-tab">Trending</button>
        <button class="filter-tab">Top Rated</button>
      </div>
    </div>

    <!-- Movie Rails -->
    <div v-for="rail in rails" :key="rail.id" class="content-section">
      <SectionHeader :title="rail.title" :show-view-all="true" />

      <div class="horizontal-scroll-wrapper">
        <button
          v-if="rail.canScrollLeft"
          type="button"
          class="scroll-arrow scroll-arrow-left"
          aria-label="Scroll left"
          @click="scrollRail(rail, -1)"
        >
          <i class="bi-chevron-left"></i>
        </button>

        <div :ref="(el) => setRailEl(rail, el)" class="horizontal-scroll with-arrows draggable">
          <ContentCard
            v-for="(movie, idx) in rail.movies"
            :key="movie.id"
            class="movie-rail-card"
            :title="movie.title"
            :badge="movie.badge"
            :rating="movie.rating"
            :meta="String(movie.year)"
            :image-url="movie.imageUrl"
            :show-chevron="rail.canScrollRight && idx === rail.lastVisibleIndex"
            @chevron="scrollRail(rail, 1)"
          />
        </div>

        <button
          v-if="rail.canScrollRight"
          type="button"
          class="scroll-arrow scroll-arrow-right"
          aria-label="Scroll right"
          @click="scrollRail(rail, 1)"
        >
          <i class="bi-chevron-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { useContentStore, type Movie } from '@/stores/content'
import PageHeader from '@/components/layout/PageHeader.vue'
import SectionHeader from '@/components/home/SectionHeader.vue'
import ContentCard from '@/components/home/ContentCard.vue'

const route = useRoute()
const appStore = useAppStore()
const contentStore = useContentStore()

type RailId =
  | 'trending'
  | 'newReleases'
  | 'action'
  | 'comedy'
  | 'drama'
  | 'sciFi'
  | 'horror'
  | 'romance'
  | 'thriller'
  | 'animation'
  | 'documentary'
  | 'international'

type Rail = {
  id: RailId
  title: string
  movies: Movie[]
  el: HTMLElement | null
  canScrollLeft: boolean
  canScrollRight: boolean
  lastVisibleIndex: number
}

// Extended movie database
const allMovies: Movie[] = [
  // Trending/Popular
  { id: 101, title: 'Dune: Part Two', badge: 'NEW', rating: 8.6, year: 2024, imageUrl: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg' },
  { id: 102, title: 'Oppenheimer', badge: 'AWARD', rating: 8.4, year: 2023, imageUrl: 'https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg' },
  { id: 103, title: 'Poor Things', badge: 'AWARD', rating: 7.9, year: 2023, imageUrl: 'https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg' },
  { id: 104, title: 'The Holdovers', badge: 'COZY', rating: 8.0, year: 2023, imageUrl: 'https://image.tmdb.org/t/p/w500/VHSzNBTwxV8vh7wylo7O9CLdac.jpg' },
  { id: 105, title: 'Killers of the Flower Moon', badge: 'EPIC', rating: 7.6, year: 2023, imageUrl: 'https://image.tmdb.org/t/p/w500/dB6Krk806zeqd0YNp2ngQ9zXteH.jpg' },

  // Action & Adventure
  { id: 201, title: 'John Wick: Chapter 4', badge: 'ACTION', rating: 7.7, year: 2023, imageUrl: 'https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg' },
  { id: 202, title: 'Top Gun: Maverick', badge: 'HIT', rating: 8.3, year: 2022, imageUrl: 'https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg' },
  { id: 203, title: 'Mission: Impossible - Dead Reckoning', badge: 'ACTION', rating: 7.7, year: 2023, imageUrl: 'https://image.tmdb.org/t/p/w500/NNxYkU70HPurnNCSiCjYAmacwm.jpg' },
  { id: 204, title: 'The Batman', badge: 'DC', rating: 7.8, year: 2022, imageUrl: 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg' },
  { id: 205, title: 'Guardians of the Galaxy Vol. 3', badge: 'FUN', rating: 8.0, year: 2023, imageUrl: 'https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg' },
  { id: 206, title: 'Fast X', badge: 'ACTION', rating: 5.8, year: 2023, imageUrl: 'https://image.tmdb.org/t/p/w500/fiVW06jE7z9YnO4trhaMEdclSiC.jpg' },
  { id: 207, title: 'Extraction 2', badge: 'ACTION', rating: 7.1, year: 2023, imageUrl: 'https://image.tmdb.org/t/p/w500/7gKI9hpEMcZUQpNgKrkDzJpbnNS.jpg' },

  // Comedy
  { id: 301, title: 'Barbie', badge: 'COMEDY', rating: 7.0, year: 2023, imageUrl: 'https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg' },
  { id: 302, title: 'The Grand Budapest Hotel', badge: 'CLASSIC', rating: 8.1, year: 2014, imageUrl: 'https://image.tmdb.org/t/p/w500/nX5XotM9yprCKarRH4fzOq1VM1J.jpg' },
  { id: 303, title: 'Knives Out', badge: 'MYSTERY', rating: 7.9, year: 2019, imageUrl: 'https://image.tmdb.org/t/p/w500/pThyQovXQrw2m0s9x82twj48Jq4.jpg' },
  { id: 304, title: 'Glass Onion', badge: 'MYSTERY', rating: 7.1, year: 2022, imageUrl: 'https://image.tmdb.org/t/p/w500/vDGr1YdrlfbU9wxTOdpf3zChmv9.jpg' },
  { id: 305, title: 'Everything Everywhere All at Once', badge: 'WILD', rating: 7.9, year: 2022, imageUrl: 'https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg' },
  { id: 306, title: 'The Menu', badge: 'DARK', rating: 7.2, year: 2022, imageUrl: 'https://image.tmdb.org/t/p/w500/fPtUgMcLIboqlTlPrq0bQpKK8eq.jpg' },

  // Drama
  { id: 401, title: 'The Shawshank Redemption', badge: 'CLASSIC', rating: 9.3, year: 1994, imageUrl: 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg' },
  { id: 402, title: 'The Godfather', badge: 'CLASSIC', rating: 9.2, year: 1972, imageUrl: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg' },
  { id: 403, title: '12 Years a Slave', badge: 'POWERFUL', rating: 8.1, year: 2013, imageUrl: 'https://image.tmdb.org/t/p/w500/xdANQijuNrJaw1HA61rDccME4Tm.jpg' },
  { id: 404, title: 'Forrest Gump', badge: 'BELOVED', rating: 8.8, year: 1994, imageUrl: 'https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg' },
  { id: 405, title: 'Schindler\'s List', badge: 'ESSENTIAL', rating: 9.0, year: 1993, imageUrl: 'https://image.tmdb.org/t/p/w500/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg' },
  { id: 406, title: 'The Green Mile', badge: 'MOVING', rating: 8.6, year: 1999, imageUrl: 'https://image.tmdb.org/t/p/w500/velWPhVMQeQKcxggNEU8YmIo52R.jpg' },

  // Sci-Fi
  { id: 501, title: 'Blade Runner 2049', badge: 'Sci-Fi', rating: 8.0, year: 2017, imageUrl: 'https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg' },
  { id: 502, title: 'Arrival', badge: 'Sci-Fi', rating: 7.9, year: 2016, imageUrl: 'https://image.tmdb.org/t/p/w500/x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg' },
  { id: 503, title: 'Interstellar', badge: 'EPIC', rating: 8.6, year: 2014, imageUrl: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg' },
  { id: 504, title: 'The Matrix', badge: 'CLASSIC', rating: 8.7, year: 1999, imageUrl: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg' },
  { id: 505, title: 'Inception', badge: 'MIND-BENDING', rating: 8.8, year: 2010, imageUrl: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg' },
  { id: 506, title: 'Ex Machina', badge: 'SMART', rating: 7.7, year: 2014, imageUrl: 'https://image.tmdb.org/t/p/w500/9gWu5IEVJDlsfiXEYQQQyPKKAXk.jpg' },

  // Horror
  { id: 601, title: 'Get Out', badge: 'SMART', rating: 7.7, year: 2017, imageUrl: 'https://image.tmdb.org/t/p/w500/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg' },
  { id: 602, title: 'A Quiet Place', badge: 'TENSE', rating: 7.5, year: 2018, imageUrl: 'https://image.tmdb.org/t/p/w500/nAU74GmpUk7t5iklEp3bufwDq4n.jpg' },
  { id: 603, title: 'Hereditary', badge: 'DISTURBING', rating: 7.3, year: 2018, imageUrl: 'https://image.tmdb.org/t/p/w500/p6QSDjOJUZNI9xn5mhwbuDGRfSF.jpg' },
  { id: 604, title: 'The Conjuring', badge: 'SCARY', rating: 7.5, year: 2013, imageUrl: 'https://image.tmdb.org/t/p/w500/wVYREutTvI2tmxr6ujrHT704wGF.jpg' },
  { id: 605, title: 'It', badge: 'HORROR', rating: 7.3, year: 2017, imageUrl: 'https://image.tmdb.org/t/p/w500/9E2y5Q7WlCVNEhP5GiVTjhEhx1o.jpg' },

  // Romance
  { id: 701, title: 'La La Land', badge: 'MUSICAL', rating: 8.0, year: 2016, imageUrl: 'https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg' },
  { id: 702, title: 'The Notebook', badge: 'ROMANTIC', rating: 7.8, year: 2004, imageUrl: 'https://image.tmdb.org/t/p/w500/qom1SZSENdmHFNZBXbtJAU0WTlC.jpg' },
  { id: 703, title: 'Eternal Sunshine of the Spotless Mind', badge: 'UNIQUE', rating: 8.3, year: 2004, imageUrl: 'https://image.tmdb.org/t/p/w500/5MwkWH9tYHv3mV9OdYTMR5qreIz.jpg' },
  { id: 704, title: 'Pride & Prejudice', badge: 'CLASSIC', rating: 7.8, year: 2005, imageUrl: 'https://image.tmdb.org/t/p/w500/sGjIvtVvTlWnia2zfJfHz81pZ9Q.jpg' },

  // Thriller
  { id: 801, title: 'No Time to Die', badge: 'SPY', rating: 7.4, year: 2021, imageUrl: 'https://image.tmdb.org/t/p/w500/iUgygt3fscRoKWCV1d0C7FbM9TP.jpg' },
  { id: 802, title: 'Gone Girl', badge: 'TWISTED', rating: 8.1, year: 2014, imageUrl: 'https://image.tmdb.org/t/p/w500/lv5xShBIDPe7m4ufdlV0IAc7Avk.jpg' },
  { id: 803, title: 'Se7en', badge: 'DARK', rating: 8.6, year: 1995, imageUrl: 'https://image.tmdb.org/t/p/w500/6yoghtyTpznpBik8EngEmJskVUO.jpg' },
  { id: 804, title: 'Prisoners', badge: 'INTENSE', rating: 8.1, year: 2013, imageUrl: 'https://image.tmdb.org/t/p/w500/tuftahItKg8tOiJXLVblyNn7Td.jpg' },

  // Animation
  { id: 901, title: 'Spider-Man: Across the Spider-Verse', badge: 'TOP', rating: 8.6, year: 2023, imageUrl: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg' },
  { id: 902, title: 'The Boy and the Heron', badge: 'NEW', rating: 7.7, year: 2023, imageUrl: 'https://image.tmdb.org/t/p/w500/f4oZTcfGrVTXKTWg157AwikXqmP.jpg' },
  { id: 903, title: 'Spirited Away', badge: 'CLASSIC', rating: 8.6, year: 2001, imageUrl: 'https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg' },
  { id: 904, title: 'WALL-E', badge: 'PIXAR', rating: 8.4, year: 2008, imageUrl: 'https://image.tmdb.org/t/p/w500/hbhFnRzzg6ZDmm8YAmxBnQpQIPh.jpg' },
  { id: 905, title: 'Coco', badge: 'HEARTFELT', rating: 8.4, year: 2017, imageUrl: 'https://image.tmdb.org/t/p/w500/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg' },

  // Documentary
  { id: 1001, title: 'Planet Earth II', badge: 'NATURE', rating: 9.5, year: 2016, imageUrl: 'https://image.tmdb.org/t/p/w500/wHbAiwSgHBtcFCYnS0zCmJP4sYY.jpg' },
  { id: 1002, title: '13th', badge: 'POWERFUL', rating: 8.2, year: 2016, imageUrl: 'https://image.tmdb.org/t/p/w500/seTSPVJCpSgYvO6K6pR1xpPb3BK.jpg' },
  { id: 1003, title: 'Free Solo', badge: 'THRILLING', rating: 8.1, year: 2018, imageUrl: 'https://image.tmdb.org/t/p/w500/v4QfYZMACODlWul9doN9RxE99ag.jpg' },
  { id: 1004, title: 'Won\'t You Be My Neighbor?', badge: 'HEARTFELT', rating: 8.4, year: 2018, imageUrl: 'https://image.tmdb.org/t/p/w500/p2pFyBJ1tMj78vZBxd4MGwNnkqM.jpg' },

  // International
  { id: 1101, title: 'Parasite', badge: 'AWARD', rating: 8.5, year: 2019, imageUrl: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg' },
  { id: 1102, title: 'Amélie', badge: 'FRENCH', rating: 8.3, year: 2001, imageUrl: 'https://image.tmdb.org/t/p/w500/nSxDa3M9aMvGVLoItzWTepQ5h5d.jpg' },
  { id: 1103, title: 'Cinema Paradiso', badge: 'ITALIAN', rating: 8.5, year: 1988, imageUrl: 'https://image.tmdb.org/t/p/w500/8SRUfRUi6x4O68n0VCbDNRa6iGL.jpg' },
  { id: 1104, title: 'Oldboy', badge: 'KOREAN', rating: 8.4, year: 2003, imageUrl: 'https://image.tmdb.org/t/p/w500/pWDtjs568ZfOTMbURQBYuT4Qyx7.jpg' },
  { id: 1105, title: 'City of God', badge: 'BRAZILIAN', rating: 8.6, year: 2002, imageUrl: 'https://image.tmdb.org/t/p/w500/k7eYdDtICM1TYmlHEYXsYFBAMZN.jpg' },
]

const buildRail = (id: RailId, title: string, movies: Movie[]): Rail => ({
  id,
  title,
  movies,
  el: null,
  canScrollLeft: false,
  canScrollRight: false,
  lastVisibleIndex: -1,
})

const rails = ref<Rail[]>([
  buildRail('trending', '🔥 Trending Now', allMovies.slice(0, 12)),
  buildRail('newReleases', '✨ New Releases', allMovies.filter((m) => m.year >= 2023)),
  buildRail('action', '💥 Action & Adventure', allMovies.filter((m) => m.id >= 200 && m.id < 300)),
  buildRail('comedy', '😂 Comedy Picks', allMovies.filter((m) => m.id >= 300 && m.id < 400)),
  buildRail('drama', '🎭 Award-Winning Drama', allMovies.filter((m) => m.id >= 400 && m.id < 500)),
  buildRail('sciFi', '🚀 Sci-Fi & Fantasy', allMovies.filter((m) => m.id >= 500 && m.id < 600)),
  buildRail('horror', '👻 Horror & Thrillers', allMovies.filter((m) => m.id >= 600 && m.id < 700)),
  buildRail('romance', '💕 Romance & Drama', allMovies.filter((m) => m.id >= 700 && m.id < 800)),
  buildRail('thriller', '🔪 Mystery & Suspense', allMovies.filter((m) => m.id >= 800 && m.id < 900)),
  buildRail('animation', '🎨 Animation & Family', allMovies.filter((m) => m.id >= 900 && m.id < 1000)),
  buildRail('documentary', '🎬 Documentaries', allMovies.filter((m) => m.id >= 1000 && m.id < 1100)),
  buildRail('international', '🌍 International Cinema', allMovies.filter((m) => m.id >= 1100)),
])

const initializedRails = new Set<RailId>()
const dragCleanups: (() => void)[] = []
const scrollStateCleanups: (() => void)[] = []

const enableDragScroll = (el: HTMLElement) => {
  let isDown = false
  let startX = 0
  let startScrollLeft = 0
  let moved = false

  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    isDown = true
    moved = false
    startX = e.clientX
    startScrollLeft = el.scrollLeft
    el.classList.add('dragging')
    el.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: PointerEvent) => {
    if (!isDown) return
    e.preventDefault()
    const dx = e.clientX - startX
    if (Math.abs(dx) > 6) moved = true
    el.scrollLeft = startScrollLeft - dx
  }

  const stop = (e: PointerEvent) => {
    if (!isDown) return
    isDown = false
    el.classList.remove('dragging')
    try {
      el.releasePointerCapture(e.pointerId)
    } catch {}
  }

  const onClickCapture = (e: MouseEvent) => {
    if (!moved) return
    e.preventDefault()
    e.stopPropagation()
    moved = false
  }

  el.addEventListener('pointerdown', onPointerDown)
  el.addEventListener('pointermove', onPointerMove)
  el.addEventListener('pointerup', stop)
  el.addEventListener('pointercancel', stop)
  el.addEventListener('pointerleave', stop)
  el.addEventListener('click', onClickCapture, true)

  dragCleanups.push(() => {
    el.removeEventListener('pointerdown', onPointerDown)
    el.removeEventListener('pointermove', onPointerMove)
    el.removeEventListener('pointerup', stop)
    el.removeEventListener('pointercancel', stop)
    el.removeEventListener('pointerleave', stop)
    el.removeEventListener('click', onClickCapture, true)
  })
}

const setupRailRuntime = (rail: Rail, el: HTMLElement) => {
  enableDragScroll(el)

  const update = () => updateScrollButtons(rail)
  update()
  el.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update)

  scrollStateCleanups.push(() => {
    el.removeEventListener('scroll', update)
    window.removeEventListener('resize', update)
    initializedRails.delete(rail.id)
  })
}

const setRailEl = (rail: Rail, el: Element | null) => {
  if (!el) {
    rail.el = null
    rail.canScrollLeft = false
    rail.canScrollRight = false
    rail.lastVisibleIndex = -1
    return
  }

  const node = el as HTMLElement
  rail.el = node

  if (!initializedRails.has(rail.id)) {
    initializedRails.add(rail.id)
    setupRailRuntime(rail, node)
  }

  scheduleUpdate()
}

const scrollRail = (rail: Rail, direction: -1 | 1) => {
  const el = rail.el
  if (!el) return

  const style = window.getComputedStyle(el)
  const gap = Number.parseFloat((style as any).columnGap || (style as any).gap || '0') || 0
  const firstChild = el.firstElementChild as HTMLElement | null
  const cardWidth = firstChild ? firstChild.getBoundingClientRect().width : 0
  const step = cardWidth > 0 ? Math.round(cardWidth + gap) : 0
  const amount = step > 0 ? Math.max(step * 5, Math.floor(el.clientWidth * 0.9)) : Math.floor(el.clientWidth * 0.9)

  if (typeof el.scrollBy === 'function') {
    try {
      el.scrollBy({ left: direction * amount, behavior: 'smooth' })
      return
    } catch {}
  }

  el.scrollLeft += direction * amount
}

const updateScrollButtons = (rail: Rail) => {
  const el = rail.el
  if (!el) {
    rail.canScrollLeft = false
    rail.canScrollRight = false
    rail.lastVisibleIndex = -1
    return
  }

  const epsilon = 2
  const maxScrollLeft = el.scrollWidth - el.clientWidth
  rail.canScrollLeft = maxScrollLeft > epsilon && el.scrollLeft > epsilon
  rail.canScrollRight = maxScrollLeft > epsilon && el.scrollLeft < maxScrollLeft - epsilon

  if (!rail.canScrollRight) {
    rail.lastVisibleIndex = -1
    return
  }

  const children = Array.from(el.children) as HTMLElement[]
  if (children.length === 0) {
    rail.lastVisibleIndex = -1
    return
  }

  const leftEdge = el.scrollLeft
  const rightEdge = el.scrollLeft + el.clientWidth

  let lastFullyVisible = -1
  for (let i = 0; i < children.length; i++) {
    const child = children[i]
    const childLeft = child.offsetLeft
    const childRight = childLeft + child.offsetWidth
    if (childLeft >= leftEdge - 2 && childRight <= rightEdge + 2) {
      lastFullyVisible = i
    }
  }

  if (lastFullyVisible !== -1) {
    rail.lastVisibleIndex = lastFullyVisible
    return
  }

  let lastPartiallyVisible = -1
  for (let i = 0; i < children.length; i++) {
    const child = children[i]
    const childLeft = child.offsetLeft
    const childRight = childLeft + child.offsetWidth
    if (childLeft < rightEdge && childRight > leftEdge) {
      lastPartiallyVisible = i
    }
  }

  rail.lastVisibleIndex = lastPartiallyVisible
}

const scheduleUpdate = async () => {
  await nextTick()
  for (const rail of rails.value) updateScrollButtons(rail)

  if (typeof window === 'undefined') return
  if (typeof window.requestAnimationFrame === 'function') {
    window.requestAnimationFrame(() => {
      for (const rail of rails.value) updateScrollButtons(rail)
    })
  }
  window.setTimeout(() => {
    for (const rail of rails.value) updateScrollButtons(rail)
  }, 200)
  window.setTimeout(() => {
    for (const rail of rails.value) updateScrollButtons(rail)
  }, 800)
}

onMounted(() => {
  scheduleUpdate()

  if (typeof window !== 'undefined') {
    const onLoad = () => scheduleUpdate()
    window.addEventListener('load', onLoad)
    scrollStateCleanups.push(() => window.removeEventListener('load', onLoad))
  }
})

watch(
  () => appStore.sidebarCollapsed,
  () => scheduleUpdate()
)

onUnmounted(() => {
  for (const cleanup of dragCleanups) cleanup()
  dragCleanups.length = 0

  for (const cleanup of scrollStateCleanups) cleanup()
  scrollStateCleanups.length = 0
})
</script>