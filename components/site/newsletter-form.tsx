"use client"

import { useState, type FormEvent } from "react"
import { ArrowRight, Check, Loader2 } from "lucide-react"
import { trackEvent } from "@/lib/analytics"

type Props = {
  source: string
  placeholder?: string
  size?: "sm" | "md"
  className?: string
}

export function NewsletterForm({
  source,
  placeholder = "you@company.com",
  size = "md",
  className,
}: Props) {
  const [email, setEmail] = useState("")
  const [website, setWebsite] = useState("") // honeypot
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState<string | null>(null)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (status === "loading" || status === "success") return

    setStatus("loading")
    setMessage(null)
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, website }),
      })
      const data = (await res.json().catch(() => ({}))) as { message?: string; error?: string }
      if (!res.ok) {
        setStatus("error")
        setMessage(data.error ?? "Something went wrong. Try again in a moment.")
        return
      }
      setStatus("success")
      setMessage(data.message ?? "Subscribed. Check your inbox.")
      setEmail("")
      trackEvent("newsletter_subscribe", { source })
    } catch {
      setStatus("error")
      setMessage("Network error. Please try again.")
    }
  }

  const inputH = size === "sm" ? "h-10" : "h-12"
  const btnSize = size === "sm" ? "size-10" : "size-12"

  return (
    <form
      onSubmit={onSubmit}
      className={[
        "flex h-fit w-full max-w-md items-center gap-2 rounded-full border border-ink-08 bg-background py-1.5 pl-5 pr-1.5",
        className ?? "",
      ].join(" ")}
      aria-label="Newsletter signup"
    >
      {/* Honeypot field — hidden from real users */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="sr-only"
        aria-hidden="true"
        suppressHydrationWarning
      />

      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === "loading" || status === "success"}
        placeholder={placeholder}
        className={`${inputH} flex-1 bg-transparent text-[14px] text-ink placeholder:text-ink-40 focus:outline-none disabled:opacity-60`}
        aria-label="Email address"
        aria-describedby={message ? "newsletter-message" : undefined}
        suppressHydrationWarning
      />
      <button
        type="submit"
        disabled={status === "loading" || status === "success"}
        className={`grid ${btnSize} place-items-center rounded-full bg-ink text-background transition-transform hover:scale-105 disabled:opacity-70 disabled:hover:scale-100`}
        aria-label={status === "success" ? "Subscribed" : "Subscribe"}
      >
        {status === "loading" ? (
          <Loader2 className="size-4 animate-spin" />
        ) : status === "success" ? (
          <Check className="size-4" />
        ) : (
          <ArrowRight className="size-4" />
        )}
      </button>

      {message && (
        <span
          id="newsletter-message"
          role="status"
          className={`sr-only ${status === "error" ? "text-destructive" : ""}`}
        >
          {message}
        </span>
      )}
    </form>
  )
}
