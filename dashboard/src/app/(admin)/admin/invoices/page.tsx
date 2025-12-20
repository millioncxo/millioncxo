'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LogoComponent from '@/components/LogoComponent';
import { Download, FileText, CheckCircle, XCircle, Calendar, DollarSign, Search, Filter, RefreshCw } from 'lucide-react';

interface Invoice {
  _id: string;
  invoiceNumber?: string;
  clientId: {
    _id: string;
    businessName: string;
  };
  invoiceDate?: Date | string;
  dueDate: Date | string;
  amount: number;
  currency: string;
  status: 'GENERATED' | 'PAID' | 'OVERDUE';
  paymentDate?: Date | string | null;
  fileId?: string;
  description?: string;
  createdAt: Date | string;
}

interface InvoiceSummary {
  totalInvoices: number;
  totalAmount: number;
  paidAmount: number;
  outstandingAmount: number;
  overdueCount: number;
}

export default function InvoicesPage() {
  const router = useRouter();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([]);
  const [summary, setSummary] = useState<InvoiceSummary>({
    totalInvoices: 0,
    totalAmount: 0,
    paidAmount: 0,
    outstandingAmount: 0,
    overdueCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [clients, setClients] = useState<Array<{ _id: string; businessName: string }>>([]);
  
  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [clientFilter, setClientFilter] = useState<string>('');
  const [dateFrom, setDateFrom] = useState<string>('');
  const [dateTo, setDateTo] = useState<string>('');
  const [amountMin, setAmountMin] = useState<string>('');
  const [amountMax, setAmountMax] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Bulk selection
  const [selectedInvoices, setSelectedInvoices] = useState<Set<string>>(new Set());
  const [bulkActionLoading, setBulkActionLoading] = useState(false);

  useEffect(() => {
    fetchInvoices();
    fetchClients();
  }, []);

  // Refetch invoices when page becomes visible (user navigates back to page)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchInvoices();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...invoices];

    // Status filter
    if (statusFilter) {
      filtered = filtered.filter(inv => inv.status === statusFilter);
    }

    // Client filter
    if (clientFilter) {
      filtered = filtered.filter(inv => inv.clientId._id === clientFilter);
    }

    // Date range filter
    if (dateFrom) {
      const fromDate = new Date(dateFrom);
      filtered = filtered.filter(inv => {
        const invDate = new Date(inv.invoiceDate || inv.createdAt);
        return invDate >= fromDate;
      });
    }
    if (dateTo) {
      const toDate = new Date(dateTo);
      toDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter(inv => {
        const invDate = new Date(inv.invoiceDate || inv.createdAt);
        return invDate <= toDate;
      });
    }

    // Amount range filter
    if (amountMin) {
      const min = parseFloat(amountMin);
      if (!isNaN(min)) {
        filtered = filtered.filter(inv => inv.amount >= min);
      }
    }
    if (amountMax) {
      const max = parseFloat(amountMax);
      if (!isNaN(max)) {
        filtered = filtered.filter(inv => inv.amount <= max);
      }
    }

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(inv => 
        inv.invoiceNumber?.toLowerCase().includes(term) ||
        inv.clientId.businessName.toLowerCase().includes(term) ||
        inv.description?.toLowerCase().includes(term)
      );
    }

    setFilteredInvoices(filtered);
    calculateSummary(filtered);
  }, [statusFilter, clientFilter, dateFrom, dateTo, amountMin, amountMax, searchTerm, invoices]);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch('/api/admin/invoices');
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          router.push('/login');
          return;
        }
        throw new Error('Failed to fetch invoices');
      }
      const data = await response.json();
      console.log('[Invoices Page] Fetched invoices:', data.invoices?.length || 0);
      setInvoices(data.invoices || []);
      setFilteredInvoices(data.invoices || []);
      calculateSummary(data.invoices || []);
    } catch (err: any) {
      console.error('[Invoices Page] Error fetching invoices:', err);
      setError(err.message || 'Failed to load invoices');
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

  const calculateSummary = (invoiceList: Invoice[]) => {
    const total = invoiceList.length;
    const totalAmount = invoiceList.reduce((sum, inv) => sum + inv.amount, 0);
    const paidInvoices = invoiceList.filter(inv => inv.status === 'PAID');
    const paidAmount = paidInvoices.reduce((sum, inv) => sum + inv.amount, 0);
    const outstandingAmount = totalAmount - paidAmount;
    const overdueCount = invoiceList.filter(inv => inv.status === 'OVERDUE').length;

    setSummary({
      totalInvoices: total,
      totalAmount,
      paidAmount,
      outstandingAmount,
      overdueCount,
    });
  };

  const handleDownloadInvoice = async (invoiceId: string, fileId: string) => {
    try {
      const invoice = invoices.find(inv => inv._id === invoiceId);
      if (!invoice) return;

      const clientId = typeof invoice.clientId === 'object' ? invoice.clientId._id : invoice.clientId;
      const response = await fetch(`/api/admin/clients/${clientId}/invoice/${fileId}`);
      if (!response.ok) throw new Error('Failed to download invoice');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoice-${invoice.invoiceNumber || invoiceId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err: any) {
      setError(err.message || 'Failed to download invoice');
    }
  };

  const handleMarkPaid = async (invoiceId: string) => {
    try {
      const response = await fetch(`/api/admin/invoices/${invoiceId}/mark-paid`, {
        method: 'POST',
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to mark invoice as paid');
      }
      await fetchInvoices();
      alert('Invoice marked as paid successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to mark invoice as paid');
    }
  };

  const handleBulkMarkPaid = async () => {
    if (selectedInvoices.size === 0) {
      setError('Please select at least one invoice');
      return;
    }

    if (!confirm(`Mark ${selectedInvoices.size} invoice(s) as paid?`)) {
      return;
    }

    try {
      setBulkActionLoading(true);
      const response = await fetch('/api/admin/invoices/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invoiceIds: Array.from(selectedInvoices),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to mark invoices as paid');
      }

      setSelectedInvoices(new Set());
      await fetchInvoices();
      alert(`${selectedInvoices.size} invoice(s) marked as paid successfully!`);
    } catch (err: any) {
      setError(err.message || 'Failed to mark invoices as paid');
    } finally {
      setBulkActionLoading(false);
    }
  };

  const handleBulkDownload = async () => {
    if (selectedInvoices.size === 0) {
      setError('Please select at least one invoice');
      return;
    }

    try {
      setBulkActionLoading(true);
      const response = await fetch('/api/admin/invoices/bulk/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invoiceIds: Array.from(selectedInvoices),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to download invoices');
      }

      const data = await response.json();
      
      // For now, download files individually since ZIP requires archiver package
      if (data.invoices && data.invoices.length > 0) {
        for (const invoice of data.invoices) {
          try {
            const fileResponse = await fetch(invoice.downloadUrl);
            if (fileResponse.ok) {
              const blob = await fileResponse.blob();
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `invoice-${invoice.invoiceNumber || invoice.invoiceId}.pdf`;
              document.body.appendChild(a);
              a.click();
              window.URL.revokeObjectURL(url);
              document.body.removeChild(a);
              // Small delay between downloads
              await new Promise(resolve => setTimeout(resolve, 100));
            }
          } catch (err) {
            console.error(`Failed to download invoice ${invoice.invoiceId}:`, err);
          }
        }
        alert(`Downloaded ${data.invoices.length} invoice(s) individually. ZIP download requires archiver package installation.`);
      } else {
        throw new Error('No invoices to download');
      }
      
      setSelectedInvoices(new Set());
    } catch (err: any) {
      setError(err.message || 'Failed to download invoices');
    } finally {
      setBulkActionLoading(false);
    }
  };

  const toggleSelectInvoice = (invoiceId: string) => {
    const newSelected = new Set(selectedInvoices);
    if (newSelected.has(invoiceId)) {
      newSelected.delete(invoiceId);
    } else {
      newSelected.add(invoiceId);
    }
    setSelectedInvoices(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedInvoices.size === filteredInvoices.length) {
      setSelectedInvoices(new Set());
    } else {
      setSelectedInvoices(new Set(filteredInvoices.map(inv => inv._id)));
    }
  };

  const clearFilters = () => {
    setStatusFilter('');
    setClientFilter('');
    setDateFrom('');
    setDateTo('');
    setAmountMin('');
    setAmountMax('');
    setSearchTerm('');
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
            Invoice Management
          </h1>
          <p style={{ color: 'var(--muted-jade)', fontSize: '0.875rem' }}>
            View and manage all invoices across all clients
          </p>
        </div>
        <button
          onClick={() => {
            fetchInvoices();
            fetchClients();
          }}
          className="btn-secondary"
          style={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          title="Refresh invoices list"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="card" style={{ background: '#fee2e2', color: '#dc2626', marginBottom: '1rem' }}>
          {error}
          <button
            onClick={() => setError('')}
            style={{ marginLeft: '1rem', background: 'transparent', border: 'none', color: '#dc2626', cursor: 'pointer' }}
          >
            ×
          </button>
        </div>
      )}

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <FileText size={24} color="var(--imperial-emerald)" />
            <div style={{ color: 'var(--muted-jade)', fontSize: '0.875rem' }}>Total Invoices</div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--imperial-emerald)' }}>
            {summary.totalInvoices}
          </div>
        </div>
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <DollarSign size={24} color="var(--imperial-emerald)" />
            <div style={{ color: 'var(--muted-jade)', fontSize: '0.875rem' }}>Total Amount</div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--imperial-emerald)' }}>
            ${summary.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <CheckCircle size={24} color="#10b981" />
            <div style={{ color: 'var(--muted-jade)', fontSize: '0.875rem' }}>Paid Amount</div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>
            ${summary.paidAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <DollarSign size={24} color="#f59e0b" />
            <div style={{ color: 'var(--muted-jade)', fontSize: '0.875rem' }}>Outstanding</div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>
            ${summary.outstandingAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <XCircle size={24} color="#ef4444" />
            <div style={{ color: 'var(--muted-jade)', fontSize: '0.875rem' }}>Overdue</div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ef4444' }}>
            {summary.overdueCount}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card" style={{ marginBottom: '1.5rem', padding: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Filter size={20} color="var(--imperial-emerald)" />
          <h3 style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--imperial-emerald)' }}>Filters</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem', fontWeight: '500', color: 'var(--imperial-emerald)' }}>
              Search
            </label>
            <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: '0.5rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-jade)' }} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Invoice #, client..."
                className="input"
                style={{ paddingLeft: '2rem', width: '100%', fontSize: '0.75rem', padding: '0.4rem 0.5rem 0.4rem 2rem' }}
              />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem', fontWeight: '500', color: 'var(--imperial-emerald)' }}>
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input"
              style={{ width: '100%', fontSize: '0.75rem', padding: '0.4rem 0.5rem' }}
            >
              <option value="">All</option>
              <option value="GENERATED">Generated</option>
              <option value="PAID">Paid</option>
              <option value="OVERDUE">Overdue</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem', fontWeight: '500', color: 'var(--imperial-emerald)' }}>
              Client
            </label>
            <select
              value={clientFilter}
              onChange={(e) => setClientFilter(e.target.value)}
              className="input"
              style={{ width: '100%', fontSize: '0.75rem', padding: '0.4rem 0.5rem' }}
            >
              <option value="">All</option>
              {clients.map((client) => (
                <option key={client._id} value={client._id}>
                  {client.businessName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem', fontWeight: '500', color: 'var(--imperial-emerald)' }}>
              From
            </label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="input"
              style={{ width: '100%', fontSize: '0.75rem', padding: '0.4rem 0.5rem' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem', fontWeight: '500', color: 'var(--imperial-emerald)' }}>
              To
            </label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="input"
              style={{ width: '100%', fontSize: '0.75rem', padding: '0.4rem 0.5rem' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem', fontWeight: '500', color: 'var(--imperial-emerald)' }}>
              Min $
            </label>
            <input
              type="number"
              value={amountMin}
              onChange={(e) => setAmountMin(e.target.value)}
              placeholder="0"
              className="input"
              style={{ width: '100%', fontSize: '0.75rem', padding: '0.4rem 0.5rem' }}
              step="0.01"
              min="0"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.75rem', fontWeight: '500', color: 'var(--imperial-emerald)' }}>
              Max $
            </label>
            <input
              type="number"
              value={amountMax}
              onChange={(e) => setAmountMax(e.target.value)}
              placeholder="0"
              className="input"
              style={{ width: '100%', fontSize: '0.75rem', padding: '0.4rem 0.5rem' }}
              step="0.01"
              min="0"
            />
          </div>
        </div>
        <button
          onClick={clearFilters}
          className="btn-secondary"
          style={{ fontSize: '0.75rem', padding: '0.4rem 0.75rem', whiteSpace: 'nowrap' }}
        >
          Clear
        </button>
      </div>

      {/* Bulk Actions */}
      {selectedInvoices.size > 0 && (
        <div className="card" style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(196, 183, 91, 0.1)', border: '2px solid var(--golden-opal)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <span style={{ fontWeight: '600', color: 'var(--imperial-emerald)' }}>
              {selectedInvoices.size} invoice(s) selected
            </span>
            <button
              onClick={handleBulkMarkPaid}
              disabled={bulkActionLoading}
              className="btn-primary"
              style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
            >
              {bulkActionLoading ? 'Processing...' : 'Mark as Paid'}
            </button>
            <button
              onClick={handleBulkDownload}
              disabled={bulkActionLoading}
              className="btn-secondary"
              style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
            >
              {bulkActionLoading ? 'Processing...' : 'Download Selected'}
            </button>
            <button
              onClick={() => setSelectedInvoices(new Set())}
              className="btn-secondary"
              style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
            >
              Clear Selection
            </button>
            <button
              onClick={async () => {
                try {
                  setBulkActionLoading(true);
                  // Build query params from current filters
                  const params = new URLSearchParams();
                  if (statusFilter) params.set('status', statusFilter);
                  if (clientFilter) params.set('clientId', clientFilter);
                  if (dateFrom) params.set('dateFrom', dateFrom);
                  if (dateTo) params.set('dateTo', dateTo);

                  const response = await fetch(`/api/admin/invoices/export/excel?${params.toString()}`);
                  if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data.error || 'Failed to export invoices');
                  }

                  const blob = await response.blob();
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `invoices-export-${new Date().toISOString().split('T')[0]}.xlsx`;
                  document.body.appendChild(a);
                  a.click();
                  window.URL.revokeObjectURL(url);
                  document.body.removeChild(a);
                  alert('Invoices exported to Excel successfully!');
                } catch (err: any) {
                  setError(err.message || 'Failed to export invoices to Excel');
                } finally {
                  setBulkActionLoading(false);
                }
              }}
              disabled={bulkActionLoading}
              className="btn-primary"
              style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
            >
              {bulkActionLoading ? 'Exporting...' : 'Download All as Excel'}
            </button>
          </div>
        </div>
      )}

      {/* Invoice Table */}
      <div className="card" style={{ padding: '0' }}>
        <div style={{ 
          padding: '1.5rem', 
          borderBottom: '2px solid rgba(196, 183, 91, 0.3)',
          background: 'linear-gradient(135deg, rgba(196, 183, 91, 0.1) 0%, rgba(196, 183, 91, 0.05) 100%)'
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', color: 'var(--imperial-emerald)', fontWeight: '600' }}>
            All Invoices
          </h2>
          <p style={{ color: 'var(--muted-jade)', fontSize: '0.875rem' }}>
            {filteredInvoices.length} {filteredInvoices.length === 1 ? 'invoice' : 'invoices'} {statusFilter || clientFilter || searchTerm ? '(filtered)' : 'total'}
          </p>
        </div>
        {filteredInvoices.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ color: 'var(--muted-jade)', fontSize: '1rem' }}>
              {invoices.length === 0 ? 'No invoices found. Generate invoices from the Clients page.' : 'No invoices match the selected filters.'}
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
                  <th style={{ padding: '1rem', textAlign: 'left', width: '40px' }}>
                    <input
                      type="checkbox"
                      checked={selectedInvoices.size === filteredInvoices.length && filteredInvoices.length > 0}
                      onChange={toggleSelectAll}
                      style={{ cursor: 'pointer' }}
                    />
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
                    Invoice #
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
                    Invoice Date
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
                    Due Date
                  </th>
                  <th style={{ 
                    padding: '1rem', 
                    textAlign: 'right', 
                    fontWeight: '600', 
                    color: 'var(--imperial-emerald)',
                    fontSize: '0.875rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Amount
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
                    Payment Date
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
                {filteredInvoices.map((invoice) => {
                  const clientId = typeof invoice.clientId === 'object' ? invoice.clientId._id : invoice.clientId;
                  const clientName = typeof invoice.clientId === 'object' ? invoice.clientId.businessName : 'Unknown';
                  const invoiceDate = invoice.invoiceDate ? new Date(invoice.invoiceDate) : new Date(invoice.createdAt);
                  const dueDate = new Date(invoice.dueDate);
                  const paymentDate = invoice.paymentDate ? new Date(invoice.paymentDate) : null;
                  const isOverdue = invoice.status === 'GENERATED' && dueDate < new Date();

                  return (
                    <tr 
                      key={invoice._id}
                      style={{ 
                        borderBottom: '1px solid rgba(196, 183, 91, 0.15)',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(196, 183, 91, 0.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '';
                      }}
                    >
                      <td style={{ padding: '1rem' }}>
                        <input
                          type="checkbox"
                          checked={selectedInvoices.has(invoice._id)}
                          onChange={() => toggleSelectInvoice(invoice._id)}
                          onClick={(e) => e.stopPropagation()}
                          style={{ cursor: 'pointer' }}
                        />
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: '600', color: 'var(--imperial-emerald)' }}>
                          {invoice.invoiceNumber || `INV-${invoice._id.substring(0, 8).toUpperCase()}`}
                        </div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ color: 'var(--muted-jade)', fontSize: '0.875rem', fontWeight: '500' }}>
                          {clientName}
                        </div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ color: 'var(--muted-jade)', fontSize: '0.875rem' }}>
                          {invoiceDate.toLocaleDateString()}
                        </div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ 
                          color: isOverdue ? '#ef4444' : 'var(--muted-jade)', 
                          fontSize: '0.875rem',
                          fontWeight: isOverdue ? '600' : 'normal'
                        }}>
                          {dueDate.toLocaleDateString()}
                        </div>
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'right' }}>
                        <div style={{ fontWeight: '600', color: 'var(--imperial-emerald)' }}>
                          {invoice.currency} {invoice.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <span style={{ 
                          display: 'inline-block',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '0.375rem',
                          background: invoice.status === 'PAID' 
                            ? '#d1fae5' 
                            : (isOverdue || invoice.status === 'OVERDUE')
                            ? '#fee2e2'
                            : '#fef3c7',
                          color: invoice.status === 'PAID' 
                            ? '#10b981' 
                            : (isOverdue || invoice.status === 'OVERDUE')
                            ? '#ef4444'
                            : '#f59e0b',
                          fontWeight: '600',
                          fontSize: '0.75rem',
                          textTransform: 'uppercase'
                        }}>
                          {isOverdue && invoice.status === 'GENERATED' ? 'OVERDUE' : invoice.status}
                        </span>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        {paymentDate ? (
                          <div style={{ color: 'var(--muted-jade)', fontSize: '0.875rem' }}>
                            {paymentDate.toLocaleDateString()}
                          </div>
                        ) : (
                          <span style={{ color: 'var(--muted-jade)', fontSize: '0.875rem', fontStyle: 'italic' }}>
                            —
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                          {invoice.fileId && (
                            <button
                              onClick={() => handleDownloadInvoice(invoice._id, invoice.fileId!)}
                              style={{
                                padding: '0.5rem',
                                border: 'none',
                                background: 'rgba(196, 183, 91, 0.1)',
                                borderRadius: '0.375rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s ease'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(196, 183, 91, 0.2)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(196, 183, 91, 0.1)';
                              }}
                              title="Download Invoice"
                            >
                              <Download size={16} color="var(--imperial-emerald)" />
                            </button>
                          )}
                          {invoice.status !== 'PAID' && (
                            <button
                              onClick={() => {
                                if (confirm('Mark this invoice as paid?')) {
                                  handleMarkPaid(invoice._id);
                                }
                              }}
                              style={{
                                padding: '0.5rem',
                                border: 'none',
                                background: 'rgba(16, 185, 129, 0.1)',
                                borderRadius: '0.375rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s ease'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)';
                              }}
                              title="Mark as Paid"
                            >
                              <CheckCircle size={16} color="#10b981" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

