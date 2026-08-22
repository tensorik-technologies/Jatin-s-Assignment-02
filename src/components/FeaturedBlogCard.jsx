import { Link } from 'react-router-dom'
import { Clock } from 'lucide-react'
import CategoryBadge from './CategoryBadge.jsx'
import LikeButton from './LikeButton.jsx'
import BookmarkButton from './BookmarkButton.jsx'
import { formatDate } from '../utils/helpers.js'
import { formatReadingTime } from '../utils/readingTime.js'
import { useBlogsContext } from '../context/BlogsContext.jsx'

export default function FeaturedBlogCard({ blog, large = false }) {
  const { likeBlog, bookmarkBlog } = useBlogsContext()
  if (!blog) return null

  return (
    <article
      className={`group card-surface overflow-hidden flex flex-col hover:shadow-card-hover hover:-translate-y-1 ${
        large ? 'md:col-span-2 md:row-span-2' : ''
      }`}
    >
      <Link
        to={`/blog/${blog.id}`}
        className={`block relative overflow-hidden bg-paper-soft dark:bg-night-soft ${large ? 'aspect-[16/9]' : 'aspect-[16/11]'}`}
      >
        <img
          src={blog.image}
          alt={blog.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <CategoryBadge category={blog.category} size="lg" linkTo={`/blogs?category=${encodeURIComponent(blog.category)}`} />
          <span className="chip bg-white/90 dark:bg-night-panel/90 border-none">Featured</span>
        </div>
        <div className="absolute top-4 right-4">
          <BookmarkButton blogId={blog.id} onToggle={bookmarkBlog} variant="floating" />
        </div>
      </Link>

      <div className="p-6 flex flex-col flex-1">
        <Link to={`/blog/${blog.id}`}>
          <h3 className={`font-display font-semibold leading-tight text-ink dark:text-paper mb-3 group-hover:text-signal-500 transition-colors ${large ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>
            {blog.title}
          </h3>
        </Link>
        <p className="text-sm sm:text-base text-ink/60 dark:text-paper/60 line-clamp-3 mb-5 flex-1">{blog.excerpt}</p>

        <div className="flex items-center justify-between pt-4 border-t border-ink/8 dark:border-white/10">
          <Link to={`/author/${blog.author?.id}`} className="flex items-center gap-2.5 min-w-0">
            <img src={blog.author?.avatar} alt={blog.author?.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-ink dark:text-paper truncate">{blog.author?.name}</p>
              <p className="text-xs text-ink/45 dark:text-paper/45 flex items-center gap-2">
                {formatDate(blog.publishedAt)}
                <span className="inline-flex items-center gap-1">
                  <Clock size={11} />
                  {formatReadingTime(blog.content)}
                </span>
              </p>
            </div>
          </Link>
          <LikeButton blogId={blog.id} likes={blog.likes} onToggle={likeBlog} />
        </div>
      </div>
    </article>
  )
}
