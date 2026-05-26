import { ImageResponse } from 'next/og'
import { OgCard, ogSize } from '../og-card'

export const runtime = 'edge'
export const alt = 'MillionCXO Privacy Policy'
export const size = ogSize
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="Privacy Policy"
        subtitle="Legal"
        title={['How MillionCXO handles', 'personal information.']}
        metrics={[
          ['Privacy', 'policy'],
          ['Data', 'handling'],
          ['Client', 'information'],
        ]}
      />
    ),
    size,
  )
}
