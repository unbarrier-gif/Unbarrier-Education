// LBPackages.jsx & LBFooter.jsx

function LBPackages() {
  return (
    <section id="join" style={{ position: "relative", padding: "100px 24px", background: "#210a33", color: "white" }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(56,255,153,0.04)", pointerEvents: "none" }} />
      <div style={{ position: "relative", maxWidth: 896, margin: "0 auto" }}>
        <div style={{ marginBottom: 40 }}>
          <span style={{ color: "#38ff99", fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "Outfit", display: "inline-block", marginBottom: 12 }}>
            Loop Breakers
          </span>
          <h2 style={{ fontFamily: "Outfit", fontWeight: 800, fontSize: "clamp(1.8rem,3.5vw,2.6rem)", letterSpacing: "-0.025em", margin: 0 }}>
            Pick your <span style={{ color: "#38ff99" }}>way in.</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "stretch", marginBottom: 20 }}>
          <PackageCard
            title="90 Minute Session"
            desc="Show up with one idea. Work through it in a small, structured group. Leave with a clear next step."
            price="£10" priceColor="#FFC203"
            items={["One Vision to Launch session", "Small group, online", "90 minutes"]}
            dotColor="#69d9d1"
            ctaBg="#38ff99" ctaText="#0a1f14"
            ctaShadow="0 4px 24px rgba(56,255,153,0.25)"
            borderColor="rgba(105,217,209,0.25)"
            ctaLabel="Join a Session"
          />
          <PackageCard
            title="Session + 1:1 Coaching"
            desc="Your group session plus a private 45-minute follow-up call. We go deeper on your idea and map your actual next steps together."
            price="£55" priceColor="white"
            items={["Everything in the 90 min session", "Private 45-min 1:1 coaching call", "Personalised next steps"]}
            dotColor="#ff8a1c"
            ctaBg="#ff8a1c" ctaText="#1a0800"
            ctaShadow="0 4px 24px rgba(255,138,28,0.35)"
            borderColor="#ff8a1c" borderWidth={2}
            ctaLabel="Get the Bundle"
            featured
          />
        </div>

        <p style={{ textAlign: "center", fontFamily: "Outfit", fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 64 }}>
          Interested in 1:1 coaching only?{" "}
          <a href="mailto:hello@unbarrier.me" style={{
            color: "#69d9d1", borderBottom: "1px solid rgba(105,217,209,0.3)",
            textDecoration: "none", transition: "border-color 200ms",
          }}>Get in touch — hello@unbarrier.me</a>
        </p>

        <div style={{ height: 1, background: "rgba(255,255,255,0.08)", marginBottom: 56 }} />

        {/* Testimonial placeholder */}
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <figure style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(56,255,153,0.15)",
            borderRadius: 12, padding: "40px 32px", margin: 0,
          }}>
            <p style={{
              fontFamily: "Lora, Georgia, serif", fontStyle: "italic",
              fontSize: "clamp(1.1rem, 2vw, 1.3rem)", lineHeight: 1.55,
              color: "rgba(255,255,255,0.92)", margin: 0,
            }}>
              "I stopped circling the thing. Ninety minutes, a room of women who got it, and I left with the one next step I'd been avoiding for months. It's unlike anything I've done."
            </p>
            <figcaption style={{
              marginTop: 20, fontFamily: "Comfortaa", fontSize: 14,
              color: "#38ff99", fontWeight: 600, letterSpacing: "0.02em",
            }}>— Gemma, Loop Breakers participant</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function PackageCard({ title, desc, price, priceColor, items, dotColor, ctaBg, ctaText, ctaShadow, borderColor, borderWidth = 1, ctaLabel, featured }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative",
        background: "rgba(33,10,51,0.6)",
        border: `${borderWidth}px solid ${borderColor}`,
        borderRadius: 20, padding: 32,
        display: "flex", flexDirection: "column",
        backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
        transform: hov ? "translateY(-4px)" : "none",
        transition: "all 200ms",
        boxShadow: featured
          ? hov ? "0 0 0 1px rgba(255,138,28,0.5), 0 24px 60px rgba(255,138,28,0.2)"
                : "0 0 0 1px rgba(255,138,28,0.3), 0 8px 40px rgba(255,138,28,0.15)"
          : hov ? "0 20px 60px rgba(0,0,0,0.4)" : "none",
      }}
    >
      {featured && (
        <div style={{
          position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
          whiteSpace: "nowrap", background: "#ffc203", color: "#1a0e00",
          fontFamily: "Outfit", fontSize: 10, fontWeight: 700,
          letterSpacing: "0.16em", textTransform: "uppercase",
          padding: "5px 14px", borderRadius: 100,
        }}>Recommended</div>
      )}
      <h4 style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: 20, margin: "0 0 8px", color: "white" }}>{title}</h4>
      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, marginBottom: 24, fontWeight: 300, lineHeight: 1.6, fontFamily: "Comfortaa" }}>{desc}</p>
      <p style={{ fontFamily: "Outfit", fontSize: 52, fontWeight: 800, color: priceColor, lineHeight: 1, marginBottom: 4 }}>{price}</p>
      <p style={{ fontFamily: "Outfit", fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 24, letterSpacing: "0.04em" }}>One-off · No VAT · No subscription</p>
      <ul style={{ marginBottom: 28, flex: 1, padding: 0, listStyle: "none" }}>
        {items.map((it) => (
          <li key={it} style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.06)",
            fontSize: 14, color: "rgba(255,255,255,0.7)", fontFamily: "Comfortaa",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: dotColor, flexShrink: 0 }} />
            {it}
          </li>
        ))}
      </ul>
      <a href="#" style={{
        display: "block", textAlign: "center",
        background: ctaBg, color: ctaText,
        padding: "14px 24px", borderRadius: 12,
        fontFamily: "Outfit", fontWeight: 700, fontSize: 15,
        boxShadow: ctaShadow, textDecoration: "none",
        transition: "all 200ms",
      }}>{ctaLabel}</a>
    </div>
  );
}

function LBFinalCTA() {
  return (
    <section style={{ position: "relative", padding: "112px 24px", textAlign: "center", background: "#f7f4fb" }}>
      <div style={{ position: "relative", maxWidth: 480, margin: "0 auto" }}>
        <h2 style={{ color: "#210a33", fontFamily: "Outfit", fontWeight: 800, fontSize: "clamp(1.8rem,3.5vw,2.6rem)", letterSpacing: "-0.025em", marginBottom: 24 }}>
          Ready to stop circling it?
        </h2>
        <a href="#" style={{
          display: "inline-block", background: "#ffc203", color: "#210a33",
          padding: "16px 32px", fontWeight: 700, borderRadius: 50, textDecoration: "none",
          fontFamily: "Outfit", transition: "all 200ms",
        }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#210a33"; e.currentTarget.style.color = "#38ff99"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#ffc203"; e.currentTarget.style.color = "#210a33"; }}
        >Join Loop Breakers</a>
        <div style={{ marginTop: 24, display: "flex", justifyContent: "center" }}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "inline-flex", flexDirection: "column", alignItems: "flex-start", gap: 8 }}>
            {["£10 per session", "90 minutes", "Small group"].map((t) => (
              <li key={t} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "Outfit", fontSize: 15, color: "#210a33" }}>
                <span style={{ color: "#ffc203", fontSize: 11, lineHeight: 1, flexShrink: 0 }} aria-hidden="true">▶</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function LBFooter() {
  return (
    <footer style={{
      background: "#210a33",
      borderTop: "1px solid rgba(56,255,153,0.15)",
      padding: "60px 24px 40px",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 40, flexWrap: "wrap" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <LBLogo size={26} />
            <span style={{ fontFamily: "Comfortaa", fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 10 }}>
              Stop circling. Start building.
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontFamily: "Outfit", fontWeight: 600, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#38ff99", marginBottom: 16 }}>Navigate</span>
            {[
              ["How it works", "#how-it-works"],
              ["Sound familiar?", "#sound-familiar"],
              ["Meet Nici", "#meet-nici"],
              ["Join", "#join"],
            ].map(([l, h]) => (
              <a key={h} href={h} style={{ fontFamily: "Comfortaa", fontSize: 14, color: "rgba(255,255,255,0.65)", marginBottom: 10, textDecoration: "none" }}>{l}</a>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontFamily: "Outfit", fontWeight: 600, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#38ff99", marginBottom: 16 }}>Ready?</span>
            <a href="#join" style={{
              background: "#38ff99", color: "#210a33",
              fontFamily: "Outfit", fontWeight: 700, fontSize: 15,
              padding: "12px 28px", borderRadius: 12, textDecoration: "none",
              display: "inline-block", transition: "filter 200ms",
            }}>Join a Session →</a>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: 40, marginBottom: 24 }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <span style={{ fontFamily: "Comfortaa", fontSize: 12, color: "rgba(255,255,255,0.35)" }}>
            © 2026 Loop Breakers. All rights reserved.
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
            {["Part of Unbarrier.me", "Privacy Policy", "Cookie Policy", "Terms & Conditions"].map((t) => (
              <a key={t} href="#" style={{ fontFamily: "Comfortaa", fontSize: 12, color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { LBPackages, LBFinalCTA, LBFooter });
