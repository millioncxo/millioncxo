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
  title: 'MillionCXO - B2B Lead Generation & Appointment Setting',
  description: 'Transform your sales pipeline with our human-driven B2B appointment setting services. Generate high-quality leads and increase conversion rates.',
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