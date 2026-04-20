import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NAV_ITEMS } from '@/lib/data'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href)

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 40px', height: '56px',
      background: scrolled ? 'rgba(6,10,5,0.95)' : 'rgba(6,10,5,0.7)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(74,140,50,0.15)',
      transition: 'background 0.3s',
    }}>
      {/* Logo */}
      <Link to="/" style={{ display: 'flex', alignItems: 'baseline', gap: 6, textDecoration: 'none' }}>
        <span style={{ fontFamily: 'var(--display)', fontSize: 26, color: 'var(--glow)', letterSpacing: '0.08em', lineHeight: 1 }}>
          TERRA
        </span>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text3)', letterSpacing: '0.15em' }}>
          terra.bs4u-tech.com
        </span>
      </Link>

      {/* Desktop Links */}
      <ul style={{ display: 'flex', gap: 4, listStyle: 'none', margin: 0 }} className="nav-desktop">
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <Link
              to={item.href}
              style={{
                fontFamily: 'var(--mono)', fontSize: 11,
                letterSpacing: '0.12em',
                color: isActive(item.href) ? 'var(--glow)' : 'var(--text2)',
                textDecoration: 'none',
                padding: '6px 12px',
                border: '1px solid',
                borderColor: isActive(item.href) ? 'var(--glow-dim)' : 'transparent',
                background: isActive(item.href) ? 'rgba(78,255,124,0.05)' : 'transparent',
                display: 'flex', alignItems: 'center', gap: 6,
                transition: 'all 0.2s',
              }}
            >
              {item.label}
              {item.badge && (
                <span style={{
                  fontSize: 7, padding: '1px 5px',
                  background: 'var(--glow)', color: 'var(--void)',
                  letterSpacing: '0.1em',
                }}>
                  {item.badge}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: 'none', background: 'none', border: '1px solid var(--rule)',
          color: 'var(--text2)', padding: '6px 10px',
          fontFamily: 'var(--mono)', fontSize: 10, cursor: 'pointer',
        }}
        className="nav-mobile-btn"
      >
        {menuOpen ? '✕ CLOSE' : '☰ MENU'}
      </button>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 56, left: 0, right: 0, bottom: 0,
          background: 'rgba(6,10,5,0.97)', zIndex: 99,
          display: 'flex', flexDirection: 'column', padding: 40, gap: 8,
        }}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'var(--display)', fontSize: 32,
                color: isActive(item.href) ? 'var(--glow)' : 'var(--text3)',
                textDecoration: 'none', letterSpacing: '0.06em',
                borderBottom: '1px solid var(--rule2)', paddingBottom: 12,
                transition: 'color 0.2s',
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
