import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import ScrollAnimation from '@/components/ScrollAnimation'

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
    <html lang="en" className="no-js">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Remove no-js class when JavaScript is available
              document.documentElement.classList.remove('no-js');
              
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
        <ScrollAnimation />
        {children}
      </body>
    </html>
  )
} 