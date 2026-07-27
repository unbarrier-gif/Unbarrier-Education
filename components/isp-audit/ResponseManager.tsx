'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './ResponseManager.module.css';

export type ManageRow = { id: string; label: string; meta: string };

export default function ResponseManager({ rows }: { rows: ManageRow[] }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function remove(row: ManageRow) {
    if (!window.confirm(`Delete this response — ${row.label}? This can't be undone.`)) return;
    setBusyId(row.id);
    setError(null);
    try {
      const res = await fetch('/api/isp-audit/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: row.id }),
      });
      if (!res.ok) throw new Error('delete-failed');
      router.refresh();
    } catch {
      setError('Could not delete that response — please try again.');
      setBusyId(null);
    }
  }

  if (rows.length === 0) return null;

  return (
    <div>
      <ul className={styles.list}>
        {rows.map((row) => (
          <li key={row.id} className={styles.row}>
            <div className={styles.info}>
              <span className={styles.rowLabel}>{row.label}</span>
              <span className={styles.rowMeta}>{row.meta}</span>
            </div>
            <button
              type="button"
              className={styles.deleteBtn}
              onClick={() => remove(row)}
              disabled={busyId === row.id}
            >
              {busyId === row.id ? 'Deleting…' : 'Delete'}
            </button>
          </li>
        ))}
      </ul>
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
