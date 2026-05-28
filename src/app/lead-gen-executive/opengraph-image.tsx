import { ImageResponse } from 'next/og'
import { OgCard, ogSize } from '../og-card'

export const runtime = 'edge'
export const alt = 'MillionCXO All-Rounder Lead Gen Executive'
export const size = ogSize
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="All-Rounder Lead Gen Executive"
        subtitle="Lead Gen Executive"
        title={['Your first sales hire,', 'done right.']}
        metrics={[
          ['5,000', 'InMails/month'],
          ['30', 'emails/day'],
          ['16', 'meetings/month guarantee'],
        ]}
      />
    ),
    size,
  )
}
