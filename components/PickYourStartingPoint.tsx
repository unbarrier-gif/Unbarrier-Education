import { Eyebrow } from './Eyebrow';
import { SectionBar } from './SectionBar';
import styles from './PickYourStartingPoint.module.css';

// Phase 3 link-swap: the audit CTA below moves from mailto to /audit once
// the route ships. Tracked in _inbound/Task List.html.
const STARTERS = [
  {
    accent: 'var(--pearl-aqua)',
    accentRgb: '105, 217, 209',
    label: 'Start with an audit',
    blurb:
      'EHCP-style reports, Section 7 statements, needs-led briefs. For families and schools.',
    cta: 'Email about an audit →',
    href: 'mailto:nici@unbarrier.me?subject=audit',
  },
  {
    accent: 'var(--school-bus-yellow)',
    accentRgb: '255, 194, 3',
    label: 'Join Loop Breakers',
    blurb:
      'A free Tuesday session for the loop you can’t break alone. Neurodivergent people, founders, anyone.',
    cta: '/loop-breakers →',
    href: '/loop-breakers',
  },
  {
    accent: 'var(--spring-green)',
    accentRgb: '56, 255, 153',
    label: 'Just email me',
    blurb:
      'Not sure which fits? Tell me what’s happening. I’ll tell you if I can help or point you to someone who can.',
    cta: 'nici@unbarrier.me →',
    href: 'mailto:nici@unbarrier.me',
  },
];

export function PickYourStartingPoint() {
  return (
    <>
      <SectionBar color="var(--spring-green)" />
      <section id="start" className={styles.section}>
        <div className={styles.head}>
          <Eyebrow>Where to next?</Eyebrow>
          <h2 className={styles.heading}>Pick your starting point</h2>
          <p className={styles.lede}>
            Three ways to get this moving. Audit if you need evidence, Loop
            Breakers if you need community, email if you need a human.
          </p>
        </div>
        <div className={styles.grid}>
          {STARTERS.map((s) => {
            const isExternal = s.href.startsWith('http');
            const externalProps = isExternal
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {};
            const style = {
              ['--accent' as string]: s.accent,
              ['--accent-rgb' as string]: s.accentRgb,
            } as React.CSSProperties;

            return (
              <a
                key={s.label}
                href={s.href}
                className={styles.card}
                style={style}
                {...externalProps}
              >
                <span className={styles.label}>{s.label}</span>
                <span className={styles.blurb}>{s.blurb}</span>
                <span className={styles.cta}>{s.cta}</span>
              </a>
            );
          })}
        </div>
      </section>
    </>
  );
}
