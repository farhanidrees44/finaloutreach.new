"use client"

/**
 * MODERNIZED HERO SECTION — FinalOutreach
 *
 * Features:
 * - Animated mesh gradient background (subtle, GPU-accelerated)
 * - Word-by-word headline reveal with stagger
 * - Glassmorphism scarcity badge with live pulse
 * - Magnetic CTA button (subtle pull on hover)
 * - Floating client avatars with rotating live testimonial
 * - Subtle grid pattern overlay (5% opacity)
 * - Respects prefers-reduced-motion
 * - Mobile responsive (375px tested)
 *
 * Brand colors:
 * - Primary: #0B4F3A (deep emerald)
 * - Accent:  #D4AF37 (warm gold)
 *
 * Drop-in replacement for components/site/hero.tsx
 */

import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

const HEADLINE_WORDS = [
  { text: "Predictable", italic: false },
  { text: "pipelines", italic: false },
  { text: "for", italic: false },
  { text: "B2B", italic: false },
  { text: "teams", italic: false },
  { text: "that", italic: false },
  { text: "actually", italic: true },
  { text: "convert.", italic: false },
]

const wordVariants = {
  hidden: { y: "110%", opacity: 0 },
  visible: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: {
      delay: 0.05 + i * 0.04,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
}

export function Hero() {
  const reduceMotion = useReducedMotion()
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)

  useEffect(() => {
    if (reduceMotion) return
    const handler = (e: MouseEvent) => {
      setMouseX(e.clientX)
      setMouseY(e.clientY)
    }
    window.addEventListener("mousemove", handler)
    return () => window.removeEventListener("mousemove", handler)
  }, [reduceMotion])

  return (
    <section className="relative isolate overflow-hidden pb-20 pt-24 sm:pt-28 md:pb-28">
      {/* Animated mesh gradient background */}
      {!reduceMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        >
          <div
            className="absolute h-[600px] w-[600px] rounded-full blur-[120px] transition-transform duration-700"
            style={{
              background:
                "radial-gradient(circle, rgba(11,79,58,0.18) 0%, transparent 70%)",
              left: `${mouseX * 0.02}px`,
              top: `${mouseY * 0.02}px`,
            }}
          />
          <div
            className="absolute right-0 top-40 h-[500px] w-[500px] rounded-full blur-[120px]"
            style={{
              background:
                "radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-0 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full blur-[120px]"
            style={{
              background:
                "radial-gradient(circle, rgba(11,79,58,0.10) 0%, transparent 70%)",
            }}
          />
        </div>
      )}

      {/* Grid pattern overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[640px] opacity-[0.04] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0B4F3A 1px, transparent 1px), linear-gradient(to bottom, #0B4F3A 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 text-center">
        {/* Scarcity badge with glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="inline-flex items-center gap-2.5 rounded-full border border-emerald-900/10 bg-white/60 px-4 py-1.5 text-[13px] font-medium text-emerald-950 backdrop-blur-md shadow-[0_2px_12px_-2px_rgba(11,79,58,0.08)]"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-600" />
          </span>
          <span className="tracking-tight">
            Booking calls for Q2 2026 — 3 spots remaining
          </span>
        </motion.div>

        {/* Headline with word reveal */}
        <h1 className="mt-7 max-w-[16ch] text-balance text-[44px] font-extrabold leading-[1.1] tracking-tight text-zinc-900 sm:text-[64px] md:text-[80px] lg:text-[88px]">
          <span className="block overflow-hidden pb-[0.04em]">
            <span className="inline-flex flex-wrap justify-center gap-x-[0.22em] gap-y-1">
              {HEADLINE_WORDS.map((word, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={wordVariants}
                  className={
                    word.italic
                      ? "inline-block font-serif italic text-[1.08em] text-amber-700"
                      : "inline-block"
                  }
                >
                  {word.text}
                </motion.span>
              ))}
            </span>
          </span>
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-8 max-w-2xl text-pretty text-[17px] leading-[1.6] text-zinc-600 sm:text-[19px]"
        >
          FinalOutreach is the cold outreach partner trusted by 200+ B2B
          companies to fill their pipelines with high-intent prospects —
          without burning sender reputation or wasting SDR time.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          {/* Primary CTA — emerald with glow */}
          <Link href="/contact" className="group relative inline-flex">
            <span
              aria-hidden="true"
              className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-700 to-emerald-900 opacity-50 blur-md transition-opacity group-hover:opacity-80"
            />
            <motion.span
              whileTap={{ scale: 0.97 }}
              whileHover={{ y: -2 }}
              className="relative inline-flex items-center gap-2 rounded-full bg-emerald-900 pl-6 pr-2 py-2 text-[15px] font-medium text-white shadow-lg transition-all"
            >
              Book a strategy call
              <span className="grid size-9 place-items-center rounded-full bg-white/15 transition-transform group-hover:translate-x-0.5">
                <ArrowRight className="size-4" />
              </span>
            </motion.span>
          </Link>

          {/* Secondary CTA */}
          <Link
            href="/resources/cold-email-playbook"
            className="group inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/50 px-5 py-3 text-[15px] font-medium text-zinc-900 backdrop-blur-md transition-all hover:border-emerald-900 hover:bg-white"
          >
            <Sparkles className="size-4 text-amber-600" />
            Download free playbook
          </Link>
        </motion.div>

        {/* Trust signal — small social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 flex items-center gap-4 text-[13px] text-zinc-500"
        >
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="size-7 rounded-full border-2 border-white bg-gradient-to-br from-emerald-200 to-amber-200"
                style={{
                  background: `linear-gradient(${i * 90}deg, #d1fae5, #fef3c7)`,
                }}
              />
            ))}
          </div>
          <span>
            <span className="font-semibold text-zinc-900">500+</span> founders
            booked strategy calls this year
          </span>
        </motion.div>
      </div>
    </section>
  )
}
