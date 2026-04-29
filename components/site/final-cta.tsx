"use client"

import Script from "next/script"
import { motion } from "framer-motion"
import { ArrowRight, Calendar } from "lucide-react"
import { SITE } from "@/lib/site-data"

// Calendly URL with embed-friendly params:
//   hide_event_type_details=1 → drops the duplicated left "30 min · Google Meet"
//                               sidebar so the calendar fills the card width.
//   hide_gdpr_banner=1        → no cookie banner inside the embed.
// Color params are kept as a hint; Calendly's free plan currently ignores them
// and renders the embed in light mode, which is fine — the dark card frames it.
const CALENDLY_EMBED_URL = `${SITE.calendly}?hide_event_type_details=1&hide_gdpr_banner=1`

export function FinalCta() {
  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden bg-ink text-background"
    >
      {/* Premium gradient orbs background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 15% 30%, oklch(0.55 0.24 295 / 0.30), transparent 60%), radial-gradient(ellipse 50% 50% at 85% 30%, oklch(0.58 0.22 250 / 0.25), transparent 60%), radial-gradient(ellipse 60% 50% at 50% 100%, oklch(0.74 0.16 200 / 0.20), transparent 60%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.18), transparent 40%)",
        }}
      />

      <div className="noise-bg mx-auto max-w-7xl px-6 md:px-10 lg:px-12 py-20 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_460px] lg:gap-14 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col"
          >
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-[12px] uppercase tracking-[0.18em] text-white/60">
              <span className="size-1.5 rounded-full bg-[oklch(0.7_0.18_145)] pulse-dot" />
              Limited slots this quarter
            </span>
            <h2 className="mt-7 max-w-[16ch] text-balance font-display text-fluid-3xl font-medium text-background">
              Your next 50 meetings are{" "}
              <span className="font-serif-italic gradient-text-animated">
                one call
              </span>{" "}
              away.
            </h2>
            <p className="mt-7 max-w-xl text-fluid-base text-white/65">
              30-minute call. We&apos;ll tell you exactly what&apos;s possible
              for your business — even if you don&apos;t hire us.
            </p>

            <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
              <a
                href={SITE.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-14 items-center gap-2 rounded-full bg-background px-7 text-[15.5px] font-medium text-ink transition-all hover:bg-background/90 active:scale-[0.98] shadow-premium-lg"
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 sm:p-4 backdrop-blur"
            style={{ boxShadow: "var(--shadow-2xl)" }}
          >
            <div className="flex items-center justify-between px-2 pb-3">
              <div className="flex items-center gap-2.5 text-[12px] uppercase tracking-[0.14em] text-white/60">
                <Calendar className="size-3.5" strokeWidth={1.7} />
                Available this week
              </div>
              <span className="text-[11px] text-white/40">Live</span>
            </div>

            {/* Calendly inline embed — the widget.js script auto-detects this
                container and injects an iframe sized 100% of the wrapper. We
                give the wrapper a responsive fixed height + overflow-hidden
                so the embed never bursts past the card; Calendly's iframe
                renders its own internal scrollbar for any content that
                exceeds the visible area. */}
            <div className="overflow-hidden rounded-xl bg-white h-[460px] sm:h-[500px] md:h-[540px] lg:h-[560px]">
              <div
                className="calendly-inline-widget"
                data-url={CALENDLY_EMBED_URL}
                style={{ minWidth: 280, width: "100%", height: "100%" }}
              />
              {/* No-JS / pre-script fallback: real link to the booking page so
                  crawlers and visitors with JS disabled can still reach it. */}
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

            <div className="mt-3 border-t border-white/10 pt-3 px-2 text-[12px] text-white/50">
              30 min · Google Meet · Confirmation email instantly
            </div>
          </motion.div>
        </div>
      </div>

      {/* Calendly inline-embed loader — lazy so it never blocks first paint. */}
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </section>
  )
}
