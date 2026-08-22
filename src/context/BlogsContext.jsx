import { createContext, useContext } from 'react'
import { useBlogs } from '../hooks/useBlogs.js'

const BlogsContext = createContext(null)

export function BlogsProvider({ children }) {
  const value = useBlogs()
  return <BlogsContext.Provider value={value}>{children}</BlogsContext.Provider>
}

export function useBlogsContext() {
  const ctx = useContext(BlogsContext)
  if (!ctx) throw new Error('useBlogsContext must be used within a BlogsProvider')
  return ctx
}
