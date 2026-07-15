"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion"
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
    title: "Discovery & ICP definition",
    when: "Week 1",
    desc: "We map your offer, decode your buyer, and lock the exact accounts worth chasing. No spray-and-pray. Every prospect is a deliberate match for what you sell.",
    Icon: Compass,
  },
  {
    n: "02",
    title: "Infrastructure & list building",
    when: "Week 2",
    desc: "Domains warmed, DNS bulletproofed, prospect lists scrubbed and verified. We never send from your primary domain — your reputation stays untouched.",
    Icon: Server,
  },
  {
    n: "03",
    title: "Copy & sequence creation",
    when: "Week 3",
    desc: "Sequences engineered around your ICP&apos;s pain — not templates, not AI sludge. Real research, real angles, real reasons your prospect will reply.",
    Icon: PenLine,
  },
  {
    n: "04",
    title: "Launch & optimize",
    when: "Week 4",
    desc: "Campaigns go live. We A/B test subject lines, openers, and angles weekly. You see leading indicators by day 5 and meetings by week 2.",
    Icon: Rocket,
  },
  {
    n: "05",
    title: "Scale & report",
    when: "Ongoing",
    desc: "What works gets doubled. What doesn&apos;t gets cut. You see the dashboard every Friday, and the meetings every day.",
    Icon: TrendingUp,
  },
] as const

export function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })
  const [active, setActive] = useState(0)
  // Smooth scaled bar that fills 0..100% across the whole section
  const progressBarHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    // Each step occupies a slice of the progress space.
    const idx = Math.min(STEPS.length - 1, Math.floor(v * STEPS.length))
    setActive(idx < 0 ? 0 : idx)
  })

  return (
    <section
      id="process"
      ref={ref}
      className="relative border-t border-ink-08 bg-gradient-to-br from-cream via-cream to-cream"
    >
      {/* Section header */}
      <div className="mx-auto max-w-7xl px-6 pb-10 pt-24 md:pb-14 md:pt-32">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <SectionEyebrow number="07" label="Process" />
            <h2 className="mt-5 text-balance text-[40px] font-medium leading-[1.05] tracking-display text-ink sm:text-[56px]">
              How we book meetings,{" "}
              <span className="font-serif-italic text-ink-60">
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

      {/* Sticky scroll experience — desktop only */}
      <div className="relative hidden lg:block">
        {/* Vertical progress indicator on the far left */}
        <div className="pointer-events-none absolute left-6 top-0 z-10 h-full">
          <div className="sticky top-1/2 -translate-y-1/2">
            <div className="flex flex-col items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-ink-40">
              <span className="font-mono tabular text-ink">
                {String(active + 1).padStart(2, "0")}
                <span className="text-ink-40">/05</span>
              </span>
              <div className="relative h-44 w-px bg-ink-08">
                <motion.div
                  style={{ height: progressBarHeight }}
                  className="absolute left-0 top-0 w-px origin-top bg-gradient-to-b from-primary via-emerald-dark to-emerald-light"
                />
              </div>
              <span className="font-mono">
                {STEPS[active].when}
              </span>
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-16 px-6 pb-32">
          {/* LEFT — sticky visual */}
          <div className="relative">
            <div className="sticky top-24 flex h-[calc(100vh-14rem)] items-center">
              <ProcessVisual active={active} />
            </div>
          </div>

          {/* RIGHT — long stack of steps; height drives sticky scroll */}
          <ol className="flex flex-col">
            {STEPS.map((step, i) => (
              <li
                key={step.n}
                className="flex min-h-[80vh] flex-col justify-center py-16"
              >
                <motion.div
                  animate={{
                    opacity: active === i ? 1 : 0.28,
                    filter: active === i ? "blur(0px)" : "blur(0.5px)",
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
                  className="flex flex-col gap-5"
                >
                  <div className="flex items-center gap-3 text-[12px] uppercase tracking-[0.18em] text-ink-40">
                    <span className="font-mono">{step.n}</span>
                    <span className="h-px w-6 bg-ink-08" />
                    <span>{step.when}</span>
                  </div>
                  <h3
                    className={cn(
                      "tracking-display text-ink transition-all duration-500",
                      active === i
                        ? "text-[36px] font-medium leading-tight"
                        : "text-[20px] font-medium leading-tight",
                    )}
                  >
                    {step.title}
                  </h3>
                  <motion.p
                    animate={{
                      opacity: active === i ? 1 : 0,
                      y: active === i ? 0 : 8,
                      height: active === i ? "auto" : 0,
                    }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
                    className="max-w-xl overflow-hidden text-[16px] leading-[1.7] text-ink-60"
                  >
                    {step.desc.replace(/&apos;/g, "\u2019")}
                  </motion.p>
                </motion.div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Mobile / tablet — vertical stacked timeline */}
      <div className="mx-auto max-w-7xl px-6 pb-20 lg:hidden">
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

function ProcessEndCta() {
  return (
    <div className="relative z-10 border-t border-ink-08 bg-gradient-to-r from-cream via-white to-cream">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-5 px-6 py-12 sm:flex-row sm:items-center sm:justify-between md:py-14">
        <p className="text-[20px] font-medium leading-snug tracking-tight text-ink sm:text-[24px]">
          Ready to start{" "}
          <span className="font-serif-italic gradient-text-animated">week one?</span>
        </p>
        <a
          href="#contact"
          className="group inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-primary to-emerald-dark px-5 text-[14.5px] font-medium text-white transition-all hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98]"
        >
          Book a call
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  )
}

/* ─── Sticky visual swap ─────────────────────────────────────────── */

function ProcessVisual({ active }: { active: number }) {
  return (
    <div className="relative aspect-[5/6] w-full max-w-[460px]">
      {/* Background plate */}
      <div className="absolute inset-0 rounded-3xl border border-ink-08 bg-background shadow-[0_30px_80px_-30px_rgba(15,15,15,0.18)]" />
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-3xl dot-pattern opacity-40"
      />

      {/* Layered visuals */}
      <Visual0 active={active === 0} />
      <Visual1 active={active === 1} />
      <Visual2 active={active === 2} />
      <Visual3 active={active === 3} />
      <Visual4 active={active === 4} />
    </div>
  )
}

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
  // Discovery — concentric ICP rings
  return (
    <VWrap active={active}>
      <div className="relative aspect-square w-full max-w-[300px]">
        <div className="absolute inset-0 rounded-full border border-ink-08" />
        <div className="absolute inset-[14%] rounded-full border border-ink-08" />
        <div className="absolute inset-[28%] rounded-full border border-ink-08" />
        <div className="absolute inset-[42%] rounded-full border border-ink/40" />
        <div className="absolute inset-[50%] rounded-full bg-ink" />
        {/* Floating tags */}
        <span className="absolute left-2 top-6 rounded-full border border-ink-08 bg-background px-2.5 py-1 text-[11px] text-ink-60">
          Series A · 50–200 ppl
        </span>
        <span className="absolute right-1 top-1/3 rounded-full border border-ink-08 bg-background px-2.5 py-1 text-[11px] text-ink-60">
          ARR $5–25M
        </span>
        <span className="absolute bottom-3 left-3 rounded-full border border-ink-08 bg-background px-2.5 py-1 text-[11px] text-ink-60">
          B2B SaaS
        </span>
        <span className="absolute -right-2 bottom-12 rounded-full bg-ink px-2.5 py-1 text-[11px] text-background">
          Ideal customer
        </span>
      </div>
    </VWrap>
  )
}

function Visual1({ active }: { active: boolean }) {
  // Infrastructure — domain warming dashboard
  return (
    <VWrap active={active}>
      <div className="flex w-full max-w-[340px] flex-col gap-3 rounded-2xl border border-ink-08 bg-card p-5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-[0.18em] text-ink-40">
            Domain warmup
          </span>
          <span className="rounded-full bg-[oklch(0.78_0.17_145_/_0.15)] px-2 py-0.5 text-[11px] font-medium text-[oklch(0.45_0.16_145)]">
            Healthy
          </span>
        </div>
        {[
          { d: "go.acme-sales.com", v: 92 },
          { d: "team.acme-sales.com", v: 88 },
          { d: "outreach.acme-co.io", v: 76 },
          { d: "hi.acme-co.io", v: 64 },
        ].map((row) => (
          <div key={row.d} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-[12px]">
              <span className="font-mono text-ink-60">{row.d}</span>
              <span className="tabular text-ink">{row.v}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-08">
              <div
                className="h-full rounded-full bg-ink"
                style={{ width: `${row.v}%` }}
              />
            </div>
          </div>
        ))}
        <div className="mt-2 flex items-center justify-between border-t border-ink-08 pt-3 text-[11.5px] text-ink-40">
          <span>SPF · DKIM · DMARC</span>
          <span className="text-ink">All passing</span>
        </div>
      </div>
    </VWrap>
  )
}

function Visual2({ active }: { active: boolean }) {
  // Copy — email draft with annotation
  return (
    <VWrap active={active}>
      <div className="flex w-full max-w-[340px] flex-col gap-3 rounded-2xl border border-ink-08 bg-card p-5">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-ink-40">
          <span>Step 1 · Opener</span>
          <span className="font-mono">v3</span>
        </div>
        <div className="flex flex-col gap-2 text-[13px] leading-[1.55] text-ink">
          <p>
            <span className="text-ink-40">Subject:</span>{" "}
            saw your post on attribution
          </p>
          <p className="text-ink-60">Hi Sarah,</p>
          <p className="text-ink-60">
            Caught your LinkedIn post on multi-touch attribution last week —
            the <span className="rounded-sm bg-amber/40 px-1">budget bleed</span>{" "}
            point hit a nerve here.
          </p>
          <p className="text-ink-60">
            We just shipped a teardown of how 40 SaaS companies fixed exactly
            that. 12 minutes, no sign-up. Want me to send it over?
          </p>
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          <span className="rounded-full border border-ink-08 px-2 py-0.5 text-[11px] text-ink-60">
            Reply rate · 21%
          </span>
          <span className="rounded-full border border-ink-08 px-2 py-0.5 text-[11px] text-ink-60">
            Pos sentiment · 68%
          </span>
        </div>
      </div>
    </VWrap>
  )
}

function Visual3({ active }: { active: boolean }) {
  // Launch — live campaign dashboard
  return (
    <VWrap active={active}>
      <div className="flex w-full max-w-[340px] flex-col gap-4 rounded-2xl border border-ink-08 bg-card p-5">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-ink-40">
          <span>Live campaign</span>
          <span className="inline-flex items-center gap-1.5 text-[oklch(0.45_0.16_145)]">
            <span className="size-1.5 rounded-full bg-[oklch(0.55_0.18_145)] pulse-dot" />
            Sending
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3 border-b border-ink-08 pb-4">
          <Stat n="3,420" l="Sent" />
          <Stat n="64%" l="Open" />
          <Stat n="22%" l="Reply" />
        </div>
        {/* Mini bar chart */}
        <div className="flex items-end gap-1.5">
          {[28, 36, 42, 31, 47, 52, 60, 55, 64, 71, 68, 78].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm bg-ink"
              style={{ height: `${h}%`, minHeight: "8px" }}
            />
          ))}
        </div>
        <div className="text-[11px] text-ink-40">Last 12 days</div>
      </div>
    </VWrap>
  )
}

function Visual4({ active }: { active: boolean }) {
  // Scale — ascending line chart with ARR markers
  return (
    <VWrap active={active}>
      <div className="flex w-full max-w-[340px] flex-col gap-4 rounded-2xl border border-ink-08 bg-card p-5">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-ink-40">
          <span>Pipeline trend</span>
          <span className="text-ink">+312%</span>
        </div>
        <svg viewBox="0 0 320 130" className="h-32 w-full">
          <defs>
            <linearGradient id="lineFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.156 0 0)" stopOpacity="0.18" />
              <stop offset="100%" stopColor="oklch(0.156 0 0)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 105 L40 100 L80 92 L120 80 L160 70 L200 50 L240 38 L280 22 L320 12 L320 130 L0 130 Z"
            fill="url(#lineFill)"
          />
          <path
            d="M0 105 L40 100 L80 92 L120 80 L160 70 L200 50 L240 38 L280 22 L320 12"
            fill="none"
            stroke="oklch(0.156 0 0)"
            strokeWidth="2"
          />
          {[40, 120, 200, 280].map((x, i) => (
            <circle
              key={i}
              cx={x}
              cy={[100, 80, 50, 22][i]}
              r="3"
              fill="oklch(0.793 0.131 78)"
              stroke="oklch(0.156 0 0)"
              strokeWidth="1.5"
            />
          ))}
        </svg>
        <div className="grid grid-cols-3 gap-3 border-t border-ink-08 pt-3">
          <Stat n="$2.1M" l="Pipeline" />
          <Stat n="84" l="Demos" />
          <Stat n="4.2x" l="ROI" />
        </div>
      </div>
    </VWrap>
  )
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[18px] font-medium leading-none tabular tracking-display text-ink">
        {n}
      </span>
      <span className="text-[10.5px] uppercase tracking-[0.14em] text-ink-40">
        {l}
      </span>
    </div>
  )
}

