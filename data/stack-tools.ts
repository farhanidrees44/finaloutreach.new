/**
 * OUR STACK — tools we operate in delivery (NOT clients / partners / endorsements)
 *
 * BEFORE DEPLOY:
 * - [ ] Confirm each logo is from the vendor brand kit or a permitted simple-icons mark
 * - [ ] Caption on the page must remain the disclaimers below — never "Trusted by"
 */

export type StackTool = {
  id: string
  name: string
  /** Official or permitted SVG path / wordmark component key */
  slug: string
}

export const STACK_DISCLAIMER =
  "Tools we operate on behalf of clients — logos shown for identification purposes only; no partnership or endorsement implied."

export const STACK_TOOLS: StackTool[] = [
  { id: "apollo", name: "Apollo", slug: "apollo" },
  { id: "zoominfo", name: "ZoomInfo", slug: "zoominfo" },
  { id: "smartlead", name: "Smartlead", slug: "smartlead" },
  { id: "instantly", name: "Instantly", slug: "instantly" },
  { id: "gohighlevel", name: "GoHighLevel", slug: "gohighlevel" },
  { id: "hubspot", name: "HubSpot", slug: "hubspot" },
  { id: "clay", name: "Clay", slug: "clay" },
  { id: "heyreach", name: "HeyReach", slug: "heyreach" },
  { id: "lemlist", name: "lemlist", slug: "lemlist" },
  { id: "salesforce", name: "Salesforce", slug: "salesforce" },
]
