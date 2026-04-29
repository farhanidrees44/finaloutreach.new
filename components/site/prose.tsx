import type React from "react"

/**
 * Lightweight markdown-lite renderer.
 *
 * Supports:
 *   ## Heading 2
 *   ### Heading 3
 *   - bullet item     (consecutive `- ` lines become a <ul>)
 *   1. ordered item   (consecutive numbered lines become an <ol>)
 *   > blockquote
 *   blank line        => paragraph break
 *
 * Inline:
 *   **bold**
 *   *italic*
 *   `code`
 *
 * Headings are auto-slugged for in-page anchor links.
 */

export function slugifyHeading(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80)
}

export function extractHeadings(body: string): { level: 2 | 3; text: string; id: string }[] {
  const out: { level: 2 | 3; text: string; id: string }[] = []
  for (const raw of body.split("\n")) {
    const line = raw.trim()
    if (line.startsWith("### ")) {
      const text = line.slice(4).trim()
      out.push({ level: 3, text, id: slugifyHeading(text) })
    } else if (line.startsWith("## ")) {
      const text = line.slice(3).trim()
      out.push({ level: 2, text, id: slugifyHeading(text) })
    }
  }
  return out
}

function renderInline(text: string): React.ReactNode[] {
  // Order matters: bold before italic, code first.
  const parts: React.ReactNode[] = []
  const re = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g
  let lastIndex = 0
  let key = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) {
    if (m.index > lastIndex) parts.push(text.slice(lastIndex, m.index))
    const token = m[0]
    if (token.startsWith("**")) {
      parts.push(
        <strong key={`b-${key++}`} className="font-semibold text-foreground">
          {token.slice(2, -2)}
        </strong>,
      )
    } else if (token.startsWith("`")) {
      parts.push(
        <code
          key={`c-${key++}`}
          className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.92em] text-foreground"
        >
          {token.slice(1, -1)}
        </code>,
      )
    } else if (token.startsWith("*")) {
      parts.push(
        <em key={`i-${key++}`} className="italic">
          {token.slice(1, -1)}
        </em>,
      )
    }
    lastIndex = re.lastIndex
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex))
  return parts
}

type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string }

function parseBlocks(body: string): Block[] {
  const lines = body.replace(/\r\n/g, "\n").split("\n")
  const blocks: Block[] = []
  let para: string[] = []
  let ul: string[] = []
  let ol: string[] = []
  let quote: string[] = []

  const flushPara = () => {
    if (para.length) {
      blocks.push({ type: "p", text: para.join(" ") })
      para = []
    }
  }
  const flushUl = () => {
    if (ul.length) {
      blocks.push({ type: "ul", items: ul })
      ul = []
    }
  }
  const flushOl = () => {
    if (ol.length) {
      blocks.push({ type: "ol", items: ol })
      ol = []
    }
  }
  const flushQuote = () => {
    if (quote.length) {
      blocks.push({ type: "quote", text: quote.join(" ") })
      quote = []
    }
  }
  const flushAll = () => {
    flushPara()
    flushUl()
    flushOl()
    flushQuote()
  }

  for (const raw of lines) {
    const line = raw.trim()

    if (line === "") {
      flushAll()
      continue
    }
    if (line.startsWith("## ")) {
      flushAll()
      blocks.push({ type: "h2", text: line.slice(3).trim() })
      continue
    }
    if (line.startsWith("### ")) {
      flushAll()
      blocks.push({ type: "h3", text: line.slice(4).trim() })
      continue
    }
    if (line.startsWith("- ")) {
      flushPara()
      flushOl()
      flushQuote()
      ul.push(line.slice(2).trim())
      continue
    }
    const olMatch = line.match(/^(\d+)\.\s+(.*)$/)
    if (olMatch) {
      flushPara()
      flushUl()
      flushQuote()
      ol.push(olMatch[2].trim())
      continue
    }
    if (line.startsWith("> ")) {
      flushPara()
      flushUl()
      flushOl()
      quote.push(line.slice(2).trim())
      continue
    }
    flushUl()
    flushOl()
    flushQuote()
    para.push(line)
  }
  flushAll()
  return blocks
}

export function Prose({ body, className }: { body: string; className?: string }) {
  const blocks = parseBlocks(body)
  return (
    <div className={className}>
      {blocks.map((b, i) => {
        if (b.type === "h2") {
          const id = slugifyHeading(b.text)
          return (
            <h2
              key={i}
              id={id}
              className="mt-12 mb-5 scroll-mt-24 font-serif text-2xl text-balance text-foreground md:text-3xl"
            >
              <a href={`#${id}`} className="no-underline hover:underline">
                {b.text}
              </a>
            </h2>
          )
        }
        if (b.type === "h3") {
          const id = slugifyHeading(b.text)
          return (
            <h3
              key={i}
              id={id}
              className="mt-8 mb-3 scroll-mt-24 font-serif text-xl text-balance text-foreground md:text-2xl"
            >
              {b.text}
            </h3>
          )
        }
        if (b.type === "ul") {
          return (
            <ul key={i} className="mb-6 list-disc space-y-2 pl-6 text-lg leading-relaxed text-foreground/90">
              {b.items.map((it, j) => (
                <li key={j}>{renderInline(it)}</li>
              ))}
            </ul>
          )
        }
        if (b.type === "ol") {
          return (
            <ol key={i} className="mb-6 list-decimal space-y-2 pl-6 text-lg leading-relaxed text-foreground/90">
              {b.items.map((it, j) => (
                <li key={j}>{renderInline(it)}</li>
              ))}
            </ol>
          )
        }
        if (b.type === "quote") {
          return (
            <blockquote
              key={i}
              className="my-8 border-l-4 border-primary/40 bg-muted/40 px-5 py-4 text-lg italic leading-relaxed text-foreground/90"
            >
              {renderInline(b.text)}
            </blockquote>
          )
        }
        return (
          <p key={i} className="mb-6 text-lg leading-relaxed text-foreground/90">
            {renderInline(b.text)}
          </p>
        )
      })}
    </div>
  )
}
