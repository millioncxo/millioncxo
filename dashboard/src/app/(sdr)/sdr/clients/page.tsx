'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import UpdatesTable from '@/components/sdr/UpdatesTable';
import UpdatesTimeline from '@/components/sdr/UpdatesTimeline';
import ViewToggle, { ViewMode } from '@/components/sdr/ViewToggle';

interface Client {
  clientId: string;
  businessName: string;
  pointOfContact: {
    name: string;
    title?: string;
    email: string;
    phone?: string;
  };
  licenses: Array<{
    _id: string;
    serviceType: string;
    label: string;
    status: string;
  }>;
  numberOfLicenses: number;
  lastUpdateDate?: string;
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

export default function SdrClientsPage() {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [expandedClient, setExpandedClient] = useState<string | null>(null);
  const [clientDetails, setClientDetails] = useState<ClientDetails | null>(null);
  const [updates, setUpdates] = useState<Update[]>([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [error, setError] = useState('');
  const [updatesView, setUpdatesView] = useState<ViewMode>('table');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [updateFormData, setUpdateFormData] = useState({
    type: 'NOTE' as Update['type'],
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
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
        body: JSON.stringify(updateFormData),
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
      });
    } catch (err: any) {
      setError(err.message || 'Failed to create update');
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
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', color: 'var(--imperial-emerald)' }}>
        My Clients
      </h1>

      {error && (
        <div className="card" style={{ background: '#fee2e2', color: '#dc2626', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      {/* Clients List */}
      <div className="card">
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--imperial-emerald)' }}>
          Clients ({clients.length})
        </h2>

        {clients.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p style={{ color: 'var(--muted-jade)' }}>
              No clients assigned yet. Contact your admin to get assigned to clients.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {clients.map((client) => (
              <div key={client.clientId}>
                {/* Client List Item */}
                <div
                  className="card"
                  style={{
                    borderLeft: '4px solid var(--golden-opal)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    padding: '1rem',
                  }}
                  onClick={() => fetchClientDetails(client.clientId)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(196, 183, 91, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ flex: 1, minWidth: '200px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                      <div>
                        <strong style={{ color: 'var(--imperial-emerald)', display: 'block', marginBottom: '0.25rem' }}>
                          {client.businessName}
                        </strong>
                        <span style={{ color: 'var(--muted-jade)', fontSize: '0.875rem' }}>
                          {client.pointOfContact.name}
                          {client.pointOfContact.title && ` (${client.pointOfContact.title})`}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--muted-jade)' }}>
                        <div><strong>Email:</strong> {client.pointOfContact.email}</div>
                        {client.pointOfContact.phone && (
                          <div><strong>Phone:</strong> {client.pointOfContact.phone}</div>
                        )}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--muted-jade)' }}>
                        <div><strong>Licenses:</strong> {client.licenses.length}</div>
                        {client.lastUpdateDate && (
                          <div><strong>Last Update:</strong> {new Date(client.lastUpdateDate).toLocaleDateString()}</div>
                        )}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--muted-jade)', fontSize: '0.875rem' }}>
                        {expandedClient === client.clientId ? '▼ Hide' : '▶ View'} Details
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expanded Client Details */}
                {expandedClient === client.clientId && (
                  <div className="card" style={{ marginTop: '0.5rem', marginLeft: '1rem', background: 'rgba(196, 183, 91, 0.05)' }}>
                    {loadingDetails ? (
                      <div style={{ textAlign: 'center', padding: '2rem' }}>
                        <div className="spinner" />
                      </div>
                    ) : clientDetails ? (
                      <div>
                        {/* Client Details Section */}
                        <div style={{ marginBottom: '2rem' }}>
                          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--imperial-emerald)', borderBottom: '2px solid var(--golden-opal)', paddingBottom: '0.5rem' }}>
                            Client Information
                          </h3>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                            <div>
                              <p style={{ color: 'var(--muted-jade)', marginBottom: '0.25rem' }}>
                                <strong>Business Name:</strong> {clientDetails.businessName}
                              </p>
                              {clientDetails.fullRegisteredAddress && (
                                <p style={{ color: 'var(--muted-jade)', marginBottom: '0.25rem' }}>
                                  <strong>Address:</strong> {clientDetails.fullRegisteredAddress}
                                </p>
                              )}
                              {clientDetails.websiteAddress && (
                                <p style={{ color: 'var(--muted-jade)', marginBottom: '0.25rem' }}>
                                  <strong>Website:</strong> <a href={clientDetails.websiteAddress} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--imperial-emerald)' }}>{clientDetails.websiteAddress}</a>
                                </p>
                              )}
                              {clientDetails.country && (
                                <p style={{ color: 'var(--muted-jade)', marginBottom: '0.25rem' }}>
                                  <strong>Country:</strong> {clientDetails.country}
                                </p>
                              )}
                            </div>
                            <div>
                              <p style={{ color: 'var(--muted-jade)', marginBottom: '0.25rem' }}>
                                <strong>Contact Name:</strong> {clientDetails.pointOfContact.name}
                                {clientDetails.pointOfContact.title && ` (${clientDetails.pointOfContact.title})`}
                              </p>
                              <p style={{ color: 'var(--muted-jade)', marginBottom: '0.25rem' }}>
                                <strong>Email:</strong> {clientDetails.pointOfContact.email}
                              </p>
                              {clientDetails.pointOfContact.phone && (
                                <p style={{ color: 'var(--muted-jade)', marginBottom: '0.25rem' }}>
                                  <strong>Phone:</strong> {clientDetails.pointOfContact.phone}
                                </p>
                              )}
                              {clientDetails.accountManager && (
                                <p style={{ color: 'var(--muted-jade)', marginBottom: '0.25rem' }}>
                                  <strong>Account Manager:</strong> {clientDetails.accountManager.name} ({clientDetails.accountManager.email})
                                </p>
                              )}
                            </div>
                            <div>
                              {clientDetails.plan && (
                                <>
                                  <p style={{ color: 'var(--muted-jade)', marginBottom: '0.25rem' }}>
                                    <strong>Plan:</strong> {clientDetails.plan.name}
                                  </p>
                                  <p style={{ color: 'var(--muted-jade)', marginBottom: '0.25rem' }}>
                                    <strong>Price:</strong> ${clientDetails.plan.pricePerMonth}/month
                                  </p>
                                </>
                              )}
                              <p style={{ color: 'var(--muted-jade)', marginBottom: '0.25rem' }}>
                                <strong>Number of Licenses:</strong> {clientDetails.numberOfLicenses}
                              </p>
                              <p style={{ color: 'var(--muted-jade)', marginBottom: '0.25rem' }}>
                                <strong>Assigned Since:</strong> {new Date(clientDetails.assignedAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>

                          {/* Licenses Section */}
                          {clientDetails.licenses.length > 0 && (
                            <div style={{ marginTop: '1.5rem' }}>
                              <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem', color: 'var(--imperial-emerald)' }}>
                                Licenses ({clientDetails.licenses.length})
                              </h4>
                              <div style={{ display: 'grid', gap: '0.75rem' }}>
                                {clientDetails.licenses.map((license) => (
                                  <div
                                    key={license._id}
                                    className="card"
                                    style={{
                                      padding: '1rem',
                                      background: license.isAssignedToSdr ? 'rgba(196, 183, 91, 0.1)' : 'rgba(102, 139, 119, 0.05)',
                                      borderLeft: `4px solid ${license.isAssignedToSdr ? 'var(--golden-opal)' : 'var(--muted-jade)'}`,
                                    }}
                                  >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '0.5rem' }}>
                                      <div>
                                        <p style={{ fontWeight: '600', color: 'var(--imperial-emerald)', marginBottom: '0.25rem' }}>
                                          {license.productOrServiceName || license.label}
                                        </p>
                                        <p style={{ color: 'var(--muted-jade)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                                          <strong>Type:</strong> {license.serviceType}
                                        </p>
                                        <p style={{ color: 'var(--muted-jade)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                                          <strong>Label:</strong> {license.label}
                                        </p>
                                        <p style={{ color: 'var(--muted-jade)', fontSize: '0.875rem' }}>
                                          <strong>Status:</strong> <span style={{ textTransform: 'capitalize' }}>{license.status}</span>
                                        </p>
                                      </div>
                                      {license.isAssignedToSdr && (
                                        <span style={{
                                          padding: '0.25rem 0.75rem',
                                          borderRadius: '0.375rem',
                                          fontSize: '0.75rem',
                                          background: 'var(--golden-opal)',
                                          color: 'var(--onyx-black)',
                                          fontWeight: '600'
                                        }}>
                                          Assigned to You
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

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
                            />
                          ) : (
                            <UpdatesTimeline updates={updates} />
                          )}
                        </div>
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Update Modal */}
      {showUpdateForm && (
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
              setShowUpdateForm(false);
              setUpdateFormData({
                type: 'NOTE',
                title: '',
                description: '',
                date: new Date().toISOString().split('T')[0],
              });
            }
          }}
        >
          <div
            className="card"
            style={{
              maxWidth: '700px',
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
                Add New Update
              </h2>
              <button
                type="button"
                onClick={() => {
                  setShowUpdateForm(false);
                  setUpdateFormData({
                    type: 'NOTE',
                    title: '',
                    description: '',
                    date: new Date().toISOString().split('T')[0],
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
            <form onSubmit={handleAddUpdate}>
              <div style={{ display: 'grid', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                      Update Type *
                    </label>
                    <select
                      value={updateFormData.type}
                      onChange={(e) => setUpdateFormData({ ...updateFormData, type: e.target.value as Update['type'] })}
                      className="input"
                      required
                    >
                      <option value="CALL">Call</option>
                      <option value="EMAIL">Email</option>
                      <option value="MEETING">Meeting</option>
                      <option value="NOTE">Note</option>
                      <option value="REPORT">Report</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                      Date *
                    </label>
                    <input
                      type="date"
                      value={updateFormData.date}
                      onChange={(e) => setUpdateFormData({ ...updateFormData, date: e.target.value })}
                      className="input"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    Title *
                  </label>
                  <input
                    type="text"
                    value={updateFormData.title}
                    onChange={(e) => setUpdateFormData({ ...updateFormData, title: e.target.value })}
                    className="input"
                    required
                    placeholder="Brief title for this update"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    Description *
                  </label>
                  <textarea
                    value={updateFormData.description}
                    onChange={(e) => setUpdateFormData({ ...updateFormData, description: e.target.value })}
                    className="input"
                    required
                    rows={4}
                    placeholder="Detailed description of the update..."
                  />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
                <button type="submit" className="btn-primary" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}>
                  Save Update
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowUpdateForm(false);
                    setUpdateFormData({
                      type: 'NOTE',
                      title: '',
                      description: '',
                      date: new Date().toISOString().split('T')[0],
                    });
                  }}
                  className="btn-secondary"
                  style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
