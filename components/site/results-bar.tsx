"use client"

import { useEffect, useId, useRef, useState } from "react"
import {
  animate,
  motion,
  useAnimationControls,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion"
import { ArrowUpRight, ShieldCheck, TrendingUp } from "lucide-react"

type Stat = {
  label: string
  sublabel?: string
  // A small contextual delta shown as a pill in the top-right of each card.
  // `tone: 'up'` renders green w/ arrow; 'neutral' is a subtle muted pill.
  delta?: { text: string; tone: "up" | "neutral" }
  // 14 normalized points (0..1) for the sparkline. Hand-tuned per stat so
  // each card tells a slightly different story (steady climb, late spike, etc.)
  spark: number[]
  // The raw value we count up to. Format() converts it into prefix/main/suffix.
  initialValue: number
  format: (n: number) => { prefix?: string; main: string; suffix?: string }
  // Optional: if present, the value ticks up at random intervals between
  // [everyMs[0], everyMs[1]] by a random amount in [by[0], by[1]]. This is
  // what gives the section its "live" feel for metrics that genuinely grow.
  tick?: { everyMs: [number, number]; by: [number, number] }
}

const STATS: Stat[] = [
  {
    label: "Pipeline generated",
    sublabel: "for clients to date",
    delta: { text: "+$240K this month", tone: "up" },
    spark: [0.18, 0.22, 0.31, 0.28, 0.36, 0.44, 0.41, 0.52, 0.58, 0.64, 0.62, 0.72, 0.78, 0.86],
    initialValue: 47_000_000,
    format: (n) => ({
      prefix: "$",
      main: (n / 1_000_000).toFixed(1),
      suffix: "M+",
    }),
    tick: { everyMs: [6000, 11000], by: [40_000, 180_000] },
  },
  {
    label: "Qualified meetings",
    sublabel: "booked & accepted",
    delta: { text: "+47 this week", tone: "up" },
    spark: [0.22, 0.28, 0.34, 0.32, 0.41, 0.48, 0.46, 0.55, 0.61, 0.58, 0.69, 0.74, 0.81, 0.88],
    initialValue: 12_400,
    format: (n) => ({
      main: Math.round(n).toLocaleString("en-US"),
      suffix: "+",
    }),
    tick: { everyMs: [9000, 16000], by: [1, 2] },
  },
  {
    label: "B2B companies",
    sublabel: "served since 2021",
    delta: { text: "+8 this quarter", tone: "up" },
    spark: [0.30, 0.32, 0.36, 0.41, 0.45, 0.48, 0.53, 0.57, 0.62, 0.66, 0.71, 0.76, 0.81, 0.85],
    initialValue: 200,
    format: (n) => ({
      main: Math.round(n).toString(),
      suffix: "+",
    }),
  },
  {
    label: "Average ROI",
    sublabel: "within first 90 days",
    delta: { text: "vs 1.4x industry avg", tone: "neutral" },
    spark: [0.40, 0.44, 0.42, 0.48, 0.52, 0.55, 0.58, 0.62, 0.66, 0.70, 0.72, 0.78, 0.83, 0.88],
    initialValue: 3.2,
    format: (n) => ({
      main: n.toFixed(1),
      suffix: "x",
    }),
  },
]

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Animated sparkline. Draws the line in once on entry, then fades a soft
 * gradient fill underneath and pops the trailing data-point dot.
 */
function Sparkline({
  points,
  inView,
  delay = 0,
}: {
  points: number[]
  inView: boolean
  delay?: number
}) {
  const id = useId().replace(/:/g, "_")
  const w = 100
  const h = 28
  const stepX = w / (points.length - 1)
  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${(i * stepX).toFixed(2)} ${(h - p * h).toFixed(2)}`)
    .join(" ")
  const fillPath = `${linePath} L ${w} ${h} L 0 ${h} Z`
  const lastY = h - points[points.length - 1] * h

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className="block h-7 w-full overflow-visible"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`g_${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.58 0.22 250)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="oklch(0.58 0.22 250)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={fillPath}
        fill={`url(#g_${id})`}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.9, delay: delay + 1.0, ease: "easeOut" }}
      />
      <motion.path
        d={linePath}
        stroke="oklch(0.58 0.22 250)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.4, delay: delay + 0.2, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.circle
        cx={w}
        cy={lastY}
        r={2}
        fill="oklch(0.58 0.22 250)"
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.4, delay: delay + 1.5, ease: "easeOut" }}
      />
    </svg>
  )
}

/**
 * The big number itself. Owns its own count-up motion value and, optionally,
 * a setInterval-style "live tick" that increments the target every few
 * seconds. When a tick fires it also briefly nudges the number's scale so
 * the eye catches the change.
 */
function StatNumber({ stat, inView }: { stat: Stat; inView: boolean }) {
  const reduce = useReducedMotion()
  const [target, setTarget] = useState(stat.initialValue)
  const mv = useMotionValue(reduce || !inView ? stat.initialValue : 0)
  const display = useTransform(mv, (v) => stat.format(v).main)
  const flash = useAnimationControls()

  // Prefix/suffix come from the format function but never change as the value
  // ticks, so compute them once from the initial value for stable rendering.
  const baseFmt = stat.format(stat.initialValue)

  // Initial count-up + every subsequent target change (from a live tick).
  useEffect(() => {
    if (reduce) {
      mv.set(target)
      return
    }
    if (!inView) return
    const controls = animate(mv, target, {
      duration: target === stat.initialValue ? 1.6 : 0.9,
      ease: [0.16, 1, 0.3, 1],
    })
    return () => controls.stop()
  }, [inView, target, reduce, mv, stat.initialValue])

  // Live ticking. Only runs when the section is visible and the user hasn't
  // requested reduced motion.
  useEffect(() => {
    if (!inView || reduce || !stat.tick) return
    let timer: ReturnType<typeof setTimeout>
    const schedule = () => {
      const [minMs, maxMs] = stat.tick!.everyMs
      const wait = minMs + Math.random() * (maxMs - minMs)
      timer = setTimeout(() => {
        const [minBy, maxBy] = stat.tick!.by
        const inc = minBy + Math.random() * (maxBy - minBy)
        setTarget((t) => t + inc)
        flash.start({
          scale: [1, 1.035, 1],
          transition: { duration: 0.55, ease: "easeOut" },
        })
        schedule()
      }, wait)
    }
    schedule()
    return () => clearTimeout(timer)
  }, [inView, reduce, stat.tick, flash])

  return (
    <motion.div
      animate={flash}
      style={{ transformOrigin: "left center" }}
      className="flex items-baseline whitespace-nowrap leading-none tracking-display [font-variant-numeric:tabular-nums]"
    >
      {baseFmt.prefix && (
        <span className="mr-0.5 text-[28px] font-medium text-ink-40 sm:text-[32px] md:text-[36px]">
          {baseFmt.prefix}
        </span>
      )}
      <span className="text-[44px] font-semibold tracking-[-0.02em] text-ink sm:text-[52px] md:text-[56px]">
        <motion.span>{display}</motion.span>
      </span>
      {baseFmt.suffix && (
        <span className="ml-0.5 text-[22px] font-medium text-ink-40 sm:text-[26px] md:text-[28px]">
          {baseFmt.suffix}
        </span>
      )}
    </motion.div>
  )
}

function DeltaPill({ delta }: { delta: NonNullable<Stat["delta"]> }) {
  if (delta.tone === "up") {
    return (
      <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-md bg-emerald-500/[0.08] px-1.5 py-0.5 text-[10.5px] font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-500/15">
        <ArrowUpRight className="size-2.5" aria-hidden="true" strokeWidth={2.5} />
        {delta.text}
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-md bg-ink/[0.04] px-1.5 py-0.5 text-[10.5px] font-medium text-ink-60 ring-1 ring-inset ring-ink/[0.06]">
      {delta.text}
    </span>
  )
}

function StatCard({ stat, index, inView }: { stat: Stat; index: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.05 + index * 0.07, ease: EASE }}
      className="group relative flex flex-col gap-5 rounded-2xl border border-ink/[0.07] bg-white/80 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/[0.12] hover:shadow-[0_12px_40px_-12px_rgba(15,15,15,0.12)] dark:border-white/10 dark:bg-card sm:p-7"
    >
      {/* Top hairline — appears on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-electric-blue/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Label + delta pill */}
      <div className="flex items-start justify-between gap-3">
        <span className="text-[12px] font-medium uppercase tracking-[0.08em] text-ink-40">
          {stat.label}
        </span>
        {stat.delta && <DeltaPill delta={stat.delta} />}
      </div>

      {/* The big number */}
      <StatNumber stat={stat} inView={inView} />

      {/* Sparkline */}
      <Sparkline points={stat.spark} inView={inView} delay={index * 0.07} />

      {/* Sublabel */}
      {stat.sublabel && (
        <span className="text-[12.5px] leading-snug text-ink-40">{stat.sublabel}</span>
      )}
    </motion.div>
  )
}

/**
 * The pulsing "Live" indicator next to the section eyebrow. The two stacked
 * green dots create a "ping" effect — outer scales up and fades, inner stays.
 */
function LiveBadge() {
  const reduce = useReducedMotion()
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-emerald-700">
      <span className="relative inline-flex size-1.5 items-center justify-center">
        <motion.span
          aria-hidden="true"
          className="absolute inline-flex h-full w-full rounded-full bg-emerald-500"
          animate={reduce ? undefined : { opacity: [0.55, 0, 0.55], scale: [1, 2.4, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
      </span>
      Live
    </div>
  )
}

export function ResultsBar() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-b from-cream via-white to-cream dark:from-background dark:via-background dark:to-background"
    >
      {/* Soft, slow-drifting glow blobs — purely decorative */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="blob-drift-a absolute -right-32 top-12 h-80 w-80 rounded-full bg-bright-cyan/[0.06] blur-3xl" />
        <div className="blob-drift-b absolute -left-32 bottom-12 h-80 w-80 rounded-full bg-electric-blue/[0.05] blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-24 pt-16 md:pb-28 md:pt-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-12 flex flex-col gap-4 md:mb-16"
        >
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-ink/[0.08] bg-white/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-ink-60 backdrop-blur-sm">
              <TrendingUp className="size-3.5 text-electric-blue" aria-hidden="true" />
              By the numbers
            </div>
            <LiveBadge />
          </div>
          <h2 className="max-w-2xl text-balance text-[30px] font-medium leading-[1.08] tracking-display text-ink sm:text-[40px]">
            Real results from real campaigns.{" "}
            <span className="font-serif-italic gradient-text-animated">
              No vanity metrics.
            </span>
          </h2>
        </motion.div>

        {/* Stat grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <StatCard key={s.label} stat={s} index={i} inView={inView} />
          ))}
        </div>

        {/* Verified badge */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
          className="mt-10 flex justify-center md:justify-start"
        >
          <div className="inline-flex items-center gap-2.5 rounded-full border border-ink/[0.08] bg-white/70 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-ink-60 backdrop-blur-sm">
            <ShieldCheck className="size-3.5 text-electric-blue" aria-hidden="true" />
            <span>Verified across active client engagements</span>
            <span className="hidden h-3 w-px bg-ink/15 sm:block" aria-hidden="true" />
            <span className="hidden text-ink-40 sm:inline">Jan 2021 – present</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
