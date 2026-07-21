import type { Metadata } from "next"
import { SiteNavigation } from "@/components/site/site-navigation"
import { Hero } from "@/components/site/hero"
import { OurStackMarquee } from "@/components/site/our-stack-marquee"
import { Certifications } from "@/components/site/certifications"
import { ProcessSection } from "@/components/site/process-section"
import { CampaignProofGallery } from "@/components/site/campaign-proof"
import { BookingsProof } from "@/components/site/bookings-proof"
import { Services } from "@/components/site/services"
import { OperatorDifference } from "@/components/site/operator-difference"
import { Process } from "@/components/site/process"
import { RoiCalculator } from "@/components/site/roi-calculator"
import { FounderStory } from "@/components/site/founder-story"
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
import { walkthroughVideoSchema } from "@/lib/seo/video"
import { HOMEPAGE_FAQ } from "@/data/homepage-faq"
import { SITE } from "@/lib/site-data"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "FinalOutreach | The Last Cold Email Agency You'll Ever Hire",
  description:
    "Most B2B teams burn 3-4 agencies before finding one that works. We're built to be your last one — done-for-you outbound, run by operators who live in the tools.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "FinalOutreach | The Last Cold Email Agency You'll Ever Hire",
    description:
      "Most B2B teams burn 3-4 agencies before finding one that works. We're built to be your last one — done-for-you outbound, run by operators who live in the tools.",
    url: SITE.domain,
  },
  twitter: {
    card: "summary_large_image",
    title: "FinalOutreach | The Last Cold Email Agency You'll Ever Hire",
    description:
      "Most B2B teams burn 3-4 agencies before finding one that works. We're built to be your last one — done-for-you outbound, run by operators who live in the tools.",
    creator: SITE.twitter,
    site: SITE.twitter,
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
          walkthroughVideoSchema(),
        ]}
      />
      <SmoothScroll>
        <div className="relative min-h-screen bg-background text-ink">
          <SiteNavigation />
          <main id="main">
            <Hero />
            <OurStackMarquee />
            <ProcessSection />
            <CampaignProofGallery />
            <BookingsProof />
            <Services />
            <OperatorDifference />
            <Process />
            {/* ROI after process context — strongest interactive differentiator */}
            <RoiCalculator />
            <FounderStory />
            <Testimonials />
            <Faq />
            <Pricing />
            <Certifications />
            <FinalCta />
          </main>
          <Footer />
          <StickyMobileCta />
        </div>
      </SmoothScroll>
    </>
  )
}
