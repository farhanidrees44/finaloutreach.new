import type { Metadata } from "next"
import { SITE } from "@/lib/site-data"

const LAST_UPDATED = "April 1, 2026"

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `How ${SITE.name} uses cookies and similar technologies on our website.`,
  alternates: { canonical: "/legal/cookies" },
  robots: { index: true, follow: true },
}

export default function CookiesPage() {
  return (
    <>
      <header className="mb-10">
        <p className="text-[12px] uppercase tracking-[0.18em] text-ink-60">Legal</p>
        <h1 className="mt-2 font-display text-4xl font-medium text-ink md:text-5xl">
          Cookie Policy
        </h1>
        <p className="mt-3 text-[13.5px] text-ink-60">Last updated: {LAST_UPDATED}</p>
      </header>

      <section className="space-y-6 text-[15px] leading-7 text-ink-80">
        <p>
          This Cookie Policy explains how {SITE.name} uses cookies and similar
          technologies when you visit{" "}
          <strong>{SITE.domain.replace(/^https?:\/\//, "")}</strong>.
        </p>

        <h2 className="mt-10 text-2xl font-medium text-ink">1. What are cookies?</h2>
        <p>
          Cookies are small text files placed on your device by websites you
          visit. They help sites function properly, remember your preferences,
          and understand how visitors interact with content.
        </p>

        <h2 className="mt-10 text-2xl font-medium text-ink">2. Cookies we use</h2>
        <ul className="list-disc pl-6">
          <li>
            <strong>Strictly necessary.</strong> Required for the site to
            function (e.g., theme preference, form CSRF protection). These
            cannot be disabled.
          </li>
          <li>
            <strong>Analytics.</strong> Help us understand which pages perform
            and where visitors come from. We use privacy-respecting analytics
            (Plausible / Google Analytics 4 in IP-anonymized mode) where
            enabled.
          </li>
          <li>
            <strong>Functional.</strong> Remember small UI choices like dark
            mode or whether you've dismissed a banner.
          </li>
        </ul>
        <p>
          We do <strong>not</strong> use cross-site advertising cookies on this
          marketing site.
        </p>

        <h2 className="mt-10 text-2xl font-medium text-ink">3. Your choices</h2>
        <p>
          Most browsers let you block or delete cookies through their settings.
          Disabling strictly-necessary cookies may break parts of the site.
          You can also opt out of Google Analytics with the{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            className="underline"
            target="_blank"
            rel="noreferrer"
          >
            official opt-out add-on
          </a>
          .
        </p>

        <h2 className="mt-10 text-2xl font-medium text-ink">4. Do Not Track</h2>
        <p>
          We honor browser-level Do Not Track signals where technically
          possible. We do not use cookies for cross-site advertising.
        </p>

        <h2 className="mt-10 text-2xl font-medium text-ink">5. Updates</h2>
        <p>
          As our site evolves we may update this Cookie Policy. The "Last
          updated" date above will always reflect the current version.
        </p>

        <h2 className="mt-10 text-2xl font-medium text-ink">6. Contact</h2>
        <p>
          Questions? Email{" "}
          <a className="underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
      </section>
    </>
  )
}
