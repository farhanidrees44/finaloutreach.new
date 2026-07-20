import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/json-ld"
import { ToolPageShell } from "@/components/tools/tool-shell"
import { faqSchema } from "@/lib/seo/schemas"
import { SITE } from "@/lib/site-data"
import { getToolBySlug } from "@/lib/tools-data"
import { toolHowToSchema, toolSoftwareSchema } from "@/lib/tools-seo"
import { DomainHealthCheckerClient } from "./domain-health-checker-client"
import {
  DomainHealthCheckerCta,
  DomainHealthCheckerSeo,
} from "./domain-health-checker-seo"

const tool = getToolBySlug("domain-health-checker")!

export const metadata: Metadata = {
  title: "Domain Email Health Checker — Free SPF, DKIM & DMARC Lookup",
  description: tool.description,
  alternates: { canonical: `/tools/${tool.slug}` },
  openGraph: {
    title: `Domain Email Health Checker — Free SPF, DKIM & DMARC Lookup | ${SITE.name}`,
    description: tool.description,
    url: `${SITE.domain}/tools/${tool.slug}`,
  },
}

export default function Page() {
  return (
    <ToolPageShell
      tool={tool}
      belowTool={<DomainHealthCheckerSeo />}
      afterFaq={<DomainHealthCheckerCta />}
    >
      <JsonLd data={toolSoftwareSchema(tool)} />
      <JsonLd
        data={faqSchema(tool.faqs.map((f) => ({ question: f.q, answer: f.a })))}
      />
      <JsonLd
        data={toolHowToSchema(tool, {
          name: "How to check domain email authentication",
          description:
            "Look up live SPF, DKIM, DMARC, and MX records for any domain and get a deliverability health score with fixes.",
        })}
      />
      <DomainHealthCheckerClient />
    </ToolPageShell>
  )
}
