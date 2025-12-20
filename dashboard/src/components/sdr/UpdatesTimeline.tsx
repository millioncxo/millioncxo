interface Update {
  _id: string;
  type: 'CALL' | 'EMAIL' | 'MEETING' | 'NOTE' | 'REPORT' | 'OTHER';
  title: string;
  description: string;
  date: string;
  sdrId: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  attachments?: string[];
}

interface UpdatesTimelineProps {
  updates: Update[];
}

export default function UpdatesTimeline({ updates }: UpdatesTimelineProps) {
  const typeColors: Record<Update['type'], string> = {
    CALL: '#3b82f6',
    EMAIL: '#10b981',
    MEETING: '#f59e0b',
    NOTE: 'var(--golden-opal)',
    REPORT: '#8b5cf6',
    OTHER: 'var(--muted-jade)',
  };

  if (updates.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--muted-jade)' }}>
        <p>No updates yet. Add your first update to track client activity.</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {updates.map((update) => (
        <div
          key={update._id}
          className="card"
          style={{
            borderLeft: `4px solid ${typeColors[update.type]}`,
            padding: '1rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.5rem' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <span style={{
                  padding: '0.25rem 0.75rem',
                  borderRadius: '0.375rem',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  background: `${typeColors[update.type]}20`,
                  color: typeColors[update.type],
                  textTransform: 'uppercase'
                }}>
                  {update.type}
                </span>
                <h4 style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--imperial-emerald)' }}>
                  {update.title}
                </h4>
              </div>
              <p style={{ color: 'var(--muted-jade)', fontSize: '0.875rem', lineHeight: '1.6' }}>
                {update.description}
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(196, 183, 91, 0.2)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--muted-jade)' }}>
              <span>By {update.sdrId.name}</span>
              <span style={{ margin: '0 0.5rem' }}>•</span>
              <span>{new Date(update.date).toLocaleDateString()}</span>
              <span style={{ margin: '0 0.5rem' }}>•</span>
              <span>{new Date(update.createdAt).toLocaleString()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

