'use client';

import { useCallback } from 'react';
import { useSpeech } from '@/lib/useSpeech';
import styles from './ListenButton.module.css';

// Read-aloud control for blog posts. Mirrors the ContrastToggle pattern:
// client component, inline SVG, no icon library, tokens only.
//
// Scoped to `#post-body` — the <article> in NotionRenderer. Never the page.
// See the standing rules in lib/useSpeech.ts before changing anything here.

const ARTICLE_ID = 'post-body';

function PlayIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="currentColor"
    >
      <path d="M8 5.5a1 1 0 0 1 1.54-.84l9 6.5a1 1 0 0 1 0 1.68l-9 6.5A1 1 0 0 1 8 18.5Z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="currentColor"
    >
      <rect x="7" y="5" width="3.5" height="14" rx="1.2" />
      <rect x="13.5" y="5" width="3.5" height="14" rx="1.2" />
    </svg>
  );
}

function StopIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="12"
      height="12"
      fill="currentColor"
    >
      <rect x="6" y="6" width="12" height="12" rx="1.5" />
    </svg>
  );
}

export function ListenButton() {
  const getRoot = useCallback(
    () => document.getElementById(ARTICLE_ID),
    []
  );
  const { state, supported, play, pause, stop } = useSpeech(getRoot);

  // Render nothing rather than a button that does nothing. Older Firefox on
  // Linux and some locked-down school devices have no speech engine at all.
  if (!supported) return null;

  const playing = state === 'speaking';

  return (
    <div className={styles.row}>
      <button
        type="button"
        className={styles.btn}
        data-on={playing ? 'true' : undefined}
        aria-label={playing ? 'Pause reading this post' : 'Listen to this post'}
        onClick={playing ? pause : play}
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
        <span className={styles.label}>
          {playing ? 'pause' : state === 'paused' ? 'resume' : 'listen'}
        </span>
      </button>

      {state !== 'idle' && (
        <button
          type="button"
          className={styles.stop}
          aria-label="Stop reading and return to the start"
          onClick={stop}
        >
          <StopIcon />
          <span className={styles.label}>stop</span>
        </button>
      )}

      {/* Announced to screen readers only — they have their own reader and
          don't need this control, but they should know what it does. */}
      <span className={styles.note} role="status">
        {playing ? 'reading aloud' : ''}
      </span>
    </div>
  );
}
