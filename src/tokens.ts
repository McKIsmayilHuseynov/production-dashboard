export const colors = {
  pageBg: '#F2F3F5',
  cardBg: '#FFFFFF',
  cardBorder: '#E8ECF0',
  divider: '#F0F2F4',
  dividerStrong: '#E2E6EB',

  oil: '#4A8DC8',
  oilLight: '#C6DCF0',
  gas: '#6FAADB',
  gasLight: '#C6DCF0',

  textPrimary: '#1A1F2B',
  textSecondary: '#4B5563',
  textMuted: '#8896A6',
  textIcon: '#6B7A8D',

  positive: '#2E9E5C',
  positiveBg: 'rgba(46, 158, 92, 0.08)',
  negative: '#D44B4B',
  negativeBg: 'rgba(212, 75, 75, 0.06)',
  warning: '#D4922B',
  warningBg: 'rgba(212, 146, 43, 0.08)',

  surfaceMuted: '#FAFBFC',
  gridLine: '#EFF1F3',
  refLine: '#A3C4E0',
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
  card: '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)',
  cardHover: '0 4px 12px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)',
  tooltip: '0 4px 14px rgba(0,0,0,0.08)',
};

export const fonts = {
  sans: 'var(--font-sans)',
  display: 'var(--font-display)',
};

export const chartAxis = {
  fill: '#8896A6',
  fontSize: 9,
  fontFamily: 'var(--font-sans)',
};

export const tooltipStyle: React.CSSProperties = {
  backgroundColor: colors.cardBg,
  border: `1px solid ${colors.cardBorder}`,
  borderRadius: `${radius.md}px`,
  fontSize: '11px',
  boxShadow: shadows.tooltip,
};
