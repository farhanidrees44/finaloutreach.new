import { NextResponse } from "next/server"
import { z } from "zod"
import { Resend } from "resend"
import { clientIp, rateLimit } from "@/lib/api/rate-limit"
import { supabaseInsert } from "@/lib/api/supabase"
import { SITE } from "@/lib/site-data"

export const runtime = "nodejs"

const LeadMagnetSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  resource: z.string().trim().min(2).max(120),
  name: z.string().trim().max(120).optional().or(z.literal("")),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  website: z.string().max(0).optional().or(z.literal("")),
})

// Map resource slugs to a publicly reachable download URL.
// Set RESOURCE_<SLUG_UPPER>_URL env vars to override (e.g. RESOURCE_COLD_EMAIL_PLAYBOOK_URL).
// If no env URL is set, we link to the in-site resource page instead of returning a broken PDF.
const RESOURCES: Record<string, { title: string; url: string }> = {
  "cold-email-playbook": {
    title: "The FinalOutreach Cold Email Playbook",
    url:
      process.env.RESOURCE_COLD_EMAIL_PLAYBOOK_URL ||
      `${SITE.domain}/resources/cold-email-playbook`,
  },
  "email-templates": {
    title: "10 cold email templates that booked $1M in pipeline",
    url:
      process.env.RESOURCE_EMAIL_TEMPLATES_URL ||
      `${SITE.domain}/resources/email-templates`,
  },
}

export async function POST(req: Request) {
  const ip = clientIp(req)

  const limit = rateLimit(`leadmagnet:${ip}`, 10, 60 * 60 * 1000)
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again later." },
      { status: 429 },
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 })
  }

  const parsed = LeadMagnetSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please complete the required fields.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    )
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true, downloadUrl: null })
  }

  const { email, resource, name, company } = parsed.data

  const meta = RESOURCES[resource]
  if (!meta) {
    return NextResponse.json(
      { ok: false, error: "Unknown resource." },
      { status: 404 },
    )
  }

  await supabaseInsert("lead_magnet_downloads", {
    ip,
    email,
    resource,
    name: name || null,
    company: company || null,
  })

  // Email the download link.
  const apiKey = process.env.RESEND_API_KEY
  const from =
    process.env.CONTACT_EMAIL_FROM ||
    `notifications@${SITE.domain.replace(/^https?:\/\//, "")}`

  const isPdf = /\.pdf(\?|#|$)/i.test(meta.url)
  const ctaLabel = isPdf ? "Download the PDF" : "Open the resource"

  if (apiKey) {
    try {
      const resend = new Resend(apiKey)
      await resend.emails.send({
        from,
        to: [email],
        subject: `Your resource — ${meta.title}`,
        html: `
          <p>Thanks for grabbing <strong>${meta.title}</strong>.</p>
          <p><a href="${meta.url}">${ctaLabel}</a></p>
          <p>Reply to this email any time — a real human reads them.</p>
        `,
      })
    } catch (err) {
      console.error("[lead-magnet] Resend send failed:", err)
    }
  }

  return NextResponse.json({ ok: true, downloadUrl: meta.url })
}
