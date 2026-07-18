"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus } from "lucide-react"
import { SectionEyebrow } from "./section-eyebrow"
import { cn } from "@/lib/utils"
import { HOMEPAGE_FAQ } from "@/data/homepage-faq"

export function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <section id="faq" className="border-t border-ink-08 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[360px_1fr] lg:gap-16">
          <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
            <SectionEyebrow number="11" label="Questions" />
            <h2 className="text-balance text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[1.05] tracking-tight text-ink">
              Common questions,{" "}
              <span className="font-serif-italic text-electric-blue">honest answers.</span>
            </h2>
            <p className="max-w-sm text-[15px] font-bold leading-relaxed text-ink-60">
              If yours isn&apos;t here, ask it on the call. We&apos;d rather
              over-explain than oversell.
            </p>
          </div>

          <ul className="flex flex-col">
            {HOMEPAGE_FAQ.map((item, i) => {
              const open = openIdx === i
              return (
                <li
                  key={item.question}
                  className="border-b border-ink-08 first:border-t"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIdx(open ? null : i)}
                    aria-expanded={open}
                    className="group flex w-full items-start justify-between gap-6 py-5 text-left"
                  >
                    <h3 className="text-[17px] font-bold leading-tight tracking-tight text-ink sm:text-[18px]">
                      {item.question}
                    </h3>
                    <span
                      className={cn(
                        "mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-ink-08 text-ink transition-all duration-400",
                        open
                          ? "rotate-45 border-ink/40 bg-ink text-background"
                          : "group-hover:border-ink/30",
                      )}
                    >
                      <Plus className="size-3.5" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.35,
                          ease: [0.22, 1, 0.36, 1] as const,
                        }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-6 pr-12 text-[15px] leading-[1.7] text-ink-60">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
