import Image from 'next/image';
import Link from 'next/link';
import styles from './HelloNickiFeature.module.css';

// Wednesday 20 May Guest Stage with Nicki Hambleton. The link points at
// the existing /guest-stage/[slug] page (which carries the full session
// + bio detail). This tile is a quoted hook on the homepage to make her
// presence visible above the SayHi form.
export function HelloNickiFeature() {
  return (
    <section className={styles.section} aria-labelledby="nicki-feature-heading">
      <Link
        href="/guest-stage/nicki-hambleton-sketch-noting"
        className={styles.card}
      >
        <div className={styles.portraitWrap}>
          <span aria-hidden="true" className={styles.halo} />
          <Image
            src="/assets/portraits/nicki-hambleton.png"
            alt="Nicki Hambleton"
            width={320}
            height={320}
            className={styles.portrait}
            sizes="(max-width: 720px) 50vw, 280px"
          />
        </div>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            <span aria-hidden="true" className={styles.dot} />
            Wed 20 May · Guest Stage
          </p>
          <h2 id="nicki-feature-heading" className={styles.heading}>
            Nicki Hambleton — drawing as thinking.
          </h2>
          <blockquote className={styles.quote}>
            &ldquo;What I struggle with is the starting point, even though I
            know where I am. I may be an octopus with lots of different arms,
            but even one octopus can only go down one rabbit hole at a
            time.&rdquo;
            <cite className={styles.cite}>— Nicki, in our prep call</cite>
          </blockquote>
          <p className={styles.framing}>
            Apple Distinguished Educator, illustrator, twenty years teaching
            drawing as a way out of the loop. She thinks in maps and
            octopus-arms — bring a pen and the thing that&apos;s stuck.
          </p>
          <span className={styles.cta}>
            Read more · book the seat <span aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </section>
  );
}
