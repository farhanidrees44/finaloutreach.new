"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight, LayoutDashboard } from "lucide-react"
import { SectionEyebrow } from "./section-eyebrow"
import { SITE } from "@/lib/site-data"
import { HOMEPAGE_CASE_STUDIES } from "@/data/homepage-case-studies"
import { MagneticButton } from "./magnetic-button"

/**
 * Honest replacement for placeholder case studies / testimonials.
 * When permissioned stories exist in HOMEPAGE_CASE_STUDIES (isPlaceholder: false),
 * they render as cards. Until then visitors see a live-data CTA — never bracket text.
 */
export function LiveCampaignInvite() {
  const reduced = useReducedMotion()
  const approved = HOMEPAGE_CASE_STUDIES.filter((c) => !c.isPlaceholder)

  if (approved.length > 0) {
    return (
      <section id="case-studies" className="relative border-t border-ink-08 bg-background">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-28">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <SectionEyebrow number="02b" label="Case studies" />
              <h2 className="mt-5 text-balance text-[clamp(2.25rem,4.5vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-ink">
                Outcomes we can{" "}
                <span className="font-serif-italic text-electric-blue">name.</span>
              </h2>
              <p className="mt-4 max-w-xl text-[15px] font-bold leading-relaxed text-ink-60">
                Named companies and faces appear only with written permission.
              </p>
            </div>
            <Link
              href="/case-studies"
              className="group inline-flex items-center gap-1.5 text-[14px] font-medium text-ink"
            >
              <span className="link-underline">Browse all case studies</span>
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
          <ul className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            {approved.map((cs, i) => (
              <motion.li
                key={cs.id}
                initial={reduced ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.45 }}
                className="relative flex flex-col rounded-2xl border border-ink-08 bg-cream/40 p-6"
              >
                <p className="text-[11px] uppercase tracking-[0.14em] text-ink-40">
                  {cs.industry} · {cs.timeframe}
                </p>
                <h3 className="mt-3 text-[17px] font-medium leading-snug text-ink">
                  {cs.headline}
                </h3>
                <p className="mt-3 flex-1 text-[14px] leading-relaxed text-ink-60">
                  &ldquo;{cs.quote}&rdquo;
                </p>
                <div className="mt-5 border-t border-ink-08 pt-4">
                  <p className="text-[14px] font-medium text-ink">{cs.personName}</p>
                  <p className="text-[12px] text-ink-40">
                    {cs.role} · {cs.client}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-medium uppercase tracking-[0.12em] text-ink-40">
                    <span>{cs.metricPrimary}</span>
                    <span aria-hidden>·</span>
                    <span>{cs.metricSecondary}</span>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>
    )
  }

  return (
    <section id="live-data" className="relative border-t border-ink-08 bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="max-w-3xl">
          <SectionEyebrow number="02b" label="Live data" />
          <h2 className="mt-5 text-balance text-[clamp(2.25rem,4.5vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-ink">
            Prefer named case studies?{" "}
            <span className="font-serif-italic text-electric-blue">
              We&apos;ll show you live ones.
            </span>
          </h2>
          <p className="mt-5 max-w-xl text-[16px] font-bold leading-relaxed text-ink-60">
            We only publish client names and quotes with written permission.
            Until then, the strongest proof is a walkthrough of real campaign
            dashboards and calendars on a strategy call.
          </p>
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 grid gap-6 overflow-hidden rounded-3xl border border-ink-08 bg-cream/50 p-8 md:grid-cols-[1.2fr_1fr] md:p-10"
        >
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-ink-08 bg-background px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-ink-40">
              <LayoutDashboard className="size-3.5" aria-hidden />
              On the call
            </span>
            <ul className="mt-6 flex flex-col gap-3 text-[15px] font-semibold leading-relaxed text-ink-60">
              <li className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                Live Smartlead / Instantly reply and meeting metrics for accounts like yours
              </li>
              <li className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                Calendar density from recent appointment-setting weeks
              </li>
              <li className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                An honest read on whether outbound fits your ACV and ICP
              </li>
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <MagneticButton href={SITE.calendly} size="lg" variant="primary">
                Book a strategy call
              </MagneticButton>
              <Link
                href="#campaign-proof"
                className="group inline-flex items-center gap-1.5 text-[14px] font-medium text-ink"
              >
                <span className="link-underline">Or scroll the public screenshots</span>
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
          <div className="flex flex-col justify-center rounded-2xl border border-ink-08 bg-background p-6">
            <p className="text-[13px] uppercase tracking-[0.16em] text-ink-40">
              Already on the page
            </p>
            <p className="mt-3 text-[22px] font-bold leading-snug tracking-tight text-ink">
              Smartlead dashboard — property management vertical
            </p>
            <p className="mt-2 text-[14px] leading-relaxed text-ink-60">
              Same campaign shown in Proof. Full figures live in By the numbers —
              we walk the live view on the call.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
