// VoiceHolding.jsx — placeholder for unbarrier.me/voice
//
// Brief from Nici: hold the full page back until the partnership conversation
// with the EdTech team I worked with has happened. Don't reveal the offer.
// Don't tell their story without permission. Keep it small, honest, and a
// signal to EdTech firms that I'm in this work and they can come and talk.
//
// Structure:
//   1. Hero — one line, one claim, one CTA
//   2. What I see — five short observations from real classroom/product work,
//      in Nici's own voice from the transcripts. The problem, said plainly.
//   3. Where I'm at — a small honest paragraph about the work being shaped
//      and an invitation to be early.
//   4. CTA — email Nici. No forms.
//
// One Cherry Bomb moment ("show me."), orchid accent throughout, amethyst canvas.

function VoiceHolding() {
  return (
    <>
      <Nav active="voice" />

      {/* ── 1. HERO ──────────────────────────────────────────────────── */}
      <section id="voice-home" style={{
        position: "relative", minHeight: "78vh",
        display: "flex", alignItems: "center",
        padding: "9rem clamp(1.5rem, 5vw, 5rem) 4rem",
        overflow: "hidden",
      }}>
        <Glow color="#db7dcc" x="-120px" y="14%" size={680} opacity={0.10} />
        <Glow color="#38ff99" x="58%" y="38%" size={460} opacity={0.06} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 720, margin: "0 auto" }}>
          <Eyebrow color="#db7dcc">unbarrier.voice — for EdTech companies</Eyebrow>

          {/* Cherry Bomb — the one decorative font moment on the page */}
          <div style={{
            fontFamily: "'Cherry Bomb One', cursive",
            fontSize: "clamp(2.4rem, 5.4vw, 3.8rem)",
            color: "#db7dcc",
            lineHeight: 1.02,
            marginBottom: "1.4rem",
            textShadow: "0 0 40px rgba(219,125,204,0.25)",
          }}>
            students are the why.
          </div>

          <h1 style={{
            fontFamily: "Outfit, system-ui",
            fontSize: "clamp(2rem, 4.6vw, 3.4rem)",
            fontWeight: 800, lineHeight: 1.08,
            letterSpacing: "-0.025em",
            margin: "0 0 1.6rem",
            color: "var(--text)",
          }}>
            I help EdTech teams build products people<br />
            <span style={{ color: "#db7dcc" }}>actually use, understand, and benefit from.</span>
          </h1>

          <p style={{
            fontFamily: "Comfortaa, system-ui",
            fontSize: "clamp(1rem, 1.8vw, 1.1rem)",
            lineHeight: 1.8, color: "var(--text-muted)",
            maxWidth: 560, margin: "0 0 2.4rem",
          }}>
            I'm Nici — an early-years specialist, Apple Professional Learning
            Specialist, and educator with dyslexia and ADHD. I work inside
            EdTech product rooms on the bit most companies miss: what children
            actually do with the thing you've built — not what adults guess
            they do.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <Button href="mailto:nici@unbarrier.me?subject=unbarrier.voice%20%E2%80%94%20a%20conversation" color="#db7dcc">Email Nici</Button>
            <Button href="#voice-what-i-see" variant="ghost">What I see →</Button>
          </div>
        </div>
      </section>


      {/* ── 2. WHAT I SEE ────────────────────────────────────────────── */}
      {/* Five observations in Nici's actual voice from classroom + product work. */}
      <SectionBar color="#db7dcc" />
      <section id="voice-what-i-see" style={{
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 5rem)",
        maxWidth: 1100, margin: "0 auto",
      }}>
        <div style={{ marginBottom: "3rem", maxWidth: 720 }}>
          <Eyebrow color="#db7dcc">What I see, again and again</Eyebrow>
          <h2 style={{
            fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
            margin: "0 0 1rem",
            fontFamily: "Outfit", fontWeight: 800,
            letterSpacing: "-0.025em", color: "var(--text)",
            lineHeight: 1.1,
          }}>
            The bit between a product launch<br />
            and a child who's <span style={{ color: "#db7dcc" }}>actually using it</span>.
          </h2>
          <p style={{ color: "var(--text-muted)", margin: 0, maxWidth: 580 }}>
            Five things I notice every time I'm in a classroom watching what
            children do with EdTech, or in a product room watching what adults
            assume children do.
          </p>
        </div>

        <div style={{ display: "grid", gap: 16 }}>
          <Observation
            n="01"
            text="Teachers want to be 99.8% confident in a tool before they use it. Most products are designed for the 5% who'll fiddle until it works. The other 95% open it, get stuck, and go back to whatever they were doing before."
          />
          <Observation
            n="02"
            text="The current generation arriving into reception are less ready for school than any I've taught. Less language, less regulation, less stamina. Products designed for the child you imagined three years ago aren't the children turning up next September."
          />
          <Observation
            n="03"
            text="In early years, there is almost no accessible data for the students themselves. We collect data about them, in clipboards and tally charts. We rarely give them data they can see, hold, and use to talk about their own day."
          />
          <Observation
            n="04"
            text="By the time we notice a child has crashed out, it's too late. Most products tell you what happened after it happened. The useful data is the friction in the moment — the cognitive load, the dignity moment, the small disengagement no analytics dashboard captures."
          />
          <Observation
            n="05"
            text="Children need the pattern before they need the variation. Most tools default to choice and randomisation because it looks engaging on a demo. In a real classroom, choice without pattern is overwhelm. The pattern is the bit that helps them learn."
          />
        </div>
      </section>


      {/* ── 3. WHERE I'M AT ─────────────────────────────────────────── */}
      {/* Honest about the stage of the work + the invitation to be early. */}
      <SectionBar color="#38ff99" />
      <section id="voice-where" style={{
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 5rem)",
        position: "relative", overflow: "hidden",
      }}>
        <Glow color="#38ff99" x="62%" y="-10%" size={500} opacity={0.06} />
        <div style={{
          maxWidth: 760, margin: "0 auto",
          position: "relative", zIndex: 1,
        }}>
          <Eyebrow color="#38ff99">Where I'm at</Eyebrow>
          <h2 style={{
            fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
            margin: "0 0 1.4rem",
            fontFamily: "Outfit", fontWeight: 800,
            letterSpacing: "-0.025em", color: "var(--text)",
            lineHeight: 1.12,
          }}>
            I'm shaping this slowly, on purpose.
          </h2>
          <p style={{
            fontFamily: "Comfortaa",
            fontSize: "clamp(1rem, 1.8vw, 1.08rem)",
            color: "var(--text-muted)",
            lineHeight: 1.8,
            margin: "0 0 1.2rem",
          }}>
            unbarrier.voice is the work I'm building next, drawing on what I've
            learned across years of classroom practice and inside EdTech product
            rooms. I'm not ready to put the full offer in front of the world yet —
            the people I've worked with deserve to hear about it from me first.
          </p>
          <p style={{
            fontFamily: "Comfortaa",
            fontSize: "clamp(1rem, 1.8vw, 1.08rem)",
            color: "var(--text-muted)",
            lineHeight: 1.8,
            margin: "0 0 1.2rem",
          }}>
            What I can say: it sits between learners and product teams, on
            purpose. It's structured pupil intelligence — not feedback, not
            focus groups, not workshops, not audits. Closer to the kind of
            user research a serious product team would commission, designed
            for the audience that actually uses your product.
          </p>
          <p style={{
            fontFamily: "Comfortaa",
            fontSize: "clamp(1rem, 1.8vw, 1.08rem)",
            color: "var(--text-muted)",
            lineHeight: 1.8,
            margin: 0,
          }}>
            If any of that is what your team has been quietly missing —
            email me. Early conversations shape this work, and I'd rather
            build it with the people who need it than guess at what they need.
          </p>
        </div>
      </section>


      {/* ── 4. CTA ──────────────────────────────────────────────────── */}
      <SectionBar color="#db7dcc" />
      <section style={{
        padding: "clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 5rem)",
        maxWidth: 680, margin: "0 auto", textAlign: "center",
      }}>
        <Eyebrow color="#db7dcc">If any of this lands</Eyebrow>
        <h2 style={{
          fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
          margin: "0 0 1.2rem",
          fontFamily: "Outfit", fontWeight: 800,
          letterSpacing: "-0.025em", color: "var(--text)",
          lineHeight: 1.12,
        }}>
          Tell me what you're building.
        </h2>
        <p style={{
          color: "var(--text-muted)",
          margin: "0 auto 2rem", maxWidth: 520,
        }}>
          A short email is plenty. The product, where you're up to, what's on
          your mind. I'll listen properly before I say anything useful.
        </p>
        <Button href="mailto:nici@unbarrier.me?subject=unbarrier.voice%20%E2%80%94%20hello" color="#db7dcc">nici@unbarrier.me →</Button>
      </section>

      <Footer />
    </>
  );
}


// Helper — observation row with a small number prefix and the observation text.
// Kept inline rather than card-y to make it read like a list of plain truths.
function Observation({ n, text }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "60px 1fr",
      gap: 20,
      alignItems: "start",
      padding: "22px 24px",
      borderRadius: 18,
      border: "1.5px solid var(--border-default)",
      background: "var(--surface-raised)",
    }}>
      <span style={{
        fontFamily: "Outfit", fontSize: 22, fontWeight: 800,
        color: "#db7dcc", letterSpacing: "-0.02em",
        opacity: 0.75,
      }}>{n}</span>
      <p style={{
        fontFamily: "Comfortaa",
        fontSize: "clamp(0.96rem, 1.7vw, 1.05rem)",
        lineHeight: 1.75,
        color: "var(--text-muted)",
        margin: 0,
      }}>{text}</p>
    </div>
  );
}

window.VoiceHolding = VoiceHolding;
