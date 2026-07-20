/**
 * OUR STACK — tools we operate in delivery (NOT clients / partners / endorsements)
 *
 * CRITICAL: Use ONLY exact files from /public/logos/.
 * Every id/slug/src must be unique — no duplicate logos in the marquee.
 */

export type StackTool = {
  id: string
  name: string
  slug: string
  /** Exact path under /public — no icon-library fallbacks */
  src: string
}

export const STACK_DISCLAIMER =
  "Tools we operate on behalf of clients — logos shown for identification purposes only; no partnership or endorsement implied."

export const STACK_TOOLS: StackTool[] = [
  { id: "apollo", name: "Apollo", slug: "apollo", src: "/logos/apollo.png" },
  { id: "zoominfo", name: "ZoomInfo", slug: "zoominfo", src: "/logos/zoominfo.png" },
  { id: "smartlead", name: "Smartlead", slug: "smartlead", src: "/logos/smartlead.png" },
  { id: "instantly", name: "Instantly", slug: "instantly", src: "/logos/instantly.png" },
  {
    id: "gohighlevel",
    name: "GoHighLevel",
    slug: "gohighlevel",
    src: "/logos/gohighlevel.png",
  },
  { id: "hubspot", name: "HubSpot", slug: "hubspot", src: "/logos/hubspot.svg" },
  { id: "clay", name: "Clay", slug: "clay", src: "/logos/clay.png" },
  { id: "heyreach", name: "HeyReach", slug: "heyreach", src: "/logos/heyreach.png" },
  { id: "apify", name: "Apify", slug: "apify", src: "/logos/apify.png" },
  { id: "n8n", name: "n8n", slug: "n8n", src: "/logos/n8n.png" },
  { id: "appsumo", name: "AppSumo", slug: "appsumo", src: "/logos/appsumo.png" },
  { id: "dripify", name: "Dripify", slug: "dripify", src: "/logos/dripify.png" },
  { id: "lemlist", name: "lemlist", slug: "lemlist", src: "/logos/lemlist.png" },
]

/** Guard: marquee must never show the same brand twice in the source list. */
const seen = new Set<string>()
for (const tool of STACK_TOOLS) {
  const key = tool.id
  if (seen.has(key) || seen.has(tool.slug) || seen.has(tool.src)) {
    throw new Error(`Duplicate stack logo entry: ${tool.id}`)
  }
  seen.add(tool.id)
  seen.add(tool.slug)
  seen.add(tool.src)
}
