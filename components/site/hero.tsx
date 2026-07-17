"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { CountUp } from "./count-up"
import { SITE } from "@/lib/site-data"
import { heroLine, staggerFast, motionSafe } from "@/lib/motion"

/**
 * Premium rounded hero — dark navy→electric-blue gradient, verified stats only.
 * TODO: Trustpilot/Google review bar when live embed exists.
 * TODO: Team/operator photo overlay (~15–20% opacity) when asset is ready.
 * TODO: Verified client-count micro-trust line when we have a stand-behind number.
 */
const HERO_STATS = [
  { value: 1258, decimals: 0, suffix: "", label: "Leads in campaign" },
  { value: 11.58, decimals: 2, suffix: "%", label: "Reply rate" },
  { value: 145, decimals: 0, suffix: "", label: "Unique replies" },
] as const

export function Hero() {
  const reduced = useReducedMotion()
  const lines = motionSafe(reduced, heroLine)
  const stagger = motionSafe(reduced, staggerFast)

  return (
    <section className="relative px-4 pb-10 pt-20 sm:px-6 sm:pt-24 md:pb-12 md:pt-28">
      <div
        className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-[24px] sm:rounded-[28px] md:rounded-[32px]"
        style={{
          background:
            "linear-gradient(165deg, oklch(0.14 0.01 250) 0%, oklch(0.18 0.04 250) 42%, oklch(0.32 0.12 250) 78%, oklch(0.42 0.16 250) 100%)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 100%, oklch(0.58 0.22 250 / 0.35), transparent 70%), radial-gradient(ellipse 50% 40% at 80% 20%, oklch(0.58 0.22 250 / 0.12), transparent 55%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(oklch(1 0 0) 0.6px, transparent 0.6px)",
            backgroundSize: "18px 18px",
          }}
        />

        <div className="relative mx-auto flex max-w-[800px] flex-col items-center px-6 py-10 text-center sm:px-10 sm:py-14 md:px-12 md:py-16 lg:py-20">
          <motion.p
            variants={lines}
            initial="hidden"
            animate="show"
            className="type-label text-white/55"
          >
            B2B Cold Outreach Agency
          </motion.p>

          <motion.h1
            variants={stagger}
            initial="hidden"
            animate="show"
            className="type-display mt-5 max-w-[14ch] text-balance text-white sm:mt-6"
          >
            <motion.span variants={lines} className="block">
              Stop Hiring Agencies.
            </motion.span>
            <motion.span
              variants={lines}
              className="mt-1 block font-serif-italic font-normal text-white/90"
            >
              Start Booking Meetings.
            </motion.span>
          </motion.h1>

          <motion.p
            variants={lines}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.28 }}
            className="type-body mt-5 max-w-[600px] text-pretty text-white/65 sm:mt-6"
          >
            Most teams burn{" "}
            <span className="font-bold text-white">3–4 agencies</span> before
            finding one that works. We&apos;re built to be your last one —{" "}
            <span className="font-bold text-white">hands-on operators</span>,
            real infrastructure, meetings booked directly into your calendar.
          </motion.p>

          <motion.p
            variants={lines}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.36 }}
            className="mt-6 text-[13px] font-medium tracking-tight text-white/50 sm:mt-7"
          >
            {SITE.name} · Done-for-you outbound
          </motion.p>

          <motion.div
            variants={lines}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.42 }}
            className="mt-5 flex flex-col items-center gap-3 sm:mt-6"
          >
            <a
              href={SITE.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className={`group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-[14px] text-[15px] font-semibold tracking-tight text-[oklch(0.14_0.01_250)] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] sm:px-8 sm:text-[15.5px] ${reduced ? "" : "cta-pulse-subtle"}`}
            >
              Get Your Custom Growth Blueprint
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <p className="max-w-sm text-[12.5px] leading-relaxed text-white/45">
              <span className="font-semibold text-white/70">30-minute</span>{" "}
              strategy call — live campaign dashboards, honest fit check.
            </p>
          </motion.div>

          <motion.dl
            variants={stagger}
            initial="hidden"
            animate="show"
            className="mt-10 grid w-full max-w-2xl grid-cols-3 gap-3 border-t border-white/15 pt-8 sm:mt-12 sm:gap-6 sm:pt-10"
          >
            {HERO_STATS.map((stat) => (
              <motion.div
                key={stat.label}
                variants={lines}
                className="flex flex-col items-center gap-1.5 sm:gap-2"
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd className="type-stat text-white">
                  <CountUp
                    value={stat.value}
                    decimals={stat.decimals}
                    suffix={stat.suffix}
                    duration={1600}
                    className="type-stat text-white"
                  />
                </dd>
                <p className="type-label max-w-[11ch] text-[10px] leading-snug text-white/45 sm:text-[11px]">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.dl>
          <p className="mt-4 text-[10px] text-white/30 sm:text-[11px]">
            Live property-management campaign — same figures as Proof below.
          </p>
        </div>
      </div>
    </section>
  )
}
