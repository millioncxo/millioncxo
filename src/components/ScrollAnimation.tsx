'use client'

import { useEffect } from 'react'

const ScrollAnimation = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const animateElement = (element: Element) => {
      element.classList.add('animate')
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateElement(entry.target)
        }
      })
    }, observerOptions)

    // Observe all elements with animate-on-scroll class
    const animateElements = document.querySelectorAll('.animate-on-scroll')
    
    // Fallback: animate elements that are already in view immediately
    animateElements.forEach((el) => {
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        // Element is in view, animate it immediately
        setTimeout(() => animateElement(el), 100)
      }
      observer.observe(el)
    })

    // Fallback timeout: ensure all animations trigger within 3 seconds
    const fallbackTimeout = setTimeout(() => {
      animateElements.forEach((el) => {
        if (!el.classList.contains('animate')) {
          animateElement(el)
        }
      })
    }, 3000)

    return () => {
      observer.disconnect()
      clearTimeout(fallbackTimeout)
    }
  }, [])

  return null
}

export default ScrollAnimation 