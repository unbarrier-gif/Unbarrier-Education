// Primitives.jsx — shared atoms
function Eyebrow({ children, color = "var(--spring-green)" }) {
  return (
    <p style={{
      fontFamily: "Outfit, system-ui",
      fontSize: 12, fontWeight: 700,
      letterSpacing: "0.14em", textTransform: "uppercase",
      color, margin: "0 0 14px",
    }}>{children}</p>
  );
}

function SectionBar({ color }) {
  return (
    <div aria-hidden="true" style={{
      width: "100%", height: 2,
      background: `linear-gradient(90deg, ${color} 0%, ${color}00 100%)`,
    }} />
  );
}

function Glow({ color, x, y, size = 500, opacity = 0.08 }) {
  return (
    <div aria-hidden="true" style={{
      position: "absolute", top: y, left: x,
      width: size, height: size,
      background: color, opacity, filter: "blur(160px)",
      borderRadius: "50%", pointerEvents: "none", zIndex: 0,
    }} />
  );
}

function Button({ href, children, variant = "primary", color = "var(--spring-green)", onClick }) {
  const primary = variant === "primary";
  const [hov, setHov] = React.useState(false);
  return (
    <a href={href} onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-block",
        fontFamily: "Comfortaa, system-ui", fontWeight: 700,
        fontSize: 15, padding: "13px 28px", borderRadius: 100,
        textDecoration: "none", cursor: "pointer",
        background: primary ? color : "transparent",
        color: primary ? "var(--amethyst)" : "var(--text)",
        border: primary ? "none" : "1.5px solid rgba(240,235,229,0.22)",
        opacity: hov ? 0.88 : 1,
        transition: "opacity 150ms",
      }}>
      {children}
    </a>
  );
}

// ── Wordmark ──────────────────────────────────────────────────────────
// The primary brand mark. "unbarrier.me" in Comfortaa, bold, with the
// dot in the sub-brand's accent colour. Sizes: sm (blog byline, footer),
// md (nav), lg (mastheads), xl (hero / print).
//
// Sub-brand variants: suffix=".me|.audit|.access|.voice|.hub", each with
// its own dot colour. Pass inverse for use on light backgrounds.
function Wordmark({
  suffix = ".me",
  size = "md",
  inverse = false,
  href,
  className,
  style: extraStyle,
}) {
  const SIZES = { sm: 16, md: 22, lg: 34, xl: 56 };
  const DOT_COLOR = {
    ".me":     "var(--spring-green)",
    ".audit":  "var(--pearl-aqua)",
    ".access": "var(--orchid-mist)",
    ".voice":  "var(--princeton-orange)",
    ".hub":    "var(--school-bus-yellow)",
  };
  const fontSize = SIZES[size] || SIZES.md;
  const textColor = inverse ? "var(--amethyst)" : "var(--text)";
  const dotColor = DOT_COLOR[suffix] || "var(--spring-green)";

  // Separate stem from suffix: "unbarrier" + "." + "me"
  // The dot is the coloured accent; the letters after stay in textColor.
  const [dot, ...rest] = suffix; // "." and "me"
  const suffixLetters = rest.join("");

  const content = (
    <span
      className={className}
      style={{
        fontFamily: "Comfortaa, system-ui, sans-serif",
        fontWeight: 700,
        fontSize,
        letterSpacing: "-0.012em",
        lineHeight: 1,
        color: textColor,
        whiteSpace: "nowrap",
        display: "inline-flex",
        alignItems: "baseline",
        ...extraStyle,
      }}
    >
      unbarrier<span style={{ color: dotColor }}>{dot}</span>{suffixLetters}
    </span>
  );

  if (href) {
    return (
      <a href={href} style={{ textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
        {content}
      </a>
    );
  }
  return content;
}

Object.assign(window, { Eyebrow, SectionBar, Glow, Button, Wordmark });
