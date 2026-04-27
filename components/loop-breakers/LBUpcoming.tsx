import { Eyebrow } from '../Eyebrow';
import { SectionBar } from '../SectionBar';
import styles from './LBUpcoming.module.css';

// Placeholder sessions list. PR 3 moves this to
// content/loop-breakers/sessions.json + sessions.ts and re-derives
// `date`/`time` strings from ISO at render time. Kept in shape-parity
// with the schema in `_inbound/loop-breakers/sessions/SessionsData.jsx`
// so the swap is a structural rename, not a redesign.
const TIDYCAL_TUESDAY = 'https://tidycal.com/nici/loop-breakers-sessions-vision-to-launch';
const TIDYCAL_GUEST_STAGE = 'https://tidycal.com/nici/loop-breakers-sketch-noting-for-joy-and-for-thinking';

type Session = {
  kind: 'tuesday' | 'guest-stage';
  title: string;
  subtitle?: string;
  date: string;
  time: string;
  duration: string;
  price: string;
  host: string;
  note: string;
  bookingUrl: string;
};

const SESSIONS: Session[] = [
  {
    kind: 'tuesday',
    title: 'Loop Breakers',
    subtitle: 'Tuesday session',
    date: 'Tue 5 May',
    time: '10:30–12',
    duration: '90 min',
    price: '£10',
    host: 'with Nici',
    note: 'PAYG · £5 access seat on request',
    bookingUrl: TIDYCAL_TUESDAY,
  },
  {
    kind: 'guest-stage',
    title: 'Loop Breakers · Guest Stage',
    subtitle: 'Sketch-noting for joy and for thinking',
    date: 'Wed 20 May',
    time: '10:30–12',
    duration: '90 min',
    price: '£25 sliding',
    host: 'with Nicki Hambleton — journal-therapy artist, collector of stories',
    note: 'Visual mapping + simple, joyful drawing · £15 / £25 / £40 — you pick',
    bookingUrl: TIDYCAL_GUEST_STAGE,
  },
  {
    kind: 'tuesday',
    title: 'Loop Breakers',
    subtitle: 'Tuesday session',
    date: 'Tue 26 May',
    time: '10:30–12',
    duration: '90 min',
    price: '£10',
    host: 'with Nici + co-facilitator (TBC)',
    note: 'Topic named once expert is locked in',
    bookingUrl: TIDYCAL_TUESDAY,
  },
  {
    kind: 'tuesday',
    title: 'Loop Breakers',
    subtitle: 'Tuesday session',
    date: 'Tue 2 June',
    time: '10:30–12',
    duration: '90 min',
    price: '£10',
    host: 'with Nici + co-facilitator (TBC)',
    note: 'First Tuesday — a fresh question',
    bookingUrl: TIDYCAL_TUESDAY,
  },
  {
    kind: 'tuesday',
    title: 'Loop Breakers',
    subtitle: 'Tuesday session',
    date: 'Tue 30 June',
    time: '10:30–12',
    duration: '90 min',
    price: '£10',
    host: 'with Nici + co-facilitator (TBC)',
    note: 'Last Tuesday — close the loop',
    bookingUrl: TIDYCAL_TUESDAY,
  },
];

export function LBUpcoming() {
  return (
    <>
      <SectionBar color="var(--school-bus-yellow)" />
      <section id="upcoming" className={styles.section}>
        <div className={styles.inner}>
          <Eyebrow color="var(--school-bus-yellow)">Upcoming · May &amp; June 2026</Eyebrow>
          <h2 className={styles.heading}>Take a seat.</h2>
          <p className={styles.lede}>
            Tuesdays are{' '}
            <b className={styles.ledeStrong}>
              first and last Tuesday of the month
            </b>{' '}
            — Nici plus a rotating co-facilitator (a neurodivergent
            practitioner whose work the room&apos;s questions point to).
            Wednesdays are off-cadence Guest Stages led by invited experts.
            All sessions 10:30am–12pm. Pay-as-you-go. Skip any session.
          </p>
          <div className={styles.grid}>
            {SESSIONS.map((s, i) => {
              const isGuest = s.kind === 'guest-stage';
              return (
                <article
                  key={i}
                  className={styles.card}
                  data-kind={s.kind}
                >
                  <div className={styles.cardHead}>
                    <span className={styles.kindLabel}>
                      {isGuest ? 'Guest Stage' : 'Tuesday'}
                    </span>
                    <span className={styles.duration}>{s.duration}</span>
                  </div>
                  <h3 className={styles.cardTitle}>
                    {s.title}
                    {s.subtitle && isGuest ? (
                      <>
                        <br />
                        <span className={styles.cardSubtitle}>{s.subtitle}</span>
                      </>
                    ) : null}
                  </h3>
                  <div>
                    <p className={styles.date}>{s.date}</p>
                    <p className={styles.time}>{s.time}</p>
                    <p className={styles.host}>{s.host}</p>
                  </div>
                  <div className={styles.divider} />
                  <div className={styles.priceRow}>
                    <span className={styles.price}>{s.price}</span>
                    <span className={styles.note}>{s.note}</span>
                  </div>
                  <a
                    href={s.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.cta}
                  >
                    {isGuest ? 'Book Guest Stage →' : 'Book Tuesday seat →'}
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
