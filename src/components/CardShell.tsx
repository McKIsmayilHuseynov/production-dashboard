import type { ReactNode, CSSProperties } from 'react';
import { colors, radius, shadows } from '../tokens';

type Variant = 'elevated' | 'default' | 'inset';

interface Props {
  variant?: Variant;
  accentColor?: string;
  children: ReactNode;
  className?: string;
}

const base: CSSProperties = {
  borderRadius: radius.xl,
};

const variants: Record<Variant, CSSProperties> = {
  elevated: {
    backgroundColor: colors.cardBg,
    border: `1px solid ${colors.cardBorder}`,
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
    borderRadius: 0,
  },
  default: {
    backgroundColor: colors.cardBg,
    border: `1px solid ${colors.cardBorder}`,
    boxShadow: shadows.card,
  },
  inset: {
    backgroundColor: colors.surfaceMuted,
    border: `1px solid ${colors.dividerStrong}`,
    borderRadius: radius.lg,
  },
};

export function CardShell({ variant = 'default', accentColor: _accentColor, children, className = '' }: Props) {
  void _accentColor;
  return (
    <div
      className={`flex flex-col card-hover ${className}`}
      style={{ ...base, ...variants[variant] }}
    >
      {children}
    </div>
  );
}
