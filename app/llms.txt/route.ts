// llms.txt — signals to LLMs about this site's content.
// https://llmstxt.org
import { SITE, SERVICES, BLOG_POSTS, CASE_STUDIES } from "@/lib/site-data"

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
  lines.push("## Case studies")
  for (const c of CASE_STUDIES) {
    lines.push(`- [${c.headline}](${SITE.domain}/case-studies/${c.slug}): ${c.industry}, ${c.timeline}`)
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
