import type { DataHealthItem } from '../data/nqciData';
import { colors } from '../tokens';
import { StatusBadge } from './StatusBadge';

interface Props {
  items: DataHealthItem[];
}

function HealthIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="3" fill="#4A8DC8" opacity={0.12} stroke="#4A8DC8" strokeWidth={1.3} />
      <path d="M12 7v10M7 12h10" stroke="#4A8DC8" strokeWidth={1.5} strokeLinecap="round" />
    </svg>
  );
}

function timeLabel(item: DataHealthItem) {
  if (item.status === 'healthy') return 'Connection is live';
  return `Last updated ${item.lastUpdate}`;
}

function SiteCard({ item }: { item: DataHealthItem }) {
  return (
    <div className="flex flex-1 items-center gap-3" style={{ minWidth: 0 }}>
      <span
        className="truncate text-[0.6875rem] font-semibold"
        style={{ color: colors.textPrimary }}
      >
        {item.asset}
      </span>
      <StatusBadge status={item.status} />
      <span
        className="text-[0.625rem] font-medium"
        style={{ color: colors.textMuted }}
      >
        {timeLabel(item)}
      </span>
    </div>
  );
}

export function DataHealthPanel({ items }: Props) {
  return (
    <div
      className="flex items-center gap-5 card-hover"
      style={{
        backgroundColor: colors.cardBg,
        border: '1px solid #D1D5DB',
        boxShadow: '0 4px 16px rgba(0,0,0,0.14)',
        padding: '8px 16px',
        marginBottom: 6,
      }}
    >
      <div className="flex shrink-0 items-center gap-2.5">
        <HealthIcon />
        <h3
          className="text-[0.75rem] font-bold tracking-[0.02em]"
          style={{ color: colors.textPrimary, fontFamily: 'var(--font-display)' }}
        >
          Data health
        </h3>
      </div>

      <div className="h-6" style={{ borderLeft: `1px solid ${colors.divider}` }} />

      {items.map((item, i) => (
        <div key={item.asset} className="flex flex-1 items-center gap-3" style={{ minWidth: 0 }}>
          {i > 0 && (
            <div className="h-6 shrink-0" style={{ borderLeft: `1px solid ${colors.divider}` }} />
          )}
          <SiteCard item={item} />
        </div>
      ))}
    </div>
  );
}
