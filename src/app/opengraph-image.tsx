import { ImageResponse } from 'next/og'
import { OgCard, ogSize } from './og-card'

export const runtime = 'edge'
export const alt = 'MillionCXO SDR as a Service'
export const size = ogSize
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="SDR as a Service"
        subtitle="Revenue Teams"
        title={['From meetings to revenue,', 'without building in-house.']}
        metrics={[
          ['16+', 'meetings/month'],
          ['$200K', 'target per AE/year'],
          ['30 days', 'setup period'],
        ]}
      />
    ),
    size,
  )
}
