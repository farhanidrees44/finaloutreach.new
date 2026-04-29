"use client"

import { useState } from "react"
import { ArrowRight, MessageSquare, Check } from "lucide-react"
import { motion } from "framer-motion"

export function StillQuestions() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email.")
      return
    }
    if (message.trim().length < 4) {
      setError("Add a quick question so we can reply usefully.")
      return
    }
    // Pretend submit; real backend would go here.
    setSent(true)
  }

  return (
    <section className="border-t border-ink-08 bg-cream/60">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[280px_1fr] md:gap-16">
          <div className="flex flex-col gap-4">
            <span className="grid size-12 place-items-center rounded-2xl border border-ink-08 bg-background text-ink">
              <MessageSquare className="size-5" strokeWidth={1.7} />
            </span>
            <h3 className="text-[28px] font-medium leading-tight tracking-display text-ink sm:text-[32px]">
              Still have questions?
            </h3>
            <p className="text-[14.5px] leading-[1.65] text-ink-60">
              Send us a message — we reply within{" "}
              <span className="font-serif-italic text-ink">2 hours</span>{" "}
              during business hours.
            </p>
          </div>

          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-3"
          >
            <label className="flex flex-col gap-2">
              <span className="text-[12px] uppercase tracking-[0.18em] text-ink-40">
                Email
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="h-12 rounded-xl border border-ink-08 bg-background px-4 text-[15px] text-ink placeholder:text-ink-40 focus:border-ink/40 focus:outline-none focus:ring-2 focus:ring-primary/15 transition-[border,box-shadow] duration-200"
                disabled={sent}
                suppressHydrationWarning
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-[12px] uppercase tracking-[0.18em] text-ink-40">
                Message
              </span>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What's on your mind?"
                className="resize-none rounded-xl border border-ink-08 bg-background px-4 py-3 text-[15px] leading-[1.55] text-ink placeholder:text-ink-40 focus:border-ink/40 focus:outline-none focus:ring-2 focus:ring-primary/15 transition-[border,box-shadow] duration-200"
                disabled={sent}
                suppressHydrationWarning
              />
            </label>

            {error && (
              <p role="alert" className="text-[13px] text-destructive">
                {error}
              </p>
            )}

            <div className="mt-2 flex items-center gap-3">
              <button
                type="submit"
                disabled={sent}
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-ink px-5 text-[14.5px] font-medium text-background transition-all hover:bg-ink/90 active:scale-[0.98] disabled:cursor-default disabled:opacity-70"
              >
                {sent ? (
                  <>
                    <Check className="size-4" />
                    <span>Message received</span>
                  </>
                ) : (
                  <>
                    <span>Send message</span>
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
              {sent && (
                <p className="text-[13px] text-ink-60">
                  We&apos;ll be in touch shortly.
                </p>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
