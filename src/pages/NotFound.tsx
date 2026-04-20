import { Link } from 'react-router-dom'
export function NotFound() {
  return (
    <div className="page-enter" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div>
        <div style={{ fontFamily: 'var(--display)', fontSize: 120, color: 'var(--bark)', lineHeight: 1 }}>404</div>
        <p style={{ color: 'var(--text3)', marginBottom: 24, fontFamily: 'var(--mono)', fontSize: 11 }}>PAGE NOT FOUND — ไม่พบหน้าที่ต้องการ</p>
        <Link to="/" className="btn-primary">← BACK TO TERRA</Link>
      </div>
    </div>
  )
}
