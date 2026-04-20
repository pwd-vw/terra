# TERRA — Deployment Guide
## terra.bs4u-tech.com on Cloudflare Pages

---

## 1. Prerequisites

```bash
node --version   # ≥ 18.x
npm --version    # ≥ 9.x
wrangler --version  # ≥ 3.x  (npm i -g wrangler)
```

---

## 2. First-time Setup

```bash
# Clone / copy project
cd terra-landing

# Install dependencies
npm install

# Login to Cloudflare
wrangler login

# Verify account
wrangler whoami
```

---

## 3. Local Development

```bash
npm run dev
# → http://localhost:5173
```

---

## 4. Build

```bash
npm run build
# Output: ./dist/
npm run preview   # test production build locally
```

---

## 5. Deploy to Cloudflare Pages

### First deploy (creates project)
```bash
wrangler pages project create terra
# Pages project name: terra
# Production branch: main
```

### Staging
```bash
npm run deploy:staging
# → https://terra-staging.pages.dev
```

### Production
```bash
npm run deploy:prod
# → https://terra.pages.dev (then assign custom domain)
```

---

## 6. Custom Domain Setup

In Cloudflare Dashboard:
1. Pages → terra → Custom domains
2. Add: `terra.bs4u-tech.com`
3. DNS auto-configured (CNAME → terra.pages.dev)
4. SSL: automatic via Cloudflare

---

## 7. Environment Variables (Secrets)

```bash
# Set per environment
wrangler pages secret put TERRA_API_KEY    --project-name terra
wrangler pages secret put LINE_NOTIFY_TOKEN --project-name terra
```

---

## 8. CI/CD via GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy TERRA to Cloudflare Pages
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - name: Deploy to CF Pages
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CF_API_TOKEN }}
          command: pages deploy dist --project-name terra
```

Add `CF_API_TOKEN` in GitHub repo → Settings → Secrets.

---

## 9. Project Structure (Final)

```
terra-landing/
├── public/
│   ├── _redirects          ← SPA fallback for CF Pages
│   └── terra-icon.svg
├── src/
│   ├── components/
│   │   ├── Nav.tsx
│   │   └── Footer.tsx
│   ├── lib/
│   │   └── data.ts         ← Sensor catalog, blog posts, phases
│   ├── pages/
│   │   ├── Landing.tsx     ← Main landing page (all sections)
│   │   ├── Blog.tsx        ← Blog index
│   │   ├── BlogPost.tsx    ← Individual post
│   │   ├── Lab.tsx         ← Full sensor catalog
│   │   ├── Dashboard.tsx   ← Live data (Phase 1)
│   │   ├── About.tsx
│   │   └── NotFound.tsx
│   ├── styles/
│   │   └── terra.css       ← Design system tokens + animations
│   ├── types/
│   │   └── index.ts        ← TypeScript types
│   ├── router.tsx          ← React Router config
│   └── main.tsx
├── index.html
├── vite.config.ts
├── tsconfig.json
├── wrangler.toml
└── package.json
```

---

## 10. Scaling Checklist (next steps)

- [ ] Connect Cloudflare D1 for dynamic blog posts
- [ ] Add CF Workers API (`/api/v1/sensors/latest`)
- [ ] Enable CF Analytics for page views
- [ ] Add Cloudflare Images for optimized sensor photos
- [ ] Enable CF Access for `/dashboard` route
- [ ] Add search via Cloudflare Workers AI (vector search)
