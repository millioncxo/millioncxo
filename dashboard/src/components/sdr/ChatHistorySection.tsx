interface ChatHistorySectionProps {
  chatHistory: string | null;
  loading: boolean;
  onEdit: () => void;
  showForm: boolean;
  onSave: (e: React.FormEvent) => void;
  onCancel: () => void;
  chatHistoryValue: string;
  onChatHistoryChange: (value: string) => void;
  saving: boolean;
}

export default function ChatHistorySection({
  chatHistory,
  loading,
  onEdit,
  showForm,
  onSave,
  onCancel,
  chatHistoryValue,
  onChatHistoryChange,
  saving,
}: ChatHistorySectionProps) {
  return (
    <div style={{ marginTop: '2rem', borderTop: '2px solid var(--golden-opal)', paddingTop: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--imperial-emerald)' }}>
          LinkedIn Chat History
        </h3>
        {!showForm && (
          <button
            onClick={onEdit}
            className="btn-secondary"
            style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
          >
            {chatHistory ? 'Edit' : 'Add'} Chat History
          </button>
        )}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '1rem' }}>
          <div className="spinner" />
        </div>
      ) : showForm ? (
        <form onSubmit={onSave}>
          <textarea
            value={chatHistoryValue}
            onChange={(e) => onChatHistoryChange(e.target.value)}
            className="input"
            rows={8}
            placeholder="Paste LinkedIn chat history here..."
            style={{ width: '100%', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem' }}
          />
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="submit"
              className="btn-primary"
              disabled={saving}
              style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary"
              style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : chatHistory ? (
        <div className="card" style={{ background: 'rgba(59, 130, 246, 0.05)', borderLeft: '3px solid #3b82f6' }}>
          <div style={{ whiteSpace: 'pre-wrap', color: 'var(--muted-jade)', lineHeight: '1.8', fontFamily: 'monospace', fontSize: '0.875rem', padding: '1rem' }}>
            {chatHistory}
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '2rem', background: 'rgba(196, 183, 91, 0.1)', borderRadius: '0.5rem' }}>
          <p style={{ color: 'var(--muted-jade)', marginBottom: '1rem' }}>
            No LinkedIn chat history recorded yet.
          </p>
          <button
            onClick={onEdit}
            className="btn-primary"
            style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
          >
            Add Chat History
          </button>
        </div>
      )}
    </div>
  );
}

