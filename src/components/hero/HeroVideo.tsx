import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'

export const HERO_VIDEO_SRC = '/media/hero.mp4'
export const HERO_POSTER_SRC = '/media/hero-poster.jpg'

/* Full-bleed video backdrop; pauses on prefers-reduced-motion, poster covers the gap. */
export function HeroVideo() {
  const reduced = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (reduced) videoRef.current?.pause()
  }, [reduced])

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover"
      src={HERO_VIDEO_SRC}
      poster={HERO_POSTER_SRC}
      autoPlay={!reduced}
      muted
      loop
      playsInline
      preload="metadata"
      tabIndex={-1}
      aria-hidden="true"
    />
  )
}
