"use client"

import { useReducedMotion, motion, AnimatePresence } from "framer-motion"
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
import { useState } from "react"

const STEPS = [
  {
    n: "01",
    title: "Discovery & ICP definition",
    when: "Week 1",
    desc: "We map your offer, decode your buyer, and lock the exact accounts worth chasing. No spray-and-pray. Every prospect is a deliberate match for what you sell.",
    Icon: Compass,
    visual: "discovery" as const,
  },
  {
    n: "02",
    title: "Infrastructure & list building",
    when: "Week 2",
    desc: "DNS locked, lists verified, and domains warmed for ~21 days before we ramp volume — so placement holds when sequences go live. We never send from your primary domain.",
    Icon: Server,
    visual: "infra" as const,
  },
  {
    n: "03",
    title: "Copy & sequence creation",
    when: "Week 3",
    desc: "Sequences engineered around your ICP's pain — not templates, not AI sludge. Real research, real angles, real reasons your prospect will reply.",
    Icon: PenLine,
    visual: "copy" as const,
  },
  {
    n: "04",
    title: "Launch & optimize",
    when: "Week 4",
    desc: "Campaigns go live. We A/B test subject lines, openers, and angles weekly. You see leading indicators by day 5 and meetings by week 2.",
    Icon: Rocket,
    visual: "launch" as const,
  },
  {
    n: "05",
    title: "Scale & report",
    when: "Ongoing",
    desc: "What works gets doubled. What doesn't gets cut. You see the dashboard every Friday, and the meetings every day.",
    Icon: TrendingUp,
    visual: "scale" as const,
  },
]

/**
 * Compact step narrative — each step has its own illustration beside the
 * copy. Replaces the broken sticky/80vh pattern that created dead space.
 */
export function Process() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)

  return (
    <section id="process" className="relative border-t border-ink-08 bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-28">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <SectionEyebrow number="06" label="Process" />
            <h2 className="mt-5 text-balance text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] tracking-display text-ink">
              How we book meetings,{" "}
              <span className="font-serif-italic text-ink-60">step by step.</span>
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-ink-60">
            From kickoff to calendar — domains warm ~21 days before volume so
            inbox placement holds. No agency theatre, no endless decks.
          </p>
        </div>

        {/* Desktop: sticky preview + step list (tight, not 80vh voids) */}
        <div className="mt-14 hidden gap-12 lg:grid lg:grid-cols-[1fr_1.05fr]">
          <div className="relative">
            <div className="sticky top-28">
              <div className="relative aspect-[5/4] overflow-hidden rounded-3xl border border-ink-08 bg-background shadow-[0_24px_60px_-36px_rgba(15,15,15,0.25)]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={STEPS[active].n}
                    initial={reduced ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-0 flex items-center justify-center p-8"
                  >
                    <StepVisual kind={STEPS[active].visual} />
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
                <li key={step.n}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
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
                    <h3 className="mt-2 flex items-center gap-2 text-[20px] font-medium tracking-display text-ink">
                      <step.Icon className="size-4 shrink-0 text-ink-40" />
                      {step.title}
                    </h3>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.p
                          key="desc"
                          initial={reduced ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={reduced ? undefined : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden text-[14.5px] leading-[1.65] text-ink-60"
                        >
                          <span className="mt-3 block pb-1">{step.desc}</span>
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </button>
                </li>
              )
            })}
          </ol>
        </div>

        {/* Mobile: stacked steps each with its visual */}
        <ol className="mt-12 flex flex-col gap-10 lg:hidden">
          {STEPS.map((step, i) => (
            <motion.li
              key={step.n}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.45, delay: i * 0.04 }}
              className="flex flex-col gap-4"
            >
              <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-ink-08 bg-background p-6">
                <StepVisual kind={step.visual} />
              </div>
              <div>
                <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-ink-40">
                  <span className="font-mono">{step.n}</span>
                  <span>{step.when}</span>
                </div>
                <h3 className="mt-2 text-[22px] font-medium tracking-display text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-[14.5px] leading-[1.65] text-ink-60">
                  {step.desc}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>

        <div className="mt-16 flex flex-col items-start justify-between gap-5 border-t border-ink-08 pt-10 sm:flex-row sm:items-center">
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

function StepVisual({
  kind,
}: {
  kind: "discovery" | "infra" | "copy" | "launch" | "scale"
}) {
  if (kind === "discovery") {
    return (
      <div className="relative mx-auto aspect-square w-full max-w-[260px]">
        <div className="absolute inset-0 rounded-full border border-ink-08" />
        <div className="absolute inset-[16%] rounded-full border border-ink-08" />
        <div className="absolute inset-[32%] rounded-full border border-ink/30" />
        <div className="absolute inset-[46%] rounded-full bg-ink" />
        <span className="absolute left-0 top-4 rounded-full border border-ink-08 bg-background px-2 py-0.5 text-[10px] text-ink-60">
          Series A
        </span>
        <span className="absolute bottom-4 right-0 rounded-full bg-ink px-2 py-0.5 text-[10px] text-background">
          Ideal ICP
        </span>
      </div>
    )
  }
  if (kind === "infra") {
    return (
      <div className="mx-auto flex w-full max-w-[300px] flex-col gap-2.5">
        {[92, 88, 76, 64].map((v, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="flex justify-between text-[11px] text-ink-60">
              <span className="font-mono">domain-{i + 1}.co</span>
              <span className="tabular-nums text-ink">{v}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-ink-08">
              <div className="h-full rounded-full bg-ink" style={{ width: `${v}%` }} />
            </div>
          </div>
        ))}
      </div>
    )
  }
  if (kind === "copy") {
    return (
      <div className="mx-auto w-full max-w-[300px] rounded-xl border border-ink-08 bg-cream/50 p-4 text-left text-[12px] leading-relaxed text-ink-60">
        <p className="text-[11px] uppercase tracking-[0.14em] text-ink-40">Opener · v3</p>
        <p className="mt-2 text-ink">Subject: saw your post on attribution</p>
        <p className="mt-2">
          Caught your post on multi-touch — the{" "}
          <span className="rounded bg-amber/40 px-0.5 text-ink">budget bleed</span>{" "}
          point hit a nerve.
        </p>
      </div>
    )
  }
  if (kind === "launch") {
    return (
      <div className="mx-auto grid w-full max-w-[300px] grid-cols-3 gap-3">
        {[
          ["3,420", "Sent"],
          ["64%", "Open"],
          ["22%", "Reply"],
        ].map(([n, l]) => (
          <div key={l} className="rounded-xl border border-ink-08 bg-cream/40 p-3 text-center">
            <div className="text-[18px] font-medium tabular-nums text-ink">{n}</div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.14em] text-ink-40">{l}</div>
          </div>
        ))}
      </div>
    )
  }
  return (
    <div className="mx-auto flex w-full max-w-[300px] flex-col gap-3">
      <svg viewBox="0 0 280 90" className="h-24 w-full">
        <path
          d="M0 70 L40 65 L80 58 L120 48 L160 36 L200 28 L240 16 L280 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-ink"
        />
      </svg>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div>
          <div className="text-[16px] font-medium text-ink">Pipeline</div>
          <div className="text-[10px] uppercase tracking-wider text-ink-40">Growing</div>
        </div>
        <div>
          <div className="text-[16px] font-medium text-ink">Demos</div>
          <div className="text-[10px] uppercase tracking-wider text-ink-40">Weekly</div>
        </div>
        <div>
          <div className="text-[16px] font-medium text-ink">ROI</div>
          <div className="text-[10px] uppercase tracking-wider text-ink-40">Tracked</div>
        </div>
      </div>
    </div>
  )
}
