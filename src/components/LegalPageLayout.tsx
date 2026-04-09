'use client'

import { useEffect } from 'react'
import Link from 'next/link'

// Minimal CSS only for the dangerouslySetInnerHTML content sections
// Uses the site's actual color palette
const CONTENT_CSS = `
  .legal-content { font-size: 15px; line-height: 1.8; color: #0b0f0e; }

  .legal-content .preamble {
    background: #f0f4f2;
    border-left: 3px solid #c4b75b;
    border-radius: 0 8px 8px 0;
    padding: 20px 24px;
    margin-bottom: 36px;
    font-size: 0.93rem;
    color: #668b77;
    font-style: italic;
  }
  .legal-content .preamble strong { color: #0b2e2b; font-style: normal; }

  .legal-content .doc-section { margin-bottom: 40px; scroll-margin-top: 80px; }

  .legal-content .section-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e5e0d8;
  }
  .legal-content .section-header h2 {
    font-size: 1.15rem;
    font-weight: 700;
    color: #0b2e2b;
  }
  .legal-content .section-num { display: none; }

  .legal-content .subsection { margin: 18px 0; }
  .legal-content .subsection h3 {
    font-size: 0.82rem;
    font-weight: 700;
    color: #c4b75b;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 8px;
  }

  .legal-content p.legal {
    color: #3a4a3f;
    margin-bottom: 12px;
  }

  .legal-content ul.legal-list,
  .legal-content ol.legal-list {
    list-style: none;
    padding: 0;
    margin-bottom: 14px;
  }
  .legal-content ol.legal-list { counter-reset: lc; }
  .legal-content ol.legal-list li { counter-increment: lc; }
  .legal-content ol.legal-list li::before {
    content: counter(lc, lower-alpha) ".";
    color: #c4b75b;
    font-weight: 700;
    min-width: 22px;
    font-size: 0.82rem;
  }
  .legal-content ul.legal-list li::before {
    content: "–";
    color: #c4b75b;
    font-weight: 700;
  }
  .legal-content ol.legal-list li,
  .legal-content ul.legal-list li {
    display: flex;
    gap: 10px;
    margin-bottom: 8px;
    font-size: 0.93rem;
    color: #3a4a3f;
    line-height: 1.75;
  }

  .legal-content .definition-block {
    background: #f7f5f2;
    border: 1px solid #e5e0d8;
    border-radius: 8px;
    padding: 18px 22px;
    margin: 14px 0 18px;
  }
  .legal-content .definition-block dt {
    font-weight: 700;
    color: #0b2e2b;
    font-size: 0.88rem;
    margin-top: 14px;
    margin-bottom: 3px;
  }
  .legal-content .definition-block dt:first-child { margin-top: 0; }
  .legal-content .definition-block dd {
    margin-left: 0;
    padding-left: 14px;
    border-left: 2px solid #c4b75b;
    font-size: 0.9rem;
    color: #668b77;
    line-height: 1.65;
  }

  .legal-content .notice-box {
    background: #f0f4f2;
    border: 1px solid #668b77;
    border-radius: 8px;
    padding: 14px 18px;
    margin: 16px 0;
  }
  .legal-content .notice-box p {
    font-size: 0.87rem;
    color: #0b2e2b;
    margin: 0;
    line-height: 1.6;
  }
  .legal-content .notice-box p strong { color: #0b0f0e; }

  .legal-content .warning-box {
    background: #fdf8ec;
    border: 1px solid #c4b75b;
    border-radius: 8px;
    padding: 14px 18px;
    margin: 16px 0;
  }
  .legal-content .warning-box p {
    font-size: 0.87rem;
    color: #5a4200;
    margin: 0 0 6px;
    line-height: 1.6;
  }
  .legal-content .warning-box p:last-child { margin-bottom: 0; }
  .legal-content .warning-box p strong { color: #3a2b00; }

  .legal-content .refund-table {
    width: 100%;
    border-collapse: collapse;
    margin: 16px 0 20px;
    font-size: 0.87rem;
    border-radius: 8px;
    overflow: hidden;
  }
  .legal-content .refund-table thead tr { background: #0b2e2b; color: #f7f5f2; }
  .legal-content .refund-table thead th { padding: 11px 14px; text-align: left; font-weight: 600; }
  .legal-content .refund-table tbody tr:nth-child(even) { background: #f7f5f2; }
  .legal-content .refund-table tbody tr:nth-child(odd) { background: #ffffff; }
  .legal-content .refund-table tbody td {
    padding: 10px 14px;
    border-bottom: 1px solid #e5e0d8;
    line-height: 1.5;
    vertical-align: top;
    color: #3a4a3f;
  }
  .legal-content .refund-table tbody td:first-child { color: #0b2e2b; font-weight: 500; }
  .legal-content .eligible { color: #1a6b3c; font-weight: 700; }
  .legal-content .not-eligible { color: #8b2020; font-weight: 700; }

  .legal-content .sig-block { display: none; }

  @media (max-width: 640px) {
    .legal-content .refund-table { font-size: 0.78rem; }
    .legal-content .refund-table thead th,
    .legal-content .refund-table tbody td { padding: 8px 10px; }
  }
`

interface TocLink {
  href: string
  label: string
}

interface LegalPageLayoutProps {
  title: string
  effectiveDate: string
  lastRevised: string
  version: string
  tocItems: TocLink[]
  tocFooterLinks: TocLink[]
  contentHtml: string
}

export default function LegalPageLayout({
  title,
  effectiveDate,
  tocFooterLinks,
  contentHtml,
}: LegalPageLayoutProps) {
  useEffect(() => {
    // Smooth scroll for anchor links
    const links = document.querySelectorAll('.legal-content a[href^="#"]')
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = (link as HTMLAnchorElement).getAttribute('href')
        if (!href) return
        const target = document.querySelector(href)
        if (target) {
          e.preventDefault()
          target.scrollIntoView({ behavior: 'smooth' })
        }
      })
    })
  }, [])

  return (
    <div className="bg-ivory-silk min-h-screen">
      <style dangerouslySetInnerHTML={{ __html: CONTENT_CSS }} />

      {/* Header — matches site's emerald gradient style */}
      <section className="bg-gradient-to-br from-imperial-emerald to-petrol-smoke py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-ivory-silk mb-4">{title}</h1>
          <p className="text-muted-jade text-sm">
            Effective: {effectiveDate}
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 pb-20">

        {/* Cross-links */}
        <div className="flex flex-wrap gap-3 mb-10">
          {tocFooterLinks.filter(l => l.href !== '/').map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-semibold text-muted-jade border border-muted-jade/30 hover:border-golden-opal hover:text-golden-opal px-4 py-1.5 rounded-full transition-colors"
            >
              {link.label.replace('→ ', '')}
            </Link>
          ))}
        </div>

        {/* Legal content */}
        <div
          className="legal-content"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {/* Bottom nav */}
        <div className="mt-14 pt-8 border-t border-golden-opal/20 flex flex-wrap justify-between items-center gap-4">
          <Link href="/" className="text-sm text-muted-jade hover:text-golden-opal transition-colors">
            ← Back to Website
          </Link>
          <div className="flex gap-4">
            {tocFooterLinks.filter(l => l.href !== '/').map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-jade hover:text-golden-opal transition-colors"
              >
                {link.label.replace('→ ', '')}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
