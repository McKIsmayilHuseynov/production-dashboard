import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { ProductKpis, TrendPoint } from '../data/nqciData';
import { colors, chartAxis, tooltipStyle } from '../tokens';

interface Props {
  title: string;
  kpis: ProductKpis;
  trend: TrendPoint[];
  accentColor: string;
  fillColor?: string;
}

function fmtK(v: number) {
  return v >= 1000 ? `${Math.round(v / 1000)}k` : String(v);
}

export function TrendAnalysisCard({ title, kpis, trend, accentColor, fillColor }: Props) {
  const fill = fillColor || accentColor;
  const gradientId = `trend-fill-${title.replace(/\s/g, '-')}`;

  return (
    <div
      className="flex flex-col card-hover"
      style={{
        backgroundColor: colors.cardBg,
        border: '1px solid #D1D5DB',
        boxShadow: '0 4px 16px rgba(0,0,0,0.14)',
      }}
    >
      <div
        className="flex items-baseline gap-2" 
        style={{ padding: '6px 16px', borderBottom: `1px solid ${colors.divider}` }}
      >
        <h3
          className="text-[0.75rem] font-bold tracking-[0.02em]"
          style={{ color: colors.textPrimary, fontFamily: 'var(--font-display)' }}
        >
          {title}
        </h3>
        <span className="text-[0.6875rem] font-medium" style={{ color: colors.textMuted }}>
          {kpis.unit}
        </span>
      </div>

      <div style={{ padding: '4px 10px 4px' }}>
        <ResponsiveContainer width="100%" height={165}>
          <AreaChart data={trend} margin={{ top: 8, right: 16, left: 0, bottom: 4 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={fill} stopOpacity={0.45} />
                <stop offset="50%" stopColor={fill} stopOpacity={0.25} />
                <stop offset="100%" stopColor={fill} stopOpacity={0.06} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={colors.gridLine}
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tick={chartAxis}
              tickLine={false}
              axisLine={false}
              interval={4}
            />
            <YAxis
              tick={chartAxis}
              tickLine={false}
              axisLine={false}
              tickFormatter={fmtK}
              width={42}
              domain={['dataMin - 1000', 'dataMax + 500']}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              labelStyle={{ color: colors.textMuted, fontSize: 10 }}
              formatter={(v) => [Number(v).toLocaleString(), kpis.unit]}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={accentColor}
              strokeWidth={2}
              strokeLinejoin="round"
              fill={`url(#${gradientId})`}
              animationDuration={800}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
