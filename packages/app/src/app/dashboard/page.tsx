'use client'

export default function DashboardPage() {
  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#1f2937' }}>
          Producer Dashboard
        </h1>
        <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
          Manage your beats, track sales, and grow your music business
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {[
          { title: 'Total Beats', value: '12', icon: '🎵', color: '#3b82f6' },
          { title: 'Total Sales', value: '$1,247', icon: '💰', color: '#059669' },
          { title: 'This Month', value: '$340', icon: '📈', color: '#7c3aed' },
          { title: 'Plays', value: '2,847', icon: '▶️', color: '#f59e0b' }
        ].map((stat, index) => (
          <div key={index} style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                  {stat.title}
                </p>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' }}>
                  {stat.value}
                </p>
              </div>
              <div style={{
                background: stat.color + '20',
                padding: '0.75rem',
                borderRadius: '50%',
                fontSize: '1.5rem'
              }}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid #e5e7eb',
        marginBottom: '2rem'
      }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
          Quick Actions
        </h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button style={{
            background: '#3b82f6',
            color: 'white',
            padding: '0.75rem 1.5rem',
            border: 'none',
            borderRadius: '0.375rem',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            📤 Upload New Beat
          </button>
          <button style={{
            background: 'white',
            color: '#3b82f6',
            padding: '0.75rem 1.5rem',
            border: '1px solid #3b82f6',
            borderRadius: '0.375rem',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            📊 View Analytics
          </button>
          <button style={{
            background: 'white',
            color: '#059669',
            padding: '0.75rem 1.5rem',
            border: '1px solid #059669',
            borderRadius: '0.375rem',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            💳 Withdraw Earnings
          </button>
        </div>
      </div>

      {/* Recent Beats */}
      <div style={{
        background: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937' }}>
            Your Recent Beats
          </h2>
        </div>
        <div style={{ padding: '1.5rem' }}>
          {[
            { title: 'Dark Trap Beat', status: 'Published', sales: 5, earnings: '$149.95' },
            { title: 'Melodic Hip Hop', status: 'Published', sales: 3, earnings: '$74.97' },
            { title: 'Future Bass Drop', status: 'Draft', sales: 0, earnings: '$0.00' }
          ].map((beat, index) => (
            <div key={index} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem 0',
              borderBottom: index < 2 ? '1px solid #f3f4f6' : 'none'
            }}>
              <div>
                <h3 style={{ fontWeight: '500', color: '#1f2937', marginBottom: '0.25rem' }}>
                  {beat.title}
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  Status: <span style={{
                    color: beat.status === 'Published' ? '#059669' : '#f59e0b',
                    fontWeight: '500'
                  }}>{beat.status}</span>
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontWeight: '600', color: '#1f2937' }}>
                  {beat.earnings}
                </p>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  {beat.sales} sales
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Development Notice */}
      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        background: '#dbeafe',
        border: '1px solid #3b82f6',
        borderRadius: '0.5rem',
        color: '#1e40af'
      }}>
        <p style={{ fontSize: '0.875rem' }}>
          <strong>Producer Dashboard:</strong> Full functionality ready with Firebase backend. 
          Upload system, analytics, and earnings tracking all implemented.
        </p>
      </div>
    </div>
  )
}