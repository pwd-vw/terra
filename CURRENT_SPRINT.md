# CURRENT_SPRINT.md — Sprint Tracker
## Smart Longan Farm Automation — Phase 1

> อัพเดตไฟล์นี้ทุกครั้งที่ task status เปลี่ยน  
> เป็น single source of truth สำหรับ sprint progress

---

## SPRINT STATUS OVERVIEW

| Sprint | ชื่อ | Status | Start | End (Target) | Progress |
|--------|------|--------|-------|--------------|----------|
| S1 | Network + RPi + MQTT | `NOT_STARTED` | — | — | 0% |
| S2 | ESP32 Soil Nodes | `BLOCKED` | — | — | 0% |
| S3 | Weather + Pump + Valve Nodes | `BLOCKED` | — | — | 0% |
| S4 | Node-RED Automation | `BLOCKED` | — | — | 0% |
| S5 | Camera + Frigate NVR | `BLOCKED` | — | — | 0% |
| S6 | Cloudflare API + D1 | `BLOCKED` | — | — | 0% |
| S7 | React Dashboard | `BLOCKED` | — | — | 0% |
| S8 | Alerts + PWA + UAT | `BLOCKED` | — | — | 0% |

> Status: `NOT_STARTED` | `IN_PROGRESS` | `BLOCKED` | `IN_REVIEW` | `DONE`

---

## ══════════════════════════════════════
## SPRINT S1 — Network Infrastructure + RPi + MQTT Broker
## ══════════════════════════════════════

```
Status:      NOT_STARTED
Sprint Goal: ได้ local network พร้อมใช้, RPi ออนไลน์, MQTT broker ทำงาน,
             ESP32 test node ส่ง/รับ message ได้สำเร็จ
Started:     [YYYY-MM-DD]
Target End:  [YYYY-MM-DD]
Owner:       [ชื่อ]
```

### Tasks

| ID | Task | Role | Status | Assignee Session | Notes |
|----|------|------|--------|-----------------|-------|
| S1-T01 | ติดตั้ง WiFi AP #1 (อาคาร) + SSID config | OPS | `TODO` | — | |
| S1-T02 | ติดตั้ง WiFi AP #2 (กลางสวน) + coverage test | OPS | `TODO` | — | |
| S1-T03 | ตั้ง static IP ทุก device ตาม CONTEXT.md | OPS | `TODO` | — | |
| S1-T04 | Setup RPi: OS install, SSH, Docker | OPS | `TODO` | — | Ubuntu 22.04 |
| S1-T05 | SSD setup + mount /opt/longan | OPS | `TODO` | — | |
| S1-T06 | Deploy Mosquitto ใน Docker + TLS config | OPS | `TODO` | — | |
| S1-T07 | MQTT username/password + ACL rules | IMPL | `TODO` | — | |
| S1-T08 | Flash ESP32 test node: WiFi + MQTT pub/sub | IMPL | `TODO` | — | |
| S1-T09 | Test: ESP32 ส่ง heartbeat, RPi รับ verify | TEST | `TODO` | — | |
| S1-T10 | Setup UPS HAT บน RPi + test power fail | OPS | `TODO` | — | |
| S1-T11 | Document: network diagram + IP table อัพเดต | DOC | `TODO` | — | |
| S1-T12 | Setup Git repo structure + README | IMPL | `TODO` | — | |

### Definition of Done — S1
```
✓ WiFi ครอบคลุมทุกจุดในสวน (ทดสอบด้วย phone)
✓ RPi accessible via SSH จาก local network
✓ Mosquitto broker ทำงานใน Docker (docker ps shows running)
✓ ESP32 test node publish/subscribe สำเร็จ ไม่หลุดใน 1 ชั่วโมง
✓ MQTT authentication บังคับ (ไม่ anonymous)
✓ UPS ทดสอบ power cut — RPi กลับมาเองได้
✓ ทุก device assign IP ตาม plan ใน CONTEXT.md
✓ Git repo สร้างแล้ว, AGENTS.md, CONTEXT.md, GUARDRAILS.md อยู่ใน repo
```

### Sprint Log
```
[YYYY-MM-DD] [SESSION_ID]: [สิ่งที่ทำ]
```

### Blockers
```
ไม่มี
```

---

## ══════════════════════════════════════
## SPRINT S2 — ESP32 Soil Sensor Nodes ×3
## ══════════════════════════════════════

```
Status:      BLOCKED (รอ S1 DONE)
Sprint Goal: Soil sensor nodes ×3 ออนไลน์, ส่งข้อมูล moisture+temp ทุก 5 นาที,
             บันทึกลง TimescaleDB สำเร็จ
Started:     —
Target End:  —
```

### Tasks

| ID | Task | Role | Status | Notes |
|----|------|------|--------|-------|
| S2-T01 | ARCH: ออกแบบ NODE-S firmware architecture | ARCH | `TODO` | State machine, sleep cycle |
| S2-T02 | IMPL: Firmware NODE-S (WiFi+MQTT+Sensors) | IMPL | `TODO` | |
| S2-T03 | IMPL: Sensor calibration code (moisture) | IMPL | `TODO` | Map raw ADC → % |
| S2-T04 | IMPL: Deep sleep + wake schedule | IMPL | `TODO` | |
| S2-T05 | IMPL: OTA update support | IMPL | `TODO` | |
| S2-T06 | OPS: Deploy TimescaleDB ใน Docker | OPS | `TODO` | |
| S2-T07 | IMPL: TimescaleDB schema + hypertable | IMPL | `TODO` | ตาม CONTEXT.md schema |
| S2-T08 | IMPL: Node-RED flow รับ MQTT → store DB | IMPL | `TODO` | |
| S2-T09 | OPS: ติดตั้ง NODE-S ×3 ในสนามจริง | OPS | `TODO` | Solar panel setup |
| S2-T10 | TEST: Accuracy test เทียบ reference meter | TEST | `TODO` | ±5% threshold |
| S2-T11 | TEST: 24hr continuous operation test | TEST | `TODO` | |
| S2-T12 | DOC: Wiring diagram NODE-S | DOC | `TODO` | |

### Definition of Done — S2
```
✓ NODE-S ×3 ส่ง MQTT ทุก 5 นาที ไม่หลุด 24 ชั่วโมง
✓ sensor_readings table ใน TimescaleDB มีข้อมูลครบ
✓ Moisture accuracy ±5% เทียบ reference meter
✓ Deep sleep ทำงาน: current draw < 1mA ขณะ sleep
✓ WiFi reconnect อัตโนมัติ ภายใน 60 วินาที
✓ OTA update ทดสอบสำเร็จ 1 ครั้ง
✓ Calibration values บันทึกใน config.h.example
```

---

## ══════════════════════════════════════
## SPRINT S3 — Weather + Pump + Valve Nodes
## ══════════════════════════════════════

```
Status:      BLOCKED (รอ S2 DONE)
Sprint Goal: ทุก ESP32 nodes ออนไลน์ครบ, ทดสอบ pump ON/OFF จาก MQTT command
Started:     —
```

### Tasks

| ID | Task | Role | Status | Notes |
|----|------|------|--------|-------|
| S3-T01 | IMPL: Firmware NODE-W (Weather Station) | IMPL | `TODO` | |
| S3-T02 | IMPL: Firmware NODE-P (Pump Controller) | IMPL | `TODO` | SSR relay + flow meter |
| S3-T03 | IMPL: Firmware NODE-V (Zone Valves) | IMPL | `TODO` | 4-ch relay + solenoids |
| S3-T04 | IMPL: Pump safety: timeout + no-flow detection | IMPL | `TODO` | GUARDRAIL G1.1 |
| S3-T05 | OPS: Wiring pump relay circuit + test | OPS | `TODO` | Electrician required |
| S3-T06 | OPS: Install solenoid valves ×4 + drip lines | OPS | `TODO` | Plumber required |
| S3-T07 | OPS: ติดตั้ง NODE-W, NODE-P, NODE-V ในสนาม | OPS | `TODO` | |
| S3-T08 | TEST: Manual pump ON/OFF ผ่าน MQTT publish | TEST | `TODO` | |
| S3-T09 | TEST: Valve zone open/close แต่ละโซน | TEST | `TODO` | |
| S3-T10 | TEST: Pump safety timeout test (ตั้ง short duration) | TEST | `TODO` | G1.1 verification |
| S3-T11 | TEST: Flow anomaly detection test | TEST | `TODO` | ปิดท่อ simulate |

### Definition of Done — S3
```
✓ ทุก nodes (S+W+P+V) ส่ง heartbeat ครบ
✓ Pump ON/OFF ด้วย MQTT command สำเร็จ < 2 วินาที
✓ Valve zones 1-4 open/close ได้แยกกัน
✓ Pump timeout หยุดอัตโนมัติเมื่อถึงเวลา (test ด้วย 2min)
✓ No-flow detection: ส่ง alert ใน 5 นาที
✓ Weather data ครบทุก metric ใน TimescaleDB
✓ น้ำไหลถึงโคนต้นลำไยทุกต้นในทุกโซน (visual verify)
```

---

## ══════════════════════════════════════
## SPRINT S4 — Node-RED Automation Flows
## ══════════════════════════════════════

```
Status:      BLOCKED (รอ S3 DONE)
Sprint Goal: ระบบรดน้ำอัตโนมัติทำงานตามกฎ โดยไม่ต้องมีคนควบคุม
Started:     —
```

### Tasks

| ID | Task | Role | Status | Notes |
|----|------|------|--------|-------|
| S4-T01 | ARCH: Design automation rule engine architecture | ARCH | `TODO` | |
| S4-T02 | IMPL: Flow F01 — Soil Data Processor | IMPL | `TODO` | |
| S4-T03 | IMPL: Flow F02 — Irrigation Scheduler (schedule) | IMPL | `TODO` | |
| S4-T04 | IMPL: Flow F03 — Threshold Irrigation | IMPL | `TODO` | |
| S4-T05 | IMPL: Flow F04 — Pump Monitor | IMPL | `TODO` | |
| S4-T06 | IMPL: Flow F05 — Heartbeat Monitor | IMPL | `TODO` | |
| S4-T07 | IMPL: Flow F07 — Command Receiver | IMPL | `TODO` | |
| S4-T08 | IMPL: Flow F08 — Alert Dispatcher (LINE Notify) | IMPL | `TODO` | |
| S4-T09 | TEST: Schedule irrigation trigger test | TEST | `TODO` | เซ็ตเวลา 2 นาทีข้างหน้า |
| S4-T10 | TEST: Soil threshold trigger test | TEST | `TODO` | ใช้ mock value |
| S4-T11 | TEST: Rain skip logic test | TEST | `TODO` | Mock rain_mm > 5 |
| S4-T12 | TEST: Internet offline — local automation ยังทำงาน | TEST | `TODO` | G1.5 verification |
| S4-T13 | TEST: LINE Notify ได้รับแจ้งเตือน | TEST | `TODO` | |

### Definition of Done — S4
```
✓ Morning/Evening schedule trigger ตรงเวลา ±1 นาที
✓ Soil moisture < 60% → trigger irrigation อัตโนมัติ
✓ Rain > 5mm → skip irrigation + LINE notify
✓ Pump timeout safety ทำงานในทุก scenario
✓ Heartbeat alert ถ้า node หาย > 5 นาที
✓ LINE Notify ได้รับ alert ทุกประเภทที่กำหนด
✓ ระบบทำงานปกติเมื่อ internet ล่ม (local-only mode)
✓ Node-RED flows exported เป็น JSON ใน repo
```

---

## ══════════════════════════════════════
## SPRINT S5 — Camera + Frigate NVR
## ══════════════════════════════════════

```
Status:      BLOCKED (รอ S1 DONE — parallel กับ S2-S4 ได้)
Sprint Goal: กล้อง ×4 live stream ดูได้จาก local network, motion alert ทำงาน
Started:     —
```

### Tasks

| ID | Task | Role | Status | Notes |
|----|------|------|--------|-------|
| S5-T01 | OPS: ติดตั้ง IP Camera ×4 + network config | OPS | `TODO` | Static IP จาก CONTEXT.md |
| S5-T02 | OPS: Deploy Frigate NVR ใน Docker | OPS | `TODO` | |
| S5-T03 | IMPL: Frigate config.yml (cameras + detection) | IMPL | `TODO` | |
| S5-T04 | IMPL: Motion → snapshot → alert | IMPL | `TODO` | |
| S5-T05 | TEST: Live view ทุกกล้อง < 3 วินาที delay | TEST | `TODO` | |
| S5-T06 | TEST: Motion detection accuracy (ลด false positive) | TEST | `TODO` | |
| S5-T07 | TEST: Night vision (ถ่าย 22:00) | TEST | `TODO` | |

---

## ══════════════════════════════════════
## SPRINT S6 — Cloudflare API + D1 Database
## ══════════════════════════════════════

```
Status:      BLOCKED (รอ S4 DONE)
Sprint Goal: Cloud API พร้อมใช้, RPi sync ข้อมูลขึ้น CF D1, 
             remote pump control ผ่าน API ทำงาน
Started:     —
```

### Tasks

| ID | Task | Role | Status | Notes |
|----|------|------|--------|-------|
| S6-T01 | OPS: Setup Cloudflare account + domain | OPS | `TODO` | |
| S6-T02 | OPS: Setup CF Tunnel (cloudflared) บน RPi | OPS | `TODO` | |
| S6-T03 | OPS: Create CF D1 database + run schema | OPS | `TODO` | schema จาก CONTEXT.md |
| S6-T04 | IMPL: CF Worker — api-ingest (sensor data) | IMPL | `TODO` | TypeScript + Hono |
| S6-T05 | IMPL: CF Worker — api-control (pump/valve) | IMPL | `TODO` | |
| S6-T06 | IMPL: CF Worker — api-query (dashboard data) | IMPL | `TODO` | |
| S6-T07 | IMPL: Node-RED Flow F06 — hourly sync | IMPL | `TODO` | |
| S6-T08 | IMPL: CF Access setup (authentication) | IMPL | `TODO` | |
| S6-T09 | TEST: API endpoints ทุกตัว (Postman/curl) | TEST | `TODO` | |
| S6-T10 | TEST: Remote pump ON → execute บน RPi | TEST | `TODO` | End-to-end |
| S6-T11 | TEST: Data sync integrity RPi ↔ CF D1 | TEST | `TODO` | |
| S6-T12 | REV: Security review (auth, injection, secrets) | REV | `TODO` | |

---

## ══════════════════════════════════════
## SPRINT S7 — React Dashboard
## ══════════════════════════════════════

```
Status:      BLOCKED (รอ S6 DONE)
Sprint Goal: Dashboard ใช้งานได้จาก browser: ดูข้อมูล sensor, ดูกล้อง, 
             ควบคุมปั๊ม/วาล์ว, ดู alerts
Started:     —
```

### Tasks

| ID | Task | Role | Status | Notes |
|----|------|------|--------|-------|
| S7-T01 | ARCH: Dashboard component architecture | ARCH | `TODO` | |
| S7-T02 | IMPL: Project setup (React+Vite+Tailwind) | IMPL | `TODO` | Deploy CF Pages |
| S7-T03 | IMPL: Layout + navigation | IMPL | `TODO` | |
| S7-T04 | IMPL: Sensor dashboard (gauges + charts) | IMPL | `TODO` | Recharts |
| S7-T05 | IMPL: Farm map (Leaflet) + node status | IMPL | `TODO` | |
| S7-T06 | IMPL: Camera viewer (HLS player) | IMPL | `TODO` | hls.js |
| S7-T07 | IMPL: Pump + valve control panel | IMPL | `TODO` | |
| S7-T08 | IMPL: Alert history + acknowledge | IMPL | `TODO` | |
| S7-T09 | IMPL: Automation rules config UI | IMPL | `TODO` | |
| S7-T10 | IMPL: Real-time updates (WebSocket/polling) | IMPL | `TODO` | |
| S7-T11 | TEST: ทดสอบบน mobile (iOS + Android) | TEST | `TODO` | |
| S7-T12 | TEST: Control commands end-to-end | TEST | `TODO` | |
| S7-T13 | REV: UI/UX review + accessibility | REV | `TODO` | |

---

## ══════════════════════════════════════
## SPRINT S8 — Alerts + PWA + UAT → GO-LIVE
## ══════════════════════════════════════

```
Status:      BLOCKED (รอ S7 DONE)
Sprint Goal: ระบบพร้อม production, LINE alerts ทำงาน, UAT ผ่าน,
             เจ้าของสวนใช้งานได้โดยไม่มีนักพัฒนา
Started:     —
```

### Tasks

| ID | Task | Role | Status | Notes |
|----|------|------|--------|-------|
| S8-T01 | IMPL: LINE Official Account + Notify setup | IMPL | `TODO` | |
| S8-T02 | IMPL: PWA manifest + service worker | IMPL | `TODO` | |
| S8-T03 | IMPL: Push notifications (web push) | IMPL | `TODO` | |
| S8-T04 | OPS: Production deployment checklist | OPS | `TODO` | |
| S8-T05 | OPS: Backup strategy setup (RPi → R2 daily) | OPS | `TODO` | |
| S8-T06 | TEST: Full UAT — 7 วัน continuous operation | TEST | `TODO` | |
| S8-T07 | TEST: Disaster recovery drill | TEST | `TODO` | RPi crash simulate |
| S8-T08 | DOC: User manual (ภาษาไทย) | DOC | `TODO` | สำหรับเจ้าของสวน |
| S8-T09 | DOC: Operations runbook | DOC | `TODO` | สำหรับ admin |
| S8-T10 | DOC: Phase 2 planning document | DOC | `TODO` | |

### Definition of Done — S8 (Phase 1 Complete)
```
✓ ระบบทำงาน 7 วันต่อเนื่องโดยไม่มีปัญหา critical
✓ เจ้าของสวนควบคุมปั๊มจาก phone ได้
✓ LINE แจ้งเตือนทุกเหตุการณ์สำคัญ
✓ กล้องดูได้จาก phone
✓ Dashboard แสดงข้อมูล real-time ถูกต้อง
✓ User manual เข้าใจง่าย ทดสอบกับ end user จริง
✓ Backup/restore ทดสอบสำเร็จ
✓ Phase 2 plan พร้อม
```

---

## DECISION LOG QUICK REFERENCE (Phase 1)

| ID | Sprint | Decision | Status |
|----|--------|----------|--------|
| — | — | ยังไม่มี decisions | — |

> decisions เต็มอยู่ใน logs/DECISION_LOG.md

---

## ISSUE LOG QUICK REFERENCE (Phase 1)

| ID | Sprint | Issue | Severity | Status |
|----|--------|-------|----------|--------|
| — | — | ยังไม่มี issues | — | — |

> issues เต็มอยู่ใน logs/ISSUE_LOG.md

---

*อัพเดตครั้งสุดท้าย: [YYYY-MM-DD] โดย [SESSION_ID]*
