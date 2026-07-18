import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/json-ld"
import { ToolPageShell } from "@/components/tools/tool-shell"
import { faqSchema } from "@/lib/seo/schemas"
import { SITE } from "@/lib/site-data"
import { getToolBySlug } from "@/lib/tools-data"
import { SubjectLineTesterClient } from "./subject-line-tester-client"
import {
  SubjectLineTesterCta,
  SubjectLineTesterSeo,
} from "./subject-line-tester-seo"

const tool = getToolBySlug("subject-line-tester")!

export const metadata: Metadata = {
  title: "Cold Email Subject Line Tester — Free 15-Factor Score",
  description: tool.description,
  alternates: { canonical: `/tools/${tool.slug}` },
  openGraph: {
    title: `Cold Email Subject Line Tester — Free 15-Factor Score | ${SITE.name}`,
    description: tool.description,
    url: `${SITE.domain}/tools/${tool.slug}`,
  },
}

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: tool.name,
  description: tool.description,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: `${SITE.domain}/tools/${tool.slug}`,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@type": "Organization", name: SITE.name, url: SITE.domain },
}

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to test a cold email subject line",
  description:
    "Score a cold email subject line against deliverability and engagement factors in your browser.",
  step: tool.howItWorks.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.title,
    text: s.body,
  })),
}

export default function Page() {
  return (
    <ToolPageShell
      tool={tool}
      belowTool={<SubjectLineTesterSeo />}
      afterFaq={<SubjectLineTesterCta />}
    >
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema(tool.faqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={howToSchema} />
      <SubjectLineTesterClient />
    </ToolPageShell>
  )
}
