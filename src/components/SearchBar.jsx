import { Search, X } from 'lucide-react'

export default function SearchBar({ value, onChange, placeholder = 'Search articles…' }) {
  return (
    <div className="relative w-full">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40 dark:text-paper/40 pointer-events-none"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search articles"
        className="input-field pl-11 pr-10 py-3.5"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40 dark:text-paper/40 hover:text-ink dark:hover:text-paper"
        >
          <X size={16} />
        </button>
      )}
    </div>
  )
}
