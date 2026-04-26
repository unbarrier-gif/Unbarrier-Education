// Nav.jsx — translucent amethyst nav with blur
const { useState, useEffect } = React;

function Nav({ active = "home" }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const links = [
    { label: "audit",  href: "#audit" },
    { label: "access", href: "#access" },
    { label: "voice",  href: "#voice" },
    { label: "blog",   href: "../../blog/index.html" },
    { label: "about",  href: "#about" },
  ];

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: scrolled ? "0.5rem 2.5rem" : "0.9rem 2.5rem",
        background: scrolled ? "rgba(33,10,51,0.97)" : "rgba(33,10,51,0.82)",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        borderBottom: scrolled
          ? "1px solid rgba(56,255,153,0.15)"
          : "1px solid rgba(255,255,255,0.05)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "all 0.3s ease",
      }}
    >
      <Wordmark href="#home" size="md" />

      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        {links.map(({ label, href }) => (
          <a key={label} href={href}
            style={{
              fontFamily: "Outfit, system-ui",
              fontSize: 14, fontWeight: 500,
              color: active === label ? "var(--text)" : "rgba(240,235,229,0.6)",
              textDecoration: "none", letterSpacing: "0.02em",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = active === label ? "var(--text)" : "rgba(240,235,229,0.6)")}
          >
            {label}
          </a>
        ))}
        <a href="mailto:nici@unbarrier.me"
          style={{
            fontFamily: "Comfortaa, system-ui", fontWeight: 700, fontSize: 13.5,
            background: "var(--spring-green)", color: "var(--amethyst)",
            padding: "9px 20px", borderRadius: 100, textDecoration: "none",
            transition: "opacity 150ms",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.88)}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}
        >
          Email Nici
        </a>
      </div>
    </nav>
  );
}

window.Nav = Nav;
