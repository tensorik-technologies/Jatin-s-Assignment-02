export function CardSkeleton() {
  return (
    <div className="card-surface overflow-hidden animate-pulse">
      <div className="aspect-[16/10] bg-ink/8 dark:bg-white/10" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-ink/8 dark:bg-white/10 rounded w-3/4" />
        <div className="h-3 bg-ink/8 dark:bg-white/10 rounded w-full" />
        <div className="h-3 bg-ink/8 dark:bg-white/10 rounded w-2/3" />
        <div className="flex items-center gap-2 pt-4">
          <div className="w-7 h-7 rounded-full bg-ink/8 dark:bg-white/10" />
          <div className="h-3 bg-ink/8 dark:bg-white/10 rounded w-24" />
        </div>
      </div>
    </div>
  )
}

export default function Loading({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}
