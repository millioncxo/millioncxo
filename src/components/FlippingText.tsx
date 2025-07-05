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
        width: '380px', // Fixed width to prevent overlapping
        textAlign: 'left'
      }}
    >
      <span
        className="block flipping-text-glow"
        key={currentIndex}
        style={{
          animation: 'fadeInUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }}
      >
        {words[currentIndex]}
      </span>
    </span>
  )
} 