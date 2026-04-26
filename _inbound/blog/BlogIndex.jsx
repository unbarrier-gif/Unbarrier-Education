// BlogIndex.jsx — "Notes from Nici" landing page
const { useState: useStateIdx, useMemo: useMemoIdx } = React;

// ── Post data ───────────────────────────────────────────────────────────
const POSTS = [
  {
    slug: "not-a-preference",
    shape: "reality-check",
    title: "Not a preference. A barrier.",
    titleTile: ["Not a preference.", "A barrier.", ""],
    excerpt: "\"I won't read posts with emojis or AI-generated text.\" Read that again. That's not preference — it's exclusion dressed as professionalism.",
    date: "28 Mar 2026",
    readingMin: 6,
    href: "posts/not-a-preference.html",
    featured: true,
  },
  {
    slug: "stop-calling-me-resilient",
    shape: "honestly",
    title: "Stop calling me resilient.",
    excerpt: "I've just had a week off. I came back more exhausted than before. Resilience should not be the price of admission to a broken system.",
    date: "21 Mar 2026",
    readingMin: 5,
    href: "posts/stop-calling-me-resilient.html",
  },
  {
    slug: "uncountable-strength",
    shape: "stories",
    title: "Uncountable strength: difference, determination, dyscalculia.",
    byline: "Nici Foote",
    portrait: "../assets/nici-portrait-circle.png",
    excerpt: "For most of my life, I thought being bad at numbers meant I was bad at success. Today, on Dyscalculia Awareness Day, I'm celebrating something bigger.",
    date: "3 Mar 2026",
    readingMin: 7,
    href: "posts/uncountable-strength.html",
  },
  {
    slug: "the-word-provision",
    shape: "out-loud",
    title: "The word \"provision\" is doing a lot of heavy lifting.",
    excerpt: "EHCPs don't protect children. The word provision does. And when a school reads \"should\" instead of \"must,\" a child loses their afternoon.",
    date: "11 Mar 2026",
    readingMin: 3,
    href: "posts/the-word-provision.html",
  },
  {
    slug: "why-you-never-launch",
    shape: "invitations",
    title: "Why you never launch (and what to do about it).",
    excerpt: "You've had the idea for a while. You've tweaked it, rethought it, parked it. That's the loop. Loop Breakers is the room where you finally move.",
    date: "14 Mar 2026",
    readingMin: 4,
    href: "posts/why-you-never-launch.html",
    ctaLabel: "Find your people →",
  },
];

const FILTERS = [
  { key: "all", name: "Everything", color: "var(--text)" },
  { key: "out-loud", name: "Out loud", color: "var(--spring-green)" },
  { key: "reality-check", name: "Reality check", color: "var(--princeton-orange)" },
  { key: "honestly", name: "Honestly", color: "var(--orchid-mist)" },
  { key: "stories", name: "Stories", color: "var(--pearl-aqua)" },
  { key: "invitations", name: "Invitations", color: "var(--school-bus-yellow)" },
];

// ── Hero ────────────────────────────────────────────────────────────────
function BlogHero() {
  return (
    <section style={{
      padding: "160px clamp(1.5rem, 5vw, 5rem) 60px",
      position: "relative", overflow: "hidden",
    }}>
      <Glow color="#38ff99" x="-10%" y="10%" size={560} opacity={0.09} />
      <Glow color="#db7dcc" x="70%" y="-10%" size={500} opacity={0.08} />

      <div style={{ maxWidth: 1160, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Eyebrow color="var(--spring-green)">Notes from Nici</Eyebrow>
        <h1 style={{
          margin: "0 0 24px", fontFamily: "Outfit, system-ui",
          fontSize: "clamp(2.4rem, 6vw, 4.2rem)", fontWeight: 800,
          lineHeight: 1.02, letterSpacing: "-0.03em", color: "var(--text)",
          maxWidth: 900,
        }}>
          The unbarrier blog.<br />
          <span style={{ color: "var(--text-muted)", fontWeight: 700 }}>
            Said out loud, then typed down.
          </span>
        </h1>
        <p style={{
          margin: "0 0 40px", fontFamily: "Comfortaa, system-ui",
          fontSize: "clamp(15px, 1.5vw, 18px)", lineHeight: 1.7,
          color: "var(--text-muted)", maxWidth: 640,
        }}>
          Short thoughts, honest ones, full-length arguments, and stories from other
          people in this world. Writing is hard when you're dyslexic. I still do it —
          with voice notes, AI, and a lot of rereading.
        </p>

        {/* The shape legend — tells new readers what to expect */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 2, marginTop: 48,
          borderTop: "1px solid var(--border-default)",
          borderLeft: "1px solid var(--border-default)",
        }}>
          {Object.entries(SHAPES).map(([key, s]) => (
            <div key={key} style={{
              padding: "18px 20px",
              borderRight: "1px solid var(--border-default)",
              borderBottom: "1px solid var(--border-default)",
            }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 8, marginBottom: 8,
              }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: s.color }} />
                <span style={{
                  fontFamily: "Outfit", fontSize: 11, fontWeight: 700,
                  letterSpacing: "0.14em", textTransform: "uppercase", color: s.color,
                }}>{s.name}</span>
              </div>
              <p style={{
                margin: 0, fontFamily: "Comfortaa", fontSize: 12.5,
                lineHeight: 1.55, color: "var(--text-muted)",
              }}>{s.blurb}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Filter chips ────────────────────────────────────────────────────────
function FilterChips({ active, setActive, counts }) {
  return (
    <div style={{
      padding: "32px clamp(1.5rem, 5vw, 5rem) 0",
      maxWidth: 1160, margin: "0 auto",
      display: "flex", flexWrap: "wrap", gap: 10,
    }}>
      {FILTERS.map((f) => {
        const isActive = active === f.key;
        const count = f.key === "all"
          ? POSTS.length
          : counts[f.key] || 0;
        return (
          <button key={f.key} onClick={() => setActive(f.key)}
            style={{
              fontFamily: "Outfit, system-ui", fontSize: 13,
              fontWeight: isActive ? 700 : 600,
              letterSpacing: "0.04em",
              padding: "9px 16px", borderRadius: 100,
              background: isActive ? f.color : "transparent",
              color: isActive ? (f.key === "all" ? "var(--amethyst)" : "var(--amethyst)") : "var(--text-muted)",
              border: `1px solid ${isActive ? f.color : "var(--border-default)"}`,
              cursor: "pointer",
              display: "inline-flex", alignItems: "center", gap: 8,
              transition: "all 150ms",
            }}
            onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.borderColor = f.color; }}
            onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.borderColor = "var(--border-default)"; }}
          >
            {f.key !== "all" && (
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: isActive ? "var(--amethyst)" : f.color }} />
            )}
            {f.name}
            <span style={{
              fontFamily: "Outfit", fontSize: 11, fontWeight: 600,
              opacity: isActive ? 0.6 : 0.5,
            }}>{count}</span>
          </button>
        );
      })}
    </div>
  );
}

// ── Post grid ───────────────────────────────────────────────────────────
function PostGrid({ posts }) {
  if (posts.length === 0) {
    return (
      <div style={{ padding: "60px 20px", textAlign: "center", color: "var(--text-muted)", fontFamily: "Comfortaa" }}>
        Nothing in this shape yet. One's on the way.
      </div>
    );
  }
  return (
    <div style={{
      padding: "32px clamp(1.5rem, 5vw, 5rem) 120px",
      maxWidth: 1160, margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
      gap: 24,
      alignItems: "start",
    }}>
      {posts.map((p) => <BlogCard key={p.slug} post={p} />)}
    </div>
  );
}

// ── App root ────────────────────────────────────────────────────────────
function BlogApp() {
  const [active, setActive] = useStateIdx("all");
  const counts = useMemoIdx(() => {
    const c = {};
    for (const p of POSTS) c[p.shape] = (c[p.shape] || 0) + 1;
    return c;
  }, []);
  const filtered = active === "all" ? POSTS : POSTS.filter((p) => p.shape === active);
  return (
    <>
      <BlogNav />
      <BlogHero />
      <FilterChips active={active} setActive={setActive} counts={counts} />
      <PostGrid posts={filtered} />
      <BlogFooter />
    </>
  );
}

// ── Nav (blog version — sticky, light) ──────────────────────────────────
function BlogNav() {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0.9rem 2.5rem",
      background: "rgba(33,10,51,0.88)",
      backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(255,255,255,0.05)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <a href="../ui_kits/unbarrier-website/index.html" style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none" }}>
        <Wordmark size="md" />
        <span style={{
          fontFamily: "Outfit", fontSize: 11, fontWeight: 700,
          letterSpacing: "0.14em", textTransform: "uppercase",
          color: "var(--spring-green)",
          padding: "3px 9px", borderRadius: 100,
          border: "1px solid rgba(56,255,153,0.4)",
        }}>blog</span>
      </a>
      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
        <a href="../ui_kits/unbarrier-website/index.html" style={{ fontFamily: "Outfit", fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }}>← Back to site</a>
        <a href="mailto:nici@unbarrier.me"
          style={{
            fontFamily: "Comfortaa", fontWeight: 700, fontSize: 13,
            background: "var(--spring-green)", color: "var(--amethyst)",
            padding: "9px 18px", borderRadius: 100, textDecoration: "none",
          }}
        >Email Nici</a>
      </div>
    </nav>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────
function BlogFooter() {
  return (
    <footer style={{
      borderTop: "1px solid var(--border-default)",
      padding: "72px clamp(1.5rem, 5vw, 5rem) 48px",
      position: "relative", overflow: "hidden",
    }}>
      <Glow color="#69d9d1" x="-10%" y="0%" size={500} opacity={0.07} />

      <div style={{ maxWidth: 1160, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Two-column invitation block */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 2,
          border: "1px solid var(--border-default)",
          borderRadius: 20, overflow: "hidden",
          background: "var(--border-default)",
        }}>
          {/* Get the notes */}
          <div style={{
            padding: "36px 34px 32px",
            background: "var(--amethyst)",
            display: "flex", flexDirection: "column", gap: 14,
          }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontFamily: "Outfit", fontSize: 11, fontWeight: 700,
              letterSpacing: "0.14em", textTransform: "uppercase",
              color: "var(--spring-green)",
            }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--spring-green)" }} />
              Get the notes
            </div>
            <h3 style={{
              margin: 0, fontFamily: "Outfit, system-ui",
              fontSize: 22, fontWeight: 800, lineHeight: 1.22,
              letterSpacing: "-0.01em", color: "var(--text)",
            }}>Want these in your inbox?</h3>
            <p style={{
              margin: 0, fontFamily: "Comfortaa", fontSize: 14,
              lineHeight: 1.65, color: "var(--text-muted)",
            }}>
              Email Nici and ask to be on the list. No funnels. No weekly roundup.
              Just the ones worth reading, when they're ready.
            </p>
            <a href="mailto:nici@unbarrier.me?subject=Add me to the notes list"
              style={{
                alignSelf: "flex-start", marginTop: 6,
                fontFamily: "Comfortaa", fontWeight: 700, fontSize: 13.5,
                background: "var(--spring-green)", color: "var(--amethyst)",
                padding: "11px 20px", borderRadius: 100, textDecoration: "none",
              }}
            >Add me to the list →</a>
          </div>

          {/* Tell your story */}
          <div style={{
            padding: "36px 34px 32px",
            background: "var(--amethyst-deep)",
            display: "flex", flexDirection: "column", gap: 14,
          }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontFamily: "Outfit", fontSize: 11, fontWeight: 700,
              letterSpacing: "0.14em", textTransform: "uppercase",
              color: "var(--pearl-aqua)",
            }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--pearl-aqua)" }} />
              Your story belongs here
            </div>
            <h3 style={{
              margin: 0, fontFamily: "Outfit, system-ui",
              fontSize: 22, fontWeight: 800, lineHeight: 1.22,
              letterSpacing: "-0.01em", color: "var(--text)",
            }}>
              Got a story the world needs to hear?
            </h3>
            <p style={{
              margin: 0, fontFamily: "Comfortaa", fontSize: 14,
              lineHeight: 1.65, color: "var(--text-muted)",
            }}>
              Parent, teacher, student, professional — if you've lived it and you
              think someone else needs to hear it, we want it in <em>Stories</em>.
              Write it yourself, or talk it out with me and I'll help you shape it.
              You stay in charge of your voice.
            </p>
            <a href="mailto:nici@unbarrier.me?subject=I have a story"
              style={{
                alignSelf: "flex-start", marginTop: 6,
                fontFamily: "Comfortaa", fontWeight: 700, fontSize: 13.5,
                background: "transparent", color: "var(--pearl-aqua)",
                border: "1.5px solid var(--pearl-aqua)",
                padding: "10px 20px", borderRadius: 100, textDecoration: "none",
              }}
            >Tell me your story →</a>
          </div>
        </div>

        {/* Fine print */}
        <div style={{
          marginTop: 36,
          display: "flex", flexWrap: "wrap", gap: 16,
          justifyContent: "space-between", alignItems: "center",
        }}>
          <p style={{ margin: 0, fontFamily: "Comfortaa", fontSize: 13, color: "var(--text-subtle)", lineHeight: 1.65, maxWidth: 560 }}>
            Everyone who's lived something different has something to teach. The
            more voices here, the less alone anyone feels.
          </p>
          <p style={{ margin: 0, fontFamily: "Comfortaa", fontSize: 12, color: "var(--text-faint)" }}>
            © 2026 Nici Foote · unbarrier.me
          </p>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { POSTS, FILTERS, BlogApp });
