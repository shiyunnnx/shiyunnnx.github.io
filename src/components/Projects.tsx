import { Link } from 'react-router-dom'
import { PROJECTS, type Project } from '../data/projects'

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to={project.externalUrl}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
    >
      <div className={`h-44 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-top"
        />
      </div>
      <div className="p-6 flex flex-col gap-3 flex-1">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed flex-1">{project.description}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1 rounded-full text-xs font-medium bg-violet-50 text-violet-600 border border-violet-100 dark:bg-violet-500/10 dark:text-violet-300 dark:border-violet-500/20"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm text-fuchsia-500 dark:text-fuchsia-400 font-semibold group-hover:underline">
            View more →
          </span>
        </div>
      </div>
    </Link>
  )
}

function Projects() {
  return (
    <section id="projects" className="py-24 px-6 max-w-5xl mx-auto w-full">
      <div className="text-center mb-14">
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-800 dark:text-gray-100 mb-3">
          Ongoing{' '}
          <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
            Projects
          </span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-lg">Things I'm building and exploring.</p>
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
