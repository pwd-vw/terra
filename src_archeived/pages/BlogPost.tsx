import { useParams, Link } from 'react-router-dom'
import { BLOG_POSTS } from '@/lib/data'

export function BlogPost() {
  const { slug } = useParams()
  const post = BLOG_POSTS.find(p => p.slug === slug)
  if (!post) return <NotFoundInner />
  return (
    <div className="page-enter section">
      <div className="container" style={{ maxWidth: 720 }}>
        <Link to="/blog" style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text3)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 32 }}>
          ← BACK TO BLOG
        </Link>
        <div className="sec-tag">{post.category}</div>
        <h1 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(32px, 5vw, 56px)', color: 'var(--text)', lineHeight: 0.95, letterSpacing: '0.02em', marginBottom: 16 }}>{post.titleTh}</h1>
        <p style={{ fontSize: 16, color: 'var(--text2)', marginBottom: 32, lineHeight: 1.8 }}>{post.excerpt}</p>
        <div style={{ border: '1px solid var(--rule)', padding: 32, background: 'var(--earth)', fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--text3)', textAlign: 'center' }}>
          📝 บทความนี้กำลังอยู่ระหว่างการเขียน — Coming soon in {post.episode}
        </div>
      </div>
    </div>
  )
}
function NotFoundInner() {
  return <div className="section"><div className="container"><p style={{ color: 'var(--text3)' }}>Post not found.</p></div></div>
}
