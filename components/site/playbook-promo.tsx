"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, BookOpen, Check } from "lucide-react"

export function PlaybookPromo() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email.")
      return
    }
    setSent(true)
  }

  return (
    <section
      aria-label="Free cold email playbook"
      className="border-t border-ink-08 bg-background"
    >
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl border border-ink-08 bg-cream/70 p-7 sm:p-9"
        >
          <div
            aria-hidden="true"
            className="absolute -right-10 -top-10 hidden size-44 rounded-full bg-amber/30 blur-3xl md:block"
          />

          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto] md:items-center md:gap-12">
            <div className="flex items-start gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-ink-08 bg-background text-ink">
                <BookOpen className="size-5" strokeWidth={1.7} />
              </span>
              <div className="flex flex-col gap-1.5">
                <span className="text-[11.5px] uppercase tracking-[0.18em] text-ink-40">
                  Free download
                </span>
                <h3 className="text-[22px] font-medium leading-tight tracking-display text-ink sm:text-[26px]">
                  The Cold Email Playbook,{" "}
                  <span className="font-serif-italic text-ink-60">
                    in 28 pages.
                  </span>
                </h3>
                <p className="text-[13.5px] leading-[1.6] text-ink-60">
                  The exact frameworks we use to ship campaigns that book
                  meetings. ICP, infrastructure, copy, sequencing.
                </p>
              </div>
            </div>

            <form
              onSubmit={submit}
              className="flex w-full flex-col gap-2 md:w-[360px]"
            >
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Work email"
                  disabled={sent}
                  className="h-12 flex-1 rounded-full border border-ink-08 bg-background px-4 text-[14.5px] text-ink placeholder:text-ink-40 focus:border-ink/40 focus:outline-none focus:ring-2 focus:ring-primary/15 transition-[border,box-shadow] duration-200"
                  suppressHydrationWarning
                />
                {mounted && (
                  <button
                    type="submit"
                    disabled={sent}
                    className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-5 text-[14px] font-medium text-background transition-all hover:bg-ink/90 active:scale-[0.98] disabled:opacity-70"
                  >
                    {sent ? (
                      <>
                        <Check className="size-4" />
                        <span>Sent to inbox</span>
                      </>
                    ) : (
                      <>
                        <span>Get the PDF</span>
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>
                )}
              </div>
              {error ? (
                <p role="alert" className="px-1 text-[12.5px] text-destructive">
                  {error}
                </p>
              ) : (
                <p className="px-1 text-[12px] text-ink-40">
                  No spam. Unsubscribe in one click.
                </p>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
