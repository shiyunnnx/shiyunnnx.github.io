export interface Project {
  id: number
  title: string
  description: string
  tech: string[]
  externalUrl: string
  gradient: string
  image: string
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Virtual Pokémon Binder',
    description:
      'An interactive, serverless Pokémon TCG virtual binder with drag-and-drop arranging.',
    tech: ['Next.js', 'Zustand', 'Framer Motion'],
    externalUrl: 'https://poke-binder-theta.vercel.app/',
    gradient: 'from-yellow-400 via-red-400 to-pink-500',
    image: '/piplup.webp',
  },
  {
    id: 2,
    title: 'Generative UI',
    description:
      'Generative UI demo using Claude prompts',
    tech: ['React', 'TypeScript', 'Tailwind CSS'],
    externalUrl: 'https://github.com/shiyunnnx/generative-ui',
    gradient: 'from-yellow-400 via-red-400 to-pink-500',
    image: '/generative-ui.webp',
  }
]
