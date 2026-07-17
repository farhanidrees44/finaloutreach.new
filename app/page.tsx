import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { SiteNavigation } from "@/components/site/site-navigation"
import { Hero } from "@/components/site/hero"
import { OurStackMarquee } from "@/components/site/our-stack-marquee"
import { Certifications } from "@/components/site/certifications"
import { SmoothScroll } from "@/components/site/smooth-scroll"
import { Footer } from "@/components/site/footer"
import { StickyMobileCta } from "@/components/site/sticky-mobile-cta"
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

/** Below-the-fold sections — lazy so Framer Motion work doesn't block LCP */
const VideoSection = dynamic(
  () =>
    import("@/components/site/video-section").then((m) => m.VideoSection),
  { ssr: true },
)
const CampaignProofGallery = dynamic(
  () =>
    import("@/components/site/campaign-proof").then(
      (m) => m.CampaignProofGallery,
    ),
  { ssr: true },
)
const BookingsProof = dynamic(
  () =>
    import("@/components/site/bookings-proof").then((m) => m.BookingsProof),
  { ssr: true },
)
const ResultsBar = dynamic(
  () => import("@/components/site/results-bar").then((m) => m.ResultsBar),
  { ssr: true },
)
const Services = dynamic(
  () => import("@/components/site/services").then((m) => m.Services),
  { ssr: true },
)
const OperatorDifference = dynamic(
  () =>
    import("@/components/site/operator-difference").then(
      (m) => m.OperatorDifference,
    ),
  { ssr: true },
)
const Process = dynamic(
  () => import("@/components/site/process").then((m) => m.Process),
  { ssr: true },
)
const RoiCalculator = dynamic(
  () =>
    import("@/components/site/roi-calculator").then((m) => m.RoiCalculator),
  { ssr: true },
)
const FounderStory = dynamic(
  () =>
    import("@/components/site/founder-story").then((m) => m.FounderStory),
  { ssr: true },
)
const LiveCampaignInvite = dynamic(
  () =>
    import("@/components/site/live-campaign-invite").then(
      (m) => m.LiveCampaignInvite,
    ),
  { ssr: true },
)
const Testimonials = dynamic(
  () =>
    import("@/components/site/testimonials").then((m) => m.Testimonials),
  { ssr: true },
)
const Faq = dynamic(
  () => import("@/components/site/faq").then((m) => m.Faq),
  { ssr: true },
)
const Pricing = dynamic(
  () => import("@/components/site/pricing").then((m) => m.Pricing),
  { ssr: true },
)
const FinalCta = dynamic(
  () => import("@/components/site/final-cta").then((m) => m.FinalCta),
  { ssr: true },
)

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
            <Certifications />
            <VideoSection />
            <CampaignProofGallery />
            <BookingsProof />
            <ResultsBar />
            <Services />
            <OperatorDifference />
            <Process />
            <RoiCalculator />
            <FounderStory />
            <LiveCampaignInvite />
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
