import type { CSSProperties } from 'react';
import { ParallelRooms } from './ParallelRooms';
import styles from '../page.module.css';

// Single row in the Band 5 worked-example day timeline. Three shapes:
//   - "module" row     → time + role label + module H4 + body paragraph
//   - "module-parallel" → as above, with tinted background (D31's "TA
//                         breakout" framing — concurrent with the rest of
//                         the school day, plain inline parallel-session
//                         text in the role label, no pill)
//   - "module-rooms"   → as module, plus a <ParallelRooms> pill alongside
//                         the role label (D35 — reserved for the 13:00
//                         leadership row only)
//   - "detail" row     → arrival / debrief — italic detail line, no
//                        module title, no body paragraph

type Tag = 'parallel' | 'parallel-rooms';

type Props = {
  time: string;
  roleLabel: string;
  roleColor?: string;
  moduleTitle?: string;
  body?: string;
  detail?: string;
  tag?: Tag;
};

export function ScheduleRow({
  time,
  roleLabel,
  roleColor,
  moduleTitle,
  body,
  detail,
  tag,
}: Props) {
  const isParallel = tag === 'parallel' || tag === 'parallel-rooms';
  const showParallelRooms = tag === 'parallel-rooms';
  const [start, end] = time.split('—').map((t) => t.trim());

  return (
    <li
      className={`${styles.timelineRow} ${isParallel ? styles.timelineRowParallel : ''}`}
    >
      <span className={styles.timelineTime}>
        {start ? <time>{start}</time> : null}
        {start && end ? <> — </> : null}
        {end ? <time>{end}</time> : null}
      </span>
      <div className={styles.timelineBody}>
        <span className={styles.timelineRoleLine}>
          <span
            className={styles.timelineAudience}
            style={
              roleColor
                ? ({ color: roleColor } as CSSProperties)
                : undefined
            }
          >
            {roleLabel}
          </span>
          {showParallelRooms ? <ParallelRooms /> : null}
        </span>
        {moduleTitle ? (
          <h4 className={styles.timelineModule}>{moduleTitle}</h4>
        ) : null}
        {body ? <p className={styles.timelineContext}>{body}</p> : null}
        {detail ? <p className={styles.timelineDetail}>{detail}</p> : null}
      </div>
    </li>
  );
}
