<!-- TERRA README — bs4u-tech/terra -->

<div align="center">

```
████████╗███████╗██████╗ ██████╗  █████╗
╚══██╔══╝██╔════╝██╔══██╗██╔══██╗██╔══██╗
   ██║   █████╗  ██████╔╝██████╔╝███████║
   ██║   ██╔══╝  ██╔══██╗██╔══██╗██╔══██║
   ██║   ███████╗██║  ██║██║  ██║██║  ██║
   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝
```

**T**elemetry · **E**nvironment · **R**esearch · **R**eal-time · **A**nalytics

[![Cloudflare Pages](https://img.shields.io/badge/Deployed_on-Cloudflare_Pages-F38020?style=flat-square&logo=cloudflare&logoColor=white)](https://terra.bs4u-tech.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![ESP32](https://img.shields.io/badge/ESP32-Arduino-E7352C?style=flat-square&logo=arduino&logoColor=white)](https://www.arduino.cc/)
[![Raspberry Pi](https://img.shields.io/badge/Raspberry_Pi-5-A22846?style=flat-square&logo=raspberrypi&logoColor=white)](https://www.raspberrypi.com/)

**Open sensor platform สำหรับ IoT, เกษตร, วิจัย และอุตสาหกรรม**

[🌐 Live Site](https://terra.bs4u-tech.com) · [📝 Blog](https://terra.bs4u-tech.com/blog) · [📊 Dashboard](https://terra.bs4u-tech.com/dashboard) · [🧪 Sensor Lab](https://terra.bs4u-tech.com/lab)

</div>

---

## 🌱 What is TERRA?

TERRA คือ **open sensor platform** ที่เริ่มต้นจากการทดลอง sensor บน Raspberry Pi 5 และ ESP32 แล้วขยายสู่ระบบเก็บข้อมูลสภาพดิน อากาศ และสิ่งแวดล้อม — ตั้งแต่ tutorial สำหรับมือใหม่ไปจนถึง ML pipeline สำหรับงานวิจัย

```
Sensor ──→ ESP32 Node ──→ MQTT Broker ──→ Raspberry Pi 5
                                               │
                                        Node-RED + TimescaleDB
                                               │
                                        Cloudflare Tunnel
                                               │
                              CF Workers + D1 + R2 + Pages
                                               │
                              terra.bs4u-tech.com/dashboard
```

> **"From dirt to dashboard"** — ข้อมูลเดินทางจาก sensor ในดิน ถึง browser ของคุณ

---

## ✨ Features

| Feature | Status | Description |
|---------|--------|-------------|
| 🌡️ Sensor Tutorials | ✅ Active | 18 episodes, code + wiring diagram ทุกตัว |
| 📡 MQTT Pipeline | ✅ Active | ESP32 → Mosquitto → Node-RED → TimescaleDB |
| 🌐 Landing Page | ✅ Active | React + Vite + TypeScript บน Cloudflare Pages |
| 📝 Blog | 🔄 Building | Tutorial articles ภาษาไทย + English |
| 📊 Dashboard | 🔜 Phase 1 | Real-time sensor data visualization |
| 🤖 Edge AI | 🔜 Phase 3 | TFLite inference บน ESP32-S3 + RPi5 |

---

## 🗂️ Repository Structure

```
terra/
├── 📁 landing/               # Web frontend (terra.bs4u-tech.com)
│   ├── src/
│   │   ├── pages/            # Landing, Blog, Lab, Dashboard, About
│   │   ├── components/       # Nav, Footer (shared)
│   │   ├── lib/data.ts       # Static catalog data
│   │   ├── types/            # TypeScript interfaces
│   │   ├── styles/terra.css  # Design system tokens
│   │   └── router.tsx        # React Router v6
│   ├── public/_redirects     # CF Pages SPA fallback
│   ├── wrangler.toml         # Cloudflare deployment config
│   └── package.json
│
├── 📁 firmware/              # ESP32 Arduino firmware
│   ├── node_soil_01/         # Soil sensor node (KS0510)
│   ├── node_weather_01/      # Weather station (DHT22 + BMP280)
│   ├── node_pump_01/         # Pump controller
│   ├── node_valve_01/        # Zone valve controller
│   └── shared/               # Common WiFi, MQTT, OTA helpers
│
├── 📁 gateway/               # Raspberry Pi 5 services
│   ├── docker-compose.yml    # Mosquitto + Node-RED + TimescaleDB + Frigate
│   ├── nodered-flows/        # Exported Node-RED flow JSONs
│   └── scripts/              # Setup & deployment shell scripts
│
├── 📁 workers/               # Cloudflare Workers (API)
│   ├── api-ingest/           # POST /api/v1/ingest/*
│   ├── api-control/          # POST /api/v1/control/*
│   └── api-query/            # GET  /api/v1/sensors/*
│
├── 📁 notebooks/             # Jupyter Notebooks (open dataset analysis)
│   ├── soil-showdown/        # 4-sensor comparison EP12–15
│   └── dht-accuracy/         # DHT11 vs DHT22 EP07
│
├── 📁 docs/                  # Project documentation
│   ├── AGENTS.md             # Multi-AI session orchestration
│   ├── CONTEXT.md            # Technical context (schema, API)
│   ├── GUARDRAILS.md         # Development constraints
│   └── sprints/              # Sprint tracking
│
└── 📄 README.md              # This file
```

---

## 🔧 Hardware

### Development Boards

| Board | Model | Role | Qty |
|-------|-------|------|-----|
| Raspberry Pi 5 | 8GB RAM | Central Hub / ML Gateway | 1 |
| Raspberry Pi 5 | 2GB RAM | Tutorial / Demo board | 1 |
| ESP32 WROOM-32D | KS0413 | Field sensor node | 5 |
| ESP32 Mini | KS5019 | Compact prototype | 5 |
| ESP32-S3 CAM | MB0184 (N16R8) | Vision / Time-lapse | 5 |
| ESP32-S3 AI Smartie | MD0750 (N16R8) | Edge AI inference | 5 |

### Sensor Catalog (18 models)

<details>
<summary>🌱 Soil Sensors (4 models)</summary>

| Model | Name | Type | Tutorial |
|-------|------|------|----------|
| KS0049 | Soil Humidity Sensor | Resistive Analog | EP06 |
| KS0108 | EASY Plug Soil Humidity | Easy Plug Analog | EP06 |
| KS0471 | Honeycomb Soil Sensor | Analog + I2C | EP13 |
| **KS0510** | **New Type Soil Humidity** | **Capacitive ★** | **EP14** |

> KS0510 คือ **TERRA production sensor** — ไม่กัดกร่อน ใช้งานยาว

</details>

<details>
<summary>🌡️ Environment Sensors (3 models)</summary>

| Model | Name | Accuracy | Tutorial |
|-------|------|----------|----------|
| KS0034 | DHT11 Temp & Humidity | ±2°C / ±5%RH | EP05 |
| **KS0430** | **DHT22 / AM2302** | **±0.5°C / ±2%RH ★** | **EP07** |
| KS0405 | BMP280 Temp & Pressure | ±1°C / ±1 hPa | EP08 |

</details>

<details>
<summary>⚡ Motion & Physical (4 models)</summary>

| Model | Name | Interface | Tutorial |
|-------|------|-----------|----------|
| KS0021 | Collision Sensor | Digital | EP02 |
| KS0025 | Digital Tilt Sensor | Digital | EP03 |
| KS0375 | SR01 Ultrasonic | Trigger/Echo | EP09 |
| KS6044 | Vibration Motor | Digital Out | EP04 |

</details>

<details>
<summary>💡 Optical & IR (3 models)</summary>

| Model | Name | Interface | Tutorial |
|-------|------|-----------|----------|
| KS6008 | LED Traffic Light | Digital Out | EP04 |
| KS6036 | IR Receiver (STEM) | 38kHz Demod | EP10 |
| KS6037 | IR Transmitter | Digital Out | EP10 |

</details>

---

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/bs4u-tech/terra.git
cd terra
```

### 2. Landing Page (local dev)

```bash
cd landing
npm install
npm run dev
# → http://localhost:5173
```

### 3. ESP32 Firmware (soil node example)

```bash
# Arduino IDE: open firmware/node_soil_01/node_soil_01.ino
# 1. Copy firmware/shared/ to your Arduino libraries folder
# 2. Edit config.h (WiFi credentials, MQTT broker IP)
# 3. Upload to ESP32
```

`firmware/node_soil_01/config.h`:
```cpp
// WiFi
#define WIFI_SSID     "your-ssid"
#define WIFI_PASSWORD "your-password"

// MQTT Broker (Raspberry Pi IP)
#define MQTT_HOST     "192.168.10.10"
#define MQTT_PORT     1883
#define MQTT_USER     "terra"
#define MQTT_PASS     "your-mqtt-password"

// Node identity
#define NODE_ID       "node_01"
#define ZONE_ID       "zone_01"

// Thresholds
#define SOIL_DRY_THRESHOLD   40   // % → trigger irrigation
#define SOIL_WET_THRESHOLD   80   // % → stop irrigation
#define PUBLISH_INTERVAL_MS  300000  // 5 minutes
```

### 4. Raspberry Pi Gateway

```bash
cd gateway

# Copy and configure environment
cp .env.example .env
nano .env   # Set MQTT_PASSWORD, DB_PASSWORD, LINE_TOKEN

# Start all services
docker compose up -d

# Verify services
docker compose ps
```

Services started:
- **Mosquitto** MQTT broker → `localhost:1883`
- **Node-RED** → `http://localhost:1880`
- **TimescaleDB** → `localhost:5432`
- **Frigate NVR** → `http://localhost:5000`
- **cloudflared** → tunnel to `terra.bs4u-tech.com`

### 5. Deploy to Cloudflare Pages

```bash
cd landing
npm run build
npx wrangler pages deploy dist --project-name terra
```

---

## 📡 MQTT Topic Schema

```
farm/{subsystem}/{node_id}/{message_type}
```

| Topic | Direction | QoS | Description |
|-------|-----------|-----|-------------|
| `farm/soil/{node_id}/data` | ESP32 → RPi | 1 | `{moisture_pct, temp_c, ec_us, timestamp}` |
| `farm/weather/station_01/data` | ESP32 → RPi | 1 | `{temp_c, humidity_pct, rain_mm, light_lux}` |
| `farm/pump/main/cmd` | RPi → ESP32 | 2 | `{action: "on"\|"off", duration_min}` |
| `farm/pump/main/status` | ESP32 → RPi | 1 | `{state, flow_lph, pressure_bar, runtime_sec}` |
| `farm/valve/{zone_id}/cmd` | RPi → ESP32 | 2 | `{action: "open"\|"close", duration_min}` |
| `farm/alert/{severity}/{type}` | RPi → Cloud | 2 | `{message, node_id, value, threshold}` |
| `farm/{device_id}/heartbeat` | ESP32 → RPi | 0 | `{uptime_sec, rssi_dbm, vcc_mv, fw_version}` |

> ⚠️ Topic schema is **frozen** after Sprint S1. Changes require a DECISION log entry.

---

## 🗃️ Database Schema

### TimescaleDB (Raspberry Pi — local)

```sql
-- Time-series sensor readings (hypertable)
CREATE TABLE sensor_readings (
  time       TIMESTAMPTZ NOT NULL,
  node_id    TEXT NOT NULL,
  node_type  TEXT NOT NULL,
  metric     TEXT NOT NULL,
  value      DOUBLE PRECISION NOT NULL,
  unit       TEXT,
  quality    SMALLINT DEFAULT 1   -- 1=good, 0=suspect, -1=bad
);
SELECT create_hypertable('sensor_readings', 'time');

-- Irrigation event log
CREATE TABLE irrigation_events (
  id              SERIAL PRIMARY KEY,
  start_time      TIMESTAMPTZ NOT NULL,
  end_time        TIMESTAMPTZ,
  zone_id         TEXT NOT NULL,
  trigger         TEXT NOT NULL,  -- schedule|threshold|manual|ai
  duration_min    INTEGER,
  volume_l        DOUBLE PRECISION,
  moisture_before DOUBLE PRECISION,
  moisture_after  DOUBLE PRECISION
);
```

### Cloudflare D1 (Cloud — mirror + config)

```sql
-- Hourly aggregates synced from RPi
CREATE TABLE sensor_hourly_avg (
  date_hour    TEXT NOT NULL,
  node_id      TEXT NOT NULL,
  metric       TEXT NOT NULL,
  avg_value    REAL,
  min_value    REAL,
  max_value    REAL,
  sample_count INTEGER,
  PRIMARY KEY (date_hour, node_id, metric)
);

-- Automation rules (source of truth)
CREATE TABLE automation_rules (
  rule_id        TEXT PRIMARY KEY,
  name           TEXT NOT NULL,
  enabled        BOOLEAN DEFAULT TRUE,
  trigger_type   TEXT NOT NULL,
  trigger_config TEXT NOT NULL,   -- JSON
  action_type    TEXT NOT NULL,
  action_config  TEXT NOT NULL,   -- JSON
  priority       INTEGER DEFAULT 50
);
```

---

## 🗺️ Development Roadmap

```
Phase 0 ████████████░░░░░░░░  เดือน 1–2   Foundation Lab
Phase 1 ░░░░░░░░░░░░░░░░░░░░  เดือน 3–4   Protocols & MQTT Pipeline
Phase 2 ░░░░░░░░░░░░░░░░░░░░  เดือน 5–6   Soil Intelligence
Phase 3 ░░░░░░░░░░░░░░░░░░░░  เดือน 7–8   Vision & Edge AI
```

### Phase 0 — Foundation Lab *(Active)*

- [x] Project setup (landing page, repo structure)
- [ ] EP01: RPi5 vs ESP32 intro
- [ ] EP02: Collision sensor
- [ ] EP03: Tilt sensor
- [ ] EP04: LED Traffic Light + Vibration Motor
- [ ] EP05: DHT11 first humidity reading
- [ ] EP06: Soil resistive sensor

### Phase 1 — Protocols & Precision

- [ ] EP07: DHT11 vs DHT22 comparison (24hr Grafana)
- [ ] EP08: BMP280 I2C (pressure + altitude)
- [ ] EP09: Ultrasonic water level
- [ ] EP10: IR transmitter + receiver pair
- [ ] EP11: **Full TERRA pipeline** (ESP32 → MQTT → RPi → Dashboard)
- [ ] Live dashboard deployment

### Phase 2 — Soil Intelligence

- [ ] EP12–15: **Soil Showdown** — 4 sensors in real field (7 days)
- [ ] Open dataset release (Kaggle + GitHub)
- [ ] Jupyter notebook analysis
- [ ] EP16: Complete TERRA field node v1.0

### Phase 3 — Vision & Edge AI

- [ ] EP17: ESP32-S3 CAM time-lapse
- [ ] EP18: TFLite on-device plant disease detection
- [ ] Edge Impulse model training guide
- [ ] TERRA AI Phase 3 preview

---

## 📹 Content Series

| Episode | Title | Board | Phase | Links |
|---------|-------|-------|-------|-------|
| EP01 | RPi5 vs ESP32 — เลือกบอร์ดไหน? | Both | P0 | — |
| EP05 | DHT11 — วัดอุณหภูมิครั้งแรก | Both | P0 | — |
| EP06 | Soil Humidity (Resistive) | ESP32 | P0 | — |
| **EP07** | **DHT11 vs DHT22 Accuracy Battle** ⭐ | RPi5 | P1 | — |
| EP09 | Ultrasonic Water Level | Both | P1 | — |
| **EP11** | **Full TERRA Pipeline Demo** ⭐ | Both | P1 | — |
| **EP12–15** | **Soil Showdown Series** ⭐⭐ | ESP32 ×4 | P2 | — |
| EP17 | ESP32-S3 CAM Time-lapse | S3 CAM | P3 | — |
| EP18 | TFLite Plant Disease Detection | S3 AI | P3 | — |

> Full episode guide: [terra.bs4u-tech.com/blog](https://terra.bs4u-tech.com/blog)

---

## 🛠️ Tech Stack

### Edge (Field)

```
ESP32 WROOM-32D / Mini / S3
├── Firmware: Arduino IDE / ESP-IDF
├── MQTT:     PubSubClient library
├── Payload:  ArduinoJson 6.x
├── Power:    Deep sleep + solar panel
└── OTA:      ArduinoOTA / ESP-IDF OTA
```

### Gateway (Raspberry Pi 5)

```
Ubuntu Server 22.04 + Docker Compose
├── Mosquitto       MQTT broker (TLS + ACL)
├── Node-RED        Automation rule engine
├── TimescaleDB     Time-series database (PostgreSQL)
├── Frigate NVR     Camera AI (object detection)
└── cloudflared     Cloudflare Tunnel daemon
```

### Cloud (Cloudflare)

```
terra.bs4u-tech.com
├── CF Pages        React + Vite frontend
├── CF Workers      TypeScript REST API (Hono framework)
├── CF D1           SQLite edge database
├── CF R2           Object storage (snapshots, ML models)
├── CF Tunnel       Zero-trust ingress (no public IP)
└── CF Access       Authentication for dashboard
```

### Dashboard & Analytics

```
Frontend:   React 18 + TypeScript + Vite
Charting:   Recharts
Maps:       Leaflet.js
Camera:     HLS.js
ML (Phase 3): TensorFlow Lite, Edge Impulse, Python/Pandas
```

---

## 🔒 Security

- **MQTT**: TLS + username/password authentication, per-device ACL
- **API**: CF Access (Zero-Trust) for dashboard, API key for RPi ingest
- **Tunnel**: Cloudflare Tunnel — no open ports on RPi
- **OTA**: firmware signed + tested on dev unit before production flash
- **Secrets**: `.env` files never committed (`.gitignore`), CF secrets via `wrangler secret put`

See [`docs/GUARDRAILS.md`](docs/GUARDRAILS.md) for full security constraints.

---

## 🤝 Contributing

TERRA เป็น open source project ยินดีรับ contribution ทุกรูปแบบ

### How to contribute

```bash
# Fork and clone
git clone https://github.com/YOUR_USERNAME/terra.git
cd terra

# Create feature branch
git checkout -b feature/S2-T3-soil-calibration

# Commit format
git commit -m "[S2][T3] feat: add soil moisture calibration function"

# Push and open PR
git push origin feature/S2-T3-soil-calibration
```

### Commit Types

| Type | ใช้เมื่อ |
|------|---------|
| `feat` | เพิ่ม feature ใหม่ |
| `fix` | แก้ bug |
| `refactor` | ปรับโครงสร้าง code |
| `test` | เพิ่ม/แก้ test |
| `docs` | อัพเดต documentation |
| `config` | แก้ไข config files |
| `deploy` | deployment-related changes |

### What we need

- 🔬 **Sensor calibration data** — ผลการทดลอง sensor ในสภาพแวดล้อมต่างๆ
- 🌿 **Crop-specific thresholds** — ค่า moisture threshold สำหรับพืชแต่ละชนิด
- 🌏 **Translations** — English tutorials จาก Thai articles
- 🐛 **Bug reports** — [Open an issue](https://github.com/bs4u-tech/terra/issues)

---

## 📄 License

MIT License — ใช้งานได้ฟรี ทั้ง personal และ commercial

```
Copyright (c) 2024–2025 bs4u-tech.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

See [LICENSE](LICENSE) for full text.

---

## 📬 Contact & Links

| Channel | Link |
|---------|------|
| 🌐 Website | [terra.bs4u-tech.com](https://terra.bs4u-tech.com) |
| 🏢 Parent | [bs4u-tech.com](https://bs4u-tech.com) |
| 📺 YouTube | [@bs4u-tech](https://youtube.com/@bs4u-tech) |
| 🎵 TikTok | [@bs4u_tech](https://tiktok.com/@bs4u_tech) |
| 💬 Facebook | [bs4u-tech](https://facebook.com/bs4u-tech) |
| 🐙 GitHub | [github.com/bs4u-tech/terra](https://github.com/bs4u-tech/terra) |

---

<div align="center">

**TERRA** is built with 🌱 in Chiang Mai, Thailand

*Telemetry · Environment · Research · Real-time · Analytics*

[terra.bs4u-tech.com](https://terra.bs4u-tech.com)

</div>