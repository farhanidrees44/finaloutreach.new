import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PageShell } from "@/components/site/page-shell"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbsSchema, organizationSchema, personSchema } from "@/lib/seo/schemas"
import { AUTHORS, findAuthor } from "@/lib/authors"
import { Avatar } from "@/components/site/avatar"
import { BLOG_POSTS, SITE } from "@/lib/site-data"

type Params = { slug: string }

export function generateStaticParams() {
  return AUTHORS.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const a = findAuthor(slug)
  if (!a) return { title: "Author not found" }
  const og = `/api/og?title=${encodeURIComponent(a.name)}&kicker=${encodeURIComponent(a.role)}`
  return {
    title: `${a.name} — ${a.role}`,
    description: a.bio.slice(0, 160),
    alternates: { canonical: `/authors/${a.slug}` },
    openGraph: {
      title: `${a.name} · ${SITE.name}`,
      description: a.bio.slice(0, 160),
      url: `/authors/${a.slug}`,
      type: "profile",
      images: [{ url: og, width: 1200, height: 630, alt: a.name }],
    },
    twitter: { card: "summary_large_image", title: a.name, description: a.bio.slice(0, 160), images: [og] },
  }
}

export default async function AuthorPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const a = findAuthor(slug)
  if (!a) notFound()

  const posts = BLOG_POSTS.filter((p) => p.author.name === a.name)
    .slice()
    .sort((x, y) => (x.date < y.date ? 1 : -1))

  return (
    <PageShell
      eyebrow="Author"
      title={a.name}
      description={a.role}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Authors", href: "/authors" },
        { label: a.name },
      ]}
    >
      <JsonLd
        data={[
          personSchema({
            name: a.name,
            slug: a.slug,
            role: a.role,
            bio: a.bio,
            expertise: a.expertise,
            sameAs: a.links.filter((l) => l.href.startsWith("http")).map((l) => l.href),
          }),
          breadcrumbsSchema([
            { name: "Home", url: SITE.domain },
            { name: "Authors", url: `${SITE.domain}/authors` },
            { name: a.name, url: `${SITE.domain}/authors/${a.slug}` },
          ]),
          organizationSchema(),
        ]}
      />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[280px_1fr]">
        <aside className="flex flex-col items-start gap-5">
          <Avatar name={a.name} size={140} className="text-4xl" />
          <div>
            <div className="text-lg font-semibold text-foreground">{a.name}</div>
            <div className="text-sm text-muted-foreground">{a.role}</div>
          </div>
          <dl className="grid w-full grid-cols-2 gap-3 rounded-xl border border-border bg-card p-4 text-sm">
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted-foreground">Experience</dt>
              <dd className="mt-1 font-semibold text-foreground">{a.yearsExperience}+ years</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted-foreground">Articles</dt>
              <dd className="mt-1 font-semibold text-foreground">{posts.length}</dd>
            </div>
          </dl>
          <ul className="flex flex-wrap gap-2 text-sm">
            {a.links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  className="inline-flex items-center rounded-md border border-border px-3 py-1.5 transition-colors hover:border-primary hover:text-primary"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        <div className="space-y-12">
          <section>
            <h2 className="font-serif text-2xl text-balance md:text-3xl">About {a.name.split(" ")[0]}</h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-foreground/90">{a.bio}</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-balance md:text-3xl">Areas of expertise</h2>
            <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {a.expertise.map((e) => (
                <li
                  key={e}
                  className="rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground/90"
                >
                  {e}
                </li>
              ))}
            </ul>
          </section>

          {posts.length > 0 && (
            <section>
              <h2 className="font-serif text-2xl text-balance md:text-3xl">
                Articles by {a.name.split(" ")[0]}
              </h2>
              <ol className="mt-6 space-y-3">
                {posts.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="group flex flex-col gap-1 rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40"
                    >
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 font-medium text-primary">
                          {p.category}
                        </span>
                        <time dateTime={p.date}>
                          {new Date(p.date).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </time>
                        <span aria-hidden>·</span>
                        <span>{p.readingMinutes} min read</span>
                      </div>
                      <div className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                        {p.title}
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
                    </Link>
                  </li>
                ))}
              </ol>
            </section>
          )}
        </div>
      </div>
    </PageShell>
  )
}
