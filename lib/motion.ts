import type { Transition, Variants } from "framer-motion"

/** Shared premium easing — decelerate into place, never floaty */
export const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 20,
}

export const viewportOnce = { once: true, margin: "-100px" as const }

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOutExpo },
  },
}

export const fadeUpReduced: Variants = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0 },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: easeOutExpo },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.04,
    },
  },
}

export const staggerFast: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.02,
    },
  },
}

export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: easeOutExpo },
  },
}

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 28 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: easeOutExpo },
  },
}

export const heroLine: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOutExpo },
  },
}

export function motionSafe(reduced: boolean | null, variants: Variants): Variants {
  if (reduced) {
    return {
      hidden: { opacity: 1, y: 0, x: 0, scale: 1 },
      show: { opacity: 1, y: 0, x: 0, scale: 1 },
    }
  }
  return variants
}
