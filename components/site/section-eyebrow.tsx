"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type SectionEyebrowProps = {
  number?: string
  label?: string
  className?: string
  children?: ReactNode
}

export function SectionEyebrow({ number, label, className, children }: SectionEyebrowProps) {
  const text = children ?? label
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
      className={cn(
        "flex items-center gap-4 text-[12px] uppercase tracking-[0.2em]",
        className,
      )}
    >
      {number && (
        <motion.span 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
          className="inline-flex items-center justify-center rounded-full border border-ink-08/80 bg-gradient-to-br from-white to-cream/50 dark:from-card dark:to-card px-3 py-1.5 font-mono text-[11px] font-medium text-ink-60 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_0_0_1px_rgba(255,255,255,0.6)_inset] dark:shadow-none"
        >
          {number}
        </motion.span>
      )}
      {number && (
        <motion.span 
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
          className="h-px w-10 origin-left bg-gradient-to-r from-ink-20 to-ink-08" 
        />
      )}
      <motion.span 
        initial={{ opacity: 0, x: -8 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
        className="font-medium text-ink-50"
      >
        {text}
      </motion.span>
    </motion.div>
  )
}
