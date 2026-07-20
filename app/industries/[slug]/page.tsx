import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { PageShell } from "@/components/site/page-shell"
import { RelatedLinks } from "@/components/site/related-links"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbsSchema, faqSchema, serviceSchema } from "@/lib/seo/schemas"
import { SITE } from "@/lib/site-data"
import {
  INDUSTRY_PAGE_PROFILES,
  getIndustryPage,
} from "@/lib/pseo/industry-pages"
import { CtaButton } from "@/components/site/cta-button"

type Params = { slug: string }

export function generateStaticParams() {
  return INDUSTRY_PAGE_PROFILES.map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const ind = getIndustryPage(slug)
  if (!ind) return { title: "Industry not found" }
  return {
    title: ind.metaTitle,
    description: ind.metaDescription,
    alternates: { canonical: `/industries/${ind.slug}` },
    openGraph: {
      title: ind.metaTitle,
      description: ind.metaDescription,
      url: `${SITE.domain}/industries/${ind.slug}`,
      type: "website",
    },
  }
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const ind = getIndustryPage(slug)
  if (!ind) notFound()

  const others = INDUSTRY_PAGE_PROFILES.filter((i) => i.slug !== ind.slug)

  return (
    <PageShell
      eyebrow={`Industry · ${ind.name}`}
      title={ind.headline}
      description={ind.verdict}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Industries", href: "/industries" },
        { label: ind.name },
      ]}
    >
      <JsonLd
        data={[
          breadcrumbsSchema([
            { name: "Home", url: SITE.domain },
            { name: "Industries", url: `${SITE.domain}/industries` },
            {
              name: ind.name,
              url: `${SITE.domain}/industries/${ind.slug}`,
            },
          ]),
          serviceSchema({
            name: `Lead generation for ${ind.nameLower}`,
            description: ind.metaDescription,
            slug: `/industries/${ind.slug}`,
          }),
          faqSchema(ind.faqs.map((f) => ({ question: f.q, answer: f.a }))),
        ]}
      />

      <p className="mb-4 text-[13px] font-medium text-ink-40">
        Last reviewed {ind.lastReviewed}
      </p>
      <p className="mb-12 max-w-3xl text-[16px] font-medium leading-[1.7] text-ink-60">
        {ind.intro}
      </p>

      <section className="mb-16 grid gap-5 lg:grid-cols-[1.35fr_0.9fr]">
        <div className="space-y-10">
          <div>
            <h2 className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-ink-40">
              Where {ind.nameLower} get stuck
            </h2>
            <ul className="mt-5 space-y-3">
              {ind.painPoints.map((p) => (
                <li
                  key={p}
                  className="flex gap-3 rounded-2xl border border-ink-08 bg-card p-4 text-[15px] font-medium leading-[1.55] text-ink"
                >
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-electric-blue" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight text-ink">
              How we approach {ind.nameLower}
            </h2>
            <p className="mt-4 max-w-2xl text-[16px] font-medium leading-[1.7] text-ink-60">
              {ind.approach}
            </p>
          </div>
        </div>

        <aside className="h-fit rounded-3xl border border-ink-08 bg-cream/60 p-7 lg:sticky lg:top-28">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-40">
            Focus
          </p>
          <p className="mt-3 text-[40px] font-extrabold leading-none tracking-tight text-ink">
            {ind.focus.value}
          </p>
          <p className="mt-3 text-[14px] font-medium leading-[1.55] text-ink-60">
            {ind.focus.label}
          </p>
          <div className="my-6 h-px bg-ink-08" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-40">
            Buying signals we watch
          </p>
          <ul className="mt-3 space-y-2">
            {ind.buyingSignals.map((s) => (
              <li
                key={s}
                className="text-[13.5px] font-medium leading-[1.5] text-ink-60"
              >
                {s}
              </li>
            ))}
          </ul>
          <CtaButton href={SITE.calendly} className="mt-7 w-full">
            Book a call about {ind.name}
          </CtaButton>
        </aside>
      </section>

      <section className="mb-16 space-y-5">
        <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight text-ink">
          The {ind.name} outbound playbook
        </h2>
        {ind.playbook.map((block) => (
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

      <section className="mb-16 rounded-3xl border border-ink-08 bg-card p-7">
        <h2 className="text-[18px] font-extrabold tracking-tight text-ink">
          What we will not do in {ind.name.toLowerCase()}
        </h2>
        <ul className="mt-4 space-y-3">
          {ind.whatWeWontDo.map((item) => (
            <li
              key={item}
              className="flex gap-2.5 text-[14.5px] font-medium leading-[1.55] text-ink-60"
            >
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-ink-20" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-16">
        <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight text-ink">
          FAQ — outbound for {ind.nameLower}
        </h2>
        <ul className="mt-8 divide-y divide-ink-08 border-y border-ink-08">
          {ind.faqs.map((f) => (
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
          Want a 90-day outbound plan for {ind.nameLower}?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[15px] font-semibold leading-[1.65] text-ink-60">
          Book a strategy call. We will map ICP, infrastructure, and meeting
          targets honestly — including where DIY tools are enough. See{" "}
          <Link
            href="/results"
            className="font-bold text-ink underline decoration-electric-blue/40 underline-offset-2"
          >
            live proof
          </Link>{" "}
          for metrics we can publish.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <CtaButton href={SITE.calendly}>Book a strategy call</CtaButton>
          {ind.relatedColdEmailFor ? (
            <Link
              href={`/cold-email-for/${ind.relatedColdEmailFor}`}
              className="inline-flex h-12 items-center rounded-full border border-ink-08 px-6 text-[14.5px] font-semibold text-ink transition-colors hover:border-ink/30"
            >
              Cold email playbook
            </Link>
          ) : (
            <Link
              href="/services/cold-email"
              className="inline-flex h-12 items-center rounded-full border border-ink-08 px-6 text-[14.5px] font-semibold text-ink transition-colors hover:border-ink/30"
            >
              Cold email service
            </Link>
          )}
        </div>
      </section>

      <RelatedLinks
        title="Other industries"
        links={others.map((i) => ({
          href: `/industries/${i.slug}`,
          label: i.name,
          description: i.verdict,
        }))}
      />
    </PageShell>
  )
}
