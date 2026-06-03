'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './page.module.css';

// The prompt is displayed and copied verbatim. Keep this string exactly as
// written — it is the product.
const PROMPT = `i'm a school leader. help me find out whether the people in my setting feel safe enough to *try* — to use new tools, ask for help, admit they're stuck, and have a go in front of others.

build me a short, anonymous survey i can send round. tell me first whether to aim it at staff, pupils, or both — i'll choose.

rules:
- 8 questions maximum. it must take under 5 minutes.
- plain english. no jargon. no leading questions.
- mostly a 1–5 agree/disagree scale, plus one or two optional open boxes.
- quietly cover these five things, without naming them in the questions:
  1. tribe — do people feel part of the group, or on the outside?
  2. expectation — do people know what's coming, or are they braced for surprises?
  3. rank — is it safe to not know something, or does that feel risky to their standing?
  4. autonomy — do people feel they have a say, or that things happen to them?
  5. trying — do people feel safe enough to try something new and get it wrong in front of others?
- include this open question: "what's one thing that would make it easier to try something new here?"

then give me:
- the survey, ready to paste straight into Google Forms or Microsoft Forms
- a simple way to read the results: what a low score in each of the five areas is telling me
- the single question i should ask my team out loud first, based on the lowest-scoring area

keep it warm and non-judgemental. this is information, not a test.`;

export function CopyPrompt() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timer.current), []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(PROMPT);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2400);
    } catch {
      // Clipboard blocked (insecure context / permissions) — select-to-copy
      // still works because the text is rendered in full below.
      setCopied(false);
    }
  }

  return (
    <div className={styles.promptCard}>
      <div className={styles.promptBar}>
        <span className={styles.promptLabel}>The prompt</span>
        <button type="button" className={styles.copyBtn} onClick={handleCopy}>
          {copied ? 'Copied ✓' : 'Copy'}
        </button>
      </div>
      <pre className={styles.prompt}>{PROMPT}</pre>
      <p className={styles.copyStatus} role="status" aria-live="polite">
        {copied ? 'Copied to your clipboard.' : ''}
      </p>
    </div>
  );
}
