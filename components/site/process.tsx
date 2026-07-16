"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion"
import {
  ArrowRight,
  Check,
  Compass,
  PenLine,
  Rocket,
  Server,
  TrendingUp,
} from "lucide-react"
import { SectionEyebrow } from "./section-eyebrow"
import { cn } from "@/lib/utils"

const STEPS = [
  {
    n: "01",
    index: 1,
    title: "Discovery & ICP definition",
    when: "Week 1",
    whenShort: "WEEK 1",
    desc: "We map your offer, decode your buyer, and lock the exact accounts worth chasing. No spray-and-pray. Every prospect is a deliberate match for what you sell.",
    outcomes: [
      "Sharpened ICP & messaging angles",
      "Named-account target list",
      "Win-criteria & disqualification rules",
    ],
    Icon: Compass,
    visual: "discovery" as const,
  },
  {
    n: "02",
    index: 2,
    title: "Infrastructure & list building",
    when: "Week 2",
    whenShort: "WEEK 2",
    desc: "Domains warmed, DNS bulletproofed, prospect lists scrubbed and verified. We never send from your primary domain — your reputation stays untouched.",
    outcomes: [
      "Dedicated sending domains, fully warmed",
      "SPF, DKIM, DMARC & BIMI configured",
      "Triple-verified prospect list (≤2% bounce)",
    ],
    Icon: Server,
    visual: "infra" as const,
  },
  {
    n: "03",
    index: 3,
    title: "Copy & sequence creation",
    when: "Week 3",
    whenShort: "WEEK 3",
    desc: "Sequences engineered around your ICP's pain — not templates, not AI sludge. Real research, real angles, real reasons your prospect will reply.",
    outcomes: [
      "Custom multi-step sequence per persona",
      "A/B/C subject-line + opener variants",
      "Reply playbook for the SDR team",
    ],
    Icon: PenLine,
    visual: "copy" as const,
  },
  {
    n: "04",
    index: 4,
    title: "Launch & optimize",
    when: "Week 4",
    whenShort: "WEEK 4",
    desc: "Campaigns go live. We A/B test subject lines, openers, and angles weekly. You see leading indicators by day 5 and meetings by week 2.",
    outcomes: [
      "Live campaigns across all inboxes",
      "Weekly experiments on copy & cadence",
      "First booked meetings inside 14 days",
    ],
    Icon: Rocket,
    visual: "launch" as const,
  },
  {
    n: "05",
    index: 5,
    title: "Scale & report",
    when: "Ongoing",
    whenShort: "ONGOING",
    desc: "What works gets doubled. What doesn't gets cut. You see the dashboard every Friday, and the meetings every day.",
    outcomes: [
      "Friday performance & pipeline review",
      "Quarterly scaling plan tied to revenue",
      "Always-on optimisation by your pod",
    ],
    Icon: TrendingUp,
    visual: "scale" as const,
  },
] as const

type Step = (typeof STEPS)[number]

/**
 * Scroll-linked Process section matching the lookalike reference:
 * sticky timeline + featured step card that advances as you scroll.
 * Section number stays 06 on the homepage.
 */
export function Process() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const scrollingToRef = useRef<number | null>(null)

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  })

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (scrollingToRef.current !== null) return
    // Map progress into 5 equal bands; clamp so v===1 stays on last step
    const next = Math.min(
      STEPS.length - 1,
      Math.max(0, Math.floor(v * STEPS.length - Number.EPSILON)),
    )
    setActive((prev) => (prev === next ? prev : next))
  })

  const scrollToStep = useCallback(
    (index: number) => {
      const el = trackRef.current
      if (!el) {
        setActive(index)
        return
      }
      const rect = el.getBoundingClientRect()
      const absoluteTop = window.scrollY + rect.top
      const trackHeight = el.offsetHeight - window.innerHeight
      const target =
        absoluteTop + (trackHeight * (index + 0.5)) / STEPS.length

      scrollingToRef.current = index
      setActive(index)
      window.scrollTo({ top: target, behavior: reduced ? "auto" : "smooth" })
      window.setTimeout(() => {
        scrollingToRef.current = null
      }, 700)
    },
    [reduced],
  )

  useEffect(() => {
    return () => {
      scrollingToRef.current = null
    }
  }, [])

  const step = STEPS[active]

  return (
    <section
      id="process"
      className="relative overflow-hidden border-t border-ink-08 bg-gradient-to-b from-soft-peach/45 via-cream to-background dark:from-background dark:via-background dark:to-background"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_at_top,oklch(0.55_0.24_295/0.10),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-7xl px-6 pt-24 md:pt-28">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <SectionEyebrow number="06" label="Process" />
            <h2 className="mt-5 text-balance text-[clamp(2rem,4.2vw,3.35rem)] font-medium leading-[1.08] tracking-display">
              <span className="inline bg-vibrant-purple px-2 py-0.5 text-white">
                How we book meetings,
              </span>{" "}
              <span className="inline bg-vibrant-purple px-2 py-0.5 font-serif-italic text-white">
                step by step.
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-ink-60">
            From kickoff call to filled calendar in under 30 days. No agency
            theatre, no endless onboarding decks.
          </p>
        </div>
      </div>

      {/* Desktop: tall scroll track + sticky timeline/card */}
      <div
        ref={trackRef}
        className="relative hidden lg:block"
        style={{ height: `${STEPS.length * 100}vh` }}
      >
        <div className="sticky top-0 flex min-h-screen flex-col justify-center py-16">
          <div className="mx-auto w-full max-w-7xl px-6">
            <ProcessTimeline
              active={active}
              onSelect={scrollToStep}
            />

            <div className="relative mt-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step.n}
                  initial={reduced ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -14 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <FeaturedStepCard step={step} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / tablet: stacked steps */}
      <ol className="mx-auto mt-12 flex max-w-7xl flex-col gap-8 px-6 pb-8 lg:hidden">
        {STEPS.map((s, i) => (
          <motion.li
            key={s.n}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.45, delay: i * 0.04 }}
          >
            <FeaturedStepCard step={s} />
          </motion.li>
        ))}
      </ol>

      <div className="mx-auto max-w-7xl px-6 pb-24 md:pb-28">
        <div className="mt-4 flex flex-col items-start justify-between gap-5 border-t border-ink-08 pt-10 sm:flex-row sm:items-center lg:mt-0">
          <p className="text-[20px] font-medium tracking-tight text-ink">
            Ready to start{" "}
            <span className="font-serif-italic text-ink-60">week one?</span>
          </p>
          <a
            href="#contact"
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-primary px-5 text-[14.5px] font-medium text-primary-foreground transition-all hover:bg-primary/90"
          >
            Book a call
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  )
}

function ProcessTimeline({
  active,
  onSelect,
}: {
  active: number
  onSelect: (index: number) => void
}) {
  const progress = active / (STEPS.length - 1)

  return (
    <div className="relative px-1">
      <div
        aria-hidden
        className="absolute left-[10%] right-[10%] top-[18px] h-px bg-ink-08"
      />
      <div
        aria-hidden
        className="absolute left-[10%] top-[18px] h-px origin-left bg-ink transition-transform duration-500 ease-out"
        style={{ width: "80%", transform: `scaleX(${progress})` }}
      />
      <ol className="relative flex justify-between gap-2">
        {STEPS.map((s, i) => {
          const isActive = active === i
          const isDone = i < active
          return (
            <li key={s.n} className="flex min-w-0 flex-1 flex-col items-center">
              <button
                type="button"
                onClick={() => onSelect(i)}
                className="group flex w-full flex-col items-center text-center"
                aria-current={isActive ? "step" : undefined}
              >
                <span
                  className={cn(
                    "relative z-10 grid size-9 place-items-center rounded-full border text-[13px] font-semibold tabular transition-all duration-300",
                    isActive
                      ? "border-ink bg-ink text-background shadow-md"
                      : isDone
                        ? "border-ink bg-ink text-background"
                        : "border-ink-08 bg-background text-ink-40 group-hover:border-ink/25 group-hover:text-ink-60",
                  )}
                >
                  {isDone && !isActive ? (
                    <Check className="size-4" strokeWidth={2.5} />
                  ) : (
                    s.index
                  )}
                </span>
                <span
                  className={cn(
                    "mt-3 text-[10px] font-semibold uppercase tracking-[0.16em]",
                    isActive || isDone ? "text-ink" : "text-ink-40",
                  )}
                >
                  {s.whenShort}
                </span>
                <span
                  className={cn(
                    "mt-1 max-w-[9.5rem] text-[12px] leading-snug",
                    isActive
                      ? "font-medium text-ink"
                      : isDone
                        ? "text-ink-60"
                        : "text-ink-40 group-hover:text-ink-60",
                  )}
                >
                  {s.title}
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function FeaturedStepCard({ step }: { step: Step }) {
  return (
    <article className="relative overflow-hidden rounded-[1.75rem] border border-ink-08 bg-gradient-to-br from-bright-cyan/12 via-background to-vibrant-purple/8 shadow-[0_28px_80px_-48px_rgba(15,15,15,0.35)]">
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-8 -left-2 select-none font-mono text-[clamp(8rem,18vw,14rem)] font-medium leading-none tracking-tighter text-ink/[0.04]"
      >
        {step.n}
      </span>

      <div className="relative grid grid-cols-1 gap-8 p-6 md:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:p-10">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-medium leading-none tracking-display text-ink">
              {step.n}
            </span>
            <span aria-hidden className="h-px w-8 bg-ink-20" />
            <span className="inline-flex items-center gap-1.5 rounded-full border border-electric-blue/25 bg-electric-blue/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-electric-blue">
              <span className="size-1.5 rounded-full bg-electric-blue" />
              {step.whenShort}
            </span>
          </div>

          <div className="mt-5 grid size-11 place-items-center rounded-full border border-ink-08 bg-background shadow-sm">
            <step.Icon className="size-5 text-electric-blue" strokeWidth={2} />
          </div>

          <h3 className="mt-5 text-balance text-[clamp(1.65rem,3.2vw,2.35rem)] font-medium leading-[1.08] tracking-display text-ink">
            {step.title}
          </h3>
          <p className="mt-4 max-w-xl text-[15px] leading-[1.7] text-ink-60">
            {step.desc}
          </p>

          <div className="mt-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-40">
              What you get
            </p>
            <ul className="mt-3 flex flex-col gap-2.5">
              {step.outcomes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-[14px] leading-snug text-ink"
                >
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-electric-blue/12 text-electric-blue">
                    <Check className="size-3" strokeWidth={2.75} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-center lg:items-end lg:justify-end lg:pb-2">
          <StepPanel kind={step.visual} />
        </div>
      </div>
    </article>
  )
}

function StepPanel({
  kind,
}: {
  kind: Step["visual"]
}) {
  if (kind === "discovery") {
    return (
      <div className="w-full max-w-md rounded-2xl border border-ink-08 bg-background p-5 shadow-[0_16px_48px_-28px_rgba(15,15,15,0.35)]">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-40">
            ICP fit score
          </p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-bright/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-dark">
            <span className="size-1.5 rounded-full bg-emerald-bright" />
            92% match
          </span>
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-xl border border-ink-08 bg-cream/50 px-3 py-2.5">
          <span className="grid size-9 place-items-center rounded-lg bg-vibrant-purple/15 text-[12px] font-bold text-vibrant-purple">
            LI
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-medium text-ink">Lavender Inc.</p>
            <p className="text-[11px] text-ink-40">Series A · RevOps SaaS</p>
          </div>
          <span className="shrink-0 text-[13px] font-semibold tabular-nums text-ink">
            $18M
          </span>
        </div>

        <ul className="mt-4 flex flex-col gap-2.5">
          {[
            ["Industry", 96],
            ["Headcount", 88],
            ["Tech", 91],
            ["Funding", 84],
            ["Intent", 79],
          ].map(([label, score]) => (
            <li key={label as string}>
              <div className="mb-1 flex justify-between text-[11px]">
                <span className="text-ink-60">{label}</span>
                <span className="tabular-nums font-medium text-ink">{score}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-ink-08">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-electric-blue to-vibrant-purple"
                  style={{ width: `${score}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  if (kind === "infra") {
    return (
      <div className="w-full max-w-md rounded-2xl border border-ink-08 bg-background p-5 shadow-[0_16px_48px_-28px_rgba(15,15,15,0.35)]">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-40">
            Domain warmup
          </p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-bright/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-dark">
            <span className="size-1.5 rounded-full bg-emerald-bright" />
            Healthy
          </span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            ["316", "Sent / day"],
            ["A-", "Reputation"],
            ["14/21", "Day"],
          ].map(([n, l]) => (
            <div
              key={l}
              className="rounded-xl border border-ink-08 bg-cream/40 px-2 py-2.5 text-center"
            >
              <div className="text-[15px] font-semibold tabular-nums text-electric-blue">
                {n}
              </div>
              <div className="mt-0.5 text-[9px] uppercase tracking-[0.12em] text-ink-40">
                {l}
              </div>
            </div>
          ))}
        </div>

        <ul className="mt-4 flex flex-col gap-3">
          {[
            ["go.acne-sales.com", 118, 120, true],
            ["team.acne-sales.com", 95, 100, true],
            ["outreach.acne-co.io", 54, 80, false],
            ["hi.acne-co.io", 38, 80, false],
          ].map(([domain, cur, max, healthy]) => {
            const pct = Math.round((Number(cur) / Number(max)) * 100)
            return (
              <li key={domain as string}>
                <div className="mb-1 flex items-center justify-between gap-2 text-[11px]">
                  <span className="flex items-center gap-1.5 font-mono text-ink-60">
                    <span
                      className={cn(
                        "size-1.5 rounded-full",
                        healthy ? "bg-emerald-bright" : "bg-amber",
                      )}
                    />
                    {domain}
                  </span>
                  <span className="tabular-nums text-ink">
                    {cur}/{max}
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-ink-08">
                  <div
                    className={cn(
                      "h-full rounded-full",
                      healthy
                        ? "bg-gradient-to-r from-electric-blue to-vibrant-purple"
                        : "bg-amber",
                    )}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </li>
            )
          })}
        </ul>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {["SPF", "DKIM", "DMARC", "BIMI"].map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-full bg-emerald-bright/12 px-2 py-0.5 text-[10px] font-medium text-emerald-dark"
            >
              <Check className="size-2.5" strokeWidth={3} />
              {tag}
            </span>
          ))}
        </div>
      </div>
    )
  }

  if (kind === "copy") {
    return (
      <div className="w-full max-w-md rounded-2xl border border-ink-08 bg-background p-5 shadow-[0_16px_48px_-28px_rgba(15,15,15,0.35)]">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-40">
            Sequence preview
          </p>
          <span className="rounded-full bg-electric-blue/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-electric-blue">
            Opener · v3
          </span>
        </div>
        <div className="mt-4 rounded-xl border border-ink-08 bg-cream/50 p-4 text-[13px] leading-relaxed text-ink-60">
          <p className="text-[11px] uppercase tracking-[0.12em] text-ink-40">
            Subject
          </p>
          <p className="mt-1 font-medium text-ink">
            saw your post on attribution
          </p>
          <p className="mt-3">
            Caught your post on multi-touch — the{" "}
            <span className="rounded bg-amber/40 px-0.5 text-ink">
              budget bleed
            </span>{" "}
            point hit a nerve. Worth a 12-min look at how we fix it?
          </p>
        </div>
        <div className="mt-3 flex gap-2">
          {["A · Soft", "B · Direct", "C · Case"].map((v, i) => (
            <span
              key={v}
              className={cn(
                "rounded-lg border px-2.5 py-1.5 text-[11px]",
                i === 0
                  ? "border-electric-blue/30 bg-electric-blue/10 font-medium text-electric-blue"
                  : "border-ink-08 text-ink-40",
              )}
            >
              {v}
            </span>
          ))}
        </div>
      </div>
    )
  }

  if (kind === "launch") {
    return (
      <div className="w-full max-w-md rounded-2xl border border-ink-08 bg-background p-5 shadow-[0_16px_48px_-28px_rgba(15,15,15,0.35)]">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-40">
            Live campaign signals
          </p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-bright/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-dark">
            <span className="size-1.5 animate-pulse rounded-full bg-emerald-bright" />
            Live
          </span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2.5">
          {[
            ["3,420", "Sent"],
            ["64%", "Open"],
            ["22%", "Reply"],
          ].map(([n, l]) => (
            <div
              key={l}
              className="rounded-xl border border-ink-08 bg-cream/40 p-3 text-center"
            >
              <div className="text-[18px] font-medium tabular-nums text-ink">
                {n}
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.14em] text-ink-40">
                {l}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-xl border border-ink-08 bg-cream/40 px-3 py-2.5">
          <p className="text-[11px] text-ink-40">Leading indicator · Day 5</p>
          <p className="mt-1 text-[13px] font-medium text-ink">
            Positive replies trending +18% vs opener A
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-ink-08 bg-background p-5 shadow-[0_16px_48px_-28px_rgba(15,15,15,0.35)]">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-40">
          Weekly reporting
        </p>
        <span className="rounded-full bg-vibrant-purple/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-vibrant-purple">
          Friday
        </span>
      </div>
      <svg viewBox="0 0 280 90" className="mt-3 h-20 w-full">
        <path
          d="M0 70 L40 65 L80 58 L120 48 L160 36 L200 28 L240 16 L280 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className="text-vibrant-purple"
        />
        <path
          d="M0 70 L40 65 L80 58 L120 48 L160 36 L200 28 L240 16 L280 10 L280 90 L0 90 Z"
          className="fill-vibrant-purple/10"
        />
      </svg>
      <div className="mt-2 grid grid-cols-3 gap-2 text-center">
        {[
          ["Pipeline", "Growing"],
          ["Demos", "Weekly"],
          ["ROI", "Tracked"],
        ].map(([k, v]) => (
          <div key={k}>
            <div className="text-[14px] font-medium text-ink">{k}</div>
            <div className="text-[10px] uppercase tracking-wider text-ink-40">
              {v}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
