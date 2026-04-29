"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { SITE } from "@/lib/site-data"

export function StickyMobileCta() {
  const [scrolled, setScrolled] = useState(false)
  const [footerVisible, setFooterVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 600)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Hide when the footer enters the viewport
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return
    const footer = document.getElementById("site-footer")
    if (!footer) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setFooterVisible(entry.isIntersecting)
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0 },
    )
    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  const visible = scrolled && !footerVisible

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 40, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
          className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 md:hidden"
        >
          <a
            href={SITE.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full max-w-md items-center justify-between rounded-full bg-ink px-5 py-3.5 text-[14.5px] font-medium text-background shadow-[0_18px_40px_-16px_rgba(15,15,15,0.5)]"
          >
            <span className="flex items-center gap-2.5">
              <span className="size-1.5 rounded-full bg-[oklch(0.7_0.18_145)] pulse-dot" />
              Book a call — 3 spots left
            </span>
            <ArrowRight className="size-4" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
