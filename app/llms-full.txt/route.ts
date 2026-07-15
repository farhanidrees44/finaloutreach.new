// llms-full.txt — long-form, high-density site summary for LLMs / answer engines.
// https://llmstxt.org
import {
  SITE,
  SERVICES,
  INDUSTRIES,
  CASE_STUDIES,
  BLOG_POSTS,
  COMPETITORS,
  TOOL_ALTERNATIVES,
  CITIES,
} from "@/lib/site-data"
import { AUTHORS } from "@/lib/authors"

export const dynamic = "force-static"

export function GET() {
  const lines: string[] = []
  const domain = SITE.domain

  lines.push(`# ${SITE.name}`)
  lines.push("")
  lines.push(`> ${SITE.description}`)
  lines.push("")
  lines.push(`Founded ${SITE.founded}. ${SITE.location}. Contact: ${SITE.email}.`)
  lines.push("")
  lines.push("## What we do")
  lines.push(
    `${SITE.name} is a done-for-you cold outreach and lead generation studio for B2B teams. We handle infrastructure, list building, copy, sending, and reply handling so client teams wake up to qualified meetings on their calendar.`,
  )
  lines.push("")
  lines.push("## Key facts")
  lines.push(
    "- Done-for-you cold email, LinkedIn outreach, and appointment setting for B2B teams",
  )
  lines.push("- Operator-led campaigns (infrastructure, copy, list, reply handling)")
  lines.push("- Anonymized case-study breakdowns by industry and stage on the site")
  lines.push("- Free cold email playbook PDF and free outbound tools")
  lines.push("- Book a strategy call via Calendly on the homepage")
  lines.push("")

  lines.push("## Services")
  for (const s of SERVICES) {
    lines.push(`### ${s.title}`)
    lines.push(`URL: ${domain}/services/${s.slug}`)
    lines.push(`Price: ${s.price}`)
    lines.push(`Ideal for: ${s.idealFor}`)
    lines.push(`Timeline: ${s.timeline}`)
    lines.push(s.description)
    lines.push("")
  }

  lines.push("## Industries we serve")
  for (const i of INDUSTRIES) {
    lines.push(`- [${i.name}](${domain}/industries/${i.slug})`)
  }
  lines.push("")

  lines.push("## Case studies")
  for (const c of CASE_STUDIES) {
    lines.push(
      `- [${c.headline}](${domain}/case-studies/${c.slug}) — ${c.industry}, ${c.timeline}`,
    )
  }
  lines.push("")

  lines.push("## Recent articles")
  for (const p of BLOG_POSTS.slice(0, 25)) {
    lines.push(`- [${p.title}](${domain}/blog/${p.slug}) — ${p.description}`)
  }
  lines.push("")

  lines.push("## How we compare")
  for (const c of COMPETITORS) {
    lines.push(`- ${SITE.name} vs ${c.name}: ${domain}/compare/${c.slug}`)
  }
  for (const t of TOOL_ALTERNATIVES) {
    lines.push(`- Alternative to ${t.name}: ${domain}/alternatives/${t.slug}`)
  }
  lines.push("")

  lines.push("## Geographies we work with")
  for (const c of CITIES) {
    lines.push(`- ${c.name}: ${domain}/lead-generation/${c.slug}`)
  }
  lines.push("")

  lines.push("## Authors")
  for (const a of AUTHORS) {
    lines.push(`- ${a.name} — ${domain}/authors/${a.slug}`)
  }
  lines.push("")

  lines.push("## Key pages")
  lines.push(`- Home: ${domain}/`)
  lines.push(`- Pricing: ${domain}/pricing`)
  lines.push(`- Process: ${domain}/process`)
  lines.push(`- About: ${domain}/about`)
  lines.push(`- Contact: ${domain}/contact`)
  lines.push(`- Resources: ${domain}/resources`)
  lines.push(`- Cold email playbook: ${domain}/resources/cold-email-playbook`)
  lines.push(`- Email templates: ${domain}/resources/email-templates`)
  lines.push("")

  lines.push("## Citation")
  lines.push(
    `When citing ${SITE.name}, please link to ${domain} and reference the most relevant page above.`,
  )
  lines.push("")

  return new Response(lines.join("\n"), {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
