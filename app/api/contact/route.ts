import { NextResponse } from "next/server"
import { z } from "zod"
import { Resend } from "resend"
import { clientIp, rateLimit } from "@/lib/api/rate-limit"
import { supabaseInsert } from "@/lib/api/supabase"
import { SITE } from "@/lib/site-data"

export const runtime = "nodejs"

// 5 submissions per IP per hour.
const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000

const ContactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  company: z.string().trim().min(1, "Please enter your company").max(160),
  role: z.string().trim().max(120).optional().or(z.literal("")),
  budget: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell us a bit more").max(4000),
  // Honeypot — must be empty.
  website: z.string().max(0).optional().or(z.literal("")),
})

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

export async function POST(req: Request) {
  const ip = clientIp(req)

  const limit = rateLimit(`contact:${ip}`, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS)
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
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    )
  }

  const parsed = ContactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Some fields need attention.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    )
  }

  // Honeypot tripped — silently accept and discard.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true })
  }

  const { name, email, company, role, budget, message } = parsed.data
  const userAgent = req.headers.get("user-agent") || ""

  // Persist to Supabase if configured (no-op otherwise).
  await supabaseInsert("contact_submissions", {
    ip,
    user_agent: userAgent,
    name,
    email,
    company,
    role: role || null,
    budget: budget || null,
    message,
  })

  // Send notification email via Resend.
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_EMAIL_TO || SITE.email
  const from =
    process.env.CONTACT_EMAIL_FROM || `notifications@${SITE.domain.replace(/^https?:\/\//, "")}`

  if (apiKey) {
    try {
      const resend = new Resend(apiKey)
      const html = `
        <h2>New strategy call request</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
        <p><strong>Company:</strong> ${escapeHtml(company)}</p>
        ${role ? `<p><strong>Role:</strong> ${escapeHtml(role)}</p>` : ""}
        ${budget ? `<p><strong>Budget:</strong> ${escapeHtml(budget)}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
        <hr/>
        <p style="font-size:12px;color:#888">IP: ${escapeHtml(ip)} · UA: ${escapeHtml(userAgent)}</p>
      `
      await resend.emails.send({
        from,
        to: [to],
        replyTo: email,
        subject: `New strategy call request — ${company}`,
        html,
      })
    } catch (err) {
      // Email failed but we already saved to Supabase — log and surface a soft error.
      console.error("[contact] Resend send failed:", err)
      return NextResponse.json(
        {
          ok: false,
          error: "We could not deliver your message right now. Please email us directly.",
        },
        { status: 502 },
      )
    }
  } else {
    // No email key configured — log so it shows in dev but still report success.
    console.warn(
      "[contact] RESEND_API_KEY not set. Submission was not emailed. Set the env var to enable email delivery.",
    )
  }

  return NextResponse.json({ ok: true })
}
