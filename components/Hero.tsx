'use client'
import { useEffect, useRef } from 'react'

const ROLES = [
  'GovTech Engineer.',
  'Full-Stack Developer.',
  'AI Integration.',
  'Backend Developer.',
  'Systems for Nusantara.',
  'Frontend Developer'
]

export default function Hero() {
  const typerRef = useRef<HTMLDivElement>(null)
  const photoWrapRef = useRef<HTMLDivElement>(null)
  const photoInnerRef = useRef<HTMLDivElement>(null)
  const heroNameRef = useRef<HTMLHeadingElement>(null)
  const heroTaglineRef = useRef<HTMLParagraphElement>(null)
  const heroGridRef = useRef<HTMLDivElement>(null)

  // Typewriter
  useEffect(() => {
    const target = typerRef.current
    if (!target) return
    const cursor = target.querySelector<HTMLSpanElement>('.type-cursor')
    if (!cursor) return

    let wi = 0, ci = 0, deleting = false
    let timerId: ReturnType<typeof setTimeout>

    function tick() {
      const word = ROLES[wi]
      let textNode = target!.firstChild as Text | null
      if (!textNode || textNode.nodeType !== Node.TEXT_NODE) {
        textNode = document.createTextNode('')
        target!.insertBefore(textNode, cursor)
      }
      if (!deleting) {
        ci++
        textNode.nodeValue = word.slice(0, ci)
        if (ci === word.length) {
          deleting = true
          timerId = setTimeout(tick, 1800)
          return
        }
      } else {
        ci--
        textNode.nodeValue = word.slice(0, ci)
        if (ci === 0) {
          deleting = false
          wi = (wi + 1) % ROLES.length
        }
      }
      timerId = setTimeout(tick, deleting ? 35 : 70)
    }

    timerId = setTimeout(tick, 1600)
    return () => clearTimeout(timerId)
  }, [])

  // Parallax on scroll
  useEffect(() => {
    const grid = heroGridRef.current
    const name = heroNameRef.current
    const tagline = heroTaglineRef.current
    if (!grid || !name || !tagline) return

    function onScroll() {
      const y = window.scrollY
      if (y > window.innerHeight) return
      name!.style.transform = `translateY(${y * 0.18}px)`
      tagline!.style.transform = `translateY(${y * 0.10}px)`
      grid!.style.opacity = String(1 - y / (window.innerHeight * 0.8))
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 3D photo tilt
  useEffect(() => {
    const wrap = photoWrapRef.current
    const inner = photoInnerRef.current
    if (!wrap || !inner) return

    let targetRX = -8, targetRY = 14
    let rx = targetRX, ry = targetRY
    let hovering = false
    let t = 0
    let rafId: number

    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      targetRX = (py - 0.5) * -22
      targetRY = (px - 0.5) * 28
      hovering = true
    }
    const onLeave = () => { hovering = false }

    function tick() {
      t += 0.018
      if (!hovering) {
        targetRX = -6 + Math.sin(t) * 4
        targetRY = 12 + Math.cos(t * 0.8) * 5
      }
      rx += (targetRX - rx) * 0.08
      ry += (targetRY - ry) * 0.08
      inner!.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`
      rafId = requestAnimationFrame(tick)
    }

    wrap.addEventListener('mousemove', onMove)
    wrap.addEventListener('mouseleave', onLeave)
    tick()

    return () => {
      wrap.removeEventListener('mousemove', onMove)
      wrap.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section id="hero">
      <div ref={heroGridRef} className="hero-grid">
        {/* Left: text */}
        <div className="hero-left">
          <div className="hero-tag" aria-label="Current role">
            Otorita Ibu Kota Nusantara · Software Engineer
          </div>

          <h1 ref={heroNameRef} className="hero-name">
            <span className="glitch" data-text="Cipta">Cipta</span>
            <br />
            <span className="glitch" data-text="Dwipajaya.">Dwipajaya.</span>
          </h1>

          <div ref={typerRef} className="hero-role" aria-label="Current title">
            <span className="type-cursor" aria-hidden="true" />
          </div>

          <p ref={heroTaglineRef} className="hero-tagline">
            Building the <strong>digital foundation</strong> of Indonesia&apos;s future capital
            — full-stack systems, automation pipelines, and quietly resilient services that
            scale with a city.
          </p>

          <div className="hero-meta" aria-label="Personal info">
            <div><strong>Location</strong>Nusantara, Indonesia</div>
            <div><strong>Origin</strong>Bali, Indonesia</div>
            <div><strong>Focus</strong>GovTech · Full-Stack</div>
            <div><strong>Since</strong>2021</div>
          </div>
        </div>

        {/* Right: 3D photo */}
        <div ref={photoWrapRef} className="photo-3d" aria-label="Photo placeholder">
          <div ref={photoInnerRef} className="photo-inner">
            <div className="photo-shadow two" aria-hidden="true" />
            <div className="photo-shadow" aria-hidden="true" />
            <div className="photo-frame">
              <span className="corner tl" aria-hidden="true" />
              <span className="corner tr" aria-hidden="true" />
              <span className="corner bl" aria-hidden="true" />
              <span className="corner br" aria-hidden="true" />
              <div className="photo-tagcorner" aria-hidden="true">// portrait_01</div>
              <div className="photo-glyph" aria-hidden="true">CD</div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/cipta.png"
                alt="Cipta Dwipajaya"
                className="photo-portrait"
                draggable={false}
              />
              <div className="photo-tint" aria-hidden="true" />
              <div className="photo-label" aria-hidden="true">
                <span className="pin">cipta dwipajaya</span>
                <span>4 : 5</span>
              </div>
            </div>
            <div className="photo-orbit" aria-hidden="true">online</div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="stats" id="stats" aria-label="Key stats">
        <div className="stat">
          <div className="num" data-target="100">
            <span className="suffix">+</span>0
          </div>
          <div className="label">Projects Contributed</div>
        </div>
        <div className="stat">
          <div className="num" data-target="75">
            <span className="suffix">+</span>0
          </div>
          <div className="label">Clients Served</div>
        </div>
        <div className="stat">
          <div className="num" data-target="5">
            <span className="suffix">+ yrs</span>0
          </div>
          <div className="label">Years Experience</div>
        </div>
        <div className="stat">
          <div className="num" data-target="10">
            <span className="suffix">+</span>0
          </div>
          <div className="label">Tech in Stack</div>
        </div>
      </div>

      <div className="hero-status" aria-hidden="true">SYS · Online · 00°.46′N / 116°.91′E</div>
      <div className="scroll-cue" aria-hidden="true">
        Scroll
        <div className="line" />
      </div>
    </section>
  )
}
