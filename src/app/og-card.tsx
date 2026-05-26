export const ogSize = {
  width: 1200,
  height: 630,
}

type OgMetric = [string, string]

type OgCardProps = {
  eyebrow: string
  title: string[]
  subtitle: string
  metrics?: OgMetric[]
  dark?: boolean
}

export function OgCard({ eyebrow, title, subtitle, metrics = [], dark = false }: OgCardProps) {
  const bg = dark ? '#0b2e2b' : '#f7f5f2'
  const fg = dark ? '#f7f5f2' : '#0b2e2b'
  const muted = dark ? 'rgba(247,245,242,0.7)' : '#668b77'
  const panel = dark ? 'rgba(247,245,242,0.08)' : 'rgba(255,255,255,0.72)'
  const border = dark ? 'rgba(247,245,242,0.14)' : 'rgba(11,46,43,0.12)'

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        background: bg,
        color: fg,
        fontFamily: 'Inter, Arial, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: 700,
          height: 700,
          borderRadius: 700,
          background: dark ? 'rgba(196,183,91,0.16)' : 'rgba(196,183,91,0.22)',
          right: -230,
          top: -210,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 520,
          height: 520,
          borderRadius: 520,
          border: `2px solid ${dark ? 'rgba(247,245,242,0.16)' : 'rgba(102,139,119,0.26)'}`,
          right: 78,
          bottom: -270,
        }}
      />

      <div style={{ display: 'flex', flexDirection: 'column', padding: '68px 82px 62px', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <div
            style={{
              width: 104,
              height: 58,
              borderRadius: 32,
              background: dark ? '#f7f5f2' : '#0b2e2b',
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
            <div style={{ fontSize: 42, fontWeight: 800, letterSpacing: -1.2 }}>MillionCXO</div>
            <div style={{ fontSize: 18, color: muted, letterSpacing: 8, textTransform: 'uppercase' }}>
              {subtitle}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 58, display: 'flex', flexDirection: 'column', width: 900 }}>
          <div style={{ fontSize: 23, color: dark ? '#c4b75b' : muted, letterSpacing: 6, textTransform: 'uppercase' }}>
            {eyebrow}
          </div>
          <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {title.map((line) => (
              <div
                key={line}
                style={{
                  fontSize: 62,
                  lineHeight: 0.94,
                  fontWeight: 760,
                  letterSpacing: -2.9,
                  whiteSpace: 'nowrap',
                }}
              >
                {line}
              </div>
            ))}
          </div>
        </div>

        {metrics.length > 0 && (
          <div style={{ marginTop: 'auto', display: 'flex', gap: 16 }}>
            {metrics.map(([value, label]) => (
              <div
                key={label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  border: `1px solid ${border}`,
                  background: panel,
                  borderRadius: 22,
                  padding: '18px 24px',
                  minWidth: 205,
                }}
              >
                <div style={{ fontSize: 32, fontWeight: 800, color: dark ? '#c4b75b' : '#0b2e2b' }}>{value}</div>
                <div style={{ fontSize: 17, color: muted }}>{label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
