import { Trash2 } from 'lucide-react'
import { formatDate, initials } from '../utils/helpers.js'

export default function Comment({ comment, onDelete }) {
  return (
    <div className="flex gap-3 py-5 border-b border-ink/8 dark:border-white/10 last:border-b-0">
      <div className="w-10 h-10 rounded-full bg-signal-500/15 text-signal-600 dark:text-signal-300 flex items-center justify-center font-semibold text-sm shrink-0">
        {initials(comment.name)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-ink dark:text-paper">{comment.name}</p>
            <p className="text-xs text-ink/40 dark:text-paper/40">{formatDate(comment.createdAt)}</p>
          </div>
          <button
            onClick={() => onDelete(comment.id)}
            aria-label={`Delete comment by ${comment.name}`}
            className="text-ink/30 dark:text-paper/30 hover:text-coral-500 transition-colors shrink-0"
          >
            <Trash2 size={16} />
          </button>
        </div>
        <p className="text-sm text-ink/75 dark:text-paper/75 mt-2 leading-relaxed break-words">{comment.text}</p>
      </div>
    </div>
  )
}
