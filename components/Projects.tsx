'use client'
import { useEffect } from 'react'

const PROJECTS = [
  {
    idx: '// project_01',
    lang: 'Next.js',
    title: 'SatuOIKN — Superapp',
    desc: 'An SSO-based superapp that unifies every public service in Indonesia’s new capital behind a single sign-on — one door, one identity, every service in Nusantara.',
    tech: 'SSO · Superapp · Next.js',
    href: 'https://satuoikn.kotacerdas.id',
  },
  {
    idx: '// project_02',
    lang: 'Go',
    title: 'Smart Metering',
    desc: 'Smart meters that read directly from field sensors and stream to a dashboard, monitoring water and electricity usage across civil-servant (ASN) housing in real time.',
    tech: 'Go · IoT · Realtime',
    href: 'https://github.com/ciptacoding',
  },
  {
    idx: '// project_03',
    lang: 'Laravel',
    title: 'Nusantara Cultural Center Competition',
    desc: 'A competition platform for architects to submit their designs — running the full contest online, from registration and submission through jury review to the winner announcement.',
    tech: 'Laravel · MySQL · Web',
    href: 'https://github.com/ciptacoding',
  },
  {
    idx: '// project_04',
    lang: 'TypeScript',
    title: 'Panic Button',
    desc: 'An emergency alert system wired to the OIKN command center — GPS-tagged incidents from the field trigger an instant on-screen alert and an audible alarm in the command room.',
    tech: 'GPS · WebSocket · Alerts',
    href: 'https://github.com/ciptacoding',
  },
]

export default function Projects() {
  // 3D tilt effect on cards
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>('.tilt')
    const cleanups: (() => void)[] = []

    cards.forEach((card) => {
      const onMove = (e: MouseEvent) => {
        const r = card.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width
        const py = (e.clientY - r.top) / r.height
        const rx = (py - 0.5) * -10
        const ry = (px - 0.5) * 12
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`
        card.style.setProperty('--mx', `${px * 100}%`)
        card.style.setProperty('--my', `${py * 100}%`)
      }
      const onLeave = () => { card.style.transform = '' }
      card.addEventListener('mousemove', onMove)
      card.addEventListener('mouseleave', onLeave)
      cleanups.push(() => {
        card.removeEventListener('mousemove', onMove)
        card.removeEventListener('mouseleave', onLeave)
      })
    })

    return () => cleanups.forEach((fn) => fn())
  }, [])

  return (
    <section id="projects" aria-labelledby="projects-title">
      <div className="section-num reveal">04 — Selected Work</div>
      <h2 id="projects-title" className="section-title reveal" data-delay="1">
        Things I&apos;ve built.
      </h2>
      <p className="section-sub reveal" data-delay="2">
        Four projects that show how I think about systems — simple on the surface, solid
        underneath.
      </p>

      <div className="projects">
        {PROJECTS.map((p, i) => (
          <a
            key={p.title}
            className="card reveal tilt"
            data-delay={String(i + 1)}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${p.title} — ${p.tech}`}
          >
            <div className="idx">
              <span>{p.idx}</span>
              <span className="lang">{p.lang}</span>
            </div>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            <div className="tech-line">{p.tech}</div>
            <div className="arrow" aria-hidden="true">→</div>
          </a>
        ))}
      </div>
    </section>
  )
}
