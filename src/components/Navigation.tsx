'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import LogoComponent from './LogoComponent'

const calendlyUrl = 'https://calendly.com/millioncxooutreach/30min'

const trackCalendly = () => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', 'conversion', { send_to: 'AW-17718087441' })
  }
}

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const pathname = usePathname()
  const isLeadGenPage = pathname === '/lead-gen-executive'
  const usesDarkHeader = pathname === '/'
  const navTheme = usesDarkHeader && !hasScrolled
    ? {
        shell: 'border-ivory-silk/10 bg-[rgba(11,46,43,0.96)]',
        brand: 'text-ivory-silk hover:opacity-90',
        title: 'text-ivory-silk',
        subtitle: 'text-white/65',
        link: 'text-white/80 hover:text-golden-opal',
        cta: 'border-golden-opal/45 text-golden-opal hover:bg-golden-opal hover:text-[#1f2a1d]',
        menuButton: 'border-ivory-silk/20 text-ivory-silk hover:border-golden-opal/60',
      }
    : {
        shell: 'border-[#1f2a1d]/10 bg-[rgba(247,245,242,0.96)]',
        brand: 'text-[#1f2a1d] hover:opacity-85',
        title: 'text-[#1f2a1d]',
        subtitle: 'text-muted-jade',
        link: 'text-[#2d3a2a]/72 hover:text-[#1f2a1d]',
        cta: 'border-[#1f2a1d]/20 text-[#1f2a1d] hover:bg-[#1f2a1d] hover:text-ivory-silk',
        menuButton: 'border-[#1f2a1d]/15 text-[#1f2a1d] hover:border-[#1f2a1d]/40',
      }
  const navLinks = [
    { href: isLeadGenPage ? '/lead-gen-executive#how-it-works' : '/#model', label: 'How it works' },
    { href: '/lead-gen-executive', label: 'Lead Gen Executive' },
    { href: isLeadGenPage ? '/lead-gen-executive#pricing' : '/#pricing', label: 'Pricing' },
  ]

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  useEffect(() => {
    const updateScrollState = () => setHasScrolled(window.scrollY > 32)
    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollState)
  }, [pathname])

  return (
    <nav className={`fixed left-0 right-0 top-0 z-50 border-b backdrop-blur-xl transition-colors duration-300 ${navTheme.shell}`}>
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className={`flex items-center gap-3 transition-opacity ${navTheme.brand}`}>
          <span className="flex h-8 w-14 items-center justify-center rounded-full bg-ivory-silk shadow-sm ring-1 ring-golden-opal/20">
            <LogoComponent width={42} height={26} hoverGradient={false} variant="onLight" />
          </span>
          <div className="flex flex-col justify-center leading-none">
            <div className={`text-xs font-bold sm:text-sm md:text-lg ${navTheme.title}`}>MillionCXO</div>
            <div className={`mt-1 hidden text-[8px] font-medium sm:block sm:text-[10px] ${navTheme.subtitle}`}>
              B2B Outreach Excellence
            </div>
          </div>
        </Link>

        <div className="hidden items-center gap-4 md:flex lg:gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[12px] font-medium transition-colors lg:text-[13px] ${navTheme.link}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Link
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackCalendly}
            className={`rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors lg:text-sm ${navTheme.cta}`}
          >
            Book a strategy call
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((value) => !value)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          className={`relative flex h-10 w-10 items-center justify-center rounded-full border transition-colors md:hidden ${navTheme.menuButton}`}
        >
          <Menu
            className={`absolute h-5 w-5 transition-all duration-300 ${
              isMenuOpen ? 'rotate-90 scale-75 opacity-0' : 'rotate-0 scale-100 opacity-100'
            }`}
          />
          <X
            className={`absolute h-5 w-5 transition-all duration-300 ${
              isMenuOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-75 opacity-0'
            }`}
          />
        </button>
      </div>

      <div
        className={`fixed inset-x-0 top-12 z-50 min-h-[calc(100vh-3rem)] bg-ivory-silk px-5 py-8 shadow-2xl transition-all duration-300 md:hidden ${
          isMenuOpen ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-4 opacity-0'
        }`}
      >
        <div className="mx-auto flex max-w-md flex-col gap-1">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={`border-b border-[#1f2a1d]/10 py-5 text-xl font-normal tracking-[-0.03em] text-[#1f2a1d] transition-all duration-500 ${
                isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
              }`}
              style={{ transitionDelay: isMenuOpen ? `${120 + index * 60}ms` : '0ms' }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href={calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            setIsMenuOpen(false)
            trackCalendly()
          }}
          className={`mt-8 inline-flex w-fit rounded-full bg-[#1f2a1d] px-5 py-3 text-sm font-semibold text-white transition-all duration-500 hover:bg-[#2a3827] ${
            isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
          }`}
          style={{ transitionDelay: isMenuOpen ? '390ms' : '0ms' }}
        >
          Book a strategy call
        </Link>
      </div>
    </nav>
  )
}
