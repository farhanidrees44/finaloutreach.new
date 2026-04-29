import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PageShell } from "@/components/site/page-shell"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbsSchema } from "@/lib/seo/schemas"
import { BLOG_POSTS, SITE, type BlogPost } from "@/lib/site-data"

const CATEGORY_MAP: Record<string, BlogPost["category"]> = {
  "cold-email": "Cold Email",
  linkedin: "LinkedIn",
  strategy: "Strategy",
  "case-studies": "Case Studies",
  tools: "Tools",
}

type Params = { slug: string }

export function generateStaticParams() {
  return Object.keys(CATEGORY_MAP).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const cat = CATEGORY_MAP[slug]
  if (!cat) return { title: "Category not found" }
  return {
    title: `${cat} articles`,
    description: `Every ${cat.toLowerCase()} article from FinalOutreach — tactics, frameworks, and teardowns from a team that has booked 12,400+ B2B meetings.`,
    alternates: { canonical: `/blog/category/${slug}` },
  }
}

export default async function BlogCategoryPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const cat = CATEGORY_MAP[slug]
  if (!cat) notFound()

  const posts = BLOG_POSTS.filter((p) => p.category === cat)

  return (
    <PageShell
      eyebrow={`Category: ${cat}`}
      title={`${cat} articles`}
      description={`Every article we have published in ${cat}. Practical, no-fluff tactics from our work booking 12,400+ qualified meetings.`}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Blog", href: "/blog" },
        { label: cat },
      ]}
    >
      <JsonLd
        data={breadcrumbsSchema([
          { name: "Home", url: SITE.domain },
          { name: "Blog", url: `${SITE.domain}/blog` },
          { name: cat, url: `${SITE.domain}/blog/category/${slug}` },
        ])}
      />
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/blog/${p.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
            >
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <time dateTime={p.date}>
                  {new Date(p.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </time>
                <span>·</span>
                <span>{p.readingMinutes} min read</span>
              </div>
              <h3 className="mt-4 font-serif text-xl leading-snug text-balance">{p.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
              <span className="mt-6 text-sm text-primary">
                Read article
                <span aria-hidden="true" className="ml-1 inline-block transition-transform group-hover:translate-x-1">
                  &rarr;
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  )
}
