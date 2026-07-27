'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Wordmark } from '@/components/Wordmark';
import styles from './IspAuditShell.module.css';

const TABS = [
  { href: '/isp-audit', label: 'leadership assessment' },
  { href: '/isp-audit/dashboard', label: 'admin dashboard' },
  { href: '/isp-audit/privacy', label: 'privacy notice' },
];

type TextSize = 'sm' | 'md' | 'lg';

const TEXT_SIZE_KEY = 'unbarrier:isp-audit:text-size';
const SPACING_KEY = 'unbarrier:isp-audit:spacing';
const SIZE_ORDER: TextSize[] = ['sm', 'md', 'lg'];
const SIZE_LABEL: Record<TextSize, string> = { sm: '87%', md: '100%', lg: '125%' };

// getVoices() is empty on first call in some browsers until the async
// voiceschanged event fires — wait for it once rather than concluding there
// are no voices.
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

/**
 * The self-contained LIGHT chrome for every /isp-audit page: a light header
 * (wordmark + privacy link + reading controls) and a light footer (legal +
 * contact + company line). Replaces the site's dark Nav/Footer on this route,
 * and owns the reading-size / spacing / read-aloud state that used to live in
 * the standalone ReadingControls — the data-attributes below drive the
 * --ia-text-scale / --ia-spacing-scale that every isp-audit component reads.
 */
export default function IspAuditShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === '/isp-audit' ? pathname === '/isp-audit' : pathname.startsWith(href);
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
    // Prefer the voice the browser/OS has flagged as the person's own default
    // (Settings > Accessibility > Spoken Content on iOS, system default
    // elsewhere) — voices[0] is often a low-quality fallback.
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
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.headerRow}>
          <Wordmark suffix=".me" size="md" href="/isp-audit" />
          <div className={styles.tools} role="group" aria-label="Page tools">
            <Link href="/isp-audit/privacy" className={styles.privacyLink}>
              privacy
            </Link>
            <span className={styles.readingLabel} aria-hidden="true">
              reading
            </span>
            <button
              type="button"
              className={styles.rbtn}
              onClick={() => setTextSize(SIZE_ORDER[Math.max(0, currentIndex - 1)])}
              disabled={textSize === 'sm'}
              aria-label="Decrease text size"
            >
              A−
            </button>
            <span className={styles.sizeValue} aria-live="polite">
              {hydrated ? SIZE_LABEL[textSize] : '100%'}
            </span>
            <button
              type="button"
              className={styles.rbtn}
              onClick={() => setTextSize(SIZE_ORDER[Math.min(SIZE_ORDER.length - 1, currentIndex + 1)])}
              disabled={textSize === 'lg'}
              aria-label="Increase text size"
            >
              A+
            </button>
            <button
              type="button"
              className={styles.rbtn}
              aria-pressed={extraSpacing}
              onClick={() => setExtraSpacing((v) => !v)}
              aria-label="Toggle extra line spacing"
              title="More line spacing"
            >
              ↕
            </button>
            {ttsSupported && (
              <button
                type="button"
                className={styles.rbtn}
                aria-pressed={speaking}
                onClick={speak}
                style={{ minWidth: 'auto' }}
              >
                {speaking ? 'Stop' : 'Listen'}
              </button>
            )}
          </div>
        </div>
      </header>

      <nav className={styles.tabs} aria-label="ISP Compass sections">
        {TABS.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className={styles.tab}
            aria-current={isActive(t.href) ? 'page' : undefined}
          >
            {t.label}
          </Link>
        ))}
      </nav>

      <div
        ref={contentRef}
        className={styles.content}
        data-ia-text-size={hydrated ? textSize : 'md'}
        data-ia-spacing={hydrated && extraSpacing ? 'true' : undefined}
      >
        {children}
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <Wordmark suffix=".me" size="md" />
            <p className={styles.tagline}>
              Removing barriers to learning and access — for schools, families and the
              neurodivergent community.
            </p>
          </div>
          <div className={styles.footCol}>
            <p className={styles.footHeading}>Legal</p>
            <Link href="/isp-audit/privacy" className={styles.footLink}>
              Privacy notice
            </Link>
            <Link href="/legal/terms" className={styles.footLink}>
              Terms
            </Link>
          </div>
          <div className={styles.footCol}>
            <p className={styles.footHeading}>Get in touch</p>
            <a href="mailto:privacy@unbarrier.me" className={styles.footLink}>
              privacy@unbarrier.me
            </a>
          </div>
        </div>
        <div className={styles.footBottom}>
          © 2026 Unbarrier Education Ltd · Co.&nbsp;No.&nbsp;16603630. The ISP Learning &amp; Device
          Compass — its questions, scoring and design — is the intellectual property of Unbarrier
          Education Ltd. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
