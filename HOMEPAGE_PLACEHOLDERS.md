# Homepage rebuild — placeholder gate checklist

## Punch-list status (pre-launch review)

| Item | Status |
|------|--------|
| Hero headline visible on load | Fixed — direct `animate`, no whileInView stuck opacity |
| Our Stack marquee | Fixed — LogoBadge + icon marks, CSS infinite loop, pause on hover |
| Process section dead space | Fixed — compact step cards + per-step visuals (no 80vh voids) |
| Campaign screenshots | Fixed — intentional “Screenshot pending upload” cards |
| Case studies honesty | Fixed — `data/homepage-case-studies.ts` placeholders + SAMPLE ribbon |
| Booking timezone | Fixed — visitor `Intl` timezone; Calendly owns slot TZ |
| Video section | Added — placeholder poster + play; set `VIDEO_SRC` when ready |
| LogoBadge consistency | Added — used on Our Stack; certs/footer use fixed square boxes |
| Org / FAQ / Service JSON-LD | Root Organization; homepage + pricing FAQ; services Service |
| `/llms.txt` | Served via `app/llms.txt/route.ts` |

## Data files to populate before honest launch

| File | What you need |
|------|---------------|
| `data/certifications.ts` | Public `verifyUrl` links |
| `data/campaign-proof.ts` | Real redacted screenshots; set `isPlaceholder: false` |
| `data/bookings-proof.ts` | Real anonymized bookings |
| `data/testimonials.ts` | Permissioned quotes |
| `data/homepage-case-studies.ts` | Permissioned case cards |
| `components/site/video-section.tsx` | Set `VIDEO_SRC` + real poster |
| ResultsBar stats | Audited figures |

## Still on you (not buildable by code alone)

Real campaign screenshots, the video file/link, audited numbers, and permissioned testimonials/case studies.
