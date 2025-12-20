'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Report {
  _id: string;
  type: 'WEEKLY' | 'MONTHLY' | 'QUARTERLY';
  periodStart: string;
  periodEnd: string;
  summary: string;
  metrics: Record<string, any>;
  licenseId?: {
    _id: string;
    label: string;
    serviceType: string;
  };
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
}

export default function ClientReportsPage() {
  const router = useRouter();
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    from: '',
    to: '',
  });

  useEffect(() => {
    fetchReports();
  }, [filters]);

  const fetchReports = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.type) params.append('type', filters.type);
      if (filters.from) params.append('from', filters.from);
      if (filters.to) params.append('to', filters.to);

      const response = await fetch(`/api/client/reports?${params.toString()}`);
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          router.push('/login');
          return;
        }
        throw new Error('Failed to fetch reports');
      }
      const data = await response.json();
      setReports(data.reports || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load reports');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ type: '', from: '', to: '' });
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <div className="spinner" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="card" style={{ background: '#fee2e2', color: '#dc2626' }}>
        {error}
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', color: 'var(--imperial-emerald)' }}>
        Reports
      </h1>

      {/* Filters */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--imperial-emerald)' }}>
          Filter Reports
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Report Type
            </label>
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="input"
            >
              <option value="">All Types</option>
              <option value="WEEKLY">Weekly</option>
              <option value="MONTHLY">Monthly</option>
              <option value="QUARTERLY">Quarterly</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              From Date
            </label>
            <input
              type="date"
              value={filters.from}
              onChange={(e) => handleFilterChange('from', e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              To Date
            </label>
            <input
              type="date"
              value={filters.to}
              onChange={(e) => handleFilterChange('to', e.target.value)}
              className="input"
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button
              onClick={clearFilters}
              className="btn-secondary"
              style={{ width: '100%' }}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="card">
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--imperial-emerald)', borderBottom: '2px solid var(--golden-opal)', paddingBottom: '0.5rem' }}>
          All Reports ({reports.length})
        </h2>

        {reports.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p style={{ color: 'var(--muted-jade)' }}>
              No reports available yet. Your reports will appear here once generated.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {reports.map((report) => {
              const typeColors: Record<string, string> = {
                WEEKLY: '#3b82f6',
                MONTHLY: '#10b981',
                QUARTERLY: '#f59e0b',
              };

              return (
                <div
                  key={report._id}
                  className="card"
                  style={{
                    borderLeft: `4px solid ${typeColors[report.type] || 'var(--golden-opal)'}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onClick={() => setSelectedReport(report)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(196, 183, 91, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                        <span
                          style={{
                            padding: '0.25rem 0.75rem',
                            borderRadius: '0.375rem',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            background: `${typeColors[report.type] || 'var(--golden-opal)'}20`,
                            color: typeColors[report.type] || 'var(--golden-opal)',
                            textTransform: 'uppercase',
                          }}
                        >
                          {report.type}
                        </span>
                        {report.licenseId && (
                          <span style={{ color: 'var(--muted-jade)', fontSize: '0.875rem' }}>
                            {report.licenseId.label}
                          </span>
                        )}
                      </div>
                      <p style={{ color: 'var(--muted-jade)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                        <strong>Period:</strong> {new Date(report.periodStart).toLocaleDateString()} - {new Date(report.periodEnd).toLocaleDateString()}
                      </p>
                      <p style={{ color: 'var(--imperial-emerald)', fontSize: '0.875rem', lineHeight: '1.5' }}>
                        {report.summary.length > 150 ? `${report.summary.substring(0, 150)}...` : report.summary}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right', fontSize: '0.875rem', color: 'var(--muted-jade)' }}>
                      <div>By {report.createdBy.name}</div>
                      <div>{new Date(report.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Report Detail Modal */}
      {selectedReport && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            padding: '2rem',
          }}
          onClick={() => setSelectedReport(null)}
        >
          <div
            className="card"
            style={{
              maxWidth: '800px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedReport(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'transparent',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: 'var(--muted-jade)',
              }}
            >
              ×
            </button>

            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--imperial-emerald)', borderBottom: '2px solid var(--golden-opal)', paddingBottom: '0.5rem' }}>
              Report Details
            </h2>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                <span
                  style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    background: 'var(--golden-opal)20',
                    color: 'var(--golden-opal)',
                    textTransform: 'uppercase',
                  }}
                >
                  {selectedReport.type}
                </span>
                {selectedReport.licenseId && (
                  <span style={{ color: 'var(--muted-jade)' }}>
                    <strong>License:</strong> {selectedReport.licenseId.label}
                  </span>
                )}
              </div>
              <p style={{ color: 'var(--muted-jade)', marginBottom: '0.5rem' }}>
                <strong>Period:</strong> {new Date(selectedReport.periodStart).toLocaleDateString()} - {new Date(selectedReport.periodEnd).toLocaleDateString()}
              </p>
              <p style={{ color: 'var(--muted-jade)', marginBottom: '0.5rem' }}>
                <strong>Created by:</strong> {selectedReport.createdBy.name} ({selectedReport.createdBy.email})
              </p>
              <p style={{ color: 'var(--muted-jade)' }}>
                <strong>Created on:</strong> {new Date(selectedReport.createdAt).toLocaleString()}
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem', color: 'var(--imperial-emerald)' }}>
                Summary
              </h3>
              <p style={{ color: 'var(--muted-jade)', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                {selectedReport.summary}
              </p>
            </div>

            {selectedReport.metrics && Object.keys(selectedReport.metrics).length > 0 && (
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem', color: 'var(--imperial-emerald)' }}>
                  Metrics
                </h3>
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                  {Object.entries(selectedReport.metrics).map(([key, value]) => (
                    <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', background: 'rgba(196, 183, 91, 0.05)', borderRadius: '0.375rem' }}>
                      <span style={{ color: 'var(--muted-jade)', fontWeight: '500' }}>{key}:</span>
                      <span style={{ color: 'var(--imperial-emerald)' }}>{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

