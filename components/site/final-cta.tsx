"use client"

import Script from "next/script"
import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, Calendar } from "lucide-react"
import { SITE } from "@/lib/site-data"

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
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_460px] lg:items-center lg:gap-14">
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
            <p className="mt-7 max-w-xl text-[17px] font-bold text-white/75">
              30-minute call. We&apos;ll tell you exactly what&apos;s possible
              for your business — even if you don&apos;t hire us.
            </p>

            <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
              <a
                href={SITE.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-14 items-center gap-2 rounded-full bg-background px-7 text-[15.5px] font-semibold text-ink transition-all hover:bg-background/90 active:scale-[0.98]"
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
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
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
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    Book your 30-minute strategy call on Calendly →
                  </a>
                </div>
              </noscript>
            </div>

            <div className="mt-3 border-t border-white/10 px-2 pt-3 text-[12px] text-white/50">
              30 min · Google Meet · Calendly shows times in your local timezone
            </div>
          </motion.div>
        </div>
      </div>

      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </section>
  )
}
