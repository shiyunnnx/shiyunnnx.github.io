import { useEffect, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { BLOGS } from '../data/blogs'
import CodeBlock, { SUPPORTED_LANGUAGES } from '../components/CodeBlock'

// Eagerly grab all .md files under content/ as raw strings
const contentModules = import.meta.glob('../content/*.md', { query: '?raw', import: 'default' })

function Navbar() {
  return (
    <nav className="sticky top-0 z-10 bg-white/80 dark:bg-gray-950/80 backdrop-blur border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Home
          </Link>
        </div>
      </nav>
  )
}

export default function BlogPage() {
  const { id } = useParams<{ id: string }>()
  const blog = BLOGS.find((b) => b.id === id)
  const [markdown, setMarkdown] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    const loader = contentModules[`../content/${id}.md`]
    if (!loader) return
    loader().then((mod) => setMarkdown(mod as string))
  }, [id])

  if (!blog) return <Navigate to="/" replace />

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Top navbar */}
      <Navbar />

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 py-10">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-50 leading-tight mb-8">
          {blog.title}
        </h1>

        {/* Author row */}
        <div className="flex items-center gap-4 pb-8 border-b border-gray-100 dark:border-gray-800 mb-8">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
            SY
          </div>
          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{blog.author}</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm">{blog.date}</p>
          </div>
        </div>

        {/* Markdown content */}
        {markdown === null ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-3/4" />
            <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-full" />
            <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-5/6" />
          </div>
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mt-10 mb-4">{children}</h2>
              ),
              p: ({ children }) => (
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mb-6">{children}</p>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-gray-900 dark:text-gray-100">{children}</strong>
              ),
              pre: ({ children }) => <>{children}</>,
              code: ({ className, children }) => {
                const match = /language-(\w+)/.exec(className || '')
                const code = String(children).replace(/\n$/, '')
                // Fenced blocks always come through with a className OR span multiple
                // lines; genuine inline code (single backtick) never contains a newline.
                const isBlock = Boolean(match) || code.includes('\n')

                if (isBlock) {
                  const language = match?.[1]
                  if (language && SUPPORTED_LANGUAGES.has(language)) {
                    return <CodeBlock language={language}>{code}</CodeBlock>
                  }
                  // Fenced block with no (or unsupported) language: still render as a plain block.
                  return (
                    <pre className="my-6 rounded-xl overflow-x-auto p-4 bg-[#1e1e1e] text-gray-100 text-sm">
                      <code className="font-mono">{code}</code>
                    </pre>
                  )
                }

                return (
                  <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-violet-700 dark:text-violet-300 text-sm font-mono">
                    {children}
                  </code>
                )
              },
              a: ({ href, children }) => (
                <a href={href} target="_blank" rel="noreferrer" className="text-violet-600 dark:text-violet-400 underline underline-offset-2 hover:text-fuchsia-500 dark:hover:text-fuchsia-400 transition-colors">{children}</a>
              ),
              img: ({ src, alt, title }) => {
                const resolvedSrc = src?.startsWith('http') ? src : `/content/${id}/${src}`
                return (
                  <figure className="my-6">
                    <img
                      src={resolvedSrc}
                      alt={alt ?? ''}
                      className="w-full rounded-2xl shadow-md"
                    />
                    {title && (
                      <figcaption className="mt-2 text-center text-sm italic text-gray-500 dark:text-gray-400">
                        {title}
                      </figcaption>
                    )}
                  </figure>
                )
              },
              table: ({ children }) => (
                <div className="overflow-x-auto my-6 rounded-xl border border-gray-100 dark:border-gray-800">
                  <table className="w-full text-left border-collapse text-sm">{children}</table>
                </div>
              ),
              thead: ({ children }) => (
                <thead className="bg-gray-50 dark:bg-gray-800/60">{children}</thead>
              ),
              tr: ({ children }) => (
                <tr className="border-b border-gray-100 dark:border-gray-800 last:border-0">{children}</tr>
              ),
              th: ({ children }) => (
                <th className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100 align-top">{children}</th>
              ),
              td: ({ children }) => (
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300 align-top">{children}</td>
              ),
            }}
          >
            {markdown}
          </ReactMarkdown>
        )}
      </article>

      {/* Back link */}
      <div className="max-w-3xl mx-auto px-6 pb-16">
        <Link to="/#blogs" className="underline-animate text-sm text-violet-500 dark:text-violet-400 font-medium">
          ← Back to blogs
        </Link>
      </div>
    </div>
  )
}
