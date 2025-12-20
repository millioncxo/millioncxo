'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ReportsTable from '@/components/sdr/ReportsTable';

interface Report {
  _id: string;
  clientId: {
    _id: string;
    businessName: string;
  };
  licenseId?: {
    _id: string;
    label: string;
    serviceType: string;
    productOrServiceName?: string;
  };
  type: 'WEEKLY' | 'MONTHLY' | 'QUARTERLY';
  periodStart: string;
  periodEnd: string;
  summary: string;
  metrics: Record<string, any>;
  inMailsSent?: number;
  inMailsPositiveResponse?: number;
  connectionRequestsSent?: number;
  connectionRequestsPositiveResponse?: number;
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
}

interface Client {
  clientId: string;
  businessName: string;
}

interface License {
  _id: string;
  productOrServiceName: string;
  serviceType: string;
  label: string;
}

export default function SdrReportsPage() {
  const router = useRouter();
  const [reports, setReports] = useState<Report[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [licenses, setLicenses] = useState<Record<string, License[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [formData, setFormData] = useState({
    clientId: '',
    licenseId: '',
    type: 'DAILY' as 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY',
    periodStart: '',
    periodEnd: '',
    summary: '',
    metrics: {} as Record<string, any>,
    inMailsSent: '',
    inMailsPositiveResponse: '',
    connectionRequestsSent: '',
    connectionRequestsPositiveResponse: '',
  });

  useEffect(() => {
    fetchReports();
    fetchClients();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch('/api/sdr/reports');
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

  const fetchClients = async () => {
    try {
      const response = await fetch('/api/sdr/clients');
      if (response.ok) {
        const data = await response.json();
        setClients(data.clients || []);
      }
    } catch (err: any) {
      // Silently handle client fetch errors for reports page
    }
  };

  const fetchLicensesForClient = async (clientId: string) => {
    try {
      const response = await fetch(`/api/sdr/clients/${clientId}`);
      if (response.ok) {
        const data = await response.json();
        setLicenses(prev => ({
          ...prev,
          [clientId]: data.client.licenses || [],
        }));
      }
    } catch (err: any) {
      // Silently handle license fetch errors
    }
  };

  const handleClientChange = (clientId: string) => {
    setFormData({ ...formData, clientId, licenseId: '' });
    if (clientId) {
      fetchLicensesForClient(clientId);
    }
  };

  const handleTypeChange = (type: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY') => {
    const today = new Date().toISOString().split('T')[0];
    if (type === 'DAILY') {
      // For daily reports, set both dates to today
      setFormData({ ...formData, type, periodStart: today, periodEnd: today });
    } else {
      setFormData({ ...formData, type });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/sdr/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId: formData.clientId,
          licenseId: formData.licenseId || undefined,
          type: formData.type,
          periodStart: formData.periodStart,
          periodEnd: formData.periodEnd,
          summary: formData.summary,
          metrics: formData.metrics,
          inMailsSent: formData.inMailsSent ? parseInt(formData.inMailsSent) : undefined,
          inMailsPositiveResponse: formData.inMailsPositiveResponse ? parseInt(formData.inMailsPositiveResponse) : undefined,
          connectionRequestsSent: formData.connectionRequestsSent ? parseInt(formData.connectionRequestsSent) : undefined,
          connectionRequestsPositiveResponse: formData.connectionRequestsPositiveResponse ? parseInt(formData.connectionRequestsPositiveResponse) : undefined,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create report');
      }

      setRefreshTrigger(prev => prev + 1);
      setShowForm(false);
      setFormData({
        clientId: '',
        licenseId: '',
        type: 'DAILY',
        periodStart: '',
        periodEnd: '',
        summary: '',
        metrics: {},
        inMailsSent: '',
        inMailsPositiveResponse: '',
        connectionRequestsSent: '',
        connectionRequestsPositiveResponse: '',
      });
    } catch (err: any) {
      setError(err.message || 'Failed to create report');
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--imperial-emerald)' }}>
          Reports
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary"
        >
          + Create Report
        </button>
      </div>

      {error && (
        <div className="card" style={{ background: '#fee2e2', color: '#dc2626', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      {showForm && (
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
              setShowForm(false);
              setFormData({
                clientId: '',
                licenseId: '',
                type: 'WEEKLY',
                periodStart: '',
                periodEnd: '',
                summary: '',
                metrics: {},
                inMailsSent: '',
                inMailsPositiveResponse: '',
                connectionRequestsSent: '',
                connectionRequestsPositiveResponse: '',
              });
            }
          }}
        >
          <div
            className="card"
            style={{
              maxWidth: '900px',
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
            Create New Report
          </h2>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setFormData({
                    clientId: '',
                    licenseId: '',
                    type: 'WEEKLY',
                    periodStart: '',
                    periodEnd: '',
                    summary: '',
                    metrics: {},
                    inMailsSent: '',
                    inMailsPositiveResponse: '',
                    connectionRequestsSent: '',
                    connectionRequestsPositiveResponse: '',
                  });
                }}
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
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Client *
                </label>
                <select
                  value={formData.clientId}
                  onChange={(e) => handleClientChange(e.target.value)}
                  className="input"
                  required
                >
                  <option value="">Select a client</option>
                  {clients.map((client) => (
                    <option key={client.clientId} value={client.clientId}>
                      {client.businessName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  License (Optional)
                </label>
                <select
                  value={formData.licenseId}
                  onChange={(e) => setFormData({ ...formData, licenseId: e.target.value })}
                  className="input"
                  disabled={!formData.clientId}
                >
                  <option value="">No specific license</option>
                  {formData.clientId && licenses[formData.clientId]?.map((license) => (
                    <option key={license._id} value={license._id}>
                      {license.productOrServiceName || license.label} - {license.serviceType}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Report Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => handleTypeChange(e.target.value as any)}
                  className="input"
                  required
                >
                  <option value="DAILY">Daily</option>
                  <option value="WEEKLY">Weekly</option>
                  <option value="MONTHLY">Monthly</option>
                  <option value="QUARTERLY">Quarterly</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Period Start *
                </label>
                <input
                  type="date"
                  value={formData.periodStart}
                  onChange={(e) => setFormData({ ...formData, periodStart: e.target.value })}
                  className="input"
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Period End *
                </label>
                <input
                  type="date"
                  value={formData.periodEnd}
                  onChange={(e) => setFormData({ ...formData, periodEnd: e.target.value })}
                  className="input"
                  required
                />
              </div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                Summary *
              </label>
              <textarea
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                className="input"
                required
                rows={6}
                placeholder="Provide a detailed summary of the report period..."
              />
            </div>

            {/* LinkedIn Metrics Section */}
            <div style={{ marginBottom: '1rem', padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '0.5rem', borderLeft: '3px solid #3b82f6' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--imperial-emerald)' }}>
                LinkedIn Metrics (Optional)
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>
                    No. of InMails Sent
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.inMailsSent}
                    onChange={(e) => setFormData({ ...formData, inMailsSent: e.target.value })}
                    className="input"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>
                    No. of Positive Response for InMails
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.inMailsPositiveResponse}
                    onChange={(e) => setFormData({ ...formData, inMailsPositiveResponse: e.target.value })}
                    className="input"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>
                    No. of Connection Requests Sent
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.connectionRequestsSent}
                    onChange={(e) => setFormData({ ...formData, connectionRequestsSent: e.target.value })}
                    className="input"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>
                    No. of Positive Response for Connection Requests
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.connectionRequestsPositiveResponse}
                    onChange={(e) => setFormData({ ...formData, connectionRequestsPositiveResponse: e.target.value })}
                    className="input"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button type="submit" className="btn-primary">
                Create Report
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setFormData({
                    clientId: '',
                    licenseId: '',
                    type: 'WEEKLY',
                    periodStart: '',
                    periodEnd: '',
                    summary: '',
                    metrics: {},
                      inMailsSent: '',
                      inMailsPositiveResponse: '',
                      connectionRequestsSent: '',
                      connectionRequestsPositiveResponse: '',
                  });
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
          </div>
        </div>
      )}

      <div className="card" style={{ padding: '1.5rem' }}>
        <ReportsTable refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
}

