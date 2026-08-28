// /inclusion-strategy is promoted site-wide — a band on the home page and an
// item in the main nav — because it is the one page with a statutory deadline
// attached: schools receiving Inclusive Mainstream Funding must publish an
// inclusion strategy by 31 December 2026.
//
// Both promotions are TEMPORARY. The page itself stays after the deadline —
// the requirement repeats annually, and the page will have ranked by then —
// but the promotion comes down and the content folds into /access.
//
// ────────────────────────────────────────────────────────────────────────
// TO RETIRE THE PROMOTION IN JANUARY:
//   grep -rn INCLUSION_STRATEGY_PROMO_RETIRE_AFTER
// Every temporary surface is gated on this one constant and nothing else.
// Delete the band from app/page.tsx, the nav entry in components/Nav.tsx,
// and this file. The route and its sitemap entry stay.
// ────────────────────────────────────────────────────────────────────────

/** Last moment the home band and nav item are shown. UK deadline, end of day. */
export const INCLUSION_STRATEGY_PROMO_RETIRE_AFTER = '2026-12-31T23:59:59Z';

/**
 * Whether the temporary promotion should render.
 *
 * Evaluated at render time. On statically generated pages that means build or
 * revalidate time, so the band can linger for one revalidate window after the
 * date passes — which is why the constant above is a marker for a human to
 * act on, not a substitute for removing the code.
 */
export function isInclusionStrategyPromoActive(now: Date = new Date()): boolean {
  return now.getTime() <= Date.parse(INCLUSION_STRATEGY_PROMO_RETIRE_AFTER);
}
