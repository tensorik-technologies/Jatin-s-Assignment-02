import { Link } from 'react-router-dom'
import { CATEGORY_COLORS } from '../utils/helpers.js'

export default function CategoryBadge({ category, size = 'sm', linkTo }) {
  const colorClass = CATEGORY_COLORS[category] || 'bg-ink/8 text-ink/70 dark:bg-white/10 dark:text-paper/70'
  const sizeClass = size === 'lg' ? 'text-xs px-3 py-1.5' : 'text-[11px] px-2.5 py-1'

  const content = (
    <span className={`inline-flex items-center rounded-full font-semibold uppercase tracking-wide ${sizeClass} ${colorClass}`}>
      {category}
    </span>
  )

  if (linkTo) {
    return (
      <Link to={linkTo} className="hover:opacity-80 transition-opacity" onClick={(e) => e.stopPropagation()}>
        {content}
      </Link>
    )
  }

  return content
}
