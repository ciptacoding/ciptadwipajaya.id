/* eslint-disable @next/next/no-img-element */
// Plain <img>: the site is a static export, so next/image optimisation is off anyway.

import type { ReactNode } from 'react'
import ThemeToggle from '@/components/ThemeToggle'

// A link with `href: null` renders as a non-clickable "coming soon" card.
// Fill these in once the destinations are live.
const TELEGRAM_URL: string | null = null
const KREATION_URL: string | null = null // https://kreation.id, still in development
const PRODUCTS_URL = 'https://lynk.id/ciptacoding'

const WA_NUMBER = '6285858038176'
const WA_MESSAGE = 'Halo Cipta, saya ingin diskusi soal kerja sama / business inquiry.'
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`

const SOCIALS = [
  { label: 'TikTok', handle: '@ciptadwipajayaa', href: 'https://www.tiktok.com/@ciptadwipajayaa' },
  { label: 'Instagram', handle: '@ciptadwipajayaa', href: 'https://www.instagram.com/ciptadwipajayaa/' },
  { label: 'YouTube', handle: '@CiptaDev', href: 'https://www.youtube.com/@CiptaDev' },
  { label: 'Threads', handle: '@ciptadwipajayaa', href: 'https://www.threads.com/@ciptadwipajayaa' },
  { label: 'YouTube', handle: '@BolaAjaOfficial', href: 'https://www.youtube.com/@BolaAjaOfficial' },
  { label: 'GitHub', handle: 'ciptacoding', href: 'https://github.com/ciptacoding' },
  { label: 'LinkedIn', handle: 'Cipta Dwipajaya', href: 'https://linkedin.com/in/cipta-dwipajaya-9019bb231' },
] as const

type LinkItem = {
  title: string
  sub: string
  href: string | null
  icon: ReactNode
  featured?: boolean
  badge?: string
}

const LINKS: LinkItem[] = [
  {
    title: 'Komunitas Open Source & Tools AI',
    sub: 'Gabung di Telegram: berbagi tools AI, project open source, dan diskusi bareng.',
    href: TELEGRAM_URL,
    icon: <TelegramIcon />,
    featured: true,
    badge: 'Gratis',
  },
  {
    title: 'Produk Digital',
    sub: 'Semua produk digital saya di lynk.id.',
    href: PRODUCTS_URL,
    icon: <BagIcon />,
  },
  {
    title: 'Kreation.id',
    sub: 'Tempat belajar AI, dari dasar sampai bisa dipakai kerja.',
    href: KREATION_URL,
    icon: <SparkIcon />,
  },
]

export default function LinkHub() {
  return (
    <div className="hero dark" id="main-content">
      <ThemeToggle />

      {/* grid + drifting glows */}
      <div aria-hidden className="bg-grid" />
      <div aria-hidden className="bg-glow bg-glow-1" />
      <div aria-hidden className="bg-glow bg-glow-2" />

      <main className="hub">
        <header className="hub-head">
          <div className="avatar">
            <img src="/cipta.png" alt="Cipta Dwipajaya" width={363} height={454} />
          </div>
          <h1 className="hub-name">Cipta Dwipajaya</h1>
          <p className="hub-role">Software Engineer &amp; Content Creator</p>
          <p className="hub-bio">Bikin konten soal AI, automation, dan open source. Belajar bareng, bangun bareng.</p>
        </header>

        <nav className="hub-links" aria-label="Links">
          {LINKS.map((l) => <LinkCard key={l.title} {...l} />)}

          <details className="link-card link-group">
            <summary>
              <span className="link-ico"><ShareIcon /></span>
              <span className="link-body">
                <span className="link-title">Social Media</span>
                <span className="link-sub">TikTok, Instagram, YouTube, Threads, GitHub</span>
              </span>
              <span className="chev chev-down" aria-hidden>›</span>
            </summary>
            <div className="social-list">
              {SOCIALS.map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer me" className="social-link">
                  <SocialIcon label={s.label} />
                  {s.label} <span className="handle">{s.handle}</span>
                </a>
              ))}
            </div>
          </details>

          <LinkCard
            title="Business Inquiries"
            sub="Kolaborasi, endorsement, atau project. Chat via WhatsApp."
            href={WA_URL}
            icon={<WhatsAppIcon />}
          />
        </nav>

        <footer className="hub-foot">© Cipta Dwipajaya · ciptadwipajaya.id</footer>
      </main>
    </div>
  )
}

function LinkCard({ title, sub, href, icon, featured, badge }: LinkItem) {
  const cls = `link-card${featured ? ' featured' : ''}${href ? '' : ' soon'}`
  const inner = (
    <>
      <span className="link-ico">{icon}</span>
      <span className="link-body">
        <span className="link-title">
          {title}
          {href ? badge && <span className="badge">{badge}</span> : <span className="badge badge-soon">Segera hadir</span>}
        </span>
        <span className="link-sub">{sub}</span>
      </span>
      {href && <span className="chev" aria-hidden>›</span>}
    </>
  )
  if (!href) return <div className={cls} aria-disabled="true">{inner}</div>
  return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
}

function TelegramIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="#29a9eb" aria-hidden><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>
}

function BagIcon() {
  return <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
}

function SparkIcon() {
  return <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" /><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" /></svg>
}

function ShareIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="8.59" y1="10.49" x2="15.42" y2="6.51" /></svg>
}

function WhatsAppIcon() {
  return <svg width="19" height="19" viewBox="0 0 24 24" fill="#25D366" aria-hidden><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
}

function SocialIcon({ label }: { label: string }) {
  if (label === 'TikTok')
    return <svg width="15" height="15" viewBox="0 0 24 24" fill="var(--tx)" aria-hidden><path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" /></svg>
  if (label === 'Instagram')
    return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c13584" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
  if (label === 'Threads')
    return <span aria-hidden style={{ width: '16px', height: '16px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', fontWeight: 700, color: 'var(--tx)' }}>@</span>
  if (label === 'GitHub')
    return <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--tx)" aria-hidden><path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.82 1.19 3.08 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" /></svg>
  if (label === 'LinkedIn')
    return <svg width="15" height="15" viewBox="0 0 24 24" fill="#0a66c2" aria-hidden><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" /></svg>
  // YouTube (CiptaDev + BolaAja)
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.92 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg>
}
