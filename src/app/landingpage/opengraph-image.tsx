import { ImageResponse } from 'next/og'
import { OgCard, ogSize } from '../og-card'

export const runtime = 'edge'
export const alt = 'MillionCXO B2B Outreach'
export const size = ogSize
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="MillionCXO"
        subtitle="B2B Outreach"
        title={['Human-driven outreach', 'for qualified pipeline.']}
        metrics={[
          ['Research', 'based messaging'],
          ['Meetings', 'pipeline creation'],
          ['Sales', 'execution layer'],
        ]}
        dark
      />
    ),
    size,
  )
}
