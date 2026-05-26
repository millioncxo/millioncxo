import { ImageResponse } from 'next/og'
import { OgCard, ogSize } from '../og-card'

export const runtime = 'edge'
export const alt = 'MillionCXO Refund and Cancellation Policy'
export const size = ogSize
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="Refund & Cancellation"
        subtitle="Legal"
        title={['Refund and cancellation', 'terms for clients.']}
        metrics={[
          ['Policy', 'terms'],
          ['Billing', 'adjustments'],
          ['Client', 'requests'],
        ]}
      />
    ),
    size,
  )
}
