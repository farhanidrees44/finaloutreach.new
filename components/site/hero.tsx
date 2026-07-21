"use client"

import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { FileText, Play } from "lucide-react"
import { MagneticButton } from "./magnetic-button"
import { HeroBackground } from "./hero-background"
import { TrustpilotWidget } from "./trustpilot-widget"
import { SITE } from "@/lib/site-data"
import { WALKTHROUGH_YOUTUBE_ID } from "@/lib/seo/video"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"

const YT_AUTOPLAY = `https://www.youtube-nocookie.com/embed/${WALKTHROUGH_YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1&color=white`

/**
 * Centered hero — clean composition: play cue, brand, outcome headline,
 * one supporting line, one CTA, honest trust line. No fabricated client counts.
 */
export function Hero() {
  const reduced = useReducedMotion()
  const [videoOpen, setVideoOpen] = useState(false)

  return (
    <section className="noise-bg relative isolate overflow-hidden pb-12 pt-5 sm:pb-14 sm:pt-6 md:pb-16 md:pt-7">
      <HeroBackground />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[640px] grid-lines opacity-25 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
      />

      <div className="mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.5 }}
          className="relative mb-4 flex w-full max-w-xl flex-col items-center"
        >
          <button
            type="button"
            onClick={() => setVideoOpen(true)}
            aria-label="Play FinalOutreach walkthrough video"
            className="group relative z-10 grid size-[4.5rem] place-items-center rounded-full border border-ink-08 bg-background text-ink shadow-[0_16px_48px_-14px_rgba(15,15,15,0.4)] transition-transform duration-300 hover:scale-105 sm:size-[5rem]"
          >
            <span
              aria-hidden
              className="absolute inset-0 animate-ping rounded-full bg-vibrant-purple/15 opacity-40 [animation-duration:2.4s]"
            />
            <Play
              className="relative size-6 fill-ink pl-0.5 sm:size-7"
              aria-hidden
            />
          </button>
          <svg
            aria-hidden
            viewBox="0 0 420 40"
            className="pointer-events-none -mt-2 h-10 w-full max-w-[440px] overflow-visible"
            fill="none"
          >
            <path
              className="hero-wave hero-wave--a"
              d="M8 22 C 70 6, 120 30, 180 16 S 300 8, 412 20"
              stroke="oklch(0.62 0.18 250)"
              strokeWidth="2.4"
              strokeLinecap="round"
              opacity="0.6"
            >
              <animate
                attributeName="d"
                dur="2.8s"
                repeatCount="indefinite"
                values="
                  M8 22 C 70 6, 120 30, 180 16 S 300 8, 412 20;
                  M8 18 C 70 28, 120 10, 180 26 S 300 22, 412 14;
                  M8 22 C 70 6, 120 30, 180 16 S 300 8, 412 20
                "
              />
            </path>
            <path
              className="hero-wave hero-wave--b"
              d="M12 26 C 90 12, 140 34, 210 20 S 320 14, 408 24"
              stroke="oklch(0.55 0.24 295)"
              strokeWidth="2.2"
              strokeLinecap="round"
              opacity="0.75"
            >
              <animate
                attributeName="d"
                dur="3.4s"
                begin="-0.8s"
                repeatCount="indefinite"
                values="
                  M12 26 C 90 12, 140 34, 210 20 S 320 14, 408 24;
                  M12 20 C 90 32, 140 14, 210 28 S 320 26, 408 18;
                  M12 26 C 90 12, 140 34, 210 20 S 320 14, 408 24
                "
              />
            </path>
            <path
              className="hero-wave hero-wave--c"
              d="M20 28 C 100 18, 160 32, 230 22 S 340 18, 400 26"
              stroke="oklch(0.72 0.14 25)"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.55"
            >
              <animate
                attributeName="d"
                dur="4s"
                begin="-1.5s"
                repeatCount="indefinite"
                values="
                  M20 28 C 100 18, 160 32, 230 22 S 340 18, 400 26;
                  M20 22 C 100 30, 160 16, 230 28 S 340 24, 400 18;
                  M20 28 C 100 18, 160 32, 230 22 S 340 18, 400 26
                "
              />
            </path>
          </svg>
        </motion.div>

        <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
          <DialogContent
            showCloseButton
            className="w-[min(100%-1.5rem,56rem)] max-w-4xl gap-0 overflow-hidden border-ink-08 bg-ink p-0 shadow-[0_32px_80px_-24px_rgba(0,0,0,0.65)] sm:max-w-4xl [&_[data-slot=dialog-close]]:text-white [&_[data-slot=dialog-close]]:opacity-80 [&_[data-slot=dialog-close]]:hover:bg-white/10 [&_[data-slot=dialog-close]]:hover:opacity-100"
          >
            <DialogTitle className="sr-only">
              FinalOutreach outbound walkthrough
            </DialogTitle>
            <DialogDescription className="sr-only">
              Watch how FinalOutreach runs targeting, infrastructure, and
              meeting booking for B2B teams.
            </DialogDescription>
            <div className="relative aspect-video w-full bg-black">
              {videoOpen ? (
                <iframe
                  src={YT_AUTOPLAY}
                  title="FinalOutreach — how we run outbound for B2B teams"
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              ) : null}
            </div>
          </DialogContent>
        </Dialog>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.08 }}
          className="flex flex-col items-center"
        >
          <p className="text-[13px] font-bold uppercase tracking-[0.22em] text-vibrant-purple">
            B2B Cold Outreach Agency
          </p>
          <p className="mt-2 text-[15px] font-bold tracking-tight text-ink">
            {SITE.name}
          </p>
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.14 }}
          className="mt-4 flex justify-center sm:mt-5"
          aria-label="Review FinalOutreach on Trustpilot"
        >
          <div className="w-[220px] shrink-0 transition-transform duration-300 hover:scale-[1.04]">
            <TrustpilotWidget />
          </div>
        </motion.div>

        <h1 className="mt-5 max-w-[18ch] text-balance text-[clamp(2.5rem,6.2vw,5rem)] font-extrabold leading-[1.08] tracking-tight text-ink sm:mt-6">
          <motion.span
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              reduced
                ? { duration: 0 }
                : { delay: 0.18, duration: 0.55, ease: [0.22, 1, 0.36, 1] }
            }
            className="block"
          >
            The Cold Email Agency
          </motion.span>
          <motion.span
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              reduced
                ? { duration: 0 }
                : { delay: 0.28, duration: 0.55, ease: [0.22, 1, 0.36, 1] }
            }
            className="mt-1 block font-serif-italic text-electric-blue"
          >
            Built To Be Your Last One.
          </motion.span>
        </h1>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.45 }}
          className="mt-5 max-w-2xl text-pretty text-[17px] font-semibold leading-[1.65] text-ink-80 sm:text-[19px]"
        >
          FinalOutreach runs your cold email, LinkedIn outreach, and appointment
          setting — infrastructure, copy, and sending handled end to end. No
          agency-hopping, no slide decks. Just meetings on your calendar.
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.52 }}
          className="mt-8 flex flex-col items-center gap-4"
        >
          <MagneticButton href={SITE.calendly} size="lg" variant="primary">
            <span className="inline-flex items-center gap-2">
              <FileText className="size-4 opacity-90" aria-hidden />
              Book Your Strategy Call
            </span>
          </MagneticButton>

          <p className="max-w-md text-[13px] font-medium leading-relaxed text-ink-60">
            Book a strategy call — see the live dashboard yourself. We&apos;ll
            tell you honestly if outbound fits your ACV.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
