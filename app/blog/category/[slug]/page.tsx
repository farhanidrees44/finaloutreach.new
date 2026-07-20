import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PageShell } from "@/components/site/page-shell"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbsSchema } from "@/lib/seo/schemas"
import { BLOG_POSTS, SITE } from "@/lib/site-data"
import {
  BLOG_CATEGORY_MAP,
  getIndexedBlogCategories,
} from "@/lib/blog-categories"

type Params = { slug: string }

export function generateStaticParams() {
  return getIndexedBlogCategories().map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const cat = BLOG_CATEGORY_MAP[slug]
  const hasPosts = cat && BLOG_POSTS.some((p) => p.category === cat)
  if (!cat || !hasPosts) {
    return {
      title: "Category not found",
      robots: { index: false, follow: false },
    }
  }
  return {
    title: `${cat} articles`,
    description: `Every ${cat.toLowerCase()} article from FinalOutreach — tactics, frameworks, and teardowns on cold email and B2B outbound.`,
    alternates: { canonical: `/blog/category/${slug}` },
  }
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const cat = BLOG_CATEGORY_MAP[slug]
  if (!cat) notFound()

  const posts = BLOG_POSTS.filter((p) => p.category === cat)
  if (posts.length === 0) notFound()

  return (
    <PageShell
      eyebrow={`Category: ${cat}`}
      title={`${cat} articles`}
      description={`Every article we have published in ${cat}. Practical, no-fluff tactics from live outbound work.`}
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
              className="group flex h-full flex-col rounded-3xl border border-ink-08 bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/25"
            >
              <div className="flex items-center gap-3 text-[12px] font-medium text-ink-40">
                <time dateTime={p.date}>
                  {new Date(p.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
                <span>·</span>
                <span>{p.readingMinutes} min read</span>
              </div>
              <h3 className="mt-4 text-[18px] font-extrabold leading-snug tracking-tight text-ink text-balance">
                {p.title}
              </h3>
              <p className="mt-3 flex-1 text-[14px] font-medium leading-[1.6] text-ink-60">
                {p.excerpt}
              </p>
              <span className="mt-6 text-[13.5px] font-semibold text-electric-blue">
                Read article
                <span
                  aria-hidden="true"
                  className="ml-1 inline-block transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  )
}
