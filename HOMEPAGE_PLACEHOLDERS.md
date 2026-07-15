# Homepage rebuild — placeholder gate checklist

This documents what must be real before shipping the rebuilt homepage to production.

## Data files to populate

| File | Status | What you need |
|------|--------|---------------|
| `data/certifications.ts` | **Ready** — badge images from your uploads in `/public/certifications` | Add public `verifyUrl` links where platforms expose them; confirm `dateEarned` |
| `data/campaign-proof.ts` | **Placeholder-gated** | Replace SVG placeholders with real redacted campaign screenshots under `/public/proof`. Set `isPlaceholder: false` |
| `data/bookings-proof.ts` | **Placeholder-gated** | Replace the anonymized booking array with real past appointments (role + industry/stage only). Keep `isLiveFeed: false` unless wired to a live API |
| `data/testimonials.ts` | **Placeholder-gated** | Real quotes with written permission + real names/companies only. Set `isPlaceholder: false` |
| `data/stack-tools.ts` | Ready | Optional: swap wordmarks for official brand-kit SVGs |
| `data/homepage-faq.ts` | Ready | Shared by FAQ UI + FAQPage JSON-LD |

## Sections with SAMPLE ribbons (dev only)

`NODE_ENV !== "production"` shows amber **SAMPLE** ribbons on:

- Stats in `ResultsBar` (all four figures pending audit)
- Campaign proof gallery items where `isPlaceholder: true`
- Testimonial cards where `isPlaceholder: true`
- Certification cards only when `isPlaceholder: true` (currently all real badges)

These ribbons are stripped automatically in production builds. Still do **not** ship unverified stats/testimonials/campaign shots.

## Non-negotiables already enforced

1. **No “Trusted by [Stripe/Slack/…]”** — replaced by **Our Stack** marquee with identification disclaimer.
2. **Tools ≠ clients** — Apollo, Instantly, GHL, HubSpot, Clay, HeyReach, etc. framed as tools we operate.
3. **No invented testimonials** — old fabricated names removed; placeholders only until permission exists.
4. **Bookings widget** labeled **Recent bookings / Showcase**, never “Live”.
5. **Calendar screenshots you attached** (third-party personal calendars) were **not** used as proof assets — they informed the widget UX only.

## Before deploy — quick pass

- [ ] Swap campaign dashboard images + captions
- [ ] Confirm or replace homepage stats with audited numbers
- [ ] Add real testimonials (or hide the Voice section until ready)
- [ ] Paste verification URLs into certifications
- [ ] Confirm case studies on the page only use clients with naming permission
- [ ] Push to `farhanidrees44/finaloutreach.new` (Vercel → `finaloutreach-new.vercel.app`)

## New homepage section order

1. Hero  
2. Our Stack  
3. Recognitions / Credentials  
4. Campaign proof gallery (+ lightbox)  
5. Bookings proof widget  
6. Results (count-up)  
7. Services  
8. Process (scroll-linked)  
9. Case studies  
10. Testimonials (placeholder-gated)  
11. FAQ (+ FAQPage JSON-LD)  
12. Pricing  
13. Final CTA  
