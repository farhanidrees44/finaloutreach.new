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
import Image from "next/image"
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
    image: "/process/step-1-discovery.png",
  },
  {
    n: "02",
    title: "Infrastructure & list building",
    when: "Week 2",
    desc: "DNS locked, lists verified, and domains warmed for ~21 days before we ramp volume — so placement holds when sequences go live. We never send from your primary domain.",
    Icon: Server,
    image: "/process/step-2-infrastructure.png",
  },
  {
    n: "03",
    title: "Copy & sequence creation",
    when: "Week 3",
    desc: "Sequences engineered around your ICP's pain — not templates, not AI sludge. Real research, real angles, real reasons your prospect will reply.",
    Icon: PenLine,
    image: "/process/step-3-copy.png",
  },
  {
    n: "04",
    title: "Launch & optimize",
    when: "Week 4",
    desc: "Campaigns go live. We A/B test subject lines, openers, and angles weekly. You see leading indicators by day 5 and meetings by week 2.",
    Icon: Rocket,
    image: "/process/step-4-launch.png",
  },
  {
    n: "05",
    title: "Scale & report",
    when: "Ongoing",
    desc: "What works gets doubled. What doesn't gets cut. You see the dashboard every Friday, and the meetings every day.",
    Icon: TrendingUp,
    image: "/process/step-5-scale.png",
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

        {/* Desktop: sticky preview + step list */}
        <div className="mt-14 hidden gap-10 lg:grid lg:grid-cols-[1.25fr_0.85fr] xl:gap-12">
          <div className="relative">
            <div className="sticky top-24">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem] border border-ink-08 bg-[#eef0f3] shadow-[0_28px_70px_-40px_rgba(15,15,15,0.35)]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={STEPS[active].n}
                    initial={reduced ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduced ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={STEPS[active].image}
                      alt={STEPS[active].title}
                      fill
                      sizes="(min-width: 1280px) 720px, (min-width: 1024px) 58vw, 90vw"
                      quality={100}
                      className="scale-[1.42] object-cover object-center"
                      priority={active === 0}
                    />
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
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] border border-ink-08 bg-[#eef0f3]">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  sizes="92vw"
                  quality={100}
                  className="scale-[1.42] object-cover object-center"
                />
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

