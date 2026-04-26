// LBMiddle.jsx — Problem + Shift + HowItWorks + MidCTA + Template
const midOverlay = {
  position: "absolute", inset: 0, background: "rgba(56,255,153,0.04)", pointerEvents: "none",
};

function LBProblem() {
  return (
    <section id="sound-familiar" style={{ position: "relative", padding: "100px 24px", background: "#210a33", color: "white" }}>
      <div style={midOverlay} />
      <div style={{ position: "relative", maxWidth: 640, margin: "0 auto" }}>
        <h2 style={{ color: "#38ff99", fontFamily: "Outfit", fontWeight: 800, fontSize: "clamp(1.8rem,3.5vw,2.6rem)", letterSpacing: "-0.025em", marginBottom: 24 }}>
          You've been here before.
        </h2>
        <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: 16, fontFamily: "Comfortaa", lineHeight: 1.7 }}>
          You've started. But you're circling it.
        </p>
        <ul style={{ padding: 0, margin: "0 0 16px" }}>
          <ArrowLi>You can see the big picture — but struggle to pin it down.</ArrowLi>
          <ArrowLi>You rewrite instead of publish.</ArrowLi>
          <ArrowLi>You overthink pricing.</ArrowLi>
          <ArrowLi>You know you're capable — but it's not translating into income.</ArrowLi>
        </ul>
        <p style={{ color: "rgba(255,255,255,0.7)", fontWeight: 500, fontFamily: "Comfortaa" }}>
          You don't need more advice. You need <span style={{ color: "#38ff99" }}>structure</span>.
        </p>
      </div>
    </section>
  );
}

function LBShift() {
  const bigLine = {
    fontFamily: "Outfit, system-ui", fontWeight: 800,
    marginTop: 4, fontSize: "clamp(24px,4vw,40px)", lineHeight: 1.15, letterSpacing: "-0.01em",
  };
  return (
    <section style={{ position: "relative", padding: "128px 24px", background: "#210a33", color: "white", textAlign: "center" }}>
      <div style={midOverlay} />
      <div style={{ position: "relative", maxWidth: 480, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "Outfit", fontWeight: 800, fontSize: "clamp(1.8rem,3.5vw,2.6rem)", letterSpacing: "-0.025em", marginBottom: 24 }}>
          This isn't about doing <span style={{ color: "#38ff99" }}>more</span>.
        </h2>
        <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: 16, fontFamily: "Comfortaa", lineHeight: 1.7 }}>
          It's about doing <span style={{ color: "#38ff99" }}>one thing</span> — properly.
        </p>
        <p style={{ ...bigLine, color: "white" }}>Not better.</p>
        <p style={{ ...bigLine, color: "white" }}>Not perfect.</p>
        <p style={{ ...bigLine, color: "#FFC203", fontWeight: 900, marginTop: 12 }}>Done.</p>
      </div>
    </section>
  );
}

function LBHowItWorks() {
  const steps = [
    { n: "01", t: "Bring one idea", d: "The one you've been circling too long." },
    { n: "02", t: "Make it smaller", d: "Until it's actually launchable." },
    { n: "03", t: "Work it through", d: "Small group, real conversation." },
    { n: "04", t: "Leave with one step", d: "Not a list. One thing. Moving.", highlight: true },
  ];
  return (
    <section id="how-it-works" style={{ padding: "100px 24px", background: "#210a33", color: "white" }}>
      <div style={{ maxWidth: 896, margin: "0 auto" }}>
        <h2 style={{
          fontFamily: "Outfit", fontWeight: 800, fontSize: "clamp(1.8rem,3.5vw,2.6rem)",
          letterSpacing: "-0.025em", marginBottom: 40,
          borderLeft: "4px solid #38ff99", paddingLeft: 20,
        }}>Here's what happens.</h2>
        <div style={{ display: "grid", gap: 16 }}>
          {steps.map((s) => {
            const c = s.highlight ? "#FFC203" : "#38ff99";
            return (
              <div key={s.n} style={{
                position: "relative", background: "#210a33", color: "white",
                borderLeft: `4px solid ${c}`, borderRadius: 12, padding: 24,
                overflow: "hidden", transition: "transform 200ms",
              }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "none"}
              >
                <span aria-hidden="true" style={{
                  position: "absolute", top: -8, right: 8, fontSize: 100, fontWeight: 700,
                  lineHeight: 1, color: c, opacity: 0.08, fontFamily: "Outfit",
                  userSelect: "none", pointerEvents: "none",
                }}>{s.n}</span>
                <p style={{ fontSize: 14, letterSpacing: "0.02em", color: c, marginBottom: 8, fontFamily: "Outfit", fontWeight: 600 }}>{s.n}</p>
                <h4 style={{ color: "white", marginBottom: 12, fontFamily: "Outfit", fontWeight: 700, fontSize: 20 }}>{s.t}</h4>
                <p style={{ color: "rgba(255,255,255,0.8)", fontFamily: "Comfortaa", lineHeight: 1.7, margin: 0 }}>{s.d}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function LBMidCTA() {
  return (
    <section style={{ position: "relative", padding: "112px 24px", textAlign: "center", color: "white", background: "#210a33" }}>
      <div style={midOverlay} />
      <div style={{ position: "relative", maxWidth: 480, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "Outfit", fontWeight: 800, fontSize: "clamp(1.8rem,3.5vw,2.6rem)", letterSpacing: "-0.025em", marginBottom: 24 }}>
          You already know what you want to <span style={{ color: "#38ff99" }}>build</span>.
        </h2>
        <p style={{
          fontFamily: "Outfit", fontWeight: 800, color: "white",
          marginBottom: 40, lineHeight: 1.15, letterSpacing: "-0.01em",
          fontSize: "clamp(24px,4vw,40px)",
        }}>
          You just need to stop going round <span style={{ color: "#38ff99" }}>in circles.</span>
        </p>
        <a href="#join" style={{
          background: "#38ff99", color: "#210a33",
          padding: "16px 32px", fontSize: 18, fontWeight: 700,
          borderRadius: 12, textDecoration: "none", display: "inline-block",
          fontFamily: "Outfit", transition: "all 200ms",
        }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#ff8a1c"; e.currentTarget.style.transform = "scale(1.03)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#38ff99"; e.currentTarget.style.transform = "none"; }}
        >Join a Session</a>
      </div>
    </section>
  );
}

function LBTemplate() {
  return (
    <section id="template" style={{ padding: "100px 24px", background: "#210a33", color: "white" }}>
      <div style={{
        maxWidth: 480, margin: "0 auto",
        background: "#210a33",
        border: "1px solid rgba(56,255,153,0.4)",
        borderRadius: 12, padding: 32, textAlign: "center",
      }}>
        <div style={{ height: 1, width: "100%", marginBottom: 24, background: "#38ff99", opacity: 0.4 }} />
        <h2 style={{ fontFamily: "Outfit", fontWeight: 800, fontSize: "clamp(1.5rem,3vw,2rem)", marginBottom: 24 }}>
          Not ready to book yet?
        </h2>
        <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: 40, fontFamily: "Comfortaa", lineHeight: 1.7 }}>
          Download the One Thing Template — a simple way to make your idea small enough to start.
        </p>
        <button type="button" style={{
          border: "1px solid #38ff99", color: "white", background: "transparent",
          padding: "12px 24px", borderRadius: 12, fontFamily: "Outfit", fontWeight: 600,
          cursor: "pointer", transition: "all 200ms",
        }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#38ff99"; e.currentTarget.style.color = "#210a33"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "white"; }}
        >Get the Template</button>
      </div>
    </section>
  );
}

Object.assign(window, { LBProblem, LBShift, LBHowItWorks, LBMidCTA, LBTemplate });
