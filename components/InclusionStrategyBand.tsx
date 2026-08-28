import Link from 'next/link';
import { isInclusionStrategyPromoActive } from '@/lib/inclusion-strategy-promo';
import styles from './InclusionStrategyBand.module.css';

// TEMPORARY — see lib/inclusion-strategy-promo.ts.
// Sits above the starting-point chooser on the home page until the
// 31 December 2026 deadline, then comes down. Copy is lifted from the
// approved /inclusion-strategy hero so the two cannot drift apart.

export function InclusionStrategyBand() {
  if (!isInclusionStrategyPromoActive()) return null;

  return (
    <section className={styles.band} aria-labelledby="inclusion-strategy-band">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>
          for schools with inclusive mainstream funding
        </p>
        <h2 id="inclusion-strategy-band" className={styles.heading}>
          your inclusion strategy has to be published by 31 december.
        </h2>
        <p className={styles.body}>
          we help schools write it — guided, not done for you.
        </p>
        <Link href="/inclusion-strategy" className={styles.link}>
          how we help schools write it →
        </Link>
      </div>
    </section>
  );
}
