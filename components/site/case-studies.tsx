"use client"

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from "lucide-react"
import { SectionEyebrow } from "./section-eyebrow"
import { CASE_STUDIES, SITE, type CaseStudy } from "@/lib/site-data"
import { cn } from "@/lib/utils"

type Tone = "cream" | "white" | "dark"

/**
 * Per-slug presentation hints for the homepage carousel.
 * Tones rotate so the carousel feels visually varied as it auto-advances.
 * Avatars cycle across the 6 available files in /public.
 */
const HOME_DISPLAY: Record<string, { tone: Tone; avatar: string }> = {
  "helio-ai":            { tone: "cream", avatar: "/avatar-2.jpg" },
  "verge-studio":        { tone: "white", avatar: "/avatar-5.jpg" },
  "northwind-consulting":{ tone: "dark",  avatar: "/avatar-3.jpg" },
  "ledger-systems":      { tone: "white", avatar: "/avatar-1.jpg" },
  "veridian-health":     { tone: "cream", avatar: "/avatar-4.jpg" },
  "atlas-partners":      { tone: "dark",  avatar: "/avatar-6.jpg" },
  "forge-industrial":    { tone: "white", avatar: "/avatar-1.jpg" },
  "hearth-cre":          { tone: "cream", avatar: "/avatar-3.jpg" },
  "apex-cybersecurity":  { tone: "dark",  avatar: "/avatar-5.jpg" },
  "brightpath-logistics":{ tone: "white", avatar: "/avatar-6.jpg" },
}

type HomeCase = CaseStudy & { tone: Tone; avatar: string }

const HOME_CASES: HomeCase[] = CASE_STUDIES.map((cs) => {
  const d = HOME_DISPLAY[cs.slug] ?? { tone: "white", avatar: "/avatar-1.jpg" }
  return { ...cs, ...d }
})

const SLIDE_DURATION_MS = 6500

export function CaseStudies() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [isPaused, setIsPaused] = useState(false)
  const [isUserPaused, setIsUserPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const startRef = useRef<number>(Date.now())
  const headingId = useId()
  const liveRegionId = useId()

  const total = HOME_CASES.length
  const current = HOME_CASES[index]

  const goTo = useCallback(
    (next: number, dir: 1 | -1) => {
      setDirection(dir)
      setIndex(((next % total) + total) % total)
      startRef.current = Date.now()
      setProgress(0)
    },
    [total],
  )

  const next = useCallback(() => goTo(index + 1, 1), [goTo, index])
  const prev = useCallback(() => goTo(index - 1, -1), [goTo, index])

  // Auto-advance + progress
  useEffect(() => {
    if (reduced || isPaused || isUserPaused) return
    startRef.current = Date.now()
    setProgress(0)

    const tick = setInterval(() => {
      const elapsed = Date.now() - startRef.current
      const pct = Math.min(elapsed / SLIDE_DURATION_MS, 1)
      setProgress(pct)
      if (pct >= 1) {
        setDirection(1)
        setIndex((i) => (i + 1) % total)
        startRef.current = Date.now()
        setProgress(0)
      }
    }, 60)

    return () => clearInterval(tick)
  }, [reduced, isPaused, isUserPaused, total, index])

  // Pause when tab is hidden
  useEffect(() => {
    const onVisibility = () => setIsPaused(document.hidden)
    document.addEventListener("visibilitychange", onVisibility)
    return () => document.removeEventListener("visibilitychange", onVisibility)
  }, [])

  // Keyboard navigation when section is focused / hovered
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const onKey = (e: KeyboardEvent) => {
      if (!el.matches(":hover, :focus-within")) return
      if (e.key === "ArrowRight") {
        e.preventDefault()
        next()
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        prev()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [next, prev])

  // ItemList JSON-LD for rich-result eligibility
  const itemListSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Featured B2B outbound case studies",
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      numberOfItems: total,
      itemListElement: HOME_CASES.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE.domain}/case-studies/${c.slug}`,
        name: c.headline,
      })),
    }),
    [total],
  )

  return (
    <section
      ref={sectionRef}
      id="case-studies"
      aria-labelledby={headingId}
      aria-roledescription="carousel"
      className="relative border-t border-ink-08 bg-background"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsPaused(false)
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12 py-24 md:py-32">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <SectionEyebrow number="08" label="Case studies" />
            <h2
              id={headingId}
              className="mt-5 text-balance text-[40px] font-medium leading-[1.05] tracking-display text-ink sm:text-[56px]"
            >
              Recent wins.{" "}
              <span className="font-serif-italic text-ink-60">
                The results speak.
              </span>
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-60">
              {total} live engagements across SaaS, fintech, healthtech, agencies,
              manufacturing &amp; more. Real revenue, named clients, verifiable
              outcomes.
            </p>
          </div>

          {/* Controls */}
          <CarouselControls
            index={index}
            total={total}
            isPaused={isUserPaused || isPaused || !!reduced}
            isUserPaused={isUserPaused}
            onPrev={prev}
            onNext={next}
            onToggle={() => setIsUserPaused((p) => !p)}
          />
        </div>

        {/* Carousel viewport */}
        <div
          className="relative mt-12"
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured case studies"
        >
          {/* Slides — all rendered for SEO, only one visible */}
          <div className="relative grid">
            {HOME_CASES.map((c, i) => (
              <SlideWrapper
                key={c.slug}
                active={i === index}
                direction={direction}
                index={i}
                total={total}
              >
                <CaseSlide c={c} />
              </SlideWrapper>
            ))}
          </div>

          {/* Live region for screen readers */}
          <p id={liveRegionId} className="sr-only" aria-live="polite" aria-atomic="true">
            Showing case study {index + 1} of {total}: {current.headline}
          </p>

          {/* Pagination dots */}
          <Pagination
            index={index}
            total={total}
            progress={progress}
            paused={isUserPaused || isPaused || !!reduced}
            onSelect={(i) => goTo(i, i > index ? 1 : -1)}
          />
        </div>

        {/* Footer link + SEO crawl list */}
        <div className="mt-14 flex flex-col items-center gap-4">
          <Link
            href="/case-studies"
            className="group inline-flex h-12 items-center gap-2 rounded-full border border-ink-08 bg-card px-6 text-[14px] font-medium text-ink transition-all hover:-translate-y-0.5 hover:border-ink/30"
          >
            View all {total} case studies
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <p className="text-[12.5px] uppercase tracking-[0.16em] text-ink-40">
            Across SaaS, fintech, healthtech, agencies, manufacturing &amp; more
          </p>
        </div>

        {/* SR-only sitemap for crawlers — every slide deep-linkable from homepage */}
        <nav aria-label="All case studies" className="sr-only">
          <ul>
            {HOME_CASES.map((c) => (
              <li key={c.slug}>
                <Link href={`/case-studies/${c.slug}`}>
                  {c.client} — {c.headline}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  )
}

/* ─────────── Slide wrapper ─────────── */

function SlideWrapper({
  active,
  direction,
  index,
  total,
  children,
}: {
  active: boolean
  direction: 1 | -1
  index: number
  total: number
  children: React.ReactNode
}) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      // All slides occupy the same grid cell; only the active one is visible.
      className="col-start-1 row-start-1"
      initial={false}
      animate={
        active
          ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
          : {
              opacity: 0,
              y: reduced ? 0 : 16,
              scale: reduced ? 1 : 0.985,
              filter: reduced ? "blur(0px)" : "blur(6px)",
            }
      }
      transition={{
        duration: reduced ? 0 : 0.7,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
      style={{ pointerEvents: active ? "auto" : "none" }}
      aria-hidden={!active}
      aria-roledescription="slide"
      aria-label={`Case study ${index + 1} of ${total}`}
      // Hide inactive slides from tab order without removing from DOM
      inert={!active}
      suppressHydrationWarning
    >
      {children}
    </motion.div>
  )
}

/* ─────────── Single case study slide ─────────── */

function CaseSlide({ c }: { c: HomeCase }) {
  const isDark = c.tone === "dark"
  const toneClass =
    c.tone === "cream"
      ? "bg-cream"
      : c.tone === "white"
      ? "bg-card"
      : "bg-ink text-background"

  const detailHref = `/case-studies/${c.slug}`
  const ctaHref = `/contact?ref=cs_${c.slug}`

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl border transition-colors duration-500",
        isDark
          ? "border-white/10 hover:border-white/30"
          : "border-ink-08 hover:border-ink/25",
        toneClass,
      )}
    >
      {/* Whole-card overlay link */}
      <Link
        href={detailHref}
        aria-label={`Read the ${c.client} case study: ${c.headline}`}
        className="absolute inset-0 z-10"
      >
        <span className="sr-only">Read full case study</span>
      </Link>

      {/* Hover dot pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 dot-pattern opacity-0 transition-opacity duration-700 group-hover:opacity-30"
      />

      <div className="relative grid grid-cols-1 gap-10 p-7 sm:p-10 lg:grid-cols-[60%_40%] lg:gap-12 lg:p-14">
        {/* LEFT */}
        <div className="flex flex-col gap-7">
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11.5px] font-medium",
                isDark ? "border-white/15 text-background" : "border-ink-08 text-ink",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "grid size-5 place-items-center rounded-[5px]",
                  isDark ? "bg-white/15" : "bg-ink text-background",
                )}
              >
                <span className="block size-1.5 rounded-[1.5px] bg-amber" />
              </span>
              {c.client}
            </span>
            <span
              className={cn(
                "rounded-full border px-2.5 py-1 text-[11px] uppercase tracking-[0.14em]",
                isDark ? "border-white/15 text-white/55" : "border-ink-08 text-ink-40",
              )}
            >
              {c.industry}
            </span>
            <span
              className={cn(
                "rounded-full border px-2.5 py-1 text-[11px] uppercase tracking-[0.14em]",
                isDark ? "border-white/15 text-white/55" : "border-ink-08 text-ink-40",
              )}
            >
              {c.timeline}
            </span>
          </div>

          <h3
            className={cn(
              "text-balance text-[32px] font-medium leading-[1.05] tracking-display sm:text-[44px] lg:text-[52px]",
              isDark ? "text-background" : "text-ink",
            )}
          >
            {c.headline}
          </h3>

          <figure className={cn("border-l-2 pl-5", isDark ? "border-white/30" : "border-ink/30")}>
            <blockquote
              className={cn(
                "font-serif-italic text-[18px] leading-[1.4] sm:text-[20px]",
                isDark ? "text-background" : "text-ink",
              )}
            >
              &ldquo;{c.quote.text}&rdquo;
            </blockquote>
            <figcaption className="mt-4 flex items-center gap-3">
              <Image
                src={c.avatar}
                alt=""
                width={36}
                height={36}
                className="size-9 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span
                  className={cn(
                    "text-[13px] font-medium",
                    isDark ? "text-background" : "text-ink",
                  )}
                >
                  {c.quote.name}
                </span>
                <span
                  className={cn(
                    "text-[11.5px] uppercase tracking-[0.12em]",
                    isDark ? "text-white/50" : "text-ink-40",
                  )}
                >
                  {c.quote.role}
                </span>
              </div>
            </figcaption>
          </figure>

          <div className="relative z-20 mt-2 flex flex-wrap items-center gap-x-7 gap-y-3">
            <Link
              href={detailHref}
              className={cn(
                "group/cta inline-flex items-center gap-1.5 text-[13.5px] font-medium",
                isDark ? "text-background" : "text-ink",
              )}
            >
              <span className="link-underline">View case study</span>
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" />
            </Link>
            <Link
              href={ctaHref}
              className={cn(
                "group/cta inline-flex items-center gap-1.5 text-[13.5px] font-medium",
                isDark ? "text-amber" : "text-[oklch(0.55_0.13_78)]",
              )}
            >
              <span className="link-underline">We could do this for you</span>
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* RIGHT — KPIs */}
        <div
          className={cn(
            "relative flex flex-col gap-6 border-t pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0",
            isDark ? "border-white/10" : "border-ink-08",
          )}
        >
          {c.metrics.map((m, mi) => (
            <div key={m.l} className="flex flex-col gap-1.5">
              <span
                className={cn(
                  "text-[44px] font-medium leading-none tabular tracking-display sm:text-[56px]",
                  isDark ? "text-background" : "text-ink",
                )}
              >
                {m.v}
              </span>
              <span
                className={cn(
                  "text-[12px] uppercase tracking-[0.18em]",
                  isDark ? "text-white/50" : "text-ink-40",
                )}
              >
                {m.l}
              </span>
              {mi < c.metrics.length - 1 && (
                <div
                  aria-hidden="true"
                  className={cn(
                    "mt-5 h-px w-12",
                    isDark ? "bg-white/15" : "bg-ink-08",
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}

/* ─────────── Controls (prev / next / pause) ─────────── */

function CarouselControls({
  index,
  total,
  isPaused,
  isUserPaused,
  onPrev,
  onNext,
  onToggle,
}: {
  index: number
  total: number
  isPaused: boolean
  isUserPaused: boolean
  onPrev: () => void
  onNext: () => void
  onToggle: () => void
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[12.5px] uppercase tracking-[0.18em] text-ink-40 tabular">
        <span className="text-ink">{String(index + 1).padStart(2, "0")}</span>
        <span className="mx-1.5 text-ink-08">/</span>
        {String(total).padStart(2, "0")}
      </span>
      <div className="flex items-center gap-1.5" role="group" aria-label="Carousel controls">
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous case study"
          className="grid size-10 place-items-center rounded-full border border-ink-08 bg-card text-ink transition-all hover:-translate-y-0.5 hover:border-ink/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-blue"
        >
          <ArrowLeft className="size-4" />
        </button>
        <button
          type="button"
          onClick={onToggle}
          aria-label={isUserPaused ? "Resume autoplay" : "Pause autoplay"}
          aria-pressed={isUserPaused}
          className={cn(
            "grid size-10 place-items-center rounded-full border bg-card text-ink transition-all hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-blue",
            isUserPaused
              ? "border-ink/30"
              : "border-ink-08 hover:border-ink/30",
          )}
        >
          {isUserPaused ? <Play className="size-4" /> : <Pause className="size-4" />}
        </button>
        <button
          type="button"
          onClick={onNext}
          aria-label="Next case study"
          className="grid size-10 place-items-center rounded-full border border-ink-08 bg-card text-ink transition-all hover:-translate-y-0.5 hover:border-ink/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-blue"
        >
          <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  )
}

/* ─────────── Pagination dots with progress fill on active ─────────── */

function Pagination({
  index,
  total,
  progress,
  paused,
  onSelect,
}: {
  index: number
  total: number
  progress: number
  paused: boolean
  onSelect: (i: number) => void
}) {
  return (
    <div
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
      role="tablist"
      aria-label="Select case study"
    >
      {Array.from({ length: total }).map((_, i) => {
        const active = i === index
        return (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={active}
            aria-label={`Go to case study ${i + 1} of ${total}`}
            onClick={() => onSelect(i)}
            className={cn(
              "group relative h-1.5 overflow-hidden rounded-full transition-all duration-500",
              active ? "w-12 bg-ink-08" : "w-6 bg-ink-08 hover:bg-ink/20",
            )}
          >
            <AnimatePresence>
              {active && (
                <motion.span
                  key={`fill-${index}-${paused ? "p" : "r"}`}
                  className="absolute inset-y-0 left-0 bg-ink"
                  initial={{ width: "0%" }}
                  animate={{ width: paused ? "100%" : `${progress * 100}%` }}
                  transition={{ duration: paused ? 0.25 : 0.06, ease: "linear" }}
                />
              )}
            </AnimatePresence>
          </button>
        )
      })}
    </div>
  )
}
