// StoriesPost.jsx — the long-form magazine shape
// Hero portrait + title + byline → pulled article body →
// pull-quotes, sub-headers, image breaks → closing invitation

function StoriesHero({ post }) {
  return (
    <section style={{
      padding: "140px clamp(1.5rem, 5vw, 5rem) 60px",
      position: "relative", overflow: "hidden",
    }}>
      <Glow color="#69d9d1" x="-10%" y="0%" size={700} opacity={0.13} />
      <Glow color="#db7dcc" x="75%" y="15%" size={500} opacity={0.06} />

      <div style={{ maxWidth: 960, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Back link + shape */}
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 48 }}>
          <a href="../index.html" style={{
            fontFamily: "Outfit", fontSize: 13, fontWeight: 600,
            color: "var(--text-muted)", textDecoration: "none",
            letterSpacing: "0.02em",
          }}>← Notes from Nici</a>
          <span style={{ color: "var(--text-faint)" }}>·</span>
          <ShapeTag shape="stories" size="sm" />
        </div>

        {/* Portrait + title block */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "minmax(180px, 220px) 1fr",
          gap: 44, alignItems: "center",
          marginBottom: 40,
        }}>
          {/* Portrait with ambient glow */}
          <div style={{ position: "relative" }}>
            <div aria-hidden="true" style={{
              position: "absolute", inset: -40,
              background: "var(--pearl-aqua)", opacity: 0.3,
              filter: "blur(80px)", borderRadius: "50%",
              zIndex: 0,
            }} />
            <div style={{
              position: "relative", zIndex: 1,
              width: "100%", aspectRatio: "1 / 1",
              borderRadius: "50%", overflow: "hidden",
              boxShadow: "0 12px 40px rgba(105,217,209,0.5), 0 0 0 4px rgba(105,217,209,0.2)",
            }}>
              <img src={post.portrait} alt={post.byline}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          </div>

          {/* Title + byline */}
          <div>
            <h1 style={{
              margin: "0 0 24px", fontFamily: "Outfit, system-ui",
              fontSize: "clamp(2rem, 4.5vw, 3.2rem)", fontWeight: 800,
              lineHeight: 1.05, letterSpacing: "-0.025em", color: "var(--text)",
            }}>{post.title}</h1>

            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: 12, marginBottom: 8 }}>
              <p style={{ margin: 0, fontFamily: "Outfit", fontSize: 17, fontWeight: 700, color: "var(--pearl-aqua)", letterSpacing: "0.01em" }}>
                by {post.byline}
              </p>
              {post.asToldTo && (
                <p style={{ margin: 0, fontFamily: "Comfortaa", fontStyle: "italic", fontSize: 13.5, color: "var(--text-muted)" }}>
                  as told to {post.asToldTo}
                </p>
              )}
              {post.editedBy && !post.asToldTo && (
                <p style={{ margin: 0, fontFamily: "Comfortaa", fontStyle: "italic", fontSize: 13.5, color: "var(--text-muted)" }}>
                  edited by {post.editedBy}
                </p>
              )}
            </div>
            <p style={{ margin: 0, fontFamily: "Outfit", fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-subtle)" }}>
              {post.date} · {post.readingMin} min read
            </p>
          </div>
        </div>

        {/* Dek / standfirst */}
        {post.dek && (
          <p style={{
            margin: "32px 0 0", maxWidth: 720,
            fontFamily: "Comfortaa", fontSize: "clamp(16px, 1.6vw, 20px)",
            lineHeight: 1.55, color: "var(--text-muted)",
            borderLeft: "3px solid var(--pearl-aqua)",
            paddingLeft: 22,
          }}>{post.dek}</p>
        )}
      </div>
    </section>
  );
}

// ── Article body primitives ──────────────────────────────────────────
function Para({ children, lead = false }) {
  return (
    <p style={{
      margin: "0 0 1.4em",
      fontFamily: "Comfortaa, system-ui",
      fontSize: lead ? 18 : 16,
      lineHeight: 1.78,
      color: lead ? "var(--text)" : "var(--text-muted)",
      fontWeight: lead ? 500 : 400,
    }}>{children}</p>
  );
}

function Sub({ children }) {
  return (
    <h2 style={{
      margin: "2.4em 0 0.8em",
      fontFamily: "Outfit, system-ui",
      fontSize: "clamp(24px, 2.6vw, 32px)",
      fontWeight: 800, lineHeight: 1.15,
      letterSpacing: "-0.02em", color: "var(--text)",
    }}>{children}</h2>
  );
}

function Pull({ children, attribution }) {
  return (
    <blockquote style={{
      margin: "2.4em -24px",
      padding: "32px 36px 28px",
      background: "linear-gradient(145deg, rgba(105,217,209,0.1), rgba(105,217,209,0.02))",
      borderLeft: "4px solid var(--pearl-aqua)",
      borderRadius: "0 16px 16px 0",
      position: "relative",
    }}>
      <span aria-hidden="true" style={{
        position: "absolute", top: 6, left: 18,
        fontFamily: "Outfit", fontSize: 72, lineHeight: 0.7, fontWeight: 800,
        color: "var(--pearl-aqua)", opacity: 0.2,
      }}>"</span>
      <p style={{
        margin: 0, fontFamily: "Outfit, system-ui",
        fontSize: "clamp(20px, 2.1vw, 26px)", fontWeight: 700,
        lineHeight: 1.3, letterSpacing: "-0.015em",
        color: "var(--text)", position: "relative",
      }}>{children}</p>
      {attribution && (
        <p style={{ margin: "14px 0 0", fontFamily: "Comfortaa", fontSize: 13, fontStyle: "italic", color: "var(--text-subtle)" }}>
          — {attribution}
        </p>
      )}
    </blockquote>
  );
}

function FigureBreak({ src, caption, tint = "pearl" }) {
  const tintBg = tint === "pearl" ? "rgba(105,217,209,0.08)" :
                 tint === "orchid" ? "rgba(219,125,204,0.08)" :
                 "rgba(56,255,153,0.08)";
  return (
    <figure style={{ margin: "2.4em 0" }}>
      <div style={{
        background: tintBg, borderRadius: 16, padding: 24,
        display: "flex", justifyContent: "center",
        border: "1px solid var(--border-subtle)",
      }}>
        {src ? (
          <img src={src} alt="" style={{ maxWidth: "100%", borderRadius: 10 }} />
        ) : (
          // placeholder
          <div style={{
            width: "100%", minHeight: 280, borderRadius: 10,
            background: "repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0 12px, rgba(255,255,255,0.05) 12px 24px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--text-subtle)", fontFamily: "Comfortaa", fontSize: 13,
          }}>Image placeholder</div>
        )}
      </div>
      {caption && (
        <figcaption style={{
          marginTop: 10, fontFamily: "Comfortaa", fontStyle: "italic",
          fontSize: 13.5, color: "var(--text-subtle)", textAlign: "center",
        }}>{caption}</figcaption>
      )}
    </figure>
  );
}

// A "note from the editor" block — used when Nici has hosted a guest story
function EditorNote({ children }) {
  return (
    <div style={{
      margin: "2.4em 0",
      padding: "24px 28px",
      background: "rgba(219,125,204,0.08)",
      border: "1px solid rgba(219,125,204,0.25)",
      borderRadius: 16,
    }}>
      <p style={{ margin: "0 0 8px", fontFamily: "Outfit", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--orchid-mist)" }}>
        Note from Nici
      </p>
      <p style={{ margin: 0, fontFamily: "Comfortaa", fontSize: 14.5, lineHeight: 1.7, color: "var(--text-muted)", fontStyle: "italic" }}>
        {children}
      </p>
    </div>
  );
}

// Tag a section as a placeholder the author still needs to fill
function Placeholder({ label, hint }) {
  return (
    <div style={{
      margin: "1.6em 0",
      padding: "18px 22px",
      background: "rgba(56,255,153,0.05)",
      border: "1.5px dashed rgba(56,255,153,0.35)",
      borderRadius: 12,
    }}>
      <p style={{ margin: "0 0 6px", fontFamily: "Outfit", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--spring-green)" }}>
        To write · {label}
      </p>
      {hint && (
        <p style={{ margin: 0, fontFamily: "Comfortaa", fontSize: 13.5, lineHeight: 1.6, color: "var(--text-muted)" }}>
          {hint}
        </p>
      )}
    </div>
  );
}

// ── Article shell ─────────────────────────────────────────────────────
function StoriesArticle({ children }) {
  return (
    <article style={{
      maxWidth: 720, margin: "0 auto",
      padding: "40px clamp(1.5rem, 5vw, 3rem) 80px",
    }}>
      {children}
    </article>
  );
}

// ── Closing invitation block ──────────────────────────────────────────
function StoriesOutro({ post }) {
  return (
    <section style={{
      padding: "60px clamp(1.5rem, 5vw, 5rem) 40px",
      borderTop: "1px solid var(--border-subtle)",
    }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        {/* Author card */}
        <div style={{
          display: "flex", gap: 20, alignItems: "center",
          padding: "24px", borderRadius: 16,
          background: "rgba(105,217,209,0.06)",
          border: "1px solid rgba(105,217,209,0.2)",
          marginBottom: 28,
        }}>
          <img src={post.portrait} alt="" style={{ width: 68, height: 68, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
          <div>
            <p style={{ margin: "0 0 4px", fontFamily: "Outfit", fontWeight: 700, fontSize: 16, color: "var(--text)" }}>
              {post.byline}
            </p>
            <p style={{ margin: 0, fontFamily: "Comfortaa", fontSize: 13.5, lineHeight: 1.6, color: "var(--text-muted)" }}>
              {post.authorBio}
            </p>
          </div>
        </div>

        {/* Invitation — aligned to the Stories shape */}
        <div style={{
          padding: "28px 30px",
          background: "var(--amethyst-deep)",
          border: "1px solid rgba(105,217,209,0.3)",
          borderRadius: 16,
        }}>
          <p style={{ margin: "0 0 8px", fontFamily: "Outfit", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--pearl-aqua)" }}>
            Your story belongs here
          </p>
          <h3 style={{ margin: "0 0 12px", fontFamily: "Outfit", fontSize: 22, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.01em" }}>
            Got a story the world needs to hear?
          </h3>
          <p style={{ margin: "0 0 20px", fontFamily: "Comfortaa", fontSize: 14.5, lineHeight: 1.7, color: "var(--text-muted)" }}>
            Write it yourself, or talk it out with me and I'll help you shape it. You stay in charge of your voice.
          </p>
          <a href="mailto:nici@unbarrier.me?subject=I have a story"
            style={{
              display: "inline-block",
              fontFamily: "Comfortaa", fontWeight: 700, fontSize: 14,
              background: "var(--pearl-aqua)", color: "var(--amethyst)",
              padding: "11px 22px", borderRadius: 100, textDecoration: "none",
            }}
          >Tell me your story →</a>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, {
  StoriesHero, StoriesArticle, StoriesOutro,
  Para, Sub, Pull, FigureBreak, EditorNote, Placeholder,
});
