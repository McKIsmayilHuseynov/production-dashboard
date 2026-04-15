import { colors } from '../tokens';

type Status = 'healthy' | 'delayed' | 'missing' | 'stale';

const config: Record<Status, { label: string; bg: string; text: string }> = {
  healthy: {
    label: 'Healthy',
    bg: colors.positiveBg,
    text: colors.positive,
  },
  delayed: {
    label: 'Delayed',
    bg: colors.warningBg,
    text: colors.warning,
  },
  missing: {
    label: 'Missing',
    bg: colors.negativeBg,
    text: colors.negative,
  },
  stale: {
    label: 'Stale',
    bg: 'rgba(74, 126, 165, 0.12)',
    text: colors.textMuted,
  },
};

interface Props {
  status: Status;
}

export function StatusBadge({ status }: Props) {
  const c = config[status];
  return (
    <span
      className="inline-flex items-center text-[0.625rem] font-semibold"
      style={{ backgroundColor: c.bg, color: c.text, borderRadius: 2, padding: '3px 5px' }}
    >
      {c.label}
    </span>
  );
}
