"use client"

import { useEffect, useRef, useState } from "react"
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
} from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * Hero OrbitRing — continuous gradient ring with upright orbiting labels,
 * cursor-tilt stage (desktop only), and a real campaign reply-rate center metric.
 *
 * Metric source: property-management Smartlead campaign (same as ResultsBar / Proof).
 */

const SIZE = 380
const CX = SIZE / 2
const CY = SIZE / 2
const RING_R = 138
const LABEL_R = 158

/** Service terms — FinalOutreach positioning, not competitor copy */
const LABELS = [
  { text: "Cold email", angle: 0 },
  { text: "Meetings booked", angle: 90 },
  { text: "Deliverability", angle: 180 },
  { text: "LinkedIn", angle: 270 },
] as const

/** Real reply rate from the live property-management campaign */
const METRIC = {
  value: 11.58,
  decimals: 2,
  suffix: "%",
  label: "Reply rate",
  caption: "Live campaign",
} as const

const TILT_MAX = 16
const SPRING = { stiffness: 150, damping: 20, mass: 0.4 }
/** Slow ambient drift — full turn every 48s */
const ROTATION_DURATION_S = 48

type LabelPos = { x: number; y: number }

function polar(deg: number, radius: number) {
  const rad = (deg * Math.PI) / 180
  return {
    x: CX + radius * Math.cos(rad),
    y: CY + radius * Math.sin(rad),
  }
}

/** easeOutExpo — fast start, settles into the final value */
function easeOutExpo(t: number) {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

export function OrbitRing({ className }: { className?: string }) {
  const reduced = useReducedMotion()
  const [canTilt, setCanTilt] = useState(false)
  const [labelPos, setLabelPos] = useState<LabelPos[]>(() =>
    LABELS.map((l) => polar(l.angle - 90, LABEL_R)),
  )
  /** Mount-gated count-up display — always 2 decimal places */
  const [display, setDisplay] = useState("0.00")
  const countedRef = useRef(false)
  const ringGroupRef = useRef<SVGGElement>(null)

  const rotate = useMotionValue(0)
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const springX = useSpring(tiltX, SPRING)
  const springY = useSpring(tiltY, SPRING)

  // Desktop / pointer devices only for tilt
  useEffect(() => {
    if (typeof window === "undefined") return
    const mqFine = window.matchMedia("(hover: hover) and (pointer: fine)")
    const mqMd = window.matchMedia("(min-width: 768px)")
    const sync = () => setCanTilt(mqFine.matches && mqMd.matches && !reduced)
    sync()
    mqFine.addEventListener("change", sync)
    mqMd.addEventListener("change", sync)
    return () => {
      mqFine.removeEventListener("change", sync)
      mqMd.removeEventListener("change", sync)
    }
  }, [reduced])

  // Continuous ring rotation via SVG transform attribute (CSS rotate on <g> is unreliable)
  useEffect(() => {
    if (reduced) {
      ringGroupRef.current?.setAttribute(
        "transform",
        `rotate(0 ${CX} ${CY})`,
      )
      return
    }
    const controls = animate(rotate, 360, {
      duration: ROTATION_DURATION_S,
      ease: "linear",
      repeat: Infinity,
    })
    return () => controls.stop()
  }, [reduced, rotate])

  useMotionValueEvent(rotate, "change", (latest) => {
    // Native SVG transform — actually rotates the arcs
    ringGroupRef.current?.setAttribute(
      "transform",
      `rotate(${latest} ${CX} ${CY})`,
    )
    setLabelPos(LABELS.map((l) => polar(l.angle - 90 + latest, LABEL_R)))
  })

  // Count-up once on mount — NOT gated on IntersectionObserver (hero is already in view)
  useEffect(() => {
    if (countedRef.current) return
    countedRef.current = true

    if (reduced) {
      setDisplay(METRIC.value.toFixed(METRIC.decimals))
      return
    }

    const durationMs = 1800
    const start = performance.now()
    let raf = 0
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs)
      const eased = easeOutExpo(t)
      setDisplay((METRIC.value * eased).toFixed(METRIC.decimals))
      if (t < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount-once only
  }, [])

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canTilt) return
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    tiltX.set(Math.max(-TILT_MAX, Math.min(TILT_MAX, -py * TILT_MAX * 2)))
    tiltY.set(Math.max(-TILT_MAX, Math.min(TILT_MAX, px * TILT_MAX * 2)))
  }

  const onLeave = () => {
    tiltX.set(0)
    tiltY.set(0)
  }

  return (
    <div
      className={cn("relative mx-auto select-none", className)}
      style={{
        width: SIZE,
        height: SIZE,
        perspective: "900px",
      }}
      onMouseMove={canTilt ? onMove : undefined}
      onMouseLeave={canTilt ? onLeave : undefined}
      aria-label={`${METRIC.label}: ${METRIC.value}${METRIC.suffix} from a live campaign`}
      role="img"
    >
      <motion.div
        className="absolute inset-0"
        style={{
          transformStyle: "preserve-3d",
          transformPerspective: 900,
          willChange: "transform",
          // Always bind springs — listener is what gates tilt input
          rotateX: springX,
          rotateY: springY,
        }}
      >
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 size-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-2xl"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklch, var(--primary) 35%, transparent), transparent 70%)",
          }}
        />

        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="absolute inset-0 overflow-visible"
          aria-hidden
        >
          <defs>
            <linearGradient
              id="orbit-ring-stroke"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="var(--vibrant-purple)" />
              <stop offset="45%" stopColor="var(--electric-blue)" />
              <stop offset="100%" stopColor="var(--bright-cyan)" />
            </linearGradient>
            <linearGradient
              id="orbit-ring-track"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="var(--ink)" stopOpacity="0.06" />
              <stop offset="100%" stopColor="var(--ink)" stopOpacity="0.12" />
            </linearGradient>
          </defs>

          <circle
            cx={CX}
            cy={CY}
            r={RING_R}
            fill="none"
            stroke="url(#orbit-ring-track)"
            strokeWidth="1.5"
          />

          {/* Rotating arcs — SVG transform attr, not CSS rotate on <g> */}
          <g ref={ringGroupRef} transform={`rotate(0 ${CX} ${CY})`}>
            <circle
              cx={CX}
              cy={CY}
              r={RING_R}
              fill="none"
              stroke="url(#orbit-ring-stroke)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="220 650"
              opacity="0.95"
            />
            <circle
              cx={CX}
              cy={CY}
              r={RING_R}
              fill="none"
              stroke="url(#orbit-ring-stroke)"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeDasharray="80 790"
              strokeDashoffset="280"
              opacity="0.55"
            />
          </g>
        </svg>

        {LABELS.map((label, i) => {
          const pos = labelPos[i] ?? polar(label.angle - 90, LABEL_R)
          return (
            <div
              key={label.text}
              className="pointer-events-none absolute left-0 top-0"
              style={{
                transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
                willChange: "transform",
              }}
            >
              <span className="inline-flex whitespace-nowrap rounded-full border border-ink-08 bg-background/95 px-3 py-1 text-[11px] font-semibold tracking-tight text-ink shadow-[0_8px_24px_-12px_rgba(15,15,15,0.35)] backdrop-blur-sm">
                {label.text}
              </span>
            </div>
          )
        })}

        <div className="absolute left-1/2 top-1/2 flex size-[148px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-ink-08 bg-background/95 text-center shadow-[0_20px_50px_-24px_rgba(15,15,15,0.4)] backdrop-blur-md">
          <span className="text-[34px] font-extrabold leading-none tracking-tight tabular text-ink">
            {display}
            {METRIC.suffix}
          </span>
          <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-60">
            {METRIC.label}
          </p>
          <p className="mt-0.5 text-[10px] text-ink-40">{METRIC.caption}</p>
        </div>
      </motion.div>
    </div>
  )
}
