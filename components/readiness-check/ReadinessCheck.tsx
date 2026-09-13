'use client';

import { useMemo, useRef, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '@/components/Button';
import { Eyebrow } from '@/components/Eyebrow';
import { Section } from '@/components/Section';
import type { ScoreValue } from '@/lib/isp-audit/types';
import { SCALE, readinessQuestionSet } from '@/lib/readiness-check/questions';
import {
  BAND_WORDS,
  DONT_KNOW,
  ONE_SEAT_WIDE,
  START,
  bandWord,
  computeResult,
  listNames,
  plainText,
  ratedScores,
  type Answers,
} from '@/lib/readiness-check/result';
import { BOOKING_URL } from '@/lib/booking';
import { SITE_FLAGS } from '@/lib/site-flags';
import { finishAction, type FinishState } from '@/app/readiness-check/actions';
import styles from './ReadinessCheck.module.css';

// The readiness check — the 13 Sep 2026 read (Readiness Check.dc.html).
//
//   rc1  the nine questions, seven options each (the engine's six + "i don't know")
//   rc2  the result: band word per dimension · start here · the one-seat line ·
//        copy as text
//   rc3  one thing you can do with it (optional) — the sector-layer consent
//   rc4  close: start with a discovery day (primary) · book a discovery call (ghost)
//   rc4b the close shown before a result exists
//
// THREE CONSENTS, NONE REQUIRED, ALL UNTICKED. Two of them — email-me-the-
// result (purpose 1) and the notice opt-in (purpose 2) — sit behind
// SITE_FLAGS.emailStep, which is OFF and stays off until the privacy notice
// names them. With the flag off nothing of them is rendered and nothing of
// them is wired: the result is forwarded by "copy as text" instead. The share
// code is likewise held (SITE_FLAGS.shareCode).
//
// The only wiring is the sector-layer row write: nine rated answers + setting
// type · size band · role + the date. See app/readiness-check/actions.ts.

const SETTINGS = [
  ['primary', 'primary'],
  ['secondary', 'secondary'],
  ['special', 'special'],
  ['alternative-provision', 'alternative provision'],
  ['all-through', 'all-through'],
  ['independent', 'independent'],
  ['international', 'international'],
  ['other', 'something else'],
] as const;

const SIZES = [
  ['under-200', 'under 200'],
  ['200-599', '200 to 599'],
  ['600-1199', '600 to 1,199'],
  ['1200-plus', '1,200 or more'],
] as const;

const ROLES = [
  ['teacher', 'teacher'],
  ['senco-or-inclusion-lead', 'senco or inclusion lead'],
  ['senior-leader', 'senior leader'],
  ['trust-or-group', 'trust or group'],
  ['other', 'something else'],
] as const;

const OPTIONS: ReadonlyArray<{ value: ScoreValue | typeof DONT_KNOW; label: string }> = [
  ...SCALE,
  { value: DONT_KNOW, label: 'i don’t know' },
];

const initial: FinishState = { status: 'idle' };

export function ReadinessCheck({ route }: { route: string }) {
  const [answers, setAnswers] = useState<Answers>({});
  const [shown, setShown] = useState(false);
  const [wantsResearch, setWantsResearch] = useState(false);
  const [copied, setCopied] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const action = finishAction.bind(null, route);
  const [state, formAction] = useFormState(action, initial);

  const words = BAND_WORDS[SITE_FLAGS.bandWords];
  const questions = readinessQuestionSet.domains.flatMap((d) =>
    d.questions.map((q) => ({ ...q, dimension: d.name })),
  );
  const responded = Object.keys(answers).length;
  const total = questions.length;

  const result = useMemo(() => computeResult(answers), [answers]);
  const rated = useMemo(() => ratedScores(answers), [answers]);

  function show() {
    setShown(true);
    requestAnimationFrame(() => {
      const el = resultRef.current;
      if (!el) return;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 120,
        behavior: 'smooth',
      });
      el.focus({ preventScroll: true });
    });
  }

  function copy() {
    const text = plainText(answers, words);
    const done = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    };
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(done, done);
    } else {
      done();
    }
  }

  const progressText =
    responded === 0
      ? `${total} questions. answer one and you can see a result.`
      : responded === total
        ? 'all nine answered.'
        : `${responded} of ${total} answered. you can see a result at any point — the ones you skip are left out rather than counted as nought.`;

  const submitted = state.status === 'ok';

  return (
    <>
      {/* rc1 — the questions */}
      <Section id="rc1" measure="route" ground="second" labelledBy="rc-questions">
        <h2 id="rc-questions" className={styles.sectionHeading}>
          rate each one as it actually is, not as it should be.
        </h2>
        <p className={styles.intro}>
          answer for one setting you know well, and for one thing it already
          bought. if you genuinely can&rsquo;t say, say so &mdash; &ldquo;i
          don&rsquo;t know&rdquo; is reported as a finding, not counted as a
          nought. anything you skip is left out.
        </p>
        <ol className={styles.questions}>
          {questions.map((q, i) => (
            <li key={q.id} className={styles.question}>
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>
                  <span className={styles.domain}>
                    {String(i + 1).padStart(2, '0')} · {q.dimension}
                  </span>
                  <span className={styles.prompt}>{q.prompt}</span>
                </legend>
                <div className={styles.scale}>
                  {OPTIONS.map((step) => {
                    const id = `${q.id}-${step.value}`;
                    const checked = answers[q.id] === step.value;
                    return (
                      <label
                        key={id}
                        className={`${styles.step} ${step.value === DONT_KNOW ? styles.stepUnknown : ''}`}
                        htmlFor={id}
                      >
                        <input
                          type="radio"
                          id={id}
                          name={q.id}
                          value={step.value}
                          className={styles.radio}
                          checked={checked}
                          onChange={() =>
                            setAnswers((prev) => ({ ...prev, [q.id]: step.value }))
                          }
                        />
                        <span className={styles.stepLabel}>{step.label}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            </li>
          ))}
        </ol>

        {!shown && (
          <div className={styles.showRow}>
            <button
              type="button"
              className={styles.primary}
              onClick={show}
              disabled={responded === 0}
            >
              see my result →
            </button>
            <p className={styles.progress} aria-live="polite">
              {progressText}
            </p>
          </div>
        )}
      </Section>

      {shown && (
        <>
          {/* rc2 — the result */}
          <Section id="rc2" measure="route" ground="deep" labelledBy="rc-result">
            <div className={styles.result} ref={resultRef} tabIndex={-1}>
              <div className={styles.resultHead}>
                <Eyebrow color="var(--pearl-aqua)">your readiness check</Eyebrow>
                <h2 id="rc-result" className={styles.sectionHeading}>
                  seven questions. three words.
                </h2>
                <p className={styles.caveat}>
                  this is a five-minute snapshot from one person on one day. it
                  is not a finding about your setting, and we would rather say
                  that than let you carry it into a meeting as though it were.
                </p>
              </div>

              {/* Band word only. No bars, no numbers. */}
              <dl className={styles.bands}>
                {result.per.map((d) => (
                  <div key={d.id} className={styles.bandRow}>
                    <dt className={styles.bandName}>{d.name}</dt>
                    <dd
                      className={styles.bandWord}
                      data-band={d.band === null ? 'none' : d.band}
                    >
                      {bandWord(d, words)}
                    </dd>
                  </div>
                ))}
              </dl>

              {result.weakest && (
                <div className={styles.start}>
                  <p className={styles.startLabel}>
                    start here · {result.weakest.name}
                  </p>
                  <p className={styles.startLead}>{START[result.weakest.id].lead}</p>
                  <p className={styles.startSentence}>
                    {START[result.weakest.id].sentence}
                  </p>
                </div>
              )}

              {result.strongest && result.weakest && (
                <p className={styles.reading}>
                  across what you answered,{' '}
                  <strong>{result.strongest.name}</strong> is holding up best.
                  the gap between that and <strong>{result.weakest.name}</strong>{' '}
                  is the useful part &mdash; not a number, which is why there
                  isn&rsquo;t one.
                </p>
              )}

              {result.unknown.length > 0 && (
                <p className={styles.unknown}>
                  <strong>you couldn&rsquo;t say for {listNames(result.unknown)}.</strong>{' '}
                  that is a finding, not a gap: nobody in the room can currently
                  tell whether it is in place. it is also the cheapest thing on
                  this page to find out.
                </p>
              )}

              <p className={styles.reading}>{ONE_SEAT_WIDE}</p>

              <div className={styles.copyRow}>
                <button type="button" className={styles.secondary} onClick={copy}>
                  {copied ? 'copied ✓' : 'copy as text →'}
                </button>
                <p className={styles.progress}>
                  plain sentences, no numbers. paste it into an email to
                  whoever holds the budget.
                </p>
              </div>
            </div>
          </Section>

          {/* rc3 — one thing you can do with it */}
          <Section id="rc3" measure="route" ground="base" labelledBy="rc-follow">
            {!submitted ? (
              <form action={formAction} className={styles.follow}>
                <input type="hidden" name="scores" value={JSON.stringify(rated)} />
                <p aria-hidden="true" className={styles.honeypot}>
                  <label htmlFor="rc-website">leave this empty</label>
                  <input id="rc-website" name="website" tabIndex={-1} autoComplete="off" />
                </p>

                <div className={styles.followHead}>
                  <h2 id="rc-follow" className={styles.sectionHeading}>
                    one thing you can do with it. optional.
                  </h2>
                  <p className={styles.followLede}>
                    your result is above and it stays there whether you tick
                    anything here or not. none of this is a condition of it.
                  </p>
                </div>

                {/* SITE_FLAGS.emailStep is off: the email field and the notice
                    opt-in are not built. See the header comment. */}

                <label className={styles.check} htmlFor="rc-research">
                  <input
                    type="checkbox"
                    id="rc-research"
                    name="research"
                    value="yes"
                    className={styles.box}
                    onChange={(e) => setWantsResearch(e.target.checked)}
                  />
                  <span>
                    <strong>help build the picture.</strong> add your answers to
                    the sector data, anonymously.
                  </span>
                </label>

                {wantsResearch && (
                  <div className={styles.segments}>
                    <Select name="settingType" label="what kind of setting?" options={SETTINGS} />
                    <Select name="sizeBand" label="roughly how many on roll?" options={SIZES} />
                    <Select name="respondentRole" label="and you are?" options={ROLES} />
                  </div>
                )}

                <div className={styles.thesis}>
                  <p className={styles.thesisLead}>
                    we think the seven questions will show something. we might
                    be wrong.
                  </p>
                  <p>
                    our belief is that settings score well on{' '}
                    <strong>provision</strong> &mdash; the thing that got bought
                    &mdash; and worse on <strong>belonging</strong> and{' '}
                    <strong>trust</strong>, the part nobody checks. we have no
                    proof of that. nobody does, because nobody has collected it.
                  </p>
                  <p>
                    if the pattern isn&rsquo;t there, we need to know before we
                    sell it harder than we already do. a dataset you can only
                    ever agree with isn&rsquo;t proof, it&rsquo;s decoration.
                  </p>
                  <p className={styles.thesisFoot}>
                    stored, if you tick the box: your nine answers, the setting
                    type, the size band, your role, and the date. not the time.
                    no school name, no free text, nothing that could be traced
                    back to you or to a learner.
                  </p>
                </div>

                <div className={styles.submitRow}>
                  <Submit enabled={wantsResearch} />
                  <p className={styles.progress}>
                    {wantsResearch
                      ? 'nothing here changes the result above.'
                      : 'tick something, or just take the result with you.'}
                  </p>
                </div>

                {state.status === 'error' && (
                  <p className={styles.error} role="alert">
                    {state.message}
                  </p>
                )}
              </form>
            ) : (
              <div className={styles.done} role="status">
                <h2 id="rc-follow" className={styles.sectionHeading}>
                  {state.status === 'ok' && state.contributed
                    ? 'thank you. it is in the picture.'
                    : 'nothing to do — and your result is still above.'}
                </h2>
                {state.status === 'ok' && state.contributed && (
                  <p className={styles.followLede}>
                    your nine answers, the setting type, the size band, your role
                    and the date are in the sector data. if the pattern
                    isn&rsquo;t there, you&rsquo;ll read it in notice first.
                  </p>
                )}
              </div>
            )}
          </Section>

          {/* rc4 — close */}
          <Section id="rc4" measure="route" ground="well" space="loose" labelledBy="rc-closing">
            <h2 id="rc-closing" className={styles.closeHeading}>
              if the check made you uncomfortable, that&rsquo;s the
              conversation.
            </h2>
            <p className={styles.closeLine}>
              the next rung is a day in your setting, asking the same seven
              questions of everyone in the chain.
            </p>
            <div className={styles.ctaRow}>
              <Button href="/audit" color="var(--pearl-aqua)">
                start with a discovery day →
              </Button>
              <Button href={BOOKING_URL} variant="ghost" external>
                ready to talk? → book a discovery call
              </Button>
            </div>
          </Section>
        </>
      )}

      {!shown && (
        /* rc4b — the close before a result exists */
        <Section id="rc4b" measure="route" ground="well" space="loose" labelledBy="rc-closing-b">
          <h2 id="rc-closing-b" className={styles.closeHeading}>
            already know where it breaks?
          </h2>
          <div className={styles.ctaRow}>
            <Button href="/audit" color="var(--pearl-aqua)">
              start with a discovery day →
            </Button>
            <Button href={BOOKING_URL} variant="ghost" external>
              ready to talk? → book a discovery call
            </Button>
          </div>
        </Section>
      )}
    </>
  );
}

function Select({
  name,
  label,
  options,
}: {
  name: string;
  label: string;
  options: ReadonlyArray<readonly [string, string]>;
}) {
  return (
    <p className={styles.selectRow}>
      <label htmlFor={`rc-${name}`} className={styles.selectLabel}>
        {label}
      </label>
      <select id={`rc-${name}`} name={name} className={styles.select} defaultValue="">
        <option value="" disabled>
          choose
        </option>
        {options.map(([value, text]) => (
          <option key={value} value={value}>
            {text}
          </option>
        ))}
      </select>
    </p>
  );
}

function Submit({ enabled }: { enabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={styles.primary} disabled={pending || !enabled}>
      {pending ? 'adding…' : 'add my answers →'}
    </button>
  );
}
