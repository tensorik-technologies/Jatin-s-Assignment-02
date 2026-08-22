import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal } from 'lucide-react'
import SearchBar from '../components/SearchBar.jsx'
import CategoryFilter from '../components/CategoryFilter.jsx'
import BlogCard from '../components/BlogCard.jsx'
import Pagination from '../components/Pagination.jsx'
import EmptyState from '../components/EmptyState.jsx'
import Loading from '../components/Loading.jsx'
import { useBlogsContext } from '../context/BlogsContext.jsx'
import { useDebounce } from '../hooks/useDebounce.js'

const PAGE_SIZE = 9

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'liked', label: 'Most liked' },
  { value: 'bookmarked', label: 'Most bookmarked' },
]

export default function Blogs() {
  const { blogs, bookmarks, ready } = useBlogsContext()
  const [searchParams, setSearchParams] = useSearchParams()

  const [query, setQuery] = useState('')
  const [category, setCategory] = useState(searchParams.get('category') || 'All')
  const [sort, setSort] = useState('newest')
  const [page, setPage] = useState(1)

  const debouncedQuery = useDebounce(query, 250)

  useEffect(() => {
    const urlCategory = searchParams.get('category')
    if (urlCategory) setCategory(urlCategory)
  }, [searchParams])

  useEffect(() => {
    setPage(1)
  }, [debouncedQuery, category, sort])

  const filtered = useMemo(() => {
    let result = [...blogs]

    if (category !== 'All') {
      result = result.filter((b) => b.category === category)
    }

    if (debouncedQuery.trim()) {
      const q = debouncedQuery.trim().toLowerCase()
      result = result.filter((b) => {
        const haystack = [
          b.title,
          b.excerpt,
          b.content,
          b.author?.name,
          b.category,
          ...(b.tags || []),
        ]
          .join(' ')
          .toLowerCase()
        return haystack.includes(q)
      })
    }

    switch (sort) {
      case 'oldest':
        result.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt))
        break
      case 'liked':
        result.sort((a, b) => (b.likes || 0) - (a.likes || 0))
        break
      case 'bookmarked':
        result.sort((a, b) => {
          const aB = bookmarks.includes(a.id) ? 1 : 0
          const bB = bookmarks.includes(b.id) ? 1 : 0
          return bB - aB
        })
        break
      default:
        result.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    }

    return result
  }, [blogs, bookmarks, category, debouncedQuery, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleCategoryChange = (next) => {
    setCategory(next)
    if (next === 'All') {
      searchParams.delete('category')
    } else {
      searchParams.set('category', next)
    }
    setSearchParams(searchParams, { replace: true })
  }

  const clearFilters = () => {
    setQuery('')
    handleCategoryChange('All')
    setSort('newest')
  }

  return (
    <div className="container-page py-14 sm:py-20">
      <div className="max-w-2xl mb-10">
        <span className="eyebrow">Library</span>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink dark:text-paper mt-2 mb-3">
          Explore Articles
        </h1>
        <p className="text-ink/60 dark:text-paper/60">
          Browse the full collection — search by keyword, filter by topic, or sort by what's resonating.
        </p>
      </div>

      <div className="space-y-5 mb-10">
        <SearchBar value={query} onChange={setQuery} />

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <CategoryFilter selected={category} onChange={handleCategoryChange} />

          <div className="flex items-center gap-2 shrink-0">
            <SlidersHorizontal size={15} className="text-ink/40 dark:text-paper/40" />
            <label htmlFor="sort" className="sr-only">Sort articles</label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-full border border-ink/15 dark:border-white/15 bg-transparent px-4 py-2 text-sm text-ink dark:text-paper outline-none focus:border-signal-500"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <p className="text-sm text-ink/45 dark:text-paper/45 mb-6">
        {filtered.length} {filtered.length === 1 ? 'article' : 'articles'} found
      </p>

      {!ready ? (
        <Loading count={9} />
      ) : pageItems.length === 0 ? (
        <EmptyState
          title="No articles found"
          description="Try changing your search or category filter."
          action={
            <button onClick={clearFilters} className="btn-secondary">
              Clear Filters
            </button>
          }
        />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pageItems.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </div>
  )
}
