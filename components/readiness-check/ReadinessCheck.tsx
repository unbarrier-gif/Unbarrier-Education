'use client';

import { useMemo, useRef, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { domainScores, overallReadiness, scoreBand } from '@/lib/isp-audit/summary';
import type { ScoreValue } from '@/lib/isp-audit/types';
import { SCALE, readinessQuestionSet } from '@/lib/readiness-check/questions';
import { finishAction, type FinishState } from '@/app/readiness-check/actions';
import styles from './ReadinessCheck.module.css';

// THE RESULT COMES FIRST AND IT COSTS NOTHING.
//
// Everything above the follow-up form runs in the browser. No submission, no
// address, no network call of any kind is needed to see a result — the
// approved copy promises "five minutes, and you see something useful before
// any sign-up wall", and the only way to keep that promise is for the wall to
// not exist rather than to be politely deferred.
//
// The scoring is the ISP engine's, imported not reimplemented: two instruments
// that claim to measure the same seven questions must not quietly disagree
// about the arithmetic. What is NOT shared is data — see the isolation test.

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

const initial: FinishState = { status: 'idle' };

export function ReadinessCheck({ route }: { route: string }) {
  const [scores, setScores] = useState<Record<string, ScoreValue>>({});
  const [shown, setShown] = useState(false);
  const [wantsResearch, setWantsResearch] = useState(false);
  const [needsEmail, setNeedsEmail] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const action = finishAction.bind(null, route);
  const [state, formAction] = useFormState(action, initial);

  const questions = readinessQuestionSet.domains.flatMap((d) => d.questions);
  const answered = questions.filter((q) => scores[q.id] !== undefined).length;
  const complete = answered === questions.length;

  const result = useMemo(() => {
    const perDomain = domainScores(readinessQuestionSet, { scores });
    const overall = overallReadiness(perDomain);
    const rated = perDomain.filter((d) => d.answered > 0);
    const weakest = [...rated].sort((a, b) => a.score - b.score)[0];
    const strongest = [...rated].sort((a, b) => b.score - a.score)[0];
    return { perDomain, overall, weakest, strongest };
  }, [scores]);

  function show() {
    setShown(true);
    // Move focus to the result rather than only scrolling: a keyboard or
    // screen-reader user must land on the thing that just appeared.
    requestAnimationFrame(() => resultRef.current?.focus());
  }

  return (
    <div className={styles.wrap}>
      <ol className={styles.questions}>
        {readinessQuestionSet.domains.map((domain) =>
          domain.questions.map((q) => (
            <li key={q.id} className={styles.question}>
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>
                  <span className={styles.domain}>{domain.name}</span>
                  <span className={styles.prompt}>{q.prompt}</span>
                </legend>
                <div className={styles.scale}>
                  {SCALE.map((step) => {
                    const id = `${q.id}-${step.value}`;
                    return (
                      <label key={id} className={styles.step} htmlFor={id}>
                        <input
                          type="radio"
                          id={id}
                          name={q.id}
                          value={step.value}
                          className={styles.radio}
                          checked={scores[q.id] === step.value}
                          onChange={() =>
                            setScores((prev) => ({ ...prev, [q.id]: step.value }))
                          }
                        />
                        <span className={styles.stepLabel}>{step.label}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            </li>
          )),
        )}
      </ol>

      {!shown && (
        <div className={styles.showRow}>
          <button
            type="button"
            className={styles.primary}
            onClick={show}
            disabled={answered === 0}
          >
            see my result →
          </button>
          <p className={styles.progress} aria-live="polite">
            {complete
              ? 'all nine answered.'
              : `${answered} of ${questions.length} answered. you can see a result at any point — the ones you skip are left out rather than counted as nought.`}
          </p>
        </div>
      )}

      {shown && (
        <>
          <div
            className={styles.result}
            ref={resultRef}
            tabIndex={-1}
            aria-labelledby="result-heading"
          >
            <h2 id="result-heading" className={styles.resultHeading}>
              your readiness check
            </h2>

            <p className={styles.caveat}>
              this is a five-minute snapshot from one person on one day. it is
              not a finding about your setting, and we would rather say that
              than let you carry it into a meeting as though it were.
            </p>

            <ul className={styles.bars}>
              {result.perDomain.map((d) => (
                <li key={d.id} className={styles.bar}>
                  <span className={styles.barName}>{d.name}</span>
                  <span className={styles.track} aria-hidden="true">
                    <span
                      className={styles.fill}
                      data-band={d.answered > 0 ? scoreBand(d.score) : undefined}
                      style={{ width: d.answered > 0 ? `${d.score}%` : 0 }}
                    />
                  </span>
                  <span className={styles.barValue}>
                    {d.answered > 0 ? `${d.score} / 100` : 'not answered'}
                  </span>
                </li>
              ))}
            </ul>

            {result.weakest && result.strongest && (
              <p className={styles.reading}>
                across what you answered, <strong>{result.strongest.name}</strong>{' '}
                is holding up best and <strong>{result.weakest.name}</strong> is
                where the least is in place. that gap is the useful part — not
                the number.
              </p>
            )}
          </div>

          <form action={formAction} className={styles.follow}>
            <input type="hidden" name="scores" value={JSON.stringify(scores)} />
            <p aria-hidden="true" className={styles.honeypot}>
              <label htmlFor="rc-website">leave this empty</label>
              <input id="rc-website" name="website" tabIndex={-1} autoComplete="off" />
            </p>

            <h2 className={styles.followHeading}>three things you can do with it. all optional.</h2>
            <p className={styles.followLede}>
              your result is above and it stays there whatever you tick. none of
              these is a condition of it.
            </p>

            <label className={styles.check} htmlFor="rc-send">
              <input
                type="checkbox"
                id="rc-send"
                name="sendResult"
                value="yes"
                className={styles.box}
                onChange={(e) => setNeedsEmail(e.target.checked)}
              />
              <span>
                <strong>send this to me.</strong> so you can forward it to
                whoever holds the budget. we use your address for that one email
                and don’t keep it.
              </span>
            </label>

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
                <strong>help build the picture.</strong> add your answers to the
                sector data, anonymously.
              </span>
            </label>

            {/* THE THESIS, SAID OUT LOUD. This is the differentiator: most
                companies market their framework with confidence they have not
                earned. Naming what we expect to find, and that we might be
                wrong, is the offer — and it is the only honest way to ask
                someone for their data. */}
            <div className={styles.thesis}>
              <p className={styles.thesisLead}>
                we think the seven questions will show something. we might be
                wrong.
              </p>
              <p>
                our belief is that settings score well on <strong>provision</strong>
                {' '}— the thing that got bought — and worse on{' '}
                <strong>belonging</strong> and <strong>trust</strong>, the part
                nobody checks. we have no proof of that. nobody does, because
                nobody has collected it.
              </p>
              <p>
                if the pattern isn’t there, we need to know before we sell it
                harder than we already do. a dataset you can only ever agree
                with isn’t proof, it’s decoration.
              </p>
              <p className={styles.thesisFoot}>
                stored: your nine answers, the setting type, the size band, your
                role, and the date. not the time. no email, no school name, no
                free text, nothing that could be traced back to you or to a
                learner.
              </p>
            </div>

            {wantsResearch && (
              <div className={styles.segments}>
                <Select name="settingType" label="what kind of setting?" options={SETTINGS} />
                <Select name="sizeBand" label="roughly how many on roll?" options={SIZES} />
                <Select name="respondentRole" label="and you are?" options={ROLES} />
              </div>
            )}

            <label className={styles.check} htmlFor="rc-newsletter">
              <input
                type="checkbox"
                id="rc-newsletter"
                name="newsletter"
                value="yes"
                className={styles.box}
                onChange={(e) => setNeedsEmail((v) => v || e.target.checked)}
              />
              <span>
                <strong>notice.</strong> one email when there’s something worth
                saying. nothing when there isn’t. i can unsubscribe from any
                email.
              </span>
            </label>

            <div className={styles.emailRow}>
              <label htmlFor="rc-email" className={styles.emailLabel}>
                email address{' '}
                <span className={styles.emailHint}>
                  {needsEmail
                    ? '— needed for the boxes you ticked'
                    : '— only if you tick one of the two that need it'}
                </span>
              </label>
              <input
                type="email"
                id="rc-email"
                name="email"
                className={styles.email}
                autoComplete="email"
                inputMode="email"
              />
            </div>

            <Submit />

            {state.status === 'error' && (
              <p className={styles.error} role="alert">{state.message}</p>
            )}
            {state.status === 'ok' && (
              <p className={styles.ok} role="status">
                {[
                  state.sent && 'result sent',
                  state.contributed && 'answers added to the picture',
                  state.subscribed && 'notice: check your inbox to confirm',
                ]
                  .filter(Boolean)
                  .join(' · ') || 'nothing to do — and your result is still above.'}
              </p>
            )}
          </form>
        </>
      )}
    </div>
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
      <label htmlFor={`rc-${name}`} className={styles.selectLabel}>{label}</label>
      <select id={`rc-${name}`} name={name} className={styles.select} defaultValue="">
        <option value="" disabled>choose one</option>
        {options.map(([value, text]) => (
          <option key={value} value={value}>{text}</option>
        ))}
      </select>
    </p>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={styles.primary} disabled={pending}>
      {pending ? 'sending…' : 'done →'}
    </button>
  );
}
