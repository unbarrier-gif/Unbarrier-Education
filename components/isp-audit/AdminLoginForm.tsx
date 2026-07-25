'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './AdminLoginForm.module.css';

export default function AdminLoginForm() {
  const router = useRouter();
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/isp-audit/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode }),
      });
      if (!res.ok) {
        setError('That passcode is not correct.');
        setSubmitting(false);
        return;
      }
      router.refresh();
    } catch {
      setError('Something went wrong — please try again.');
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>Dashboard access</h1>
      <form onSubmit={handleSubmit} noValidate>
        <label className={styles.label} htmlFor="admin-passcode">
          Passcode
        </label>
        <input
          id="admin-passcode"
          type="password"
          className={styles.input}
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? 'admin-passcode-error' : undefined}
          autoFocus
        />
        <button type="submit" className={styles.button} disabled={submitting}>
          {submitting ? 'Checking…' : 'Enter'}
        </button>
        {error && (
          <p id="admin-passcode-error" role="alert" className={styles.error}>
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
