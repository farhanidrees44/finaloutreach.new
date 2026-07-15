"use client"

import { useCallback, useState } from "react"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import useEmblaCarousel from "embla-carousel-react"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"
import { ArrowLeft, ArrowRight, Expand, ImageIcon } from "lucide-react"
import { CAMPAIGN_PROOF } from "@/data/campaign-proof"
import { SectionEyebrow } from "./section-eyebrow"

const isDev = process.env.NODE_ENV !== "production"

function ProofMedia({
  src,
  alt,
  isPlaceholder,
}: {
  src: string
  alt: string
  isPlaceholder: boolean
}) {
  const [failed, setFailed] = useState(false)
  const showPlaceholder = isPlaceholder || failed

  if (showPlaceholder) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-ink/[0.03] to-ink/[0.07] px-6 text-center">
        <span className="grid size-12 place-items-center rounded-full border border-ink-08 bg-background text-ink-40">
          <ImageIcon className="size-5" aria-hidden />
        </span>
        <p className="max-w-[28ch] text-[13px] font-medium leading-snug text-ink-60">
          Screenshot pending upload
        </p>
        <p className="max-w-[32ch] text-[11px] leading-relaxed text-ink-40">
          {alt}
        </p>
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      unoptimized={src.endsWith(".svg")}
      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
      sizes="(max-width: 768px) 85vw, (max-width: 1024px) 55vw, 32vw"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}

export function CampaignProofGallery() {
  const reduced = useReducedMotion()
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  })
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const realSlides = CAMPAIGN_PROOF.filter((p) => !p.isPlaceholder).map((p) => ({
    src: p.src,
    alt: p.alt,
    description: p.caption,
  }))

  return (
    <section id="campaign-proof" className="border-t border-ink-08 bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <SectionEyebrow number="03" label="Proof" />
            <h2 className="mt-5 text-balance text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.05] tracking-display text-ink">
              Real campaign{" "}
              <span className="font-serif-italic text-ink-60">screenshots.</span>
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-60">
              Live campaign and booking-density screenshots — industry and stage
              only. Named company logos and faces appear only with written
              permission.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous screenshots"
              className="inline-flex size-11 items-center justify-center rounded-full border border-ink-08 bg-background text-ink transition-colors hover:border-ink-40"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next screenshots"
              className="inline-flex size-11 items-center justify-center rounded-full border border-ink-08 bg-background text-ink transition-colors hover:border-ink-40"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>

        <div className="mt-12 overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y gap-5">
            {CAMPAIGN_PROOF.map((item, i) => (
              <motion.article
                key={item.id}
                initial={reduced ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="relative min-w-0 shrink-0 grow-0 basis-[85%] sm:basis-[55%] lg:basis-[32%]"
              >
                <button
                  type="button"
                  onClick={() => {
                    if (!item.isPlaceholder) setLightboxIndex(
                      realSlides.findIndex((s) => s.src === item.src),
                    )
                  }}
                  className="group relative block w-full overflow-hidden rounded-2xl border border-ink-08 bg-background text-left transition-shadow hover:shadow-lg"
                >
                  {isDev && item.isPlaceholder && (
                    <span className="absolute left-3 top-3 z-10 bg-amber-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                      Sample
                    </span>
                  )}
                  <div className="relative aspect-[16/10] bg-ink/[0.03]">
                    <ProofMedia
                      src={item.src}
                      alt={item.alt}
                      isPlaceholder={item.isPlaceholder}
                    />
                    {!item.isPlaceholder && (
                      <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-ink/80 px-2.5 py-1 text-[11px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                        <Expand className="size-3" /> Enlarge
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-[14px] font-medium leading-snug text-ink">
                      {item.caption}
                    </p>
                    <p className="mt-1.5 text-[12px] text-ink-40">{item.context}</p>
                  </div>
                </button>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      {realSlides.length > 0 && (
        <Lightbox
          open={lightboxIndex >= 0}
          index={Math.max(0, lightboxIndex)}
          close={() => setLightboxIndex(-1)}
          slides={realSlides}
        />
      )}
    </section>
  )
}
