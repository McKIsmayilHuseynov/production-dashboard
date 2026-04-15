export const colors = {
  pageBg: '#0B1929',
  cardBg: '#0F2137',
  cardBorder: '#1A3550',
  divider: '#1A3550',
  dividerStrong: '#234060',

  oil: '#5A9FD4',
  oilLight: '#2A5A80',
  gas: '#7BB8E3',
  gasLight: '#2A5A80',

  textPrimary: '#C0DAF0',
  textSecondary: '#7AACCE',
  textMuted: '#4A7EA5',
  textIcon: '#5A8FB5',

  positive: '#34B78F',
  positiveBg: 'rgba(52, 183, 143, 0.14)',
  negative: '#E85858',
  negativeBg: 'rgba(232, 88, 88, 0.12)',
  warning: '#E0A835',
  warningBg: 'rgba(224, 168, 53, 0.14)',

  surfaceMuted: '#0D1C30',
  gridLine: '#1A3550',
  refLine: '#3D6B94',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radius = {
  sm: 6,
  md: 8,
  lg: 10,
  xl: 12,
} as const;

export const shadows = {
  card: '0 1px 4px rgba(0,0,0,0.25), 0 1px 2px rgba(0,0,0,0.15)',
  cardHover: '0 4px 16px rgba(0,0,0,0.35), 0 1px 4px rgba(0,0,0,0.2)',
  tooltip: '0 4px 14px rgba(0,0,0,0.4)',
};

export const fonts = {
  sans: 'var(--font-sans)',
  display: 'var(--font-display)',
};

export const chartAxis = {
  fill: '#5A8FB5',
  fontSize: 11,
  fontFamily: 'var(--font-sans)',
};

export const tooltipStyle: React.CSSProperties = {
  backgroundColor: '#132B45',
  border: `1px solid ${colors.cardBorder}`,
  borderRadius: `${radius.md}px`,
  fontSize: '11px',
  boxShadow: shadows.tooltip,
  color: colors.textPrimary,
};
