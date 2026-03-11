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
  title: 'Maximize LinkedIn Outreach by 16X | MillionCXO - 800 InMails per License',
  description: 'Maximize your LinkedIn outreach efficiency by 16X with MillionCXO. Get 800 InMails per license per month, research-based outreach, and 100% account safety guarantee. Starts at $299 - No Lock In, Monthly Billing.',
  keywords: [
    'LinkedIn outreach 16X',
    'maximize LinkedIn outreach',
    'LinkedIn InMail outreach',
    'B2B lead generation',
    'LinkedIn appointment setting',
    'CXO outreach',
    'LinkedIn outreach excellence',
    'human-driven LinkedIn outreach',
    'research-based outreach',
    'LinkedIn account safety',
    'B2B sales pipeline',
    'LinkedIn lead generation service'
  ],
  openGraph: {
    title: 'Maximize LinkedIn Outreach by 16X | MillionCXO',
    description: 'Get 800 InMails per license per month and research-based human-driven outreach. Starts at $299 - No Lock In, Monthly Billing.',
    url: 'https://millioncxo.com',
    siteName: 'MillionCXO',
    type: 'website',
    images: [
      {
        url: 'https://millioncxo.com/logo.svg',
        width: 1200,
        height: 630,
        alt: 'MillionCXO Logo - LinkedIn Outreach Excellence 16X',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maximize LinkedIn Outreach by 16X | MillionCXO',
    description: '800 InMails per license per month, research-based outreach. Human-driven LinkedIn excellence. Starts at $299 - No Lock In.',
    images: ['https://millioncxo.com/logo.svg'],
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