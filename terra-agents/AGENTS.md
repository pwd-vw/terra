# AGENTS.md — Smart Longan Farm Automation System
## Multi-AI Session Orchestration Protocol v1.0

> **PURPOSE:** ไฟล์นี้คือ "สัญญา" ระหว่าง AI sessions ทุกตัว  
> ทุก session ใหม่ **ต้องอ่านไฟล์นี้ก่อนเสมอ** และต้องอัพเดตก่อน handoff  
> ห้ามข้ามขั้นตอน ห้ามสมมติสิ่งที่ไม่ได้บันทึกไว้

---

## 1. PROJECT IDENTITY

```yaml
project_name: Smart Longan Farm Automation
version: 1.0.0
owner: [ระบุชื่อเจ้าของโครงการ]
repo: [URL GitHub repo]
blueprint_ref: smart-longan-blueprint.html
started: [YYYY-MM-DD]
timezone: Asia/Bangkok (UTC+7)

hardware:
  gateway: Raspberry Pi 4B 4GB
  edge: ESP32 WROOM-32
  cameras: IP Camera RTSP ×4
  pump: Submersible (บาดาล)
  irrigation: Drip system, 4 zones

stack:
  edge_firmware: Arduino/ESP-IDF + PubSubClient
  gateway_os: Ubuntu Server 22.04 + Docker
  gateway_services: [Mosquitto, Node-RED, TimescaleDB, Frigate, cloudflared]
  cloud: Cloudflare [Workers, D1, R2, Pages, Stream, Tunnel]
  dashboard: React + Vite + Recharts
  language_primary: TypeScript (CF Workers, Dashboard)
  language_secondary: Python (ML pipeline), C++ (ESP32)
```

---

## 2. AGENT ROLES

### 2.1 Role Registry

| Role ID | ชื่อ | หน้าที่หลัก | ห้ามทำ |
|---------|------|-------------|--------|
| `ARCH` | System Architect | ตัดสินใจ design, schema, protocol | เขียน production code |
| `IMPL` | Implementer | เขียน code, config, flash firmware | เปลี่ยน architecture โดยไม่ผ่าน ARCH |
| `TEST` | QA Tester | เขียน test, verify deliverable, report bugs | แก้ code โดยตรง |
| `DOC` | Documenter | อัพเดต docs, decision log, status | ตัดสินใจ technical |
| `REV` | Reviewer | Code review, security check | merge หรือ deploy โดยตรง |
| `OPS` | DevOps/Deploy | Deploy, infrastructure, monitoring | เปลี่ยน business logic |

### 2.2 Session Role Assignment

เมื่อเริ่ม session ใหม่ ให้ระบุ role ใน session prompt:
```
ROLE: [ARCH|IMPL|TEST|DOC|REV|OPS]
SESSION_ID: [YYYY-MM-DD]-[role]-[sequence]  # e.g. 2024-03-15-IMPL-03
SPRINT: S[N]
TASK_ID: [TASK_ID จาก SPRINT_STATUS.md]
```

---

## 3. SHARED CONTEXT (โหลดทุก session)

### 3.1 Context Loading Order

```
1. AGENTS.md          ← ไฟล์นี้ (อ่านทั้งหมด)
2. CONTEXT.md         ← Project context + ข้อตกลงทางเทคนิค
3. GUARDRAILS.md      ← กฎที่ห้ามละเมิด
4. sprints/CURRENT_SPRINT.md  ← สถานะ sprint ปัจจุบัน
5. logs/DECISION_LOG.md       ← การตัดสินใจที่ผ่านมา (อ่าน 30 entries ล่าสุด)
6. [ไฟล์เฉพาะ task ที่รับมอบหมาย]
```

### 3.2 Minimum Context Prompt (วาง top ของทุก session)

```markdown
## SESSION BOOTSTRAP
- Project: Smart Longan Farm Automation v1.0
- Role: [ROLE_ID]
- Session: [SESSION_ID]
- Sprint: [SPRINT_ID]
- Task: [TASK_ID] — [TASK_TITLE]

### Current Sprint Goal
[คัดลอกจาก CURRENT_SPRINT.md → section "Sprint Goal"]

### Relevant Decisions (สำคัญ)
[คัดลอก decisions ที่เกี่ยวกับ task จาก DECISION_LOG.md]

### My Deliverable
[คัดลอก deliverable ของ task นี้]

### Definition of Done
[คัดลอก DoD ของ task นี้]

อ่านและเข้าใจ context ข้างต้นแล้ว เริ่มทำงาน task ที่ได้รับมอบหมาย
```

---

## 4. PHASE & SPRINT MAP

```
PHASE 1: Foundation & Core Automation (Sprint S1–S8)
  S1: Network + RPi + MQTT Broker
  S2: ESP32 Soil Sensor Nodes ×3
  S3: Weather + Pump + Valve Nodes
  S4: Node-RED Automation Flows
  S5: Camera + Frigate NVR
  S6: Cloudflare API + D1 Database
  S7: React Dashboard
  S8: Alerts + PWA + UAT → Go-Live

PHASE 2: Analytics & Monitoring (Sprint S9–S12)
  S9:  Data pipeline + Grafana analytics
  S10: Anomaly detection (statistical)
  S11: Irrigation efficiency scoring
  S12: Automated reporting

PHASE 3: Predictive AI (Sprint S13–S18)
  S13: ML data preparation pipeline
  S14: Soil moisture prediction model
  S15: Weather-aware irrigation scheduler
  S16: TFLite deployment on RPi
  S17: A/B testing framework
  S18: Model monitoring + retraining

PHASE 4: Computer Vision & Advanced AI (Sprint S19+)
  S19: YOLOv8 setup + disease dataset
  S20: Disease/pest detection model
  S21: Fruit maturity estimation
  S22: LLM farm advisor integration
```

---

## 5. HANDOFF PROTOCOL

### 5.1 Session END Checklist (ทำทุกครั้งก่อนจบ session)

```markdown
## SESSION HANDOFF — [SESSION_ID]
Date: [YYYY-MM-DD HH:MM +07:00]
Role: [ROLE_ID]
Sprint: [SPRINT_ID]
Task: [TASK_ID]

### ✅ Completed
- [ ] รายการที่ทำสำเร็จ

### ⚠️ Partial / Blocked
- [ ] สิ่งที่ยังไม่เสร็จ + เหตุผล

### 🔄 Next Session Must Do
- [ ] งานที่ต่อ (ระบุ TASK_ID ถ้ามี)

### 📁 Files Changed
- path/to/file.ext — [สิ่งที่เปลี่ยน]

### 🧠 Key Decisions Made
- [DECISION-XXX] [หัวข้อ] → [ผลการตัดสินใจ] (เหตุผล: ...)

### ⛔ Problems Encountered
- [ISSUE-XXX] [หัวข้อ] → [สถานะ: resolved/open/deferred]

### 💬 Note to Next Session
[ข้อความสำคัญที่ session ถัดไปต้องรู้]
```

### 5.2 Session START Verification

Session ใหม่ต้องยืนยัน:
```
1. อ่าน AGENTS.md ครบแล้ว → ✓
2. อ่าน CURRENT_SPRINT.md ครบแล้ว → ✓  
3. อ่าน decisions ที่เกี่ยวข้องแล้ว → ✓
4. เข้าใจ task ที่รับมอบหมายแล้ว → ✓
5. เข้าใจ Definition of Done แล้ว → ✓
พร้อมเริ่มงาน: ✓
```

---

## 6. DECISION LOGGING PROTOCOL

### เมื่อไหรต้อง log decision?

- เปลี่ยน technology choice (เช่น เปลี่ยน library)
- เปลี่ยน data schema
- เปลี่ยน MQTT topic structure
- เปลี่ยน API endpoint หรือ contract
- เปลี่ยน hardware spec
- แก้ปัญหาที่ส่งผลกระทบต่อ component อื่น
- ตัดสินใจ trade-off ใดๆ

### Format (เพิ่มใน logs/DECISION_LOG.md)

```markdown
### [DECISION-NNN] [หัวข้อสั้นๆ]
- Date: YYYY-MM-DD
- Session: [SESSION_ID]
- Sprint: [SPRINT_ID]
- Role: [ROLE_ID]
- Context: [ทำไมถึงต้องตัดสินใจ]
- Options Considered:
  - Option A: [คำอธิบาย] — Pros: [...] Cons: [...]
  - Option B: [คำอธิบาย] — Pros: [...] Cons: [...]
- Decision: [Option ที่เลือก]
- Rationale: [เหตุผลหลัก]
- Impact: [component ไหนที่ได้รับผล]
- Reversible: [Yes/No — ถ้า No ระบุว่าทำไม]
- Status: [Active|Superseded by DECISION-YYY]
```

---

## 7. ISSUE TRACKING PROTOCOL

```markdown
### [ISSUE-NNN] [หัวข้อ]
- Date: YYYY-MM-DD
- Session: [SESSION_ID]  
- Sprint: [SPRINT_ID]
- Severity: [Critical|High|Medium|Low]
- Type: [Bug|Blocker|Design|Hardware|External]
- Description: [อธิบายปัญหา]
- Reproduction: [steps to reproduce ถ้ามี]
- Root Cause: [สาเหตุ (ถ้าทราบ)]
- Impact: [ผลกระทบต่อ sprint/phase]
- Resolution: [วิธีแก้ไข หรือ workaround]
- Status: [Open|In Progress|Resolved|Deferred|Won't Fix]
- Resolved By: [SESSION_ID ที่แก้]
```

---

## 8. VERIFICATION PROTOCOL (Definition of Done)

ทุก task ต้องผ่าน checklist นี้:

### Code / Firmware
- [ ] Build สำเร็จ ไม่มี error
- [ ] Unit test ผ่าน (ถ้ามี)
- [ ] Integration test ผ่าน
- [ ] ไม่มี hardcoded credentials/secrets
- [ ] มี error handling ครบ
- [ ] มี comment อธิบาย logic ที่ซับซ้อน
- [ ] ไฟล์ใน repo ตรงกับ naming convention

### Configuration
- [ ] config sample ไม่มี secret
- [ ] มี .env.example อัพเดตแล้ว
- [ ] docker-compose ทดสอบแล้ว

### Hardware
- [ ] ทดสอบ node จริงในสนาม
- [ ] วัดค่า sensor เทียบ reference
- [ ] ทดสอบ reconnect หลัง WiFi หลุด
- [ ] ทดสอบ power loss recovery

### Documentation
- [ ] README อัพเดต
- [ ] DECISION_LOG อัพเดต (ถ้ามี decision)
- [ ] CURRENT_SPRINT.md อัพเดต task status
- [ ] SESSION HANDOFF เขียนแล้ว

---

## 9. NAMING CONVENTIONS

```yaml
# Git branches
feature/[sprint]-[task-id]-[short-desc]    # feature/S2-T3-soil-mqtt
bugfix/[issue-id]-[short-desc]             # bugfix/ISSUE-012-wifi-reconnect
hotfix/[issue-id]-[short-desc]             # hotfix/ISSUE-015-pump-relay

# Commit messages
[SPRINT_ID][TASK_ID] type: description
# e.g.: [S2][T3] feat: add soil moisture MQTT publisher
# types: feat | fix | refactor | test | docs | config | deploy

# ESP32 Firmware files
node_[type]_[id]/                          # node_soil_01/, node_pump_01/
  main.ino
  config.h
  sensors.h / actuators.h

# Cloudflare Workers
workers/
  api-ingest/                              # รับข้อมูลจาก RPi
  api-control/                             # ส่ง command ไป RPi
  api-query/                               # dashboard queries

# MQTT Topics (ห้ามเปลี่ยนหลัง S1 complete)
farm/{subsystem}/{node_id}/{message_type}
# farm/soil/node_01/data
# farm/pump/main/cmd
# farm/pump/main/status
# farm/valve/zone_01/cmd
# farm/weather/station_01/data
# farm/alert/{severity}/{type}
# farm/{device}/heartbeat
```

---

## 10. SECRET & SECURITY RULES

```
ห้ามเด็ดขาด:
- commit ไฟล์ที่มี password, API key, token จริง
- hardcode IP address ของ production system
- share MQTT credentials ใน code
- expose RPi ด้วย port forwarding โดยตรง (ใช้ CF Tunnel เท่านั้น)

วิธีที่ถูกต้อง:
- ใช้ .env file (อยู่ใน .gitignore)
- ใช้ config.h.example แทน config.h สำหรับ ESP32
- ใช้ CF Secrets สำหรับ Worker environment variables
- ใช้ CF Access สำหรับ dashboard authentication
```

---

## 11. EMERGENCY PROTOCOL

### ถ้าระบบ production มีปัญหา (หลัง Go-Live)

```
1. STOP — หยุดทำงานที่กำลังทำอยู่
2. LOG — บันทึก ISSUE ทันที ระบุ Severity: Critical
3. ASSESS — ประเมิน: ปั๊มทำงานปกติไหม? ต้นไม้ปลอดภัยไหม?
4. FALLBACK — เปิด/ปิดปั๊มด้วย manual switch ก่อน
5. ROOT CAUSE — หา root cause ก่อน fix
6. FIX → TEST → DEPLOY ตามลำดับ ห้าม hotfix โดยไม่ test
7. POST-MORTEM — เขียน decision log หลังแก้
```

### Manual Override Hierarchy (ปั๊มน้ำ)
```
Priority 1: Physical switch at pump (highest)
Priority 2: Node-RED dashboard (local)
Priority 3: Cloud dashboard (remote)
Priority 4: Auto-schedule (lowest)
```

---

## 12. AGENT SELF-CHECK (AI ทำก่อนตอบทุกครั้ง)

```
□ ฉันกำลังทำงานในบทบาท [ROLE_ID] ใช่ไหม?
□ งานที่ทำอยู่ตรงกับ TASK_ID ที่รับมอบหมายใช่ไหม?
□ การตัดสินใจที่จะทำ ขัดกับ decisions ที่บันทึกไว้ไหม?
□ ถ้ามี decision ใหม่ → บันทึกลง DECISION_LOG แล้วหรือยัง?
□ ถ้าพบ issue → บันทึกลง ISSUE LOG แล้วหรือยัง?
□ output ที่จะส่ง ตรงกับ deliverable ที่กำหนดไหม?
□ GUARDRAILS ข้อไหนที่เกี่ยวข้องกับงานนี้?
```

---

*AGENTS.md เวอร์ชันนี้ใช้กับ Phase 1 (S1–S8)*  
*อัพเดตไฟล์นี้เมื่อขึ้น Phase ใหม่เท่านั้น*  
*Last updated: [YYYY-MM-DD] by [SESSION_ID]*
