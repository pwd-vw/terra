<template>
  <div class="page">

    <!-- MASTHEAD -->
    <header class="masthead">
      <div class="wrap masthead-inner">
        <div class="brand-block">
          <div class="brand-eyebrow">TERRA · BUILD LOG</div>
          <div class="brand-name">Field<br>Notes<sup>v0.1</sup></div>
          <div class="brand-tagline">ทุกขั้นตอนของการสร้างระบบรดน้ำอัจฉริยะ</div>
        </div>
        <div class="masthead-meta">
          <span>SMART LONGAN FARM</span>
          <span>CHIANG MAI, TH</span>
          <span>{{ postCount }} TUTORIALS</span>
          <a href="https://pwdvisionworks.com" target="_blank" rel="noopener" class="domain">pwdvisionworks.com</a>
          <RouterLink to="/" class="back-link">← Back to Dashboard</RouterLink>
        </div>
      </div>
    </header>

    <!-- INTRO -->
    <section class="wrap intro-section">
      <hr class="sec-rule" />
      <div class="sec-head">
        <span class="sec-num">01</span>
        <h2>Tutorial Series</h2>
      </div>
      <p class="intro-text">
        เราจะสร้าง TERRA แบบ Build in Public — ทุก tutorial มี source code, wiring diagram
        และ lesson learned เพื่อให้ทุกคนสามารถทำตามหรือปรับใช้กับ project ของตัวเองได้
      </p>
      <div class="difficulty-legend">
        <span v-for="d in 4" :key="d" class="diff-item">
          <span class="diff-badge" :class="`diff-${d}`">{{ d }}</span>
          {{ difficultyLabel(d) }}
        </span>
      </div>
    </section>

    <!-- POST GRID -->
    <section class="wrap posts-section">
      <hr class="sec-rule" />
      <div class="sec-head">
        <span class="sec-num">02</span>
        <h2>All Posts</h2>
      </div>
      <div class="post-grid">
        <RouterLink
          v-for="post in posts"
          :key="post.slug"
          :to="`/blog/${post.slug}`"
          class="post-card"
        >
          <div class="post-card-top">
            <span class="post-phase">{{ post.phase }}</span>
            <span class="diff-badge" :class="`diff-${post.difficulty}`">{{ post.difficulty }}</span>
          </div>
          <h3 class="post-title">{{ post.title }}</h3>
          <p class="post-excerpt">{{ post.excerpt }}</p>
          <div class="post-tags">
            <span v-for="tag in post.tags.slice(0, 3)" :key="tag" class="tag">{{ tag }}</span>
          </div>
          <div class="post-footer">
            <span class="post-date">{{ formatDate(post.date) }}</span>
            <span class="post-products" v-if="post.products.length">
              {{ post.products.length }} product{{ post.products.length > 1 ? 's' : '' }}
            </span>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="footer">
      <div class="wrap footer-inner">
        <RouterLink to="/" class="footer-back">← Dashboard</RouterLink>
        <span class="footer-copy">TERRA Field Notes — Build in Public</span>
        <a href="https://pwdvisionworks.com" target="_blank" rel="noopener" class="footer-link">pwdvisionworks.com</a>
      </div>
    </footer>

  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { posts } from '../data/posts'

const postCount = posts.length

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })
}
function difficultyLabel(d: number): string {
  return ['', 'Beginner', 'Intermediate', 'Advanced', 'Expert'][d]
}
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
  --terra-lt: rgba(192, 92, 26, 0.08);
  --green:    #2d6a2d;
  --rule:     rgba(26, 18, 8, 0.12);
  --mono:     'Space Mono', monospace;
  --serif:    'Fraunces', Georgia, serif;
  --thai:     'Noto Sans Thai', system-ui, sans-serif;

  background: var(--bg);
  color: var(--ink);
  font-family: var(--thai);
  font-size: 15px;
  line-height: 1.7;
  min-height: 100vh;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

.wrap { max-width: 1080px; margin: 0 auto; padding: 0 28px; }

/* ─── MASTHEAD ─── */
.masthead {
  border-bottom: 2px solid var(--ink);
  padding: 36px 0 28px;
}
.masthead-inner {
  display: flex; align-items: flex-end;
  justify-content: space-between; gap: 24px; flex-wrap: wrap;
}

.brand-eyebrow {
  font-family: var(--mono); font-size: 10px; letter-spacing: 0.28em;
  text-transform: uppercase; color: var(--terra); margin-bottom: 6px;
}
.brand-name {
  font-family: var(--serif);
  font-size: clamp(44px, 7vw, 72px);
  font-weight: 900; line-height: 0.92;
  color: var(--ink); letter-spacing: -0.03em; margin-bottom: 10px;
}
.brand-name sup {
  font-size: 0.28em; vertical-align: super;
  color: var(--terra); font-weight: 400; font-style: italic;
  font-family: var(--serif);
}
.brand-tagline {
  font-family: var(--serif); font-style: italic;
  font-size: 14px; color: var(--ink3); line-height: 1.5;
}

.masthead-meta {
  text-align: right; font-family: var(--mono);
  font-size: 10px; color: var(--ink3); letter-spacing: 0.08em;
  line-height: 1.9; display: flex; flex-direction: column; align-items: flex-end;
}
.domain {
  font-size: 12px; color: var(--terra); font-weight: 700;
  letter-spacing: 0; text-decoration: none; margin-top: 2px;
}
.domain:hover { text-decoration: underline; }
.back-link {
  font-size: 10px; color: var(--ink3); text-decoration: none; margin-top: 4px;
}
.back-link:hover { color: var(--terra); }

/* ─── SECTIONS ─── */
.intro-section { padding: 36px 0 28px; }
.posts-section { padding: 0 0 48px; }

.sec-rule {
  border: none; border-top: 1px solid var(--rule); margin-bottom: 20px;
}
.sec-head {
  display: flex; align-items: baseline; gap: 14px; margin-bottom: 20px;
}
.sec-num {
  font-family: var(--serif); font-size: 11px;
  color: var(--terra); font-weight: 700; letter-spacing: 0.1em;
}
h2 {
  font-family: var(--serif); font-size: clamp(20px, 2.8vw, 26px);
  font-weight: 700; color: var(--ink); letter-spacing: -0.02em;
}

.intro-text {
  font-size: 15px; color: var(--ink2); max-width: 600px;
  margin-bottom: 20px; line-height: 1.7;
}

.difficulty-legend { display: flex; gap: 22px; flex-wrap: wrap; align-items: center; }
.diff-item {
  font-family: var(--mono); font-size: 11px; color: var(--ink3);
  display: flex; align-items: center; gap: 8px;
}
.diff-badge {
  font-family: var(--mono); font-size: 10px;
  padding: 2px 7px; border-radius: 2px;
  border: 1px solid currentColor; font-weight: 700;
  flex-shrink: 0;
}
.diff-1 { color: #2d6a2d; }
.diff-2 { color: #5a7a1a; }
.diff-3 { color: var(--terra); }
.diff-4 { color: #8a1a1a; }

/* ─── POST GRID ─── */
.post-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.post-card {
  display: flex; flex-direction: column;
  border: 1px solid rgba(26, 18, 8, 0.15);
  border-top: 3px solid var(--terra);
  padding: 20px 22px;
  background: #fff;
  text-decoration: none; color: inherit;
  transition: box-shadow 0.2s, transform 0.2s;
}
.post-card:hover {
  box-shadow: 0 4px 24px rgba(26, 18, 8, 0.1);
  transform: translateY(-2px);
}

.post-card-top {
  display: flex; align-items: center;
  justify-content: space-between; margin-bottom: 12px;
}
.post-phase {
  font-family: var(--mono); font-size: 10px; letter-spacing: 0.15em;
  text-transform: uppercase; color: var(--terra);
}

h3.post-title {
  font-family: var(--serif); font-size: 17px; font-weight: 700;
  color: var(--ink2); margin-bottom: 10px; line-height: 1.3;
}
.post-excerpt {
  font-size: 13px; color: var(--ink3); flex: 1;
  margin-bottom: 14px; line-height: 1.6;
}
.post-tags {
  display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px;
}
.tag {
  font-family: var(--mono); font-size: 9px;
  padding: 2px 7px; border-radius: 2px;
  background: var(--bg2); color: var(--ink3);
}
.post-footer {
  display: flex; align-items: center; justify-content: space-between;
  padding-top: 12px; border-top: 1px solid var(--rule);
  font-family: var(--mono); font-size: 10px; color: var(--ink3);
}
.post-products { color: var(--terra); }

/* ─── FOOTER ─── */
.footer {
  border-top: 1px solid var(--rule); padding: 24px 0;
}
.footer-inner {
  display: flex; align-items: center;
  justify-content: space-between; gap: 16px; flex-wrap: wrap;
}
.footer-back {
  font-family: var(--mono); font-size: 11px;
  color: var(--ink3); text-decoration: none;
}
.footer-back:hover { color: var(--terra); }
.footer-copy {
  font-family: var(--mono); font-size: 10px; color: var(--ink3); flex: 1; text-align: center;
}
.footer-link {
  font-family: var(--mono); font-size: 11px; color: var(--terra); text-decoration: none;
}
.footer-link:hover { text-decoration: underline; }

@media (max-width: 640px) {
  .masthead-inner { flex-direction: column; align-items: flex-start; }
  .masthead-meta { text-align: left; align-items: flex-start; }
  .post-grid { grid-template-columns: 1fr; }
  .footer-copy { display: none; }
}
</style>
