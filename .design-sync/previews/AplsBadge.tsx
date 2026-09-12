import { AplsBadge } from 'unbarrier-education';

// Apple's mark, served as supplied through an <img>. The colourway is chosen
// by ground, explicitly: amethyst takes the white file, white takes the black
// file. It is decorative — the credential strip names the credential in text.

/** On the page ground: the white colourway, as the credential strip uses it on every route. */
export const OnAmethyst = () => (
  <p style={{ margin: 0, fontFamily: 'var(--font-body)', color: 'var(--text)', fontSize: 'var(--fs-body)' }}>
    led by nici foote &mdash;
    <AplsBadge ground="amethyst" />
  </p>
);

/** On a white surface: the black colourway. */
export const OnWhite = () => (
  <div style={{ background: '#ffffff', padding: 24, borderRadius: 'var(--radius-md)', display: 'inline-block' }}>
    <p style={{ margin: 0, fontFamily: 'var(--font-body)', color: 'var(--amethyst)', fontSize: 'var(--fs-body)' }}>
      led by nici foote &mdash;
      <AplsBadge ground="white" />
    </p>
  </div>
);
