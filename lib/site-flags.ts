// Site-wide tweak flags — the open decisions from the 13 Sep 2026 design
// handover, each one a flag or a content field rather than a hard-coded pick.
//
// THE FIGURE RULE (Nici, 13 Sep 2026). The only shared live figure on the
// site is £500 — the discovery day (lib/pricing.ts PRICE_DISCOVERY_DAY). No
// other statistic or price appears on a public route unless a flag below
// says so. A count is not a figure ("nine questions", "26 years") and a
// payment term is not a price ("50% on order"); a statistic or a price is.
//
// THE /ACCESS OVERRIDE (handover "publish as built", 13 Sep 2026). The rule
// is lifted for /access only: the three figures in "the gap" (£900m ·
// 276,890 · not asked) and the two price tiers (advisory · partner) are
// public, so `showFigures` is on and `pricing` is 'two tiers'. Still held:
// the trust tier (from £18,000) and the retainer card — `pricing` stays off
// 'all tiers' and `retainerPublic` stays off. /faq keeps following the rule
// on its own flag (`faqQuotesEntryPrice`), so the override does not leak to
// a second route by accident.
//
// Every default below is the default the handover set, except where the
// figure rule overrides it. Nici decides the rest
// in Notion; when a decision lands, flip the value here (one line, one PR) and
// nothing else in the page has to change. Anything marked OPEN is not built —
// the flag exists so the code has a place to hang it, and it stays off.

export const SITE_FLAGS = {
  // ── home ──────────────────────────────────────────────────────────────
  /** The hero's ghost button (scrolls to the seven questions). Default on. */
  showGhostCta: true,

  // ── /access ───────────────────────────────────────────────────────────
  /** The three figures in "the gap" (c2): £900m · 276,890 · not asked, with
   *  their source lines. ON by the /access override (13 Sep 2026). */
  showFigures: true,
  /**
   * Which price tiers c5 shows.
   *   'two tiers'       advisory + partner — the /access override (13 Sep 2026)
   *   'all tiers'       adds the trust tier (from £18,000) — still held
   *   'in conversation' hides every price — the figure rule's default
   */
  pricing: 'two tiers' as 'two tiers' | 'all tiers' | 'in conversation',
  /** The retainer card + paragraph in c5b. Proposal-only until sold once. */
  retainerPublic: false,

  // ── /faq ──────────────────────────────────────────────────────────────
  /** Whether "what does it cost?" quotes the advisory price. The /access
   *  override is scoped to /access, so this stays OFF until ruled; it can
   *  only ever show a price /access already publishes. */
  faqQuotesEntryPrice: false,

  // ── /inclusion-strategy (parked) ──────────────────────────────────────
  /** Names principle 7, never declares eligibility. Default on. */
  showFundingLine: true,

  // ── /readiness-check ──────────────────────────────────────────────────
  /** OPEN. The email field + result-email send. The privacy notice does not
   *  name them yet, so this stays off and nothing behind it is built. */
  emailStep: false,
  /** OPEN. The six-character share code. Not built. */
  shareCode: false,
  /** The band words on the result. Ship the learner language. */
  bandWords: 'learner' as 'learner' | 'engine',

  // ── /voice ────────────────────────────────────────────────────────────
  /** The internal review panel on the /voice prototype. Never public. */
  showPlan: false,
  /** OPEN. Puts `voice` in the nav (after access, orchid dot) and lets the
   *  route be indexed. Off until the legal hold on the instrument lifts. */
  voicePublic: false,

  // ── /hello ────────────────────────────────────────────────────────────
  /** "why your hands move" on the /hello shelf. Held for the blog. */
  handsMoveOnHello: false,
} as const;

export type SiteFlags = typeof SITE_FLAGS;
