# ISSUE_LOG.md — Bug & Problem Tracker
## Smart Longan Farm Automation v1.0

> บันทึกทุก issue, bug, blocker ที่พบระหว่างพัฒนา  
> **ห้ามลบ entries** — update status แทน

---

## SEVERITY LEVELS

| Level | คำอธิบาย | Response Time |
|-------|----------|---------------|
| `Critical` | ระบบล่ม หรือ ปั๊มไม่ทำงาน/ทำงานผิดพลาด | ทันที |
| `High` | Feature หลักไม่ทำงาน, data loss risk | ภายใน 24hr |
| `Medium` | Feature ทำงานบางส่วน, workaround มี | ภายใน sprint |
| `Low` | UI issue, minor inconvenience | backlog |

---

## HOW TO ADD AN ISSUE

```markdown
### [ISSUE-NNN] [หัวข้อสั้น]
- **Date:** YYYY-MM-DD HH:MM +07:00
- **Session:** [SESSION_ID]
- **Sprint:** [SPRINT_ID]
- **Severity:** [Critical|High|Medium|Low]
- **Type:** [Bug|Blocker|Hardware|Design|External|Performance]
- **Component:** [ESP32-NODE-S|RPi-Mosquitto|NodeRED|TimescaleDB|CF-Worker|Dashboard|...]
- **Description:** [อธิบายปัญหาให้ชัดเจน]
- **Steps to Reproduce:**
  1. ...
  2. ...
- **Expected:** [พฤติกรรมที่ควรเป็น]
- **Actual:** [พฤติกรรมที่เกิดขึ้นจริง]
- **Environment:** [Hardware version, firmware version, etc.]
- **Root Cause:** [สาเหตุ — ถ้าทราบ, หรือ "Unknown"]
- **Impact:** [ผลกระทบต่อ sprint/phase/user]
- **Workaround:** [วิธีแก้ชั่วคราว ถ้ามี]
- **Resolution:** [วิธีแก้ถาวร]
- **Related Decision:** [DECISION-NNN ถ้ามี]
- **Status:** `Open` | `In Progress` | `Resolved` | `Deferred` | `Won't Fix`
- **Resolved By:** [SESSION_ID]
- **Resolved Date:** [YYYY-MM-DD]
```

---

## OPEN ISSUES

*(ยังไม่มี issues)*

---

## RESOLVED ISSUES

*(ยังไม่มี)*

---

## ISSUE PATTERNS (อัพเดตเมื่อพบ pattern ซ้ำ)

| Pattern | Frequency | Prevention |
|---------|-----------|------------|
| ESP32 WiFi disconnect ใต้ร่มไม้ | — | — |
| MQTT QoS1 message ซ้ำกัน | — | — |

---

*ISSUE_LOG.md อัพเดตครั้งสุดท้าย: [YYYY-MM-DD] โดย [SESSION_ID]*
