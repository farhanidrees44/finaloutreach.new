import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/json-ld"
import { ToolPageShell } from "@/components/tools/tool-shell"
import { faqSchema } from "@/lib/seo/schemas"
import { SITE } from "@/lib/site-data"
import { getToolBySlug } from "@/lib/tools-data"
import { toolHowToSchema, toolSoftwareSchema } from "@/lib/tools-seo"
import { ColdEmailGeneratorClient } from "./cold-email-generator-client"
import {
  ColdEmailGeneratorCta,
  ColdEmailGeneratorSeo,
} from "./cold-email-generator-seo"

const tool = getToolBySlug("cold-email-generator")!

export const metadata: Metadata = {
  title: "Cold Email Template Generator — Free 3-Touch Sequence",
  description: tool.description,
  alternates: { canonical: `/tools/${tool.slug}` },
  openGraph: {
    title: `Cold Email Template Generator — Free 3-Touch Sequence | ${SITE.name}`,
    description: tool.description,
    url: `${SITE.domain}/tools/${tool.slug}`,
  },
}

export default function Page() {
  return (
    <ToolPageShell
      tool={tool}
      belowTool={<ColdEmailGeneratorSeo />}
      afterFaq={<ColdEmailGeneratorCta />}
    >
      <JsonLd data={toolSoftwareSchema(tool)} />
      <JsonLd
        data={faqSchema(tool.faqs.map((f) => ({ question: f.q, answer: f.a })))}
      />
      <JsonLd
        data={toolHowToSchema(tool, {
          name: "How to generate a cold email sequence",
          description:
            "Enter your offer and persona, pick a tone, and generate a 3-email cold outbound sequence ready to edit and send.",
        })}
      />
      <ColdEmailGeneratorClient />
    </ToolPageShell>
  )
}
