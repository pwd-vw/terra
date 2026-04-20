export function About() {
  return (
    <div className="page-enter section">
      <div className="container" style={{ maxWidth: 720 }}>
        <div className="sec-tag">ABOUT</div>
        <h1 className="sec-title">WHAT IS TERRA?</h1>
        <p style={{ fontSize: 16, color: 'var(--text2)', lineHeight: 1.9, marginTop: 24 }}>
          TERRA (Telemetry · Environment · Research · Real-time · Analytics) คือ open sensor platform ที่พัฒนาโดย bs4u-tech.com สำหรับการทดลอง เรียนรู้ และต่อยอดระบบ IoT เพื่อการเกษตร วิจัย และอุตสาหกรรม
        </p>
        <p style={{ fontSize: 15, color: 'var(--text3)', lineHeight: 1.9, marginTop: 16 }}>
          เริ่มจากสวนลำไย 3 ไร่ในเชียงใหม่ ขยายสู่ platform ที่ทุกคนสามารถนำ sensor, code, และ dataset ไปใช้งานได้ฟรี
        </p>
      </div>
    </div>
  )
}
