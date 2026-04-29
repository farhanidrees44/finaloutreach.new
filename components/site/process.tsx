"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion"
import { SITE } from "@/lib/site-data"
import {
  ArrowRight,
  Compass,
  Server,
  PenLine,
  Rocket,
  TrendingUp,
  Check,
} from "lucide-react"
import { SectionEyebrow } from "./section-eyebrow"
import { cn } from "@/lib/utils"

/**
 * Process step model.
 *
 * `outcomes` is shown as a small "What you get" checklist on the active
 * card so each step earns its scroll real-estate with concrete value.
 *
 * `theme` controls the per-step gradient backdrop and accent color for
 * badges / progress indicators. The five themes intentionally walk a
 * cool→warm→cool palette so the page feels like a journey instead of
 * five identical cards.
 */
type Theme = {
  /* Soft full-card gradient (used as the card background). */
  card: string
  /* Edge halo for the card glow. */
  glow: string
  /* Pill background for the WEEK chip. */
  chipBg: string
  /* Pill text color for the WEEK chip. */
  chipText: string
  /* Active dot color in the top progress rail. */
  dot: string
}

const THEMES: readonly Theme[] = [
  // 01 Discovery — cool indigo / lavender (curiosity, mapping)
  {
    card: "bg-gradient-to-br from-[oklch(0.96_0.04_265)] via-[oklch(0.97_0.025_280)] to-[oklch(0.96_0.05_300)]",
    glow: "from-[oklch(0.55_0.20_265_/_0.35)] to-transparent",
    chipBg: "bg-[oklch(0.55_0.20_265_/_0.10)]",
    chipText: "text-[oklch(0.42_0.20_265)]",
    dot: "bg-[oklch(0.55_0.20_265)]",
  },
  // 02 Infrastructure — cool cyan / teal (technical, precise)
  {
    card: "bg-gradient-to-br from-[oklch(0.96_0.045_200)] via-[oklch(0.97_0.03_215)] to-[oklch(0.96_0.045_185)]",
    glow: "from-[oklch(0.65_0.16_200_/_0.35)] to-transparent",
    chipBg: "bg-[oklch(0.65_0.16_200_/_0.12)]",
    chipText: "text-[oklch(0.42_0.16_205)]",
    dot: "bg-[oklch(0.60_0.16_200)]",
  },
  // 03 Copy — warm peach / amber (creative, human)  ← matches reference
  {
    card: "bg-gradient-to-br from-[oklch(0.95_0.06_55)] via-[oklch(0.96_0.045_45)] to-[oklch(0.94_0.07_30)]",
    glow: "from-[oklch(0.78_0.14_55_/_0.45)] to-transparent",
    chipBg: "bg-[oklch(0.75_0.15_45_/_0.16)]",
    chipText: "text-[oklch(0.45_0.15_40)]",
    dot: "bg-[oklch(0.68_0.16_45)]",
  },
  // 04 Launch — vibrant rose / coral (energy, motion)
  {
    card: "bg-gradient-to-br from-[oklch(0.95_0.06_15)] via-[oklch(0.96_0.05_5)] to-[oklch(0.95_0.07_25)]",
    glow: "from-[oklch(0.65_0.20_15_/_0.40)] to-transparent",
    chipBg: "bg-[oklch(0.65_0.20_15_/_0.13)]",
    chipText: "text-[oklch(0.45_0.18_15)]",
    dot: "bg-[oklch(0.65_0.20_15)]",
  },
  // 05 Scale — emerald / green (growth, success)
  {
    card: "bg-gradient-to-br from-[oklch(0.96_0.045_150)] via-[oklch(0.97_0.035_165)] to-[oklch(0.95_0.05_135)]",
    glow: "from-[oklch(0.62_0.15_150_/_0.40)] to-transparent",
    chipBg: "bg-[oklch(0.55_0.18_145_/_0.13)]",
    chipText: "text-[oklch(0.40_0.16_145)]",
    dot: "bg-[oklch(0.55_0.18_145)]",
  },
] as const

const STEPS = [
  {
    n: "01",
    title: "Discovery & ICP definition",
    when: "Week 1",
    desc: "We map your offer, decode your buyer, and lock the exact accounts worth chasing. No spray-and-pray. Every prospect is a deliberate match for what you sell.",
    Icon: Compass,
    outcomes: [
      "Sharpened ICP & messaging angles",
      "Named-account target list",
      "Win-criteria & disqualification rules",
    ],
  },
  {
    n: "02",
    title: "Infrastructure & list building",
    when: "Week 2",
    desc: "Domains warmed, DNS bulletproofed, prospect lists scrubbed and verified. We never send from your primary domain — your reputation stays untouched.",
    Icon: Server,
    outcomes: [
      "Dedicated sending domains, fully warmed",
      "SPF, DKIM, DMARC & BIMI configured",
      "Triple-verified prospect list (≤2% bounce)",
    ],
  },
  {
    n: "03",
    title: "Copy & sequence creation",
    when: "Week 3",
    desc: "Sequences engineered around your ICP\u2019s pain — not templates, not AI sludge. Real research, real angles, real reasons your prospect will reply.",
    Icon: PenLine,
    outcomes: [
      "Custom multi-step sequence per persona",
      "A/B/C subject-line + opener variants",
      "Reply playbook for the SDR team",
    ],
  },
  {
    n: "04",
    title: "Launch & optimize",
    when: "Week 4",
    desc: "Campaigns go live. We A/B test subject lines, openers, and angles weekly. You see leading indicators by day 5 and meetings by week 2.",
    Icon: Rocket,
    outcomes: [
      "Live campaigns across all inboxes",
      "Weekly experiments on copy & cadence",
      "First booked meetings inside 14 days",
    ],
  },
  {
    n: "05",
    title: "Scale & report",
    when: "Ongoing",
    desc: "What works gets doubled. What doesn\u2019t gets cut. You see the dashboard every Friday, and the meetings every day.",
    Icon: TrendingUp,
    outcomes: [
      "Friday performance & pipeline review",
      "Quarterly scaling plan tied to revenue",
      "Always-on optimisation by your pod",
    ],
  },
] as const

export function Process() {
  /*
    `pinnedRef` MUST be the 500vh wrapper, not the whole <section>.
    If we bound `useScroll` to the section, the section header and the
    end-of-section CTA would each consume part of the 0..1 progress
    range — meaning the active card index would not align with the
    five sticky scroll slices, and the top rail fill would already be
    partially advanced when the pinned stage first enters the viewport.
  */
  const pinnedRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: pinnedRef,
    offset: ["start start", "end end"],
  })
  const [active, setActive] = useState(0)
  // Smooth scaled bar that fills 0..100% across the pinned runway
  const progressBarHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    // Each step occupies a slice of the progress space.
    const idx = Math.min(STEPS.length - 1, Math.floor(v * STEPS.length))
    setActive(idx < 0 ? 0 : idx)
  })

  return (
    <section
      id="process"
      className="relative border-t border-ink-08 bg-gradient-to-br from-cream via-soft-peach to-cream dark:from-background dark:via-background dark:to-background"
    >
      {/* Section header */}
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12 pb-16 pt-24 md:pb-24 md:pt-32">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
          <div className="max-w-2xl">
            <SectionEyebrow number="02" label="Process" />
            <h2 className="mt-5 text-balance text-[40px] font-medium leading-[1.08] tracking-display text-ink sm:text-[56px]">
              How we book meetings,
              <br className="hidden sm:inline" />{" "}
              <span className="font-serif-italic text-ink-60">
                step by step.
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-ink-60 md:pb-2">
            From kickoff call to filled calendar in under 30 days. No agency
            theatre, no endless onboarding decks.
          </p>
        </div>
      </div>

      {/*
        Desktop pinned card stack
        ─────────────────────────
        The outer wrapper is `STEPS.length * 100vh` tall, which gives the
        scroll listener (`useScroll` above) a long runway to drive the
        `active` index. Inside, a single sticky stage at `top-0 h-screen`
        flex-centers ONE card at a time. Five cards are absolutely
        stacked and crossfade as `active` changes — only the active card
        is interactive (others are pointer-events-none + aria-hidden).

        This pattern (used by Stripe, Linear, Apple product pages) keeps
        the user's eye locked on a single hero card while scrolling
        controls the narrative.
      */}
      <div
        ref={pinnedRef}
        className="relative hidden lg:block"
        style={{ height: `${STEPS.length * 100}vh` }}
      >
        <div className="sticky top-0 flex h-screen flex-col">
          {/* Top progress rail — five labelled stops with a smooth fill */}
          <div className="mx-auto w-full max-w-6xl px-8 pt-24">
            <ProgressRail active={active} progress={progressBarHeight} />
          </div>

          {/* Card stage — flex-1 + items-center vertically centers the
              card in the remaining viewport. Padding ensures it never
              kisses the rail above or the bottom edge. */}
          <div className="relative flex flex-1 items-center justify-center px-6 pb-12 pt-6">
            <div className="relative h-full w-full max-w-6xl">
              {STEPS.map((step, i) => (
                <ProcessCard
                  key={step.n}
                  step={step}
                  theme={THEMES[i]}
                  active={active === i}
                  index={i}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / tablet — vertical stacked timeline */}
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12 pb-20 lg:hidden">
        <ol className="relative ml-7 flex flex-col gap-12">
          <div
            aria-hidden="true"
            className="absolute -left-7 top-0 h-full w-px bg-ink-08"
          />
          {STEPS.map((step, i) => (
            <motion.li
              key={step.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="relative"
            >
              <span className="absolute -left-[32px] top-1.5 grid size-3 place-items-center rounded-full bg-ink ring-4 ring-cream" />
              <div className="flex items-center gap-3 text-[12px] uppercase tracking-[0.18em] text-ink-40">
                <span className="font-mono">{step.n}</span>
                <span>{step.when}</span>
              </div>
              <h3 className="mt-2 text-[22px] font-medium leading-tight tracking-display text-ink">
                {step.title}
              </h3>
              <p className="mt-2 max-w-xl text-[14.5px] leading-[1.65] text-ink-60">
                {step.desc.replace(/&apos;/g, "\u2019")}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>

      {/* End-of-section CTA */}
      <ProcessEndCta />
    </section>
  )
}

/* ─── Top progress rail ──────────────────────────────────────────
   Renders five labelled stops across the top of the pinned stage.
   The horizontal line behind them is filled by `progress` (a
   MotionValue from 0%→100% across the whole section) so the user
   can see exactly where they are in the process narrative. */
function ProgressRail({
  active,
  progress,
}: {
  active: number
  progress: import("framer-motion").MotionValue<string>
}) {
  return (
    <div className="relative">
      {/* Track */}
      <div className="relative mx-auto h-px w-full bg-ink-08">
        <motion.div
          aria-hidden="true"
          style={{ width: progress }}
          className="absolute inset-y-0 left-0 h-px origin-left bg-gradient-to-r from-electric-blue via-vibrant-purple to-bright-cyan"
        />
      </div>
      {/* Stops */}
      <ol className="mt-3 grid grid-cols-5 gap-4">
        {STEPS.map((step, i) => {
          const isActive = active === i
          const isPast = active > i
          return (
            <li
              key={step.n}
              aria-current={isActive ? "step" : undefined}
              className="flex flex-col items-start gap-1.5"
            >
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "grid size-5 place-items-center rounded-full text-[10px] font-semibold tabular-nums transition-all duration-300",
                    isActive
                      ? "bg-ink text-white shadow-[0_4px_12px_-2px_rgba(15,15,15,0.35)]"
                      : isPast
                        ? "bg-ink/85 text-white"
                        : "border border-ink-08 bg-white text-ink-50",
                  )}
                >
                  {isPast ? (
                    <Check
                      aria-hidden="true"
                      className="size-2.5"
                      strokeWidth={3}
                    />
                  ) : (
                    i + 1
                  )}
                </span>
                <span
                  className={cn(
                    "text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors",
                    isActive ? "text-ink" : isPast ? "text-ink-60" : "text-ink-40",
                  )}
                >
                  {step.when}
                </span>
              </div>
              <span
                className={cn(
                  "line-clamp-1 text-[12px] font-medium transition-colors",
                  isActive ? "text-ink-70" : "text-ink-40",
                )}
              >
                {step.title}
              </span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

/* ─── Single premium card for one step ───────────────────────────
   Absolutely positioned inside the stage so all five cards stack.
   Only the active card is visible & interactive. The card's left
   half holds the narrative (number / chip / title / desc / outcomes)
   and the right half hosts the existing Visual0-4 mockup, scaled to
   fill the panel.

   Inactive cards translate slightly down + scale 0.96 + opacity 0
   so the active card appears to "rise" into focus on each step
   change — much more product-feeling than a flat fade. */
function ProcessCard({
  step,
  theme,
  active,
  index,
}: {
  step: (typeof STEPS)[number]
  theme: Theme
  active: boolean
  index: number
}) {
  const Icon = step.Icon

  return (
    <motion.article
      aria-hidden={!active}
      initial={false}
      animate={{
        opacity: active ? 1 : 0,
        scale: active ? 1 : 0.96,
        y: active ? 0 : 14,
      }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
      className={cn(
        "absolute inset-0 flex overflow-hidden rounded-[28px] border border-ink-08",
        "shadow-[0_30px_80px_-30px_rgba(15,15,15,0.30),0_0_0_1px_rgba(255,255,255,0.85)_inset]",
        theme.card,
        active ? "pointer-events-auto" : "pointer-events-none",
      )}
    >
      {/* Soft, themed corner halo */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-gradient-radial blur-3xl",
          "bg-gradient-to-br opacity-80",
          theme.glow,
        )}
      />
      {/* Subtle dot grid for texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 dot-pattern opacity-[0.18]"
      />

      <div className="relative grid h-full w-full grid-cols-12 gap-8 p-10 md:p-12">
        {/* ── Narrative column ── */}
        <div className="col-span-5 flex flex-col justify-between">
          {/* Top — large step number + chip */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[14px] font-semibold tabular-nums text-ink-50">
                {step.n}
              </span>
              <span className="h-px w-8 bg-ink-20" />
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11.5px] font-semibold uppercase tracking-[0.16em]",
                  theme.chipBg,
                  theme.chipText,
                )}
              >
                <span
                  className={cn(
                    "size-1.5 rounded-full",
                    theme.dot,
                  )}
                />
                {step.when}
              </span>
            </div>

            {/* Stagger the body content so it animates in after the card
                lifts into place. Only run when active (saves cycles). */}
            <motion.div
              initial={false}
              animate={
                active
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 10 }
              }
              transition={{
                duration: 0.5,
                delay: active ? 0.1 : 0,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
              className="flex flex-col gap-5"
            >
              {/* Themed icon plate */}
              <span
                className={cn(
                  "grid size-12 place-items-center rounded-2xl border border-white/60 bg-white/70 backdrop-blur-sm",
                  theme.chipText,
                )}
              >
                <Icon className="size-5" strokeWidth={1.75} />
              </span>

              <h3 className="text-balance text-[40px] font-medium leading-[1.05] tracking-display text-ink xl:text-[48px]">
                {step.title}
              </h3>

              <p className="max-w-md text-[16px] leading-[1.65] text-ink-70">
                {step.desc}
              </p>
            </motion.div>
          </div>

          {/* Bottom — concrete deliverables checklist */}
          <motion.ul
            initial={false}
            animate={
              active ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
            }
            transition={{
              duration: 0.5,
              delay: active ? 0.22 : 0,
              ease: [0.22, 1, 0.36, 1] as const,
            }}
            className="mt-8 flex flex-col gap-2.5 border-t border-ink/10 pt-6"
          >
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-ink-50">
              What you get
            </span>
            {step.outcomes.map((outcome, i) => (
              <motion.li
                key={outcome}
                initial={false}
                animate={
                  active ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }
                }
                transition={{
                  duration: 0.4,
                  delay: active ? 0.3 + i * 0.07 : 0,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
                className="flex items-start gap-2.5 text-[14px] text-ink-70"
              >
                <span
                  className={cn(
                    "mt-1 grid size-4 shrink-0 place-items-center rounded-full",
                    theme.chipBg,
                    theme.chipText,
                  )}
                >
                  <Check className="size-2.5" strokeWidth={3} />
                </span>
                <span className="leading-snug">{outcome}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* ── Visual column ── */}
        <div className="col-span-7 flex items-center justify-center">
          <div className="relative aspect-[5/6] w-full max-w-[440px]">
            <CardVisual index={index} active={active} />
          </div>
        </div>
      </div>

      {/* Faint big-number watermark in the bottom-left for product polish */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-6 -left-2 select-none font-display text-[180px] font-bold leading-none text-ink/[0.03] xl:text-[220px]"
      >
        {step.n}
      </div>
    </motion.article>
  )
}

/* Render the right Visual based on step index. Kept separate so the
   ProcessCard above stays focused on layout. */
function CardVisual({ index, active }: { index: number; active: boolean }) {
  switch (index) {
    case 0:
      return <Visual0 active={active} />
    case 1:
      return <Visual1 active={active} />
    case 2:
      return <Visual2 active={active} />
    case 3:
      return <Visual3 active={active} />
    case 4:
      return <Visual4 active={active} />
    default:
      return null
  }
}

function ProcessEndCta() {
  return (
    <div className="relative z-10 border-t border-ink-08 bg-gradient-to-r from-soft-peach via-white to-soft-peach dark:from-card dark:via-card dark:to-card">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-5 px-6 py-12 sm:flex-row sm:items-center sm:justify-between md:py-14">
        <p className="text-[20px] font-medium leading-snug tracking-tight text-ink sm:text-[24px]">
          Ready to start{" "}
          <span className="font-serif-italic gradient-text-animated">week one?</span>
        </p>
        <a
          href={SITE.calendly}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-electric-blue to-vibrant-purple px-5 text-[14.5px] font-medium text-white transition-all hover:shadow-lg hover:shadow-electric-blue/30 active:scale-[0.98] glow-electric"
        >
          Book a call
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  )
}

/* ─── Per-step visual primitives ───────────────────────────────────
   These Visual0..Visual4 components render the right-hand mockup
   inside each ProcessCard. They are wrapped by VWrap, which handles
   the active-state crossfade. */

const VWrap = ({
  active,
  children,
}: {
  active: boolean
  children: React.ReactNode
}) => (
  <motion.div
    aria-hidden={!active}
    initial={false}
    animate={{
      opacity: active ? 1 : 0,
      scale: active ? 1 : 0.985,
      y: active ? 0 : 6,
    }}
    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
    className="absolute inset-0 flex items-center justify-center p-7"
  >
    {children}
  </motion.div>
)

function Visual0({ active }: { active: boolean }) {
  // Discovery — ICP fit scorecard for a real prospect
  const criteria = [
    { label: "Industry · B2B SaaS", score: 100, icon: "🏢" },
    { label: "Headcount · 142 ppl", score: 96, icon: "👥" },
    { label: "Tech · HubSpot, Segment", score: 88, icon: "⚙️" },
    { label: "Funding · Series B", score: 92, icon: "💰" },
    { label: "Intent · 3 signals", score: 84, icon: "📈" },
  ]
  const overall = 92
  return (
    <VWrap active={active}>
      <div className="relative flex w-full max-w-[360px] flex-col gap-4 overflow-hidden rounded-3xl border border-ink-08/60 bg-gradient-to-br from-white via-white to-soft-peach/30 dark:from-card dark:via-card dark:to-card p-6 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.12),0_0_0_1px_rgba(255,255,255,0.8)_inset]">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full bg-gradient-to-br from-electric-blue/20 to-vibrant-purple/10 blur-3xl" />
        
        {/* Header with animated badge */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink-50">
            ICP fit score
          </span>
          <motion.span 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={active ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
            className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[oklch(0.78_0.17_145_/_0.2)] to-[oklch(0.82_0.14_145_/_0.15)] px-3 py-1 text-[12px] font-semibold text-[oklch(0.40_0.16_145)] shadow-[0_2px_8px_rgba(34,197,94,0.15)]"
          >
            <motion.span
              animate={active ? { scale: [1, 1.2, 1] } : {}}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="size-2 rounded-full bg-[oklch(0.55_0.18_145)]"
            />
            {overall}% match
          </motion.span>
        </div>
        
        {/* Prospect card with subtle hover effect */}
        <motion.div 
          initial={{ y: 10, opacity: 0 }}
          animate={active ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
          className="group flex items-center gap-3.5 rounded-2xl border border-ink-08/50 bg-gradient-to-br from-white to-cream/50 dark:from-card dark:to-card p-4 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] transition-all duration-300 hover:shadow-[0_8px_30px_-6px_rgba(0,0,0,0.1)]"
        >
          <div className="relative grid size-11 place-items-center rounded-xl bg-gradient-to-br from-electric-blue via-vibrant-purple to-bright-cyan text-[14px] font-bold text-white shadow-[0_4px_12px_rgba(99,102,241,0.3)]">
            <span>Lv</span>
            <motion.div
              animate={active ? { opacity: [0.5, 1, 0.5] } : {}}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 rounded-xl bg-gradient-to-t from-white/20 to-transparent"
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[14px] font-semibold text-ink">Lavender Inc.</span>
            <span className="font-mono text-[11px] text-ink-40">lavender.ai · San Francisco</span>
          </div>
          <div className="ml-auto flex flex-col items-end gap-0.5">
            <span className="text-[16px] font-bold tabular-nums text-ink">$18M</span>
            <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-ink-40">ARR est</span>
          </div>
        </motion.div>
        
        {/* Criteria with staggered animations */}
        <div className="flex flex-col gap-3">
          {criteria.map((c, i) => (
            <motion.div 
              key={c.label} 
              initial={{ x: -20, opacity: 0 }}
              animate={active ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
              className="flex items-center gap-3"
            >
              <span className="flex-1 truncate text-[12.5px] font-medium text-ink-60">{c.label}</span>
              <div className="h-2 w-20 overflow-hidden rounded-full bg-ink-08/60">
                <motion.div
                  initial={{ width: 0 }}
                  animate={active ? { width: `${c.score}%` } : { width: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
                  className="h-full rounded-full bg-gradient-to-r from-electric-blue via-vibrant-purple to-bright-cyan"
                />
              </div>
              <motion.span 
                initial={{ opacity: 0 }}
                animate={active ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.5 + i * 0.08 }}
                className="w-10 text-right font-mono text-[12px] font-semibold tabular-nums text-ink"
              >
                {c.score}%
              </motion.span>
            </motion.div>
          ))}
        </div>
        
        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-between border-t border-ink-08/50 pt-4 text-[11.5px]"
        >
          <span className="font-medium text-ink-50">Tier 1 · Acme Q1 list</span>
          <span className="font-semibold text-ink">2,140 accounts saved</span>
        </motion.div>
      </div>
    </VWrap>
  )
}

function Visual1({ active }: { active: boolean }) {
  // Infrastructure — domain warmup with daily volume + reputation per inbox
  const rows = [
    { d: "go.acme-sales.com",      sent: 118, cap: 120, rep: 94, age: "84d", status: "ready" },
    { d: "team.acme-sales.com",    sent: 96,  cap: 100, rep: 91, age: "62d", status: "ready" },
    { d: "outreach.acme-co.io",    sent: 64,  cap: 80,  rep: 86, age: "31d", status: "warming" },
    { d: "hi.acme-co.io",          sent: 38,  cap: 60,  rep: 78, age: "14d", status: "warming" },
  ]
  const dnsChecks = ["SPF", "DKIM", "DMARC", "BIMI"]
  return (
    <VWrap active={active}>
      <div className="relative flex w-full max-w-[360px] flex-col gap-4 overflow-hidden rounded-3xl border border-ink-08/60 bg-gradient-to-br from-white via-white to-soft-peach/30 dark:from-card dark:via-card dark:to-card p-6 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.12),0_0_0_1px_rgba(255,255,255,0.8)_inset]">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -left-16 -top-16 size-40 rounded-full bg-gradient-to-br from-bright-cyan/15 to-electric-blue/10 blur-3xl" />
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink-50">
            Domain warmup
          </span>
          <motion.span 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={active ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[oklch(0.78_0.17_145_/_0.2)] to-[oklch(0.82_0.14_145_/_0.15)] px-3 py-1 text-[12px] font-semibold text-[oklch(0.40_0.16_145)] shadow-[0_2px_8px_rgba(34,197,94,0.15)]"
          >
            <motion.span
              animate={active ? { scale: [1, 1.3, 1] } : {}}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="size-2 rounded-full bg-[oklch(0.55_0.18_145)]"
            />
            Healthy
          </motion.span>
        </div>
        
        {/* Stats summary with animated counters */}
        <motion.div 
          initial={{ y: 10, opacity: 0 }}
          animate={active ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="grid grid-cols-3 gap-3 rounded-2xl border border-ink-08/50 bg-gradient-to-br from-white to-cream/50 dark:from-card dark:to-card p-4 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]"
        >
          {[
            { value: "316", label: "Sent / day", color: "from-electric-blue to-vibrant-purple" },
            { value: "A−", label: "Reputation", color: "from-vibrant-purple to-bright-cyan" },
            { value: "14/21", label: "Day", color: "from-bright-cyan to-electric-blue" },
          ].map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ y: 10, opacity: 0 }}
              animate={active ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
              className="flex flex-col items-center gap-1"
            >
              <span className={`bg-gradient-to-r ${stat.color} bg-clip-text text-[18px] font-bold tabular-nums text-transparent`}>
                {stat.value}
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-ink-40">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Per-domain rows with staggered animations */}
        <div className="flex flex-col gap-3">
          {rows.map((row, i) => {
            const pct = Math.round((row.sent / row.cap) * 100)
            return (
              <motion.div 
                key={row.d} 
                initial={{ x: -20, opacity: 0 }}
                animate={active ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
                className="group flex flex-col gap-2 rounded-xl border border-ink-08/40 bg-white/60 dark:bg-white/5 p-3 transition-all duration-300 hover:border-ink-08 hover:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.06)]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={active && row.status === "warming" ? { scale: [1, 1.15, 1] } : {}}
                      transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                      className={cn(
                        "size-2 rounded-full",
                        row.status === "ready" ? "bg-[oklch(0.55_0.18_145)]" : "bg-amber-400"
                      )}
                    />
                    <span className="truncate font-mono text-[12px] font-medium text-ink-70">{row.d}</span>
                  </div>
                  <span className="rounded-full bg-ink-08/50 px-2 py-0.5 font-mono text-[10px] text-ink-50">{row.age}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink-08/60">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={active ? { width: `${pct}%` } : { width: 0 }}
                      transition={{ delay: 0.4 + i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
                      className={cn(
                        "h-full rounded-full",
                        row.status === "ready" 
                          ? "bg-gradient-to-r from-ink via-electric-blue to-bright-cyan" 
                          : "bg-gradient-to-r from-amber-400 to-amber-500"
                      )}
                    />
                  </div>
                  <span className="min-w-[48px] text-right font-mono text-[11px] font-semibold tabular-nums text-ink">
                    {row.sent}/{row.cap}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
        
        {/* DNS checks with animated checkmarks */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-between border-t border-ink-08/50 pt-4"
        >
          <div className="flex items-center gap-2">
            {dnsChecks.map((check, i) => (
              <motion.span 
                key={check}
                initial={{ scale: 0, opacity: 0 }}
                animate={active ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{ delay: 0.7 + i * 0.1, type: "spring", stiffness: 400, damping: 15 }}
                className="flex items-center gap-1 rounded-full bg-[oklch(0.78_0.17_145_/_0.12)] px-2 py-0.5 font-mono text-[10px] font-medium text-[oklch(0.40_0.16_145)]"
              >
                <svg className="size-3" viewBox="0 0 16 16" fill="none">
                  <motion.path 
                    d="M3 8.5L6.5 12L13 4" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={active ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ delay: 0.8 + i * 0.1, duration: 0.3 }}
                  />
                </svg>
                {check}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </VWrap>
  )
}

function Visual2({ active }: { active: boolean }) {
  // Copy — full sequence map with per-step performance
  const steps = [
    { day: "Day 0",  label: "Opener", sublabel: "attribution angle", reply: 21, sent: 1420, kind: "manual", icon: "✉️" },
    { day: "Day 3",  label: "Bump", sublabel: "case study link",      reply: 14, sent: 1180, kind: "auto", icon: "📎"   },
    { day: "Day 7",  label: "Value", sublabel: "12-min teardown",     reply: 9,  sent: 1024, kind: "auto", icon: "🎯"   },
    { day: "Day 12", label: "Breakup", sublabel: "permission close",  reply: 6,  sent: 880,  kind: "auto", icon: "👋"   },
  ]
  const totalReply = 38.4
  const vsTarget = 12.4
  return (
    <VWrap active={active}>
      <div className="relative flex w-full max-w-[360px] flex-col gap-4 overflow-hidden rounded-3xl border border-ink-08/60 bg-gradient-to-br from-white via-white to-soft-peach/30 dark:from-card dark:via-card dark:to-card p-6 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.12),0_0_0_1px_rgba(255,255,255,0.8)_inset]">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -right-16 top-1/2 size-40 -translate-y-1/2 rounded-full bg-gradient-to-br from-vibrant-purple/15 to-electric-blue/10 blur-3xl" />
        
        {/* Header */}
        <div className="flex items-start justify-between">
          <motion.div 
            initial={{ y: 10, opacity: 0 }}
            animate={active ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-1"
          >
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink-50">
              Sequence · CMOs · Series B
            </span>
            <span className="font-mono text-[11px] text-ink-40">v3.2 · 4 steps · A/B/C</span>
          </motion.div>
          <motion.span 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={active ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[oklch(0.78_0.17_145_/_0.2)] to-[oklch(0.82_0.14_145_/_0.15)] px-3 py-1 text-[12px] font-semibold text-[oklch(0.40_0.16_145)] shadow-[0_2px_8px_rgba(34,197,94,0.15)]"
          >
            <motion.span
              animate={active ? { scale: [1, 1.3, 1] } : {}}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="size-2 rounded-full bg-[oklch(0.55_0.18_145)]"
            />
            Active
          </motion.span>
        </div>
        
        {/* Sequence steps with animated timeline */}
        <div className="relative flex flex-col gap-0">
          {/* Timeline rail - animated fill */}
          <div className="absolute left-[18px] top-4 h-[calc(100%-32px)] w-0.5 overflow-hidden rounded-full bg-ink-08/60">
            <motion.div
              initial={{ height: 0 }}
              animate={active ? { height: "100%" } : { height: 0 }}
              transition={{ delay: 0.3, duration: 1.2, ease: [0.22, 1, 0.36, 1] as const }}
              className="w-full rounded-full bg-gradient-to-b from-electric-blue via-vibrant-purple to-bright-cyan"
            />
          </div>
          
          {steps.map((s, i) => (
            <motion.div 
              key={s.day}
              initial={{ x: -20, opacity: 0 }}
              animate={active ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
              transition={{ delay: 0.15 + i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
              className="group relative flex items-center gap-4 rounded-xl p-2 transition-all duration-300 hover:bg-white/60 dark:bg-white/5"
            >
              {/* Step node */}
              <motion.div
                initial={{ scale: 0 }}
                animate={active ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: 0.3 + i * 0.15, type: "spring", stiffness: 400, damping: 15 }}
                className={cn(
                  "relative z-10 grid size-9 place-items-center rounded-xl text-[14px] shadow-[0_4px_12px_-2px_rgba(0,0,0,0.1)]",
                  i === 0 
                    ? "bg-gradient-to-br from-ink to-ink-70 text-white" 
                    : "border border-ink-08/60 bg-white dark:bg-white/5 text-ink-60"
                )}
              >
                <span className="text-[13px]">{s.icon}</span>
              </motion.div>
              
              {/* Content */}
              <div className="flex flex-1 items-center justify-between gap-2">
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-semibold text-ink">{s.label}</span>
                    <span className="text-[12px] text-ink-50">{s.sublabel}</span>
                  </div>
                  <span className="font-mono text-[10.5px] text-ink-40">
                    {s.day} · {s.kind} · {s.sent.toLocaleString()} sent
                  </span>
                </div>
                
                {/* Reply rate badge with micro-animation */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={active ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] font-semibold tabular-nums",
                    i === 0 
                      ? "bg-gradient-to-r from-electric-blue/15 to-vibrant-purple/15 text-electric-blue" 
                      : "bg-ink-08/50 text-ink-60"
                  )}
                >
                  <svg className="size-3" viewBox="0 0 16 16" fill="none">
                    <path d="M2 8h12M10 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {s.reply}%
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Performance footer with animated stats */}
        <motion.div 
          initial={{ y: 10, opacity: 0 }}
          animate={active ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="grid grid-cols-2 gap-3 rounded-2xl bg-gradient-to-br from-soft-peach/50 to-cream/30 dark:from-white/5 dark:to-white/[0.02] p-4"
        >
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-40">Combined reply</span>
            <span className="bg-gradient-to-r from-ink to-ink-70 bg-clip-text text-[22px] font-bold tabular-nums text-transparent">
              {totalReply}%
            </span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-40">vs target</span>
            <motion.span 
              initial={{ scale: 0.8 }}
              animate={active ? { scale: [0.8, 1.1, 1] } : { scale: 0.8 }}
              transition={{ delay: 0.9, duration: 0.4 }}
              className="flex items-center gap-1 text-[18px] font-bold tabular-nums text-[oklch(0.45_0.16_145)]"
            >
              <ArrowRight className="size-4 -rotate-45" />
              +{vsTarget} pts
            </motion.span>
          </div>
        </motion.div>
      </div>
    </VWrap>
  )
}

function Visual3({ active }: { active: boolean }) {
  // Launch — live campaign with full funnel + 14-day trend
  const funnel = [
    { l: "Sent",      n: 8420, pct: 100 },
    { l: "Delivered", n: 8318, pct: 98.8 },
    { l: "Opened",    n: 5420, pct: 64.4 },
    { l: "Replied",   n: 1847, pct: 21.9 },
    { l: "Booked",    n: 124,  pct: 6.7 },
  ]
  const heights = [22, 28, 31, 26, 38, 42, 35, 48, 54, 47, 61, 58, 72, 78]
  
  return (
    <VWrap active={active}>
      <div className="relative flex w-full max-w-[340px] flex-col gap-5 overflow-hidden rounded-2xl border border-ink-08/60 bg-gradient-to-br from-white via-white to-soft-peach/20 dark:from-card dark:via-card dark:to-card p-5 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.1),0_0_0_1px_rgba(255,255,255,0.8)_inset]">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full bg-gradient-to-br from-electric-blue/10 to-vibrant-purple/8 blur-2xl" />
        
        {/* Header - compact */}
        <div className="flex items-center justify-between">
          <motion.div 
            initial={{ y: 8, opacity: 0 }}
            animate={active ? { y: 0, opacity: 1 } : { y: 8, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-0.5"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-60">
              Q1 Launch · Week 4
            </span>
            <span className="font-mono text-[10px] text-ink-40">3 sequences · 12 inboxes</span>
          </motion.div>
          <motion.span 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={active ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
            transition={{ delay: 0.15, duration: 0.3 }}
            className="inline-flex items-center gap-1.5 rounded-full bg-[oklch(0.55_0.20_145_/_0.12)] px-2.5 py-1 text-[11px] font-semibold text-[oklch(0.40_0.18_145)]"
          >
            <motion.span
              animate={active ? { scale: [1, 1.3, 1] } : {}}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="size-1.5 rounded-full bg-[oklch(0.50_0.20_145)]"
            />
            Live
          </motion.span>
        </div>

        {/* Funnel - uniform compact rows */}
        <div className="flex flex-col gap-1.5">
          {funnel.map((f, i) => {
            const isFirst = i === 0
            const isLast = i === funnel.length - 1
            return (
              <motion.div 
                key={f.l}
                initial={{ x: -12, opacity: 0 }}
                animate={active ? { x: 0, opacity: 1 } : { x: -12, opacity: 0 }}
                transition={{ delay: 0.08 + i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
                className="grid h-7 grid-cols-[60px_1fr_52px] items-center gap-2"
              >
                <span className={cn(
                  "text-[11px] font-medium",
                  isFirst || isLast ? "text-ink" : "text-ink-50"
                )}>
                  {f.l}
                </span>
                <div className="relative h-2 overflow-hidden rounded-full bg-ink-08/40">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={active ? { width: `${Math.max(f.pct, 3)}%` } : { width: 0 }}
                    transition={{ delay: 0.2 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
                    className={cn(
                      "h-full rounded-full",
                      isFirst ? "bg-gradient-to-r from-electric-blue to-vibrant-purple" :
                      isLast ? "bg-gradient-to-r from-[oklch(0.55_0.18_145)] to-[oklch(0.60_0.16_160)]" :
                      "bg-ink/80"
                    )}
                  />
                </div>
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={active ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.35 + i * 0.05 }}
                  className={cn(
                    "text-right font-mono text-[11px] tabular-nums",
                    isFirst || isLast ? "font-semibold text-ink" : "font-medium text-ink-60"
                  )}
                >
                  {f.n.toLocaleString()}
                </motion.span>
              </motion.div>
            )
          })}
        </div>

        {/* Sparkline - compact */}
        <motion.div 
          initial={{ opacity: 0, y: 6 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="rounded-xl border border-ink-08/40 bg-white/60 dark:bg-white/5 p-3"
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-ink-40">Meetings · 14d</span>
            <span className="flex items-center gap-0.5 text-[10px] font-semibold text-[oklch(0.45_0.16_145)]">
              <ArrowRight className="size-2.5 -rotate-45" />
              +18
            </span>
          </div>
          <div className="flex h-8 items-end justify-between">
            {heights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={active ? { height: `${h}%` } : { height: 0 }}
                transition={{ delay: 0.45 + i * 0.025, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
                className={cn(
                  "w-[5px] rounded-sm",
                  i >= heights.length - 7
                    ? "bg-gradient-to-t from-electric-blue to-vibrant-purple"
                    : "bg-ink-08"
                )}
                style={{ minHeight: 3 }}
              />
            ))}
          </div>
        </motion.div>

        {/* KPIs - single row, compact */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { v: "22.2%", l: "Reply", t: "+3.1" },
            { v: "6.7%", l: "Book rate", t: "+1.2" },
            { v: "$1.4M", l: "Pipeline", t: "+$420K" },
          ].map((k, i) => (
            <motion.div 
              key={k.l}
              initial={{ y: 8, opacity: 0 }}
              animate={active ? { y: 0, opacity: 1 } : { y: 8, opacity: 0 }}
              transition={{ delay: 0.5 + i * 0.06, duration: 0.35 }}
              className="flex flex-col items-center gap-0.5 rounded-lg bg-ink-08/20 py-2"
            >
              <span className="text-[13px] font-bold tabular-nums text-ink">{k.v}</span>
              <span className="text-[8px] font-semibold uppercase tracking-[0.1em] text-ink-40">{k.l}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </VWrap>
  )
}

function Visual4({ active }: { active: boolean }) {
  // Scale — pipeline trend with combo chart + KPIs
  const weeks = [
    { w: "W1", bar: 18, line: 22 },
    { w: "W2", bar: 24, line: 28 },
    { w: "W3", bar: 32, line: 36 },
    { w: "W4", bar: 28, line: 42 },
    { w: "W5", bar: 41, line: 56 },
    { w: "W6", bar: 48, line: 64 },
    { w: "W7", bar: 56, line: 78 },
    { w: "W8", bar: 64, line: 92 },
  ]
  const stats = [
    { value: "$2.1M", label: "Pipeline", icon: "💰", trend: "+312%" },
    { value: "84", label: "Demos", icon: "📊", trend: "+47" },
    { value: "4.2x", label: "ROI", icon: "🚀", trend: "vs target" },
  ]
  return (
    <VWrap active={active}>
      <div className="relative flex w-full max-w-[360px] flex-col gap-4 overflow-hidden rounded-3xl border border-ink-08/60 bg-gradient-to-br from-white via-white to-soft-peach/30 dark:from-card dark:via-card dark:to-card p-6 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.12),0_0_0_1px_rgba(255,255,255,0.8)_inset]">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -left-16 -top-16 size-48 rounded-full bg-gradient-to-br from-[oklch(0.78_0.17_145_/_0.2)] to-[oklch(0.55_0.20_260_/_0.1)] blur-3xl" />
        
        {/* Header */}
        <div className="flex items-start justify-between">
          <motion.div 
            initial={{ y: 10, opacity: 0 }}
            animate={active ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-1"
          >
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink-50">
              Pipeline · Q1 2025
            </span>
            <span className="font-mono text-[11px] text-ink-40">8 weeks · weekly snapshot</span>
          </motion.div>
          <motion.span 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={active ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[oklch(0.78_0.17_145_/_0.2)] to-[oklch(0.82_0.14_145_/_0.15)] px-3 py-1.5 text-[13px] font-bold text-[oklch(0.40_0.16_145)] shadow-[0_2px_8px_rgba(34,197,94,0.15)]"
          >
            <motion.span
              animate={active ? { rotate: [0, -10, 10, 0] } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <ArrowRight className="size-4 -rotate-45" />
            </motion.span>
            +312%
          </motion.span>
        </div>
        
        {/* Chart container with animated elements */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative h-36 w-full rounded-2xl border border-ink-08/40 bg-gradient-to-br from-white/80 to-cream/30 dark:from-white/5 dark:to-white/[0.02] p-3"
        >
          <svg viewBox="0 0 320 120" preserveAspectRatio="none" className="absolute inset-3 h-[calc(100%-24px)] w-[calc(100%-24px)]">
            <defs>
              <linearGradient id="pipeFill4" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.55 0.20 260)" stopOpacity="0.35" />
                <stop offset="100%" stopColor="oklch(0.65 0.18 200)" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="pipeStroke4" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="oklch(0.55 0.20 260)" />
                <stop offset="50%" stopColor="oklch(0.60 0.19 290)" />
                <stop offset="100%" stopColor="oklch(0.65 0.18 200)" />
              </linearGradient>
              <linearGradient id="barGrad4" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.25 0 0)" />
                <stop offset="100%" stopColor="oklch(0.15 0 0)" />
              </linearGradient>
            </defs>
            {/* Animated bars */}
            {weeks.map((w, i) => {
              const bw = 24
              const gap = (320 - bw * weeks.length) / (weeks.length + 1)
              const x = gap + i * (bw + gap)
              const h = (w.bar / 100) * 100
              return (
                <motion.rect
                  key={w.w}
                  x={x}
                  width={bw}
                  rx="4"
                  fill="url(#barGrad4)"
                  initial={{ y: 120, height: 0 }}
                  animate={active ? { y: 120 - h, height: h } : { y: 120, height: 0 }}
                  transition={{ delay: 0.3 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
                />
              )
            })}
            {/* Animated pipeline line */}
            {(() => {
              const pts = weeks.map((w, i) => {
                const bw = 24
                const gap = (320 - bw * weeks.length) / (weeks.length + 1)
                const x = gap + i * (bw + gap) + bw / 2
                const y = 120 - (w.line / 100) * 110
                return [x, y] as const
              })
              const d = pts.map(([x, y], i) => (i === 0 ? `M${x} ${y}` : `L${x} ${y}`)).join(" ")
              const fill = `${d} L${pts[pts.length - 1][0]} 120 L${pts[0][0]} 120 Z`
              return (
                <>
                  <motion.path 
                    d={fill} 
                    fill="url(#pipeFill4)"
                    initial={{ opacity: 0 }}
                    animate={active ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  />
                  <motion.path 
                    d={d} 
                    fill="none" 
                    stroke="url(#pipeStroke4)" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={active ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] as const }}
                  />
                  {pts.map(([x, y], i) => (
                    <motion.circle 
                      key={i} 
                      cx={x} 
                      cy={y} 
                      r={i === pts.length - 1 ? 5 : 3} 
                      fill="oklch(0.55 0.20 260)" 
                      stroke="white" 
                      strokeWidth="2"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={active ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                      transition={{ delay: 0.7 + i * 0.08, type: "spring", stiffness: 400, damping: 15 }}
                    />
                  ))}
                </>
              )
            })()}
          </svg>
        </motion.div>
        
        {/* Week labels */}
        <div className="flex items-center justify-between px-1 font-mono text-[10px] text-ink-40">
          {weeks.map((w, i) => (
            <motion.span 
              key={w.w}
              initial={{ opacity: 0 }}
              animate={active ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.4 + i * 0.05 }}
            >
              {w.w}
            </motion.span>
          ))}
        </div>
        
        {/* Stats with icons and trends */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ y: 15, opacity: 0 }}
              animate={active ? { y: 0, opacity: 1 } : { y: 15, opacity: 0 }}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
              className="group flex flex-col gap-1.5 rounded-xl border border-ink-08/40 bg-white/70 dark:bg-white/5 p-3 transition-all duration-300 hover:border-ink-08 hover:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.06)]"
            >
              <div className="flex items-center justify-between">
                <span className="text-[14px]">{stat.icon}</span>
                <span className="text-[10px] font-semibold text-[oklch(0.45_0.16_145)]">{stat.trend}</span>
              </div>
              <motion.span 
                className="text-[20px] font-bold tabular-nums leading-none text-ink"
                initial={{ scale: 0.9 }}
                animate={active ? { scale: 1 } : { scale: 0.9 }}
                transition={{ delay: 1 + i * 0.1, type: "spring", stiffness: 300, damping: 20 }}
              >
                {stat.value}
              </motion.span>
              <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-ink-40">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </VWrap>
  )
}

