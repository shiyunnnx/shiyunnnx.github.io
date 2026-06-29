import { Link } from 'react-router-dom'
import { PROJECTS, type Project } from '../data/projects'

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to={`/projects/${project.id}`}
      className="group flex flex-col rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white border border-gray-100"
    >
      <div className={`h-44 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-top"
        />
      </div>
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
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm text-fuchsia-500 font-semibold group-hover:underline">
            Read more →
          </span>
          <a
            href={project.externalUrl}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-gray-400 hover:text-violet-600 transition-colors"
            title="Visit live project"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </div>
    </Link>
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
        <p className="text-gray-500 text-lg">Things I'm building and exploring.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  )
}

export default Projects
