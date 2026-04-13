export interface TrendPoint {
  date: string;
  value: number;
  ytdAvg: number;
}

export interface PlatformData {
  name: string;
  today: number;
  ytdAvg: number;
  capacity: number;
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

const oilVals = [
  20100, 20020, 19950, 19870, 19780, 19700, 19620, 19530, 19430, 19340,
  19250, 19180, 19100, 19020, 18950, 18880, 18820, 18760, 18700, 18630,
  18560, 18500, 18430, 18360, 18300, 18220, 18180, 18250, 18340, 18400,
];

const gasVals = [
  13900, 13840, 13780, 13720, 13650, 13580, 13520, 13460, 13400, 13330,
  13260, 13190, 13120, 13060, 13000, 12950, 12900, 12850, 12800, 12760,
  12720, 12680, 12650, 12620, 12590, 12560, 12550, 12620, 12700, 12800,
];

const dates = [
  '16 Mar', '17 Mar', '18 Mar', '19 Mar', '20 Mar', '21 Mar', '22 Mar',
  '23 Mar', '24 Mar', '25 Mar', '26 Mar', '27 Mar', '28 Mar', '29 Mar',
  '30 Mar', '31 Mar', '1 Apr', '2 Apr', '3 Apr', '4 Apr', '5 Apr',
  '6 Apr', '7 Apr', '8 Apr', '9 Apr', '10 Apr', '11 Apr', '12 Apr',
  '13 Apr', '14 Apr',
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
    trend: oilVals.map((v, i) => ({ date: dates[i], value: v, ytdAvg: 18950 })),
    platforms: [
      { name: 'Gunashli', today: 31500, ytdAvg: 30800, capacity: 87 },
      { name: 'Neft Dashlari', today: 21300, ytdAvg: 20700, capacity: 79 },
      { name: '28 May', today: 18400, ytdAvg: 18950, capacity: 82 },
      { name: 'Chirag', today: 16200, ytdAvg: 15700, capacity: 91 },
      { name: 'Pirallahi', today: 9100, ytdAvg: 8900, capacity: 76 },
      { name: 'Bulla Deniz', today: 6700, ytdAvg: 6500, capacity: 74 },
    ],
  },
  gas: {
    kpis: {
      last24h: 12800, yesterday: 12700, ytdAvg: 13150, plan: 13600,
      unit: 'm³/d', delta24h: 0.8, deltaYtd: -2.7,
    },
    trend: gasVals.map((v, i) => ({ date: dates[i], value: v, ytdAvg: 13150 })),
    platforms: [
      { name: 'Shah Deniz', today: 36500, ytdAvg: 35200, capacity: 93 },
      { name: 'Gunashli', today: 18400, ytdAvg: 17900, capacity: 84 },
      { name: '28 May', today: 12800, ytdAvg: 13150, capacity: 78 },
      { name: 'Chirag', today: 11200, ytdAvg: 10700, capacity: 72 },
      { name: 'Bulla Deniz', today: 8100, ytdAvg: 7900, capacity: 68 },
      { name: 'Neft Dashlari', today: 5900, ytdAvg: 5700, capacity: 65 },
    ],
  },
  dataHealth: [
    { asset: '28 May tank-site', status: 'missing', lastUpdate: 'Since 05:10', severity: 'critical' },
    { asset: '14 platforms', status: 'healthy', lastUpdate: '06:40 AM', severity: 'ok' },
    { asset: 'Dubendi tank site', status: 'delayed', lastUpdate: '06:15 AM', severity: 'warning' },
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
