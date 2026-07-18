"use client"

import { useReducedMotion, motion, AnimatePresence } from "framer-motion"
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
import { useCallback, useEffect, useRef, useState } from "react"

const STEPS = [
  {
    n: "01",
    title: "Discovery & ICP definition",
    when: "Week 1",
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
    title: "Infrastructure & list building",
    when: "Week 2",
    desc: "DNS locked, lists verified, and domains warmed for ~21 days before we ramp volume — so placement holds when sequences go live. We never send from your primary domain.",
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
    title: "Copy & sequence creation",
    when: "Week 3",
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
    title: "Launch & optimize",
    when: "Week 4",
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
    title: "Scale & report",
    when: "Ongoing",
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

export function Process() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const stepRefs = useRef<(HTMLLIElement | null)[]>([])
  const lockRef = useRef(false)

  const selectStep = useCallback((i: number, lockMs = 0) => {
    setActive(i)
    if (lockMs > 0) {
      lockRef.current = true
      window.setTimeout(() => {
        lockRef.current = false
      }, lockMs)
    }
  }, [])

  // Scroll-spy: keep sticky preview + highlight in sync while scrolling,
  // including fast scroll and #process hash jumps.
  useEffect(() => {
    const nodes = stepRefs.current.filter(Boolean) as HTMLLIElement[]
    if (nodes.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (lockRef.current) return
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        const top = visible[0]
        if (!top?.target) return
        const idx = nodes.indexOf(top.target as HTMLLIElement)
        if (idx >= 0) setActive(idx)
      },
      {
        root: null,
        // Bias toward the upper mid-viewport where the sticky panel sits
        rootMargin: "-25% 0px -45% 0px",
        threshold: [0.15, 0.35, 0.55, 0.75],
      },
    )

    nodes.forEach((n) => observer.observe(n))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const syncFromHash = () => {
      if (window.location.hash !== "#process") return
      // Land on first step when jumping via anchor; content already visible
      setActive(0)
    }
    syncFromHash()
    window.addEventListener("hashchange", syncFromHash)
    return () => window.removeEventListener("hashchange", syncFromHash)
  }, [])

  return (
    <section id="process" className="relative border-t border-ink-08 bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-28">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <SectionEyebrow number="06" label="Process" />
            <h2 className="mt-5 text-balance text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-tight text-ink">
              How we book meetings,{" "}
              <span className="font-serif-italic text-ink-60">step by step.</span>
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-ink-60">
            From kickoff to calendar — domains warm ~21 days before volume so
            inbox placement holds. No agency theatre, no endless decks.
          </p>
        </div>

        {/* Desktop: sticky preview + step list (all bodies always visible) */}
        <div className="mt-12 hidden gap-10 lg:grid lg:grid-cols-[1.15fr_0.9fr] xl:gap-12">
          <div className="relative">
            <div className="sticky top-24">
              <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden rounded-[1.75rem] border border-ink-08 bg-gradient-to-br from-bright-cyan/10 via-background to-electric-blue/8 p-6 shadow-[0_28px_70px_-40px_rgba(15,15,15,0.35)] md:p-8">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={STEPS[active].n}
                    initial={reduced ? false : { opacity: 0.35, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? undefined : { opacity: 0.35, y: -6 }}
                    transition={{ duration: 0.28 }}
                    className="w-full max-w-md"
                  >
                    <StepPanel kind={STEPS[active].visual} />
                  </motion.div>
                </AnimatePresence>
              </div>
              <p className="mt-4 text-center text-[12px] uppercase tracking-[0.16em] text-ink-40">
                Step {STEPS[active].n} · {STEPS[active].when}
              </p>
            </div>
          </div>

          <ol className="flex flex-col gap-3">
            {STEPS.map((step, i) => {
              const open = active === i
              return (
                <li
                  key={step.n}
                  ref={(el) => {
                    stepRefs.current[i] = el
                  }}
                  data-step={step.n}
                >
                  <button
                    type="button"
                    onClick={() => selectStep(i, 600)}
                    onMouseEnter={() => selectStep(i, 400)}
                    onFocus={() => selectStep(i, 400)}
                    className={cn(
                      "w-full rounded-2xl border px-5 py-5 text-left transition-all duration-300",
                      open
                        ? "border-ink/30 bg-background shadow-sm"
                        : "border-ink-08 bg-transparent hover:border-ink/20 hover:bg-background/60",
                    )}
                  >
                    <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-ink-40">
                      <span className="font-mono text-ink">{step.n}</span>
                      <span>{step.when}</span>
                    </div>
                    <h3 className="mt-2 flex items-center gap-2 text-[20px] font-bold tracking-tight text-ink">
                      <step.Icon className="size-4 shrink-0 text-ink-40" />
                      {step.title}
                    </h3>
                    {/* Always mounted — never gated behind opacity:0 / unmount */}
                    <div
                      className={cn(
                        "overflow-hidden transition-[max-height,opacity] duration-300",
                        open ? "max-h-[480px] opacity-100" : "max-h-[480px] opacity-90",
                      )}
                    >
                      <p className="mt-3 text-[14.5px] leading-[1.65] text-ink-60">
                        {step.desc}
                      </p>
                      <ul className="mt-4 flex flex-col gap-2 border-t border-ink-08 pt-4">
                        {step.outcomes.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-[13px] leading-snug text-ink"
                          >
                            <Check
                              className="mt-0.5 size-3.5 shrink-0 text-electric-blue"
                              strokeWidth={2.5}
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </button>
                </li>
              )
            })}
          </ol>
        </div>

        {/* Mobile: stacked steps with panels always visible (no opacity:0 gate) */}
        <ol className="mt-10 flex flex-col gap-8 lg:hidden">
          {STEPS.map((step) => (
            <li key={step.n} className="flex flex-col gap-4">
              <div className="flex items-center justify-center rounded-[1.5rem] border border-ink-08 bg-gradient-to-br from-bright-cyan/10 via-background to-electric-blue/8 p-5">
                <StepPanel kind={step.visual} />
              </div>
              <div>
                <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-ink-40">
                  <span className="font-mono">{step.n}</span>
                  <span>{step.when}</span>
                </div>
                <h3 className="mt-2 text-[22px] font-bold tracking-tight text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-[14.5px] leading-[1.65] text-ink-60">
                  {step.desc}
                </p>
                <ul className="mt-4 flex flex-col gap-2">
                  {step.outcomes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-[13px] leading-snug text-ink"
                    >
                      <Check
                        className="mt-0.5 size-3.5 shrink-0 text-electric-blue"
                        strokeWidth={2.5}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-16 flex flex-col items-start justify-between gap-5 border-t border-ink-08 pt-10 sm:flex-row sm:items-center">
          <p className="text-[20px] font-medium tracking-tight text-ink">
            Ready to start{" "}
            <span className="font-serif-italic text-ink-60">week one?</span>
          </p>
          <a
            href="#contact"
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-primary px-5 text-[14.5px] font-semibold text-primary-foreground transition-all hover:bg-primary/90"
          >
            Book a call
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  )
}

function StepPanel({ kind }: { kind: Step["visual"] }) {
  if (kind === "discovery") {
    return (
      <div className="w-full rounded-2xl border border-ink-08 bg-background p-5 shadow-[0_16px_48px_-28px_rgba(15,15,15,0.35)]">
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
            ["Tech stack", 91],
            ["Funding", 84],
            ["Intent signals", 79],
          ].map(([label, score]) => (
            <li key={label as string}>
              <div className="mb-1 flex justify-between text-[11px]">
                <span className="text-ink-60">{label}</span>
                <span className="font-medium tabular-nums text-ink">{score}%</span>
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
      <div className="w-full rounded-2xl border border-ink-08 bg-background p-5 shadow-[0_16px_48px_-28px_rgba(15,15,15,0.35)]">
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
            ["go.acme-sales.com", 118, 120, true],
            ["team.acme-sales.com", 95, 100, true],
            ["outreach.acme-co.io", 54, 80, false],
            ["hi.acme-co.io", 38, 80, false],
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
      <div className="w-full rounded-2xl border border-ink-08 bg-background p-5 shadow-[0_16px_48px_-28px_rgba(15,15,15,0.35)]">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-40">
            Sequence · CMOs · Series B
          </p>
          <span className="rounded-full bg-electric-blue/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-electric-blue">
            v3.2 · Active
          </span>
        </div>

        <ul className="mt-4 flex flex-col gap-2">
          {[
            ["Opener", "attribution angle", "Day 0", "21%", true],
            ["Bump", "case study link", "Day 3", "14%", false],
            ["Value", "12-min teardown", "Day 7", "9%", false],
            ["Breakup", "permission close", "Day 12", "6%", false],
          ].map(([type, angle, day, rate, active]) => (
            <li
              key={type as string}
              className={cn(
                "flex items-center gap-3 rounded-xl border px-3 py-2.5",
                active
                  ? "border-electric-blue/25 bg-electric-blue/8"
                  : "border-ink-08 bg-cream/30",
              )}
            >
              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-medium text-ink">
                  {type} · {angle}
                </p>
                <p className="text-[10px] uppercase tracking-[0.12em] text-ink-40">
                  {day}
                </p>
              </div>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[11px] font-semibold tabular-nums",
                  active
                    ? "bg-electric-blue text-white"
                    : "bg-ink-08 text-ink-60",
                )}
              >
                {rate}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-center justify-between rounded-xl border border-ink-08 bg-cream/40 px-3 py-2.5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.12em] text-ink-40">
              Combined reply
            </p>
            <p className="text-[15px] font-semibold tabular-nums text-ink">
              38.4%
            </p>
          </div>
          <p className="text-[12px] font-medium text-emerald-dark">
            vs target +12.4 pts ↑
          </p>
        </div>
      </div>
    )
  }

  if (kind === "launch") {
    return (
      <div className="w-full rounded-2xl border border-ink-08 bg-background p-5 shadow-[0_16px_48px_-28px_rgba(15,15,15,0.35)]">
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

        <div className="mt-3 flex gap-2">
          {["Subject A", "Subject B", "Subject C"].map((v, i) => (
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

  return (
    <div className="w-full rounded-2xl border border-ink-08 bg-background p-5 shadow-[0_16px_48px_-28px_rgba(15,15,15,0.35)]">
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
          d="M0 70 L40 65 L80 58 L120 48 L160 36 L200 28 L240 16 L280 10 L280 90 L0 90 Z"
          className="fill-vibrant-purple/10"
        />
        <path
          d="M0 70 L40 65 L80 58 L120 48 L160 36 L200 28 L240 16 L280 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className="text-vibrant-purple"
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

      <div className="mt-4 grid grid-cols-2 gap-2">
        {[
          ["Meetings booked", "12"],
          ["Pipeline added", "$284K"],
        ].map(([k, v]) => (
          <div
            key={k}
            className="rounded-xl border border-ink-08 bg-cream/40 px-3 py-2 text-center"
          >
            <p className="text-[10px] uppercase tracking-[0.12em] text-ink-40">
              {k}
            </p>
            <p className="mt-0.5 text-[14px] font-semibold tabular-nums text-ink">
              {v}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
