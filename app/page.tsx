import type { Metadata } from "next"
import { SiteNavigation } from "@/components/site/site-navigation"
import { Hero } from "@/components/site/hero"
import { OurStackMarquee } from "@/components/site/our-stack-marquee"
import { CampaignProofGallery } from "@/components/site/campaign-proof"
import { BookingsProof } from "@/components/site/bookings-proof"
import { ResultsBar } from "@/components/site/results-bar"
import { Services } from "@/components/site/services"
import { Process } from "@/components/site/process"
import { RoiCalculator } from "@/components/site/roi-calculator"
import { FounderStory } from "@/components/site/founder-story"
import { LiveCampaignInvite } from "@/components/site/live-campaign-invite"
import { Testimonials } from "@/components/site/testimonials"
import { Certifications } from "@/components/site/certifications"
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
  title: "Booked Meetings from Cold Email & LinkedIn Outreach",
  description:
    "Done-for-you cold email, LinkedIn outreach, and appointment setting that puts qualified meetings on your calendar — warm domains, verified lists, sequences, and reply handling.",
  alternates: { canonical: "/" },
  openGraph: {
    title: `Booked Meetings from Outbound — ${SITE.name}`,
    description:
      "Operators who warm domains, build lists, run sequences, and book meetings into your calendar.",
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
          walkthroughVideoSchema(),
        ]}
      />
      <SmoothScroll>
        <div className="relative min-h-screen bg-background text-ink">
          <SiteNavigation />
          <main id="main">
            <Hero />
            <OurStackMarquee />
            <CampaignProofGallery />
            <BookingsProof />
            <ResultsBar />
            <Services />
            <Process />
            <RoiCalculator />
            <FounderStory />
            <LiveCampaignInvite />
            <Testimonials />
            <Certifications />
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
