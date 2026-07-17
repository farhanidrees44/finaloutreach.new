"use client"

import Script from "next/script"
import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, Calendar } from "lucide-react"
import { SITE } from "@/lib/site-data"
import { fadeUp, viewportOnce, motionSafe } from "@/lib/motion"

const CALENDLY_EMBED_URL = `${SITE.calendly}?hide_event_type_details=1&hide_gdpr_banner=1`

function VisitorTimezone() {
  const [label, setLabel] = useState<string | null>(null)

  useEffect(() => {
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
  }, [])

  if (!label) {
    return (
      <span className="text-[11px] text-white/40">Detecting your timezone…</span>
    )
  }
  return <span className="text-[11px] text-white/40">{label}</span>
}

export function FinalCta() {
  const reduced = useReducedMotion()
  const item = motionSafe(reduced, fadeUp)

  return (
    <section id="contact" className="relative px-4 py-10 sm:px-6 md:py-12">
      {/* Rounded bookend card — mirrors hero treatment */}
      <div
        className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-[24px] sm:rounded-[28px] md:rounded-[32px]"
        style={{
          background:
            "linear-gradient(165deg, oklch(0.14 0.01 250) 0%, oklch(0.16 0.03 250) 50%, oklch(0.22 0.08 250) 100%)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 20% 20%, oklch(0.58 0.22 250 / 0.35), transparent 60%), radial-gradient(ellipse 40% 40% at 85% 70%, oklch(0.58 0.22 250 / 0.2), transparent 55%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-16 lg:px-12 lg:py-20">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_460px] lg:items-center lg:gap-14">
            <motion.div
              variants={item}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="flex flex-col"
            >
              <span className="type-label inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-white/60">
                <span className="size-1.5 rounded-full bg-[oklch(0.7_0.18_145)] pulse-dot" />
                Limited slots this quarter
              </span>
              <h2 className="type-h2 mt-7 max-w-[16ch] text-balance text-white">
                Your next{" "}
                <span className="proof text-white">50 meetings</span> are{" "}
                <span className="font-serif-italic font-normal text-white/85">
                  one call
                </span>{" "}
                away.
              </h2>
              <p className="type-body mt-7 max-w-xl text-white/65">
                <span className="font-bold text-white/90">30-minute</span> call.
                We&apos;ll tell you exactly what&apos;s possible for your
                business — even if you don&apos;t hire us.
              </p>

              <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
                <a
                  href={SITE.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-14 items-center gap-2 rounded-full bg-white px-7 text-[15.5px] font-semibold text-[oklch(0.14_0.01_250)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Book your strategy call
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <p className="text-[13px] text-white/50">
                  No sales pitch. No pressure. Just clarity.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={item}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur sm:p-4"
            >
              <div className="flex items-center justify-between gap-3 px-2 pb-3">
                <div className="flex items-center gap-2.5 text-[12px] uppercase tracking-[0.14em] text-white/60">
                  <Calendar className="size-3.5" strokeWidth={1.7} />
                  Available this week
                </div>
                <VisitorTimezone />
              </div>

              <div className="h-[460px] overflow-hidden rounded-xl bg-white sm:h-[500px] md:h-[540px] lg:h-[560px]">
                <div
                  className="calendly-inline-widget"
                  data-url={CALENDLY_EMBED_URL}
                  style={{ minWidth: 280, width: "100%", height: "100%" }}
                />
                <noscript>
                  <div className="flex h-full items-center justify-center p-6 text-center text-sm text-ink">
                    <a
                      href={SITE.calendly}
                      className="underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open Calendly to book
                    </a>
                  </div>
                </noscript>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </section>
  )
}
