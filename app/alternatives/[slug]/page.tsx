import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PageShell } from "@/components/site/page-shell"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbsSchema, faqSchema } from "@/lib/seo/schemas"
import { SITE } from "@/lib/site-data"
import {
  TOOL_ALTERNATIVE_PROFILES,
  getToolAlternative,
} from "@/lib/pseo/tools"
import { CtaButton } from "@/components/site/cta-button"
import { RelatedLinks } from "@/components/site/related-links"

type Params = { slug: string }

export function generateStaticParams() {
  return TOOL_ALTERNATIVE_PROFILES.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const tool = getToolAlternative(slug)
  if (!tool) return { title: "Alternative not found" }
  return {
    title: tool.metaTitle,
    description: tool.metaDescription,
    alternates: { canonical: `/alternatives/${slug}` },
    openGraph: {
      title: tool.metaTitle,
      description: tool.metaDescription,
      url: `${SITE.domain}/alternatives/${slug}`,
      type: "website",
    },
  }
}

export default async function AlternativesPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const tool = getToolAlternative(slug)
  if (!tool) notFound()

  const others = TOOL_ALTERNATIVE_PROFILES.filter((t) => t.slug !== slug)

  return (
    <PageShell
      eyebrow={`${tool.category} · Alternatives`}
      title={`${tool.name} alternatives for serious B2B teams`}
      italicize="alternatives"
      description={tool.verdict}
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
          faqSchema(tool.faqs.map((f) => ({ question: f.q, answer: f.a }))),
        ]}
      />

      <p className="mb-4 text-[13px] font-medium text-ink-40">
        Last reviewed {tool.lastReviewed}
      </p>
      <p className="mb-12 max-w-3xl text-[16px] font-medium leading-[1.7] text-ink-60">
        {tool.intro}
      </p>

      <section className="mb-16 grid gap-5 md:grid-cols-2">
        <div className="rounded-3xl border border-ink-08 bg-card p-7">
          <h2 className="text-[18px] font-extrabold tracking-tight text-ink">
            Where {tool.name} is strong
          </h2>
          <ul className="mt-4 space-y-3">
            {tool.strengths.map((s) => (
              <li
                key={s}
                className="flex gap-2.5 text-[14.5px] font-medium leading-[1.55] text-ink-60"
              >
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-emerald" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-ink-08 bg-card p-7">
          <h2 className="text-[18px] font-extrabold tracking-tight text-ink">
            Where it stops being enough
          </h2>
          <ul className="mt-4 space-y-3">
            {tool.limits.map((s) => (
              <li
                key={s}
                className="flex gap-2.5 text-[14.5px] font-medium leading-[1.55] text-ink-60"
              >
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-ink-20" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mb-16 grid gap-5 md:grid-cols-2">
        <div className="rounded-3xl border border-ink-08 bg-cream/40 p-7">
          <h2 className="text-[18px] font-extrabold tracking-tight text-ink">
            Stick with {tool.name} if
          </h2>
          <ul className="mt-4 space-y-3">
            {tool.stickIf.map((s) => (
              <li
                key={s}
                className="text-[14.5px] font-medium leading-[1.55] text-ink-60"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-electric-blue/25 bg-electric-blue/[0.03] p-7">
          <h2 className="text-[18px] font-extrabold tracking-tight text-ink">
            Choose a done-for-you team if
          </h2>
          <ul className="mt-4 space-y-3">
            {tool.switchIf.map((s) => (
              <li
                key={s}
                className="text-[14.5px] font-medium leading-[1.55] text-ink-60"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mb-16 space-y-10">
        {tool.deepDive.map((block) => (
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
          FAQ — {tool.name} alternatives
        </h2>
        <ul className="mt-8 divide-y divide-ink-08 border-y border-ink-08">
          {tool.faqs.map((f) => (
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
          Want us to audit your {tool.name} setup?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[15px] font-semibold leading-[1.65] text-ink-60">
          Infrastructure, copy, and lists reviewed in 48 hours. Keep the tool if
          it is healthy — we will say so.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <CtaButton href={SITE.calendly}>Get the free audit</CtaButton>
          <Link
            href="/services/cold-email"
            className="inline-flex h-12 items-center rounded-full border border-ink-08 px-6 text-[14.5px] font-semibold text-ink transition-colors hover:border-ink/30"
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
