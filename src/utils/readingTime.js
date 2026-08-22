const WORDS_PER_MINUTE = 200

/**
 * Calculates estimated reading time from HTML or plain text content.
 * @param {string} content - Article content (may include simple HTML tags).
 * @returns {number} Reading time in whole minutes (minimum 1).
 */
export function calculateReadingTime(content = '') {
  const plainText = String(content).replace(/<[^>]*>/g, ' ')
  const words = plainText
    .trim()
    .split(/\s+/)
    .filter(Boolean)
  const minutes = Math.ceil(words.length / WORDS_PER_MINUTE)
  return Math.max(1, minutes || 1)
}

export function formatReadingTime(content = '') {
  return `${calculateReadingTime(content)} min read`
}
