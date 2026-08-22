import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="container-page py-28 flex flex-col items-center text-center">
      <span className="font-display text-7xl sm:text-8xl font-semibold text-ink/10 dark:text-paper/10 mb-4">
        404
      </span>
      <div className="w-14 h-14 rounded-full bg-signal-500/10 flex items-center justify-center mb-6 -mt-4">
        <Compass size={26} className="text-signal-500" />
      </div>
      <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink dark:text-paper mb-3">
        This page wandered off
      </h1>
      <p className="text-ink/55 dark:text-paper/55 max-w-sm mb-8">
        The page you're looking for doesn't exist, or may have moved. Let's get you back to reading.
      </p>
      <Link to="/" className="btn-primary">
        Back to Home
      </Link>
    </div>
  )
}
