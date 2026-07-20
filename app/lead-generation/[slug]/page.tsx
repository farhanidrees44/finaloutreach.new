import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PageShell } from "@/components/site/page-shell"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbsSchema, faqSchema, serviceSchema } from "@/lib/seo/schemas"
import { SITE } from "@/lib/site-data"
import { CITY_PROFILES, getCity } from "@/lib/pseo/cities"
import { CtaButton } from "@/components/site/cta-button"
import { RelatedLinks } from "@/components/site/related-links"

type Params = { slug: string }

export function generateStaticParams() {
  return CITY_PROFILES.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const city = getCity(slug)
  if (!city) return { title: "City not found" }
  return {
    title: city.metaTitle,
    description: city.metaDescription,
    alternates: { canonical: `/lead-generation/${slug}` },
    openGraph: {
      title: city.metaTitle,
      description: city.metaDescription,
      url: `${SITE.domain}/lead-generation/${slug}`,
      type: "website",
    },
  }
}

export default async function LeadGenCityPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const city = getCity(slug)
  if (!city) notFound()

  const others = CITY_PROFILES.filter((c) => c.slug !== slug).slice(0, 6)

  return (
    <PageShell
      eyebrow={`${city.region} · Lead generation`}
      title={`B2B lead generation in ${city.name}`}
      italicize={city.name}
      description={city.verdict}
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
            name: `Lead generation services in ${city.name}`,
            description: city.metaDescription,
            slug: `/lead-generation/${slug}`,
          }),
          faqSchema(city.faqs.map((f) => ({ question: f.q, answer: f.a }))),
        ]}
      />

      <p className="mb-4 text-[13px] font-medium text-ink-40">
        Last reviewed {city.lastReviewed} · {city.country}
      </p>
      <p className="mb-12 max-w-3xl text-[16px] font-medium leading-[1.7] text-ink-60">
        {city.intro}
      </p>

      <section className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {city.marketNotes.map((note) => (
          <div
            key={note}
            className="rounded-2xl border border-ink-08 bg-card p-5 text-[13.5px] font-medium leading-[1.55] text-ink-60"
          >
            {note}
          </div>
        ))}
      </section>

      <section className="mb-16 grid gap-5 md:grid-cols-2">
        <div className="rounded-3xl border border-ink-08 bg-card p-7">
          <h2 className="text-[18px] font-extrabold tracking-tight text-ink">
            Common ICPs from {city.name} HQs
          </h2>
          <ul className="mt-4 space-y-3">
            {city.commonIcps.map((icp) => (
              <li
                key={icp}
                className="flex gap-2.5 text-[14.5px] font-medium leading-[1.55] text-ink-60"
              >
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-electric-blue" />
                <span>{icp}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-5">
          <div className="rounded-3xl border border-ink-08 bg-cream/50 p-7">
            <h2 className="text-[18px] font-extrabold tracking-tight text-ink">
              Send timing
            </h2>
            <p className="mt-3 text-[14.5px] font-medium leading-[1.65] text-ink-60">
              {city.timing}
            </p>
          </div>
          <div className="rounded-3xl border border-ink-08 bg-card p-7">
            <h2 className="text-[18px] font-extrabold tracking-tight text-ink">
              Compliance posture
            </h2>
            <p className="mt-3 text-[14.5px] font-medium leading-[1.65] text-ink-60">
              {city.compliance}
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16 space-y-10">
        <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight text-ink">
          The {city.name} outbound playbook
        </h2>
        {city.playbook.map((block) => (
          <article
            key={block.heading}
            className="rounded-3xl border border-ink-08 bg-card p-7 shadow-[0_12px_40px_-24px_rgba(15,15,15,0.18)]"
          >
            <h3 className="text-[17px] font-bold tracking-tight text-ink">
              {block.heading}
            </h3>
            <p className="mt-3 text-[15px] font-medium leading-[1.7] text-ink-60">
              {block.body}
            </p>
          </article>
        ))}
      </section>

      <section className="mb-16">
        <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight text-ink">
          {city.name} FAQ
        </h2>
        <ul className="mt-8 divide-y divide-ink-08 border-y border-ink-08">
          {city.faqs.map((f) => (
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
          Ready for predictable pipeline from a {city.name} HQ?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[15px] font-semibold leading-[1.65] text-ink-60">
          Book a strategy call for a 90-day outbound plan matched to your ICP —
          even if you never become a client. See{" "}
          <Link
            href="/results"
            className="font-bold text-ink underline decoration-electric-blue/40 underline-offset-2"
          >
            live proof
          </Link>{" "}
          for verified campaign metrics we can publish.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <CtaButton href={SITE.calendly}>Book a strategy call</CtaButton>
          <Link
            href="/services/cold-email"
            className="inline-flex h-12 items-center rounded-full border border-ink-08 px-6 text-[14.5px] font-semibold text-ink transition-colors hover:border-ink/30"
          >
            See cold email service
          </Link>
        </div>
      </section>

      <RelatedLinks
        title="Other markets"
        links={others.map((c) => ({
          href: `/lead-generation/${c.slug}`,
          label: `Lead generation in ${c.name}`,
          description: c.region,
        }))}
      />
    </PageShell>
  )
}
