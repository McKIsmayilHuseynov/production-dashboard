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

function fmtVol(v: number) {
  return v.toLocaleString();
}

export function TrendAnalysisCard({ title, kpis, trend, accentColor, fillColor }: Props) {
  const fill = fillColor || accentColor;
  const gradientId = `trend-fill-${title.replace(/\s/g, '-')}`;

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
        style={{ padding: '4px 14px', borderBottom: `1px solid ${colors.divider}` }}
      >
        <h3
          className="text-[0.875rem] font-bold tracking-[0.02em]"
          style={{ color: colors.textPrimary, fontFamily: 'var(--font-display)' }}
        >
          {title}
        </h3>
        <span className="text-[0.8125rem] font-medium" style={{ color: colors.textMuted }}>
          {kpis.unit}
        </span>
      </div>

      <div style={{ padding: '4px 10px 4px' }}>
        <ResponsiveContainer width="100%" height={165}>
          <AreaChart data={trend} margin={{ top: 8, right: 16, left: 0, bottom: 4 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={fill} stopOpacity={0.45} />
                <stop offset="50%" stopColor={fill} stopOpacity={0.2} />
                <stop offset="100%" stopColor={fill} stopOpacity={0.03} />
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
              interval={0}
            />
            <YAxis
              tick={chartAxis}
              tickLine={false}
              axisLine={false}
              tickFormatter={fmtVol}
              width={52}
              domain={['dataMin - 1000', 'dataMax + 500']}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              labelStyle={{ color: colors.textMuted, fontSize: 10 }}
              formatter={(v) => [Number(v).toLocaleString(), kpis.unit]}
              cursor={{ stroke: 'rgba(90, 159, 212, 0.2)', strokeWidth: 1 }}
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
