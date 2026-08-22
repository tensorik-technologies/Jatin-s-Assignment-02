export default function Privacy() {
  return (
    <div className="container-page py-14 sm:py-20 max-w-2xl">
      <span className="eyebrow">Legal</span>
      <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink dark:text-paper mt-2 mb-6">
        Privacy
      </h1>
      <div className="prose-article">
        <p>
          Marginalia is a demo application with no backend server. All content you create — posts, comments,
          likes, and bookmarks — is stored exclusively in your browser's local storage and never leaves your
          device.
        </p>
        <p>
          Clearing your browser data or using a different browser or device will reset the application to its
          original sample content.
        </p>
      </div>
    </div>
  )
}
