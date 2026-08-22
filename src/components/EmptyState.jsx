import { FileQuestion } from 'lucide-react'

export default function EmptyState({
  icon: Icon = FileQuestion,
  title = 'Nothing here yet',
  description = '',
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6">
      <div className="w-16 h-16 rounded-full bg-ink/5 dark:bg-white/10 flex items-center justify-center mb-5">
        <Icon size={28} className="text-ink/35 dark:text-paper/40" />
      </div>
      <h3 className="font-display text-xl font-semibold text-ink dark:text-paper mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-ink/55 dark:text-paper/55 max-w-sm mb-6">{description}</p>
      )}
      {action}
    </div>
  )
}
