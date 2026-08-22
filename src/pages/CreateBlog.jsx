import { useNavigate } from 'react-router-dom'
import BlogForm from '../components/BlogForm.jsx'
import { useBlogsContext } from '../context/BlogsContext.jsx'
import { useToast } from '../components/Toast.jsx'

export default function CreateBlog() {
  const navigate = useNavigate()
  const { createBlog } = useBlogsContext()
  const { showToast } = useToast()

  const handleSubmit = (values) => {
    const created = createBlog({
      title: values.title.trim(),
      excerpt: values.excerpt.trim() || values.content.replace(/<[^>]*>/g, '').slice(0, 140),
      content: values.content,
      image: values.image.trim(),
      category: values.category,
      author: {
        id: 'guest-writer',
        name: values.authorName.trim() || 'Anonymous',
        avatar: 'https://i.pravatar.cc/150?img=68',
        bio: 'A member of the Marginalia community.',
      },
      tags: values.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      featured: values.featured,
      draft: values.status === 'draft',
    })

    if (values.status === 'draft') {
      showToast('Draft saved')
      navigate('/blogs')
    } else {
      showToast('Post published successfully!')
      navigate(`/blog/${created.id}`)
    }
  }

  return (
    <div className="container-page py-14 sm:py-20">
      <div className="max-w-2xl mb-10">
        <span className="eyebrow">Write</span>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink dark:text-paper mt-2 mb-3">
          Create a new article
        </h1>
        <p className="text-ink/60 dark:text-paper/60">
          Share something thoughtful with the Marginalia community.
        </p>
      </div>

      <div className="max-w-3xl">
        <BlogForm onSubmit={handleSubmit} submitLabel="Publish Post" />
      </div>
    </div>
  )
}
