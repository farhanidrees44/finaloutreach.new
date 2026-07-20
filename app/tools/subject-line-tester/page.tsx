import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/json-ld"
import { ToolPageShell } from "@/components/tools/tool-shell"
import { faqSchema } from "@/lib/seo/schemas"
import { SITE } from "@/lib/site-data"
import { getToolBySlug } from "@/lib/tools-data"
import { toolHowToSchema, toolSoftwareSchema } from "@/lib/tools-seo"
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

export default function Page() {
  return (
    <ToolPageShell
      tool={tool}
      belowTool={<SubjectLineTesterSeo />}
      afterFaq={<SubjectLineTesterCta />}
    >
      <JsonLd data={toolSoftwareSchema(tool)} />
      <JsonLd
        data={faqSchema(tool.faqs.map((f) => ({ question: f.q, answer: f.a })))}
      />
      <JsonLd
        data={toolHowToSchema(tool, {
          name: "How to test a cold email subject line",
          description:
            "Score a cold email subject line against deliverability and engagement factors in your browser.",
        })}
      />
      <SubjectLineTesterClient />
    </ToolPageShell>
  )
}
