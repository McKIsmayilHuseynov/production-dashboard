import { colors } from '../tokens';
import { CardShell } from './CardShell';
import type { ProductKpis } from '../data/nqciData';

const MINT = '#34B78F';

interface Props {
  label: string;
  kpis: ProductKpis;
  accentColor: string;
  type: 'oil' | 'gas';
}

function OilIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C12 2 6 10 6 14a6 6 0 0 0 12 0c0-4-6-12-6-12Z" fill="#5A9FD4" opacity={0.25} stroke="#5A9FD4" strokeWidth={1.5} strokeLinejoin="round" />
      <path d="M12 18c-2.2 0-4-1.8-4-4 0-1.5 1.2-3.5 2.5-5.2" stroke="#5A9FD4" strokeWidth={1.2} strokeLinecap="round" opacity={0.6} />
    </svg>
  );
}

function GasIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 2c1.5 3 4 5.5 4 9a4 4 0 0 1-8 0c0-3.5 2.5-6 4-9Z" fill="#7BB8E3" opacity={0.2} stroke="#7BB8E3" strokeWidth={1.5} strokeLinejoin="round" />
      <path d="M10 15c0-1.5 1-2.5 2-4 1 1.5 2 2.5 2 4a2 2 0 0 1-4 0Z" fill="#7BB8E3" opacity={0.3} stroke="#7BB8E3" strokeWidth={1.2} strokeLinejoin="round" />
    </svg>
  );
}

export function ExecutiveKpiCard({ label, kpis, accentColor, type }: Props) {
  void accentColor;
  return (
    <CardShell variant="elevated">
      <div style={{ padding: '12px 16px' }}>
        <div className="flex items-center gap-2" style={{ marginBottom: 8 }}>
          {type === 'oil' ? <OilIcon /> : <GasIcon />}
          <span
            className="text-[0.9375rem] font-bold tracking-[0.02em]"
            style={{ color: colors.textSecondary, fontFamily: 'var(--font-display)' }}
          >
            {label}
          </span>
        </div>

        <div className="flex items-baseline gap-2">
          <span
            className="tabular-nums text-[2rem] font-bold leading-none"
            style={{ color: colors.textPrimary, fontFamily: 'var(--font-display)' }}
          >
            {kpis.last24h.toLocaleString()}
          </span>
          <span
            className="text-[0.75rem] font-medium"
            style={{ color: colors.textMuted }}
          >
            {kpis.unit}
          </span>
        </div>

        <div style={{ marginTop: 6 }}>
          <span
            className="tabular-nums text-[0.75rem] font-semibold"
            style={{ color: kpis.delta24h >= 0 ? MINT : colors.negative }}
          >
            {kpis.delta24h >= 0 ? '+' : ''}{Math.abs(kpis.delta24h).toFixed(1)}%
          </span>
          <span className="text-[0.6875rem] font-medium" style={{ color: colors.textMuted, marginLeft: 4 }}>
            vs yesterday
          </span>
        </div>
      </div>
    </CardShell>
  );
}
