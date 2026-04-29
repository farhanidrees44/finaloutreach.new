import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/json-ld"
import { ToolPageShell } from "@/components/tools/tool-shell"
import { SITE } from "@/lib/site-data"
import { getToolBySlug } from "@/lib/tools-data"
import { SubjectLineTesterClient } from "./subject-line-tester-client"

const tool = getToolBySlug("subject-line-tester")!

export const metadata: Metadata = {
  title: `${tool.name} — Free`,
  description: tool.description,
  alternates: { canonical: `/tools/${tool.slug}` },
  openGraph: {
    title: `${tool.name} — Free — ${SITE.name}`,
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

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <JsonLd data={softwareSchema} />
      <SubjectLineTesterClient />
    </ToolPageShell>
  )
}
