import type { LBSession } from '@/content/loop-breakers/sessions';
import { StatusPill } from './StatusPill';
import styles from './SessionCard.module.css';

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
  const ctaLabel = isPast
    ? 'Past session'
    : s.status === 'full'
      ? 'Join waitlist →'
      : s.status === 'open'
        ? 'Book · 1 click →'
        : 'Notify me →';

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
                {s.price.sliding ? ' sliding' : ''}
              </span>
            ) : null}
            {isPast ? (
              <span className={styles.cta} data-disabled="true">
                {ctaLabel}
              </span>
            ) : (
              <a
                href={s.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cta}
                data-status={s.status}
              >
                {ctaLabel}
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
