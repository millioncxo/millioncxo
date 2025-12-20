interface StatsCardsProps {
  clientsCount: number;
  totalLicenses: number;
  activeLicenses: number;
}

export default function StatsCards({ clientsCount, totalLicenses, activeLicenses }: StatsCardsProps) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
      <div className="card" style={{ 
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(196, 183, 91, 0.1) 0%, rgba(196, 183, 91, 0.05) 100%)',
        border: '2px solid rgba(196, 183, 91, 0.3)'
      }}>
        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--golden-opal)', marginBottom: '0.5rem' }}>
          {clientsCount}
        </div>
        <div style={{ color: 'var(--imperial-emerald)', fontWeight: '600', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Assigned Clients
        </div>
      </div>
      <div className="card" style={{ 
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(11, 46, 43, 0.1) 0%, rgba(11, 46, 43, 0.05) 100%)',
        border: '2px solid rgba(11, 46, 43, 0.3)'
      }}>
        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--imperial-emerald)', marginBottom: '0.5rem' }}>
          {totalLicenses}
        </div>
        <div style={{ color: 'var(--imperial-emerald)', fontWeight: '600', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Total Licenses
        </div>
      </div>
      <div className="card" style={{ 
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(102, 139, 119, 0.1) 0%, rgba(102, 139, 119, 0.05) 100%)',
        border: '2px solid rgba(102, 139, 119, 0.3)'
      }}>
        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--muted-jade)', marginBottom: '0.5rem' }}>
          {activeLicenses}
        </div>
        <div style={{ color: 'var(--imperial-emerald)', fontWeight: '600', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Active Licenses
        </div>
      </div>
    </div>
  );
}

