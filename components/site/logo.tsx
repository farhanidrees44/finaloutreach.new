"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLenis } from "lenis/react"
import { cn } from "@/lib/utils"

/**
 * Header logo — explicit pixel heights so flex layout cannot shrink it.
 * Always returns to the homepage top (including when already on `/`).
 */
export function Logo({ className }: { className?: string }) {
  const pathname = usePathname()
  const lenis = useLenis()

  const goHomeTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.1 })
      return
    }
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
  }

  return (
    <Link
      href="/"
      scroll
      className={cn(
        "group inline-flex shrink-0 items-center transition-opacity duration-300 hover:opacity-90",
        className,
      )}
      aria-label="FinalOutreach home"
      onClick={(e) => {
        if (pathname === "/") {
          e.preventDefault()
          goHomeTop()
          return
        }
        // Leaving another page — scroll after navigation settles
        window.setTimeout(goHomeTop, 50)
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt="FinalOutreach — Reach further. Convert smarter."
        width={631}
        height={200}
        className="h-[48px] w-auto max-w-none shrink-0 object-contain object-left sm:h-[52px] lg:h-[60px]"
        decoding="async"
      />
    </Link>
  )
}
