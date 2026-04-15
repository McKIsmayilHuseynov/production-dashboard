import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { PlatformData } from '../data/nqciData';
import { colors, chartAxis, tooltipStyle } from '../tokens';

interface Props {
  platform: PlatformData;
  type: 'oil' | 'gas';
  onClose: () => void;
}

const BLUE_MID = '#4A90C4';

const panelColors = {
  bg: '#0E1E33',
  cardBg: '#132B45',
  cardBorder: '#1E4468',
  divider: '#1E4468',
  accent: '#6BB3E8',
};

const OIL_BAR = '#3D7AB5';
const GAS_BAR = '#A8D8F0';

function PlatformIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <rect x="4" y="22" width="24" height="4" rx="1" fill={panelColors.accent} opacity={0.3} stroke={panelColors.accent} strokeWidth={1} />
      <rect x="8" y="14" width="4" height="8" rx="0.5" fill={panelColors.accent} opacity={0.5} />
      <rect x="14" y="10" width="4" height="12" rx="0.5" fill={panelColors.accent} opacity={0.6} />
      <rect x="20" y="16" width="4" height="6" rx="0.5" fill={panelColors.accent} opacity={0.4} />
      <path d="M10 14V8l2-3 2 3v6" stroke={panelColors.accent} strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" opacity={0.7} />
      <circle cx="16" cy="6" r="2" fill={panelColors.accent} opacity={0.25} stroke={panelColors.accent} strokeWidth={0.8} />
    </svg>
  );
}

function WellIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
      <path d="M10 2v16" stroke={panelColors.accent} strokeWidth={1.5} strokeLinecap="round" />
      <path d="M6 6h8M7 10h6" stroke={panelColors.accent} strokeWidth={1} strokeLinecap="round" opacity={0.6} />
      <circle cx="10" cy="2" r="1.5" fill={panelColors.accent} opacity={0.4} />
    </svg>
  );
}

function KpiHero({ label, value, unit, delta, deltaLabel }: {
  label: string; value: string; unit: string; delta: number; deltaLabel: string;
}) {
  return (
    <div
      className="card-hover flex flex-col"
      style={{
        padding: '12px 16px',
        backgroundColor: panelColors.cardBg,
        border: `2px solid transparent`,
        borderRadius: 0,
      }}
    >
      <h3 className="text-[0.875rem] font-bold tracking-[0.02em]" style={{ color: colors.textPrimary, fontFamily: 'var(--font-display)' }}>
        {label}
      </h3>
      <div className="flex items-baseline gap-2 mt-1">
        <span className="tabular-nums text-[1.5rem] font-bold leading-none" style={{ color: colors.textPrimary, fontFamily: 'var(--font-display)' }}>
          {value}
        </span>
        <span className="text-[0.8125rem] font-medium" style={{ color: colors.textMuted }}>{unit}</span>
      </div>
      <div style={{ marginTop: 4 }}>
        <span className="tabular-nums text-[0.8125rem] font-semibold" style={{ color: delta >= 0 ? '#34B78F' : colors.negative }}>
          {delta >= 0 ? '+' : ''}{delta.toFixed(1)}%
        </span>
        <span className="text-[0.75rem] font-medium" style={{ color: colors.textMuted, marginLeft: 4 }}>{deltaLabel}</span>
      </div>
    </div>
  );
}

function MetricBlock({ label, value, unit, pct, barColor }: {
  label: string; value: string; unit: string; pct: number; barColor: string;
}) {
  return (
    <div className="flex-1">
      <span className="text-[0.5rem] font-bold tracking-[0.04em] block" style={{ color: colors.textMuted }}>
        {label}
      </span>
      <div className="flex items-baseline gap-1 mt-0.5">
        <span className="tabular-nums text-[0.9375rem] font-bold" style={{ color: colors.textPrimary, fontFamily: 'var(--font-display)' }}>
          {value}
        </span>
        <span className="text-[0.5rem] font-medium" style={{ color: colors.textMuted }}>{unit}</span>
      </div>
      <div style={{ height: 3, borderRadius: 2, width: '100%', backgroundColor: 'rgba(90,159,212,0.1)', marginTop: 4 }}>
        <div style={{ height: '100%', borderRadius: 2, width: `${Math.min(pct, 100)}%`, backgroundColor: barColor }} />
      </div>
    </div>
  );
}

export function PlatformDetailPanel({ platform, type, onClose }: Props) {
  const wells = platform.wells || [];
  const totalOil = wells.reduce((s, w) => s + w.oil, 0);
  const totalGas = wells.reduce((s, w) => s + w.gas, 0);

  const oilDelta = wells.length > 0 ? ((totalOil - platform.ytdAvg) / platform.ytdAvg * 100) : 0;
  const gasDelta = wells.length > 0 ? ((totalGas - (platform.ytdAvg * 0.7)) / (platform.ytdAvg * 0.7) * 100) : 0;

  const plan = platform.ytdAvg * 1.05;

  return (
    <div
      className="fixed inset-y-0 right-0 z-50 flex flex-col"
      style={{
        width: '50vw',
        maxWidth: 720,
        backgroundColor: panelColors.bg,
        borderLeft: `2px solid ${panelColors.cardBorder}`,
        boxShadow: '-8px 0 32px rgba(0,0,0,0.5)',
        animation: 'slide-in-right 0.3s cubic-bezier(0.25,1,0.5,1) forwards',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between shrink-0"
        style={{ padding: '12px 20px', borderBottom: `1px solid ${panelColors.divider}` }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center"
            style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: 'rgba(107,179,232,0.1)' }}
          >
            <PlatformIcon />
          </div>
          <h2 className="text-[1.0625rem] font-bold" style={{ color: colors.textPrimary, fontFamily: 'var(--font-display)' }}>
            {platform.name}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="flex items-center justify-center"
          style={{
            width: 32, height: 32, borderRadius: 6,
            backgroundColor: 'rgba(107,179,232,0.1)',
            border: 'none', cursor: 'pointer', color: colors.textSecondary,
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(107,179,232,0.2)')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgba(107,179,232,0.1)')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto" style={{ padding: '12px 20px 20px' }}>

        {/* Section 1: Top hero KPIs */}
        <div className="grid grid-cols-2" style={{ gap: 8, marginBottom: 10 }}>
          <KpiHero
            label="Total oil production"
            value={totalOil.toLocaleString()}
            unit="bbl/d"
            delta={oilDelta}
            deltaLabel="compared to yesterday"
          />
          <KpiHero
            label="Total gas production"
            value={totalGas.toLocaleString()}
            unit="m³/d"
            delta={gasDelta}
            deltaLabel="compared to yesterday"
          />
        </div>

        {/* Section 2: Yesterday / YTD / Target */}
        <div
          className="card-hover"
          style={{
            backgroundColor: panelColors.cardBg,
            border: `2px solid transparent`,
            borderRadius: 0,
            padding: '10px 16px',
            marginBottom: 10,
          }}
        >
          <h3 className="text-[0.875rem] font-bold tracking-[0.02em]" style={{ color: colors.textPrimary, fontFamily: 'var(--font-display)', marginBottom: 8 }}>
            Oil metrics
          </h3>
          <div className="flex" style={{ gap: 16 }}>
            <MetricBlock label="Yesterday" value={platform.ytdAvg.toLocaleString()} unit="bbl/d" pct={(platform.ytdAvg / plan) * 100} barColor={colors.oil} />
            <MetricBlock label="YTD average" value={platform.ytdAvg.toLocaleString()} unit="bbl/d" pct={(platform.ytdAvg / plan) * 100} barColor={BLUE_MID} />
            <MetricBlock label="Target" value={Math.round(plan).toLocaleString()} unit="bbl/d" pct={100} barColor={colors.textMuted} />
          </div>

          <div style={{ borderTop: `1px solid ${panelColors.divider}`, marginTop: 10, paddingTop: 10 }}>
            <h3 className="text-[0.875rem] font-bold tracking-[0.02em]" style={{ color: colors.textPrimary, fontFamily: 'var(--font-display)', marginBottom: 8 }}>
              Gas metrics
            </h3>
            <div className="flex" style={{ gap: 16 }}>
              <MetricBlock label="Yesterday" value={Math.round(platform.ytdAvg * 0.68).toLocaleString()} unit="m³/d" pct={68} barColor={colors.gas} />
              <MetricBlock label="YTD average" value={Math.round(platform.ytdAvg * 0.7).toLocaleString()} unit="m³/d" pct={70} barColor={BLUE_MID} />
              <MetricBlock label="Target" value={Math.round(platform.ytdAvg * 0.75).toLocaleString()} unit="m³/d" pct={100} barColor={colors.textMuted} />
            </div>
          </div>
        </div>

        {/* Section 3: Well-by-well bar chart */}
        <div
          className="card-hover"
          style={{
            backgroundColor: panelColors.cardBg,
            border: `2px solid transparent`,
            borderRadius: 0,
            marginBottom: 10,
          }}
        >
          <div
            className="flex items-center gap-2"
            style={{ padding: '8px 16px', borderBottom: `1px solid ${panelColors.divider}` }}
          >
            <WellIcon />
            <h3 className="text-[0.875rem] font-bold tracking-[0.02em]" style={{ color: colors.textPrimary, fontFamily: 'var(--font-display)' }}>
              Well-by-well production
            </h3>
          </div>

          <div style={{ padding: '8px 12px' }}>
            <ResponsiveContainer width="100%" height={wells.length * 34 + 40}>
              <BarChart
                layout="vertical"
                data={wells}
                margin={{ top: 4, right: 12, left: 4, bottom: 4 }}
                barGap={2}
                barSize={7}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={panelColors.divider} horizontal={false} />
                <XAxis type="number" tick={chartAxis} tickLine={false} axisLine={false} />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fill: colors.textSecondary, fontSize: 9, fontWeight: 600, fontFamily: 'var(--font-sans)' }}
                  tickLine={false}
                  axisLine={false}
                  width={56}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  labelStyle={{ color: colors.textMuted, fontSize: 10 }}
                  cursor={{ fill: 'rgba(107, 179, 232, 0.06)' }}
                />
                <Legend
                  verticalAlign="top"
                  height={28}
                  iconType="square"
                  iconSize={8}
                  wrapperStyle={{ fontSize: 10, fontWeight: 600, color: colors.textMuted }}
                />
                <Bar dataKey="oil" name="Oil (bbl/d)" fill={OIL_BAR} radius={[0, 3, 3, 0]} animationDuration={600} />
                <Bar dataKey="gas" name="Gas (m³/d)" fill={GAS_BAR} radius={[0, 3, 3, 0]} animationDuration={600} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
