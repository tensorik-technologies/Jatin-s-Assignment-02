import { CATEGORIES } from '../utils/helpers.js'

export default function CategoryFilter({ selected, onChange }) {
  const options = ['All', ...CATEGORIES]

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
      {options.map((category) => {
        const active = selected === category
        return (
          <button
            key={category}
            onClick={() => onChange(category)}
            aria-pressed={active}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 border ${
              active
                ? 'bg-ink text-paper dark:bg-paper dark:text-ink border-ink dark:border-paper'
                : 'bg-transparent text-ink/60 dark:text-paper/60 border-ink/15 dark:border-white/15 hover:border-ink/40 dark:hover:border-white/40'
            }`}
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}
