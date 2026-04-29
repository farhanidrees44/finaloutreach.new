"use client"

import { useEffect, useState } from "react"

/**
 * Subtle animated mesh background for the Hero section.
 *
 * Two soft, blurred SVG blobs (emerald + gold) drift very slowly using
 * pure CSS keyframes — no per-frame JS work. Disabled on mobile (≤768px)
 * to save battery and on `prefers-reduced-motion`.
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

  if (!enabled) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* Emerald drifting blob (top-left) */}
      <svg
        className="blob-drift-a absolute -left-[15%] -top-[10%] h-[60%] w-[60%] opacity-[0.12]"
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="hero-emerald" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.36 0.077 162)" />
            <stop offset="100%" stopColor="oklch(0.36 0.077 162 / 0)" />
          </radialGradient>
        </defs>
        <circle cx="300" cy="300" r="280" fill="url(#hero-emerald)" />
      </svg>

      {/* Gold drifting blob (bottom-right) */}
      <svg
        className="blob-drift-b absolute -bottom-[20%] -right-[15%] h-[55%] w-[55%] opacity-[0.10]"
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="hero-gold" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.756 0.131 86)" />
            <stop offset="100%" stopColor="oklch(0.756 0.131 86 / 0)" />
          </radialGradient>
        </defs>
        <circle cx="300" cy="300" r="280" fill="url(#hero-gold)" />
      </svg>

      {/* Electric Blue accent blob (right) */}
      <svg
        className="blob-drift-b absolute -right-[5%] top-[20%] h-[40%] w-[40%] opacity-[0.06]"
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="hero-electric" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.55 0.20 260)" />
            <stop offset="100%" stopColor="oklch(0.55 0.20 260 / 0)" />
          </radialGradient>
        </defs>
        <circle cx="300" cy="300" r="280" fill="url(#hero-electric)" />
      </svg>

      {/* Purple accent blob (left-center) */}
      <svg
        className="blob-drift-a absolute -left-[8%] bottom-[10%] h-[35%] w-[35%] opacity-[0.05]"
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="hero-purple" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.56 0.19 290)" />
            <stop offset="100%" stopColor="oklch(0.56 0.19 290 / 0)" />
          </radialGradient>
        </defs>
        <circle cx="300" cy="300" r="280" fill="url(#hero-purple)" />
      </svg>
    </div>
  )
}
