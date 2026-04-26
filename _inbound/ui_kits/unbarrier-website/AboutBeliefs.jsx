// AboutBeliefs.jsx
function AboutBeliefs() {
  const beliefs = [
    "Belonging and psychological safety come before any tool, curriculum, or strategy. You can't learn until you feel safe and seen.",
    "The barrier is never the child. The system needs to flex around the student — not the other way round.",
    "Student voice is the anchor. Forget what looks good for the adults. What are we solving for the student?",
    "Buying a device for a SEND student without a strategy isn't inclusion. It's a tick-box.",
    "Behaviour is communication. The right question is 'What is this telling us?' — not 'How do we stop it?'",
    "If you design well for the students who struggle most, you make things better for everyone.",
  ];
  return (
    <>
      <SectionBar color="#db7dcc" />
      <section id="about" style={{
        background: "linear-gradient(135deg, rgba(219,125,204,0.08) 0%, rgba(227,161,176,0.04) 100%)",
        borderBottom: "1px solid var(--border-subtle)",
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 5rem)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "4rem", alignItems: "start" }}>
          <div>
            <Eyebrow color="#db7dcc">About Nici</Eyebrow>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", margin: "0 0 1.4rem", fontFamily: "Outfit", fontWeight: 800, letterSpacing: "-0.025em", color: "var(--text)", lineHeight: 1.1 }}>
              I design learning so people can{" "}
              <span style={{ color: "#db7dcc" }}>access it, belong, and thrive</span> — not just cope.
            </h2>
            <p style={{ color: "var(--text-muted)", margin: "0 0 1rem" }}>I'm a woman with dyslexia and ADHD who has spent years in education watching the system fail the students it was supposed to serve — particularly the ones who don't fit neatly into any category.</p>
            <p style={{ color: "var(--text-muted)", margin: "0 0 2rem" }}>I'm not here to give you a glossy report and disappear. I'm here to sit with you, figure out what's actually getting in the way, and help you do something real about it.</p>
            <Button href="#nici" color="#db7dcc">More about Nici →</Button>
          </div>
          <div>
            <Eyebrow color="#db7dcc">What I believe</Eyebrow>
            <p style={{ fontSize: "0.82rem", color: "var(--text-faint)", margin: "0 0 16px", fontFamily: "Comfortaa" }}>Straight from my own recordings. No polish.</p>
            {beliefs.map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "14px 0", borderBottom: "1px solid var(--border-default)" }}>
                <span style={{ color: "#38ff99", fontFamily: "Outfit", fontWeight: 700, fontSize: 16, flexShrink: 0 }}>→</span>
                <p style={{ margin: 0, fontFamily: "Comfortaa", fontSize: "clamp(0.88rem, 1.6vw, 0.96rem)", lineHeight: 1.65, color: "var(--text-muted)" }}>{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
window.AboutBeliefs = AboutBeliefs;
