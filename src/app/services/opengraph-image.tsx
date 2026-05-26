import { ImageResponse } from 'next/og'
import { OgCard, ogSize } from '../og-card'

export const runtime = 'edge'
export const alt = 'MillionCXO Services'
export const size = ogSize
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="MillionCXO Services"
        subtitle="Sales Acceleration"
        title={['Build pipeline with', 'human-led execution.']}
        metrics={[
          ['Lead Gen', 'outreach support'],
          ['AE', 'conversion support'],
          ['Reporting', 'operating cadence'],
        ]}
      />
    ),
    size,
  )
}
