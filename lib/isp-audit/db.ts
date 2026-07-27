import { neon } from '@neondatabase/serverless';
import type { Answers, AuditResponse } from './types';

// Vercel's Postgres/Neon integration populates DATABASE_URL (and the legacy
// POSTGRES_URL alias); accept either so setup doesn't depend on which name
// the integration used.
function getConnectionString(): string {
  const connectionString = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
  if (!connectionString) {
    throw new Error(
      'DATABASE_URL is not set — provision Postgres in the Vercel Storage tab, or set it locally for dev.',
    );
  }
  return connectionString;
}

let schemaReady: Promise<void> | null = null;

// Idempotent, run lazily before every query — no separate migration step at
// this scale (one table, pilot volume). The ADD COLUMN IF NOT EXISTS is the
// migration for tables created before respondent_email was collected (added
// 27 July 2026); CREATE TABLE alone never alters an existing table.
function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    const sql = neon(getConnectionString());
    schemaReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS isp_audit_responses (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          school TEXT NOT NULL,
          region TEXT,
          respondent_name TEXT,
          respondent_role TEXT,
          respondent_email TEXT,
          submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
          answers JSONB NOT NULL
        )
      `;
      await sql`
        ALTER TABLE isp_audit_responses
        ADD COLUMN IF NOT EXISTS respondent_email TEXT
      `;
    })();
  }
  return schemaReady;
}

function rowToResponse(row: Record<string, unknown>): AuditResponse {
  return {
    id: row.id as string,
    school: row.school as string,
    region: (row.region as string | null) ?? null,
    respondentName: (row.respondent_name as string | null) ?? null,
    respondentRole: (row.respondent_role as string | null) ?? null,
    respondentEmail: (row.respondent_email as string | null) ?? null,
    submittedAt: new Date(row.submitted_at as string).toISOString(),
    answers: row.answers as Answers,
  };
}

export async function insertResponse(params: {
  school: string;
  region: string | null;
  respondentName: string | null;
  respondentRole: string | null;
  respondentEmail: string | null;
  answers: Answers;
}): Promise<{ id: string }> {
  await ensureSchema();
  const sql = neon(getConnectionString());
  const rows = await sql`
    INSERT INTO isp_audit_responses (school, region, respondent_name, respondent_role, respondent_email, answers)
    VALUES (
      ${params.school},
      ${params.region},
      ${params.respondentName},
      ${params.respondentRole},
      ${params.respondentEmail},
      ${JSON.stringify(params.answers)}::jsonb
    )
    RETURNING id
  `;
  return { id: rows[0].id as string };
}

export async function getResponseById(id: string): Promise<AuditResponse | null> {
  await ensureSchema();
  const sql = neon(getConnectionString());
  let rows;
  try {
    rows = await sql`
      SELECT id, school, region, respondent_name, respondent_role, respondent_email, submitted_at, answers
      FROM isp_audit_responses
      WHERE id = ${id}
    `;
  } catch {
    // Malformed UUID (e.g. a guessed/typo'd URL) — treat as not found.
    return null;
  }
  return rows[0] ? rowToResponse(rows[0]) : null;
}

export async function getAllResponses(): Promise<AuditResponse[]> {
  await ensureSchema();
  const sql = neon(getConnectionString());
  const rows = await sql`
    SELECT id, school, region, respondent_name, respondent_role, respondent_email, submitted_at, answers
    FROM isp_audit_responses
    ORDER BY submitted_at ASC
  `;
  return rows.map(rowToResponse);
}
