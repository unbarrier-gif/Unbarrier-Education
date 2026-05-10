import { Eyebrow } from '@/components/Eyebrow';
import { SectionBar } from '@/components/SectionBar';
import bands from './bands.module.css';
import styles from './Band7Pricing.module.css';

const ROWS = [
  {
    route: 'Single workshop',
    note: '60 or 90 minutes',
    price: 'from £[X]',
  },
  {
    route: 'Full INSET day',
    note: 'Pick and mix from the menu',
    price: 'from £[X]',
  },
  {
    route: 'Bespoke',
    note: 'Trust-wide, multi-day, custom',
    price: 'On enquiry',
  },
];

export function Band7Pricing() {
  return (
    <>
      <SectionBar color="var(--school-bus-yellow)" />
      <section id="pricing" className={`${bands.band} ${styles.band}`}>
        <div className={bands.bandInner}>
          <div className={`${bands.bandHead} ${styles.head}`}>
            <Eyebrow color="var(--school-bus-yellow)">Pricing</Eyebrow>
            <span className={styles.tbdTag}>numbers tbd</span>
          </div>
          <h2 className={`${bands.h2} ${styles.h2offset}`}>
            Three lines. No surprises.
          </h2>
          <div className={styles.table} role="table" aria-label="Workshop pricing">
            {ROWS.map((row) => (
              <div key={row.route} className={styles.row} role="row">
                <span className={styles.route} role="cell">
                  {row.route}
                </span>
                <span className={styles.note} role="cell">
                  {row.note}
                </span>
                <span
                  className={`${styles.price} ${
                    row.price.includes('[X]') ? bands.placeholderText : ''
                  }`}
                  role="cell"
                >
                  {row.price}
                </span>
              </div>
            ))}
          </div>
          <p className={styles.footnote}>
            Travel and venue costs quoted separately. VAT registered status
            [tbd].
          </p>
        </div>
      </section>
    </>
  );
}
