"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { CERTIFICATIONS } from "@/data/certifications"
import { SectionEyebrow } from "./section-eyebrow"

const isDev = process.env.NODE_ENV !== "production"

export function Certifications() {
  return (
    <section
      id="credentials"
      className="border-t border-ink-08 bg-background"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-28">
        <div className="max-w-2xl">
          <SectionEyebrow number="02" label="Recognitions" />
          <h2 className="mt-5 text-balance text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.05] tracking-display text-ink">
            Credentials from the{" "}
            <span className="font-serif-italic text-ink-60">tools we operate.</span>
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-60">
            Real certifications from platforms in our delivery stack — not client logos,
            not invented badges.
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATIONS.map((cert, i) => (
            <motion.li
              key={cert.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink-08 bg-cream/40 transition-colors hover:border-ink-40/40 hover:bg-cream/70"
            >
              {isDev && cert.isPlaceholder && (
                <span className="absolute left-0 top-0 z-10 bg-amber-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  Sample
                </span>
              )}

              <div className="relative flex aspect-[4/3] items-center justify-center bg-ink/[0.03] p-6">
                <Image
                  src={cert.certificateImage}
                  alt={`${cert.title} certificate from ${cert.issuer}`}
                  width={280}
                  height={280}
                  className="max-h-full w-auto object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>

              <div className="flex flex-1 flex-col gap-2 p-5">
                <p className="text-[11px] uppercase tracking-[0.16em] text-ink-40">
                  {cert.issuer}
                </p>
                <h3 className="text-[17px] font-medium leading-snug text-ink">
                  {cert.title}
                </h3>
                <p className="text-[13px] text-ink-40">Earned {cert.dateEarned}</p>
                {cert.verifyUrl ? (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-1.5 pt-3 text-[13px] font-medium text-ink link-underline"
                  >
                    View credential
                    <ExternalLink className="size-3.5" />
                  </a>
                ) : (
                  <span className="mt-auto pt-3 text-[12px] text-ink-40">
                    Badge on file — verification URL pending
                  </span>
                )}
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
