'use client';

import { useMemo, useState } from 'react';
import {
  SESSIONS,
  upcomingSessions,
  openSessions,
  pastSessions,
  type LBSession,
} from '@/content/loop-breakers/sessions';
import { SessionCard } from './SessionCard';
import styles from './SessionsMenu.module.css';

type Filter = 'upcoming' | 'open' | 'past';

const TABS: { key: Filter; label: (count: number) => string }[] = [
  { key: 'upcoming', label: (n) => `Upcoming · ${n}` },
  { key: 'open', label: (n) => `Open now · ${n}` },
  { key: 'past', label: (n) => `Past · ${n}` },
];

export function SessionsMenu() {
  const [filter, setFilter] = useState<Filter>('upcoming');

  const counts = useMemo(
    () => ({
      upcoming: upcomingSessions().length,
      open: openSessions().length,
      past: pastSessions().length,
    }),
    [],
  );

  const visible: LBSession[] = useMemo(() => {
    if (filter === 'upcoming') return upcomingSessions();
    if (filter === 'open') return openSessions();
    return pastSessions();
  }, [filter]);

  // Sort sanity check — SESSIONS is already chronological from the typed
  // wrapper, but past sessions list is reversed (most recent first).
  void SESSIONS;

  return (
    <div>
      <div className={styles.tabs} role="tablist" aria-label="Filter sessions">
        {TABS.map((t) => {
          const on = filter === t.key;
          return (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={on}
              className={styles.tab}
              data-on={on ? 'true' : undefined}
              onClick={() => setFilter(t.key)}
            >
              {t.label(counts[t.key])}
            </button>
          );
        })}
      </div>

      <div className={styles.list}>
        {visible.map((s) => (
          <SessionCard key={s.slug} session={s} />
        ))}
        {visible.length === 0 ? (
          <p className={styles.empty}>Nothing here yet. Check back soon.</p>
        ) : null}
      </div>
    </div>
  );
}
