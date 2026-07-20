"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Linkedin, MapPin, Mail } from "lucide-react"
import { SectionEyebrow } from "./section-eyebrow"

const TEAM = [
  {
    name: "Rashid Sohail",
    role: "Appointment Setter",
    img: "/team-rashid.jpg",
    years: 4,
    specialty: "High-volume meeting booking",
    linkedin: "https://www.linkedin.com/in/b2bleadgeneration/",
    upwork: "https://www.upwork.com/freelancers/~0193ea0e0dae009f12",
  },
  {
    name: "Asad Ali",
    role: "LinkedIn Outreach Expert",
    img: "/team-asad.jpg",
    years: 5,
    specialty: "LinkedIn automation & messaging",
    linkedin: "",
    upwork: "https://www.upwork.com/freelancers/~0161f67425575c317f",
  },
  {
    name: "Zohaib Ali",
    role: "Cold Email Automation",
    img: "/team-zohaib.jpg",
    years: 4,
    specialty: "Deliverability & sequence design",
    linkedin: "https://www.linkedin.com/in/b2bemaillistbuilding/",
    upwork: "https://www.upwork.com/freelancers/~013b8f0e0c6635a943",
  },
  {
    name: "Abdul Hanan",
    role: "Sales Development Manager",
    img: "/team-abdul.jpg",
    years: 6,
    specialty: "Pipeline strategy & team lead",
    linkedin: "https://www.linkedin.com/in/abdul-hannan-iub/",
    upwork: "https://www.upwork.com/freelancers/~0176cff7d8ce31aad3",
  },
] as const

export function FounderStory() {
  return (
    <section id="about" className="border-t border-ink-08 bg-background">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12 py-24 md:py-32">
        <SectionEyebrow number="08" label="About the founder" />

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — Image composition */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Main photo container */}
            <div className="relative mx-auto w-full max-w-[420px] lg:mx-0">
              {/* Decorative emerald offset frame */}
              <div
                aria-hidden="true"
                className="absolute -bottom-4 -right-4 h-full w-full rounded-2xl bg-gradient-to-br from-emerald-deep/20 to-emerald-deep/10"
              />
              {/* Main headshot */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-ink-08 bg-cream shadow-[0_20px_50px_-20px_rgba(0,0,0,0.15)]">
                <Image
                  src="/farhan-headshot.jpg"
                  alt="Farhan Idrees, founder of FinalOutreach"
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover object-top transition-transform duration-700 hover:scale-[1.02]"
                  priority
                />
              </div>

              {/* AI avatar overlay */}
              <div className="absolute -bottom-6 -left-6 z-10">
                <div className="relative size-28 overflow-hidden rounded-2xl border-4 border-background shadow-lg sm:size-32">
                  <Image
                    src="/farhan-avatar.jpg"
                    alt="Farhan Idrees AI portrait"
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </div>
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-2 py-0.5 text-[9px] uppercase tracking-[0.12em] text-background">
                  AI portrait
                </span>
              </div>

            </div>

            {/* Founder social links — Upwork & LinkedIn (centered under image) */}
            <div className="mx-auto mt-14 flex w-full max-w-[420px] items-center justify-center gap-3 lg:mx-0">
              {/* Upwork — brand green pill */}
              <a
                href="https://www.upwork.com/freelancers/~011313c5d00451195e"
                target="_blank"
                rel="noreferrer"
                aria-label="Farhan Idrees on Upwork"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#14a800] px-3.5 py-2 text-white shadow-[0_3px_12px_rgba(20,168,0,0.40)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0f8600] hover:shadow-[0_6px_18px_rgba(20,168,0,0.55)]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-4 shrink-0"
                  aria-hidden="true"
                >
                  <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
                </svg>
                <span className="text-[12px] font-semibold tracking-wide">Upwork</span>
              </a>

              {/* LinkedIn — brand blue pill */}
              <a
                href="https://www.linkedin.com/in/farhan-idrees/"
                target="_blank"
                rel="noreferrer"
                aria-label="Farhan Idrees on LinkedIn"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#0077b5] px-3.5 py-2 text-white shadow-[0_3px_12px_rgba(0,119,181,0.40)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#005f8e] hover:shadow-[0_6px_18px_rgba(0,119,181,0.55)]"
              >
                <Linkedin className="size-4 shrink-0" />
                <span className="text-[12px] font-semibold tracking-wide">LinkedIn</span>
              </a>
            </div>
          </motion.div>

          {/* Right — Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            {/* Name & title */}
            <h2 className="text-balance text-[40px] font-extrabold leading-[1.05] tracking-tight text-ink sm:text-[52px]">
              Farhan{" "}
              <span className="font-serif-italic text-electric-blue">Idrees.</span>
            </h2>
            <p className="mt-3 text-[15px] font-medium uppercase tracking-[0.14em] text-emerald-deep">
              Founder & CEO, FinalOutreach
            </p>

            {/* Location & contact */}
            <div className="mt-5 flex flex-wrap items-center gap-4 text-[13px] text-ink-40">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-3.5" />
                Remote — Serving global B2B
              </span>
              <a
                href="mailto:farhan@finaloutreach.com"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-ink"
              >
                <Mail className="size-3.5" />
                farhan@finaloutreach.com
              </a>
              <a
                href="https://www.linkedin.com/in/farhan-idrees/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-ink"
              >
                <Linkedin className="size-3.5" />
                LinkedIn
              </a>
            </div>

            {/* Bio */}
            <div className="mt-8 flex max-w-xl flex-col gap-4 text-[15px] font-semibold leading-[1.7] text-ink-60">
              <p>
                I started FinalOutreach because I was tired of watching
                founders burn cash on agencies that deliver slide decks instead
                of pipeline. Years inside cold email deliverability, list
                building, and appointment setting taught me what actually moves
                the needle — and what wastes budget.
              </p>
              <p>
                We keep the roster intentionally small, take the calls
                ourselves, and measure success the only way that matters —
                qualified meetings on your calendar.
              </p>
            </div>

            {/* Quote */}
            <figure className="mt-10 max-w-xl border-l-2 border-emerald-deep/60 pl-5">
              <blockquote className="font-serif-italic text-[20px] leading-[1.35] text-ink sm:text-[24px]">
                &ldquo;I&apos;d rather lose the deal on a call than win it with
                a deck full of promises we can&apos;t keep.&rdquo;
              </blockquote>
              <figcaption className="mt-3 text-[12px] uppercase tracking-[0.14em] text-ink-40">
                Farhan Idrees — Founder
              </figcaption>
            </figure>
          </motion.div>
        </div>

        {/* Team grid */}
        <div className="mt-20 border-t border-ink-08 pt-12">
          <div className="flex items-end justify-between">
            <h3 className="text-[14px] uppercase tracking-[0.18em] text-ink-40">
              The team
            </h3>
            <p className="hidden text-[12.5px] text-ink-40 sm:block">
              Hover to see specialty &amp; experience
            </p>
          </div>
          <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {TEAM.map((m, i) => (
              <motion.li
                key={m.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-cream">
                  <Image
                    src={m.img}
                    alt={m.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 200px"
                    className="object-cover grayscale transition-all duration-500 group-hover:scale-[1.04] group-hover:grayscale-0"
                  />
                  {/* Reveal overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/85 via-ink/30 to-transparent p-3 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                    <p className="text-[11.5px] uppercase tracking-[0.16em] text-background/70">
                      Specialty
                    </p>
                    <p className="text-[12.5px] font-medium leading-tight text-background">
                      {m.specialty}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-2">
                  <p className="text-[14px] font-medium text-ink">{m.name}</p>
                  <p className="font-mono text-[10.5px] text-ink-40">
                    {m.years}y
                  </p>
                </div>
                <p className="text-[12.5px] text-ink-60">{m.role}</p>
                {/* Social links — Upwork & LinkedIn below text.
                    flex-wrap prevents overflow into neighbouring cards on
                    narrow grid columns. Icon-only below lg (cards ≤ ~200px),
                    full label + icon at lg+ where the column is wide enough. */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {/* Upwork — brand green pill */}
                  {m.upwork && (
                    <a
                      href={m.upwork}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${m.name} on Upwork`}
                      title={`${m.name} on Upwork`}
                      className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#14a800] p-2 text-white shadow-[0_3px_12px_rgba(20,168,0,0.40)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0f8600] hover:shadow-[0_6px_18px_rgba(20,168,0,0.55)] lg:px-3 lg:py-1.5"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-4 shrink-0"
                        aria-hidden="true"
                      >
                        <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
                      </svg>
                      <span className="hidden text-[12px] font-semibold tracking-wide lg:inline">
                        Upwork
                      </span>
                    </a>
                  )}

                  {/* LinkedIn — brand blue pill */}
                  {m.linkedin && (
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${m.name} on LinkedIn`}
                      title={`${m.name} on LinkedIn`}
                      className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#0077b5] p-2 text-white shadow-[0_3px_12px_rgba(0,119,181,0.40)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#005f8e] hover:shadow-[0_6px_18px_rgba(0,119,181,0.55)] lg:px-3 lg:py-1.5"
                    >
                      <Linkedin className="size-4 shrink-0" />
                      <span className="hidden text-[12px] font-semibold tracking-wide lg:inline">
                        LinkedIn
                      </span>
                    </a>
                  )}
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
