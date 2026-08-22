import { Link } from 'react-router-dom'
import { Feather, Twitter, Github, Linkedin } from 'lucide-react'
import { CATEGORIES } from '../utils/helpers.js'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-ink/8 dark:border-white/10">
      <div className="container-page py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-lg bg-ink dark:bg-paper flex items-center justify-center">
                <Feather size={16} className="text-paper dark:text-ink" />
              </span>
              <span className="font-display text-lg font-semibold text-ink dark:text-paper">Marginalia</span>
            </Link>
            <p className="text-sm text-ink/55 dark:text-paper/55 leading-relaxed mb-5">
              A place for thoughtful articles, practical insights, and annotated ideas from a community of
              writers.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://twitter.com" aria-label="Twitter" className="w-9 h-9 rounded-full border border-ink/12 dark:border-white/15 flex items-center justify-center text-ink/50 dark:text-paper/50 hover:text-signal-500 hover:border-signal-500 transition-colors">
                <Twitter size={15} />
              </a>
              <a href="https://github.com" aria-label="GitHub" className="w-9 h-9 rounded-full border border-ink/12 dark:border-white/15 flex items-center justify-center text-ink/50 dark:text-paper/50 hover:text-signal-500 hover:border-signal-500 transition-colors">
                <Github size={15} />
              </a>
              <a href="https://linkedin.com" aria-label="LinkedIn" className="w-9 h-9 rounded-full border border-ink/12 dark:border-white/15 flex items-center justify-center text-ink/50 dark:text-paper/50 hover:text-signal-500 hover:border-signal-500 transition-colors">
                <Linkedin size={15} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-ink/40 dark:text-paper/40 mb-4">
              Navigate
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="text-ink/60 dark:text-paper/60 hover:text-ink dark:hover:text-paper">Home</Link></li>
              <li><Link to="/blogs" className="text-ink/60 dark:text-paper/60 hover:text-ink dark:hover:text-paper">Blogs</Link></li>
              <li><Link to="/create" className="text-ink/60 dark:text-paper/60 hover:text-ink dark:hover:text-paper">Write an article</Link></li>
              <li><Link to="/about" className="text-ink/60 dark:text-paper/60 hover:text-ink dark:hover:text-paper">About</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-ink/40 dark:text-paper/40 mb-4">
              Categories
            </h4>
            <ul className="space-y-3 text-sm">
              {CATEGORIES.slice(0, 5).map((category) => (
                <li key={category}>
                  <Link
                    to={`/blogs?category=${encodeURIComponent(category)}`}
                    className="text-ink/60 dark:text-paper/60 hover:text-ink dark:hover:text-paper"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-ink/40 dark:text-paper/40 mb-4">
              Legal
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/privacy" className="text-ink/60 dark:text-paper/60 hover:text-ink dark:hover:text-paper">Privacy</Link></li>
              <li><Link to="/terms" className="text-ink/60 dark:text-paper/60 hover:text-ink dark:hover:text-paper">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-ink/8 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink/45 dark:text-paper/45">
            © {new Date().getFullYear()} Marginalia. All rights reserved.
          </p>
          <p className="text-xs text-ink/45 dark:text-paper/45">Built with React, Vite &amp; Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  )
}
