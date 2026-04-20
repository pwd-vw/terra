import { SENSORS } from '@/lib/data'
export function Lab() {
  return (
    <div className="page-enter section">
      <div className="container">
        <div className="sec-tag">SENSOR LAB</div>
        <h1 className="sec-title">ALL SENSORS</h1>
        <p className="sec-desc" style={{ marginBottom: 40 }}>{SENSORS.length} sensors · 18 tutorial episodes · Code + wiring diagram ทุกตัว</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
          {SENSORS.map(s => (
            <div key={s.model} style={{ border: '1px solid var(--rule)', padding: 16, background: 'var(--earth)' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--terra)', marginBottom: 4 }}>{s.model}</div>
              <div style={{ fontSize: 13, color: 'var(--text)', fontWeight: 500, marginBottom: 4 }}>{s.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text3)' }}>{s.terraRole}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
