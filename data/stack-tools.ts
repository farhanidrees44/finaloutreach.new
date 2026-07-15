/**
 * OUR STACK — tools we operate in delivery (NOT clients / partners / endorsements)
 *
 * BEFORE DEPLOY:
 * - [ ] Optionally swap icon marks for official brand-kit SVGs under /public/stack/
 * - [ ] Caption on the page must remain the disclaimer — never "Trusted by"
 */

export type StackTool = {
  id: string
  name: string
  slug: string
}

export const STACK_DISCLAIMER =
  "Tools we operate on behalf of clients — logos shown for identification purposes only; no partnership or endorsement implied."

/** Primary six — must match visual weight. Extra tools keep the marquee full. */
export const STACK_TOOLS: StackTool[] = [
  { id: "apollo", name: "Apollo", slug: "apollo" },
  { id: "zoominfo", name: "ZoomInfo", slug: "zoominfo" },
  { id: "smartlead", name: "Smartlead", slug: "smartlead" },
  { id: "instantly", name: "Instantly", slug: "instantly" },
  { id: "gohighlevel", name: "GoHighLevel", slug: "gohighlevel" },
  { id: "hubspot", name: "HubSpot", slug: "hubspot" },
  { id: "clay", name: "Clay", slug: "clay" },
  { id: "heyreach", name: "HeyReach", slug: "heyreach" },
]
