"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowRight, RefreshCw } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Surface to the browser console for support and capture in any
    // analytics tooling that listens to console errors.
    // eslint-disable-next-line no-console
    console.error("[finaloutreach:error-boundary]", error)
  }, [error])

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-6 py-24 text-ink">
      <main id="main" className="mx-auto max-w-xl text-center">
        <div className="flex items-center justify-center gap-3 text-[12px] uppercase tracking-[0.18em] text-ink-40">
          <span className="h-px w-8 bg-ink-08" />
          <span>Something went wrong</span>
          <span className="h-px w-8 bg-ink-08" />
        </div>

        <h1 className="mt-6 text-balance text-[36px] font-medium leading-[1.05] tracking-display sm:text-[48px]">
          We hit a{" "}
          <span className="font-serif-italic text-[oklch(0.55_0.13_78)]">
            snag
          </span>{" "}
          loading this page.
        </h1>

        <p className="mt-6 text-pretty text-[16px] leading-[1.6] text-ink-60">
          It is on us, not you. Try refreshing this page, or head back to the
          homepage. If this keeps happening, our team would love to know.
        </p>

        {error?.digest && (
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-40">
            Reference: {error.digest}
          </p>
        )}

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
          <button
            type="button"
            onClick={reset}
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-[15px] font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.97]"
          >
            <RefreshCw className="size-4 transition-transform group-hover:-rotate-90" />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-ink-08 px-6 text-[15px] font-medium text-ink transition-all hover:border-ink/30"
          >
            Back to homepage
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </main>
    </div>
  )
}
