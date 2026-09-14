import { Eyebrow } from '@/components/Eyebrow';
import { Glow } from '@/components/Glow';
import styles from './BlogHero.module.css';

// The /blog hero since the 14 Sep 2026 redesign (design_handoff_blog_page,
// block j0): eyebrow · h1 · lede, nothing else. No tag row, no buttons, no
// legend — the shapes are explained by the chips on the index itself.
// Route accent is orchid-mist (voice, anything human).

export const BLOG_HEADING = 'said out loud, then typed down.';
export const BLOG_LEDE =
  'you bought it. nobody checked it reached the child. these are the notes from finding out why — short ones, honest ones, full arguments, and stories from people who get it.';

type Props = {
  eyebrow?: string;
  heading?: string;
  lede?: string;
};

export function BlogHero({
  eyebrow = 'unbarrier.blog',
  heading = BLOG_HEADING,
  lede = BLOG_LEDE,
}: Props) {
  return (
    <header className={styles.hero}>
      <Glow color="var(--orchid-mist)" left="-8%" top="2%" size={560} opacity={0.09} />
      <Glow color="var(--spring-green)" right="-12%" top="-16%" size={520} opacity={0.07} />

      <div className={styles.inner}>
        <Eyebrow color="var(--orchid-mist)">{eyebrow}</Eyebrow>
        <h1 className={styles.heading}>{heading}</h1>
        <p className={styles.lede}>{lede}</p>
      </div>
    </header>
  );
}
