'use client';

import { useState, useEffect, useCallback } from 'react';
import DataTable, { Column } from './DataTable';
import FilterBar, { FilterState } from './FilterBar';

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
  type: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY';
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

interface ReportsTableProps {
  onExport?: (reports: Report[]) => void;
  refreshTrigger?: number; // Trigger refresh when this changes
}

const TYPE_COLORS: Record<Report['type'], string> = {
  DAILY: '#06b6d4',
  WEEKLY: '#3b82f6',
  MONTHLY: '#8b5cf6',
  QUARTERLY: '#f59e0b',
};

export default function ReportsTable({ onExport, refreshTrigger }: ReportsTableProps) {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    types: [],
    dateFrom: '',
    dateTo: '',
  });
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [clientFilter, setClientFilter] = useState<string>('');

  const fetchReports = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();

      if (clientFilter) {
        params.append('clientId', clientFilter);
      }
      if (filters.types.length > 0) {
        params.append('type', filters.types[0]); // Reports API uses single type
      }
      if (filters.dateFrom) {
        params.append('from', filters.dateFrom);
      }
      if (filters.dateTo) {
        params.append('to', filters.dateTo);
      }

      const response = await fetch(`/api/sdr/reports?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch reports');
      }

      const data = await response.json();
      let filteredReports = data.reports || [];

      // Client-side search filtering
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredReports = filteredReports.filter((report: Report) =>
          report.clientId.businessName.toLowerCase().includes(searchLower) ||
          report.summary.toLowerCase().includes(searchLower)
        );
      }

      // Client-side sorting
      filteredReports.sort((a: Report, b: Report) => {
        let aVal: any;
        let bVal: any;

        if (sortBy === 'clientId') {
          aVal = a.clientId.businessName;
          bVal = b.clientId.businessName;
        } else if (sortBy === 'periodStart') {
          aVal = new Date(a.periodStart).getTime();
          bVal = new Date(b.periodStart).getTime();
        } else if (sortBy === 'createdAt') {
          aVal = new Date(a.createdAt).getTime();
          bVal = new Date(b.createdAt).getTime();
        } else {
          aVal = (a as any)[sortBy];
          bVal = (b as any)[sortBy];
        }

        if (sortOrder === 'asc') {
          return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
        } else {
          return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
        }
      });

      setReports(filteredReports);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  }, [filters, sortBy, sortOrder, clientFilter]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports, refreshTrigger]);

  const handleSort = (column: string, order: 'asc' | 'desc') => {
    setSortBy(column);
    setSortOrder(order);
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleExport = () => {
    if (onExport) {
      onExport(reports);
    } else {
      // Default CSV export
      const headers = ['Client', 'Type', 'Period Start', 'Period End', 'Summary', 'InMails Sent', 'InMails Positive', 'Connection Requests Sent', 'Connection Requests Positive', 'Created'];
      const rows = reports.map(report => [
        report.clientId.businessName,
        report.type,
        new Date(report.periodStart).toLocaleDateString(),
        new Date(report.periodEnd).toLocaleDateString(),
        report.summary.replace(/,/g, ';'),
        report.inMailsSent || 0,
        report.inMailsPositiveResponse || 0,
        report.connectionRequestsSent || 0,
        report.connectionRequestsPositiveResponse || 0,
        new Date(report.createdAt).toLocaleString(),
      ]);

      const csv = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
      ].join('\n');

      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `reports-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  const columns: Column<Report>[] = [
    {
      key: 'clientId',
      label: 'Client',
      sortable: true,
      render: (value, row) => (
        <span style={{ fontWeight: '600', color: 'var(--imperial-emerald)' }}>
          {row.clientId.businessName}
        </span>
      ),
    },
    {
      key: 'type',
      label: 'Type',
      sortable: true,
      width: '100px',
      render: (value) => (
        <span style={{
          padding: '0.25rem 0.75rem',
          borderRadius: '0.375rem',
          fontSize: '0.75rem',
          fontWeight: '600',
          background: `${TYPE_COLORS[value as Report['type']]}20`,
          color: TYPE_COLORS[value as Report['type']],
          textTransform: 'uppercase',
        }}>
          {value}
        </span>
      ),
    },
    {
      key: 'periodStart',
      label: 'Period',
      sortable: true,
      width: '200px',
      render: (value, row) => (
        <span style={{ fontSize: '0.875rem' }}>
          {new Date(value).toLocaleDateString()} - {new Date(row.periodEnd).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'summary',
      label: 'Summary',
      sortable: false,
      render: (value) => (
        <span style={{ fontSize: '0.875rem', color: 'var(--muted-jade)' }}>
          {value.length > 100 ? `${value.substring(0, 100)}...` : value}
        </span>
      ),
    },
    {
      key: 'metrics',
      label: 'Metrics',
      sortable: false,
      width: '150px',
      render: (value, row) => {
        const hasMetrics = row.inMailsSent !== undefined || row.connectionRequestsSent !== undefined;
        if (!hasMetrics) return <span style={{ fontSize: '0.75rem', color: 'var(--muted-jade)' }}>-</span>;
        
        return (
          <div style={{ fontSize: '0.75rem', color: 'var(--muted-jade)' }}>
            {row.inMailsSent !== undefined && (
              <div>InMails: {row.inMailsSent}</div>
            )}
            {row.connectionRequestsSent !== undefined && (
              <div>Connections: {row.connectionRequestsSent}</div>
            )}
          </div>
        );
      },
    },
    {
      key: 'createdAt',
      label: 'Created',
      sortable: true,
      width: '150px',
      render: (value) => (
        <span style={{ fontSize: '0.75rem', color: 'var(--muted-jade)' }}>
          {new Date(value).toLocaleString()}
        </span>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--imperial-emerald)', margin: 0 }}>
          Reports ({reports.length})
        </h3>
        <button
          onClick={handleExport}
          className="btn-secondary"
          style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
        >
          📥 Export CSV
        </button>
      </div>

      <FilterBar
        onFilterChange={handleFilterChange}
        initialFilters={filters}
        updateTypes={[
          { value: 'DAILY', label: 'Daily' },
          { value: 'WEEKLY', label: 'Weekly' },
          { value: 'MONTHLY', label: 'Monthly' },
          { value: 'QUARTERLY', label: 'Quarterly' },
        ]}
        showDateRange={true}
        showTypeFilter={true}
        showSearch={true}
      />

      <DataTable
        data={reports}
        columns={columns}
        loading={loading}
        emptyMessage="No reports found. Create your first report to get started."
        onSort={handleSort}
        sortBy={sortBy}
        sortOrder={sortOrder}
        expandableRow={(row) => (
          <div style={{ padding: '1rem', background: 'rgba(196, 183, 91, 0.05)', borderRadius: '0.5rem' }}>
            <div style={{ marginBottom: '0.75rem' }}>
              <strong style={{ color: 'var(--imperial-emerald)', fontSize: '0.875rem' }}>Full Summary:</strong>
              <p style={{ marginTop: '0.5rem', color: 'var(--muted-jade)', lineHeight: '1.6', fontSize: '0.875rem' }}>
                {row.summary}
              </p>
            </div>
            {(row.inMailsSent !== undefined || row.inMailsPositiveResponse !== undefined || 
              row.connectionRequestsSent !== undefined || row.connectionRequestsPositiveResponse !== undefined) && (
              <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '0.375rem', borderLeft: '3px solid #3b82f6' }}>
                <strong style={{ color: 'var(--imperial-emerald)', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                  LinkedIn Metrics
                </strong>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', fontSize: '0.875rem' }}>
                  {row.inMailsSent !== undefined && (
                    <div>
                      <span style={{ color: 'var(--muted-jade)' }}>InMails Sent: </span>
                      <strong style={{ color: 'var(--imperial-emerald)' }}>{row.inMailsSent}</strong>
                    </div>
                  )}
                  {row.inMailsPositiveResponse !== undefined && (
                    <div>
                      <span style={{ color: 'var(--muted-jade)' }}>InMails Positive: </span>
                      <strong style={{ color: '#10b981' }}>{row.inMailsPositiveResponse}</strong>
                      {row.inMailsSent && row.inMailsSent > 0 && (
                        <span style={{ color: 'var(--muted-jade)', marginLeft: '0.5rem' }}>
                          ({((row.inMailsPositiveResponse / row.inMailsSent) * 100).toFixed(1)}%)
                        </span>
                      )}
                    </div>
                  )}
                  {row.connectionRequestsSent !== undefined && (
                    <div>
                      <span style={{ color: 'var(--muted-jade)' }}>Connection Requests Sent: </span>
                      <strong style={{ color: 'var(--imperial-emerald)' }}>{row.connectionRequestsSent}</strong>
                    </div>
                  )}
                  {row.connectionRequestsPositiveResponse !== undefined && (
                    <div>
                      <span style={{ color: 'var(--muted-jade)' }}>Connection Requests Positive: </span>
                      <strong style={{ color: '#10b981' }}>{row.connectionRequestsPositiveResponse}</strong>
                      {row.connectionRequestsSent && row.connectionRequestsSent > 0 && (
                        <span style={{ color: 'var(--muted-jade)', marginLeft: '0.5rem' }}>
                          ({((row.connectionRequestsPositiveResponse / row.connectionRequestsSent) * 100).toFixed(1)}%)
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
            {row.licenseId && (
              <div style={{ marginTop: '0.75rem', fontSize: '0.875rem', color: 'var(--muted-jade)' }}>
                <strong style={{ color: 'var(--imperial-emerald)' }}>License: </strong>
                {row.licenseId.productOrServiceName || row.licenseId.label} ({row.licenseId.serviceType})
              </div>
            )}
          </div>
        )}
      />
    </div>
  );
}

