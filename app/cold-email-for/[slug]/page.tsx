import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Quote } from "lucide-react"
import { PageShell } from "@/components/site/page-shell"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbsSchema, faqSchema, serviceSchema } from "@/lib/seo/schemas"
import { SITE } from "@/lib/site-data"
import { RICH_INDUSTRIES } from "@/lib/industries-data"
import { CtaButton } from "@/components/site/cta-button"
import { SectionEyebrow } from "@/components/site/section-eyebrow"
import { RelatedLinks } from "@/components/site/related-links"

type Params = { slug: string }

export function generateStaticParams() {
  return RICH_INDUSTRIES.map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const ind = RICH_INDUSTRIES.find((i) => i.slug === slug)
  if (!ind) return { title: "Industry not found" }

  const title = `Cold email for ${ind.nameLower} | ${SITE.name}`
  const ogImage = `/api/og?title=${encodeURIComponent(
    `Cold email for ${ind.name}`,
  )}&kicker=${encodeURIComponent("Industry playbook")}`

  return {
    title,
    description: ind.metaDescription,
    alternates: { canonical: `/cold-email-for/${slug}` },
    openGraph: {
      title,
      description: ind.metaDescription,
      type: "website",
      url: `/cold-email-for/${slug}`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: ind.metaDescription,
      images: [ogImage],
    },
  }
}

export default async function ColdEmailForPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const ind = RICH_INDUSTRIES.find((i) => i.slug === slug)
  if (!ind) notFound()

  const others = RICH_INDUSTRIES.filter((i) => i.slug !== slug).slice(0, 6)

  return (
    <PageShell
      eyebrow={`Industry: ${ind.name}`}
      title={ind.hero.title}
      description={ind.hero.subtitle}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Cold email by industry", href: "/cold-email-for" },
        { label: ind.name },
      ]}
    >
      <JsonLd
        data={[
          breadcrumbsSchema([
            { name: "Home", url: SITE.domain },
            { name: "Cold email by industry", url: `${SITE.domain}/cold-email-for` },
            { name: ind.name, url: `${SITE.domain}/cold-email-for/${slug}` },
          ]),
          serviceSchema({
            name: `Cold email for ${ind.nameLower}`,
            description: ind.metaDescription,
            slug: `/cold-email-for/${slug}`,
          }),
          faqSchema(ind.faqs.map((f) => ({ question: f.q, answer: f.a }))),
        ]}
      />

      {/* Benchmarks */}
      <section className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ind.benchmarks.map((m) => (
          <div
            key={m.label}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <div className="font-serif text-3xl text-primary md:text-4xl">
              {m.value}
            </div>
            <div className="mt-2 text-sm text-muted-foreground">{m.label}</div>
          </div>
        ))}
      </section>

      {/* Why it's hard */}
      <section className="mb-16">
        <SectionEyebrow>Why outbound is different here</SectionEyebrow>
        <h2 className="mt-4 font-serif text-3xl text-balance md:text-4xl">
          What stops most {ind.nameLower} from winning at outbound.
        </h2>
        <p className="mt-6 max-w-3xl text-pretty text-lg leading-relaxed text-muted-foreground">
          {ind.whyItsHard}
        </p>
      </section>

      {/* Buying committee */}
      <section className="mb-16 grid gap-10 lg:grid-cols-2">
        <div>
          <SectionEyebrow>Buying committee</SectionEyebrow>
          <h2 className="mt-4 font-serif text-2xl text-balance md:text-3xl">
            We map every seat at the table for {ind.nameLower}.
          </h2>
          <ul className="mt-6 space-y-3">
            {ind.buyingCommittee.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                <span className="text-foreground/85">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <SectionEyebrow>Triggers we layer in</SectionEyebrow>
          <h2 className="mt-4 font-serif text-2xl text-balance md:text-3xl">
            Timing turns a 4% reply rate into 18%.
          </h2>
          <ul className="mt-6 space-y-3">
            {ind.triggers.map((t) => (
              <li key={t} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                <span className="text-foreground/85">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Sample copy */}
      <section className="mb-16 rounded-2xl border border-border bg-card p-8 md:p-10">
        <SectionEyebrow>Sample copy we have actually shipped</SectionEyebrow>
        <h2 className="mt-4 font-serif text-2xl text-balance md:text-3xl">
          A peek inside a real {ind.nameLower} sequence.
        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-primary">
              Subject lines we test
            </div>
            <ul className="mt-4 space-y-2">
              {ind.sampleSubjectLines.map((s) => (
                <li
                  key={s}
                  className="rounded-md bg-background px-4 py-3 font-mono text-sm text-foreground/85"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-primary">
              First-line opener
            </div>
            <p className="mt-4 rounded-md bg-background px-4 py-4 font-mono text-sm leading-relaxed text-foreground/85">
              {ind.sampleOpener}
            </p>
          </div>
        </div>
      </section>

      {/* Case study */}
      <section className="mb-16 rounded-2xl border border-primary/20 bg-primary/[0.03] p-8 md:p-12">
        <SectionEyebrow>A real client in {ind.nameLower}</SectionEyebrow>
        <h2 className="mt-4 font-serif text-2xl text-balance md:text-3xl">
          {ind.caseStudy.client}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-foreground/90">
          {ind.caseStudy.result}
        </p>
        <figure className="mt-8 border-l-2 border-primary pl-5">
          <Quote
            className="mb-3 size-5 text-primary/60"
            aria-hidden="true"
          />
          <blockquote className="font-serif text-xl italic leading-relaxed text-foreground/90 md:text-2xl">
            &ldquo;{ind.caseStudy.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-4 text-sm text-muted-foreground">
            {ind.caseStudy.quoteName} — {ind.caseStudy.quoteRole}
          </figcaption>
        </figure>
      </section>

      {/* Pricing */}
      <section className="mb-16">
        <SectionEyebrow>Pricing for {ind.nameLower}</SectionEyebrow>
        <h2 className="mt-4 font-serif text-3xl text-balance md:text-4xl">
          Transparent pricing, no surprise add-ons.
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="text-xs font-medium uppercase tracking-wider text-primary">
              Starting
            </div>
            <div className="mt-3 font-serif text-3xl">
              {ind.pricing.starting}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Entry-level engagement, single-channel cold email.
            </p>
          </div>
          <div className="rounded-2xl border border-primary bg-card p-6">
            <div className="text-xs font-medium uppercase tracking-wider text-primary">
              Typical
            </div>
            <div className="mt-3 font-serif text-3xl">
              {ind.pricing.typicalEngagement}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Full-stack engagement: email + LinkedIn + reply handling.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="text-xs font-medium uppercase tracking-wider text-primary">
              Setup
            </div>
            <div className="mt-3 font-serif text-3xl">
              {ind.pricing.setupFee}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              One-time infrastructure, warm-up, ICP workshop.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="mb-16">
        <SectionEyebrow>FAQ</SectionEyebrow>
        <h2 className="mt-4 font-serif text-3xl text-balance md:text-4xl">
          Common questions for {ind.nameLower}.
        </h2>
        <ul className="mt-8 space-y-4">
          {ind.faqs.map((f) => (
            <li
              key={f.q}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="font-serif text-lg">{f.q}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {f.a}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Freshness */}
      <p className="mb-16 text-xs text-muted-foreground">
        Last reviewed: {new Date(ind.lastReviewed).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}.
        Pricing and benchmarks update quarterly.
      </p>

      {/* CTA */}
      <section className="mb-20 rounded-2xl border border-border bg-card p-8 text-center md:p-12">
        <h2 className="font-serif text-3xl text-balance md:text-4xl">
          Want a 90-day plan tailored to {ind.nameLower}?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
          Book a 30-minute strategy call. You leave with a custom playbook even
          if we never work together.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <CtaButton href={SITE.calendly}>Book a strategy call</CtaButton>
          <Link
            href="/services/cold-email"
            className="inline-flex items-center justify-center gap-1.5 rounded-md border border-border px-5 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
          >
            See full cold email service
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <RelatedLinks
        title="Other industries we serve"
        links={others.map((o) => ({
          href: `/cold-email-for/${o.slug}`,
          label: `Cold email for ${o.nameLower}`,
        }))}
      />
    </PageShell>
  )
}
