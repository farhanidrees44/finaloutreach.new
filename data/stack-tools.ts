/**
 * OUR STACK — tools we operate in delivery (NOT clients / partners / endorsements)
 *
 * CRITICAL: Use ONLY exact files from E:\finaloutreach logos → /public/logos/.
 * Do not substitute lucide/simple-icons/generic glyphs if a file is missing.
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
  { id: "apollo", name: "Apollo", slug: "apollo", src: "/logos/apollo.svg" },
  { id: "zoominfo", name: "ZoomInfo", slug: "zoominfo", src: "/logos/zoominfo.png" },
  { id: "smartlead", name: "Smartlead", slug: "smartlead", src: "/logos/smartlead.png" },
  // Instantly — not present in E:\finaloutreach logos (leave broken until you drop it)
  { id: "instantly", name: "Instantly", slug: "instantly", src: "/logos/instantly.svg" },
  {
    id: "gohighlevel",
    name: "GoHighLevel",
    slug: "gohighlevel",
    src: "/logos/gohighlevel.png",
  },
  { id: "hubspot", name: "HubSpot", slug: "hubspot", src: "/logos/hubspot.svg" },
  { id: "clay", name: "Clay", slug: "clay", src: "/logos/clay.png" },
  { id: "heyreach", name: "HeyReach", slug: "heyreach", src: "/logos/heyreach.png" },
]
