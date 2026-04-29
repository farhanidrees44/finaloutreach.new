import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PageShell } from "@/components/site/page-shell"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbsSchema, faqSchema } from "@/lib/seo/schemas"
import { COMPETITORS, SITE } from "@/lib/site-data"
import { CtaButton } from "@/components/site/cta-button"
import { SectionEyebrow } from "@/components/site/section-eyebrow"
import { RelatedLinks } from "@/components/site/related-links"

type Params = { slug: string }

export function generateStaticParams() {
  return COMPETITORS.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const comp = COMPETITORS.find((c) => c.slug === slug)
  if (!comp) return { title: "Comparison not found" }
  const title = `FinalOutreach vs ${comp.name}`
  return {
    title,
    description: `Honest comparison of FinalOutreach and ${comp.name} — pricing, deliverables, ICP fit, and where each one wins.`,
    alternates: { canonical: `/compare/${slug}` },
    openGraph: { title, type: "website", url: `/compare/${slug}` },
  }
}

export default async function ComparePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const comp = COMPETITORS.find((c) => c.slug === slug)
  if (!comp) notFound()

  const rows = [
    { feature: "Starting price", a: "$3,500/mo", b: "$5,000–$8,000/mo" },
    { feature: "Setup fee", a: "$1,500 one-time", b: "$2,500–$4,000 one-time" },
    { feature: "Minimum contract", a: "3 months", b: "6–12 months" },
    { feature: "Pipeline guarantee", a: "90-day, free month if missed", b: "None / vague" },
    { feature: "Dedicated SDR", a: "Yes, trained for 2 weeks on your offer", b: "Sometimes shared across 3–5 clients" },
    { feature: "Reply rate transparency", a: "Weekly dashboard, raw data exportable", b: "Curated monthly slide deck" },
    { feature: "ICP customization", a: "Workshop included, refined every 30 days", b: "One-time at onboarding" },
    { feature: "Channel mix", a: "Cold email + LinkedIn + audit", b: "Often single-channel" },
  ]

  const faqs = [
    {
      q: `Is FinalOutreach really cheaper than ${comp.name}?`,
      a: `Most ${comp.name} engagements price between $5,000 and $8,000 per month with multi-month minimums. FinalOutreach starts at $3,500 with a 3-month minimum, and we deliver more channels for the price.`,
    },
    {
      q: `Why choose FinalOutreach over ${comp.name}?`,
      a: `Three reasons: a 90-day pipeline guarantee that ${comp.name} does not match, full transparency in raw reply data, and an ICP refresh every 30 days instead of a single onboarding workshop.`,
    },
    {
      q: `When would ${comp.name} be a better fit?`,
      a: `If you need a 100+ SDR enterprise call center motion or you have a $1M+ annual outbound budget with a fully-resourced internal team, ${comp.name} can be a fit. For most $500K–$10M ARR teams, FinalOutreach is leaner and faster.`,
    },
  ]

  const others = COMPETITORS.filter((c) => c.slug !== slug)

  return (
    <PageShell
      eyebrow="Comparison"
      title={`FinalOutreach vs ${comp.name}: which is right for you?`}
      description={`A side-by-side breakdown of pricing, deliverables, guarantees, and ICP fit. Built to help you choose, not to sell you.`}
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
            { name: `FinalOutreach vs ${comp.name}`, url: `${SITE.domain}/compare/${slug}` },
          ]),
          faqSchema(faqs.map((f) => ({ question: f.q, answer: f.a }))),
        ]}
      />

      <section className="mb-16 overflow-hidden rounded-2xl border border-border bg-card">
        <div className="grid grid-cols-3 border-b border-border bg-background/40">
          <div className="p-5 text-sm font-medium uppercase tracking-wider text-muted-foreground">Feature</div>
          <div className="p-5 font-serif text-lg">FinalOutreach</div>
          <div className="p-5 font-serif text-lg text-muted-foreground">{comp.name}</div>
        </div>
        <ul>
          {rows.map((r, i) => (
            <li
              key={r.feature}
              className={`grid grid-cols-3 ${i !== rows.length - 1 ? "border-b border-border" : ""}`}
            >
              <div className="p-5 text-sm text-muted-foreground">{r.feature}</div>
              <div className="p-5 font-medium">{r.a}</div>
              <div className="p-5 text-muted-foreground">{r.b}</div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-16">
        <SectionEyebrow>Honest take</SectionEyebrow>
        <h2 className="mt-4 font-serif text-3xl text-balance md:text-4xl">When {comp.name} is the right choice.</h2>
        <p className="mt-6 max-w-3xl text-pretty leading-relaxed text-muted-foreground">
          We do not believe FinalOutreach is the right fit for every company. {comp.name} can be a stronger choice if
          you need a high-volume SDR call-center motion, a fully managed enterprise BDR program with 50+ SDRs, or you
          have a 12-month budget locked in and prefer a deeply tenured incumbent with brand-name proof. For everyone
          else — most $500K–$10M ARR B2B teams — we book more meetings per dollar with a leaner team.
        </p>
      </section>

      <section className="mb-16">
        <SectionEyebrow>FAQ</SectionEyebrow>
        <h2 className="mt-4 font-serif text-3xl text-balance">Common questions about this comparison.</h2>
        <ul className="mt-8 space-y-4">
          {faqs.map((f) => (
            <li key={f.q} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-serif text-lg">{f.q}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{f.a}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-20 rounded-2xl border border-border bg-card p-8 text-center md:p-12">
        <h2 className="font-serif text-3xl text-balance md:text-4xl">
          Want a free 48-hour audit before you decide?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
          We will tear down your current outbound and hand you a Loom with the top 10 fixes — even if you go with
          {" "}
          {comp.name}.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <CtaButton href={SITE.calendly}>Get the free audit</CtaButton>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center rounded-md border border-border px-5 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
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
