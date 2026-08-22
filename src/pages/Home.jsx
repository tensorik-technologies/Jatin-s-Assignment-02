import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Mail } from 'lucide-react'
import FeaturedBlogCard from '../components/FeaturedBlogCard.jsx'
import BlogCard from '../components/BlogCard.jsx'
import { useBlogsContext } from '../context/BlogsContext.jsx'
import { CATEGORIES, CATEGORY_COLORS } from '../utils/helpers.js'
import { useToast } from '../components/Toast.jsx'

export default function Home() {
  const { blogs, ready } = useBlogsContext()
  const { showToast } = useToast()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const featured = useMemo(() => blogs.filter((b) => b.featured).slice(0, 3), [blogs])
  const latest = useMemo(
    () => [...blogs].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)).slice(0, 6),
    [blogs],
  )

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
    setEmail('')
    showToast('You are subscribed. Welcome aboard!')
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-[0.35] dark:opacity-[0.18]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(52,84,209,0.35) 1px, transparent 0)', backgroundSize: '28px 28px' }}
          aria-hidden="true"
        />
        <div className="absolute -top-24 right-[-8%] w-[420px] h-[420px] rounded-full bg-signal-400/15 blur-3xl -z-10" aria-hidden="true" />
        <div className="container-page pt-16 sm:pt-24 pb-20 sm:pb-28">
          <div className="max-w-3xl">
            <span className="eyebrow inline-flex items-center gap-2 mb-5">
              <Sparkles size={13} />
              Notes from thoughtful people
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.08] tracking-tight text-ink dark:text-paper">
              Stories, Ideas &amp; Perspectives
            </h1>
            <p className="mt-6 text-lg text-ink/60 dark:text-paper/60 max-w-xl leading-relaxed">
              Discover thoughtful articles, practical insights, and inspiring stories from our community of
              writers, engineers, and designers.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link to="/blogs" className="btn-primary">
                Explore Blogs
                <ArrowRight size={16} />
              </Link>
              <Link to="/create" className="btn-secondary">
                Start Writing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="container-page mb-24">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="eyebrow">Featured</span>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink dark:text-paper mt-2">
                Worth your undivided attention
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featured.map((blog, idx) => (
              <FeaturedBlogCard key={blog.id} blog={blog} large={idx === 0} />
            ))}
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="container-page mb-24">
        <div className="mb-8">
          <span className="eyebrow">Browse</span>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink dark:text-paper mt-2">
            Find your next read by topic
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {CATEGORIES.map((category) => (
            <Link
              key={category}
              to={`/blogs?category=${encodeURIComponent(category)}`}
              className="group card-surface p-5 flex items-center justify-between hover:shadow-card-hover hover:-translate-y-0.5"
            >
              <span className="font-display text-base font-medium text-ink dark:text-paper">{category}</span>
              <span
                className={`w-2.5 h-2.5 rounded-full ${(CATEGORY_COLORS[category] || '').split(' ')[0]}`}
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      </section>

      {/* Latest */}
      <section className="container-page mb-24">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="eyebrow">Fresh ink</span>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink dark:text-paper mt-2">
              Latest articles
            </h2>
          </div>
          <Link to="/blogs" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-signal-500 hover:text-signal-600">
            View All Blogs
            <ArrowRight size={14} />
          </Link>
        </div>

        {!ready ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card-surface h-80 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latest.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}

        <div className="mt-8 flex sm:hidden justify-center">
          <Link to="/blogs" className="btn-secondary">
            View All Blogs
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container-page mb-24">
        <div className="card-surface bg-ink dark:bg-signal-700 text-paper border-none px-8 py-14 sm:px-16 sm:py-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(246,245,241,0.6) 1px, transparent 0)', backgroundSize: '24px 24px' }} aria-hidden="true" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-paper/60 mb-4">
              <Mail size={13} />
              Newsletter
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-3">Stay in the loop</h2>
            <p className="text-paper/70 max-w-md mx-auto mb-8">
              One thoughtful email a week. No spam, unsubscribe anytime.
            </p>
            {subscribed ? (
              <p className="text-sm font-medium text-paper bg-white/10 inline-flex items-center gap-2 rounded-full px-5 py-3">
                You're subscribed — thanks for joining us.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-full px-5 py-3.5 text-sm text-ink outline-none focus:ring-2 focus:ring-white/50"
                />
                <button type="submit" className="btn-accent w-full sm:w-auto shrink-0">
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
