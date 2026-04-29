import { NextResponse } from "next/server"
import { z } from "zod"
import { Resend } from "resend"
import { clientIp, rateLimit } from "@/lib/api/rate-limit"
import { supabaseInsert } from "@/lib/api/supabase"
import { SITE } from "@/lib/site-data"

export const runtime = "nodejs"

const NewsletterSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  website: z.string().max(0).optional().or(z.literal("")),
})

export async function POST(req: Request) {
  const ip = clientIp(req)

  const limit = rateLimit(`newsletter:${ip}`, 10, 60 * 60 * 1000)
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

  const parsed = NewsletterSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please enter a valid email address.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    )
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true })
  }

  const { email } = parsed.data

  await supabaseInsert("newsletter_subscribers", { ip, email })

  // Confirmation email (best-effort).
  const apiKey = process.env.RESEND_API_KEY
  const from =
    process.env.CONTACT_EMAIL_FROM ||
    `notifications@${SITE.domain.replace(/^https?:\/\//, "")}`

  if (apiKey) {
    try {
      const resend = new Resend(apiKey)
      await resend.emails.send({
        from,
        to: [email],
        subject: `You're in — ${SITE.name}`,
        html: `<p>Thanks for subscribing to ${SITE.name}. You will get one tactical email per week on cold email and B2B outreach. Unsubscribe at any time.</p>`,
      })
    } catch (err) {
      console.error("[newsletter] Resend send failed:", err)
    }
  }

  return NextResponse.json({ ok: true })
}
