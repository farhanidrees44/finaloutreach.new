"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import {
  ChevronDown,
  LayoutDashboard,
  ArrowRight,
  ArrowUpRight,
  Filter,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { SITE } from "@/lib/site-data"
import { MagneticButton } from "./magnetic-button"
import { BookCallLink } from "./book-call-link"
import {
  RESULTS_CAMPAIGNS,
  RESULTS_INDUSTRY_OPTIONS,
  RESULTS_SERVICE_OPTIONS,
  type ResultsCampaign,
} from "@/data/results-campaigns"

type FilterValue = "all" | string

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: FilterValue
  options: readonly string[]
  onChange: (v: FilterValue) => void
}) {
  return (
    <label className="flex min-w-[160px] flex-1 flex-col gap-1.5 sm:min-w-[180px] sm:flex-none">
      <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-40">
        {label}
      </span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 w-full appearance-none rounded-full border-2 border-ink/12 bg-background py-2 pl-4 pr-10 text-[14px] font-semibold text-ink outline-none transition-colors hover:border-ink/25 focus:border-primary/50 focus:ring-2 focus:ring-primary/15"
        >
          <option value="all">All</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-40"
          aria-hidden
        />
      </div>
    </label>
  )
}

function CampaignCard({ campaign }: { campaign: ResultsCampaign }) {
  const [open, setOpen] = useState<"strategy" | "results" | null>("results")

  return (
    <article className="overflow-hidden rounded-2xl border-2 border-ink/12 bg-background shadow-[0_1px_0_rgba(15,15,15,0.03)] transition-shadow hover:shadow-[0_18px_40px_-28px_rgba(15,15,15,0.35)]">
      <div className="flex flex-col gap-5 border-b border-ink/12 p-6 sm:p-8 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-electric-blue/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-electric-blue">
              {campaign.industry}
            </span>
            <span className="rounded-full border border-ink-08 bg-cream/60 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-ink-60">
              {campaign.service}
            </span>
          </div>
          <h2 className="mt-4 text-balance text-[22px] font-extrabold leading-snug tracking-tight text-ink sm:text-[26px]">
            {campaign.headline}
          </h2>
          <p className="mt-2 text-[14px] font-semibold text-ink-60">
            Industry and stage only — no client name without written permission.
          </p>
        </div>
        <div className="shrink-0 rounded-2xl border border-electric-blue/20 bg-electric-blue/[0.06] px-5 py-4 text-center md:min-w-[148px]">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-electric-blue">
            Headline metric
          </p>
          <p className="mt-1 text-[28px] font-extrabold tabular-nums tracking-tight text-ink">
            {campaign.metricBadge}
          </p>
        </div>
      </div>

      <div className="divide-y divide-ink-08">
        {(
          [
            { key: "strategy" as const, label: "Strategy", items: campaign.strategy },
            {
              key: "results" as const,
              label: "Results",
              items: null,
            },
          ] as const
        ).map((section) => {
          const isOpen = open === section.key
          return (
            <div key={section.key}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : section.key)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition-colors hover:bg-cream/40 sm:px-8"
              >
                <span className="text-[15px] font-bold tracking-tight text-ink">
                  {section.label}
                </span>
                <ChevronDown
                  className={cn(
                    "size-4 shrink-0 text-ink-40 transition-transform duration-300",
                    isOpen && "rotate-180",
                  )}
                  aria-hidden
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 sm:px-8 sm:pb-8">
                      {section.key === "strategy" ? (
                        <ul className="flex flex-col gap-2.5">
                          {campaign.strategy.map((line) => (
                            <li
                              key={line}
                              className="flex gap-2.5 text-[14.5px] font-semibold leading-relaxed text-ink-60"
                            >
                              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-electric-blue" />
                              {line}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                          {campaign.results.map((r) => (
                            <div
                              key={r.label}
                              className="rounded-xl border border-ink-08 bg-cream/40 px-4 py-3"
                            >
                              <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-40">
                                {r.label}
                              </dt>
                              <dd className="mt-1 text-[22px] font-extrabold tabular-nums tracking-tight text-ink">
                                {r.value}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      )}
                      {section.key === "results" && campaign.proofHref ? (
                        <Link
                          href={campaign.proofHref}
                          className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-bold text-ink"
                        >
                          <span className="link-underline">
                            View public screenshots
                          </span>
                          <ArrowUpRight className="size-3.5" />
                        </Link>
                      ) : null}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </article>
  )
}

export function ResultsPageContent() {
  const [service, setService] = useState<FilterValue>("all")
  const [industry, setIndustry] = useState<FilterValue>("all")

  const filtered = useMemo(() => {
    return RESULTS_CAMPAIGNS.filter((c) => {
      if (service !== "all" && c.service !== service) return false
      if (industry !== "all" && c.industry !== industry) return false
      return true
    })
  }, [service, industry])

  const clear = () => {
    setService("all")
    setIndustry("all")
  }

  const hasFilters = service !== "all" || industry !== "all"

  return (
    <div className="mx-auto max-w-7xl px-6 pb-8 md:px-10 lg:px-12">
      {/* Filter bar */}
      <div className="sticky top-[4.5rem] z-20 -mx-6 border-y-2 border-ink/10 bg-background/90 px-6 py-4 backdrop-blur-xl md:-mx-10 md:px-10 lg:-mx-12 lg:px-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
          <div className="flex items-center gap-2 text-ink-40">
            <Filter className="size-4" aria-hidden />
            <span className="text-[12px] font-bold uppercase tracking-[0.16em]">
              Filter proof
            </span>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
            <FilterSelect
              label="Service"
              value={service}
              options={RESULTS_SERVICE_OPTIONS}
              onChange={setService}
            />
            <FilterSelect
              label="Industry"
              value={industry}
              options={RESULTS_INDUSTRY_OPTIONS}
              onChange={setIndustry}
            />
            {hasFilters ? (
              <button
                type="button"
                onClick={clear}
                className="h-11 rounded-full px-4 text-[13px] font-bold text-ink-60 transition-colors hover:text-ink"
              >
                Clear
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="mt-10 flex flex-col gap-5">
        {filtered.length > 0 ? (
          filtered.map((c) => <CampaignCard key={c.id} campaign={c} />)
        ) : (
          <div className="rounded-2xl border border-dashed border-ink-08 bg-cream/40 px-6 py-14 text-center">
            <p className="text-[17px] font-extrabold tracking-tight text-ink">
              More real results coming as campaigns complete.
            </p>
            <p className="mx-auto mt-2 max-w-md text-[14px] font-semibold leading-relaxed text-ink-60">
              We don&apos;t pad this page with invented case studies. Clear
              filters or book a call to walk live dashboards.
            </p>
            <button
              type="button"
              onClick={clear}
              className="mt-6 text-[13px] font-bold text-electric-blue"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      <p className="mt-6 text-[13px] font-semibold text-ink-40">
        Showing {filtered.length} of {RESULTS_CAMPAIGNS.length} published{" "}
        {RESULTS_CAMPAIGNS.length === 1 ? "campaign" : "campaigns"} — only
        verified numbers from live dashboards.
      </p>

      {/* Supporting screenshot strip — real assets, not fake case cards */}
      <div className="mt-14 overflow-hidden rounded-2xl border border-ink-08 bg-cream/30 p-5 sm:p-6">
        <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-ink-40">
          Public screenshots
        </p>
        <p className="mt-2 max-w-2xl text-[15px] font-bold leading-relaxed text-ink-60">
          Same Smartlead and calendar density evidence shown on the homepage —
          industry and stage only.
        </p>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            {
              src: "/proof/smartlead-campaign-dashboard.png",
              alt: "Smartlead campaign analytics for property management outbound",
            },
            {
              src: "/proof/calendar-proof-1.png",
              alt: "Anonymized calendar density week view",
            },
            {
              src: "/proof/calendar-proof-2.png",
              alt: "Anonymized stacked meetings across a work week",
            },
          ].map((img) => (
            <div
              key={img.src}
              className="relative aspect-[4/3] overflow-hidden rounded-xl border border-ink-08 bg-background"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ResultsLiveInvite() {
  return (
    <section className="border-t border-ink-08 bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28 lg:px-12">
        <div className="max-w-3xl">
          <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-ink-40">
            More proof, live
          </p>
          <h2 className="mt-4 text-balance text-[clamp(1.85rem,4vw,3.25rem)] font-extrabold leading-[1.05] tracking-tight text-ink">
            Prefer named case studies?{" "}
            <span className="font-serif-italic text-electric-blue">
              We&apos;ll show you live ones.
            </span>
          </h2>
          <p className="mt-5 max-w-xl text-[16px] font-bold leading-relaxed text-ink-60">
            We only publish client names and quotes with written permission.
            Until then, additional campaigns are walked through on a strategy
            call — real dashboards, real calendars, no agency theatre.
          </p>
        </div>

        <div className="mt-10 grid gap-6 overflow-hidden rounded-3xl border-2 border-ink/12 bg-background p-8 md:grid-cols-[1.2fr_1fr] md:p-10">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-ink-08 bg-cream/50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-ink-40">
              <LayoutDashboard className="size-3.5" aria-hidden />
              On the call
            </span>
            <ul className="mt-6 flex flex-col gap-3 text-[15px] font-semibold leading-relaxed text-ink-60">
              <li className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                Live Smartlead / Instantly reply and meeting metrics for
                accounts like yours
              </li>
              <li className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                Calendar density from recent appointment-setting weeks
              </li>
              <li className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                An honest read on whether outbound fits your ACV and ICP
              </li>
            </ul>
            <div className="mt-8">
              <MagneticButton href={SITE.calendly} size="lg" variant="primary">
                Book a strategy call
              </MagneticButton>
            </div>
          </div>
          <div className="flex flex-col justify-center rounded-2xl border border-ink-08 bg-cream/40 p-6">
            <p className="text-[13px] font-bold uppercase tracking-[0.16em] text-ink-40">
              Why this page stays short
            </p>
            <p className="mt-3 text-[20px] font-extrabold leading-snug tracking-tight text-ink">
              We add campaigns when they&apos;re real — not to fill a grid.
            </p>
            <p className="mt-2 text-[14px] font-semibold leading-relaxed text-ink-60">
              Empty slots and invented logos would look busier. They would also
              be a lie. More published cards come as engagements complete and
              permission clears.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ResultsClosingCta() {
  return (
    <section className="border-t border-ink-08 bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-20 text-center md:py-28">
        <h2 className="max-w-3xl text-balance text-[clamp(1.85rem,4vw,3rem)] font-extrabold leading-[1.05] tracking-tight text-ink">
          Ready to see dashboards for{" "}
          <span className="font-serif-italic text-electric-blue">your</span>{" "}
          ICP?
        </h2>
        <p className="max-w-xl text-[16px] font-bold leading-relaxed text-ink-60">
          30-minute call. We&apos;ll tell you honestly if outbound fits — even
          if you don&apos;t hire us.
        </p>
        <BookCallLink
          source="results-page"
          className="group inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-[15px] font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.97]"
        >
          Book a strategy call
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </BookCallLink>
      </div>
    </section>
  )
}
