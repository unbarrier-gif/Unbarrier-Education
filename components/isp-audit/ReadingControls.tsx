'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './ReadingControls.module.css';

type TextSize = 'sm' | 'md' | 'lg';

const TEXT_SIZE_KEY = 'unbarrier:isp-audit:text-size';
const SPACING_KEY = 'unbarrier:isp-audit:spacing';
const SIZE_ORDER: TextSize[] = ['sm', 'md', 'lg'];
const SIZE_LABEL: Record<TextSize, string> = { sm: '87%', md: '100%', lg: '125%' };

// getVoices() returns an empty array on first call in some browsers until
// the async voiceschanged event fires — wait for it once rather than
// reading an empty list and concluding no voices exist.
function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    const synth = window.speechSynthesis;
    const existing = synth.getVoices();
    if (existing.length > 0) {
      resolve(existing);
      return;
    }
    const handler = () => {
      synth.removeEventListener('voiceschanged', handler);
      resolve(synth.getVoices());
    };
    synth.addEventListener('voiceschanged', handler);
    setTimeout(() => resolve(synth.getVoices()), 300);
  });
}

export default function ReadingControls({ children }: { children: React.ReactNode }) {
  const [textSize, setTextSize] = useState<TextSize>('md');
  const [extraSpacing, setExtraSpacing] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [ttsSupported, setTtsSupported] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const storedSize = window.localStorage.getItem(TEXT_SIZE_KEY);
      if (storedSize === 'sm' || storedSize === 'md' || storedSize === 'lg') setTextSize(storedSize);
      setExtraSpacing(window.localStorage.getItem(SPACING_KEY) === 'true');
    } catch {
      // Corrupt/unavailable storage — start from defaults.
    }
    setTtsSupported(typeof window !== 'undefined' && 'speechSynthesis' in window);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(TEXT_SIZE_KEY, textSize);
    } catch {
      // ignore
    }
  }, [textSize, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(SPACING_KEY, String(extraSpacing));
    } catch {
      // ignore
    }
  }, [extraSpacing, hydrated]);

  // Don't let speech carry on into whatever page the person navigates to next.
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, []);

  async function speak() {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    const synth = window.speechSynthesis;

    if (synth.speaking || synth.pending) {
      synth.cancel();
      setSpeaking(false);
      return;
    }

    const text = contentRef.current?.innerText ?? '';
    if (!text.trim()) return;

    const utterance = new SpeechSynthesisUtterance(text);
    // Use whichever voice the browser/OS has flagged as the person's own
    // default (Settings > Accessibility > Spoken Content on iOS, the system
    // default elsewhere) rather than an arbitrary first entry — voices[0] is
    // frequently a low-quality/robotic fallback, not what the person actually
    // has configured. If no voice is flagged default, leave utterance.voice
    // unset so the browser makes its own (still better than us guessing).
    const voices = await loadVoices();
    const defaultVoice = voices.find((v) => v.default);
    if (defaultVoice) utterance.voice = defaultVoice;

    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    setSpeaking(true);
    synth.speak(utterance);
  }

  const currentIndex = SIZE_ORDER.indexOf(textSize);

  return (
    <div
      className={styles.wrap}
      data-ia-text-size={hydrated ? textSize : 'md'}
      data-ia-spacing={hydrated && extraSpacing ? 'true' : undefined}
    >
      <div className={styles.panel} role="group" aria-label="Reading preferences">
        <div className={styles.sizeGroup} role="group" aria-label="Text size">
          <button
            type="button"
            className={styles.sizeButton}
            onClick={() => setTextSize(SIZE_ORDER[Math.max(0, currentIndex - 1)])}
            disabled={textSize === 'sm'}
            aria-label="Decrease text size"
          >
            A−
          </button>
          <span className={styles.sizeValue} aria-live="polite">
            {SIZE_LABEL[textSize]}
          </span>
          <button
            type="button"
            className={styles.sizeButton}
            onClick={() => setTextSize(SIZE_ORDER[Math.min(SIZE_ORDER.length - 1, currentIndex + 1)])}
            disabled={textSize === 'lg'}
            aria-label="Increase text size"
          >
            A+
          </button>
        </div>
        <button
          type="button"
          className={styles.toggleButton}
          aria-pressed={extraSpacing}
          onClick={() => setExtraSpacing((v) => !v)}
        >
          Extra spacing
        </button>
        {ttsSupported && (
          <button type="button" className={styles.toggleButton} aria-pressed={speaking} onClick={speak}>
            {speaking ? 'Stop reading' : 'Listen to this page'}
          </button>
        )}
      </div>
      <p className={styles.note}>Preferences are saved on your device only.</p>
      <div ref={contentRef} className={styles.content}>
        {children}
      </div>
    </div>
  );
}
