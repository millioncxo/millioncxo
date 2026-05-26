import { ImageResponse } from 'next/og'
import { OgCard, ogSize } from '../og-card'

export const runtime = 'edge'
export const alt = 'Contact MillionCXO'
export const size = ogSize
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="Contact MillionCXO"
        subtitle="Strategy Call"
        title={['Talk to us about', 'your sales engine.']}
        metrics={[
          ['15 min', 'discovery call'],
          ['ICP', 'alignment'],
          ['Sales', 'team planning'],
        ]}
      />
    ),
    size,
  )
}
