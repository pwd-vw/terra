# GUARDRAILS.md — Rules & Constraints
## Smart Longan Farm Automation v1.0

> ทุก AI session ต้องอ่านและปฏิบัติตามกฎเหล่านี้  
> กฎมีลำดับความสำคัญจากสูงไปต่ำ (G1 = สูงสุด)

---

## G1 — SAFETY FIRST (ห้ามละเมิดเด็ดขาด)

```
G1.1  ห้ามเขียน code ที่อาจทำให้ปั๊มน้ำทำงานโดยไม่มี timeout/cutoff
      → ทุก "pump ON" command ต้องมี max_duration หรือ watchdog timer

G1.2  ห้ามลบหรือ disable Flow F05 (Heartbeat Monitor) และ Flow F07 (Command Receiver)
      โดยไม่มี replacement ทำงานแทน

G1.3  ห้ามเปิด port ตรงบน router สู่ RPi โดยไม่ผ่าน Cloudflare Tunnel
      → การ expose service โดยตรงถือเป็น security violation

G1.4  ห้าม commit ข้อมูลที่สามารถ access ระบบ production ได้โดยตรง
      (passwords, tokens, API keys จริง, IP addresses จริง)

G1.5  ระบบต้องทำงานได้ใน LOCAL-ONLY mode เมื่อ internet ล่ม
      → automation rules ใน Node-RED ต้องไม่ depend on cloud availability
```

---

## G2 — ARCHITECTURE INTEGRITY

```
G2.1  ห้ามเปลี่ยน MQTT topic structure หลัง S1 complete
      → ถ้าจำเป็น ต้องมี DECISION log + approval จาก ARCH role

G2.2  ห้ามเปลี่ยน DB schema (TimescaleDB, CF D1) โดยไม่มี migration script
      → ต้องมี migration.sql พร้อม rollback script

G2.3  ห้ามเพิ่ม dependency ใหม่โดยไม่ระบุใน DECISION log
      เหตุผล: ESP32 มี flash/RAM จำกัด, RPi ต้องการ stability

G2.4  ESP32 firmware: ห้ามใช้ blocking delay() เกิน 100ms ใน loop()
      → ใช้ millis() pattern หรือ FreeRTOS task แทน

G2.5  ห้ามเก็บ sensor history บน ESP32
      → ESP32 = publish only, ไม่มี local database

G2.6  CF Workers ต้องไม่มี state
      → state ทั้งหมดอยู่ใน D1, KV, หรือ Durable Objects เท่านั้น
```

---

## G3 — CODE QUALITY

```
G3.1  ห้าม push code ที่ไม่ผ่าน build ไปยัง main branch
      → ใช้ feature branch + PR เสมอ

G3.2  ทุก function/method ที่ซับซ้อน (>20 lines หรือ multi-step logic)
      ต้องมี comment อธิบาย what และ why (ไม่ใช่ how)

G3.3  Error handling: ห้าม swallow errors โดยไม่ log
      → catch blocks ต้องมี meaningful error message + context

G3.4  ESP32: ทุก MQTT publish ต้องตรวจสอบ connection ก่อน
      และต้องมี reconnect logic

G3.5  ห้ามใช้ eval(), exec() และ dynamic code execution ใน CF Workers

G3.6  ทุก HTTP API response ต้องมี proper HTTP status code
      → ไม่ใช่ {success: false} ด้วย status 200
```

---

## G4 — DATA INTEGRITY

```
G4.1  ทุก sensor value ต้องมี validation range ก่อน store
      → ค่านอก range = reject + alert (ไม่ใช่ store แล้วค่อย filter)

      Ranges:
      soil_moisture: 0–100%
      temperature: -10°C – 60°C
      humidity: 0–100%
      flow_rate: 0–5000 L/hr
      pressure: 0–10 bar

G4.2  timestamp ทั้งหมดต้องเป็น UTC (ISO 8601)
      → display เป็น Bangkok time เฉพาะ UI layer

G4.3  ห้าม delete sensor historical data
      → soft delete เท่านั้น (is_deleted flag หรือ archived table)

G4.4  CF D1 hourly sync: ถ้า sync ล้มเหลว ต้อง retry และ alert
      ห้าม silent fail
```

---

## G5 — SESSION DISCIPLINE

```
G5.1  ทุก session ต้องระบุ ROLE, SESSION_ID, SPRINT, TASK_ID
      ก่อนเริ่มทำงาน

G5.2  ถ้า task ที่ได้รับมอบหมายต้องการ decision ที่อยู่นอกอำนาจของ role นั้น
      → STOP และ flag ให้ session ที่มี role ถูกต้องตัดสินใจ
      (IMPL ห้ามตัดสินใจ architecture, TEST ห้าม modify code)

G5.3  ถ้าพบ conflict กับ decision ที่บันทึกไว้ใน DECISION_LOG
      → ต้องหยุดและ flag conflict ก่อน ห้ามดำเนินการต่อโดยอัตโนมัติ

G5.4  ถ้าไม่แน่ใจ → ถามก่อน ทำทีหลัง
      ห้าม assume ข้อมูลที่ไม่มีใน context files

G5.5  SESSION HANDOFF ต้องเขียนทุกครั้งก่อนจบ session
      แม้งานจะยังไม่เสร็จ
```

---

## G6 — HARDWARE CONSTRAINTS

```
G6.1  ESP32 RAM: ห้ามใช้ String class ใน loop-heavy code
      → ใช้ char array หรือ const char* แทน

G6.2  MQTT payload สูงสุด 256 bytes ต่อ message สำหรับ ESP32
      → compress หรือ split ถ้าใหญ่กว่า

G6.3  Deep sleep: sensor nodes ที่ใช้ solar ต้องรองรับ deep sleep mode
      → wake interval ต้องตั้งได้จาก config (ไม่ hardcode)

G6.4  OTA update: ต้องทดสอบบน dev unit ก่อนเสมอ
      ห้าม OTA production nodes โดยตรงโดยไม่ผ่าน staging

G6.5  Relay switching: ต้องมี debounce ≥ 500ms
      ห้าม switch pump ON/OFF เร็วกว่า 30 วินาที (inrush damage)
```

---

## G7 — CLOUDFLARE CONSTRAINTS

```
G7.1  Worker CPU limit: 10ms per request (free plan)
      → ห้าม heavy computation ใน Worker, offload ไป R2/Queue

G7.2  D1 query ต้องมี index บน columns ที่ใช้ filter/join บ่อย

G7.3  R2 object keys ต้องใช้ structured format:
      {type}/{YYYY}/{MM}/{DD}/{device_id}/{filename}
      เช่น: snapshots/2024/03/15/cam_01/14-30-00.jpg

G7.4  CF Access: ทุก endpoint ที่ไม่ใช่ /api/v1/ingest
      ต้องผ่าน authentication

G7.5  Worker environment variables (secrets) ต้องใช้ wrangler secret put
      ห้ามใส่ใน wrangler.toml
```

---

## GUARDRAIL VIOLATION HANDLING

ถ้า AI session พบว่ากำลังจะละเมิด guardrail:

```
1. STOP ทันที
2. ระบุว่า Guardrail ข้อไหนที่เกี่ยวข้อง
3. อธิบายว่า action ที่จะทำจะละเมิดอย่างไร
4. เสนอทางเลือกที่ไม่ละเมิด guardrail
5. รอการยืนยันจากผู้ใช้ก่อนดำเนินการต่อ

Format:
⛔ GUARDRAIL VIOLATION DETECTED
Rule: G[N].[M] — [ชื่อกฎ]
Action blocked: [action ที่จะทำ]
Reason: [ทำไมถึง violate]
Safe alternative: [ทางเลือกที่ปลอดภัย]
```

---

*GUARDRAILS.md v1.0 — อัพเดตเมื่อ Phase ใหม่เท่านั้น*
