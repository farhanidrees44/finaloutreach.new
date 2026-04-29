import type { Metadata } from "next"
import Link from "next/link"
import { PageShell } from "@/components/site/page-shell"
import { AUTHORS } from "@/lib/authors"
import { Avatar } from "@/components/site/avatar"
import { SITE } from "@/lib/site-data"

export const metadata: Metadata = {
  title: "Authors",
  description:
    "Meet the team behind FinalOutreach's writing — practitioners with first-hand experience running outbound at scale.",
  alternates: { canonical: "/authors" },
  openGraph: {
    title: `Authors · ${SITE.name}`,
    description: "Meet the people behind our writing — practitioners, not just writers.",
    url: "/authors",
  },
}

export default function AuthorsIndexPage() {
  return (
    <PageShell
      eyebrow="Authors"
      title="The people behind our writing"
      description="Every article on this site is written by someone who has done the work. No ghost writers, no AI fluff."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Authors" },
      ]}
    >
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {AUTHORS.map((a) => (
          <li key={a.slug}>
            <Link
              href={`/authors/${a.slug}`}
              className="group flex flex-col gap-5 rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md md:p-8"
            >
              <div className="flex items-center gap-4">
                <Avatar name={a.name} size={64} className="text-xl" />
                <div className="leading-tight">
                  <div className="text-lg font-semibold text-foreground">{a.name}</div>
                  <div className="text-sm text-muted-foreground">{a.role}</div>
                </div>
              </div>
              <p className="text-pretty text-[15px] leading-relaxed text-muted-foreground">{a.bio}</p>
              <div className="mt-auto flex flex-wrap gap-2 text-xs">
                {a.expertise.slice(0, 3).map((e) => (
                  <span key={e} className="rounded-full bg-muted px-2.5 py-1 text-foreground/70">
                    {e}
                  </span>
                ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  )
}
