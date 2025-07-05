import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-imperial-emerald text-ivory-silk py-12 border-t border-muted-jade/20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-golden-opal">millionCXO</h3>
            <p className="text-muted-jade text-sm">
              Connecting B2B companies with decision-makers through strategic outreach and proven methodologies.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-golden-opal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-muted-jade">hello@millioncxo.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-golden-opal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-muted-jade">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-golden-opal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-muted-jade">24-hour response time</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <nav className="space-y-2 text-sm">
              <Link href="/" className="block text-muted-jade hover:text-golden-opal transition-colors">
                Home
              </Link>
              <Link href="/about" className="block text-muted-jade hover:text-golden-opal transition-colors">
                About
              </Link>
              <Link href="/services" className="block text-muted-jade hover:text-golden-opal transition-colors">
                Services
              </Link>
              <Link href="/contact" className="block text-muted-jade hover:text-golden-opal transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Services</h4>
            <div className="space-y-2 text-sm">
              <div className="text-muted-jade">Lead Generation</div>
              <div className="text-muted-jade">Outbound Strategy</div>
              <div className="text-muted-jade">Sales Consulting</div>
              <div className="text-muted-jade">CRM Management</div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-muted-jade/20 text-center">
          <p className="text-muted-jade text-sm">
            © 2024 millionCXO. All rights reserved. | Connecting businesses with decision-makers worldwide.
          </p>
        </div>
      </div>
    </footer>
  )
} 