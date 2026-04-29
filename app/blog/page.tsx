import type { Metadata } from "next"
import Link from "next/link"
import { PageShell } from "@/components/site/page-shell"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbsSchema, organizationSchema } from "@/lib/seo/schemas"
import { BLOG_POSTS, SITE } from "@/lib/site-data"
import { SectionEyebrow } from "@/components/site/section-eyebrow"
import { CtaButton } from "@/components/site/cta-button"

export const metadata: Metadata = {
  title: "Cold email and B2B outreach blog",
  description:
    "Tactics, templates, and teardowns from the team that has booked 12,400+ B2B meetings. Cold email, LinkedIn outreach, deliverability, and lead generation.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Cold email and B2B outreach blog | FinalOutreach",
    description: "Tactics, templates, and teardowns from the team behind 12,400+ booked meetings.",
    url: "/blog",
    type: "website",
  },
}

const CATEGORIES = ["All", "Cold Email", "LinkedIn", "Strategy", "Case Studies", "Tools"] as const

export default function BlogIndexPage() {
  const featured = BLOG_POSTS.find((p) => p.featured) ?? BLOG_POSTS[0]
  const rest = BLOG_POSTS.filter((p) => p.slug !== featured.slug)

  return (
    <PageShell
      eyebrow="The blog"
      title="Cold email tactics, frameworks, and teardowns."
      description="Everything we have learned booking 12,400+ qualified meetings — distilled into long-form posts you can actually use."
    >
      <JsonLd
        data={[
          breadcrumbsSchema([
            { name: "Home", url: SITE.domain },
            { name: "Blog", url: `${SITE.domain}/blog` },
          ]),
          organizationSchema(),
        ]}

      />

      <section className="mb-16">
        <SectionEyebrow>Featured</SectionEyebrow>
        <Link
          href={`/blog/${featured.slug}`}
          className="group mt-4 grid gap-8 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50 md:grid-cols-2 md:p-10"
        >
          <div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">{featured.category}</span>
              <time dateTime={featured.date}>
                {new Date(featured.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </time>
              <span>·</span>
              <span>{featured.readingMinutes} min read</span>
            </div>
            <h2 className="mt-4 font-serif text-3xl text-balance md:text-4xl">{featured.title}</h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{featured.excerpt}</p>
            <div className="mt-6 inline-flex items-center gap-2 text-primary">
              Read the article
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center rounded-xl border border-border bg-background p-8">
            <div className="max-w-sm">
              <div className="font-serif text-7xl text-primary">{featured.readingMinutes}</div>
              <div className="mt-2 text-sm uppercase tracking-wider text-muted-foreground">Minutes</div>
              <p className="mt-6 leading-relaxed text-foreground/80">By {featured.author.name}</p>
              <p className="text-sm text-muted-foreground">{featured.author.role}</p>
            </div>
          </div>
        </Link>
      </section>

      <section className="mb-16">
        <SectionEyebrow>Browse by topic</SectionEyebrow>
        <ul className="mt-4 flex flex-wrap gap-3">
          {CATEGORIES.map((c) => (
            <li key={c}>
              <Link
                href={c === "All" ? "/blog" : `/blog/category/${c.toLowerCase().replace(/\s+/g, "-")}`}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm transition-colors hover:border-primary hover:text-primary"
              >
                {c}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <SectionEyebrow>All posts</SectionEyebrow>
        <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/blog/${p.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
              >
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 font-medium text-primary">{p.category}</span>
                  <time dateTime={p.date}>
                    {new Date(p.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </time>
                </div>
                <h3 className="mt-4 font-serif text-xl leading-snug text-balance">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
                <div className="mt-6 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{p.readingMinutes} min read</span>
                  <span className="text-primary">
                    Read
                    <span aria-hidden="true" className="ml-1 inline-block transition-transform group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20 rounded-2xl border border-border bg-card p-8 text-center md:p-12">
        <h2 className="font-serif text-3xl text-balance md:text-4xl">Want this delivered every Tuesday?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
          Join 8,200+ founders and revenue leaders getting our best cold email tactics in their inbox each week.
          Unsubscribe whenever.
        </p>
        <div className="mt-8 flex justify-center">
          <CtaButton href="/contact">Subscribe to the newsletter</CtaButton>
        </div>
      </section>
    </PageShell>
  )
}
