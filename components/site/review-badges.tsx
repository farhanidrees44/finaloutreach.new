"use client"

import { cn } from "@/lib/utils"

type ReviewBadge = {
  id: string
  name: string
  rating: number
  /** Optional short label under the logo (e.g. High Performer) */
  badge?: string
}

const BADGES: ReviewBadge[] = [
  { id: "g2-hp", name: "G2", rating: 4.9, badge: "High Performer" },
  { id: "g2", name: "G2", rating: 4.9 },
  { id: "capterra", name: "Capterra", rating: 4.7 },
  { id: "getapp", name: "GetApp", rating: 4.7 },
  { id: "clutch", name: "Clutch", rating: 5.0 },
]

function StarRow({ rating, id }: { rating: number; id: string }) {
  return (
    <div className="flex items-center gap-0.5" aria-hidden>
      {Array.from({ length: 5 }, (_, i) => {
        const fill = Math.min(1, Math.max(0, rating - i))
        const gradId = `star-${id}-${i}`
        return (
          <svg
            key={i}
            viewBox="0 0 20 20"
            className="size-3.5 sm:size-4"
          >
            <defs>
              <linearGradient id={gradId}>
                <stop offset={`${fill * 100}%`} stopColor="#F5C518" />
                <stop offset={`${fill * 100}%`} stopColor="rgba(255,255,255,0.22)" />
              </linearGradient>
            </defs>
            <path
              d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.27 5.06 16.71l.94-5.5-4-3.9 5.53-.8L10 1.5z"
              fill={`url(#${gradId})`}
            />
          </svg>
        )
      })}
    </div>
  )
}

function PlatformMark({ id, name }: { id: string; name: string }) {
  if (id === "g2-hp" || id === "g2") {
    return (
      <span className="inline-flex items-center gap-2">
        <span className="grid size-8 place-items-center rounded-lg bg-white text-[11px] font-extrabold tracking-tight text-ink sm:size-9 sm:text-[12px]">
          G2
        </span>
        {id === "g2-hp" ? (
          <span className="hidden text-[11px] font-semibold uppercase tracking-[0.12em] text-white/70 sm:inline">
            High Performer
          </span>
        ) : (
          <span className="text-[13px] font-semibold text-white sm:text-[14px]">{name}</span>
        )}
      </span>
    )
  }

  if (id === "clutch") {
    return (
      <span className="inline-flex items-center gap-2">
        <span className="relative grid size-8 place-items-center rounded-full bg-white sm:size-9">
          <span className="text-[14px] font-extrabold text-[#17313B]">C</span>
          <span className="absolute bottom-1.5 right-1.5 size-1.5 rounded-full bg-[#EF4135]" />
        </span>
        <span className="text-[13px] font-semibold text-white sm:text-[14px]">Clutch</span>
      </span>
    )
  }

  if (id === "capterra") {
    return (
      <span className="inline-flex items-center gap-2">
        <span
          className="size-0 border-x-[7px] border-b-[12px] border-x-transparent border-b-[#1F9CED] sm:border-x-[8px] sm:border-b-[14px]"
          aria-hidden
        />
        <span className="text-[13px] font-semibold text-white sm:text-[14px]">Capterra</span>
      </span>
    )
  }

  // GetApp
  return (
    <span className="inline-flex items-center gap-2">
      <span className="relative size-8 sm:size-9" aria-hidden>
        <span className="absolute left-1 top-1 size-3.5 rotate-45 rounded-[3px] bg-[#3B82F6]" />
        <span className="absolute bottom-1 right-1 size-3.5 rotate-45 rounded-[3px] bg-[#60A5FA]" />
      </span>
      <span className="text-[13px] font-semibold text-white sm:text-[14px]">GetApp</span>
    </span>
  )
}

/**
 * Responsive review ratings for the final CTA — replaces the old strip PNG.
 */
export function ReviewBadges({ className }: { className?: string }) {
  return (
    <ul
      className={cn(
        "grid w-full grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5",
        className,
      )}
      aria-label="Review ratings on G2, Capterra, GetApp, and Clutch"
    >
      {BADGES.map((badge) => (
        <li
          key={badge.id}
          className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-3 backdrop-blur-sm sm:px-3.5 sm:py-3.5"
        >
          <PlatformMark id={badge.id} name={badge.name} />
          {badge.badge && (
            <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/45 sm:hidden">
              {badge.badge}
            </span>
          )}
          <div className="mt-auto flex flex-col gap-1">
            <StarRow rating={badge.rating} id={badge.id} />
            <span className="text-[13px] font-semibold tabular-nums text-white/90">
              {badge.rating.toFixed(1)}
              <span className="sr-only">
                {" "}
                out of 5 on {badge.name}
                {badge.badge ? ` (${badge.badge})` : ""}
              </span>
            </span>
          </div>
        </li>
      ))}
    </ul>
  )
}
