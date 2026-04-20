# PROMPTS.md — Session Starter Templates
## Smart Longan Farm Automation v1.0

> Copy-paste prompt เหล่านี้ที่ top ของ AI session ใหม่  
> แทนที่ [placeholder] ด้วยข้อมูลจริงก่อนใช้  
> ดู ROLES.md สำหรับ role prompt ที่ต้องวางต่อท้าย

---

## MASTER TEMPLATE (ใช้กับทุก session)

```
═══════════════════════════════════════════════
PROJECT: Smart Longan Farm Automation v1.0
SESSION: [YYYY-MM-DD]-[ROLE]-[NN]
ROLE: [ROLE_ID]
SPRINT: [S1–S8]
TASK: [TASK_ID] — [TASK_TITLE]
═══════════════════════════════════════════════

## CONTEXT LOADED
อ่านและเข้าใจ files ต่อไปนี้แล้ว:
- AGENTS.md: orchestration protocol, naming conventions, handoff format
- CONTEXT.md: hardware topology, MQTT schema, DB schema, API contract
- GUARDRAILS.md: safety rules, architecture constraints, code quality
- CURRENT_SPRINT.md: sprint goals, tasks, DoD
- DECISION_LOG.md: [N] decisions ที่เกี่ยวข้อง:
  [ระบุ DECISION-NNN ที่เกี่ยวกับ task นี้]

## ROLE CONSTRAINTS
[วาง role prompt จาก ROLES.md ที่ตรงกับ role นี้]

## MY TASK
Task ID: [TASK_ID]
Description: [คำอธิบาย task]

Deliverable:
- [สิ่งที่ต้อง deliver]
- [...]

Definition of Done:
- [ ] [criteria 1]
- [ ] [criteria 2]
- [ ] [...]

## RELEVANT CONTEXT
[วาง sections จาก CONTEXT.md ที่เกี่ยวกับ task เท่านั้น]

## SESSION START VERIFICATION
□ อ่าน context ครบแล้ว ✓
□ เข้าใจ deliverable แล้ว ✓
□ ตรวจ GUARDRAILS ที่เกี่ยวข้องแล้ว ✓
□ ไม่มี conflict กับ existing decisions ✓
พร้อมเริ่มงาน ✓

เริ่มต้น: [ระบุ action แรกที่จะทำ]
```

---

## SPRINT-SPECIFIC PROMPTS

### S1 — Network + RPi + MQTT

```
═══ S1: INFRASTRUCTURE SETUP ═══

Sprint Goal: ได้ local network พร้อมใช้, RPi ออนไลน์, MQTT broker ทำงาน,
             ESP32 test node ส่ง/รับ message ได้สำเร็จ

Key Constraints สำหรับ sprint นี้:
- ใช้ IP scheme ตาม CONTEXT.md Section 2 (ห้ามเบี่ยง)
- MQTT ต้องมี auth (ห้าม anonymous) → GUARDRAIL G1.3
- RPi ต้องใช้ Docker Compose สำหรับทุก service
- Git repo ต้องพร้อมก่อนจบ S1

MQTT Broker Config Template:
  Port: 1883 (local), 8883 (TLS)
  Auth: username/password (ดู .env.example)
  ACL: ESP32 nodes publish ได้เฉพาะ farm/# ของตัวเอง
       RPi Node-RED subscribe ได้ทุก farm/#
       
Hardware ที่ต้องการสำหรับ S1:
  - Raspberry Pi 4B พร้อม SSD
  - TP-Link EAP (Outdoor AP) ×2
  - Switch หรือ patch panel
  - ESP32 DevKit (1 ตัว สำหรับ test)
```

---

### S2 — ESP32 Soil Sensor Nodes

```
═══ S2: ESP32 SOIL SENSOR FIRMWARE ═══

Sprint Goal: NODE-S ×3 ส่งข้อมูล soil moisture + temperature ทุก 5 นาที
             บันทึกลง TimescaleDB โดยอัตโนมัติ

MQTT Topic สำหรับ NODE-S (FROZEN):
  Publish: farm/soil/{node_id}/data
  Payload: {"moisture_pct": 65.2, "temp_c": 28.5, "ec_us": 0, "timestamp": "2024-03-15T07:00:00Z"}
  Publish: farm/{device_id}/heartbeat
  Payload: {"uptime_sec": 3600, "rssi_dbm": -65, "vcc_mv": 3720, "fw_version": "1.0.0", "timestamp": "..."}

Node IDs:
  node_01 → โซนทิศเหนือ
  node_02 → โซนกลาง
  node_03 → โซนทิศใต้

Calibration Required:
  Raw ADC 0 (dry) → 0% moisture
  Raw ADC 4095 (wet/submerged) → 100% moisture
  ทดสอบด้วยดินแห้ง/ดินเปียก ก่อน calibrate

Power Budget (solar node):
  Active: ~150mA @ 3.3V
  Deep sleep: <1mA
  Wake interval: 5 นาที (300 วินาที)
  ทุก wake: read sensors → publish MQTT → sleep
  
Libraries:
  - PubSubClient (MQTT)
  - ArduinoJson 6.x
  - OneWire + DallasTemperature (DS18B20)
  - esp_deep_sleep (ESP-IDF)
```

---

### S3 — Weather + Pump + Valve Nodes

```
═══ S3: ACTUATOR NODES FIRMWARE ═══

Sprint Goal: ทุก nodes ออนไลน์, pump ON/OFF ด้วย MQTT command ทำงานได้

CRITICAL SAFETY — ต้องทำก่อน deployment:
1. Pump Safety Timeout (GUARDRAIL G1.1):
   max_runtime_sec = 14400 (4 hours)
   ถ้า runtime เกิน → force stop + publish alert
   
2. No-Flow Protection:
   ถ้า pump ON แต่ flow_lph < 5 นาน 5 นาที → stop + alert
   
3. Relay Debounce:
   ห้าม switch pump เร็วกว่า 30 วินาที (GUARDRAIL G6.5)

MQTT Commands สำหรับ NODE-P:
  Subscribe: farm/pump/main/cmd
  Payload: {"action": "on", "duration_min": 30, "source": "schedule"}
  Publish:  farm/pump/main/status
  Payload: {"state": "running", "flow_lph": 1200, "pressure_bar": 2.1, 
             "runtime_sec": 180, "timestamp": "..."}

MQTT Commands สำหรับ NODE-V:
  Subscribe: farm/valve/{zone_id}/cmd
  Payload: {"action": "open", "duration_min": 20, "source": "auto"}
  Zone IDs: zone_01|zone_02|zone_03|zone_04

Electrical Safety Note:
  ถ้าปั๊มเป็น 3-phase → ต้องใช้ 3-phase SSR หรือ contactor
  ถ้าปั๊มเป็น single-phase → SSR 40A เพียงพอสำหรับ ≤1HP
  ต้องมี fuse/circuit breaker ก่อน SSR เสมอ
```

---

### S4 — Node-RED Automation

```
═══ S4: NODE-RED AUTOMATION FLOWS ═══

Sprint Goal: ระบบรดน้ำอัตโนมัติทำงานตามกฎ โดยไม่ต้องมีคนควบคุม

Flow Architecture (8 flows ตาม CONTEXT.md Section 6):
  F01: Soil Data Processor ← เริ่มก่อน
  F02: Irrigation Scheduler
  F03: Threshold Irrigation
  F04: Pump Monitor
  F05: Heartbeat Monitor
  F06: Cloud Sync (รอ S6)
  F07: Command Receiver (รอ S6)
  F08: Alert Dispatcher

Default Automation Rules (ตาม CONTEXT.md Section 7):
  [รายละเอียดอยู่ใน CONTEXT.md — อ่านก่อนเขียน flows]

Testing Strategy:
  - ใช้ Node-RED inject node แทน real sensor สำหรับ logic test
  - ใช้ debug node trace ทุก decision point
  - ตั้ง schedule เวลา 2 นาทีข้างหน้า แทน 06:00/17:00 สำหรับ test

Local-Only Mode (GUARDRAIL G1.5):
  Flows F01–F05, F08 ต้องทำงานได้โดยไม่มี internet
  ห้าม depend on CF API สำหรับ automation decisions
```

---

### S5 — Camera + Frigate

```
═══ S5: CAMERA SYSTEM ═══

Sprint Goal: กล้อง ×4 live stream + motion detection + snapshot to alert

Camera Placement:
  cam_01 (192.168.10.30): ทางเข้าสวน
  cam_02 (192.168.10.31): กลางสวน (overview)
  cam_03 (192.168.10.32): แปลงต้นลำไย zone A
  cam_04 (192.168.10.33): บริเวณปั๊ม + ถังน้ำ

Frigate Config Key Points:
  - RTSP URLs: rtsp://admin:[password]@192.168.10.3X:554/stream
  - Detection: person, animal (ลด false positive จาก motion ลม)
  - Snapshot: บันทึกเมื่อ detect, upload → CF R2 path: snapshots/YYYY/MM/DD/cam_0X/
  - Recording: local (RPi SSD) 7 วัน rolling

Object Detection:
  - ใช้ CPU inference (ไม่ต้องมี GPU สำหรับ Phase 1)
  - Model: YOLOv8n (nano) — เพียงพอสำหรับ RPi 4
  - ปรับ min_score: 0.6 เพื่อลด false positive
```

---

### S6 — Cloudflare API

```
═══ S6: CLOUDFLARE WORKERS + D1 ═══

Sprint Goal: Cloud API พร้อม, RPi sync data ขึ้น CF, remote control ทำงาน

Wrangler Setup:
  wrangler init longan-api
  wrangler d1 create longan-db
  wrangler secret put INGEST_API_KEY    # RPi auth key
  wrangler secret put ADMIN_API_KEY     # admin key

Worker Structure:
  src/
    index.ts          # Hono app entry
    routes/
      ingest.ts       # POST /api/v1/ingest/*
      control.ts      # POST /api/v1/control/*
      query.ts        # GET /api/v1/sensors/*
      rules.ts        # CRUD /api/v1/rules
      status.ts       # GET /api/v1/status
    middleware/
      auth.ts         # API key validation
      validation.ts   # Zod schemas
    db/
      schema.ts       # D1 queries

CF Tunnel Setup (on RPi):
  cloudflared tunnel create longan-tunnel
  cloudflared tunnel route dns longan-tunnel api.yourdomain.com
  # config.yml: expose localhost:1880 (Node-RED) + localhost:3000 (internal)

Security Checklist (GUARDRAIL G7):
  □ /api/v1/ingest: X-API-Key header (RPi key)
  □ /api/v1/control: CF Access (user auth)
  □ /api/v1/query: CF Access (user auth)
  □ Input validation บน ทุก endpoint (Zod)
  □ Rate limiting บน ingest endpoint
```

---

### S7 — React Dashboard

```
═══ S7: REACT DASHBOARD ═══

Sprint Goal: Dashboard ครบ: sensor graphs, camera viewer, pump control, alerts

Tech Stack:
  React + Vite + TypeScript
  Tailwind CSS (utility-first)
  Recharts (sensor charts)
  React Query / TanStack Query (data fetching)
  Leaflet.js (farm map)
  hls.js (camera HLS player)
  Deploy: Cloudflare Pages

Key Pages:
  /              → Overview dashboard (sensor summary + alerts)
  /sensors       → Detailed sensor graphs (24hr, 7d, 30d)
  /cameras       → Camera grid view
  /control       → Pump + valve control panel
  /map           → Farm map with node status
  /alerts        → Alert history + acknowledge
  /settings      → Automation rules config

API Integration:
  Base URL: https://longan-api.[domain].com
  Auth: CF Access (cookies-based, automatic)
  Real-time: polling every 30 sec (WebSocket ใน S9 Phase 2)
  
UI/UX Requirements:
  - Mobile-first (ใช้จาก phone ในสวน)
  - ควบคุมปั๊มต้องมี confirmation dialog
  - Sensor values แสดง unit ชัดเจน (%, °C, L/hr)
  - Status indicators: online/offline ทุก device
  - ภาษาไทยสำหรับ labels หลัก
```

---

### S8 — UAT & Go-Live

```
═══ S8: UAT & GO-LIVE ═══

Sprint Goal: Phase 1 complete, system ready for daily operation

UAT Scenarios (ทดสอบกับ end user จริง):
  UAT-01: เปิด/ปิดปั๊มจาก phone → ปั๊มทำงานจริง
  UAT-02: ดูกล้อง cam_01 จาก 4G (นอก WiFi) → เห็น live feed
  UAT-03: ปล่อยทิ้ง 24hr → ข้อมูล sensor ต่อเนื่อง ไม่ขาด
  UAT-04: ตัด WiFi AP 5 นาที → ESP32 reconnect เอง
  UAT-05: ตัด internet 1 ชั่วโมง → irrigation ยังทำงาน (local)
  UAT-06: ดึงปลั๊ก RPi → reboot เอง, services กลับมาเอง
  UAT-07: ดินแห้งต่ำกว่า threshold → รดน้ำอัตโนมัติ + LINE แจ้ง
  UAT-08: ฝนตก (simulate) → skip irrigation + LINE แจ้ง

Go-Live Checklist:
  □ UAT-01 ถึง UAT-08 ผ่านทั้งหมด
  □ Backup strategy ทำงาน (backup ขึ้น R2 สำเร็จ)
  □ User manual ส่งให้เจ้าของสวนแล้ว
  □ Emergency contacts และ manual override สอนแล้ว
  □ Phase 2 planning document พร้อม
  □ Monitoring alerts ตั้งค่าแล้ว (CF อีเมลหรือ LINE)
```

---

## INTER-SESSION HANDOFF TEMPLATE (copy ทุกครั้ง)

```
════════════════════════════════════════
SESSION HANDOFF
════════════════════════════════════════
Session ID:  [YYYY-MM-DD]-[ROLE]-[NN]
Date/Time:   [YYYY-MM-DD HH:MM +07:00]
Role:        [ROLE_ID]
Sprint:      [SPRINT_ID]
Task:        [TASK_ID] — [TASK_TITLE]
════════════════════════════════════════

### ✅ COMPLETED THIS SESSION
- [รายการที่ทำสำเร็จ — เฉพาะจริง]

### ⚠️ PARTIAL / BLOCKED
- [งานที่ยังไม่เสร็จ + เหตุผล]
- BLOCKED: [เหตุผลถ้า blocked]

### 📁 FILES CHANGED
- [path/to/file.ext] — [สิ่งที่เปลี่ยน]

### 🧠 DECISIONS MADE (บันทึกใน DECISION_LOG แล้ว)
- [DECISION-NNN]: [หัวข้อ] → [ผล]

### ⛔ ISSUES FOUND (บันทึกใน ISSUE_LOG แล้ว)
- [ISSUE-NNN]: [หัวข้อ] — [สถานะ]

### 📋 NEXT SESSION MUST DO
1. [action ที่ต้องทำต่อ]
2. [...]
Role needed: [ROLE_ID]
Task ID: [TASK_ID ถ้ามี]

### 💬 CRITICAL NOTE FOR NEXT SESSION
[ข้อความสำคัญที่ต้องรู้ก่อนเริ่มงาน]
════════════════════════════════════════
```

---

*PROMPTS.md v1.0 — อัพเดตเมื่อเริ่ม Phase ใหม่*
