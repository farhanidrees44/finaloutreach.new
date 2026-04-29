"use client"

import { ArrowUpRight } from "lucide-react"
import { ScarcityBadge } from "./scarcity-badge"
import { MagneticButton } from "./magnetic-button"
import { WebGLGradient } from "./webgl-gradient"
import { VimeoEmbed } from "./vimeo-embed"
import { SITE } from "@/lib/site-data"

const HERO_VIDEO_URL =
  process.env.NEXT_PUBLIC_HERO_VIDEO_URL || "https://youtu.be/H4ddyQjC9As"

export function Hero() {
  return (
    <section className="noise-bg relative isolate overflow-hidden pb-24 pt-20 sm:pt-24 md:pb-32 md:pt-28">
      <WebGLGradient />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 -z-10 size-96 rounded-full opacity-20 blur-3xl conic-shimmer"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[640px] grid-lines opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
      />

      <div className="mx-auto max-w-[88rem] px-6 md:px-10 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,8fr)] lg:gap-12 xl:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] xl:gap-16">
          <div className="flex flex-col items-start text-left">
            <ScarcityBadge />

            <h1 className="mt-6 text-balance font-display text-[40px] font-medium leading-[1.02] tracking-[-0.02em] text-ink sm:text-[52px] lg:text-[58px] xl:text-[64px]">
              Outbound that books{" "}
              <span className="relative whitespace-nowrap">
                <span className="font-serif-italic text-[1.08em] gradient-text-animated">
                  real
                </span>
              </span>{" "}
              meetings.
            </h1>

            <p className="mt-6 max-w-xl text-pretty text-[17px] leading-[1.55] text-ink-60 sm:text-[18px]">
              Hand-built targeting, deliverability-first infrastructure, and
              SDRs who close — one team, no agency layers.
            </p>

            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
              <MagneticButton href={SITE.calendly} size="lg" variant="primary">
                Book a strategy call
              </MagneticButton>
              <a
                href="/case-studies"
                className="group inline-flex items-center gap-1.5 px-2 py-3 text-[15px] font-medium text-ink"
              >
                <span className="link-underline">See case studies</span>
                <ArrowUpRight
                  className="size-[18px] text-ink transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.75}
                />
              </a>
            </div>
          </div>

          <div id="hero-video" className="relative w-full scroll-mt-24">
            {/* Soft purple/blue ambient glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,oklch(0.55_0.24_295/0.22),transparent_70%)] blur-3xl"
            />
            {/* Secondary cyan glow for depth */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-10 -right-10 -z-10 size-72 rounded-full bg-[radial-gradient(circle,oklch(0.74_0.16_200/0.25),transparent_70%)] blur-2xl"
            />
            {/* Gradient ring frame */}
            <div className="relative rounded-[2rem] bg-gradient-to-br from-vibrant-purple/30 via-vibrant-blue/20 to-vibrant-cyan/30 p-[2px] shadow-[0_40px_120px_-30px_rgba(80,40,200,0.45)]">
              <div className="overflow-hidden rounded-[calc(2rem-2px)] bg-card">
                <VimeoEmbed
                  url={HERO_VIDEO_URL}
                  title="FinalOutreach in 90 seconds"
                  className="!max-w-none !rounded-none !border-0 !shadow-none"
                  autoplay
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
