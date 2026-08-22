export function slugify(text = '') {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export function formatDate(dateString) {
  try {
    const date = new Date(dateString)
    if (Number.isNaN(date.getTime())) return dateString
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return dateString
  }
}

export function truncate(text = '', max = 140) {
  if (text.length <= max) return text
  return `${text.slice(0, max).trim()}…`
}

export function generateId(prefix = 'id') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

export function initials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

export const CATEGORIES = [
  'Technology',
  'AI & Machine Learning',
  'Web Development',
  'Data Science',
  'Programming',
  'Design',
  'Productivity',
  'Career',
]

export const CATEGORY_COLORS = {
  Technology: 'bg-signal-50 text-signal-600 dark:bg-signal-500/15 dark:text-signal-300',
  'AI & Machine Learning': 'bg-coral-400/10 text-coral-600 dark:bg-coral-500/20 dark:text-coral-400',
  'Web Development': 'bg-moss-400/15 text-moss-500 dark:bg-moss-400/20 dark:text-moss-400',
  'Data Science': 'bg-signal-50 text-signal-600 dark:bg-signal-500/15 dark:text-signal-300',
  Programming: 'bg-ink/8 text-ink/70 dark:bg-white/10 dark:text-paper/70',
  Design: 'bg-coral-400/10 text-coral-600 dark:bg-coral-500/20 dark:text-coral-400',
  Productivity: 'bg-moss-400/15 text-moss-500 dark:bg-moss-400/20 dark:text-moss-400',
  Career: 'bg-ink/8 text-ink/70 dark:bg-white/10 dark:text-paper/70',
}
