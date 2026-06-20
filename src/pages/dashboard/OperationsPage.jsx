import { useState } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import {
  Activity, AlertCircle, CheckCircle2, ChevronRight,
  Clock, Gauge, Network, RefreshCw, Shield, Sliders, Zap,
} from 'lucide-react';

/* ─── Mock Data ─── */
const taskQueue = [
  { id: 'OP-1082', type: 'Traffic Optimization',  region: 'Region 7',    status: 'Running',  priority: 'High',   progress: 78, started: '2m ago'  },
  { id: 'OP-1081', type: 'Congestion Management', region: 'Node 5G-12',  status: 'Running',  priority: 'High',   progress: 55, started: '4m ago'  },
  { id: 'OP-1080', type: 'Path Rerouting',        region: 'Mesh Seg 44', status: 'Running',  priority: 'Medium', progress: 91, started: '6m ago'  },
  { id: 'OP-1079', type: 'Signal Optimization',   region: 'Edge GW-03',  status: 'Queued',   priority: 'Low',    progress: 0,  started: 'Pending' },
  { id: 'OP-1078', type: 'IoT Reconnection',      region: 'IoT-Bank-9',  status: 'Queued',   priority: 'Medium', progress: 0,  started: 'Pending' },
  { id: 'OP-1077', type: 'Load Balancing',        region: 'Core DC-1',   status: 'Completed', priority: 'High',  progress: 100, started: '12m ago' },
  { id: 'OP-1076', type: 'Firmware Deployment',   region: 'All Gateways', status: 'Completed', priority: 'Low',  progress: 100, started: '28m ago' },
];

const liveMetrics = [
  { label: 'Active Operations', value: '3',    icon: Activity,  color: 'text-nodeslix-accent' },
  { label: 'Queued Tasks',      value: '2',    icon: Clock,     color: 'text-amber-400'       },
  { label: 'Completed Today',   value: '47',   icon: CheckCircle2, color: 'text-emerald-400'  },
  { label: 'Traffic Saved',     value: '18%',  icon: Gauge,     color: 'text-violet-400'      },
  { label: 'Reroutes/hr',       value: '87',   icon: Network,   color: 'text-blue-400'        },
  { label: 'Avg Resolution',    value: '4.2m', icon: Zap,       color: 'text-nodeslix-accent' },
];

const congestionZones = [
  { zone: 'Region 7 Core',   severity: 'High',   load: 94, resolved: false },
  { zone: 'Mesh Segment 44', severity: 'Medium', load: 77, resolved: false },
  { zone: 'IoT Bank 9',      severity: 'Low',    load: 61, resolved: false },
  { zone: 'Region 3 Edge',   severity: 'High',   load: 88, resolved: true  },
  { zone: '5G Tower 12',     severity: 'Medium', load: 72, resolved: true  },
];

const statusConfig = {
  Running:   { text: 'text-nodeslix-accent', bg: 'bg-nodeslix-accent/10',  border: 'border-nodeslix-accent/30' },
  Queued:    { text: 'text-amber-400',       bg: 'bg-amber-500/10',         border: 'border-amber-500/25'       },
  Completed: { text: 'text-emerald-400',     bg: 'bg-emerald-500/10',       border: 'border-emerald-500/25'     },
};

const priorityConfig = {
  High:   'text-red-400 bg-red-500/10 border-red-500/25',
  Medium: 'text-amber-400 bg-amber-500/10 border-amber-500/25',
  Low:    'text-emerald-400 bg-emerald-500/10 border-emerald-500/25',
};

const severityLoad = { High: 'bg-red-400', Medium: 'bg-amber-400', Low: 'bg-nodeslix-accent' };

/* ─────────────────────────────────────────
   OPERATIONS PAGE
───────────────────────────────────────── */
const OperationsPage = () => {
  const [tasks, setTasks] = useState(taskQueue);
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Running', 'Queued', 'Completed'];

  const runningTask = tasks.find((t) => t.status === 'Running' && t.id === 'OP-1082');

  const handleCancel = (id) => {
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, status: 'Queued', progress: 0 } : t));
  };

  const handleRun = (id) => {
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, status: 'Running', progress: 5 } : t));
  };

  const filtered = filter === 'All' ? tasks : tasks.filter((t) => t.status === filter);

  return (
    <div className="p-5 md:p-6 space-y-7">
      {/* Page Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="section-kicker">Operations</p>
          <h1 className="text-2xl font-extrabold text-white mt-1">Live Operations Center</h1>
          <p className="text-sm text-nodeslix-muted mt-1">Real-time task orchestration and network operation management.</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-nodeslix-accent/25 bg-nodeslix-accent/10 px-3.5 py-1.5 text-xs font-bold text-nodeslix-accent shrink-0">
          <Motion.span
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="block size-1.5 rounded-full bg-nodeslix-accent"
          />
          3 Operations Running
        </span>
      </div>

      {/* Live metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {liveMetrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <Motion.div
              key={m.label}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="surface-card p-4 flex flex-col items-center gap-2 text-center"
            >
              <Icon size={18} className={m.color} />
              <p className={`text-xl font-extrabold ${m.color}`}>{m.value}</p>
              <p className="text-[10px] text-nodeslix-muted/70 uppercase tracking-widest leading-tight">{m.label}</p>
            </Motion.div>
          );
        })}
      </div>

      {/* Congestion Zones */}
      <section>
        <p className="section-kicker mb-1">Congestion</p>
        <h2 className="text-base font-bold text-white mb-4">Active Congestion Zones</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {congestionZones.map((z, i) => (
            <Motion.div
              key={z.zone}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              whileHover={{ y: -3 }}
              className={[
                'surface-card p-4 flex flex-col gap-3',
                z.resolved ? 'opacity-50' : '',
              ].join(' ')}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-white">{z.zone}</p>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                  z.resolved
                    ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                    : z.severity === 'High'
                      ? 'text-red-400 bg-red-500/10 border-red-500/20'
                      : z.severity === 'Medium'
                        ? 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                        : 'text-blue-400 bg-blue-500/10 border-blue-500/20'
                }`}>
                  {z.resolved ? 'Resolved' : z.severity}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-nodeslix-muted">Load</span>
                <span className="font-bold text-white">{z.load}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/8">
                <Motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: z.load / 100 }}
                  transition={{ duration: 0.8, delay: i * 0.06 + 0.2, ease: 'easeOut' }}
                  style={{ originX: 0 }}
                  className={[
                    'h-full rounded-full',
                    z.resolved ? 'bg-emerald-400' : severityLoad[z.severity],
                  ].join(' ')}
                />
              </div>
            </Motion.div>
          ))}
        </div>
      </section>

      {/* Task Queue */}
      <section>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div>
            <p className="section-kicker mb-1">Queue</p>
            <h2 className="text-base font-bold text-white">Operation Task Queue</h2>
          </div>
          <div className="flex gap-2">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={[
                  'px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200',
                  filter === f
                    ? 'bg-nodeslix-accent/15 border-nodeslix-accent/40 text-nodeslix-accent'
                    : 'border-white/10 text-nodeslix-muted hover:border-white/20 hover:text-white',
                ].join(' ')}
              >{f}</button>
            ))}
          </div>
        </div>

        <div className="surface-card overflow-hidden divide-y divide-white/[0.05]">
          <AnimatePresence>
            {filtered.map((task, i) => {
              const sc = statusConfig[task.status];
              return (
                <Motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ duration: 0.25, delay: i * 0.04 }}
                  className="flex items-center gap-4 px-4 py-3.5 hover:bg-white/[0.02] transition-colors"
                >
                  {/* ID */}
                  <span className="text-[10px] font-mono text-nodeslix-muted/50 w-16 shrink-0">{task.id}</span>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white truncate">{task.type}</p>
                    <p className="text-[10px] text-nodeslix-muted/60">{task.region} · {task.started}</p>
                  </div>

                  {/* Priority */}
                  <span className={`hidden sm:block text-[9px] font-bold px-2 py-0.5 rounded-full border ${priorityConfig[task.priority]}`}>
                    {task.priority}
                  </span>

                  {/* Progress */}
                  {task.status === 'Running' && (
                    <div className="hidden md:flex items-center gap-2 w-24 shrink-0">
                      <div className="flex-1 h-1 rounded-full bg-white/8">
                        <div
                          className="h-full rounded-full bg-nodeslix-accent transition-all duration-500"
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-nodeslix-accent shrink-0">{task.progress}%</span>
                    </div>
                  )}

                  {/* Status */}
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${sc.text} ${sc.bg} ${sc.border}`}>
                    {task.status}
                  </span>

                  {/* Actions */}
                  {task.status === 'Queued' && (
                    <button
                      type="button"
                      onClick={() => handleRun(task.id)}
                      className="shrink-0 flex size-7 items-center justify-center rounded-lg bg-nodeslix-accent/10 text-nodeslix-accent hover:bg-nodeslix-accent/20 border border-nodeslix-accent/20 transition-colors"
                    >
                      <ChevronRight size={12} />
                    </button>
                  )}
                  {task.status === 'Running' && (
                    <button
                      type="button"
                      onClick={() => handleCancel(task.id)}
                      className="shrink-0 flex size-7 items-center justify-center rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-colors"
                    >
                      <RefreshCw size={11} />
                    </button>
                  )}
                  {task.status === 'Completed' && (
                    <div className="shrink-0 flex size-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <CheckCircle2 size={12} />
                    </div>
                  )}
                </Motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </section>

      <div className="h-4" />
    </div>
  );
};

export default OperationsPage;
