import { useState } from 'react'
import { MessageCircle, Send } from 'lucide-react'
import Comment from './Comment.jsx'
import { addComment, deleteComment, getComments } from '../utils/storage.js'
import { useToast } from './Toast.jsx'

export default function CommentSection({ blogId }) {
  const [comments, setComments] = useState(() => getComments(blogId))
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [errors, setErrors] = useState({})
  const { showToast } = useToast()

  const handleSubmit = (e) => {
    e.preventDefault()
    const nextErrors = {}
    if (!name.trim()) nextErrors.name = 'Please enter your name.'
    if (!text.trim()) nextErrors.text = 'Comment cannot be empty.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const created = addComment(blogId, { name: name.trim(), text: text.trim() })
    setComments((prev) => [created, ...prev])
    setName('')
    setText('')
    showToast('Comment added')
  }

  const handleDelete = (commentId) => {
    deleteComment(blogId, commentId)
    setComments((prev) => prev.filter((c) => c.id !== commentId))
    showToast('Comment removed')
  }

  return (
    <section aria-labelledby="comments-heading" className="mt-14">
      <h2 id="comments-heading" className="font-display text-2xl font-semibold text-ink dark:text-paper flex items-center gap-2 mb-6">
        <MessageCircle size={22} />
        Comments
        <span className="text-ink/40 dark:text-paper/40 font-sans text-base font-normal">({comments.length})</span>
      </h2>

      <form onSubmit={handleSubmit} className="card-surface p-5 sm:p-6 mb-8" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="comment-name" className="label-field">Name</label>
            <input
              id="comment-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="input-field"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'comment-name-error' : undefined}
            />
            {errors.name && (
              <p id="comment-name-error" className="text-xs text-coral-500 mt-1.5">{errors.name}</p>
            )}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="comment-text" className="label-field">Comment</label>
          <textarea
            id="comment-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Share your thoughts…"
            rows={3}
            className="input-field resize-none"
            aria-invalid={Boolean(errors.text)}
            aria-describedby={errors.text ? 'comment-text-error' : undefined}
          />
          {errors.text && (
            <p id="comment-text-error" className="text-xs text-coral-500 mt-1.5">{errors.text}</p>
          )}
        </div>
        <button type="submit" className="btn-accent">
          <Send size={15} />
          Post Comment
        </button>
      </form>

      {comments.length === 0 ? (
        <p className="text-sm text-ink/50 dark:text-paper/50 text-center py-10">
          No comments yet. Be the first to share your thoughts.
        </p>
      ) : (
        <div className="card-surface p-5 sm:p-6">
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </section>
  )
}
