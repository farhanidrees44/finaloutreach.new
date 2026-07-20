import { BLOG_POSTS, type BlogPost } from "@/lib/site-data"

export const BLOG_CATEGORY_MAP: Record<string, BlogPost["category"]> = {
  "cold-email": "Cold Email",
  linkedin: "LinkedIn",
  strategy: "Strategy",
  "case-studies": "Case Studies",
  tools: "Tools",
}

/** Only categories that currently have at least one published post. */
export function getIndexedBlogCategories() {
  return Object.entries(BLOG_CATEGORY_MAP)
    .filter(([, cat]) => BLOG_POSTS.some((p) => p.category === cat))
    .map(([slug, name]) => ({ slug, name }))
}
