// SessionsMenu.jsx — upcoming sessions list, filter, and a detail drawer.
const { useState, useMemo } = React;

// ── tiny helpers ──────────────────────────────────────────────────────────
function fmtDay(iso) {
  const d = new Date(iso + "T00:00:00");
  return { day: d.getDate(), month: d.toLocaleDateString("en-GB", { month: "short" }).toUpperCase(), weekday: d.toLocaleDateString("en-GB", { weekday: "short" }) };
}
function daysUntil(iso) {
  const now = new Date(); now.setHours(0,0,0,0);
  const d = new Date(iso + "T00:00:00");
  return Math.round((d - now) / (1000*60*60*24));
}

// ── STATUS PILL ───────────────────────────────────────────────────────────
function StatusPill({ status, seatsLeft, seats }) {
  const map = {
    open:     { label: `${seatsLeft} seats left`, bg: "rgba(56,255,153,0.14)", fg: "#38ff99", bd: "rgba(56,255,153,0.35)" },
    soon:     { label: "Booking soon",            bg: "rgba(105,217,209,0.14)", fg: "#69d9d1", bd: "rgba(105,217,209,0.35)" },
    waitlist: { label: "Waitlist only",           bg: "rgba(255,194,3,0.14)",   fg: "#ffc203", bd: "rgba(255,194,3,0.35)" },
    full:     { label: "Full",                    bg: "rgba(227,161,176,0.14)", fg: "#e3a1b0", bd: "rgba(227,161,176,0.4)"  },
    past:     { label: "Past session",            bg: "rgba(255,255,255,0.05)", fg: "rgba(240,235,229,0.5)", bd: "rgba(255,255,255,0.1)" },
  };
  const s = map[status] || map.soon;
  return (
    <span style={{
      fontFamily: "Outfit", fontSize: 10, fontWeight: 700,
      letterSpacing: "0.14em", textTransform: "uppercase",
      padding: "4px 10px", borderRadius: 100,
      background: s.bg, color: s.fg, border: `1px solid ${s.bd}`,
      whiteSpace: "nowrap",
    }}>{s.label}</span>
  );
}

// ── SESSION CARD ──────────────────────────────────────────────────────────
function SessionCard({ s, onOpen }) {
  const [hov, setHov] = useState(false);
  const { day, month, weekday } = fmtDay(s.date);
  const d = daysUntil(s.date);
  const dayLabel = s.status === "past" ? null
                  : d === 0 ? "Today"
                  : d === 1 ? "Tomorrow"
                  : d > 0 && d <= 14 ? `In ${d} days`
                  : null;

  const canBook = s.status === "open";
  const isPast  = s.status === "past";

  return (
    <button
      type="button"
      onClick={() => onOpen(s)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative", textAlign: "left",
        display: "grid", gridTemplateColumns: "88px 1fr", gap: 20,
        padding: "22px 22px 22px 20px",
        borderRadius: 18,
        border: `1.5px solid ${hov ? s.accent + "60" : "rgba(255,255,255,0.08)"}`,
        background: hov ? s.accent + "0c" : "rgba(255,255,255,0.03)",
        color: "var(--text)", cursor: "pointer", width: "100%",
        transition: "all 200ms", fontFamily: "inherit",
        opacity: isPast ? 0.68 : 1,
      }}
    >
      {/* accent rail */}
      <span aria-hidden="true" style={{
        position: "absolute", left: 0, top: 18, bottom: 18, width: 3,
        background: s.accent, borderRadius: 3, opacity: hov ? 1 : 0.7,
      }} />

      {/* date block */}
      <div style={{ textAlign: "center", paddingTop: 4 }}>
        <div style={{ fontFamily: "Outfit", fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", color: s.accent, marginBottom: 2 }}>{weekday}</div>
        <div style={{ fontFamily: "Outfit", fontWeight: 800, fontSize: 38, lineHeight: 1, color: "var(--text)", letterSpacing: "-0.03em" }}>{day}</div>
        <div style={{ fontFamily: "Outfit", fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", color: "var(--text-subtle)", marginTop: 4 }}>{month}</div>
        <div style={{ fontFamily: "Comfortaa", fontSize: 10.5, color: "var(--text-subtle)", marginTop: 10, letterSpacing: "0.04em" }}>{s.time} {s.tz}</div>
      </div>

      {/* body */}
      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginBottom: 10 }}>
          <StatusPill status={s.status} seatsLeft={s.seatsLeft} seats={s.seats} />
          {dayLabel && (
            <span style={{ fontFamily: "Outfit", fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-subtle)" }}>· {dayLabel}</span>
          )}
          {s.tags.map(t => (
            <span key={t} style={{ fontFamily: "Comfortaa", fontSize: 10.5, color: "var(--text-subtle)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 100, padding: "2px 8px" }}>{t}</span>
          ))}
        </div>
        <h3 style={{ fontFamily: "Outfit", fontWeight: 800, fontSize: "clamp(1.1rem, 2vw, 1.3rem)", lineHeight: 1.2, letterSpacing: "-0.02em", margin: "0 0 8px", color: "var(--text)" }}>
          {s.theme}
        </h3>
        <p style={{ fontFamily: "Comfortaa", fontSize: "0.88rem", lineHeight: 1.65, color: "var(--text-muted)", margin: "0 0 14px" }}>
          {s.blurb}
        </p>
        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", fontFamily: "Comfortaa", fontSize: "0.8rem", color: "var(--text-subtle)" }}>
          <span><b style={{ color: "var(--text)", fontWeight: 700 }}>{s.host}</b> · {s.hostRole}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: 14, gap: 10, flexWrap: "wrap" }}>
          <div style={{ fontFamily: "Comfortaa", fontSize: "0.78rem", color: "var(--text-subtle)" }}>
            {s.durationMin} min · {s.format}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {!isPast && (
              <div style={{ fontFamily: "Outfit", fontWeight: 800, fontSize: "1.25rem", color: "var(--text)", letterSpacing: "-0.02em" }}>
                {s.price.currency}{s.price.amount}
              </div>
            )}
            <span style={{
              fontFamily: "Outfit", fontWeight: 700, fontSize: 13,
              color: canBook ? "var(--amethyst)" : s.accent,
              background: canBook ? s.accent : "transparent",
              border: canBook ? "none" : `1px solid ${s.accent}70`,
              padding: "9px 16px", borderRadius: 100,
              transition: "all 200ms",
            }}>
              {isPast ? "Read the notes →" :
               s.status === "full" ? "Join waitlist →" :
               canBook ? "Book · 1 click →" : "Notify me →"}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

// ── FILTER BAR ────────────────────────────────────────────────────────────
function FilterBar({ filter, setFilter, counts }) {
  const tabs = [
    { key: "upcoming", label: `Upcoming · ${counts.upcoming}` },
    { key: "open",     label: `Open now · ${counts.open}` },
    { key: "past",     label: `Past · ${counts.past}` },
  ];
  return (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 24 }}>
      {tabs.map(t => {
        const on = filter === t.key;
        return (
          <button key={t.key} type="button" onClick={() => setFilter(t.key)}
            style={{
              fontFamily: "Outfit", fontWeight: 700, fontSize: 12,
              letterSpacing: "0.08em", textTransform: "uppercase",
              padding: "8px 14px", borderRadius: 100,
              background: on ? "var(--spring-green)" : "transparent",
              color: on ? "var(--amethyst)" : "var(--text-muted)",
              border: on ? "1px solid var(--spring-green)" : "1px solid rgba(255,255,255,0.1)",
              cursor: "pointer", transition: "all 150ms",
            }}>{t.label}</button>
        );
      })}
    </div>
  );
}

// ── BOOKING DRAWER ────────────────────────────────────────────────────────
function BookingDrawer({ session, onClose }) {
  const [step, setStep] = useState("details"); // details | form | confirm
  if (!session) return null;
  const { day, month, weekday } = fmtDay(session.date);

  return (
    <div onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(15,5,25,0.72)", backdropFilter: "blur(8px)",
        display: "flex", justifyContent: "flex-end",
        animation: "fadein 200ms ease",
      }}>
      <div onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(560px, 100%)", height: "100%", overflowY: "auto",
          background: "#1a0826",
          borderLeft: `1px solid ${session.accent}40`,
          padding: "28px 32px",
        }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <StatusPill status={session.status} seatsLeft={session.seatsLeft} seats={session.seats} />
          <button type="button" onClick={onClose}
            aria-label="Close"
            style={{
              background: "transparent", border: "1px solid rgba(255,255,255,0.12)",
              color: "var(--text)", width: 36, height: 36, borderRadius: 100,
              cursor: "pointer", fontSize: 16, fontFamily: "Outfit",
            }}>×</button>
        </div>

        <div style={{ display: "flex", gap: 16, alignItems: "baseline", marginBottom: 18 }}>
          <div>
            <div style={{ fontFamily: "Outfit", fontWeight: 800, fontSize: 48, lineHeight: 1, color: session.accent, letterSpacing: "-0.03em" }}>{day}</div>
            <div style={{ fontFamily: "Outfit", fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", color: "var(--text-subtle)", marginTop: 2 }}>{weekday} · {month}</div>
          </div>
          <div style={{ fontFamily: "Comfortaa", fontSize: "0.92rem", color: "var(--text-muted)" }}>
            {session.time} {session.tz} · {session.durationMin} min
          </div>
        </div>

        <h2 style={{ fontFamily: "Outfit", fontWeight: 800, fontSize: "clamp(1.4rem, 3vw, 1.8rem)", lineHeight: 1.15, letterSpacing: "-0.025em", margin: "0 0 14px" }}>
          {session.theme}
        </h2>
        <p style={{ fontFamily: "Comfortaa", fontSize: "0.95rem", lineHeight: 1.75, color: "var(--text-muted)", margin: "0 0 22px" }}>
          {session.blurb}
        </p>

        {/* Host row */}
        <div style={{
          display: "flex", gap: 14, alignItems: "center", padding: "14px 0",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          marginBottom: 22,
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: "50%",
            background: `radial-gradient(circle at 50% 40%, ${session.accent}33, ${session.accent}0a)`,
            border: `1.5px solid ${session.accent}50`,
            display: "grid", placeItems: "center",
            fontFamily: "Outfit", fontWeight: 800, color: session.accent,
            fontSize: 16, flexShrink: 0,
          }}>
            {session.host.split(" ").map(x => x[0]).slice(0,2).join("")}
          </div>
          <div>
            <div style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: 14, color: "var(--text)" }}>{session.host}</div>
            <div style={{ fontFamily: "Comfortaa", fontSize: 12, color: "var(--text-subtle)" }}>{session.hostRole}</div>
          </div>
        </div>

        {step === "details" && (
          <>
            <h4 style={{ fontFamily: "Outfit", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: session.accent, margin: "0 0 10px" }}>What happens</h4>
            <ol style={{ padding: "0 0 0 18px", margin: "0 0 22px", fontFamily: "Comfortaa", fontSize: "0.88rem", lineHeight: 1.8, color: "var(--text-muted)" }}>
              <li>Bring one idea you've been circling.</li>
              <li>Structured prompts shrink it until it's launchable.</li>
              <li>Small breakout: two others challenge and refine.</li>
              <li>Leave with one next step. Not a list. One thing.</li>
            </ol>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 22 }}>
              <div style={{ padding: 14, borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ fontFamily: "Outfit", fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: 4 }}>Format</div>
                <div style={{ fontFamily: "Comfortaa", fontSize: 13, color: "var(--text)" }}>{session.format}</div>
              </div>
              <div style={{ padding: 14, borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ fontFamily: "Outfit", fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: 4 }}>Seats</div>
                <div style={{ fontFamily: "Comfortaa", fontSize: 13, color: "var(--text)" }}>{session.seatsLeft} of {session.seats} left</div>
              </div>
              <div style={{ padding: 14, borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ fontFamily: "Outfit", fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: 4 }}>Price</div>
                <div style={{ fontFamily: "Outfit", fontSize: 18, fontWeight: 800, color: "var(--text)" }}>{session.price.currency}{session.price.amount}</div>
              </div>
              <div style={{ padding: 14, borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ fontFamily: "Outfit", fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: 4 }}>Tags</div>
                <div style={{ fontFamily: "Comfortaa", fontSize: 12, color: "var(--text)" }}>{session.tags.join(" · ")}</div>
              </div>
            </div>

            <button type="button" onClick={() => setStep("form")}
              disabled={session.status === "past"}
              style={{
                width: "100%", padding: "14px 24px", borderRadius: 12,
                fontFamily: "Outfit", fontWeight: 700, fontSize: 15,
                background: session.status === "open" ? session.accent : "transparent",
                color: session.status === "open" ? "var(--amethyst)" : session.accent,
                border: session.status === "open" ? "none" : `1.5px solid ${session.accent}80`,
                cursor: session.status === "past" ? "not-allowed" : "pointer",
                opacity: session.status === "past" ? 0.5 : 1,
              }}>
              {session.status === "open" ? "Book this seat →" :
               session.status === "full" ? "Join the waitlist →" :
               session.status === "past" ? "Replay coming soon" : "Get notified →"}
            </button>
            <p style={{ fontFamily: "Comfortaa", fontSize: 11, color: "var(--text-subtle)", textAlign: "center", marginTop: 12 }}>
              Secure payment via Stripe · calendar invite sent within 60 seconds · free rescheduling up to 24h before.
            </p>
          </>
        )}

        {step === "form" && (
          <form onSubmit={(e) => { e.preventDefault(); setStep("confirm"); }}>
            <h4 style={{ fontFamily: "Outfit", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: session.accent, margin: "0 0 14px" }}>Your details</h4>
            {["First name","Email address","One line: what are you bringing?"].map((lbl, i) => (
              <label key={i} style={{ display: "block", marginBottom: 14 }}>
                <span style={{ display: "block", fontFamily: "Comfortaa", fontWeight: 600, fontSize: 13, marginBottom: 6, color: "var(--text)" }}>{lbl}</span>
                {i < 2 ? (
                  <input required type={i === 1 ? "email" : "text"}
                    style={{
                      width: "100%", padding: "12px 14px", borderRadius: 10,
                      background: "rgba(255,255,255,0.04)", color: "var(--text)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      fontFamily: "Comfortaa", fontSize: 14,
                    }} />
                ) : (
                  <textarea rows={3}
                    style={{
                      width: "100%", padding: "12px 14px", borderRadius: 10,
                      background: "rgba(255,255,255,0.04)", color: "var(--text)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      fontFamily: "Comfortaa", fontSize: 14, resize: "vertical",
                    }} />
                )}
              </label>
            ))}
            <label style={{ display: "flex", gap: 10, alignItems: "flex-start", margin: "4px 0 20px", cursor: "pointer" }}>
              <input type="checkbox" required style={{ marginTop: 4 }} />
              <span style={{ fontFamily: "Comfortaa", fontSize: 12, color: "var(--text-muted)", lineHeight: 1.55 }}>
                I've read the <u>privacy policy</u> and understand Unbarrier Education Ltd will send me a booking confirmation and a reminder email. I can unsubscribe any time.
              </span>
            </label>
            <button type="submit" style={{
              width: "100%", padding: "14px 24px", borderRadius: 12,
              fontFamily: "Outfit", fontWeight: 700, fontSize: 15,
              background: session.accent, color: "var(--amethyst)", border: "none", cursor: "pointer",
            }}>
              Continue to payment · {session.price.currency}{session.price.amount} →
            </button>
          </form>
        )}

        {step === "confirm" && (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: `${session.accent}14`, border: `1.5px solid ${session.accent}`,
              display: "grid", placeItems: "center", margin: "0 auto 20px",
              fontFamily: "Outfit", fontSize: 28, color: session.accent,
            }}>✓</div>
            <h3 style={{ fontFamily: "Outfit", fontWeight: 800, fontSize: "1.4rem", margin: "0 0 10px" }}>You're in.</h3>
            <p style={{ fontFamily: "Comfortaa", fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: 1.75, margin: "0 0 20px" }}>
              Calendar invite and Zoom link on the way. I'll send you a gentle prompt the day before. Nothing in between. Honestly.
            </p>
            <button type="button" onClick={onClose}
              style={{
                background: "transparent", color: session.accent,
                border: `1.5px solid ${session.accent}60`,
                padding: "10px 18px", borderRadius: 100,
                fontFamily: "Outfit", fontWeight: 700, fontSize: 13, cursor: "pointer",
              }}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── SESSIONS MENU (main) ──────────────────────────────────────────────────
function SessionsMenu() {
  const [filter, setFilter] = useState("upcoming");
  const [active, setActive] = useState(null);

  const counts = useMemo(() => ({
    upcoming: window.SESSIONS.filter(s => s.status !== "past").length,
    open:     window.SESSIONS.filter(s => s.status === "open").length,
    past:     window.SESSIONS.filter(s => s.status === "past").length,
  }), []);

  const visible = useMemo(() => {
    const arr = window.SESSIONS.slice().sort((a,b) => new Date(a.date) - new Date(b.date));
    if (filter === "upcoming") return arr.filter(s => s.status !== "past");
    if (filter === "open")     return arr.filter(s => s.status === "open");
    if (filter === "past")     return arr.filter(s => s.status === "past").reverse();
    return arr;
  }, [filter]);

  return (
    <section id="sessions" style={{
      position: "relative", padding: "clamp(3rem, 6vw, 5rem) clamp(1.25rem, 5vw, 3rem)",
      background: "var(--amethyst)", color: "var(--text)",
    }}>
      <div aria-hidden="true" style={{
        position: "absolute", top: "10%", right: "-10%", width: 600, height: 600,
        background: "radial-gradient(circle, rgba(56,255,153,0.08), transparent 70%)",
        filter: "blur(100px)", pointerEvents: "none",
      }} />

      <div style={{ position: "relative", maxWidth: 920, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 10 }}>
          <div>
            <p style={{ fontFamily: "Outfit", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--spring-green)", margin: "0 0 10px" }}>
              Loop Breakers · upcoming sessions
            </p>
            <h2 style={{ fontFamily: "Outfit", fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.6rem)", letterSpacing: "-0.025em", lineHeight: 1.1, margin: "0 0 10px" }}>
              The menu. Pick your next <span style={{ color: "var(--spring-green)" }}>loop to break.</span>
            </h2>
            <p style={{ fontFamily: "Comfortaa", fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: 1.75, margin: 0, maxWidth: 540 }}>
              One idea. Ninety minutes. A small group of women who get it.
              Each session has a different host and a different angle — same container, same promise.
            </p>
          </div>
          <a href="#become-loop-breaker" style={{
            fontFamily: "Outfit", fontWeight: 700, fontSize: 13,
            color: "var(--spring-green)", border: "1.5px solid rgba(56,255,153,0.4)",
            padding: "10px 18px", borderRadius: 100, textDecoration: "none",
            whiteSpace: "nowrap",
          }}>Become a Loop Breaker →</a>
        </div>

        <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "22px 0 22px" }} />

        <FilterBar filter={filter} setFilter={setFilter} counts={counts} />

        <div style={{ display: "grid", gap: 14 }}>
          {visible.map(s => <SessionCard key={s.slug} s={s} onOpen={setActive} />)}
          {visible.length === 0 && (
            <div style={{ textAlign: "center", padding: "3rem 0", color: "var(--text-subtle)", fontFamily: "Comfortaa" }}>
              Nothing here yet. Check back soon.
            </div>
          )}
        </div>
      </div>

      <BookingDrawer session={active} onClose={() => setActive(null)} />
    </section>
  );
}

Object.assign(window, { SessionsMenu, SessionCard, BookingDrawer, StatusPill, FilterBar });
