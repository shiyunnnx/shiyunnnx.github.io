export interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  externalUrl: string
  gradient: string
  image: string
  author: string
  date: string
}

export const PROJECTS: Project[] = [
  {
    id: 'virtual-pokemon-binder',
    title: 'Virtual Pokémon Binder',
    description:
      'An interactive, serverless Pokémon TCG virtual binder with drag-and-drop arranging.',
    tech: ['Next.js', 'Zustand', 'Framer Motion'],
    externalUrl: 'https://poke-binder-theta.vercel.app/',
    gradient: 'from-yellow-400 via-red-400 to-pink-500',
    image: '/piplup.webp',
    author: 'Shi Yun',
    date: '29 June 2026',
  },
]
