"use client"

/**
 * Ambient three-line wave under the hero script line.
 * Same stroke language as the former play-cue waves — thinner, softer, low opacity.
 */
export function HeroWave() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 420 36"
      className="pointer-events-none mx-auto mt-3 h-8 w-full max-w-[min(100%,28rem)] overflow-visible sm:mt-4 sm:h-9"
      fill="none"
    >
      <path
        className="hero-wave hero-wave--a"
        d="M8 18 C 70 6, 120 26, 180 14 S 300 8, 412 16"
        stroke="var(--hero-wave-accent-1)"
        strokeWidth="1.35"
        strokeLinecap="round"
        opacity="0.45"
      >
        <animate
          attributeName="d"
          dur="2.8s"
          repeatCount="indefinite"
          values="
            M8 18 C 70 6, 120 26, 180 14 S 300 8, 412 16;
            M8 14 C 70 24, 120 8, 180 22 S 300 20, 412 12;
            M8 18 C 70 6, 120 26, 180 14 S 300 8, 412 16
          "
        />
      </path>
      <path
        className="hero-wave hero-wave--b"
        d="M12 22 C 90 10, 140 28, 210 16 S 320 12, 408 20"
        stroke="var(--hero-wave-accent-2)"
        strokeWidth="1.25"
        strokeLinecap="round"
        opacity="0.4"
      >
        <animate
          attributeName="d"
          dur="3.4s"
          begin="-0.8s"
          repeatCount="indefinite"
          values="
            M12 22 C 90 10, 140 28, 210 16 S 320 12, 408 20;
            M12 16 C 90 26, 140 12, 210 24 S 320 22, 408 14;
            M12 22 C 90 10, 140 28, 210 16 S 320 12, 408 20
          "
        />
      </path>
      <path
        className="hero-wave hero-wave--c"
        d="M20 24 C 100 16, 160 28, 230 18 S 340 16, 400 22"
        stroke="var(--hero-wave-accent-3)"
        strokeWidth="1.15"
        strokeLinecap="round"
        opacity="0.35"
      >
        <animate
          attributeName="d"
          dur="4s"
          begin="-1.5s"
          repeatCount="indefinite"
          values="
            M20 24 C 100 16, 160 28, 230 18 S 340 16, 400 22;
            M20 18 C 100 26, 160 14, 230 24 S 340 22, 400 16;
            M20 24 C 100 16, 160 28, 230 18 S 340 16, 400 22
          "
        />
      </path>
    </svg>
  )
}
