'use client'

/* eslint-disable @next/next/no-img-element */
// Plain <img> is intentional: the marquee track duplicates the same six
// screenshots and the coverflow effect reads their bounding boxes directly.

import { useCallback, useEffect, useRef, useState } from 'react'

const TYPED_TEXT = 'Now building AI Automation.'
const WA_NUMBER = '6285858038176'
const WA_MESSAGE = 'Halo Cipta, saya tertarik diskusi soal project/kolaborasi.'
const PRODUCTS_URL = 'https://lynk.id/ciptacoding'

const SOCIALS = [
  { label: 'TikTok', handle: '@ciptadwipajayaa', href: 'https://www.tiktok.com/@ciptadwipajayaa' },
  { label: 'Instagram', handle: '@ciptadwipajayaa', href: 'https://www.instagram.com/ciptadwipajayaa/' },
  { label: 'YouTube', handle: '@CiptaDev', href: 'https://www.youtube.com/@CiptaDev' },
  { label: 'Threads', handle: '@ciptadwipajayaa', href: 'https://www.threads.com/@ciptadwipajayaa' },
  { label: 'YouTube', handle: '@BolaAjaOfficial', href: 'https://www.youtube.com/@BolaAjaOfficial' },
] as const

const SCREENS = [
  { src: '/screens/instagram-grid.jpg', alt: 'Instagram grid' },
  { src: '/screens/instagram-analytics.jpg', alt: 'Instagram analytics' },
  { src: '/screens/tiktok-profile.jpg', alt: 'TikTok profile ciptadev' },
  { src: '/screens/tiktok-analytics.jpg', alt: 'TikTok analytics 850K views' },
  { src: '/screens/youtube-lifetime.jpg', alt: 'YouTube 37M lifetime views' },
  { src: '/screens/bolaaja-youtube.jpg', alt: 'Bola Aja YouTube channel' },
] as const

// per-card bob timing so the marquee tiles do not move in lockstep
const BOB = ['6s', '7s .4s', '5.5s .8s', '6.5s .2s', '7.5s .6s', '6s 1s']

const INITIAL_POINTS = [70, 65, 18, 9, 46, 56, 51, 60, 55, 62, 44, 37, 51, 44, 58, 62, 56, 63, 51, 47]

// ── Audience analytics (dummy) ──
// Every figure is fake. Bases live in build-time env (NEXT_PUBLIC_*, inlined
// into the static export) so they can be bumped as the real numbers grow: edit
// .env.local (or .env) and rebuild the image. Each figure random-walks within
// ±jitter of its base, so it drifts up AND down and never balloons over a
// session. Set a jitter to 0 to freeze that figure at its base.
const envNum = (v: string | undefined, fallback: number) => {
  const parsed = Number(v)
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback
}

const METRICS = {
  followers: {
    base: envNum(process.env.NEXT_PUBLIC_FOLLOWERS_BASE, 5000),
    jitter: envNum(process.env.NEXT_PUBLIC_FOLLOWERS_JITTER, 15),
  },
  views: {
    base: envNum(process.env.NEXT_PUBLIC_VIEWS_BASE, 1000000),
    jitter: envNum(process.env.NEXT_PUBLIC_VIEWS_JITTER, 600),
  },
  subs: {
    base: envNum(process.env.NEXT_PUBLIC_SUBS_BASE, 20000),
    jitter: envNum(process.env.NEXT_PUBLIC_SUBS_JITTER, 20),
  },
  ytViews: {
    base: envNum(process.env.NEXT_PUBLIC_YT_VIEWS_BASE, 36000000),
    jitter: envNum(process.env.NEXT_PUBLIC_YT_VIEWS_JITTER, 4000),
  },
} as const

const VIEWS_TODAY_BASE = envNum(process.env.NEXT_PUBLIC_VIEWS_TODAY_BASE, 14382)

// Bounded signed random walk: nudges `cur` by a fraction of `amp`, clamped to
// [-amp, +amp]. Keeps the live offset small and mean-reverting around the base.
const walk = (cur: number, amp: number) => {
  if (amp <= 0) return 0
  const step = amp * 0.4
  const next = cur + (Math.random() * 2 - 1) * step
  return next > amp ? amp : next < -amp ? -amp : next
}

export default function Portfolio() {
  const [dark, setDark] = useState(true)
  const [narrow, setNarrow] = useState(false)
  const [socialsOpen, setSocialsOpen] = useState(false)
  // count-up progress: start at 1 so SSR / no-JS renders final figures
  const [p, setP] = useState(1)
  const [typed, setTyped] = useState(TYPED_TEXT)
  const [ticker, setTicker] = useState(VIEWS_TODAY_BASE)
  const [points, setPoints] = useState<number[]>(INITIAL_POINTS)
  const [live, setLive] = useState({ followers: 0, views: 0, subs: 0, ytViews: 0 })

  const trackRef = useRef<HTMLDivElement | null>(null)

  // Restore saved theme (design defaults to dark)
  useEffect(() => {
    try {
      if (localStorage.getItem('cd_theme') === 'light') setDark(false)
    } catch {}
  }, [])

  // Responsive breakpoint
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 560px)')
    const onChange = () => setNarrow(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Count-up
  useEffect(() => {
    let raf = 0
    const t0 = performance.now()
    const dur = 2000
    setP(0)
    const step = (t: number) => {
      const x = Math.min(1, (t - t0) / dur)
      setP(1 - Math.pow(1 - x, 3))
      if (x < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])

  // Typing loop: begin fully typed, then delete + retype forever
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    let i = TYPED_TEXT.length
    let dir = -1
    let first = true
    const tick = () => {
      let next = i + dir
      let delay = dir > 0 ? 75 : 32
      if (next >= TYPED_TEXT.length) { next = TYPED_TEXT.length; dir = -1; delay = 2400 }
      else if (next <= 0) { next = 0; dir = 1; delay = 700 }
      i = next
      setTyped(TYPED_TEXT.slice(0, i))
      timer = setTimeout(tick, delay)
    }
    timer = setTimeout(tick, first ? 2400 : 400)
    first = false
    return () => clearTimeout(timer)
  }, [])

  // Live ticker + sparkline drift
  useEffect(() => {
    const iv = setInterval(() => {
      // "views today" is a within-day tally, so it drifts up only, but slowly.
      setTicker((v) => v + Math.floor(Math.random() * 4))
      setPoints((pts) => {
        const rest = pts.slice(1)
        const last = rest[rest.length - 1]
        let next = last + (Math.random() * 30 - 15)
        next = Math.max(8, Math.min(72, next))
        return [...rest, Math.round(next)]
      })
      // Each figure oscillates within ±jitter of its base (up and down), so the
      // numbers stay near the env-configured base instead of climbing forever.
      setLive((l) => ({
        followers: walk(l.followers, METRICS.followers.jitter),
        views: walk(l.views, METRICS.views.jitter),
        subs: walk(l.subs, METRICS.subs.jitter),
        ytViews: walk(l.ytViews, METRICS.ytViews.jitter),
      }))
    }, 1200)
    return () => clearInterval(iv)
  }, [])

  // Coverflow zoom on the marquee
  useEffect(() => {
    let raf = 0
    const loop = () => {
      const track = trackRef.current
      if (track && track.parentElement) {
        const c = track.parentElement.getBoundingClientRect()
        const cx = c.left + c.width / 2
        track.querySelectorAll<HTMLElement>('[data-card]').forEach((el) => {
          const r = el.getBoundingClientRect()
          const rel = (r.left + r.width / 2 - cx) / (c.width * 0.5)
          const d = Math.min(1, Math.abs(rel))
          const s = 1.16 - 0.24 * d
          const ry = Math.max(-1, Math.min(1, rel)) * -20
          el.style.transform = `perspective(900px) rotateY(${ry.toFixed(1)}deg) scale(${s.toFixed(3)})`
          const parent = el.parentElement
          if (parent) {
            parent.style.zIndex = String(Math.round(s * 100))
            parent.style.position = 'relative'
          }
        })
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  const toggleTheme = useCallback(() => {
    setDark((d) => {
      const next = !d
      try { localStorage.setItem('cd_theme', next ? 'dark' : 'light') } catch {}
      return next
    })
  }, [])

  // Derived / formatted values
  const n = (base: number, extra: number) =>
    Math.round(base * p + extra).toLocaleString('en-US')
  const suffix = p >= 1 ? '+' : ''

  const stepX = 400 / (points.length - 1)
  const chartLine = points
    .map((y, i) => (i === 0 ? 'M' : 'L') + Math.round(i * stepX) + ',' + y)
    .join(' ')
  const chartFill = chartLine + ' L400,80 L0,80 Z'
  const chartDotY = points[points.length - 1]

  const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`
  const ctaDir = narrow ? 'column' : 'row'

  return (
    <div className={`hero${dark ? ' dark' : ''}`} id="main-content">
      {/* theme toggle */}
      <button
        onClick={toggleTheme}
        aria-label="Toggle dark mode"
        className="theme-toggle"
        style={{ left: narrow ? 'calc(100vw - 62px)' : '18px' }}
      >
        {dark ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </button>

      {/* grid + drifting glows */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px)', backgroundSize: '220px 220px', pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', top: '-180px', left: '-120px', width: '560px', height: '560px', borderRadius: '50%', background: 'var(--glow1)', filter: 'blur(60px)', animation: 'glowDrift 14s ease-in-out infinite', pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', bottom: '-200px', right: '-140px', width: '620px', height: '620px', borderRadius: '50%', background: 'var(--glow2)', filter: 'blur(70px)', animation: 'glowDrift2 17s ease-in-out infinite', pointerEvents: 'none' }} />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(28px, 4vw, 64px)', alignItems: 'center', justifyContent: 'center', maxWidth: '1260px', width: '100%', position: 'relative', zIndex: 1 }}>

        {/* ── left column ── */}
        <div style={{ flex: '1 1 420px', minWidth: '320px', maxWidth: '560px', display: 'flex', flexDirection: 'column', gap: '26px', animation: 'fadeUp .7s ease both', position: 'relative', zIndex: 30 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--tx2)' }}>Software Engineer · 5 Years Experience</div>
            <h1 style={{ margin: 0, fontSize: 'clamp(38px, 4.6vw, 60px)', lineHeight: 1.05, fontWeight: 700, letterSpacing: '-0.02em', background: 'var(--h1Grad)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', filter: 'var(--h1F)' }}>Cipta Dwipajaya.</h1>
            <div style={{ fontSize: 'clamp(22px, 2.4vw, 30px)', fontWeight: 600, letterSpacing: '-0.015em', minHeight: '1.35em', background: 'var(--subGrad)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', filter: 'var(--subF)' }}>
              {typed}
              <span style={{ display: 'inline-block', width: '3px', height: '0.85em', background: 'var(--caret)', marginLeft: '5px', borderRadius: '2px', verticalAlign: '-0.06em', animation: 'blink 1s step-end infinite' }} />
            </div>
            <p style={{ margin: 0, fontSize: '17px', lineHeight: 1.55, color: 'var(--txBody)', maxWidth: '46ch', textWrap: 'pretty' }}>Building software and creating content — Engineer by profession, creator by passion.</p>
          </div>

          {/* experience */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { role: 'Software Engineer — Tech Company', time: '4 years' },
              { role: 'Software Engineer — Government Institution', time: '1 year' },
            ].map((x) => (
              <div key={x.role} style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '16px', padding: '14px 18px', background: 'var(--cardBg)', backdropFilter: 'blur(36px) saturate(170%)', WebkitBackdropFilter: 'blur(36px) saturate(170%)', border: '1px solid var(--bord)', borderRadius: '16px', boxShadow: 'inset 0 1px 0 var(--hi), 0 10px 30px rgba(50,55,70,0.14)' }}>
                <div style={{ fontSize: '15px', fontWeight: 600 }}>{x.role}</div>
                <div style={{ fontSize: '13px', color: 'var(--tx2)', whiteSpace: 'nowrap' }}>{x.time}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--tx3)' }}>Get in touch</div>
            <div style={{ display: 'flex', flexDirection: ctaDir, gap: '10px', alignItems: 'stretch', position: 'relative' }}>
              <a href={PRODUCTS_URL} target="_blank" rel="noopener noreferrer" className="glass-btn">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
                My Products <span className="chev">›</span>
              </a>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="glass-btn">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                WhatsApp Me <span className="chev">›</span>
              </a>
              <div style={{ position: 'relative', flex: '1 1 0', display: 'flex' }}>
                <button onClick={() => setSocialsOpen((v) => !v)} className="glass-btn" style={{ width: '100%' }} aria-expanded={socialsOpen} aria-haspopup="menu">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="8.59" y1="10.49" x2="15.42" y2="6.51" /></svg>
                  Social Media <span style={{ fontSize: '11px', color: 'var(--tx2)' }}>{socialsOpen ? '▲' : '▼'}</span>
                </button>
                {socialsOpen && (
                  <div role="menu" style={{ position: 'absolute', bottom: 'calc(100% + 10px)', left: 0, minWidth: 'min(250px, calc(100vw - 48px))', background: 'var(--dropBg)', backdropFilter: 'blur(36px) saturate(180%)', WebkitBackdropFilter: 'blur(36px) saturate(180%)', border: '1px solid var(--bordStrong)', borderRadius: '16px', padding: '6px', zIndex: 50, display: 'flex', flexDirection: 'column', boxShadow: 'inset 0 1px 0 var(--hi), 0 20px 50px rgba(50,55,70,0.25)', animation: 'fadeUp .18s ease both' }}>
                    {SOCIALS.map((s) => (
                      <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" role="menuitem" className="social-link">
                        <SocialIcon label={s.label} handle={s.handle} />
                        {s.label} <span className="handle">{s.handle}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── right column ── */}
        <div style={{ flex: '1 1 420px', minWidth: '320px', maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '18px', animation: 'fadeUp .7s .15s ease both', position: 'relative', zIndex: 1 }}>
          <div style={{ background: 'var(--cardBg2)', backdropFilter: 'blur(40px) saturate(180%)', WebkitBackdropFilter: 'blur(40px) saturate(180%)', border: '1px solid var(--bord)', borderRadius: '22px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', boxShadow: 'inset 0 1px 0 var(--hi), inset 0 -1px 0 var(--hiWeak), 0 24px 60px rgba(50,55,70,0.22)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '15px', fontWeight: 600, letterSpacing: '-0.01em' }}>Audience analytics</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '12px', color: 'var(--green)', fontWeight: 600 }}><span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#2bb04f', animation: 'pulse 1.6s ease infinite' }} />LIVE</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {[
                { label: 'IG + TikTok · Followers', value: n(METRICS.followers.base, live.followers) + suffix },
                { label: 'IG + TikTok · Views', value: n(METRICS.views.base, live.views) + suffix },
                { label: 'Bola Aja YT · Subscribers', value: n(METRICS.subs.base, live.subs) },
                { label: 'Bola Aja YT · Views', value: n(METRICS.ytViews.base, live.ytViews) + suffix },
              ].map((t) => (
                <div key={t.label} style={{ background: 'var(--tileBg)', border: '1px solid var(--bord)', borderRadius: '14px', padding: '12px 14px', boxShadow: 'inset 0 1px 0 var(--hi)' }}>
                  <div style={{ fontSize: '12px', color: 'var(--tx2)', fontWeight: 500 }}>{t.label}</div>
                  <div style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums', marginTop: '4px' }}>{t.value}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ fontSize: '12px', color: 'var(--tx2)', fontWeight: 500 }}>Views · live</div>
                <div style={{ fontSize: '12px', color: 'var(--green)', fontWeight: 600 }}>+{ticker.toLocaleString('en-US')} today ↑</div>
              </div>
              <svg viewBox="0 0 400 80" style={{ width: '100%', height: '62px', display: 'block' }} preserveAspectRatio="none">
                <defs>
                  <linearGradient id="fillGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={chartFill} fill="url(#fillGrad)" stroke="none" />
                <path d={chartLine} fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
                <circle cx="400" cy={chartDotY} r="4" fill="var(--accent)" />
              </svg>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ fontSize: '12px', color: 'var(--tx2)', width: '96px', flexShrink: 0 }}>Engagement</div>
                <div style={{ flex: 1, height: '6px', background: 'var(--track)', borderRadius: '999px', overflow: 'hidden' }}><div style={{ width: '82%', height: '100%', background: 'var(--barGrad)', borderRadius: '999px', transformOrigin: 'left', animation: 'barGrow 1.2s .5s cubic-bezier(.4,0,.2,1) both' }} /></div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--tx)', width: '40px', textAlign: 'right' }}>8.0%</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ fontSize: '12px', color: 'var(--tx2)', width: '96px', flexShrink: 0 }}>Non-followers</div>
                <div style={{ flex: 1, height: '6px', background: 'var(--track)', borderRadius: '999px', overflow: 'hidden' }}><div style={{ width: '92%', height: '100%', background: 'linear-gradient(90deg, #2bb04f, #6fd48c)', borderRadius: '999px', transformOrigin: 'left', animation: 'barGrow 1.2s .7s cubic-bezier(.4,0,.2,1) both' }} /></div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--tx)', width: '40px', textAlign: 'right' }}>92%</div>
              </div>
            </div>
          </div>

          {/* screenshot marquee */}
          <div style={{ overflow: 'hidden', marginTop: '4px', padding: '32px 0 30px', WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)', maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)' }}>
            <div ref={trackRef} style={{ display: 'flex', width: 'max-content', gap: '18px', animation: 'marquee 36s linear infinite' }}>
              {[...SCREENS, ...SCREENS].map((s, idx) => (
                <div key={idx} style={{ animation: `bob ${BOB[idx % SCREENS.length]} ease-in-out infinite` }}>
                  <div data-card style={{ width: '150px', aspectRatio: '9 / 16', borderRadius: '16px', overflow: 'hidden', border: '3px solid var(--bordShot)', background: 'var(--shotBg)', boxShadow: 'inset 0 1px 0 var(--hi), 0 16px 40px rgba(50,55,70,0.35)' }}>
                    <img src={s.src} alt={s.alt} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} loading="lazy" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

function SocialIcon({ label, handle }: { label: string; handle: string }) {
  if (label === 'TikTok')
    return <svg width="15" height="15" viewBox="0 0 24 24" fill="var(--tx)"><path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" /></svg>
  if (label === 'Instagram')
    return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c13584" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
  if (label === 'Threads')
    return <span style={{ width: '16px', height: '16px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', fontWeight: 700, color: 'var(--tx)' }}>@</span>
  // YouTube (CiptaDev + BolaAja)
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.92 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg>
}
