import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PageShell } from "@/components/site/page-shell"
import { JsonLd } from "@/components/seo/json-ld"
import { articleSchema, breadcrumbsSchema, organizationSchema } from "@/lib/seo/schemas"
import { BLOG_POSTS, SITE } from "@/lib/site-data"
import { CtaButton } from "@/components/site/cta-button"
import { RelatedLinks } from "@/components/site/related-links"
import { Prose, extractHeadings } from "@/components/site/prose"
import { Avatar } from "@/components/site/avatar"
import { authorSlug } from "@/lib/authors"

type Params = { slug: string }

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)
  if (!post) return { title: "Post not found" }

  const ogImage = `/api/og?title=${encodeURIComponent(post.title)}&kicker=${encodeURIComponent(post.category)}`

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
      tags: [post.category, "cold email", "B2B outreach", "lead generation"],
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)
  if (!post) notFound()

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3)
  const fallback = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3)
  const finalRelated = (related.length >= 2 ? related : fallback).slice(0, 3)

  const headings = extractHeadings(post.body).filter((h) => h.level === 2)
  const wordCount = post.body.split(/\s+/).filter(Boolean).length
  const aSlug = authorSlug(post.author.name)
  const updated = post.date

  return (
    <PageShell
      eyebrow={post.category}
      title={post.title}
      description={post.description}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Blog", href: "/blog" },
        { label: post.title },
      ]}
    >
      <JsonLd
        data={[
          articleSchema({
            title: post.title,
            description: post.description,
            slug: `/blog/${post.slug}`,
            datePublished: post.date,
            dateModified: post.date,
            authorName: post.author.name,
            authorSlug: aSlug,
          }),
          breadcrumbsSchema([
            { name: "Home", url: SITE.domain },
            { name: "Blog", url: `${SITE.domain}/blog` },
            { name: post.title, url: `${SITE.domain}/blog/${post.slug}` },
          ]),
          organizationSchema(),
        ]}
      />

      <article>
        <header className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">{post.category}</span>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </time>
          <span aria-hidden>·</span>
          <span>{post.readingMinutes} min read</span>
          <span aria-hidden>·</span>
          <span>{wordCount.toLocaleString()} words</span>
        </header>

        <div className="mb-10 flex items-center gap-3 rounded-xl border border-border bg-card/40 p-4">
          <Avatar name={post.author.name} size={44} />
          <div className="text-sm leading-tight">
            <Link
              href={`/authors/${aSlug}`}
              className="font-semibold text-foreground transition-colors hover:text-primary"
            >
              {post.author.name}
            </Link>
            <div className="text-muted-foreground">{post.author.role}</div>
          </div>
          <Link
            href={`/authors/${aSlug}`}
            className="ml-auto rounded-md border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:border-primary hover:text-primary"
          >
            More from {post.author.name.split(" ")[0]}
          </Link>
        </div>

        {headings.length >= 3 && (
          <nav
            aria-label="Table of contents"
            className="mb-12 rounded-xl border border-border bg-muted/30 p-5"
          >
            <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              On this page
            </div>
            <ol className="space-y-1.5 text-sm">
              {headings.map((h, i) => (
                <li key={h.id} className="leading-snug">
                  <a
                    href={`#${h.id}`}
                    className="text-foreground/80 transition-colors hover:text-primary"
                  >
                    <span className="mr-2 font-mono text-xs text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {h.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <Prose body={post.body} className="max-w-none" />

        <footer className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground">
          <div>
            Last reviewed{" "}
            <time dateTime={updated}>
              {new Date(updated).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </time>
            {" · "}
            <Link href={`/authors/${aSlug}`} className="hover:text-primary">
              By {post.author.name}
            </Link>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 transition-colors hover:border-primary hover:text-primary"
          >
            ← Back to all posts
          </Link>
        </footer>

        <aside className="mt-12 rounded-2xl border border-border bg-card p-8 md:p-10">
          <h2 className="font-serif text-2xl text-balance md:text-3xl">
            Want us to run this playbook for your team?
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            We have booked 12,400+ qualified meetings using exactly the frameworks above. If you would rather not run
            it yourself, we will run it for you.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <CtaButton href={SITE.calendly}>Book a strategy call</CtaButton>
            <Link
              href="/services/cold-email"
              className="inline-flex items-center justify-center rounded-md border border-border px-5 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
            >
              See cold email service
            </Link>
          </div>
        </aside>
      </article>

      <div className="mt-20">
        <RelatedLinks
          title="Keep reading"
          links={finalRelated.map((p) => ({
            href: `/blog/${p.slug}`,
            label: p.title,
            description: p.excerpt,
          }))}
        />
      </div>
    </PageShell>
  )
}
