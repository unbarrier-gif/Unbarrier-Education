import { Eyebrow } from '../Eyebrow';
import { SectionBar } from '../SectionBar';
import {
  formatSessionDate,
  formatTimeRange,
  upcomingSessions,
} from '@/content/loop-breakers/sessions';
import { ctaForSession } from './sessions/ctaForSession';
import styles from './LBUpcoming.module.css';

// LBUpcoming is the "next 4 sessions" preview grid on /loop-breakers.
// Denser, simpler layout than SessionCard (the full filterable row used
// at /loop-breakers/sessions). Both call ctaForSession() so CTA copy
// stays in sync.

// Show the next four chronologically. The full filterable list lives at
// /loop-breakers/sessions; the "See full menu" CTA below points there.
const PREVIEW_COUNT = 4;

export function LBUpcoming() {
  const list = upcomingSessions().slice(0, PREVIEW_COUNT);
  const hasMore = upcomingSessions().length > PREVIEW_COUNT;

  return (
    <>
      <SectionBar color="var(--school-bus-yellow)" />
      <section id="upcoming" className={styles.section}>
        <div className={styles.inner}>
          <Eyebrow color="var(--school-bus-yellow)">Upcoming</Eyebrow>
          <h2 className={styles.heading}>Take a seat.</h2>
          <p className={styles.lede}>
            Tuesdays are <b className={styles.ledeStrong}>weekly</b> — Nici
            plus a rotating co-facilitator (a neurodivergent practitioner
            whose work the room&apos;s questions point to). Wednesdays are
            off-cadence Guest Stages led by invited experts. All sessions
            10:30am–12pm. Pay-as-you-go. Skip any session.
          </p>
          <div className={styles.grid}>
            {list.map((s) => {
              const isGuest = s.isGuestStage;
              const cta = ctaForSession(s);
              return (
                <article
                  key={s.slug}
                  className={styles.card}
                  data-kind={isGuest ? 'guest-stage' : 'tuesday'}
                  style={{ ['--c' as string]: s.accent }}
                >
                  <div className={styles.cardHead}>
                    <span className={styles.kindLabel}>
                      {isGuest ? 'Guest Stage' : 'Tuesday'}
                    </span>
                    <span className={styles.duration}>{s.durationMin} min</span>
                  </div>
                  <h3 className={styles.cardTitle}>{s.theme}</h3>
                  <div>
                    <p className={styles.date}>{formatSessionDate(s.date)}</p>
                    <p className={styles.time}>
                      {formatTimeRange(s.time, s.durationMin)} {s.tz}
                    </p>
                    <p className={styles.host}>with {s.host}</p>
                  </div>
                  <div className={styles.divider} />
                  <div className={styles.priceRow}>
                    <span className={styles.price}>
                      {s.price.currency}
                      {s.price.amount}
                    </span>
                    <span className={styles.note}>{s.price.note}</span>
                  </div>
                  <span className={styles.cta} data-disabled="true">
                    {cta.label}
                  </span>
                </article>
              );
            })}
          </div>
          {hasMore ? (
            <p className={styles.menuLink}>
              <a
                href="/loop-breakers/sessions"
                className={styles.menuLinkAnchor}
              >
                See the full menu →
              </a>
            </p>
          ) : null}
        </div>
      </section>
    </>
  );
}
