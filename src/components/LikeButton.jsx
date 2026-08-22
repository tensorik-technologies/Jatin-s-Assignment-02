import { useState } from 'react'
import { Heart } from 'lucide-react'
import { isLiked } from '../utils/storage.js'

export default function LikeButton({ blogId, likes = 0, onToggle, size = 'md' }) {
  const [liked, setLiked] = useState(() => isLiked(blogId))
  const [pop, setPop] = useState(false)

  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const result = onToggle(blogId, likes)
    setLiked(result.liked)
    if (result.liked) {
      setPop(true)
      setTimeout(() => setPop(false), 350)
    }
  }

  const iconSize = size === 'sm' ? 15 : 18
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm'

  return (
    <button
      onClick={handleClick}
      aria-pressed={liked}
      aria-label={liked ? 'Unlike this article' : 'Like this article'}
      className={`inline-flex items-center gap-1.5 ${textSize} font-medium transition-colors ${
        liked ? 'text-coral-500' : 'text-ink/50 dark:text-paper/50 hover:text-coral-500'
      }`}
    >
      <Heart
        size={iconSize}
        fill={liked ? 'currentColor' : 'none'}
        className={pop ? 'animate-pop' : ''}
      />
      <span>{likes}</span>
    </button>
  )
}
