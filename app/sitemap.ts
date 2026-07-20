import type { MetadataRoute } from "next"
import {
  SITE,
  SERVICES,
  BLOG_POSTS,
} from "@/lib/site-data"
import { RICH_INDUSTRIES } from "@/lib/industries-data"
import { AUTHORS } from "@/lib/authors"
import { TOOLS } from "@/lib/tools-data"
import { COMPETITOR_PROFILES } from "@/lib/pseo/competitors"
import { TOOL_ALTERNATIVE_PROFILES } from "@/lib/pseo/tools"
import { CITY_PROFILES } from "@/lib/pseo/cities"
import { INDUSTRY_PAGE_PROFILES } from "@/lib/pseo/industry-pages"
import { getIndexedBlogCategories } from "@/lib/blog-categories"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const base = SITE.domain

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/industries`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/results`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/process`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/resources`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/resources/cold-email-playbook`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/resources/email-templates`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/tools`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/compare`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/alternatives`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/cold-email-for`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/lead-generation`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/authors`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/legal/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/legal/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/legal/cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ]

  const toolRoutes = TOOLS.map((tool) => ({
    url: `${base}/tools/${tool.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))
  const serviceRoutes = SERVICES.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))
  const industryRoutes = INDUSTRY_PAGE_PROFILES.map((i) => ({
    url: `${base}/industries/${i.slug}`,
    lastModified: new Date(i.lastReviewed),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }))
  const blogRoutes = BLOG_POSTS.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))
  const blogCategoryRoutes = getIndexedBlogCategories().map((c) => ({
    url: `${base}/blog/category/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.55,
  }))
  const progIndustryRoutes = RICH_INDUSTRIES.map((i) => ({
    url: `${base}/cold-email-for/${i.slug}`,
    lastModified: new Date(i.lastReviewed),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))
  const cityRoutes = CITY_PROFILES.map((c) => ({
    url: `${base}/lead-generation/${c.slug}`,
    lastModified: new Date(c.lastReviewed),
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }))
  const competitorRoutes = COMPETITOR_PROFILES.map((c) => ({
    url: `${base}/compare/${c.slug}`,
    lastModified: new Date(c.lastReviewed),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))
  const altRoutes = TOOL_ALTERNATIVE_PROFILES.map((t) => ({
    url: `${base}/alternatives/${t.slug}`,
    lastModified: new Date(t.lastReviewed),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))
  const authorRoutes = AUTHORS.map((a) => ({
    url: `${base}/authors/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.55,
  }))

  const routes = [
    ...staticRoutes,
    ...toolRoutes,
    ...serviceRoutes,
    ...industryRoutes,
    ...blogRoutes,
    ...blogCategoryRoutes,
    ...progIndustryRoutes,
    ...cityRoutes,
    ...competitorRoutes,
    ...altRoutes,
    ...authorRoutes,
  ]

  // Duplicate URLs are a source-data bug, not something the sitemap should hide.
  const seen = new Set<string>()
  for (const route of routes) {
    if (seen.has(route.url)) {
      throw new Error(`Duplicate sitemap URL: ${route.url}`)
    }
    seen.add(route.url)
  }

  return routes
}
