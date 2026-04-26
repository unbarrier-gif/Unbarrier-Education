import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const sectionContainerClass = 'mx-auto w-full max-w-6xl px-6';
const clarityCallHref = 'mailto:nici@unbarrier.me';

const primaryButtonClass =
  'text-[#38ff99] text-lg font-medium tracking-wide underline-offset-4 hover:underline hover:text-[#ff8a1c] transition-all duration-200';

const navLinkClass =
  'font-sans text-[14px] font-medium text-white/80 hover:text-[#38ff99] transition-colors duration-200 no-underline';

const overlay = <div className="absolute inset-0 bg-[rgba(56,255,153,0.04)] pointer-events-none" />;

export function LandingPage() {
  const [showSticky, setShowSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setShowSticky(window.scrollY > 300);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <div className="min-h-screen bg-[#210a33] text-white">

      {/* HEADER — fixed, transitions on scroll */}
      <header className={`fixed top-0 left-0 w-full z-50 backdrop-blur-[8px] border-b transition-colors duration-300 ${showSticky ? 'bg-[#210a33]/95 border-[rgba(56,255,153,0.15)]' : 'bg-[#210a33]/80 border-white/10'}`}>
        <div className={`${sectionContainerClass} flex items-center justify-between py-4`}>

          {/* Logo — inline SVG wordmark, transparent, crisp on dark */}
          <a href="#" className="flex items-center gap-2.5 no-underline group">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              {/* Outer loop arc */}
              <path d="M14 4C8.477 4 4 8.477 4 14C4 19.523 8.477 24 14 24C19.523 24 24 19.523 24 14C24 11.5 23.1 9.2 21.6 7.4" stroke="#38ff99" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              {/* Arrow tip pointing break/outward */}
              <path d="M18.5 4.5L22 7.5L18 8.5" stroke="#38ff99" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-comfortaa font-bold text-[#38ff99] text-[17px] sm:text-[19px] leading-none tracking-[0.01em]">
              loop breakers
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-6">
            <a href="#how-it-works" className={navLinkClass}>How it works</a>
            <a href="#sound-familiar" className={navLinkClass}>Sound familiar?</a>
            <a href="#meet-nici" className={navLinkClass}>Meet Nici</a>
            <a
              href="#join"
              className="bg-[#38ff99] text-[#210a33] font-bold text-[14px] px-5 py-2.5 rounded-[10px] transition-all duration-200 hover:brightness-110 hover:scale-[1.02] no-underline"
            >
              Join a Session →
            </a>
          </nav>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="sm:hidden flex flex-col justify-center items-center w-9 h-9 rounded-lg text-white/70 hover:text-white gap-[5px]"
          >
            <span className={`block w-5 h-[2px] bg-current transition-all duration-200 origin-center ${mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-5 h-[2px] bg-current transition-all duration-200 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-[2px] bg-current transition-all duration-200 origin-center ${mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>

        {/* Mobile dropdown */}
        <div className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-64 border-t border-[rgba(56,255,153,0.15)]' : 'max-h-0'}`}>
          <nav className="flex flex-col px-6 py-4 gap-4">
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className={navLinkClass}>How it works</a>
            <a href="#sound-familiar" onClick={() => setMobileMenuOpen(false)} className={navLinkClass}>Sound familiar?</a>
            <a href="#meet-nici" onClick={() => setMobileMenuOpen(false)} className={navLinkClass}>Meet Nici</a>
            <a
              href="#join"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-block bg-[#38ff99] text-[#210a33] font-bold text-[14px] px-5 py-2.5 rounded-[10px] text-center transition-all duration-200 hover:brightness-110 no-underline"
            >
              Join a Session →
            </a>
          </nav>
        </div>
      </header>

      <main className="pt-16">

        {/* 1. HERO */}
        <section className="relative bg-[#210a33] text-white overflow-hidden px-6 pt-32 pb-0">
          {/* glow */}
          <div className="absolute top-[20%] left-[-50px] w-[500px] h-[500px] bg-[#38ff99] opacity-10 blur-[160px]" />

          {/* ── HERO CONTENT ── */}
          <div className="relative z-10 flex flex-col items-center text-center">

            {/* PILL BADGE */}
            <span className="inline-block bg-[rgba(56,255,153,0.12)] border border-[rgba(56,255,153,0.4)] text-[#38ff99] px-5 py-2 rounded-[12px] text-[11px] uppercase tracking-[0.15em] font-semibold mb-4">
              VISION TO LAUNCH SESSIONS
            </span>

            {/* HEADLINE */}
            <h1 className="mt-8 max-w-[900px] text-white">
              Stop Going Round in Circles.<br />
              Start{' '}
              <span className="text-[#38ff99] font-black">Getting It Out</span>
              {' '}Into The World.
            </h1>

            {/* CTA BUTTON */}
            <a
              href="#join"
              className="mt-10 inline-block bg-[#38ff99] text-[#210a33] font-bold text-[16px] px-[32px] py-[14px] rounded-[12px] transition-all duration-200 hover:brightness-110 hover:scale-[1.02]"
            >
              Join a Session →
            </a>

            {/* STAT TILES */}
            <div className="mt-16 w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 pb-20">
              <div className="bg-[rgba(56,255,153,0.06)] border border-[rgba(56,255,153,0.2)] rounded-[12px] p-8 text-center">
                <span className="font-sans font-bold text-[clamp(22px,3vw,28px)] leading-[1.2] text-[#38ff99] block">90 minutes</span>
                <span className="font-comfortaa text-[14px] font-medium leading-[1.6] tracking-[0.02em] text-white/60 mt-2 block">Per session</span>
              </div>
              <div className="bg-[rgba(56,255,153,0.06)] border border-[rgba(56,255,153,0.2)] rounded-[12px] p-8 text-center">
                <span className="font-sans font-bold text-[clamp(22px,3vw,28px)] leading-[1.2] text-[#38ff99] block">One idea</span>
                <span className="font-comfortaa text-[14px] font-medium leading-[1.6] tracking-[0.02em] text-white/60 mt-2 block">Brought in. Worked through.</span>
              </div>
              <div className="bg-[rgba(56,255,153,0.06)] border border-[rgba(56,255,153,0.2)] rounded-[12px] p-8 text-center">
                <span className="font-sans font-bold text-[clamp(22px,3vw,28px)] leading-[1.2] text-[#FFC203] block">Done.</span>
                <span className="font-comfortaa text-[14px] font-medium leading-[1.6] tracking-[0.02em] text-white/60 mt-2 block">One next step. Every time.</span>
              </div>
            </div>

          </div>

          {/* ── ABOUT ME SNIPPET ── */}
          <div id="meet-nici" className="relative z-10 mt-20 bg-[rgba(219,125,204,0.07)] border-t border-[rgba(219,125,204,0.2)] border-b border-[rgba(219,125,204,0.2)] py-[60px] md:py-[100px] px-6">
            <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">

              {/* LEFT — Image */}
              <div className="w-full md:w-[45%] flex-shrink-0">
                <img
                  src="/images/hero_image_green.png"
                  alt="Nici, Loop Breakers facilitator"
                  className="w-full max-w-[460px] rounded-[12px] mx-auto md:mx-0 shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
                />
              </div>

              {/* RIGHT — Text */}
              <div className="w-full md:w-[55%]">

                {/* Pill badge */}
                <span className="inline-block bg-[rgba(219,125,204,0.12)] border border-[rgba(219,125,204,0.4)] text-[#DB7DCC] px-5 py-2 rounded-[12px] text-[11px] uppercase tracking-[0.15em] font-semibold mb-4">
                  YOUR FACILITATOR
                </span>

                {/* Name */}
                <h2 className="text-white">
                  Hi, I&apos;m Nici.
                </h2>

                {/* Body copy */}
                <p className="mt-6 text-white/80">
                  I built Loop Breakers because I needed it.
                </p>
                <p className="mt-4 text-white/80">
                  I know what it&apos;s like to have the idea, do the work, get close — and then quietly
                  shelve it because you&apos;re terrified no one will show up.
                </p>
                <p className="mt-4 text-white/80">
                  I&apos;m a facilitator, a woman with ADHD, and someone who has been brave for a very
                  long time. This is the room I wish had existed for me.
                </p>
                <p className="mt-4 text-white/80">
                  I&apos;m not here to coach you. I&apos;m here to sit with you while you do the thing.
                </p>

              </div>

            </div>
          </div>

        </section>

        <div className="h-px bg-[#38ff99] opacity-30" />

        {/* 2. PROBLEM */}
        <section id="sound-familiar" className="relative px-6 py-20 md:py-[100px] bg-[#210a33] text-white">
          {overlay}
          <div className="relative max-w-xl mx-auto">
            <div className="mb-6">
              <h2 className="text-[#38ff99]">You&apos;ve been here before.</h2>
            </div>
            <p className="text-white/70 mb-4">
              You&apos;ve started. But you&apos;re circling it.
            </p>
            <ul className="arrow-list space-y-4 font-comfortaa text-white/80 mb-4">
              <li>You can see the big picture — but struggle to pin it down.</li>
              <li>You rewrite instead of publish.</li>
              <li>You overthink pricing.</li>
              <li>You know you&apos;re capable — but it&apos;s not translating into income.</li>
            </ul>
            <p className="text-white/70 font-medium">
              You don&apos;t need more advice. You need <span className="text-[#38ff99]">structure</span>.
            </p>
          </div>
        </section>

        {/* 3. SHIFT */}
        <section className="relative px-6 py-32 bg-[#210a33] text-white text-center">
          {overlay}
          <div className="relative max-w-md mx-auto">
            <div className="mb-6">
              <h2>
                This isn&apos;t about doing <span className="text-[#38ff99]">more</span>.
              </h2>
            </div>
            <p className="text-white/70 mb-4">
              It&apos;s about doing <span className="text-[#38ff99]">one thing</span> — properly.
            </p>
            <p className="font-sans font-extrabold text-white mt-1 text-[clamp(24px,4vw,40px)] leading-[1.15] tracking-[-0.01em]">Not better.</p>
            <p className="font-sans font-extrabold text-white mt-1 text-[clamp(24px,4vw,40px)] leading-[1.15] tracking-[-0.01em]">Not perfect.</p>
            <p className="font-sans font-black text-[#FFC203] mt-3 text-[clamp(24px,4vw,40px)] leading-[1.15] tracking-[-0.01em]">Done.</p>
          </div>
        </section>

        {/* 4. HOW IT WORKS */}
        <section id="how-it-works" className="px-6 py-20 md:py-[100px] bg-[#210a33] text-white">
          <div className="max-w-4xl mx-auto">
            <div className="mb-10">
              <h2 className="border-l-4 border-[#38ff99] pl-5">Here&apos;s what happens.</h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                { number: '01', title: 'Bring one idea',      desc: "The one you've been circling too long." },
                { number: '02', title: 'Make it smaller',     desc: 'Until it\'s actually launchable.' },
                { number: '03', title: 'Work it through',     desc: 'Small group, real conversation.' },
                { number: '04', title: 'Leave with one step', desc: 'Not a list. One thing. Moving.' },
              ].map((step) => (
                <div key={step.number} className={`relative bg-[#210a33] text-white border-l-4 ${step.number === '04' ? 'border-[#FFC203]' : 'border-[#38ff99]'} rounded-[12px] p-6 overflow-hidden transition-all duration-200 hover:scale-[1.02]`}>
                  <span className={`absolute -top-2 right-2 text-[100px] font-bold leading-none ${step.number === '04' ? 'text-[#FFC203]' : 'text-[#38ff99]'} opacity-[0.08] select-none pointer-events-none`}>{step.number}</span>
                  <p className={`text-[14px] tracking-[0.02em] ${step.number === '04' ? 'text-[#FFC203]' : 'text-[#38ff99]'} mb-2`}>{step.number}</p>
                  <h4 className="text-white mb-3">{step.title}</h4>
                  <p className="text-white/80">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="h-px bg-[#38ff99] opacity-30" />

        {/* 5. PRIMARY CTA */}
        <section className="relative px-6 py-28 text-center text-white bg-[#210a33]">
          {overlay}
          <div className="relative max-w-md mx-auto">
            <h2 className="mb-6">
              You already know what you want to <span className="text-[#38ff99]">build</span>.
            </h2>
            <p className="font-sans font-extrabold text-white mt-4 mb-10 leading-[1.15] tracking-[-0.01em] text-[clamp(24px,4vw,40px)]">
              You just need to stop going round <span className="text-[#38ff99]">in circles.</span>
            </p>
            <a
              href="#join"
              className="bg-[#38ff99] text-[#210a33] px-8 py-4 text-lg font-bold rounded-[12px] transition-all duration-200 hover:bg-[#ff8a1c] hover:scale-[1.03]"
            >
              Join a Session
            </a>
          </div>
        </section>

        <div className="h-px bg-[#38ff99] opacity-30" />

        {/* 6. TEMPLATE */}
        <section id="template" className="px-6 py-20 md:py-[100px] bg-[#210a33] text-white">
          <div className="max-w-md mx-auto bg-[#210a33] border border-[#38ff99]/40 rounded-[12px] p-8 text-center">
            <div className="h-px w-full mb-6 bg-[#38ff99] opacity-40" />
            <h2 className="mb-6">Not ready to book yet?</h2>
            <p className="mb-10 text-white/70">
              Download the One Thing Template — a simple way to make your idea small enough to start.
            </p>
            <button
              type="button"
              className="border border-[#38ff99] text-white px-6 py-3 rounded-[12px] transition-all duration-200 hover:bg-[#38ff99] hover:text-[#210a33]"
            >
              Get the Template
            </button>
          </div>
        </section>

        <div className="h-px bg-[#38ff99] opacity-30" />

        {/* 7. PACKAGES */}
        <section id="join" className="relative px-6 py-20 md:py-[100px] bg-[#210a33] text-white">
          {overlay}
          <div className="relative max-w-4xl mx-auto">

            {/* Heading */}
            <div className="mb-10">
              <span className="inline-block text-[#38ff99] text-[11px] font-semibold tracking-[0.2em] uppercase mb-3">
                Loop Breakers
              </span>
              <h2>
                Pick your <span className="text-[#38ff99]">way in.</span>
              </h2>
            </div>

            {/* 2-column card grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch mb-5">

              {/* Card 1 — Standard */}
              <div className="bg-[rgba(33,10,51,0.6)] border border-[rgba(105,217,209,0.25)] rounded-[20px] p-8 flex flex-col backdrop-blur-[12px] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
                <h4 className="mb-2">90 Minute Session</h4>
                <p className="text-white/50 text-[14px] mb-6 font-light leading-relaxed">
                  Show up with one idea. Work through it in a small, structured group. Leave with a clear next step.
                </p>
                <p className="font-sans text-[52px] font-extrabold text-[#FFC203] leading-none mb-1">£10</p>
                <p className="font-sans text-[12px] text-white/40 mb-6 tracking-wide">One-off · No VAT · No subscription</p>
                <ul className="space-y-0 mb-7 flex-1">
                  {['One Vision to Launch session', 'Small group, online', '90 minutes'].map((item) => (
                    <li key={item} className="flex items-center gap-3 py-2 border-b border-white/[0.06] text-[14px] text-white/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#69d9d1] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://book.stripe.com/3cIfZjeH61cy9WR4Tfe3e00"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-[#38ff99] text-[#0a1f14] px-6 py-[14px] rounded-[12px] font-bold text-[15px] shadow-[0_4px_24px_rgba(56,255,153,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90"
                >
                  Join a Session
                </a>
              </div>

              {/* Card 2 — Featured (orange) */}
              <div className="relative bg-[rgba(33,10,51,0.6)] border-2 border-[#ff8a1c] rounded-[20px] p-8 flex flex-col backdrop-blur-[12px] shadow-[0_0_0_1px_rgba(255,138,28,0.3),0_8px_40px_rgba(255,138,28,0.15)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(255,138,28,0.5),0_24px_60px_rgba(255,138,28,0.2)]">
                {/* Recommended pill */}
                <div className="absolute -top-[14px] left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#ffc203] text-[#1a0e00] font-sans text-[10px] font-bold tracking-[0.16em] uppercase px-[14px] py-[5px] rounded-full">
                  Recommended
                </div>
                <h4 className="mb-2">Session + 1:1 Coaching</h4>
                <p className="text-white/50 text-[14px] mb-6 font-light leading-relaxed">
                  Your group session plus a private 45-minute follow-up call. We go deeper on your idea and map your actual next steps together.
                </p>
                <p className="font-sans text-[52px] font-extrabold text-white leading-none mb-1">£55</p>
                <p className="font-sans text-[12px] text-white/40 mb-6 tracking-wide">One-off · No VAT · No subscription</p>
                <ul className="space-y-0 mb-7 flex-1">
                  {['Everything in the 90 min session', 'Private 45-min 1:1 coaching call', 'Personalised next steps'].map((item) => (
                    <li key={item} className="flex items-center gap-3 py-2 border-b border-white/[0.06] text-[14px] text-white/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff8a1c] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://book.stripe.com/28E4gBfLa08u3ytgBXe3e01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-[#ff8a1c] text-[#1a0800] px-6 py-[14px] rounded-[12px] font-bold text-[15px] shadow-[0_4px_24px_rgba(255,138,28,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90"
                >
                  Get the Bundle
                </a>
              </div>

            </div>

            {/* Enquire line */}
            <p className="text-center font-sans text-[13px] text-white/45 mb-16">
              Interested in 1:1 coaching only?{' '}
              <a
                href="mailto:hello@unbarrier.me"
                className="text-[#69d9d1] border-b border-[rgba(105,217,209,0.3)] hover:border-[#69d9d1] transition-colors duration-200 no-underline"
              >
                Get in touch — hello@unbarrier.me
              </a>
            </p>

            {/* Separator */}
            <div className="h-px bg-white/[0.08] mb-14" />

            {/* Testimonial */}
            <div className="max-w-3xl mx-auto">
              <img
                src="/images/gemma_testimonial_v2.png"
                alt="Gemma — Loop Breakers participant testimonial"
                className="w-full h-auto rounded-xl"
              />
            </div>

          </div>
        </section>

        <div className="h-px bg-[#38ff99] opacity-30" />

        {/* 8. FINAL CTA */}
        <section className="relative px-6 py-28 text-center bg-[#f7f4fb]">
          <div className="relative max-w-md mx-auto">
            <h2 className="text-[#210a33] mb-6">Ready to stop circling it?</h2>
            <a
              href="#"
              className="inline-block bg-[#ffc203] text-[#210a33] px-8 py-4 font-bold rounded-[50px]"
              style={{ transition: 'background-color 0.2s ease, color 0.2s ease' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#210a33'; (e.currentTarget as HTMLAnchorElement).style.color = '#38ff99'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#ffc203'; (e.currentTarget as HTMLAnchorElement).style.color = '#210a33'; }}
            >
              Join Loop Breakers
            </a>
            <div className="mt-6 flex justify-center">
              <ul className="list-none p-0 m-0 inline-flex flex-col items-start gap-2">
                {[
                  '£10 per session',
                  '90 minutes',
                  'Small group',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-[10px] font-sans text-[15px] text-[#210a33]">
                    <span style={{ color: '#ffc203', fontSize: '11px', lineHeight: 1, flexShrink: 0 }} aria-hidden="true">&#9658;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-[#210a33] border-t border-[rgba(56,255,153,0.15)] pt-[60px] pb-[40px] px-6">
        <div className="mx-auto w-full max-w-[1100px]">

          {/* TOP ROW — three columns */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10 md:gap-0 text-center md:text-left">

            {/* LEFT — Logo + tagline */}
            <div className="flex flex-col items-center md:items-start">
              <a href="#" className="flex items-center gap-2.5 no-underline">
                <svg width="26" height="26" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M14 4C8.477 4 4 8.477 4 14C4 19.523 8.477 24 14 24C19.523 24 24 19.523 24 14C24 11.5 23.1 9.2 21.6 7.4" stroke="#38ff99" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18.5 4.5L22 7.5L18 8.5" stroke="#38ff99" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="font-comfortaa font-bold text-[#38ff99] text-[17px] leading-none tracking-[0.01em]">
                  loop breakers
                </span>
              </a>
              <span className="font-comfortaa text-[13px] text-white/50 mt-[10px]">
                Stop circling. Start building.
              </span>
            </div>

            {/* CENTRE — Navigate links */}
            <div className="flex flex-col items-center md:items-start">
              <span className="font-sans font-semibold text-[11px] tracking-[0.12em] uppercase text-[#38ff99] mb-4">
                Navigate
              </span>
              {[
                { label: 'How it works',    href: '#how-it-works'   },
                { label: 'Sound familiar?', href: '#sound-familiar' },
                { label: 'Meet Nici',       href: '#meet-nici'      },
                { label: 'Join',            href: '#join'           },
              ].map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  className="font-comfortaa text-[14px] text-white/65 hover:text-[#38ff99] transition-colors duration-200 no-underline mb-[10px]"
                >
                  {label}
                </a>
              ))}
            </div>

            {/* RIGHT — Ready CTA */}
            <div className="flex flex-col items-center md:items-start">
              <span className="font-sans font-semibold text-[11px] tracking-[0.12em] uppercase text-[#38ff99] mb-4">
                Ready?
              </span>
              <a
                href="#join"
                className="inline-block bg-[#38ff99] text-[#210a33] font-sans font-bold text-[15px] px-7 py-3 rounded-[12px] transition-all duration-200 hover:brightness-110 hover:scale-[1.02]"
              >
                Join a Session →
              </a>
            </div>

          </div>

          {/* DIVIDER */}
          <div className="border-t border-white/[0.08] mt-10 mb-6" />

          {/* BOTTOM ROW — copyright + links */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 text-center md:text-left">

            <span className="font-comfortaa text-[12px] text-white/35">
              © 2026 Loop Breakers. All rights reserved.
            </span>

            <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6">
              <a href="https://unbarrier.me" target="_blank" rel="noopener noreferrer" className="font-comfortaa text-[12px] text-white/35 hover:text-white/75 transition-colors duration-200 no-underline">Part of Unbarrier.me</a>
              <Link to="/privacy" className="font-comfortaa text-[12px] text-white/35 hover:text-white/75 transition-colors duration-200 no-underline">Privacy Policy</Link>
              <Link to="/cookie-policy" className="font-comfortaa text-[12px] text-white/35 hover:text-white/75 transition-colors duration-200 no-underline">Cookie Policy</Link>
              <Link to="/terms" className="font-comfortaa text-[12px] text-white/35 hover:text-white/75 transition-colors duration-200 no-underline">Terms &amp; Conditions</Link>
            </div>

          </div>

        </div>
      </footer>

    </div>
  );
}
