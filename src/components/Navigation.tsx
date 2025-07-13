'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import LogoComponent from './LogoComponent'

export default function Navigation() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const navItems = [
    { 
      href: '/', 
      label: 'Home',
      dropdown: {
        title: "Welcome to millionCXO",
        description: "Your gateway to B2B outreach excellence",
        sections: [
          {
            title: "Overview",
            items: [
              { href: '/', label: 'Home', desc: 'Discover our B2B outreach solutions' },
              { href: '/#services', label: 'Services Preview', desc: 'Quick look at our offerings' },
              { href: '/#results', label: 'Proven Results', desc: '118k+ discovery calls delivered' }
            ]
          },
          {
            title: "Get Started",
            items: [
              { href: 'https://outlook.office.com/book/BookYourDiscoveryCall@millioncxo.com/s/3nnbUYEr9E28OGQwzgOAUQ2?ismsaljsauthenabled', label: 'Request Demo', desc: 'See our platform in action' },
              { href: 'https://outlook.office.com/book/BookYourDiscoveryCall@millioncxo.com/s/3nnbUYEr9E28OGQwzgOAUQ2?ismsaljsauthenabled', label: 'Free Consultation', desc: 'Discuss your outreach needs' }
            ]
          }
        ]
      }
    },
    { 
      href: '/about', 
      label: 'Company',
      dropdown: {
        title: "About millionCXO",
        description: "12+ years of B2B outreach excellence",
        sections: [
          {
            title: "Our Story",
            items: [
              { href: '/about', label: 'Company Overview', desc: 'Journey since 2012' },
              { href: '/about#mission', label: 'Mission & Vision', desc: 'Connecting businesses' },
              { href: '/about#team', label: 'Our Team', desc: '70+ expert professionals' }
            ]
          },
          {
            title: "Track Record",
            items: [
              { href: '/about#stats', label: 'Company Stats', desc: '27+ clients served' },
              { href: '/about#experience', label: 'Experience', desc: '12+ years in B2B' }
            ]
          }
        ]
      }
    },
    { 
      href: '/services', 
      label: 'Our Services',
      dropdown: {
        title: "B2B Outreach Solutions",
        description: "Scalable, reliable, human-driven outreach",
        sections: [
          {
            title: "Outreach Services",
            items: [
              { href: '/services#pilot', label: 'Pilot Program', desc: '$99/meeting - 12 qualified CXO meetings' },
              { href: '/services#sdr', label: 'SDR as a Service', desc: '$1,999/month - Dedicated full-time SDR' },
              { href: '/services#consultation', label: 'Consultation & Infrastructure', desc: 'Complete CRM & outreach setup' }
            ]
          },
          {
            title: "Consultation",
            items: [
              { href: '/services#strategy', label: 'Strategy Design', desc: 'Complete lead generation strategy' },
              { href: '/services#training', label: 'Team Training', desc: 'Outbound best practices' }
            ]
          }
        ]
      }
    },
    {
      href: '/contact',
      label: 'Contact',
      dropdown: {
        title: "Get In Touch",
        sections: [
          {
            title: "Start Your Journey",
            items: [
              { href: '/contact#demo', label: 'Request Demo', desc: 'See our platform in action' },
              { href: '/contact#consultation', label: 'Free Consultation', desc: 'Discuss your specific needs' },
              { href: '/contact#quote', label: 'Get Custom Quote', desc: 'Tailored pricing for your business' }
            ]
          }
        ]
      }
    }
  ]

  const handleDropdownEnter = (label: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    setActiveDropdown(label)
  }

  const handleDropdownLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 200)
  }

  const handleDropdownStay = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
  }

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-imperial-emerald backdrop-blur-md border-b border-golden-opal/20 shadow-lg">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Name */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group transition-all duration-300 hover:scale-105">
            <LogoComponent width={60} height={36} hoverGradient={true} className="sm:w-[80px] sm:h-[44px]" />
            <div className="flex flex-col">
              <span className="text-lg sm:text-2xl font-bold text-ivory-silk group-hover:text-golden-opal transition-all duration-300">
                millionCXO
              </span>
              <span className="text-xs text-muted-jade group-hover:text-golden-opal/80 transition-all duration-300 -mt-1 hidden sm:block">
                B2B Outreach Excellence
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => handleDropdownEnter(item.label)}
                onMouseLeave={handleDropdownLeave}
              >
                <Link
                  href={item.href}
                  className={`nav-link font-medium text-sm transition-all duration-300 flex items-center ${
                    pathname === item.href
                      ? 'text-golden-opal' 
                      : 'text-ivory-silk hover:text-golden-opal'
                  }`}
                >
                  {item.label}
                  <svg className="ml-1 w-4 h-4 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                       style={{ transform: activeDropdown === item.label ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
                
                {/* Enhanced Mega Menu Dropdown */}
                {activeDropdown === item.label && (
                  <div 
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-[90vw] max-w-[700px] bg-ivory-silk rounded-2xl shadow-2xl border border-golden-opal/20 overflow-hidden animate-slide-down"
                    onMouseEnter={handleDropdownStay}
                    onMouseLeave={handleDropdownLeave}
                  >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-imperial-emerald to-petrol-smoke p-6">
                      <h3 className="text-xl font-bold text-ivory-silk mb-2">{item.dropdown.title}</h3>
                      <p className="text-muted-jade text-sm">{item.dropdown.description}</p>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        {item.dropdown.sections.map((section, sectionIndex) => (
                          <div key={sectionIndex} className="space-y-3">
                            <h4 className="text-sm font-semibold text-golden-opal border-b border-golden-opal/20 pb-2">
                              {section.title}
                            </h4>
                            <ul className="space-y-2">
                              {section.items.map((subItem, subIndex) => (
                                <li key={subIndex}>
                                  <Link 
                                    href={subItem.href}
                                    className="block p-3 rounded-lg hover:bg-golden-opal/10 transition-all duration-300 group"
                                  >
                                    <div className="text-sm font-medium text-onyx-black group-hover:text-golden-opal">
                                      {subItem.label}
                                    </div>
                                    <div className="text-xs text-muted-jade mt-1">
                                      {subItem.desc}
                                    </div>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link href="https://outlook.office.com/book/BookYourDiscoveryCall@millioncxo.com/s/3nnbUYEr9E28OGQwzgOAUQ2?ismsaljsauthenabled" className="btn-primary px-6 py-2 text-sm">
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-golden-opal/10 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6 text-ivory-silk" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-imperial-emerald border-t border-golden-opal/20">
          <div className="container mx-auto px-6 py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-lg font-medium transition-colors ${
                    pathname === item.href
                      ? 'text-golden-opal'
                      : 'text-ivory-silk hover:text-golden-opal'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link href="https://outlook.office.com/book/BookYourDiscoveryCall@millioncxo.com/s/3nnbUYEr9E28OGQwzgOAUQ2?ismsaljsauthenabled" className="btn-primary mt-4">
                Get Started
              </Link>
            </nav>
          </div>
        </div>
      )}
    </nav>
  )
} 