import { ImageResponse } from 'next/og'
import { OgCard, ogSize } from '../og-card'

export const runtime = 'edge'
export const alt = 'About MillionCXO'
export const size = ogSize
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="About MillionCXO"
        subtitle="B2B Outreach"
        title={['Human-driven outreach', 'for real CXO conversations.']}
        metrics={[
          ['B2B', 'sales acceleration'],
          ['CXO', 'decision-maker focus'],
          ['Global', 'client experience'],
        ]}
      />
    ),
    size,
  )
}
