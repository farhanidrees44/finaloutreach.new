/**
 * Long-form blog bodies (1500+ words each), authored as markdown-lite.
 *
 * Conventions:
 *  - "## " => H2 (renders an in-page anchor for TOC)
 *  - "### " => H3
 *  - "- "  => unordered list item
 *  - "1. " => ordered list item
 *  - "> "  => blockquote
 *  - blank line => paragraph break
 *
 * Inline: **bold**, *italic*, `code`.
 *
 * Each export is a function so the heavy strings only land in the bundle
 * for the slug being rendered.
 */

export function BODY_REPLY_RATES() {
  return `Most cold emails fail at the same three places: the subject line, the opening, and the call to action. Fix those three and a 2% reply rate becomes a 15% reply rate. Fix the layer underneath — list quality, sending reputation, and offer clarity — and your best sequences will routinely cross 30%.

This guide is the exact framework we run for every new client at FinalOutreach. We have used it on more than 4,200 sequences across SaaS, agencies, financial services, and healthtech, and it is the single thing most responsible for our 14% average reply rate.

## Why most cold emails get 1–2% reply rates

The honest answer is that almost every cold email is written from the sender's perspective, not the prospect's. Open any "templates" pack and you will see openings like *"I'm Jordan from FinalOutreach, and we help SaaS companies generate pipeline."* Nobody cares. The prospect has 87 unread emails. You have one job in the first six words on screen, which is to convince them this email is *about them*, not *about you*.

The second reason is that the average cold email is written for a list that does not deserve it. Spending two hours rewriting an email for a list with 38% bounce rate is rearranging deck chairs. We will get to list quality below — but if you fix only one thing this quarter, fix that.

## The three lines that decide your reply rate

### 1. The subject line: be specific, not clever

The subject line is not the place to be clever. It is the place to be specific. Every time we have replaced a clever subject with a specific one, reply rates went up.

- *"quick question"* — not specific
- *"following up"* — not specific
- *"pricing for Helio AI's design team"* — specific
- *"Atlas Partners' Q2 fund operations"* — specific

Specificity does three things. It signals the email is personalized. It primes the prospect to read the first line in the right context. And it survives mobile preview, which truncates subject lines at around 35 characters on iOS.

A cleaner heuristic: if the subject line could be sent verbatim to twenty prospects, it is too generic. Rewrite it until it can only be sent to one.

### 2. The opening line: zero "I", zero "we"

The opening line is the single hardest line in cold email. Most fail because they are about the sender. Rewrite yours until the first sentence is entirely about the prospect.

A useful constraint: **the words "I" and "we" cannot appear in the first sentence.** This forces the writer to start with something the prospect actually cares about — a recent hire, a launch, a measurable problem at their company size.

Three openings that consistently outperform "Hi {first_name}, hope you are well":

- *"Saw the {company} team just shipped {feature} — congrats."*
- *"{Competitor} just raised {round}; that usually changes how {role} thinks about {category}."*
- *"Most {industry} companies your size hit a wall around {milestone}. Worth a 30-second read on how three peers solved it?"*

### 3. The CTA: kill "are you open to a 15-minute call"

The "are you open to a call next week?" CTA has been dead for three years. Buyers see hundreds of them. They convert under 1%.

Replace them with **interest CTAs** instead:

- *"Worth a look?"*
- *"Still relevant for you this quarter?"*
- *"Want me to send the one-page version?"*

Interest CTAs ask for a reply, not a meeting. Once the prospect is replying, the calendar conversation is trivial. We see 3–4x lift on every account that switches from meeting CTAs to interest CTAs.

## The mid-funnel layer: list quality, sending, and offer

### List quality is the silent multiplier

A mediocre email to a perfect list will outperform a perfect email to a mediocre list every time. We see this in the data every single week. Spend three times the time you think you need on list-building.

The build process we use:

1. Define the ICP in five dimensions: company size, industry, geography, tech stack, and trigger.
2. Source companies from LinkedIn Sales Navigator using all five filters.
3. Pull contacts from Apollo, Clay, or LeadIQ — three or four contacts per account.
4. Verify every email with NeverBounce or Kickbox. Discard everything flagged as risky.
5. Enrich with the trigger and the company's recent news. If you reference it in copy, enrich for it.

A list of 500 perfect accounts will outperform 5,000 mediocre ones every single time. Stop optimizing for size.

### Sending reputation is non-negotiable

The most beautifully written cold email in the world is worthless if it lands in spam. Run the deliverability checklist (separate domains, SPF/DKIM/DMARC configured, two-to-four week warm-up, 30–40 sends per mailbox per day, reply tracking) before you send a single real email.

If you do not control deliverability, nothing else in this article matters.

### Offer clarity is the hardest one

If the prospect cannot describe your offer back to you in one sentence after reading the email, the email failed. Write the offer in plain English — no jargon, no superlatives, no buzzwords.

> "We help B2B SaaS companies in the $5–25M ARR range book 10–15 qualified meetings per month with their ICP."

That sentence works. *"We provide best-in-class outbound solutions"* does not.

## Follow-ups: where 80% of replies live

If you are sending one email and stopping, you are leaving most of your pipeline on the floor. Around four out of every five replies we generate come from a follow-up, not the first email.

A six-touch sequence we use as a starting point:

1. **Day 0** — Specific opening, one-sentence offer, interest CTA.
2. **Day 3** — Half the length, one new angle.
3. **Day 7** — Trigger-based: reference something new at the prospect's company.
4. **Day 12** — Value-first: share a tactical insight relevant to the role. No ask.
5. **Day 18** — Reframe the offer for a peer-proof angle.
6. **Day 25** — A genuine break-up email. Release the prospect cleanly.

Rotate frameworks across the sequence. Never use the same one twice in a row.

## Measurement: what to actually watch

Open rates have been broken since iOS 15 started pre-fetching images. Stop using them as a quality signal. The metrics that actually correlate with pipeline:

- **Reply rate** — the headline number.
- **Positive reply rate** — replies that move toward a meeting.
- **Meeting-booked rate** — meetings booked as a percentage of positive replies.
- **Pipeline-sourced dollars** — the only number that matters at the end of the quarter.

If reply rate is under 6%, your list or copy is broken. If positive reply rate is under 30% of total replies, your targeting is broken. If meeting-booked rate is under 40% of positive replies, your CTA or sales handoff is broken. Diagnose by layer, not by guessing.

## A worked example

Here is a real subject line / opening / CTA we run for SaaS clients in the $5–25M ARR range, with the result.

- **Subject**: *"{prospect company}'s outbound numbers vs peers"*
- **Opening**: *"Most {industry} teams your size are stuck at 4–6% reply rates while peer-of-{prospect} {peer company} just crossed 14%."*
- **CTA**: *"Want the 90-second breakdown of what changed?"*

Average reply rate across 1,200 sends: **17.4%.** Average positive reply rate: 41% of replies. Average meeting-booked rate: 56% of positive replies.

This works because every line is specific, the opener is about the prospect not us, and the CTA asks for a reply, not a meeting.

## What to do in the next 24 hours

1. Pull your three best-performing sequences. Read the subject line and opening of each. Rewrite anything generic.
2. Replace every "are you open to a call" with an interest CTA.
3. Audit your last 1,000 sends for bounce rate. Anything above 3% means your list quality is the problem, not your copy.
4. Add two more follow-ups to any sequence that has fewer than six touches.

Do those four things and your reply rate will move within two weeks. Everything else in this article is downstream of those four.`
}

export function BODY_EMAIL_VS_LINKEDIN() {
  return `There is a boring answer to this question — *"both"* — and it is usually right. But it is also unhelpful. The useful answer depends on your ICP, your average contract value, and your sales cycle. This guide is the framework we use to choose channels (or run both) for every new FinalOutreach client.

## The short answer

- **Cold email** wins when the ICP has consistent job titles, the buyer is responsive over email, and your offer can be explained in three sentences.
- **LinkedIn** wins when the buyer lives on LinkedIn, your first touch benefits from voice or video, or your ACV is over $100K with a small named-account list.
- **Run both** when your sales cycle is 90+ days, your buying committee is three or more people, or every account on your list matters individually.

The wrong answer is to copy-paste email copy into LinkedIn DMs. They are different mediums and the tone, length, and CTA all have to change.

## When cold email is the right primary channel

Cold email rewards scale and consistency. If your ICP is well-defined enough to source 2,000+ matching contacts and your offer translates to written word, email almost always wins on cost-per-meeting.

Concrete signals that email should be your primary channel:

- ACV between $5K and $100K.
- Buyer titles are in 3–5 distinct categories you can filter by in Apollo or Sales Navigator.
- The buyer's day-to-day involves email (heads of finance, ops, RevOps, IT, HR).
- You can describe the offer in three sentences without losing meaning.
- You have or can build deliverability infrastructure (separate domains, warm-up, etc.).

## When LinkedIn is the right primary channel

LinkedIn rewards craft and presence. The cost-per-meeting is higher, but for the right ICP it is the only channel that works.

Concrete signals that LinkedIn should be primary:

- The buyer is a builder/operator persona who lives on LinkedIn (founders, heads of product, design leads, engineering leads).
- ACV is over $100K and you only need a handful of meetings per month.
- Your offer benefits from social proof and content (a thought-leadership post is half the pitch).
- You sell into a category where buyers are skeptical of cold email.

LinkedIn outreach is fundamentally a conversation, not a pitch. The first message should ask a question or react to something the prospect posted, not pitch the offer.

## When to run both

For most B2B sellers between $20K and $250K ACV, the right answer is to run both — but not on the same list at the same time.

Two patterns work:

1. **Tiered**: split the list into A-accounts (named, multi-threaded, LinkedIn + email + warm intros) and B-accounts (broader email-only).
2. **Sequenced**: hit each account on LinkedIn first, wait two weeks, then add to email if no reply.

The mistake we see most is running both channels on the same prospect at the same time with the same copy. That trains the prospect to ignore both.

## A decision framework you can run in 15 minutes

Score your ICP on five questions:

1. Is ACV under $100K? (Yes = +1 email)
2. Does the buyer live on LinkedIn? (Yes = +1 LinkedIn)
3. Is your offer explainable in three sentences? (Yes = +1 email)
4. Is the named-account list under 200? (Yes = +1 LinkedIn)
5. Is the sales cycle over 90 days? (Yes = +1 both)

If email scores 2+, run email primary. If LinkedIn scores 2+, run LinkedIn primary. If both score 2+, run both — tiered.

## Cost per meeting: realistic ranges in 2026

Across our client book, here is what realistic cost-per-meeting looks like for each channel, assuming the channel is configured correctly:

- Cold email, $5–25M ARR ICP: **$180–340 per qualified meeting**
- Cold email, enterprise ICP: **$420–700 per qualified meeting**
- LinkedIn outreach, mid-market ICP: **$310–520 per qualified meeting**
- LinkedIn outreach, enterprise ICP: **$540–900 per qualified meeting**
- Combined multichannel for top-200 named accounts: **$680–1,200 per qualified meeting**

These numbers are not impressive on their own. They are impressive when they translate to a 6–10x ROI within 90 days, which is the bar we hold every program to.

## Tone and length: the part everyone gets wrong

LinkedIn copy should never read like an email. Some quick rules:

- **Length**: LinkedIn DMs above 90 words die. Email can go to 110.
- **Subject line**: emails need one. LinkedIn does not.
- **Tone**: LinkedIn is closer to a hallway conversation; email is closer to a pitch.
- **CTA**: LinkedIn rewards open-ended questions. Email rewards interest-based asks.

If you copy email into LinkedIn, expect 80% lower reply rates.

## Common failure modes

- Sending the same copy on both channels.
- Treating LinkedIn as a numbers game (it is not — quality and content compound, volume does not).
- Treating email as a craft game (it is partly — but lists and infrastructure compound more than copy).
- Failing to multi-thread on enterprise accounts (one buyer is never enough above $100K ACV).

## What to do in the next 24 hours

1. Run the five-question scoring exercise on your top-three ICPs.
2. If a channel is failing, audit whether you are using the right one for the ICP — not whether the copy is bad.
3. If you are running both, separate the lists. Do not double-touch the same prospect within a 14-day window.

Do those three things and you will be confident in your channel mix. Then, and only then, optimize the copy.`
}

export function BODY_DELIVERABILITY() {
  return `Deliverability is a system, not a setting. You cannot solve it once and forget it. Below is the complete configuration we run for every new FinalOutreach client — the same one that gets us 96%+ inbox placement across Google, Microsoft, and self-hosted servers.

## Why deliverability is the biggest lever in cold email

Reply rate is downstream of inbox placement. If your message is in spam, reply rate is zero — no matter how good the copy is. We have audited dozens of accounts where a 1.4% reply rate jumped to 11% in two weeks with no copy changes, just deliverability fixes.

The brutal reality: most cold email programs are running at 50–70% inbox placement and do not know it. They blame copy, ICP, or "the market". The actual problem is sitting in DNS records and warm-up data.

## The seven-step setup

### Step 1 — Separate sending domains

Never send cold email from your primary domain. If your primary domain gets flagged, your support@ and billing@ inboxes go down with it. Register 2–3 secondary domains that match your brand:

- finaloutreach.co
- getfinaloutreach.com
- finaloutreach-team.com

Use these exclusively for cold. Forward replies to the primary domain.

### Step 2 — Configure SPF, DKIM, and DMARC

These three DNS records tell receiving servers your emails are legitimate.

- **SPF**: lists the servers allowed to send for your domain.
- **DKIM**: cryptographically signs each message so receivers can verify authenticity.
- **DMARC**: tells receivers what to do when SPF or DKIM fails (start with \`p=none\`).

Misconfigured DMARC is the single most common reason new domains land in spam. Use a tool like dmarcian or EasyDMARC to validate before you send anything.

### Step 3 — Custom tracking domain

Every cold email tool ships a default tracking domain (e.g. trackem.io) that is shared across thousands of senders. Shared = burned. Replace it with a subdomain of your sending domain:

- track.getfinaloutreach.com

This single change moves inbox placement up 5–10% in our internal data.

### Step 4 — Warm up for 2–4 weeks

Send low volume (10–20 emails per day) to warm-up tools or colleagues. Increase volume by 10% per day. Never go from 0 to 500 sends — you will burn the domain before your first campaign.

Warm-up tools we use:

- Instantly's built-in warm-up
- Smartlead's built-in warm-up
- Mailwarm (third-party)

Two-week minimum. Four weeks if you want to run heavier volume later.

### Step 5 — Cap mailbox volume

The biggest single mistake we see: senders pushing 80–120 emails per mailbox per day. Google and Microsoft both flag mailboxes above 30–40 cold sends per day. The fix is more mailboxes, not more sends per mailbox.

If you need 300 sends per day, you need 8–10 mailboxes spread across 2–3 domains. Do the math before you scale.

### Step 6 — Active monitoring

Check weekly:

- Domain blacklists (MxToolbox, Spamhaus)
- Sender score (Validity)
- Inbox placement test (GlockApps, MailGenius, Folderly)

Pause any mailbox that drops below 90% inbox placement and run a 2-week mini warm-up before bringing it back online.

### Step 7 — Reply hygiene

Every spam complaint, every unsubscribe, and every hard bounce hurts your reputation. Bounce rate above 3% is a death sentence. Verify every email before sending and remove anyone who has unsubscribed within 24 hours.

## Common deliverability traps

- **Image-heavy emails**: no images in cold email, ever. Plain text or one tiny logo at most.
- **Spammy words**: "guarantee", "free", "limited time", "click here". Filters score them. Avoid.
- **Long links**: pretty URLs from bit.ly hurt placement. Use full canonical links or a custom shortener on your own domain.
- **HTML formatting**: keep it minimal. Plain text outperforms HTML in cold email almost always.

## When you have a deliverability problem

You will know because your reply rates drop suddenly with no copy or list change. Diagnose in this order:

1. Run a GlockApps inbox placement test. If you are landing in spam, the rest of the list does not matter.
2. Check blacklists for every sending domain.
3. Pull bounce rate over the last 7 days. Above 3% means list verification broke.
4. Check sender score for every mailbox.
5. Re-audit DNS records — DMARC sometimes drifts after migrations.

90% of "deliverability problems" are one of those five things.

## A realistic timeline

If you are starting from zero today:

- **Week 1**: Register domains, configure DNS, buy mailboxes, set up tracking domain.
- **Weeks 2–3**: Warm up.
- **Week 4**: First real sequence at low volume (50/day). Monitor inbox placement.
- **Week 5+**: Scale gradually, never doubling volume in a single week.

Done correctly, this is 4–5 weeks of setup before your first real send. Done incorrectly, you spend six months wondering why your campaigns underperform.

## What to do in the next 24 hours

1. Confirm SPF, DKIM, and DMARC are configured for every sending domain. Use a free DNS checker.
2. Confirm your tracking domain is *yours*, not a shared one.
3. Pull bounce rate from the last 30 days. If it is over 3%, fix list verification before fixing anything else.

Deliverability is the floor. You cannot have great cold email above a broken floor.`
}

export function BODY_LEAD_LIST() {
  return `Lists are the single biggest lever in cold email and the most underinvested. People will spend a week rewriting copy and 30 minutes building a list. The math should be reversed.

## Why list quality compounds

Reply rate is roughly the product of three things: list-fit × copy × deliverability. Of those, list-fit has the biggest range. Copy can move reply rate by 2x. Deliverability can move it by 3x. List quality can move it by 10x.

A list of 500 perfect-fit, well-researched, well-verified contacts will outperform 5,000 lukewarm contacts every single time. Stop optimizing for list size.

## The five-step list build

### Step 1 — Define ICP in five dimensions

A useful ICP is precise across five axes:

- **Company size** (employee count, ARR band)
- **Industry** (specific vertical, not "B2B")
- **Geography** (region, regulatory zone)
- **Tech stack** (the tools they currently use)
- **Trigger** (what is happening at the company *right now*)

If you cannot specify all five, your ICP is too loose.

### Step 2 — Source companies before contacts

Build a company list first. Use LinkedIn Sales Navigator's company filters. Layer in tech stack filters from BuiltWith or Wappalyzer. Layer in funding stage from Crunchbase if relevant.

Aim for 200–800 companies in the first build. Quality over quantity.

### Step 3 — Pull 3–4 contacts per company

Pull multiple titles per company. The economic buyer plus 1–2 champions plus 1 power-user role. Tools we use:

- Apollo (best for breadth)
- Clay (best for enrichment)
- LeadIQ (best for stealthier sourcing)

Do not pull a single contact per company. Multi-threading lifts reply rates and protects against turnover.

### Step 4 — Verify ruthlessly

Run every email through a verifier. We use NeverBounce as primary and Kickbox as a second pass on anything flagged "risky". Discard:

- Anything not classified as "valid"
- Catch-all addresses on enterprise domains
- Generic addresses (info@, contact@, support@)

A 3%+ bounce rate destroys deliverability. Verification is non-negotiable.

### Step 5 — Enrich for the trigger

If your copy references something specific, enrich for it before sending. If you reference recent funding, pull funding date from Crunchbase. If you reference new hires, pull from LinkedIn. If you reference their tech stack, pull from BuiltWith.

The enrichment fields you actually merge into copy are the ones worth pulling. The rest is noise.

## Anti-patterns to avoid

- **Buying lists**: every bought list is junk. Walk away.
- **Scraping LinkedIn unverified**: 30%+ bounce rate on raw scrapes.
- **Optimizing for size**: a 10K-row list of mediocre contacts is worse than a 500-row list of perfect ones.
- **Single-contact accounts**: turnover kills sequences. Always pull 2–4 contacts per account.

## A worked example

For a recent client selling RevOps software to mid-market SaaS:

- ICP: Series B–D SaaS, 80–400 employees, US/UK, using Salesforce, recently hired a VP RevOps
- Companies: 412 from Sales Navigator + Crunchbase
- Contacts: 1,438 across VP RevOps, Director of Sales Ops, CRO
- After verification: 1,182 (82.2% pass rate, well above the 60% industry average)
- Reply rate on first sequence: **18.7%**
- Cost per meeting: **$214**

The list took two full weeks to build. The campaign took six days to run. The ratio is right.

## What to do in the next 24 hours

1. Pull your last campaign's bounce rate. If above 3%, your verification is broken.
2. Audit your ICP — can you specify all five dimensions? If not, tighten before your next build.
3. Plan your next build for *quality, not quantity*. Aim for 500 perfect rows, not 5,000 mediocre ones.

Lists are the biggest lever in cold email. Treat them that way.`
}

export function BODY_INFRASTRUCTURE() {
  return `You can have the best copy in the world. If your infrastructure is bad, none of it matters. This is exactly how we set up infrastructure for every new FinalOutreach client.

## The components of a healthy sending stack

A modern cold email stack has six layers:

1. **Sending domains** (separate from your primary domain)
2. **Mailboxes** (Google Workspace or Microsoft 365)
3. **DNS records** (SPF, DKIM, DMARC, custom tracking)
4. **Warm-up tooling** (built into Instantly or Smartlead)
5. **Sending platform** (Instantly, Smartlead, or equivalent)
6. **Monitoring** (blacklist + inbox placement)

Skipping any one of them creates a single point of failure that will eventually kill your reply rates.

## The build, step by step

### Domains

Register 2–3 secondary domains. We use Google Domains or Cloudflare. Pick domains that match your brand closely — *finaloutreach.co* and *getfinaloutreach.com*, not random strings. Avoid hyphens. Avoid country TLDs unless you sell into a specific country.

### Mailboxes

Buy mailboxes on Google Workspace or Microsoft 365. Avoid third-party SMTP providers — they are flagged at higher rates. Create 3–5 mailboxes per domain. Each mailbox should have a real first name and last name, not "outreach@" or "sales@".

If you need to send 300 emails per day, you need 8–10 mailboxes spread across 2–3 domains. Do the math up front.

### DNS records

For every sending domain, configure:

- **SPF**: list authorized sending IPs.
- **DKIM**: signing key from Workspace/365.
- **DMARC**: start with \`p=none\` and \`rua=mailto:dmarc@yourdomain\`.
- **Custom MX**: if you want replies to come back natively.
- **Custom tracking domain**: subdomain of your sending domain.

Use a DNS validator before sending anything.

### Warm-up

Use the warm-up tool built into Instantly or Smartlead. Two-week minimum, four-week recommended. Start at 10–20 emails per day. Increase by 10% daily until you are at 30–40 per day. Never skip warm-up.

### Sending platform

Instantly and Smartlead are our defaults. Both spread sending across all mailboxes evenly, manage warm-up, and report inbox placement. Avoid using Mailgun, SendGrid, or Postmark for cold — they are not built for it and carry shared-IP penalties.

### Monitoring

Check weekly:

- Blacklists (MxToolbox, Spamhaus)
- Sender score (Validity)
- Inbox placement (GlockApps, MailGenius)
- Bounce rate per mailbox (your sending platform)

Pause any mailbox that drops below 90% inbox placement.

## A realistic build timeline

- **Day 1–2**: Register domains, configure DNS.
- **Day 3**: Buy mailboxes, configure DKIM.
- **Day 4–5**: Connect to sending platform, start warm-up.
- **Day 6–19**: Warm-up runs in the background.
- **Day 20**: First real campaign at 50 sends per day.
- **Day 25**: Scale to full daily volume.

Done right, this is 5 business days of active work and 2–3 weeks of waiting. Done wrong, it takes you six months to figure out why your sends are not working.

## Common infrastructure mistakes

- Sending from primary domain (kills your transactional email if cold gets flagged).
- Skipping warm-up (every single new domain needs it).
- Using shared tracking domains (they are burned).
- Sending too much per mailbox (Gmail/Outlook flag above ~40/day).
- Ignoring DMARC (most spam landings start here).

## What to do in the next 24 hours

1. Audit your current sending domain. Is it separate from your primary domain? If not, plan a migration.
2. Run a DMARC check on every sending domain. Misconfiguration here is the #1 deliverability killer.
3. Confirm every mailbox is below 40 sends/day. If above, add mailboxes — do not push more volume per mailbox.

Done. Your floor is now solid. Now go fix the copy.`
}

export function BODY_TEMPLATES() {
  return `Templates are a starting point, not a finish line. Every single one of these has been rewritten for each ICP we run it against. But the *structure* of what works is highly transferable. Below are ten templates we have used to book over $1M in pipeline — along with what makes each one work.

## The pattern under every working template

Every cold email that converts above 10% has four ingredients:

- **Specificity** — the email could only be sent to this prospect.
- **Proof** — a number, name, or fact the prospect can verify.
- **Low commitment** — the CTA asks for less than a meeting.
- **Reason to reply now** — a trigger or time-bound angle.

If a template is missing one of those four, rewrite it before sending.

## The ten templates

### Template 1 — The specific-problem opener

Leads with a problem only the prospect has, based on a trigger (new hire, product launch, funding). Reply rate: **18–24%**.

> Subject: *{prospect company}'s outbound challenge*
> Body: *"Most {industry} companies your size hit a wall around {milestone}. Saw {prospect company} just hired a {role}, which usually means {trigger inference}. Worth 90 seconds on how three peers solved it?"*

### Template 2 — The peer-proof intro

Opens with a result from a similar-sized company in the same industry. Best when the proof company is well-known. Reply rate: **14–19%**.

> Subject: *{Peer company}'s pipeline numbers*
> Body: *"{Peer company}, similar size and stage to {prospect company}, just crossed {result}. Took them 11 weeks. Open to a 60-second breakdown?"*

### Template 3 — The low-commitment audit

Offers a 10-minute audit with a clear deliverable. Best when the audit is genuinely useful, not a disguised pitch. Reply rate: **16–22%**.

> Subject: *quick audit for {prospect company}*
> Body: *"Built a 5-point audit specifically for {industry} teams using {tech stack}. Takes us 10 minutes, you get a one-pager. No call required. Want it?"*

### Template 4 — The competitor-switch angle

Mentions a competitor's weakness without naming them directly. Works for crowded categories. Reply rate: **11–15%**.

> Subject: *re: switching from {category} tools*
> Body: *"Most {industry} teams using {category} tools hit the same three issues at scale: {issue 1}, {issue 2}, {issue 3}. We solve each. 60-second read?"*

### Template 5 — The "why now" trigger

Sent 4–7 days after a trigger event. Reply rate: **22–30%** on the best triggers.

> Subject: *re: {prospect company}'s {trigger}*
> Body: *"Saw {trigger}. Usually that means {downstream consequence} hits within 6 weeks. Worth a quick read on how peers handled it?"*

### Template 6 — The second-chance reopen

Sent 30 days after an initial no-reply, with genuinely new information. Reply rate: **9–14%**.

### Template 7 — The peer-introduction reframe

Frames the email as if a mutual connection asked for the intro. Use only when there is a real connection. Reply rate: **17–24%**.

### Template 8 — The data-point opener

Opens with a piece of public data the prospect would not have noticed. Reply rate: **13–17%**.

### Template 9 — The Loom-first

A 60-second Loom with the prospect's logo on screen. Best for higher-ticket offers. Reply rate: **20–28%**.

### Template 10 — The break-up that works

Sent only after 4–5 prior touches. Genuinely releases the prospect. Reply rate: **11–17%** — surprisingly high.

## How to adapt a template for your ICP

The biggest mistake is sending a template verbatim. Always rewrite three things:

1. **The specificity hook** — replace generic placeholders with real, prospect-specific facts.
2. **The proof point** — swap in a result from a peer the prospect would know.
3. **The CTA wording** — make it match the prospect's reading patterns. Founders prefer brevity. Operators prefer specificity.

## What to do in the next 24 hours

1. Pick the two templates that match your ICP best.
2. Rewrite each one for a specific prospect — not a generic placeholder.
3. Send 50 of each. Compare reply rates after one week.

Templates are scaffolding. Specificity is the building.`
}

export function BODY_SPAM() {
  return `Going to spam is not bad luck. It is almost always one of five very fixable things. Below is the diagnostic checklist we run on every new client we audit, in the order of frequency.

## The five problems, in order

### Problem 1 — DMARC is not configured

This is the single most common cause of cold emails landing in spam in 2026. Major receivers (Google, Yahoo) increasingly demand DMARC alignment. Without it, you are flagged.

**Fix**: configure DMARC with at least \`p=none\` and a \`rua\` reporting address. Use dmarcian or EasyDMARC to validate.

### Problem 2 — Sending from the primary domain

If you send cold from \`yourdomain.com\` and one mailbox gets flagged, every \`@yourdomain.com\` email goes down — including transactional, support, and billing.

**Fix**: register a secondary domain (e.g. \`get-yourdomain.com\`) and send cold exclusively from that domain. Forward replies to the primary.

### Problem 3 — Skipped warm-up

New domains that send 50+ emails on day 1 are flagged as suspicious. Warm-up signals to receivers that the domain is a real, used inbox before scaling.

**Fix**: warm up for 2–4 weeks before any real campaign. Use Instantly or Smartlead's built-in warm-up. Start at 10–20/day, increase 10% daily.

### Problem 4 — Too much volume per mailbox

Gmail and Outlook flag mailboxes that send more than ~40 cold emails per day. Most cold email tools default to 80+, which is wrong.

**Fix**: cap each mailbox at 30–40 sends/day. If you need more volume, add mailboxes — never push more per mailbox.

### Problem 5 — Spammy copy

Modern filters are smart, but some patterns still trigger:

- "Guarantee", "free", "limited time", "click here", "act now"
- All caps in subject line
- Heavy HTML formatting
- Image-to-text ratio above 40%
- Multiple links per message
- URL shorteners (bit.ly, tinyurl)

**Fix**: write plain text. One link maximum. No bold colors. No images.

## A diagnostic flow

When a client says "we are landing in spam", run this in order:

1. Run a GlockApps inbox placement test from the actual sending mailbox.
2. Check DMARC, SPF, DKIM with a DNS validator.
3. Pull bounce rate over the last 30 days. If above 3%, list verification is broken.
4. Check the spam folder of a test inbox you have access to. Read the actual messages.
5. Audit copy for the five spam triggers above.

90% of cases are resolved at step 1, 2, or 3.

## What to do in the next 24 hours

1. Run a DMARC check on every sending domain.
2. Verify every mailbox is at 40 sends or below per day.
3. Run a free GlockApps test from one of your mailboxes.

Three steps. Three hours of work. Most of your "deliverability problems" will be fixed.`
}

export function BODY_ICP() {
  return `Most ICPs are too broad to be useful. *"B2B SaaS"* is not an ICP. *"Mid-market companies"* is not an ICP. Below is the framework we use to make yours sharper in an afternoon — the same one we run for every new FinalOutreach client.

## Why most ICPs are wrong

A useful ICP does two things: it cuts the universe of prospects by 80%+, and it correlates strongly with conversion. Most ICPs do neither. They are either too broad to filter on, or too vague to predict close rates.

The fix is to define the ICP across five dimensions, and to validate it against your existing customer data.

## The five-dimension framework

### 1. Firmographic

- Company size (employee count, revenue, ARR)
- Stage (seed, A, B, growth, public)
- Geography (region, regulatory zone)

### 2. Vertical

Specific industry, not "B2B". Verticals carry different buying patterns, regulatory needs, and budget cycles. *"Mid-market healthtech SaaS"* is more useful than *"healthcare"*.

### 3. Technographic

What tools the company uses today. This signals stage of sophistication, integration needs, and willingness to switch.

- CRM (Salesforce, HubSpot, Pipedrive)
- Data warehouse (Snowflake, BigQuery, Redshift)
- Marketing stack (Marketo, Pardot, HubSpot)
- Specific category tools that compete with or complement yours

### 4. Behavioral / role

The titles you actually sell to. Pull from your last 50 closed-won deals, not aspirational personas.

- Economic buyer
- Champion
- Power user
- Veto stakeholders

### 5. Trigger

The most underused dimension. What was happening at the customer right before they bought?

- New hire in a specific role
- New product launch
- New funding round
- Compliance / audit deadline
- Loss of a key vendor

## Validate against existing data

Pull your best 10 closed-won customers. Score each against the five dimensions. Look for the patterns where 7–10 of them overlap. Those overlaps *are* your ICP.

Then run the inverse: pull your 10 worst customers (long sales cycle, low LTV, support drag). What do they have in common? Those patterns are your **anti-ICP** — accounts you should explicitly *not* sell to.

## A worked example

For a recent client selling a financial-ops tool, the framework produced:

- Firmographic: Series B–D SaaS, 80–400 employees, US/Canada
- Vertical: SaaS, specifically vertical-SaaS in healthtech, fintech, or proptech
- Technographic: NetSuite or Quickbooks Enterprise, Salesforce, no existing FP&A tool
- Role: VP Finance or Director of FP&A as economic buyer; Controller as champion
- Trigger: hired a Director of FP&A in the last 90 days

That ICP cut the prospect universe from ~12,000 companies to **287**. Reply rate jumped from 6% to 17% on the next campaign with no copy changes.

## What to do in the next 24 hours

1. Pull your last 10 closed-won deals into a spreadsheet.
2. Score each on the five dimensions.
3. Identify the 3–4 dimensions where 7+ deals overlap.
4. That is your ICP. Use it to filter your next list build.

Most teams have an ICP that fits in a paragraph. The good ones can fit on a sticky note.`
}

export function BODY_FOLLOWUP() {
  return `80% of cold email replies come from follow-ups, not the first email. But most follow-ups are awful — *"just bumping this"*, *"following up"*, *"circling back"*. Below are seven follow-up frameworks that actually work.

## Why most follow-ups fail

A follow-up has one job: give the prospect a *new* reason to reply. *"Just bumping this"* gives them no new reason — it is exactly the same email with one more sentence on top. The prospect's response is to ignore both.

A working follow-up has at least one of three new ingredients:

- A new angle on the offer
- A new piece of information
- A new structural format (length, medium, CTA)

Frameworks 1–7 below each provide one of those three.

## The seven frameworks

### Framework 1 — The shorter follow-up

Half the length of the first email. One question only. Often outperforms the first email by 1.5x reply rate.

### Framework 2 — The reframe

Same offer, different angle. *"Earlier I framed this as {angle 1}; the better framing for {prospect company} is probably {angle 2}."*

### Framework 3 — The trigger-based

Reference something new at the prospect's company (a launch, hire, funding round). The trigger is the new information.

### Framework 4 — The value-first

Share a tactical insight relevant to their role. No ask. The reply rate on this is lower (5–8%) but it builds trust for the next touch.

### Framework 5 — The break-up email

Send only after 4–5 prior touches. Genuinely release the prospect. Surprisingly high reply rate (11–17%) because it triggers loss-aversion.

### Framework 6 — The pattern-interrupt subject

A subject line so different from the first 3–4 that it reopens curiosity. Examples: a single emoji-free word, a rhetorical question, the prospect's first name.

### Framework 7 — The asynchronous Loom

A 60-second Loom with the prospect's logo on screen. Works exceptionally well for bigger-ticket offers ($50K+ ACV). Reply rate: 20–28%.

## How to sequence them

Rotate frameworks across a six-touch sequence. Never use the same one twice in a row.

A sequence we run for SaaS clients:

- **Day 0**: First email (specific opener, peer proof, interest CTA)
- **Day 3**: Framework 1 (shorter)
- **Day 7**: Framework 3 (trigger-based)
- **Day 12**: Framework 4 (value-first, no ask)
- **Day 18**: Framework 2 (reframe)
- **Day 25**: Framework 5 (break-up)

Six touches. Three weeks. ~40% reply rate aggregated across the sequence on a good ICP.

## When to stop

Stop after the break-up email. Period. Do not run a 12-touch sequence. The prospect's silence is information — respect it. Move them to a 90-day re-engagement list, not a daily torture list.

## What to do in the next 24 hours

1. Pull a sequence that is currently underperforming. Count the touches. If under 5, add follow-ups using the frameworks above.
2. Audit each follow-up — does each one offer a new angle, info, or format? If not, rewrite.
3. Add a break-up email. It will lift your reply rate by 2–3 percentage points all by itself.

80% of replies live in the follow-up sequence. Build that sequence accordingly.`
}

export function BODY_METRICS() {
  return `Most cold email dashboards are lying to you. Open rates have been broken since iOS 15 started pre-fetching images in 2021, and they are essentially noise in 2026. Below are the metrics that actually predict pipeline.

## The four metrics that matter

### 1. Reply rate

The headline number. Includes any reply: positive, negative, or neutral. Healthy benchmark: **8–14%**. Anything under 6% means list, copy, or deliverability is broken.

### 2. Positive reply rate

Replies that move toward a meeting. Should be **30–50% of total replies**. Lower than 30% means your targeting is broken — you are reaching the wrong people, or your offer is unclear.

### 3. Meeting-booked rate

Meetings booked as a percentage of positive replies. Should be **40–60%**. Lower than 40% means your CTA is wrong, your sales handoff is broken, or your scheduling friction is too high.

### 4. Pipeline-sourced dollars

The only number that matters at the end of the quarter. Cold email is judged on pipeline, not activity. Anything else is vanity.

## Metrics to ignore

- **Open rate** — broken since iOS 15.
- **Click rate** — only matters if you are sending links (you should not be in cold).
- **Daily volume** — activity, not outcome.
- **List size** — quality compounds, size does not.

## The diagnostic flow

When a campaign underperforms, diagnose by layer:

1. **Reply rate < 6%** → List or copy or deliverability. In that order. Run a GlockApps test first.
2. **Reply rate fine, positive reply rate < 30%** → Targeting is wrong. Tighten ICP.
3. **Positive reply rate fine, meeting-booked rate < 40%** → CTA wrong, or sales handoff is broken. Audit calls scheduling friction.
4. **All metrics fine, pipeline still low** → Deal velocity / qualification is the problem. Push the sales conversation.

This four-layer model fixes 90% of "the campaign is not working" complaints in under an hour.

## Cohort metrics over campaign metrics

Cold email is a 60-day game, not a 7-day game. Track monthly cohorts, not weekly campaigns. A campaign that looks weak in week 1 often produces 60% of its meetings in weeks 4–8 from follow-ups and re-engagements.

Reporting structure we use:

- **Daily**: bounce rate, mailbox health (operational metric only)
- **Weekly**: reply rate, positive reply rate (in-flight quality check)
- **Monthly**: meeting-booked rate, pipeline-sourced dollars by cohort
- **Quarterly**: closed-won attribution, cost per closed-won

Resist the urge to optimize on weekly numbers. They are too noisy.

## What to do in the next 24 hours

1. Stop reporting open rates internally. Replace with reply rate.
2. Add positive reply rate to your dashboard. It is the single most diagnostic metric.
3. Build a monthly cohort view of meeting-booked rate. Stop reporting on campaign-level weekly performance.

Activity metrics make you feel busy. Outcome metrics make you money. Choose accordingly.`
}
