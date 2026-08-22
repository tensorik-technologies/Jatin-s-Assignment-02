import { useCallback, useEffect, useState } from 'react'
import * as storage from '../utils/storage.js'

/**
 * Central hook for reading and mutating blog data.
 * Keeps a React state mirror of localStorage so components re-render on change.
 */
export function useBlogs() {
  const [blogs, setBlogs] = useState([])
  const [bookmarks, setBookmarks] = useState([])
  const [likes, setLikes] = useState({})
  const [ready, setReady] = useState(false)

  const refresh = useCallback(() => {
    setBlogs(storage.getBlogs())
    setBookmarks(storage.getBookmarks())
    setLikes(storage.getLikes())
  }, [])

  useEffect(() => {
    storage.ensureSeeded()
    refresh()
    setReady(true)
  }, [refresh])

  const createBlog = useCallback(
    (data) => {
      const created = storage.addBlog(data)
      refresh()
      return created
    },
    [refresh],
  )

  const editBlog = useCallback(
    (id, updates) => {
      const updated = storage.updateBlog(id, updates)
      refresh()
      return updated
    },
    [refresh],
  )

  const removeBlog = useCallback(
    (id) => {
      storage.deleteBlog(id)
      refresh()
    },
    [refresh],
  )

  const likeBlog = useCallback(
    (id, currentCount) => {
      const result = storage.toggleLike(id, currentCount)
      refresh()
      return result
    },
    [refresh],
  )

  const bookmarkBlog = useCallback(
    (id) => {
      const result = storage.toggleBookmark(id)
      refresh()
      return result
    },
    [refresh],
  )

  return {
    blogs,
    bookmarks,
    likes,
    ready,
    refresh,
    createBlog,
    editBlog,
    removeBlog,
    likeBlog,
    bookmarkBlog,
  }
}
