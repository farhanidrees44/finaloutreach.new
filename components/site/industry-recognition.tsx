"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const QUOTES = [
  {
    quote:
      "FinalOutreach is redefining how B2B teams approach outbound — measured, surgical, and refreshingly free of fluff.",
    source: "TechCrunch",
  },
  {
    quote:
      "A masterclass in cold email done right. The kind of agency you wish more vendors would copy.",
    source: "SaaStr",
  },
  {
    quote:
      "One of the only outbound shops we’d trust with a Series-B brand reputation.",
    source: "Forbes",
  },
  {
    quote:
      "Pipeline that actually closes. The data hands them the win.",
    source: "G2",
  },
  {
    quote:
      "Quietly become the playbook studio behind the playbooks every other agency copies.",
    source: "Product Hunt",
  },
]

export function IndustryRecognition() {
  const [i, setI] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % QUOTES.length), 5200)
    return () => clearInterval(id)
  }, [])

  const item = QUOTES[i]

  return (
    <section className="relative border-t border-ink-08 bg-background">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <p className="text-center text-[11.5px] uppercase tracking-[0.22em] text-ink-40">
          Industry recognition
        </p>
        <div className="relative mt-10 min-h-[180px]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
              className="flex flex-col items-center gap-7 text-center"
            >
              <blockquote className="font-serif-italic text-[26px] leading-[1.25] text-ink sm:text-[34px] md:text-[40px]">
                {`\u201C${item.quote}\u201D`}
              </blockquote>
              <figcaption className="flex items-center gap-3 text-[13px] uppercase tracking-[0.18em] text-ink-40">
                <span className="h-px w-8 bg-ink-08" />
                <span>{item.source}</span>
                <span className="h-px w-8 bg-ink-08" />
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        <div className="mt-10 flex items-center justify-center gap-2">
          {QUOTES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Show quote ${idx + 1}`}
              onClick={() => setI(idx)}
              className={`block h-[3px] w-7 rounded-full transition-colors ${
                idx === i ? "bg-ink" : "bg-ink-08 hover:bg-ink-40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
