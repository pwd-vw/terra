// ─── Navigation ───────────────────────────────────────────────
export interface NavItem {
  label: string
  href: string
  external?: boolean
  badge?: string
}

// ─── Sensor Catalog ───────────────────────────────────────────
export type SensorCategory = 'soil' | 'env' | 'motion' | 'light' | 'board' | 'vision'

export interface Sensor {
  model: string
  name: string
  category: SensorCategory
  interface: string
  episode?: string
  board: 'rpi' | 'esp32' | 'both' | 'esp32s3'
  difficulty: 1 | 2 | 3 | 4
  isFeatured?: boolean
  terraRole: string
}

// ─── Blog ─────────────────────────────────────────────────────
export type ContentType = 'blog' | 'video' | 'notebook' | 'comparison'

export interface BlogPost {
  slug: string
  episode: string
  title: string
  titleTh: string
  category: string
  phase: 0 | 1 | 2 | 3
  readTime: string
  publishDate: string
  types: ContentType[]
  tags: string[]
  excerpt: string
  sensors?: string[]
}

// ─── Pipeline ─────────────────────────────────────────────────
export interface PipelineNode {
  id: string
  label: string
  sublabel: string
  detail: string
  x: number
}

// ─── Phase ────────────────────────────────────────────────────
export interface Phase {
  number: 0 | 1 | 2 | 3
  title: string
  period: string
  description: string
  chips: string[]
  status: 'active' | 'upcoming'
}

// ─── API (Cloudflare Workers) ─────────────────────────────────
export interface SensorReading {
  node_id: string
  metric: string
  value: number
  unit: string
  timestamp: string
}

export interface LatestSensorsResponse {
  nodes: {
    node_id: string
    metrics: Record<string, number>
    last_updated: string
    online: boolean
  }[]
}

export interface DashboardStats {
  totalSensors: number
  activeNodes: number
  episodesPublished: number
  dataPoints: number
}
