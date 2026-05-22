import { Metadata } from 'next'
import LinkedInOutreachExperience from '@/components/LinkedInOutreachExperience'

export const metadata: Metadata = {
  title: 'LinkedIn Outreach Excellence 16X | MillionCXO',
  description:
    'Managed LinkedIn outreach with 800 InMails per Sales Navigator license per month, research-based messaging, human-led execution, and account safety protection.',
  openGraph: {
    title: 'LinkedIn Outreach Excellence 16X | MillionCXO',
    description:
      'Managed LinkedIn outreach with 800 InMails per Sales Navigator license per month, research-based messaging, human-led execution, and account safety protection.',
    url: 'https://millioncxo.com/linkedin-outreach',
    siteName: 'MillionCXO',
    type: 'website',
    images: [
      {
        url: 'https://millioncxo.com/linkedin-outreach/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'MillionCXO LinkedIn Outreach Excellence preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LinkedIn Outreach Excellence 16X | MillionCXO',
    description:
      'Managed LinkedIn outreach with 800 InMails per Sales Navigator license per month, research-based messaging, human-led execution, and account safety protection.',
    images: ['https://millioncxo.com/linkedin-outreach/opengraph-image'],
  },
}

export default function LinkedInOutreachPage() {
  return <LinkedInOutreachExperience />
}
