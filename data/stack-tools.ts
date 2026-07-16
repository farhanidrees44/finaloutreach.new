/**
 * OUR STACK — tools we operate in delivery (NOT clients / partners / endorsements)
 *
 * Primary eight match the homepage proof row. Raster marks live under /public/stack/.
 * Apollo / Instantly / HeyReach use brand-color SVG marks crafted for identification
 * (official press-kit files were not available in-repo — see HOMEPAGE_PLACEHOLDERS).
 */

export type StackTool = {
  id: string
  name: string
  slug: string
  /** Raster or SVG under /public */
  src: string
  /** Optional grouping for future filters — not shown as UI chrome by default */
  group?: "data" | "sending" | "crm" | "automation"
}

export const STACK_DISCLAIMER =
  "Tools we operate on behalf of clients — logos shown for identification purposes only; no partnership or endorsement implied."

/** Primary grid — 8 tools, static layout (under the 12-tool marquee threshold). */
export const STACK_TOOLS: StackTool[] = [
  {
    id: "apollo",
    name: "Apollo",
    slug: "apollo",
    src: "/stack/apollo.svg",
    group: "data",
  },
  {
    id: "zoominfo",
    name: "ZoomInfo",
    slug: "zoominfo",
    src: "/stack/zoominfo.png",
    group: "data",
  },
  {
    id: "smartlead",
    name: "Smartlead",
    slug: "smartlead",
    src: "/stack/smartlead.png",
    group: "sending",
  },
  {
    id: "instantly",
    name: "Instantly",
    slug: "instantly",
    src: "/stack/instantly.svg",
    group: "sending",
  },
  {
    id: "gohighlevel",
    name: "GoHighLevel",
    slug: "gohighlevel",
    src: "/stack/gohighlevel.png",
    group: "crm",
  },
  {
    id: "hubspot",
    name: "HubSpot",
    slug: "hubspot",
    src: "/stack/hubspot.png",
    group: "crm",
  },
  {
    id: "clay",
    name: "Clay",
    slug: "clay",
    src: "/stack/clay.png",
    group: "data",
  },
  {
    id: "heyreach",
    name: "HeyReach",
    slug: "heyreach",
    src: "/stack/heyreach.svg",
    group: "sending",
  },
]
