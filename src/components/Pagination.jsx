import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const pages = buildPageList(currentPage, totalPages)

  return (
    <nav className="flex items-center justify-center gap-1.5 mt-12" aria-label="Pagination">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="w-10 h-10 rounded-full flex items-center justify-center border border-ink/15 dark:border-white/15 text-ink dark:text-paper disabled:opacity-30 disabled:pointer-events-none hover:border-ink/40 dark:hover:border-white/40 transition-colors"
      >
        <ChevronLeft size={16} />
      </button>

      {pages.map((page, idx) =>
        page === '…' ? (
          <span key={`ellipsis-${idx}`} className="w-10 h-10 flex items-center justify-center text-ink/40 dark:text-paper/40">
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? 'page' : undefined}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
              page === currentPage
                ? 'bg-ink text-paper dark:bg-paper dark:text-ink'
                : 'text-ink/60 dark:text-paper/60 hover:bg-ink/5 dark:hover:bg-white/10'
            }`}
          >
            {page}
          </button>
        ),
      )}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="w-10 h-10 rounded-full flex items-center justify-center border border-ink/15 dark:border-white/15 text-ink dark:text-paper disabled:opacity-30 disabled:pointer-events-none hover:border-ink/40 dark:hover:border-white/40 transition-colors"
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  )
}

function buildPageList(current, total) {
  const delta = 1
  const range = []
  for (let i = Math.max(1, current - delta); i <= Math.min(total, current + delta); i++) {
    range.push(i)
  }

  const pages = []
  if (range[0] > 1) {
    pages.push(1)
    if (range[0] > 2) pages.push('…')
  }
  pages.push(...range)
  if (range[range.length - 1] < total) {
    if (range[range.length - 1] < total - 1) pages.push('…')
    pages.push(total)
  }
  return pages
}
