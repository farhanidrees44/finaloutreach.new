/**
 * Shared JSON-LD builders for /tools/* pages.
 */
import { SITE } from "@/lib/site-data"
import type { Tool } from "@/lib/tools-data"

export function toolSoftwareSchema(tool: Tool) {
  return {
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
}

export function toolHowToSchema(
  tool: Tool,
  opts: { name: string; description: string },
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: opts.name,
    description: opts.description,
    step: tool.howItWorks.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.body,
    })),
  }
}
