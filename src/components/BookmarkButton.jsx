import { useState } from 'react'
import { Bookmark } from 'lucide-react'
import { isBookmarked } from '../utils/storage.js'

export default function BookmarkButton({ blogId, onToggle, variant = 'default' }) {
  const [bookmarked, setBookmarked] = useState(() => isBookmarked(blogId))

  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const nowBookmarked = onToggle(blogId)
    setBookmarked(nowBookmarked)
  }

  const base =
    variant === 'floating'
      ? 'w-9 h-9 rounded-full bg-white/90 dark:bg-night-panel/90 backdrop-blur flex items-center justify-center shadow-card'
      : 'w-9 h-9 rounded-full flex items-center justify-center border border-ink/10 dark:border-white/10'

  return (
    <button
      onClick={handleClick}
      aria-pressed={bookmarked}
      aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark this article'}
      className={`${base} transition-colors ${
        bookmarked ? 'text-signal-500' : 'text-ink/50 dark:text-paper/60 hover:text-signal-500'
      }`}
    >
      <Bookmark size={16} fill={bookmarked ? 'currentColor' : 'none'} />
    </button>
  )
}
