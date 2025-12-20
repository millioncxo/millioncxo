'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LogoComponent from '@/components/LogoComponent';
import StatsCards from '@/components/sdr/StatsCards';
import ClientDetailPanel from '@/components/sdr/ClientDetailPanel';
import ChatHistorySection from '@/components/sdr/ChatHistorySection';
import UpdatesTimeline from '@/components/sdr/UpdatesTimeline';
import UpdatesTable from '@/components/sdr/UpdatesTable';
import ViewToggle, { ViewMode } from '@/components/sdr/ViewToggle';
import UpdateForm from '@/components/sdr/UpdateForm';

interface Client {
  clientId: string;
  businessName: string;
  businessAddress?: string;
  fullRegisteredAddress?: string;
  pointOfContact: {
    name: string;
    title?: string;
    email: string;
    phone?: string;
  };
  websiteAddress?: string;
  country?: string;
  plan?: {
    _id: string;
    name: string;
    pricePerMonth: number;
    creditsPerMonth: number;
    description?: string;
  };
  accountManager?: {
    _id: string;
    name: string;
    email: string;
  };
  numberOfLicenses: number;
  licenses: Array<{
    _id: string;
    productOrServiceName?: string;
    serviceType: string;
    label: string;
    status: string;
    startDate?: string;
    endDate?: string;
  }>;
  assignmentId: string;
  assignedAt: string;
  lastUpdateDate?: string;
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
  attachments?: string[];
}

interface ClientDetails {
  _id: string;
  businessName: string;
  fullRegisteredAddress?: string;
  pointOfContact: {
    name: string;
    title?: string;
    email: string;
    phone?: string;
  };
  websiteAddress?: string;
  country?: string;
  plan?: {
    _id: string;
    name: string;
    pricePerMonth: number;
    creditsPerMonth: number;
    description?: string;
  };
  accountManager?: {
    _id: string;
    name: string;
    email: string;
  };
  numberOfLicenses: number;
  licenses: Array<{
    _id: string;
    productOrServiceName: string;
    serviceType: string;
    label: string;
    status: string;
    startDate: string;
    endDate?: string;
    isAssignedToSdr: boolean;
  }>;
  assignmentId: string;
  assignedAt: string;
}

export default function SdrDashboard() {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [expandedClient, setExpandedClient] = useState<string | null>(null);
  const [clientDetails, setClientDetails] = useState<ClientDetails | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [updates, setUpdates] = useState<Update[]>([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showChatHistoryForm, setShowChatHistoryForm] = useState(false);
  const [chatHistory, setChatHistory] = useState('');
  const [chatHistoryLoading, setChatHistoryLoading] = useState(false);
  const [chatHistorySaving, setChatHistorySaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [error, setError] = useState('');
  const [updatesView, setUpdatesView] = useState<ViewMode>('table');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [statsFromApi, setStatsFromApi] = useState<{ totalLicenses: number; activeLicenses: number } | null>(null);
  const [updateFormData, setUpdateFormData] = useState<{
    type: Update['type'];
    title: string;
    description: string;
    date: string;
    chatHistory?: string;
  }>({
    type: 'NOTE',
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    chatHistory: '',
  });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch('/api/sdr/clients');
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          router.push('/login');
          return;
        }
        throw new Error('Failed to fetch clients');
      }
      const data = await response.json();
      setClients(data.clients || []);
      // Update stats from API response if available
      if (data.stats) {
        setStatsFromApi(data.stats);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load clients');
    } finally {
      setLoading(false);
    }
  };

  const fetchClientDetails = async (clientId: string) => {
    if (expandedClient === clientId && clientDetails) {
      setExpandedClient(null);
      setClientDetails(null);
      setUpdates([]);
      setChatHistory('');
      setShowChatHistoryForm(false);
      return;
    }

    setLoadingDetails(true);
    try {
      const [detailsResponse, updatesResponse] = await Promise.all([
        fetch(`/api/sdr/clients/${clientId}`),
        fetch(`/api/sdr/clients/${clientId}/updates`),
      ]);

      if (!detailsResponse.ok || !updatesResponse.ok) {
        throw new Error('Failed to fetch client details');
      }

      const detailsData = await detailsResponse.json();
      const updatesData = await updatesResponse.json();

      setClientDetails(detailsData.client);
      setUpdates(updatesData.updates || []);

      // Fetch chat history
      setChatHistoryLoading(true);
      try {
        const chatResponse = await fetch(`/api/sdr/clients/${clientId}/chat-history`);
        if (chatResponse.ok) {
          const chatData = await chatResponse.json();
          setChatHistory(chatData.chatHistory || '');
        }
      } catch (err) {
        // Silently handle chat history fetch errors
      } finally {
        setChatHistoryLoading(false);
      }

      setExpandedClient(clientId);
    } catch (err: any) {
      setError(err.message || 'Failed to load client details');
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleAddUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!expandedClient) return;

    setError('');
    try {
      const response = await fetch(`/api/sdr/clients/${expandedClient}/updates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...updateFormData,
          chatHistory: updateFormData.chatHistory || undefined,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create update');
      }

      // Refresh updates
      if (updatesView === 'timeline') {
        const updatesResponse = await fetch(`/api/sdr/clients/${expandedClient}/updates`);
        if (updatesResponse.ok) {
          const updatesData = await updatesResponse.json();
          setUpdates(updatesData.updates || []);
        }
      } else {
        // Trigger table refresh
        setRefreshTrigger(prev => prev + 1);
      }

      // Refresh clients list to update lastUpdateDate
      await fetchClients();

      setShowUpdateForm(false);
      setUpdateFormData({
        type: 'NOTE',
        title: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        chatHistory: '',
      });
    } catch (err: any) {
      setError(err.message || 'Failed to create update');
    }
  };

  const handleSaveChatHistory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!expandedClient) return;

    setChatHistorySaving(true);
    setError('');

    try {
      const response = await fetch(`/api/sdr/clients/${expandedClient}/chat-history`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatHistory }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save chat history');
      }

      setShowChatHistoryForm(false);
      setError(''); // Clear any previous errors
      
      // Show temporary success message
      const successMsg = document.getElementById('success-message');
      if (successMsg) {
        successMsg.style.display = 'block';
        setTimeout(() => {
          if (successMsg) successMsg.style.display = 'none';
        }, 3000);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to save chat history');
    } finally {
      setChatHistorySaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <div className="spinner" />
      </div>
    );
  }

  // Use API stats if available, otherwise calculate from clients
  const totalLicenses = statsFromApi?.totalLicenses ?? clients.reduce((sum, c) => sum + (c.licenses?.length || 0), 0);
  const activeLicenses = statsFromApi?.activeLicenses ?? clients.reduce((sum, c) => {
    // Only count licenses that are assigned to this SDR (in the assignment)
    const assignedLicenses = c.licenses?.filter((l: any) => l && l.status === 'active') || [];
    return sum + assignedLicenses.length;
  }, 0);

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <LogoComponent width={48} height={26} hoverGradient={true} />
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.25rem', color: 'var(--imperial-emerald)' }}>
            SDR Dashboard
          </h1>
          <p style={{ color: 'var(--muted-jade)', fontSize: '0.875rem' }}>
            Manage your assigned clients and activities
          </p>
        </div>
      </div>

      {error && (
        <div className="card" style={{ background: '#fee2e2', color: '#dc2626', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      {/* Stats Overview */}
      <StatsCards 
        clientsCount={clients.length}
        totalLicenses={totalLicenses}
        activeLicenses={activeLicenses}
      />

      {/* Clients List */}
      <div className="card" style={{ padding: '0' }}>
        <div style={{ 
          padding: '1.5rem', 
          borderBottom: '2px solid rgba(196, 183, 91, 0.3)',
          background: 'linear-gradient(135deg, rgba(196, 183, 91, 0.1) 0%, rgba(196, 183, 91, 0.05) 100%)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
            <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', color: 'var(--imperial-emerald)', fontWeight: '600' }}>
            My Clients
          </h2>
          <p style={{ color: 'var(--muted-jade)', fontSize: '0.875rem' }}>
            {clients.length} {clients.length === 1 ? 'client' : 'clients'} assigned to you
          </p>
        </div>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="Search clients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input"
                style={{ minWidth: '200px', fontSize: '0.875rem', padding: '0.5rem 1rem' }}
              />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="input"
                style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
              >
                <option value="all">All Clients</option>
                <option value="with-updates">With Updates</option>
                <option value="no-updates">No Updates</option>
              </select>
            </div>
          </div>
        </div>

        {/* Success message for chat history */}
        {!error && chatHistory && !showChatHistoryForm && (
          <div className="card" style={{ background: '#d1fae5', color: '#065f46', margin: '1rem', padding: '0.75rem', borderRadius: '0.5rem', display: 'none' }} id="success-message">
            Chat history saved successfully!
          </div>
        )}

        {clients.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ color: 'var(--muted-jade)', fontSize: '1rem' }}>
              No clients assigned yet. Contact your admin to get assigned to clients.
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
                    Business Name
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
                    Contact
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
                    Licenses
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
                    Last Update
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
                {clients
                  .filter((client) => {
                    // Search filter
                    if (searchQuery) {
                      const query = searchQuery.toLowerCase();
                      const matchesSearch = 
                        client.businessName.toLowerCase().includes(query) ||
                        client.pointOfContact?.email?.toLowerCase().includes(query) ||
                        client.pointOfContact?.name?.toLowerCase().includes(query);
                      if (!matchesSearch) return false;
                    }
                    
                    // Status filter
                    if (filterStatus === 'with-updates' && !client.lastUpdateDate) return false;
                    if (filterStatus === 'no-updates' && client.lastUpdateDate) return false;
                    
                    return true;
                  })
                  .map((client) => (
                  <>
                    <tr 
                      key={client.clientId}
                      style={{ 
                        borderBottom: '1px solid rgba(196, 183, 91, 0.15)',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer'
                      }}
                      onClick={() => fetchClientDetails(client.clientId)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(196, 183, 91, 0.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '';
                      }}
                    >
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: '600', color: 'var(--imperial-emerald)', marginBottom: '0.25rem' }}>
                          {client.businessName}
                        </div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ color: 'var(--muted-jade)', fontSize: '0.875rem' }}>
                          <div style={{ fontWeight: '500', marginBottom: '0.125rem' }}>
                            {client.pointOfContact.name}
                            {client.pointOfContact.title && ` (${client.pointOfContact.title})`}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--muted-jade)' }}>{client.pointOfContact.email}</div>
                        </div>
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', alignItems: 'center' }}>
                          <span style={{ 
                            display: 'inline-block',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '0.375rem',
                            background: 'rgba(196, 183, 91, 0.2)',
                            color: 'var(--imperial-emerald)',
                            fontWeight: '600',
                            fontSize: '0.875rem'
                          }}>
                            {client.licenses.length} Assigned
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        {client.lastUpdateDate ? (
                          <div style={{ color: 'var(--muted-jade)', fontSize: '0.875rem' }}>
                            {new Date(client.lastUpdateDate).toLocaleDateString()}
                          </div>
                        ) : (
                          <span style={{ color: 'var(--muted-jade)', fontSize: '0.875rem', fontStyle: 'italic' }}>
                            No updates yet
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <span style={{ color: 'var(--muted-jade)', fontSize: '0.875rem' }}>
                          {expandedClient === client.clientId ? '▼ Hide' : '▶ View'} Details
                        </span>
                      </td>
                    </tr>
                    {/* Expanded Client Details Row */}
                    {expandedClient === client.clientId && (
                      <tr>
                        <td colSpan={5} style={{ padding: '0' }}>
                          <div className="card" style={{ margin: '0.5rem', background: 'rgba(196, 183, 91, 0.05)' }}>
                    <ClientDetailPanel clientDetails={clientDetails} loading={loadingDetails} />

                        {/* LinkedIn Chat History Section */}
                    <ChatHistorySection
                      chatHistory={chatHistory}
                      loading={chatHistoryLoading}
                      onEdit={() => setShowChatHistoryForm(!showChatHistoryForm)}
                      showForm={showChatHistoryForm}
                      onSave={handleSaveChatHistory}
                      onCancel={() => {
                        setShowChatHistoryForm(false);
                        // Reset to original chat history if cancelled
                        if (expandedClient) {
                          fetch(`/api/sdr/clients/${expandedClient}/chat-history`)
                            .then(res => res.json())
                            .then(data => setChatHistory(data.chatHistory || ''));
                        }
                      }}
                      chatHistoryValue={chatHistory}
                      onChatHistoryChange={setChatHistory}
                      saving={chatHistorySaving}
                    />

                        {/* Updates Section */}
                        <div style={{ marginTop: '2rem', borderTop: '2px solid var(--golden-opal)', paddingTop: '1.5rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--imperial-emerald)', margin: 0 }}>
                                Updates & Activity
                            </h3>
                              <ViewToggle currentView={updatesView} onViewChange={setUpdatesView} />
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowUpdateForm(!showUpdateForm);
                              }}
                              className="btn-primary"
                              style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
                            >
                              + Add Update
                            </button>
                          </div>
                          {updatesView === 'table' ? (
                            <UpdatesTable 
                              clientId={expandedClient!}
                              refreshTrigger={refreshTrigger}
                              onExport={(updates) => {
                                // Export handled by UpdatesTable component
                              }}
                            />
                          ) : (
                            <UpdatesTimeline updates={updates} />
                          )}
                      </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
