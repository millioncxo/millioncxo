import { ImageResponse } from 'next/og'
import { OgCard, ogSize } from '../og-card'

export const runtime = 'edge'
export const alt = 'MillionCXO Terms of Service'
export const size = ogSize
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="Terms of Service"
        subtitle="Legal"
        title={['Terms governing', 'MillionCXO services.']}
        metrics={[
          ['Service', 'agreement'],
          ['Client', 'terms'],
          ['B2B', 'sales services'],
        ]}
      />
    ),
    size,
  )
}
