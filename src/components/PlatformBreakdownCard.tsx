import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { PlatformData } from '../data/nqciData';
import { colors, chartAxis, tooltipStyle } from '../tokens';

const TODAY_COLOR = '#5A9FD4';

interface Props {
  title: string;
  platforms: PlatformData[];
  unit: string;
  onPlatformClick?: (platform: PlatformData) => void;
}

function fmtK(v: number) {
  return v >= 1000 ? `${Math.round(v / 1000)}k` : String(v);
}

function ClickableYTick(props: { x?: number; y?: number; payload?: { value: string }; platforms: PlatformData[]; onClick: (p: PlatformData) => void }) {
  const { x = 0, y = 0, payload, platforms, onClick } = props;
  const p = platforms.find(pl => pl.name === payload?.value);
  return (
    <text
      x={x}
      y={y}
      dy={3}
      textAnchor="end"
      fill={colors.textSecondary}
      fontSize={11}
      fontWeight={600}
      fontFamily="var(--font-sans)"
      style={{ cursor: 'pointer' }}
      onClick={() => p && onClick(p)}
    >
      {payload?.value}
    </text>
  );
}

export function PlatformBreakdownCard({ title, platforms, unit, onPlatformClick }: Props) {
  const chartHeight = platforms.length * 28 + 24;

  const handleClick = (p: PlatformData) => {
    if (onPlatformClick) onPlatformClick(p);
  };

  return (
    <div
      className="flex flex-col card-hover"
      style={{
        backgroundColor: colors.cardBg,
        border: `1px solid ${colors.cardBorder}`,
        boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
      }}
    >
      <div
        className="flex items-baseline gap-2"
        style={{ padding: '6px 14px', borderBottom: `1px solid ${colors.divider}` }}
      >
        <h3
          className="text-[0.875rem] font-bold tracking-[0.02em]"
          style={{ color: colors.textPrimary, fontFamily: 'var(--font-display)' }}
        >
          {title}
        </h3>
        <span className="text-[0.8125rem] font-medium" style={{ color: colors.textMuted }}>
          {unit}
        </span>
      </div>

      <div style={{ padding: '4px 10px 6px' }}>
        <ResponsiveContainer width="100%" height={chartHeight}>
          <BarChart
            layout="vertical"
            data={platforms}
            margin={{ top: 2, right: 12, left: 2, bottom: 2 }}
            barSize={8}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={colors.gridLine}
              horizontal={false}
            />
            <XAxis
              type="number"
              tick={chartAxis}
              tickLine={false}
              axisLine={false}
              tickFormatter={fmtK}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={<ClickableYTick platforms={platforms} onClick={handleClick} />}
              tickLine={false}
              axisLine={false}
              width={90}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              labelStyle={{ color: colors.textMuted, fontSize: 11 }}
              cursor={{ fill: 'rgba(90, 159, 212, 0.08)' }}
              content={({ active, payload }) => {
                if (!active || !payload?.[0]) return null;
                const p = platforms.find(pl => pl.name === payload[0].payload?.name);
                if (!p) return null;
                const pct = ((p.today - p.ytdAvg) / p.ytdAvg * 100);
                return (
                  <div style={{ ...tooltipStyle, padding: '8px 12px' }}>
                    <div style={{ color: colors.textMuted, fontSize: 11, marginBottom: 4 }}>{p.name}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: colors.textPrimary }}>
                      {p.today.toLocaleString()} {unit}
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: pct >= 0 ? '#34B78F' : colors.negative, marginTop: 3 }}>
                      {pct >= 0 ? '+' : ''}{pct.toFixed(1)}% compared to yesterday
                    </div>
                  </div>
                );
              }}
            />
            <Bar
              dataKey="today"
              name="Today"
              fill={TODAY_COLOR}
              radius={[0, 4, 4, 0]}
              animationDuration={700}
              style={{ cursor: 'pointer' }}
              onClick={(data) => {
                const p = platforms.find(pl => pl.name === data.name);
                if (p) handleClick(p);
              }}
            >
              <LabelList
                dataKey="today"
                position="right"
                formatter={(v: number) => fmtK(v)}
                style={{ fill: colors.textSecondary, fontSize: 10, fontWeight: 600, fontFamily: 'var(--font-sans)' }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
