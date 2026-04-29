"use client"

import { useEffect, useRef, useState } from "react"

type Options = {
  /** When true, only triggers once and unobserves. Default: true */
  once?: boolean
  /** IntersectionObserver threshold. Default: 0.15 */
  threshold?: number
  /** IntersectionObserver root margin. Default: "0px 0px -10% 0px" */
  rootMargin?: string
}

/**
 * Hook that returns a ref + a boolean indicating whether the element
 * has entered the viewport. Designed for lightweight, scroll-triggered
 * entrance animations without any always-running motion.
 */
export function useInView<T extends Element = HTMLDivElement>(
  options: Options = {},
) {
  const { once = true, threshold = 0.15, rootMargin = "0px 0px -10% 0px" } =
    options
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (typeof IntersectionObserver === "undefined") {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true)
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            setInView(false)
          }
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [once, threshold, rootMargin])

  return { ref, inView }
}
