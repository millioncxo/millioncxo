'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import LogoComponent from '@/components/LogoComponent';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface OverviewRow {
  _id: string;
  businessName: string;
  pointOfContactName: string;
  pointOfContactEmail: string;
  totalLicenses: number;
  totalTarget: number;
  totalAchieved: number;
  assignedSdr?: { _id: string; name: string; email: string } | null;
  lastPaymentDate?: string | null;
  paymentCount?: number;
  achievementStatus?: 'ACHIEVED' | 'IN_PROGRESS' | 'OVERDUE';
  deadlineDate?: string | null;
}

interface OverviewResponse {
  success: boolean;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: OverviewRow[];
}

interface DetailResponse {
  success: boolean;
  client: {
    id: string;
    businessName: string;
    pointOfContact: {
      name: string;
      title: string | null;
      email: string;
      phone: string | null;
    };
    websiteAddress?: string | null;
    country?: string | null;
    fullRegisteredAddress: string;
    accountManager?: { _id: string; name: string; email: string } | null;
    plan: {
      name: string;
      planType: 'REGULAR' | 'POC' | null;
      pricePerLicense: number | null;
      currency: 'USD' | 'INR';
      numberOfLicenses: number;
      totalCostOfService: number | null;
    };
    paymentStatus?: string;
    paymentDetails?: any;
    targetDeadline?: string | null;
    createdAt: string;
    updatedAt: string;
  };
  licenses: Array<{
    id: string;
    productOrServiceName: string;
    serviceType: string;
    label: string;
    status: string;
    startDate: string;
    endDate: string | null;
  }>;
  assignments: Array<{
    id: string;
    sdr: { id: string; name: string; email: string } | null;
    licenses: string[];
  }>;
  summary: {
    totalLicenses: number;
    totalTarget: number;
    totalAchieved: number;
    achievementStatus?: 'ACHIEVED' | 'IN_PROGRESS' | 'OVERDUE';
    deadlineDate?: string | null;
  };
  paymentHistory?: {
    invoices: Array<{
      id: string;
      invoiceNumber: string;
      invoiceDate: string;
      paymentDate: string | null;
      amount: number;
      currency: string;
      status: string;
      dueDate: string;
      description: string;
      fileId?: string | null;
    }>;
    paymentSummary: {
      totalInvoices: number;
      paidCount: number;
      totalPaid: number;
      lastPaymentDate: string | null;
      paymentDates: string[];
    };
  };
  updates: Array<{
    id: string;
    type: string;
    title: string;
    description: string;
    date: string;
    sdr?: { id: string; name: string; email: string } | null;
  }>;
  reports: Array<{
    id: string;
    type: string;
    periodStart: string;
    periodEnd: string;
    summary: string;
    createdBy?: { id: string; name: string; email: string; role?: string } | null;
  }>;
}

interface AdminNote {
  _id: string;
  content: string;
  tag: 'ACCOUNT' | 'BILLING' | 'RISK';
  pinned?: boolean;
  authorId?: { _id: string; name: string; email: string };
  createdAt: string;
}

interface DashboardStats {
  totalClients: number;
  totalSdrs: number;
  activeAssignments: number;
  revenue: {
    total: number;
    thisMonth: number;
    thisYear: number;
    paid: number;
    outstanding: number;
  };
  invoices: {
    total: number;
    active: number;
    overdue: number;
    paid: number;
  };
}

export default function AdminDashboard() {
  const router = useRouter();
  const [rows, setRows] = useState<OverviewRow[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [sdrFilter, setSdrFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detail, setDetail] = useState<DetailResponse | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [notes, setNotes] = useState<AdminNote[]>([]);
  const [notesLoading, setNotesLoading] = useState(false);
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteTag, setNewNoteTag] = useState<'ACCOUNT' | 'BILLING' | 'RISK'>('ACCOUNT');
  const [newNotePinned, setNewNotePinned] = useState(false);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [chartData, setChartData] = useState<any>(null);
  const [chartsLoading, setChartsLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState<Array<{
    type: string;
    title: string;
    description: string;
    date: string;
    clientId?: string;
    clientName?: string;
  }>>([]);
  const [activityLoading, setActivityLoading] = useState(true);


  const fetchOverview = async (opts?: { page?: number; search?: string; sdrId?: string; status?: string }) => {
    const nextPage = opts?.page ?? page;
    const nextSearch = opts?.search ?? search;
    const nextSdr = opts?.sdrId ?? sdrFilter;
    const nextStatus = opts?.status ?? statusFilter;
    const params = new URLSearchParams({
      page: String(nextPage),
      limit: '10',
    });
    if (nextSearch.trim()) params.set('search', nextSearch.trim());
    if (nextSdr) params.set('sdrId', nextSdr);
    if (nextStatus) params.set('status', nextStatus);

    try {
      setLoading(true);
      const res = await fetch(`/api/admin/overview?${params.toString()}`);
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          router.push('/login');
          return;
        }
        throw new Error('Failed to load overview');
      }
      const data: OverviewResponse = await res.json();
      setRows(data.data || []);
      setPage(data.page);
      setTotalPages(data.totalPages);
      setTotal(data.total);
    } catch (err: any) {
      setError(err.message || 'Failed to load overview');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview({ page: 1 });
    fetchDashboardStats();
    fetchChartData();
    fetchRecentActivity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setStatsLoading(true);
      const res = await fetch('/api/admin/dashboard/stats');
      if (!res.ok) {
        throw new Error('Failed to load dashboard statistics');
      }
      const data = await res.json();
      setStats(data.stats);
    } catch (err: any) {
      console.error('Failed to fetch dashboard stats:', err);
    } finally {
      setStatsLoading(false);
    }
  };

  const fetchChartData = async () => {
    try {
      setChartsLoading(true);
      const res = await fetch('/api/admin/dashboard/charts?months=12');
      if (!res.ok) {
        throw new Error('Failed to load chart data');
      }
      const data = await res.json();
      setChartData(data.charts);
    } catch (err: any) {
      console.error('Failed to fetch chart data:', err);
    } finally {
      setChartsLoading(false);
    }
  };

  const fetchRecentActivity = async () => {
    try {
      setActivityLoading(true);
      const res = await fetch('/api/admin/dashboard/activity?limit=20');
      if (!res.ok) {
        throw new Error('Failed to load activity feed');
      }
      const data = await res.json();
      setRecentActivity(data.activities || []);
    } catch (err: any) {
      console.error('Failed to fetch activity:', err);
    } finally {
      setActivityLoading(false);
    }
  };

  const uniqueSdrs = useMemo(() => {
    const map = new Map<string, { _id: string; name: string; email: string }>();
    rows.forEach((r) => {
      if (r.assignedSdr?._id) {
        map.set(r.assignedSdr._id, r.assignedSdr);
      }
    });
    return Array.from(map.values());
  }, [rows]);

  const totalLicensesAgg = rows.reduce((sum, r) => sum + (r.totalLicenses || 0), 0);
  const totalTargetsAgg = rows.reduce((sum, r) => sum + (r.totalTarget || 0), 0);
  const totalAchievedAgg = rows.reduce((sum, r) => sum + (r.totalAchieved || 0), 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOverview({ page: 1, search });
  };

  const handleSdrFilter = (value: string) => {
    setSdrFilter(value);
    fetchOverview({ page: 1, sdrId: value });
  };

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages) return;
    fetchOverview({ page: nextPage });
  };

  const openDetail = async (id: string) => {
    setSelectedId(id);
    setShowDetail(true);
    setDetail(null);
    setDetailError('');
    setNotes([]);
    setDetailLoading(true);
    try {
      const res = await fetch(`/api/admin/overview/${id}`);
      if (!res.ok) {
        throw new Error('Failed to load detail');
      }
      const data: DetailResponse = await res.json();
      setDetail(data);
      fetchNotes(id);
    } catch (err: any) {
      setDetailError(err.message || 'Failed to load detail');
    } finally {
      setDetailLoading(false);
    }
  };

  const closeDetail = () => {
    setShowDetail(false);
    setSelectedId(null);
    setDetail(null);
    setDetailError('');
  };


  const fetchNotes = async (clientId: string) => {
    try {
      setNotesLoading(true);
      const res = await fetch(`/api/admin/clients/${clientId}/notes`);
      if (!res.ok) throw new Error('Failed to load notes');
      const data = await res.json();
      setNotes(data.notes || []);
    } catch (err) {
      // ignore silently for now
    } finally {
      setNotesLoading(false);
    }
  };

  const addNote = async () => {
    if (!selectedId || !newNoteContent.trim()) return;
    try {
      const res = await fetch(`/api/admin/clients/${selectedId}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: newNoteContent.trim(),
          tag: newNoteTag,
          pinned: newNotePinned,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to add note');
      }
      setNewNoteContent('');
      setNewNotePinned(false);
      await fetchNotes(selectedId);
    } catch (err: any) {
      setError(err.message || 'Failed to add note');
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
    <>
      <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <LogoComponent width={48} height={26} hoverGradient={true} />
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.25rem', color: 'var(--imperial-emerald)' }}>
            Admin Consolidated Overview
          </h1>
          <p style={{ color: 'var(--muted-jade)', fontSize: '0.875rem' }}>
            Full visibility across clients, SDRs, targets, and achieved work
          </p>
        </div>
        <button
          onClick={async () => {
            try {
              const response = await fetch('/api/admin/export/clients?format=csv');
              if (!response.ok) throw new Error('Failed to export');
              const blob = await response.blob();
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `clients-export-${new Date().toISOString().split('T')[0]}.csv`;
              document.body.appendChild(a);
              a.click();
              window.URL.revokeObjectURL(url);
              document.body.removeChild(a);
            } catch (err: any) {
              setError(err.message || 'Failed to export clients');
            }
          }}
          className="btn-secondary"
          style={{ whiteSpace: 'nowrap' }}
        >
          Export Clients (CSV)
        </button>
      </div>

      {error && (
        <div className="card" style={{ background: '#fee2e2', color: '#dc2626', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      {/* KPI Summary Cards */}
      {!statsLoading && stats && (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '0.75rem', 
          marginBottom: '1.5rem' 
        }}>
          <div className="card" style={{ padding: '1rem' }}>
            <div style={{ color: 'var(--muted-jade)', fontSize: '0.8rem', marginBottom: '0.375rem' }}>Total Clients</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--imperial-emerald)' }}>
              {stats.totalClients}
            </div>
          </div>
          <div className="card" style={{ padding: '1rem' }}>
            <div style={{ color: 'var(--muted-jade)', fontSize: '0.8rem', marginBottom: '0.375rem' }}>Total Revenue</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--imperial-emerald)' }}>
              ${stats.revenue.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
          <div className="card" style={{ padding: '1rem' }}>
            <div style={{ color: 'var(--muted-jade)', fontSize: '0.8rem', marginBottom: '0.375rem' }}>Total SDRs</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--imperial-emerald)' }}>
              {stats.totalSdrs}
            </div>
          </div>
        </div>
      )}

      {/* Charts Section */}
      {!chartsLoading && chartData && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
          {/* Revenue Trend Chart */}
          <div className="card" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(11, 46, 43, 0.02) 0%, rgba(196, 183, 91, 0.02) 100%)', border: '1px solid rgba(196, 183, 91, 0.2)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--imperial-emerald)' }}>
              Revenue Trend (Last 12 Months)
            </h3>
            {chartData.revenueTrend && chartData.revenueTrend.length > 0 ? (
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={chartData.revenueTrend} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(11, 46, 43, 0.1)" />
                  <XAxis 
                    dataKey="month" 
                    stroke="var(--muted-jade)"
                    style={{ fontSize: '0.75rem' }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis 
                    stroke="var(--muted-jade)"
                    style={{ fontSize: '0.75rem' }}
                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                    domain={[0, 50000]}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid rgba(196, 183, 91, 0.3)',
                      borderRadius: '0.5rem',
                      padding: '0.75rem'
                    }}
                    formatter={(value: number) => [`$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, '']}
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: '1rem' }}
                    iconType="line"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="var(--imperial-emerald)" 
                    strokeWidth={3}
                    dot={{ fill: 'var(--imperial-emerald)', r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Total Revenue" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="paid" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    dot={{ fill: '#10b981', r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Paid Revenue" 
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '320px', color: 'var(--muted-jade)' }}>
                <p>No revenue data available</p>
              </div>
            )}
          </div>

          {/* Client Growth Chart */}
          <div className="card" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(11, 46, 43, 0.02) 0%, rgba(196, 183, 91, 0.02) 100%)', border: '1px solid rgba(196, 183, 91, 0.2)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--imperial-emerald)' }}>
              Client Growth (Last 12 Months)
            </h3>
            {chartData.clientGrowth && chartData.clientGrowth.length > 0 ? (
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={chartData.clientGrowth} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(11, 46, 43, 0.1)" />
                  <XAxis 
                    dataKey="month" 
                    stroke="var(--muted-jade)"
                    style={{ fontSize: '0.75rem' }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis 
                    stroke="var(--muted-jade)"
                    style={{ fontSize: '0.75rem' }}
                    domain={[0, 100]}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid rgba(196, 183, 91, 0.3)',
                      borderRadius: '0.5rem',
                      padding: '0.75rem'
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: '1rem' }}
                    iconType="line"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="totalClients" 
                    stroke="var(--imperial-emerald)" 
                    strokeWidth={3}
                    dot={{ fill: 'var(--imperial-emerald)', r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Total Clients" 
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '320px', color: 'var(--muted-jade)' }}>
                <p>No client data available</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Recent Activity Feed */}
      {!activityLoading && (
        <div className="card" style={{ marginBottom: '1.5rem', padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--imperial-emerald)' }}>
            Recent Activity (Last 5 Hours)
          </h3>
          {recentActivity.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {recentActivity.map((activity, index) => {
              const activityColors: Record<string, string> = {
                INVOICE_GENERATED: '#f59e0b',
                PAYMENT_RECEIVED: '#10b981',
                CLIENT_CREATED: '#3b82f6',
                CLIENT_UPDATED: '#6366f1',
                SDR_ASSIGNED: '#8b5cf6',
                REPORT_CREATED: '#ec4899',
              };
              const color = activityColors[activity.type] || 'var(--muted-jade)';

              return (
                <div
                  key={index}
                  style={{
                    padding: '0.75rem',
                    borderLeft: `3px solid ${color}`,
                    background: 'rgba(11, 46, 43, 0.03)',
                    borderRadius: '0.375rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: '600', color: 'var(--imperial-emerald)', fontSize: '0.875rem' }}>
                      {activity.title}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--muted-jade)' }}>
                      {new Date(activity.date).toLocaleDateString()} {new Date(activity.date).toLocaleTimeString()}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--muted-jade)' }}>
                    {activity.description}
                  </div>
                  {activity.clientName && (
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted-jade)', marginTop: '0.25rem', fontStyle: 'italic' }}>
                      Client: {activity.clientName}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--muted-jade)' }}>
              <p style={{ fontSize: '1rem' }}>No recent activity in the past 5 hours</p>
            </div>
          )}
        </div>
      )}

      <div className="card" style={{ marginBottom: '1.5rem', padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center', width: '100%' }}>
          <input
            type="text"
            placeholder="Search business or POC"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: '0.65rem 0.75rem',
              borderRadius: '0.5rem',
              border: '1px solid rgba(11,46,43,0.2)',
              minWidth: '220px',
              flex: '1',
            }}
          />
          <select
            value={sdrFilter}
            onChange={(e) => handleSdrFilter(e.target.value)}
            style={{
              padding: '0.65rem 0.75rem',
              borderRadius: '0.5rem',
              border: '1px solid rgba(11,46,43,0.2)',
              minWidth: '200px',
            }}
          >
            <option value="">All SDRs</option>
            {uniqueSdrs.map((sdr) => (
              <option key={sdr._id} value={sdr._id}>
                {sdr.name} ({sdr.email})
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              fetchOverview({ page: 1, status: e.target.value });
            }}
            style={{
              padding: '0.65rem 0.75rem',
              borderRadius: '0.5rem',
              border: '1px solid rgba(11,46,43,0.2)',
              minWidth: '180px',
            }}
          >
            <option value="">All Status</option>
            <option value="ACHIEVED">Achieved</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="OVERDUE">Overdue</option>
          </select>
          <button
            type="submit"
            style={{
              padding: '0.65rem 1rem',
              borderRadius: '0.5rem',
              border: 'none',
              background: 'var(--imperial-emerald)',
              color: 'white',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Search
          </button>
        </form>
      </div>

      <div className="card" style={{ marginBottom: '2rem', padding: '0' }}>
        <div
          style={{
            padding: '1.5rem',
            borderBottom: '2px solid rgba(196, 183, 91, 0.3)',
            background: 'linear-gradient(135deg, rgba(196, 183, 91, 0.1) 0%, rgba(196, 183, 91, 0.05) 100%)',
          }}
        >
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', color: 'var(--imperial-emerald)', fontWeight: '600' }}>
            Clients Overview
        </h2>
          <p style={{ color: 'var(--muted-jade)', fontSize: '0.875rem' }}>
            {total} {total === 1 ? 'client' : 'clients'} · Page {page} of {totalPages}
          </p>
        </div>

        {rows.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ color: 'var(--muted-jade)', marginBottom: '1.5rem', fontSize: '1rem' }}>
              No clients found. Adjust filters or create a client to get started.
            </p>
            <a href="/admin/clients" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
              Go to Clients Management
            </a>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr
                  style={{
                    background: 'rgba(11, 46, 43, 0.05)',
                    borderBottom: '2px solid rgba(196, 183, 91, 0.3)',
                  }}
                >
                  {['Business Name', 'POC', 'Payment Dates', 'Progress', 'Total Target', 'Total Achieved', 'SDR', 'Actions'].map((header) => (
                    <th
                      key={header}
                      style={{
                        padding: '1rem',
                        textAlign: 'left',
                        fontWeight: '600',
                        color: 'var(--imperial-emerald)',
                        fontSize: '0.875rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row._id}
                    style={{
                      borderBottom: '1px solid rgba(196, 183, 91, 0.15)',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(196, 183, 91, 0.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '';
                    }}
                    onClick={() => openDetail(row._id)}
                  >
                    <td style={{ padding: '1rem' }}>
                      <div style={{ fontWeight: '600', color: 'var(--imperial-emerald)', marginBottom: '0.25rem' }}>
                        {row.businessName}
                      </div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ color: 'var(--muted-jade)', fontSize: '0.875rem' }}>
                        <div style={{ fontWeight: '500', marginBottom: '0.125rem' }}>{row.pointOfContactName}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--muted-jade)' }}>{row.pointOfContactEmail}</div>
                      </div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      {row.paymentCount && row.paymentCount > 0 ? (
                        <div style={{ fontSize: '0.875rem' }}>
                          <div style={{ fontWeight: '500', color: 'var(--imperial-emerald)', marginBottom: '0.125rem' }}>
                            {row.paymentCount} {row.paymentCount === 1 ? 'payment' : 'payments'}
                          </div>
                          {row.lastPaymentDate && (
                            <div style={{ fontSize: '0.75rem', color: 'var(--muted-jade)' }}>
                              Last: {new Date(row.lastPaymentDate).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span style={{ color: 'var(--muted-jade)', fontSize: '0.875rem', fontStyle: 'italic' }}>
                          No payments yet
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ fontWeight: '600', color: 'var(--imperial-emerald)', fontSize: '0.875rem' }}>
                        {row.totalTarget > 0 
                          ? `${Math.round((row.totalAchieved / row.totalTarget) * 100)}%`
                          : row.totalAchieved > 0 
                          ? '100%'
                          : '0%'}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ fontWeight: '600', color: 'var(--imperial-emerald)', fontSize: '0.875rem' }}>
                        {row.totalTarget || 0}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ fontWeight: '600', color: 'var(--imperial-emerald)', fontSize: '0.875rem' }}>
                        {row.totalAchieved || 0}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      {row.assignedSdr ? (
                        <div style={{ color: 'var(--muted-jade)', fontSize: '0.875rem' }}>
                          <div style={{ fontWeight: '500' }}>{row.assignedSdr.name}</div>
                          <div style={{ fontSize: '0.75rem' }}>{row.assignedSdr.email}</div>
                        </div>
                      ) : (
                        <span style={{ color: 'var(--muted-jade)', fontSize: '0.875rem', fontStyle: 'italic' }}>
                          No SDR assigned
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openDetail(row._id);
                        }}
                        style={{
                          padding: '0.4rem 0.75rem',
                          borderRadius: '0.375rem',
                          border: '1px solid rgba(11,46,43,0.2)',
                          background: 'white',
                          color: 'var(--imperial-emerald)',
                          fontWeight: '500',
                          fontSize: '0.875rem',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(11,46,43,0.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'white';
                        }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 1.5rem' }}>
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1}
              style={{
                padding: '0.6rem 1rem',
                borderRadius: '0.5rem',
                border: '1px solid rgba(11,46,43,0.2)',
                background: page <= 1 ? 'rgba(0,0,0,0.03)' : 'white',
                color: 'var(--imperial-emerald)',
                cursor: page <= 1 ? 'not-allowed' : 'pointer',
              }}
            >
              Previous
            </button>
            <div style={{ color: 'var(--muted-jade)', fontWeight: 600 }}>
              Page {page} of {totalPages}
            </div>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= totalPages}
              style={{
                padding: '0.6rem 1rem',
                borderRadius: '0.5rem',
                border: '1px solid rgba(11,46,43,0.2)',
                background: page >= totalPages ? 'rgba(0,0,0,0.03)' : 'white',
                color: 'var(--imperial-emerald)',
                cursor: page >= totalPages ? 'not-allowed' : 'pointer',
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>

    </div>
    {showDetail && (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.4)',
          display: 'flex',
          justifyContent: 'flex-end',
          zIndex: 50,
        }}
        onClick={closeDetail}
      >
        <div
          style={{
            width: 'min(900px, 95vw)',
            background: 'white',
            height: '100%',
            overflowY: 'auto',
            padding: '1.5rem',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--imperial-emerald)' }}>Client Detail</h3>
            <button
              onClick={closeDetail}
              style={{
                border: 'none',
                background: 'transparent',
                fontSize: '1rem',
                cursor: 'pointer',
                color: 'var(--muted-jade)',
              }}
            >
              Close
            </button>
          </div>

          {detailLoading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div className="spinner" />
            </div>
          ) : detailError ? (
            <div className="card" style={{ background: '#fee2e2', color: '#dc2626' }}>
              {detailError}
            </div>
          ) : detail ? (
            (() => {
              const d = detail as DetailResponse;
              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Summary cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div className="card" style={{ padding: '1rem' }}>
                  <div style={{ color: 'var(--muted-jade)', fontSize: '0.85rem', marginBottom: '0.35rem' }}>No. of Licenses</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--imperial-emerald)' }}>
                    {d.summary.totalLicenses}
                  </div>
                </div>
                <div className="card" style={{ padding: '1rem' }}>
                  <div style={{ color: 'var(--muted-jade)', fontSize: '0.85rem', marginBottom: '0.35rem' }}>Total Target (placeholder)</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--imperial-emerald)' }}>
                    {d.summary.totalTarget}
                  </div>
                </div>
                <div className="card" style={{ padding: '1rem' }}>
                  <div style={{ color: 'var(--muted-jade)', fontSize: '0.85rem', marginBottom: '0.35rem' }}>Total Achieved</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--imperial-emerald)' }}>
                    {d.summary.totalAchieved}
                  </div>
                </div>
                <div className="card" style={{ padding: '1rem' }}>
                  <div style={{ color: 'var(--muted-jade)', fontSize: '0.85rem', marginBottom: '0.35rem' }}>Status</div>
                  {(() => {
                    const status = d.summary.achievementStatus || 'IN_PROGRESS';
                    const statusConfig = {
                      ACHIEVED: { color: '#10b981', bg: '#d1fae5', label: 'Achieved' },
                      IN_PROGRESS: { color: '#f59e0b', bg: '#fef3c7', label: 'In Progress' },
                      OVERDUE: { color: '#ef4444', bg: '#fee2e2', label: 'Overdue' },
                    };
                    const config = statusConfig[status] || statusConfig.IN_PROGRESS;
                    return (
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '0.5rem 1rem',
                          borderRadius: '0.5rem',
                          background: config.bg,
                          color: config.color,
                          fontWeight: '700',
                          fontSize: '1rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {config.label}
                      </span>
                    );
                  })()}
                  {d.summary.deadlineDate && (
                    <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--muted-jade)' }}>
                      Deadline: {new Date(d.summary.deadlineDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>

              {/* Client + plan info */}
              <div className="card" style={{ padding: '1rem' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--imperial-emerald)', marginBottom: '0.75rem' }}>
                  Client & Plan
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                  <div>
                    <div style={{ color: 'var(--muted-jade)', fontSize: '0.85rem' }}>Business</div>
                    <div style={{ fontWeight: 700 }}>{d.client.businessName}</div>
                  </div>
                  <div>
                    <div style={{ color: 'var(--muted-jade)', fontSize: '0.85rem' }}>POC</div>
                    <div style={{ fontWeight: 700 }}>{d.client.pointOfContact.name}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--muted-jade)' }}>{d.client.pointOfContact.email}</div>
                    {d.client.pointOfContact.phone && (
                      <div style={{ fontSize: '0.85rem', color: 'var(--muted-jade)' }}>{d.client.pointOfContact.phone}</div>
                    )}
                  </div>
                  <div>
                    <div style={{ color: 'var(--muted-jade)', fontSize: '0.85rem' }}>Plan</div>
                    <div style={{ fontWeight: 700 }}>{d.client.plan.name}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--muted-jade)' }}>
                      {d.client.plan.planType || '—'} · {d.client.plan.currency} {d.client.plan.pricePerLicense ?? '—'} each
                      </div>
                  </div>
                </div>
      </div>

              {/* Licenses */}
              <div className="card" style={{ padding: '1rem' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--imperial-emerald)', marginBottom: '0.75rem' }}>
                  Licenses
                </h4>
                {d.licenses.length === 0 ? (
                  <p style={{ color: 'var(--muted-jade)' }}>No licenses.</p>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ background: 'rgba(11, 46, 43, 0.05)', borderBottom: '2px solid rgba(196, 183, 91, 0.3)' }}>
                          {['Service', 'Type', 'Label', 'Status', 'Start', 'End'].map((h) => (
                            <th key={h} style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.85rem', color: 'var(--imperial-emerald)' }}>
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {d.licenses.map((lic) => (
                          <tr key={lic.id} style={{ borderBottom: '1px solid rgba(196, 183, 91, 0.15)' }}>
                            <td style={{ padding: '0.75rem' }}>{lic.productOrServiceName}</td>
                            <td style={{ padding: '0.75rem' }}>{lic.serviceType}</td>
                            <td style={{ padding: '0.75rem' }}>{lic.label}</td>
                            <td style={{ padding: '0.75rem' }}>{lic.status}</td>
                            <td style={{ padding: '0.75rem' }}>{new Date(lic.startDate).toLocaleDateString()}</td>
                            <td style={{ padding: '0.75rem' }}>{lic.endDate ? new Date(lic.endDate).toLocaleDateString() : '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Updates */}
              <div className="card" style={{ padding: '1rem' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--imperial-emerald)', marginBottom: '0.75rem' }}>
                  Updates (latest 50)
                </h4>
                {d.updates && d.updates.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {d.updates.map((u) => (
                      <div key={u.id} style={{ padding: '0.75rem', border: '1px solid rgba(11,46,43,0.1)', borderRadius: '0.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                          <span style={{ fontWeight: 700, color: 'var(--imperial-emerald)' }}>{u.title}</span>
                          <span style={{ fontSize: '0.8rem', color: 'var(--muted-jade)' }}>{new Date(u.date).toLocaleDateString()}</span>
                        </div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--muted-jade)', marginBottom: '0.35rem' }}>{u.description}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--muted-jade)' }}>
                          {u.sdr ? `By ${u.sdr.name} (${u.sdr.email})` : '—'}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: 'var(--muted-jade)' }}>No updates yet.</p>
                )}
              </div>

              {/* Reports */}
              <div className="card" style={{ padding: '1rem' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--imperial-emerald)', marginBottom: '0.75rem' }}>
                  Reports (latest 50)
                </h4>
                {d.reports && d.reports.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {d.reports.map((r) => (
                      <div key={r.id} style={{ padding: '0.75rem', border: '1px solid rgba(11,46,43,0.1)', borderRadius: '0.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                          <span style={{ fontWeight: 700, color: 'var(--imperial-emerald)' }}>{r.type}</span>
                          <span style={{ fontSize: '0.8rem', color: 'var(--muted-jade)' }}>
                            {new Date(r.periodStart).toLocaleDateString()} - {new Date(r.periodEnd).toLocaleDateString()}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--muted-jade)', marginBottom: '0.35rem' }}>{r.summary}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--muted-jade)' }}>
                          {r.createdBy ? `By ${r.createdBy.name} (${r.createdBy.email})` : '—'}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: 'var(--muted-jade)' }}>No reports yet.</p>
                )}
              </div>

              {/* Payment History */}
              {d.paymentHistory && (
                <div className="card" style={{ padding: '1rem' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--imperial-emerald)', marginBottom: '0.75rem' }}>
                    Payment History
                  </h4>
                  <div style={{ marginBottom: '1rem', padding: '0.75rem', background: 'rgba(11,46,43,0.05)', borderRadius: '0.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', fontSize: '0.875rem' }}>
                      <div>
                        <div style={{ color: 'var(--muted-jade)', marginBottom: '0.25rem' }}>Total Invoices</div>
                        <div style={{ fontWeight: 700, color: 'var(--imperial-emerald)' }}>{d.paymentHistory.paymentSummary.totalInvoices}</div>
                      </div>
                      <div>
                        <div style={{ color: 'var(--muted-jade)', marginBottom: '0.25rem' }}>Paid</div>
                        <div style={{ fontWeight: 700, color: '#10b981' }}>{d.paymentHistory.paymentSummary.paidCount}</div>
                      </div>
                      <div>
                        <div style={{ color: 'var(--muted-jade)', marginBottom: '0.25rem' }}>Total Paid</div>
                        <div style={{ fontWeight: 700, color: 'var(--imperial-emerald)' }}>
                          {d.paymentHistory.paymentSummary.totalPaid.toLocaleString()} {d.paymentHistory.invoices[0]?.currency || 'USD'}
                        </div>
                      </div>
                      {d.paymentHistory.paymentSummary.lastPaymentDate && (
                        <div>
                          <div style={{ color: 'var(--muted-jade)', marginBottom: '0.25rem' }}>Last Payment</div>
                          <div style={{ fontWeight: 700, color: 'var(--imperial-emerald)' }}>
                            {new Date(d.paymentHistory.paymentSummary.lastPaymentDate).toLocaleDateString()}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {d.paymentHistory.invoices.length > 0 ? (
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                        <thead>
                          <tr style={{ background: 'rgba(11, 46, 43, 0.05)', borderBottom: '2px solid rgba(196, 183, 91, 0.3)' }}>
                            {['Invoice #', 'Invoice Date', 'Payment Date', 'Amount', 'Status', 'Actions'].map((header) => (
                              <th
                                key={header}
                                style={{
                                  padding: '0.75rem',
                                  textAlign: header === 'Actions' ? 'center' : 'left',
                                  fontWeight: '600',
                                  color: 'var(--imperial-emerald)',
                                  fontSize: '0.75rem',
                                  textTransform: 'uppercase',
                                }}
                              >
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {d.paymentHistory.invoices.map((inv) => (
                            <tr key={inv.id} style={{ borderBottom: '1px solid rgba(196, 183, 91, 0.15)' }}>
                              <td style={{ padding: '0.75rem' }}>{inv.invoiceNumber}</td>
                              <td style={{ padding: '0.75rem' }}>{new Date(inv.invoiceDate).toLocaleDateString()}</td>
                              <td style={{ padding: '0.75rem' }}>
                                {inv.paymentDate ? new Date(inv.paymentDate).toLocaleDateString() : '—'}
                              </td>
                              <td style={{ padding: '0.75rem', fontWeight: '600' }}>
                                {inv.amount.toLocaleString()} {inv.currency}
                              </td>
                              <td style={{ padding: '0.75rem' }}>
                                <span
                                  style={{
                                    display: 'inline-block',
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '0.25rem',
                                    background:
                                      inv.status === 'PAID'
                                        ? '#d1fae5'
                                        : inv.status === 'OVERDUE'
                                        ? '#fee2e2'
                                        : '#fef3c7',
                                    color:
                                      inv.status === 'PAID'
                                        ? '#10b981'
                                        : inv.status === 'OVERDUE'
                                        ? '#ef4444'
                                        : '#f59e0b',
                                    fontWeight: '600',
                                    fontSize: '0.75rem',
                                    textTransform: 'uppercase',
                                  }}
                                >
                                  {inv.status}
                                </span>
                              </td>
                              <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                                {inv.fileId ? (
                                  <a
                                    href={`/api/admin/clients/${d.client.id}/invoice/${inv.fileId}`}
                                    download
                                    style={{
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      padding: '0.375rem 0.75rem',
                                      borderRadius: '0.375rem',
                                      background: 'rgba(196, 183, 91, 0.1)',
                                      color: 'var(--imperial-emerald)',
                                      textDecoration: 'none',
                                      fontSize: '0.75rem',
                                      fontWeight: '500',
                                      transition: 'all 0.2s ease',
                                      border: '1px solid rgba(196, 183, 91, 0.3)',
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.background = 'rgba(196, 183, 91, 0.2)';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.background = 'rgba(196, 183, 91, 0.1)';
                                    }}
                                    title="Download Invoice PDF"
                                  >
                                    📄 PDF
                                  </a>
                                ) : (
                                  <span style={{ color: 'var(--muted-jade)', fontSize: '0.75rem', fontStyle: 'italic' }}>—</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p style={{ color: 'var(--muted-jade)', textAlign: 'center', padding: '2rem' }}>No invoices yet.</p>
                  )}
                </div>
              )}

              {/* Admin Notes */}
              <div className="card" style={{ padding: '1rem' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--imperial-emerald)', marginBottom: '0.75rem' }}>
                  Admin Notes
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <textarea
                    value={newNoteContent}
                    onChange={(e) => setNewNoteContent(e.target.value)}
                    placeholder="Add a note"
                    style={{ padding: '0.6rem', borderRadius: '0.5rem', border: '1px solid rgba(11,46,43,0.2)', minHeight: '80px' }}
                  />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <select
                      value={newNoteTag}
                      onChange={(e) => setNewNoteTag(e.target.value as any)}
                      style={{ padding: '0.6rem', borderRadius: '0.5rem', border: '1px solid rgba(11,46,43,0.2)' }}
                    >
                      <option value="ACCOUNT">ACCOUNT</option>
                      <option value="BILLING">BILLING</option>
                      <option value="RISK">RISK</option>
                    </select>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--muted-jade)', fontSize: '0.9rem' }}>
                      <input type="checkbox" checked={newNotePinned} onChange={(e) => setNewNotePinned(e.target.checked)} />
                      Pin
                    </label>
                    <button
                      onClick={addNote}
                      style={{
                        padding: '0.65rem 0.9rem',
                        borderRadius: '0.5rem',
                        border: 'none',
                        background: 'var(--imperial-emerald)',
                        color: 'white',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      Add Note
                    </button>
                  </div>
                </div>
                {notesLoading ? (
                  <div style={{ textAlign: 'center', padding: '1rem' }}>
                    <div className="spinner" />
          </div>
                ) : notes.length === 0 ? (
                  <p style={{ color: 'var(--muted-jade)' }}>No notes yet.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {notes.map((n) => (
                      <div
                        key={n._id}
                        style={{
                          padding: '0.75rem',
                          border: '1px solid rgba(11,46,43,0.1)',
                          borderRadius: '0.5rem',
                          background: n.pinned ? 'rgba(196,183,91,0.12)' : 'white',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                          <span style={{ fontWeight: 700, color: 'var(--imperial-emerald)' }}>{n.tag}</span>
                          <span style={{ fontSize: '0.8rem', color: 'var(--muted-jade)' }}>{new Date(n.createdAt).toLocaleString()}</span>
        </div>
                        <div style={{ color: 'var(--muted-jade)' }}>{n.content}</div>
                        {n.authorId && (
                          <div style={{ fontSize: '0.8rem', color: 'var(--muted-jade)', marginTop: '0.25rem' }}>
                            By {(n.authorId as any).name} {(n.authorId as any).email ? `(${(n.authorId as any).email})` : ''}
          </div>
                        )}
        </div>
                    ))}
          </div>
                )}
        </div>
      </div>
        );
      })()
    ) : null}
    </div>
  </div>
)}
</>
  );
}
