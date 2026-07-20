"use client"

import { useEffect, useState } from "react"

/**
 * Soft lavender→white editorial mesh behind the hero.
 * Static wash always on (legibility-safe). Animated blobs only on desktop
 * when motion is allowed.
 */
export function HeroBackground() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const mobileMq = window.matchMedia("(max-width: 767px)")

    const update = () => {
      setEnabled(!motionMq.matches && !mobileMq.matches)
    }
    update()

    motionMq.addEventListener("change", update)
    mobileMq.addEventListener("change", update)
    return () => {
      motionMq.removeEventListener("change", update)
      mobileMq.removeEventListener("change", update)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* Always-on soft wash — lavender to cream/white, low contrast */}
      <div className="hero-soft-wash absolute inset-0" />

      {enabled && (
        <>
          <svg
            className="blob-drift-a absolute -left-[18%] -top-[12%] h-[58%] w-[58%] opacity-[0.14]"
            viewBox="0 0 600 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="hero-lavender" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="oklch(0.72 0.08 295)" />
                <stop offset="100%" stopColor="oklch(0.72 0.08 295 / 0)" />
              </radialGradient>
            </defs>
            <circle cx="300" cy="300" r="280" fill="url(#hero-lavender)" />
          </svg>

          <svg
            className="blob-drift-b absolute -right-[12%] top-[8%] h-[48%] w-[48%] opacity-[0.10]"
            viewBox="0 0 600 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="hero-soft-blue" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="oklch(0.78 0.07 250)" />
                <stop offset="100%" stopColor="oklch(0.78 0.07 250 / 0)" />
              </radialGradient>
            </defs>
            <circle cx="300" cy="300" r="280" fill="url(#hero-soft-blue)" />
          </svg>

          <svg
            className="blob-drift-a absolute -bottom-[18%] left-[20%] h-[42%] w-[42%] opacity-[0.08]"
            viewBox="0 0 600 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="hero-soft-cyan" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="oklch(0.82 0.06 200)" />
                <stop offset="100%" stopColor="oklch(0.82 0.06 200 / 0)" />
              </radialGradient>
            </defs>
            <circle cx="300" cy="300" r="280" fill="url(#hero-soft-cyan)" />
          </svg>
        </>
      )}
    </div>
  )
}
