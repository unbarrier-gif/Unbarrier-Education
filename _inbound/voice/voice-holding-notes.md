# unbarrier.voice — holding page notes

*The small honest version of `/voice` that goes live first. Replaces the existing holding page on vision.unbarrier.me/voice. Stays up until the partnership conversation with the EdTech team Nici has been working with is complete and the full named version is ready.*

---

## Why this exists (and not the full page)

The full voice page (`Voice.jsx` + `VoiceSections.jsx`, drafted earlier) does a lot of persuasive work — it leans on the partnership with the EdTech team Nici has been working with, even anonymously. That's a quiet ethical compromise we don't want to ship.

This page does less. It signals presence, names what Nici sees, invites conversation. It doesn't case-study, doesn't reveal the four-block offer, doesn't tell anyone's story. It earns the right to launch tomorrow.

When the named version is ready, this page gets replaced wholesale.

---

## Files

| File | Purpose |
| --- | --- |
| `VoiceHolding.jsx` | The whole page in one component — hero, observations, where I'm at, CTA |
| `voice-holding.html` | Demo wrapper that pulls Nav, Footer, Primitives from the main UI kit |
| `voice-holding-notes.md` | This file |

---

## Page structure

| # | Section | Purpose | Accent |
| --- | --- | --- | --- |
| 1 | Hero | One claim, one CTA. "Students are the why." Cherry Bomb moment. | orchid |
| 2 | What I see | Five observations from Nici's actual classroom + product-room voice. The problem, said plainly, in her language. | orchid |
| 3 | Where I'm at | Honest small paragraph about the work being shaped. Invitation to be early. | spring green |
| 4 | CTA | Email Nici. No forms. | orchid |

Sections 2 and 3 are the load-bearing ones. The observations have to land as *true things Nici has seen*, not pitched problems. The "where I'm at" section has to feel like a person being honest about pace — not a marketing tease.

---

## The five observations — sources

Each is paraphrased from Nici's own words in the Otter transcripts. None are direct quotes (paraphrased to sit on a website rather than in conversation), but the underlying claim is hers, said by her, captured.

| # | Observation | Source thread |
| --- | --- | --- |
| 01 | Teachers want 99.8% confidence before using a tool | Cosmo Grow MVP feedback call — "most teachers really want to be 99.8% confident in the whole of the tool before they use it" |
| 02 | Post-COVID children less ready for school | Cosmo Grow feedback call — "post covid children and the current generation we have coming into early years and reception are less and less ready for school" |
| 03 | No accessible data for students themselves | Mood Checker review — "there isn't, in early years, any accessible data for students" |
| 04 | We notice too late | Mood Checker review — "often we collect these pieces of information when it's too late because they've crashed out" |
| 05 | Pattern before variation | Cosmo Grow feedback — "they need time to learn the pattern. The pattern is the bit that's going to help them" |

Worth knowing: every one of these is an observation Nici has *already said out loud to an EdTech team*. They're not invented for the page. If anyone challenges any line, the transcript backs it up.

---

## Copy decisions worth knowing

### Hero

- "students are the why." in Cherry Bomb is the only decorative font moment.
- The headline is a deliberate two-step: *"build products people actually use, understand, and benefit from"* — the Paddy line, trimmed to fit the smaller-page feel. Three of the four claims (use / understand / benefit) — dropped "trust" because four was one too many for this page's energy.
- Intro paragraph names Nici's credentials lightly — early-years specialist, APLS, dyslexia + ADHD — without making the page about her. Sets up that she's qualified to make the observations in section 2.

### What I see

- Each observation is one paragraph, around 30–50 words. Read together they should sound like five things a teacher would tell you over a coffee, not five marketing claims.
- The H2 *"The bit between a product launch and a child who's actually using it"* is doing the same job the full page's "you don't have a product problem, you have a pupil voice problem" did — it names the gap without claiming a solution.
- No fix offered in this section. Deliberate. The page doesn't answer the problems — it shows that someone is *thinking* about them. The answer comes in the discovery email.

### Where I'm at

- Three short paragraphs, deliberately. Not a wall of text.
- The opening line — *"I'm shaping this slowly, on purpose."* — is the page's main piece of psychology. It tells a CPO that Nici is not in a rush, not running a funnel, and that the absence of a full offer page is a *choice*, not an oversight.
- *"The people I've worked with deserve to hear about it from me first."* — this is the line that signals integrity to anyone reading carefully. It tells a future EdTech buyer how Nici will treat *them* if they engage.
- The middle paragraph is the closest the page comes to describing the offer: *"structured pupil intelligence — not feedback, not focus groups, not workshops, not audits."* Negative-space framing. Tells a CPO what it isn't, lets them imagine what it is, doesn't lock anything in.
- Closing line is an explicit invitation: *"early conversations shape this work."* This positions the early adopter as a co-shaper, not a customer of an already-finished product. Real, and useful for the discovery call.

### CTA

- "Tell me what you're building" — same energy as the homepage. No forms, no funnels.
- Eyebrow *"if any of this lands"* deliberately conditional. Doesn't presume the reader is ready.

---

## Design system compliance

- ✅ Amethyst canvas, orchid accent for unbarrier.voice
- ✅ One Cherry Bomb moment, in the hero ("students are the why.")
- ✅ Sentence case throughout
- ✅ No emoji, no exclamation marks
- ✅ Em-dashes for rhythm
- ✅ UK English (organisation, behaviour, programme)
- ✅ "you" not "the buyer"
- ✅ No corporate EdTech language
- ✅ Wordmark stays lowercase
- ✅ All section accents have a `<SectionBar>` rule line
- ✅ No drop shadows, no parallax

---

## What's deliberately NOT on this page

| What | Why not |
| --- | --- |
| The four-block engine (Data / Translation / Leverage / Roadmap) | Not ready to put the offer in front of the world. Holds the IP. |
| Any reference to a specific EdTech team | No partnership permission yet. Page launches without it. |
| Pricing, packages, tiers | Not on the holding page. Discovery call only. |
| Testimonials or quotes | None earned with permission yet. |
| Logos | Same. |
| Discovery-call booking widget | Email is the right entry point at this stage. Lower commitment than a calendar slot, higher commitment than a form fill. |
| A long "About Nici" section | Lives on the about page. Here she gets one tight line. |
| "Coming soon" badge | The page going live = a real working offer behind it. The badge would undercut the CTA. |

---

## Wiring into the main site

- Route: `unbarrier.me/voice`
- Replaces: existing holding page at `vision.unbarrier.me/voice`
- 301 redirect from old subdomain to new path on launch
- Update homepage Services card link from `#voice` to `/voice`
- Keep the `soon: true` flag *off* — this page IS the offer-live state, just at a different volume
- Nav: ensure `voice` link points to `/voice`

---

## When to swap to the full named version

Triggers for replacing this page with the full `Voice.jsx` + `VoiceSections.jsx` version:

1. Cosmo (or whoever) has agreed to be named, with logo + quote + sign-off in writing
2. Pricing logic has been pressure-tested with at least one paying conversation
3. The hero hook has been chosen (currently three variants drafted, one picked tentatively)
4. There's a real Nici portrait for the Why Nici section

Until all four of those are true, this page stays.

---

## What this page does for an EdTech CPO who lands on it

Best-case read:
1. Hero — *"students are the why" — okay, this is a person who thinks about the right thing.*
2. What I see — *these are real classroom observations, not generic pain points. Whoever wrote this has actually been in the room.*
3. Where I'm at — *she's not selling something off the shelf. She's building it carefully. I could be useful to her, and she could be useful to me.*
4. CTA — *low pressure, just an email. I'll write one.*

Worst-case read:
1. Hero — *cute tagline.*
2. What I see — *fair observations, nothing radical.*
3. Where I'm at — *not ready yet, I'll come back later.*
4. CTA — *no, I'll come back later.*

Both are acceptable outcomes for a holding page. The page doesn't have to convert. It has to be true, useful, and a clean signal for the people who *are* ready.
