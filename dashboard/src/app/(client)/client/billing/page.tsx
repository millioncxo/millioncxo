'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Invoice {
  _id: string;
  invoiceNumber: string;
  clientId: string;
  amount: number;
  status: 'GENERATED' | 'PAID' | 'OVERDUE';
  dueDate: string;
  paidAt?: string;
  description?: string;
  createdAt: string;
  invoiceDate?: string;
  paymentDate?: string;
  amountPaid?: number;
  currency?: string;
  fileId?: string | null; // GridFS file ID
}

interface BillingData {
  upcoming: Invoice[];
  overdue: Invoice[];
  history: Invoice[];
}

interface CalendarInvoice {
  _id: string;
  invoiceNumber: string;
  invoiceDate: string;
  paymentDate: string | null;
  amountPaid: number;
  amount: number;
  currency: string;
  status: 'GENERATED' | 'PAID' | 'OVERDUE';
  description: string;
}

interface CalendarData {
  success: boolean;
  year: number;
  month: number;
  invoices: CalendarInvoice[];
  invoicesByDay: Record<number, CalendarInvoice[]>;
  totalInvoices: number;
  totalPaid: number;
  currency?: string;
}

export default function ClientBillingPage() {
  const router = useRouter();
  const [billingData, setBillingData] = useState<BillingData>({ upcoming: [], overdue: [], history: [] });
  const [calendarData, setCalendarData] = useState<CalendarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingCalendar, setLoadingCalendar] = useState(false);
  const [error, setError] = useState('');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    fetchBillingData();
  }, []);

  useEffect(() => {
    if (showCalendar) {
      fetchCalendarData();
    }
  }, [showCalendar, selectedYear, selectedMonth]);

  const fetchBillingData = async () => {
    try {
      const response = await fetch('/api/client/billing');
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          router.push('/login');
          return;
        }
        throw new Error('Failed to fetch billing data');
      }
      const data = await response.json();
      setBillingData(data.billing || { upcoming: [], overdue: [], history: [] });
    } catch (err: any) {
      setError(err.message || 'Failed to load billing data');
    } finally {
      setLoading(false);
    }
  };

  const fetchCalendarData = async () => {
    setLoadingCalendar(true);
    try {
      const response = await fetch(`/api/client/billing/calendar?year=${selectedYear}&month=${selectedMonth}`);
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          router.push('/login');
          return;
        }
        throw new Error('Failed to fetch calendar data');
      }
      const data = await response.json();
      setCalendarData(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load calendar data');
    } finally {
      setLoadingCalendar(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PAID':
        return '#10b981';
      case 'OVERDUE':
        return '#dc2626';
      case 'GENERATED':
        return '#f59e0b';
      default:
        return 'var(--muted-jade)';
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

  const totalUpcoming = billingData.upcoming.reduce((sum, inv) => sum + inv.amount, 0);
  const totalOverdue = billingData.overdue.reduce((sum, inv) => sum + inv.amount, 0);
  const totalPaid = billingData.history.reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', color: 'var(--imperial-emerald)' }}>
        Billing
      </h1>

      {/* Billing Overview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card">
          <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem', color: 'var(--imperial-emerald)' }}>
            Upcoming Payments
          </h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--golden-opal)', marginBottom: '0.25rem' }}>
            {formatCurrency(totalUpcoming)}
          </div>
          <div style={{ fontSize: '0.875rem', color: 'var(--muted-jade)' }}>
            {billingData.upcoming.length} invoice{billingData.upcoming.length !== 1 ? 's' : ''}
          </div>
        </div>

        {totalOverdue > 0 && (
          <div className="card" style={{ borderLeft: '4px solid #dc2626' }}>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem', color: '#dc2626' }}>
              Overdue
            </h3>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#dc2626', marginBottom: '0.25rem' }}>
              {formatCurrency(totalOverdue)}
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--muted-jade)' }}>
              {billingData.overdue.length} invoice{billingData.overdue.length !== 1 ? 's' : ''}
            </div>
          </div>
        )}

        <div className="card">
          <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem', color: 'var(--imperial-emerald)' }}>
            Total Paid
          </h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--imperial-emerald)', marginBottom: '0.25rem' }}>
            {formatCurrency(totalPaid)}
          </div>
          <div style={{ fontSize: '0.875rem', color: 'var(--muted-jade)' }}>
            {billingData.history.length} invoice{billingData.history.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Overdue Invoices */}
      {billingData.overdue.length > 0 && (
        <div className="card" style={{ marginBottom: '2rem', borderLeft: '4px solid #dc2626' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#dc2626', borderBottom: '2px solid rgba(220, 38, 38, 0.2)', paddingBottom: '0.5rem' }}>
            Overdue Invoices
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {billingData.overdue.map((invoice) => (
              <div
                key={invoice._id}
                className="card"
                style={{
                  padding: '1rem',
                  background: 'rgba(220, 38, 38, 0.05)',
                  borderLeft: '4px solid #dc2626',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--imperial-emerald)' }}>
                      Invoice #{invoice.invoiceNumber}
                    </h3>
                    {invoice.description && (
                      <p style={{ color: 'var(--muted-jade)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                        {invoice.description}
                      </p>
                    )}
                    <div style={{ fontSize: '0.875rem', color: 'var(--muted-jade)' }}>
                      <div><strong>Due Date:</strong> {new Date(invoice.dueDate).toLocaleDateString()}</div>
                      <div style={{ marginTop: '0.25rem' }}>
                        <strong>Days Overdue:</strong> {Math.max(0, Math.floor((new Date().getTime() - new Date(invoice.dueDate).getTime()) / (1000 * 60 * 60 * 24)))}
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#dc2626', marginBottom: '0.5rem' }}>
                      {formatCurrency(invoice.amount)}
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                    <span
                      style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '0.375rem',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        background: '#dc2626',
                        color: 'white',
                        textTransform: 'uppercase',
                      }}
                    >
                      {invoice.status}
                    </span>
                      {invoice.fileId && (
                        <a
                          href={`/api/client/invoice/${invoice.fileId}`}
                          download
                          style={{
                            padding: '0.25rem 0.5rem',
                            borderRadius: '0.375rem',
                            fontSize: '0.75rem',
                            background: 'var(--imperial-emerald)',
                            color: 'white',
                            textDecoration: 'none',
                          }}
                          title="Download Invoice PDF"
                        >
                          📄 PDF
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Invoices */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--imperial-emerald)', borderBottom: '2px solid var(--golden-opal)', paddingBottom: '0.5rem' }}>
          Upcoming Invoices ({billingData.upcoming.length})
        </h2>

        {billingData.upcoming.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p style={{ color: 'var(--muted-jade)' }}>
              No upcoming invoices at this time.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {billingData.upcoming.map((invoice) => (
              <div
                key={invoice._id}
                className="card"
                style={{
                  padding: '1rem',
                  borderLeft: '4px solid var(--golden-opal)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--imperial-emerald)' }}>
                      Invoice #{invoice.invoiceNumber}
                    </h3>
                    {invoice.description && (
                      <p style={{ color: 'var(--muted-jade)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                        {invoice.description}
                      </p>
                    )}
                    <div style={{ fontSize: '0.875rem', color: 'var(--muted-jade)' }}>
                      <div><strong>Due Date:</strong> {new Date(invoice.dueDate).toLocaleDateString()}</div>
                      <div style={{ marginTop: '0.25rem' }}>
                        <strong>Days Until Due:</strong> {Math.max(0, Math.floor((new Date(invoice.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))}
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--golden-opal)', marginBottom: '0.5rem' }}>
                      {formatCurrency(invoice.amount)}
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                    <span
                      style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '0.375rem',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        background: getStatusColor(invoice.status) + '20',
                        color: getStatusColor(invoice.status),
                        textTransform: 'uppercase',
                      }}
                    >
                      {invoice.status}
                    </span>
                      {invoice.fileId && (
                        <a
                          href={`/api/client/invoice/${invoice.fileId}`}
                          download
                          style={{
                            padding: '0.25rem 0.5rem',
                            borderRadius: '0.375rem',
                            fontSize: '0.75rem',
                            background: 'var(--imperial-emerald)',
                            color: 'white',
                            textDecoration: 'none',
                          }}
                          title="Download Invoice PDF"
                        >
                          📄 PDF
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Payment History Calendar */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--imperial-emerald)', borderBottom: '2px solid var(--golden-opal)', paddingBottom: '0.5rem' }}>
            Payment History Calendar
          </h2>
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className="btn-primary"
            style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
          >
            {showCalendar ? 'Hide Calendar' : 'Show Calendar View'}
          </button>
        </div>

        {showCalendar && (
          <div>
            {/* Month/Year Picker */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--imperial-emerald)' }}>
                  Year
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="input"
                  style={{ minWidth: '120px' }}
                >
                  {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--imperial-emerald)' }}>
                  Month
                </label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                  className="input"
                  style={{ minWidth: '150px' }}
                >
                  {[
                    'January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'
                  ].map((month, index) => (
                    <option key={index + 1} value={index + 1}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {loadingCalendar ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div className="spinner" />
              </div>
            ) : calendarData ? (
              <div>
                {/* Calendar Summary */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ padding: '1rem', background: 'rgba(196, 183, 91, 0.1)', borderRadius: '0.375rem' }}>
                    <div style={{ fontSize: '0.875rem', color: 'var(--muted-jade)', marginBottom: '0.25rem' }}>Total Invoices</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--imperial-emerald)' }}>
                      {calendarData.totalInvoices}
                    </div>
                  </div>
                  <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '0.375rem' }}>
                    <div style={{ fontSize: '0.875rem', color: 'var(--muted-jade)', marginBottom: '0.25rem' }}>Total Paid</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>
                      {calendarData.currency || 'USD'} {calendarData.totalPaid.toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid var(--golden-opal)' }}>
                        <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--imperial-emerald)', fontWeight: '600' }}>
                          Date
                        </th>
                        <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--imperial-emerald)', fontWeight: '600' }}>
                          Invoice #
                        </th>
                        <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--imperial-emerald)', fontWeight: '600' }}>
                          Invoice Date
                        </th>
                        <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--imperial-emerald)', fontWeight: '600' }}>
                          Payment Date
                        </th>
                        <th style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--imperial-emerald)', fontWeight: '600' }}>
                          Amount Paid
                        </th>
                        <th style={{ padding: '0.75rem', textAlign: 'center', color: 'var(--imperial-emerald)', fontWeight: '600' }}>
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {calendarData.invoices.length === 0 ? (
                        <tr>
                          <td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: 'var(--muted-jade)' }}>
                            No invoices found for {new Date(selectedYear, selectedMonth - 1).toLocaleString('default', { month: 'long', year: 'numeric' })}
                          </td>
                        </tr>
                      ) : (
                        calendarData.invoices.map((invoice) => (
                          <tr key={invoice._id} style={{ borderBottom: '1px solid rgba(196, 183, 91, 0.2)' }}>
                            <td style={{ padding: '0.75rem', color: 'var(--muted-jade)' }}>
                              {new Date(invoice.invoiceDate).toLocaleDateString()}
                            </td>
                            <td style={{ padding: '0.75rem', color: 'var(--muted-jade)' }}>
                              #{invoice.invoiceNumber}
                            </td>
                            <td style={{ padding: '0.75rem', color: 'var(--muted-jade)' }}>
                              {new Date(invoice.invoiceDate).toLocaleDateString()}
                            </td>
                            <td style={{ padding: '0.75rem', color: 'var(--muted-jade)' }}>
                              {invoice.paymentDate ? new Date(invoice.paymentDate).toLocaleDateString() : '-'}
                            </td>
                            <td style={{ padding: '0.75rem', textAlign: 'right', color: invoice.amountPaid > 0 ? '#10b981' : 'var(--muted-jade)', fontWeight: invoice.amountPaid > 0 ? '600' : 'normal' }}>
                              {invoice.currency || 'USD'} {invoice.amountPaid.toFixed(2)}
                            </td>
                            <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                              <span
                                style={{
                                  padding: '0.25rem 0.75rem',
                                  borderRadius: '0.375rem',
                                  fontSize: '0.75rem',
                                  fontWeight: '600',
                                  background: getStatusColor(invoice.status) + '20',
                                  color: getStatusColor(invoice.status),
                                  textTransform: 'uppercase',
                                }}
                              >
                                {invoice.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--muted-jade)' }}>
                Click &quot;Show Calendar View&quot; to load calendar data
              </div>
            )}
          </div>
        )}
      </div>

      {/* Payment History */}
      <div className="card">
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--imperial-emerald)', borderBottom: '2px solid var(--golden-opal)', paddingBottom: '0.5rem' }}>
          Payment History ({billingData.history.length})
        </h2>

        {billingData.history.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p style={{ color: 'var(--muted-jade)' }}>
              No payment history available yet.
            </p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--golden-opal)' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--imperial-emerald)', fontWeight: '600' }}>
                    Invoice #
                  </th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--imperial-emerald)', fontWeight: '600' }}>
                    Description
                  </th>
                  <th style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--imperial-emerald)', fontWeight: '600' }}>
                    Amount
                  </th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--imperial-emerald)', fontWeight: '600' }}>
                    Paid Date
                  </th>
                  <th style={{ padding: '0.75rem', textAlign: 'center', color: 'var(--imperial-emerald)', fontWeight: '600' }}>
                    Status / Download
                  </th>
                </tr>
              </thead>
              <tbody>
                {billingData.history.map((invoice) => (
                  <tr key={invoice._id} style={{ borderBottom: '1px solid rgba(196, 183, 91, 0.2)' }}>
                    <td style={{ padding: '0.75rem', color: 'var(--muted-jade)' }}>
                      #{invoice.invoiceNumber}
                    </td>
                    <td style={{ padding: '0.75rem', color: 'var(--muted-jade)' }}>
                      {invoice.description || 'N/A'}
                    </td>
                    <td style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--imperial-emerald)', fontWeight: '600' }}>
                      {formatCurrency(invoice.amount)}
                    </td>
                    <td style={{ padding: '0.75rem', color: 'var(--muted-jade)' }}>
                      {invoice.paidAt ? new Date(invoice.paidAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                      <span
                        style={{
                          padding: '0.25rem 0.75rem',
                          borderRadius: '0.375rem',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          background: getStatusColor(invoice.status) + '20',
                          color: getStatusColor(invoice.status),
                          textTransform: 'uppercase',
                        }}
                      >
                        {invoice.status}
                      </span>
                        {invoice.fileId && (
                          <a
                            href={`/api/client/invoice/${invoice.fileId}`}
                            download
                            style={{
                              padding: '0.25rem 0.5rem',
                              borderRadius: '0.375rem',
                              fontSize: '0.75rem',
                              background: 'var(--imperial-emerald)',
                              color: 'white',
                              textDecoration: 'none',
                            }}
                            title="Download Invoice PDF"
                          >
                            📄 PDF
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

