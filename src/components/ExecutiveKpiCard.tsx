import { colors } from '../tokens';
import { CardShell } from './CardShell';
import type { ProductKpis } from '../data/nqciData';

const MINT = '#34B78F';
const MINT_BG = 'rgba(52, 183, 143, 0.08)';

interface Props {
  label: string;
  kpis: ProductKpis;
  accentColor: string;
  type: 'oil' | 'gas';
}

function OilIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C12 2 6 10 6 14a6 6 0 0 0 12 0c0-4-6-12-6-12Z" fill="#4A8DC8" opacity={0.2} stroke="#4A8DC8" strokeWidth={1.5} strokeLinejoin="round" />
      <path d="M12 18c-2.2 0-4-1.8-4-4 0-1.5 1.2-3.5 2.5-5.2" stroke="#4A8DC8" strokeWidth={1.2} strokeLinecap="round" opacity={0.6} />
    </svg>
  );
}

function GasIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 2c1.5 3 4 5.5 4 9a4 4 0 0 1-8 0c0-3.5 2.5-6 4-9Z" fill="#4A8DC8" opacity={0.15} stroke="#4A8DC8" strokeWidth={1.5} strokeLinejoin="round" />
      <path d="M10 15c0-1.5 1-2.5 2-4 1 1.5 2 2.5 2 4a2 2 0 0 1-4 0Z" fill="#4A8DC8" opacity={0.25} stroke="#4A8DC8" strokeWidth={1.2} strokeLinejoin="round" />
    </svg>
  );
}

function SmallStat({ label, value, unit, delta }: {
  label: string; value: string; unit: string; delta?: number;
}) {
  return (
    <div className="flex flex-col whitespace-nowrap">
      <span
        className="text-[0.5rem] font-semibold tracking-[0.04em]"
        style={{ color: colors.textMuted }}
      >
        {label}
      </span>
      <span className="mt-0.5 flex items-baseline gap-0.5">
        <span
          className="tabular-nums text-[0.8125rem] font-bold"
          style={{ color: '#1B3A5C', fontFamily: 'var(--font-display)' }}
        >
          {value}
        </span>
        <span className="text-[0.5rem] font-medium" style={{ color: colors.textMuted }}>
          {unit}
        </span>
      </span>
      {delta !== undefined && (
        <span
          className="tabular-nums text-[0.5625rem] font-semibold"
          style={{ color: delta >= 0 ? MINT : colors.negative }}
        >
          {delta >= 0 ? '+' : ''}{delta.toFixed(1)}%
        </span>
      )}
    </div>
  );
}

export function ExecutiveKpiCard({ label, kpis, accentColor, type }: Props) {
  const variance = ((kpis.last24h - kpis.plan) / kpis.plan) * 100;

  return (
    <CardShell variant="elevated" accentColor={accentColor}>
      <div style={{ padding: '8px 12px' }}>
        <div className="flex items-center gap-3">
          {/* Icon + Main KPI */}
          <div className="flex shrink-0 items-center gap-2.5">
            {type === 'oil' ? <OilIcon /> : <GasIcon />}
            <div>
              <p
                className="text-[0.625rem] font-semibold tracking-[0.04em]"
                style={{ color: colors.textPrimary }}
              >
                {label}
              </p>
              <div className="mt-0.5 flex flex-wrap items-baseline gap-1.5">
                <span
                  className="tabular-nums text-[1.0625rem] font-bold leading-none"
                  style={{ color: '#1B3A5C', fontFamily: 'var(--font-display)' }}
                >
                  {kpis.last24h.toLocaleString()}
                </span>
                <span
                  className="text-[0.75rem] font-medium"
                  style={{ color: colors.textMuted }}
                >
                  {kpis.unit}
                </span>
                <span
                  className="inline-flex shrink-0 items-center gap-1 rounded-md px-1.5 py-0.5 tabular-nums text-[0.625rem] font-semibold"
                  style={{
                    color: kpis.delta24h >= 0 ? MINT : colors.negative,
                    backgroundColor: kpis.delta24h >= 0 ? MINT_BG : colors.negativeBg,
                  }}
                >
                  {kpis.delta24h >= 0 ? '↑' : '↓'} {Math.abs(kpis.delta24h).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="mx-1.5 h-8" style={{ borderLeft: `1px solid ${colors.divider}` }} />

          {/* Secondary stats in a row */}
          <div className="flex flex-1 items-start justify-evenly">
            <SmallStat
              label="Yesterday"
              value={kpis.yesterday.toLocaleString()}
              unit={kpis.unit}
              delta={kpis.delta24h}
            />
            <SmallStat
              label="YTD Average"
              value={kpis.ytdAvg.toLocaleString()}
              unit={kpis.unit}
              delta={kpis.deltaYtd}
            />
            <SmallStat
              label="Target"
              value={kpis.plan.toLocaleString()}
              unit={kpis.unit}
              delta={variance}
            />
          </div>
        </div>
      </div>
    </CardShell>
  );
}
