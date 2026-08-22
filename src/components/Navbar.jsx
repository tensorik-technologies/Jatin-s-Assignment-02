import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Feather, Menu, X, Search, Moon, Sun, PenLine } from 'lucide-react'
import { useTheme } from '../hooks/useTheme.js'

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/blogs', label: 'Blogs' },
  { to: '/blogs?category=Technology', label: 'Categories' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [])

  const handleSearchClick = () => {
    navigate('/blogs')
  }

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? 'text-ink dark:text-paper' : 'text-ink/55 dark:text-paper/55 hover:text-ink dark:hover:text-paper'
    }`

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-paper/85 dark:bg-night/85 backdrop-blur-md border-b border-ink/8 dark:border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="container-page flex items-center justify-between h-16 sm:h-[72px]">
        <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="Marginalia home">
          <span className="w-8 h-8 rounded-lg bg-ink dark:bg-paper flex items-center justify-center">
            <Feather size={16} className="text-paper dark:text-ink" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-ink dark:text-paper">
            Marginalia
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.label} to={link.to} end={link.end} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={handleSearchClick}
            aria-label="Search articles"
            className="w-10 h-10 rounded-full flex items-center justify-center text-ink/60 dark:text-paper/60 hover:bg-ink/5 dark:hover:bg-white/10 transition-colors"
          >
            <Search size={18} />
          </button>
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-10 h-10 rounded-full flex items-center justify-center text-ink/60 dark:text-paper/60 hover:bg-ink/5 dark:hover:bg-white/10 transition-colors"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link to="/create" className="btn-accent !py-2.5 !px-5">
            <PenLine size={15} />
            Create Post
          </Link>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-10 h-10 rounded-full flex items-center justify-center text-ink/60 dark:text-paper/60"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="w-10 h-10 rounded-full flex items-center justify-center text-ink dark:text-paper"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="absolute inset-0 bg-ink/50" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[82%] max-w-xs bg-paper dark:bg-night shadow-card-hover p-6 flex flex-col animate-fade-up" style={{ animationDuration: '0.25s' }}>
            <div className="flex items-center justify-between mb-8">
              <span className="font-display text-lg font-semibold text-ink dark:text-paper">Menu</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-ink dark:text-paper">
                <X size={22} />
              </button>
            </div>
            <nav className="flex flex-col gap-1" aria-label="Mobile primary">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.to}
                  end={link.end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-3 rounded-lg text-base font-medium ${
                      isActive
                        ? 'bg-ink/5 dark:bg-white/10 text-ink dark:text-paper'
                        : 'text-ink/60 dark:text-paper/60'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
            <Link
              to="/create"
              onClick={() => setOpen(false)}
              className="btn-accent mt-6 w-full"
            >
              <PenLine size={15} />
              Create Post
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
