"use client"

/**
 * Cold Email Generator — structured 3-touch sequence builder.
 *
 * No LLM. We compose the sequence from a small library of opener / body / CTA
 * fragments parameterized on the user inputs. The result is deterministic,
 * legible, and copy-paste-ready into any sending tool.
 *
 * Sequence anatomy (the "PASTOR" frame compressed into 3 touches):
 *   Email 1 — Problem hook + relevance + soft CTA (15-min ask)
 *   Email 2 — Value / proof point + alternate CTA (resource OR call)
 *   Email 3 — Polite break-up + door-open
 */

import { useId, useMemo, useState } from "react"
import {
  Mailbox,
  Copy,
  CheckCheck,
  Mail,
  RotateCcw,
  Sparkles,
  Briefcase,
  Target,
  Heart,
  Users,
} from "lucide-react"
import { ToolWorkbench, PanelHeading, FieldLabel } from "@/components/tools/tool-shell"
import { cn } from "@/lib/utils"

type Tone = "direct" | "warm" | "playful"

type Inputs = {
  yourName: string
  yourCompany: string
  offer: string         // What you sell, one line
  persona: string       // Job title / role
  pain: string          // Pain or trigger
  outcome: string       // Quantified outcome they get
  tone: Tone
}

type Email = {
  day: string
  subject: string
  body: string
}

const TONE_META: Record<Tone, { label: string; sample: string; icon: typeof Heart }> = {
  direct:  { label: "Direct",  sample: "Consultative, terse, exec-friendly.",     icon: Briefcase },
  warm:    { label: "Warm",    sample: "Conversational and human.",                icon: Heart },
  playful: { label: "Playful", sample: "Founder-led, light, a bit irreverent.",    icon: Sparkles },
}

// Tiny first-name placeholder used in subject + body — interchangeable with
// {{first_name}} or [name] depending on the user's tool.
const FN = "{{first_name}}"

function pick<T>(arr: T[], seed: number): T {
  return arr[Math.abs(seed) % arr.length]
}

// String → 32-bit hash so "same inputs ⇒ same output". Lets users feel the
// generator is responsive to their changes (vs random each render).
function hash(s: string): number {
  let h = 5381
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0
  return h
}

function buildSequence(input: Inputs): Email[] {
  const seed = hash(JSON.stringify(input))

  const persona = input.persona.trim() || "Head of Growth"
  const offer = input.offer.trim() || "qualified meetings booked into your team's calendar"
  const pain = input.pain.trim() || "outbound that takes months to spin up and never quite books real meetings"
  const outcome = input.outcome.trim() || "an extra 20+ qualified meetings per month"
  const yourName = input.yourName.trim() || "Sarah"
  const yourCo = input.yourCompany.trim() || "FinalOutreach"

  // -- Subject lines --------------------------------------------------------
  const subj1 = pick(
    input.tone === "direct"
      ? [
          `Quick question on your outbound, ${FN}`,
          `${FN} — your ${persona.toLowerCase()} ramp`,
          `Idea on your pipeline this quarter`,
        ]
      : input.tone === "warm"
        ? [
            `${FN} — saw something I had to share`,
            `${FN}, two minutes on your outbound?`,
            `A note on your team's ${persona.toLowerCase()} workflow`,
          ]
        : [
            `${FN}, slightly nosy question`,
            `${FN} — pretending we already know each other`,
            `One unhinged email about pipeline`,
          ],
    seed,
  )

  const subj2 = pick(
    [
      `Re: ${subj1}`,
      `Following up — ${pain.split(" ").slice(0, 4).join(" ")}…`,
      `${FN}, one more thing`,
    ],
    seed + 1,
  )

  const subj3 = pick(
    [
      `Closing the loop, ${FN}`,
      `Should I close this thread?`,
      `Last note from ${yourName}`,
    ],
    seed + 2,
  )

  // -- Bodies ---------------------------------------------------------------
  const greet = (n: string) =>
    input.tone === "direct" ? `Hi ${n},` : input.tone === "warm" ? `Hey ${n},` : `${n}!`

  const signOff = (line: string) =>
    `${line}\n— ${yourName}\n${yourCo}`

  const email1: Email = {
    day: "Day 0",
    subject: subj1,
    body: [
      `${greet(FN)}`,
      "",
      input.tone === "direct"
        ? `Most ${persona.toLowerCase()}s I talk to are stuck on the same thing: ${pain}.`
        : input.tone === "warm"
          ? `I work with a lot of ${persona.toLowerCase()}s, and almost all of them tell me the same thing: ${pain}.`
          : `Slightly nosy: I keep meeting ${persona.toLowerCase()}s who tell me ${pain}. Curious if that's true for you too.`,
      "",
      `${yourCo} helps with exactly that — we ${offer.toLowerCase().startsWith("we ") ? offer.slice(3) : offer}, so teams see ${outcome} without hiring an SDR or rebuilding their stack.`,
      "",
      input.tone === "direct"
        ? `Worth a 15-minute call to see if it'd land for ${input.persona ? `your team` : `you`}?`
        : input.tone === "warm"
          ? `Open to a quick 15-min chat next week to see if it'd be useful?`
          : `Up for a 15-min chat? I promise not to send a deck.`,
      "",
      signOff(""),
    ].join("\n"),
  }

  const email2: Email = {
    day: "Day 3",
    subject: subj2,
    body: [
      `${greet(FN)}`,
      "",
      input.tone === "direct"
        ? `Wanted to bump this with one concrete data point: a ${persona.toLowerCase()} we worked with last quarter went from a flat outbound channel to ${outcome} in eight weeks.`
        : input.tone === "warm"
          ? `Realized my last note was a bit cold. The reason I reached out: a similar ${persona.toLowerCase()} we worked with hit ${outcome} in their first eight weeks with us.`
          : `Following up because the first one was probably ignored — fair! Quick proof it works: a ${persona.toLowerCase()} we worked with hit ${outcome} in 8 weeks.`,
      "",
      `Same playbook would slot into your team's stack. Even if it's not a fit right now, I'm happy to share the breakdown of what's actually working in cold for ${persona.toLowerCase()}s in 2026.`,
      "",
      input.tone === "direct"
        ? `Want me to send the breakdown, or should we just grab 15 minutes?`
        : input.tone === "warm"
          ? `Want the writeup? Or easier to just chat for 15?`
          : `Two options: I send the playbook, or we have a low-stakes call. Your pick.`,
      "",
      signOff(""),
    ].join("\n"),
  }

  const email3: Email = {
    day: "Day 7",
    subject: subj3,
    body: [
      `${greet(FN)}`,
      "",
      input.tone === "direct"
        ? `Closing the loop on this — last note from me. If solving ${pain} isn't a Q-priority, no worries.`
        : input.tone === "warm"
          ? `Last one from me, promise. If ${pain} isn't on your plate this quarter, totally understand.`
          : `Final email. If you want me to disappear forever, just hit reply with a single emoji and I'm gone.`,
      "",
      `If it ever moves up the list, my calendar's open. Otherwise — wishing you a good rest of the quarter.`,
      "",
      signOff(""),
    ].join("\n"),
  }

  return [email1, email2, email3]
}

function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text)
          setCopied(true)
          setTimeout(() => setCopied(false), 1200)
        } catch {
          // ignore — older browsers / restricted contexts
        }
      }}
      className="inline-flex items-center gap-1.5 rounded-full border border-ink-08 bg-background px-2.5 py-1 text-[11.5px] font-medium text-ink-60 transition-colors hover:border-ink/25 hover:text-ink"
    >
      {copied ? <CheckCheck className="size-3" /> : <Copy className="size-3" />}
      {copied ? "Copied" : label ?? "Copy"}
    </button>
  )
}

const TONES: Tone[] = ["direct", "warm", "playful"]

const DEFAULT_INPUTS: Inputs = {
  yourName: "Sarah",
  yourCompany: "FinalOutreach",
  offer: "We run done-for-you cold email and LinkedIn outbound for B2B SaaS",
  persona: "Head of Growth",
  pain: "outbound that takes months to spin up and never quite books real meetings",
  outcome: "30+ qualified meetings per month",
  tone: "direct",
}

export function ColdEmailGeneratorClient() {
  const id = useId()
  const [inputs, setInputs] = useState<Inputs>(DEFAULT_INPUTS)
  const sequence = useMemo(() => buildSequence(inputs), [inputs])

  const update = <K extends keyof Inputs>(k: K, v: Inputs[K]) =>
    setInputs((prev) => ({ ...prev, [k]: v }))

  const reset = () => setInputs(DEFAULT_INPUTS)

  const fullCopy = useMemo(
    () =>
      sequence
        .map(
          (e) =>
            `--- ${e.day} ---\nSubject: ${e.subject}\n\n${e.body}`,
        )
        .join("\n\n"),
    [sequence],
  )

  return (
    <ToolWorkbench
      inputs={
        <>
          <PanelHeading
            step="Step 01"
            title="Your offer & persona"
            hint="Short answers — a sentence each is enough."
            rightSlot={
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1.5 rounded-full border border-ink-08 bg-background px-2.5 py-1 text-[11.5px] font-medium text-ink-60 transition-colors hover:border-ink/25 hover:text-ink"
              >
                <RotateCcw className="size-3" /> Reset
              </button>
            }
          />

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FieldLabel htmlFor={`${id}-name`} label="Your first name">
                <input
                  id={`${id}-name`} value={inputs.yourName}
                  onChange={(e) => update("yourName", e.target.value)}
                  suppressHydrationWarning
                  className="w-full rounded-xl border border-ink-08 bg-background px-3.5 py-3 text-[15px] outline-none transition-all focus:border-ink/30 focus:ring-2 focus:ring-[oklch(0.55_0.13_78)]/20"
                />
              </FieldLabel>
              <FieldLabel htmlFor={`${id}-co`} label="Your company">
                <input
                  id={`${id}-co`} value={inputs.yourCompany}
                  onChange={(e) => update("yourCompany", e.target.value)}
                  suppressHydrationWarning
                  className="w-full rounded-xl border border-ink-08 bg-background px-3.5 py-3 text-[15px] outline-none transition-all focus:border-ink/30 focus:ring-2 focus:ring-[oklch(0.55_0.13_78)]/20"
                />
              </FieldLabel>
            </div>

            <FieldLabel htmlFor={`${id}-persona`} label="Target persona" hint="Job title or role">
              <div className="relative">
                <Users className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-ink-40" />
                <input
                  id={`${id}-persona`} value={inputs.persona}
                  onChange={(e) => update("persona", e.target.value)}
                  suppressHydrationWarning
                  placeholder="Head of Growth"
                  className="w-full rounded-xl border border-ink-08 bg-background py-3 pl-10 pr-3 text-[15px] outline-none transition-all focus:border-ink/30 focus:ring-2 focus:ring-[oklch(0.55_0.13_78)]/20"
                />
              </div>
            </FieldLabel>

            <FieldLabel htmlFor={`${id}-offer`} label="What you sell" hint="One line">
              <input
                id={`${id}-offer`} value={inputs.offer}
                onChange={(e) => update("offer", e.target.value)}
                suppressHydrationWarning
                placeholder="We run done-for-you cold email and LinkedIn outbound"
                className="w-full rounded-xl border border-ink-08 bg-background px-3.5 py-3 text-[15px] outline-none transition-all focus:border-ink/30 focus:ring-2 focus:ring-[oklch(0.55_0.13_78)]/20"
              />
            </FieldLabel>

            <FieldLabel htmlFor={`${id}-pain`} label="The pain you solve" hint="In their words">
              <textarea
                id={`${id}-pain`} value={inputs.pain}
                onChange={(e) => update("pain", e.target.value)}
                suppressHydrationWarning
                rows={2}
                placeholder="Outbound that takes months to spin up and never books real meetings"
                className="w-full resize-none rounded-xl border border-ink-08 bg-background px-3.5 py-3 text-[14.5px] leading-[1.55] outline-none transition-all focus:border-ink/30 focus:ring-2 focus:ring-[oklch(0.55_0.13_78)]/20"
              />
            </FieldLabel>

            <FieldLabel htmlFor={`${id}-outcome`} label="The outcome" hint="Quantified, if possible">
              <div className="relative">
                <Target className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-ink-40" />
                <input
                  id={`${id}-outcome`} value={inputs.outcome}
                  onChange={(e) => update("outcome", e.target.value)}
                  suppressHydrationWarning
                  placeholder="30+ qualified meetings per month"
                  className="w-full rounded-xl border border-ink-08 bg-background py-3 pl-10 pr-3 text-[15px] outline-none transition-all focus:border-ink/30 focus:ring-2 focus:ring-[oklch(0.55_0.13_78)]/20"
                />
              </div>
            </FieldLabel>

            <div>
              <p className="text-[12.5px] font-medium uppercase tracking-[0.14em] text-ink-60">
                Tone
              </p>
              <div className="mt-2 grid grid-cols-3 gap-2" role="radiogroup">
                {TONES.map((t) => {
                  const meta = TONE_META[t]
                  const Ic = meta.icon
                  const active = inputs.tone === t
                  return (
                    <button
                      key={t}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => update("tone", t)}
                      className={cn(
                        "rounded-xl border px-3 py-3 text-left transition-all",
                        active
                          ? "border-[oklch(0.55_0.13_78)]/40 bg-[oklch(0.97_0.02_78)] text-ink shadow-[0_0_0_3px_oklch(0.55_0.13_78/0.08)]"
                          : "border-ink-08 bg-background text-ink-60 hover:border-ink/25 hover:text-ink",
                      )}
                    >
                      <Ic className={cn("size-4", active && "text-[oklch(0.55_0.13_78)]")} />
                      <p className="mt-2 text-[13.5px] font-medium text-ink">{meta.label}</p>
                      <p className="mt-0.5 text-[11.5px] leading-[1.4] text-ink-60">{meta.sample}</p>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </>
      }
      results={
        <>
          <PanelHeading
            step="Step 02"
            title="Your 3-touch sequence"
            hint="Day 0 → Day 3 → Day 7. {{first_name}} swaps to your tool's merge tag."
            rightSlot={<CopyButton text={fullCopy} label="Copy all" />}
          />

          <div className="space-y-4">
            {sequence.map((email, i) => (
              <article
                key={i}
                className="overflow-hidden rounded-xl border border-ink-08 bg-background"
              >
                <header className="flex items-center justify-between gap-3 border-b border-ink-08 px-4 py-3 sm:px-5">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex size-7 items-center justify-center rounded-lg border border-ink-08 bg-card text-ink-60">
                      <Mail className="size-3.5" />
                    </span>
                    <div>
                      <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-40">
                        {email.day} · Email {i + 1}
                      </p>
                      <p className="mt-0.5 text-[14px] font-medium text-ink">
                        {email.subject}
                      </p>
                    </div>
                  </div>
                  <CopyButton text={`Subject: ${email.subject}\n\n${email.body}`} />
                </header>
                <div className="px-4 py-4 sm:px-5">
                  <pre className="whitespace-pre-wrap break-words font-sans text-[14px] leading-[1.65] text-ink">
                    {email.body}
                  </pre>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-5 text-[12px] leading-[1.55] text-ink-40">
            Templates are 20% of the equation. List quality, sender infrastructure,
            and personalization carry the other 80%.
          </p>
        </>
      }
    />
  )
}
