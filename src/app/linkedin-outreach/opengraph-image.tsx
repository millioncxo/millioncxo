import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'MillionCXO LinkedIn Outreach Excellence'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#0b2e2b',
          color: '#f7f5f2',
          fontFamily: 'Inter, Arial, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: 760,
            height: 760,
            borderRadius: 760,
            background: 'rgba(196,183,91,0.16)',
            right: -240,
            top: -200,
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 520,
            height: 520,
            borderRadius: 520,
            border: '2px solid rgba(247,245,242,0.16)',
            left: -140,
            bottom: -260,
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', padding: '74px 82px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
            <div
              style={{
                width: 104,
                height: 58,
                borderRadius: 32,
                background: '#f7f5f2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#c4b75b',
                fontSize: 42,
                fontWeight: 800,
              }}
            >
              ∞
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 42, fontWeight: 800, letterSpacing: -1.2 }}>millionCXO</div>
              <div style={{ fontSize: 19, color: '#c4b75b', letterSpacing: 9, textTransform: 'uppercase' }}>
                LinkedIn Outreach
              </div>
            </div>
          </div>

          <div style={{ marginTop: 70, display: 'flex', flexDirection: 'column', maxWidth: 850 }}>
            <div style={{ fontSize: 24, color: '#c4b75b', letterSpacing: 7, textTransform: 'uppercase' }}>
              LinkedIn Outreach Excellence 16X
            </div>
            <div style={{ marginTop: 22, fontSize: 72, lineHeight: 0.95, fontWeight: 700, letterSpacing: -3.8 }}>
              Turn Sales Navigator into a human-led outreach engine.
            </div>
          </div>

          <div style={{ marginTop: 'auto', display: 'flex', gap: 18 }}>
            {[
              ['800', 'InMails per license/month'],
              ['$299', 'per license/month'],
              ['100%', 'account safety guarantee'],
            ].map(([value, label]) => (
              <div
                key={label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid rgba(247,245,242,0.14)',
                  background: 'rgba(247,245,242,0.08)',
                  borderRadius: 22,
                  padding: '20px 28px',
                  minWidth: 230,
                }}
              >
                <div style={{ fontSize: 34, fontWeight: 800, color: '#c4b75b' }}>{value}</div>
                <div style={{ fontSize: 18, color: 'rgba(247,245,242,0.72)' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  )
}
