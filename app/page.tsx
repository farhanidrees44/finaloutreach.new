import type { Metadata } from "next"
import { Navigation } from "@/components/site/navigation"
import { Hero } from "@/components/site/hero"
import { OurStackMarquee } from "@/components/site/our-stack-marquee"
import { Certifications } from "@/components/site/certifications"
import { CampaignProofGallery } from "@/components/site/campaign-proof"
import { BookingsProof } from "@/components/site/bookings-proof"
import { ResultsBar } from "@/components/site/results-bar"
import { Services } from "@/components/site/services"
import { Process } from "@/components/site/process"
import { CaseStudies } from "@/components/site/case-studies"
import { Testimonials } from "@/components/site/testimonials"
import { Faq } from "@/components/site/faq"
import { Pricing } from "@/components/site/pricing"
import { FinalCta } from "@/components/site/final-cta"
import { Footer } from "@/components/site/footer"
import { StickyMobileCta } from "@/components/site/sticky-mobile-cta"
import { SmoothScroll } from "@/components/site/smooth-scroll"
import { JsonLd } from "@/components/seo/json-ld"
import {
  organizationSchema,
  websiteSchema,
  serviceSchema,
  faqSchema,
} from "@/lib/seo/schemas"
import { HOMEPAGE_FAQ } from "@/data/homepage-faq"
import { SITE } from "@/lib/site-data"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Cold Email & Appointment Setting Agency",
  description:
    "Done-for-you cold email, LinkedIn outreach, and appointment setting for B2B teams — run by operators who live in the tools, not slide decks.",
  alternates: { canonical: "/" },
  openGraph: {
    title: `Cold Email & Appointment Setting — ${SITE.name}`,
    description:
      "Operators who run cold email, LinkedIn, and appointment setting end-to-end for B2B teams.",
    url: SITE.domain,
  },
}

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          websiteSchema(),
          serviceSchema(),
          faqSchema(
            HOMEPAGE_FAQ.map((item) => ({
              question: item.question,
              answer: item.answer,
            })),
          ),
        ]}
      />
      <SmoothScroll>
        <div className="relative min-h-screen bg-background text-ink">
          <Navigation />
          <main id="main">
            <Hero />
            <OurStackMarquee />
            <Certifications />
            <CampaignProofGallery />
            <BookingsProof />
            <ResultsBar />
            <Services />
            <Process />
            <CaseStudies />
            <Testimonials />
            <Faq />
            <Pricing />
            <FinalCta />
          </main>
          <Footer />
          <StickyMobileCta />
        </div>
      </SmoothScroll>
    </>
  )
}
