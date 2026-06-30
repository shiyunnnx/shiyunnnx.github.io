import { Link } from 'react-router-dom'
import { BLOGS, type Blog } from '../data/blogs'

function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link
      to={`/blogs/${blog.id}`}
      className="group flex flex-col rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white border border-gray-100"
    >
      <div className={`h-44 bg-gradient-to-br ${blog.gradient} overflow-hidden`}>
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover object-top"
        />
      </div>
      <div className="p-6 flex flex-col gap-3 flex-1">
        <h3 className="text-xl font-bold text-gray-800 group-hover:text-violet-600 transition-colors">
          {blog.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed flex-1">{blog.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm text-fuchsia-500 font-semibold group-hover:underline">
            View more →
          </span>
        </div>
      </div>
    </Link>
  )
}

function Blogs() {
  const sortedBlogs = BLOGS.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);

  return (
    <section id="projects" className="py-24 px-6 max-w-5xl mx-auto w-full">
      <div className="text-center mb-14">
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-800 mb-3">
          My{' '}
          <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
            Blogs
          </span>
        </h2>
        <p className="text-gray-500 text-lg">Thoughts and insights</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedBlogs.map((b) => (
          <BlogCard key={b.id} blog={b} />
        ))}
      </div>
    </section>
  )
}

export default Blogs
