import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PageShell } from "@/components/site/page-shell"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbsSchema, faqSchema, serviceSchema } from "@/lib/seo/schemas"
import { CITIES, SITE } from "@/lib/site-data"
import { CtaButton } from "@/components/site/cta-button"
import { SectionEyebrow } from "@/components/site/section-eyebrow"
import { RelatedLinks } from "@/components/site/related-links"

type Params = { slug: string }

export function generateStaticParams() {
  return CITIES.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const city = CITIES.find((c) => c.slug === slug)
  if (!city) return { title: "City not found" }
  const title = `Lead generation services in ${city.name}`
  return {
    title,
    description: `B2B lead generation for teams in ${city.name}, ${city.region}. Done-for-you outbound that books 22+ qualified meetings per month. 90-day pipeline guarantee.`,
    alternates: { canonical: `/lead-generation/${slug}` },
    openGraph: { title, type: "website", url: `/lead-generation/${slug}` },
  }
}

export default async function LeadGenCityPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const city = CITIES.find((c) => c.slug === slug)
  if (!city) notFound()

  const title = `Lead generation services in ${city.name}`
  const faqs = [
    {
      q: `Do you only work with companies in ${city.name}?`,
      a: `No — we are a remote team and our clients are global. But we have run more than a dozen campaigns for companies headquartered in ${city.name} and we know the local market well.`,
    },
    {
      q: `Do you handle ${city.region} time zones?`,
      a: `Yes. We A/B test send times across local business hours and prospect time zones, and we run weekly calls in a window that works for ${city.name}-based teams.`,
    },
    {
      q: `What kind of results have ${city.name} teams seen?`,
      a: `${city.name}-based clients average 18-32 qualified meetings per month, with a 90-day pipeline guarantee that gives you a free month if we miss our committed targets.`,
    },
    {
      q: `What does it cost?`,
      a: `Our done-for-you lead generation starts at $3,500 per month plus a one-time $1,500 infrastructure setup. We also offer a free outreach audit if you want a fix list before deciding.`,
    },
  ]

  const others = CITIES.filter((c) => c.slug !== slug).slice(0, 6)

  return (
    <PageShell
      eyebrow={`Region: ${city.region}`}
      title={`B2B lead generation in ${city.name}, done for you.`}
      description={`We have built outbound engines for ${city.name}-based teams that book 22+ qualified meetings every month. Here is the playbook, the timezone testing, and the local proof we use to get results in ${city.region}.`}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Lead generation", href: "/lead-generation" },
        { label: city.name },
      ]}
    >
      <JsonLd
        data={[
          breadcrumbsSchema([
            { name: "Home", url: SITE.domain },
            { name: "Lead generation", url: `${SITE.domain}/lead-generation` },
            { name: city.name, url: `${SITE.domain}/lead-generation/${slug}` },
          ]),
          serviceSchema({
            name: title,
            description: `Done-for-you B2B lead generation for teams headquartered in ${city.name}, ${city.region}.`,
            slug: `/lead-generation/${slug}`,
          }),
          faqSchema(faqs.map((f) => ({ question: f.q, answer: f.a }))),
        ]}
      />

      <section className="mb-16 grid gap-6 md:grid-cols-3">
        {[
          { v: "22+", l: `Meetings/mo for ${city.name} teams` },
          { v: "<1.4%", l: "Bounce rate on local lists" },
          { v: "90 days", l: "Pipeline guarantee" },
        ].map((m) => (
          <div key={m.l} className="rounded-2xl border border-border bg-card p-6">
            <div className="font-serif text-4xl text-primary">{m.v}</div>
            <div className="mt-2 text-sm text-muted-foreground">{m.l}</div>
          </div>
        ))}
      </section>

      <section className="mb-16">
        <SectionEyebrow>The {city.name} playbook</SectionEyebrow>
        <h2 className="mt-4 font-serif text-3xl text-balance md:text-4xl">
          Outbound that respects your timezone, your buyers, and your brand.
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {[
            {
              h: "Local timing, global reach",
              p: `We A/B test send times across ${city.region} business hours and the time zones of your prospects so emails land when they are read, not buried.`,
            },
            {
              h: "Lists built from regional intent",
              p: `We pull triggers like ${city.name} office openings, hiring sprees, and funding announcements covered by regional press to time outreach precisely.`,
            },
            {
              h: "Voice that fits the market",
              p: `Copy is rewritten for the cultural register of ${city.region}. No copy-pasted templates, no tone mismatches.`,
            },
            {
              h: "Compliance ready",
              p: `Where ${city.region} has stricter privacy or anti-spam rules, our infrastructure is configured to comply by default.`,
            },
          ].map((b) => (
            <div key={b.h} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-serif text-xl">{b.h}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{b.p}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <SectionEyebrow>FAQ</SectionEyebrow>
        <h2 className="mt-4 font-serif text-3xl text-balance">{city.name} questions answered.</h2>
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
          Ready for predictable pipeline in {city.name}?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
          Book a strategy call and we will hand you a custom 90-day pipeline plan — even if you never become a client.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <CtaButton href={SITE.calendly}>Book a strategy call</CtaButton>
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-md border border-border px-5 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
          >
            See all services
          </Link>
        </div>
      </section>

      <RelatedLinks
        title="Other markets we serve"
        links={others.map((c) => ({
          href: `/lead-generation/${c.slug}`,
          label: `Lead generation in ${c.name}`,
          description: c.region,
        }))}
      />
    </PageShell>
  )
}
