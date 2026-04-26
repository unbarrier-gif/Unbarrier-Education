// StatStripFooterCommunity.jsx
function StatStrip() {
  const stats = [
    { f: "60%", l: "Of learners don't fit the current system neatly — and are mostly invisible to it." },
    { f: "1 question", l: "Anchors every piece of work: what are we solving for the student?" },
    { f: "0 jargon", l: "No fluff, no tick-boxes, no reports that don't change anything in real classrooms." },
  ];
  return (
    <>
      <SectionBar color="#38ff99" />
      <div style={{ borderBottom: "1px solid var(--border-subtle)", padding: "0 clamp(1.5rem, 5vw, 5rem)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
          {stats.map((s, i) => (
            <div key={i} style={{ padding: "2.2rem 1.5rem", borderRight: i < 2 ? "1px solid var(--border-default)" : "none" }}>
              <p style={{ fontFamily: "Outfit", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800, color: "#38ff99", margin: "0 0 8px", letterSpacing: "-0.02em" }}>{s.f}</p>
              <p style={{ fontFamily: "Comfortaa", fontSize: "0.85rem", lineHeight: 1.65, color: "var(--text-subtle)", margin: 0 }}>{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function Community() {
  return (
    <>
      <SectionBar color="#ffc203" />
      <section id="community" style={{ padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 5rem)", position: "relative", overflow: "hidden" }}>
        <Glow color="#ffc203" x="60%" y="0%" size={500} opacity={0.07} />
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "4rem", alignItems: "center", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>
            {/* warm yellow glow behind figure */}
            <div aria-hidden="true" style={{
              position: "absolute", width: "70%", height: "70%", top: "15%", left: "15%",
              background: "radial-gradient(circle, rgba(255,194,3,0.22) 0%, rgba(219,125,204,0.12) 40%, rgba(255,194,3,0) 70%)",
              filter: "blur(40px)", pointerEvents: "none",
            }} />
            <img src="../../assets/illustrations/nonbinary-figure.png" alt=""
              style={{
                position: "relative",
                width: "100%", maxWidth: 420, height: "auto",
                filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.35))",
                transform: "rotate(-4deg)",
              }} />
          </div>
          <div>
            <Eyebrow color="#ffc203">Neurodivergent Community</Eyebrow>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", margin: "0 0 1.2rem", fontFamily: "Outfit", fontWeight: 800, letterSpacing: "-0.025em", color: "var(--text)", lineHeight: 1.1 }}>
              This work is personal.<br />
              <span style={{ color: "#ffc203" }}>You are my why.</span>
            </h2>
            <p style={{ color: "var(--text-muted)", margin: "0 0 1rem" }}>I'm part of this community, not just serving it. My ADHD coaching and Loop Breakers sessions are for neurodivergent people — founders, professionals, anyone who is brilliant and exhausted in equal measure.</p>
            <p style={{ color: "var(--text-muted)", margin: "0 0 2rem" }}>Loop Breakers lives separately — its own space, its own energy. It starts here, with this belief: you don't have to figure it out alone.</p>
            <Button href="#loop" color="#ffc203">Visit Loop Breakers →</Button>
          </div>
        </div>
      </section>
    </>
  );
}

function FinalCTA() {
  return (
    <>
      <SectionBar color="#38ff99" />
      <section style={{ padding: "clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 5rem)", maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <Eyebrow>Not sure where to start?</Eyebrow>
        <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", margin: "0 0 1.2rem", fontFamily: "Outfit", fontWeight: 800, letterSpacing: "-0.025em", color: "var(--text)" }}>Just email me. Honestly.</h2>
        <p style={{ color: "var(--text-muted)", margin: "0 auto 2rem", maxWidth: 480 }}>Tell me what's happening. I'll tell you if I can help, or point you towards someone who can. No forms, no funnels, no expectations.</p>
        <Button href="mailto:nici@unbarrier.me">nici@unbarrier.me →</Button>
      </section>
    </>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "3rem clamp(1.5rem, 5vw, 5rem)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem" }}>
        <div>
          <span style={{ fontFamily: "Comfortaa, system-ui", fontWeight: 700, fontSize: 30, letterSpacing: "-0.012em", color: "var(--text)", display: "inline-block", marginBottom: "1rem" }}>
            unbarrier<span style={{ color: "var(--spring-green)" }}>.</span>me
          </span>
          <p style={{ fontSize: "0.85rem", color: "var(--text-subtle)", lineHeight: 1.65, margin: 0 }}>Removing barriers to learning and access — for schools, families, and the neurodivergent community.</p>
        </div>
        {[
          { h: "Services", l: ["unbarrier.audit","unbarrier.access","unbarrier.voice","Notes from Nici (blog)"] },
          { h: "Get in touch", l: ["nici@unbarrier.me","Loop Breakers →"] },
          { h: "Legal", l: ["Privacy policy","Cookie notice","Accessibility statement"] },
        ].map((c) => (
          <div key={c.h}>
            <p style={{ fontFamily: "Outfit", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#38ff99", margin: "0 0 12px" }}>{c.h}</p>
            {c.l.map((x) => <a key={x} href="#" style={{ display: "block", fontFamily: "Comfortaa", fontSize: "0.88rem", color: "var(--text-muted)", marginBottom: 6, textDecoration: "none" }}>{x}</a>)}
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 1200, margin: "2rem auto 0", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
        <p style={{ fontSize: "0.78rem", color: "var(--text-faint)", fontFamily: "Comfortaa", margin: 0 }}>© 2026 Nici Foote / unbarrier.me. All rights reserved.</p>
        <p style={{ fontSize: "0.78rem", color: "var(--text-faint)", fontFamily: "Comfortaa", margin: 0 }}>Built with inclusion first.</p>
      </div>
    </footer>
  );
}

Object.assign(window, { StatStrip, Community, FinalCTA, Footer });
