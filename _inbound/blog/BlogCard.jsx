// BlogCard.jsx — five visual variants, one per shape.
// Each card is deliberately different so shape reads at a glance.

const { useState: useStateCard } = React;

function CardOutLoud({ post }) {
  return (
    <a href={post.href} style={{
      display: "block", padding: "28px 28px 26px",
      border: "1.5px solid var(--spring-green)55",
      background: "linear-gradient(145deg, rgba(56,255,153,0.06), rgba(56,255,153,0.01))",
      borderRadius: 18, textDecoration: "none",
      transition: "transform 180ms, border-color 180ms",
    }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = "var(--spring-green)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "var(--spring-green)55"; }}
    >
      <ShapeTag shape="out-loud" size="sm" />
      <h3 style={{
        margin: "18px 0 12px", fontFamily: "Outfit, system-ui",
        fontSize: 22, fontWeight: 800, lineHeight: 1.2, color: "var(--text)",
        letterSpacing: "-0.01em",
      }}>{post.title}</h3>
      <p style={{
        margin: "0 0 20px", fontFamily: "Comfortaa, system-ui",
        fontSize: 14, lineHeight: 1.7, color: "var(--text-muted)",
      }}>{post.excerpt}</p>
      <div style={{ fontFamily: "Outfit", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-subtle)" }}>
        {post.date} · {post.readingMin} min
      </div>
    </a>
  );
}

// Reality check — bold tile style, matches "What's the leak in the system?"
function CardRealityCheck({ post }) {
  return (
    <a href={post.href} style={{
      display: "block", textDecoration: "none", position: "relative",
      borderRadius: 18, overflow: "hidden",
      transition: "transform 180ms",
    }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      {/* the "tile" header */}
      <div style={{
        background: "var(--princeton-orange)", color: "var(--amethyst)",
        padding: "40px 28px 46px", position: "relative",
        minHeight: 200, display: "flex", flexDirection: "column", justifyContent: "flex-end",
      }}>
        <ShapeTag shape="reality-check" size="sm" />
        <h3 style={{
          margin: "16px 0 0", fontFamily: "Outfit, system-ui",
          fontSize: "clamp(22px, 2.4vw, 30px)", fontWeight: 800,
          lineHeight: 1.08, letterSpacing: "-0.02em",
          color: "var(--amethyst)",
        }}>
          {post.titleTile ? (
            <>
              {post.titleTile[0]}
              <span style={{ display: "block", background: "var(--amethyst)", color: "var(--antique-white)", padding: "2px 12px", margin: "4px 0", borderRadius: 4 }}>
                {post.titleTile[1]}
              </span>
              {post.titleTile[2]}
            </>
          ) : post.title}
        </h3>
        {/* logo tick bottom-right */}
        <div style={{ position: "absolute", bottom: 18, right: 20, opacity: 0.6 }}>
          <img src="../assets/logos/logo-icon-black.png" alt="" style={{ height: 24 }} />
        </div>
      </div>
      <div style={{
        background: "var(--surface-raised)", padding: "22px 28px",
        borderTop: "none",
        borderBottomLeftRadius: 18, borderBottomRightRadius: 18,
        border: "1.5px solid var(--border-default)", borderTop: "none",
      }}>
        <p style={{
          margin: 0, fontFamily: "Comfortaa, system-ui",
          fontSize: 14, lineHeight: 1.65, color: "var(--text-muted)",
        }}>{post.excerpt}</p>
        <div style={{ marginTop: 14, fontFamily: "Outfit", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-subtle)" }}>
          {post.date} · {post.readingMin} min read
        </div>
      </div>
    </a>
  );
}

// Honestly — soft, centred, orchid mist, feels like a card someone wrote you
function CardHonestly({ post }) {
  return (
    <a href={post.href} style={{
      display: "block", padding: "36px 32px 30px", textAlign: "left",
      background: "linear-gradient(180deg, rgba(219,125,204,0.11), rgba(219,125,204,0.03))",
      border: "1.5px solid rgba(219,125,204,0.35)",
      borderRadius: 18, textDecoration: "none", position: "relative",
      transition: "transform 180ms, border-color 180ms",
    }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = "var(--orchid-mist)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(219,125,204,0.35)"; }}
    >
      {/* opening quote mark */}
      <div aria-hidden="true" style={{
        fontFamily: "Outfit, system-ui", fontSize: 72, lineHeight: 0.7,
        color: "var(--orchid-mist)", fontWeight: 800,
        marginBottom: 8,
      }}>"</div>
      <ShapeTag shape="honestly" size="sm" />
      <h3 style={{
        margin: "14px 0 12px", fontFamily: "Outfit, system-ui",
        fontSize: 24, fontWeight: 800, lineHeight: 1.18, color: "var(--text)",
        letterSpacing: "-0.015em",
      }}>{post.title}</h3>
      <p style={{
        margin: "0 0 20px", fontFamily: "Comfortaa, system-ui",
        fontStyle: "italic",
        fontSize: 14.5, lineHeight: 1.75, color: "var(--text-muted)",
      }}>{post.excerpt}</p>
      <div style={{ fontFamily: "Outfit", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-subtle)" }}>
        {post.date} · {post.readingMin} min read
      </div>
    </a>
  );
}

// Stories — portrait-led, pearl aqua circle treatment, name prominent
function CardStories({ post }) {
  return (
    <a href={post.href} style={{
      display: "block", padding: 0, textDecoration: "none",
      border: "1.5px solid rgba(105,217,209,0.3)",
      background: "var(--surface-raised)",
      borderRadius: 18, overflow: "hidden",
      transition: "transform 180ms, border-color 180ms",
    }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = "var(--pearl-aqua)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(105,217,209,0.3)"; }}
    >
      {/* portrait panel */}
      <div style={{
        position: "relative", padding: "32px 28px 0",
        background: "linear-gradient(180deg, rgba(105,217,209,0.15), transparent)",
        overflow: "hidden",
      }}>
        {/* ambient pearl-aqua glow behind the portrait */}
        <div aria-hidden="true" style={{
          position: "absolute",
          top: -40, left: -20,
          width: 220, height: 220,
          background: "var(--pearl-aqua)",
          opacity: 0.28,
          filter: "blur(60px)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 0,
        }} />
        <div style={{
          width: 96, height: 96, borderRadius: "50%",
          overflow: "hidden", position: "relative", zIndex: 1,
          boxShadow: "0 8px 28px rgba(105,217,209,0.45), 0 0 0 3px rgba(105,217,209,0.15)",
        }}>
          {post.portrait ? (
            <img src={post.portrait} alt={post.byline || post.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          ) : (
            <div style={{
              width: "100%", height: "100%",
              background: "var(--pearl-aqua)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "Outfit", fontSize: 34, fontWeight: 800,
              color: "var(--amethyst)",
            }}>{(post.byline || "?").split(" ").map(s => s[0]).join("").slice(0,2)}</div>
          )}
        </div>
        <div style={{ marginTop: 20, position: "relative", zIndex: 1 }}>
          <ShapeTag shape="stories" size="sm" />
        </div>
      </div>
      <div style={{ padding: "16px 28px 26px" }}>
        <h3 style={{
          margin: "14px 0 10px", fontFamily: "Outfit, system-ui",
          fontSize: 22, fontWeight: 800, lineHeight: 1.2, color: "var(--text)",
          letterSpacing: "-0.01em",
        }}>{post.title}</h3>
        {post.byline && (
          <p style={{ margin: "0 0 14px", fontFamily: "Outfit", fontSize: 13, fontWeight: 600, color: "var(--pearl-aqua)", letterSpacing: "0.02em" }}>
            by {post.byline}
          </p>
        )}
        <p style={{
          margin: "0 0 16px", fontFamily: "Comfortaa, system-ui",
          fontSize: 13.5, lineHeight: 1.7, color: "var(--text-muted)",
        }}>{post.excerpt}</p>
        <div style={{ fontFamily: "Outfit", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-subtle)" }}>
          {post.date} · {post.readingMin} min read
        </div>
      </div>
    </a>
  );
}

// Invitations — bright, punchy, clearly marked as "a door"
function CardInvitations({ post }) {
  return (
    <a href={post.href} style={{
      display: "block", padding: 0, textDecoration: "none",
      background: "var(--school-bus-yellow)",
      borderRadius: 18, overflow: "hidden", position: "relative",
      transition: "transform 180ms",
    }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      <div style={{ padding: "28px 28px 24px", color: "var(--amethyst)" }}>
        <ShapeTag shape="invitations" size="sm" />
        <h3 style={{
          margin: "14px 0 12px", fontFamily: "Outfit, system-ui",
          fontSize: 24, fontWeight: 800, lineHeight: 1.15, color: "var(--amethyst)",
          letterSpacing: "-0.015em",
        }}>{post.title}</h3>
        <p style={{
          margin: "0 0 22px", fontFamily: "Comfortaa, system-ui",
          fontSize: 14, lineHeight: 1.65, color: "var(--amethyst)", opacity: 0.78,
        }}>{post.excerpt}</p>
      </div>
      <div style={{
        background: "var(--amethyst)", color: "var(--school-bus-yellow)",
        padding: "16px 28px", display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div style={{ fontFamily: "Outfit", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-subtle)" }}>
          {post.date} · {post.readingMin} min read
        </div>
        <div style={{ fontFamily: "Outfit", fontSize: 13, fontWeight: 700, color: "var(--school-bus-yellow)" }}>
          {post.ctaLabel || "Come in →"}
        </div>
      </div>
    </a>
  );
}

const CardByShape = {
  "out-loud": CardOutLoud,
  "reality-check": CardRealityCheck,
  honestly: CardHonestly,
  stories: CardStories,
  invitations: CardInvitations,
};

function BlogCard({ post }) {
  const C = CardByShape[post.shape];
  if (!C) return null;
  return <C post={post} />;
}

Object.assign(window, { BlogCard, CardByShape });
