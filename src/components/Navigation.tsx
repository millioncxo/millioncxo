'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'

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
            title: "🏠 Overview",
            items: [
              { href: '/', label: 'Home', desc: 'Discover our B2B outreach solutions' },
              { href: '/#services', label: 'Services Preview', desc: 'Quick look at our offerings' },
              { href: '/#results', label: 'Proven Results', desc: '1.9M+ discovery calls delivered' }
            ]
          },
          {
            title: "🚀 Get Started",
            items: [
              { href: '/contact', label: 'Request Demo', desc: 'See our platform in action' },
              { href: '/contact', label: 'Free Consultation', desc: 'Discuss your outreach needs' }
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
        description: "13+ years of B2B outreach excellence",
        sections: [
          {
            title: "🏢 Our Story",
            items: [
              { href: '/about', label: 'Company Overview', desc: 'Journey since 2012' },
              { href: '/about#mission', label: 'Mission & Vision', desc: 'Connecting businesses' },
              { href: '/about#team', label: 'Our Team', desc: '70+ expert professionals' }
            ]
          },
          {
            title: "📊 Track Record",
            items: [
              { href: '/about#stats', label: 'Company Stats', desc: '600+ clients served' },
              { href: '/about#experience', label: 'Experience', desc: '13+ years in B2B' }
            ]
          },
          {
            title: "📞 Connect",
            items: [
              { href: '/contact', label: 'Contact Us', desc: 'Get in touch' },
              { href: 'mailto:info@millioncxo.com', label: 'Email Direct', desc: 'info@millioncxo.com' }
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
            title: "🎯 Outreach Services",
            items: [
              { href: '/services#starter', label: 'Starter Package', desc: '$99/meeting - Perfect for pilots' },
              { href: '/services#sdr', label: 'SDR as a Service', desc: '$1,999-$2,250/month - Full SDR team' },
              { href: '/services#enterprise', label: 'Enterprise Solutions', desc: 'Custom outbound engines' }
            ]
          },
          {
            title: "💡 Consultation",
            items: [
              { href: '/services#strategy', label: 'Strategy Design', desc: 'Complete lead generation strategy' },
              { href: '/services#training', label: 'Team Training', desc: 'Outbound best practices' },
              { href: '/services#infrastructure', label: 'Infrastructure Setup', desc: 'Sales engine optimization' }
            ]
          },
          {
            title: "🏆 Results",
            items: [
              { href: '/services#process', label: 'Our Process', desc: '4-step proven methodology' },
              { href: '/services#success', label: 'Success Stories', desc: 'Client testimonials & case studies' }
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
        description: "Ready to transform your outreach?",
        sections: [
          {
            title: "🚀 Start Your Journey",
            items: [
              { href: '/contact#demo', label: 'Request Demo', desc: 'See our platform in action' },
              { href: '/contact#consultation', label: 'Free Consultation', desc: 'Discuss your specific needs' },
              { href: '/contact#quote', label: 'Get Custom Quote', desc: 'Tailored pricing for your business' }
            ]
          },
          {
            title: "📞 Direct Contact",
            items: [
              { href: 'mailto:info@millioncxo.com', label: 'Email Us', desc: 'info@millioncxo.com' },
              { href: '/contact#form', label: 'Contact Form', desc: 'Detailed inquiry form' },
              { href: '/contact#support', label: 'Support', desc: 'Technical and sales support' }
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
    }, 200) // 200ms delay before closing
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-luxury-pure-white/95 backdrop-blur-md border-b border-luxury-gold/10 shadow-subtle">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-luxury font-bold text-luxury-deep-black hover:text-luxury-gold transition-all duration-300">
            million<span className="text-luxury-gradient">CXO</span>
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
                  className={`font-luxury-sans font-medium text-sm transition-all duration-300 hover:text-luxury-gold relative flex items-center ${
                    pathname === item.href
                      ? 'text-luxury-gold' 
                      : 'text-luxury-deep-black hover:text-luxury-gold'
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
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-[800px] bg-luxury-pure-white rounded-2xl shadow-2xl border border-luxury-gold/20 overflow-hidden animate-slide-down"
                    onMouseEnter={handleDropdownStay}
                    onMouseLeave={handleDropdownLeave}
                  >
                    {/* Animated Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-luxury-cream/50 to-luxury-pure-white opacity-0 animate-fade-in"></div>
                    
                    {/* Header with Enhanced Design */}
                    <div className="relative bg-gradient-to-r from-luxury-cream to-luxury-pure-white p-6 border-b border-luxury-gold/10">
                      <div className="text-center">
                        <h3 className="text-xl font-luxury font-bold text-luxury-deep-black mb-2 animate-slide-up">
                          {item.dropdown.title}
                        </h3>
                        <p className="text-sm text-luxury-charcoal font-luxury-sans animate-slide-up">
                          {item.dropdown.description}
                        </p>
                      </div>
                    </div>

                    {/* Content Grid - Horizontal Layout */}
                    <div className="relative p-6">
                      <div className="grid grid-cols-3 gap-8">
                        {item.dropdown.sections.map((section, sectionIndex) => (
                          <div key={sectionIndex} className="animate-scale-in" style={{ animationDelay: `${sectionIndex * 100}ms` }}>
                            <div className="mb-4 p-3 bg-gradient-to-r from-luxury-gold/10 to-transparent rounded-lg">
                              <h4 className="text-sm font-luxury font-bold text-luxury-gold">
                                {section.title}
                              </h4>
                            </div>
                            <div className="space-y-3">
                              {section.items.map((subItem, itemIndex) => (
                                <Link
                                  key={itemIndex}
                                  href={subItem.href}
                                  className="block p-3 rounded-xl hover:bg-luxury-cream/50 transition-all duration-300 group hover:shadow-md transform hover:-translate-y-1"
                                >
                                  <div className="text-sm font-semibold text-luxury-deep-black group-hover:text-luxury-gold transition-colors duration-300">
                                    {subItem.label}
                                  </div>
                                  <div className="text-xs text-luxury-charcoal mt-1 group-hover:text-luxury-deep-black transition-colors duration-300">
                                    {subItem.desc}
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Bottom CTA */}
                      <div className="mt-6 pt-4 border-t border-luxury-gold/10 text-center animate-fade-in">
                        <Link
                          href="/contact"
                          className="inline-flex items-center px-6 py-2 bg-luxury-gold text-luxury-deep-black font-semibold rounded-lg hover:bg-luxury-light-gold transition-all duration-300 transform hover:scale-105"
                        >
                          <span>Get Started</span>
                          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="btn-luxury px-6 py-2 text-sm font-semibold rounded-lg hover-glow transition-all duration-300 transform hover:scale-105 font-display"
            >
              Request Demo
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden flex flex-col items-center justify-center w-6 h-6 space-y-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className={`w-5 h-0.5 bg-luxury-deep-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
            <div className={`w-5 h-0.5 bg-luxury-deep-black transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-5 h-0.5 bg-luxury-deep-black transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-luxury-pure-white/98 backdrop-blur-lg border-t border-luxury-gold/10 transition-all duration-300 ${
        isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="container mx-auto px-6 py-4 max-h-96 overflow-y-auto">
          <div className="space-y-6">
            {navItems.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className={`font-luxury-sans font-medium text-base transition-all duration-300 hover:text-luxury-gold block ${
                    pathname === item.href 
                      ? 'text-luxury-gold' 
                      : 'text-luxury-deep-black hover:text-luxury-gold'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
                
                {/* Mobile Dropdown Content */}
                <div className="mt-3 ml-4 grid grid-cols-1 gap-4">
                  {item.dropdown.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="bg-luxury-cream/30 p-3 rounded-lg">
                      <h4 className="text-sm font-luxury font-semibold text-luxury-gold mb-2">
                        {section.title}
                      </h4>
                      <div className="space-y-2">
                        {section.items.map((subItem, itemIndex) => (
                          <Link
                            key={itemIndex}
                            href={subItem.href}
                            className="block text-sm text-luxury-charcoal hover:text-luxury-gold transition-all duration-200 p-2 rounded hover:bg-luxury-cream/50"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <div className="font-medium">{subItem.label}</div>
                            <div className="text-xs text-luxury-charcoal">{subItem.desc}</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            <Link
              href="/contact"
              className="btn-luxury px-6 py-3 text-sm font-semibold rounded-lg hover-glow transition-all duration-300 transform hover:scale-105 font-display inline-block text-center mt-6"
              onClick={() => setIsMenuOpen(false)}
            >
              Request Demo
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
} 