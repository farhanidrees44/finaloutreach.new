import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { SiteNavigation } from "@/components/site/site-navigation"
import { Footer } from "@/components/site/footer"

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "The page you are looking for has moved or no longer exists. Browse our services, case studies, or book a free strategy call.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/404" },
}

const SUGGESTED = [
  { href: "/services", label: "Browse all services" },
  { href: "/case-studies", label: "See client case studies" },
  { href: "/pricing", label: "Compare pricing plans" },
  { href: "/blog", label: "Read the outbound blog" },
  { href: "/contact", label: "Talk to our team" },
]

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-background text-ink">
      <SiteNavigation />
      <main id="main">
        <section className="mx-auto flex min-h-[80vh] max-w-7xl flex-col items-center justify-center px-6 pt-28 pb-16 text-center md:pb-24 md:pt-32">
          <div className="flex items-center gap-3 text-[12px] uppercase tracking-[0.18em] text-ink-40">
            <span className="h-px w-8 bg-ink-08" />
            <span>Error 404</span>
            <span className="h-px w-8 bg-ink-08" />
          </div>

          <h1 className="mt-6 max-w-3xl text-balance text-[44px] font-extrabold leading-[1.1] tracking-tight sm:text-[64px] md:text-[80px]">
            This page took{" "}
            <span className="font-serif-italic text-[oklch(0.55_0.13_78)]">
              a wrong turn
            </span>
            .
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-[17px] leading-[1.6] text-ink-60 sm:text-[18px]">
            The link is broken or the page has moved. Here are a few useful
            places to head next.
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-[15px] font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.97]"
              aria-label="Return to the FinalOutreach homepage"
            >
              Back to homepage
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-ink-08 px-6 text-[15px] font-medium text-ink transition-all hover:border-ink/30"
              aria-label="Contact the FinalOutreach team"
            >
              Talk to a human
            </Link>
          </div>

          <nav aria-label="Suggested pages" className="mt-16 w-full max-w-xl">
            <p className="text-[12px] uppercase tracking-[0.18em] text-ink-40">
              Or try one of these
            </p>
            <ul className="mt-6 divide-y divide-ink-08 border-y border-ink-08">
              {SUGGESTED.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="group flex items-center justify-between py-4 text-left text-[15px] text-ink transition-colors hover:text-primary"
                  >
                    <span className="link-underline">{s.label}</span>
                    <ArrowUpRight className="size-4 text-ink-40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </section>
      </main>
      <Footer />
    </div>
  )
}
