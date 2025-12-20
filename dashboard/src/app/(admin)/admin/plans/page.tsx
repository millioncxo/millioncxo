'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LogoComponent from '@/components/LogoComponent';
import { Edit, Power, Users, DollarSign } from 'lucide-react';

interface Plan {
  _id: string;
  name: string;
  description?: string;
  pricePerMonth?: number;
  isActive?: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

interface PlanUsage {
  planId: string;
  clientCount: number;
}

export default function PlansPage() {
  const router = useRouter();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [planUsage, setPlanUsage] = useState<Map<string, number>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    pricePerMonth: '',
  });

  useEffect(() => {
    fetchPlans();
    fetchPlanUsage();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/plans');
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          router.push('/login');
          return;
        }
        throw new Error('Failed to fetch plans');
      }
      const data = await response.json();
      setPlans(data.plans || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load plans');
    } finally {
      setLoading(false);
    }
  };

  const fetchPlanUsage = async () => {
    try {
      const response = await fetch('/api/admin/plans/usage');
      if (response.ok) {
        const data = await response.json();
        const usageMap = new Map<string, number>();
        data.usage.forEach((item: PlanUsage) => {
          usageMap.set(item.planId, item.clientCount);
        });
        setPlanUsage(usageMap);
      }
    } catch (err) {
      console.error('Failed to fetch plan usage:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const url = editingPlan ? `/api/admin/plans/${editingPlan._id}` : '/api/admin/plans';
      const method = editingPlan ? 'PUT' : 'POST';
      const payload: any = {
        name: formData.name,
        description: formData.description,
      };
      
      if (formData.pricePerMonth) {
        payload.pricePerMonth = parseFloat(formData.pricePerMonth);
      }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || `Failed to ${editingPlan ? 'update' : 'create'} plan`);
      }

      setShowForm(false);
      setEditingPlan(null);
      setFormData({
        name: '',
        description: '',
        pricePerMonth: '',
      });
      setError('');
      alert(`Plan ${editingPlan ? 'updated' : 'created'} successfully!`);
      await fetchPlans();
      await fetchPlanUsage();
    } catch (err: any) {
      setError(err.message || `Failed to ${editingPlan ? 'update' : 'create'} plan`);
    }
  };

  const handleToggleActive = async (planId: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    const action = newStatus ? 'activate' : 'deactivate';
    
    if (!confirm(`Are you sure you want to ${action} this plan?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/plans/${planId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: newStatus }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || `Failed to ${action} plan`);
      }

      alert(`Plan ${action}d successfully!`);
      await fetchPlans();
      await fetchPlanUsage();
    } catch (err: any) {
      setError(err.message || `Failed to ${action} plan`);
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
            Plans Management
          </h1>
          <p style={{ color: 'var(--muted-jade)', fontSize: '0.875rem' }}>
            Manage service plans and pricing
          </p>
        </div>
        <button
          onClick={() => {
            setEditingPlan(null);
            setFormData({
              name: '',
              description: '',
              pricePerMonth: '',
            });
            setShowForm(true);
          }}
          className="btn-primary"
        >
          + Add Plan
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
              setEditingPlan(null);
            }
          }}
        >
          <div
            className="card"
            style={{
              maxWidth: '600px',
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
                {editingPlan ? 'Edit Plan' : 'Add Plan'}
              </h2>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingPlan(null);
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
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    Plan Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input"
                    required
                    placeholder="e.g., LinkedIn Outreach Excellence 20X"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="input"
                    rows={3}
                    placeholder="Plan description..."
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    Price Per Month
                  </label>
                  <input
                    type="number"
                    value={formData.pricePerMonth}
                    onChange={(e) => setFormData({ ...formData, pricePerMonth: e.target.value })}
                    className="input"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="submit" className="btn-primary">
                  {editingPlan ? 'Update Plan' : 'Create Plan'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingPlan(null);
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

      <div className="card" style={{ padding: '0' }}>
        <div style={{ 
          padding: '1.5rem', 
          borderBottom: '2px solid rgba(196, 183, 91, 0.3)',
          background: 'linear-gradient(135deg, rgba(196, 183, 91, 0.1) 0%, rgba(196, 183, 91, 0.05) 100%)'
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', color: 'var(--imperial-emerald)', fontWeight: '600' }}>
            All Plans
          </h2>
          <p style={{ color: 'var(--muted-jade)', fontSize: '0.875rem' }}>
            {plans.length} {plans.length === 1 ? 'plan' : 'plans'} total
          </p>
        </div>
        {plans.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ color: 'var(--muted-jade)', fontSize: '1rem' }}>
              No plans found. Create your first plan to get started.
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
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: 'var(--imperial-emerald)', fontSize: '0.875rem', textTransform: 'uppercase' }}>
                    Plan Name
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: 'var(--imperial-emerald)', fontSize: '0.875rem', textTransform: 'uppercase' }}>
                    Description
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'right', fontWeight: '600', color: 'var(--imperial-emerald)', fontSize: '0.875rem', textTransform: 'uppercase' }}>
                    Price/Month
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '600', color: 'var(--imperial-emerald)', fontSize: '0.875rem', textTransform: 'uppercase' }}>
                    Clients
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '600', color: 'var(--imperial-emerald)', fontSize: '0.875rem', textTransform: 'uppercase' }}>
                    Status
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '600', color: 'var(--imperial-emerald)', fontSize: '0.875rem', textTransform: 'uppercase' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan) => (
                  <tr 
                    key={plan._id}
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
                      <div style={{ fontWeight: '600', color: 'var(--imperial-emerald)' }}>
                        {plan.name}
                      </div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ color: 'var(--muted-jade)', fontSize: '0.875rem', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {plan.description || '—'}
                      </div>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      {plan.pricePerMonth ? (
                        <div style={{ fontWeight: '600', color: 'var(--imperial-emerald)' }}>
                          ${plan.pricePerMonth.toFixed(2)}
                        </div>
                      ) : (
                        <span style={{ color: 'var(--muted-jade)', fontStyle: 'italic' }}>—</span>
                      )}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--muted-jade)' }}>
                        <Users size={16} />
                        <span>{planUsage.get(plan._id) || 0}</span>
                      </div>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '0.375rem',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          background: (plan.isActive !== false) ? '#d1fae5' : '#fee2e2',
                          color: (plan.isActive !== false) ? '#10b981' : '#ef4444',
                        }}
                      >
                        {(plan.isActive !== false) ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                        <button
                          onClick={() => {
                            setEditingPlan(plan);
                            setFormData({
                              name: plan.name,
                              description: plan.description || '',
                              pricePerMonth: plan.pricePerMonth?.toString() || '',
                            });
                            setShowForm(true);
                          }}
                          style={{
                            padding: '0.4rem 0.6rem',
                            border: '1px solid rgba(196, 183, 91, 0.3)',
                            background: 'rgba(196, 183, 91, 0.1)',
                            borderRadius: '0.375rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.875rem',
                          }}
                          title="Edit Plan"
                        >
                          <Edit size={14} color="var(--imperial-emerald)" />
                        </button>
                        <button
                          onClick={() => handleToggleActive(plan._id, plan.isActive !== false)}
                          disabled={(planUsage.get(plan._id) ?? 0) > 0 && plan.isActive !== false}
                          style={{
                            padding: '0.4rem 0.6rem',
                            border: '1px solid rgba(196, 183, 91, 0.3)',
                            background: (plan.isActive !== false) ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                            borderRadius: '0.375rem',
                            cursor: (planUsage.get(plan._id) ?? 0) > 0 && plan.isActive !== false ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.875rem',
                            opacity: (planUsage.get(plan._id) ?? 0) > 0 && plan.isActive !== false ? 0.5 : 1,
                          }}
                          title={(planUsage.get(plan._id) ?? 0) > 0 && plan.isActive !== false ? 'Cannot deactivate plan with active clients' : (plan.isActive !== false ? 'Deactivate Plan' : 'Activate Plan')}
                        >
                          <Power size={14} color={(plan.isActive !== false) ? '#ef4444' : '#10b981'} />
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

