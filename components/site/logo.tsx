import Link from "next/link"
import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex h-8 shrink-0 items-center transition-opacity duration-300 hover:opacity-90 sm:h-9",
        className,
      )}
      aria-label="FinalOutreach home"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt="FinalOutreach — Reach further. Convert smarter."
        width={339}
        height={120}
        className="h-full w-auto max-h-9 object-contain object-left"
        decoding="async"
      />
    </Link>
  )
}
