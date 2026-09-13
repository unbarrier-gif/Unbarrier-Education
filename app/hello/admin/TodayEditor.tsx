'use client';

import { useFormState, useFormStatus } from 'react-dom';
import type { TodayRow } from '@/lib/hello-links';
import { moveTodayAction, saveHeadingAction, type EditState } from './actions';
import styles from './page.module.css';

// The edit panel on the signed-in /hello screen: the event heading (a text
// field) and today's links (move up / move down). Every control is a form
// posting to a server action, so it works without any client state and
// nothing here holds a copy of the data — Notion does.

const initial: EditState = { status: 'idle' };

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={styles.save} disabled={pending}>
      {pending ? 'saving…' : 'save heading'}
    </button>
  );
}

function MoveButton({ direction, disabled }: { direction: 'up' | 'down'; disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      name="direction"
      value={direction}
      className={styles.move}
      disabled={disabled || pending}
      aria-label={direction === 'up' ? 'move up' : 'move down'}
    >
      {direction === 'up' ? '↑' : '↓'}
    </button>
  );
}

export function TodayEditor({
  heading,
  rows,
  canPersist,
}: {
  heading: string;
  rows: TodayRow[];
  canPersist: boolean;
}) {
  const [headingState, headingAction] = useFormState(saveHeadingAction, initial);
  const [moveState, moveAction] = useFormState(moveTodayAction, initial);

  return (
    <div className={styles.editor}>
      <form action={headingAction} className={styles.field}>
        <label htmlFor="today-heading" className={styles.label}>
          event heading
        </label>
        <input
          id="today-heading"
          name="heading"
          defaultValue={heading}
          className={styles.input}
          maxLength={200}
          disabled={!canPersist}
        />
        <p className={styles.hint}>what the room sees above today&rsquo;s links.</p>
        <div className={styles.row}>
          <SaveButton />
          <Status state={headingState} />
        </div>
      </form>

      <div className={styles.field}>
        <p className={styles.label}>today&rsquo;s links — order</p>
        {rows.length === 0 ? (
          <p className={styles.hint}>
            no rows are ticked <em>today</em> in notion, so the page shows the
            three standing resources. tick a row&rsquo;s group to today in
            notion and it appears here.
          </p>
        ) : (
          <ol className={styles.orderList}>
            {rows.map((row, i) => (
              <li key={row.id} className={styles.orderRow}>
                <span className={styles.orderTitle}>{row.title}</span>
                <form action={moveAction} className={styles.moveForm}>
                  <input type="hidden" name="id" value={row.id} />
                  <MoveButton direction="up" disabled={!canPersist || i === 0} />
                  <MoveButton direction="down" disabled={!canPersist || i === rows.length - 1} />
                </form>
              </li>
            ))}
          </ol>
        )}
        <Status state={moveState} />
        <p className={styles.hint}>
          {canPersist
            ? 'order and heading live in the notion hello links table. this screen writes back to it; the public page updates within a minute.'
            : 'notion isn’t wired on this deployment, so nothing here can be saved. the public page is showing its committed fallback.'}
        </p>
      </div>
    </div>
  );
}

function Status({ state }: { state: EditState }) {
  if (state.status === 'ok') {
    return (
      <p className={styles.ok} role="status">
        saved.
      </p>
    );
  }
  if (state.status === 'error') {
    return (
      <p className={styles.error} role="alert">
        {state.message}
      </p>
    );
  }
  return null;
}
