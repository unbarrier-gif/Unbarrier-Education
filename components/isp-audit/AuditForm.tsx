'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Answers, QuestionSet, ScoreValue } from '@/lib/isp-audit/types';
import { allQuestions } from '@/lib/isp-audit/types';
import ScaleSelector from './ScaleSelector';
import CatalogueChips from './CatalogueChips';
import styles from './AuditForm.module.css';

const DRAFT_KEY = 'isp-audit-draft-v2';

type Draft = {
  school: string;
  region: string;
  respondentName: string;
  respondentRole: string;
  scores: Record<string, ScoreValue>;
  notes: Record<string, string>;
  catalogue: string[];
};

const EMPTY_DRAFT: Draft = {
  school: '',
  region: '',
  respondentName: '',
  respondentRole: '',
  scores: {},
  notes: {},
  catalogue: [],
};

export default function AuditForm({ questionSet }: { questionSet: QuestionSet }) {
  const router = useRouter();
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [restored, setRestored] = useState(false);

  const errorSummaryRef = useRef<HTMLDivElement>(null);

  const questions = useMemo(() => allQuestions(questionSet), [questionSet]);
  const answeredCount = questions.filter((q) => draft.scores[q.id] !== undefined).length;

  // Restore an in-progress draft on mount so a refresh or accidental tab
  // close doesn't lose 28 questions of answers.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(DRAFT_KEY);
      if (raw) {
        setDraft({ ...EMPTY_DRAFT, ...(JSON.parse(raw) as Partial<Draft>) });
      }
    } catch {
      // Corrupt/unavailable storage — start fresh.
    } finally {
      setRestored(true);
    }
  }, []);

  useEffect(() => {
    if (!restored) return;
    try {
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    } catch {
      // Storage full/unavailable — draft just won't persist.
    }
  }, [draft, restored]);

  function setField<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((prev) => ({ ...prev, [key]: value }));
  }

  function setScore(id: string, v: ScoreValue) {
    setDraft((prev) => ({ ...prev, scores: { ...prev.scores, [id]: v } }));
  }

  function setNote(domainId: string, text: string) {
    setDraft((prev) => ({ ...prev, notes: { ...prev.notes, [domainId]: text } }));
  }

  function validate(): Record<string, string> {
    const next: Record<string, string> = {};
    if (!draft.school.trim()) {
      next.school = 'Enter your school name.';
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

    const answers: Answers = {
      scores: draft.scores,
      notes: draft.notes,
      catalogue: draft.catalogue,
    };

    setSubmitting(true);
    try {
      const res = await fetch('/api/isp-audit/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          school: draft.school.trim(),
          region: draft.region.trim() || null,
          respondentName: draft.respondentName.trim() || null,
          respondentRole: draft.respondentRole.trim() || null,
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
        <p className={styles.meta}>
          Takes about {questionSet.estimatedMinutes} minutes. You can leave and come back — your answers are saved on
          this device until you submit.
        </p>
        <p className={styles.scoringKey}>
          <strong>Scoring: 0</strong> = doesn’t exist at all &nbsp;·&nbsp; <strong>1</strong> = exists but weak
          &nbsp;·&nbsp; <strong>5</strong> = fully in place and working well.
        </p>
      </div>

      <nav className={styles.jumpNav} aria-label="Jump to domain">
        {questionSet.domains.map((d) => (
          <a key={d.id} href={`#${d.id}`}>
            {d.name}
          </a>
        ))}
        <span className={styles.progress}>{answeredCount} of {questions.length} questions answered</span>
      </nav>

      <form id="audit-form" onSubmit={handleSubmit} noValidate>
        {errorList.length > 0 && (
          <div className={styles.errorSummary} ref={errorSummaryRef} tabIndex={-1} role="alert">
            <h2>Please fix {errorList.length === 1 ? 'this' : 'these'} before submitting</h2>
            <ul>
              {errorList.map(([id, msg]) => (
                <li key={id}>
                  <a
                    href={`#ia-${id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const target = document.getElementById(`ia-${id}`);
                      target?.scrollIntoView({ block: 'center' });
                      target?.focus();
                    }}
                  >
                    {msg} — {id === 'school' ? 'Your school' : id}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className={styles.identity}>
          <div>
            <label htmlFor="ia-school" className={styles.label}>
              School / cluster <span className={styles.requiredNote}>(required)</span>
            </label>
            <input
              id="ia-school"
              className={styles.textInput}
              value={draft.school}
              onChange={(e) => setField('school', e.target.value)}
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
            <input
              id="ia-region"
              className={styles.textInput}
              value={draft.region}
              onChange={(e) => setField('region', e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="ia-name" className={styles.label}>
              Respondent name
            </label>
            <input
              id="ia-name"
              className={styles.textInput}
              value={draft.respondentName}
              onChange={(e) => setField('respondentName', e.target.value)}
              autoComplete="name"
            />
          </div>
          <div>
            <label htmlFor="ia-role" className={styles.label}>
              Role
            </label>
            <input
              id="ia-role"
              className={styles.textInput}
              value={draft.respondentRole}
              onChange={(e) => setField('respondentRole', e.target.value)}
            />
          </div>
        </div>

        {/* honeypot — hidden from sighted/keyboard users, real bots often fill every field */}
        <label className={styles.honeypot} aria-hidden="true">
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>

        {questionSet.domains.map((domain) => (
          <section key={domain.id} id={domain.id} className={styles.section} aria-labelledby={`${domain.id}-heading`}>
            <h2 id={`${domain.id}-heading`} className={styles.sectionTitle}>
              {domain.name}
            </h2>
            <p className={styles.sectionDescription}>best answered by: {domain.bestFor}</p>
            {domain.questions.map((q) => (
              <div key={q.id} className={styles.field}>
                <ScaleSelector
                  name={q.id}
                  legend={q.prompt}
                  value={draft.scores[q.id]}
                  onChange={(v) => setScore(q.id, v)}
                />
              </div>
            ))}
            <label className={styles.notesLabel} htmlFor={`notes-${domain.id}`}>
              Notes / evidence (optional)
            </label>
            <p className={styles.notesHint}>
              Doesn’t affect the score above — use it to add context, examples, or the “why” behind your answers.
            </p>
            <textarea
              id={`notes-${domain.id}`}
              className={styles.notesTextarea}
              value={draft.notes[domain.id] ?? ''}
              onChange={(e) => setNote(domain.id, e.target.value)}
            />
          </section>
        ))}

        <CatalogueChips
          options={questionSet.catalogueOptions}
          selected={draft.catalogue}
          onChange={(next) => setField('catalogue', next)}
        />

        <div className={styles.submitRow}>
          <button type="submit" className={styles.submitButton} disabled={submitting}>
            {submitting ? 'Sending…' : 'Submit audit'}
          </button>
          <span className={styles.progress}>{answeredCount} of {questions.length} questions answered</span>
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
