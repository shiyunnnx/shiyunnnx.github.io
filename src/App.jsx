import './index.css'

const PROJECTS = [
  {
    title: 'Virtual Pokémon Binder',
    description:
      'An interactive, serverless Pokémon TCG binder with holographic card effects, drag-and-drop rearranging.',
    tech: ['Next.js', 'Vite', 'Zustand'],
    url: 'https://poke-binder-theta.vercel.app/',
    image: '/piplup.webp',
  },
]

function Hero() {
  const intro = "I'm a frontend engineer working at Sea.";

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden"
    >
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />
      <div className="blob blob-4" />
      <div className="blob blob-5" />

      <div className="relative z-10 max-w-2xl">
        <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
          Hi, I am
          <br className="sm:hidden" />
          {' '}
          <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent">
            Shi Yun
          </span>
        </h1>
        <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed">{intro}</p>

        <div className="mt-10 flex gap-6 justify-center flex-wrap">
          <a
            href="#projects"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-semibold shadow-lg hover:shadow-xl transition-shadow"
          >
            View Projects →
          </a>
          <a
            href="https://github.com/pokeyun"
            target="_blank"
            rel="noreferrer"
            className="underline-animate px-2 py-3 text-violet-600 font-semibold"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white border border-gray-100"
    >
      <img src={project.image} alt={project.title} className="w-full h-40 object-cover" />
      <div className="p-6 flex flex-col gap-3 flex-1">
        <h3 className="text-xl font-bold text-gray-800 group-hover:text-violet-600 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed flex-1">{project.description}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1 rounded-full text-xs font-medium bg-violet-50 text-violet-600 border border-violet-100"
            >
              {t}
            </span>
          ))}
        </div>
        <span className="mt-3 text-sm text-fuchsia-500 font-semibold group-hover:underline">
          Visit project →
        </span>
      </div>
    </a>
  )
}

function Projects() {
  return (
    <section id="projects" className="py-24 px-6 max-w-5xl mx-auto w-full">
      <div className="text-center mb-14">
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-800 mb-3">
          Ongoing{' '}
          <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
            Projects
          </span>
        </h2>
        <p className="text-gray-500 text-lg">Things I'm dabbling in.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-8 text-center text-sm text-gray-400 border-t border-gray-100">
      Exploring, learning, and building.
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Hero />
      <Projects />
      <Footer />
    </div>
  )
}
