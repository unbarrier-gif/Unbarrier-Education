import type { LBSession } from '@/content/loop-breakers/sessions';
import { StatusPill } from './StatusPill';
import { ctaForSession } from './ctaForSession';
import styles from './SessionCard.module.css';

// SessionCard renders ONE filterable session row inside SessionsMenu
// (/loop-breakers/sessions). It includes a date block, status pill,
// accent rail, and full meta. Used in the dedicated sessions menu page.
//
// For the homepage (/loop-breakers) "next 4 sessions" preview grid, see
// LBUpcoming — that's a denser preview layout with a different shape.
// Both components call ctaForSession() so their CTA copy can't drift.

type Props = {
  session: LBSession;
};

function fmtDay(iso: string) {
  const d = new Date(`${iso}T00:00:00`);
  return {
    day: d.getDate(),
    month: d
      .toLocaleDateString('en-GB', { month: 'short' })
      .toUpperCase(),
    weekday: d.toLocaleDateString('en-GB', { weekday: 'short' }),
  };
}

function daysUntil(iso: string): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const d = new Date(`${iso}T00:00:00`);
  return Math.round((d.getTime() - now.getTime()) / 86_400_000);
}

export function SessionCard({ session: s }: Props) {
  const { day, month, weekday } = fmtDay(s.date);
  const d = daysUntil(s.date);
  const dayLabel =
    s.status === 'past'
      ? null
      : d === 0
        ? 'Today'
        : d === 1
          ? 'Tomorrow'
          : d > 0 && d <= 14
            ? `In ${d} days`
            : null;

  const isPast = s.status === 'past';
  const cta = ctaForSession(s);

  // Static-friendly: clicks the booking link on the whole card (except CTA)
  // would require client JS; instead the card body is plain text and the
  // CTA pill is the click target. Keeps the page a Server Component.

  return (
    <article
      className={styles.card}
      data-past={isPast ? 'true' : undefined}
      style={{ ['--c' as string]: s.accent }}
    >
      <span aria-hidden="true" className={styles.rail} />

      <div className={styles.dateBlock}>
        <div className={styles.weekday}>{weekday}</div>
        <div className={styles.day}>{day}</div>
        <div className={styles.month}>{month}</div>
        <div className={styles.time}>
          {s.time} {s.tz}
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.metaRow}>
          <StatusPill status={s.status} seatsLeft={s.seatsLeft} />
          {dayLabel ? (
            <span className={styles.dayLabel}>· {dayLabel}</span>
          ) : null}
          {s.tags.map((t) => (
            <span key={t} className={styles.tag}>
              {t}
            </span>
          ))}
        </div>

        <h3 className={styles.theme}>{s.theme}</h3>
        <p className={styles.blurb}>{s.blurb}</p>

        <div className={styles.hostRow}>
          <b className={styles.hostName}>{s.host}</b>
          <span> · {s.hostRole}</span>
        </div>

        <div className={styles.footRow}>
          <div className={styles.format}>
            {s.durationMin} min · {s.format}
          </div>
          <div className={styles.priceCta}>
            {!isPast ? (
              <span className={styles.price}>
                {s.price.currency}
                {s.price.amount}
              </span>
            ) : null}
            {cta.disabled ? (
              <span className={styles.cta} data-disabled="true">
                {cta.label}
              </span>
            ) : (
              <a
                href={cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cta}
                data-status={s.status}
              >
                {cta.label}
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
