import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'MillionCXO SDR as a Service'
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
          background: '#f7f5f2',
          color: '#0b2e2b',
          fontFamily: 'Inter, Arial, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: 720,
            height: 720,
            borderRadius: 720,
            background: 'rgba(196,183,91,0.22)',
            right: -210,
            top: -190,
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 520,
            height: 520,
            borderRadius: 520,
            border: '2px solid rgba(102,139,119,0.26)',
            right: 80,
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
                background: '#0b2e2b',
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
              <div style={{ fontSize: 19, color: '#668b77', letterSpacing: 9, textTransform: 'uppercase' }}>
                Revenue Teams
              </div>
            </div>
          </div>

          <div style={{ marginTop: 70, display: 'flex', flexDirection: 'column', maxWidth: 820 }}>
            <div style={{ fontSize: 24, color: '#668b77', letterSpacing: 7, textTransform: 'uppercase' }}>
              SDR as a Service
            </div>
            <div style={{ marginTop: 22, fontSize: 72, lineHeight: 0.95, fontWeight: 700, letterSpacing: -3.8 }}>
              From meetings to revenue, without building in-house.
            </div>
          </div>

          <div style={{ marginTop: 'auto', display: 'flex', gap: 18 }}>
            {[
              ['16+', 'meetings/month'],
              ['$200K', 'target per AE/year'],
              ['30 days', 'setup period'],
            ].map(([value, label]) => (
              <div
                key={label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid rgba(11,46,43,0.12)',
                  background: 'rgba(255,255,255,0.72)',
                  borderRadius: 22,
                  padding: '20px 28px',
                  minWidth: 210,
                }}
              >
                <div style={{ fontSize: 34, fontWeight: 800, color: '#0b2e2b' }}>{value}</div>
                <div style={{ fontSize: 18, color: '#668b77' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  )
}
