import { useState } from 'react';
import { IspAuditLayout, ScaleSelector } from 'unbarrier-education';
import type { ScoreValue } from '@/lib/isp-audit/types';

const Frame = ({ children }: { children: React.ReactNode }) => (
  <IspAuditLayout>
    <div style={{ maxWidth: 820, margin: '0 auto', padding: 'var(--ia-space-6) var(--ia-space-4) var(--ia-space-8)' }}>{children}</div>
  </IspAuditLayout>
);

function Scale({
  name,
  legend,
  initial,
  initialCantAnswer = false,
  error,
}: {
  name: string;
  legend: string;
  initial?: ScoreValue;
  initialCantAnswer?: boolean;
  error?: string;
}) {
  const [value, setValue] = useState<ScoreValue | undefined>(initial);
  const [cantAnswer, setCantAnswer] = useState(initialCantAnswer);
  return (
    <ScaleSelector
      name={name}
      legend={legend}
      value={value}
      onChange={setValue}
      cantAnswer={cantAnswer}
      onCantAnswerChange={setCantAnswer}
      error={error}
    />
  );
}

/** A question as it first appears: 0–5 radios, nothing chosen. */
export const Unanswered = () => (
  <Frame>
    <Scale name="pedagogy-0" legend="Teachers feel confident using their current devices/tools to teach, not just to admin." />
  </Frame>
);

/** Answered at 3. */
export const Answered = () => (
  <Frame>
    <Scale name="pedagogy-1" legend="Technology use is planned against a learning outcome, not added for its own sake." initial={3} />
  </Frame>
);

/** Marked “Can’t answer this” — the scale greys out and is excluded from scoring. */
export const CantAnswer = () => (
  <Frame>
    <Scale name="leadership-1" legend="Our budget for this is committed, not provisional." initialCantAnswer />
  </Frame>
);

/** Submitted without an answer: the inline error. */
export const WithError = () => (
  <Frame>
    <Scale
      name="environment-1"
      legend="Wi-Fi coverage is reliable across all the teaching spaces that need it."
      error="Pick a score from 0 to 5, or tick “Can’t answer this”."
    />
  </Frame>
);
