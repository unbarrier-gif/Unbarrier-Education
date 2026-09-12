import { IspAuditLayout, IspAuditShell } from 'unbarrier-education';

const card: React.CSSProperties = {
  background: 'var(--ia-bg-alt)',
  border: '1px solid var(--ia-border)',
  borderRadius: 'var(--radius-lg)',
  boxShadow: 'var(--ia-card-shadow)',
  padding: 'var(--ia-space-5)',
  marginTop: 'var(--ia-space-4)',
};

/**
 * The light chrome itself: amethyst header with wordmark, privacy link and
 * reading controls; section tabs; the content slot; amethyst footer. Shown
 * inside IspAuditLayout because the --ia-* tokens live on the route layout —
 * the inner shell (below the outer header and tabs) is the one under review.
 */
export const Chrome = () => (
  <IspAuditLayout>
    <IspAuditShell>
      <div style={{ maxWidth: 820, margin: '0 auto', padding: 'var(--ia-space-6) var(--ia-space-4) var(--ia-space-8)' }}>
        <h1 style={{ color: 'var(--ia-accent)', marginBottom: 'var(--ia-space-2)' }}>ISP Learning &amp; Device Compass</h1>
        <p style={{ color: 'var(--ia-fg-muted)', maxWidth: 640 }}>
          A seven-domain self-assessment for your school or region, part of ISP’s phase-two device planning.
        </p>
        <div style={card}>
          <h2 style={{ color: 'var(--ia-accent)', fontSize: '1.15rem', margin: '0 0 4px' }}>Before you start</h2>
          <p style={{ color: 'var(--ia-fg-muted)', margin: 0 }}>
            About 30 minutes. Your answers save as you go on this device, and you can pick them up again on a
            refresh.
          </p>
        </div>
      </div>
    </IspAuditShell>
  </IspAuditLayout>
);
