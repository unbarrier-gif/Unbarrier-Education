'use client';

import { useCallback } from 'react';
import { useReadingPrefs, SIZE_LABEL } from '@/lib/useReadingPrefs';
import { useSpeech } from '@/lib/useSpeech';
import styles from './ReadingControls.module.css';

// The single reading-controls bar for the whole site. Merged from two
// separate implementations: the text-size + spacing controls originally
// built for the ISP audit page, and the chunked Web Speech reader built
// for the blog. There is now one of each — do not add a second.
//
// See lib/useSpeech.ts for the two standing rules (chunk the utterances,
// scope narration to the article). Do not "simplify" either away.

type Props = {
  /** Element id to narrate. Must be the content wrapper, never the page. */
  scopeId?: string;
  /** Hide the text-size and spacing controls, leaving just listen. */
  minimal?: boolean;
};

function PlayIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
      <path d="M8 5.5a1 1 0 0 1 1.54-.84l9 6.5a1 1 0 0 1 0 1.68l-9 6.5A1 1 0 0 1 8 18.5Z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
      <rect x="7" y="5" width="3.5" height="14" rx="1.2" />
      <rect x="13.5" y="5" width="3.5" height="14" rx="1.2" />
    </svg>
  );
}

function StopIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
      <rect x="6" y="6" width="12" height="12" rx="1.5" />
    </svg>
  );
}

export function ReadingControls({ scopeId = 'post-body', minimal = false }: Props) {
  const { textSize, extraSpacing, hydrated, stepSize, toggleSpacing } =
    useReadingPrefs();

  const getRoot = useCallback(
    () => document.getElementById(scopeId),
    [scopeId]
  );
  const { state, supported, play, pause, stop } = useSpeech(getRoot);

  const playing = state === 'speaking';

  return (
    <div className={styles.wrap}>
      <div className={styles.panel} role="group" aria-label="Reading preferences">
        {!minimal && (
          <>
            <div className={styles.sizeGroup} role="group" aria-label="Text size">
              <button
                type="button"
                className={styles.sizeBtn}
                onClick={() => stepSize(-1)}
                disabled={textSize === 'sm'}
                aria-label="Decrease text size"
              >
                A&#8722;
              </button>
              <span className={styles.sizeValue} aria-live="polite">
                {hydrated ? SIZE_LABEL[textSize] : SIZE_LABEL.md}
              </span>
              <button
                type="button"
                className={styles.sizeBtn}
                onClick={() => stepSize(1)}
                disabled={textSize === 'lg'}
                aria-label="Increase text size"
              >
                A+
              </button>
            </div>

            <button
              type="button"
              className={styles.btn}
              data-on={hydrated && extraSpacing ? 'true' : undefined}
              // Keep the rendered state stable until hydration so server HTML
              // and first client paint agree.
              aria-pressed={hydrated ? extraSpacing : false}
              onClick={toggleSpacing}
            >
              extra spacing
            </button>
          </>
        )}

        {/* Render nothing rather than a dead button where there's no speech
            engine — older Firefox on Linux, some locked-down school devices. */}
        {supported && (
          <>
            <button
              type="button"
              className={styles.btn}
              data-on={playing ? 'true' : undefined}
              aria-label={playing ? 'Pause reading' : 'Listen to this page'}
              onClick={playing ? pause : play}
            >
              {playing ? <PauseIcon /> : <PlayIcon />}
              <span>
                {playing ? 'pause' : state === 'paused' ? 'resume' : 'listen'}
              </span>
            </button>

            {state !== 'idle' && (
              <button
                type="button"
                className={styles.btn}
                aria-label="Stop reading and return to the start"
                onClick={stop}
              >
                <StopIcon />
                <span className={styles.stopLabel}>stop</span>
              </button>
            )}
          </>
        )}
      </div>

      <p className={styles.note}>your settings are saved on this device only.</p>
    </div>
  );
}
