import type { Metadata } from "next"
import { SITE } from "@/lib/site-data"

const LAST_UPDATED = "April 1, 2026"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that govern your use of the ${SITE.name} website and services.`,
  alternates: { canonical: "/legal/terms" },
  robots: { index: true, follow: true },
}

export default function TermsPage() {
  return (
    <>
      <header className="mb-10">
        <p className="text-[12px] uppercase tracking-[0.18em] text-ink-60">Legal</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
          Terms of Service
        </h1>
        <p className="mt-3 text-[13.5px] text-ink-60">Last updated: {LAST_UPDATED}</p>
      </header>

      <section className="space-y-6 text-[15px] leading-7 text-ink-80">
        <p>
          These Terms of Service ("Terms") govern your access to and use of the{" "}
          {SITE.name} website ("Site") and any services we provide through it.
          By using the Site, you agree to these Terms. If you do not agree, do
          not use the Site.
        </p>

        <h2 className="mt-10 text-2xl font-medium text-ink">1. Who we are</h2>
        <p>
          {SITE.name} is a B2B cold outreach and lead generation studio. Our
          paid services are governed by a separate Master Services Agreement
          (MSA) signed with each client; these Terms apply only to your use of
          the public Site.
        </p>

        <h2 className="mt-10 text-2xl font-medium text-ink">2. Acceptable use</h2>
        <p>You agree not to:</p>
        <ul className="list-disc pl-6">
          <li>Use the Site for any unlawful purpose.</li>
          <li>Attempt to access non-public areas, scrape at unreasonable rates, or interfere with the Site's operation.</li>
          <li>Submit false or misleading information, including fake leads.</li>
          <li>Reverse engineer, copy, or republish substantial portions of our content without permission.</li>
        </ul>

        <h2 className="mt-10 text-2xl font-medium text-ink">3. Intellectual property</h2>
        <p>
          All content on the Site — copy, design, code, logos, case studies,
          playbooks, templates — is owned by {SITE.name} or our licensors and
          protected by copyright and trademark law. You may share excerpts with
          attribution and a link back. You may not reproduce material amounts
          for commercial purposes without written permission.
        </p>

        <h2 className="mt-10 text-2xl font-medium text-ink">4. Resources and downloads</h2>
        <p>
          Free resources (playbooks, templates, calculators) are provided
          "as-is" for informational purposes. Results vary; nothing on the Site
          constitutes a guarantee of outcomes for your business.
        </p>

        <h2 className="mt-10 text-2xl font-medium text-ink">5. Third-party links</h2>
        <p>
          The Site may contain links to third-party websites and tools. We're
          not responsible for their content, terms, or practices. Use them at
          your own risk.
        </p>

        <h2 className="mt-10 text-2xl font-medium text-ink">6. Disclaimers</h2>
        <p>
          The Site is provided "as-is" and "as available" without warranties of
          any kind, express or implied, including merchantability, fitness for
          a particular purpose, and non-infringement. We do not warrant the
          Site will be uninterrupted, error-free, or free of harmful
          components.
        </p>

        <h2 className="mt-10 text-2xl font-medium text-ink">7. Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, {SITE.name} and its team will
          not be liable for any indirect, incidental, special, consequential,
          or punitive damages, or any loss of profits or revenues, whether
          incurred directly or indirectly, arising from your use of the Site.
          Our total liability for any claims arising from your use of the Site
          will not exceed USD $100.
        </p>

        <h2 className="mt-10 text-2xl font-medium text-ink">8. Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless {SITE.name} from any claims,
          losses, or damages arising from your misuse of the Site or violation
          of these Terms.
        </p>

        <h2 className="mt-10 text-2xl font-medium text-ink">9. Privacy</h2>
        <p>
          Your use of the Site is also subject to our{" "}
          <a className="underline" href="/legal/privacy">Privacy Policy</a>.
        </p>

        <h2 className="mt-10 text-2xl font-medium text-ink">10. Changes</h2>
        <p>
          We may update these Terms from time to time. Continued use of the
          Site after changes are posted constitutes acceptance.
        </p>

        <h2 className="mt-10 text-2xl font-medium text-ink">11. Governing law</h2>
        <p>
          These Terms are governed by the laws of the State of Delaware, USA,
          without regard to its conflict-of-law principles. Any dispute will be
          resolved in the state or federal courts located in Delaware.
        </p>

        <h2 className="mt-10 text-2xl font-medium text-ink">12. Contact</h2>
        <p>
          Questions about these Terms? Email{" "}
          <a className="underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
      </section>
    </>
  )
}
