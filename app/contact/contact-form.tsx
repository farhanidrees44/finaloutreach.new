"use client"

import { useState } from "react"
import { ArrowRight, AlertCircle, Check } from "lucide-react"
import { trackConversion, trackFormSubmit } from "@/lib/analytics"

type FieldErrors = Partial<Record<string, string[]>>

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setErrorMessage(null)
    setFieldErrors({})

    const form = e.currentTarget
    const data = new FormData(form)
    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      company: String(data.get("company") || ""),
      role: String(data.get("role") || ""),
      budget: String(data.get("budget") || ""),
      message: String(data.get("message") || ""),
      website: String(data.get("website") || ""), // honeypot
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean
        error?: string
        fieldErrors?: FieldErrors
      }

      if (!res.ok || !json.ok) {
        setFieldErrors(json.fieldErrors || {})
        setErrorMessage(
          json.error ||
            "Something went wrong sending your request. Please try again or email us directly.",
        )
        setLoading(false)
        return
      }

      trackFormSubmit("contact", { company: payload.company })
      trackConversion("contact_request")

      setLoading(false)
      setSubmitted(true)
      form.reset()
    } catch {
      setLoading(false)
      setErrorMessage(
        "We couldn't reach the server. Check your connection and try again.",
      )
    }
  }

  if (submitted) {
    return (
      <div className="flex h-full flex-col items-start justify-center gap-4 rounded-2xl border border-ink-08 bg-cream p-10">
        <div className="grid size-10 place-items-center rounded-full bg-ink text-background">
          <Check className="size-4" />
        </div>
        <h2 className="text-[28px] font-medium tracking-display text-ink">
          Got it. Talk soon.
        </h2>
        <p className="max-w-md text-[15px] leading-[1.6] text-ink-60">
          We have your details. A senior operator will email you inside a
          business day with a few time slots and a short pre-call
          questionnaire.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="flex flex-col gap-5 rounded-2xl border border-ink-08 bg-card p-7 sm:p-9"
    >
      {/* Honeypot — visually hidden, real users will not fill it. */}
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" required errors={fieldErrors.name} />
        <Field label="Work email" name="email" type="email" required errors={fieldErrors.email} />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Company" name="company" required errors={fieldErrors.company} />
        <Field label="Role" name="role" errors={fieldErrors.role} />
      </div>
      <Select
        label="Monthly outbound budget"
        name="budget"
        options={[
          "Under $2K",
          "$2K–$5K",
          "$5K–$10K",
          "$10K+",
          "Not sure yet",
        ]}
      />
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-[12.5px] uppercase tracking-[0.14em] text-ink-40">
          What would great look like in 90 days?
          <span className="ml-1 text-[oklch(0.55_0.13_78)]">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          minLength={10}
          className="min-h-[120px] rounded-xl border border-ink-08 bg-background px-4 py-3 text-[15px] text-ink placeholder:text-ink-40 focus:border-ink/40 focus:outline-none"
          placeholder="Number of meetings you want per month, who your ICP is, what you have tried so far…"
        />
        {fieldErrors.message?.[0] ? (
          <p className="text-[12.5px] text-[oklch(0.55_0.18_25)]">{fieldErrors.message[0]}</p>
        ) : null}
      </div>

      {errorMessage ? (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-[oklch(0.78_0.13_25)] bg-[oklch(0.97_0.03_25)] px-4 py-3 text-[13.5px] text-[oklch(0.4_0.18_25)]"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="group mt-3 inline-flex h-12 w-fit items-center gap-2 rounded-full bg-primary px-6 text-[15px] font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98] disabled:opacity-60"
      >
        {loading ? "Sending…" : "Request a strategy call"}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </button>
    </form>
  )
}

function Field({
  label,
  name,
  type = "text",
  required,
  errors,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  errors?: string[]
}) {
  const errorId = errors?.length ? `${name}-error` : undefined
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-[12.5px] uppercase tracking-[0.14em] text-ink-40">
        {label}
        {required && <span className="ml-1 text-[oklch(0.55_0.13_78)]">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        aria-invalid={errors?.length ? "true" : undefined}
        aria-describedby={errorId}
        className="h-12 rounded-xl border border-ink-08 bg-background px-4 text-[15px] text-ink placeholder:text-ink-40 focus:border-ink/40 focus:outline-none"
      />
      {errors?.[0] ? (
        <p id={errorId} className="text-[12.5px] text-[oklch(0.55_0.18_25)]">
          {errors[0]}
        </p>
      ) : null}
    </div>
  )
}

function Select({
  label,
  name,
  options,
}: {
  label: string
  name: string
  options: string[]
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-[12.5px] uppercase tracking-[0.14em] text-ink-40">
        {label}
      </label>
      <select
        id={name}
        name={name}
        className="h-12 rounded-xl border border-ink-08 bg-background px-4 text-[15px] text-ink focus:border-ink/40 focus:outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  )
}
