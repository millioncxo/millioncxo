'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LogoComponent from '@/components/LogoComponent';
import { FileText, Download, Calendar, User, Search, Filter, Eye, X } from 'lucide-react';

interface Report {
  _id: string;
  type: string;
  periodStart: Date | string;
  periodEnd: Date | string;
  summary: string;
  metrics?: Record<string, any>;
  inMailsSent?: number;
  inMailsPositiveResponse?: number;
  connectionRequestsSent?: number;
  connectionRequestsPositiveResponse?: number;
  clientId: {
    _id: string;
    businessName: string;
    pointOfContactName?: string;
    pointOfContactEmail?: string;
  };
  createdBy?: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
  licenseId?: {
    _id: string;
    productOrServiceName: string;
    serviceType: string;
    label: string;
  };
  createdAt: Date | string;
  updatedAt?: Date | string;
}

export default function ReportsPage() {
  const router = useRouter();
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [clients, setClients] = useState<Array<{ _id: string; businessName: string }>>([]);
  const [sdrs, setSdrs] = useState<Array<{ _id: string; name: string; email: string }>>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showReportDetail, setShowReportDetail] = useState(false);
  const [reportDetailLoading, setReportDetailLoading] = useState(false);
  const [reportDetailError, setReportDetailError] = useState('');
  
  // Filters
  const [clientFilter, setClientFilter] = useState<string>('');
  const [sdrFilter, setSdrFilter] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [dateFrom, setDateFrom] = useState<string>('');
  const [dateTo, setDateTo] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    fetchReports();
    fetchClients();
    fetchSdrs();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...reports];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(report => 
        report.summary.toLowerCase().includes(term) ||
        report.type.toLowerCase().includes(term) ||
        report.clientId.businessName.toLowerCase().includes(term) ||
        report.createdBy?.name.toLowerCase().includes(term) ||
        report.createdBy?.email.toLowerCase().includes(term)
      );
    }

    // Client filter
    if (clientFilter) {
      filtered = filtered.filter(report => report.clientId._id === clientFilter);
    }

    // SDR filter
    if (sdrFilter) {
      filtered = filtered.filter(report => report.createdBy?._id === sdrFilter);
    }

    // Type filter
    if (typeFilter) {
      filtered = filtered.filter(report => report.type === typeFilter);
    }

    // Date range filter
    if (dateFrom) {
      const fromDate = new Date(dateFrom);
      filtered = filtered.filter(report => {
        const periodStart = new Date(report.periodStart);
        return periodStart >= fromDate;
      });
    }
    if (dateTo) {
      const toDate = new Date(dateTo);
      toDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter(report => {
        const periodStart = new Date(report.periodStart);
        return periodStart <= toDate;
      });
    }

    setFilteredReports(filtered);
  }, [clientFilter, sdrFilter, typeFilter, dateFrom, dateTo, searchTerm, reports]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/reports');
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          router.push('/login');
          return;
        }
        throw new Error('Failed to fetch reports');
      }
      const data = await response.json();
      setReports(data.reports || []);
      setFilteredReports(data.reports || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load reports');
    } finally {
      setLoading(false);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await fetch('/api/admin/clients');
      if (response.ok) {
        const data = await response.json();
        setClients(data.clients || []);
      }
    } catch (err) {
      console.error('Failed to fetch clients:', err);
    }
  };

  const fetchSdrs = async () => {
    try {
      const response = await fetch('/api/admin/users?role=SDR');
      if (response.ok) {
        const data = await response.json();
        setSdrs(data.users || []);
      }
    } catch (err) {
      console.error('Failed to fetch SDRs:', err);
    }
  };

  const handleExportCSV = () => {
    const headers = ['Type', 'Client', 'SDR', 'Period Start', 'Period End', 'Summary', 'Created Date'];
    const rows = filteredReports.map(report => [
      report.type,
      typeof report.clientId === 'object' ? report.clientId.businessName : 'Unknown',
      report.createdBy?.name || 'N/A',
      new Date(report.periodStart).toLocaleDateString(),
      new Date(report.periodEnd).toLocaleDateString(),
      report.summary.replace(/,/g, ';'), // Replace commas to avoid CSV issues
      new Date(report.createdAt).toLocaleDateString(),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reports-export-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const clearFilters = () => {
    setClientFilter('');
    setSdrFilter('');
    setTypeFilter('');
    setDateFrom('');
    setDateTo('');
    setSearchTerm('');
  };

  const handleViewReport = async (reportId: string) => {
    setReportDetailLoading(true);
    setReportDetailError('');
    setShowReportDetail(true);
    setSelectedReport(null);

    try {
      const response = await fetch(`/api/admin/reports/${reportId}`);
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          router.push('/login');
          return;
        }
        throw new Error('Failed to fetch report details');
      }
      const data = await response.json();
      setSelectedReport(data.report);
    } catch (err: any) {
      setReportDetailError(err.message || 'Failed to load report details');
    } finally {
      setReportDetailLoading(false);
    }
  };

  const closeReportDetail = () => {
    setShowReportDetail(false);
    setSelectedReport(null);
    setReportDetailError('');
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <LogoComponent width={48} height={26} hoverGradient={true} />
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.25rem', color: 'var(--imperial-emerald)' }}>
            Reports Management
          </h1>
          <p style={{ color: 'var(--muted-jade)', fontSize: '0.875rem' }}>
            View and manage all reports across all clients
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          className="btn-secondary"
          style={{ whiteSpace: 'nowrap' }}
        >
          <Download size={16} style={{ marginRight: '0.5rem', display: 'inline-block', verticalAlign: 'middle' }} />
          Export CSV
        </button>
      </div>

      {error && (
        <div className="card" style={{ background: '#fee2e2', color: '#dc2626', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      {/* Filters */}
      <div className="card" style={{ marginBottom: '1.5rem', padding: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <Filter size={16} color="var(--imperial-emerald)" />
          <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--imperial-emerald)' }}>Filters</h3>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'flex-end', marginBottom: '0.75rem' }}>
          <div style={{ flex: '1 1 150px', minWidth: '120px' }}>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem', fontWeight: '500', color: 'var(--imperial-emerald)' }}>
              Search
            </label>
            <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: '0.5rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-jade)' }} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="input"
                style={{ paddingLeft: '2rem', width: '100%', fontSize: '0.75rem', padding: '0.5rem 0.5rem 0.5rem 2rem' }}
              />
            </div>
          </div>
          <div style={{ flex: '1 1 120px', minWidth: '100px' }}>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem', fontWeight: '500', color: 'var(--imperial-emerald)' }}>
              Client
            </label>
            <select
              value={clientFilter}
              onChange={(e) => setClientFilter(e.target.value)}
              className="input"
              style={{ width: '100%', fontSize: '0.75rem', padding: '0.5rem' }}
            >
              <option value="">All Clients</option>
              {clients.map((client) => (
                <option key={client._id} value={client._id}>
                  {client.businessName}
                </option>
              ))}
            </select>
          </div>
          <div style={{ flex: '1 1 120px', minWidth: '100px' }}>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem', fontWeight: '500', color: 'var(--imperial-emerald)' }}>
              SDR
            </label>
            <select
              value={sdrFilter}
              onChange={(e) => setSdrFilter(e.target.value)}
              className="input"
              style={{ width: '100%', fontSize: '0.75rem', padding: '0.5rem' }}
            >
              <option value="">All SDRs</option>
              {sdrs.map((sdr) => (
                <option key={sdr._id} value={sdr._id}>
                  {sdr.name}
                </option>
              ))}
            </select>
          </div>
          <div style={{ flex: '1 1 100px', minWidth: '90px' }}>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem', fontWeight: '500', color: 'var(--imperial-emerald)' }}>
              Type
            </label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="input"
              style={{ width: '100%', fontSize: '0.75rem', padding: '0.5rem' }}
            >
              <option value="">All Types</option>
              <option value="WEEKLY">Weekly</option>
              <option value="MONTHLY">Monthly</option>
              <option value="QUARTERLY">Quarterly</option>
            </select>
          </div>
          <div style={{ flex: '1 1 130px', minWidth: '110px' }}>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem', fontWeight: '500', color: 'var(--imperial-emerald)' }}>
              From Date
            </label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="input"
              style={{ width: '100%', fontSize: '0.75rem', padding: '0.5rem' }}
            />
          </div>
          <div style={{ flex: '1 1 130px', minWidth: '110px' }}>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem', fontWeight: '500', color: 'var(--imperial-emerald)' }}>
              To Date
            </label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="input"
              style={{ width: '100%', fontSize: '0.75rem', padding: '0.5rem' }}
            />
          </div>
          <div style={{ flex: '0 0 auto' }}>
            <button
              onClick={clearFilters}
              className="btn-secondary"
              style={{ fontSize: '0.75rem', padding: '0.5rem 0.75rem', whiteSpace: 'nowrap' }}
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="card" style={{ padding: '0' }}>
        <div style={{ 
          padding: '1.5rem', 
          borderBottom: '2px solid rgba(196, 183, 91, 0.3)',
          background: 'linear-gradient(135deg, rgba(196, 183, 91, 0.1) 0%, rgba(196, 183, 91, 0.05) 100%)'
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', color: 'var(--imperial-emerald)', fontWeight: '600' }}>
            All Reports
          </h2>
          <p style={{ color: 'var(--muted-jade)', fontSize: '0.875rem' }}>
            {filteredReports.length} {filteredReports.length === 1 ? 'report' : 'reports'} {clientFilter || sdrFilter || typeFilter || searchTerm ? '(filtered)' : 'total'}
          </p>
        </div>
        {filteredReports.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ color: 'var(--muted-jade)', fontSize: '1rem' }}>
              {reports.length === 0 ? 'No reports found.' : 'No reports match the selected filters.'}
            </p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ 
                  background: 'rgba(11, 46, 43, 0.05)',
                  borderBottom: '2px solid rgba(196, 183, 91, 0.3)'
                }}>
                  <th style={{ 
                    padding: '1rem', 
                    textAlign: 'left', 
                    fontWeight: '600', 
                    color: 'var(--imperial-emerald)',
                    fontSize: '0.875rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Type
                  </th>
                  <th style={{ 
                    padding: '1rem', 
                    textAlign: 'left', 
                    fontWeight: '600', 
                    color: 'var(--imperial-emerald)',
                    fontSize: '0.875rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Client
                  </th>
                  <th style={{ 
                    padding: '1rem', 
                    textAlign: 'left', 
                    fontWeight: '600', 
                    color: 'var(--imperial-emerald)',
                    fontSize: '0.875rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Period
                  </th>
                  <th style={{ 
                    padding: '1rem', 
                    textAlign: 'left', 
                    fontWeight: '600', 
                    color: 'var(--imperial-emerald)',
                    fontSize: '0.875rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Summary
                  </th>
                  <th style={{ 
                    padding: '1rem', 
                    textAlign: 'left', 
                    fontWeight: '600', 
                    color: 'var(--imperial-emerald)',
                    fontSize: '0.875rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Created By
                  </th>
                  <th style={{ 
                    padding: '1rem', 
                    textAlign: 'left', 
                    fontWeight: '600', 
                    color: 'var(--imperial-emerald)',
                    fontSize: '0.875rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Date
                  </th>
                  <th style={{ 
                    padding: '1rem', 
                    textAlign: 'center', 
                    fontWeight: '600', 
                    color: 'var(--imperial-emerald)',
                    fontSize: '0.875rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report) => {
                  const clientId = typeof report.clientId === 'object' ? report.clientId._id : report.clientId;
                  const clientName = typeof report.clientId === 'object' ? report.clientId.businessName : 'Unknown';
                  
                  return (
                    <tr 
                      key={report._id}
                      style={{ 
                        borderBottom: '1px solid rgba(196, 183, 91, 0.15)',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleViewReport(report._id)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(196, 183, 91, 0.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '';
                      }}
                    >
                      <td style={{ padding: '1rem' }}>
                        <span style={{ 
                          display: 'inline-block',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '0.375rem',
                          background: 'rgba(196, 183, 91, 0.2)',
                          color: 'var(--imperial-emerald)',
                          fontWeight: '600',
                          fontSize: '0.75rem',
                          textTransform: 'uppercase'
                        }}>
                          {report.type}
                        </span>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: '500', color: 'var(--imperial-emerald)' }}>
                          {clientName}
                        </div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ color: 'var(--muted-jade)', fontSize: '0.875rem' }}>
                          {new Date(report.periodStart).toLocaleDateString()} - {new Date(report.periodEnd).toLocaleDateString()}
                        </div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ color: 'var(--muted-jade)', fontSize: '0.875rem', maxWidth: '400px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {report.summary}
                        </div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        {report.createdBy ? (
                          <div style={{ color: 'var(--muted-jade)', fontSize: '0.875rem' }}>
                            <div style={{ fontWeight: '500' }}>{report.createdBy.name}</div>
                            <div style={{ fontSize: '0.75rem' }}>{report.createdBy.email}</div>
                          </div>
                        ) : (
                          <span style={{ color: 'var(--muted-jade)', fontSize: '0.875rem', fontStyle: 'italic' }}>—</span>
                        )}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ color: 'var(--muted-jade)', fontSize: '0.875rem' }}>
                          {new Date(report.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => handleViewReport(report._id)}
                          style={{
                            padding: '0.5rem 1rem',
                            border: 'none',
                            background: 'rgba(196, 183, 91, 0.1)',
                            borderRadius: '0.375rem',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            transition: 'all 0.2s ease',
                            color: 'var(--imperial-emerald)',
                            fontWeight: '500',
                            fontSize: '0.875rem'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(196, 183, 91, 0.2)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(196, 183, 91, 0.1)';
                          }}
                          title="View Report Details"
                        >
                          <Eye size={16} />
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Report Detail Modal */}
      {showReportDetail && (
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
              closeReportDetail();
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '2px solid rgba(196, 183, 91, 0.3)', paddingBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--imperial-emerald)', fontWeight: '600' }}>
                Report Details
              </h2>
              <button
                type="button"
                onClick={closeReportDetail}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: 'var(--muted-jade)',
                  padding: '0.25rem 0.5rem',
                  lineHeight: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--imperial-emerald)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--muted-jade)';
                }}
              >
                <X size={24} />
              </button>
            </div>

            {reportDetailLoading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '3rem' }}>
                <div className="spinner" />
              </div>
            ) : reportDetailError ? (
              <div className="card" style={{ background: '#fee2e2', color: '#dc2626', padding: '1rem', marginBottom: '1rem' }}>
                {reportDetailError}
              </div>
            ) : selectedReport ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Report Header Info */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--muted-jade)', marginBottom: '0.25rem' }}>Report Type</div>
                    <div style={{ fontWeight: '600', color: 'var(--imperial-emerald)' }}>
                      <span style={{ 
                        display: 'inline-block',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '0.375rem',
                        background: 'rgba(196, 183, 91, 0.2)',
                        color: 'var(--imperial-emerald)',
                        fontWeight: '600',
                        fontSize: '0.875rem',
                        textTransform: 'uppercase'
                      }}>
                        {selectedReport.type}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--muted-jade)', marginBottom: '0.25rem' }}>Client</div>
                    <div style={{ fontWeight: '600', color: 'var(--imperial-emerald)' }}>
                      {selectedReport.clientId.businessName}
                    </div>
                    {selectedReport.clientId.pointOfContactName && (
                      <div style={{ fontSize: '0.875rem', color: 'var(--muted-jade)', marginTop: '0.25rem' }}>
                        {selectedReport.clientId.pointOfContactName}
                        {selectedReport.clientId.pointOfContactEmail && ` (${selectedReport.clientId.pointOfContactEmail})`}
                      </div>
                    )}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--muted-jade)', marginBottom: '0.25rem' }}>Period</div>
                    <div style={{ fontWeight: '500', color: 'var(--imperial-emerald)' }}>
                      {new Date(selectedReport.periodStart).toLocaleDateString()} - {new Date(selectedReport.periodEnd).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--muted-jade)', marginBottom: '0.25rem' }}>Created By</div>
                    <div style={{ fontWeight: '500', color: 'var(--imperial-emerald)' }}>
                      {selectedReport.createdBy?.name || 'Unknown'}
                    </div>
                    {selectedReport.createdBy?.email && (
                      <div style={{ fontSize: '0.875rem', color: 'var(--muted-jade)', marginTop: '0.25rem' }}>
                        {selectedReport.createdBy.email}
                      </div>
                    )}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--muted-jade)', marginBottom: '0.25rem' }}>Created Date</div>
                    <div style={{ color: 'var(--muted-jade)' }}>
                      {new Date(selectedReport.createdAt).toLocaleString()}
                    </div>
                  </div>
                  {selectedReport.licenseId && (
                    <div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--muted-jade)', marginBottom: '0.25rem' }}>License/Service</div>
                      <div style={{ fontWeight: '500', color: 'var(--imperial-emerald)' }}>
                        {selectedReport.licenseId.productOrServiceName || selectedReport.licenseId.label}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--muted-jade)', marginTop: '0.25rem' }}>
                        {selectedReport.licenseId.serviceType}
                      </div>
                    </div>
                  )}
                </div>

                {/* Summary Section */}
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--imperial-emerald)', marginBottom: '0.75rem' }}>
                    Summary
                  </h3>
                  <div style={{ 
                    padding: '1rem', 
                    background: 'rgba(11, 46, 43, 0.05)', 
                    borderRadius: '0.5rem',
                    border: '1px solid rgba(196, 183, 91, 0.2)',
                    whiteSpace: 'pre-wrap',
                    lineHeight: '1.6',
                    color: 'var(--muted-jade)'
                  }}>
                    {selectedReport.summary}
                  </div>
                </div>

                {/* LinkedIn Metrics Section */}
                {(selectedReport.inMailsSent || selectedReport.connectionRequestsSent) && (
                  <div>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--imperial-emerald)', marginBottom: '0.75rem' }}>
                      LinkedIn Metrics
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                      {selectedReport.inMailsSent !== undefined && (
                        <div style={{ padding: '1rem', background: 'rgba(11, 46, 43, 0.05)', borderRadius: '0.5rem', border: '1px solid rgba(196, 183, 91, 0.2)' }}>
                          <div style={{ fontSize: '0.875rem', color: 'var(--muted-jade)', marginBottom: '0.25rem' }}>InMails Sent</div>
                          <div style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--imperial-emerald)' }}>
                            {selectedReport.inMailsSent}
                          </div>
                          {selectedReport.inMailsPositiveResponse !== undefined && selectedReport.inMailsPositiveResponse > 0 && (
                            <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '0.25rem' }}>
                              {selectedReport.inMailsPositiveResponse} positive responses
                            </div>
                          )}
                        </div>
                      )}
                      {selectedReport.connectionRequestsSent !== undefined && (
                        <div style={{ padding: '1rem', background: 'rgba(11, 46, 43, 0.05)', borderRadius: '0.5rem', border: '1px solid rgba(196, 183, 91, 0.2)' }}>
                          <div style={{ fontSize: '0.875rem', color: 'var(--muted-jade)', marginBottom: '0.25rem' }}>Connection Requests Sent</div>
                          <div style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--imperial-emerald)' }}>
                            {selectedReport.connectionRequestsSent}
                          </div>
                          {selectedReport.connectionRequestsPositiveResponse !== undefined && selectedReport.connectionRequestsPositiveResponse > 0 && (
                            <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '0.25rem' }}>
                              {selectedReport.connectionRequestsPositiveResponse} positive responses
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Additional Metrics Section */}
                {selectedReport.metrics && Object.keys(selectedReport.metrics).length > 0 && (
                  <div>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--imperial-emerald)', marginBottom: '0.75rem' }}>
                      Additional Metrics
                    </h3>
                    <div style={{ 
                      padding: '1rem', 
                      background: 'rgba(11, 46, 43, 0.05)', 
                      borderRadius: '0.5rem',
                      border: '1px solid rgba(196, 183, 91, 0.2)'
                    }}>
                      <pre style={{ 
                        margin: 0, 
                        fontFamily: 'inherit',
                        fontSize: '0.875rem',
                        color: 'var(--muted-jade)',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word'
                      }}>
                        {JSON.stringify(selectedReport.metrics, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

