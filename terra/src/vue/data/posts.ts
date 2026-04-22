export interface Product {
  name: string
  url: string
}

export interface Post {
  slug: string
  title: string
  titleTh: string
  date: string
  phase: string
  sprint: string
  difficulty: 1 | 2 | 3 | 4
  tags: string[]
  excerpt: string
  products: Product[]
  content: string
}

export const posts: Post[] = [
  {
    slug: 'cloudflare-workers-vue3-iot-dashboard',
    title: 'Setting Up Cloudflare Workers + Vue 3 for an IoT Dashboard',
    titleTh: 'ตั้งค่า Cloudflare Workers + Vue 3 สำหรับ IoT Dashboard',
    date: '2026-04-21',
    phase: 'Phase 0',
    sprint: 'P0',
    difficulty: 2,
    tags: ['Cloudflare', 'Vue 3', 'Vite', 'TypeScript', 'IoT'],
    excerpt:
      'วิธี scaffold โปรเจกต์ Cloudflare Workers + Vue 3 + Vite ด้วย @cloudflare/vite-plugin เพื่อสร้าง IoT dashboard ที่ deploy บน Edge network',
    products: [
      { name: 'Cloudflare Workers', url: 'https://pwdvisionworks.com/shop/' },
    ],
    content: `## บทนำ

TERRA เริ่มต้นจาก Phase 0 — ก่อนที่จะมี ESP32 หรือ sensor ตัวแรก เราต้องการ project infrastructure ที่พร้อมรองรับการ build อย่างเป็นระบบ
และเราต้องการจัดทำบันทึกการเรียนรู้ทั้งหมดในรูปแบบของ blog post ที่ละเอียดและเข้าใจง่ายสำหรับผู้ที่สนใจทำ IoT ด้วยอุปกรณ์ราคาประหยัดและเทคโนโลยีที่เข้าถึงได้ง่าย
เข้ามาร่วมเดินทางไปด้วยกันกับเรา และร่วมลุ้นกันว่าโปรเจกต์นี้จะพัฒนาไปในทิศทางไหนบ้าง!

ในบทความแรกนี้เราจะพูดถึงการตั้งค่า Cloudflare Workers ร่วมกับ Vue 3 และ Vite เพื่อสร้าง IoT dashboard ที่สามารถ deploy ได้อย่างรวดเร็วและมีประสิทธิภาพบน Edge network ของ Cloudflare

## Tech Stack ที่เราเลือกใช้ในโปรเจกต์นี้ประกอบด้วย:
- **Cloudflare Workers** เป็น backend API
- **Vue 3 + Vite** เป็น frontend SPA
- **@cloudflare/vite-plugin** เชื่อมทั้งสองเข้าด้วยกัน
- Deploy ผ่าน \`wrangler deploy\`

## Why Cloudflare Workers?

เราต้องการสร้าง IoT dashboard ที่ต้องรับข้อมูล sensor data จาก RPi5 และส่งคำสั่ง command กลับเพื่อควบคุมการทำงานของอุปกรณ์ต่างๆ เช่น ปั๊มน้ำและวาล์ว เป็นต้น
เราประเมินตัวเลือกต่างๆ แล้วพบว่า Cloudflare Workers เหมาะสมที่สุดสำหรับ use case นี้ ทั้งในแง่ของ latency, scalability, และ cost ที่เราสามารถเริ่มต้นได้ฟรีในระดับที่เพียงพอสำหรับโปรเจกต์นี้:
| Feature | Workers | Traditional Server |
|---------|---------|-------------------|
| Latency | Edge (< 50ms global) | Single region |
| Cost | Free up to 100K req/day | Fixed monthly |
| Scale | Auto | Manual |
| D1 Database | Built-in SQLite | External |

เพื่อน ๆ คิดว่า Cloudflare Workers เป็นตัวเลือกที่ดีสำหรับโปรเจกต์นี้ไหม? หรือมีทางเลือกอื่นที่น่าสนใจ? มาแลกเปลี่ยนความคิดเห็นกันได้ที่ facebook.com/pwdvisionworks ได้เลยครับผม!

## Project Structure

\`\`\`
terra/
├── wrangler.jsonc        # CF Workers config
├── vite.config.ts        # Vite + cloudflare() plugin
├── src/
│   ├── index.ts          # Worker entry — API routes
│   └── vue/
│       ├── main.ts       # Vue app entry
│       ├── App.vue       # Router root
│       ├── router/       # Vue Router
│       └── views/        # Page components
\`\`\`

## Key Configuration

\`\`\`jsonc
// wrangler.jsonc
{
  "name": "terra",
  "main": "src/index.ts",
  "assets": {
    "html_handling": "single-page-application",
    "binding": "ASSETS"
  }
}
\`\`\`

\`\`\`ts
// src/index.ts — Worker
interface Env { ASSETS: Fetcher }

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    if (url.pathname.startsWith('/api/')) {
      return handleAPI(request, url)
    }
    return env.ASSETS.fetch(request)
  }
} satisfies ExportedHandler<Env>
\`\`\`

## Deploy

\`\`\`bash
npm run build    # vite build
wrangler deploy  # push to Cloudflare
\`\`\`

ดู source code ทั้งหมดได้ที่ GitHub (เร็วๆ นี้)`,
  },

  {
    slug: 'esp32-capacitive-soil-moisture-sensor',
    title: 'ESP32 Capacitive Soil Moisture Sensor — ทดสอบ NODE-S',
    titleTh: 'ทดสอบเซ็นเซอร์วัดความชื้นดิน Capacitive ด้วย ESP32',
    date: '2026-04-20',
    phase: 'Phase 1',
    sprint: 'S2 (Plan)',
    difficulty: 2,
    tags: ['ESP32', 'Soil Sensor', 'MQTT', 'Arduino', 'IoT Hardware'],
    excerpt:
      'เปรียบเทียบ resistive vs capacitive soil sensor, calibrate ค่า ADC → %, และ publish ผ่าน MQTT ทุก 5 นาทีพร้อม deep sleep',
    products: [
      { name: 'ESP32-S3 Development Board', url: 'https://pwdvisionworks.com/shop/esp32-s3-devboard' },
      { name: 'Capacitive Soil Moisture Sensor v1.2', url: 'https://pwdvisionworks.com/shop/capacitive-soil-sensor' },
      { name: 'DS18B20 Soil Temperature Probe', url: 'https://pwdvisionworks.com/shop/ds18b20-probe' },
      { name: 'Solar Panel 5V 1W + TP4056 Module', url: 'https://pwdvisionworks.com/shop/solar-charging-kit' },
    ],
    content: `## ทำไมถึงเลือก Capacitive แทน Resistive?
ทำไมต้อง Capacitive? (บทเรียนจากความผิดพลาด)
ในการเลือกเซนเซอร์วัดความชื้นดิน พี่อยากให้เราลองเปรียบเทียบระหว่างสองแบบนี้ครับ:
Resistive sensor (2 probe โลหะ) คือ sensor ถูกที่สุด แต่มีปัญหา:
- **Corrosion** — probe สึกกร่อนภายใน 2-4 สัปดาห์ในดินชื้น
- **Electrolysis** — กระแสไฟฟ้าทำให้ดินเป็นพิษ
- **Inaccurate** — ค่าเปลี่ยนตาม salinity ของดิน

**Capacitive sensor** แก้ปัญหาทั้งหมด — วัดค่า dielectric constant ของดิน ไม่มี exposed metal contact

Resistive Sensor: เปรียบเสมือนการเอา "เหล็กเปลือย" ไปปักดิน ความชื้นจะทำหน้าที่นำไฟฟ้า แต่มันมีศัตรูตัวฉกาจคือ Corrosion (การกัดกร่อน) เหมือนเราเอาตะปูไปแช่น้ำครับ ไม่เกินเดือนหนึ่ง ขาเซนเซอร์จะผุจนค่าเพี้ยน แถมยังปล่อยสารตะกั่วหรือโลหะหนักลงไปในดินด้วย (Electrolysis)

Capacitive Sensor: เปรียบเสมือนเรา "สวมชุดกันฝน" ให้เซนเซอร์ ตัววงจรไฟฟ้าจะถูกเคลือบหรือซ่อนอยู่ใต้ชั้นฉนวน มันจะวัดค่าความจุไฟฟ้า (Dielectric Constant) โดยที่ตัวโลหะไม่สัมผัสกับดินโดยตรง

Logic Reasoning: ในโปรเจกต์ Terra เราต้องการความยั่งยืน (Sustainability) ดังนั้นการเลือกใช้ Capacitive Sensor จึงเป็นคำตอบที่ดีกว่ามาก เพราะมันไม่สึกกร่อน และให้ค่าที่เสถียรในระยะยาวครับ

## Wiring — NODE-S
การต่อวงจร NODE-S (Wiring)
การต่อใช้งานกับ ESP32-S3 นั้นเรียบง่ายแต่ต้องระวังเรื่อง Pin ที่เลือกใช้ครับ เราเลือก GPIO36 เพราะเป็นขา ADC ที่มีความละเอียดสูง เหมาะกับการวัดแรงดันไฟฟ้าที่เปลี่ยนไปตามความชื้น
\`\`\`
ESP32-S3 (สมองหลัก)      Capacitive Sensor (สัมผัสความชื้น)
3.3V    ───→   VCC  (ไฟเลี้ยง)
GND     ───→   GND  (กราวด์)
GPIO36  ←───   AOUT (Analog)

ESP32-S3       DS18B20  (วัดอุณหภูมิ)
3.3V    ───→   VCC
GND     ───→   GND
GPIO4   ←───   DATA (+ 4.7kΩ pullup ดึงไฟขึ้น to 3.3V)
\`\`\`

## Calibration
Calibration: สอนให้บอร์ดรู้จัก "ดิน" ของเรา
เซนเซอร์แต่ละตัวจากโรงงานมักให้ค่าไม่เท่ากันครับ พี่แนะนำว่าก่อนเอาไปปักจริง เราต้องทำ 2-point calibration ก่อน เหมือนการตั้งค่า 0 (แห้งสนิท) และ 100 (เปียกโชก) เพื่อให้ข้อมูลที่ส่งเข้าระบบ Terra Analytics ของเราแม่นยำที่สุด
ADC ค่า raw → moisture % ต้องทำ 2-point calibration:

\`\`\`cpp
// Measure these values for YOUR sensor + soil type
// ทดลองหาค่า ADC จากเครื่องจริงของคุณเอง
const int DRY_VALUE  = 3200;  // ค่าตอนวางไว้ในอากาศแห้ง (0%)
const int WET_VALUE  = 1400;  // ค่าตอนจุ่มในน้ำหรือดินที่แฉะมาก (100%)

// ใช้ฟังก์ชัน map เพื่อแปลงค่าเลขหลักพัน ให้กลายเป็นเปอร์เซ็นต์ที่อ่านง่าย
int moisture_pct = map(adc_raw, DRY_VALUE, WET_VALUE, 0, 100);

// ป้องกันกรณีค่าหลุดช่วง (เช่น แห้งกว่าแห้งสนิท)
moisture_pct = constrain(moisture_pct, 0, 100);
\`\`\`

## MQTT Publish Schema
MQTT Schema: ภาษาที่คุยกับระบบ Cloud
เพื่อให้ข้อมูลจาก NODE-S สามารถนำไปทำ Graph หรือคำนวณใน Node-RED ต่อได้ เราต้องจัดโครงสร้างข้อมูลให้เป็นระเบียบในรูปแบบ JSON ครับ
\`\`\`json
// Topic: farm/soil/node_s_01/data
{
  "moisture_pct": 67.3, // ความชื้นในดิน (%)
  "temp_c": 28.5, // อุณหภูมิดิน (°C)
  "ec_us": 0, // Electrical conductivity (µS/cm)
  "node_id": "NODE-S-01", // รหัสระบุตัวตนของบอร์ด
  "battery_v": 3.9        // แรงดันแบตเตอรี่ (ไว้เช็คว่าใกล้หมดหรือยัง)
  "timestamp": "2026-04-25T08:00:00Z"
}
\`\`\`

## Deep Sleep — ประหยัด Battery
Deep Sleep: เคล็ดลับการอยู่รอดเป็นเดือน
ถ้าระบบของเราทำงานตลอดเวลา แบตเตอรี่จะหมดภายในไม่กี่วันครับ เทคนิคของพวกเราคือการใช้ "Deep Sleep" เปรียบเสมือนให้ ESP32 "หลับลึก" เกือบตลอดเวลา แล้วตั้งนาฬิกาปลุกให้ตื่นขึ้นมาทำงานแค่ 2 วินาที (อ่านค่า -> ส่ง Wi-Fi -> นอนต่อ)
\`\`\`cpp
void loop() {
  readSensors();     // ตื่นมาอ่านค่า
  publishMQTT();     // รายงานตัวผ่าน Wi-Fi
  
  // สั่งให้นอนหลับเป็นเวลา 5 นาที (หน่วยเป็น Microseconds)
  esp_sleep_enable_timer_wakeup(5 * 60 * 1000000ULL); 
  
  Serial.println("Going to sleep...");
  esp_deep_sleep_start();
}
\`\`\`
ผลลัพธ์ที่ได้: จากปกติที่บอร์ดกินไฟ 180mA (ตอนส่ง Wi-Fi) จะลดเหลือเพียง < 10µA ตอนนอน ซึ่งน้อยกว่ากระแสไฟที่ถ่านคายประจุเองเสียอีก! ทำให้เราสามารถใช้โซลาร์เซลล์เล็ก ๆ เลี้ยงระบบได้ยาวนานครับ
Current draw: **180mA** awake → **< 10µA** deep sleep

ดู source code ทั้งหมดที่ GitHub (Sprint S2)
ในการทดลอง Sprint S2 นี้ เราได้วางรากฐานสำคัญของระบบเก็บข้อมูลดินแล้วครับ หากใครที่กำลังมองหาอุปกรณ์สำหรับประกอบ NODE-S สามารถเลือกดูชิ้นส่วนที่ทีมเราใช้งานจริงได้ที่ลิงก์ด้านล่างนี้เลย

ESP32-S3 Development Board: [ดูรายละเอียดสินค้า](https://pwdvisionworks.com/shop/esp32-s3-development-board)

Capacitive Soil Moisture Sensor v1.2: [ดูรายละเอียดสินค้า](https://pwdvisionworks.com/shop/capacitive-soil-moisture-sensor-v1-2)

Solar Charging Kit สำหรับ IoT: [ดูรายละเอียดสินค้า](https://pwdvisionworks.com/shop/solar-charging-kit-for-iot)

มาร่วมสร้างระบบวิจัยสภาพแวดล้อมที่แข็งแกร่งไปด้วยกันกับ Terra Project @ pwdvisionworks.com นะครับ! ใครมีคำถามหรือติดปัญหาตอน Calibrate พิมพ์ถามในกลุ่มโปรเจกต์ได้เลย!`,
  },

  {
    slug: 'raspberry-pi-mosquitto-mqtt-docker',
    title: 'Raspberry Pi 5 + Mosquitto MQTT Broker in Docker',
    titleTh: 'ติดตั้ง Mosquitto MQTT Broker บน Raspberry Pi 5 ด้วย Docker',
    date: '2026-04-21',
    phase: 'Phase 1',
    sprint: 'S1 (Plan)',
    difficulty: 2,
    tags: ['Raspberry Pi', 'MQTT', 'Docker', 'Mosquitto', 'Network'],
    excerpt:
      'Setup RPi5 เป็น IoT hub — Docker Compose ที่รัน Mosquitto + TimescaleDB + Node-RED พร้อม TLS และ authentication',
    products: [
      { name: 'Raspberry Pi 5 (8GB)', url: 'https://pwdvisionworks.com/shop/raspberry-pi-5-8gb' },
      { name: 'Samsung 860 EVO 500GB SSD', url: 'https://pwdvisionworks.com/shop/ssd-500gb' },
      { name: 'UPS HAT for RPi (18650 battery)', url: 'https://pwdvisionworks.com/shop/rpi-ups-hat' },
      { name: 'Waterproof Junction Box IP66', url: 'https://pwdvisionworks.com/shop/ip66-box' },
    ],
    content: `## Architecture Overview

## 🛠️ จากบอร์ดเล็กสู่หัวใจของระบบ: สถาปัตยกรรม Edge Hub

ในการทำฟาร์มอัจฉริยะหรือระบบ IoT ขนาดใหญ่ เราไม่สามารถพึ่งพา Cloud ได้ 100% เพราะหากอินเทอร์เน็ตตัด การควบคุมปั๊มน้ำหรือเซนเซอร์จะหยุดชะงักทันที นั่นคือเหตุผลที่เราเลือกใช้ **Raspberry Pi 5** มาทำหน้าที่เป็น **"Edge Hub"** หรือสมองส่วนหน้าที่คอยจัดการทุกอย่างภายในพื้นที่



ลองจินตนาการถึงการจราจรของข้อมูลครับ:
- **ESP32 Nodes:** คือพนักงานภาคสนามที่ส่งข้อมูลผ่าน WiFi
- **Mosquitto (MQTT):** คือบุรุษไปรษณีย์ที่คอยรับ-ส่งข้อความ
- **Node-RED:** คือผู้จัดการที่คอยตัดสินใจ (ถ้าดินแห้ง ให้สั่งเปิดปั๊ม)
- **TimescaleDB:** คือสมุดจดบันทึกสถิติที่มีประสิทธิภาพสูง
- **Cloudflared:** คืออุโมงค์ลับที่ช่วยให้เราแอบดูระบบจากนอกบ้านได้ปลอดภัยโดยไม่ต้อง Forward Port

\`\`\`
                    ┌─ Mosquitto (Broker กลาง)
ESP32 nodes ──WiFi──┤  RPi5 Docker Container
                    ├─ Node-RED (Logic & Dashboard)
                    ├─ TimescaleDB (ฐานข้อมูล Time-series)
                    └─ cloudflared (Tunnel สำหรับ Remote Access)
\`\`\`

## Docker Compose
🐳 จัดระเบียบระบบด้วย Docker Compose
ทำไมต้อง Docker? เพราะในอดีตการลง Database คู่กับ MQTT บน OS โดยตรงมักเจอปัญหา Library ตีกันครับ การใช้ Docker ทำให้เรา "ยกไปทั้งกล่อง" จะย้ายบอร์ดหรือ Backup ก็ทำได้ง่ายเพียงคำสั่งเดียว
\`\`\`yaml
version: '3.8'
services:
  # บุรุษไปรษณีย์ของเรา
  mosquitto:
    image: eclipse-mosquitto:2
    ports: ["1883:1883", "8883:8883"]
    volumes:
      - ./mosquitto/config:/mosquitto/config
      - ./mosquitto/data:/mosquitto/data

  # คลังข้อมูลที่ออกแบบมาเพื่อเก็บข้อมูลเซนเซอร์โดยเฉพาะ (Time-series)
  timescaledb:
    image: timescale/timescaledb:latest-pg15
    environment:
      POSTGRES_PASSWORD: \${DB_PASSWORD}
    volumes:
      - /opt/terra/db:/var/lib/postgresql/data

  # สมองกลที่เชื่อมต่อทุกบริการเข้าด้วยกัน
  nodered:
    image: nodered/node-red:3
    ports: ["1880:1880"]
    depends_on: [mosquitto, timescaledb] # ต้องรอให้ DB และ Broker พร้อมก่อนถึงจะทำงาน
\`\`\`

## Mosquitto Config + Authentication
🔒 ความปลอดภัยคือหัวใจ: Mosquitto & ACL
เราคงไม่อยากให้เพื่อนบ้านแอบส่งคำสั่งมาปิดน้ำในฟาร์มเราได้ ดังนั้นเราจึงต้องทำ "บัตรผ่านประตู" (Authentication) และ "สิทธิ์การเข้าถึง" (ACL)

ในไฟล์คอนฟิก เราจะปิดโหมด anonymous และใช้พอร์ต 8883 สำหรับการส่งข้อมูลที่เข้ารหัส (TLS) เพื่อป้องกันการดักฟังข้อมูลกลางอากาศ
\`\`\`conf
# /mosquitto/config/mosquitto.conf
listener 1883
allow_anonymous false
password_file /mosquitto/config/passwd
acl_file /mosquitto/config/acl

# เสริมเกราะป้องกันด้วย TLS
listener 8883
cafile /mosquitto/certs/ca.crt
certfile /mosquitto/certs/server.crt
keyfile /mosquitto/certs/server.key
\`\`\`

## ACL Rules
การจำกัดสิทธิ์ (ACL Rules)
เรากำหนดให้ ESP32 ส่งข้อมูล (Write) ได้เฉพาะใน Topic ที่เกี่ยวข้องกับเซนเซอร์ และอ่าน (Read) ได้เฉพาะคำสั่งเปิด-ปิดวาล์วเท่านั้น เป็นการป้องกันหากมีโหนดใดโหนดหนึ่งถูกเจาะ ระบบส่วนที่เหลือจะยังปลอดภัย
\`\`\`
# Only ESP32 nodes can publish sensor data
user esp32_nodes
topic write farm/soil/#
topic write farm/weather/#
topic write farm/+/heartbeat
topic read  farm/pump/main/cmd
topic read  farm/valve/+/cmd
\`\`\`

## Static IP Setup
📌 บ้านเลขที่คงที่ด้วย Static IP
เพื่อให้ทุกอุปกรณ์ในวงแลนรู้จักทางมาหา Hub ได้อย่างแม่นยำ เราต้องล็อค "บ้านเลขที่" (IP Address) ให้กับ Raspberry Pi ครับ ไม่เช่นนั้นหาก Router รีบูตแล้ว IP เปลี่ยน ทุกโหนดจะหา Server ไม่เจอทันที
\`\`\`bash
# /etc/dhcpcd.conf
interface eth0
static ip_address=192.168.10.10/24
static routers=192.168.10.1
static domain_name_servers=1.1.1.1
\`\`\`

นี่เป็นเพียงจุดเริ่มต้นของการสร้าง IoT Hub ที่แข็งแกร่งครับ หากใครต้องการดูขั้นตอนการติดตั้งแบบละเอียดทุกขั้นตอน รวมถึงการทดสอบระบบสำรองไฟ (UPS Failover) เมื่อไฟดับ สามารถตามไปอ่านต่อได้ที่ Sprint S1 สำหรับ full setup guide มาเรียนรู้และสร้างไปพร้อมกันครับ!`,
  },

  {
    slug: 'node-red-irrigation-automation',
    title: 'Node-RED Automation Flow สำหรับระบบรดน้ำอัจฉริยะ',
    titleTh: 'สร้าง Node-RED Flow ควบคุมการรดน้ำอัตโนมัติตาม Soil Moisture',
    date: '2026-05-15',
    phase: 'Phase 1',
    sprint: 'S4',
    difficulty: 3,
    tags: ['Node-RED', 'Automation', 'MQTT', 'IoT', 'Irrigation'],
    excerpt:
      'ออกแบบ Node-RED flows สำหรับ threshold-based irrigation: รับ soil moisture → ตัดสินใจ → สั่ง pump/valve — พร้อม safety timeout และ rain skip logic',
    products: [
      { name: 'Solenoid Valve 1/2" 12V DC', url: 'https://pwdvisionworks.com/shop/solenoid-valve-12v' },
      { name: 'SSR Relay 40A (Solid State)', url: 'https://pwdvisionworks.com/shop/ssr-relay-40a' },
      { name: 'Hall Effect Flow Sensor YF-S201', url: 'https://pwdvisionworks.com/shop/flow-sensor-yf-s201' },
      { name: '4-Channel Relay Module 5V', url: 'https://pwdvisionworks.com/shop/relay-module-4ch' },
    ],
    content: `## Flow Architecture
🧠 หัวใจของระบบ: การออกแบบ Flow Architecture
หาก Raspberry Pi คือร่างกาย Node-RED ก็คือ "ระบบประสาทส่วนกลาง" ครับ หน้าที่ของมันไม่ใช่แค่รับคำสั่ง แต่คือการตัดสินใจว่า "เมื่อไหร่ควรทำ และเมื่อไหร่ควรหยุด" ในบทเรียนนี้เราจะเจาะลึก Flow F03 — Threshold Irrigation ซึ่งเปรียบเสมือนปฏิกิริยารีเฟล็กซ์ของระบบ เมื่อดินส่งสัญญาณว่า "หิว" (ความชื้นต่ำ) ระบบจะสั่งงานทันที
ระบบมี 8 flows หลัก แต่ใน Tutorial นี้จะเน้น **Flow F03 — Threshold Irrigation**:

\`\`\`

[MQTT In: รับค่าความชื้นจากเซนเซอร์]
           ↓
[Function: validate + check threshold]
[Decision: ดินแห้งจริงไหม? เพิ่งรดไปหรือเปล่า?]
           ↓ moisture < 60% (ถ้าความชื้น < 60% และพ้นระยะพัก)
[Function: build pump command]
[Action: สร้างชุดคำสั่งเปิดวาล์วและปั๊ม]
           ↓
[MQTT Out: farm/pump/main/cmd]
           ↓
[MQTT Out: ส่งคำสั่งไปที่ Hardware ตามโซนต่างๆ]
           ↓ (เมื่อทำงานครบเวลา)
[Function: stop command]
[Stop: ส่งคำสั่งปิดเพื่อประหยัดน้ำและถนอมปั๊ม]
\`\`\`

## Decision Logic
Decision Logic: ทำไมต้องมีระยะพัก (Cooldown)?
ในการทดลองจริง เราพบปัญหาว่าถ้าเราสั่งรดน้ำทันทีที่ความชื้นต่ำกว่าเกณฑ์ พอน้ำเริ่มซึมลงดิน เซนเซอร์อาจจะยังไม่ทันปรับค่า ทำให้ระบบสั่งรดซ้ำๆ จนน้ำนอง (Oscillation)

เราจึงต้องใส่ "Cooldown" หรือระยะพักเหนื่อยให้ระบบ เหมือนคนเราที่กินน้ำเสร็จแล้วต้องรอให้หายกระหายก่อน ไม่ใช่เทน้ำใส่ปากตลอดเวลาครับ
\`\`\`javascript
// Function node: ตรวจสอบความเหมาะสมก่อนรดน้ำ
const data = msg.payload;
const THRESHOLD_LOW = 60;   // % — start irrigation — จุดที่ดินเริ่มหิวตัวสั่น
const COOLDOWN_MIN  = 30;   // ระยะพักเหนื่อย 30 นาที ป้องกันการรดซ้ำซ้อน prevent re-trigger

// Check cooldown ดึงเวลาที่รดน้ำครั้งล่าสุดออกมาดู
const lastTrigger = flow.get('lastTrigger_' + data.node_id) || 0;
const minutesSince = (Date.now() - lastTrigger) / 60000;

if (data.moisture_pct < THRESHOLD_LOW && minutesSince > COOLDOWN_MIN) {
    // บันทึกเวลาที่รดครั้งนี้ลงในหน่วยความจำ
    flow.set('lastTrigger_' + data.node_id, Date.now());
    
    msg.payload = {
        action: "on",
        duration_min: 20, // กำหนดเลยว่าจะรดกี่นาที
        source: "soil_threshold"
    };
    return msg;
}
return null; // ถ้ายังไม่เข้าเงื่อนไข ก็ไม่ต้องส่งคำสั่งไปไหนต่อ
\`\`\`

## Safety: Pump Timeout
Safety First: ระบบ Pump Timeout (Guardrail)
นักทดลองมือโปรต้องเผื่อกรณี "ระบบค้าง" หรือ "เน็ตหลุด" ครับ ลองจินตนาการว่าถ้า Node-RED ส่งคำสั่ง "เปิด" แล้วดันมีปัญหาทำให้ส่งคำสั่ง "ปิด" ไม่ได้... น้ำท่วมฟาร์มและปั๊มไหม้แน่นอน!

เราจึงสร้าง Guardrail G1.1 หรือ "ระบบตัดไฟอัตโนมัติ" ไว้ในระดับ Software ถ้าปั๊มรดน้ำนานเกินไป Watchdog จะเห่าและสั่งปิดทันที
GUARDRAIL G1.1 — ปั๊มต้องหยุดเองเสมอ:

\`\`\`javascript
// Every pump ON command MUST have duration_min ทุกคำสั่งเปิดปั๊ม "ต้อง" มีเวลาสิ้นสุดเสมอ
// ใช้ Watchdog timer เป็นแผนสำรอง (Safety Backup):
const watchdog = setTimeout(() => {
    node.send({ payload: { action: "off", source: "watchdog_timeout" }});
    node.warn("Watchdog triggered: ปั๊มทำงานนานเกินไป สั่งปิดเพื่อความปลอดภัย!");
}, maxRuntime * 60 * 1000);

context.set('watchdog', watchdog);
\`\`\`

## Rain Skip Logic
Rain Skip Logic: ทำงานอย่างฉลาด (Smart Savings)
ทำไมต้องรดน้ำให้เปลืองไฟ ในเมื่อฟ้ากำลังจะฝนตก? เราดึงข้อมูลจาก Weather API มาใช้ใน Flow F02 เพื่อตรวจสอบปริมาณฝนสะสมในช่วง 2 ชั่วโมงที่ผ่านมา ถ้าฝนตกหนักพอ ระบบจะสั่ง "ยกเลิก" การรดน้ำรอบนั้นทันที
\`\`\`javascript
// Flow F02: check before any scheduled irrigation
const rainMm = global.get('weather.rain_mm_2hr') || 0;
const RAIN_SKIP_MM = 5; // ถ้าฝนตกเกิน 5mm ถือว่าอิ่มแล้ว

if (rainMm > RAIN_SKIP_MM) {
    // Cancel irrigation + notify ยกเลิกการรดน้ำ และแจ้งเตือนเข้าระบบ Log
    return [null, { payload: { skip_reason: 'rain_detected', rain_mm: rainMm }}];
}
return [msg, null];
\`\`\`

## Export Flow JSON
Version Control สำหรับ Node-RED
ในฐานะนักพัฒนา เราจะไม่ยอมให้ Flow หายไปถ้า Container มีปัญหาครับ การ Backup Flow ออกมาเป็นไฟล์ JSON ทำให้เราสามารถทำ Version Control (Git) ได้เหมือนเขียนโค้ดปกติเลย
Node-RED flows export เป็น JSON และ commit ใน repo:

\`\`\`bash
# Backup flows
# คำสั่งดึง Flow จาก Docker ออกมาเก็บในโปรเจกต์
docker exec nodered cat /data/flows.json > flows/nodered_flows.json
\`\`\`

Terra Project เชื่อว่าความสนุกของการทำ IoT คือการได้เห็นระบบที่เรา "สอน" มันด้วย Logic ทำงานได้จริงในโลกภายนอก ใครที่อยากได้ Flow JSON แบบพร้อม Import ไปลองเล่นดูได้ที่ Sprint S4 สำหรับ full setup guide แล้วมาแชร์ผลลัพธ์กันในคลาสถัดไปนะครับ!`,
  },
]

export function getPost(slug: string): Post | undefined {
  return posts.find(p => p.slug === slug)
}
