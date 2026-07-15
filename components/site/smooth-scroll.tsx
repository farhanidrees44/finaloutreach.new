"use client"

import { ReactLenis } from "lenis/react"
import { useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"

/**
 * Smooth scroll via Lenis. Disabled when prefers-reduced-motion is set.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <>{children}</>
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  )
}
