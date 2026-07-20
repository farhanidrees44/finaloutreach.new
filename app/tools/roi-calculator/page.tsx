import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/json-ld"
import { ToolPageShell } from "@/components/tools/tool-shell"
import { faqSchema } from "@/lib/seo/schemas"
import { SITE } from "@/lib/site-data"
import { getToolBySlug } from "@/lib/tools-data"
import { toolHowToSchema, toolSoftwareSchema } from "@/lib/tools-seo"
import { RoiCalculatorClient } from "./roi-calculator-client"
import { RoiCalculatorCta, RoiCalculatorSeo } from "./roi-calculator-seo"

const tool = getToolBySlug("roi-calculator")!

export const metadata: Metadata = {
  title: "Cold Outbound ROI Calculator — Free Pipeline & Payback Model",
  description: tool.description,
  alternates: { canonical: `/tools/${tool.slug}` },
  openGraph: {
    title: `Cold Outbound ROI Calculator — Free Pipeline & Payback Model | ${SITE.name}`,
    description: tool.description,
    url: `${SITE.domain}/tools/${tool.slug}`,
  },
}

export default function Page() {
  return (
    <ToolPageShell
      tool={tool}
      belowTool={<RoiCalculatorSeo />}
      afterFaq={<RoiCalculatorCta />}
    >
      <JsonLd data={toolSoftwareSchema(tool)} />
      <JsonLd
        data={faqSchema(tool.faqs.map((f) => ({ question: f.q, answer: f.a })))}
      />
      <JsonLd
        data={toolHowToSchema(tool, {
          name: "How to calculate cold outbound ROI",
          description:
            "Model list size, reply rate, meeting rate, close rate, and ACV to project pipeline, revenue, ROI multiple, and payback.",
        })}
      />
      <RoiCalculatorClient />
    </ToolPageShell>
  )
}
