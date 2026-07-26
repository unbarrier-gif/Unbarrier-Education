import type { Metadata } from 'next';
import { isAdminAuthed } from '@/lib/isp-audit/adminAuth';
import { getAllResponses } from '@/lib/isp-audit/db';
import { ispAuditQuestionSet } from '@/lib/isp-audit/questions';
import Heatmap from '@/components/isp-audit/Heatmap';
import AdminLoginForm from '@/components/isp-audit/AdminLoginForm';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'ISP Compass — dashboard',
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

  return (
    <main className={styles.wrap}>
      <div className={styles.header}>
        <h1 className={styles.title}>ISP Learning & Device Compass — results</h1>
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
            {responses.map((r) => {
              const domainNotes = ispAuditQuestionSet.domains
                .map((d) => ({ name: d.name, text: r.answers.notes[d.id]?.trim() }))
                .filter((n): n is { name: string; text: string } => Boolean(n.text));

              return (
                <div key={r.id} className={styles.noteCard}>
                  <h3>
                    {r.school}
                    {r.region ? `, ${r.region}` : ''}
                  </h3>
                  <p className={styles.noteMeta}>
                    Submitted {new Date(r.submittedAt).toLocaleString('en-GB')}
                    {r.respondentName ? ` · ${r.respondentName}` : ''}
                    {r.respondentRole ? ` (${r.respondentRole})` : ''}
                  </p>
                  {r.answers.catalogue.length > 0 && (
                    <div className={styles.noteQA}>
                      <p className={styles.noteQ}>Catalogue priorities</p>
                      <p className={styles.noteA}>{r.answers.catalogue.join(', ')}</p>
                    </div>
                  )}
                  {domainNotes.map((n) => (
                    <div key={n.name} className={styles.noteQA}>
                      <p className={styles.noteQ}>{n.name}</p>
                      <p className={styles.noteA}>{n.text}</p>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </>
      )}
    </main>
  );
}
