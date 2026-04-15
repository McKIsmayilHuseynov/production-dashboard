import { useState, type CSSProperties } from 'react';
import { LoginPage } from './components/LoginPage';
import { HeaderBar } from './components/HeaderBar';
import { ExecutiveKpiCard } from './components/ExecutiveKpiCard';
import { TrendAnalysisCard } from './components/TrendAnalysisCard';
import { PlatformBreakdownCard } from './components/PlatformBreakdownCard';
import { PlatformDetailPanel } from './components/PlatformDetailPanel';
import { SecondaryKpiCard } from './components/SecondaryKpiCard';
import { DataHealthPanel } from './components/DataHealthPanel';
import { nqciDashboardData as d } from './data/nqciData';
import type { PlatformData } from './data/nqciData';
import { colors } from './tokens';

const OIL = colors.oil;
const GAS = colors.gas;

function reveal(ms: number): CSSProperties {
  return { '--reveal-delay': `${ms}ms` } as CSSProperties;
}

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<{ platform: PlatformData; type: 'oil' | 'gas' } | null>(null);

  if (!authenticated) {
    return <LoginPage onLogin={() => setAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.pageBg }}>
      <HeaderBar
        title={d.meta.title}
        date={d.meta.date}
        lastRefresh={d.meta.lastRefresh}
      />

      <div
        className="mx-auto flex"
        style={{ maxWidth: 1680, paddingTop: 5, paddingLeft: 16, paddingRight: 16, paddingBottom: 16 }}
      >
        {/* Main content area */}
        <div className="flex-1 min-w-0" style={{ paddingRight: 8 }}>
          {/* Layer 1: Executive Summary (main values only) */}
          <div className="grid grid-cols-2" style={{ gap: 8 }}>
            <div className="anim-reveal" style={reveal(40)}>
              <ExecutiveKpiCard
                label="Oil production today"
                kpis={d.oil.kpis}
                accentColor={OIL}
                type="oil"
              />
            </div>
            <div className="anim-reveal" style={reveal(80)}>
              <ExecutiveKpiCard
                label="Gas production today"
                kpis={d.gas.kpis}
                accentColor={GAS}
                type="gas"
              />
            </div>
          </div>

          {/* Layer 2: Secondary KPIs (Yesterday / YTD / Target) */}
          <div className="grid grid-cols-2" style={{ marginTop: 4, gap: 8 }}>
            <div className="anim-reveal" style={reveal(100)}>
              <SecondaryKpiCard
                title="Oil production metrics"
                kpis={d.oil.kpis}
              />
            </div>
            <div className="anim-reveal" style={reveal(120)}>
              <SecondaryKpiCard
                title="Gas production metrics"
                kpis={d.gas.kpis}
              />
            </div>
          </div>

          {/* Layer 3: Production Analysis */}
          <div className="grid grid-cols-2" style={{ marginTop: 4, gap: 8 }}>
            <div className="anim-reveal" style={reveal(160)}>
              <TrendAnalysisCard
                title="Oil production historical trend"
                kpis={d.oil.kpis}
                trend={d.oil.trend}
                accentColor={OIL}
                fillColor="#5A9FD4"
              />
            </div>
            <div className="anim-reveal" style={reveal(200)}>
              <TrendAnalysisCard
                title="Gas production historical trend"
                kpis={d.gas.kpis}
                trend={d.gas.trend}
                accentColor={GAS}
                fillColor="#7BB8E3"
              />
            </div>
          </div>

          {/* Layer 4: Platform Breakdown (Comparisons) */}
          <div className="grid grid-cols-2" style={{ marginTop: 4, gap: 8 }}>
            <div className="anim-reveal" style={reveal(240)}>
              <PlatformBreakdownCard
                title="Comparison of oil production by platform"
                platforms={d.oil.platforms}
                unit={d.oil.kpis.unit}
                onPlatformClick={(p) => setSelectedPlatform({ platform: p, type: 'oil' })}
              />
            </div>
            <div className="anim-reveal" style={reveal(280)}>
              <PlatformBreakdownCard
                title="Comparison of gas production by platform"
                platforms={d.gas.platforms}
                unit={d.gas.kpis.unit}
                onPlatformClick={(p) => setSelectedPlatform({ platform: p, type: 'gas' })}
              />
            </div>
          </div>
        </div>

        {/* Right sidebar: Data Health */}
        <div
          className="anim-reveal shrink-0"
          style={{ width: 220, ...reveal(100) }}
        >
          <DataHealthPanel items={d.dataHealth} />
        </div>
      </div>

      {/* Platform detail slide-in panel */}
      {selectedPlatform && (
        <>
          <div
            className="fixed inset-0 z-40"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            onClick={() => setSelectedPlatform(null)}
          />
          <PlatformDetailPanel
            platform={selectedPlatform.platform}
            type={selectedPlatform.type}
            onClose={() => setSelectedPlatform(null)}
          />
        </>
      )}
    </div>
  );
}

export default App;
