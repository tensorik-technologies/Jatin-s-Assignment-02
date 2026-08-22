import { Link } from 'react-router-dom'
import { Clock } from 'lucide-react'
import CategoryBadge from './CategoryBadge.jsx'
import LikeButton from './LikeButton.jsx'
import BookmarkButton from './BookmarkButton.jsx'
import { formatDate } from '../utils/helpers.js'
import { formatReadingTime } from '../utils/readingTime.js'
import { useBlogsContext } from '../context/BlogsContext.jsx'

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&q=80'

export default function BlogCard({ blog }) {
  const { likeBlog, bookmarkBlog } = useBlogsContext()

  if (!blog) return null

  return (
    <article className="group card-surface overflow-hidden flex flex-col hover:shadow-card-hover hover:-translate-y-1">
      <Link to={`/blog/${blog.id}`} className="block relative aspect-[16/10] overflow-hidden bg-paper-soft dark:bg-night-soft">
        <img
          src={blog.image || FALLBACK_IMAGE}
          alt={blog.title}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = FALLBACK_IMAGE
          }}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <CategoryBadge category={blog.category} linkTo={`/blogs?category=${encodeURIComponent(blog.category)}`} />
        </div>
        <div className="absolute top-3 right-3">
          <BookmarkButton blogId={blog.id} onToggle={bookmarkBlog} variant="floating" />
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <Link to={`/blog/${blog.id}`}>
          <h3 className="font-display text-lg font-semibold leading-snug text-ink dark:text-paper mb-2 line-clamp-2 group-hover:text-signal-500 transition-colors">
            {blog.title}
          </h3>
        </Link>
        <p className="text-sm text-ink/60 dark:text-paper/60 line-clamp-2 mb-4 flex-1">{blog.excerpt}</p>

        <div className="flex items-center justify-between pt-4 border-t border-ink/8 dark:border-white/10">
          <Link to={`/author/${blog.author?.id}`} className="flex items-center gap-2 min-w-0" onClick={(e) => e.stopPropagation()}>
            <img
              src={blog.author?.avatar}
              alt={blog.author?.name}
              className="w-7 h-7 rounded-full object-cover shrink-0"
            />
            <div className="min-w-0">
              <p className="text-xs font-medium text-ink dark:text-paper truncate">{blog.author?.name}</p>
              <p className="text-[11px] text-ink/45 dark:text-paper/45">{formatDate(blog.publishedAt)}</p>
            </div>
          </Link>

          <div className="flex items-center gap-3 shrink-0">
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-ink/45 dark:text-paper/45">
              <Clock size={12} />
              {formatReadingTime(blog.content)}
            </span>
            <LikeButton blogId={blog.id} likes={blog.likes} onToggle={likeBlog} size="sm" />
          </div>
        </div>
      </div>
    </article>
  )
}
