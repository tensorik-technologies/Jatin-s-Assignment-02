import { initialBlogs } from '../data/initialBlogs.js'
import { generateId, slugify } from './helpers.js'

const KEYS = {
  blogs: 'marginalia_blogs',
  comments: 'marginalia_comments',
  likes: 'marginalia_likes',
  bookmarks: 'marginalia_bookmarks',
  theme: 'marginalia_theme',
  seeded: 'marginalia_seeded_v1',
}

function safeGet(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null || raw === undefined) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

/** Seed initial mock data once, on first load. */
export function ensureSeeded() {
  const seeded = safeGet(KEYS.seeded, false)
  if (!seeded) {
    safeSet(KEYS.blogs, initialBlogs)
    safeSet(KEYS.comments, {})
    safeSet(KEYS.likes, {})
    safeSet(KEYS.bookmarks, [])
    safeSet(KEYS.seeded, true)
  }
}

/* ---------------- Blogs ---------------- */

export function getBlogs() {
  return safeGet(KEYS.blogs, initialBlogs)
}

export function saveBlogs(blogs) {
  return safeSet(KEYS.blogs, blogs)
}

export function getBlogById(id) {
  return getBlogs().find((b) => String(b.id) === String(id))
}

export function addBlog(blog) {
  const blogs = getBlogs()
  const newBlog = {
    id: generateId('blog'),
    slug: slugify(blog.title || 'untitled'),
    likes: 0,
    publishedAt: new Date().toISOString(),
    ...blog,
  }
  const updated = [newBlog, ...blogs]
  saveBlogs(updated)
  return newBlog
}

export function updateBlog(id, updates) {
  const blogs = getBlogs()
  let updatedBlog = null
  const updated = blogs.map((b) => {
    if (String(b.id) === String(id)) {
      updatedBlog = { ...b, ...updates, id: b.id }
      return updatedBlog
    }
    return b
  })
  saveBlogs(updated)
  return updatedBlog
}

export function deleteBlog(id) {
  const blogs = getBlogs().filter((b) => String(b.id) !== String(id))
  saveBlogs(blogs)
  deleteCommentsForBlog(id)
  const bookmarks = getBookmarks().filter((bId) => String(bId) !== String(id))
  safeSet(KEYS.bookmarks, bookmarks)
  const likes = getLikes()
  delete likes[id]
  safeSet(KEYS.likes, likes)
}

/* ---------------- Comments ---------------- */

export function getComments(blogId) {
  const all = safeGet(KEYS.comments, {})
  return all[blogId] || []
}

export function addComment(blogId, comment) {
  const all = safeGet(KEYS.comments, {})
  const list = all[blogId] || []
  const newComment = {
    id: generateId('comment'),
    createdAt: new Date().toISOString(),
    ...comment,
  }
  all[blogId] = [newComment, ...list]
  safeSet(KEYS.comments, all)
  return newComment
}

export function deleteComment(blogId, commentId) {
  const all = safeGet(KEYS.comments, {})
  const list = all[blogId] || []
  all[blogId] = list.filter((c) => c.id !== commentId)
  safeSet(KEYS.comments, all)
}

export function deleteCommentsForBlog(blogId) {
  const all = safeGet(KEYS.comments, {})
  delete all[blogId]
  safeSet(KEYS.comments, all)
}

export function getCommentCount(blogId) {
  return getComments(blogId).length
}

/* ---------------- Likes ---------------- */

export function getLikes() {
  return safeGet(KEYS.likes, {})
}

export function isLiked(blogId) {
  const likes = getLikes()
  return Boolean(likes[blogId])
}

export function toggleLike(blogId, currentCount = 0) {
  const likes = getLikes()
  const liked = Boolean(likes[blogId])
  likes[blogId] = !liked
  safeSet(KEYS.likes, likes)

  const nextCount = liked ? Math.max(0, currentCount - 1) : currentCount + 1
  updateBlog(blogId, { likes: nextCount })

  return { liked: !liked, likes: nextCount }
}

/* ---------------- Bookmarks ---------------- */

export function getBookmarks() {
  return safeGet(KEYS.bookmarks, [])
}

export function isBookmarked(blogId) {
  return getBookmarks().some((id) => String(id) === String(blogId))
}

export function toggleBookmark(blogId) {
  const bookmarks = getBookmarks()
  const exists = bookmarks.some((id) => String(id) === String(blogId))
  const updated = exists
    ? bookmarks.filter((id) => String(id) !== String(blogId))
    : [...bookmarks, blogId]
  safeSet(KEYS.bookmarks, updated)
  return !exists
}

/* ---------------- Theme ---------------- */

export function getTheme() {
  return safeGet(KEYS.theme, null)
}

export function saveTheme(theme) {
  return safeSet(KEYS.theme, theme)
}

export const STORAGE_KEYS = KEYS
