'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Answers, QuestionSet, ScoreValue } from '@/lib/isp-audit/types';
import { scoreQuestions } from '@/lib/isp-audit/types';
import QuestionField from './QuestionField';
import styles from './AuditForm.module.css';

const DRAFT_KEY = 'isp-audit-draft-v1';

type Draft = {
  school: string;
  region: string;
  values: Record<string, string>;
};

export default function AuditForm({ questionSet }: { questionSet: QuestionSet }) {
  const router = useRouter();
  const [school, setSchool] = useState('');
  const [region, setRegion] = useState('');
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [restored, setRestored] = useState(false);

  const fieldRefs = useRef<Record<string, HTMLElement | null>>({});
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  const required = useMemo(() => scoreQuestions(questionSet), [questionSet]);
  const answeredRequired = required.filter((q) => values[q.id]).length;

  const questionLabel = useMemo(() => {
    const map: Record<string, string> = {};
    for (const section of questionSet.sections) {
      for (const q of section.questions) {
        map[q.id] = q.prompt;
      }
    }
    return map;
  }, [questionSet]);

  // Restore an in-progress draft on mount so a refresh or accidental tab
  // close doesn't lose ~40 questions of typed answers.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const draft = JSON.parse(raw) as Draft;
        setSchool(draft.school ?? '');
        setRegion(draft.region ?? '');
        setValues(draft.values ?? {});
      }
    } catch {
      // Corrupt/unavailable storage — start fresh.
    } finally {
      setRestored(true);
    }
  }, []);

  useEffect(() => {
    if (!restored) return;
    const draft: Draft = { school, region, values };
    try {
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    } catch {
      // Storage full/unavailable — draft just won't persist.
    }
  }, [school, region, values, restored]);

  function setText(id: string, v: string) {
    setValues((prev) => ({ ...prev, [id]: v }));
  }

  function setScore(id: string, v: ScoreValue) {
    setValues((prev) => ({ ...prev, [id]: v }));
  }

  function validate(): Record<string, string> {
    const next: Record<string, string> = {};
    if (!school.trim()) {
      next.school = 'Enter your school name.';
    }
    for (const q of required) {
      if (!values[q.id]) {
        next[q.id] = 'Choose an answer.';
      }
    }
    return next;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError(null);

    const honeypot = (e.currentTarget.elements.namedItem('website') as HTMLInputElement | null)
      ?.value;

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      errorSummaryRef.current?.focus();
      return;
    }

    const answers: Answers = {};
    for (const section of questionSet.sections) {
      for (const q of section.questions) {
        const v = values[q.id];
        if (!v) continue;
        answers[q.id] =
          q.type === 'score' ? { type: 'score', value: v as ScoreValue } : { type: 'text', value: v };
      }
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/isp-audit/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          school: school.trim(),
          region: region.trim() || null,
          answers,
          honeypot,
        }),
      });
      if (!res.ok) throw new Error('submit-failed');
      const data = (await res.json()) as { id: string };
      try {
        window.localStorage.removeItem(DRAFT_KEY);
      } catch {
        // ignore
      }
      router.push(`/isp-audit/thank-you/${data.id}`);
    } catch {
      setSubmitError('Something went wrong sending your answers. Your progress is saved — please try again.');
      setSubmitting(false);
    }
  }

  const errorList = Object.entries(errors);

  return (
    <div className={styles.wrap}>
      <a href="#audit-form" className="skipLink">
        Skip to the form
      </a>

      <div className={styles.intro}>
        <h1 className={styles.title}>{questionSet.title}</h1>
        <p className={styles.introText}>{questionSet.intro}</p>
        <p className={styles.meta}>Takes about {questionSet.estimatedMinutes} minutes. You can leave and come back — your answers are saved on this device until you submit.</p>
      </div>

      <nav className={styles.jumpNav} aria-label="Jump to section">
        {questionSet.sections.map((s) => (
          <a key={s.id} href={`#${s.id}`}>
            {s.title}
          </a>
        ))}
        <span className={styles.progress}>
          {answeredRequired} of {required.length} required questions answered
        </span>
      </nav>

      <form id="audit-form" onSubmit={handleSubmit} noValidate>
        {errorList.length > 0 && (
          <div className={styles.errorSummary} ref={errorSummaryRef} tabIndex={-1} role="alert">
            <h2>Please fix {errorList.length === 1 ? 'this' : 'these'} before submitting</h2>
            <ul>
              {errorList.map(([id, msg]) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const target =
                        id === 'school'
                          ? document.getElementById('ia-school')
                          : (fieldRefs.current[id]?.querySelector('input,textarea') as HTMLElement | null);
                      target?.scrollIntoView({ block: 'center' });
                      target?.focus();
                    }}
                  >
                    {id === 'school' ? `${msg} — Your school` : `${msg} — ${questionLabel[id] ?? id}`}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className={styles.identity}>
          <div>
            <label htmlFor="ia-school" className={styles.label}>
              Your school <span className={styles.requiredNote}>(required)</span>
            </label>
            <input
              id="ia-school"
              className={styles.textInput}
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              aria-invalid={errors.school ? 'true' : undefined}
              aria-describedby={errors.school ? 'ia-school-error' : undefined}
              aria-required="true"
              autoComplete="organization"
            />
            {errors.school && (
              <p id="ia-school-error" className={styles.fieldError}>
                {errors.school}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="ia-region" className={styles.label}>
              Region
            </label>
            <input id="ia-region" className={styles.textInput} value={region} onChange={(e) => setRegion(e.target.value)} />
          </div>
        </div>

        {/* honeypot — hidden from sighted/keyboard users, real bots often fill every field */}
        <label className={styles.honeypot} aria-hidden="true">
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>

        {questionSet.sections.map((section) => (
          <section key={section.id} id={section.id} className={styles.section} aria-labelledby={`${section.id}-heading`}>
            <h2 id={`${section.id}-heading`} className={styles.sectionTitle}>
              {section.title}
            </h2>
            {section.description && <p className={styles.sectionDescription}>{section.description}</p>}
            {section.questions.map((q) => (
              <div key={q.id} id={q.id}>
                <QuestionField
                  question={q}
                  value={values[q.id]}
                  onChangeText={setText}
                  onChangeScore={setScore}
                  error={errors[q.id]}
                  fieldRef={(el) => {
                    fieldRefs.current[q.id] = el;
                  }}
                />
              </div>
            ))}
          </section>
        ))}

        <div className={styles.submitRow}>
          <button type="submit" className={styles.submitButton} disabled={submitting}>
            {submitting ? 'Sending…' : 'Submit audit'}
          </button>
          <span className={styles.progress}>
            {answeredRequired} of {required.length} required questions answered
          </span>
        </div>
        {submitError && (
          <p className={styles.submitError} role="alert">
            {submitError}
          </p>
        )}
      </form>
    </div>
  );
}
