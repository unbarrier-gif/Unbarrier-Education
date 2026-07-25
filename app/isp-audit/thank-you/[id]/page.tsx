import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getResponseById } from '@/lib/isp-audit/db';
import { ispAuditQuestionSet } from '@/lib/isp-audit/questions';
import { summarizeResponse } from '@/lib/isp-audit/summary';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Your audit results',
};

export const dynamic = 'force-dynamic';

export default async function ThankYouPage({ params }: { params: { id: string } }) {
  const response = await getResponseById(params.id);
  if (!response) notFound();

  const sections = summarizeResponse(ispAuditQuestionSet, response);
  const anchor = response.answers['s1q8'];

  return (
    <main className={styles.wrap}>
      <h1 className={styles.title}>Thanks, {response.school}.</h1>
      <p className={styles.lede}>
        Here’s a summary of your own answers. This page is private to you — bookmark it if you’d like to
        come back. ISP’s planning team sees only aggregated patterns across all schools, not your
        individual answers.
      </p>

      {anchor && anchor.type === 'text' && anchor.value && (
        <div className={styles.anchor}>
          <h2>The biggest challenge you flagged</h2>
          <p>{anchor.value}</p>
        </div>
      )}

      {sections.map((section) => (
        <section key={section.id} className={styles.section} aria-labelledby={`${section.id}-heading`}>
          <div className={styles.sectionHeader}>
            <h2 id={`${section.id}-heading`} className={styles.sectionTitle}>
              {section.title}
            </h2>
            <div className={styles.tally}>
              <span className={styles.tallyItem}>
                <span className={`${styles.dot} ${styles.dotHigh}`} aria-hidden="true" />
                {section.tally.high} high
              </span>
              <span className={styles.tallyItem}>
                <span className={`${styles.dot} ${styles.dotMedium}`} aria-hidden="true" />
                {section.tally.medium} medium
              </span>
              <span className={styles.tallyItem}>
                <span className={`${styles.dot} ${styles.dotLow}`} aria-hidden="true" />
                {section.tally.low} low
              </span>
            </div>
          </div>

          {section.weakItems.length === 0 ? (
            <p className={styles.allGood}>No flagged areas here — nice and steady.</p>
          ) : (
            section.weakItems.map((item) => (
              <div key={item.question.id} className={styles.weakItem} data-level={item.level}>
                <span className={styles.weakItemLevel}>{item.level}</span>
                <p className={styles.weakItemQuestion}>{item.question.prompt}</p>
                <p className={styles.weakItemNextStep}>{item.nextStep}</p>
              </div>
            ))
          )}
        </section>
      ))}

      <p className={styles.closing}>
        These next steps are a starting point, not a verdict — ISP’s planning team will use patterns
        across the whole estate, alongside your context answers, to prioritise phase-two support.
      </p>
    </main>
  );
}
