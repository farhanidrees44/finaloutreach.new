import { SiteNavigation } from "@/components/site/site-navigation"
import { Footer } from "@/components/site/footer"
import Link from "next/link"

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-dvh bg-background text-ink">
      <SiteNavigation />
      <main id="main" className="mx-auto w-full max-w-3xl px-6 py-20 md:py-28">
        <nav aria-label="Breadcrumb" className="mb-8 text-[13px] text-ink-60">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-ink">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-ink">Legal</li>
          </ol>
        </nav>
        <article className="prose-legal">{children}</article>
      </main>
      <Footer />
    </div>
  )
}
