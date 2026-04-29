import type { MetadataRoute } from "next"
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
import { RICH_INDUSTRIES } from "@/lib/industries-data"
import { AUTHORS } from "@/lib/authors"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const base = SITE.domain

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/industries`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/case-studies`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/process`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/resources`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/resources/cold-email-playbook`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/resources/email-templates`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ]

  const serviceRoutes = SERVICES.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))
  const industryRoutes = INDUSTRIES.map((i) => ({
    url: `${base}/industries/${i.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))
  const caseRoutes = CASE_STUDIES.map((c) => ({
    url: `${base}/case-studies/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }))
  const blogRoutes = BLOG_POSTS.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))
  const progIndustryRoutes = RICH_INDUSTRIES.map((i) => ({
    url: `${base}/cold-email-for/${i.slug}`,
    lastModified: new Date(i.lastReviewed),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))
  const cityRoutes = CITIES.map((c) => ({
    url: `${base}/lead-generation/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))
  const competitorRoutes = COMPETITORS.map((c) => ({
    url: `${base}/compare/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }))
  const altRoutes = TOOL_ALTERNATIVES.map((t) => ({
    url: `${base}/alternatives/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }))
  const authorRoutes = [
    {
      url: `${base}/authors`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    ...AUTHORS.map((a) => ({
      url: `${base}/authors/${a.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.55,
    })),
  ]

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...industryRoutes,
    ...caseRoutes,
    ...blogRoutes,
    ...progIndustryRoutes,
    ...cityRoutes,
    ...competitorRoutes,
    ...altRoutes,
    ...authorRoutes,
  ]
}
