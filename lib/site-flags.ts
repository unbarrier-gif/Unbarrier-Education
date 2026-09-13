// Site-wide tweak flags — the open decisions from the 13 Sep 2026 design
// handover, each one a flag or a content field rather than a hard-coded pick.
//
// Every default below is the default the handover set. Nici decides the rest
// in Notion; when a decision lands, flip the value here (one line, one PR) and
// nothing else in the page has to change. Anything marked OPEN is not built —
// the flag exists so the code has a place to hang it, and it stays off.

export const SITE_FLAGS = {
  // ── home ──────────────────────────────────────────────────────────────
  /** The hero's ghost button (scrolls to the seven questions). Default on. */
  showGhostCta: true,

  // ── /access ───────────────────────────────────────────────────────────
  /** The three figures in "the gap" (c2). Default on. */
  showFigures: true,
  /**
   * Which price tiers c5 shows.
   *   'two tiers'       advisory + partner (default)
   *   'all tiers'       adds the trust tier
   *   'in conversation' hides every price
   */
  pricing: 'two tiers' as 'two tiers' | 'all tiers' | 'in conversation',
  /** The retainer card + paragraph in c5b. Proposal-only until sold once. */
  retainerPublic: false,

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
