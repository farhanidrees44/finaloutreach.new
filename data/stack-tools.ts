/**
 * OUR STACK — tools we operate in delivery (NOT clients / partners / endorsements)
 *
 * Logos under /public/stack/ are processed square PNGs (transparent).
 * Tools without a raster mark fall back to the inline SVG in stack-logos.tsx.
 */

export type StackTool = {
  id: string
  name: string
  slug: string
  /** Optional raster mark under /public — prefer for brand accuracy */
  src?: string | null
}

export const STACK_DISCLAIMER =
  "Tools we operate on behalf of clients — logos shown for identification purposes only; no partnership or endorsement implied."

/** Equal visual weight in the marquee — icon box + name. */
export const STACK_TOOLS: StackTool[] = [
  { id: "apollo", name: "Apollo", slug: "apollo" },
  { id: "zoominfo", name: "ZoomInfo", slug: "zoominfo", src: "/stack/zoominfo.png" },
  { id: "smartlead", name: "Smartlead", slug: "smartlead", src: "/stack/smartlead.png" },
  { id: "instantly", name: "Instantly", slug: "instantly" },
  {
    id: "gohighlevel",
    name: "GoHighLevel",
    slug: "gohighlevel",
    src: "/stack/gohighlevel.png",
  },
  { id: "hubspot", name: "HubSpot", slug: "hubspot", src: "/stack/hubspot.png" },
  { id: "clay", name: "Clay", slug: "clay", src: "/stack/clay.png" },
  { id: "heyreach", name: "HeyReach", slug: "heyreach" },
  { id: "lemlist", name: "lemlist", slug: "lemlist", src: "/stack/lemlist.png" },
  { id: "zapier", name: "Zapier", slug: "zapier", src: "/stack/zapier.png" },
]
