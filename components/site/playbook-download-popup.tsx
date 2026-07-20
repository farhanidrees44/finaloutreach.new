"use client"

import { useCallback, useEffect, useId, useState } from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowRight, Download, X } from "lucide-react"
import { trackDownload } from "@/lib/analytics"

/** v2 key — previous mid-screen dismissals must not suppress the corner popup. */
const STORAGE_KEY = "fo-playbook-corner-v2"
const PDF_HREF = "/final-outreach-cold-email-playbook.pdf"
const PDF_FILENAME = "The-Cold-Email-Playbook-FinalOutreach.pdf"
const SHOW_DELAY_MS = 4000

function shouldSkipPath(pathname: string | null) {
  if (!pathname) return false
  if (pathname.startsWith("/resources/cold-email-playbook")) return true
  if (pathname.startsWith("/legal")) return true
  return false
}

function readDismissed() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1"
  } catch {
    return false
  }
}

function writeDismissed() {
  try {
    window.localStorage.setItem(STORAGE_KEY, "1")
  } catch {
    /* ignore */
  }
}

/**
 * Non-blocking playbook download card — bottom-left, once per visitor.
 * Slides up after 4s; site stays fully interactive.
 */
export function PlaybookDownloadPopup() {
  const pathname = usePathname()
  const reduced = useReducedMotion()
  const titleId = useId()
  const descId = useId()
  const [open, setOpen] = useState(false)
  const [ready, setReady] = useState(false)

  const dismiss = useCallback(() => {
    writeDismissed()
    setOpen(false)
  }, [])

  // After mount, wait 4s then allow show (unless already dismissed).
  useEffect(() => {
    if (readDismissed()) return

    const timer = window.setTimeout(() => {
      setReady(true)
    }, SHOW_DELAY_MS)

    return () => window.clearTimeout(timer)
  }, [])

  // Open when ready + path is eligible; hide on skip paths without dismissing forever.
  useEffect(() => {
    if (!ready) return
    if (readDismissed()) {
      setOpen(false)
      return
    }
    setOpen(!shouldSkipPath(pathname))
  }, [ready, pathname])

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
    writeDismissed()
    setOpen(false)
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.aside
          key="playbook-popup"
          data-playbook-popup
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
          aria-describedby={descId}
          initial={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 64 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 40 }}
          transition={{
            duration: reduced ? 0.15 : 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="fixed bottom-4 left-4 z-[100] w-[min(100%-2rem,22rem)] rounded-[28px] bg-ink p-7 text-background shadow-[0_24px_80px_-16px_rgba(0,0,0,0.55)] sm:bottom-6 sm:left-6 sm:w-[22rem] sm:p-8"
        >
          <button
            type="button"
            onClick={dismiss}
            aria-label="Close playbook download"
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
