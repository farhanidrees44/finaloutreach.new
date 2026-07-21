import type { Metadata } from "next"
import { ArrowRight, Check } from "lucide-react"
import { Breadcrumbs, PageCta, PageHeader, PageShell } from "@/components/site/page-shell"
import { RelatedLinks } from "@/components/site/related-links"
import { JsonLd } from "@/components/seo/json-ld"
import { faqSchema } from "@/lib/seo/schemas"
import { SITE } from "@/lib/site-data"
import { BookCallLink } from "@/components/site/book-call-link"

export const metadata: Metadata = {
  title: "Pricing — Transparent outbound packages",
  description:
    "Straightforward pricing for our cold email, LinkedIn, appointment setting, and infrastructure services. No lock-in, no hidden fees.",
  alternates: { canonical: "/pricing" },
}

const PRICING_FAQ = [
  {
    question: "Do you charge a setup fee?",
    answer:
      "For Launch and Growth, no. Enterprise engagements may include a one-time setup fee for complex data and infrastructure work.",
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

const TIERS = [
  {
    name: "Launch",
    price: "$3,500",
    cadence: "/month",
    description: "For smaller teams starting outbound for the first time.",
    includes: [
      "Done-for-you cold email",
      "5 sending mailboxes",
      "3,000 verified prospects per month",
      "1 sequence, weekly iteration",
      "Shared Slack channel",
      "Weekly reporting call",
    ],
  },
  {
    name: "Growth",
    price: "$6,800",
    cadence: "/month",
    description: "For companies scaling past their first outbound engine.",
    featured: true,
    includes: [
      "Everything in Launch",
      "10 sending mailboxes",
      "6,000 verified prospects per month",
      "Multi-channel (email + LinkedIn)",
      "Dedicated SDR for reply handling",
      "A/B testing and weekly iteration",
      "CRM sync (HubSpot / Salesforce / Pipedrive)",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "",
    description: "For multi-region teams with complex ABM motions.",
    includes: [
      "Everything in Growth",
      "15+ sending mailboxes",
      "Custom list-building (ABM / intent data)",
      "Multiple named-account segments",
      "Senior account lead, weekly exec review",
      "Custom SLAs and data controls",
    ],
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
        title="Transparent pricing. No lock-in."
        italicize="Transparent"
        description="Monthly retainers. No setup fees for standard engagements. Month-to-month after the first 90 days."
      />

      <section className="border-t border-ink-08">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 py-16 md:py-24 lg:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={[
                "flex flex-col justify-between gap-8 rounded-2xl border p-7 sm:p-9",
                tier.featured
                  ? "border-ink bg-ink text-background"
                  : "border-ink-08 bg-card",
              ].join(" ")}
            >
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <span className={"text-[12px] uppercase tracking-[0.18em] " + (tier.featured ? "text-background/60" : "text-ink-40")}>
                    {tier.name}
                  </span>
                  {tier.featured && (
                    <span className="rounded-full bg-amber px-2.5 py-0.5 text-[11px] font-medium text-ink">
                      Most popular
                    </span>
                  )}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-[48px] font-bold leading-none tracking-tight">
                    {tier.price}
                  </span>
                  <span className={"text-[14px] " + (tier.featured ? "text-background/60" : "text-ink-40")}>
                    {tier.cadence}
                  </span>
                </div>
                <p className={"text-[15px] leading-[1.55] " + (tier.featured ? "text-background/75" : "text-ink-60")}>
                  {tier.description}
                </p>
                <div className={"h-px " + (tier.featured ? "bg-background/15" : "bg-ink-08")} />
                <ul className="flex flex-col gap-3">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[14px] leading-[1.55]">
                      <Check className={"mt-0.5 size-4 shrink-0 " + (tier.featured ? "text-amber" : "text-[oklch(0.55_0.13_78)]")} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <BookCallLink
                source="pricing-page"
                className={[
                  "group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full text-[14px] font-medium transition-all",
                  tier.featured
                    ? "bg-amber text-ink hover:bg-amber/90"
                    : "bg-primary text-primary-foreground hover:bg-primary/90",
                ].join(" ")}
              >
                {tier.price === "Custom" ? "Talk to us" : "Get started"}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </BookCallLink>
            </div>
          ))}
        </div>
      </section>

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
