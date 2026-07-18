"use client"

import { motion } from "framer-motion"
import { SectionEyebrow } from "./section-eyebrow"
import { TESTIMONIALS } from "@/data/testimonials"

/**
 * Renders only permissioned testimonials.
 * Returns null when the list is empty or only placeholders remain.
 */
export function Testimonials() {
  const approved = TESTIMONIALS.filter((t) => !t.isPlaceholder)
  if (approved.length === 0) return null

  return (
    <section id="testimonials" className="border-t border-ink-08 bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-28">
        <div className="max-w-2xl">
          <SectionEyebrow number="12" label="Voice" />
          <h2 className="mt-5 text-balance text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[1.05] tracking-tight text-ink">
            What clients say —{" "}
            <span className="font-serif-italic text-electric-blue">with permission.</span>
          </h2>
          <p className="mt-4 text-[15px] font-bold leading-relaxed text-ink-60">
            Quotes appear only with verified attribution and written approval.
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {approved.map((t, i) => (
            <motion.li
              key={t.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="relative flex flex-col rounded-2xl border border-ink-08 bg-background p-6"
            >
              <p className="text-[15px] leading-relaxed text-ink-60">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-auto border-t border-ink-08 pt-4">
                <p className="text-[14px] font-medium text-ink">{t.name}</p>
                <p className="text-[12px] text-ink-40">
                  {t.role} · {t.company}
                </p>
                {t.metric ? (
                  <p className="mt-2 text-[12px] font-medium uppercase tracking-[0.12em] text-ink-40">
                    {t.metric}
                  </p>
                ) : null}
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
