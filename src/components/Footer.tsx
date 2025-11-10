import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-imperial-emerald text-ivory-silk py-12 border-t border-muted-jade/20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-golden-opal">millionCXO</h3>
            <p className="text-muted-jade text-sm mb-2">
              Human‑led LinkedIn outreach that delivers real CXO conversations.
            </p>
            <p className="text-golden-opal text-xs font-semibold">
              Human‑Driven Personalised Outreach
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
                <a href="mailto:info@millioncxo.com" className="text-muted-jade hover:text-golden-opal transition-colors">info@millioncxo.com</a>
              </div>

              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-golden-opal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <Link href="https://outlook.office.com/book/BookYourDiscoveryCall@millioncxo.com/s/3nnbUYEr9E28OGQwzgOAUQ2?ismsaljsauthenabled" target="_blank" rel="noopener noreferrer" className="text-muted-jade hover:text-golden-opal transition-colors">Book a Demo Call</Link>
              </div>
              <div className="flex items-center space-x-2">
                <a href="https://www.linkedin.com/company/millioncxo" target="_blank" rel="noopener noreferrer" className="text-muted-jade hover:text-golden-opal transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/company/millioncxo" target="_blank" rel="noopener noreferrer" className="text-muted-jade hover:text-golden-opal transition-colors">
                  LinkedIn
                </a>
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