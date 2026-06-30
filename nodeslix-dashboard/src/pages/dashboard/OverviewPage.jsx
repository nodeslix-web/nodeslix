import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import {
  Activity, AlertCircle, ArrowRight, BarChart3,
  BrainCircuit, CheckCircle2, Gauge, Radio, Shield,
  Smartphone, Router, Server, Wifi, RadioTower, Zap,
} from 'lucide-react';

/* ─── Mock Data ─── */
const kpis = [
  { label: 'Active Nodes',    value: '1,250', suffix: '',      icon: Radio,        delta: '+12'    },
  { label: 'Uptime',          value: '99.98', suffix: '%',     icon: Shield,       delta: '+0.02%' },
  { label: 'Avg Latency',     value: '8',     suffix: 'ms',    icon: Gauge,        delta: '-2ms'   },
  { label: 'Throughput',      value: '7.8',   suffix: ' Tbps', icon: Zap,          delta: '+0.4'   },
  { label: 'Congestion Risk', value: 'Low',   suffix: '',      icon: AlertCircle,  delta: '↓ 6%'  },
  { label: 'AI Score',        value: '96',    suffix: '%',     icon: BrainCircuit, delta: '+3%'    },
];

const activities = [
  { msg: 'Traffic rerouted via AI',      region: 'Region 7',    type: 'route',  time: '2s ago'  },
  { msg: 'Congestion reduced',           region: 'Node 5G-12',  type: 'clear',  time: '8s ago'  },
  { msg: 'Mesh segment recovered',       region: 'Mesh Seg 44', type: 'health', time: '14s ago' },
  { msg: 'Latency optimized',            region: 'Edge GW-03',  type: 'perf',   time: '22s ago' },
  { msg: 'IoT device reconnected',       region: 'IoT-Bank-9',  type: 'health', time: '35s ago' },
  { msg: 'Optimization deployed',        region: 'Global',      type: 'ai',     time: '48s ago' },
  { msg: 'Path rerouted to backup',      region: 'Region 3',    type: 'route',  time: '1m ago'  },
  { msg: 'AI model weights refreshed',   region: 'AI Core',     type: 'ai',     time: '2m ago'  },
];

const inputSystems = [
  { label: 'Telecom Core Systems', icon: Server,     status: 'Online',  online: 18,  total: 18  },
  { label: 'Wireless Mesh Nodes',  icon: Wifi,       status: 'Online',  online: 247, total: 250 },
  { label: '5G Infrastructure',    icon: RadioTower, status: 'Online',  online: 84,  total: 85  },
  { label: 'Edge Gateways',        icon: Router,     status: 'Online',  online: 63,  total: 64  },
  { label: 'Monitoring Platforms', icon: Activity,   status: 'Online',  online: 12,  total: 12  },
  { label: 'IoT Devices',          icon: Smartphone, status: 'Partial', online: 834, total: 900 },
];

const aiSteps = [
  { label: 'Telemetry Ingestion',      pct: 100 },
  { label: 'Traffic Optimization',     pct: 97  },
  { label: 'Routing Intelligence',     pct: 94  },
  { label: 'Predictive Analytics',     pct: 91  },
  { label: 'Autonomous Orchestration', pct: 89  },
];

const connectedUsers = [
  { role: 'Admins',    count: 3,  color: '#00D4FF' },
  { role: 'Operators', count: 12, color: '#7CEBFF' },
  { role: 'Engineers', count: 28, color: '#3A6DFF' },
];

const activityColors = {
  route: '#00D4FF', clear: '#10b981', health: '#f59e0b', perf: '#a78bfa', ai: '#3A6DFF',
};

import { useAppSettings } from '../../context/AppSettingsContext';

/* ─── Animated Counter ─── */
const useCounter = (target, duration = 1200) => {
  const { toggles } = useAppSettings();
  const [count, setCount] = useState(0);
  const raf = useRef(null);
  useEffect(() => {
    if (!toggles.animationsOn) {
      setCount(target);
      return;
    }
    const numericTarget = parseFloat(String(target).replace(/,/g, ''));
    if (isNaN(numericTarget)) { setCount(target); return; }
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const raw = eased * numericTarget;
      setCount(Number.isInteger(numericTarget) ? Math.round(raw) : raw.toFixed(2));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration, toggles.animationsOn]);
  return count;
};

/* ─── KPI Card ─── */
const KpiCard = ({ label, value, suffix, icon: Icon, delta, delay }) => {
  const [started, setStarted] = useState(false);
  const numVal = useCounter(started ? value : '0');
  const displayValue = typeof numVal === 'number' && !isNaN(numVal)
    ? numVal.toLocaleString() : value;

  return (
    <Motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4, borderColor: 'rgba(0,212,255,0.28)' }}
      onViewportEnter={() => setStarted(true)}
      className="surface-card p-4 flex flex-col gap-3"
    >
      <div className="flex items-start justify-between">
        <div className="flex size-8 items-center justify-center rounded-lg bg-nodeslix-accent/10 text-nodeslix-accent shrink-0">
          <Icon size={15} />
        </div>
        <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full">
          {delta}
        </span>
      </div>
      <div>
        <p className="text-2xl font-extrabold tracking-tight text-white">
          {started ? displayValue : value}{suffix}
        </p>
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-nodeslix-muted/70 mt-0.5">{label}</p>
      </div>
    </Motion.div>
  );
};

/* ─── Chart Placeholder ─── */
export const ChartPlaceholder = ({ title, type, height = 'h-28' }) => {
  const renderMock = () => {
    if (type === 'line') {
      const points = [40, 25, 55, 35, 70, 50, 80, 60, 75, 85, 65, 90];
      const max = Math.max(...points);
      const svgH = 100; const svgW = 300;
      const coords = points.map((v, i) => `${(i / (points.length - 1)) * svgW},${svgH - (v / max) * svgH * 0.85}`);
      return (
        <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polyline points={coords.join(' ')} fill="none" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <polygon points={`0,${svgH} ${coords.join(' ')} ${svgW},${svgH}`} fill="url(#lineGrad)" />
        </svg>
      );
    }
    if (type === 'bar') {
      const bars = [60, 80, 45, 90, 55, 75, 65];
      return (
        <svg viewBox="0 0 280 90" className="w-full h-full" preserveAspectRatio="none">
          {bars.map((h, i) => (
            <rect key={i} x={i * 42 + 6} y={90 - h * 0.85} width="30" height={h * 0.85} rx="4"
              fill={`rgba(0,212,255,${0.35 + i * 0.08})`} />
          ))}
        </svg>
      );
    }
    if (type === 'donut') {
      const segments = [
        { color: '#00D4FF', pct: 0.55 }, { color: '#3A6DFF', pct: 0.28 }, { color: '#7CEBFF', pct: 0.17 },
      ];
      const r = 36; const cx = 50; const cy = 50; const stroke = 12;
      let offset = 0;
      const circ = 2 * Math.PI * r;
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {segments.map((seg, i) => {
            const dash = seg.pct * circ; const gap = circ - dash;
            const el = (
              <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={seg.color} strokeWidth={stroke}
                strokeDasharray={`${dash} ${gap}`} strokeDashoffset={-offset * circ}
                strokeLinecap="round" transform="rotate(-90 50 50)" opacity={0.85} />
            );
            offset += seg.pct;
            return el;
          })}
          <text x="50" y="54" textAnchor="middle" fill="white" fontSize="14" fontWeight="800">96%</text>
        </svg>
      );
    }
    if (type === 'pie') {
      const slices = [
        { color: '#00D4FF', startAngle: -90, endAngle: 90 },
        { color: '#3A6DFF', startAngle: 90, endAngle: 216 },
        { color: '#7CEBFF', startAngle: 216, endAngle: 270 },
      ];
      const cx = 50; const cy = 50; const r = 42;
      const toRad = (d) => (d * Math.PI) / 180;
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {slices.map((sl, i) => {
            const x1 = cx + r * Math.cos(toRad(sl.startAngle));
            const y1 = cy + r * Math.sin(toRad(sl.startAngle));
            const x2 = cx + r * Math.cos(toRad(sl.endAngle));
            const y2 = cy + r * Math.sin(toRad(sl.endAngle));
            const large = sl.endAngle - sl.startAngle > 180 ? 1 : 0;
            return (
              <path key={i}
                d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2} Z`}
                fill={sl.color} opacity={0.7 + i * 0.1} />
            );
          })}
        </svg>
      );
    }
    return null;
  };

  return (
    <Motion.div whileHover={{ y: -4, borderColor: 'rgba(0,212,255,0.28)' }} className="surface-card p-4 flex flex-col gap-3">
      <p className="text-xs font-bold text-white">{title}</p>
      <div className={`${height} w-full`}>{renderMock()}</div>
    </Motion.div>
  );
};

/* ─── Activity Feed ─── */
const ActivityFeed = () => {
  const [items, setItems] = useState(activities);
  useEffect(() => {
    const id = setInterval(() => {
      setItems((prev) => {
        const fresh = { ...prev[Math.floor(Math.random() * prev.length)], time: 'just now' };
        return [fresh, ...prev.slice(0, 7)];
      });
    }, 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <section aria-label="Recent Activities">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="section-kicker">Activity</p>
          <h2 className="text-base font-bold text-white mt-0.5">Recent Activities</h2>
        </div>
        <Motion.span
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400"
        >
          <span className="block size-1.5 rounded-full bg-emerald-400" />
          LIVE
        </Motion.span>
      </div>

      <div className="surface-card overflow-hidden divide-y divide-white/[0.05]">
        <AnimatePresence initial={false}>
          {items.map((item, i) => (
            <Motion.div
              key={`${item.msg}-${i}`}
              layout
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.02] transition-colors"
            >
              <span className="block size-1.5 rounded-full shrink-0"
                style={{ backgroundColor: activityColors[item.type] ?? '#00D4FF' }} />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white truncate">{item.msg}</p>
                <p className="text-[10px] text-nodeslix-muted/60 truncate">{item.region}</p>
              </div>
              <span className="text-[10px] text-nodeslix-muted/40 shrink-0">{item.time}</span>
            </Motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

/* ─── Connected Users Panel ─── */
const ConnectedUsersPanel = () => {
  const total = connectedUsers.reduce((a, u) => a + u.count, 0);
  return (
    <section aria-label="Connected Users">
      <p className="section-kicker mb-1">Users</p>
      <h2 className="text-base font-bold text-white mb-4">Connected Users</h2>
      <div className="surface-card p-4 space-y-4">
        <div className="text-center">
          <p className="text-3xl font-extrabold text-white">{total}</p>
          <p className="text-[10px] text-nodeslix-muted/60 uppercase tracking-widest mt-0.5">Online Now</p>
        </div>
        <div className="space-y-3">
          {connectedUsers.map((u) => (
            <div key={u.role} className="flex items-center gap-3">
              <span className="block size-2 rounded-full shrink-0" style={{ backgroundColor: u.color }} />
              <p className="text-xs text-nodeslix-muted flex-1">{u.role}</p>
              <p className="text-xs font-bold text-white">{u.count}</p>
              <div className="w-16 h-1 rounded-full bg-white/8 overflow-hidden">
                <Motion.div
                  initial={{ scaleX: 0 }} animate={{ scaleX: u.count / total }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  style={{ originX: 0, backgroundColor: u.color }}
                  className="h-full rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="pt-3 border-t border-white/[0.07] flex items-center gap-2">
          <div className="flex -space-x-1.5">
            {['A', 'O', 'E'].map((l) => (
              <div key={l} className="flex size-6 items-center justify-center rounded-full bg-nodeslix-accent/20 border border-nodeslix-accent/30 text-[9px] font-bold text-nodeslix-accent">
                {l}
              </div>
            ))}
          </div>
          <p className="text-[10px] text-nodeslix-muted/60">+{total - 3} more active</p>
        </div>
      </div>
    </section>
  );
};

/* ─── Input Systems Widget ─── */
const InputSystemsWidget = () => (
  <section aria-label="Input Systems">
    <div className="mb-4 flex items-center justify-between">
      <div>
        <p className="section-kicker">Infrastructure</p>
        <h2 className="text-base font-bold text-white mt-0.5">Input Systems</h2>
      </div>
      <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1.5">
        <Motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
          <span className="block size-1.5 rounded-full bg-emerald-400" />
        </Motion.span>
        All Online
      </span>
    </div>
    <div className="grid grid-cols-2 xl:grid-cols-3 gap-3">
      {inputSystems.map((sys, i) => {
        const Icon = sys.icon;
        const isPartial = sys.status === 'Partial';
        return (
          <Motion.div
            key={sys.label}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
            whileHover={{ y: -4, borderColor: 'rgba(0,212,255,0.32)' }}
            className="surface-card p-3.5 flex flex-col gap-3 cursor-default"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-nodeslix-accent/10 text-nodeslix-accent shrink-0">
                <Icon size={15} />
              </div>
              <span className={[
                'text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider',
                isPartial
                  ? 'bg-amber-500/12 text-amber-400 border border-amber-500/20'
                  : 'bg-emerald-500/12 text-emerald-400 border border-emerald-500/20',
              ].join(' ')}>{sys.status}</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-white leading-tight">{sys.label}</p>
              <p className="text-[10px] text-nodeslix-muted mt-0.5">
                {sys.online.toLocaleString()} / {sys.total.toLocaleString()} online
              </p>
            </div>
            <div className="h-0.5 rounded-full bg-white/8">
              <Motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: sys.online / sys.total }}
                transition={{ duration: 0.8, delay: i * 0.06 + 0.3, ease: 'easeOut' }}
                style={{ originX: 0 }}
                className={['h-full rounded-full', isPartial ? 'bg-amber-400' : 'bg-nodeslix-accent'].join(' ')}
              />
            </div>
          </Motion.div>
        );
      })}
    </div>
  </section>
);

/* ─── AI Engine Widget ─── */
const AIEngineWidget = () => (
  <section aria-label="AI Process Engine" className="panel-shell relative overflow-hidden">
    <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-32 w-72 rounded-full bg-nodeslix-accent/[0.06] blur-[60px]" />
    <div className="relative">
      <div className="text-center mb-6">
        <p className="section-kicker mb-1">AI System</p>
        <h2 className="text-base font-bold text-white">AI Intelligence Engine</h2>
        <p className="text-[10px] text-nodeslix-muted/70 mt-0.5">Powered by NVIDIA SDK</p>
        <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-nodeslix-accent/25 bg-nodeslix-accent/8 px-3 py-1.5">
          <Motion.span
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="block size-1.5 rounded-full bg-nodeslix-accent"
          />
          <span className="text-[10px] font-bold text-nodeslix-accent">Processing Active</span>
        </div>
      </div>
      <div className="space-y-2.5">
        {aiSteps.map((step, i) => (
          <Motion.div
            key={step.label}
            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex items-center gap-3"
          >
            <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-nodeslix-accent/10 border border-nodeslix-accent/20">
              <span className="text-[9px] font-bold text-nodeslix-accent">{String(i + 1).padStart(2, '0')}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-white truncate">{step.label}</span>
                <span className="text-[10px] font-bold text-nodeslix-accent ml-2 shrink-0">{step.pct}%</span>
              </div>
              <div className="h-1 rounded-full bg-white/8">
                <Motion.div
                  initial={{ scaleX: 0 }} animate={{ scaleX: step.pct / 100 }}
                  transition={{ duration: 0.9, delay: i * 0.1 + 0.4, ease: 'easeOut' }}
                  style={{ originX: 0 }}
                  className="h-full rounded-full bg-gradient-to-r from-nodeslix-accent to-blue-400"
                />
              </div>
            </div>
          </Motion.div>
        ))}
      </div>
      <div className="mt-5 pt-4 border-t border-white/[0.07] grid grid-cols-3 gap-3">
        {[{ label: 'Models', value: '4' }, { label: 'Decisions/s', value: '214' }, { label: 'Accuracy', value: '96%' }].map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-base font-extrabold text-nodeslix-accent">{s.value}</p>
            <p className="text-[10px] text-nodeslix-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────
   OVERVIEW PAGE
───────────────────────────────────────── */
const OverviewPage = () => (
  <div className="p-5 md:p-6 space-y-7">
    {/* Page Header */}
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="section-kicker">Dashboard</p>
        <h1 className="text-2xl font-extrabold text-white mt-1">Operations Overview</h1>
        <p className="text-sm text-nodeslix-muted mt-1">Real-time visibility across your entire telecom infrastructure.</p>
      </div>
      <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-bold text-emerald-400 shrink-0">
        <Motion.span
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="block size-1.5 rounded-full bg-emerald-400"
        />
        All Systems Operational
      </span>
    </div>

    {/* KPI Row */}
    <section aria-label="Infrastructure Health">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="section-kicker">Key Metrics</p>
          <h2 className="text-base font-bold text-white mt-0.5">Infrastructure Health</h2>
        </div>
        <Link to="/dashboard/analytics" className="flex items-center gap-1 text-[10px] text-nodeslix-muted hover:text-nodeslix-accent transition-colors">
          View analytics <ArrowRight size={10} />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {kpis.map((k, i) => (
          <KpiCard key={k.label} {...k} delay={i * 0.06} />
        ))}
      </div>
    </section>

    {/* 3-column widgets */}
    <div className="grid gap-5 xl:grid-cols-[1fr_340px_220px]">
      <InputSystemsWidget />
      <AIEngineWidget />
      <ConnectedUsersPanel />
    </div>

    {/* Charts Row */}
    <section aria-label="Charts">
      <p className="section-kicker mb-1">Visualizations</p>
      <h2 className="text-base font-bold text-white mb-4">Network Analytics</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <ChartPlaceholder title="Latency Trend"         type="line"  height="h-24" />
        <ChartPlaceholder title="Bandwidth Usage"       type="bar"   height="h-24" />
        <ChartPlaceholder title="Infrastructure Health" type="donut" height="h-24" />
        <ChartPlaceholder title="Network Distribution"  type="pie"   height="h-24" />
      </div>
    </section>

    {/* Activity Feed */}
    <ActivityFeed />

    <div className="h-4" />
  </div>
);

export default OverviewPage;
