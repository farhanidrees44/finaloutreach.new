"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { CERTIFICATIONS } from "@/data/certifications"
import { SectionEyebrow } from "./section-eyebrow"
import { scaleIn, staggerFast, viewportOnce, motionSafe, springSnappy } from "@/lib/motion"

const isDev = process.env.NODE_ENV !== "production"

export function Certifications() {
  const reduced = useReducedMotion()
  const container = motionSafe(reduced, staggerFast)
  const item = motionSafe(reduced, scaleIn)

  return (
    <section id="credentials" className="border-t border-ink-08 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <div className="max-w-2xl">
          <SectionEyebrow number="02" label="Credentials" />
          <h2 className="type-h2 mt-5 text-balance text-ink">
            Platform credentials we{" "}
            <span className="font-serif-italic font-normal text-ink-60">
              hold &amp; operate under.
            </span>
          </h2>
          <p className="type-body mt-4 max-w-xl text-ink-60">
            Badges from tools in our delivery stack — not client endorsements or
            invented awards.
          </p>
        </div>

        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {CERTIFICATIONS.map((cert) => (
            <motion.li
              key={cert.id}
              variants={item}
              whileHover={
                reduced
                  ? undefined
                  : { y: -4, transition: springSnappy }
              }
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink-08 bg-cream/40 shadow-premium-sm transition-shadow hover:border-ink-40/40 hover:bg-cream/70 hover:shadow-premium-md"
            >
              {isDev && cert.isPlaceholder && (
                <span className="absolute left-0 top-0 z-10 bg-amber-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  Sample
                </span>
              )}

              <div className="relative flex aspect-[4/3] items-center justify-center bg-ink/[0.03] p-6">
                <div className="relative mx-auto aspect-square w-full max-w-[200px]">
                  <Image
                    src={cert.certificateImage}
                    alt={`${cert.title} credential badge issued by ${cert.issuer}`}
                    fill
                    className="object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-[1.04]"
                    sizes="200px"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-2 p-5">
                <p className="type-label text-ink-40">{cert.issuer}</p>
                <h3 className="type-h3 text-ink">{cert.title}</h3>
                <p className="text-[13px] text-ink-40">
                  Earned <span className="proof">{cert.dateEarned}</span>
                </p>
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
                ) : null}
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
