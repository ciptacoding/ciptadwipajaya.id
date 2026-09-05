import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <main
      id="main-content"
      style={{
        minHeight: '100dvh',
        background: 'linear-gradient(135deg, #1c1d21 0%, #141519 45%, #0a0a0c 100%)',
        color: '#f5f5f7',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        textAlign: 'center',
        padding: 'clamp(24px, 6vw, 64px)',
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: 'clamp(64px, 12vw, 120px)',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          lineHeight: 1,
          background: 'linear-gradient(180deg, #ffffff 0%, rgba(150,156,168,0.88) 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        404
      </p>
      <h1 style={{ margin: 0, fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 600 }}>
        This page drifted off the map.
      </h1>
      <p style={{ margin: 0, maxWidth: '42ch', fontSize: '16px', lineHeight: 1.55, color: 'rgba(245,245,247,0.6)' }}>
        The address exists nowhere on this site. It may have moved, or it never existed.
      </p>
      <Link
        href="/"
        style={{
          marginTop: '10px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '13px 24px',
          borderRadius: '999px',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.14), rgba(255,255,255,0.05))',
          border: '1px solid rgba(255,255,255,0.25)',
          color: '#f5f5f7',
          fontSize: '15px',
          fontWeight: 600,
          textDecoration: 'none',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.16), 0 12px 32px rgba(0,0,0,0.4)',
        }}
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 11-1.06 1.06l-.72-.72V19.5a1.5 1.5 0 01-1.5 1.5h-3a1.5 1.5 0 01-1.5-1.5v-3.75h-2.25v3.75A1.5 1.5 0 019.69 21h-3a1.5 1.5 0 01-1.5-1.5v-6.63l-.72.72a.75.75 0 11-1.06-1.06l8.69-8.69z" />
        </svg>
        Back home
      </Link>
    </main>
  )
}
