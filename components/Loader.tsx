'use client'
import { useEffect, useState } from 'react'

export default function Loader() {
  const [gone, setGone] = useState(false)
  const [unmounted, setUnmounted] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setGone(true), 1100)
    const removeTimer = setTimeout(() => setUnmounted(true), 1800)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  if (unmounted) return null

  return (
    <div id="loader" className={gone ? 'gone' : ''}>
      <div className="loader-inner">
        <div className="loader-ring" />
        <div className="loader-text">Initializing System</div>
        <div className="loader-bar" />
      </div>
    </div>
  )
}
