import { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { BarChart3, Download, TrendingDown, TrendingUp } from 'lucide-react';

/* ─── Mock time-series data ─── */
const latencyPoints  = [42, 38, 55, 34, 61, 48, 72, 56, 68, 82, 61, 88, 74, 80, 92, 77, 84, 91, 78, 96, 85, 90, 76, 88];
const bandwidthBars  = [62, 78, 54, 88, 66, 92, 74, 84, 70, 96, 80, 86];
const months         = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const donutSegments = [
  { label: 'Core Systems',  pct: 0.42, color: '#00D4FF' },
  { label: '5G Network',    pct: 0.28, color: '#3A6DFF' },
  { label: 'Edge Gateways', pct: 0.18, color: '#7CEBFF' },
  { label: 'IoT Devices',   pct: 0.12, color: '#a78bfa' },
];

const topMetrics = [
  { label: 'Total Throughput',   value: '7.8 Tbps', delta: '+0.4',   positive: true  },
  { label: 'Peak Latency',       value: '22ms',     delta: '+4ms',   positive: false },
  { label: 'Avg Uptime',         value: '99.97%',   delta: '+0.02%', positive: true  },
  { label: 'Packet Loss',        value: '0.01%',    delta: '-0.005%', positive: true },
  { label: 'Bandwidth Util.',    value: '74%',      delta: '+8%',    positive: false },
  { label: 'AI Optimizations',   value: '1,248',    delta: '+187',   positive: true  },
];

const tableRows = [
  { region: 'Region 1 – North',  throughput: '1.8 Tbps', latency: '6ms',  uptime: '99.99%', status: 'Optimal'  },
  { region: 'Region 2 – South',  throughput: '1.4 Tbps', latency: '9ms',  uptime: '99.96%', status: 'Optimal'  },
  { region: 'Region 3 – East',   throughput: '1.6 Tbps', latency: '7ms',  uptime: '99.98%', status: 'Optimal'  },
  { region: 'Region 4 – West',   throughput: '1.2 Tbps', latency: '11ms', uptime: '99.91%', status: 'Warning'  },
  { region: 'Region 5 – Core',   throughput: '1.8 Tbps', latency: '4ms',  uptime: '99.99%', status: 'Optimal'  },
];

const statusStyle = {
  Optimal: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  Warning: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
};

/* ─── Line chart ─── */
const LineChart = ({ points, color = '#00D4FF', gradId }) => {
  const svgH = 100; const svgW = 400;
  const max = Math.max(...points); const min = Math.min(...points);
  const range = max - min || 1;
  const coords = points.map((v, i) =>
    `${(i / (points.length - 1)) * svgW},${svgH - ((v - min) / range) * svgH * 0.85 - 7}`
  );
  return (
    <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,${svgH} ${coords.join(' ')} ${svgW},${svgH}`} fill={`url(#${gradId})`} />
      <polyline points={coords.join(' ')} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Data points */}
      {coords.map((c, i) => {
        const [x, y] = c.split(',');
        return <circle key={i} cx={x} cy={y} r="2.5" fill={color} opacity={0.8} />;
      })}
    </svg>
  );
};

/* ─── Bar chart ─── */
const BarChart = ({ bars, labels }) => {
  const max = Math.max(...bars);
  return (
    <svg viewBox="0 0 340 110" className="w-full h-full" preserveAspectRatio="none">
      {bars.map((h, i) => {
        const barH = (h / max) * 80;
        const x = i * 29 + 4;
        return (
          <g key={i}>
            <rect x={x} y={110 - barH - 20} width="22" height={barH} rx="3" fill={`rgba(0,212,255,${0.3 + (h / max) * 0.5})`} />
            <text x={x + 11} y="108" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="8">{labels[i]}</text>
          </g>
        );
      })}
    </svg>
  );
};

/* ─── Donut chart ─── */
const DonutChart = () => {
  const r = 38; const cx = 50; const cy = 50; const stroke = 10;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {donutSegments.map((seg, i) => {
        const dash = seg.pct * circ; const gap = circ - dash;
        const el = (
          <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={seg.color} strokeWidth={stroke}
            strokeDasharray={`${dash} ${gap}`} strokeDashoffset={-offset * circ}
            strokeLinecap="round" transform="rotate(-90 50 50)" opacity={0.9} />
        );
        offset += seg.pct;
        return el;
      })}
      <text x="50" y="47" textAnchor="middle" fill="white" fontSize="9" fontWeight="800">Network</text>
      <text x="50" y="56" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="7">Distribution</text>
    </svg>
  );
};

/* ─────────────────────────────────────────
   ANALYTICS PAGE
───────────────────────────────────────── */
const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const ranges = ['1h', '6h', '24h', '7d', '30d'];

  return (
    <div className="p-5 md:p-6 space-y-7">
      {/* Page Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="section-kicker">Analytics</p>
          <h1 className="text-2xl font-extrabold text-white mt-1">Network Analytics</h1>
          <p className="text-sm text-nodeslix-muted mt-1">Deep insights into performance, capacity, and efficiency trends.</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex gap-1 rounded-xl border border-white/10 bg-white/[0.03] p-1">
            {ranges.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setTimeRange(r)}
                className={[
                  'px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-200',
                  timeRange === r
                    ? 'bg-nodeslix-accent/15 text-nodeslix-accent'
                    : 'text-nodeslix-muted hover:text-white',
                ].join(' ')}
              >{r}</button>
            ))}
          </div>
          <button type="button" className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-white/10 text-nodeslix-muted hover:text-white hover:border-white/20 transition-colors text-xs font-semibold">
            <Download size={13} /> Export
          </button>
        </div>
      </div>

      {/* Top metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {topMetrics.map((m, i) => (
          <Motion.div
            key={m.label}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
            whileHover={{ y: -4 }}
            className="surface-card p-4 flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-nodeslix-muted/70 uppercase tracking-wider font-semibold">{m.label}</p>
              <span className={`flex items-center gap-0.5 text-[10px] font-bold ${m.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                {m.positive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                {m.delta}
              </span>
            </div>
            <p className="text-xl font-extrabold text-white">{m.value}</p>
          </Motion.div>
        ))}
      </div>

      {/* Charts grid */}
      <div className="grid gap-5 lg:grid-cols-2">
        {/* Latency trend */}
        <Motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          whileHover={{ borderColor: 'rgba(0,212,255,0.25)' }}
          className="surface-card p-5 flex flex-col gap-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-white">Latency Trend</p>
              <p className="text-[10px] text-nodeslix-muted/60 mt-0.5">Average round-trip time (ms)</p>
            </div>
            <span className="text-[10px] font-bold text-nodeslix-accent bg-nodeslix-accent/10 px-2 py-0.5 rounded-full">
              Avg 8ms
            </span>
          </div>
          <div className="h-36">
            <LineChart points={latencyPoints} color="#00D4FF" gradId="latGrad" />
          </div>
        </Motion.div>

        {/* Bandwidth usage */}
        <Motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          whileHover={{ borderColor: 'rgba(0,212,255,0.25)' }}
          className="surface-card p-5 flex flex-col gap-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-white">Bandwidth Utilization</p>
              <p className="text-[10px] text-nodeslix-muted/60 mt-0.5">Monthly throughput (Tbps)</p>
            </div>
            <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">
              7.8 Tbps Peak
            </span>
          </div>
          <div className="h-36">
            <BarChart bars={bandwidthBars} labels={months} />
          </div>
        </Motion.div>

        {/* Network distribution donut */}
        <Motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          whileHover={{ borderColor: 'rgba(0,212,255,0.25)' }}
          className="surface-card p-5 flex flex-col gap-4"
        >
          <div>
            <p className="text-xs font-bold text-white">Traffic Distribution</p>
            <p className="text-[10px] text-nodeslix-muted/60 mt-0.5">Bandwidth allocation by layer</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="h-36 w-36 shrink-0">
              <DonutChart />
            </div>
            <div className="space-y-3 flex-1">
              {donutSegments.map((seg) => (
                <div key={seg.label} className="flex items-center gap-3">
                  <span className="block size-2 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
                  <span className="text-xs text-nodeslix-muted flex-1">{seg.label}</span>
                  <span className="text-xs font-bold text-white">{(seg.pct * 100).toFixed(0)}%</span>
                </div>
              ))}
            </div>
          </div>
        </Motion.div>

        {/* AI performance */}
        <Motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          whileHover={{ borderColor: 'rgba(0,212,255,0.25)' }}
          className="surface-card p-5 flex flex-col gap-4"
        >
          <div>
            <p className="text-xs font-bold text-white">AI Optimization Score</p>
            <p className="text-[10px] text-nodeslix-muted/60 mt-0.5">Rolling efficiency rating per pipeline stage</p>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Telemetry Ingestion',      score: 100, color: '#00D4FF' },
              { label: 'Traffic Optimization',     score: 97,  color: '#3A6DFF' },
              { label: 'Routing Intelligence',     score: 94,  color: '#7CEBFF' },
              { label: 'Predictive Analytics',     score: 91,  color: '#a78bfa' },
              { label: 'Autonomous Orchestration', score: 89,  color: '#f59e0b' },
            ].map((s, i) => (
              <div key={s.label} className="flex items-center gap-3">
                <span className="text-[10px] text-nodeslix-muted w-36 shrink-0 truncate">{s.label}</span>
                <div className="flex-1 h-1.5 rounded-full bg-white/8 overflow-hidden">
                  <Motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: s.score / 100 }}
                    transition={{ duration: 0.7, delay: i * 0.08 + 0.3, ease: 'easeOut' }}
                    style={{ originX: 0, backgroundColor: s.color }}
                    className="h-full rounded-full"
                  />
                </div>
                <span className="text-[10px] font-bold text-white w-8 text-right shrink-0">{s.score}%</span>
              </div>
            ))}
          </div>
        </Motion.div>
      </div>

      {/* Regional breakdown table */}
      <section>
        <p className="section-kicker mb-1">Regions</p>
        <h2 className="text-base font-bold text-white mb-4">Regional Performance Breakdown</h2>
        <div className="surface-card overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-5 px-4 py-3 border-b border-white/[0.07] text-[10px] font-bold uppercase tracking-widest text-nodeslix-muted/50">
            <span>Region</span>
            <span className="text-right">Throughput</span>
            <span className="text-right">Latency</span>
            <span className="text-right">Uptime</span>
            <span className="text-right">Status</span>
          </div>
          {tableRows.map((row, i) => (
            <Motion.div
              key={row.region}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="grid grid-cols-5 items-center px-4 py-3.5 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors"
            >
              <span className="text-xs font-semibold text-white">{row.region}</span>
              <span className="text-xs text-nodeslix-muted text-right">{row.throughput}</span>
              <span className="text-xs text-nodeslix-muted text-right">{row.latency}</span>
              <span className="text-xs text-nodeslix-muted text-right">{row.uptime}</span>
              <div className="flex justify-end">
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${statusStyle[row.status]}`}>
                  {row.status}
                </span>
              </div>
            </Motion.div>
          ))}
        </div>
      </section>

      <div className="h-4" />
    </div>
  );
};

export default AnalyticsPage;
