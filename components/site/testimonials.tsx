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
        <div className="mx-auto max-w-3xl text-center">
          <SectionEyebrow label="Voice" className="justify-center" />
          <h2 className="mt-6 text-balance text-[clamp(2.1rem,4.2vw,3.25rem)] font-extrabold leading-[1.05] tracking-tight text-ink">
            What clients say —{" "}
            <span className="font-serif-italic text-electric-blue">with permission.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[16px] font-bold leading-[1.6] text-ink sm:text-[17px]">
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
              <p className="text-[15px] font-bold leading-relaxed text-ink">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-auto border-t border-ink-08 pt-4">
                <p className="text-[14px] font-bold text-ink">{t.name}</p>
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
