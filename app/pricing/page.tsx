import type { Metadata } from "next"
import { Breadcrumbs, PageCta, PageHeader, PageShell } from "@/components/site/page-shell"
import { RelatedLinks } from "@/components/site/related-links"
import { PricingChannels } from "@/components/site/pricing-channels"
import { JsonLd } from "@/components/seo/json-ld"
import { faqSchema } from "@/lib/seo/schemas"

export const metadata: Metadata = {
  title: "Pricing — Outbound by channel",
  description:
    "Transparent channel pricing for LinkedIn outreach, cold email, and cold calling. Book a strategy call — no lock-in after the first 90 days.",
  alternates: { canonical: "/pricing" },
}

const PRICING_FAQ = [
  {
    question: "Do you charge a setup fee?",
    answer:
      "No setup fee for standard LinkedIn, cold email, or cold call packages. Custom or multi-channel builds may include a one-time setup fee for complex data and infrastructure work.",
  },
  {
    question: "How long is the contract?",
    answer:
      "90-day initial commitment, then month-to-month. No auto-renewals, no lock-in.",
  },
  {
    question: "Who owns the data?",
    answer:
      "You do. Domains, mailboxes, contact lists, CRM data — all yours. We transfer everything if we ever part ways.",
  },
  {
    question: "How fast until I see meetings?",
    answer:
      "Most clients see their first qualified meetings inside 3–4 weeks. Infrastructure warm-up takes 2 weeks, then the first campaign launches.",
  },
]

export default function PricingPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Pricing", href: "/pricing" },
  ]
  return (
    <PageShell breadcrumbs={crumbs}>
      <JsonLd data={faqSchema(PRICING_FAQ)} />
      <Breadcrumbs items={crumbs} />
      <PageHeader
        eyebrow="Pricing"
        title="Outbound by channel. Clear monthly pricing."
        italicize="channel"
        description="Pick LinkedIn, cold email, or cold calling. Month-to-month after the first 90 days. Book a strategy call to confirm fit."
      />

      <PricingChannels />

      <section className="border-t border-ink-08 bg-cream">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            {PRICING_FAQ.map((f) => (
              <div key={f.question}>
                <h3 className="text-[22px] font-bold tracking-tight text-ink">{f.question}</h3>
                <p className="mt-3 text-[15px] leading-[1.65] text-ink-60">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageCta title="Still have pricing questions?" subtitle="Book a 30-minute call and we will build a custom quote on the spot." />
      <RelatedLinks
        title="Explore more"
        items={[
          { href: "/services", label: "Services", meta: "What is included" },
          { href: "/process", label: "Process", meta: "How we work" },
          { href: "/results", label: "Live results", meta: "What clients get" },
          { href: "/about", label: "About", meta: "Who runs it" },
          { href: "/contact", label: "Contact", meta: "Book a call" },
          { href: "/blog", label: "Blog", meta: "Free playbooks" },
        ]}
      />
    </PageShell>
  )
}
