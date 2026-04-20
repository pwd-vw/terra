// src/pages/Blog.tsx
import { Link } from 'react-router-dom'
import { BLOG_POSTS } from '@/lib/data'

export function Blog() {
  return (
    <div className="page-enter section">
      <div className="container">
        <div style={{ marginBottom: 48 }}>
          <div className="sec-tag">ALL ARTICLES</div>
          <h1 className="sec-title">TERRA BLOG</h1>
          <p className="sec-desc">Tutorial, experiment results, data analysis และ comparison series จากทีม TERRA Lab</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {BLOG_POSTS.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`}
              style={{ border: '1px solid var(--rule)', background: 'var(--earth)', textDecoration: 'none', padding: 20, display: 'block', transition: 'all 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--glow-dim)' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--rule)' }}
            >
              <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--glow)', marginBottom: 4 }}>{post.episode}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--terra2)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>{post.category}</div>
              <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text)', lineHeight: 1.5, marginBottom: 8 }}>{post.titleTh}</div>
              <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 12 }}>{post.excerpt}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text3)', display: 'flex', justifyContent: 'space-between' }}>
                <span>{post.readTime}</span>
                <div style={{ display: 'flex', gap: 4 }}>
                  {post.types.map((t) => (
                    <span key={t} style={{ padding: '1px 5px', border: '1px solid var(--rule)', fontSize: 8, letterSpacing: '0.05em' }}>
                      {t.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
