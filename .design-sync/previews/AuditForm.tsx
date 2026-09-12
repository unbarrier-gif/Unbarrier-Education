import { AuditForm, IspAuditLayout } from 'unbarrier-education';
import { ispAuditQuestionSet } from '@/lib/isp-audit/questions';

/** The whole Compass as a respondent meets it at /isp-audit: identity fields, seven domain accordions, catalogue and platform questions, submit. */
export const Compass = () => (
  <IspAuditLayout>
    <main>
      <AuditForm questionSet={ispAuditQuestionSet} />
    </main>
  </IspAuditLayout>
);
