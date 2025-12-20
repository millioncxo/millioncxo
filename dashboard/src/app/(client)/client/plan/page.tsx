'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Plan {
  _id?: string;
  name: string;
  description?: string;
  pricePerMonth?: number;
  licensesPerMonth: number;
  numberOfLicenses?: number;
  planType?: 'REGULAR' | 'POC';
  pricePerLicense?: number;
  currency?: 'USD' | 'INR';
  totalCostOfService?: number;
  features?: string[];
}

interface License {
  _id: string;
  productOrServiceName: string;
  serviceType: string;
  label: string;
  status: 'active' | 'paused';
  startDate: string;
  endDate?: string;
}

export default function ClientPlanPage() {
  const router = useRouter();
  const [plan, setPlan] = useState<Plan | null>(null);
  const [licenses, setLicenses] = useState<License[]>([]);
  const [licensesAvailable, setLicensesAvailable] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPlanData();
  }, []);

  const fetchPlanData = async () => {
    try {
      const [planResponse, dashboardResponse] = await Promise.all([
        fetch('/api/client/plan'),
        fetch('/api/client/dashboard'),
      ]);

      if (!planResponse.ok || !dashboardResponse.ok) {
        if (planResponse.status === 401 || dashboardResponse.status === 401) {
          router.push('/login');
          return;
        }
        throw new Error('Failed to fetch plan data');
      }

      const planData = await planResponse.json();
      const dashboardData = await dashboardResponse.json();

      if (planData.plan) {
        setPlan(planData.plan);
      }
      
      // Use licensesAvailable from plan API, or fallback to dashboard data
      const licensesFromPlan = planData.licensesAvailable || 0;
      const licensesFromDashboard = dashboardData.currentMonthStatus?.licensesRemaining || 0;
      const finalLicenses = licensesFromPlan > 0 ? licensesFromPlan : licensesFromDashboard;
      
      setLicensesAvailable(finalLicenses);
    } catch (err: any) {
      setError(err.message || 'Failed to load plan data');
    } finally {
      setLoading(false);
    }
  };

  // Fetch licenses
  useEffect(() => {
    const fetchLicenses = async () => {
      try {
        const response = await fetch('/api/client/licenses');
        if (response.ok) {
          const data = await response.json();
          setLicenses(data.licenses || []);
        }
      } catch (err) {
        console.error('Failed to fetch licenses:', err);
      }
    };
    fetchLicenses();
  }, []);

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

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', color: 'var(--imperial-emerald)' }}>
        Plan & Licenses
      </h1>

      {/* Current Plan Section */}
      {plan ? (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--imperial-emerald)', borderBottom: '2px solid var(--golden-opal)', paddingBottom: '0.5rem' }}>
            Current Plan
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--imperial-emerald)' }}>
                {plan.name}
              </h3>
              {plan.description && (
              <p style={{ color: 'var(--muted-jade)', marginBottom: '1rem', lineHeight: '1.6' }}>
                {plan.description}
              </p>
              )}
              {plan.planType && (
                <p style={{ color: 'var(--muted-jade)', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                  <strong>Plan Type:</strong> {plan.planType}
                </p>
              )}
            </div>
            <div>
              <div style={{ marginBottom: '1rem' }}>
                <p style={{ color: 'var(--muted-jade)', marginBottom: '0.25rem' }}>
                  <strong>Number of Licenses:</strong> {plan.numberOfLicenses || plan.licensesPerMonth || licensesAvailable}
                </p>
                {plan.pricePerLicense && (
                  <p style={{ color: 'var(--muted-jade)', marginBottom: '0.25rem' }}>
                    <strong>Price Per License:</strong> {plan.currency || 'USD'} {plan.pricePerLicense.toFixed(2)}
                  </p>
                )}
                {plan.totalCostOfService && plan.totalCostOfService > 0 && (
                  <p style={{ color: 'var(--golden-opal)', marginBottom: '0.25rem', fontSize: '1.125rem', fontWeight: '600' }}>
                    <strong>Total Cost of Service:</strong> {plan.currency || 'USD'} {plan.totalCostOfService.toFixed(2)}
                  </p>
                )}
                {plan.pricePerMonth && (
                <p style={{ color: 'var(--muted-jade)', marginBottom: '0.25rem' }}>
                    <strong>Monthly Price:</strong> ${plan.pricePerMonth.toLocaleString()}/month
                </p>
                )}
                <p style={{ color: 'var(--muted-jade)', marginBottom: '0.25rem' }}>
                  <strong>Active Licenses:</strong> {licenses.filter(l => l.status === 'active').length}
                </p>
                <p style={{ color: 'var(--muted-jade)' }}>
                  <strong>Available Licenses:</strong> {Math.max(0, licensesAvailable - licenses.filter(l => l.status === 'active').length)}
                </p>
              </div>
            </div>
          </div>

          {plan.features && plan.features.length > 0 && (
            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(196, 183, 91, 0.2)' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem', color: 'var(--imperial-emerald)' }}>
                Plan Features
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {plan.features.map((feature, index) => (
                  <li key={index} style={{ color: 'var(--muted-jade)', marginBottom: '0.5rem', paddingLeft: '1.5rem', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: 'var(--golden-opal)' }}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="card" style={{ marginBottom: '2rem', textAlign: 'center', padding: '2rem' }}>
          <p style={{ color: 'var(--muted-jade)' }}>No plan assigned yet. Please contact your account manager.</p>
        </div>
      )}

      {/* Licenses Section */}
      <div className="card">
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--imperial-emerald)', borderBottom: '2px solid var(--golden-opal)', paddingBottom: '0.5rem' }}>
          Active Licenses ({licenses.length})
        </h2>

        {licenses.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p style={{ color: 'var(--muted-jade)' }}>
              No active licenses yet. Your licenses will appear here once assigned.
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {licenses.map((license) => (
              <div
                key={license._id}
                className="card"
                style={{
                  padding: '1rem',
                  borderLeft: `4px solid ${license.status === 'active' ? 'var(--golden-opal)' : 'var(--muted-jade)'}`,
                  background: license.status === 'active' ? 'rgba(196, 183, 91, 0.05)' : 'rgba(102, 139, 119, 0.05)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--imperial-emerald)' }}>
                      {license.productOrServiceName || license.label}
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.875rem', color: 'var(--muted-jade)' }}>
                      <span><strong>Type:</strong> {license.serviceType}</span>
                      <span><strong>Label:</strong> {license.label}</span>
                      <span style={{ textTransform: 'capitalize' }}>
                        <strong>Status:</strong> {license.status}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--muted-jade)', marginTop: '0.5rem' }}>
                      <span><strong>Start Date:</strong> {new Date(license.startDate).toLocaleDateString()}</span>
                      {license.endDate && (
                        <span style={{ marginLeft: '1rem' }}>
                          <strong>End Date:</strong> {new Date(license.endDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <span
                    style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '0.375rem',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      background: license.status === 'active' ? 'var(--golden-opal)' : 'var(--muted-jade)',
                      color: license.status === 'active' ? 'var(--onyx-black)' : 'var(--ivory-silk)',
                      textTransform: 'capitalize',
                    }}
                  >
                    {license.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* License Utilization */}
      {plan && (
        <div className="card" style={{ marginTop: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--imperial-emerald)', borderBottom: '2px solid var(--golden-opal)', paddingBottom: '0.5rem' }}>
            License Utilization
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--golden-opal)', marginBottom: '0.5rem' }}>
                {licensesAvailable}
              </div>
              <div style={{ color: 'var(--muted-jade)' }}>Total Licenses Allocated</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--imperial-emerald)', marginBottom: '0.5rem' }}>
                {licenses.filter(l => l.status === 'active').length}
              </div>
              <div style={{ color: 'var(--muted-jade)' }}>Active Licenses</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--muted-jade)', marginBottom: '0.5rem' }}>
                {Math.max(0, licensesAvailable - licenses.filter(l => l.status === 'active').length)}
              </div>
              <div style={{ color: 'var(--muted-jade)' }}>Available</div>
            </div>
          </div>
          {licensesAvailable > 0 && (
            <div style={{ marginTop: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--muted-jade)' }}>
                <span>Utilization</span>
                <span>{Math.round((licenses.filter(l => l.status === 'active').length / licensesAvailable) * 100)}%</span>
              </div>
              <div style={{
                width: '100%',
                height: '12px',
                background: 'rgba(196, 183, 91, 0.2)',
                borderRadius: '6px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${Math.min((licenses.filter(l => l.status === 'active').length / licensesAvailable) * 100, 100)}%`,
                  height: '100%',
                  background: 'var(--golden-opal)',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

