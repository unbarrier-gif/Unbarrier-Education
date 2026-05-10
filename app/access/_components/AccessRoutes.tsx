import type { CSSProperties } from 'react';
import { Eyebrow } from '@/components/Eyebrow';
import styles from '../page.module.css';

const BESPOKE_CTA =
  'mailto:access@unbarrier.me?subject=unbarrier.access%20%E2%80%94%20bespoke';

export function AccessRoutes() {
  return (
    <section
      id="access-routes"
      className={styles.routes}
      style={{ '--c': 'var(--princeton-orange)' } as CSSProperties}
    >
      <div className={styles.routesHead}>
        <Eyebrow color="var(--princeton-orange)">
          Bring this to your school
        </Eyebrow>
        <h2 className={styles.h2}>
          Three ways in.{' '}
          <span className={styles.accent}>Pick what fits.</span>
        </h2>
        <p className={styles.routesLede}>
          Single workshop, full INSET day, or a bespoke shape. Delivered by a
          small team of Apple Professional Learning Specialists. The work
          scales; the standard doesn&apos;t.
        </p>
      </div>

      <div className={styles.routesGrid}>
        <article
          className={styles.routeCard}
          style={{ '--c': 'var(--spring-green)' } as CSSProperties}
        >
          <p className={styles.routeTag}>Route 1</p>
          <h3 className={styles.routeTitle}>Single workshop</h3>
          <p className={styles.routeSub}>One module, standalone.</p>
          <p className={styles.routeBody}>
            60 or 90 minutes. Whole staff, TAs, leadership, or stakeholders
            — pick one off the menu and we&apos;ll deliver it.
          </p>
          <a className={styles.routeCta} href="/workshops#menu">
            See the menu →
          </a>
        </article>

        <article
          className={`${styles.routeCard} ${styles.routeCardFeatured}`}
          style={{ '--c': 'var(--school-bus-yellow)' } as CSSProperties}
        >
          <span className={styles.pillMost}>Most booked</span>
          <p className={styles.routeTag}>Route 2</p>
          <h3 className={styles.routeTitle}>Full INSET day</h3>
          <p className={styles.routeSub}>Pick &amp; mix from the menu.</p>
          <p className={styles.routeBody}>
            A whole training day, shaped from the modules. Different sessions
            for different audiences in the same school. We bring everything.
          </p>
          <a className={styles.routeCta} href="/workshops#inset">
            Build your day →
          </a>
        </article>

        <article
          className={styles.routeCard}
          style={{ '--c': 'var(--orchid-mist)' } as CSSProperties}
        >
          <p className={styles.routeTag}>Route 3</p>
          <h3 className={styles.routeTitle}>Bespoke</h3>
          <p className={styles.routeSub}>Anything else, conversation-led.</p>
          <p className={styles.routeBody}>
            Trust-wide, multi-day, governor-only, audit-led. If your situation
            isn&apos;t on the menu, we shape it together.
          </p>
          <a className={styles.routeCta} href={BESPOKE_CTA}>
            Start a conversation →
          </a>
        </article>
      </div>

      <p className={styles.routesFootnote}>
        Half-days aren&apos;t a published product. If you need one, that&apos;s
        a bespoke conversation.
      </p>
    </section>
  );
}
