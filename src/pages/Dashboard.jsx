import { useEffect, useRef, useState } from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import {
  BrainCircuit, CheckCircle2, ChevronRight, Cloud,
  RadioTower, Router, Server, Smartphone, Zap,
} from 'lucide-react';
import InputWidget from '../components/dashboard/InputWidget.jsx';
import AIProcessWidget from '../components/dashboard/AIProcessWidget.jsx';
import InfrastructureWidget from '../components/dashboard/InfrastructureWidget.jsx';

/* ─── Animated counter hook ─── */
const useCounter = (target, duration = 1400) => {
  const [count, setCount] = useState(0);
  const raf = useRef(null);
  useEffect(() => {
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration]);
  return count;
};

/* ─── KPI stat block ─── */
const KpiCard = ({ label, value, suffix = '', duration = 1400, delay = 0 }) => {
  const [started, setStarted] = useState(false);
  const numericTarget = parseInt(String(value).replace(/,/g, ''), 10);
  const count = useCounter(started ? numericTarget : 0, duration);

  return (
    <Motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      onViewportEnter={() => setStarted(true)}
      whileHover={{ y: -3, borderColor: 'rgba(0,212,255,0.28)' }}
      className="surface-card flex flex-col gap-2 p-5"
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-nodeslix-muted/70">{label}</p>
      <p className="text-3xl font-extrabold tracking-tight text-white">
        {started ? count.toLocaleString() : '0'}{suffix}
      </p>
    </Motion.div>
  );
};

/* ─── Status pill ─── */
const StatusPill = ({ label, ok = true }) => (
  <span className={[
    'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold',
    ok
      ? 'border-nodeslix-accent/22 bg-nodeslix-accent/8 text-nodeslix-accent'
      : 'border-white/10 bg-white/[0.04] text-nodeslix-muted',
  ].join(' ')}>
    <Motion.span
      animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.4, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      className={`block size-1.5 rounded-full ${ok ? 'bg-nodeslix-accent' : 'bg-white/30'}`}
    />
    {label}
  </span>
);

/* ─── Mini system map ─── */
const nodes = [
  { label: '5G',  pos: 'top-[5%] left-1/2 -translate-x-1/2', point: { x: 50, y: 12 }, icon: RadioTower },
  { label: 'Core', pos: 'top-1/2 left-[5%] -translate-y-1/2', point: { x: 12, y: 50 }, icon: Server },
  { label: 'Mesh', pos: 'top-1/2 right-[5%] -translate-y-1/2', point: { x: 88, y: 50 }, icon: Router },
  { label: 'Edge', pos: 'bottom-[8%] left-[18%]', point: { x: 25, y: 82 }, icon: Cloud },
  { label: 'IoT',  pos: 'bottom-[8%] right-[18%]', point: { x: 75, y: 82 }, icon: Smartphone },
];
const center = { x: 50, y: 50 };

const SystemMap = () => (
  <div className="relative h-[200px] w-full">
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      {nodes.map((n, i) => (
        <g key={n.label}>
          <Motion.line
            x1={n.point.x} y1={n.point.y} x2={center.x} y2={center.y}
            stroke="#00D4FF" strokeWidth="0.3" strokeLinecap="round"
            animate={{ opacity: [0.15, 0.55, 0.15] }}
            transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.25, ease: 'easeInOut' }}
          />
          <Motion.circle
            r="0.75" fill="#D9F8FF"
            animate={{ cx: [n.point.x, center.x], cy: [n.point.y, center.y], opacity: [0, 1, 0] }}
            transition={{ duration: 3.6, repeat: Infinity, delay: i * 0.45, ease: 'easeInOut' }}
            filter="url(#mapGlow)"
          />
        </g>
      ))}
      <defs>
        <filter id="mapGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
    </svg>

    {/* Center AI node */}
    <Motion.div
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute left-1/2 top-1/2 z-10 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-nodeslix-accent/45 bg-nodeslix-accent/10 text-nodeslix-accent shadow-[0_0_36px_rgba(0,212,255,0.22)]"
    >
      <BrainCircuit size={22} />
    </Motion.div>

    {/* Peripheral node badges */}
    {nodes.map((n, i) => {
      const Icon = n.icon;
      return (
        <Motion.div
          key={n.label}
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 4, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
          className={`absolute z-10 flex size-10 flex-col items-center justify-center rounded-xl border border-white/10 bg-[#0A0A0A]/85 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.4)] ${n.pos}`}
        >
          <Icon size={13} className="text-nodeslix-accent" />
          <span className="mt-0.5 text-[9px] font-bold text-[#D9F8FF]">{n.label}</span>
        </Motion.div>
      );
    })}
  </div>
);

/* ─── Live activity feed ─── */
const activityItems = [
  { msg: 'Traffic rerouted',       region: 'Region 7',  type: 'route' },
  { msg: 'Latency reduced',        region: 'Node 5G-12', type: 'perf' },
  { msg: 'Congestion resolved',    region: 'Mesh Seg 44', type: 'clear' },
  { msg: 'Path optimized',         region: 'Edge GW-03', type: 'route' },
  { msg: 'Node recovered',         region: 'IoT-Bank-9', type: 'health' },
  { msg: 'AI model updated',       region: 'Global',     type: 'ai' },
];

const LiveFeed = () => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % activityItems.length), 2600);
    return () => clearInterval(id);
  }, []);

  const item = activityItems[idx];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-nodeslix-muted/70">Live Activity</p>
        <Motion.span
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-400"
        >
          <span className="block size-1.5 rounded-full bg-emerald-400" />
          LIVE
        </Motion.span>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/8 bg-black/20" style={{ height: 52 }}>
        <AnimatePresence mode="wait">
          <Motion.div
            key={idx}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="flex h-full items-center justify-between px-4"
          >
            <div className="flex items-center gap-2.5">
              <CheckCircle2 size={13} className="shrink-0 text-nodeslix-accent" />
              <span className="text-sm font-semibold text-nodeslix-text">{item.msg}</span>
            </div>
            <span className="text-xs text-nodeslix-muted/60">{item.region}</span>
          </Motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════ */

const statusBarItems = [
  { label: 'Infrastructure Healthy', ok: true },
  { label: 'Latency Optimal',        ok: true },
  { label: 'Traffic Balanced',       ok: true },
  { label: 'Congestion Low',         ok: true },
  { label: 'AI Learning Active',     ok: true },
];

const Dashboard = () => (
  <div className="min-h-screen bg-nodeslix-primary">
    <main className="app-container space-y-8 py-10 sm:py-12 lg:py-14">

      {/* ── Breadcrumb ── */}
      <Motion.nav
        aria-label="Breadcrumb"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-2 text-xs text-nodeslix-muted/60"
      >
        <Link to="/" className="transition-colors hover:text-nodeslix-accent">Home</Link>
        <ChevronRight size={12} />
        <span className="text-nodeslix-muted">Dashboard</span>
      </Motion.nav>

      {/* ── Page Header ── */}
      <Motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="panel-shell"
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          {/* Title block */}
          <div className="space-y-3">
            <div className="flex items-center">
              <img src={logo} alt="NodeSlix Logo" className="h-8 w-auto object-contain" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-nodeslix-text sm:text-4xl lg:text-5xl">
              Telecom Operations<br className="hidden sm:block" /> Command Center
            </h1>
            <p className="max-w-xl text-sm leading-[1.75] text-nodeslix-muted sm:text-base">
              Monitor distributed telecom ecosystems and autonomous AI optimization in real time.
            </p>
          </div>

          {/* Right: badges */}
          <div className="flex shrink-0 flex-col items-start gap-3 lg:items-end">
            {/* AI Active */}
            <Motion.div
              animate={{ opacity: [0.82, 1, 0.82] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex items-center gap-2 rounded-full border border-nodeslix-accent/35 bg-nodeslix-accent/10 px-3.5 py-2 text-sm font-bold text-nodeslix-accent"
            >
              <Motion.span
                animate={{ scale: [1, 1.55, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                className="block size-2 rounded-full bg-nodeslix-accent"
              />
              AI Active — Operational
            </Motion.div>
            {/* Environment badge */}
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-nodeslix-muted/60">
              <Zap size={10} className="text-nodeslix-accent/60" />
              Simulation Environment
            </span>
          </div>
        </div>
      </Motion.div>

      {/* ── Status bar ── */}
      <Motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="flex flex-wrap gap-2"
      >
        {statusBarItems.map((s) => <StatusPill key={s.label} label={s.label} ok={s.ok} />)}
      </Motion.div>

      {/* ── Live Operations KPI row ── */}
      <Motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.15 }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <KpiCard label="Total Infrastructure" value={18}    suffix=" Systems" delay={0.16} />
        <KpiCard label="Coverage Regions"     value={12}    suffix=" Regions"  delay={0.22} duration={1200} />
        <KpiCard label="Daily Optimizations"  value={2480}  suffix=""          delay={0.28} duration={1600} />
        <KpiCard label="AI Decisions Today"   value={18400} suffix=""          delay={0.34} duration={1800} />
      </Motion.div>

      {/* ── System Map ── */}
      <Motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="panel-shell"
      >
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-nodeslix-muted/70">Global System Map</p>
            <p className="mt-1 text-sm font-semibold text-nodeslix-text">NodeSlix Orchestration Overview</p>
          </div>
          <StatusPill label="All Systems Online" />
        </div>
        <SystemMap />
      </Motion.div>

      {/* ── Three-column widget grid ── */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.28 }}
        >
          <InputWidget />
        </Motion.div>
        <Motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.36 }}
        >
          <AIProcessWidget />
        </Motion.div>
        <Motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.44 }}
        >
          <InfrastructureWidget />
        </Motion.div>
      </div>

      {/* ── Live Activity Feed ── */}
      <Motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.5 }}
        className="panel-shell"
      >
        <LiveFeed />
      </Motion.div>

    </main>
  </div>
);

export default Dashboard;
