"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { SITE } from "@/lib/site-data"

export function ConversionBreak() {
  return (
    <section className="relative isolate border-t border-ink-08 bg-cream">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 dot-pattern opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
      />
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-6 py-20 text-center md:py-28">
        <motion.h3
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-balance text-[36px] font-medium leading-[1.05] tracking-display text-ink sm:text-[52px] md:text-[64px]"
        >
          Curious what we&apos;d do{" "}
          <span className="font-serif-italic text-ink-60">
            for your business?
          </span>
        </motion.h3>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col items-center gap-3"
        >
          <a
            href={SITE.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-14 items-center gap-2 rounded-full bg-ink px-7 text-[15.5px] font-medium text-background transition-all hover:bg-ink/90 active:scale-[0.98]"
          >
            Get a free 15-min audit
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <p className="text-[13px] text-ink-40">
            Honest feedback. No deck. No pitch.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
