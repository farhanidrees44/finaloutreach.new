import type { Metadata } from "next"
import { SITE } from "@/lib/site-data"

const LAST_UPDATED = "April 1, 2026"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE.name} collects, uses, and protects personal information from website visitors and clients.`,
  alternates: { canonical: "/legal/privacy" },
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return (
    <>
      <header className="mb-10">
        <p className="text-[12px] uppercase tracking-[0.18em] text-ink-60">Legal</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-[13.5px] text-ink-60">Last updated: {LAST_UPDATED}</p>
      </header>

      <section className="space-y-6 text-[15px] leading-7 text-ink-80">
        <p>
          {SITE.name} ("we," "us," or "our") respects your privacy. This Privacy
          Policy explains what information we collect when you visit{" "}
          <strong>{SITE.domain.replace(/^https?:\/\//, "")}</strong>, contact us, or
          engage our services, how we use it, and the choices you have.
        </p>

        <h2 className="mt-10 text-2xl font-medium text-ink">1. Information we collect</h2>
        <p>We collect information in three ways:</p>
        <ul className="list-disc pl-6">
          <li>
            <strong>Information you provide.</strong> When you fill out a form
            (contact, strategy call, lead magnet, newsletter), we collect the
            details you submit — typically your name, work email, company,
            website, and message.
          </li>
          <li>
            <strong>Information we collect automatically.</strong> Like most
            websites, we collect basic technical information about your visit
            (IP address, browser type, pages viewed, referring URL) using
            cookies and similar technologies. See our{" "}
            <a className="underline" href="/legal/cookies">Cookie Policy</a>.
          </li>
          <li>
            <strong>Information from third parties.</strong> If you book a
            meeting with us, we may receive scheduling data from our booking
            tool. If you sign a contract or pay an invoice, we receive billing
            data from our payment processor.
          </li>
        </ul>

        <h2 className="mt-10 text-2xl font-medium text-ink">2. How we use information</h2>
        <ul className="list-disc pl-6">
          <li>To respond to inquiries and deliver the services you request.</li>
          <li>To send you the resources you ask for (e.g., guides, templates).</li>
          <li>To send occasional product or company updates (you can unsubscribe at any time).</li>
          <li>To improve our website, content, and services.</li>
          <li>To meet legal, tax, and accounting obligations.</li>
        </ul>
        <p>
          We do <strong>not</strong> sell or rent your personal information to
          third parties.
        </p>

        <h2 className="mt-10 text-2xl font-medium text-ink">3. Lawful basis (GDPR)</h2>
        <p>
          For visitors in the EEA and UK, we process personal data on the basis
          of (a) your consent, (b) the performance of a contract, (c) our
          legitimate interests in operating and growing our business, or (d)
          compliance with a legal obligation.
        </p>

        <h2 className="mt-10 text-2xl font-medium text-ink">4. Sharing</h2>
        <p>We share information with vetted service providers that help us run our business:</p>
        <ul className="list-disc pl-6">
          <li>Hosting, analytics, and error monitoring (e.g., Vercel, Plausible/GA4).</li>
          <li>Email delivery (e.g., Resend) for transactional and resource emails.</li>
          <li>CRM and pipeline tools (e.g., HubSpot, Pipedrive) used by our team.</li>
          <li>Payment and accounting providers when you become a client.</li>
        </ul>
        <p>
          We may also disclose information if required by law or to protect the
          rights, property, or safety of {SITE.name} or others.
        </p>

        <h2 className="mt-10 text-2xl font-medium text-ink">5. Data retention</h2>
        <p>
          We keep personal information only as long as needed for the purposes
          described above, to comply with our legal and tax obligations, or to
          resolve disputes. Lead-form data is typically retained for 24 months
          unless you request earlier deletion.
        </p>

        <h2 className="mt-10 text-2xl font-medium text-ink">6. Your rights</h2>
        <p>
          Depending on where you live, you may have the right to access,
          correct, delete, or port your personal data, to object to or restrict
          processing, and to withdraw consent. To exercise any of these rights,
          email us at{" "}
          <a className="underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          We respond within 30 days.
        </p>

        <h2 className="mt-10 text-2xl font-medium text-ink">7. Security</h2>
        <p>
          We use reasonable administrative, technical, and physical safeguards
          (TLS in transit, access controls, encrypted storage where
          appropriate). No system is 100% secure, but we treat your data with
          the care we'd want for our own.
        </p>

        <h2 className="mt-10 text-2xl font-medium text-ink">8. Children</h2>
        <p>
          Our services are intended for businesses and adults. We do not
          knowingly collect data from children under 16.
        </p>

        <h2 className="mt-10 text-2xl font-medium text-ink">9. International transfers</h2>
        <p>
          We are a remote team operating across the Americas and EMEA. By using
          our site you understand that your information may be processed in
          countries other than your own, with appropriate safeguards in place.
        </p>

        <h2 className="mt-10 text-2xl font-medium text-ink">10. Changes</h2>
        <p>
          We may update this policy. The "Last updated" date at the top will
          always reflect the current version. Material changes will be
          highlighted on this page.
        </p>

        <h2 className="mt-10 text-2xl font-medium text-ink">11. Contact</h2>
        <p>
          Questions? Email{" "}
          <a className="underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
      </section>
    </>
  )
}
