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
        alt="FinalOutreach — Reach further. Convert smarter."
        width={421}
        height={160}
        priority
        className="h-12 w-auto sm:h-14 md:h-[3.75rem]"
      />
    </Link>
  )
}
