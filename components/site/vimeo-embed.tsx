"use client"

import { useEffect, useRef, useState } from "react"
import { Play } from "lucide-react"

/**
 * Volume the player should ramp up to once the user grants audio
 * permission (i.e. on their first click / touch / key / scroll).
 * Browsers BLOCK autoplay-with-sound, so the iframe must mount muted —
 * we then unmute on the first interaction and call setVolume(VOLUME).
 */
const VOLUME = 30

type Props = {
  /** Vimeo numeric ID (e.g. "76979871"). Takes priority over `url`. */
  videoId?: string
  /** YouTube video ID (e.g. "dQw4w9WgXcQ"). Takes priority over `url`. */
  youtubeId?: string
  /**
   * Full URL — works for Vimeo (vimeo.com/<id>) or YouTube
   * (youtube.com/watch?v=<id>, youtu.be/<id>, youtube.com/embed/<id>).
   */
  url?: string
  /** Optional poster/thumbnail shown before the user clicks play. */
  poster?: string
  title?: string
  /** Show a small eyebrow on the poster. */
  eyebrow?: string
  className?: string
  /**
   * If true, the video iframe loads on mount (no click required).
   * Also forces `mute=1` + `playsinline=1` so modern browsers actually
   * permit the autoplay (autoplay-with-sound is universally blocked).
   */
  autoplay?: boolean
}

type Resolved =
  | { provider: "vimeo"; id: string; src: string }
  | { provider: "youtube"; id: string; src: string }
  | null

function resolve(
  url?: string,
  videoId?: string,
  youtubeId?: string,
  autoplay?: boolean,
): Resolved {
  // YouTube requires `mute=1` for autoplay to actually start; Vimeo
  // requires `muted=1`. We only add these when autoplay is requested
  // so the click-to-play path keeps audio on. `enablejsapi=1` lets us
  // postMessage commands (unMute / setVolume) once the user interacts.
  const ytExtras = autoplay
    ? "&mute=1&playsinline=1&enablejsapi=1"
    : ""
  const vmExtras = autoplay ? "&muted=1&playsinline=1" : ""

  if (videoId) {
    return {
      provider: "vimeo",
      id: videoId,
      src: `https://player.vimeo.com/video/${videoId}?autoplay=1&title=0&byline=0&portrait=0&dnt=1${vmExtras}`,
    }
  }
  if (youtubeId) {
    return {
      provider: "youtube",
      id: youtubeId,
      src: `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1${ytExtras}`,
    }
  }
  if (!url) return null
  const v = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  if (v) {
    return {
      provider: "vimeo",
      id: v[1],
      src: `https://player.vimeo.com/video/${v[1]}?autoplay=1&title=0&byline=0&portrait=0&dnt=1${vmExtras}`,
    }
  }
  const y =
    url.match(/youtube\.com\/watch\?v=([\w-]+)/) ||
    url.match(/youtu\.be\/([\w-]+)/) ||
    url.match(/youtube\.com\/embed\/([\w-]+)/) ||
    url.match(/youtube\.com\/shorts\/([\w-]+)/)
  if (y) {
    return {
      provider: "youtube",
      id: y[1],
      src: `https://www.youtube-nocookie.com/embed/${y[1]}?autoplay=1&rel=0&modestbranding=1${ytExtras}`,
    }
  }
  return null
}

/**
 * Click-to-load video embed (Vimeo or YouTube). Renders a poster + play
 * button until the user clicks, so we don't ship a third-party iframe (and the
 * cookies it brings) on first paint.
 *
 * Examples:
 *   <VimeoEmbed url="https://vimeo.com/76979871" />
 *   <VimeoEmbed url="https://youtu.be/dQw4w9WgXcQ" />
 *   <VimeoEmbed videoId="76979871" />
 *   <VimeoEmbed youtubeId="dQw4w9WgXcQ" />
 */
export function VimeoEmbed({
  videoId,
  youtubeId,
  url,
  poster,
  title = "Product walkthrough",
  eyebrow = "Live walkthrough",
  className = "",
  autoplay = false,
}: Props) {
  const resolved = resolve(url, videoId, youtubeId, autoplay)
  // When `autoplay` is requested we skip the poster/click-to-load step
  // and mount the iframe straight away (the iframe URL is muted, which
  // is the only configuration browsers actually permit to autoplay).
  const [active, setActive] = useState(autoplay && !!resolved)
  const iframeRef = useRef<HTMLIFrameElement | null>(null)

  /*
    Auto-unmute on first user interaction.
    ──────────────────────────────────────
    Browsers will not let us start audio on page load — only after a
    user gesture. So we attach one-shot listeners for click / touch /
    key / scroll on the document, and the moment ANY of them fires we
    postMessage the YouTube/Vimeo iframe to unmute and lower volume to
    `VOLUME` (30%) so the page never blasts the visitor.

    All listeners auto-clean as soon as one fires.
  */
  useEffect(() => {
    if (!autoplay || !resolved) return

    let triggered = false

    const handler = () => {
      if (triggered) return
      triggered = true
      const win = iframeRef.current?.contentWindow
      if (!win) return cleanup()

      try {
        if (resolved.provider === "youtube") {
          // YouTube IFrame API command format
          win.postMessage(
            JSON.stringify({
              event: "command",
              func: "setVolume",
              args: [VOLUME],
            }),
            "*",
          )
          win.postMessage(
            JSON.stringify({ event: "command", func: "unMute", args: "" }),
            "*",
          )
        } else if (resolved.provider === "vimeo") {
          // Vimeo Player API command format
          win.postMessage(
            JSON.stringify({ method: "setVolume", value: VOLUME / 100 }),
            "*",
          )
          win.postMessage(
            JSON.stringify({ method: "setMuted", value: false }),
            "*",
          )
        }
      } catch {
        /* noop — best-effort */
      }
      cleanup()
    }

    const cleanup = () => {
      window.removeEventListener("pointerdown", handler)
      window.removeEventListener("touchstart", handler)
      window.removeEventListener("keydown", handler)
      window.removeEventListener("scroll", handler)
    }

    window.addEventListener("pointerdown", handler, { passive: true })
    window.addEventListener("touchstart", handler, { passive: true })
    window.addEventListener("keydown", handler, { passive: true })
    window.addEventListener("scroll", handler, { passive: true })

    return cleanup
  }, [autoplay, resolved])

  // Auto-derive a poster from YouTube if none was provided.
  const effectivePoster =
    poster ||
    (resolved?.provider === "youtube"
      ? `https://i.ytimg.com/vi/${resolved.id}/maxresdefault.jpg`
      : undefined)

  return (
    <div
      className={
        "relative mx-auto w-full max-w-[640px] overflow-hidden rounded-3xl border border-ink-08 bg-card shadow-[0_30px_80px_-30px_rgba(15,15,15,0.35)] " +
        className
      }
    >
      <div className="relative aspect-video w-full bg-gradient-to-br from-ink to-[oklch(0.22_0.02_280)]">
        {active && resolved ? (
          <iframe
            ref={iframeRef}
            src={resolved.src}
            title={title}
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 size-full"
          />
        ) : (
          <>
            {effectivePoster ? (
              <img
                src={effectivePoster}
                alt={title}
                className="absolute inset-0 size-full object-cover"
                loading="lazy"
              />
            ) : (
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 70% 60% at 30% 30%, oklch(0.55 0.24 295 / 0.45), transparent 60%), radial-gradient(ellipse 60% 60% at 80% 80%, oklch(0.74 0.16 200 / 0.35), transparent 65%), radial-gradient(ellipse 60% 50% at 50% 50%, oklch(0.58 0.22 250 / 0.30), transparent 70%)",
                }}
              />
            )}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:18px_18px] opacity-40 mix-blend-overlay"
            />
            {/* Soft vignette for legibility of overlay UI */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/20"
            />

            <button
              type="button"
              onClick={() => setActive(true)}
              disabled={!resolved}
              aria-label={resolved ? `Play ${title}` : "Video coming soon"}
              className="group absolute inset-0 grid place-items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-vibrant-purple/60"
            >
              <span className="grid size-20 place-items-center rounded-full bg-background/95 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] backdrop-blur transition-transform duration-200 group-hover:scale-105 group-active:scale-95 sm:size-24">
                <Play
                  className="size-7 translate-x-[2px] text-ink sm:size-8"
                  fill="currentColor"
                  strokeWidth={0}
                />
              </span>
            </button>

            <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-white/85 backdrop-blur sm:left-5 sm:top-5">
              <span className="size-1.5 rounded-full bg-[oklch(0.7_0.18_145)] pulse-dot" />
              {eyebrow}
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 sm:bottom-5 sm:left-5 sm:right-5">
              <p className="text-[13px] font-medium text-white drop-shadow sm:text-[14px]">
                {title}
              </p>
              {resolved ? (
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-white/80 backdrop-blur">
                  {resolved.provider === "youtube" ? "YouTube" : "Vimeo"} · 90s
                </span>
              ) : null}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
