// LBHero.jsx
function LBHero() {
  return (
    <section style={{ position: "relative", background: "#210a33", color: "white", overflow: "hidden", padding: "128px 24px 0" }}>
      <div aria-hidden="true" style={{
        position: "absolute", top: "20%", left: -50, width: 500, height: 500,
        background: "#38ff99", opacity: 0.1, filter: "blur(160px)", pointerEvents: "none",
      }} />
      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <Pill>Vision to Launch Sessions</Pill>
        <h1 style={{
          marginTop: 32, maxWidth: 900,
          fontFamily: "Outfit, system-ui", fontWeight: 800,
          fontSize: "clamp(2.2rem, 5.2vw, 3.8rem)",
          lineHeight: 1.08, letterSpacing: "-0.025em",
          color: "white",
        }}>
          Stop Going Round in Circles.<br />
          Start <span style={{ color: "#38ff99", fontWeight: 900 }}>Getting It Out</span> Into The World.
        </h1>
        <a href="#join" style={{
          marginTop: 40, display: "inline-block",
          background: "#38ff99", color: "#210a33",
          fontFamily: "Outfit", fontWeight: 700, fontSize: 16,
          padding: "14px 32px", borderRadius: 12, textDecoration: "none",
          transition: "all 200ms",
        }}
          onMouseEnter={(e) => { e.currentTarget.style.filter = "brightness(1.1)"; e.currentTarget.style.transform = "scale(1.02)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.filter = "none"; e.currentTarget.style.transform = "none"; }}
        >
          Join a Session →
        </a>
        <div style={{
          marginTop: 64, width: "100%", maxWidth: 896,
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 24, paddingBottom: 80,
        }}>
          {[
            { big: "90 minutes", sub: "Per session", color: "#38ff99" },
            { big: "One idea", sub: "Brought in. Worked through.", color: "#38ff99" },
            { big: "Done.", sub: "One next step. Every time.", color: "#ffc203" },
          ].map((s, i) => (
            <div key={i} style={{
              background: "rgba(56,255,153,0.06)",
              border: "1px solid rgba(56,255,153,0.2)",
              borderRadius: 12, padding: 32, textAlign: "center",
            }}>
              <div style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: "clamp(22px,3vw,28px)", color: s.color, lineHeight: 1.2 }}>{s.big}</div>
              <div style={{ fontFamily: "Comfortaa", fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.6)", marginTop: 8 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Meet Nici strip */}
      <div id="meet-nici" style={{
        position: "relative", zIndex: 10, marginTop: 80,
        background: "rgba(219,125,204,0.07)",
        borderTop: "1px solid rgba(219,125,204,0.2)",
        borderBottom: "1px solid rgba(219,125,204,0.2)",
        padding: "80px 24px",
      }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          display: "grid", gridTemplateColumns: "45% 55%", gap: 64,
          alignItems: "center",
        }}>
          <div style={{ position: "relative", width: "100%", maxWidth: 460 }}>
            {/* atmospheric glow — sits behind the portrait on the amethyst bg */}
            <div aria-hidden="true" style={{
              position: "absolute", inset: "-6% -6% -6% -6%",
              background: "radial-gradient(circle at 50% 50%, rgba(56,255,153,0.35) 0%, rgba(56,255,153,0.12) 45%, rgba(56,255,153,0) 70%)",
              filter: "blur(30px)", pointerEvents: "none", zIndex: 0,
            }} />
            {/* portrait — circle-on-amethyst, no container needed */}
            <img src="../../assets/nici-portrait-circle.png" alt="Nici Foote"
              style={{
                position: "relative", zIndex: 1,
                width: "100%", height: "auto", display: "block",
                filter: "drop-shadow(0 20px 50px rgba(0,0,0,0.35))",
              }} />
            {/* small bring-the-joy wordmark, bottom-right, as a brand sign-off */}
            <img src="../../assets/illustrations/bring-the-joy-wordmark.png" alt=""
              aria-hidden="true"
              style={{
                position: "absolute", right: "-4%", bottom: "4%", zIndex: 2,
                width: "28%", height: "auto", opacity: 0.95,
                filter: "drop-shadow(0 6px 16px rgba(0,0,0,0.4))",
                transform: "rotate(-6deg)",
              }} />
          </div>
          <div>
            <Pill color="#db7dcc">Your Facilitator</Pill>
            <h2 style={{ color: "white", fontFamily: "Outfit", fontWeight: 800, fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", letterSpacing: "-0.02em", marginTop: 16 }}>
              Hi, I'm Nici.
            </h2>
            {[
              "I built Loop Breakers because I needed it.",
              "I know what it's like to have the idea, do the work, get close — and then quietly shelve it because you're terrified no one will show up.",
              "I'm a facilitator, a woman with ADHD, and someone who has been brave for a very long time. This is the room I wish had existed for me.",
              "I'm not here to coach you. I'm here to sit with you while you do the thing.",
            ].map((t, i) => (
              <p key={i} style={{ color: "rgba(255,255,255,0.8)", marginTop: i === 0 ? 24 : 16, fontFamily: "Comfortaa", lineHeight: 1.75 }}>{t}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

window.LBHero = LBHero;
