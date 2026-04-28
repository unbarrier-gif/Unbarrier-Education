import Image from 'next/image';
import { Button } from '../Button';
import { Glow } from '../Glow';
import styles from './LBHero.module.css';

export function LBHero() {
  return (
    <section id="home" className={styles.section}>
      <Glow color="var(--school-bus-yellow)" left="-120px" top="10%" size={680} opacity={0.1} />
      <Glow color="var(--spring-green)" left="35%" top="55%" size={420} opacity={0.07} />

      <div className={styles.heroRow}>
        <div className={styles.copy}>
          <span className={styles.pill}>Group coaching · neurodivergent-first</span>
          <h1 className={styles.heading}>
            You don&apos;t need a planner.
            <br />
            You need <span className={styles.accent}>a room.</span>
          </h1>
          <p className={styles.body}>
            A held room for neurodivergent women circling an idea — because the
            loop breaks when someone else sees it.
          </p>
          <p className={styles.terms}>
            90 minutes. Up to 10 people. £10. Pay-as-you-go.
          </p>
          <div className={styles.ctas}>
            <Button href="/loop-breakers/sessions" color="var(--spring-green)">
              See upcoming sessions →
            </Button>
            <Button href="#shape-it" variant="ghost">
              What are you stuck on?
            </Button>
          </div>
        </div>

        <div className={styles.banner} aria-hidden="true">
          <Image
            src="/assets/illustrations/where-old-stories-become-bold-stories.png"
            alt=""
            width={400}
            height={300}
            className={styles.bannerImg}
            priority
            sizes="(max-width: 760px) 92vw, (max-width: 1200px) 38vw, 480px"
          />
        </div>
      </div>
    </section>
  );
}
