'use client'




import { useEffect, useRef, useState, useCallback } from 'react'

interface CounterAnimationProps {
  end: number
  duration?: number
  className?: string
  prefix?: string
  suffix?: string
  startOnView?: boolean
  decimals?: number
}

const CounterAnimation: React.FC<CounterAnimationProps> = ({ 
  end, 
  duration = 2000, 
  className = '', 
  prefix = '', 
  suffix = '', 
  startOnView = true,
  decimals = 0
}) => {
  const [count, setCount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const counterRef = useRef<HTMLDivElement>(null)

  const animateCounter = useCallback(() => {
    if (isAnimating) return
    
    setIsAnimating(true)
    const startTime = Date.now()
    const startValue = 0
    const endValue = end

    const updateCounter = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = startValue + (endValue - startValue) * easeOutQuart
      
      setCount(currentValue)
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter)
      } else {
        setCount(endValue)
        setIsAnimating(false)
      }
    }
    
    requestAnimationFrame(updateCounter)
  }, [isAnimating, end, duration])

  useEffect(() => {
    if (!startOnView) {
      animateCounter()
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isAnimating) {
            animateCounter()
          }
        })
      },
      { threshold: 0.5 }
    )

    const currentRef = counterRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [startOnView, isAnimating, animateCounter])

  const formatNumber = (num: number) => {
    if (decimals > 0) {
      return num.toFixed(decimals)
    }
    return Math.floor(num).toLocaleString()
  }

  return (
    <div ref={counterRef} className={`counter-luxury ${className}`}>
      {prefix}{formatNumber(count)}{suffix}
    </div>
  )
}

export default CounterAnimation 