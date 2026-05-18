'use client'
import { useEffect, useRef } from 'react'

type Dot = { x: number; y: number; vx: number; vy: number; r: number }

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const COUNT = window.innerWidth < 768 ? 40 : 80
    const MAX_DIST = 130
    let w = 0
    let h = 0
    let dots: Dot[] = []
    const mouse = { x: -9999, y: -9999 }

    function resize() {
      const dpr = devicePixelRatio
      w = canvas!.width = window.innerWidth * dpr
      h = canvas!.height = window.innerHeight * dpr
      canvas!.style.width = window.innerWidth + 'px'
      canvas!.style.height = window.innerHeight + 'px'
      ctx.scale(dpr, dpr)
    }

    function init() {
      dots = []
      for (let i = 0; i < COUNT; i++) {
        dots.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 1.6 + 0.4,
        })
      }
    }

    let rafId: number
    function step() {
      ctx.clearRect(0, 0, w, h)
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i]
        d.x += d.vx
        d.y += d.vy
        if (d.x < 0 || d.x > window.innerWidth) d.vx *= -1
        if (d.y < 0 || d.y > window.innerHeight) d.vy *= -1

        const dx = d.x - mouse.x
        const dy = d.y - mouse.y
        const md = Math.hypot(dx, dy)
        if (md < 120 && md > 0) {
          d.x += (dx / md) * 0.6
          d.y += (dy / md) * 0.6
        }

        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(125, 211, 252, 0.7)'
        ctx.fill()

        for (let j = i + 1; j < dots.length; j++) {
          const e = dots[j]
          const dist = Math.hypot(d.x - e.x, d.y - e.y)
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.25
            ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`
            ctx.lineWidth = 0.6
            ctx.beginPath()
            ctx.moveTo(d.x, d.y)
            ctx.lineTo(e.x, e.y)
            ctx.stroke()
          }
        }
      }
      rafId = requestAnimationFrame(step)
    }

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const onResize = () => {
      resize()
      init()
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('resize', onResize)
    resize()
    init()
    step()

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return <canvas ref={canvasRef} id="particles" />
}
