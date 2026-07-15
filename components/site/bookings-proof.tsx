"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Calendar } from "lucide-react"
import {
  BOOKINGS_PROOF,
  BOOKINGS_PROOF_META,
} from "@/data/bookings-proof"
import { SectionEyebrow } from "./section-eyebrow"

const VISIBLE = 5

export function BookingsProof() {
  const reduced = useReducedMotion()
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => {
      setOffset((o) => (o + 1) % BOOKINGS_PROOF.length)
    }, 2800)
    return () => window.clearInterval(id)
  }, [reduced])

  const visible = Array.from({ length: VISIBLE }, (_, i) => {
    const item = BOOKINGS_PROOF[(offset + i) % BOOKINGS_PROOF.length]
    return item
  })

  return (
    <section
      id="bookings-proof"
      className="border-t border-ink-08 bg-background"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_420px] lg:gap-16">
          <div>
            <SectionEyebrow number="04" label="Appointments" />
            <h2 className="mt-5 text-balance text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.05] tracking-display text-ink">
              Calendars that fill —{" "}
              <span className="font-serif-italic text-ink-60">not slide decks.</span>
            </h2>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-ink-60">
              {BOOKINGS_PROOF_META.sublabel} We book the meetings; your team takes them.
            </p>
            {/* PLACEHOLDER stats — replace with verified numbers before ship */}
            <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3">
              <div>
                <dt className="text-[12px] uppercase tracking-[0.14em] text-ink-40">
                  Typical mix
                </dt>
                <dd className="mt-1 text-[22px] font-medium text-ink">VP / Head / Founder</dd>
              </div>
              <div>
                <dt className="text-[12px] uppercase tracking-[0.14em] text-ink-40">
                  Channels
                </dt>
                <dd className="mt-1 text-[22px] font-medium text-ink">Email + LinkedIn</dd>
              </div>
              <div>
                <dt className="text-[12px] uppercase tracking-[0.14em] text-ink-40">
                  Handoff
                </dt>
                <dd className="mt-1 text-[22px] font-medium text-ink">Your calendar</dd>
              </div>
            </dl>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-ink-08 bg-cream/50 p-5 shadow-[0_20px_50px_-28px_rgba(20,20,16,0.35)]">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="size-4 text-ink-60" />
                <span className="text-[13px] font-medium text-ink">
                  {BOOKINGS_PROOF_META.label}
                </span>
              </div>
              {!BOOKINGS_PROOF_META.isLiveFeed && (
                <span className="rounded-full border border-ink-08 bg-background px-2.5 py-0.5 text-[10px] uppercase tracking-[0.14em] text-ink-40">
                  Showcase
                </span>
              )}
            </div>

            <ul className="flex flex-col gap-2.5" aria-live="polite">
              <AnimatePresence initial={false} mode="popLayout">
                {visible.map((booking, i) => (
                  <motion.li
                    key={`${booking.id}-${offset}-${i}`}
                    layout
                    initial={reduced ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-start justify-between gap-3 rounded-xl border border-ink-08 bg-background px-3.5 py-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-[14px] font-medium text-ink">
                        {booking.role}
                      </p>
                      <p className="truncate text-[12px] text-ink-40">
                        {booking.segment} · {booking.channel}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-[12px] font-medium tabular-nums text-ink">
                        {booking.dayLabel}
                      </p>
                      <p className="text-[11px] tabular-nums text-ink-40">
                        {booking.timeLabel}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
