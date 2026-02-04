export type VideoMeta = {
  id: string
  title: string
  creator: string
  description: string
  tags: string[]
  music: string
  mood: string
  src: string
  poster: string
  likes: number
  comments: number
  shares: number
}

const poster = (colorA: string, colorB: string, accent: string) =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='900' height='1600' viewBox='0 0 900 1600'><defs><linearGradient id='g1' x1='0' y1='0' x2='1' y2='1'><stop stop-color='${colorA}' offset='0%'/><stop stop-color='${colorB}' offset='100%'/></linearGradient><linearGradient id='g2' x1='1' y1='0' x2='0' y2='1'><stop stop-color='${accent}' stop-opacity='0.9' offset='0%'/><stop stop-color='${accent}' stop-opacity='0.2' offset='100%'/></linearGradient></defs><rect fill='url(#g1)' width='900' height='1600' rx='40'/><circle cx='220' cy='420' r='180' fill='url(#g2)'/><circle cx='720' cy='1260' r='220' fill='url(#g2)'/><rect x='180' y='1180' width='540' height='10' rx='5' fill='rgba(255,255,255,0.25)'/><rect x='180' y='1208' width='420' height='10' rx='5' fill='rgba(255,255,255,0.15)'/><rect x='180' y='1236' width='320' height='10' rx='5' fill='rgba(255,255,255,0.12)'/></svg>`)}`

export const videos: VideoMeta[] = [
  {
    id: 'aurora-city',
    title: 'Aurora City Drift',
    creator: 'Nora Blake',
    description: 'Midnight skating through neon-lit streets with a gentle synth groove.',
    tags: ['night ride', 'neon', 'flow'],
    music: 'Synth Bloom — Aya Kline',
    mood: 'Nightfall',
    src: '/media/flower.mp4',
    poster: poster('#0b0f27', '#1a2550', '#73fff2'),
    likes: 12400,
    comments: 641,
    shares: 320,
  },
  {
    id: 'sunrise-rush',
    title: 'Sunrise Rush',
    creator: 'Elijah Rio',
    description: 'First light over the coast, sprinting into golden hour with friends.',
    tags: ['dawn', 'cinematic', 'sprint'],
    music: 'Coastline — Indigo Parade',
    mood: 'Golden hour',
    src: '/media/flower.mp4',
    poster: poster('#26112c', '#311142', '#ff87d7'),
    likes: 9100,
    comments: 418,
    shares: 204,
  },
  {
    id: 'rooftop-haze',
    title: 'Rooftop Haze',
    creator: 'Mira Sol',
    description: 'Soft silhouettes, skyline silhouettes, and a bass line that never stops.',
    tags: ['city', 'bass', 'haze'],
    music: 'Velvet Signal — Dune',
    mood: 'Afterglow',
    src: '/media/flower.mp4',
    poster: poster('#0f1a24', '#0c2440', '#82b5ff'),
    likes: 16700,
    comments: 703,
    shares: 452,
  },
]
