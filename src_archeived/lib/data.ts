import type { Sensor, BlogPost, Phase, NavItem } from '@/types'

// ─── Navigation ───────────────────────────────────────────────
export const NAV_ITEMS: NavItem[] = [
  { label: 'HOME',      href: '/' },
  { label: 'LAB',       href: '/lab' },
  { label: 'PIPELINE',  href: '/#pipeline' },
  { label: 'BLOG',      href: '/blog' },
  { label: 'ABOUT',     href: '/about' },
  { label: 'DASHBOARD', href: '/dashboard', badge: 'LIVE' },
]

// ─── Sensor Catalog ───────────────────────────────────────────
export const SENSORS: Sensor[] = [
  // Soil
  { model: 'KS0049', name: 'Soil Humidity Sensor (Resistive)',  category: 'soil',   interface: 'Analog',        episode: 'EP06', board: 'both',    difficulty: 1, terraRole: 'Baseline — compare vs capacitive' },
  { model: 'KS0108', name: 'EASY Plug Soil Humidity',           category: 'soil',   interface: 'Analog+Digital',episode: 'EP06', board: 'esp32',   difficulty: 1, terraRole: 'Beginner-friendly plug connector' },
  { model: 'KS0471', name: 'Honeycomb Soil Sensor (Microbit)',  category: 'soil',   interface: 'Analog+I2C',    episode: 'EP13', board: 'both',    difficulty: 2, terraRole: 'Visual content — honeycomb design' },
  { model: 'KS0510', name: 'New Type Soil Humidity (Capacitive)',category: 'soil',  interface: 'Analog',        episode: 'EP14', board: 'both',    difficulty: 2, isFeatured: true, terraRole: 'TERRA production sensor ★' },
  // Environment
  { model: 'KS0034', name: 'DHT11 Temperature & Humidity',      category: 'env',    interface: '1-Wire',        episode: 'EP05', board: 'both',    difficulty: 1, terraRole: 'Entry-point tutorial sensor' },
  { model: 'KS0430', name: 'DHT22 / AM2302 Temp & Humidity',    category: 'env',    interface: '1-Wire',        episode: 'EP07', board: 'both',    difficulty: 1, isFeatured: true, terraRole: '±0.5°C accuracy — weather node' },
  { model: 'KS0405', name: 'BMP280 Temp & Air Pressure',        category: 'env',    interface: 'I2C / SPI',     episode: 'EP08', board: 'both',    difficulty: 2, terraRole: 'Barometric pressure + altitude' },
  // Motion
  { model: 'KS0021', name: 'Collision Sensor Module',           category: 'motion', interface: 'Digital',       episode: 'EP02', board: 'esp32',   difficulty: 1, terraRole: 'Farm intrusion detection' },
  { model: 'KS0025', name: 'Digital Tilt Sensor',               category: 'motion', interface: 'Digital',       episode: 'EP03', board: 'esp32',   difficulty: 1, terraRole: 'Node tamper / door status' },
  { model: 'KS0375', name: 'SR01 Ultrasonic Sensor',            category: 'motion', interface: 'Trigger/Echo',  episode: 'EP09', board: 'both',    difficulty: 2, terraRole: 'Water tank level monitoring' },
  { model: 'KS6044', name: 'Vibration Motor Module',            category: 'motion', interface: 'Digital Out',   episode: 'EP04', board: 'esp32',   difficulty: 1, terraRole: 'Haptic alert actuator' },
  // Optical / IR
  { model: 'KS6008', name: 'LED Traffic Light Module',          category: 'light',  interface: 'Digital Out',   episode: 'EP04', board: 'both',    difficulty: 1, terraRole: 'Soil status visual indicator' },
  { model: 'KS6036', name: 'IR Receiver Module (STEM)',         category: 'light',  interface: 'Digital (38kHz)',episode: 'EP10', board: 'both',    difficulty: 2, terraRole: 'Remote pump override' },
  { model: 'KS6037', name: 'IR Transmitter Sensor',             category: 'light',  interface: 'Digital Out',   episode: 'EP10', board: 'both',    difficulty: 2, terraRole: 'IR communication pair' },
  // Boards
  { model: 'KS0413', name: 'ESP32 WROOM-32D Development Board', category: 'board',  interface: 'WiFi + BT',     board: 'esp32',   difficulty: 2, terraRole: 'Main TERRA field node' },
  { model: 'KS5019', name: 'ESP32 Mini Development Board',      category: 'board',  interface: 'WiFi + BT',     board: 'esp32',   difficulty: 2, terraRole: 'Compact prototyping node' },
  // Vision AI
  { model: 'MB0184', name: 'ESP32-S3 CAM WROOM-1 N16R8',       category: 'vision', interface: 'Camera + WiFi', episode: 'EP17', board: 'esp32s3', difficulty: 3, terraRole: 'Plant time-lapse + field cam' },
  { model: 'MD0750', name: 'ESP32-S3 AI Smartie N16R8',         category: 'vision', interface: 'TFLite + AI',   episode: 'EP18', board: 'esp32s3', difficulty: 4, isFeatured: true, terraRole: 'On-device disease detection AI' },
]

// ─── Blog Posts ───────────────────────────────────────────────
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'terra-ep01-rpi5-vs-esp32',
    episode: 'EP01',
    title: 'Raspberry Pi 5 vs ESP32 — What Is the Difference?',
    titleTh: 'Raspberry Pi 5 vs ESP32 ต่างกันอย่างไร? เลือกบอร์ดไหนสำหรับงาน IoT',
    category: 'Getting Started',
    phase: 0,
    readTime: '8 min',
    publishDate: '2024-01-01',
    types: ['blog', 'video'],
    tags: ['raspberry-pi-5', 'esp32', 'iot', 'beginner'],
    excerpt: 'เปรียบเทียบ architecture, use cases, และเมื่อไหรควรใช้บอร์ดไหนใน TERRA ecosystem',
    sensors: [],
  },
  {
    slug: 'terra-ep07-dht11-vs-dht22',
    episode: 'EP07',
    title: 'DHT11 vs DHT22 — 24-Hour Accuracy Battle on Grafana',
    titleTh: 'DHT11 vs DHT22 — ทดสอบ Accuracy 24 ชั่วโมงด้วย Grafana Dashboard',
    category: 'Comparison',
    phase: 1,
    readTime: '12 min',
    publishDate: '2024-02-15',
    types: ['blog', 'video', 'notebook'],
    tags: ['dht11', 'dht22', 'temperature', 'humidity', 'comparison', 'grafana'],
    excerpt: 'นำ DHT11 และ DHT22 ทดสอบพร้อมกัน log ข้อมูล 24 ชั่วโมง วิเคราะห์ด้วย Python และแสดงผลบน Grafana',
    sensors: ['KS0034', 'KS0430'],
  },
  {
    slug: 'terra-ep12-soil-showdown',
    episode: 'EP12–15',
    title: 'Soil Showdown — 4 Sensors in Real Longan Farm Soil (Series)',
    titleTh: '4 Soil Sensors ลงดินจริง 7 วัน — ตัวไหนชนะ? [Series]',
    category: 'Soil Showdown ★★',
    phase: 2,
    readTime: '4-part series',
    publishDate: '2024-04-01',
    types: ['blog', 'video', 'notebook'],
    tags: ['soil', 'capacitive', 'resistive', 'comparison', 'longan', 'data-analysis'],
    excerpt: 'soil sensor ทั้ง 4 รุ่น (KS0049, KS0108, KS0471, KS0510) ลงดินสวนลำไยจริง วัดพร้อมกัน 7 วัน พร้อม open dataset',
    sensors: ['KS0049', 'KS0108', 'KS0471', 'KS0510'],
  },
]

// ─── Phases ───────────────────────────────────────────────────
export const PHASES: Phase[] = [
  {
    number: 0,
    title: 'Foundation Lab — Digital Sensors & GPIO Basics',
    period: 'เดือน 1–2 · NOW',
    description: 'เริ่มต้น TERRA: tutorial sensor พื้นฐาน, RPi5 + ESP32 setup, blog series แรก, GitHub repo launch',
    chips: ['Collision', 'Tilt', 'Traffic LED', 'DHT11', 'Soil Resistive', 'EP01–06'],
    status: 'active',
  },
  {
    number: 1,
    title: 'Protocols & Precision — I2C, SPI, MQTT Pipeline',
    period: 'เดือน 3–4',
    description: 'DHT22 upgrade, BMP280 I2C, ultrasonic water level, IR communication, TERRA pipeline ครั้งแรก',
    chips: ['DHT22', 'BMP280', 'Ultrasonic', 'IR Pair', 'Node-RED', 'EP07–11'],
    status: 'upcoming',
  },
  {
    number: 2,
    title: 'Soil Intelligence — 4-Sensor Comparison in the Field',
    period: 'เดือน 5–6',
    description: 'Flagship series: soil sensor ทั้ง 4 รุ่น ลงดินจริง 7 วัน, Python analysis, open dataset สาธารณะ',
    chips: ['4× Soil Sensors', 'TimescaleDB', 'Grafana', 'Jupyter Notebook', 'EP12–16'],
    status: 'upcoming',
  },
  {
    number: 3,
    title: 'Vision & Edge AI — ESP32-S3 Camera + TFLite',
    period: 'เดือน 7–8',
    description: 'Time-lapse ต้นลำไย, on-device disease detection, TERRA AI preview สู่ Phase ML เต็มรูปแบบ',
    chips: ['ESP32-S3 CAM', 'TFLite', 'YOLOv8n', 'Edge Impulse', 'EP17–18'],
    status: 'upcoming',
  },
]
