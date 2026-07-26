import type { Metadata } from 'next';
import AuditForm from '@/components/isp-audit/AuditForm';
import ReadingControls from '@/components/isp-audit/ReadingControls';
import { ispAuditQuestionSet } from '@/lib/isp-audit/questions';

export const metadata: Metadata = {
  title: 'ISP Learning & Device Compass',
};

export default function IspAuditPage() {
  return (
    <main>
      <ReadingControls>
        <AuditForm questionSet={ispAuditQuestionSet} />
      </ReadingControls>
    </main>
  );
}
