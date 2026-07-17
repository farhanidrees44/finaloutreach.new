"use client"

import { motion, useReducedMotion } from "framer-motion"

/**
 * Full-bleed hero waves — expand from center to viewport width,
 * then keep a soft, continuous undulation. Brand blue / purple / coral.
 */
export function HeroWaves() {
  const reduced = useReducedMotion()

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-[58%] z-0 w-screen max-w-none -translate-x-1/2"
    >
      <motion.div
        className="hero-waves-mask relative mx-auto h-[72px] w-full sm:h-[88px] md:h-[100px]"
        initial={reduced ? false : { opacity: 0, scaleX: 0.12 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={
          reduced
            ? { duration: 0 }
            : { duration: 1.35, delay: 0.15, ease: [0.16, 1, 0.3, 1] }
        }
        style={{ transformOrigin: "50% 50%" }}
      >
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full overflow-visible"
          fill="none"
        >
          <defs>
            <linearGradient id="hero-wave-fade" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="12%" stopColor="white" stopOpacity="1" />
              <stop offset="88%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <mask id="hero-wave-edge-mask">
              <rect width="1440" height="100" fill="url(#hero-wave-fade)" />
            </mask>
            <filter
              id="hero-wave-glow"
              x="-10%"
              y="-80%"
              width="120%"
              height="260%"
            >
              <feGaussianBlur stdDeviation="1.4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g mask="url(#hero-wave-edge-mask)" filter="url(#hero-wave-glow)">
            {/* Blue — top ribbon */}
            <path
              className="hero-wave hero-wave--a"
              d="M0 42 C 120 18, 240 66, 360 38 S 600 14, 720 44 S 960 78, 1080 40 S 1320 12, 1440 46"
              stroke="oklch(0.62 0.18 250)"
              strokeWidth="2.6"
              strokeLinecap="round"
              opacity="0.72"
            >
              {!reduced && (
                <animate
                  attributeName="d"
                  dur="5.5s"
                  repeatCount="indefinite"
                  calcMode="spline"
                  keyTimes="0;0.5;1"
                  keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
                  values="
                    M0 42 C 120 18, 240 66, 360 38 S 600 14, 720 44 S 960 78, 1080 40 S 1320 12, 1440 46;
                    M0 38 C 120 62, 240 22, 360 52 S 600 78, 720 36 S 960 10, 1080 54 S 1320 70, 1440 40;
                    M0 42 C 120 18, 240 66, 360 38 S 600 14, 720 44 S 960 78, 1080 40 S 1320 12, 1440 46
                  "
                />
              )}
            </path>

            {/* Purple — middle, strongest */}
            <path
              className="hero-wave hero-wave--b"
              d="M0 52 C 140 28, 260 76, 400 48 S 640 22, 760 56 S 1000 86, 1140 50 S 1320 24, 1440 58"
              stroke="oklch(0.55 0.24 295)"
              strokeWidth="2.8"
              strokeLinecap="round"
              opacity="0.88"
            >
              {!reduced && (
                <animate
                  attributeName="d"
                  dur="6.8s"
                  begin="-1.2s"
                  repeatCount="indefinite"
                  calcMode="spline"
                  keyTimes="0;0.5;1"
                  keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
                  values="
                    M0 52 C 140 28, 260 76, 400 48 S 640 22, 760 56 S 1000 86, 1140 50 S 1320 24, 1440 58;
                    M0 58 C 140 80, 260 30, 400 62 S 640 88, 760 40 S 1000 18, 1140 64 S 1320 82, 1440 48;
                    M0 52 C 140 28, 260 76, 400 48 S 640 22, 760 56 S 1000 86, 1140 50 S 1320 24, 1440 58
                  "
                />
              )}
            </path>

            {/* Coral — bottom accent */}
            <path
              className="hero-wave hero-wave--c"
              d="M0 62 C 160 44, 280 84, 420 58 S 680 34, 820 68 S 1040 92, 1180 60 S 1340 36, 1440 66"
              stroke="oklch(0.68 0.20 35)"
              strokeWidth="2.2"
              strokeLinecap="round"
              opacity="0.62"
            >
              {!reduced && (
                <animate
                  attributeName="d"
                  dur="7.6s"
                  begin="-2.4s"
                  repeatCount="indefinite"
                  calcMode="spline"
                  keyTimes="0;0.5;1"
                  keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
                  values="
                    M0 62 C 160 44, 280 84, 420 58 S 680 34, 820 68 S 1040 92, 1180 60 S 1340 36, 1440 66;
                    M0 68 C 160 90, 280 42, 420 72 S 680 96, 820 48 S 1040 28, 1180 74 S 1340 90, 1440 56;
                    M0 62 C 160 44, 280 84, 420 58 S 680 34, 820 68 S 1040 92, 1180 60 S 1340 36, 1440 66
                  "
                />
              )}
            </path>
          </g>
        </svg>
      </motion.div>
    </div>
  )
}
