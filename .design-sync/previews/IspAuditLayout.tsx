import { IspAuditLayout } from 'unbarrier-education';

const card: React.CSSProperties = {
  background: 'var(--ia-bg-alt)',
  border: '1px solid var(--ia-border)',
  borderRadius: 'var(--radius-lg)',
  boxShadow: 'var(--ia-card-shadow)',
  padding: 'var(--ia-space-5)',
  marginTop: 'var(--ia-space-4)',
};

/** The light ISP route: header, section tabs, content, footer — with a short page inside it. */
export const ShortPage = () => (
  <IspAuditLayout>
    <div style={{ maxWidth: 820, margin: '0 auto', padding: 'var(--ia-space-6) var(--ia-space-4) var(--ia-space-8)' }}>
      <h1 style={{ color: 'var(--ia-accent)', marginBottom: 'var(--ia-space-2)' }}>ISP Learning &amp; Device Compass</h1>
      <p style={{ color: 'var(--ia-fg-muted)', maxWidth: 640 }}>
        A seven-domain self-assessment for your school or region, part of ISP’s phase-two device planning.
        Domains are tagged with who’s best placed to answer — split across roles if that’s easier than one
        person doing it all.
      </p>
      <div style={card}>
        <h2 style={{ color: 'var(--ia-accent)', fontSize: '1.15rem', margin: '0 0 4px' }}>Before you start</h2>
        <p style={{ color: 'var(--ia-fg-muted)', margin: 0 }}>
          About 30 minutes. Your answers save as you go on this device, and you can pick them up again on a
          refresh. Your individual answers are visible only to you and to ISP’s planning team.
        </p>
      </div>
    </div>
  </IspAuditLayout>
);
