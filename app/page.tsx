import { SiteNavigation } from "@/components/site/site-navigation"
import { Hero } from "@/components/site/hero"
import { ClientLogosMarquee } from "@/components/site/client-logos-marquee"
import { Services } from "@/components/site/services"
import { Process } from "@/components/site/process"
import { CaseStudies } from "@/components/site/case-studies"
import { RoiCalculator } from "@/components/site/roi-calculator"
import { FounderStory } from "@/components/site/founder-story"
import { Testimonials } from "@/components/site/testimonials"
import { Faq } from "@/components/site/faq"
import { FinalCta } from "@/components/site/final-cta"
import { Footer } from "@/components/site/footer"
import { StickyMobileCta } from "@/components/site/sticky-mobile-cta"
import { JsonLd } from "@/components/seo/json-ld"
import {
  organizationSchema,
  websiteSchema,
  serviceSchema,
  aggregateRatingSchema,
} from "@/lib/seo/schemas"

// ISR — regenerate every hour
export const revalidate = 3600

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          websiteSchema(),
          serviceSchema(),
          aggregateRatingSchema(),
        ]}
      />
      <div className="relative min-h-screen bg-background text-ink">
        <SiteNavigation />
        <main id="main">
          <Hero />
          <ClientLogosMarquee />
          <Services />
          <Process />
          <CaseStudies />
          <RoiCalculator />
          <FounderStory />
          <Testimonials />
          <Faq />
          <FinalCta />
        </main>
        <Footer />
        <StickyMobileCta />
      </div>
    </>
  )
}
