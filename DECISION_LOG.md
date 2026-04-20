# DECISION_LOG.md — Architecture & Technical Decisions
## Smart Longan Farm Automation v1.0

> บันทึกทุก decision ที่ส่งผลต่อ architecture, schema, protocol, หรือ trade-off  
> **ห้ามลบ entries** — supersede ด้วย decision ใหม่แทน  
> เรียงจากใหม่ไปเก่า (ใหม่อยู่บนสุด)

---

## HOW TO ADD A DECISION

```markdown
### [DECISION-NNN] [หัวข้อสั้น — จำกัด 8 คำ]
- **Date:** YYYY-MM-DD HH:MM +07:00
- **Session:** [SESSION_ID]
- **Sprint:** [SPRINT_ID]
- **Role:** [ROLE_ID]
- **Triggered by:** [เหตุการณ์หรือ issue ที่นำไปสู่การตัดสินใจ]
- **Context:** [อธิบายสถานการณ์ที่ต้องตัดสินใจ]
- **Options Considered:**
  - **Option A:** [ชื่อ] — [อธิบาย] | Pros: [...] | Cons: [...]
  - **Option B:** [ชื่อ] — [อธิบาย] | Pros: [...] | Cons: [...]
- **Decision:** Option [A/B/C/other]
- **Rationale:** [เหตุผลหลัก 2-3 ประโยค]
- **Impact:** [components ที่ได้รับผล + action required]
- **Reversible:** [Yes / No — ถ้า No อธิบายว่าทำไม]
- **Status:** `Active` | `Superseded by DECISION-YYY`
```

---

## DECISIONS

*(ยังไม่มี decisions — จะเพิ่มเมื่อ Sprint S1 เริ่ม)*

---

### [DECISION-001] EXAMPLE: เลือก TimescaleDB แทน InfluxDB
- **Date:** 2024-01-01 00:00 +07:00
- **Session:** 2024-01-01-ARCH-01
- **Sprint:** S1
- **Role:** ARCH
- **Triggered by:** ต้องเลือก time-series database สำหรับ RPi
- **Context:** RPi มี RAM 4GB, ต้องการ time-series + relational queries, รองรับ ML feature extraction
- **Options Considered:**
  - **Option A:** InfluxDB — Native time-series, InfluxQL/Flux query | Pros: ออกแบบมาสำหรับ IoT | Cons: RAM usage สูง, Flux learning curve, License change ใน v3
  - **Option B:** TimescaleDB — PostgreSQL extension | Pros: SQL standard, ecosystem ดี, RAM ต่ำกว่า, Python/pandas integration | Cons: ไม่ใช่ pure time-series
  - **Option C:** SQLite — เรียบง่าย | Pros: ง่ายมาก | Cons: ไม่มี time-series optimizations, ไม่รองรับ concurrent writes ดี
- **Decision:** Option B — TimescaleDB
- **Rationale:** SQL standard ทำให้ IMPL และ ML pipeline ใช้ได้ง่าย, RAM footprint ต่ำเหมาะกับ RPi, PostgreSQL ecosystem รองรับ ML tools (pandas, sqlalchemy) ได้ทันที
- **Impact:** RPi Docker Compose ต้องใช้ image timescale/timescaledb:latest-pg15, schema ใน CONTEXT.md ใช้ PostgreSQL syntax
- **Reversible:** No — การ migrate data จะซับซ้อน ถ้าต้องเปลี่ยนต้องทำใน Phase 2
- **Status:** `Active`

---
