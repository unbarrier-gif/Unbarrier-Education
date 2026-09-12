import { DownloadResultsButton, IspAuditLayout } from 'unbarrier-education';

/** The results page toolbar: generated line on the left, print-to-PDF button on the right. */
export const Toolbar = () => (
  <IspAuditLayout>
    <div style={{ maxWidth: 820, margin: '0 auto', padding: 'var(--ia-space-6) var(--ia-space-4) var(--ia-space-8)' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ia-space-3)', alignItems: 'center', justifyContent: 'space-between' }}>
        <p style={{ color: 'var(--ia-fg-muted)', margin: 0 }}>your results · generated 12 September 2026</p>
        <DownloadResultsButton filename="ISP-Compass-results-Reach-British-School" />
      </div>
    </div>
  </IspAuditLayout>
);
