import { useEffect, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { PROJECTS } from '../data/projects'

// Eagerly grab all .md files under content/ as raw strings
const contentModules = import.meta.glob('../content/*.md', { query: '?raw', import: 'default' })

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>()
  const project = PROJECTS.find((p) => p.id === id)
  const [markdown, setMarkdown] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    const loader = contentModules[`../content/${id}.md`]
    if (!loader) return
    loader().then((mod) => setMarkdown(mod as string))
  }, [id])

  if (!project) return <Navigate to="/" replace />

  return (
    <div className="min-h-screen bg-white">
      {/* Hero banner */}
      <div className={`w-full h-64 sm:h-80 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-top opacity-60 mix-blend-overlay"
        />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-3xl mx-auto w-full px-6 pb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              {project.tech.map((t) => (
                <span key={t} className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
                  {t}
                </span>
              ))}
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight drop-shadow">
              {project.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 py-10">
        {/* Author row */}
        <div className="flex items-center gap-4 pb-8 border-b border-gray-100 mb-8">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
            SY
          </div>
          <div>
            <p className="font-semibold text-gray-800 text-sm">{project.author}</p>
            <p className="text-gray-400 text-sm">{project.date}</p>
          </div>
          <a
            href={project.externalUrl}
            target="_blank"
            rel="noreferrer"
            className="ml-auto px-4 py-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white text-sm font-semibold hover:shadow-md transition-shadow shrink-0"
          >
            Visit project ↗
          </a>
        </div>

        {/* Markdown content */}
        {markdown === null ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-4 bg-gray-100 rounded w-3/4" />
            <div className="h-4 bg-gray-100 rounded w-full" />
            <div className="h-4 bg-gray-100 rounded w-5/6" />
          </div>
        ) : (
          <ReactMarkdown
            components={{
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">{children}</h2>
              ),
              p: ({ children }) => (
                <p className="text-gray-700 leading-relaxed text-lg mb-6">{children}</p>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-gray-900">{children}</strong>
              ),
              code: ({ children }) => (
                <code className="px-1.5 py-0.5 rounded bg-gray-100 text-violet-700 text-sm font-mono">{children}</code>
              ),
              a: ({ href, children }) => (
                <a href={href} target="_blank" rel="noreferrer" className="text-violet-600 underline underline-offset-2 hover:text-fuchsia-500 transition-colors">{children}</a>
              ),
            }}
          >
            {markdown}
          </ReactMarkdown>
        )}
      </article>

      {/* Back link */}
      <div className="max-w-3xl mx-auto px-6 pb-16">
        <Link to="/#projects" className="underline-animate text-sm text-violet-500 font-medium">
          ← Back to projects
        </Link>
      </div>
    </div>
  )
}
