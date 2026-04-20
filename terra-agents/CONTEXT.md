# CONTEXT.md — Shared Technical Context
## Smart Longan Farm Automation v1.0

> โหลดไฟล์นี้ทุก session หลังจาก AGENTS.md  
> อัพเดตเมื่อมีการตัดสินใจที่เปลี่ยนแปลงโครงสร้างหลัก

---

## 1. HARDWARE TOPOLOGY

```
[บาดาล] ──→ [Submersible Pump] ──→ [Main Filter] ──→ [Pressure Tank]
                    ↑                                         │
              [SSR Relay]                                     │
                    ↑                                    [4-way Manifold]
              [ESP32 NODE-P] ←── MQTT ──→ [RPi4]              │
                                               ↕         [Solenoid Valves ×4]
WiFi AP ×2 ←──────────────────────────── [ESP32 NODE-V]       │
     ↑                                                    [Drip Lines]
     ├── ESP32 NODE-S (×3 กระจาย 3 โซน)                       │
     ├── ESP32 NODE-W (กลางสวน)                           [ต้นลำไย ทุกต้น]
     ├── IP Camera ×4
     └── RPi4 (Central Hub — ติดตั้งในอาคาร/กล่องกันน้ำ)
```

## 2. NETWORK ARCHITECTURE

```
Internet (FTTH) ──→ Router/Firewall ──→ Switch
                         │                 │
                    4G LTE (backup)    RPi4 (eth0) ── SSD
                                           │
                                      WiFi AP #1 (ติดอาคาร)
                                           │
                                      WiFi AP #2 (กลางสวน)
                                      [SSID: longan-farm-iot]
                                      [SSID: longan-farm-cam]
```

### IP Address Plan (Fixed/Static)
```
192.168.10.1    Router/Gateway
192.168.10.10   Raspberry Pi 4 (static)
192.168.10.20   WiFi AP #1
192.168.10.21   WiFi AP #2
192.168.10.30   IP Camera #1 (entrance)
192.168.10.31   IP Camera #2 (center)
192.168.10.32   IP Camera #3 (plot A)
192.168.10.33   IP Camera #4 (pump area)
192.168.10.50   ESP32 NODE-P (pump)     [DHCP reserved]
192.168.10.51   ESP32 NODE-V (valves)   [DHCP reserved]
192.168.10.52   ESP32 NODE-S-01         [DHCP reserved]
192.168.10.53   ESP32 NODE-S-02         [DHCP reserved]
192.168.10.54   ESP32 NODE-S-03         [DHCP reserved]
192.168.10.55   ESP32 NODE-W (weather)  [DHCP reserved]
```

---

## 3. MQTT SCHEMA (FROZEN after S1 — ห้ามเปลี่ยนโดยไม่มี ARCH decision)

### Topic Structure
```
farm/{subsystem}/{node_id}/{message_type}
```

### Full Topic Map
```yaml
# Telemetry (ESP32 → RPi)
farm/soil/{node_id}/data:
  payload: {moisture_pct, temp_c, ec_us, timestamp}
  qos: 1
  retain: false
  interval: 5min

farm/weather/station_01/data:
  payload: {temp_c, humidity_pct, rain_mm, light_lux, wind_ms, timestamp}
  qos: 1
  retain: false
  interval: 5min

farm/pump/main/status:
  payload: {state, flow_lph, pressure_bar, runtime_sec, timestamp}
  qos: 1
  retain: true
  interval: 30sec (when running), 5min (idle)

farm/valve/{zone_id}/status:
  payload: {open, elapsed_min, flow_lph, timestamp}
  qos: 1
  retain: true
  interval: 30sec

farm/{device_id}/heartbeat:
  payload: {uptime_sec, rssi_dbm, vcc_mv, fw_version, timestamp}
  qos: 0
  retain: false
  interval: 60sec

# Commands (RPi/Cloud → ESP32)
farm/pump/main/cmd:
  payload: {action: "on"|"off", duration_min: int|null, source: string}
  qos: 2
  response_topic: farm/pump/main/status

farm/valve/{zone_id}/cmd:
  payload: {action: "open"|"close", duration_min: int, source: string}
  qos: 2
  response_topic: farm/valve/{zone_id}/status

# Alerts (RPi → Cloud)
farm/alert/{severity}/{type}:
  severity: critical|warning|info
  type: pump_fail|soil_dry|soil_wet|sensor_offline|motion|flow_anomaly
  payload: {message, node_id, value, threshold, timestamp}
  qos: 2
```

### Zone IDs
```
zone_01: โซนทิศเหนือ (ต้น 1–30)
zone_02: โซนทิศตะวันออก (ต้น 31–60)
zone_03: โซนทิศใต้ (ต้น 61–90)
zone_04: โซนทิศตะวันตก (ต้น 91–120)
```

---

## 4. DATABASE SCHEMA

### TimescaleDB (RPi — Local)

```sql
-- Sensor readings (hypertable)
CREATE TABLE sensor_readings (
  time        TIMESTAMPTZ NOT NULL,
  node_id     TEXT NOT NULL,
  node_type   TEXT NOT NULL,  -- soil|weather|pump|valve
  metric      TEXT NOT NULL,  -- moisture_pct|temp_c|flow_lph|...
  value       DOUBLE PRECISION NOT NULL,
  unit        TEXT,
  quality     SMALLINT DEFAULT 1  -- 1=good, 0=suspect, -1=bad
);
SELECT create_hypertable('sensor_readings', 'time');

-- Commands log
CREATE TABLE commands (
  id          SERIAL PRIMARY KEY,
  time        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  target      TEXT NOT NULL,  -- pump|valve_zone_01|...
  action      TEXT NOT NULL,
  params      JSONB,
  source      TEXT NOT NULL,  -- auto|dashboard|schedule|ai
  executed    BOOLEAN DEFAULT FALSE,
  result      TEXT
);

-- Irrigation events
CREATE TABLE irrigation_events (
  id          SERIAL PRIMARY KEY,
  start_time  TIMESTAMPTZ NOT NULL,
  end_time    TIMESTAMPTZ,
  zone_id     TEXT NOT NULL,
  trigger     TEXT NOT NULL,  -- schedule|soil_threshold|manual|ai
  duration_min INTEGER,
  volume_l    DOUBLE PRECISION,
  avg_moisture_before DOUBLE PRECISION,
  avg_moisture_after  DOUBLE PRECISION
);

-- Device registry
CREATE TABLE devices (
  device_id   TEXT PRIMARY KEY,
  node_type   TEXT NOT NULL,
  location    TEXT,
  install_date DATE,
  fw_version  TEXT,
  last_seen   TIMESTAMPTZ,
  is_active   BOOLEAN DEFAULT TRUE
);

-- Alert log
CREATE TABLE alerts (
  id          SERIAL PRIMARY KEY,
  time        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  severity    TEXT NOT NULL,
  alert_type  TEXT NOT NULL,
  node_id     TEXT,
  message     TEXT,
  value       DOUBLE PRECISION,
  threshold   DOUBLE PRECISION,
  acknowledged BOOLEAN DEFAULT FALSE,
  ack_time    TIMESTAMPTZ
);
```

### Cloudflare D1 (Cloud — Mirror + Config)

```sql
-- Sync'd from RPi (hourly, last 90 days)
CREATE TABLE sensor_hourly_avg (
  date_hour   TEXT NOT NULL,  -- '2024-03-15T14:00'
  node_id     TEXT NOT NULL,
  metric      TEXT NOT NULL,
  avg_value   REAL,
  min_value   REAL,
  max_value   REAL,
  sample_count INTEGER,
  PRIMARY KEY (date_hour, node_id, metric)
);

-- Automation rules (source of truth)
CREATE TABLE automation_rules (
  rule_id     TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  enabled     BOOLEAN DEFAULT TRUE,
  trigger_type TEXT NOT NULL,  -- threshold|schedule|manual|ai
  trigger_config TEXT NOT NULL, -- JSON string
  action_type TEXT NOT NULL,
  action_config TEXT NOT NULL,  -- JSON string
  priority    INTEGER DEFAULT 50,
  last_triggered TEXT,
  created_at  TEXT NOT NULL,
  updated_at  TEXT NOT NULL
);

-- System config (key-value)
CREATE TABLE system_config (
  key         TEXT PRIMARY KEY,
  value       TEXT NOT NULL,
  description TEXT,
  updated_at  TEXT NOT NULL,
  updated_by  TEXT
);
```

---

## 5. API CONTRACT (Cloudflare Workers)

### Base URL
```
https://longan-api.[your-domain].com
```

### Endpoints

```yaml
# Telemetry Ingestion (RPi → CF)
POST /api/v1/ingest/sensor
  Auth: X-API-Key (RPi key)
  Body: {node_id, metrics: [{metric, value, unit, timestamp}]}
  Response: {accepted: int, rejected: int}

POST /api/v1/ingest/alert
  Auth: X-API-Key (RPi key)
  Body: {severity, type, node_id, message, value, threshold, timestamp}

# Data Query (Dashboard → CF)  
GET /api/v1/sensors/latest
  Auth: CF Access (user session)
  Response: {nodes: [{node_id, metrics: {...}, last_updated}]}

GET /api/v1/sensors/history?node_id=&metric=&from=&to=&interval=
  Auth: CF Access
  Response: {data: [{timestamp, value}]}

# Control (Dashboard → CF → RPi)
POST /api/v1/control/pump
  Auth: CF Access
  Body: {action: "on"|"off", duration_min?: int}
  Response: {command_id, status: "queued"|"executed"|"failed"}

POST /api/v1/control/valve
  Auth: CF Access  
  Body: {zone_id, action: "open"|"close", duration_min: int}

# Rules Management
GET  /api/v1/rules
POST /api/v1/rules
PUT  /api/v1/rules/{rule_id}
DEL  /api/v1/rules/{rule_id}
  Auth: CF Access (admin role)

# System Status
GET /api/v1/status
  Response: {devices: [...], last_sync, alerts_unacked: int}
```

---

## 6. NODE-RED FLOW CATALOG

```
Flow F01: Soil Data Processor
  Subscribe: farm/soil/+/data
  Process: validate, store TimescaleDB, check thresholds
  Output: farm/alert if threshold breach

Flow F02: Irrigation Scheduler  
  Trigger: cron schedule (รอบเช้า 06:00, เย็น 17:00)
  Logic: ตรวจ soil moisture → เปิดโซนที่ต้องการ
  Safety: ห้ามรดถ้ากำลังฝนตก (check weather node)

Flow F03: Threshold Irrigation
  Trigger: soil moisture < threshold จาก Flow F01
  Logic: เปิดปั๊ม + โซนที่แห้ง, ปิดหลัง X นาที หรือ moisture ถึง target
  Cooldown: ห้าม trigger ซ้ำใน 30 นาที

Flow F04: Pump Monitor
  Subscribe: farm/pump/main/status
  Monitor: flow rate anomaly, runtime too long, no-flow when should run

Flow F05: Heartbeat Monitor
  Subscribe: farm/+/heartbeat
  Alert: ถ้า device ไม่ส่ง heartbeat เกิน 5 นาที

Flow F06: Cloud Sync
  Trigger: ทุก 1 ชั่วโมง
  Action: aggregate sensor data → POST /api/v1/ingest/sensor (bulk)

Flow F07: Command Receiver
  Subscribe: [internal topic from CF Tunnel webhook]
  Route: pump cmd → farm/pump/main/cmd
         valve cmd → farm/valve/{zone}/cmd

Flow F08: Alert Dispatcher
  Subscribe: farm/alert/#
  Action: POST /api/v1/ingest/alert + LINE Notify
```

---

## 7. AUTOMATION RULES (Default Config)

```yaml
rule_01:
  name: "Morning Irrigation"
  trigger: schedule 06:00 daily
  condition: soil_moisture_avg < 60% AND NOT raining
  action: open_zones [zone_01, zone_02, zone_03, zone_04] sequential
  duration: 20min per zone
  priority: 50

rule_02:
  name: "Evening Irrigation"  
  trigger: schedule 17:00 daily
  condition: soil_moisture_avg < 70% AND NOT raining
  action: open_zones [zone_01, zone_02, zone_03, zone_04] sequential
  duration: 15min per zone
  priority: 50

rule_03:
  name: "Emergency Dry Alert"
  trigger: soil_moisture < 40% any node
  action: alert(critical) + open_zone(matching) immediately
  priority: 90
  cooldown: 60min

rule_04:
  name: "Rain Skip"
  trigger: rain_gauge > 5mm in last 2hr
  action: cancel_pending_irrigation + notify
  priority: 95

rule_05:
  name: "Pump Safety Timeout"
  trigger: pump running > 4hr continuous
  action: force_stop_pump + alert(critical)
  priority: 99

rule_06:
  name: "No-Flow Protection"
  trigger: pump ON AND flow_rate < 5 L/hr for 5min
  action: stop_pump + alert(critical) [ท่อแตก/ตัน]
  priority: 99
```

---

## 8. THRESHOLDS & CALIBRATION

```yaml
soil_moisture:
  critical_dry: 35%      # Emergency irrigation
  target_low: 60%        # Start irrigation
  target_high: 80%       # Stop irrigation
  over_wet: 90%          # Alert (waterlogging risk)

weather:
  rain_skip_threshold: 5mm   # ฝนตกเกินนี้ → skip irrigation
  high_temp_alert: 38°C
  high_humidity_alert: 95%

pump:
  max_runtime_hr: 4          # Safety cutoff
  min_flow_lph: 5            # No-flow alarm threshold
  max_flow_lph: 3000         # Over-flow alarm

irrigation:
  zone_duration_default_min: 20
  cooldown_min: 30           # ห้าม irrigate ซ้ำใน X นาที
  max_daily_volume_l: 5000   # Budget per day
```

---

*CONTEXT.md อัพเดตครั้งสุดท้าย: [YYYY-MM-DD] โดย [SESSION_ID]*  
*Schema version: 1.0 — ห้ามเปลี่ยน MQTT topics และ DB schema โดยไม่มี DECISION log*
