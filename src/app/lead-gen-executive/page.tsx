import { Metadata } from 'next'
import LeadGenExecutiveExperience from '@/components/LeadGenExecutiveExperience'

export const metadata: Metadata = {
  title: 'All-Rounder Lead Gen Executive | MillionCXO',
  description:
    'One trained MillionCXO Lead Gen Executive for LinkedIn and email outreach, with 5,000 InMails per month, 30 personalised emails per day and an 8 meetings/month minimum guarantee.',
  openGraph: {
    title: 'All-Rounder Lead Gen Executive | MillionCXO',
    description:
      'Deploy one trained Lead Gen Executive for LinkedIn and email outreach, daily reporting and a minimum 8 meetings/month guarantee.',
    url: 'https://millioncxo.com/lead-gen-executive',
    siteName: 'MillionCXO',
    type: 'website',
    images: [
      {
        url: 'https://millioncxo.com/lead-gen-executive/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'MillionCXO All-Rounder Lead Gen Executive preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All-Rounder Lead Gen Executive | MillionCXO',
    description:
      'One trained Lead Gen Executive for LinkedIn and email outreach, daily reporting and a minimum 8 meetings/month guarantee.',
    images: ['https://millioncxo.com/lead-gen-executive/opengraph-image'],
  },
}

export default function LeadGenExecutivePage() {
  return <LeadGenExecutiveExperience />
}
