"use client"

import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, Calendar, Clock, Video } from "lucide-react"
import { BookCallLink } from "@/components/site/book-call-link"

function VisitorTimezone() {
  const [label, setLabel] = useState<string | null>(() => {
    if (typeof window === "undefined") return null
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
      const now = new Date()
      const time = new Intl.DateTimeFormat(undefined, {
        hour: "numeric",
        minute: "2-digit",
        timeZone: tz,
      }).format(now)
      return `Times shown in your timezone · ${tz.replace(/_/g, " ")} (${time})`
    } catch {
      return "Times shown in your local timezone"
    }
  })

  useEffect(() => {
    if (label) return
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
      const now = new Date()
      const time = new Intl.DateTimeFormat(undefined, {
        hour: "numeric",
        minute: "2-digit",
        timeZone: tz,
      }).format(now)
      const pretty = tz.replace(/_/g, " ")
      setLabel(`Times shown in your timezone · ${pretty} (${time})`)
    } catch {
      setLabel("Times shown in your local timezone")
    }
  }, [label])

  if (!label) {
    return (
      <span className="text-[11px] text-white/40">Detecting your timezone…</span>
    )
  }
  return <span className="text-[11px] text-white/40">{label}</span>
}

export function FinalCta() {
  const reduced = useReducedMotion()

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden bg-ink text-background"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 15% 30%, oklch(0.55 0.24 295 / 0.30), transparent 60%), radial-gradient(ellipse 50% 50% at 85% 30%, oklch(0.58 0.22 250 / 0.25), transparent 60%), radial-gradient(ellipse 60% 50% at 50% 100%, oklch(0.74 0.16 200 / 0.20), transparent 60%)",
        }}
      />

      <div className="noise-bg mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24 lg:px-12 lg:py-28">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_400px] lg:gap-14">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-[12px] uppercase tracking-[0.18em] text-white/60">
              <span className="size-1.5 rounded-full bg-[oklch(0.7_0.18_145)] pulse-dot" />
              Limited slots this quarter
            </span>
            <h2 className="mt-7 max-w-[16ch] text-balance text-[clamp(2rem,4vw,3.25rem)] font-extrabold text-background">
              Your next meeting is{" "}
              <span className="font-serif-italic text-electric-blue">
                one call
              </span>{" "}
              away.
            </h2>
            <p className="mt-6 max-w-xl text-[17px] font-bold leading-relaxed text-white/75">
              30-minute call. We&apos;ll tell you exactly what&apos;s possible
              for your business — even if you don&apos;t hire us.
            </p>

            <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
              <BookCallLink
                source="final-cta"
                className="group inline-flex h-14 items-center gap-2 rounded-full bg-background px-7 text-[15.5px] font-semibold text-ink transition-all hover:bg-background/90 active:scale-[0.98]"
              >
                Book your strategy call
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </BookCallLink>
              <p className="text-[13px] text-white/50">
                No sales pitch. No pressure. Just clarity.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur sm:p-8"
          >
            <div className="flex items-center gap-2.5 text-[12px] uppercase tracking-[0.14em] text-white/60">
              <Calendar className="size-3.5" strokeWidth={1.7} />
              Available this week
            </div>

            <h3 className="mt-5 text-[22px] font-bold tracking-tight text-background">
              30 min strategy call
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed text-white/60">
              Pick a time that works. Calendar opens on-site when you&apos;re ready — never automatically.
            </p>

            <ul className="mt-6 flex flex-col gap-3 text-[14px] text-white/75">
              <li className="flex items-center gap-2.5">
                <Clock className="size-4 shrink-0 text-electric-blue" aria-hidden />
                30 minutes
              </li>
              <li className="flex items-center gap-2.5">
                <Video className="size-4 shrink-0 text-electric-blue" aria-hidden />
                Google Meet
              </li>
            </ul>

            <div className="mt-4">
              <VisitorTimezone />
            </div>

            <BookCallLink
              source="final-cta-card"
              className="group mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-[14.5px] font-semibold text-primary-foreground transition-all hover:brightness-110"
            >
              Choose a time
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </BookCallLink>

            <p className="mt-4 text-center text-[12px] text-white/45">
              30 min · Google Meet · Times in your local timezone
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
