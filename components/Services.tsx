import { Eyebrow } from './Eyebrow';
import { SectionBar } from './SectionBar';
import { ServiceCard } from './ServiceCard';
import styles from './Services.module.css';

const CARDS = [
  {
    accent: 'var(--pearl-aqua)',
    accentRgb: '105, 217, 209',
    audience: 'Families & Schools',
    label: 'unbarrier.audit',
    sub: 'EHCP · Section 7 · Needs-led reports',
    desc: "I write the reports that change what happens next for a child — practical, evidence-based, built around the student's actual life.",
    href: 'mailto:nici@unbarrier.me?subject=audit',
    cta: 'Email Nici →',
  },
  {
    accent: 'var(--princeton-orange)',
    accentRgb: '255, 138, 28',
    audience: 'Schools & Trusts',
    label: 'unbarrier.access',
    sub: '· iPad strategy · Belonging',
    badge: {
      src: '/assets/apls-badge.svg',
      alt: 'Apple Professional Learning Specialist',
      width: 307,
      height: 68,
    },
    desc: 'Most schools already own powerful accessibility tools. Few use them consistently. I build the strategy and culture that makes access real.',
    href: '/access',
  },
  {
    accent: 'var(--orchid-mist)',
    accentRgb: '219, 125, 204',
    audience: 'EdTech Companies',
    label: 'unbarrier.voice',
    sub: 'Student voice · Evidence · Impact',
    desc: "You say your product is accessible. I'll go into schools, gather real student voice and usage data, and tell you whether it actually is.",
    // ⛔ Was '/voice'. That route is unpublished pending legal sign-off and
    // must not be linked from anywhere — this card is on the home page, so it
    // linked it from the site's most-visited surface. This card's audience is
    // already "EdTech Companies", and /edtech is where that reader belongs.
    // Branch D replaces this component with the five-route "i am" chooser;
    // this is the minimum change that stops the link existing until then.
    href: '/edtech',
  },
];

export function Services() {
  return (
    <>
      <SectionBar color="var(--pearl-aqua)" />
      <section id="services" className={styles.section}>
        <div className={styles.head}>
          <Eyebrow color="var(--pearl-aqua)">Three ways in</Eyebrow>
          <h2 className={styles.heading}>How I can help</h2>
          <p className={styles.lede}>
            You don&apos;t have to have it figured out. Tell me what&apos;s
            happening and we&apos;ll find where to start.
          </p>
        </div>
        <div className={styles.grid}>
          {CARDS.map((card) => (
            <ServiceCard key={card.label} {...card} />
          ))}
        </div>
      </section>
    </>
  );
}
