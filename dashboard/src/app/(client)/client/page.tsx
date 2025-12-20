'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LogoComponent from '@/components/LogoComponent';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Bell, TrendingUp, Activity, CheckCircle2, Circle, Eye, EyeOff, DollarSign, CreditCard, FileText, BarChart3, Users, Calendar, ArrowRight, Filter, Mail, Phone, MessageSquare, FileCheck, RefreshCw } from 'lucide-react';

interface DashboardData {
  client: {
    id: string;
    businessName: string;
    pointOfContact: {
      name: string;
      email: string;
      phone: string;
    };
  };
  targetsAndDeliverables: {
    currentMonthTarget: number;
    currentMonthDelivered: number;
    targetType: string;
  };
  numberOfServices: number;
  currentMonthStatus: {
    month: string;
    services: number;
    activeServices: number;
    licensesRemaining: number;
  };
  accountManager: {
    name: string;
    email: string;
  } | null;
  plan: {
    name: string;
    licensesPerMonth: number;
    numberOfLicenses?: number;
    planType?: 'REGULAR' | 'POC';
    pricePerLicense?: number;
    currency?: 'USD' | 'INR';
    totalCostOfService?: number;
  } | null;
}

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
  readByClient?: boolean;
  readAt?: string;
}

export default function ClientDashboard() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [updates, setUpdates] = useState<Update[]>([]);
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingUpdates, setLoadingUpdates] = useState(true);
  const [loadingChatHistory, setLoadingChatHistory] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingCharts, setLoadingCharts] = useState(true);
  const [loadingBilling, setLoadingBilling] = useState(true);
  const [loadingLicenses, setLoadingLicenses] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState<any>(null);
  const [chartData, setChartData] = useState<any>(null);
  const [billingData, setBillingData] = useState<any>(null);
  const [licenses, setLicenses] = useState<any[]>([]);
  const [activityFilter, setActivityFilter] = useState<'all' | 'unread' | Update['type']>('all');

  useEffect(() => {
    fetchDashboard();
    fetchUpdates();
    fetchChatHistory();
    fetchStats();
    fetchCharts();
    fetchBilling();
    fetchLicenses();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await fetch('/api/client/dashboard');
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          router.push('/login');
          return;
        }
        throw new Error('Failed to fetch dashboard data');
      }
      const result = await response.json();
      setData(result);
    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  const fetchUpdates = async () => {
    try {
      const response = await fetch('/api/client/updates');
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          return;
        }
        throw new Error('Failed to fetch updates');
      }
      const result = await response.json();
      setUpdates(result.updates || []);
    } catch (err: any) {
      console.error('Failed to load updates:', err);
    } finally {
      setLoadingUpdates(false);
    }
  };

  const fetchChatHistory = async () => {
    try {
      const response = await fetch('/api/client/chat-history');
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          return;
        }
        throw new Error('Failed to fetch chat history');
      }
      const result = await response.json();
      setChatHistory(result.chatHistory || []);
    } catch (err: any) {
      console.error('Failed to load chat history:', err);
    } finally {
      setLoadingChatHistory(false);
    }
  };

  const markUpdateAsRead = async (updateId: string) => {
    try {
      const response = await fetch(`/api/client/updates/${updateId}/read`, {
        method: 'PATCH',
      });
      if (response.ok) {
        // Update local state
        setUpdates(prevUpdates =>
          prevUpdates.map(update =>
            update._id === updateId
              ? { ...update, readByClient: true, readAt: new Date().toISOString() }
              : update
          )
        );
      }
    } catch (err) {
      console.error('Failed to mark update as read:', err);
    }
  };

  const markAllAsRead = async () => {
    try {
      const response = await fetch('/api/client/updates/mark-all-read', {
        method: 'PATCH',
      });
      if (response.ok) {
        // Refresh updates
        await fetchUpdates();
      }
    } catch (err) {
      console.error('Failed to mark all as read:', err);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/client/dashboard/stats');
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          return;
        }
        throw new Error('Failed to fetch stats');
      }
      const result = await response.json();
      setStats(result.stats);
    } catch (err: any) {
      console.error('Failed to load stats:', err);
    } finally {
      setLoadingStats(false);
    }
  };

  const fetchCharts = async () => {
    try {
      const response = await fetch('/api/client/dashboard/charts');
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          return;
        }
        throw new Error('Failed to fetch charts');
      }
      const result = await response.json();
      setChartData(result.charts);
    } catch (err: any) {
      console.error('Failed to load charts:', err);
    } finally {
      setLoadingCharts(false);
    }
  };

  const fetchBilling = async () => {
    try {
      const response = await fetch('/api/client/billing');
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          return;
        }
        throw new Error('Failed to fetch billing');
      }
      const result = await response.json();
      setBillingData(result.billing);
    } catch (err: any) {
      console.error('Failed to load billing:', err);
    } finally {
      setLoadingBilling(false);
    }
  };

  const fetchLicenses = async () => {
    try {
      const response = await fetch('/api/client/licenses');
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          return;
        }
        throw new Error('Failed to fetch licenses');
      }
      const result = await response.json();
      setLicenses(result.licenses || []);
    } catch (err: any) {
      console.error('Failed to load licenses:', err);
    } finally {
      setLoadingLicenses(false);
    }
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

  if (!data) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
        <p style={{ color: 'var(--muted-jade)' }}>No data available</p>
      </div>
    );
  }

  const progressPercentage = data.targetsAndDeliverables.currentMonthTarget > 0
    ? (data.targetsAndDeliverables.currentMonthDelivered / data.targetsAndDeliverables.currentMonthTarget) * 100
    : 0;

  const unreadCount = updates.filter(u => !u.readByClient).length;

  // Prepare chart data
  const progressData = [
    { name: 'Delivered', value: data.targetsAndDeliverables.currentMonthDelivered, fill: '#c4b75b' },
    { name: 'Remaining', value: Math.max(0, data.targetsAndDeliverables.currentMonthTarget - data.targetsAndDeliverables.currentMonthDelivered), fill: 'rgba(196, 183, 91, 0.2)' },
  ];

  // Activity over time (last 7 days)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toISOString().split('T')[0];
  });

  const activityData = last7Days.map(date => {
    const dayUpdates = updates.filter(u => u.date.startsWith(date));
    return {
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      updates: dayUpdates.length,
      read: dayUpdates.filter(u => u.readByClient).length,
      unread: dayUpdates.filter(u => !u.readByClient).length,
    };
  });

  // Update types distribution
  const updateTypesData = updates.reduce((acc, update) => {
    acc[update.type] = (acc[update.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(updateTypesData).map(([type, count]) => ({
    name: type,
    value: count,
  }));

  const COLORS = {
    CALL: '#3b82f6',
    EMAIL: '#10b981',
    MEETING: '#f59e0b',
    NOTE: '#c4b75b',
    REPORT: '#8b5cf6',
    OTHER: '#6b7280',
  };

  return (
    <div style={{ padding: '2rem', background: 'linear-gradient(135deg, var(--ivory-silk) 0%, #f0ede8 100%)', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginBottom: '1.5rem',
        padding: '1.5rem',
        background: 'white',
        borderRadius: '1rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <LogoComponent width={48} height={26} hoverGradient={true} />
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.25rem', color: 'var(--imperial-emerald)' }}>
              Welcome, {data.client.pointOfContact.name}
            </h1>
            <p style={{ color: 'var(--muted-jade)', fontSize: '0.875rem' }}>
              Your dashboard overview
            </p>
          </div>
        </div>
        {unreadCount > 0 && (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem',
            padding: '0.75rem 1.5rem',
            background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(220, 38, 38, 0.05) 100%)',
            borderRadius: '0.75rem',
            border: '2px solid rgba(220, 38, 38, 0.2)'
          }}>
            <Bell size={20} color="#dc2626" />
            <div>
              <div style={{ fontWeight: '600', color: '#dc2626', fontSize: '1.125rem' }}>
                {unreadCount} {unreadCount === 1 ? 'Unread Update' : 'Unread Updates'}
              </div>
              <button
                onClick={markAllAsRead}
                style={{
                  fontSize: '0.75rem',
                  color: '#dc2626',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  marginTop: '0.25rem'
                }}
              >
                Mark all as read
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        marginBottom: '2rem',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => router.push('/client/reports')}
          className="btn-secondary"
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            padding: '0.75rem 1.5rem'
          }}
        >
          <FileText size={18} />
          View Reports
        </button>
        <button
          onClick={() => router.push('/client/billing')}
          className="btn-secondary"
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            padding: '0.75rem 1.5rem'
          }}
        >
          <CreditCard size={18} />
          View Billing
        </button>
        <button
          onClick={() => router.push('/client/plan')}
          className="btn-secondary"
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            padding: '0.75rem 1.5rem'
          }}
        >
          <BarChart3 size={18} />
          View Plan Details
        </button>
        {data.accountManager && (
          <button
            onClick={() => window.location.href = `mailto:${data.accountManager?.email}`}
            className="btn-secondary"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              padding: '0.75rem 1.5rem'
            }}
          >
            <Mail size={18} />
            Contact Support
          </button>
        )}
      </div>

      {/* Enhanced KPI Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div className="card" style={{ 
          background: 'linear-gradient(135deg, rgba(196, 183, 91, 0.1) 0%, rgba(196, 183, 91, 0.05) 100%)',
          border: '2px solid rgba(196, 183, 91, 0.2)',
          borderRadius: '1rem',
          padding: '1.5rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.1 }}>
            <TrendingUp size={120} color="var(--golden-opal)" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ 
              padding: '0.75rem', 
              background: 'rgba(196, 183, 91, 0.2)', 
              borderRadius: '0.75rem' 
            }}>
              <TrendingUp size={24} color="var(--golden-opal)" />
            </div>
            <h3 style={{ fontSize: '1.125rem', margin: 0, color: 'var(--imperial-emerald)', fontWeight: '600' }}>
              Current Month Progress
            </h3>
          </div>
          <div style={{ marginBottom: '1rem', position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--muted-jade)', fontSize: '0.875rem' }}>
                {data.targetsAndDeliverables.targetType}
              </span>
              <span style={{ fontWeight: '700', color: 'var(--imperial-emerald)', fontSize: '1.25rem' }}>
                {data.targetsAndDeliverables.currentMonthDelivered} / {data.targetsAndDeliverables.currentMonthTarget}
              </span>
            </div>
            <div style={{
              width: '100%',
              height: '16px',
              background: 'rgba(196, 183, 91, 0.2)',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                width: `${Math.min(progressPercentage, 100)}%`,
                height: '100%',
                background: 'linear-gradient(90deg, var(--golden-opal) 0%, rgba(196, 183, 91, 0.8) 100%)',
                transition: 'width 0.5s ease',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(196, 183, 91, 0.3)'
              }} />
            </div>
            <div style={{ textAlign: 'right', marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--muted-jade)', fontWeight: '600' }}>
              {Math.round(progressPercentage)}% Complete
            </div>
          </div>
        </div>

        <div className="card" style={{ 
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)',
          border: '2px solid rgba(59, 130, 246, 0.2)',
          borderRadius: '1rem',
          padding: '1.5rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.1 }}>
            <Activity size={120} color="#3b82f6" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ 
              padding: '0.75rem', 
              background: 'rgba(59, 130, 246, 0.2)', 
              borderRadius: '0.75rem' 
            }}>
              <Activity size={24} color="#3b82f6" />
            </div>
            <h3 style={{ fontSize: '1.125rem', margin: 0, color: 'var(--imperial-emerald)', fontWeight: '600' }}>
              Services
            </h3>
          </div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#3b82f6', marginBottom: '0.5rem' }}>
              {data.numberOfServices}
            </div>
            <div style={{ color: 'var(--muted-jade)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
              Active Services
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--muted-jade)', fontWeight: '600' }}>
              {data.currentMonthStatus.activeServices} active this month
            </div>
          </div>
        </div>

        <div className="card" style={{ 
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)',
          border: '2px solid rgba(16, 185, 129, 0.2)',
          borderRadius: '1rem',
          padding: '1.5rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.1 }}>
            <CheckCircle2 size={120} color="#10b981" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ 
              padding: '0.75rem', 
              background: 'rgba(16, 185, 129, 0.2)', 
              borderRadius: '0.75rem' 
            }}>
              <CheckCircle2 size={24} color="#10b981" />
            </div>
            <h3 style={{ fontSize: '1.125rem', margin: 0, color: 'var(--imperial-emerald)', fontWeight: '600' }}>
              Licenses
            </h3>
          </div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#10b981', marginBottom: '0.5rem' }}>
              {data.currentMonthStatus.licensesRemaining}
            </div>
            <div style={{ color: 'var(--muted-jade)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
              Available
            </div>
            {data.plan && (
              <div style={{ fontSize: '0.875rem', color: 'var(--muted-jade)', fontWeight: '600' }}>
                {data.plan.licensesPerMonth} per month
              </div>
            )}
          </div>
        </div>

        {/* Billing Summary Card */}
        {loadingStats ? (
          <div className="card" style={{ 
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)',
            border: '2px solid rgba(16, 185, 129, 0.2)',
            borderRadius: '1rem',
            padding: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '150px'
          }}>
            <div className="spinner" />
          </div>
        ) : stats ? (
          <div className="card" style={{ 
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)',
            border: '2px solid rgba(16, 185, 129, 0.2)',
            borderRadius: '1rem',
            padding: '1.5rem',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.1 }}>
              <DollarSign size={120} color="#10b981" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ 
                padding: '0.75rem', 
                background: 'rgba(16, 185, 129, 0.2)', 
                borderRadius: '0.75rem' 
              }}>
                <DollarSign size={24} color="#10b981" />
              </div>
              <h3 style={{ fontSize: '1.125rem', margin: 0, color: 'var(--imperial-emerald)', fontWeight: '600' }}>
                Billing Summary
              </h3>
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981', marginBottom: '0.5rem' }}>
                ${stats.billing.totalPaid.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div style={{ color: 'var(--muted-jade)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                Total Paid
              </div>
              <div style={{ fontSize: '0.875rem', color: stats.billing.outstanding > 0 ? '#f59e0b' : 'var(--muted-jade)', fontWeight: '600' }}>
                Outstanding: ${stats.billing.outstanding.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
          </div>
        ) : null}

        {/* Payment Status Card */}
        {loadingStats ? (
          <div className="card" style={{ 
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)',
            border: '2px solid rgba(245, 158, 11, 0.2)',
            borderRadius: '1rem',
            padding: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '150px'
          }}>
            <div className="spinner" />
          </div>
        ) : stats ? (
          <div className="card" style={{ 
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)',
            border: '2px solid rgba(245, 158, 11, 0.2)',
            borderRadius: '1rem',
            padding: '1.5rem',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.1 }}>
              <CreditCard size={120} color="#f59e0b" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ 
                padding: '0.75rem', 
                background: 'rgba(245, 158, 11, 0.2)', 
                borderRadius: '0.75rem' 
              }}>
                <CreditCard size={24} color="#f59e0b" />
              </div>
              <h3 style={{ fontSize: '1.125rem', margin: 0, color: 'var(--imperial-emerald)', fontWeight: '600' }}>
                Payment Status
              </h3>
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--muted-jade)', fontSize: '0.875rem' }}>Upcoming</span>
                  <span style={{ fontWeight: '700', color: '#3b82f6', fontSize: '1.125rem' }}>{stats.billing.upcomingCount}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--muted-jade)', fontSize: '0.875rem' }}>Overdue</span>
                  <span style={{ fontWeight: '700', color: '#ef4444', fontSize: '1.125rem' }}>{stats.billing.overdueCount}</span>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* Service Utilization Card */}
        {loadingStats ? (
          <div className="card" style={{ 
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)',
            border: '2px solid rgba(139, 92, 246, 0.2)',
            borderRadius: '1rem',
            padding: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '150px'
          }}>
            <div className="spinner" />
          </div>
        ) : stats ? (
          <div className="card" style={{ 
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)',
            border: '2px solid rgba(139, 92, 246, 0.2)',
            borderRadius: '1rem',
            padding: '1.5rem',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.1 }}>
              <Activity size={120} color="#8b5cf6" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ 
                padding: '0.75rem', 
                background: 'rgba(139, 92, 246, 0.2)', 
                borderRadius: '0.75rem' 
              }}>
                <Activity size={24} color="#8b5cf6" />
              </div>
              <h3 style={{ fontSize: '1.125rem', margin: 0, color: 'var(--imperial-emerald)', fontWeight: '600' }}>
                Service Utilization
              </h3>
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem' }}>
                {stats.services.utilizationPercent}%
              </div>
              <div style={{ color: 'var(--muted-jade)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                {stats.services.active} / {stats.services.total} Active
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--muted-jade)', fontWeight: '600' }}>
                Licenses in use
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* Performance Trends Charts */}
      {loadingCharts ? (
        <div className="card" style={{ padding: '2rem', textAlign: 'center', marginBottom: '2rem' }}>
          <div className="spinner" />
          <p style={{ marginTop: '1rem', color: 'var(--muted-jade)' }}>Loading performance charts...</p>
        </div>
      ) : chartData ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          {/* Service Utilization Trend */}
          {chartData.serviceUtilization && chartData.serviceUtilization.length > 0 ? (
            <div className="card" style={{ padding: '1.5rem', borderRadius: '1rem', background: 'white', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--imperial-emerald)' }}>
                Service Utilization Trend (Last 6 Months)
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData.serviceUtilization}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="active" stroke="#8b5cf6" strokeWidth={2} name="Active Services" />
                  <Line type="monotone" dataKey="total" stroke="var(--golden-opal)" strokeWidth={2} name="Total Services" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="card" style={{ padding: '1.5rem', borderRadius: '1rem', background: 'white', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--imperial-emerald)' }}>
                Service Utilization Trend (Last 6 Months)
              </h3>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px', color: 'var(--muted-jade)' }}>
                <p>No service utilization data available</p>
              </div>
            </div>
          )}

          {/* Progress Achievement Trend */}
          {chartData.progressTrend && chartData.progressTrend.length > 0 ? (
            <div className="card" style={{ padding: '1.5rem', borderRadius: '1rem', background: 'white', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--imperial-emerald)' }}>
                Progress Achievement Trend (Last 6 Months)
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData.progressTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="target" fill="rgba(196, 183, 91, 0.3)" name="Target" />
                  <Bar dataKey="achieved" fill="var(--golden-opal)" name="Achieved" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="card" style={{ padding: '1.5rem', borderRadius: '1rem', background: 'white', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--imperial-emerald)' }}>
                Progress Achievement Trend (Last 6 Months)
              </h3>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px', color: 'var(--muted-jade)' }}>
                <p>No progress data available</p>
              </div>
            </div>
          )}

          {/* License Usage Over Time */}
          {chartData.licenseUsage && chartData.licenseUsage.length > 0 ? (
            <div className="card" style={{ padding: '1.5rem', borderRadius: '1rem', background: 'white', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--imperial-emerald)' }}>
                License Usage Over Time (Last 6 Months)
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData.licenseUsage}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="used" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} name="Used" />
                  <Area type="monotone" dataKey="available" stackId="1" stroke="var(--golden-opal)" fill="var(--golden-opal)" fillOpacity={0.4} name="Available" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="card" style={{ padding: '1.5rem', borderRadius: '1rem', background: 'white', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--imperial-emerald)' }}>
                License Usage Over Time (Last 6 Months)
              </h3>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px', color: 'var(--muted-jade)' }}>
                <p>No license usage data available</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="card" style={{ padding: '2rem', textAlign: 'center', marginBottom: '2rem' }}>
          <p style={{ color: 'var(--muted-jade)' }}>No chart data available yet.</p>
        </div>
      )}

      {/* Billing & Payment Summary Section */}
      {loadingBilling ? (
        <div className="card" style={{ padding: '2rem', textAlign: 'center', marginBottom: '2rem' }}>
          <div className="spinner" />
          <p style={{ marginTop: '1rem', color: 'var(--muted-jade)' }}>Loading billing information...</p>
        </div>
      ) : billingData ? (
        <div style={{ marginBottom: '2rem' }}>
          <div className="card" style={{ padding: '1.5rem', borderRadius: '1rem', background: 'white', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--imperial-emerald)' }}>
                Billing & Payment Summary
              </h3>
              <button
                onClick={() => router.push('/client/billing')}
                className="btn-secondary"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  fontSize: '0.875rem'
                }}
              >
                View All Invoices
                <ArrowRight size={16} />
              </button>
            </div>
            
            {/* Upcoming Invoices */}
            {billingData.upcoming && billingData.upcoming.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--imperial-emerald)' }}>
                  Upcoming Invoices
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {billingData.upcoming.slice(0, 3).map((invoice: any) => (
                    <div
                      key={invoice._id}
                      style={{
                        padding: '1rem',
                        background: 'rgba(59, 130, 246, 0.05)',
                        borderRadius: '0.5rem',
                        border: '1px solid rgba(59, 130, 246, 0.2)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: '600', color: 'var(--imperial-emerald)', marginBottom: '0.25rem' }}>
                          {invoice.invoiceNumber || `INV-${invoice._id.toString().substring(0, 8).toUpperCase()}`}
                        </div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--muted-jade)' }}>
                          Due: {new Date(invoice.dueDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: '700', color: '#3b82f6', fontSize: '1.125rem' }}>
                          ${invoice.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--muted-jade)' }}>
                          {invoice.currency || 'USD'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Payment Status Overview */}
            <div style={{ 
              padding: '1rem',
              background: stats?.billing.overdueCount > 0 
                ? 'rgba(239, 68, 68, 0.1)' 
                : stats?.billing.upcomingCount > 0 
                ? 'rgba(245, 158, 11, 0.1)' 
                : 'rgba(16, 185, 129, 0.1)',
              borderRadius: '0.5rem',
              border: `1px solid ${stats?.billing.overdueCount > 0 
                ? 'rgba(239, 68, 68, 0.3)' 
                : stats?.billing.upcomingCount > 0 
                ? 'rgba(245, 158, 11, 0.3)' 
                : 'rgba(16, 185, 129, 0.3)'}`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: '600', color: 'var(--imperial-emerald)', marginBottom: '0.25rem' }}>
                    Payment Health
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--muted-jade)' }}>
                    {stats?.billing.overdueCount > 0 
                      ? `${stats.billing.overdueCount} overdue invoice${stats.billing.overdueCount > 1 ? 's' : ''}`
                      : stats?.billing.upcomingCount > 0
                      ? `${stats.billing.upcomingCount} upcoming invoice${stats.billing.upcomingCount > 1 ? 's' : ''}`
                      : 'All invoices paid'}
                  </div>
                </div>
                {stats?.billing.nextInvoiceDue && (
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted-jade)', marginBottom: '0.25rem' }}>Next Due</div>
                    <div style={{ fontWeight: '600', color: 'var(--imperial-emerald)' }}>
                      {new Date(stats.billing.nextInvoiceDue).toLocaleDateString()}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="card" style={{ padding: '2rem', textAlign: 'center', marginBottom: '2rem' }}>
          <p style={{ color: 'var(--muted-jade)' }}>No billing information available.</p>
        </div>
      )}

      {/* Charts Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Progress Pie Chart */}
        <div className="card" style={{ 
          padding: '1.5rem',
          borderRadius: '1rem',
          background: 'white',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
        }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--imperial-emerald)', fontWeight: '600' }}>
            Progress Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={progressData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {progressData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Activity Over Time */}
        {activityData.some(d => d.updates > 0) && (
          <div className="card" style={{ 
            padding: '1.5rem',
            borderRadius: '1rem',
            background: 'white',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
          }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--imperial-emerald)', fontWeight: '600' }}>
              Activity Over Time
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(196, 183, 91, 0.2)" />
                <XAxis dataKey="date" stroke="var(--muted-jade)" fontSize={12} />
                <YAxis stroke="var(--muted-jade)" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    background: 'white', 
                    border: '1px solid rgba(196, 183, 91, 0.3)',
                    borderRadius: '0.5rem'
                  }} 
                />
                <Legend />
                <Bar dataKey="read" stackId="a" fill="#10b981" name="Read" radius={[0, 0, 0, 0]} />
                <Bar dataKey="unread" stackId="a" fill="#dc2626" name="Unread" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Update Types Distribution */}
        {pieData.length > 0 && (
          <div className="card" style={{ 
            padding: '1.5rem',
            borderRadius: '1rem',
            background: 'white',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
          }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--imperial-emerald)', fontWeight: '600' }}>
              Update Types
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS] || '#6b7280'} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Account Manager & Plan Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {data.accountManager && (
          <div className="card" style={{ 
            background: 'linear-gradient(135deg, rgba(11, 46, 43, 0.05) 0%, rgba(11, 46, 43, 0.02) 100%)',
            border: '2px solid rgba(11, 46, 43, 0.1)',
            borderRadius: '1rem',
            padding: '1.5rem'
          }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--imperial-emerald)', fontWeight: '600' }}>
              Account Manager
            </h3>
            <p style={{ color: 'var(--muted-jade)', marginBottom: '0.25rem', fontSize: '1.125rem', fontWeight: '600' }}>
              {data.accountManager.name}
            </p>
            <p style={{ color: 'var(--muted-jade)', fontSize: '0.875rem' }}>
              {data.accountManager.email}
            </p>
          </div>
        )}

        {data.plan && (
          <div className="card" style={{ 
            background: 'linear-gradient(135deg, rgba(196, 183, 91, 0.1) 0%, rgba(196, 183, 91, 0.05) 100%)',
            border: '2px solid rgba(196, 183, 91, 0.2)',
            borderRadius: '1rem',
            padding: '1.5rem'
          }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--imperial-emerald)', fontWeight: '600' }}>
              Current Plan
            </h3>
            <p style={{ color: 'var(--muted-jade)', marginBottom: '0.5rem', fontSize: '1.125rem', fontWeight: '600' }}>
              {data.plan.name}
            </p>
            {data.plan.planType && (
              <p style={{ color: 'var(--muted-jade)', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                <strong>Type:</strong> {data.plan.planType}
              </p>
            )}
            <p style={{ color: 'var(--muted-jade)', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
              <strong>Licenses:</strong> {data.plan.numberOfLicenses || data.plan.licensesPerMonth}
            </p>
            {data.plan.pricePerLicense && (
              <p style={{ color: 'var(--muted-jade)', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                <strong>Price Per License:</strong> {data.plan.currency || 'USD'} {data.plan.pricePerLicense.toFixed(2)}
              </p>
            )}
            {data.plan.totalCostOfService && data.plan.totalCostOfService > 0 && (
              <p style={{ color: 'var(--golden-opal)', marginTop: '0.75rem', fontSize: '1.125rem', fontWeight: '700', paddingTop: '0.75rem', borderTop: '2px solid rgba(196, 183, 91, 0.3)' }}>
                <strong>Total Cost:</strong> {data.plan.currency || 'USD'} {data.plan.totalCostOfService.toFixed(2)}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Service & License Overview */}
      {!loadingLicenses && licenses.length > 0 && (
        <div className="card" style={{ marginBottom: '2rem', padding: '1.5rem', borderRadius: '1rem', background: 'white', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--imperial-emerald)' }}>
              Active Services & Licenses
            </h3>
            <button
              onClick={() => router.push('/client/plan')}
              className="btn-secondary"
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                fontSize: '0.875rem'
              }}
            >
              Manage Services
              <ArrowRight size={16} />
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
            {licenses.slice(0, 6).map((license: any) => (
              <div
                key={license._id}
                style={{
                  padding: '1rem',
                  background: license.status === 'active' 
                    ? 'rgba(16, 185, 129, 0.05)' 
                    : 'rgba(107, 114, 128, 0.05)',
                  borderRadius: '0.5rem',
                  border: `1px solid ${license.status === 'active' 
                    ? 'rgba(16, 185, 129, 0.2)' 
                    : 'rgba(107, 114, 128, 0.2)'}`
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                  <div style={{ fontWeight: '600', color: 'var(--imperial-emerald)', fontSize: '0.875rem' }}>
                    {license.productOrServiceName || license.label || 'Service'}
                  </div>
                  <span
                    style={{
                      padding: '0.25rem 0.5rem',
                      borderRadius: '0.375rem',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      background: license.status === 'active' 
                        ? 'rgba(16, 185, 129, 0.2)' 
                        : 'rgba(107, 114, 128, 0.2)',
                      color: license.status === 'active' ? '#10b981' : '#6b7280',
                      textTransform: 'uppercase'
                    }}
                  >
                    {license.status || 'inactive'}
                  </span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--muted-jade)' }}>
                  {license.serviceType || 'N/A'}
                </div>
              </div>
            ))}
          </div>
          {licenses.length > 6 && (
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <button
                onClick={() => router.push('/client/plan')}
                className="btn-secondary"
                style={{ fontSize: '0.875rem' }}
              >
                View All {licenses.length} Services
              </button>
            </div>
          )}
        </div>
      )}

      {/* Enhanced Recent Activity Timeline with Filters */}
      <div className="card" style={{ padding: '0', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)' }}>
        <div style={{ 
          padding: '1.5rem', 
          borderBottom: '2px solid rgba(196, 183, 91, 0.3)',
          background: 'linear-gradient(135deg, rgba(196, 183, 91, 0.1) 0%, rgba(196, 183, 91, 0.05) 100%)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', color: 'var(--imperial-emerald)', fontWeight: '600' }}>
              Recent Activity
            </h2>
            <p style={{ color: 'var(--muted-jade)', fontSize: '0.875rem' }}>
              {updates.length} {updates.length === 1 ? 'update' : 'updates'} from your SDR
              {unreadCount > 0 && (
                <span style={{ 
                  marginLeft: '0.5rem',
                  padding: '0.25rem 0.5rem',
                  background: '#dc2626',
                  color: 'white',
                  borderRadius: '0.375rem',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}>
                  {unreadCount} unread
                </span>
              )}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActivityFilter('all')}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                border: '1px solid rgba(196, 183, 91, 0.3)',
                background: activityFilter === 'all' ? 'var(--golden-opal)' : 'white',
                color: activityFilter === 'all' ? 'white' : 'var(--imperial-emerald)',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '600',
                transition: 'all 0.2s'
              }}
            >
              All
            </button>
            <button
              onClick={() => setActivityFilter('unread')}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                border: '1px solid rgba(196, 183, 91, 0.3)',
                background: activityFilter === 'unread' ? '#dc2626' : 'white',
                color: activityFilter === 'unread' ? 'white' : 'var(--imperial-emerald)',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '600',
                transition: 'all 0.2s'
              }}
            >
              Unread
            </button>
            {['CALL', 'EMAIL', 'MEETING', 'REPORT'].map((type) => (
              <button
                key={type}
                onClick={() => setActivityFilter(type as Update['type'])}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(196, 183, 91, 0.3)',
                  background: activityFilter === type ? COLORS[type as keyof typeof COLORS] : 'white',
                  color: activityFilter === type ? 'white' : 'var(--imperial-emerald)',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  transition: 'all 0.2s'
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div style={{ padding: '1.5rem' }}>
          {loadingUpdates ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div className="spinner" />
            </div>
          ) : updates.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p style={{ color: 'var(--muted-jade)' }}>
                No recent activity. Updates from your SDR will appear here.
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
                      letterSpacing: '0.05em',
                      width: '80px'
                    }}>
                      Status
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
                      Title
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
                      Description
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
                      SDR
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
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    let filteredUpdates = updates;
                    if (activityFilter === 'unread') {
                      filteredUpdates = updates.filter(u => !u.readByClient);
                    } else if (activityFilter !== 'all') {
                      filteredUpdates = updates.filter(u => u.type === activityFilter);
                    }
                    return filteredUpdates.slice(0, 10).map((update) => {
                    const typeColors: Record<Update['type'], string> = {
                      CALL: '#3b82f6',
                      EMAIL: '#10b981',
                      MEETING: '#f59e0b',
                      NOTE: 'var(--golden-opal)',
                      REPORT: '#8b5cf6',
                      OTHER: 'var(--muted-jade)',
                    };

                    const isUnread = !update.readByClient;

                    return (
                      <tr 
                        key={update._id}
                        style={{
                          borderBottom: '1px solid rgba(196, 183, 91, 0.15)',
                          transition: 'all 0.2s ease',
                          background: isUnread ? 'rgba(220, 38, 38, 0.05)' : 'transparent',
                          cursor: 'pointer'
                        }}
                        onClick={() => {
                          if (isUnread) {
                            markUpdateAsRead(update._id);
                          }
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = isUnread ? 'rgba(220, 38, 38, 0.1)' : 'rgba(196, 183, 91, 0.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = isUnread ? 'rgba(220, 38, 38, 0.05)' : 'transparent';
                        }}
                      >
                        <td style={{ padding: '1rem' }}>
                          {isUnread ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <Circle size={16} color="#dc2626" fill="#dc2626" />
                              <span style={{ fontSize: '0.75rem', color: '#dc2626', fontWeight: '600' }}>NEW</span>
                            </div>
                          ) : (
                            <CheckCircle2 size={16} color="#10b981" />
                          )}
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <span
                            style={{
                              display: 'inline-block',
                              padding: '0.25rem 0.75rem',
                              borderRadius: '0.375rem',
                              fontSize: '0.75rem',
                              fontWeight: '600',
                              background: `${typeColors[update.type]}20`,
                              color: typeColors[update.type],
                              textTransform: 'uppercase',
                            }}
                          >
                            {update.type}
                          </span>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ fontWeight: isUnread ? '700' : '600', color: 'var(--imperial-emerald)' }}>
                            {update.title}
                          </div>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ color: 'var(--muted-jade)', fontSize: '0.875rem', lineHeight: '1.6', maxWidth: '400px' }}>
                            {update.description.length > 150 ? `${update.description.substring(0, 150)}...` : update.description}
                          </div>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ color: 'var(--muted-jade)', fontSize: '0.875rem' }}>
                            {update.sdrId.name}
                          </div>
                          <div style={{ color: 'var(--muted-jade)', fontSize: '0.75rem' }}>
                            {update.sdrId.email}
                          </div>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ color: 'var(--muted-jade)', fontSize: '0.875rem' }}>
                            {new Date(update.date).toLocaleDateString()}
                          </div>
                          <div style={{ color: 'var(--muted-jade)', fontSize: '0.75rem' }}>
                            {(() => {
                              const now = new Date();
                              const updateDate = new Date(update.createdAt);
                              const diffMs = now.getTime() - updateDate.getTime();
                              const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
                              const diffDays = Math.floor(diffHours / 24);
                              
                              if (diffHours < 1) return 'Just now';
                              if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
                              if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
                              return updateDate.toLocaleTimeString();
                            })()}
                          </div>
                        </td>
                      </tr>
                    );
                  })})()}
                </tbody>
              </table>
            </div>
          )}
          {updates.length > 10 && (
            <div style={{ padding: '1rem', textAlign: 'center', borderTop: '1px solid rgba(196, 183, 91, 0.2)' }}>
              <button
                onClick={() => {
                  // Could navigate to a dedicated updates page or expand the list
                  alert('View all updates feature - can be linked to a dedicated page');
                }}
                className="btn-secondary"
                style={{ fontSize: '0.875rem' }}
              >
                View All Updates ({updates.length})
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Previous Chat History Section */}
      <div className="card" style={{ 
        marginTop: '2rem',
        borderRadius: '1rem',
        padding: '1.5rem',
        background: 'white',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
      }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--imperial-emerald)', borderBottom: '2px solid var(--golden-opal)', paddingBottom: '0.5rem', fontWeight: '600' }}>
          Previous Chat History
        </h2>

        {loadingChatHistory ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div className="spinner" />
          </div>
        ) : chatHistory.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p style={{ color: 'var(--muted-jade)' }}>
              No chat history available yet. LinkedIn conversations with your SDR will appear here.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {chatHistory.map((entry, index) => (
              <div
                key={index}
                className="card"
                style={{
                  borderLeft: entry.type === 'initial' ? '4px solid #3b82f6' : '4px solid var(--golden-opal)',
                  padding: '1.5rem',
                  background: entry.type === 'initial' ? 'rgba(59, 130, 246, 0.05)' : 'rgba(196, 183, 91, 0.05)',
                  borderRadius: '0.75rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                      <span
                        style={{
                          padding: '0.25rem 0.75rem',
                          borderRadius: '0.375rem',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          background: entry.type === 'initial' ? '#3b82f6' : 'var(--golden-opal)',
                          color: 'white',
                          textTransform: 'uppercase',
                        }}
                      >
                        {entry.type === 'initial' ? 'Initial Conversation' : 'Additional Conversation'}
                      </span>
                      {entry.updateTitle && (
                        <span style={{ color: 'var(--muted-jade)', fontSize: '0.875rem' }}>
                          {entry.updateTitle}
                        </span>
                      )}
                    </div>
                    {entry.sdr && (
                      <p style={{ color: 'var(--muted-jade)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                        <strong>SDR:</strong> {entry.sdr.name} ({entry.sdr.email})
                      </p>
                    )}
                    <p style={{ color: 'var(--muted-jade)', fontSize: '0.875rem' }}>
                      <strong>Date:</strong> {new Date(entry.addedAt).toLocaleString()}
                      {entry.updatedAt && entry.updatedAt !== entry.addedAt && (
                        <span style={{ marginLeft: '0.5rem' }}>
                          (Updated: {new Date(entry.updatedAt).toLocaleString()})
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    whiteSpace: 'pre-wrap',
                    color: 'var(--muted-jade)',
                    lineHeight: '1.8',
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                    padding: '1rem',
                    background: 'rgba(0, 0, 0, 0.02)',
                    borderRadius: '0.375rem',
                    border: '1px solid rgba(196, 183, 91, 0.2)',
                  }}
                >
                  {entry.chatHistory}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
