'use client'
import { useEffect } from 'react'

// Global client-side effects that enhance server-rendered markup:
// - Scroll reveal (IntersectionObserver on .reveal elements)
// - Tech chip stagger animation
// - Stat counter count-up animation
// All of these are pure progressive enhancements; the content is visible without JS.
export default function ClientEffects() {
  useEffect(() => {
    // ---- Scroll reveal ----
    const revealIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('in')
            revealIO.unobserve(en.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    document.querySelectorAll('.reveal').forEach((el) => revealIO.observe(el))

    // ---- Chip stagger ----
    const chips = document.getElementById('chips')
    if (chips) {
      const chipsIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              chips.classList.add('in')
              Array.from(chips.children).forEach((c, i) => {
                (c as HTMLElement).style.transition =
                  `opacity 0.5s ${i * 50}ms ease, transform 0.5s ${i * 50}ms ease`
              })
              chipsIO.unobserve(chips)
            }
          })
        },
        { threshold: 0.2 }
      )
      chipsIO.observe(chips)
    }

    // ---- Stat counters ----
    const statsEl = document.getElementById('stats')
    if (statsEl) {
      const statsIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (!en.isIntersecting) return
            const nums = statsEl.querySelectorAll<HTMLElement>('.stat .num')
            nums.forEach((el, i) => {
              const target = parseInt(el.dataset.target ?? '0', 10)
              const suffixEl = el.querySelector('.suffix')
              const suffixHTML = suffixEl ? suffixEl.outerHTML : ''
              const dur = 1600 + i * 100
              const start = performance.now()
              function step(now: number) {
                const p = Math.min(1, (now - start) / dur)
                const eased = 1 - Math.pow(1 - p, 3)
                el.innerHTML = Math.round(target * eased) + suffixHTML
                if (p < 1) requestAnimationFrame(step)
              }
              requestAnimationFrame(step)
            })
            statsIO.disconnect()
          })
        },
        { threshold: 0.4 }
      )
      statsIO.observe(statsEl)
    }

    return () => {
      revealIO.disconnect()
    }
  }, [])

  return null
}
