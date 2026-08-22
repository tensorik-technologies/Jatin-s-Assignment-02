import { useRef } from 'react'
import { Bold, Italic, Heading2, List, ListOrdered, Quote, Code2 } from 'lucide-react'

const WRAPPERS = [
  { key: 'bold', icon: Bold, label: 'Bold', open: '<strong>', close: '</strong>' },
  { key: 'italic', icon: Italic, label: 'Italic', open: '<em>', close: '</em>' },
  { key: 'heading', icon: Heading2, label: 'Heading', open: '<h2>', close: '</h2>' },
  { key: 'quote', icon: Quote, label: 'Quote', open: '<blockquote>', close: '</blockquote>' },
  { key: 'code', icon: Code2, label: 'Code block', open: '<pre><code>', close: '</code></pre>' },
]

const LIST_WRAPPERS = [
  { key: 'ul', icon: List, label: 'Bullet list', wrap: (lines) => `<ul>\n${lines.map((l) => `  <li>${l || 'List item'}</li>`).join('\n')}\n</ul>` },
  { key: 'ol', icon: ListOrdered, label: 'Numbered list', wrap: (lines) => `<ol>\n${lines.map((l) => `  <li>${l || 'List item'}</li>`).join('\n')}\n</ol>` },
]

export default function RichTextEditor({ value, onChange, rows = 14, placeholder }) {
  const textareaRef = useRef(null)

  const applyWrap = (open, close) => {
    const el = textareaRef.current
    if (!el) return
    const start = el.selectionStart
    const end = el.selectionEnd
    const selected = value.slice(start, end) || 'text'
    const next = `${value.slice(0, start)}${open}${selected}${close}${value.slice(end)}`
    onChange(next)
    requestAnimationFrame(() => {
      el.focus()
      el.selectionStart = start + open.length
      el.selectionEnd = start + open.length + selected.length
    })
  }

  const applyList = (wrap) => {
    const el = textareaRef.current
    if (!el) return
    const start = el.selectionStart
    const end = el.selectionEnd
    const selected = value.slice(start, end) || 'List item'
    const lines = selected.split('\n').filter(Boolean)
    const block = wrap(lines)
    const next = `${value.slice(0, start)}${block}${value.slice(end)}`
    onChange(next)
    requestAnimationFrame(() => el.focus())
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-1 rounded-t-xl border border-b-0 border-ink/15 dark:border-white/15 bg-paper-soft dark:bg-night-soft p-2">
        {WRAPPERS.map(({ key, icon: Icon, label, open, close }) => (
          <button
            key={key}
            type="button"
            onClick={() => applyWrap(open, close)}
            aria-label={label}
            title={label}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-ink/60 dark:text-paper/60 hover:bg-ink/8 dark:hover:bg-white/10 hover:text-ink dark:hover:text-paper transition-colors"
          >
            <Icon size={16} />
          </button>
        ))}
        <span className="w-px h-6 bg-ink/12 dark:bg-white/15 mx-1" />
        {LIST_WRAPPERS.map(({ key, icon: Icon, label, wrap }) => (
          <button
            key={key}
            type="button"
            onClick={() => applyList(wrap)}
            aria-label={label}
            title={label}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-ink/60 dark:text-paper/60 hover:bg-ink/8 dark:hover:bg-white/10 hover:text-ink dark:hover:text-paper transition-colors"
          >
            <Icon size={16} />
          </button>
        ))}
      </div>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full rounded-b-xl border border-ink/15 dark:border-white/15 bg-white dark:bg-night-panel px-4 py-3 text-sm font-mono text-ink dark:text-paper placeholder:text-ink/35 dark:placeholder:text-paper/35 outline-none focus:border-signal-500 resize-y"
      />
      <p className="text-xs text-ink/40 dark:text-paper/40 mt-2">
        Select text and use the toolbar to format it with HTML tags. Content renders as formatted article text.
      </p>
    </div>
  )
}
