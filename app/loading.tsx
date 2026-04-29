export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading page"
      className="relative flex min-h-screen items-center justify-center bg-background"
    >
      <div className="flex flex-col items-center gap-5">
        <div className="relative size-10">
          <span className="absolute inset-0 rounded-full border border-ink-08" />
          <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary" />
        </div>
        <p className="text-[12px] uppercase tracking-[0.18em] text-ink-40">
          Loading
        </p>
        <span className="sr-only">Loading content, please wait.</span>
      </div>
    </div>
  )
}
