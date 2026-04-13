import { useState, type CSSProperties } from 'react';
import { LoginPage } from './components/LoginPage';
import { HeaderBar } from './components/HeaderBar';
import { ExecutiveKpiCard } from './components/ExecutiveKpiCard';
import { TrendAnalysisCard } from './components/TrendAnalysisCard';
import { PlatformBreakdownCard } from './components/PlatformBreakdownCard';
import { DataHealthPanel } from './components/DataHealthPanel';
import { nqciDashboardData as d } from './data/nqciData';
import { colors } from './tokens';

const OIL = colors.oil;
const GAS = colors.gas;

function reveal(ms: number): CSSProperties {
  return { '--reveal-delay': `${ms}ms` } as CSSProperties;
}

function App() {
  const [authenticated, setAuthenticated] = useState(false);

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

      <div className="mx-auto max-w-[1680px]" style={{ paddingTop: 7, paddingLeft: 16, paddingRight: 16, paddingBottom: 2 }}>
        {/* Layer 1: Executive Summary */}
        <div className="grid grid-cols-2" style={{ gap: 8 }}>
          <div className="anim-reveal" style={reveal(40)}>
            <ExecutiveKpiCard
              label="Oil Production 24H"
              kpis={d.oil.kpis}
              accentColor={OIL}
              type="oil"
            />
          </div>
          <div className="anim-reveal" style={reveal(80)}>
            <ExecutiveKpiCard
              label="Gas Production 24H"
              kpis={d.gas.kpis}
              accentColor={GAS}
              type="gas"
            />
          </div>
        </div>

        {/* Layer 2: Production Analysis */}
        <div className="grid grid-cols-2" style={{ marginTop: 6, gap: 8 }}>
          <div className="anim-reveal" style={reveal(120)}>
            <TrendAnalysisCard
              title="Oil production historical trend"
              kpis={d.oil.kpis}
              trend={d.oil.trend}
              accentColor={OIL}
              fillColor="#4A8DC8"
            />
          </div>
          <div className="anim-reveal" style={reveal(160)}>
            <TrendAnalysisCard
              title="Gas production historical trend"
              kpis={d.gas.kpis}
              trend={d.gas.trend}
              accentColor={GAS}
              fillColor="#6FAADB"
            />
          </div>
        </div>

        {/* Layer 3a: Platform Breakdown */}
        <div className="grid grid-cols-2" style={{ marginTop: 6, gap: 8 }}>
          <div className="anim-reveal" style={reveal(200)}>
            <PlatformBreakdownCard
              title="Comparison of oil production by platform"
              platforms={d.oil.platforms}
              unit={d.oil.kpis.unit}
            />
          </div>
          <div className="anim-reveal" style={reveal(240)}>
            <PlatformBreakdownCard
              title="Comparison of gas production by platform"
              platforms={d.gas.platforms}
              unit={d.gas.kpis.unit}
            />
          </div>
        </div>

        {/* Layer 3b: Data Health */}
        <div className="anim-reveal" style={{ marginTop: 4, ...reveal(280) }}>
          <DataHealthPanel items={d.dataHealth} />
        </div>
      </div>
    </div>
  );
}

export default App;
