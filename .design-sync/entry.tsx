// design-sync extra entry. Three jobs:
//  1. Put app/globals.css (tokens, type defaults, high-contrast rules) into the
//     shipped stylesheet. The site imports it from app/layout.tsx, which is
//     not part of the component tree.
//  2. Re-export the ISP audit components (and the /isp-audit route layout,
//     which owns the --ia-* tokens), which are default exports and so are
//     skipped by the converter's `export *` entry.
//  3. PageGround: the page ground. On the site <body> takes `--bg` (new world
//     blue) from globals.css; outside the site nothing paints it, so designs
//     and preview cards wrap once in PageGround. It paints the ground, sets
//     the text colour and the body face, and does nothing else.
import type { ReactNode } from 'react';
import '../app/globals.css';
import './shims/font-vars.css';

export { default as IspAuditLayout } from '../app/isp-audit/layout';
export { default as AdminLoginForm } from '../components/isp-audit/AdminLoginForm';
export { default as AuditForm } from '../components/isp-audit/AuditForm';
export { default as CatalogueChips } from '../components/isp-audit/CatalogueChips';
export { default as DownloadResultsButton } from '../components/isp-audit/DownloadResultsButton';
export { default as Heatmap } from '../components/isp-audit/Heatmap';
export { default as IspAuditShell } from '../components/isp-audit/IspAuditShell';
export { default as PlatformSelect } from '../components/isp-audit/PlatformSelect';
export { default as RadarChart } from '../components/isp-audit/RadarChart';
export { default as ResponseManager } from '../components/isp-audit/ResponseManager';
export { default as ScaleSelector } from '../components/isp-audit/ScaleSelector';

/**
 * The page ground. Wrap a whole design in it once, at the root. It paints
 * new world blue (`--bg`), sets the text colour (`--fg`) and the body face,
 * and nothing else — sections inside it choose their own ground with
 * <Section ground="…">. Never nest it.
 */
export function PageGround({ children }: { children: ReactNode }) {
  return (
    <div
      data-page-ground=""
      style={{
        position: 'relative',
        background: 'var(--bg)',
        color: 'var(--fg)',
        fontFamily: 'var(--font-body)',
        minHeight: '100%',
      }}
    >
      {/* Paints the ground behind the host's own page padding as well, so a
          preview card never shows a white frame around a dark surface. */}
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, background: 'var(--bg)', zIndex: -1 }} />
      {children}
    </div>
  );
}
