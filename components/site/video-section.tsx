"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { Play } from "lucide-react"
import { SectionEyebrow } from "./section-eyebrow"
import {
  WALKTHROUGH_YOUTUBE_ID,
  WALKTHROUGH_YOUTUBE_URL,
} from "@/lib/seo/video"

const YT_EMBED = `https://www.youtube-nocookie.com/embed/${WALKTHROUGH_YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1&color=white`
const POSTER = "/proof/video-poster.jpg"

/**
 * Custom play façade — no YouTube chrome until the visitor clicks play.
 * Does not autoplay on page load. Indexable via VideoObject JSON-LD +
 * canonical YouTube link (rendered for crawlers).
 */
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
            A short walkthrough of targeting, infrastructure, and meeting handoff.
            Press play when you&apos;re ready — nothing loads or autoplays on visit.
          </p>
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto mt-10 aspect-video max-w-4xl overflow-hidden rounded-2xl border border-ink-08 bg-ink shadow-[0_30px_80px_-40px_rgba(15,15,15,0.45)]"
        >
          {playing ? (
            <iframe
              src={YT_EMBED}
              title="FinalOutreach — how we run outbound for B2B teams"
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <>
              <Image
                src={POSTER}
                alt="FinalOutreach outbound walkthrough video thumbnail"
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/15 to-ink/10" />
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                aria-label="Play outbound walkthrough video"
              >
                <span className="grid size-[4.5rem] place-items-center rounded-full bg-background text-ink shadow-xl transition-transform duration-300 hover:scale-105">
                  <Play className="size-7 fill-ink pl-1" aria-hidden />
                </span>
                <span className="rounded-full border border-white/25 bg-ink/45 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-white backdrop-blur">
                  Play walkthrough
                </span>
              </button>
            </>
          )}
        </motion.div>

        <p className="mt-5 text-center text-[13px] text-ink-40">
          Prefer YouTube?{" "}
          <Link
            href={WALKTHROUGH_YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-ink underline-offset-4 hover:underline"
          >
            Watch on YouTube
          </Link>
        </p>
      </div>
    </section>
  )
}
