import { colors } from '../tokens';
import type { ProductKpis } from '../data/nqciData';

interface Props {
  title: string;
  kpis: ProductKpis;
}

const MINT = '#34B78F';

function MetricBlock({ label, value, unit, pct, barColor }: {
  label: string; value: string; unit: string; pct: number; barColor: string;
}) {
  return (
    <div className="flex-1" style={{ padding: '8px 0' }}>
      <div className="flex items-center justify-between" style={{ marginBottom: 2 }}>
        <span
          className="text-[0.5625rem] font-bold tracking-[0.06em] uppercase"
          style={{ color: colors.textMuted }}
        >
          {label}
        </span>
      </div>
      <div className="flex items-baseline gap-1.5" style={{ marginBottom: 6 }}>
        <span
          className="tabular-nums text-[1.125rem] font-bold"
          style={{ color: colors.textPrimary, fontFamily: 'var(--font-display)' }}
        >
          {value}
        </span>
        <span className="text-[0.5625rem] font-medium" style={{ color: colors.textMuted }}>
          {unit}
        </span>
      </div>
      <div
        style={{
          height: 4, borderRadius: 2, width: '100%',
          backgroundColor: 'rgba(90, 159, 212, 0.1)',
        }}
      >
        <div
          style={{
            height: '100%', borderRadius: 2,
            width: `${Math.min(pct, 100)}%`,
            backgroundColor: barColor,
            transition: 'width 0.8s cubic-bezier(0.25,1,0.5,1)',
          }}
        />
      </div>
    </div>
  );
}

export function SecondaryKpiCard({ title, kpis }: Props) {
  const plan = kpis.plan || 1;
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
          className="text-[0.75rem] font-bold tracking-[0.02em]"
          style={{ color: colors.textPrimary, fontFamily: 'var(--font-display)' }}
        >
          {title}
        </h3>
      </div>

      <div className="flex" style={{ padding: '4px 14px 8px', gap: 16 }}>
        <MetricBlock
          label="Yesterday"
          value={kpis.yesterday.toLocaleString()}
          unit={kpis.unit}
          pct={(kpis.yesterday / plan) * 100}
          barColor={colors.oil}
        />
        <div style={{ width: 1, backgroundColor: colors.divider, alignSelf: 'stretch', margin: '4px 0' }} />
        <MetricBlock
          label="YTD Average"
          value={kpis.ytdAvg.toLocaleString()}
          unit={kpis.unit}
          pct={(kpis.ytdAvg / plan) * 100}
          barColor={MINT}
        />
        <div style={{ width: 1, backgroundColor: colors.divider, alignSelf: 'stretch', margin: '4px 0' }} />
        <MetricBlock
          label="Target"
          value={kpis.plan.toLocaleString()}
          unit={kpis.unit}
          pct={100}
          barColor={colors.textMuted}
        />
      </div>
    </div>
  );
}
