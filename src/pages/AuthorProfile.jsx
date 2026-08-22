import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Twitter, Github, Linkedin, FileText, Heart } from 'lucide-react'
import BlogCard from '../components/BlogCard.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { useBlogsContext } from '../context/BlogsContext.jsx'

const SOCIAL_ICONS = { twitter: Twitter, github: Github, linkedin: Linkedin }

export default function AuthorProfile() {
  const { id } = useParams()
  const { blogs, ready } = useBlogsContext()

  const authorBlogs = blogs.filter((b) => String(b.author?.id) === String(id))
  const author = authorBlogs[0]?.author

  if (!ready) {
    return <div className="container-page py-24 text-center text-ink/50 dark:text-paper/50">Loading…</div>
  }

  if (!author) {
    return (
      <div className="container-page py-24">
        <EmptyState
          title="Author Not Found"
          description="We couldn't find a writer with this profile."
          action={
            <Link to="/blogs" className="btn-secondary">
              <ArrowLeft size={15} />
              Back to Blogs
            </Link>
          }
        />
      </div>
    )
  }

  const totalLikes = authorBlogs.reduce((sum, b) => sum + (b.likes || 0), 0)

  return (
    <div className="container-page py-14 sm:py-20">
      <Link to="/blogs" className="inline-flex items-center gap-1.5 text-sm text-ink/50 dark:text-paper/50 hover:text-ink dark:hover:text-paper mb-8">
        <ArrowLeft size={14} />
        Back to Blogs
      </Link>

      <div className="card-surface p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-14">
        <img src={author.avatar} alt={author.name} className="w-24 h-24 rounded-full object-cover shrink-0" />
        <div className="flex-1">
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink dark:text-paper mb-2">
            {author.name}
          </h1>
          <p className="text-ink/60 dark:text-paper/60 leading-relaxed max-w-xl mb-4">{author.bio}</p>
          <div className="flex flex-wrap items-center gap-5">
            <span className="inline-flex items-center gap-1.5 text-sm text-ink/55 dark:text-paper/55">
              <FileText size={14} />
              {authorBlogs.length} {authorBlogs.length === 1 ? 'article' : 'articles'}
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-ink/55 dark:text-paper/55">
              <Heart size={14} />
              {totalLikes} total likes
            </span>
            {author.social &&
              Object.entries(author.social).map(([key, url]) => {
                const Icon = SOCIAL_ICONS[key]
                if (!Icon) return null
                return (
                  <a
                    key={key}
                    href={url}
                    aria-label={key}
                    className="text-ink/45 dark:text-paper/45 hover:text-signal-500"
                  >
                    <Icon size={16} />
                  </a>
                )
              })}
          </div>
        </div>
      </div>

      <h2 className="font-display text-2xl font-semibold text-ink dark:text-paper mb-6">
        Articles by {author.name}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {authorBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  )
}
