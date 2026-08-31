import { neon } from '@neondatabase/serverless';
import type { ScoreValue } from '@/lib/isp-audit/types';
import {
  READINESS_QUESTION_SET_ID,
  READINESS_SCHEMA_VERSION,
} from './questions';

// THE ANONYMOUS RESEARCH STORE.
//
// This is the sector picture — the reason the readiness check is free. It is
// written ONLY when someone ticks "help build the picture", and ticking it is
// never a condition of getting their result.
//
// ═══ WHAT THIS TABLE MUST NEVER HOLD ═══════════════════════════════════════
// No email. No name. No school. No role that names a person. No IP address.
// No free text of any kind — a comment box is a re-identification hole and a
// disclosure risk in a sector where the subject is often a child.
// No timestamp finer than a DATE: a row written at 14:07:31 lines up with the
// result email sent at 14:07:31, and the pair is no longer anonymous.
//
// That is what makes these rows non-personal data, which is what lets them be
// collected now rather than behind the /voice legal hold. THE MOMENT AN
// IDENTIFIER IS ADDED HERE, THAT REASONING COLLAPSES and this becomes a
// dataset that needs a retention period, a privacy-notice section and a
// lawful basis. If that is wanted, it is a different table and a different
// branch — do not grow this one into it.
//
// ═══ CLIENT ISOLATION ══════════════════════════════════════════════════════
// The ISP tool and this check share the SCORING MATHS and nothing else. This
// module never reads or writes `isp_audit_responses`, and nothing in
// `lib/isp-audit/db.ts` reads this table. Covered by a test — see
// lib/readiness-check/__tests__/isolation.test.ts.

const TABLE = 'readiness_check_responses';

/** The ISP table. Named here only so the isolation test can assert this
 *  module never mentions it in a query. */
export const ISP_TABLE = 'isp_audit_responses';

/** Coarse enough that no row describes one identifiable setting. */
export type SettingType =
  | 'primary'
  | 'secondary'
  | 'special'
  | 'alternative-provision'
  | 'all-through'
  | 'independent'
  | 'international'
  | 'other';

export type SizeBand = 'under-200' | '200-599' | '600-1199' | '1200-plus';

/** The respondent's own relationship to the setting. A role, never a person. */
export type RespondentRole =
  | 'teacher'
  | 'senco-or-inclusion-lead'
  | 'senior-leader'
  | 'trust-or-group'
  | 'other';

export type ResearchRow = {
  settingType: SettingType;
  sizeBand: SizeBand;
  respondentRole: RespondentRole;
  scores: Record<string, ScoreValue>;
};

function connectionString(): string {
  const url = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
  if (!url) throw new Error('DATABASE_URL is not set.');
  return url;
}

let schemaReady: Promise<void> | null = null;

// Idempotent, lazy, same pattern as the ISP table — one table, low volume, no
// separate migration step. `recorded_on DATE` is deliberate, not laziness:
// see the anonymity note above.
function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    const sql = neon(connectionString());
    schemaReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS readiness_check_responses (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          recorded_on DATE NOT NULL DEFAULT CURRENT_DATE,
          question_set_id TEXT NOT NULL,
          schema_version INTEGER NOT NULL,
          setting_type TEXT NOT NULL,
          size_band TEXT NOT NULL,
          respondent_role TEXT NOT NULL,
          scores JSONB NOT NULL
        )
      `;
    })();
  }
  return schemaReady;
}

/**
 * Write one anonymous row. Returns false rather than throwing: a research
 * write failing must never cost the respondent the result they came for.
 */
export async function recordAnonymousResult(row: ResearchRow): Promise<boolean> {
  try {
    await ensureSchema();
    const sql = neon(connectionString());
    await sql`
      INSERT INTO readiness_check_responses
        (question_set_id, schema_version, setting_type, size_band,
         respondent_role, scores)
      VALUES
        (${READINESS_QUESTION_SET_ID}, ${READINESS_SCHEMA_VERSION},
         ${row.settingType}, ${row.sizeBand}, ${row.respondentRole},
         ${JSON.stringify(row.scores)})
    `;
    return true;
  } catch (err) {
    console.error('[readiness-check] research write failed', err);
    return false;
  }
}

/** Row count, for the "n so far" line. Aggregate only — there is no read path
 *  in this module that returns an individual row, because there is nothing
 *  identifying in one and no reason to build the habit. */
export async function countResults(): Promise<number> {
  await ensureSchema();
  const sql = neon(connectionString());
  const rows = (await sql`
    SELECT count(*)::int AS n FROM readiness_check_responses
  `) as Array<{ n: number }>;
  return rows[0]?.n ?? 0;
}

export const READINESS_TABLE = TABLE;
