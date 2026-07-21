"use client"

import { useRef } from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { CAL, CAL_BUTTON_PROPS, isBookingHref, openCalPopup } from "@/lib/cal"

type Props = {
  href: string
  children: React.ReactNode
  variant?: "primary" | "ink" | "ghost"
  size?: "md" | "lg"
  className?: string
  hideArrow?: boolean
}

export function MagneticButton({
  href,
  children,
  variant = "primary",
  size = "lg",
  className,
  hideArrow,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.5 })
  const booking = isBookingHref(href)

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (prefersReducedMotion) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    x.set((e.clientX - cx) * 0.18)
    y.set((e.clientY - cy) * 0.28)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  const sizes = {
    md: "h-12 px-6 text-[15px]",
    lg: "h-[58px] px-8 text-[15.5px]",
  }
  const variants = {
    primary: cn(
      "text-white shine-overlay cta-pulse",
      "bg-[linear-gradient(120deg,oklch(0.55_0.24_295),oklch(0.58_0.22_250)_50%,oklch(0.50_0.22_270))]",
      "hover:bg-[linear-gradient(120deg,oklch(0.50_0.24_295),oklch(0.52_0.22_250)_50%,oklch(0.46_0.22_270))]",
    ),
    ink: "bg-ink text-background hover:bg-ink/90 shine-overlay shadow-premium-lg",
    ghost:
      "bg-transparent text-ink border border-ink-08 hover:border-vibrant-purple/50 hover:bg-vibrant-purple/[0.04]",
  }

  const isExternal = !booking && /^https?:\/\//.test(href)

  return (
    <motion.a
      ref={ref}
      href={booking ? CAL.url : href}
      {...(booking ? CAL_BUTTON_PROPS : {})}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      onClick={
        booking
          ? (e) => {
              e.preventDefault()
              void openCalPopup("magnetic")
            }
          : undefined
      }
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-colors duration-200 will-change-transform",
        sizes[size],
        variants[variant],
        className,
      )}
    >
      <span>{children}</span>
      {!hideArrow && (
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
        />
      )}
    </motion.a>
  )
}

export function MagneticLink(props: Props) {
  return <MagneticButton {...props} />
}
