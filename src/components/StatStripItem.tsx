import { colors } from '../tokens';

interface Props {
  label: string;
  value: string;
  unit: string;
  delta?: number;
  deltaLabel?: string;
  showBorder?: boolean;
}

export function StatStripItem({ label, value, unit, delta, deltaLabel, showBorder }: Props) {
  return (
    <div
      className="px-6 py-4"
      style={{
        backgroundColor: colors.surfaceMuted,
        borderLeft: showBorder ? `1px solid ${colors.divider}` : undefined,
      }}
    >
      <p
        className="text-[0.625rem] font-semibold uppercase tracking-[0.06em]"
        style={{ color: colors.textMuted }}
      >
        {label}
      </p>
      <p className="mt-1.5 flex items-baseline gap-1.5">
        <span
          className="tabular-nums text-[0.9375rem] font-bold"
          style={{ color: colors.textPrimary, fontFamily: 'var(--font-display)' }}
        >
          {value}
        </span>
        <span className="text-[0.625rem] font-medium" style={{ color: colors.textMuted }}>
          {unit}
        </span>
      </p>
      {delta !== undefined && (
        <p
          className="mt-0.5 tabular-nums text-[0.6875rem] font-semibold"
          style={{ color: delta >= 0 ? colors.positive : colors.negative }}
        >
          {delta >= 0 ? '+' : ''}{delta.toFixed(1)}%
          {deltaLabel && (
            <span className="ml-1 font-medium" style={{ color: colors.textMuted }}>
              {deltaLabel}
            </span>
          )}
        </p>
      )}
    </div>
  );
}
