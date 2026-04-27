import Image from 'next/image';
import { Button } from './Button';
import { Eyebrow } from './Eyebrow';
import { Glow } from './Glow';
import styles from './HomeHero.module.css';

export function HomeHero() {
  return (
    <section id="home" className={styles.hero}>
      <Glow
        color="var(--spring-green)"
        left="-120px"
        top="10%"
        size={700}
        opacity={0.1}
      />
      <Glow
        color="var(--orchid-mist)"
        left="42%"
        top="28%"
        size={500}
        opacity={0.09}
      />

      <div className={styles.illustration} aria-hidden="true">
        <Image
          src="/assets/illustrations/hero-bring-the-joy.png"
          alt=""
          width={1280}
          height={1280}
          priority
          unoptimized
          sizes="(max-width: 768px) 0px, 52vw"
        />
      </div>

      <div className={styles.content}>
        <Eyebrow>Inclusion · Digital Access · Student Voice</Eyebrow>

        <h1 className={styles.headline}>
          The system wasn&apos;t built
          <br />
          for the <span className={styles.accent}>60% in the middle.</span>
          <br />
          I&apos;m building it differently.
        </h1>

        <p className={styles.lede}>
          I&apos;m Nici — an inclusion specialist, Apple Professional Learning
          Specialist, and educator with dyslexia and ADHD. I work with schools,
          families, and EdTech companies to remove the barriers that stop
          children from learning, belonging, and thriving — not just coping.
        </p>

        <p className={styles.anchor}>
          Everything I do asks one question: what are we solving for the
          student?
        </p>

        <div className={styles.actions}>
          <Button href="mailto:nici@unbarrier.me">Email Nici</Button>
          <Button href="#services" variant="ghost">
            How I work →
          </Button>
        </div>
      </div>
    </section>
  );
}
