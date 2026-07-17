"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, useReducedMotion } from "framer-motion"

type Props = {
  value: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
}

/**
 * Count-up that triggers when the element enters the viewport.
 * Uses requestAnimationFrame for smooth animation; respects prefers-reduced-motion.
 */
export function CountUp({
  value,
  duration = 1800,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-10% 0px" })
  const prefersReducedMotion = useReducedMotion()
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (prefersReducedMotion) {
      setN(value)
      return
    }
    const start = performance.now()
    let raf = 0
    const step = (now: number) => {
      const elapsed = now - start
      const t = Math.min(1, elapsed / duration)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3)
      setN(value * eased)
      if (t < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration, prefersReducedMotion])

  const display =
    decimals > 0 ? n.toFixed(decimals) : Math.round(n).toLocaleString()

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}
