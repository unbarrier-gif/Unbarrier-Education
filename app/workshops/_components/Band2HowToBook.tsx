import { Eyebrow } from '@/components/Eyebrow';
import { SectionBar } from '@/components/SectionBar';
import bands from './bands.module.css';
import styles from './Band2HowToBook.module.css';

type Card = {
  routeLabel: string;
  title: string;
  pitch: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  accent: string;
  wide?: boolean;
  badge?: string;
};

const CARDS: Card[] = [
  {
    routeLabel: 'Route 1',
    title: 'Single workshop',
    pitch: 'Book one module standalone',
    body:
      "One 60- or 90-minute session. Whole staff, TAs, leadership, or stakeholders — pick one off the menu and we'll deliver it.",
    ctaLabel: 'See the menu →',
    ctaHref: '#menu',
    accent: 'var(--spring-green)',
  },
  {
    routeLabel: 'Route 2 · most booked',
    title: 'Full INSET day',
    pitch: 'Pick and mix from the menu',
    body:
      'A whole training day, shaped from the modules. Different sessions for different audiences in the same school. We bring everything.',
    ctaLabel: 'Build your INSET day →',
    ctaHref: '#inset',
    accent: 'var(--school-bus-yellow)',
    wide: true,
    badge: 'Most booked',
  },
  {
    routeLabel: 'Route 3',
    title: 'Bespoke',
    pitch: 'Anything else, conversation-led',
    body:
      "Trust-wide, multi-day, governor-only, audit-led. If your situation isn't on the menu, we talk first and shape it together.",
    ctaLabel: 'Start a conversation →',
    ctaHref: '#bespoke',
    accent: 'var(--orchid-mist)',
  },
];

export function Band2HowToBook() {
  return (
    <>
      <SectionBar color="var(--spring-green)" />
      <section id="how-to-book" className={`${bands.band} ${styles.band}`}>
        <div className={bands.bandInner}>
          <div className={bands.bandHead}>
            <Eyebrow color="var(--spring-green)">How to book</Eyebrow>
            <h2 className={bands.h2}>Three ways in. Pick what fits.</h2>
            <p className={`${bands.lede} ${bands.placeholderText}`}>
              [PLACEHOLDER — lead-in copy TBD]
              <span className={bands.placeholder}>placeholder</span>
            </p>
          </div>
          <div className={styles.cards}>
            {CARDS.map((card) => (
              <article
                key={card.title}
                className={styles.card}
                data-wide={card.wide ? 'true' : undefined}
                style={{ '--accent': card.accent } as React.CSSProperties}
              >
                {card.badge ? (
                  <span className={styles.badge}>{card.badge}</span>
                ) : null}
                <p className={styles.routeLabel}>{card.routeLabel}</p>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.pitch}>{card.pitch}</p>
                <p className={styles.body}>{card.body}</p>
                <a href={card.ctaHref} className={styles.cta}>
                  {card.ctaLabel}
                </a>
              </article>
            ))}
          </div>
          <p className={styles.footnote}>
            Half-days are not a published product. If you need one,
            that&apos;s a bespoke conversation.
          </p>
        </div>
      </section>
    </>
  );
}
