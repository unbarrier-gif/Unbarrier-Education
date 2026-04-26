// BlogPrimitives.jsx — shared atoms for the blog
// Five shapes, five colour/treatment signatures.

const SHAPES = {
  "out-loud": {
    name: "Out loud",
    color: "var(--spring-green)",
    ink: "var(--amethyst)",
    blurb: "Short. Said out loud first, typed second.",
  },
  "reality-check": {
    name: "Reality check",
    color: "var(--princeton-orange)",
    ink: "var(--amethyst)",
    blurb: "A belief about SEND or inclusion, examined properly.",
  },
  honestly: {
    name: "Honestly",
    color: "var(--orchid-mist)",
    ink: "var(--amethyst)",
    blurb: "The slower, truer ones. Allowed to be emotional.",
  },
  stories: {
    name: "Stories",
    color: "var(--pearl-aqua)",
    ink: "var(--amethyst)",
    blurb: "Lived experience from people who get it.",
  },
  invitations: {
    name: "Invitations",
    color: "var(--school-bus-yellow)",
    ink: "var(--amethyst)",
    blurb: "A door, gently opened. You're welcome inside.",
  },
};

function ShapeTag({ shape, size = "md" }) {
  const s = SHAPES[shape];
  if (!s) return null;
  const sizes = {
    sm: { fs: 10, py: 4, px: 9, dot: 6 },
    md: { fs: 11, py: 5, px: 11, dot: 7 },
    lg: { fs: 13, py: 7, px: 14, dot: 9 },
  }[size];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 7,
      fontFamily: "Outfit, system-ui", fontSize: sizes.fs,
      fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
      padding: `${sizes.py}px ${sizes.px}px`, borderRadius: 100,
      background: `${s.color}22`, color: s.color,
      border: `1px solid ${s.color}55`,
    }}>
      <span style={{ width: sizes.dot, height: sizes.dot, borderRadius: "50%", background: s.color }} />
      {s.name}
    </span>
  );
}

function PostMeta({ date, readingMin, shape }) {
  return (
    <div style={{
      display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16,
      fontFamily: "Outfit, system-ui", fontSize: 13,
      color: "var(--text-muted)", letterSpacing: "0.02em",
    }}>
      {shape && <ShapeTag shape={shape} size="sm" />}
      {date && <span>{date}</span>}
      {readingMin && <span>· {readingMin} min read</span>}
    </div>
  );
}

function PullQuote({ children, color = "var(--spring-green)", cite }) {
  return (
    <figure style={{
      margin: "48px 0", padding: "32px 0 32px 32px",
      borderLeft: `4px solid ${color}`, position: "relative",
    }}>
      <blockquote style={{
        margin: 0, fontFamily: "Outfit, system-ui",
        fontSize: "clamp(22px, 2.6vw, 30px)", fontWeight: 700,
        lineHeight: 1.28, letterSpacing: "-0.015em",
        color: "var(--text)",
      }}>
        {children}
      </blockquote>
      {cite && (
        <figcaption style={{
          marginTop: 14, fontFamily: "Outfit, system-ui",
          fontSize: 12, fontWeight: 600, letterSpacing: "0.14em",
          textTransform: "uppercase", color: color,
        }}>— {cite}</figcaption>
      )}
    </figure>
  );
}

function BackToBlog() {
  return (
    <a href="../index.html" style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      fontFamily: "Outfit, system-ui", fontSize: 13, fontWeight: 600,
      letterSpacing: "0.06em", textTransform: "uppercase",
      color: "var(--text-muted)", textDecoration: "none",
    }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--spring-green)")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
    >
      ← Notes from Nici
    </a>
  );
}

function PostFooter({ nextPost }) {
  return (
    <footer style={{
      marginTop: 96, paddingTop: 40,
      borderTop: "1px solid var(--border-default)",
      display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "center",
    }}>
      <div>
        <p style={{ margin: 0, fontFamily: "Comfortaa, system-ui", fontSize: 14, color: "var(--text-muted)", lineHeight: 1.6 }}>
          Written by <strong style={{ color: "var(--text)" }}>Nici Foote</strong>.
          {" "}Typed with support — voice notes, AI, and a lot of rereading.
        </p>
        <p style={{ margin: "6px 0 0", fontFamily: "Comfortaa, system-ui", fontSize: 13, color: "var(--text-subtle)" }}>
          If this hit a nerve, send it to one person.
        </p>
      </div>
      <a href="mailto:nici@unbarrier.me"
        style={{
          fontFamily: "Comfortaa, system-ui", fontWeight: 700, fontSize: 14,
          background: "var(--spring-green)", color: "var(--amethyst)",
          padding: "12px 22px", borderRadius: 100, textDecoration: "none",
          whiteSpace: "nowrap",
        }}
      >Email Nici</a>
    </footer>
  );
}

Object.assign(window, { SHAPES, ShapeTag, PostMeta, PullQuote, BackToBlog, PostFooter });
