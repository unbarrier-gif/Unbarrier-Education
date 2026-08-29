import Link from 'next/link';
import { Eyebrow } from '@/components/Eyebrow';
import { BOOKING_URL } from '@/lib/booking';
import {
  READINESS_CHECK_ENABLED,
  READINESS_CHECK_HREF,
} from '@/lib/readiness-check';
import styles from './IAmChooser.module.css';

// The "i am" chooser. Replaces the three product doors (audit / access /
// voice), which asked a stranger to choose between unbarrier's product names
// before they could get anywhere.
//
// Five routes, copy verbatim from the approved page drafts (28 Aug 2026):
// Quentin's tested four — individual, school, trust, international — plus
// edtech.
//
// TWO DESTINATION NOTES:
//
//  1. "i'm a teacher or senco" is approved to land on the free readiness
//     check, which is BRANCH E and does not exist. It uses the SAME flag as
//     /audit's primary cta — lib/readiness-check.ts, not a second flag — and
//     falls back to /audit. THE DESTINATION LINE FALLS BACK WITH IT: while
//     the check does not exist this route must not promise one. /audit is
//     where that reader wants to be anyway, because its copy is written to be
//     forwarded upwards. Branch E flips READINESS_CHECK_ENABLED and both the
//     link and the line come back.
//
//  2. "i'm an international school or group" points at the booking link. That
//     is the APPROVED destination — the copy says "→ a conversation" — not a
//     fallback for a missing page.
//
// WHAT THIS DOES NOT DO. The copy pack says each route "lands on a page
// carrying the case studies relevant to that reader". Those per-reader case
// studies do not exist. Nothing here fabricates them and no placeholder
// section was built for them; the routes link to the pages as they are.

type Route = {
  who: string;
  body: string;
  /** The italic destination line under each route. */
  destination: string;
  href: string;
  external?: boolean;
};

const TEACHER_ROUTE: Route = READINESS_CHECK_ENABLED
  ? {
      who: 'i’m a teacher or senco',
      body: 'you can see what isn’t working, and you’re not the person who holds the budget.',
      destination: 'the free readiness check, in a form you can forward upwards.',
      href: READINESS_CHECK_HREF,
    }
  : {
      who: 'i’m a teacher or senco',
      body: 'you can see what isn’t working, and you’re not the person who holds the budget.',
      // No readiness check yet, so this line does not name one.
      destination: 'unbarrier.audit, in a form you can forward upwards.',
      href: '/audit',
    };

const ROUTES: Route[] = [
  TEACHER_ROUTE,
  {
    who: 'i’m a school',
    body: 'one setting, and you want to know whether what you bought is reaching the learners it was bought for.',
    destination: 'a discovery day.',
    href: '/audit',
  },
  {
    who: 'i’m a trust or a group',
    body: 'several settings, one picture across all of them, and something a board will accept as evidence.',
    destination: 'a trust-level baseline.',
    href: '/access',
  },
  {
    who: 'i’m an international school or group',
    body: 'different constraints, different procurement, and it isn’t a uk offer with the names changed.',
    destination: 'a conversation.',
    href: BOOKING_URL,
    external: true,
  },
  {
    who: 'i’m an edtech company',
    body: 'you have a product, and you need to know whether it works for the learners you say it serves.',
    destination: 'unbarrier for edtech.',
    href: '/edtech',
  },
];

export function IAmChooser() {
  return (
    <section className={styles.section} aria-labelledby="i-am-chooser">
      <Eyebrow color="var(--spring-green)">where to start</Eyebrow>
      <h2 id="i-am-chooser" className={styles.heading}>
        tell us what you are. we&rsquo;ll tell you where to start.
      </h2>

      <ul className={styles.list}>
        {ROUTES.map((route) => {
          const inner = (
            <>
              <span className={styles.who}>{route.who}</span>
              <span className={styles.body}>{route.body}</span>
              <span className={styles.destination}>
                <span aria-hidden="true" className={styles.arrow}>
                  &rarr;
                </span>{' '}
                {route.destination}
              </span>
            </>
          );

          return (
            <li key={route.who} className={styles.item}>
              {route.external ? (
                <a
                  href={route.href}
                  className={styles.route}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {inner}
                </a>
              ) : (
                <Link href={route.href} className={styles.route}>
                  {inner}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
