import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ChatWidget from '@/components/ChatWidget'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.millioncxo.com'),
  title: 'SDR as a Service | MillionCXO Revenue-Driven Sales Teams',
  description: 'MillionCXO deploys lead generation specialists and account executives who turn ICP research into qualified meetings and closed revenue, with revenue targets and performance guarantees.',
  icons: {
    icon: [
      { url: '/logo.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
  keywords: [
    'SDR as a Service',
    'outsourced SDR team',
    'outsourced sales team',
    'revenue-driven sales team',
    'account executive service',
    'B2B lead generation',
    'B2B appointment setting',
    'sales development representatives',
    'qualified meetings',
    'BANT qualification',
    'revenue accountability',
    'research-based outreach',
    'B2B sales pipeline'
  ],
  openGraph: {
    title: 'SDR as a Service | MillionCXO',
    description: 'Deploy a revenue-driven sales team for lead generation, account executive coverage, reporting, and performance-backed growth.',
    url: 'https://millioncxo.com',
    siteName: 'MillionCXO',
    type: 'website',
    images: [
      {
        url: 'https://millioncxo.com/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'MillionCXO SDR as a Service preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SDR as a Service | MillionCXO',
    description: 'Revenue-driven lead generation and account executive teams with target accountability.',
    images: ['https://millioncxo.com/opengraph-image'],
  },
  alternates: {
    canonical: 'https://millioncxo.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17718087441"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17718087441');
              
              // Fallback animation trigger
              document.addEventListener('DOMContentLoaded', function() {
                setTimeout(function() {
                  const elements = document.querySelectorAll('.animate-on-scroll');
                  elements.forEach(function(el) {
                    if (!el.classList.contains('animate')) {
                      el.classList.add('animate');
                    }
                  });
                }, 1000);
              });
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <Navigation />
        <main className="pt-6 sm:pt-8 md:pt-12">
          {children}
        </main>
        <Footer />
        <ChatWidget />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
} 
