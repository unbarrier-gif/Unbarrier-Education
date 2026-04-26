// LBHeader.jsx
function LBHeader() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 300);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const linkStyle = {
    fontFamily: "Outfit, system-ui", fontSize: 14, fontWeight: 500,
    color: "rgba(255,255,255,0.8)", textDecoration: "none",
    transition: "color 200ms",
  };

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? "rgba(33,10,51,0.95)" : "rgba(33,10,51,0.8)",
      backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
      borderBottom: scrolled ? "1px solid rgba(56,255,153,0.15)" : "1px solid rgba(255,255,255,0.1)",
      transition: "all 300ms",
    }}>
      <div style={{
        maxWidth: 1152, margin: "0 auto", padding: "16px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <LBLogo />
        <nav style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <a href="#how-it-works" style={linkStyle}>How it works</a>
          <a href="#sound-familiar" style={linkStyle}>Sound familiar?</a>
          <a href="#meet-nici" style={linkStyle}>Meet Nici</a>
          <a href="#join" style={{
            background: "#38ff99", color: "#210a33",
            fontFamily: "Outfit", fontWeight: 700, fontSize: 14,
            padding: "10px 20px", borderRadius: 10, textDecoration: "none",
            transition: "all 200ms",
          }}
            onMouseEnter={(e) => e.currentTarget.style.filter = "brightness(1.1)"}
            onMouseLeave={(e) => e.currentTarget.style.filter = "none"}
          >
            Join a Session →
          </a>
        </nav>
      </div>
    </header>
  );
}

window.LBHeader = LBHeader;
