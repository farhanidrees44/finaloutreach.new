"use client"

import { useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import {
  ArrowRight,
  Compass,
  Server,
  PenLine,
  Rocket,
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
    desc: "We map your offer, decode your buyer, and lock the exact accounts worth chasing. No spray-and-pray. Every prospect is a deliberate match for what you sell.",
    Icon: Compass,
    visual: "discovery" as const,
  },
  {
    n: "02",
    index: 2,
    title: "Infrastructure & list building",
    when: "Week 2",
    desc: "DNS locked, lists verified, and domains warmed for ~21 days before we ramp volume — so placement holds when sequences go live. We never send from your primary domain.",
    Icon: Server,
    visual: "infra" as const,
  },
  {
    n: "03",
    index: 3,
    title: "Copy & sequence creation",
    when: "Week 3",
    desc: "Sequences engineered around your ICP's pain — not templates, not AI sludge. Real research, real angles, real reasons your prospect will reply.",
    Icon: PenLine,
    visual: "copy" as const,
  },
  {
    n: "04",
    index: 4,
    title: "Launch & optimize",
    when: "Week 4",
    desc: "Campaigns go live. We A/B test subject lines, openers, and angles weekly. You see leading indicators by day 5 and meetings by week 2.",
    Icon: Rocket,
    visual: "launch" as const,
  },
  {
    n: "05",
    index: 5,
    title: "Scale & report",
    when: "Ongoing",
    desc: "What works gets doubled. What doesn't gets cut. You see the dashboard every Friday, and the meetings every day.",
    Icon: TrendingUp,
    visual: "scale" as const,
  },
] as const

/**
 * Version B process layout — horizontal timeline + featured step card.
 * Section stays numbered 06 on the homepage.
 */
export function Process() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const step = STEPS[active]

  return (
    <section
      id="process"
      className="relative overflow-hidden border-t border-ink-08 bg-gradient-to-b from-soft-peach/35 via-background to-background"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_top,oklch(0.55_0.24_295/0.08),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-28">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
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

        {/* Horizontal timeline */}
        <div className="mt-12 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="relative min-w-[680px] px-1">
            <div
              aria-hidden
              className="absolute left-6 right-6 top-[18px] h-px bg-ink-08"
            />
            <ol className="relative flex justify-between gap-2">
              {STEPS.map((s, i) => {
                const isActive = active === i
                return (
                  <li key={s.n} className="flex min-w-0 flex-1 flex-col items-center">
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      className="group flex w-full flex-col items-center text-center"
                      aria-current={isActive ? "step" : undefined}
                    >
                      <span
                        className={cn(
                          "relative z-10 grid size-9 place-items-center rounded-full border text-[13px] font-semibold tabular transition-all duration-300",
                          isActive
                            ? "border-ink bg-ink text-background shadow-md"
                            : "border-ink-08 bg-background text-ink-40 group-hover:border-ink/25 group-hover:text-ink-60",
                        )}
                      >
                        {s.index}
                      </span>
                      <span
                        className={cn(
                          "mt-3 text-[10px] font-semibold uppercase tracking-[0.16em]",
                          isActive ? "text-ink" : "text-ink-40",
                        )}
                      >
                        {s.when}
                      </span>
                      <span
                        className={cn(
                          "mt-1 hidden max-w-[9.5rem] text-[12px] leading-snug sm:block",
                          isActive
                            ? "font-medium text-ink"
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
        </div>

        {/* Featured step card */}
        <AnimatePresence mode="wait">
          <motion.article
            key={step.n}
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 overflow-hidden rounded-[1.75rem] border border-ink-08 bg-gradient-to-br from-bright-cyan/10 via-background to-vibrant-purple/5 shadow-[0_24px_70px_-40px_rgba(15,15,15,0.28)]"
          >
            <div className="grid grid-cols-1 gap-8 p-6 md:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:p-10">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-[clamp(2rem,4vw,2.75rem)] font-medium leading-none tracking-display text-ink">
                    {step.n}
                  </span>
                  <span aria-hidden className="h-px w-8 bg-ink-20" />
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-electric-blue/25 bg-electric-blue/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-electric-blue">
                    <span className="size-1.5 rounded-full bg-electric-blue" />
                    {step.when}
                  </span>
                </div>

                <div className="mt-5 grid size-11 place-items-center rounded-full border border-ink-08 bg-background shadow-sm">
                  <step.Icon className="size-5 text-electric-blue" strokeWidth={2} />
                </div>

                <h3 className="mt-5 text-balance text-[clamp(1.75rem,3.5vw,2.5rem)] font-medium leading-[1.08] tracking-display text-ink">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-xl text-[15px] leading-[1.7] text-ink-60">
                  {step.desc}
                </p>
              </div>

              <div className="flex items-center">
                <StepPanel kind={step.visual} />
              </div>
            </div>
          </motion.article>
        </AnimatePresence>

        <div className="mt-12 flex flex-col items-start justify-between gap-5 border-t border-ink-08 pt-10 sm:flex-row sm:items-center">
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

function StepPanel({
  kind,
}: {
  kind: (typeof STEPS)[number]["visual"]
}) {
  if (kind === "discovery") {
    return (
      <div className="w-full rounded-2xl border border-ink-08 bg-background p-5 shadow-[0_12px_40px_-24px_rgba(15,15,15,0.25)]">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-40">
            ICP fit score
          </p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-bright/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-dark">
            <span className="size-1.5 rounded-full bg-emerald-bright" />
            92% match
          </span>
        </div>
        <ul className="mt-4 flex flex-col gap-2.5">
          {[
            ["Series A SaaS", "$8–15M ARR"],
            ["B2B services", "$3–10M ARR"],
            ["Fintech", "$12–25M ARR"],
          ].map(([label, band]) => (
            <li
              key={label}
              className="flex items-center justify-between rounded-xl border border-ink-08 bg-cream/40 px-3 py-2.5 text-[13px]"
            >
              <span className="font-medium text-ink">{label}</span>
              <span className="text-ink-40">{band}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  if (kind === "infra") {
    return (
      <div className="w-full rounded-2xl border border-ink-08 bg-background p-5 shadow-[0_12px_40px_-24px_rgba(15,15,15,0.25)]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-40">
          Domain warm-up
        </p>
        <ul className="mt-4 flex flex-col gap-3">
          {[92, 88, 76, 64].map((v, i) => (
            <li key={i}>
              <div className="flex justify-between text-[12px] text-ink-60">
                <span className="font-mono">domain-{i + 1}.co</span>
                <span className="tabular-nums font-medium text-ink">{v}%</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-ink-08">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-electric-blue to-vibrant-purple"
                  style={{ width: `${v}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  if (kind === "copy") {
    return (
      <div className="w-full rounded-2xl border border-ink-08 bg-background p-5 shadow-[0_12px_40px_-24px_rgba(15,15,15,0.25)]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-40">
          Sequence preview
        </p>
        <div className="mt-4 rounded-xl border border-ink-08 bg-cream/40 p-4 text-left text-[13px] leading-relaxed text-ink-60">
          <p className="font-medium text-ink">Subject: saw your post on attribution</p>
          <p className="mt-2">
            Caught your post on multi-touch — the{" "}
            <span className="rounded bg-amber/40 px-0.5 text-ink">budget bleed</span>{" "}
            point hit a nerve.
          </p>
        </div>
      </div>
    )
  }

  if (kind === "launch") {
    return (
      <div className="w-full rounded-2xl border border-ink-08 bg-background p-5 shadow-[0_12px_40px_-24px_rgba(15,15,15,0.25)]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-40">
          Live campaign signals
        </p>
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
              <div className="text-[18px] font-medium tabular-nums text-ink">{n}</div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.14em] text-ink-40">
                {l}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full rounded-2xl border border-ink-08 bg-background p-5 shadow-[0_12px_40px_-24px_rgba(15,15,15,0.25)]">
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-40">
        Weekly reporting
      </p>
      <svg viewBox="0 0 280 90" className="mt-3 h-20 w-full">
        <path
          d="M0 70 L40 65 L80 58 L120 48 L160 36 L200 28 L240 16 L280 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-vibrant-purple"
        />
      </svg>
      <div className="grid grid-cols-3 gap-2 text-center">
        {[
          ["Pipeline", "Growing"],
          ["Demos", "Weekly"],
          ["ROI", "Tracked"],
        ].map(([k, v]) => (
          <div key={k}>
            <div className="text-[14px] font-medium text-ink">{k}</div>
            <div className="text-[10px] uppercase tracking-wider text-ink-40">{v}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
