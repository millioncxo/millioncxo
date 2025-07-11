'use client'

import { useState, useEffect } from 'react'

interface FlippingTextProps {
  words: string[]
  className?: string
  interval?: number
}

export default function FlippingText({ words, className = '', interval = 2000 }: FlippingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (words.length <= 1) return

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length)
    }, interval)

    return () => clearInterval(timer)
  }, [words, interval])

  return (
    <span 
      className={`inline-block ${className}`}
      style={{ 
        minWidth: 'fit-content',
        maxWidth: '100%',
        textAlign: 'left',
        display: 'inline-block',
        height: 'auto',
        wordBreak: 'break-word'
      }}
    >
      <span
        className={`block flipping-text-glow ${className}`}
        key={currentIndex}
        style={{
          animation: 'fadeInUp 0.5s ease-out',
          opacity: 1,
          transform: 'translateY(0)',
          display: 'block',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          transformStyle: 'preserve-3d'
        }}
      >
        {words[currentIndex]}
      </span>
    </span>
  )
} 