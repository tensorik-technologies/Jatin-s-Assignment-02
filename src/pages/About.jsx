export default function About() {
  return (
    <div className="container-page py-14 sm:py-20 max-w-2xl">
      <span className="eyebrow">About</span>
      <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink dark:text-paper mt-2 mb-6">
        Notes in the margin
      </h1>
      <div className="prose-article">
        <p>
          Marginalia started as a shared notebook for a handful of engineers and designers who kept emailing each
          other half-finished thoughts. It's grown into a small, opinionated publication for anyone who'd rather
          read one well-considered article than ten skimmable listicles.
        </p>
        <p>
          We publish essays on technology, design, data, and the work of building things with other people. No
          algorithms deciding what you see first, no paywalls halfway through a sentence — just articles, organized
          simply, written by people who care about the topic.
        </p>
        <p>
          Everything on this site lives entirely in your browser's local storage. There's no backend, no account,
          and no tracking — which also means your drafts and bookmarks are only ever on this device.
        </p>
      </div>
    </div>
  )
}
