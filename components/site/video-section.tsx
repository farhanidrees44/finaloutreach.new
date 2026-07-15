"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { Play } from "lucide-react"
import { SectionEyebrow } from "./section-eyebrow"

/**
 * VIDEO — placeholder until real file/link is supplied.
 *
 * BEFORE DEPLOY:
 * - [ ] Set VIDEO_SRC to a self-hosted mp4 or unlisted YouTube/Vimeo embed URL
 * - [ ] Replace /proof/video-poster.svg with a real poster frame
 */

const VIDEO_SRC: string | null = null // PLACEHOLDER — supply URL before launch
const POSTER = "/proof/video-poster.svg"

export function VideoSection() {
  const reduced = useReducedMotion()
  const [playing, setPlaying] = useState(false)

  return (
    <section id="watch" className="border-t border-ink-08 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow number="01" label="Watch" className="justify-center" />
          <h2 className="mt-5 text-balance text-[clamp(1.85rem,3.5vw,2.75rem)] font-medium leading-[1.05] tracking-display text-ink">
            How operators run{" "}
            <span className="font-serif-italic text-ink-60">your outbound.</span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-60">
            A short walkthrough of targeting, infrastructure, and meeting handoff —
            ~90 seconds once the final cut is uploaded.
          </p>
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto mt-10 aspect-video max-w-4xl overflow-hidden rounded-2xl border border-ink-08 bg-ink/[0.04]"
        >
          {playing && VIDEO_SRC ? (
            VIDEO_SRC.includes("youtube") || VIDEO_SRC.includes("vimeo") ? (
              <iframe
                src={VIDEO_SRC}
                title="How FinalOutreach runs outbound"
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            ) : (
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src={VIDEO_SRC}
                controls
                autoPlay
                playsInline
              />
            )
          ) : (
            <>
              <Image
                src={POSTER}
                alt="Video placeholder — FinalOutreach process walkthrough poster"
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
                unoptimized
                priority={false}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-ink/25">
                <button
                  type="button"
                  onClick={() => {
                    if (VIDEO_SRC) setPlaying(true)
                  }}
                  disabled={!VIDEO_SRC}
                  className="group grid size-16 place-items-center rounded-full bg-background text-ink shadow-lg transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-90"
                  aria-label={
                    VIDEO_SRC
                      ? "Play process walkthrough"
                      : "Video coming soon — file pending upload"
                  }
                >
                  <Play className="size-6 fill-ink pl-0.5" />
                </button>
                {!VIDEO_SRC && (
                  <p className="rounded-full border border-white/30 bg-ink/50 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-white backdrop-blur">
                    Video pending upload
                  </p>
                )}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}
