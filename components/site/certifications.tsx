"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { CERTIFICATIONS } from "@/data/certifications"

const isDev = process.env.NODE_ENV !== "production"

export function Certifications() {
  return (
    <section
      id="credentials"
      className="border-t border-ink-08 bg-background"
    >
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16 md:py-20">
        <div className="max-w-2xl">
          <h2 className="text-balance text-[clamp(1.75rem,4vw,3.25rem)] font-bold leading-[1.05] tracking-tight text-ink">
            Platform credentials we{" "}
            <span className="font-serif-italic text-ink-60">hold &amp; operate under.</span>
          </h2>
          <p className="mt-3 max-w-xl text-[14.5px] leading-relaxed text-ink-60 sm:mt-4 sm:text-[15px]">
            Badges from tools in our delivery stack — not client endorsements or
            invented awards.
          </p>
        </div>

        <ul className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {CERTIFICATIONS.map((cert, i) => (
            <motion.li
              key={cert.id}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.4, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink-08 bg-cream/40 shadow-[0_1px_0_rgba(15,15,15,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-ink-40/35 hover:bg-cream/70 hover:shadow-[0_18px_40px_-24px_rgba(15,15,15,0.35)]"
            >
              {isDev && cert.isPlaceholder && (
                <span className="absolute left-0 top-0 z-10 bg-amber-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  Sample
                </span>
              )}

              <div className="relative flex aspect-[4/3] max-h-[200px] shrink-0 items-center justify-center bg-ink/[0.03] p-4 sm:p-6">
                <div className="relative mx-auto aspect-square w-full max-w-[140px] sm:max-w-[168px]">
                  <Image
                    src={cert.certificateImage}
                    alt={`${cert.title} credential badge issued by ${cert.issuer}`}
                    fill
                    className="object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 140px, 168px"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-1.5 p-4 sm:gap-2 sm:p-6">
                <p className="text-[11px] uppercase tracking-[0.16em] text-ink-40">
                  {cert.issuer}
                </p>
                <h3 className="text-[16px] font-semibold leading-snug text-ink sm:text-[17px]">
                  {cert.title}
                </h3>
                <p className="text-[13px] text-ink-40">Earned {cert.dateEarned}</p>
                {cert.verifyUrl ? (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-1.5 pt-3 text-[13px] font-semibold text-ink link-underline"
                  >
                    View credential
                    <ExternalLink className="size-3.5" />
                  </a>
                ) : null}
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
