/**
 * BOOKINGS PROOF — recent anonymized appointments showcase
 *
 * BEFORE DEPLOY:
 * - [ ] Replace entries with real anonymized past bookings from your CRM/calendar
 * - [ ] Format: role + company stage/industry — never full personal names or company legal names
 * - [ ] Set isLiveFeed: false unless this actually pulls from a live API
 * - [ ] Do NOT label the UI "Live" when isLiveFeed is false (use "Recent bookings")
 *
 * This array drives a looping AnimatePresence feed — it is a showcase, not a live websocket.
 */

export type BookingProof = {
  id: string
  role: string
  /** e.g. "Series B SaaS" — anonymized segment, not a real company name */
  segment: string
  dayLabel: string
  timeLabel: string
  channel: "Cold email" | "LinkedIn" | "Multi-channel"
}

export const BOOKINGS_PROOF_META = {
  /** Must stay false until wired to a real data source */
  isLiveFeed: false as const,
  label: "Recent bookings",
  sublabel: "Anonymized appointments from recent client calendars — illustrative of volume and mix.",
}

export const BOOKINGS_PROOF: BookingProof[] = [
  // PLACEHOLDER — replace with real anonymized bookings before deploy
  {
    id: "b1",
    role: "VP Sales",
    segment: "Series B SaaS",
    dayLabel: "Tue",
    timeLabel: "2:00 PM",
    channel: "Cold email",
  },
  {
    id: "b2",
    role: "Head of Growth",
    segment: "Series A fintech",
    dayLabel: "Wed",
    timeLabel: "10:30 AM",
    channel: "Multi-channel",
  },
  {
    id: "b3",
    role: "Founder / CEO",
    segment: "Agency · 40–80 seats",
    dayLabel: "Wed",
    timeLabel: "1:00 PM",
    channel: "LinkedIn",
  },
  {
    id: "b4",
    role: "CRO",
    segment: "Series C healthtech",
    dayLabel: "Thu",
    timeLabel: "11:00 AM",
    channel: "Cold email",
  },
  {
    id: "b5",
    role: "Director of Demand",
    segment: "B2B SaaS · Series A",
    dayLabel: "Thu",
    timeLabel: "3:30 PM",
    channel: "Multi-channel",
  },
  {
    id: "b6",
    role: "Partner",
    segment: "Consulting firm",
    dayLabel: "Fri",
    timeLabel: "9:15 AM",
    channel: "LinkedIn",
  },
  {
    id: "b7",
    role: "VP Marketing",
    segment: "Series B DevTools",
    dayLabel: "Fri",
    timeLabel: "2:45 PM",
    channel: "Cold email",
  },
  {
    id: "b8",
    role: "Head of Sales",
    segment: "Industrial B2B",
    dayLabel: "Mon",
    timeLabel: "12:00 PM",
    channel: "Multi-channel",
  },
]
