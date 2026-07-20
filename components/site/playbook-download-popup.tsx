"use client"

import { useCallback, useEffect, useId, useState } from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowRight, Download, X } from "lucide-react"
import { trackDownload } from "@/lib/analytics"

const STORAGE_KEY = "fo-playbook-popup-dismissed"
const PDF_HREF = "/final-outreach-cold-email-playbook.pdf"
const PDF_FILENAME = "The-Cold-Email-Playbook-FinalOutreach.pdf"
const SHOW_DELAY_MS = 1800

/** Paths where the popup would be redundant or distracting. */
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
 * Site-wide playbook download box — shows once per visitor until dismissed.
 * Direct PDF download; no email gate.
 */
export function PlaybookDownloadPopup() {
  const pathname = usePathname()
  const reduced = useReducedMotion()
  const titleId = useId()
  const descId = useId()
  const [open, setOpen] = useState(false)

  const dismiss = useCallback(() => {
    markDismissed()
    setOpen(false)
  }, [])

  useEffect(() => {
    if (shouldSkipPath(pathname)) {
      setOpen(false)
      return
    }
    if (wasDismissed()) return

    const timer = window.setTimeout(() => setOpen(true), SHOW_DELAY_MS)
    return () => window.clearTimeout(timer)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss()
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [open, dismiss])

  const onDownload = () => {
    trackDownload("cold-email-playbook")
    markDismissed()
    setOpen(false)
  }

  return (
    <AnimatePresence>
      {open ? (
        <div className="pointer-events-none fixed inset-0 z-[60] flex items-end justify-start p-4 sm:items-center sm:p-6 sm:pl-6 md:pl-8">
          <motion.button
            type="button"
            aria-label="Dismiss playbook download"
            className="pointer-events-auto absolute inset-0 bg-ink/30"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.2 }}
            onClick={dismiss}
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            initial={reduced ? false : { opacity: 0, x: -28, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, x: -20, scale: 0.98 }}
            transition={{ duration: reduced ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto relative z-10 w-full max-w-[340px] rounded-[28px] bg-ink p-8 text-background shadow-[0_24px_80px_-20px_rgba(0,0,0,0.55)] sm:max-w-[360px] sm:p-9"
          >
            <button
              type="button"
              onClick={dismiss}
              aria-label="Close"
              className="absolute right-4 top-4 grid size-9 place-items-center rounded-full text-background/55 transition-colors hover:bg-white/10 hover:text-background"
            >
              <X className="size-4" strokeWidth={2} />
            </button>

            <Download className="size-5 text-amber" aria-hidden />

            <h2
              id={titleId}
              className="mt-5 pr-8 text-[26px] font-bold leading-[1.1] tracking-tight sm:text-[28px]"
            >
              Download the playbook
            </h2>
            <p
              id={descId}
              className="mt-3 text-[14.5px] leading-[1.55] text-background/70"
            >
              Free, no email required. Direct PDF download. Share it freely.
            </p>

            <a
              href={PDF_HREF}
              download={PDF_FILENAME}
              onClick={onDownload}
              className="group mt-7 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-amber px-5 text-[14px] font-medium text-ink transition-all hover:bg-amber/90 active:scale-[0.99]"
            >
              Download free PDF
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  )
}
