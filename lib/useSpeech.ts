'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// Read-aloud via the browser's own Web Speech API. No third-party script,
// no vendor account, no cost. The voice comes from the listener's device —
// Siri-quality on Apple, Microsoft Natural on Edge, Google neural on Chrome.
//
// ── STANDING RULE · DO NOT "SIMPLIFY" THIS AWAY ──────────────────────────
// Chrome and Edge silently stop speechSynthesis after roughly 15 seconds of
// a single continuous utterance. Long-standing engine bug, not ours. The fix
// is to split the text into sentence-sized chunks and queue them one at a
// time, so no single utterance ever runs long enough to trip the cutoff.
// Any future Web Speech work on any unbarrier build keeps the chunking.
// Passing one long string to speak() will appear to work in Safari and cut
// off mid-sentence in Chrome.
// ─────────────────────────────────────────────────────────────────────────
//
// ── STANDING RULE · SCOPE TO THE ARTICLE ─────────────────────────────────
// Never read document.body. Read only the article element passed in. Reading
// the whole document makes the listener sit through nav links, cookie text
// and footer boilerplate before reaching a single word of content.
// ─────────────────────────────────────────────────────────────────────────

export type SpeechState = 'idle' | 'speaking' | 'paused';

/** Max characters per utterance. Comfortably under the ~15s Chrome cutoff
 *  even at a slow speaking rate. */
const MAX_CHUNK = 180;

/** Block elements worth reading, in document order. Anything not listed
 *  (nav, footer, buttons, code blocks) is skipped by omission. */
const READABLE =
  'h1, h2, h3, h4, h5, h6, p, li, blockquote, figcaption, dd, dt';

/**
 * Pull clean, speakable text out of an article element.
 * Skips decorative nodes and code blocks, and makes sure every block ends
 * in terminal punctuation so headings and list items get a natural pause.
 */
export function extractText(root: HTMLElement): string {
  return Array.from(root.querySelectorAll<HTMLElement>(READABLE))
    .filter(
      (el) =>
        !el.closest('[aria-hidden="true"]') &&
        !el.closest('pre') &&
        !el.closest('[data-no-speech]')
    )
    .map((el) => (el.textContent || '').replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .map((t) => (/[.!?…:]$/.test(t) ? t : `${t}.`))
    .join(' ');
}

/** Split into sentence-sized utterances. See the standing rule above. */
export function chunkText(text: string, max: number = MAX_CHUNK): string[] {
  const sentences = text.match(/[^.!?…]+[.!?…]+["')\]]*\s*/g) ?? [text];
  const out: string[] = [];
  let buf = '';

  const flush = () => {
    if (buf.trim()) out.push(buf.trim());
    buf = '';
  };

  for (const raw of sentences) {
    const piece = raw.trim();
    if (!piece) continue;

    // A single sentence longer than the cap — hard-wrap it on a comma,
    // falling back to a space, so we never emit an over-long utterance.
    if (piece.length > max) {
      flush();
      let rest = piece;
      while (rest.length > max) {
        let cut = rest.lastIndexOf(',', max);
        if (cut < max * 0.5) cut = rest.lastIndexOf(' ', max);
        if (cut <= 0) cut = max;
        out.push(rest.slice(0, cut + 1).trim());
        rest = rest.slice(cut + 1);
      }
      buf = rest.trim();
      continue;
    }

    if (`${buf} ${piece}`.trim().length > max) flush();
    buf = buf ? `${buf} ${piece}` : piece;
  }

  flush();
  return out;
}

/**
 * Score available voices and pick the best one on this device.
 * We can't control what the listener has installed, so we rank rather than
 * hard-code: British English first, then the known-good neural families.
 */
export function pickVoice(
  voices: SpeechSynthesisVoice[]
): SpeechSynthesisVoice | null {
  const english = voices.filter((v) => v.lang?.toLowerCase().startsWith('en'));
  if (english.length === 0) return null;

  const score = (v: SpeechSynthesisVoice): number => {
    const name = v.name.toLowerCase();
    let s = 0;
    if (v.lang.toLowerCase() === 'en-gb') s += 40;
    else if (v.lang.toLowerCase().startsWith('en-')) s += 5;
    if (name.includes('natural')) s += 30; // Edge / Windows neural
    if (name.includes('google')) s += 25; // Chrome neural
    if (name.includes('siri')) s += 25; // iOS / macOS
    if (name.includes('premium') || name.includes('enhanced')) s += 20;
    if (v.localService) s += 8; // on-device: no network stall
    if (name.includes('compact')) s -= 40; // the robotic legacy voices
    if (name.includes('novelty') || name.includes('eloquence')) s -= 60;
    // The engine's own default flag usually reflects what the person has
    // deliberately configured (iOS Settings > Accessibility > Spoken
    // Content, or the OS default elsewhere). Worth a nudge so a chosen
    // voice wins a close call — but not enough to override a clearly
    // better neural voice over a legacy default.
    if (v.default) s += 12;
    return s;
  };

  return english.slice().sort((a, b) => score(b) - score(a))[0] ?? null;
}

export function useSpeech(getRoot: () => HTMLElement | null): {
  state: SpeechState;
  supported: boolean;
  /** Start from the top, or resume from where we stopped. */
  play: () => void;
  /** Hold position. Resuming picks up at the same chunk. */
  pause: () => void;
  /** Stop and reset to the top. */
  stop: () => void;
} {
  const [state, setState] = useState<SpeechState>('idle');
  const [supported, setSupported] = useState(false);
  const chunksRef = useRef<string[]>([]);
  const indexRef = useRef(0);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  // Feature-detect after mount so server and first client paint agree.
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    setSupported(true);

    // getVoices() returns an empty array on the first call in most browsers
    // until the async voiceschanged event fires. Listen for it rather than
    // reading an empty list once and concluding there are no voices, and
    // keep listening — Chrome repopulates the list after network voices load.
    const loadVoices = () => {
      const found = window.speechSynthesis.getVoices();
      if (found.length > 0) voiceRef.current = pickVoice(found);
    };
    loadVoices();
    window.speechSynthesis.addEventListener?.('voiceschanged', loadVoices);
    // Belt and braces for engines that never fire the event.
    const retry = window.setTimeout(loadVoices, 300);
    return () => {
      window.clearTimeout(retry);
      window.speechSynthesis.removeEventListener?.('voiceschanged', loadVoices);
    };
  }, []);

  const hardStop = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
  }, []);

  // Never leave speech running when the reader navigates away. Next.js
  // client navigation unmounts this; pagehide covers tab close and back.
  useEffect(() => {
    const onLeave = () => hardStop();
    window.addEventListener('pagehide', onLeave);
    return () => {
      window.removeEventListener('pagehide', onLeave);
      hardStop();
    };
  }, [hardStop]);

  // Speak chunk `i`, then chain to the next on end. This chaining IS the
  // Chrome-cutoff fix — one utterance per chunk, never one long one.
  const speakFrom = useCallback(
    (i: number) => {
      const chunks = chunksRef.current;
      if (i >= chunks.length) {
        indexRef.current = 0;
        setState('idle');
        return;
      }

      indexRef.current = i;
      const u = new SpeechSynthesisUtterance(chunks[i]);
      if (voiceRef.current) {
        u.voice = voiceRef.current;
        u.lang = voiceRef.current.lang;
      } else {
        u.lang = 'en-GB';
      }
      u.rate = 0.95; // a touch under default — easier to follow
      u.pitch = 1;

      u.onend = () => {
        // Only advance if we're still meant to be playing. A cancel()
        // from pause/stop also fires onend in some engines.
        if (window.speechSynthesis.speaking) return;
        speakFrom(i + 1);
      };
      u.onerror = () => {
        indexRef.current = 0;
        setState('idle');
      };

      window.speechSynthesis.speak(u);
    },
    []
  );

  const play = useCallback(() => {
    if (!supported) return;
    const root = getRoot();
    if (!root) return;

    // Fresh start: rebuild the queue from the article.
    if (state === 'idle' || chunksRef.current.length === 0) {
      const text = extractText(root);
      if (!text) return;
      chunksRef.current = chunkText(text);
      indexRef.current = 0;
    }

    window.speechSynthesis.cancel(); // clear any stale queue
    setState('speaking');
    speakFrom(indexRef.current);
  }, [supported, state, getRoot, speakFrom]);

  // We pause by cancelling and remembering the chunk index rather than using
  // speechSynthesis.pause(), which hangs on long queues in Chrome. Resuming
  // replays the current chunk from its start — a fraction of a sentence of
  // overlap, in exchange for pause that actually works everywhere.
  const pause = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setState('paused');
  }, [supported]);

  const stop = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    chunksRef.current = [];
    indexRef.current = 0;
    setState('idle');
  }, [supported]);

  return { state, supported, play, pause, stop };
}
