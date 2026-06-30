import { Routes, Route, Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import Blogs from './components/Blogs'
import Projects from './components/Projects'
import BlogPage from './pages/BlogPage'
import './index.css'

function Hero() {
  const intro = "I'm a frontend engineer working at Sea."

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

        <div className="mt-10 flex gap-4 justify-center flex-wrap">
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

function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <Blogs />
    </>
  )
}

function Layout() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Outlet />
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/blogs/:id" element={<BlogPage />} />
      </Route>
    </Routes>
  )
}
