"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"
import { useInView } from "@/hooks/use-in-view"

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}

export function ScrollReveal({
  children,
  delay = 0,
  duration = 0.6,
  className = "",
}: ScrollRevealProps) {
  const { ref, inView } = useInView({ threshold: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
}: {
  children: ReactNode
  staggerDelay?: number
}) {
  const { ref, inView } = useInView({ threshold: 0.15 })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.2,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
