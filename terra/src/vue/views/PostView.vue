<template>
  <div class="page" v-if="post">

    <!-- HEADER -->
    <header class="post-header">
      <div class="wrap">
        <nav class="breadcrumb">
          <RouterLink to="/" class="bc-link">TERRA</RouterLink>
          <span class="bc-sep"> / </span>
          <RouterLink to="/blog" class="bc-link">Build Log</RouterLink>
          <span class="bc-sep"> / </span>
          <span class="bc-current">{{ post.phase }}</span>
        </nav>
        <div class="post-meta-top">
          <span class="phase-tag">{{ post.phase }} · {{ post.sprint }}</span>
          <span class="diff-badge" :class="`diff-${post.difficulty}`">
            Difficulty {{ post.difficulty }} — {{ diffLabel }}
          </span>
        </div>
        <h1 class="post-title">{{ post.title }}</h1>
        <p class="post-subtitle">{{ post.titleTh }}</p>
        <div class="post-meta">
          <span class="post-date">{{ formatDate(post.date) }}</span>
          <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </div>
    </header>

    <!-- CONTENT -->
    <div class="wrap content-wrap">
      <!-- PRODUCT ASIDE -->
      <aside class="product-aside" v-if="post.products.length">
        <div class="aside-label">PRODUCTS IN THIS TUTORIAL</div>
        <ul class="product-list">
          <li v-for="p in post.products" :key="p.url">
            <a :href="p.url" target="_blank" rel="noopener" class="product-link">
              <span class="product-name">{{ p.name }}</span>
              <span class="product-arrow">→</span>
            </a>
          </li>
        </ul>
        <div class="aside-note">ซื้อจาก pwdvisionworks.com — ร้านค้า IoT ของ TERRA team</div>
      </aside>

      <!-- ARTICLE -->
      <article class="post-body" v-html="renderedContent" />
    </div>

    <!-- POST NAV -->
    <nav class="post-nav">
      <div class="wrap post-nav-inner">
        <RouterLink v-if="prevPost" :to="`/blog/${prevPost.slug}`" class="nav-post prev">
          <span class="nav-label">← บทก่อนหน้า</span>
          <span class="nav-title">{{ prevPost.title }}</span>
        </RouterLink>
        <div v-else />
        <RouterLink v-if="nextPost" :to="`/blog/${nextPost.slug}`" class="nav-post next">
          <span class="nav-label">บทถัดไป →</span>
          <span class="nav-title">{{ nextPost.title }}</span>
        </RouterLink>
        <div v-else />
      </div>
    </nav>

    <!-- FOOTER -->
    <footer class="footer">
      <div class="wrap footer-inner">
        <RouterLink to="/blog" class="footer-back">← All Posts</RouterLink>
        <a href="https://pwdvisionworks.com" target="_blank" rel="noopener" class="footer-link">pwdvisionworks.com</a>
      </div>
    </footer>

  </div>

  <!-- 404 -->
  <div class="page not-found" v-else>
    <div class="wrap nf-wrap">
      <RouterLink to="/blog" class="bc-link">← Back to Build Log</RouterLink>
      <h1 class="nf-title">Post not found</h1>
      <p class="nf-desc">This tutorial hasn't been published yet. Check back soon.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { posts, getPost } from '../data/posts'

const route = useRoute()
const slug = computed(() => route.params.slug as string)
const post = computed(() => getPost(slug.value))

const currentIndex = computed(() => posts.findIndex(p => p.slug === slug.value))
const prevPost = computed(() => currentIndex.value > 0 ? posts[currentIndex.value - 1] : null)
const nextPost = computed(() => currentIndex.value < posts.length - 1 ? posts[currentIndex.value + 1] : null)

const diffLabel = computed(() => (['', 'Beginner', 'Intermediate', 'Advanced', 'Expert'])[post.value?.difficulty ?? 1])

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function renderMarkdown(md: string): string {
  return md
    .replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) =>
      `<pre class="code-block" data-lang="${lang}"><code>${escapeHtml(code.trim())}</code></pre>`
    )
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`\n]+)`/g, '<code class="inline-code">$1</code>')
    .replace(/^\| (.+)$/gm, (line) => {
      const cells = line.split('|').map(c => c.trim()).filter(Boolean)
      return `<tr>${cells.map(c => `<td>${c}</td>`).join('')}</tr>`
    })
    .replace(/(<tr>.*<\/tr>\n?)+/gs, m => `<table class="md-table">${m}</table>`)
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/gs, m => `<ul>${m}</ul>`)
    .replace(/\n{2,}/g, '</p><p>')
}

const renderedContent = computed(() => {
  if (!post.value) return ''
  return `<p>${renderMarkdown(post.value.content)}</p>`
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,900;1,9..144,400&family=Space+Mono:wght@400;700&family=Noto+Sans+Thai:wght@400;500;600&display=swap');

/* ─── CSS VARS on .page so they cascade in scoped styles ─── */
.page {
  --bg:       #f5f0e8;
  --bg2:      #ede7d9;
  --ink:      #1a1208;
  --ink2:     #3d2e10;
  --ink3:     #6b5335;
  --terra:    #c05c1a;
  --rule:     rgba(26, 18, 8, 0.12);
  --code-bg:  #1a1208;
  --code-fg:  #c8e6cc;
  --mono:     'Space Mono', monospace;
  --serif:    'Fraunces', Georgia, serif;
  --thai:     'Noto Sans Thai', system-ui, sans-serif;

  background: var(--bg);
  color: var(--ink);
  font-family: var(--thai);
  font-size: 16px;
  line-height: 1.75;
  min-height: 100vh;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

.wrap { max-width: 1080px; margin: 0 auto; padding: 0 28px; }

/* ─── HEADER ─── */
.post-header {
  border-bottom: 2px solid var(--ink);
  padding: 36px 0 28px; background: var(--bg);
}

.breadcrumb {
  font-family: var(--mono); font-size: 10px; letter-spacing: 0.05em;
  color: var(--ink3); margin-bottom: 18px;
  display: flex; align-items: center; gap: 4px;
}
.bc-link { color: var(--terra); text-decoration: none; }
.bc-link:hover { text-decoration: underline; }
.bc-sep { color: var(--ink3); }
.bc-current { color: var(--ink3); }

.post-meta-top {
  display: flex; gap: 12px; align-items: center;
  flex-wrap: wrap; margin-bottom: 18px;
}
.phase-tag {
  font-family: var(--mono); font-size: 10px; letter-spacing: 0.18em;
  text-transform: uppercase; color: var(--terra);
  background: rgba(192, 92, 26, 0.08); border: 1px solid rgba(192, 92, 26, 0.25);
  padding: 3px 10px; border-radius: 2px;
}
.diff-badge {
  font-family: var(--mono); font-size: 10px;
  padding: 3px 10px; border-radius: 2px; border: 1px solid currentColor;
}
.diff-1 { color: #2d6a2d; }
.diff-2 { color: #5a7a1a; }
.diff-3 { color: var(--terra); }
.diff-4 { color: #8a1a1a; }

h1.post-title {
  font-family: var(--serif);
  font-size: clamp(24px, 4vw, 38px);
  font-weight: 900; color: var(--ink);
  letter-spacing: -0.025em; line-height: 1.15;
  margin-bottom: 10px;
}
.post-subtitle {
  font-family: var(--serif); font-style: italic;
  font-size: 16px; color: var(--ink3); margin-bottom: 18px;
}
.post-meta {
  display: flex; gap: 10px; flex-wrap: wrap; align-items: center;
  font-family: var(--mono); font-size: 10px; color: var(--ink3);
}
.post-date { color: var(--ink3); }
.tag {
  background: var(--bg2); padding: 2px 8px;
  border-radius: 2px; font-size: 9px;
}

/* ─── CONTENT LAYOUT ─── */
.content-wrap {
  display: grid;
  grid-template-columns: 1fr 260px;
  gap: 40px; column-gap: 48px;
  padding-top: 40px; padding-bottom: 48px;
  align-items: start;
}

/* ─── ASIDE ─── */
.product-aside {
  position: sticky; top: 20px;
  border: 1px solid var(--rule);
  border-top: 3px solid var(--terra);
  background: #fff; order: 2;
  overflow: hidden;
}
.aside-label {
  font-family: var(--mono); font-size: 9px; letter-spacing: 0.2em;
  text-transform: uppercase; color: var(--terra);
  background: rgba(192, 92, 26, 0.06);
  padding: 8px 16px; border-bottom: 1px solid var(--rule);
}
.product-list { list-style: none; padding: 0 16px; }
.product-list li { border-bottom: 1px solid var(--rule); }
.product-list li:last-child { border-bottom: none; }
.product-link {
  display: flex; align-items: center; justify-content: space-between;
  padding: 11px 0; text-decoration: none; color: inherit;
  gap: 8px; transition: color 0.2s;
}
.product-link:hover { color: var(--terra); }
.product-name {
  font-size: 13px; color: var(--ink2); flex: 1; line-height: 1.35;
}
.product-arrow { font-family: var(--mono); font-size: 13px; color: var(--terra); flex-shrink: 0; }
.aside-note {
  font-family: var(--mono); font-size: 9px; color: var(--ink3);
  padding: 10px 16px; border-top: 1px solid var(--rule);
  background: var(--bg2); line-height: 1.5;
}

/* ─── ARTICLE BODY ─── */
.post-body { order: 1; }

.post-body :deep(h2) {
  font-family: var(--serif); font-size: 22px; font-weight: 700;
  color: var(--ink); margin: 36px 0 14px;
  padding-bottom: 8px; border-bottom: 1px solid var(--rule);
}
.post-body :deep(h3) {
  font-family: var(--serif); font-size: 17px; font-weight: 700;
  color: var(--ink2); margin: 26px 0 10px;
}
.post-body :deep(p) {
  margin-bottom: 18px; color: var(--ink2); line-height: 1.8;
}
.post-body :deep(p:empty) { display: none; }
.post-body :deep(strong) { font-weight: 700; color: var(--ink); }
.post-body :deep(.inline-code) {
  font-family: var(--mono); font-size: 13px;
  background: var(--bg2); padding: 1px 6px;
  border-radius: 2px; color: var(--terra);
}
.post-body :deep(.code-block) {
  background: var(--code-bg); border-radius: 4px;
  padding: 18px 20px; margin: 20px 0; overflow-x: auto;
  position: relative;
}
.post-body :deep(.code-block)::before {
  content: attr(data-lang);
  position: absolute; top: 8px; right: 12px;
  font-family: var(--mono); font-size: 9px; letter-spacing: 0.1em;
  text-transform: uppercase; color: rgba(200, 230, 204, 0.35);
}
.post-body :deep(.code-block code) {
  font-family: var(--mono); font-size: 13px; line-height: 1.65;
  color: var(--code-fg); background: none; padding: 0; border-radius: 0;
}
.post-body :deep(ul) {
  padding-left: 22px; margin-bottom: 18px;
}
.post-body :deep(li) {
  margin-bottom: 6px; color: var(--ink2); line-height: 1.65;
}
.post-body :deep(.md-table) {
  width: 100%; border-collapse: collapse; margin: 20px 0;
  font-size: 14px; border: 1px solid var(--rule);
}
.post-body :deep(.md-table td) {
  padding: 9px 14px; border: 1px solid var(--rule); color: var(--ink2);
}
.post-body :deep(.md-table tr:first-child td) {
  background: var(--bg2); font-family: var(--mono); font-size: 11px;
  font-weight: 700; color: var(--ink3); text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* ─── POST NAV ─── */
.post-nav {
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
  padding: 24px 0; background: #fff;
}
.post-nav-inner {
  display: grid; grid-template-columns: 1fr 1fr; gap: 20px;
}
.nav-post {
  text-decoration: none; color: inherit;
  padding: 14px 16px; border: 1px solid var(--rule);
  background: var(--bg); transition: border-color 0.2s;
  display: flex; flex-direction: column; gap: 5px;
}
.nav-post:hover { border-color: var(--terra); }
.nav-post.next { text-align: right; }
.nav-label { font-family: var(--mono); font-size: 10px; color: var(--terra); letter-spacing: 0.08em; }
.nav-title { font-family: var(--serif); font-size: 14px; color: var(--ink2); line-height: 1.3; }

/* ─── NOT FOUND ─── */
.not-found { padding: 80px 0; }
.nf-wrap { padding-top: 60px; }
.nf-title {
  font-family: var(--serif); font-size: 36px; font-weight: 900;
  margin: 18px 0 10px;
}
.nf-desc { color: var(--ink3); font-size: 15px; }

/* ─── FOOTER ─── */
.footer { padding: 24px 0; border-top: 1px solid var(--rule); }
.footer-inner {
  display: flex; align-items: center;
  justify-content: space-between; gap: 16px;
}
.footer-back {
  font-family: var(--mono); font-size: 11px;
  color: var(--ink3); text-decoration: none;
}
.footer-back:hover { color: var(--terra); }
.footer-link {
  font-family: var(--mono); font-size: 11px;
  color: var(--terra); text-decoration: none;
}
.footer-link:hover { text-decoration: underline; }

/* ─── RESPONSIVE ─── */
@media (max-width: 768px) {
  .content-wrap {
    grid-template-columns: 1fr;
  }
  .product-aside { order: -1; position: static; }
  .post-nav-inner { grid-template-columns: 1fr; }
  .nav-post.next { text-align: left; }
}
</style>
