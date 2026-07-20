// llms.txt — signals to LLMs about this site's content.
// https://llmstxt.org
import { SITE, SERVICES, BLOG_POSTS } from "@/lib/site-data"
import { COMPETITOR_PROFILES } from "@/lib/pseo/competitors"
import { TOOL_ALTERNATIVE_PROFILES } from "@/lib/pseo/tools"
import { TOOLS } from "@/lib/tools-data"

export const dynamic = "force-static"

export function GET() {
  const lines: string[] = []
  lines.push(`# ${SITE.name}`)
  lines.push("")
  lines.push(`> ${SITE.description}`)
  lines.push("")
  lines.push("## Services")
  for (const s of SERVICES) {
    lines.push(`- [${s.title}](${SITE.domain}/services/${s.slug}): ${s.tagline}`)
  }
  lines.push("")
  lines.push("## Proof")
  lines.push(
    `- [Live results](${SITE.domain}/results): verified campaign metrics we can publish publicly`,
  )
  lines.push("")
  lines.push("## Free tools")
  for (const t of TOOLS) {
    lines.push(`- [${t.name}](${SITE.domain}/tools/${t.slug})`)
  }
  lines.push("")
  lines.push("## Comparisons")
  for (const c of COMPETITOR_PROFILES) {
    lines.push(
      `- [FinalOutreach vs ${c.name}](${SITE.domain}/compare/${c.slug}): ${c.verdict}`,
    )
  }
  lines.push("")
  lines.push("## Tool alternatives")
  for (const t of TOOL_ALTERNATIVE_PROFILES) {
    lines.push(
      `- [${t.name} alternatives](${SITE.domain}/alternatives/${t.slug}): ${t.verdict}`,
    )
  }
  lines.push("")
  lines.push("## Recent articles")
  for (const p of BLOG_POSTS.slice(0, 10)) {
    lines.push(`- [${p.title}](${SITE.domain}/blog/${p.slug}): ${p.description}`)
  }
  lines.push("")

  return new Response(lines.join("\n"), {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
