import { colors } from '../tokens';
import type { ProductKpis } from '../data/nqciData';

interface Props {
  title: string;
  kpis: ProductKpis;
}

function MetricBlock({ label, value, unit }: {
  label: string; value: string; unit: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <span
        className="text-[0.5625rem] font-semibold tracking-[0.04em]"
        style={{ color: colors.textMuted }}
      >
        {label}
      </span>
      <span className="mt-0.5 flex items-baseline gap-1">
        <span
          className="tabular-nums text-[1rem] font-bold"
          style={{ color: colors.textPrimary, fontFamily: 'var(--font-display)' }}
        >
          {value}
        </span>
        <span className="text-[0.5625rem] font-medium" style={{ color: colors.textMuted }}>
          {unit}
        </span>
      </span>
    </div>
  );
}

export function SecondaryKpiCard({ title, kpis }: Props) {
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
          {kpis.unit}
        </span>
      </div>

      <div
        className="flex items-center justify-evenly"
        style={{ padding: '1.5px 12px' }}
      >
        <MetricBlock
          label="Yesterday"
          value={kpis.yesterday.toLocaleString()}
          unit={kpis.unit}
        />
        <div className="h-6" style={{ borderLeft: `1px solid ${colors.divider}` }} />
        <MetricBlock
          label="YTD Average"
          value={kpis.ytdAvg.toLocaleString()}
          unit={kpis.unit}
        />
        <div className="h-6" style={{ borderLeft: `1px solid ${colors.divider}` }} />
        <MetricBlock
          label="Target"
          value={kpis.plan.toLocaleString()}
          unit={kpis.unit}
        />
      </div>
    </div>
  );
}
