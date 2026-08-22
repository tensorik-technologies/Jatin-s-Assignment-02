import { useState } from 'react'
import RichTextEditor from './RichTextEditor.jsx'
import { CATEGORIES } from '../utils/helpers.js'

const EMPTY = {
  title: '',
  excerpt: '',
  content: '',
  image: '',
  category: '',
  authorName: '',
  tags: '',
  featured: false,
}

export default function BlogForm({ initialValues, onSubmit, submitLabel = 'Publish Post', showDraft = true }) {
  const [values, setValues] = useState({ ...EMPTY, ...initialValues })
  const [errors, setErrors] = useState({})

  const update = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  const validate = () => {
    const nextErrors = {}
    if (!values.title.trim()) nextErrors.title = 'Title is required.'
    if (!values.content.trim()) nextErrors.content = 'Content is required.'
    if (!values.category.trim()) nextErrors.category = 'Category is required.'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (e, status = 'published') => {
    e.preventDefault()
    if (status === 'published' && !validate()) return
    if (status === 'draft' && !values.title.trim()) {
      setErrors({ title: 'Give your draft a title before saving.' })
      return
    }
    onSubmit({ ...values, status })
  }

  return (
    <form onSubmit={(e) => handleSubmit(e, 'published')} noValidate className="space-y-6">
      <div>
        <label htmlFor="title" className="label-field">Title</label>
        <input
          id="title"
          type="text"
          value={values.title}
          onChange={(e) => update('title', e.target.value)}
          placeholder="Give your article a compelling title"
          className="input-field text-lg font-display"
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? 'title-error' : undefined}
        />
        {errors.title && <p id="title-error" className="text-xs text-coral-500 mt-1.5">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="excerpt" className="label-field">Excerpt</label>
        <textarea
          id="excerpt"
          value={values.excerpt}
          onChange={(e) => update('excerpt', e.target.value)}
          placeholder="A one or two sentence summary shown on cards"
          rows={2}
          className="input-field resize-none"
        />
      </div>

      <div>
        <label htmlFor="content" className="label-field">Content</label>
        <RichTextEditor
          value={values.content}
          onChange={(val) => update('content', val)}
          placeholder="Write your article here. Use the toolbar to add formatting…"
        />
        {errors.content && <p className="text-xs text-coral-500 mt-1.5">{errors.content}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="image" className="label-field">Cover Image URL</label>
          <input
            id="image"
            type="url"
            value={values.image}
            onChange={(e) => update('image', e.target.value)}
            placeholder="https://images.unsplash.com/…"
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="category" className="label-field">Category</label>
          <select
            id="category"
            value={values.category}
            onChange={(e) => update('category', e.target.value)}
            className="input-field"
            aria-invalid={Boolean(errors.category)}
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <p className="text-xs text-coral-500 mt-1.5">{errors.category}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="authorName" className="label-field">Author</label>
          <input
            id="authorName"
            type="text"
            value={values.authorName}
            onChange={(e) => update('authorName', e.target.value)}
            placeholder="Your name"
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="tags" className="label-field">Tags</label>
          <input
            id="tags"
            type="text"
            value={values.tags}
            onChange={(e) => update('tags', e.target.value)}
            placeholder="comma, separated, tags"
            className="input-field"
          />
        </div>
      </div>

      <label className="flex items-center gap-3 text-sm text-ink/70 dark:text-paper/70 cursor-pointer">
        <input
          type="checkbox"
          checked={values.featured}
          onChange={(e) => update('featured', e.target.checked)}
          className="w-4 h-4 rounded accent-signal-500"
        />
        Mark as featured post
      </label>

      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-ink/8 dark:border-white/10">
        <button type="submit" className="btn-accent">{submitLabel}</button>
        {showDraft && (
          <button type="button" onClick={(e) => handleSubmit(e, 'draft')} className="btn-secondary">
            Save Draft
          </button>
        )}
        <button type="button" onClick={() => window.history.back()} className="btn-secondary !border-transparent">
          Cancel
        </button>
      </div>
    </form>
  )
}
