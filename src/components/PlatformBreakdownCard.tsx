import {
  Bar,
  BarChart,
  CartesianGrid,
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
}

function fmtK(v: number) {
  return v >= 1000 ? `${Math.round(v / 1000)}k` : String(v);
}

function makeVarianceLabel(platforms: PlatformData[]) {
  return function VarianceLabel(props: { x?: number; y?: number; width?: number; index?: number }) {
    const { x = 0, y = 0, width = 0, index = 0 } = props;
    const p = platforms[index];
    if (!p) return null;
    const pct = ((p.today - p.ytdAvg) / p.ytdAvg) * 100;
    const positive = pct >= 0;
    return (
      <text
        x={x + width + 6}
        y={y + 6}
        fill={positive ? '#34B78F' : colors.negative}
        fontSize={9}
        fontWeight={600}
        fontFamily="var(--font-sans)"
      >
        {positive ? '+' : ''}{pct.toFixed(1)}%
      </text>
    );
  };
}

export function PlatformBreakdownCard({ title, platforms, unit }: Props) {
  const VarianceLabel = makeVarianceLabel(platforms);

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
          className="text-[0.75rem] font-bold tracking-[0.02em]"
          style={{ color: colors.textPrimary, fontFamily: 'var(--font-display)' }}
        >
          {title}
        </h3>
        <span className="text-[0.6875rem] font-medium" style={{ color: colors.textMuted }}>
          {unit}
        </span>
      </div>

      <div style={{ padding: '2px 10px 4px' }}>
        <div className="mb-0.5 flex items-center justify-end" style={{ paddingRight: 6 }}>
          <span className="text-[0.5625rem] font-medium" style={{ color: colors.textMuted }}>
            % vs yesterday
          </span>
        </div>
        <ResponsiveContainer width="100%" height={190}>
          <BarChart
            layout="vertical"
            data={platforms}
            margin={{ top: 2, right: 48, left: 2, bottom: 2 }}
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
              tick={{ fill: colors.textSecondary, fontSize: 9, fontWeight: 600 }}
              tickLine={false}
              axisLine={false}
              width={90}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              labelStyle={{ color: colors.textMuted, fontSize: 10 }}
              formatter={(v) => [Number(v).toLocaleString(), unit]}
            />
            <Bar
              dataKey="today"
              name="Today"
              fill={TODAY_COLOR}
              radius={[0, 4, 4, 0]}
              animationDuration={700}
              label={<VarianceLabel />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
