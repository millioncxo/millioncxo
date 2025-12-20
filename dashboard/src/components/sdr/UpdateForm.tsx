interface UpdateFormProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  formData: {
    type: 'CALL' | 'EMAIL' | 'MEETING' | 'NOTE' | 'REPORT' | 'OTHER';
    title: string;
    description: string;
    date: string;
  };
  onFormDataChange: (data: Partial<UpdateFormProps['formData']>) => void;
}

export default function UpdateForm({ show, onClose, onSubmit, formData, onFormDataChange }: UpdateFormProps) {
  if (!show) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '2rem',
        overflow: 'auto'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="card"
        style={{
          maxWidth: '700px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          margin: 'auto',
          position: 'relative',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--imperial-emerald)' }}>
            Add New Update
          </h2>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: 'var(--muted-jade)',
              padding: '0.25rem 0.5rem',
              lineHeight: 1
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--imperial-emerald)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--muted-jade)';
            }}
          >
            ×
          </button>
        </div>
        <form onSubmit={onSubmit}>
          <div style={{ display: 'grid', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Update Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => onFormDataChange({ type: e.target.value as any })}
                  className="input"
                  required
                >
                  <option value="CALL">Call</option>
                  <option value="EMAIL">Email</option>
                  <option value="MEETING">Meeting</option>
                  <option value="NOTE">Note</option>
                  <option value="REPORT">Report</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Date *
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => onFormDataChange({ date: e.target.value })}
                  className="input"
                  required
                />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => onFormDataChange({ title: e.target.value })}
                className="input"
                required
                placeholder="Brief title for this update"
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => onFormDataChange({ description: e.target.value })}
                className="input"
                required
                rows={4}
                placeholder="Detailed description of the update..."
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
            <button type="submit" className="btn-primary" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}>
              Save Update
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

