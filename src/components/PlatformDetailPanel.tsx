import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { PlatformData } from '../data/nqciData';
import { colors, chartAxis, tooltipStyle } from '../tokens';

interface Props {
  platform: PlatformData;
  type: 'oil' | 'gas';
  onClose: () => void;
}

const STATUS_COLORS: Record<string, string> = {
  active: '#34B78F',
  idle: '#E0A835',
  maintenance: '#E85858',
};

function StatBlock({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="flex flex-col" style={{ minWidth: 0 }}>
      <span className="text-[0.5625rem] font-semibold tracking-[0.04em]" style={{ color: colors.textMuted }}>
        {label}
      </span>
      <span className="tabular-nums text-[1.125rem] font-bold leading-tight" style={{ color: colors.textPrimary, fontFamily: 'var(--font-display)' }}>
        {value}
      </span>
      {sub && (
        <span className="text-[0.5625rem] font-medium" style={{ color: colors.textMuted }}>{sub}</span>
      )}
    </div>
  );
}

export function PlatformDetailPanel({ platform, type, onClose }: Props) {
  const wells = platform.wells || [];
  const unit = type === 'oil' ? 'bbl/d' : 'm³/d';
  const pctVsYtd = ((platform.today - platform.ytdAvg) / platform.ytdAvg * 100);
  const capacityPct = platform.capacity;

  const totalOil = wells.reduce((s, w) => s + w.oil, 0);
  const totalGas = wells.reduce((s, w) => s + w.gas, 0);

  return (
    <div
      className="fixed inset-y-0 right-0 z-50 flex flex-col"
      style={{
        width: '50vw',
        maxWidth: 720,
        backgroundColor: colors.pageBg,
        borderLeft: `1px solid ${colors.cardBorder}`,
        boxShadow: '-8px 0 32px rgba(0,0,0,0.4)',
        animation: 'slide-in-right 0.3s cubic-bezier(0.25,1,0.5,1) forwards',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between shrink-0"
        style={{ padding: '14px 20px', borderBottom: `1px solid ${colors.divider}` }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center"
            style={{
              width: 36, height: 36, borderRadius: 8,
              backgroundColor: type === 'oil' ? 'rgba(90,159,212,0.15)' : 'rgba(123,184,227,0.15)',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C12 2 6 10 6 14a6 6 0 0 0 12 0c0-4-6-12-6-12Z"
                fill={type === 'oil' ? '#5A9FD4' : '#7BB8E3'}
                opacity={0.4}
                stroke={type === 'oil' ? '#5A9FD4' : '#7BB8E3'}
                strokeWidth={1.5}
              />
            </svg>
          </div>
          <div>
            <h2
              className="text-[1rem] font-bold"
              style={{ color: colors.textPrimary, fontFamily: 'var(--font-display)' }}
            >
              {platform.name}
            </h2>
            <span className="text-[0.6875rem] font-medium" style={{ color: colors.textMuted }}>
              {type === 'oil' ? 'Oil' : 'Gas'} production detail
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="flex items-center justify-center"
          style={{
            width: 32, height: 32, borderRadius: 6,
            backgroundColor: 'rgba(90,159,212,0.1)',
            border: 'none', cursor: 'pointer', color: colors.textSecondary,
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(90,159,212,0.2)')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgba(90,159,212,0.1)')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto" style={{ padding: '16px 20px' }}>
        {/* KPI row */}
        <div
          className="grid grid-cols-4"
          style={{
            gap: 12, padding: '12px 16px', marginBottom: 16,
            backgroundColor: colors.cardBg, border: `1px solid ${colors.cardBorder}`,
            borderRadius: 8,
          }}
        >
          <StatBlock label="Today" value={platform.today.toLocaleString()} sub={unit} />
          <StatBlock label="YTD Average" value={platform.ytdAvg.toLocaleString()} sub={unit} />
          <StatBlock
            label="vs YTD"
            value={`${pctVsYtd >= 0 ? '+' : ''}${pctVsYtd.toFixed(1)}%`}
          />
          <StatBlock label="Capacity" value={`${capacityPct}%`} />
        </div>

        {/* Oil + Gas totals */}
        <div className="grid grid-cols-2" style={{ gap: 12, marginBottom: 16 }}>
          <div style={{ padding: '10px 14px', backgroundColor: colors.cardBg, border: `1px solid ${colors.cardBorder}`, borderRadius: 8 }}>
            <span className="text-[0.5625rem] font-semibold tracking-[0.04em]" style={{ color: colors.textMuted }}>
              Total Oil
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="tabular-nums text-[1.25rem] font-bold" style={{ color: colors.oil, fontFamily: 'var(--font-display)' }}>
                {totalOil.toLocaleString()}
              </span>
              <span className="text-[0.625rem] font-medium" style={{ color: colors.textMuted }}>bbl/d</span>
            </div>
          </div>
          <div style={{ padding: '10px 14px', backgroundColor: colors.cardBg, border: `1px solid ${colors.cardBorder}`, borderRadius: 8 }}>
            <span className="text-[0.5625rem] font-semibold tracking-[0.04em]" style={{ color: colors.textMuted }}>
              Total Gas
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="tabular-nums text-[1.25rem] font-bold" style={{ color: colors.gas, fontFamily: 'var(--font-display)' }}>
                {totalGas.toLocaleString()}
              </span>
              <span className="text-[0.625rem] font-medium" style={{ color: colors.textMuted }}>m³/d</span>
            </div>
          </div>
        </div>

        {/* Well status legend */}
        <div className="flex items-center gap-4" style={{ marginBottom: 10 }}>
          <h3 className="text-[0.75rem] font-bold" style={{ color: colors.textPrimary, fontFamily: 'var(--font-display)' }}>
            Well-by-well production
          </h3>
          <div className="flex items-center gap-3" style={{ marginLeft: 'auto' }}>
            {(['active', 'idle', 'maintenance'] as const).map(s => (
              <div key={s} className="flex items-center gap-1.5">
                <div style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: STATUS_COLORS[s] }} />
                <span className="text-[0.5625rem] font-semibold capitalize" style={{ color: colors.textMuted }}>{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Well bar chart — dual bars (oil + gas) per well */}
        <div
          style={{
            padding: '8px 12px',
            backgroundColor: colors.cardBg,
            border: `1px solid ${colors.cardBorder}`,
            borderRadius: 8,
          }}
        >
          <ResponsiveContainer width="100%" height={wells.length * 36 + 30}>
            <BarChart
              layout="vertical"
              data={wells}
              margin={{ top: 4, right: 12, left: 4, bottom: 4 }}
              barGap={2}
              barSize={6}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={colors.gridLine} horizontal={false} />
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
                cursor={{ fill: 'rgba(90, 159, 212, 0.08)' }}
              />
              <Bar dataKey="oil" name="Oil (bbl/d)" radius={[0, 3, 3, 0]} animationDuration={600}>
                {wells.map((w, i) => (
                  <Cell key={i} fill={STATUS_COLORS[w.status] === '#34B78F' ? colors.oil : STATUS_COLORS[w.status]} opacity={0.85} />
                ))}
              </Bar>
              <Bar dataKey="gas" name="Gas (m³/d)" radius={[0, 3, 3, 0]} animationDuration={600}>
                {wells.map((w, i) => (
                  <Cell key={i} fill={STATUS_COLORS[w.status] === '#34B78F' ? colors.gas : STATUS_COLORS[w.status]} opacity={0.6} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
