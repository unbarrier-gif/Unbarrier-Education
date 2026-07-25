import type { Metadata } from 'next';
import { isAdminAuthed } from '@/lib/isp-audit/adminAuth';
import { getAllResponses } from '@/lib/isp-audit/db';
import { ispAuditQuestionSet } from '@/lib/isp-audit/questions';
import { textQuestions } from '@/lib/isp-audit/types';
import Heatmap from '@/components/isp-audit/Heatmap';
import AdminLoginForm from '@/components/isp-audit/AdminLoginForm';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'ISP audit — dashboard',
};

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  if (!isAdminAuthed()) {
    return (
      <main>
        <AdminLoginForm />
      </main>
    );
  }

  const responses = await getAllResponses();
  const freeTextQuestions = textQuestions(ispAuditQuestionSet);

  return (
    <main className={styles.wrap}>
      <div className={styles.header}>
        <h1 className={styles.title}>ISP phase-two audit — results</h1>
        <a className={styles.exportLink} href="/api/isp-audit/export">
          Download CSV
        </a>
      </div>
      <p className={styles.count}>
        {responses.length} {responses.length === 1 ? 'response' : 'responses'} so far
      </p>

      {responses.length === 0 ? (
        <p className={styles.empty}>No responses yet — share the audit link with schools to get started.</p>
      ) : (
        <>
          <Heatmap questionSet={ispAuditQuestionSet} responses={responses} />

          <div className={styles.notes}>
            <h2>Context &amp; notes, by school</h2>
            {responses.map((r) => (
              <div key={r.id} className={styles.noteCard}>
                <h3>
                  {r.school}
                  {r.region ? `, ${r.region}` : ''}
                </h3>
                <p className={styles.noteMeta}>Submitted {new Date(r.submittedAt).toLocaleString('en-GB')}</p>
                {freeTextQuestions.map((q) => {
                  const a = r.answers[q.id];
                  if (!a || a.type !== 'text' || !a.value.trim()) return null;
                  return (
                    <div key={q.id} className={styles.noteQA}>
                      <p className={styles.noteQ}>{q.prompt}</p>
                      <p className={styles.noteA}>{a.value}</p>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
