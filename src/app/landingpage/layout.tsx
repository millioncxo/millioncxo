'use client'

import { useEffect } from 'react'
import SimpleNavigation from './SimpleNavigation'

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Hide the root Navigation component when on landing page
    // The root nav has z-50, our SimpleNavigation has z-[60] to be on top
    // We'll hide any nav that doesn't have data-simple-nav attribute
    const hideRootNav = () => {
      const allNavs = document.querySelectorAll('nav.fixed')
      allNavs.forEach((nav) => {
        if (!nav.hasAttribute('data-simple-nav')) {
          ;(nav as HTMLElement).style.display = 'none'
        }
      })
    }

    // Hide the ChatWidget component on landing page
    const hideChatWidget = () => {
      // Find the ChatWidget by checking for fixed positioning and z-50
      const allDivs = document.querySelectorAll('div.fixed')
      allDivs.forEach((div) => {
        const classes = div.className
        if (classes.includes('bottom-5') && classes.includes('right-5') && classes.includes('z-50')) {
          ;(div as HTMLElement).style.display = 'none'
        }
      })
    }

    // Use a small delay to ensure components are rendered
    const timeoutId = setTimeout(() => {
      hideRootNav()
      hideChatWidget()
    }, 100)
    hideRootNav() // Also try immediately
    hideChatWidget() // Also try immediately

    return () => {
      clearTimeout(timeoutId)
      // Restore navigation when leaving landing page
      const allNavs = document.querySelectorAll('nav.fixed')
      allNavs.forEach((nav) => {
        if (!nav.hasAttribute('data-simple-nav')) {
          ;(nav as HTMLElement).style.display = ''
        }
      })
      // Restore chat widget when leaving landing page
      const allDivs = document.querySelectorAll('div.fixed')
      allDivs.forEach((div) => {
        const classes = div.className
        if (classes.includes('bottom-5') && classes.includes('right-5') && classes.includes('z-50')) {
          ;(div as HTMLElement).style.display = ''
        }
      })
    }
  }, [])

  return (
    <>
      <SimpleNavigation />
      {children}
    </>
  )
}

