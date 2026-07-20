"use client"

import { useCallback, useEffect, useId, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowRight, Download, X } from "lucide-react"
import { trackDownload } from "@/lib/analytics"

const STORAGE_KEY = "fo-playbook-popup-dismissed"
const PDF_HREF = "/final-outreach-cold-email-playbook.pdf"
const PDF_FILENAME = "The-Cold-Email-Playbook-FinalOutreach.pdf"
/** Delay before first show — mid-range of the 3–5s window. */
const SHOW_DELAY_MS = 4000

/** Paths where the popup would be redundant. */
function shouldSkipPath(pathname: string | null) {
  if (!pathname) return true
  if (pathname.startsWith("/resources/cold-email-playbook")) return true
  if (pathname.startsWith("/legal")) return true
  return false
}

function wasDismissed() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1"
  } catch {
    return false
  }
}

function markDismissed() {
  try {
    window.localStorage.setItem(STORAGE_KEY, "1")
  } catch {
    /* private mode / blocked storage */
  }
}

/**
 * Non-blocking playbook download card — bottom-left, once per visitor.
 * Slides up after a short delay; site stays fully interactive underneath.
 */
export function PlaybookDownloadPopup() {
  const pathname = usePathname()
  const reduced = useReducedMotion()
  const titleId = useId()
  const descId = useId()
  const [open, setOpen] = useState(false)
  const delayDone = useRef(false)

  const dismiss = useCallback(() => {
    markDismissed()
    setOpen(false)
  }, [])

  // One timer per browser visit load; never again after dismiss (localStorage).
  useEffect(() => {
    if (wasDismissed()) return

    const timer = window.setTimeout(() => {
      delayDone.current = true
      if (wasDismissed()) return
      if (shouldSkipPath(window.location.pathname)) return
      setOpen(true)
    }, SHOW_DELAY_MS)

    return () => window.clearTimeout(timer)
  }, [])

  // Stay out of the way on skip paths; come back if still eligible.
  useEffect(() => {
    if (!delayDone.current) return
    if (wasDismissed()) {
      setOpen(false)
      return
    }
    setOpen(!shouldSkipPath(pathname))
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, dismiss])

  const onDownload = () => {
    trackDownload("cold-email-playbook")
    markDismissed()
    setOpen(false)
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.aside
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
          aria-describedby={descId}
          initial={reduced ? false : { opacity: 0, y: 56 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 40 }}
          transition={{
            duration: reduced ? 0 : 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="fixed bottom-4 left-4 z-[60] w-[min(100%-2rem,340px)] rounded-[28px] bg-ink p-7 text-background shadow-[0_24px_80px_-16px_rgba(0,0,0,0.5)] sm:bottom-6 sm:left-6 sm:w-[360px] sm:p-8"
        >
          <button
            type="button"
            onClick={dismiss}
            aria-label="Close"
            className="absolute right-3 top-3 grid size-9 place-items-center rounded-full text-background/55 transition-colors hover:bg-white/10 hover:text-background"
          >
            <X className="size-4" strokeWidth={2} />
          </button>

          <Download className="size-5 text-amber" aria-hidden />

          <h2
            id={titleId}
            className="mt-4 pr-8 text-[24px] font-bold leading-[1.1] tracking-tight sm:text-[26px]"
          >
            Download the playbook
          </h2>
          <p
            id={descId}
            className="mt-2.5 text-[14px] leading-[1.55] text-background/70"
          >
            Free, no email required. Direct PDF download. Share it freely.
          </p>

          <a
            href={PDF_HREF}
            download={PDF_FILENAME}
            onClick={onDownload}
            className="group mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-amber px-5 text-[14px] font-medium text-ink transition-all hover:bg-amber/90 active:scale-[0.99]"
          >
            Download free PDF
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  )
}
