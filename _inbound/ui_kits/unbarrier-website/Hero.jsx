// Hero.jsx — landing hero
function Hero() {
  return (
    <section id="home" style={{
      position: "relative", minHeight: "100vh",
      display: "flex", alignItems: "center",
      padding: "9rem clamp(1.5rem, 5vw, 5rem) 4rem",
      overflow: "hidden",
    }}>
      <Glow color="#38ff99" x="-120px" y="10%" size={700} opacity={0.1} />
      <Glow color="#db7dcc" x="42%" y="28%" size={500} opacity={0.09} />

      {/* Illustration — full triangular bring-the-joy */}
      <div style={{
        position: "absolute", right: "-60px", top: "50%",
        transform: "translateY(-50%)",
        width: "clamp(440px, 52vw, 780px)",
        opacity: 0.96, zIndex: 1, pointerEvents: "none",
      }}>
        <img src="../../assets/illustrations/hero-bring-the-joy.png" alt="" aria-hidden="true"
          style={{ width: "100%", height: "auto" }} />
      </div>

      <div style={{ position: "relative", zIndex: 2, maxWidth: 620 }}>
        <Eyebrow>Inclusion · Digital Access · Student Voice</Eyebrow>

        <div style={{
          fontFamily: "'Cherry Bomb One', cursive",
          fontSize: "clamp(2.6rem, 6vw, 4.4rem)",
          color: "var(--spring-green)",
          lineHeight: 1.02,
          marginBottom: "1.4rem",
          textShadow: "0 0 40px rgba(56,255,153,0.25)",
        }}>
          bring the joy.
        </div>

        <h1 style={{
          fontFamily: "Outfit, system-ui",
          fontSize: "clamp(2.2rem, 5.2vw, 3.8rem)",
          fontWeight: 800, lineHeight: 1.06,
          letterSpacing: "-0.025em",
          margin: "0 0 1.4rem",
          color: "var(--text)",
        }}>
          The system wasn't built<br />
          for the <span style={{ color: "var(--spring-green)" }}>60% in the middle.</span><br />
          I'm building it differently.
        </h1>

        <p style={{
          fontFamily: "Comfortaa, system-ui",
          fontSize: "clamp(1rem, 1.8vw, 1.08rem)",
          lineHeight: 1.8, color: "var(--text-muted)",
          maxWidth: 540, margin: "0 0 0.8rem",
        }}>
          I'm Nici — an inclusion specialist, Apple Professional Learning
          Specialist, and educator with dyslexia and ADHD. I work with schools,
          families, and EdTech companies to remove the barriers that stop
          children from learning, belonging, and thriving — not just coping.
        </p>

        <p style={{
          fontFamily: "Comfortaa, system-ui", fontSize: "0.95rem",
          lineHeight: 1.8, color: "var(--text-subtle)",
          maxWidth: 480, margin: "0 0 2.4rem", fontStyle: "italic",
        }}>
          Everything I do asks one question: what are we solving for the student?
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <Button href="mailto:nici@unbarrier.me">Email Nici</Button>
          <Button href="#services" variant="ghost">How I work →</Button>
        </div>
      </div>
    </section>
  );
}

window.Hero = Hero;
