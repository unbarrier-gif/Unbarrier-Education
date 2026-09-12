import { AdminLoginForm, IspAuditLayout } from 'unbarrier-education';

/** The passcode gate in front of the admin dashboard. */
export const Gate = () => (
  <IspAuditLayout>
    <main style={{ padding: 'var(--ia-space-6) var(--ia-space-4) var(--ia-space-8)' }}>
      <AdminLoginForm />
    </main>
  </IspAuditLayout>
);
