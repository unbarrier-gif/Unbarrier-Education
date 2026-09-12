import { Section } from 'unbarrier-education';

const h2: React.CSSProperties = { fontSize: 'var(--fs-h3)', marginBottom: 'var(--space-4)' };
const p: React.CSSProperties = { color: 'var(--fg-muted)', maxWidth: '60ch' };

/** The ground ladder, as a route page walks it: 400 → 300 → 500, closing on 200. */
export const GroundLadder = () => (
  <div>
    <Section measure="route" ground="second" labelledBy="second">
      <h2 id="second" style={h2}>a second room · ground 400</h2>
      <p style={p}>the first section after the hero. shade comes from depth, colour comes from what sits on top.</p>
    </Section>
    <Section measure="route" ground="deep" labelledBy="deep">
      <h2 id="deep" style={h2}>deep · ground 300</h2>
      <p style={p}>footers, bands and wells. sections are separated by ground, never by a line.</p>
    </Section>
    <Section measure="route" ground="base" labelledBy="base">
      <h2 id="base" style={h2}>the page · ground 500</h2>
      <p style={p}>new world blue. a blue, not a purple. every tinted ground is vetoed.</p>
    </Section>
    <Section measure="route" ground="well" space="loose" labelledBy="well">
      <h2 id="well" style={h2}>the well · ground 200</h2>
      <p style={p}>the deepest ground, with loose spacing: where a page closes on its call to action.</p>
    </Section>
  </div>
);

/** The home measure is 900px; route pages read at 820px. */
export const HomeMeasure = () => (
  <Section ground="deep" labelledBy="thesis">
    <h2 id="thesis" style={h2}>nobody audits whether the tech reached the child.</h2>
    <p style={p}>
      something can be bought well and configured well and still not reach the learner, because one person in the
      chain was never asked. the audit starts at the child and works backwards.
    </p>
  </Section>
);
