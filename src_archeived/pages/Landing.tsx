import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { SENSORS, BLOG_POSTS, PHASES } from '@/lib/data'
import type { SensorCategory } from '@/types'

// ─── Hero Section ─────────────────────────────────────────────
function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Particle system
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf: number

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.5 - 0.1,
      life: Math.random(),
      size: Math.random() * 1.5 + 0.3,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.life -= 0.002
        if (p.life <= 0 || p.y < 0) {
          p.x = Math.random() * canvas.width
          p.y = canvas.height
          p.life = 0.6 + Math.random() * 0.4
          p.vy = -Math.random() * 0.5 - 0.1
        }
        ctx.globalAlpha = p.life * 0.35
        ctx.fillStyle = '#4eff7c'
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const letters = [
    { l: 'T', w: 'Telemetry' },
    { l: 'E', w: 'Environment' },
    { l: 'R', w: 'Research' },
    { l: 'R', w: 'Real-time' },
    { l: 'A', w: 'Analytics' },
  ]

  return (
    <section style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      justifyContent: 'center', position: 'relative', overflow: 'hidden',
      padding: '120px 40px 100px',
    }}>
      {/* Topographic SVG */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}
        viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
        {[350,380,420,460,500,540,310,270].map((y, i) => (
          <path key={i} fill="none"
            stroke={`rgba(74,140,50,${0.04 + i * 0.01})`}
            strokeWidth="0.8"
            d={`M-50,${y} Q${200 + i * 20},${y - 60} ${400 + i * 10},${y + 10} T${900 + i * 30},${y - 20} T1300,${y}`}
          />
        ))}
        {/* Active nodes on contour */}
        {[220, 640, 980].map((cx, i) => (
          <circle key={i} cx={cx} cy={334 + i * 6} r={2.5 + i * 0.5}
            fill="rgba(78,255,124,0.6)"
            style={{ animation: `pulse-dot ${2.5 + i}s ${i}s ease-in-out infinite` }}
          />
        ))}
        {/* Data flow dash line */}
        <path fill="none" stroke="rgba(78,255,124,0.15)" strokeWidth="1"
          strokeDasharray="4,8"
          d="M50,355 L200,338 L380,350 L560,330 L740,340 L920,328 L1100,338"
        />
      </svg>

      {/* Particle canvas */}
      <canvas ref={canvasRef} style={{
        position: 'absolute', inset: 0, zIndex: 1,
        width: '100%', height: '100%', pointerEvents: 'none',
      }} />

      {/* Scanline */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(78,255,124,0.15), transparent)',
        animation: 'scanline 8s linear infinite', zIndex: 2,
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 3, maxWidth: 1080, margin: '0 auto', width: '100%' }}>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.35em',
          color: 'var(--glow)', marginBottom: 16,
          display: 'flex', alignItems: 'center', gap: 10,
          animation: 'fadeUp 0.6s ease both',
        }}>
          <span style={{ width: 32, height: 1, background: 'var(--glow)', display: 'inline-block' }} />
          terra.bs4u-tech.com &nbsp;·&nbsp; OPEN SENSOR PLATFORM
        </div>

        <h1 style={{
          fontFamily: 'var(--display)',
          fontSize: 'clamp(80px, 14vw, 180px)',
          lineHeight: 0.85, letterSpacing: '0.06em',
          color: 'var(--text)', marginBottom: 8,
          animation: 'fadeUp 0.6s 0.1s ease both',
        }}>
          <span style={{ color: 'var(--glow)', textShadow: '0 0 60px rgba(78,255,124,0.2)' }}>TER</span>RA
        </h1>

        {/* Letter strip */}
        <div style={{
          display: 'flex', marginBottom: 32,
          animation: 'fadeUp 0.6s 0.2s ease both',
          overflowX: 'auto',
        }}>
          {letters.map(({ l, w }, i) => (
            <div key={i} style={{
              flex: 1, minWidth: 100,
              border: '1px solid var(--rule)',
              borderRight: i < 4 ? 'none' : '1px solid var(--rule)',
              padding: '10px 14px',
              background: 'rgba(17,26,14,0.6)',
            }}>
              <div style={{ fontFamily: 'var(--display)', fontSize: 28, color: 'var(--glow)', lineHeight: 1, marginBottom: 2 }}>{l}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{w}</div>
            </div>
          ))}
        </div>

        <p style={{
          maxWidth: 520, fontSize: 16, color: 'var(--text2)', marginBottom: 40, lineHeight: 1.8,
          animation: 'fadeUp 0.6s 0.3s ease both',
        }}>
          แพลตฟอร์ม Open Sensor สำหรับเก็บข้อมูลสภาพดิน อากาศ และสิ่งแวดล้อม — ตั้งแต่ tutorial ไปจนถึง ML pipeline เพื่อการเกษตร วิจัย และอุตสาหกรรม
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', animation: 'fadeUp 0.6s 0.4s ease both' }}>
          <Link to="/lab" className="btn-primary">EXPLORE LAB →</Link>
          <Link to="/#pipeline" className="btn-ghost">VIEW PIPELINE</Link>
          <a href="https://github.com/bs4u-tech/terra" target="_blank" rel="noreferrer" className="btn-ghost">
            GITHUB
          </a>
        </div>
      </div>

      {/* Stats row */}
      <div style={{
        position: 'absolute', bottom: 40, left: 40, right: 40,
        display: 'flex', gap: 0, zIndex: 3,
        borderTop: '1px solid var(--rule)', paddingTop: 20,
        animation: 'fadeUp 0.6s 0.5s ease both',
      }}>
        {[
          { n: '18', l: 'Sensor Models' },
          { n: '4',  l: 'Board Types' },
          { n: '18', l: 'Episodes' },
          { n: '4',  l: 'Dev Phases' },
          { n: 'LIVE', l: 'Dashboard' },
        ].map(({ n, l }) => (
          <div key={l} style={{ flex: 1, paddingRight: 20, borderRight: '1px solid var(--rule)', marginRight: 0, ':last-child': { borderRight: 'none' } }}>
            <div style={{ fontFamily: 'var(--display)', fontSize: n === 'LIVE' ? 20 : 32, color: 'var(--glow)', lineHeight: 1, marginBottom: 2 }}>{n}</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.18em', color: 'var(--text3)', textTransform: 'uppercase' }}>{l}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Features Section ─────────────────────────────────────────
function Features() {
  const items = [
    { l: 'T', title: 'Telemetry', desc: 'ESP32 nodes ส่ง sensor data ผ่าน MQTT ทุก 5 นาที ด้วย QoS guaranteed delivery' },
    { l: 'E', title: 'Environment', desc: 'วัดดิน อากาศ ความชื้น แสง ความดัน ครอบคลุมสภาพแวดล้อมทั้งหมด' },
    { l: 'R', title: 'Research', desc: 'Open dataset และ Jupyter Notebook สำหรับงานวิชาการ พร้อมใช้งานทันที' },
    { l: 'R', title: 'Real-time', desc: 'Dashboard live update, WebSocket, TimescaleDB hypertable สำหรับ time-series' },
    { l: 'A', title: 'Analytics', desc: 'Python ML pipeline, TFLite inference บน RPi5, predictive irrigation model' },
  ]

  return (
    <section id="about" style={{ background: 'var(--deep)', borderTop: '1px solid var(--rule2)', padding: '100px 40px' }}>
      <div className="container">
        <div style={{ marginBottom: 56 }}>
          <div className="sec-tag">ABOUT TERRA</div>
          <h2 className="sec-title">FIVE DIMENSIONS<br/>ONE PLATFORM</h2>
          <p className="sec-desc">ทุกตัวอักษรใน TERRA คือเสาหลักของ ecosystem ตั้งแต่ sensor ในดินถึง AI prediction บน cloud</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 0 }}>
          {items.map(({ l, title, desc }, i) => (
            <div key={i}
              style={{
                border: '1px solid var(--rule)',
                borderRight: i < 4 ? 'none' : '1px solid var(--rule)',
                padding: '28px 22px',
                position: 'relative', overflow: 'hidden',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                const card = e.currentTarget
                card.style.background = 'rgba(17,26,14,0.8)'
                const letter = card.querySelector('.fc-l') as HTMLElement
                if (letter) letter.style.color = 'var(--glow)'
              }}
              onMouseLeave={(e) => {
                const card = e.currentTarget
                card.style.background = 'transparent'
                const letter = card.querySelector('.fc-l') as HTMLElement
                if (letter) letter.style.color = 'var(--glow-dim)'
              }}
            >
              <div className="fc-l" style={{ fontFamily: 'var(--display)', fontSize: 48, color: 'var(--glow-dim)', lineHeight: 1, marginBottom: 8, transition: 'color 0.25s' }}>{l}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.15em', color: 'var(--text)', textTransform: 'uppercase', marginBottom: 8 }}>{title}</div>
              <div style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.7 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Sensor Catalog Section ────────────────────────────────────
function SensorCatalog() {
  const [active, setActive] = useState<SensorCategory | 'all'>('all')
  const cats: { key: SensorCategory | 'all'; label: string }[] = [
    { key: 'all',    label: `ALL (${SENSORS.length})` },
    { key: 'soil',   label: '🌱 SOIL (4)' },
    { key: 'env',    label: '🌡️ ENVIRONMENT (3)' },
    { key: 'motion', label: '⚡ MOTION (4)' },
    { key: 'light',  label: '💡 OPTICAL (3)' },
    { key: 'board',  label: '🔌 BOARDS (2)' },
    { key: 'vision', label: '📷 VISION AI (2)' },
  ]

  const filtered = active === 'all' ? SENSORS : SENSORS.filter((s) => s.category === active)

  const tagColor: Record<SensorCategory, string> = {
    soil: '#d4a020', env: '#4dc9ff', motion: '#f57c3a',
    light: '#ffd700', board: '#4eff7c', vision: '#c77dff',
  }

  return (
    <section id="sensors" style={{ padding: '100px 40px', background: 'var(--void)' }}>
      <div className="container">
        <div style={{ marginBottom: 56 }}>
          <div className="sec-tag">SENSOR LAB</div>
          <h2 className="sec-title">HARDWARE CATALOG</h2>
          <p className="sec-desc">ทุกตัวมี tutorial, wiring diagram, code สำหรับ RPi5 และ ESP32 พร้อมเชื่อม TERRA pipeline</p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 32, borderBottom: '1px solid var(--rule)', overflowX: 'auto' }}>
          {cats.map(({ key, label }) => (
            <button key={key} onClick={() => setActive(key)} style={{
              fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em',
              color: active === key ? 'var(--glow)' : 'var(--text3)',
              padding: '10px 18px', cursor: 'pointer',
              borderBottom: `2px solid ${active === key ? 'var(--glow)' : 'transparent'}`,
              background: 'none', border: 'none',
              borderBottom: `2px solid ${active === key ? 'var(--glow)' : 'transparent'}`,
              marginBottom: -1, whiteSpace: 'nowrap',
              transition: 'all 0.2s', textTransform: 'uppercase',
            }}>
              {label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
          {filtered.map((sensor) => (
            <Link key={sensor.model} to={`/lab/${sensor.model.toLowerCase()}`}
              style={{
                border: '1px solid var(--rule2)', padding: 16,
                background: 'var(--earth)', position: 'relative',
                textDecoration: 'none', display: 'block',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--glow-dim)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(74,140,50,0.08)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {/* Status dot */}
              <div style={{
                position: 'absolute', top: 12, right: 12,
                width: 6, height: 6, borderRadius: '50%',
                background: tagColor[sensor.category],
                animation: 'pulse-dot 2.5s ease-in-out infinite',
              }} />
              <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--terra)', letterSpacing: '0.12em', marginBottom: 4 }}>
                {sensor.model}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text)', fontWeight: 500, marginBottom: 8, lineHeight: 1.4 }}>
                {sensor.name}
              </div>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 8, padding: '2px 6px', border: `1px solid rgba(${sensor.category === 'soil' ? '212,160,32' : '74,140,50'},0.3)`, color: tagColor[sensor.category], letterSpacing: '0.08em' }}>
                  {sensor.category.toUpperCase()}
                  {sensor.isFeatured ? ' ★' : ''}
                </span>
                {sensor.episode && (
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 8, padding: '2px 6px', border: '1px solid var(--rule)', color: 'var(--text3)', letterSpacing: '0.08em' }}>
                    {sensor.episode}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Pipeline Section ─────────────────────────────────────────
function Pipeline() {
  const nodes = [
    { label: 'SENSOR', sub: 'ESP32 NODE', detail: 'Soil · Air · Motion' },
    { label: 'BROKER',   sub: 'Mosquitto',   detail: 'QoS 1/2 MQTT' },
    { label: 'NODE-RED', sub: 'RPi5 8GB',    detail: 'Rules · Logic' },
    { label: 'DATABASE', sub: 'TimescaleDB', detail: 'Time-series' },
    { label: 'CF CLOUD', sub: 'Workers+D1',  detail: 'API · Auth' },
    { label: 'DASHBOARD',sub: 'CF Pages',    detail: 'terra.bs4u-tech.com', highlight: true },
  ]
  const protocol = ['MQTT','SUB','HTTPS','HTTPS','TUNNEL','']

  return (
    <section id="pipeline" style={{ background: 'var(--deep)', borderTop: '1px solid var(--rule2)', borderBottom: '1px solid var(--rule2)', padding: '100px 40px' }}>
      <div className="container">
        <div style={{ marginBottom: 48 }}>
          <div className="sec-tag">DATA PIPELINE</div>
          <h2 className="sec-title">FROM DIRT<br/>TO DASHBOARD</h2>
          <p className="sec-desc">ข้อมูลเดินทางจาก sensor ในดิน ผ่าน ESP32, MQTT, Raspberry Pi 5, Cloudflare และแสดงผลบน terra.bs4u-tech.com</p>
        </div>

        {/* Pipeline visualization */}
        <div style={{ background: 'var(--void)', border: '1px solid var(--rule)', padding: 32, overflowX: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', minWidth: 800 }}>
            {nodes.map((node, i) => (
              <>
                <div key={`node-${i}`} style={{
                  flex: 1, minWidth: 100,
                  border: `${node.highlight ? '1.5px solid var(--glow)' : '1px solid rgba(74,140,50,0.35)'}`,
                  padding: '14px 12px',
                  background: node.highlight ? 'rgba(17,26,14,0.9)' : 'var(--earth)',
                  textAlign: 'center',
                }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--glow)', fontWeight: 500, marginBottom: 4, letterSpacing: '0.05em' }}>{node.label}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'rgba(78,255,124,0.4)', marginBottom: 2 }}>{node.sub}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 7, color: 'rgba(78,255,124,0.25)' }}>{node.detail}</div>
                </div>
                {i < nodes.length - 1 && (
                  <div key={`arrow-${i}`} style={{ padding: '0 6px', textAlign: 'center', flexShrink: 0 }}>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 7, color: 'rgba(78,255,124,0.3)', marginBottom: 2, letterSpacing: '0.08em' }}>{protocol[i]}</div>
                    <div style={{ color: 'rgba(78,255,124,0.4)', fontSize: 12 }}>→</div>
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Phases Section ───────────────────────────────────────────
function Phases() {
  return (
    <section id="phases" style={{ padding: '100px 40px', background: 'var(--void)' }}>
      <div className="container">
        <div style={{ marginBottom: 48 }}>
          <div className="sec-tag">DEVELOPMENT PHASES</div>
          <h2 className="sec-title">ROADMAP</h2>
        </div>
        <div>
          {PHASES.map((phase) => (
            <div key={phase.number} style={{
              display: 'grid', gridTemplateColumns: '72px 1fr', gap: 24,
              padding: '28px 0',
              borderBottom: '1px solid var(--rule2)',
              alignItems: 'start',
            }}>
              <div style={{
                fontFamily: 'var(--display)', fontSize: 52,
                color: phase.status === 'active' ? 'var(--glow)' : 'var(--bark)',
                lineHeight: 1, textAlign: 'right', paddingTop: 4,
              }}>{phase.number}</div>
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.2em', color: phase.status === 'active' ? 'var(--glow3)' : 'var(--text3)', textTransform: 'uppercase', marginBottom: 4 }}>
                  {phase.period}
                  {phase.status === 'active' && <span style={{ marginLeft: 8, color: 'var(--glow)', background: 'rgba(78,255,124,0.1)', padding: '1px 6px', border: '1px solid var(--glow-dim)' }}>ACTIVE</span>}
                </div>
                <div style={{ fontFamily: 'var(--body)', fontSize: 20, fontWeight: 600, color: 'var(--text)', marginBottom: 6, letterSpacing: '-0.02em' }}>
                  {phase.title}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text3)', marginBottom: 12 }}>{phase.description}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {phase.chips.map((chip) => (
                    <span key={chip} className="chip">{chip}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Blog Preview Section ─────────────────────────────────────
function BlogPreview() {
  return (
    <section id="blog" style={{ background: 'var(--earth)', borderTop: '1px solid var(--rule2)', padding: '100px 40px' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
          <div>
            <div className="sec-tag">TERRA BLOG</div>
            <h2 className="sec-title">LATEST ARTICLES</h2>
          </div>
          <Link to="/blog" className="btn-ghost" style={{ fontSize: 10 }}>VIEW ALL POSTS →</Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {BLOG_POSTS.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`}
              style={{ border: '1px solid var(--rule)', background: 'var(--deep)', textDecoration: 'none', display: 'block', transition: 'all 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = 'var(--glow-dim)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--rule)' }}
            >
              {/* Thumb */}
              <div style={{ height: 120, background: 'var(--bark)', position: 'relative', overflow: 'hidden' }}>
                <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.4 }} viewBox="0 0 300 120" preserveAspectRatio="xMidYMid slice">
                  {[40,55,70].map((y, i) => (
                    <path key={i} fill="none" stroke={`rgba(78,255,124,${0.15 - i * 0.03})`} strokeWidth="1"
                      d={`M0,${y} Q75,${y - 15} 150,${y + 5} T300,${y}`} />
                  ))}
                  <circle cx="60" cy="60" r="3" fill="rgba(78,255,124,0.5)" />
                  <circle cx="150" cy="55" r="2" fill="rgba(78,255,124,0.4)" />
                  <circle cx="240" cy="65" r="3" fill="rgba(78,255,124,0.5)" />
                </svg>
                <div style={{ position: 'absolute', top: 10, left: 10, fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--glow)', background: 'rgba(0,0,0,0.7)', padding: '3px 8px', letterSpacing: '0.15em' }}>
                  {post.episode}
                </div>
              </div>
              <div style={{ padding: 16 }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--terra2)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 6 }}>
                  {post.category}
                </div>
                <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)', lineHeight: 1.5, marginBottom: 8 }}>
                  {post.titleTh}
                </div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text3)', letterSpacing: '0.05em', display: 'flex', justifyContent: 'space-between' }}>
                  <span>TERRA Lab</span><span>{post.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA Section ──────────────────────────────────────────────
function CTA() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (email.includes('@')) setSubmitted(true)
  }

  return (
    <section id="cta" style={{ background: 'var(--void)', borderTop: '1px solid var(--rule)', padding: '100px 40px', textAlign: 'center' }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <div style={{ fontFamily: 'var(--display)', fontSize: 'clamp(60px, 10vw, 120px)', color: 'var(--bark)', letterSpacing: '0.06em', lineHeight: 0.9, marginBottom: 40 }}>
          JOIN<br/><span style={{ color: 'var(--glow)' }}>TERRA</span>
        </div>
        <p style={{ fontSize: 16, color: 'var(--text2)', marginBottom: 32, maxWidth: 480, margin: '0 auto 32px' }}>
          รับข่าวสาร episode ใหม่, dataset, และ code สาธารณะก่อนใคร — ฟรีทั้งหมด
        </p>
        {submitted ? (
          <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--glow)', padding: 20, border: '1px solid var(--glow-dim)', background: 'rgba(78,255,124,0.05)' }}>
            ✓ SUBSCRIBED — ขอบคุณ! คุณจะได้รับข่าวสารจาก TERRA
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', gap: 0, maxWidth: 400, margin: '0 auto 12px' }}>
              <input
                type="email" placeholder="your@email.com"
                value={email} onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                style={{
                  flex: 1, background: 'var(--earth)', border: '1px solid var(--rule)',
                  borderRight: 'none', color: 'var(--text)', padding: '12px 16px',
                  fontFamily: 'var(--mono)', fontSize: 12, outline: 'none',
                }}
              />
              <button onClick={handleSubmit} className="btn-primary" style={{ padding: '12px 20px' }}>
                SUBSCRIBE
              </button>
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text3)', letterSpacing: '0.08em' }}>
              NO SPAM · UNSUBSCRIBE ANYTIME · OPEN SOURCE ALWAYS
            </div>
          </>
        )}
      </div>
    </section>
  )
}

// ─── Page Export ──────────────────────────────────────────────
export function Landing() {
  return (
    <div className="page-enter">
      <Hero />
      <Features />
      <SensorCatalog />
      <Pipeline />
      <Phases />
      <BlogPreview />
      <CTA />
    </div>
  )
}
