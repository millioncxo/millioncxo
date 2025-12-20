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

interface ClientDetailPanelProps {
  clientDetails: ClientDetails | null;
  loading: boolean;
}

export default function ClientDetailPanel({ clientDetails, loading }: ClientDetailPanelProps) {
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <div className="spinner" />
      </div>
    );
  }

  if (!clientDetails) {
    return null;
  }

  return (
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
    </div>
  );
}

