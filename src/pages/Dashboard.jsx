import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import logo from '../assets/logo.png';
import {
  Activity, AlertCircle, ArrowRight, ArrowUpRight, BarChart3, Bell,
  BrainCircuit, CheckCircle2, ChevronDown, ChevronRight, Cloud,
  Cpu, Database, Gauge, Globe, LayoutDashboard, LogOut, Menu,
  Network, Radio, RadioTower, Router, Search, Server, Settings,
  Shield, Smartphone, Sliders, Users, Wifi, X, Zap,
} from 'lucide-react';

/* ─────────────────────────────────────────
   MOCK DATA
───────────────────────────────────────── */
const navItems = [
  { label: 'Overview',       icon: LayoutDashboard, id: 'overview'       },
  { label: 'Infrastructure', icon: Server,           id: 'infrastructure' },
  { label: 'AI Engine',      icon: BrainCircuit,     id: 'ai-engine'      },
  { label: 'Operations',     icon: Sliders,          id: 'operations'     },
  { label: 'Topology',       icon: Network,          id: 'topology'       },
  { label: 'Analytics',      icon: BarChart3,        id: 'analytics'      },
  { label: 'Users',          icon: Users,            id: 'users'          },
  { label: 'Settings',       icon: Settings,         id: 'settings'       },
];

const inputSystems = [
  { label: 'Telecom Core Systems',  icon: Server,      status: 'Online', online: 18, total: 18  },
  { label: 'Wireless Mesh Nodes',   icon: Wifi,        status: 'Online', online: 247, total: 250 },
  { label: '5G Infrastructure',     icon: RadioTower,  status: 'Online', online: 84, total: 85  },
  { label: 'Edge Gateways',         icon: Router,      status: 'Online', online: 63, total: 64  },
  { label: 'Monitoring Platforms',  icon: Activity,    status: 'Online', online: 12, total: 12  },
  { label: 'IoT Devices',           icon: Smartphone,  status: 'Partial', online: 834, total: 900 },
];

const aiSteps = [
  { label: 'Telemetry Ingestion',       pct: 100 },
  { label: 'Traffic Optimization',      pct: 97  },
  { label: 'Routing Intelligence',      pct: 94  },
  { label: 'Predictive Analytics',      pct: 91  },
  { label: 'Autonomous Orchestration',  pct: 89  },
];

const kpis = [
  { label: 'Active Nodes',     value: '1,250',  suffix: '',      icon: Radio,   delta: '+12' },
  { label: 'Uptime',           value: '99.98',  suffix: '%',     icon: Shield,  delta: '+0.02%' },
  { label: 'Avg Latency',      value: '8',      suffix: 'ms',    icon: Gauge,   delta: '-2ms' },
  { label: 'Throughput',       value: '7.8',    suffix: ' Tbps', icon: Zap,     delta: '+0.4' },
  { label: 'Congestion Risk',  value: 'Low',    suffix: '',      icon: AlertCircle, delta: '↓ 6%' },
  { label: 'AI Score',         value: '96',     suffix: '%',     icon: BrainCircuit, delta: '+3%' },
];

const activities = [
  { msg: 'Traffic rerouted via AI',       region: 'Region 7',    type: 'route',  time: '2s ago'  },
  { msg: 'Congestion reduced',            region: 'Node 5G-12',  type: 'clear',  time: '8s ago'  },
  { msg: 'Mesh segment recovered',        region: 'Mesh Seg 44', type: 'health', time: '14s ago' },
  { msg: 'Latency optimized',             region: 'Edge GW-03',  type: 'perf',   time: '22s ago' },
  { msg: 'IoT device reconnected',        region: 'IoT-Bank-9',  type: 'health', time: '35s ago' },
  { msg: 'Optimization deployed',         region: 'Global',      type: 'ai',     time: '48s ago' },
  { msg: 'Path rerouted to backup',       region: 'Region 3',    type: 'route',  time: '1m ago'  },
  { msg: 'AI model weights refreshed',    region: 'AI Core',     type: 'ai',     time: '2m ago'  },
];

const connectedUsers = [
  { role: 'Admins',     count: 3,  color: '#00D4FF' },
  { role: 'Operators',  count: 12, color: '#7CEBFF' },
  { role: 'Engineers',  count: 28, color: '#3A6DFF' },
];

const vizPanels = [
  { label: 'Mesh Topology Map',       icon: Network,   desc: 'Real-time node connectivity graph'      },
  { label: 'Traffic Flow Diagram',    icon: Activity,  desc: 'Live packet routing visualization'      },
  { label: 'Bandwidth Heatmap',       icon: Cpu,       desc: 'Usage density across infrastructure'    },
  { label: 'Node Connectivity Graph', icon: Globe,     desc: 'Inter-node relationship mapping'        },
];

const activityColors = {
  route:  '#00D4FF',
  clear:  '#10b981',
  health: '#f59e0b',
  perf:   '#a78bfa',
  ai:     '#3A6DFF',
};

/* ─────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────── */
const useCounter = (target, duration = 1200) => {
  const [count, setCount] = useState(0);
  const raf = useRef(null);
  useEffect(() => {
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
  }, [target, duration]);
  return count;
};

/* ─────────────────────────────────────────
   SIDEBAR
───────────────────────────────────────── */
const Sidebar = ({ activeNav, setActiveNav, collapsed, onClose }) => {
  const navigate = useNavigate();

  return (
    <aside className={[
      'flex flex-col h-full bg-[#0c0c0c] border-r border-white/[0.07] transition-all duration-300',
      collapsed ? 'w-[70px]' : 'w-[280px]',
    ].join(' ')}>

      {/* Logo */}
      <div className={['flex items-center gap-3 border-b border-white/[0.07] shrink-0',
        collapsed ? 'justify-center px-3 py-5' : 'px-6 py-5',
      ].join(' ')}>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex items-center gap-3 cursor-pointer min-w-0"
          aria-label="Go to homepage"
        >
          <img src={logo} alt="NodeSlix Logo" className="h-9 w-auto object-contain shrink-0" />
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm font-bold text-white leading-tight truncate">NodeSlix</p>
              <p className="text-[10px] text-nodeslix-muted/70 leading-tight truncate">AI Telecom Intelligence Platform</p>
            </div>
          )}
        </button>
        {onClose && (
          <button onClick={onClose} className="ml-auto text-nodeslix-muted hover:text-white lg:hidden shrink-0">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav label */}
      {!collapsed && (
        <p className="px-6 pt-6 pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-nodeslix-muted/40">
          Navigation
        </p>
      )}

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;
          return (
            <Motion.button
              key={item.id}
              type="button"
              onClick={() => setActiveNav(item.id)}
              whileHover={{ x: collapsed ? 0 : 3 }}
              transition={{ duration: 0.18 }}
              title={collapsed ? item.label : undefined}
              className={[
                'relative w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer',
                collapsed ? 'justify-center' : '',
                isActive
                  ? 'bg-nodeslix-accent/10 text-nodeslix-accent'
                  : 'text-nodeslix-muted hover:bg-white/[0.04] hover:text-white',
              ].join(' ')}
            >
              {isActive && (
                <Motion.span
                  layoutId="sidebarActivePill"
                  className="absolute inset-0 rounded-xl bg-nodeslix-accent/10"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              {isActive && !collapsed && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-full bg-nodeslix-accent" />
              )}
              <Icon size={16} className="relative z-10 shrink-0" />
              {!collapsed && <span className="relative z-10 truncate">{item.label}</span>}
            </Motion.button>
          );
        })}
      </nav>

      {/* Profile section */}
      <div className={['border-t border-white/[0.07] shrink-0', collapsed ? 'px-2 py-4' : 'px-4 py-4'].join(' ')}>
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-nodeslix-accent/30 to-blue-600/30 text-nodeslix-accent text-sm font-bold border border-nodeslix-accent/20">
                A
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 block size-2.5 rounded-full bg-emerald-400 border-2 border-[#0c0c0c]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white leading-tight">Administrator</p>
              <p className="text-[10px] text-emerald-400 font-medium">● Online</p>
            </div>
            <button type="button" title="Logout" className="text-nodeslix-muted hover:text-red-400 transition-colors shrink-0">
              <LogOut size={14} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-nodeslix-accent/30 to-blue-600/30 text-nodeslix-accent text-xs font-bold border border-nodeslix-accent/20">
                A
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 block size-2 rounded-full bg-emerald-400 border-2 border-[#0c0c0c]" />
            </div>
            <button type="button" title="Logout" className="text-nodeslix-muted hover:text-red-400 transition-colors">
              <LogOut size={13} />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

/* ─────────────────────────────────────────
   TOP NAVBAR
───────────────────────────────────────── */
const TopNavbar = ({ activeNav, onMenuClick }) => (
  <header className="flex items-center justify-between h-16 px-6 border-b border-white/[0.07] bg-[#0a0a0a]/90 backdrop-blur-xl shrink-0">
    {/* Left */}
    <div className="flex items-center gap-3 min-w-0">
      <button
        type="button"
        onClick={onMenuClick}
        className="lg:hidden flex items-center justify-center size-9 rounded-xl border border-white/10 text-nodeslix-muted hover:text-white hover:border-white/20 transition-colors shrink-0"
      >
        <Menu size={16} />
      </button>
      <div className="min-w-0">
        <h1 className="text-sm font-bold text-white truncate">Telecom Operations Command Center</h1>
        <p className="hidden sm:block text-[10px] text-nodeslix-muted/60 truncate">
          {navItems.find(n => n.id === activeNav)?.label ?? 'Overview'} · Live Monitoring Active
        </p>
      </div>
    </div>

    {/* Right controls */}
    <div className="flex items-center gap-2 shrink-0">
      {/* AI Active badge */}
      <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-nodeslix-accent/25 bg-nodeslix-accent/8 px-3 py-1.5">
        <Motion.span
          animate={{ scale: [1, 1.55, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
          className="block size-1.5 rounded-full bg-nodeslix-accent"
        />
        <span className="text-[10px] font-bold text-nodeslix-accent">AI Active</span>
      </div>

      {/* Search */}
      <div className="hidden md:flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 focus-within:border-nodeslix-accent/40 transition-colors">
        <Search size={13} className="text-nodeslix-muted/60 shrink-0" />
        <input
          type="search"
          placeholder="Search..."
          className="bg-transparent text-xs text-nodeslix-muted placeholder-nodeslix-muted/40 outline-none w-28 focus:w-36 transition-all duration-300"
        />
      </div>

      {/* Notifications */}
      <button type="button" className="relative flex size-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-nodeslix-muted hover:text-white hover:border-white/20 transition-colors">
        <Bell size={14} />
        <span className="absolute top-1.5 right-1.5 block size-1.5 rounded-full bg-nodeslix-accent" />
      </button>

      {/* Profile button */}
      <button type="button" className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-2.5 py-1.5 hover:border-white/20 transition-colors">
        <div className="flex size-6 items-center justify-center rounded-full bg-gradient-to-br from-nodeslix-accent/30 to-blue-600/30 text-nodeslix-accent text-xs font-bold">
          A
        </div>
        <span className="hidden sm:block text-xs font-medium text-nodeslix-text">Admin</span>
        <ChevronDown size={11} className="text-nodeslix-muted" />
      </button>
    </div>
  </header>
);

/* ─────────────────────────────────────────
   INPUT SYSTEMS WIDGET
───────────────────────────────────────── */
const InputSystemsWidget = () => (
  <section aria-label="Input Systems">
    <div className="mb-4 flex items-center justify-between">
      <div>
        <p className="section-kicker">Widget A</p>
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
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
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
              ].join(' ')}>
                {sys.status}
              </span>
            </div>
            <div>
              <p className="text-xs font-semibold text-white leading-tight">{sys.label}</p>
              <p className="text-[10px] text-nodeslix-muted mt-0.5">
                {sys.online.toLocaleString()} / {sys.total.toLocaleString()} online
              </p>
            </div>
            {/* Mini progress bar */}
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

/* ─────────────────────────────────────────
   AI ENGINE WIDGET
───────────────────────────────────────── */
const AIEngineWidget = () => (
  <section aria-label="AI Process Engine" className="panel-shell relative overflow-hidden">
    {/* Ambient glow */}
    <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-32 w-72 rounded-full bg-nodeslix-accent/[0.06] blur-[60px]" />
    <div className="relative">
      <div className="text-center mb-6">
        <p className="section-kicker mb-1">Widget B</p>
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

      {/* AI Steps pipeline */}
      <div className="space-y-2.5">
        {aiSteps.map((step, i) => (
          <Motion.div
            key={step.label}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex items-center gap-3"
          >
            {/* Step number */}
            <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-nodeslix-accent/10 border border-nodeslix-accent/20">
              <span className="text-[9px] font-bold text-nodeslix-accent">{String(i + 1).padStart(2, '0')}</span>
            </div>

            {/* Step content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-nodeslix-text truncate">{step.label}</span>
                <span className="text-[10px] font-bold text-nodeslix-accent ml-2 shrink-0">{step.pct}%</span>
              </div>
              <div className="h-1 rounded-full bg-white/8">
                <Motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: step.pct / 100 }}
                  transition={{ duration: 0.9, delay: i * 0.1 + 0.4, ease: 'easeOut' }}
                  style={{ originX: 0 }}
                  className="h-full rounded-full bg-gradient-to-r from-nodeslix-accent to-blue-400"
                />
              </div>
            </div>

            {/* Arrow connector except last */}
            {i < aiSteps.length - 1 && (
              <ChevronRight size={12} className="text-nodeslix-accent/30 shrink-0 -mr-1" />
            )}
          </Motion.div>
        ))}
      </div>

      {/* Bottom stats row */}
      <div className="mt-5 pt-4 border-t border-white/[0.07] grid grid-cols-3 gap-3">
        {[
          { label: 'Models', value: '4' },
          { label: 'Decisions/s', value: '214' },
          { label: 'Accuracy', value: '96%' },
        ].map((s) => (
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
   KPI METRIC CARDS
───────────────────────────────────────── */
const KpiCard = ({ label, value, suffix, icon: Icon, delta, delay }) => {
  const [started, setStarted] = useState(false);
  const displayValue = started ? value : '0';
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
          {displayValue}{suffix}
        </p>
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-nodeslix-muted/70 mt-0.5">{label}</p>
      </div>
    </Motion.div>
  );
};

/* ─────────────────────────────────────────
   CHART PLACEHOLDERS
───────────────────────────────────────── */
const ChartPlaceholder = ({ title, type, height = 'h-28' }) => {
  const renderMock = () => {
    if (type === 'line') {
      const points = [40, 25, 55, 35, 70, 50, 80, 60, 75, 85, 65, 90];
      const max = Math.max(...points);
      const svgH = 100;
      const svgW = 300;
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
            <rect
              key={i}
              x={i * 42 + 6} y={90 - h * 0.85}
              width="30" height={h * 0.85}
              rx="4"
              fill={`rgba(0,212,255,${0.35 + i * 0.08})`}
            />
          ))}
        </svg>
      );
    }
    if (type === 'donut') {
      const segments = [
        { color: '#00D4FF', pct: 0.55 },
        { color: '#3A6DFF', pct: 0.28 },
        { color: '#7CEBFF', pct: 0.17 },
      ];
      const r = 36; const cx = 50; const cy = 50; const stroke = 12;
      let offset = 0;
      const circ = 2 * Math.PI * r;
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {segments.map((seg, i) => {
            const dash = seg.pct * circ;
            const gap = circ - dash;
            const el = (
              <circle
                key={i}
                cx={cx} cy={cy} r={r}
                fill="none"
                stroke={seg.color}
                strokeWidth={stroke}
                strokeDasharray={`${dash} ${gap}`}
                strokeDashoffset={-offset * circ}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
                opacity={0.85}
              />
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
        { color: '#3A6DFF', startAngle: 90, endAngle: 180 },
        { color: '#7CEBFF', startAngle: 180, endAngle: 270 },
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
              <path
                key={i}
                d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2} Z`}
                fill={sl.color}
                opacity={0.7 + i * 0.1}
              />
            );
          })}
        </svg>
      );
    }
    return null;
  };

  return (
    <Motion.div
      whileHover={{ y: -4, borderColor: 'rgba(0,212,255,0.28)' }}
      className="surface-card p-4 flex flex-col gap-3"
    >
      <p className="text-xs font-bold text-white">{title}</p>
      <div className={`${height} w-full`}>{renderMock()}</div>
    </Motion.div>
  );
};

/* ─────────────────────────────────────────
   VISUALIZATION PLACEHOLDERS
───────────────────────────────────────── */
const VisualizationPanel = ({ label, icon: Icon, desc, delay }) => (
  <Motion.div
    initial={{ opacity: 0, scale: 0.96 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4, delay }}
    whileHover={{ y: -4, borderColor: 'rgba(0,212,255,0.28)' }}
    className="surface-card p-4 flex flex-col gap-3 cursor-default"
  >
    <div className="flex items-center justify-between">
      <div className="flex size-7 items-center justify-center rounded-lg bg-nodeslix-accent/10 text-nodeslix-accent">
        <Icon size={13} />
      </div>
      <span className="text-[9px] font-bold text-nodeslix-muted/50 bg-white/5 border border-white/8 px-1.5 py-0.5 rounded">
        Placeholder
      </span>
    </div>
    <div className="h-20 rounded-lg bg-gradient-to-br from-nodeslix-accent/[0.05] to-blue-900/10 border border-white/[0.06] flex items-center justify-center relative overflow-hidden">
      {/* Animated grid lines */}
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,212,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.3) 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      />
      <div className="relative text-center">
        <Icon size={18} className="text-nodeslix-accent/40 mx-auto" />
        <p className="text-[9px] text-nodeslix-muted/40 mt-1">Live data pending</p>
      </div>
    </div>
    <div>
      <p className="text-xs font-semibold text-white">{label}</p>
      <p className="text-[10px] text-nodeslix-muted/60 mt-0.5">{desc}</p>
    </div>
  </Motion.div>
);

/* ─────────────────────────────────────────
   ACTIVITY FEED
───────────────────────────────────────── */
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
              <span
                className="block size-1.5 rounded-full shrink-0"
                style={{ backgroundColor: activityColors[item.type] ?? '#00D4FF' }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-nodeslix-text truncate">{item.msg}</p>
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

/* ─────────────────────────────────────────
   CONNECTED USERS PANEL
───────────────────────────────────────── */
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
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: u.count / total }}
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

/* ─────────────────────────────────────────
   MAIN DASHBOARD PAGE
───────────────────────────────────────── */
const Dashboard = () => {
  const [activeNav, setActiveNav]     = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Lock body scroll when drawer open (mobile)
  useEffect(() => {
    if (sidebarOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen]);

  return (
    <div className="flex h-screen bg-nodeslix-primary overflow-hidden">

      {/* ── DESKTOP SIDEBAR ── */}
      <div className="hidden lg:flex flex-col flex-shrink-0 h-full transition-all duration-300"
        style={{ width: sidebarCollapsed ? 70 : 280 }}>
        <Sidebar
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          collapsed={sidebarCollapsed}
        />
      </div>

      {/* ── MOBILE DRAWER OVERLAY ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <Motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <Motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="flex flex-col h-full w-[280px]"
            >
              <Sidebar
                activeNav={activeNav}
                setActiveNav={(id) => { setActiveNav(id); setSidebarOpen(false); }}
                collapsed={false}
                onClose={() => setSidebarOpen(false)}
              />
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>

      {/* ── RIGHT SIDE ── */}
      <div className="flex flex-col flex-1 min-w-0 h-full">

        {/* Top Navbar */}
        <TopNavbar
          activeNav={activeNav}
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Collapse toggle (desktop only) */}
        <div className="hidden lg:flex items-center h-8 px-4 border-b border-white/[0.04] bg-[#0a0a0a]/60">
          <button
            type="button"
            onClick={() => setSidebarCollapsed((c) => !c)}
            className="flex items-center gap-1.5 text-[10px] text-nodeslix-muted/50 hover:text-nodeslix-muted transition-colors"
          >
            <Menu size={11} />
            {sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          </button>
        </div>

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 overflow-y-auto p-5 md:p-6 space-y-7">

          {/* ─── KPI ROW ─── */}
          <section aria-label="Infrastructure Health">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="section-kicker">Widget C</p>
                <h2 className="text-base font-bold text-white mt-0.5">Infrastructure Health</h2>
              </div>
              <Link
                to="/"
                className="flex items-center gap-1 text-[10px] text-nodeslix-muted hover:text-nodeslix-accent transition-colors"
              >
                View details <ArrowRight size={10} />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
              {kpis.map((k, i) => (
                <KpiCard
                  key={k.label}
                  label={k.label}
                  value={k.value}
                  suffix={k.suffix}
                  icon={k.icon}
                  delta={k.delta}
                  delay={i * 0.06}
                />
              ))}
            </div>
          </section>

          {/* ─── 3-COLUMN MAIN WIDGETS ─── */}
          <div className="grid gap-5 xl:grid-cols-[1fr_340px_220px]">

            {/* Left: Input Systems */}
            <InputSystemsWidget />

            {/* Center: AI Engine */}
            <AIEngineWidget />

            {/* Right: Connected Users */}
            <ConnectedUsersPanel />
          </div>

          {/* ─── CHARTS ROW ─── */}
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

          {/* ─── VISUALIZATION PLACEHOLDERS ─── */}
          <section aria-label="Topology Visualizations">
            <p className="section-kicker mb-1">Topology</p>
            <h2 className="text-base font-bold text-white mb-4">Live Network Visualizations</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {vizPanels.map((v, i) => (
                <VisualizationPanel key={v.label} {...v} delay={i * 0.07} />
              ))}
            </div>
          </section>

          {/* ─── ACTIVITY FEED ─── */}
          <ActivityFeed />

          {/* Bottom spacer */}
          <div className="h-4" />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
