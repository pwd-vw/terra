<template>
  <div class="page">

    <!-- NAV -->
    <nav class="nav">
      <div class="wrap nav-inner">
        <span class="nav-brand">TERRA<sup>v0.1</sup></span>
        <div class="nav-links">
          <span class="phase-badge">PHASE 0 · ACTIVE</span>
          <RouterLink to="/blog" class="nav-link">Build Log →</RouterLink>
        </div>
      </div>
    </nav>

    <!-- HERO -->
    <header class="hero">
      <div class="wrap">
        <div class="badge">BUILD IN PUBLIC — SMART LONGAN FARM AUTOMATION</div>
        <h1>TERRA<span class="accent">.</span></h1>
        <p class="tagline">Telemetry Environment Research · Real-time Analytics System</p>
        <div class="hero-meta">
          <span>ESP32 × 5 nodes</span>
          <span>RPi5 hub</span>
          <span>Cloudflare Workers</span>
          <span>Node-RED automation</span>
        </div>
        <div class="hero-actions">
          <RouterLink to="/blog" class="btn-primary">Build Log</RouterLink>
          <a href="/api/v1/status" class="btn-ghost">API Status</a>
        </div>
      </div>
    </header>

    <!-- SYSTEM TOPOLOGY -->
    <section class="section wrap">
      <div class="sec-label">SYSTEM TOPOLOGY</div>
      <h2>Hardware Architecture</h2>
      <div class="topology-box">
        <pre class="topology-pre">
┌──────────────────────────────────────────────────────────────────┐
│  CLOUD                   Cloudflare Workers + D1 + R2            │
│  terra.bs4u-tech.com     API · Dashboard · Rules · Alerts        │
└───────────────────────────┬──────────────────────────────────────┘
                            │ Cloudflare Tunnel (cloudflared)
┌───────────────────────────▼──────────────────────────────────────┐
│  EDGE HUB                Raspberry Pi 5 — 192.168.10.10          │
│                          TimescaleDB · Node-RED · Mosquitto MQTT  │
│                          Docker · UPS HAT · SSD /opt/terra        │
└──┬───────────────────────────────────────────────────────────────┘
   │ WiFi AP ×2  [terra-iot / terra-cam]
   ├── NODE-S ×3  Soil sensor (moisture + temp + EC)  Solar powered
   ├── NODE-W ×1  Weather station (rain · temp · humidity · wind)
   ├── NODE-P ×1  Pump controller (SSR relay + flow meter)
   ├── NODE-V ×1  Valve controller (4-zone solenoids)
   └── IP Camera ×4  Frigate NVR
        </pre>
      </div>
    </section>

    <!-- ZONE MAP -->
    <section class="section wrap">
      <div class="sec-label">FARM ZONES</div>
      <h2>Irrigation Zones — ลำไย 120 ต้น</h2>
      <div class="zone-grid">
        <div v-for="z in zones" :key="z.id" class="zone-card" :class="z.color">
          <div class="zone-id">{{ z.id }}</div>
          <div class="zone-name">{{ z.name }}</div>
          <div class="zone-detail">{{ z.trees }} · {{ z.sensor }}</div>
        </div>
      </div>
    </section>

    <!-- PHASE ROADMAP -->
    <section class="section wrap">
      <div class="sec-label">BUILD ROADMAP</div>
      <h2>Phase Progress</h2>
      <div class="phases">
        <div v-for="phase in phases" :key="phase.id" class="phase-row">
          <div class="phase-num-col">
            <span class="phase-num" :class="{ active: phase.status === 'ACTIVE' }">{{ phase.id }}</span>
          </div>
          <div class="phase-body">
            <div class="phase-header">
              <span class="phase-status-badge" :class="`status-${phase.status.toLowerCase()}`">{{ phase.status }}</span>
              <span class="phase-title">{{ phase.title }}</span>
            </div>
            <p class="phase-desc">{{ phase.desc }}</p>
            <div class="sprint-chips">
              <span v-for="s in phase.sprints" :key="s" class="sprint-chip">{{ s }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- TECH STACK -->
    <section class="section wrap">
      <div class="sec-label">TECHNOLOGY STACK</div>
      <h2>Stack</h2>
      <div class="stack-layers">
        <div v-for="layer in stack" :key="layer.name" class="stack-layer" :class="`l${layer.level}`">
          <div class="layer-header">
            <span class="layer-num">{{ layer.level }}</span>
            {{ layer.name }}
          </div>
          <div class="layer-body">
            <div class="tech-grid">
              <span v-for="t in layer.techs" :key="t" class="tech-tag">{{ t }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- BLOG CTA -->
    <section class="section wrap cta-section">
      <div class="cta-box">
        <div class="cta-label">BUILD LOG</div>
        <h2 class="cta-h">ติดตาม Build Process</h2>
        <p class="cta-desc">บันทึกทุกขั้นตอนตั้งแต่ hardware setup ถึง cloud deployment พร้อม tutorial และ source code</p>
        <RouterLink to="/blog" class="btn-primary">อ่าน Build Log →</RouterLink>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="footer">
      <div class="wrap footer-inner">
        <span class="footer-brand">TERRA v0.1</span>
        <span class="footer-sep">·</span>
        <span class="footer-meta">Telemetry Environment Research Real-time Analytics · {{ year }}</span>
        <a href="https://pwdvisionworks.com" target="_blank" rel="noopener" class="footer-link">pwdvisionworks.com</a>
      </div>
    </footer>

  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

const year = new Date().getFullYear()

const zones = [
  { id: 'ZONE 01', name: 'ทิศเหนือ',      trees: 'ต้น 1–30',    sensor: 'NODE-S-01', color: 'green' },
  { id: 'ZONE 02', name: 'ทิศตะวันออก',  trees: 'ต้น 31–60',   sensor: 'NODE-S-02', color: 'blue' },
  { id: 'ZONE 03', name: 'ทิศใต้',        trees: 'ต้น 61–90',   sensor: 'NODE-S-03', color: 'amber' },
  { id: 'ZONE 04', name: 'ทิศตะวันตก',   trees: 'ต้น 91–120',  sensor: 'NODE-S-01', color: 'purple' },
]

const phases = [
  {
    id: '0',
    title: 'Project Setup & Documentation',
    status: 'ACTIVE',
    desc: 'Cloudflare Workers + Vue 3, landing page, blog, architecture decisions',
    sprints: ['P0-T01', 'P0-T02', 'P0-T03', 'P0-T04', 'P0-T05'],
  },
  {
    id: '1',
    title: 'IoT Hardware + Local Automation',
    status: 'NEXT',
    desc: 'Network setup, RPi hub, ESP32 nodes, Node-RED automation, Frigate camera',
    sprints: ['S1 Network', 'S2 Soil', 'S3 Pump/Valve', 'S4 Node-RED', 'S5 Camera'],
  },
  {
    id: '2',
    title: 'Cloud API + Dashboard',
    status: 'PLANNED',
    desc: 'CF D1 sync, Workers API, dashboard, mobile PWA, LINE alerts',
    sprints: ['S6 CF API', 'S7 Dashboard', 'S8 PWA+UAT'],
  },
  {
    id: '3',
    title: 'AI/ML Irrigation Intelligence',
    status: 'FUTURE',
    desc: 'Soil moisture prediction, weather-aware scheduling, anomaly detection',
    sprints: ['ML Pipeline', 'Prediction API', 'Smart Rules'],
  },
  {
    id: '4',
    title: 'Scale & Productize',
    status: 'FUTURE',
    desc: 'Multi-farm support, commercial sensor kit, SaaS dashboard, open-source',
    sprints: ['Multi-tenant', 'Hardware Kit', 'OSS Release'],
  },
]

const stack = [
  {
    level: 1,
    name: 'FIELD SENSORS',
    techs: ['ESP32-S3', 'Capacitive Soil Sensor', 'DHT22', 'Rain Gauge', 'Flow Meter', 'SSR Relay', 'Solenoid Valve', 'Solar Panel'],
  },
  {
    level: 2,
    name: 'EDGE HUB',
    techs: ['Raspberry Pi 5', 'Mosquitto MQTT', 'Node-RED', 'TimescaleDB', 'Docker', 'Frigate NVR', 'Cloudflare Tunnel'],
  },
  {
    level: 3,
    name: 'CLOUD',
    techs: ['Cloudflare Workers', 'Cloudflare D1', 'Cloudflare R2', 'CF Access', 'TypeScript', 'Hono'],
  },
  {
    level: 4,
    name: 'FRONTEND',
    techs: ['Vue 3', 'Vite', 'Vue Router', 'Recharts', 'Leaflet', 'hls.js', 'PWA'],
  },
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Syne:wght@600;700;800&family=IBM+Plex+Sans+Thai:wght@400;500;600&display=swap');

/* ─── CSS CUSTOM PROPERTIES (defined on .page so they cascade in scoped styles) ─── */
.page {
  --bg:         #080f0a;
  --bg2:        #0d1a10;
  --bg3:        #111f14;
  --panel:      #0f1c12;
  --border:     #1e3322;
  --border2:    #2a4a32;
  --green:      #2dff72;
  --green-dim:  #0f6e2e;
  --green-glow: rgba(45, 255, 114, 0.1);
  --amber:      #ffa500;
  --blue:       #4dc9ff;
  --purple:     #c77dff;
  --red:        #ff4d6d;
  --text:       #c8e6cc;
  --text-dim:   #6a9870;
  --text-muted: #3a5540;
  --mono:       'JetBrains Mono', monospace;
  --sans:       'IBM Plex Sans Thai', system-ui, sans-serif;
  --display:    'Syne', system-ui, sans-serif;

  background: var(--bg);
  color: var(--text);
  font-family: var(--sans);
  font-size: 15px;
  line-height: 1.65;
  min-height: 100vh;
  position: relative;
}

.page::before {
  content: '';
  position: fixed; inset: 0;
  background-image:
    linear-gradient(rgba(45, 255, 114, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(45, 255, 114, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none; z-index: 0;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

.wrap {
  max-width: 1080px; margin: 0 auto;
  padding: 0 28px; position: relative; z-index: 1;
}

/* ─── NAV ─── */
.nav {
  border-bottom: 1px solid var(--border2);
  padding: 14px 0;
  position: sticky; top: 0;
  background: rgba(8, 15, 10, 0.94);
  backdrop-filter: blur(8px);
  z-index: 100;
}
.nav-inner { display: flex; align-items: center; justify-content: space-between; gap: 16px; }

.nav-brand {
  font-family: var(--display);
  font-size: 17px; font-weight: 800;
  color: #fff; letter-spacing: -0.01em;
}
.nav-brand sup {
  font-family: var(--mono);
  font-size: 10px; font-weight: 400;
  color: var(--green); vertical-align: super; margin-left: 2px;
}

.nav-links { display: flex; align-items: center; gap: 20px; }

.phase-badge {
  font-family: var(--mono); font-size: 10px; letter-spacing: 0.15em;
  color: var(--green); background: var(--green-glow);
  border: 1px solid var(--green-dim);
  padding: 4px 10px; border-radius: 2px;
}

.nav-link {
  font-family: var(--mono); font-size: 12px;
  color: var(--text-dim); text-decoration: none;
  transition: color 0.2s;
}
.nav-link:hover { color: var(--green); }

/* ─── HERO ─── */
.hero {
  padding: 60px 0 52px;
  border-bottom: 1px solid var(--border2);
  position: relative;
}
.hero::after {
  content: '';
  position: absolute; bottom: -1px; left: 28px;
  width: 160px; height: 2px;
  background: var(--green);
  box-shadow: 0 0 12px rgba(45, 255, 114, 0.5);
}

.badge {
  font-family: var(--mono); font-size: 10px; letter-spacing: 0.18em;
  color: var(--green); background: var(--green-glow);
  border: 1px solid var(--green-dim);
  padding: 4px 12px; display: inline-block;
  margin-bottom: 20px; border-radius: 2px;
}

h1 {
  font-family: var(--display);
  font-size: clamp(52px, 9vw, 84px);
  font-weight: 800; color: #fff;
  letter-spacing: -0.04em; line-height: 0.92;
  margin-bottom: 18px;
}
.accent { color: var(--green); }

.tagline {
  font-family: var(--sans);
  font-size: clamp(15px, 1.8vw, 18px);
  color: var(--text-dim); line-height: 1.5;
  margin-bottom: 20px; max-width: 560px;
}

.hero-meta {
  display: flex; gap: 28px; flex-wrap: wrap;
  font-family: var(--mono); font-size: 12px; color: var(--text-muted);
  margin-bottom: 32px;
}
.hero-meta span::before { content: '// '; color: var(--green-dim); }

.hero-actions { display: flex; gap: 12px; flex-wrap: wrap; }

.btn-primary {
  display: inline-block;
  background: var(--green); color: #050d07;
  padding: 10px 22px; border-radius: 3px;
  font-family: var(--mono); font-size: 12px; font-weight: 700;
  text-decoration: none; letter-spacing: 0.05em;
  transition: opacity 0.2s;
}
.btn-primary:hover { opacity: 0.85; }

.btn-ghost {
  display: inline-block;
  border: 1px solid var(--border2); color: var(--text-dim);
  padding: 10px 22px; border-radius: 3px;
  font-family: var(--mono); font-size: 12px;
  text-decoration: none; letter-spacing: 0.05em;
  transition: border-color 0.2s, color 0.2s;
}
.btn-ghost:hover { border-color: var(--green); color: var(--green); }

/* ─── SECTIONS ─── */
.section {
  padding: 48px 0;
  border-bottom: 1px solid var(--border);
}

.sec-label {
  font-family: var(--mono); font-size: 10px; letter-spacing: 0.25em;
  text-transform: uppercase; color: var(--green);
  margin-bottom: 8px;
}
.sec-label::before { content: '▶ '; }

h2 {
  font-family: var(--display); font-size: 20px; font-weight: 700;
  color: #fff; margin-bottom: 24px;
  padding-bottom: 10px; border-bottom: 1px solid var(--border);
}

/* ─── TOPOLOGY ─── */
.topology-box {
  background: var(--panel); border: 1px solid var(--border2);
  border-radius: 6px; padding: 20px 24px; overflow-x: auto;
}
.topology-pre {
  font-family: var(--mono); font-size: 12.5px; line-height: 1.65;
  color: var(--green); white-space: pre;
}

/* ─── ZONES ─── */
.zone-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px;
}
.zone-card {
  background: var(--bg3); border: 1px solid var(--border);
  border-top: 2px solid; border-radius: 5px;
  padding: 16px 18px;
  transition: transform 0.18s;
}
.zone-card:hover { transform: translateY(-2px); }
.zone-card.green  { border-top-color: var(--green); }
.zone-card.blue   { border-top-color: var(--blue); }
.zone-card.amber  { border-top-color: var(--amber); }
.zone-card.purple { border-top-color: var(--purple); }

.zone-id   { font-family: var(--mono); font-size: 10px; letter-spacing: 0.15em; color: var(--text-muted); margin-bottom: 4px; }
.zone-name { font-family: var(--display); font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 6px; }
.zone-detail { font-family: var(--mono); font-size: 11px; color: var(--text-dim); }

/* ─── PHASES ─── */
.phases { display: flex; flex-direction: column; }
.phase-row {
  display: grid; grid-template-columns: 48px 1fr; gap: 20px;
  padding: 24px 0; border-bottom: 1px dashed var(--border);
}
.phase-row:last-child { border-bottom: none; }

.phase-num {
  font-family: var(--display); font-size: 32px; font-weight: 800;
  color: var(--border2); line-height: 1; display: block; margin-top: 2px;
}
.phase-num.active {
  color: var(--green);
  text-shadow: 0 0 16px rgba(45, 255, 114, 0.35);
}

.phase-header { display: flex; align-items: baseline; gap: 10px; margin-bottom: 6px; flex-wrap: wrap; }

.phase-status-badge {
  font-family: var(--mono); font-size: 9px; letter-spacing: 0.15em;
  text-transform: uppercase; padding: 2px 8px; border-radius: 2px;
}
.status-active  { background: var(--green-glow); color: var(--green); border: 1px solid var(--green-dim); }
.status-next    { background: rgba(77,201,255,0.08); color: var(--blue); border: 1px solid rgba(77,201,255,0.25); }
.status-planned { background: rgba(255,165,0,0.08); color: var(--amber); border: 1px solid rgba(255,165,0,0.25); }
.status-future  { background: var(--bg3); color: var(--text-muted); border: 1px solid var(--border); }

.phase-title { font-family: var(--sans); font-size: 16px; font-weight: 600; color: #fff; }
.phase-desc  { font-size: 13px; color: var(--text-dim); margin-bottom: 10px; line-height: 1.5; }

.sprint-chips { display: flex; flex-wrap: wrap; gap: 6px; }
.sprint-chip {
  font-family: var(--mono); font-size: 10px;
  background: var(--bg3); border: 1px solid var(--border);
  padding: 2px 8px; border-radius: 2px; color: var(--text-muted);
}

/* ─── STACK ─── */
.stack-layers { display: flex; flex-direction: column; gap: 10px; }
.stack-layer { border: 1px solid var(--border2); border-radius: 5px; overflow: hidden; }

.layer-header {
  padding: 10px 16px; display: flex; align-items: center; gap: 12px;
  font-family: var(--mono); font-size: 11px; font-weight: 600;
  letter-spacing: 0.12em; text-transform: uppercase;
}
.layer-num {
  width: 22px; height: 22px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 10px; font-weight: 700; flex-shrink: 0;
}
.layer-body { padding: 12px 16px; background: var(--bg2); }
.tech-grid { display: flex; flex-wrap: wrap; gap: 8px; }
.tech-tag {
  font-family: var(--mono); font-size: 11px;
  background: var(--bg3); border: 1px solid var(--border);
  padding: 4px 10px; border-radius: 3px; color: var(--text);
}

.l1 .layer-header { background: rgba(45,255,114,0.07); color: var(--green); border-bottom: 1px solid rgba(45,255,114,0.18); }
.l1 .layer-num    { background: var(--green); color: #060f08; }
.l2 .layer-header { background: rgba(77,201,255,0.07); color: var(--blue); border-bottom: 1px solid rgba(77,201,255,0.18); }
.l2 .layer-num    { background: var(--blue); color: #050d12; }
.l3 .layer-header { background: rgba(255,165,0,0.07); color: var(--amber); border-bottom: 1px solid rgba(255,165,0,0.18); }
.l3 .layer-num    { background: var(--amber); color: #180e00; }
.l4 .layer-header { background: rgba(199,125,255,0.07); color: var(--purple); border-bottom: 1px solid rgba(199,125,255,0.18); }
.l4 .layer-num    { background: var(--purple); color: #110520; }

/* ─── CTA ─── */
.cta-section { border-bottom: none; }
.cta-box {
  background: var(--panel); border: 1px solid var(--border2);
  border-radius: 8px; padding: 40px 36px; text-align: center;
}
.cta-label {
  font-family: var(--mono); font-size: 10px; letter-spacing: 0.2em;
  color: var(--green); margin-bottom: 14px;
}
.cta-label::before { content: '// '; }
.cta-h {
  font-family: var(--display); font-size: 26px; font-weight: 700;
  color: #fff; margin-bottom: 12px; border: none; padding: 0;
}
.cta-desc { color: var(--text-dim); max-width: 400px; margin: 0 auto 24px; font-size: 14px; }

/* ─── FOOTER ─── */
.footer {
  border-top: 1px solid var(--border); padding: 22px 0;
}
.footer-inner {
  display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
}
.footer-brand { font-family: var(--display); font-size: 13px; font-weight: 700; color: #fff; }
.footer-sep   { color: var(--border2); }
.footer-meta  { font-family: var(--mono); font-size: 10px; color: var(--text-muted); flex: 1; }
.footer-link  { font-family: var(--mono); font-size: 11px; color: var(--green); text-decoration: none; }
.footer-link:hover { text-decoration: underline; }

/* ─── RESPONSIVE ─── */
@media (max-width: 640px) {
  h1 { font-size: 44px; }
  .hero { padding: 44px 0 36px; }
  .cta-box { padding: 28px 20px; }
  .phase-row { grid-template-columns: 40px 1fr; gap: 14px; }
  .phase-num { font-size: 26px; }
  .hero-meta { gap: 16px; }
  .footer-inner { flex-direction: column; align-items: flex-start; gap: 6px; }
}
</style>
