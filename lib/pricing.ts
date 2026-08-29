// Every published price on the site, in one place.
//
// These numbers get quoted back to us for years. Keeping them here rather than
// inline in JSX means a price change is a one-line diff and `grep PRICE_`
// finds every surface that shows one.
//
// PUBLISHED means: it appears on a public page. A price that is scoped in
// conversation does not belong here — see TRUST_TIER below for why that
// distinction is load-bearing.

/** The discovery day. The one price that appears on more than one page. */
export const PRICE_DISCOVERY_DAY = '£500';

/** unbarrier.access — advisory tier. The entry point to a partnership year. */
export const PRICE_ACCESS_ADVISORY = '£2,250';
export const PRICE_ACCESS_ADVISORY_TERM = '£750';

/** unbarrier.access — partner, single school. The core offer. */
export const PRICE_ACCESS_PARTNER = '£6,000';
export const PRICE_ACCESS_PARTNER_TERM = '£2,000';

// THE TRUST TIER IS DELIBERATELY UNPRICED HERE.
//
// The 28 Aug copy pack carried "from £18,000 / year". The 27 Aug brief — the
// more recent ruling — says the trust route is "named, not offered: do not put
// it on the same page as the two numbers above, or it becomes a third option
// and nobody chooses". Ruling for this branch: name the route, hold the price.
//
// The number is NOT parked in a commented-out constant on purpose. A commented
// price is a price waiting to be uncommented by someone who does not know why
// it came off. When the hold lifts, add it here with a dated comment saying who
// lifted it.
export const TRUST_TIER_SCOPING = 'scoped per trust — talk to us';
