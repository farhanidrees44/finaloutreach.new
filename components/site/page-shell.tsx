import type { ReactNode } from "react"
import Link from "next/link"
import { ChevronRight, ArrowRight } from "lucide-react"
import { SiteNavigation } from "./site-navigation"
import { Footer } from "./footer"
import { StickyMobileCta } from "./sticky-mobile-cta"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbSchema } from "@/lib/seo/schemas"
import { SITE } from "@/lib/site-data"

export type Crumb = { name?: string; label?: string; href?: string }

export function PageShell({
  children,
  breadcrumbs,
  eyebrow,
  title,
  description,
  italicize,
  cta = true,
}: {
  children: ReactNode
  breadcrumbs?: Crumb[]
  eyebrow?: string
  title?: string
  description?: string
  italicize?: string
  cta?: boolean
}) {
  // Normalize breadcrumb shape: support both { name, href } and { label, href }
  const normalized = breadcrumbs?.map((c) => ({
    name: c.name ?? c.label ?? "",
    href: c.href ?? "#",
  }))

  return (
    <div className="relative min-h-screen bg-background text-ink">
      {normalized && normalized.length > 0 && (
        <JsonLd data={breadcrumbSchema(normalized)} />
      )}
      <SiteNavigation />
      <main id="main">
        {title ? (
          <>
            {normalized && normalized.length > 0 && <Breadcrumbs items={normalized} />}
            <PageHeader
              eyebrow={eyebrow ?? ""}
              title={title}
              description={description}
              italicize={italicize}
            />
            <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12 pb-16">{children}</div>
            {cta && <PageCta />}
          </>
        ) : (
          children
        )}
      </main>
      <Footer />
      <StickyMobileCta />
    </div>
  )
}

export function Breadcrumbs({ items }: { items: { name: string; href: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12 pt-28">
      <ol className="flex flex-wrap items-center gap-1.5 text-[12.5px] text-ink-40">
        {items.map((item, idx) => (
          <li key={`${item.href}-${idx}`} className="flex items-center gap-1.5">
            {idx > 0 && <ChevronRight className="size-3 text-ink-40" />}
            {idx === items.length - 1 ? (
              <span className="text-ink-60">{item.name}</span>
            ) : (
              <Link href={item.href} className="transition-colors hover:text-ink">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function PageHeader({
  eyebrow,
  title,
  description,
  italicize,
}: {
  eyebrow: string
  title: string
  description?: string
  italicize?: string
}) {
  const displayTitle = italicize
    ? title.split(italicize).flatMap((part, i, arr) =>
        i < arr.length - 1
          ? [
              part,
              <span
                key={i}
                className="font-serif-italic text-electric-blue"
              >
                {italicize}
              </span>,
            ]
          : [part],
      )
    : title

  return (
    <section className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12 pb-16 pt-10 md:pb-24 md:pt-14">
      {eyebrow && (
        <div className="flex items-center gap-3 text-[12px] uppercase tracking-[0.18em] text-ink-40">
          <span className="h-px w-8 bg-ink-08" />
          <span>{eyebrow}</span>
        </div>
      )}
      <h1 className="mt-6 max-w-4xl text-balance text-[40px] font-extrabold leading-[1.1] tracking-tight sm:text-[56px] md:text-[72px]">
        {displayTitle}
      </h1>
      {description && (
        <p className="mt-6 max-w-2xl text-pretty text-[17px] leading-[1.6] text-ink-60 sm:text-[18px]">
          {description}
        </p>
      )}
    </section>
  )
}

export function PageCta({
  title = "Ready to see what our outbound engine can do for you?",
  subtitle = "Book a 30-minute strategy call. We will tell you honestly if we can help.",
}: {
  title?: string
  subtitle?: string
}) {
  return (
    <section className="border-t border-ink-08 bg-cream">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 py-20 text-center md:py-28">
        <h2 className="max-w-3xl text-balance text-[36px] font-bold leading-[1.05] tracking-tight sm:text-[48px]">
          {title}
        </h2>
        <p className="max-w-xl text-pretty text-[16px] leading-[1.6] text-ink-60">
          {subtitle}
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <a
            href={SITE.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-[15px] font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.97]"
          >
            Book a strategy call
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <Link
            href="/results"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-ink-08 px-6 text-[15px] font-semibold text-ink transition-all hover:border-ink/30"
          >
            See live proof
          </Link>
        </div>
      </div>
    </section>
  )
}
