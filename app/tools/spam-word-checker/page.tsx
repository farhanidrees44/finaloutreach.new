import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/json-ld"
import { ToolPageShell } from "@/components/tools/tool-shell"
import { faqSchema } from "@/lib/seo/schemas"
import { SITE } from "@/lib/site-data"
import { getToolBySlug } from "@/lib/tools-data"
import { toolHowToSchema, toolSoftwareSchema } from "@/lib/tools-seo"
import { SpamWordCheckerClient } from "./spam-word-checker-client"
import {
  SpamWordCheckerCta,
  SpamWordCheckerSeo,
} from "./spam-word-checker-seo"

const tool = getToolBySlug("spam-word-checker")!

export const metadata: Metadata = {
  title: "Cold Email Spam Word Checker — Free Content Risk Scan",
  description: tool.description,
  alternates: { canonical: `/tools/${tool.slug}` },
  openGraph: {
    title: `Cold Email Spam Word Checker — Free Content Risk Scan | ${SITE.name}`,
    description: tool.description,
    url: `${SITE.domain}/tools/${tool.slug}`,
  },
}

export default function Page() {
  return (
    <ToolPageShell
      tool={tool}
      belowTool={<SpamWordCheckerSeo />}
      afterFaq={<SpamWordCheckerCta />}
    >
      <JsonLd data={toolSoftwareSchema(tool)} />
      <JsonLd
        data={faqSchema(tool.faqs.map((f) => ({ question: f.q, answer: f.a })))}
      />
      <JsonLd
        data={toolHowToSchema(tool, {
          name: "How to check a cold email for spam words",
          description:
            "Paste your cold email and highlight spam triggers, ALL CAPS, urgency phrases, and risky link patterns before you send.",
        })}
      />
      <SpamWordCheckerClient />
    </ToolPageShell>
  )
}
