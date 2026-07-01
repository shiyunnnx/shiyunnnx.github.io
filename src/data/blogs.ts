export interface Blog {
    id: string
    title: string
    description: string
    image: string
    gradient: string
    author: string
    date: string
  }
  
  export const BLOGS: Blog[] = [
    {
      id: 'hello-world',
      title: 'Hello World',
      description:
        'My first blog post.',
      image: '/cat.avif',
      gradient: 'from-yellow-400 via-red-400 to-pink-500',
      author: 'Shi Yun',
      date: '1 June 2026',
    },
    {
      id: 'virtual-pokemon-binder',
      title: 'Building a Virtual Pokémon Binder',
      description:
        'Thoughts behind building the virtual Pokémon binder.',
      image: '/piplup.webp',
      gradient: 'from-yellow-400 via-red-400 to-pink-500',
      author: 'Shi Yun',
      date: '25 June 2026',
    },
    {
      id: 'generative-ui',
      title: 'Exploring Generative UI',
      description:
        'My journey into Generative UI.',
      image: '/generative-ui.webp',
      gradient: 'from-yellow-400 via-red-400 to-pink-500',
      author: 'Shi Yun',
      date: '1 July 2026',
    }
  ]
  