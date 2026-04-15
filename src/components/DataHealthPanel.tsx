import type { DataHealthItem } from '../data/nqciData';
import { colors } from '../tokens';

interface Props {
  items: DataHealthItem[];
}

const flagColors: Record<DataHealthItem['status'], string> = {
  healthy: '#34B78F',
  delayed: '#E0A835',
  missing: '#E85858',
  stale: '#E85858',
};

const flagLabels: Record<DataHealthItem['status'], string> = {
  healthy: 'Live connection',
  delayed: 'Delays',
  missing: 'Unavailable',
  stale: 'Unavailable',
};

function StatusFlag({ status }: { status: DataHealthItem['status'] }) {
  const c = flagColors[status];
  return (
    <span
      className="inline-flex items-center justify-center text-[0.625rem] font-bold"
      style={{
        padding: '3px 8px',
        borderRadius: 4,
        backgroundColor: `${c}18`,
        color: c,
        flexShrink: 0,
        whiteSpace: 'nowrap',
      }}
    >
      {flagLabels[status]}
    </span>
  );
}

function HealthIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="3" fill="#5A9FD4" opacity={0.15} stroke="#5A9FD4" strokeWidth={1.3} />
      <path d="M12 7v10M7 12h10" stroke="#5A9FD4" strokeWidth={1.5} strokeLinecap="round" />
    </svg>
  );
}

export function DataHealthPanel({ items }: Props) {
  return (
    <div
      className="flex flex-col h-full card-hover"
      style={{
        backgroundColor: colors.cardBg,
        border: `1px solid ${colors.cardBorder}`,
        boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
      }}
    >
      <div
        className="flex-1 flex flex-col justify-between"
        style={{ padding: '6px 12px' }}
      >
        <div className="flex items-center gap-2">
          <HealthIcon />
          <h3
            className="text-[0.875rem] font-bold tracking-[0.02em]"
            style={{ color: colors.textPrimary, fontFamily: 'var(--font-display)' }}
          >
            Data health
          </h3>
        </div>

        {items.map((item) => (
          <div
            key={item.asset}
            className="flex items-center justify-between"
          >
            <span
              className="truncate text-[0.75rem] font-bold"
              style={{ color: colors.textPrimary, flex: 1, minWidth: 0, marginRight: 8 }}
            >
              {item.asset}
            </span>
            <StatusFlag status={item.status} />
          </div>
        ))}
      </div>
    </div>
  );
}
