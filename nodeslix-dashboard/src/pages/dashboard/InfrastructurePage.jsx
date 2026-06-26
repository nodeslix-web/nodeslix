import { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import {
  Activity, AlertCircle, AlertTriangle, CheckCircle2,
  Radio, RadioTower, Router, Server, Smartphone, Wifi, Zap,
} from 'lucide-react';

/* ─── Mock Data ─── */
const systemGroups = [
  {
    group: 'Core Infrastructure',
    systems: [
      { name: 'Telecom Core Systems',   icon: Server,     status: 'Online',  nodes: 18,   total: 18,   uptime: '99.99%', latency: '4ms',  load: 62 },
      { name: 'Monitoring Platforms',   icon: Activity,   status: 'Online',  nodes: 12,   total: 12,   uptime: '99.97%', latency: '2ms',  load: 38 },
    ],
  },
  {
    group: 'Wireless Networks',
    systems: [
      { name: 'Wireless Mesh Nodes',    icon: Wifi,       status: 'Online',  nodes: 247,  total: 250,  uptime: '99.95%', latency: '8ms',  load: 74 },
      { name: '5G Infrastructure',      icon: RadioTower, status: 'Online',  nodes: 84,   total: 85,   uptime: '99.98%', latency: '6ms',  load: 81 },
      { name: 'Edge Gateways',          icon: Router,     status: 'Online',  nodes: 63,   total: 64,   uptime: '99.93%', latency: '12ms', load: 55 },
      { name: 'IoT Devices',            icon: Smartphone, status: 'Partial', nodes: 834,  total: 900,  uptime: '98.12%', latency: '22ms', load: 49 },
    ],
  },
  {
    group: 'Radio Systems',
    systems: [
      { name: 'Radio Spectrum Monitor', icon: Radio,      status: 'Online',  nodes: 32,   total: 32,   uptime: '99.96%', latency: '3ms',  load: 44 },
      { name: 'Signal Amplifiers',      icon: Zap,        status: 'Warning', nodes: 28,   total: 30,   uptime: '98.70%', latency: '9ms',  load: 91 },
    ],
  },
];

const alerts = [
  { level: 'warning', msg: 'IoT cluster capacity at 92%',          time: '3m ago',  region: 'IoT-Bank-9'  },
  { level: 'info',    msg: 'Mesh node 5G-12 traffic spike resolved', time: '7m ago',  region: 'Node 5G-12'  },
  { level: 'warning', msg: 'Signal amplifier SA-30 threshold near', time: '14m ago', region: 'SA-30'       },
  { level: 'info',    msg: 'Edge gateway EG-03 routing optimized',  time: '22m ago', region: 'Edge GW-03'  },
  { level: 'success', msg: 'Core system backup completed',           time: '38m ago', region: 'Core-DC-1'  },
];

const statusColor = {
  Online:  { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  Partial: { text: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20'   },
  Warning: { text: 'text-orange-400',  bg: 'bg-orange-500/10',  border: 'border-orange-500/20'  },
  Offline: { text: 'text-red-400',     bg: 'bg-red-500/10',     border: 'border-red-500/20'     },
};

const alertConfig = {
  warning: { icon: AlertTriangle, color: 'text-amber-400',  bg: 'bg-amber-500/10',  border: 'border-amber-500/20'  },
  info:    { icon: AlertCircle,   color: 'text-blue-400',   bg: 'bg-blue-500/10',   border: 'border-blue-500/20'   },
  success: { icon: CheckCircle2,  color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
};

/* ─── Node Card ─── */
const NodeCard = ({ system, delay }) => {
  const sc = statusColor[system.status] ?? statusColor.Online;
  return (
    <Motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      whileHover={{ y: -4, borderColor: 'rgba(0,212,255,0.32)' }}
      className="surface-card p-4 flex flex-col gap-4 cursor-default"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-nodeslix-accent/10 text-nodeslix-accent">
            <system.icon size={16} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white leading-tight truncate">{system.name}</p>
            <p className="text-[10px] text-nodeslix-muted mt-0.5">
              {system.nodes.toLocaleString()} / {system.total.toLocaleString()} online
            </p>
          </div>
        </div>
        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${sc.text} ${sc.bg} ${sc.border}`}>
          {system.status}
        </span>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 text-center">
        {[
          { label: 'Uptime',   value: system.uptime   },
          { label: 'Latency',  value: system.latency  },
          { label: 'Load',     value: `${system.load}%` },
        ].map((s) => (
          <div key={s.label} className="bg-white/[0.025] rounded-lg p-2">
            <p className="text-[11px] font-bold text-white">{s.value}</p>
            <p className="text-[9px] text-nodeslix-muted/60 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Load bar */}
      <div className="h-1 rounded-full bg-white/8">
        <Motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: system.load / 100 }}
          transition={{ duration: 0.8, delay: delay + 0.3, ease: 'easeOut' }}
          style={{ originX: 0 }}
          className={[
            'h-full rounded-full',
            system.load > 85 ? 'bg-orange-400' : 'bg-nodeslix-accent',
          ].join(' ')}
        />
      </div>
    </Motion.div>
  );
};

/* ─────────────────────────────────────────
   INFRASTRUCTURE PAGE
───────────────────────────────────────── */
const InfrastructurePage = () => {
  const [activeGroup, setActiveGroup] = useState('All');
  const groups = ['All', ...systemGroups.map((g) => g.group)];
  const allSystems = systemGroups.flatMap((g) => g.systems);
  const totalOnline = allSystems.reduce((a, s) => a + s.nodes, 0);
  const totalNodes = allSystems.reduce((a, s) => a + s.total, 0);

  const filtered = activeGroup === 'All'
    ? systemGroups
    : systemGroups.filter((g) => g.group === activeGroup);

  return (
    <div className="p-5 md:p-6 space-y-7">
      {/* Page Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="section-kicker">Infrastructure</p>
          <h1 className="text-2xl font-extrabold text-white mt-1">Connected Systems</h1>
          <p className="text-sm text-nodeslix-muted mt-1">Monitor all connected telecom nodes, gateways, and devices.</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-bold text-emerald-400 shrink-0">
          <Motion.span
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="block size-1.5 rounded-full bg-emerald-400"
          />
          {totalOnline.toLocaleString()} / {totalNodes.toLocaleString()} Nodes Online
        </span>
      </div>

      {/* Summary Pills */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total Systems',  value: allSystems.length,                          color: 'text-nodeslix-accent' },
          { label: 'Online',         value: allSystems.filter(s => s.status === 'Online').length, color: 'text-emerald-400'    },
          { label: 'Partial',        value: allSystems.filter(s => s.status === 'Partial').length, color: 'text-amber-400'    },
          { label: 'Warning',        value: allSystems.filter(s => s.status === 'Warning').length, color: 'text-orange-400'   },
        ].map((s) => (
          <Motion.div
            key={s.label}
            whileHover={{ y: -3 }}
            className="surface-card p-4 text-center"
          >
            <p className={`text-3xl font-extrabold ${s.color}`}>{s.value}</p>
            <p className="text-[10px] text-nodeslix-muted/70 uppercase tracking-widest mt-1">{s.label}</p>
          </Motion.div>
        ))}
      </div>

      {/* Group Filter */}
      <div className="flex gap-2 flex-wrap">
        {groups.map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => setActiveGroup(g)}
            className={[
              'px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200',
              activeGroup === g
                ? 'bg-nodeslix-accent/15 border-nodeslix-accent/40 text-nodeslix-accent'
                : 'border-white/10 text-nodeslix-muted hover:border-white/20 hover:text-white',
            ].join(' ')}
          >
            {g}
          </button>
        ))}
      </div>

      {/* Node Cards */}
      {filtered.map((group) => (
        <div key={group.group}>
          <p className="text-[11px] font-bold uppercase tracking-widest text-nodeslix-muted/50 mb-3">{group.group}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {group.systems.map((sys, i) => (
              <NodeCard key={sys.name} system={sys} delay={i * 0.06} />
            ))}
          </div>
        </div>
      ))}

      {/* Alerts */}
      <section>
        <p className="section-kicker mb-1">Alerts</p>
        <h2 className="text-base font-bold text-white mb-4">System Alerts</h2>
        <div className="surface-card divide-y divide-white/[0.05] overflow-hidden">
          {alerts.map((alert, i) => {
            const cfg = alertConfig[alert.level];
            const AlertIcon = cfg.icon;
            return (
              <Motion.div
                key={i}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 px-4 py-3 hover:bg-white/[0.02] transition-colors"
              >
                <div className={`flex size-7 shrink-0 items-center justify-center rounded-lg border ${cfg.bg} ${cfg.border} ${cfg.color}`}>
                  <AlertIcon size={13} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white truncate">{alert.msg}</p>
                  <p className="text-[10px] text-nodeslix-muted/60">{alert.region}</p>
                </div>
                <span className="text-[10px] text-nodeslix-muted/40 shrink-0">{alert.time}</span>
              </Motion.div>
            );
          })}
        </div>
      </section>

      <div className="h-4" />
    </div>
  );
};

export default InfrastructurePage;
