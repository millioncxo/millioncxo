'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LogoComponent from '@/components/LogoComponent';
import { Edit, UserX, MoreVertical } from 'lucide-react';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface Client {
  _id: string;
  businessName: string;
}

interface License {
  _id: string;
  label: string;
  serviceType: string;
  status: string;
  clientId: string;
}

interface Assignment {
  _id: string;
  sdrId: { _id: string; name: string; email: string };
  clientId: { _id: string; businessName: string };
  licenses: Array<{ _id: string; label: string; serviceType: string }>;
  createdAt: string;
}

export default function AssignmentsPage() {
  const router = useRouter();
  const [sdrUsers, setSdrUsers] = useState<User[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [licenses, setLicenses] = useState<License[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [filteredAssignments, setFilteredAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);
  const [sdrFilter, setSdrFilter] = useState<string>('');
  const [clientFilter, setClientFilter] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [formData, setFormData] = useState({
    sdrId: '',
    clientId: '',
    licenseIds: [] as string[],
  });

  useEffect(() => {
    fetchData();
  }, []);

  // Apply filters when sdrFilter, clientFilter, searchTerm, or assignments change
  useEffect(() => {
    let filtered = [...assignments];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(assignment => 
        assignment.sdrId.name.toLowerCase().includes(term) ||
        assignment.sdrId.email.toLowerCase().includes(term) ||
        assignment.clientId.businessName.toLowerCase().includes(term)
      );
    }

    // Apply SDR filter
    if (sdrFilter) {
      filtered = filtered.filter(assignment => assignment.sdrId._id === sdrFilter);
    }

    // Apply client filter
    if (clientFilter) {
      filtered = filtered.filter(assignment => assignment.clientId._id === clientFilter);
    }

    setFilteredAssignments(filtered);
  }, [sdrFilter, clientFilter, searchTerm, assignments]);

  const fetchData = async () => {
    try {
      // Fetch SDR users
      const sdrResponse = await fetch('/api/admin/users?role=SDR');
      if (sdrResponse.ok) {
        const sdrData = await sdrResponse.json();
        setSdrUsers(sdrData.users || []);
      }

      // Fetch clients
      const clientsResponse = await fetch('/api/admin/clients');
      if (!clientsResponse.ok) {
        if (clientsResponse.status === 401 || clientsResponse.status === 403) {
          router.push('/login');
          return;
        }
        throw new Error('Failed to fetch clients');
      }

      const clientsData = await clientsResponse.json();
      setClients(clientsData.clients || []);

      // Build assignments list from clients data
      const assignmentsList: Assignment[] = [];
      clientsData.clients.forEach((client: any) => {
        if (client.sdrAssignments && client.sdrAssignments.length > 0) {
          client.sdrAssignments.forEach((assignment: any) => {
            assignmentsList.push({
              _id: assignment._id || assignment.sdrId?._id + client._id,
              sdrId: assignment.sdrId,
              clientId: { _id: client._id, businessName: client.businessName },
              licenses: assignment.licenses || [],
              createdAt: assignment.createdAt || new Date().toISOString(),
            });
          });
        }
      });
      setAssignments(assignmentsList);
      setFilteredAssignments(assignmentsList);

      // Fetch licenses for the selected client (will be done when client is selected)
    } catch (err: any) {
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const fetchLicensesForClient = async (clientId: string) => {
    try {
      const response = await fetch(`/api/admin/licenses?clientId=${clientId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch licenses');
      }
      const data = await response.json();
      setLicenses(data.licenses || []);
    } catch (err: any) {
      console.error('Failed to fetch licenses:', err);
      setLicenses([]);
    }
  };

  const handleClientChange = (clientId: string) => {
    setFormData({ ...formData, clientId, licenseIds: [] });
    if (clientId) {
      fetchLicensesForClient(clientId);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.sdrId || !formData.clientId) {
      setError('SDR and Client are required');
      return;
    }

    try {
      const response = await fetch('/api/admin/assign-sdr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sdrId: formData.sdrId,
          clientId: formData.clientId,
          licenseIds: formData.licenseIds,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to assign SDR');
      }

      await fetchData();
      setShowForm(false);
      setFormData({
        sdrId: '',
        clientId: '',
        licenseIds: [],
      });
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to assign SDR');
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
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <LogoComponent width={48} height={26} hoverGradient={true} />
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.25rem', color: 'var(--imperial-emerald)' }}>
            SDR Assignments
          </h1>
          <p style={{ color: 'var(--muted-jade)', fontSize: '0.875rem' }}>
            Manage SDR assignments to clients
          </p>
        </div>
        <button
          onClick={() => {
            setEditingAssignment(null);
            setFormData({
              sdrId: '',
              clientId: '',
              licenseIds: [],
            });
            setShowForm(true);
          }}
          className="btn-primary"
        >
          + Assign SDR to Client
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
              setEditingAssignment(null);
              setFormData({
                sdrId: '',
                clientId: '',
                licenseIds: [],
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
                {editingAssignment ? 'Edit Assignment' : 'Assign SDR to Client'}
              </h2>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingAssignment(null);
                  setFormData({
                    sdrId: '',
                    clientId: '',
                    licenseIds: [],
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
                  Select SDR *
                </label>
                <select
                  value={formData.sdrId}
                  onChange={(e) => setFormData({ ...formData, sdrId: e.target.value })}
                  className="input"
                  required
                >
                  <option value="">Choose SDR...</option>
                  {sdrUsers.map((sdr) => (
                    <option key={sdr._id} value={sdr._id}>
                      {sdr.name} ({sdr.email})
                    </option>
                  ))}
                </select>
                {sdrUsers.length === 0 && (
                  <p style={{ fontSize: '0.875rem', color: 'var(--muted-jade)', marginTop: '0.25rem' }}>
                    No SDR users found. Create SDR users first in Users page.
                  </p>
                )}
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Select Client *
                </label>
                <select
                  value={formData.clientId}
                  onChange={(e) => handleClientChange(e.target.value)}
                  className="input"
                  required
                >
                  <option value="">Choose Client...</option>
                  {clients.map((client) => (
                    <option key={client._id} value={client._id}>
                      {client.businessName}
                    </option>
                  ))}
                </select>
                {clients.length === 0 && (
                  <p style={{ fontSize: '0.875rem', color: 'var(--muted-jade)', marginTop: '0.25rem' }}>
                    No clients found. Create clients first in Clients page.
                  </p>
                )}
              </div>
            </div>

            {licenses.length > 0 && (
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Select Licenses (Optional)
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {licenses.map((license) => (
                    <label key={license._id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={formData.licenseIds.includes(license._id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({ ...formData, licenseIds: [...formData.licenseIds, license._id] });
                          } else {
                            setFormData({ ...formData, licenseIds: formData.licenseIds.filter(id => id !== license._id) });
                          }
                        }}
                      />
                      <span>{license.label} ({license.serviceType})</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {formData.clientId && licenses.length === 0 && (
              <div style={{ padding: '1rem', background: 'rgba(196, 183, 91, 0.1)', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.875rem', color: 'var(--muted-jade)' }}>
                  No licenses found for this client. Licenses can be assigned later or created separately.
                </p>
              </div>
            )}

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <button type="submit" className="btn-primary">
                  {editingAssignment ? 'Update Assignment' : 'Assign SDR'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingAssignment(null);
                    setFormData({
                      sdrId: '',
                      clientId: '',
                      licenseIds: [],
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

      {/* Filter Section */}
      <div className="card" style={{ marginBottom: '1.5rem', padding: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem', color: 'var(--imperial-emerald)' }}>
              Search
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by SDR or client name..."
              className="input"
              style={{ width: '100%' }}
            />
          </div>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem', color: 'var(--imperial-emerald)' }}>
              Filter by SDR
            </label>
            <select
              value={sdrFilter}
              onChange={(e) => setSdrFilter(e.target.value)}
              className="input"
              style={{ width: '100%' }}
            >
              <option value="">All SDRs</option>
              {sdrUsers.map((sdr) => (
                <option key={sdr._id} value={sdr._id}>
                  {sdr.name}
                </option>
              ))}
            </select>
          </div>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem', color: 'var(--imperial-emerald)' }}>
              Filter by Client
            </label>
            <select
              value={clientFilter}
              onChange={(e) => setClientFilter(e.target.value)}
              className="input"
              style={{ width: '100%' }}
            >
              <option value="">All Clients</option>
              {clients.map((client) => (
                <option key={client._id} value={client._id}>
                  {client.businessName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: '0' }}>
        <div style={{ 
          padding: '1.5rem', 
          borderBottom: '2px solid rgba(196, 183, 91, 0.3)',
          background: 'linear-gradient(135deg, rgba(196, 183, 91, 0.1) 0%, rgba(196, 183, 91, 0.05) 100%)'
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', color: 'var(--imperial-emerald)', fontWeight: '600' }}>
            Current Assignments
          </h2>
          <p style={{ color: 'var(--muted-jade)', fontSize: '0.875rem' }}>
            {filteredAssignments.length} {filteredAssignments.length === 1 ? 'assignment' : 'assignments'} {sdrFilter || clientFilter || searchTerm ? '(filtered)' : 'total'}
          </p>
        </div>

        {filteredAssignments.length === 0 && assignments.length > 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ color: 'var(--muted-jade)', fontSize: '1rem' }}>
              No assignments match the selected filters.
            </p>
          </div>
        ) : filteredAssignments.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ color: 'var(--muted-jade)', fontSize: '1rem' }}>
              No SDR assignments yet. Create an assignment to get started.
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
                    Client
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
                    Assigned Date
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
                {filteredAssignments.map((assignment) => (
                  <tr 
                    key={assignment._id}
                    style={{ 
                      borderBottom: '1px solid rgba(196, 183, 91, 0.15)',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      setEditingAssignment(assignment);
                      setFormData({
                        sdrId: assignment.sdrId._id,
                        clientId: assignment.clientId._id,
                        licenseIds: assignment.licenses.map(l => l._id),
                      });
                      setShowForm(true);
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(196, 183, 91, 0.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '';
                    }}
                  >
                    <td style={{ padding: '1rem' }}>
                      <div style={{ fontWeight: '600', color: 'var(--imperial-emerald)', marginBottom: '0.25rem' }}>
                        {assignment.sdrId.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--muted-jade)' }}>
                        {assignment.sdrId.email}
                      </div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ color: 'var(--muted-jade)', fontSize: '0.875rem', fontWeight: '500' }}>
                        {assignment.clientId.businessName}
                      </div>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      {assignment.licenses.length > 0 ? (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', justifyContent: 'center' }}>
                          {assignment.licenses.map((license, idx) => (
                            <span 
                              key={idx} 
                              style={{ 
                                display: 'inline-block',
                                padding: '0.125rem 0.5rem',
                                borderRadius: '0.25rem',
                                background: 'rgba(196, 183, 91, 0.2)',
                                color: 'var(--imperial-emerald)',
                                fontSize: '0.75rem',
                                fontWeight: '500'
                              }}
                            >
                              {license.label}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span style={{ color: 'var(--muted-jade)', fontSize: '0.875rem', fontStyle: 'italic' }}>
                          No licenses
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ color: 'var(--muted-jade)', fontSize: '0.875rem' }}>
                        {new Date(assignment.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', alignItems: 'center' }}>
                        <button
                          onClick={() => {
                            setEditingAssignment(assignment);
                            setFormData({
                              sdrId: assignment.sdrId._id,
                              clientId: assignment.clientId._id,
                              licenseIds: assignment.licenses.map(l => l._id),
                            });
                            setShowForm(true);
                          }}
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
                          title="Edit Assignment"
                        >
                          <Edit size={16} color="var(--imperial-emerald)" />
                        </button>
                        <button
                          onClick={async (e) => {
                            e.stopPropagation();
                            if (!confirm(`Are you sure you want to unassign ${assignment.sdrId.name} from ${assignment.clientId.businessName}? This action will be logged.`)) {
                              return;
                            }
                            try {
                              const response = await fetch('/api/admin/assign-sdr', {
                                method: 'DELETE',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                  assignmentId: assignment._id,
                                  sdrId: assignment.sdrId._id,
                                  clientId: assignment.clientId._id,
                                }),
                              });
                              if (!response.ok) {
                                const data = await response.json();
                                throw new Error(data.error || 'Failed to unassign SDR');
                              }
                              await fetchData();
                              alert('SDR unassigned successfully. Action has been logged.');
                            } catch (err: any) {
                              setError(err.message || 'Failed to unassign SDR');
                            }
                          }}
                          style={{
                            padding: '0.4rem 0.6rem',
                            border: '1px solid rgba(196, 183, 91, 0.3)',
                            background: 'rgba(196, 183, 91, 0.1)',
                            borderRadius: '0.375rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            fontSize: '0.875rem',
                            color: 'var(--imperial-emerald)',
                            fontWeight: '500',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(196, 183, 91, 0.2)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(196, 183, 91, 0.1)';
                          }}
                          title="Unassign SDR"
                        >
                          <UserX size={14} />
                          Unassign
                        </button>
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

