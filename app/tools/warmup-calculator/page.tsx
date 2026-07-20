import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/json-ld"
import { ToolPageShell } from "@/components/tools/tool-shell"
import { faqSchema } from "@/lib/seo/schemas"
import { SITE } from "@/lib/site-data"
import { getToolBySlug } from "@/lib/tools-data"
import { toolHowToSchema, toolSoftwareSchema } from "@/lib/tools-seo"
import { WarmupCalculatorClient } from "./warmup-calculator-client"
import {
  WarmupCalculatorCta,
  WarmupCalculatorSeo,
} from "./warmup-calculator-seo"

const tool = getToolBySlug("warmup-calculator")!

export const metadata: Metadata = {
  title: "Email Warmup Calculator — Free Day-by-Day Sending Ramp",
  description: tool.description,
  alternates: { canonical: `/tools/${tool.slug}` },
  openGraph: {
    title: `Email Warmup Calculator — Free Day-by-Day Sending Ramp | ${SITE.name}`,
    description: tool.description,
    url: `${SITE.domain}/tools/${tool.slug}`,
  },
}

export default function Page() {
  return (
    <ToolPageShell
      tool={tool}
      belowTool={<WarmupCalculatorSeo />}
      afterFaq={<WarmupCalculatorCta />}
    >
      <JsonLd data={toolSoftwareSchema(tool)} />
      <JsonLd
        data={faqSchema(tool.faqs.map((f) => ({ question: f.q, answer: f.a })))}
      />
      <JsonLd
        data={toolHowToSchema(tool, {
          name: "How to plan an email domain warmup schedule",
          description:
            "Enter target daily volume and start date to get a day-by-day warmup ramp using the 30% growth rule.",
        })}
      />
      <WarmupCalculatorClient />
    </ToolPageShell>
  )
}
