import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Calendar, Mail, MapPin } from "lucide-react"
import { Breadcrumbs, PageHeader, PageShell } from "@/components/site/page-shell"
import { ContactForm } from "./contact-form"
import { SITE } from "@/lib/site-data"

export const metadata: Metadata = {
  title: "Contact — Book a strategy call",
  description:
    "Book a 30-minute strategy call with our team. We will tell you honestly if we can help fill your pipeline.",
  alternates: { canonical: "/contact" },
}

export default function ContactPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Contact", href: "/contact" },
  ]
  return (
    <PageShell breadcrumbs={crumbs}>
      <Breadcrumbs items={crumbs} />
      <PageHeader
        eyebrow="Contact"
        title="Book a 30-minute strategy call."
        italicize="strategy"
        description="Drop a few details and we will come back inside a business day. Or skip the form and grab a slot on the calendar directly."
      />

      <section className="border-t border-ink-08">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 md:py-24 lg:grid-cols-[1.2fr_1fr]">
          <ContactForm />

          <aside className="flex flex-col gap-6">
            <div className="rounded-2xl border border-ink-08 bg-cream p-7">
              <div className="flex items-center gap-3 text-[12px] uppercase tracking-[0.18em] text-ink-40">
                <Calendar className="size-3.5" />
                <span>Grab a time directly</span>
              </div>
              <p className="mt-4 text-[16px] leading-[1.55] text-ink">
                Skip the form and book a 30-minute slot with our team on
                Calendly.
              </p>
              <Link
                href={SITE.calendly}
                className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-primary px-5 text-[14px] font-medium text-primary-foreground transition-all hover:bg-primary/90"
              >
                Open Calendly <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="flex flex-col gap-4 rounded-2xl border border-ink-08 bg-card p-7">
              <div className="flex items-center gap-3 text-[13.5px] text-ink">
                <Mail className="size-4 text-ink-40" />
                <a href={`mailto:${SITE.email}`} className="hover:underline">
                  {SITE.email}
                </a>
              </div>
              <div className="flex items-center gap-3 text-[13.5px] text-ink">
                <MapPin className="size-4 text-ink-40" />
                <span>{SITE.location}</span>
              </div>
            </div>

            <div className="rounded-2xl border border-ink-08 bg-card p-7">
              <p className="text-[12px] uppercase tracking-[0.18em] text-ink-40">
                Response time
              </p>
              <p className="mt-3 text-[15px] leading-[1.55] text-ink">
                Every inbound reply is read by a human. Expect a response
                inside one business day.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </PageShell>
  )
}
