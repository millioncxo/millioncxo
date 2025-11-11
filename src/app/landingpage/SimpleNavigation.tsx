'use client'

import Link from 'next/link'
import LogoComponent from '@/components/LogoComponent'

export default function SimpleNavigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[60] bg-imperial-emerald h-8 sm:h-10 md:h-12" data-simple-nav>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-8 sm:h-10 md:h-12">
          {/* Logo + Name */}
          <Link href="/" className="flex items-center space-x-2 group transition-all duration-300 hover:scale-105">
            <LogoComponent width={32} height={20} hoverGradient={true} className="sm:w-[40px] sm:h-[24px] md:w-[48px] md:h-[32px]" />
            <div className="flex flex-col justify-center">
              <span className="text-xs sm:text-sm md:text-lg font-bold text-ivory-silk group-hover:text-golden-opal transition-all duration-300">
                millionCXO
              </span>
              <span className="text-[8px] sm:text-[10px] text-muted-jade group-hover:text-golden-opal/80 transition-all duration-300 -mt-0.5 hidden sm:block">
                B2B Outreach Excellence
              </span>
            </div>
          </Link>

          {/* Book a Demo Button */}
          <div>
            <Link 
              href="https://calendly.com/millioncxo/loe-20x" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-primary !px-4 !py-1.5 text-sm"
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).gtag) {
                  (window as any).gtag('event', 'conversion', {
                    'send_to': 'AW-17718087441'
                  });
                }
              }}
            >
              Book a Demo
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

