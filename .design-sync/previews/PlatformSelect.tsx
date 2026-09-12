import { useState } from 'react';
import { IspAuditLayout, PlatformSelect } from 'unbarrier-education';
import { ispAuditQuestionSet } from '@/lib/isp-audit/questions';

const Frame = ({ children }: { children: React.ReactNode }) => (
  <IspAuditLayout>
    <div style={{ maxWidth: 820, margin: '0 auto', padding: 'var(--ia-space-6) var(--ia-space-4) var(--ia-space-8)' }}>{children}</div>
  </IspAuditLayout>
);

function Chosen() {
  const [value, setValue] = useState<string | null>('Apple / iPad');
  return <PlatformSelect options={ispAuditQuestionSet.platformOptions} value={value} onChange={setValue} />;
}

function Blank() {
  const [value, setValue] = useState<string | null>(null);
  return <PlatformSelect options={ispAuditQuestionSet.platformOptions} value={value} onChange={setValue} />;
}

/** The device-domain platform question with one platform chosen. */
export const Selected = () => (
  <Frame>
    <Chosen />
  </Frame>
);

/** Nothing chosen yet — how the question first appears in the form. */
export const Unanswered = () => (
  <Frame>
    <Blank />
  </Frame>
);
