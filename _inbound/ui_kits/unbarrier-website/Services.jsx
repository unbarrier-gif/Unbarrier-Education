// Services.jsx
function Services() {
  const cards = [
    { accent: "#69d9d1", audience: "Families & Schools", label: "unbarrier.audit", sub: "EHCP · Section 7 · Needs-led reports", desc: "I write the reports that change what happens next for a child — practical, evidence-based, built around the student's actual life.", href: "#audit" },
    { accent: "#ff8a1c", audience: "Schools & Trusts", label: "unbarrier.access", sub: "Apple PLS · iPad strategy · Belonging", desc: "Most schools already own powerful accessibility tools. Few use them consistently. I build the strategy and culture that makes access real.", href: "#access" },
    { accent: "#db7dcc", audience: "EdTech Companies", label: "unbarrier.voice", sub: "Student voice · Evidence · Impact", desc: "You say your product is accessible. I'll go into schools, gather real student voice and usage data, and tell you whether it actually is.", href: "#voice", soon: true },
  ];
  return (
    <>
      <SectionBar color="#69d9d1" />
      <section id="services" style={{ padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 5rem)", maxWidth: 1300, margin: "0 auto" }}>
        <div style={{ marginBottom: "3rem" }}>
          <Eyebrow color="#69d9d1">How I can help</Eyebrow>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", margin: "0 0 0.8rem", fontFamily: "Outfit", fontWeight: 800, letterSpacing: "-0.025em", color: "var(--text)" }}>Pick your starting point</h2>
          <p style={{ color: "var(--text-subtle)", maxWidth: 480, margin: 0 }}>You don't have to have it figured out. Tell me what's happening and we'll find where to start.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {cards.map((c) => <ServiceCard key={c.label} {...c} />)}
        </div>
      </section>
    </>
  );
}

function ServiceCard({ accent, audience, label, sub, desc, href, soon }) {
  const [hov, setHov] = React.useState(false);
  return (
    <a href={href}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", flexDirection: "column", gap: 10,
        padding: "28px 24px", borderRadius: 18,
        border: `1.5px solid ${hov ? accent + "70" : "var(--border-default)"}`,
        background: hov ? accent + "0e" : "var(--surface-raised)",
        textDecoration: "none", transition: "all 0.2s ease", position: "relative",
      }}>
      {soon && (
        <span style={{
          position: "absolute", top: 16, right: 16,
          background: accent + "25", border: `1px solid ${accent}50`,
          color: accent, fontSize: 10, fontFamily: "Outfit",
          fontWeight: 700, padding: "3px 10px", borderRadius: 100,
          letterSpacing: "0.08em", textTransform: "uppercase",
        }}>In build</span>
      )}
      <span style={{ fontSize: 10, fontFamily: "Outfit", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: accent, opacity: 0.8 }}>{audience}</span>
      <span style={{ fontFamily: "Outfit", fontSize: "clamp(1.05rem, 2.2vw, 1.2rem)", fontWeight: 800, color: "var(--text)" }}>{label}</span>
      <span style={{ fontFamily: "Comfortaa", fontSize: "0.8rem", fontWeight: 600, color: accent, opacity: 0.9, letterSpacing: "0.04em" }}>{sub}</span>
      <span style={{ fontFamily: "Comfortaa", fontSize: "0.88rem", lineHeight: 1.65, color: "var(--text-muted)" }}>{desc}</span>
      <span style={{ marginTop: 8, fontSize: "0.85rem", color: accent, fontWeight: 700, fontFamily: "Comfortaa" }}>Find out more →</span>
    </a>
  );
}

Object.assign(window, { Services, ServiceCard });
