import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PageShell } from "@/components/site/page-shell"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbsSchema, faqSchema } from "@/lib/seo/schemas"
import { TOOL_ALTERNATIVES, SITE } from "@/lib/site-data"
import { CtaButton } from "@/components/site/cta-button"
import { SectionEyebrow } from "@/components/site/section-eyebrow"
import { RelatedLinks } from "@/components/site/related-links"

type Params = { slug: string }

export function generateStaticParams() {
  return TOOL_ALTERNATIVES.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const tool = TOOL_ALTERNATIVES.find((t) => t.slug === slug)
  if (!tool) return { title: "Alternative not found" }
  const title = `${tool.name} alternatives for B2B outbound`
  return {
    title,
    description: `Looking for an alternative to ${tool.name}? See the limits, the use cases where you outgrow it, and how a done-for-you team compares.`,
    alternates: { canonical: `/alternatives/${slug}` },
    openGraph: { title, type: "website", url: `/alternatives/${slug}` },
  }
}

export default async function AlternativesPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const tool = TOOL_ALTERNATIVES.find((t) => t.slug === slug)
  if (!tool) notFound()

  const limits = [
    `${tool.name} is a tool — it sends emails, but does not write copy, build lists, or handle replies.`,
    `Deliverability is on you. ${tool.name} cannot fix a misconfigured DMARC or a burnt sending domain.`,
    `Reply handling and qualification still need a human. ${tool.name} does not book meetings.`,
    `Time cost is real. The teams using ${tool.name} well typically have a 10-15 hour/week internal owner.`,
  ]

  const faqs = [
    {
      q: `Is FinalOutreach a replacement for ${tool.name}?`,
      a: `Not exactly — we use tools like ${tool.name} under the hood for some clients. The difference is we run the strategy, copy, list, infrastructure, and reply handling end-to-end, so you do not need an internal owner.`,
    },
    {
      q: `When does ${tool.name} stop being enough?`,
      a: `When you do not have 10+ hours per week to manage it, your reply rate drops below 6%, your domain gets flagged, or you cannot keep up with reply qualification. At that point a done-for-you team is cheaper than the alternative cost of doing it yourself badly.`,
    },
    {
      q: `Can we keep ${tool.name} and have you run it?`,
      a: `Yes, in many cases. We can plug into your existing ${tool.name} account, take over operations, and you keep the data and tooling.`,
    },
  ]

  const others = TOOL_ALTERNATIVES.filter((t) => t.slug !== slug)

  return (
    <PageShell
      eyebrow="Alternative analysis"
      title={`${tool.name} alternatives for serious B2B teams.`}
      description={`${tool.name} is a great tool. But if your reply rate is dropping, your inbox is on fire, or you do not have a 10-hour-a-week internal owner, the right alternative might not be another tool — it might be a team.`}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Alternatives", href: "/alternatives" },
        { label: tool.name },
      ]}
    >
      <JsonLd
        data={[
          breadcrumbsSchema([
            { name: "Home", url: SITE.domain },
            { name: "Alternatives", url: `${SITE.domain}/alternatives` },
            { name: tool.name, url: `${SITE.domain}/alternatives/${slug}` },
          ]),
          faqSchema(faqs.map((f) => ({ question: f.q, answer: f.a }))),
        ]}
      />

      <section className="mb-16">
        <SectionEyebrow>The honest read on {tool.name}</SectionEyebrow>
        <h2 className="mt-4 font-serif text-3xl text-balance md:text-4xl">
          Where {tool.name} stops being enough.
        </h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {limits.map((l) => (
            <li key={l} className="rounded-2xl border border-border bg-card p-6 leading-relaxed text-foreground/90">
              {l}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-16 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-serif text-2xl">Stick with {tool.name} if</h3>
          <ul className="mt-4 space-y-2 leading-relaxed text-muted-foreground">
            <li>You have a dedicated internal SDR or growth lead.</li>
            <li>You enjoy iterating on copy and infrastructure.</li>
            <li>Your monthly send volume is under 5,000 emails.</li>
            <li>You are early-stage and want hands-on control.</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-primary/40 bg-card p-6">
          <h3 className="font-serif text-2xl">Switch to a done-for-you team if</h3>
          <ul className="mt-4 space-y-2 leading-relaxed text-muted-foreground">
            <li>Your team does not have 10+ hours per week to manage outbound.</li>
            <li>Your reply rate has dropped below 6% and you cannot diagnose why.</li>
            <li>You want a 90-day pipeline guarantee with money-back terms.</li>
            <li>You need senior-voice copy and strategy, not just sending software.</li>
          </ul>
        </div>
      </section>

      <section className="mb-16">
        <SectionEyebrow>FAQ</SectionEyebrow>
        <h2 className="mt-4 font-serif text-3xl text-balance">Common questions.</h2>
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
        <h2 className="font-serif text-3xl text-balance md:text-4xl">Want us to audit your {tool.name} setup?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
          We will review your infrastructure, copy, and lists and send you a 48-hour Loom with a prioritized fix list.
          Free, no pitch.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <CtaButton href={SITE.calendly}>Get the free audit</CtaButton>
          <Link
            href="/services/cold-email"
            className="inline-flex items-center justify-center rounded-md border border-border px-5 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
          >
            See done-for-you service
          </Link>
        </div>
      </section>

      <RelatedLinks
        title="Other tool alternatives"
        links={others.map((t) => ({
          href: `/alternatives/${t.slug}`,
          label: `Alternatives to ${t.name}`,
        }))}
      />
    </PageShell>
  )
}
