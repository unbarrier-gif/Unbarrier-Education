// LBPrimitives.jsx — shared atoms for Loop Breakers
const { useState, useEffect } = React;

function LBLogo({ size = 28 }) {
  return (
    <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
      <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
        <path d="M14 4C8.477 4 4 8.477 4 14C4 19.523 8.477 24 14 24C19.523 24 24 19.523 24 14C24 11.5 23.1 9.2 21.6 7.4"
              stroke="#38ff99" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18.5 4.5L22 7.5L18 8.5" stroke="#38ff99" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span style={{ fontFamily: "Comfortaa, system-ui", fontWeight: 700, color: "#38ff99", fontSize: 18, letterSpacing: "0.01em" }}>
        loop breakers
      </span>
    </a>
  );
}

function Pill({ children, color = "#38ff99" }) {
  return (
    <span style={{
      display: "inline-block",
      background: color === "#38ff99" ? "rgba(56,255,153,0.12)" : "rgba(219,125,204,0.12)",
      border: `1px solid ${color}66`,
      color, padding: "8px 20px", borderRadius: 12,
      fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase",
      fontFamily: "Outfit, system-ui", fontWeight: 600,
    }}>
      {children}
    </span>
  );
}

function GreenRule() {
  return <div style={{ height: 1, background: "#38ff99", opacity: 0.3 }} />;
}

function ArrowLi({ children }) {
  return (
    <li style={{ display: "flex", gap: 12, alignItems: "flex-start", listStyle: "none", marginBottom: 14, color: "rgba(255,255,255,0.8)", fontFamily: "Comfortaa", lineHeight: 1.7 }}>
      <span style={{ color: "#38ff99", fontWeight: 700, flexShrink: 0 }}>→</span>
      <span>{children}</span>
    </li>
  );
}

Object.assign(window, { LBLogo, Pill, GreenRule, ArrowLi });
