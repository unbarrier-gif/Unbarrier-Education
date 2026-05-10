'use client';

import { useState } from 'react';
import { Eyebrow } from '@/components/Eyebrow';
import { SectionBar } from '@/components/SectionBar';
import bands from './bands.module.css';
import styles from './Band4Menu.module.css';

type Module = {
  n: string;
  title: string;
  length: string;
  audience: string;
  desc: string;
  accent: string;
  external?: string;
  externalLabel?: string;
};

const MODULES: Module[] = [
  {
    n: '02',
    title: 'Accessibility on iPad for Teaching Assistants',
    length: '90 minutes',
    audience: 'TAs · HLTAs',
    desc:
      'Same toolkit, recontextualised. Hands-on, no jargon, Monday-morning takeaway pack.',
    accent: 'var(--pearl-aqua)',
  },
  {
    n: '03',
    title: 'Strategic inclusion: accessibility as ordinarily available provision',
    length: '90 minutes',
    audience: 'SLT · SENCOs · Trust leads · Governors',
    desc:
      'Frames built-in accessibility as policy infrastructure — not an add-on.',
    accent: 'var(--princeton-orange)',
  },
  {
    n: '04',
    title: 'Parents, governors and trustees: what your iPad already does',
    length: '60 minutes',
    audience: 'Stakeholder session',
    desc:
      'Translates accessibility provision for families and governors. Reduces overwhelm.',
    accent: 'var(--orchid-mist)',
  },
  {
    n: '05',
    title: 'Accessibility audit clinic',
    length: 'Half-day',
    audience: 'Small group',
    desc:
      'Triage clinic mapping needs across a cohort. Lives on /audits — not a workshop.',
    accent: 'var(--school-bus-yellow)',
    external: '/audits',
    externalLabel: 'Goes to unbarrier.audit →',
  },
];

export function Band4Menu() {
  // Multi-open expansion state, keyed by module number. No accordion.
  const [openSet, setOpenSet] = useState<Set<string>>(new Set());

  const toggle = (n: string) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(n)) next.delete(n);
      else next.add(n);
      return next;
    });
  };

  return (
    <>
      <SectionBar color="var(--pearl-aqua)" />
      <section id="menu" className={`${bands.band} ${styles.band}`}>
        <div className={bands.bandInner}>
          <div className={bands.bandHead}>
            <Eyebrow color="var(--pearl-aqua)">The menu</Eyebrow>
            <h2 className={bands.h2}>Modules 2 — 5.</h2>
            <p className={bands.lede}>
              Each module runs standalone, or stacks into a full INSET day.
              Tap a tile to expand.{' '}
              <span className={styles.subtle}>
                (Module 1 is in the band above.)
              </span>
            </p>
          </div>
          <div className={styles.grid}>
            {MODULES.map((mod) => {
              const open = openSet.has(mod.n);
              const panelId = `module-panel-${mod.n}`;
              const isExternal = Boolean(mod.external);

              const inner = (
                <>
                  <span className={styles.tileNum}>{mod.n}</span>
                  <span className={styles.tileEyebrow}>Module</span>
                  <h3 className={styles.tileTitle}>{mod.title}</h3>
                  <div className={styles.tilePills}>
                    <span className={styles.pill}>{mod.length}</span>
                    <span className={styles.pill}>{mod.audience}</span>
                    {isExternal ? (
                      <span className={`${styles.pill} ${styles.linkOut}`}>
                        ↗ links out
                      </span>
                    ) : null}
                  </div>
                  <p className={styles.tileDesc}>{mod.desc}</p>
                  <span className={styles.tileCta}>
                    {isExternal ? mod.externalLabel : 'More about this module →'}
                  </span>
                </>
              );

              return (
                <div
                  key={mod.n}
                  className={styles.tileWrap}
                  style={{ '--accent': mod.accent } as React.CSSProperties}
                >
                  {isExternal ? (
                    <a
                      href={mod.external}
                      className={styles.tile}
                      data-external="true"
                    >
                      {inner}
                    </a>
                  ) : (
                    <button
                      type="button"
                      className={styles.tile}
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => toggle(mod.n)}
                    >
                      {inner}
                    </button>
                  )}
                  {!isExternal && open ? (
                    <div id={panelId} className={styles.panel}>
                      <p className={`${styles.panelBody} ${bands.placeholderText}`}>
                        [PLACEHOLDER — outcomes · what&apos;s covered ·
                        what&apos;s NOT covered · equipment · who to send. See
                        Workshops Page Spec §11(3).]
                        <span className={bands.placeholder}>placeholder</span>
                      </p>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
