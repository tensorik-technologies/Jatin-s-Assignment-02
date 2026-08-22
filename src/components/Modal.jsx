import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

export default function Modal({ open, onClose, title, children, footer }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-ink/50 backdrop-blur-sm animate-fade-up"
      style={{ animationDuration: '0.2s' }}
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl bg-white dark:bg-night-panel border border-ink/10 dark:border-white/10 shadow-card-hover p-6 outline-none"
      >
        <div className="flex items-start justify-between mb-3">
          <h2 id="modal-title" className="font-display text-xl font-semibold text-ink dark:text-paper">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="text-ink/40 dark:text-paper/40 hover:text-ink dark:hover:text-paper"
          >
            <X size={20} />
          </button>
        </div>
        <div className="text-sm text-ink/70 dark:text-paper/70 mb-6">{children}</div>
        {footer && <div className="flex items-center justify-end gap-3">{footer}</div>}
      </div>
    </div>
  )
}
