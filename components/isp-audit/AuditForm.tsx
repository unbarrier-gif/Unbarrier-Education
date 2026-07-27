'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Answers, QuestionSet, ScoreValue } from '@/lib/isp-audit/types';
import { allQuestions } from '@/lib/isp-audit/types';
import ScaleSelector from './ScaleSelector';
import CatalogueChips from './CatalogueChips';
import PlatformSelect from './PlatformSelect';
import { DOMAIN_COLORS, DOMAIN_ICONS } from './domainVisuals';
import styles from './AuditForm.module.css';

const DRAFT_KEY = 'isp-audit-draft-v2';

type Draft = {
  school: string;
  region: string;
  respondentName: string;
  respondentRole: string;
  respondentEmail: string;
  scores: Record<string, ScoreValue>;
  cantAnswer: string[];
  notes: Record<string, string>;
  catalogue: string[];
  platform: string | null;
};

const EMPTY_DRAFT: Draft = {
  school: '',
  region: '',
  respondentName: '',
  respondentRole: '',
  respondentEmail: '',
  scores: {},
  cantAnswer: [],
  notes: {},
  catalogue: [],
  platform: null,
};

const IDENTITY_FIELD_LABEL: Record<string, string> = {
  school: 'School',
  region: 'Region',
  respondentName: 'Respondent name',
  respondentRole: 'Role',
  respondentEmail: 'Email',
};

// Matches the server's zod .email() closely enough to catch typos before a
// round-trip — the API is still the real boundary.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AuditForm({ questionSet }: { questionSet: QuestionSet }) {
  const router = useRouter();
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [restored, setRestored] = useState(false);

  const errorSummaryRef = useRef<HTMLDivElement>(null);

  const questions = useMemo(() => allQuestions(questionSet), [questionSet]);
  const answeredCount = questions.filter(
    (q) => draft.scores[q.id] !== undefined || draft.cantAnswer.includes(q.id),
  ).length;

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

  function setCantAnswer(id: string, cantAnswer: boolean) {
    setDraft((prev) => {
      if (cantAnswer) {
        // Marking "can't answer" excludes the question from scoring — clear
        // any score it already had so the two states can't both be true.
        const { [id]: _removed, ...restScores } = prev.scores;
        return { ...prev, scores: restScores, cantAnswer: [...prev.cantAnswer, id] };
      }
      return { ...prev, cantAnswer: prev.cantAnswer.filter((qid) => qid !== id) };
    });
  }

  function setNote(domainId: string, text: string) {
    setDraft((prev) => ({ ...prev, notes: { ...prev.notes, [domainId]: text } }));
  }

  function validate(): Record<string, string> {
    const next: Record<string, string> = {};
    if (!draft.respondentName.trim()) {
      next.respondentName = 'Enter your name.';
    }
    if (!draft.respondentRole.trim()) {
      next.respondentRole = 'Enter your role.';
    }
    // Email is optional — never block a submission on a missing one. Only
    // check the format when something's actually been typed.
    if (draft.respondentEmail.trim() && !EMAIL_RE.test(draft.respondentEmail.trim())) {
      next.respondentEmail = 'Enter a valid email address, or leave it blank.';
    }
    // Block only an accidental empty click — at least one real score,
    // anywhere, is enough. Multiple people often split a submission by
    // domain (IT lead does device/environment, SENCO does EAL, etc.), so
    // this can't require full completion.
    if (Object.keys(draft.scores).length === 0) {
      next.minimum = 'Answer at least one question before submitting.';
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
      cantAnswer: draft.cantAnswer,
      notes: draft.notes,
      catalogue: draft.catalogue,
      platform: draft.platform,
    };

    setSubmitting(true);
    try {
      const res = await fetch('/api/isp-audit/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          school: draft.school.trim(),
          region: draft.region.trim() || null,
          respondentName: draft.respondentName.trim(),
          respondentRole: draft.respondentRole.trim(),
          respondentEmail: draft.respondentEmail.trim() || null,
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
        <p className={styles.meta}>
          We collect your name, email, role and answers to send your results and
          plan ISP’s review. See our{' '}
          <Link href="/isp-audit/privacy" className={styles.privacyLink}>
            privacy notice
          </Link>
          .
        </p>
      </div>

      <nav className={styles.jumpNav} aria-label="Jump to domain">
        {questionSet.domains.map((d) => (
          <a key={d.id} href={`#${d.id}`} className={styles.jumpLink} style={{ '--ia-domain-color': DOMAIN_COLORS[d.id] } as React.CSSProperties}>
            <span className={styles.jumpIcon}>{DOMAIN_ICONS[d.id]}</span>
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
              {errorList.map(([id, msg]) =>
                id === 'minimum' ? (
                  <li key={id}>{msg}</li>
                ) : (
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
                      {msg} — {IDENTITY_FIELD_LABEL[id] ?? id}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>
        )}

        <div className={styles.identity}>
          <div>
            <label htmlFor="ia-respondentName" className={styles.label}>
              Respondent name <span className={styles.requiredNote}>(required)</span>
            </label>
            <input
              id="ia-respondentName"
              className={styles.textInput}
              value={draft.respondentName}
              onChange={(e) => setField('respondentName', e.target.value)}
              aria-invalid={errors.respondentName ? 'true' : undefined}
              aria-describedby={errors.respondentName ? 'ia-respondentName-error' : undefined}
              aria-required="true"
              autoComplete="name"
            />
            {errors.respondentName && (
              <p id="ia-respondentName-error" className={styles.fieldError}>
                {errors.respondentName}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="ia-respondentEmail" className={styles.label}>
              Email <span className={styles.requiredNote}>(optional)</span>
            </label>
            <input
              id="ia-respondentEmail"
              type="email"
              className={styles.textInput}
              value={draft.respondentEmail}
              onChange={(e) => setField('respondentEmail', e.target.value)}
              aria-invalid={errors.respondentEmail ? 'true' : undefined}
              aria-describedby={
                errors.respondentEmail
                  ? 'ia-respondentEmail-error'
                  : 'ia-respondentEmail-hint'
              }
              autoComplete="email"
            />
            {errors.respondentEmail ? (
              <p id="ia-respondentEmail-error" className={styles.fieldError}>
                {errors.respondentEmail}
              </p>
            ) : (
              <p id="ia-respondentEmail-hint" className={styles.notesHint}>
                Add it if you’d like us to send your results and follow up —
                otherwise leave it blank, your answers still count.
              </p>
            )}
          </div>
          <div>
            <label htmlFor="ia-respondentRole" className={styles.label}>
              Role <span className={styles.requiredNote}>(required)</span>
            </label>
            <input
              id="ia-respondentRole"
              className={styles.textInput}
              value={draft.respondentRole}
              onChange={(e) => setField('respondentRole', e.target.value)}
              aria-invalid={errors.respondentRole ? 'true' : undefined}
              aria-describedby={errors.respondentRole ? 'ia-respondentRole-error' : undefined}
              aria-required="true"
            />
            {errors.respondentRole && (
              <p id="ia-respondentRole-error" className={styles.fieldError}>
                {errors.respondentRole}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="ia-school" className={styles.label}>
              School
            </label>
            <input
              id="ia-school"
              className={styles.textInput}
              list="ia-school-suggestions"
              value={draft.school}
              onChange={(e) => setField('school', e.target.value)}
              autoComplete="organization"
            />
            <datalist id="ia-school-suggestions">
              {questionSet.schoolSuggestions.map((s) => (
                <option key={s} value={s} />
              ))}
            </datalist>
          </div>
          <div>
            <label htmlFor="ia-region" className={styles.label}>
              Region
            </label>
            <input
              id="ia-region"
              className={styles.textInput}
              list="ia-region-suggestions"
              value={draft.region}
              onChange={(e) => setField('region', e.target.value)}
            />
            <datalist id="ia-region-suggestions">
              {questionSet.regionSuggestions.map((r) => (
                <option key={r} value={r} />
              ))}
            </datalist>
          </div>
        </div>

        {/* honeypot — hidden from sighted/keyboard users, real bots often fill every field */}
        <label className={styles.honeypot} aria-hidden="true">
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>

        {questionSet.domains.map((domain) => (
          <section
            key={domain.id}
            id={domain.id}
            className={styles.section}
            aria-labelledby={`${domain.id}-heading`}
            style={{ '--ia-domain-color': DOMAIN_COLORS[domain.id] } as React.CSSProperties}
          >
            <h2 id={`${domain.id}-heading`} className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>{DOMAIN_ICONS[domain.id]}</span>
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
                  cantAnswer={draft.cantAnswer.includes(q.id)}
                  onCantAnswerChange={(v) => setCantAnswer(q.id, v)}
                />
                {q.id === 'device-0' && (
                  <PlatformSelect
                    options={questionSet.platformOptions}
                    value={draft.platform}
                    onChange={(v) => setField('platform', v)}
                  />
                )}
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
        <p className={styles.submitPrivacy}>
          By submitting you agree we can hold your answers to run ISP’s review
          and send you your results. See our{' '}
          <Link href="/isp-audit/privacy" className={styles.privacyLink}>
            privacy notice
          </Link>
          .
        </p>
        {submitError && (
          <p className={styles.submitError} role="alert">
            {submitError}
          </p>
        )}
      </form>
    </div>
  );
}
