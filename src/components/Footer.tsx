import { Link } from 'react-router-dom'

const footerLinks = {
  Platform: [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Sensor Lab', href: '/lab' },
    { label: 'Open Data', href: '/data' },
    { label: 'Pipeline', href: '/#pipeline' },
  ],
  Content: [
    { label: 'Blog', href: '/blog' },
    { label: 'Tutorials', href: '/tutorials' },
    { label: 'Video Series', href: '/videos' },
    { label: 'Notebooks', href: '/notebooks' },
  ],
  Project: [
    { label: 'About TERRA', href: '/about' },
    { label: 'GitHub', href: 'https://github.com/bs4u-tech/terra' },
    { label: 'bs4u-tech.com', href: 'https://bs4u-tech.com' },
    { label: 'Contact', href: '/contact' },
  ],
}

export function Footer() {
  return (
    <footer style={{
      background: 'var(--deep)',
      borderTop: '1px solid var(--rule)',
      padding: '60px 40px 32px',
    }}>
      <div style={{
        maxWidth: 1080, margin: '0 auto',
        display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr',
        gap: 40, marginBottom: 40,
      }}>
        {/* Brand */}
        <div>
          <div style={{ fontFamily: 'var(--display)', fontSize: 36, color: 'var(--glow)', letterSpacing: '0.08em', lineHeight: 1, marginBottom: 10 }}>
            TERRA
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text3)', letterSpacing: '0.12em', lineHeight: 2, marginBottom: 16 }}>
            T — Telemetry<br/>E — Environment<br/>
            R — Research<br/>R — Real-time<br/>A — Analytics
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--glow3)' }}>
            terra.bs4u-tech.com
          </div>
        </div>

        {/* Links */}
        {Object.entries(footerLinks).map(([group, links]) => (
          <div key={group}>
            <h4 style={{
              fontFamily: 'var(--mono)', fontSize: 9,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--text2)', marginBottom: 12,
            }}>
              {group}
            </h4>
            <ul style={{ listStyle: 'none' }}>
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    style={{
                      fontSize: 12, color: 'var(--text3)',
                      textDecoration: 'none', display: 'block',
                      padding: '3px 0', transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--glow)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text3)')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{
        maxWidth: 1080, margin: '0 auto',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderTop: '1px solid var(--rule2)', paddingTop: 20,
        fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text3)',
        flexWrap: 'wrap', gap: 8,
      }}>
        <span>© {new Date().getFullYear()} bs4u-tech.com · TERRA Platform · Open Source</span>
        <div style={{ display: 'flex', gap: 6 }}>
          {['Cloudflare Pages', 'React 18', 'TypeScript', 'Open Source'].map((t) => (
            <span key={t} style={{
              padding: '2px 8px',
              background: 'var(--earth)', border: '1px solid var(--rule)',
              fontSize: 9, color: 'var(--text3)',
            }}>{t}</span>
          ))}
        </div>
      </div>
    </footer>
  )
}
