import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex shrink-0 items-center transition-opacity duration-300 hover:opacity-90",
        className,
      )}
      aria-label="FinalOutreach home"
    >
      <Image
        src="/logo.png"
        alt="FinalOutreach.com — Reach further. Convert smarter."
        width={388}
        height={120}
        priority
        className="h-10 w-auto sm:h-11"
      />
    </Link>
  )
}
