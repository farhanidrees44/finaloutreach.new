import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowRight, ArrowLeft, ArrowUpRight, Quote } from "lucide-react"
import { Breadcrumbs, PageCta, PageShell } from "@/components/site/page-shell"
import { JsonLd } from "@/components/seo/json-ld"
import { caseStudySchema } from "@/lib/seo/schemas"
import { CASE_STUDIES, SITE } from "@/lib/site-data"

type Params = { slug: string }

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const cs = CASE_STUDIES.find((c) => c.slug === slug)
  if (!cs) return {}

  // Pick a tight, click-worthy description: result-led if possible.
  const description =
    cs.results[0] && cs.results[0].length <= 160
      ? `${cs.client} (${cs.industry}) — ${cs.results[0]}.`
      : cs.challenge.slice(0, 160)

  // Keywords mined from concrete fields keep the tags accurate and useful.
  const keywords = [
    `${cs.client} case study`,
    `${cs.industry} cold email case study`,
    `${cs.industry} lead generation case study`,
    `B2B outbound case study`,
    `cold email results`,
    `${cs.timeline} pipeline case study`,
  ]

  const url = `${SITE.domain}/case-studies/${cs.slug}`

  return {
    title: `${cs.client} — ${cs.headline}`,
    description,
    keywords,
    alternates: { canonical: `/case-studies/${cs.slug}` },
    openGraph: {
      type: "article",
      title: `${cs.client} case study — ${cs.headline}`,
      description,
      url,
      siteName: SITE.name,
      images: [
        {
          url: `${SITE.domain}/og.jpg`,
          width: 1200,
          height: 630,
          alt: `${cs.client} case study — ${cs.headline}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${cs.client} — ${cs.headline}`,
      description,
      images: [`${SITE.domain}/og.jpg`],
    },
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const cs = CASE_STUDIES.find((c) => c.slug === slug)
  if (!cs) notFound()

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Case studies", href: "/case-studies" },
    { name: cs.client, href: `/case-studies/${cs.slug}` },
  ]

  // Prev / next navigation across the full case-study list.
  const idx = CASE_STUDIES.findIndex((c) => c.slug === cs.slug)
  const prev = idx > 0 ? CASE_STUDIES[idx - 1] : null
  const next = idx < CASE_STUDIES.length - 1 ? CASE_STUDIES[idx + 1] : null

  // Other case studies for cross-link discovery (excluding prev/next so the
  // user always sees fresh recommendations beyond the linear pagination).
  const others = CASE_STUDIES.filter(
    (c) => c.slug !== cs.slug && c.slug !== prev?.slug && c.slug !== next?.slug,
  ).slice(0, 3)

  return (
    <PageShell breadcrumbs={crumbs}>
      <JsonLd data={caseStudySchema(cs)} />
      <Breadcrumbs items={crumbs} />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-10 pt-10 md:pb-14 md:pt-14">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-ink-08 px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-ink-40">
            {cs.industry}
          </span>
          <span className="rounded-full border border-ink-08 px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-ink-40">
            {cs.timeline}
          </span>
          <span className="rounded-full border border-ink-08 px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-ink-40">
            {cs.client}
          </span>
        </div>
        <h1 className="mt-7 max-w-4xl text-balance text-[40px] font-medium leading-[1.05] tracking-display sm:text-[56px] md:text-[68px]">
          {cs.headline}
        </h1>

        {/* Results at a glance — large KPI strip directly under H1 for
            maximum visibility and dwell time on first paint. */}
        <dl className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-ink-08 bg-ink-08 sm:grid-cols-3">
          {cs.metrics.map((m) => (
            <div
              key={m.l}
              className="flex flex-col gap-1.5 bg-card p-7 sm:p-8"
            >
              <dt className="text-[11.5px] uppercase tracking-[0.16em] text-ink-40">
                {m.l}
              </dt>
              <dd className="text-[44px] font-medium leading-none tabular tracking-display sm:text-[52px]">
                {m.v}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Body */}
      <section className="border-t border-ink-08">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 md:py-24 lg:grid-cols-[1.4fr_1fr]">
          <article className="flex flex-col gap-12">
            <div>
              <h2 className="text-[12px] uppercase tracking-[0.18em] text-ink-40">
                Challenge
              </h2>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                {cs.challenge}
              </p>
            </div>
            <div>
              <h2 className="text-[12px] uppercase tracking-[0.18em] text-ink-40">
                Solution
              </h2>
              <p className="mt-4 text-[17px] leading-[1.7] text-ink">
                {cs.solution}
              </p>
            </div>
            <div>
              <h2 className="text-[12px] uppercase tracking-[0.18em] text-ink-40">
                Results
              </h2>
              <ul className="mt-4 flex flex-col gap-3">
                {cs.results.map((r) => (
                  <li
                    key={r}
                    className="flex items-start gap-3 rounded-xl border border-ink-08 bg-card p-4 text-[15px] leading-[1.55] text-ink"
                  >
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[oklch(0.55_0.13_78)]" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <figure className="rounded-2xl border border-ink-08 bg-cream p-7 sm:p-9">
              <Quote className="size-5 text-ink-40" />
              <blockquote className="mt-4 font-serif-italic text-[24px] leading-[1.4] text-ink sm:text-[28px]">
                {`"${cs.quote.text}"`}
              </blockquote>
              <figcaption className="mt-6 flex flex-col">
                <span className="text-[14px] font-medium text-ink">
                  {cs.quote.name}
                </span>
                <span className="text-[12px] uppercase tracking-[0.14em] text-ink-40">
                  {cs.quote.role}
                </span>
              </figcaption>
            </figure>
          </article>

          <aside className="flex h-fit flex-col gap-6 rounded-2xl border border-ink-08 bg-card p-7 sm:sticky sm:top-28">
            <h3 className="text-[12px] uppercase tracking-[0.18em] text-ink-40">
              Headline metrics
            </h3>
            <div className="flex flex-col gap-6">
              {cs.metrics.map((m, i) => (
                <div key={m.l} className="flex flex-col gap-1.5">
                  <span className="text-[44px] font-medium leading-none tabular tracking-display">
                    {m.v}
                  </span>
                  <span className="text-[12px] uppercase tracking-[0.14em] text-ink-40">
                    {m.l}
                  </span>
                  {i < cs.metrics.length - 1 && (
                    <div className="mt-4 h-px w-12 bg-ink-08" />
                  )}
                </div>
              ))}
            </div>
            <Link
              href={`/contact?ref=cs_${cs.slug}`}
              className="group mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-5 text-[14px] font-medium text-primary-foreground transition-all hover:bg-primary/90"
            >
              We could do this for you
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </aside>
        </div>
      </section>

      {/* Prev / next case-study pagination */}
      {(prev || next) && (
        <section className="border-t border-ink-08 bg-cream/40">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 py-12 md:grid-cols-2 md:py-16">
            {prev ? (
              <Link
                href={`/case-studies/${prev.slug}`}
                className="group flex flex-col gap-2 rounded-2xl border border-ink-08 bg-card p-7 transition-all hover:-translate-y-0.5 hover:border-ink/25"
              >
                <span className="inline-flex items-center gap-2 text-[11.5px] uppercase tracking-[0.14em] text-ink-40">
                  <ArrowLeft className="size-3.5" />
                  Previous case study
                </span>
                <span className="mt-1 text-[20px] font-medium leading-[1.2] tracking-display text-ink sm:text-[22px]">
                  {prev.client}
                </span>
                <span className="text-[14px] leading-relaxed text-ink-60">
                  {prev.headline}
                </span>
              </Link>
            ) : (
              <span aria-hidden="true" className="hidden md:block" />
            )}
            {next ? (
              <Link
                href={`/case-studies/${next.slug}`}
                className="group flex flex-col gap-2 rounded-2xl border border-ink-08 bg-card p-7 text-right transition-all hover:-translate-y-0.5 hover:border-ink/25"
              >
                <span className="inline-flex items-center justify-end gap-2 text-[11.5px] uppercase tracking-[0.14em] text-ink-40">
                  Next case study
                  <ArrowRight className="size-3.5" />
                </span>
                <span className="mt-1 text-[20px] font-medium leading-[1.2] tracking-display text-ink sm:text-[22px]">
                  {next.client}
                </span>
                <span className="text-[14px] leading-relaxed text-ink-60">
                  {next.headline}
                </span>
              </Link>
            ) : null}
          </div>
        </section>
      )}

      {/* More case studies */}
      {others.length > 0 && (
        <section className="border-t border-ink-08 bg-background">
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-[12px] uppercase tracking-[0.18em] text-ink-40">
                More case studies
              </h2>
              <Link
                href="/case-studies"
                className="group inline-flex items-center gap-1.5 text-[13.5px] font-medium text-ink"
              >
                <span className="border-b border-ink/30 pb-0.5">
                  See all {CASE_STUDIES.length}
                </span>
                <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/case-studies/${o.slug}`}
                  className="group flex flex-col gap-4 rounded-2xl border border-ink-08 bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-ink/25"
                >
                  <span className="text-[11px] uppercase tracking-[0.14em] text-ink-40">
                    {o.industry}
                  </span>
                  <h3 className="text-[18px] font-medium leading-[1.2] tracking-display text-ink">
                    {o.headline}
                  </h3>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink">
                    <span className="border-b border-ink/30 pb-0.5">Read</span>
                    <ArrowRight className="size-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <PageCta />
    </PageShell>
  )
}
