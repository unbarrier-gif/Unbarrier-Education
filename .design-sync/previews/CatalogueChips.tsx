import { useState } from 'react';
import { CatalogueChips, IspAuditLayout } from 'unbarrier-education';
import { ispAuditQuestionSet } from '@/lib/isp-audit/questions';

const Frame = ({ children }: { children: React.ReactNode }) => (
  <IspAuditLayout>
    <div style={{ maxWidth: 820, margin: '0 auto', padding: 'var(--ia-space-6) var(--ia-space-4) var(--ia-space-8)' }}>{children}</div>
  </IspAuditLayout>
);

function Picker({ initial }: { initial: string[] }) {
  const [selected, setSelected] = useState<string[]>(initial);
  return <CatalogueChips options={ispAuditQuestionSet.catalogueOptions} selected={selected} onChange={setSelected} />;
}

/** Two priorities picked, one slot still open. */
export const TwoPicked = () => (
  <Frame>
    <Picker initial={['Accessibility features', 'Local repair & support']} />
  </Frame>
);

/** At the limit of three — the remaining chips are disabled until one is unticked. */
export const AtMax = () => (
  <Frame>
    <Picker initial={['Upfront cost', 'Durability / build quality', 'Familiarity — what staff already know']} />
  </Frame>
);

/** Nothing picked yet — how the question first appears in the form. */
export const Empty = () => (
  <Frame>
    <Picker initial={[]} />
  </Frame>
);
