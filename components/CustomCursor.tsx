'use client'
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx
    let ry = my
    let rafId: number

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
    }

    function tick() {
      rx += (mx - rx) * 0.18
      ry += (my - ry) * 0.18
      dot!.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`
      ring!.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`
      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    tick()

    const addHover = (el: Element) => {
      el.addEventListener('mouseenter', () => ring!.classList.add('is-hover'))
      el.addEventListener('mouseleave', () => ring!.classList.remove('is-hover'))
    }

    // Observe for dynamically added elements
    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, .chip, .card').forEach(addHover)
    })
    document.querySelectorAll('a, button, .chip, .card').forEach(addHover)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  )
}
