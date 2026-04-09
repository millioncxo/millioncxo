'use client'

import { useEffect } from 'react'
import Link from 'next/link'

const LEGAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Serif+4:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');

  .ld-page {
    font-family: 'Source Serif 4', Georgia, serif;
    background: #fafaf7;
    color: #2a3d3d;
    font-size: 15.5px;
    line-height: 1.85;
  }
  .ld-doc-header {
    background: #003339;
    padding: 64px 0 52px;
    text-align: center;
    border-bottom: 4px solid #E8F975;
  }
  .ld-doc-type {
    display: inline-block;
    border: 1px solid #E8F975;
    color: #E8F975;
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 5px 18px;
    border-radius: 2px;
    margin-bottom: 22px;
    font-weight: 300;
  }
  .ld-doc-header h1 {
    font-family: 'Playfair Display', serif;
    font-size: 3rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 20px;
  }
  .ld-doc-meta {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 28px;
    color: rgba(255,255,255,0.5);
    font-size: 0.82rem;
    flex-wrap: wrap;
  }
  .ld-dot {
    width: 3px;
    height: 3px;
    background: #E8F975;
    border-radius: 50%;
    display: inline-block;
  }
  .ld-page-layout {
    max-width: 1100px;
    margin: 0 auto;
    padding: 56px 24px 80px;
    display: grid;
    grid-template-columns: 230px 1fr;
    gap: 52px;
    align-items: start;
  }
  .ld-toc {
    position: sticky;
    top: 78px;
  }
  .ld-toc-label {
    font-size: 0.68rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #5a7070;
    font-weight: 600;
    margin-bottom: 16px;
    padding-bottom: 10px;
    border-bottom: 1px solid #d0dada;
  }
  .ld-toc ol {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .ld-toc ol li a {
    display: block;
    padding: 5px 0 5px 12px;
    color: #5a7070;
    text-decoration: none;
    font-size: 0.82rem;
    line-height: 1.4;
    border-left: 2px solid transparent;
    transition: all 0.18s;
    margin-bottom: 2px;
  }
  .ld-toc ol li a:hover {
    color: #003339;
    border-left-color: #c8d955;
  }
  .ld-toc ol li a.active {
    color: #003339;
    border-left-color: #008E9F;
    font-weight: 600;
  }
  .ld-toc-footer {
    margin-top: 28px;
    padding-top: 20px;
    border-top: 1px solid #d0dada;
  }
  .ld-toc-footer a {
    display: block;
    font-size: 0.78rem;
    color: #008E9F;
    text-decoration: none;
    margin-bottom: 6px;
  }
  .ld-toc-footer a:hover {
    color: #003339;
  }
  .preamble {
    background: #ffffff;
    border: 1px solid #d0dada;
    border-left: 4px solid #003339;
    border-radius: 0 8px 8px 0;
    padding: 24px 28px;
    margin-bottom: 40px;
  }
  .preamble p {
    font-size: 0.92rem;
    color: #5a7070;
    line-height: 1.7;
    font-style: italic;
  }
  .preamble p strong {
    color: #003339;
    font-style: normal;
  }
  .doc-section {
    margin-bottom: 44px;
    scroll-margin-top: 88px;
  }
  .section-header {
    display: flex;
    align-items: baseline;
    gap: 14px;
    margin-bottom: 18px;
    padding-bottom: 12px;
    border-bottom: 1px solid #d0dada;
  }
  .section-num {
    font-family: 'Playfair Display', serif;
    font-size: 0.78rem;
    font-weight: 700;
    color: #008E9F;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .section-header h2 {
    font-family: 'Playfair Display', serif;
    font-size: 1.3rem;
    font-weight: 700;
    color: #003339;
  }
  .subsection {
    margin-top: 22px;
    margin-bottom: 18px;
  }
  .subsection h3 {
    font-size: 0.88rem;
    font-weight: 600;
    color: #005a65;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    margin-bottom: 8px;
  }
  p.legal {
    color: #2a3d3d;
    margin-bottom: 14px;
    text-align: justify;
    hyphens: auto;
  }
  ol.legal-list, ul.legal-list {
    list-style: none;
    padding-left: 0;
    margin-bottom: 16px;
  }
  ol.legal-list {
    counter-reset: lc;
  }
  ol.legal-list li {
    counter-increment: lc;
    display: flex;
    gap: 14px;
    margin-bottom: 10px;
    font-size: 0.94rem;
    line-height: 1.75;
  }
  ol.legal-list li::before {
    content: "(" counter(lc, lower-alpha) ")";
    color: #008E9F;
    font-weight: 600;
    white-space: nowrap;
    min-width: 26px;
    font-size: 0.85rem;
    padding-top: 2px;
  }
  ul.legal-list li {
    display: flex;
    gap: 12px;
    margin-bottom: 10px;
    font-size: 0.94rem;
    line-height: 1.75;
  }
  ul.legal-list li::before {
    content: "—";
    color: #008E9F;
    font-weight: 600;
    white-space: nowrap;
  }
  .definition-block {
    background: #ffffff;
    border: 1px solid #d0dada;
    border-radius: 6px;
    padding: 20px 24px;
    margin: 16px 0 20px;
  }
  .definition-block dt {
    font-weight: 600;
    color: #003339;
    font-size: 0.9rem;
    margin-bottom: 4px;
    margin-top: 14px;
  }
  .definition-block dt:first-child {
    margin-top: 0;
  }
  .definition-block dd {
    margin-left: 0;
    color: #2a3d3d;
    font-size: 0.92rem;
    line-height: 1.7;
    padding-left: 16px;
    border-left: 2px solid #d0dada;
  }
  .notice-box {
    background: #edf7f8;
    border: 1px solid #b0d8dc;
    border-radius: 6px;
    padding: 18px 22px;
    margin: 20px 0;
  }
  .notice-box p {
    font-size: 0.88rem;
    color: #005a65;
    margin: 0;
    line-height: 1.65;
  }
  .notice-box p strong {
    color: #003339;
  }
  .warning-box {
    background: #fff8e8;
    border: 1px solid #e8d4a0;
    border-radius: 6px;
    padding: 18px 22px;
    margin: 20px 0;
  }
  .warning-box p {
    font-size: 0.88rem;
    color: #6b4f00;
    margin: 0 0 8px;
    line-height: 1.65;
  }
  .warning-box p:last-child {
    margin-bottom: 0;
  }
  .warning-box p strong {
    color: #4a3600;
  }
  .refund-table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0 24px;
    font-size: 0.88rem;
  }
  .refund-table thead tr {
    background: #003339;
    color: #ffffff;
  }
  .refund-table thead th {
    padding: 12px 16px;
    text-align: left;
    font-weight: 500;
    font-family: 'Source Serif 4', serif;
    letter-spacing: 0.02em;
  }
  .refund-table tbody tr:nth-child(even) {
    background: #edf7f8;
  }
  .refund-table tbody tr:nth-child(odd) {
    background: #ffffff;
  }
  .refund-table tbody td {
    padding: 11px 16px;
    border-bottom: 1px solid #d0dada;
    line-height: 1.5;
    vertical-align: top;
  }
  .refund-table tbody td:first-child {
    font-weight: 500;
    color: #003339;
  }
  .eligible {
    color: #1a6b3c;
    font-weight: 600;
  }
  .not-eligible {
    color: #8b2020;
    font-weight: 600;
  }
  .sig-block {
    margin-top: 52px;
    padding-top: 32px;
    border-top: 2px solid #003339;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }
  .sig-col h4 {
    font-family: 'Playfair Display', serif;
    font-size: 0.85rem;
    color: #003339;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 12px;
  }
  .sig-col p {
    font-size: 0.88rem;
    color: #5a7070;
    line-height: 1.6;
  }
  .sig-line {
    height: 1px;
    background: #5a7070;
    margin: 28px 0 6px;
    opacity: 0.35;
  }
  @media (max-width: 780px) {
    .ld-page-layout {
      grid-template-columns: 1fr;
    }
    .ld-toc {
      display: none;
    }
    .ld-doc-header h1 {
      font-size: 2.1rem;
    }
    .sig-block {
      grid-template-columns: 1fr;
    }
    .refund-table {
      font-size: 0.8rem;
    }
  }
`

interface TocItem {
  href: string
  label: string
  external?: boolean
}

interface LegalPageLayoutProps {
  title: string
  effectiveDate: string
  lastRevised: string
  version: string
  tocItems: TocItem[]
  tocFooterLinks: TocItem[]
  contentHtml: string
}

export default function LegalPageLayout({
  title,
  effectiveDate,
  lastRevised,
  version,
  tocItems,
  tocFooterLinks,
  contentHtml,
}: LegalPageLayoutProps) {
  useEffect(() => {
    const sections = document.querySelectorAll('.doc-section')
    const tocLinks = document.querySelectorAll('.ld-toc a[href^="#"]')
    if (!sections.length || !tocLinks.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tocLinks.forEach((l) => l.classList.remove('active'))
            const active = document.querySelector(`.ld-toc a[href="#${entry.target.id}"]`)
            if (active) active.classList.add('active')
          }
        })
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="ld-page">
      <style dangerouslySetInnerHTML={{ __html: LEGAL_CSS }} />

      <header className="ld-doc-header">
        <div className="ld-doc-type">Legal Document</div>
        <h1>{title}</h1>
        <div className="ld-doc-meta">
          <span>Effective Date: {effectiveDate}</span>
          <span className="ld-dot" />
          <span>Last Revised: {lastRevised}</span>
          <span className="ld-dot" />
          <span>{version}</span>
        </div>
      </header>

      <div className="ld-page-layout">
        <aside className="ld-toc">
          <div className="ld-toc-label">Contents</div>
          <ol>
            {tocItems.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ol>
          <div className="ld-toc-footer">
            {tocFooterLinks.map((link) =>
              link.external ? (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              ) : (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              )
            )}
          </div>
        </aside>

        <main
          className="doc-body"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </div>
    </div>
  )
}
