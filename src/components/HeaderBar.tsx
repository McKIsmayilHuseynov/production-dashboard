import { MessageSquare, Bell, User } from 'lucide-react';
import headerBg from '../media assets/headersea2.png';
import socarLogo from '../media assets/SOCAR logo white.png';

const HEADER_BG_HOVER = 'rgba(255, 255, 255, 0.08)';

interface Props {
  title: string;
  date: string;
  lastRefresh?: string;
}

export function HeaderBar({ title, date, lastRefresh }: Props) {
  return (
    <header
      className="relative flex items-center justify-between"
      style={{
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 35,
        paddingRight: 25,
        backgroundImage: `url(${headerBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(14, 38, 64, 0.55)' }} />

      <div className="relative z-10 flex items-center gap-3.5">
        <img src={socarLogo} alt="SOCAR" style={{ height: 26 }} />
      </div>

      <h1
        className="absolute inset-x-0 z-10 text-center text-[0.9375rem] font-semibold tracking-[0.01em] text-white"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {title}
      </h1>

      <div className="relative z-10 flex items-center gap-4">
        <div className="flex items-baseline gap-2.5">
          <span className="tabular-nums text-[0.875rem] font-medium text-white">
            {date}
          </span>
          {lastRefresh && (
            <span className="tabular-nums text-[0.875rem] font-medium text-white">
              {lastRefresh}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <IconButton><MessageSquare size={16} strokeWidth={1.5} /></IconButton>
          <IconButton><Bell size={16} strokeWidth={1.5} /></IconButton>
          <IconButton><User size={16} strokeWidth={1.5} /></IconButton>
        </div>
      </div>
    </header>
  );
}

function IconButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      className="flex h-7 w-7 items-center justify-center rounded-md text-white transition-colors"
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = HEADER_BG_HOVER)}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
    >
      {children}
    </button>
  );
}
