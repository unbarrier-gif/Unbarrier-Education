import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

// CLIENT ISOLATION + ANONYMITY — non-negotiable now a public front end shares
// the audit engine with a named client's tool.
//
// These are static assertions on the source, deliberately. A runtime test
// would need a database, which means it would be skipped in CI, which means it
// would stop being run, which means the guarantee would quietly lapse. The
// claim being defended is structural — "these two never touch each other's
// tables, and the public one holds nothing identifying" — so the source is the
// right thing to assert against. No test runner dependency: node --test.

const ISP_TABLE = 'isp_audit_responses';
const PUBLIC_TABLE = 'readiness_check_responses';

function filesUnder(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...filesUnder(full));
    else if (/\.(ts|tsx)$/.test(entry)) out.push(full);
  }
  return out;
}

const publicSources = [
  ...filesUnder('lib/readiness-check'),
  ...filesUnder('app/readiness-check'),
];
const ispSources = filesUnder('lib/isp-audit');

test('the public readiness check never touches the ISP table', () => {
  for (const file of publicSources) {
    const src = readFileSync(file, 'utf8');
    // store.ts names the ISP table once, in a comment and an exported
    // constant, so the assertion below can be written. It must never appear
    // inside a template literal — that is what a query is.
    const inQuery = /sql`[^`]*isp_audit_responses/s.test(src);
    assert.equal(inQuery, false, `${file} queries ${ISP_TABLE}`);
  }
});

test('the ISP tool never touches the public table', () => {
  for (const file of ispSources) {
    const src = readFileSync(file, 'utf8');
    assert.equal(src.includes(PUBLIC_TABLE), false, `${file} references ${PUBLIC_TABLE}`);
  }
});

test('the ISP dashboard and export read only ISP sources', () => {
  for (const file of ['app/isp-audit/dashboard/page.tsx', 'app/api/isp-audit/export/route.ts']) {
    const src = readFileSync(file, 'utf8');
    assert.equal(src.includes(PUBLIC_TABLE), false, `${file} can surface public rows`);
    assert.equal(src.includes('readiness-check'), false, `${file} imports from the public check`);
  }
});

test('the research table holds nothing that identifies anyone', () => {
  const src = readFileSync('lib/readiness-check/store.ts', 'utf8');
  const schema = src.slice(
    src.indexOf('CREATE TABLE IF NOT EXISTS readiness_check_responses'),
    src.indexOf('recordAnonymousResult'),
  );
  for (const forbidden of ['email', 'school', 'name', 'ip_address', 'respondent_name', 'notes', 'comment']) {
    assert.equal(
      new RegExp(`\\b${forbidden}\\b`, 'i').test(schema),
      false,
      `readiness_check_responses must not hold ${forbidden}`,
    );
  }
  // A DATE, never a timestamp: a row written to the second lines up with the
  // result email sent the same second, and the pair stops being anonymous.
  assert.match(schema, /recorded_on DATE NOT NULL/);
  assert.equal(/TIMESTAMPTZ/i.test(schema), false, 'a precise timestamp de-anonymises the row');
});

test('every stored row is version-stamped so a wording change cannot make old rows incomparable', () => {
  const src = readFileSync('lib/readiness-check/store.ts', 'utf8');
  assert.match(src, /question_set_id TEXT NOT NULL/);
  assert.match(src, /schema_version INTEGER NOT NULL/);
});
