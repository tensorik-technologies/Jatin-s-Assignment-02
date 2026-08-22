import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Clock, Pencil, Trash2, ArrowLeft } from 'lucide-react'
import CategoryBadge from '../components/CategoryBadge.jsx'
import LikeButton from '../components/LikeButton.jsx'
import BookmarkButton from '../components/BookmarkButton.jsx'
import CommentSection from '../components/CommentSection.jsx'
import Modal from '../components/Modal.jsx'
import EmptyState from '../components/EmptyState.jsx'
import BlogCard from '../components/BlogCard.jsx'
import { useBlogsContext } from '../context/BlogsContext.jsx'
import { useToast } from '../components/Toast.jsx'
import { formatDate } from '../utils/helpers.js'
import { formatReadingTime } from '../utils/readingTime.js'

function extractHeadings(html = '') {
  const matches = [...html.matchAll(/<h([23])>(.*?)<\/h\1>/g)]
  return matches.map((m, idx) => ({
    id: `heading-${idx}`,
    level: m[1],
    text: m[2].replace(/<[^>]*>/g, ''),
  }))
}

export default function BlogDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { blogs, likeBlog, bookmarkBlog, removeBlog, ready } = useBlogsContext()
  const { showToast } = useToast()
  const [confirmOpen, setConfirmOpen] = useState(false)

  const blog = blogs.find((b) => String(b.id) === String(id))
  const related = useMemo(() => {
    if (!blog) return []
    return blogs.filter((b) => b.id !== blog.id && b.category === blog.category).slice(0, 3)
  }, [blogs, blog])

  const headings = useMemo(() => extractHeadings(blog?.content), [blog])

  if (!ready) {
    return <div className="container-page py-24 text-center text-ink/50 dark:text-paper/50">Loading article…</div>
  }

  if (!blog) {
    return (
      <div className="container-page py-24">
        <EmptyState
          title="Article Not Found"
          description="This article may have been removed or the link is incorrect."
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

  const handleDelete = () => {
    removeBlog(blog.id)
    setConfirmOpen(false)
    showToast('Post deleted successfully!')
    navigate('/blogs')
  }

  return (
    <article className="pb-20">
      <div className="container-page pt-10 sm:pt-14">
        <Link to="/blogs" className="inline-flex items-center gap-1.5 text-sm text-ink/50 dark:text-paper/50 hover:text-ink dark:hover:text-paper mb-8">
          <ArrowLeft size={14} />
          Back to Blogs
        </Link>

        <div className="max-w-3xl mx-auto text-center">
          <CategoryBadge category={blog.category} size="lg" linkTo={`/blogs?category=${encodeURIComponent(blog.category)}`} />
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-ink dark:text-paper mt-5 mb-6">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <Link to={`/author/${blog.author?.id}`} className="flex items-center gap-2.5">
              <img src={blog.author?.avatar} alt={blog.author?.name} className="w-10 h-10 rounded-full object-cover" />
              <div className="text-left">
                <p className="text-sm font-medium text-ink dark:text-paper">{blog.author?.name}</p>
                <p className="text-xs text-ink/45 dark:text-paper/45">{formatDate(blog.publishedAt)}</p>
              </div>
            </Link>
            <span className="inline-flex items-center gap-1.5 text-sm text-ink/50 dark:text-paper/50">
              <Clock size={14} />
              {formatReadingTime(blog.content)}
            </span>
            <LikeButton blogId={blog.id} likes={blog.likes} onToggle={likeBlog} />
            <BookmarkButton blogId={blog.id} onToggle={bookmarkBlog} />
          </div>
        </div>
      </div>

      <div className="container-page mt-10">
        <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden aspect-[16/8] bg-paper-soft dark:bg-night-soft">
          <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="container-page mt-12">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-12">
          <div className="max-w-2xl mx-auto lg:mx-0 w-full">
            <div className="prose-article" dangerouslySetInnerHTML={{ __html: blog.content }} />

            {blog.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-ink/8 dark:border-white/10">
                {blog.tags.map((tag) => (
                  <span key={tag} className="chip">#{tag}</span>
                ))}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3 mt-8">
              <Link to={`/edit/${blog.id}`} className="btn-secondary">
                <Pencil size={14} />
                Edit
              </Link>
              <button onClick={() => setConfirmOpen(true)} className="btn-danger">
                <Trash2 size={14} />
                Delete
              </button>
            </div>

            <CommentSection blogId={blog.id} />
          </div>

          {headings.length > 0 && (
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <p className="text-xs font-semibold uppercase tracking-widest text-ink/40 dark:text-paper/40 mb-4">
                  In this article
                </p>
                <ul className="space-y-3 border-l border-ink/10 dark:border-white/10">
                  {headings.map((h) => (
                    <li key={h.id} className={h.level === '3' ? 'pl-7' : 'pl-4'}>
                      <span className="text-sm text-ink/55 dark:text-paper/55 -ml-px border-l-2 border-transparent pl-4 block">
                        {h.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <div className="container-page mt-20">
          <h2 className="font-display text-2xl font-semibold text-ink dark:text-paper mb-6">More in {blog.category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((b) => (
              <BlogCard key={b.id} blog={b} />
            ))}
          </div>
        </div>
      )}

      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Delete this article?"
        footer={
          <>
            <button onClick={() => setConfirmOpen(false)} className="btn-secondary">Cancel</button>
            <button onClick={handleDelete} className="btn-danger">Delete</button>
          </>
        }
      >
        Are you sure you want to delete this article? This will also remove its comments. This action cannot be
        undone.
      </Modal>
    </article>
  )
}
