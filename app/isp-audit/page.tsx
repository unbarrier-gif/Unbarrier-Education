import type { Metadata } from 'next';
import AuditForm from '@/components/isp-audit/AuditForm';
import { ispAuditQuestionSet } from '@/lib/isp-audit/questions';

export const metadata: Metadata = {
  title: 'ISP Learning & Device Compass',
};

export default function IspAuditPage() {
  return (
    <main>
      <AuditForm questionSet={ispAuditQuestionSet} />
    </main>
  );
}
