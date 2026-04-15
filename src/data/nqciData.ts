export interface TrendPoint {
  date: string;
  value: number;
  ytdAvg: number;
}

export interface WellData {
  name: string;
  oil: number;
  gas: number;
  status: 'active' | 'idle' | 'maintenance';
}

export interface PlatformData {
  name: string;
  today: number;
  ytdAvg: number;
  capacity: number;
  wells?: WellData[];
}

export interface ProductKpis {
  last24h: number;
  yesterday: number;
  ytdAvg: number;
  plan: number;
  unit: string;
  delta24h: number;
  deltaYtd: number;
}

export interface DataHealthItem {
  asset: string;
  status: 'healthy' | 'delayed' | 'missing' | 'stale';
  lastUpdate: string;
  severity: 'ok' | 'warning' | 'critical';
  reason?: string;
}

export interface SideMetric {
  label: string;
  value: string;
  unit: string;
  prev: string;
}

export interface NqciDashboardData {
  meta: {
    title: string;
    subtitle: string;
    date: string;
    lastRefresh: string;
  };
  oil: {
    kpis: ProductKpis;
    trend: TrendPoint[];
    platforms: PlatformData[];
  };
  gas: {
    kpis: ProductKpis;
    trend: TrendPoint[];
    platforms: PlatformData[];
  };
  dataHealth: DataHealthItem[];
  sideMetrics: SideMetric[];
}

function generateWells(platformNum: number, oilBase: number, gasBase: number, count = 10): WellData[] {
  const statuses: WellData['status'][] = ['active', 'active', 'active', 'active', 'active', 'active', 'active', 'idle', 'maintenance', 'active'];
  return Array.from({ length: count }, (_, i) => ({
    name: `W-${platformNum}${String(i + 1).padStart(2, '0')}`,
    oil: Math.round(oilBase * (0.6 + Math.random() * 0.8)),
    gas: Math.round(gasBase * (0.6 + Math.random() * 0.8)),
    status: statuses[i % statuses.length],
  }));
}

const months = [
  'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct',
  'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr',
];

const oilMonthly = [
  20100, 19870, 19620, 19340, 19100, 18880,
  18700, 18500, 18300, 18180, 18340, 18400,
];

const gasMonthly = [
  13900, 13720, 13520, 13330, 13120, 12950,
  12800, 12680, 12590, 12550, 12700, 12800,
];

export const nqciDashboardData: NqciDashboardData = {
  meta: {
    title: '28 May NQCI Oil & Gas Production Dashboard',
    subtitle: 'Operational production and platform performance overview',
    date: '14 April 2026',
    lastRefresh: '06:42 AM',
  },
  oil: {
    kpis: {
      last24h: 18400, yesterday: 18250, ytdAvg: 18950, plan: 19600,
      unit: 'bbl/d', delta24h: 0.8, deltaYtd: -2.9,
    },
    trend: oilMonthly.map((v, i) => ({ date: months[i], value: v, ytdAvg: 18950 })),
    platforms: [
      { name: 'Platform 1', today: 31500, ytdAvg: 30800, capacity: 87, wells: generateWells(1, 3150, 3650) },
      { name: 'Platform 2', today: 21300, ytdAvg: 20700, capacity: 79, wells: generateWells(2, 2130, 1840) },
      { name: 'Platform 3', today: 18400, ytdAvg: 18950, capacity: 82, wells: generateWells(3, 1840, 1280) },
      { name: 'Platform 4', today: 16200, ytdAvg: 15700, capacity: 91, wells: generateWells(4, 1620, 1120) },
      { name: 'Platform 5', today: 9100, ytdAvg: 8900, capacity: 76, wells: generateWells(5, 910, 810) },
      { name: 'Platform 6', today: 8400, ytdAvg: 8200, capacity: 71, wells: generateWells(6, 840, 720) },
      { name: 'Platform 7', today: 7600, ytdAvg: 7800, capacity: 68, wells: generateWells(7, 760, 650) },
      { name: 'Platform 8', today: 6900, ytdAvg: 7100, capacity: 64, wells: generateWells(8, 690, 590) },
      { name: 'Platform 9', today: 5800, ytdAvg: 5600, capacity: 59, wells: generateWells(9, 580, 510) },
      { name: 'Platform 10', today: 5200, ytdAvg: 5400, capacity: 55, wells: generateWells(10, 520, 440) },
      { name: 'Platform 11', today: 4500, ytdAvg: 4300, capacity: 52, wells: generateWells(11, 450, 380) },
      { name: 'Platform 12', today: 3800, ytdAvg: 4100, capacity: 48, wells: generateWells(12, 380, 320) },
      { name: 'Platform 13', today: 3200, ytdAvg: 3100, capacity: 44, wells: generateWells(13, 320, 270) },
      { name: 'Platform 14', today: 2600, ytdAvg: 2500, capacity: 40, wells: generateWells(14, 260, 210) },
    ],
  },
  gas: {
    kpis: {
      last24h: 12800, yesterday: 12700, ytdAvg: 13150, plan: 13600,
      unit: 'm³/d', delta24h: 0.8, deltaYtd: -2.7,
    },
    trend: gasMonthly.map((v, i) => ({ date: months[i], value: v, ytdAvg: 13150 })),
    platforms: [
      { name: 'Platform 1', today: 36500, ytdAvg: 35200, capacity: 93, wells: generateWells(1, 3150, 3650) },
      { name: 'Platform 2', today: 18400, ytdAvg: 17900, capacity: 84, wells: generateWells(2, 2130, 1840) },
      { name: 'Platform 3', today: 12800, ytdAvg: 13150, capacity: 78, wells: generateWells(3, 1840, 1280) },
      { name: 'Platform 4', today: 11200, ytdAvg: 10700, capacity: 72, wells: generateWells(4, 1620, 1120) },
      { name: 'Platform 5', today: 8100, ytdAvg: 7900, capacity: 68, wells: generateWells(5, 910, 810) },
      { name: 'Platform 6', today: 7200, ytdAvg: 7400, capacity: 65, wells: generateWells(6, 840, 720) },
      { name: 'Platform 7', today: 6500, ytdAvg: 6300, capacity: 61, wells: generateWells(7, 760, 650) },
      { name: 'Platform 8', today: 5900, ytdAvg: 6100, capacity: 58, wells: generateWells(8, 690, 590) },
      { name: 'Platform 9', today: 5100, ytdAvg: 4900, capacity: 54, wells: generateWells(9, 580, 510) },
      { name: 'Platform 10', today: 4400, ytdAvg: 4600, capacity: 50, wells: generateWells(10, 520, 440) },
      { name: 'Platform 11', today: 3800, ytdAvg: 3700, capacity: 47, wells: generateWells(11, 450, 380) },
      { name: 'Platform 12', today: 3200, ytdAvg: 3500, capacity: 43, wells: generateWells(12, 380, 320) },
      { name: 'Platform 13', today: 2700, ytdAvg: 2600, capacity: 39, wells: generateWells(13, 320, 270) },
      { name: 'Platform 14', today: 2100, ytdAvg: 2200, capacity: 35, wells: generateWells(14, 260, 210) },
    ],
  },
  dataHealth: [
    { asset: 'Dubendi terminal', status: 'delayed', lastUpdate: '06:15 AM', severity: 'warning' },
    { asset: '28 May tanks', status: 'missing', lastUpdate: 'Since 05:10', severity: 'critical' },
    { asset: 'Platform 1', status: 'healthy', lastUpdate: '06:40 AM', severity: 'ok' },
    { asset: 'Platform 2', status: 'healthy', lastUpdate: '06:41 AM', severity: 'ok' },
    { asset: 'Platform 3', status: 'healthy', lastUpdate: '06:39 AM', severity: 'ok' },
    { asset: 'Platform 4', status: 'healthy', lastUpdate: '06:42 AM', severity: 'ok' },
    { asset: 'Platform 5', status: 'healthy', lastUpdate: '06:40 AM', severity: 'ok' },
    { asset: 'Platform 6', status: 'delayed', lastUpdate: '05:58 AM', severity: 'warning' },
    { asset: 'Platform 7', status: 'healthy', lastUpdate: '06:41 AM', severity: 'ok' },
    { asset: 'Platform 8', status: 'healthy', lastUpdate: '06:42 AM', severity: 'ok' },
    { asset: 'Platform 9', status: 'stale', lastUpdate: '04:30 AM', severity: 'warning' },
    { asset: 'Platform 10', status: 'healthy', lastUpdate: '06:38 AM', severity: 'ok' },
    { asset: 'Platform 11', status: 'healthy', lastUpdate: '06:40 AM', severity: 'ok' },
    { asset: 'Platform 12', status: 'missing', lastUpdate: 'Since 03:20', severity: 'critical' },
    { asset: 'Platform 13', status: 'healthy', lastUpdate: '06:41 AM', severity: 'ok' },
    { asset: 'Platform 14', status: 'healthy', lastUpdate: '06:39 AM', severity: 'ok' },
  ],
  sideMetrics: [
    { label: 'Total liquid rate', value: '142.8K', unit: 'bbl/d', prev: '141.5K' },
    { label: 'Water cut', value: '32.4', unit: '%', prev: '32.6' },
    { label: 'GOR', value: '6.63', unit: 'Mscf/bbl', prev: '6.58' },
    { label: 'Oil efficiency', value: '94.2', unit: '%', prev: '93.8' },
    { label: 'Gas efficiency', value: '96.1', unit: '%', prev: '95.9' },
    { label: 'Active wells', value: '847', unit: 'wells', prev: '845' },
    { label: 'Injection rate', value: '98.5K', unit: 'bbl/d', prev: '97.8K' },
    { label: 'Flare rate', value: '12.4', unit: 'MMscf/d', prev: '12.8' },
  ],
};
