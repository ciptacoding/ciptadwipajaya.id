'use client'
import { useEffect, useState } from 'react'

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Work' },
  { href: '#projects', label: 'Projects' },
  { href: '#stack', label: 'Stack' },
]

const WA_URL =
  'https://wa.me/6285858038176?text=Hi%20Cipta%2C%20I%27d%20like%20to%20get%20in%20touch.'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.querySelector<HTMLElement>(l.href))

    function update() {
      setScrolled(window.scrollY > 40)
      const y = window.scrollY + 120
      let active = 0
      sections.forEach((s, i) => {
        if (s && s.offsetTop <= y) active = i
      })
      setActiveIdx(active)
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  // Lock background scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Close the mobile menu on Escape
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <nav className={`top${scrolled ? ' scrolled' : ''}`}>
      <div className="brand">
        <span className="dot" aria-hidden="true" />
        cipta.dev
      </div>

      <div className="nav-links" role="navigation" aria-label="Main navigation">
        {NAV_LINKS.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            className={activeIdx === i ? 'active' : ''}
            aria-current={activeIdx === i ? 'page' : undefined}
          >
            {link.label}
          </a>
        ))}
      </div>

      <a
        className="cta"
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact Cipta Dwipajaya on WhatsApp"
      >
        Get in touch
      </a>

      <button
        className={`nav-toggle${menuOpen ? ' open' : ''}`}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        onClick={() => setMenuOpen((v) => !v)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>

      <div
        id="mobile-menu"
        className={`mobile-menu${menuOpen ? ' open' : ''}`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        {NAV_LINKS.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            className={activeIdx === i ? 'active' : ''}
            aria-current={activeIdx === i ? 'page' : undefined}
            onClick={() => setMenuOpen(false)}
          >
            <span className="mm-num" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            {link.label}
          </a>
        ))}
        <a
          className="mm-cta"
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMenuOpen(false)}
        >
          Get in touch ↗
        </a>
      </div>
    </nav>
  )
}
