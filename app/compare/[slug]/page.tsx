import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PageShell } from "@/components/site/page-shell"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbsSchema, faqSchema } from "@/lib/seo/schemas"
import { SITE } from "@/lib/site-data"
import {
  COMPETITOR_PROFILES,
  getCompetitor,
} from "@/lib/pseo/competitors"
import { CtaButton } from "@/components/site/cta-button"
import { RelatedLinks } from "@/components/site/related-links"

type Params = { slug: string }

export function generateStaticParams() {
  return COMPETITOR_PROFILES.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const comp = getCompetitor(slug)
  if (!comp) return { title: "Comparison not found" }
  return {
    title: comp.metaTitle,
    description: comp.metaDescription,
    alternates: { canonical: `/compare/${slug}` },
    openGraph: {
      title: comp.metaTitle,
      description: comp.metaDescription,
      url: `${SITE.domain}/compare/${slug}`,
      type: "website",
    },
  }
}

export default async function ComparePage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const comp = getCompetitor(slug)
  if (!comp) notFound()

  const others = COMPETITOR_PROFILES.filter((c) => c.slug !== slug)

  return (
    <PageShell
      eyebrow="Comparison"
      title={`FinalOutreach vs ${comp.name}`}
      italicize={comp.name}
      description={comp.verdict}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Compare", href: "/compare" },
        { label: `vs ${comp.name}` },
      ]}
    >
      <JsonLd
        data={[
          breadcrumbsSchema([
            { name: "Home", url: SITE.domain },
            { name: "Compare", url: `${SITE.domain}/compare` },
            {
              name: `FinalOutreach vs ${comp.name}`,
              url: `${SITE.domain}/compare/${slug}`,
            },
          ]),
          faqSchema(comp.faqs.map((f) => ({ question: f.q, answer: f.a }))),
        ]}
      />

      <p className="mb-4 text-[13px] font-medium text-ink-40">
        Last reviewed {comp.lastReviewed}
      </p>
      <p className="mb-12 max-w-3xl text-[16px] font-medium leading-[1.7] text-ink-60">
        {comp.intro}
      </p>

      <section className="mb-16 rounded-3xl border border-ink-08 bg-card p-6 shadow-[0_16px_48px_-28px_rgba(15,15,15,0.22)] sm:p-8">
        <p className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-ink-40">
          How {comp.name} is usually positioned
        </p>
        <p className="mt-3 text-[15px] font-medium leading-[1.65] text-ink">
          {comp.theirModel}
        </p>
      </section>

      <section className="mb-16 overflow-hidden rounded-3xl border border-ink-08 bg-card shadow-[0_16px_48px_-28px_rgba(15,15,15,0.22)]">
        <div className="grid grid-cols-1 border-b border-ink-08 bg-cream/50 sm:grid-cols-3">
          <div className="p-5 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-40">
            Feature
          </div>
          <div className="border-t border-ink-08 p-5 text-[15px] font-extrabold text-ink sm:border-t-0">
            FinalOutreach
          </div>
          <div className="border-t border-ink-08 p-5 text-[15px] font-bold text-ink-60 sm:border-t-0">
            {comp.name}
          </div>
        </div>
        <ul>
          {comp.comparisonRows.map((r, i) => (
            <li
              key={r.feature}
              className={`grid grid-cols-1 sm:grid-cols-3 ${
                i !== comp.comparisonRows.length - 1 ? "border-b border-ink-08" : ""
              }`}
            >
              <div className="p-5 text-[13.5px] font-semibold text-ink-60">
                {r.feature}
              </div>
              <div className="px-5 pb-5 text-[14.5px] font-medium text-ink sm:py-5">
                {r.us}
              </div>
              <div className="px-5 pb-5 text-[14.5px] font-medium text-ink-60 sm:py-5">
                {r.them}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-16 grid gap-5 md:grid-cols-2">
        <div className="rounded-3xl border border-ink-08 bg-card p-7">
          <h2 className="text-[20px] font-extrabold tracking-tight text-ink">
            When {comp.name} is the better fit
          </h2>
          <ul className="mt-4 space-y-3">
            {comp.whenTheyWin.map((item) => (
              <li
                key={item}
                className="flex gap-2.5 text-[14.5px] font-medium leading-[1.55] text-ink-60"
              >
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-ink-20" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-electric-blue/25 bg-electric-blue/[0.03] p-7">
          <h2 className="text-[20px] font-extrabold tracking-tight text-ink">
            When FinalOutreach wins
          </h2>
          <ul className="mt-4 space-y-3">
            {comp.whenWeWin.map((item) => (
              <li
                key={item}
                className="flex gap-2.5 text-[14.5px] font-medium leading-[1.55] text-ink-60"
              >
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-electric-blue" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mb-16 space-y-10">
        {comp.deepDive.map((block) => (
          <article key={block.heading}>
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold leading-[1.15] tracking-tight text-ink">
              {block.heading}
            </h2>
            <p className="mt-4 max-w-3xl text-[16px] font-medium leading-[1.7] text-ink-60">
              {block.body}
            </p>
          </article>
        ))}
      </section>

      <section className="mb-16">
        <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight text-ink">
          FAQ — FinalOutreach vs {comp.name}
        </h2>
        <ul className="mt-8 divide-y divide-ink-08 border-y border-ink-08">
          {comp.faqs.map((f) => (
            <li key={f.q} className="py-6">
              <h3 className="text-[17px] font-bold text-ink">{f.q}</h3>
              <p className="mt-2 max-w-3xl text-[15px] leading-[1.7] text-ink-60">
                {f.a}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-16 rounded-3xl border border-ink-08 bg-cream/50 p-8 text-center md:p-12">
        <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight text-ink">
          Want a free 48-hour audit before you decide?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[15px] font-semibold leading-[1.65] text-ink-60">
          Bring the {comp.name} proposal if you have one. We will map scope gaps
          honestly — including where they may still be the better buy.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <CtaButton href={SITE.calendly}>Get the free audit</CtaButton>
          <Link
            href="/pricing"
            className="inline-flex h-12 items-center rounded-full border border-ink-08 px-6 text-[14.5px] font-semibold text-ink transition-colors hover:border-ink/30"
          >
            See pricing
          </Link>
        </div>
      </section>

      <RelatedLinks
        title="Other comparisons"
        links={others.map((c) => ({
          href: `/compare/${c.slug}`,
          label: `FinalOutreach vs ${c.name}`,
        }))}
      />
    </PageShell>
  )
}
