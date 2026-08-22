import { useNavigate, useParams, Link } from 'react-router-dom'
import BlogForm from '../components/BlogForm.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { useBlogsContext } from '../context/BlogsContext.jsx'
import { useToast } from '../components/Toast.jsx'
import { ArrowLeft } from 'lucide-react'

export default function EditBlog() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { blogs, editBlog, ready } = useBlogsContext()
  const { showToast } = useToast()

  const blog = blogs.find((b) => String(b.id) === String(id))

  if (!ready) {
    return <div className="container-page py-24 text-center text-ink/50 dark:text-paper/50">Loading…</div>
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

  const handleSubmit = (values) => {
    editBlog(blog.id, {
      title: values.title.trim(),
      excerpt: values.excerpt.trim(),
      content: values.content,
      image: values.image.trim(),
      category: values.category,
      author: { ...blog.author, name: values.authorName.trim() || blog.author?.name },
      tags: values.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      featured: values.featured,
    })
    showToast('Post updated successfully!')
    navigate(`/blog/${blog.id}`)
  }

  return (
    <div className="container-page py-14 sm:py-20">
      <div className="max-w-2xl mb-10">
        <span className="eyebrow">Edit</span>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink dark:text-paper mt-2 mb-3">
          Edit article
        </h1>
        <p className="text-ink/60 dark:text-paper/60">Update your article and save your changes.</p>
      </div>

      <div className="max-w-3xl">
        <BlogForm
          initialValues={{
            title: blog.title,
            excerpt: blog.excerpt,
            content: blog.content,
            image: blog.image,
            category: blog.category,
            authorName: blog.author?.name || '',
            tags: (blog.tags || []).join(', '),
            featured: Boolean(blog.featured),
          }}
          onSubmit={handleSubmit}
          submitLabel="Save Changes"
          showDraft={false}
        />
      </div>
    </div>
  )
}
