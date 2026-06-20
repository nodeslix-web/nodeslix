import { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { Network, Radio, Router, Server, Smartphone, Wifi, Zap } from 'lucide-react';

/* ─── Node definitions ─── */
const topologyNodes = [
  { id: 'ai',   label: 'AI Core',      sublabel: 'Optimization Brain', icon: Zap,        x: 50, y: 12,  ring: true,  color: '#00D4FF' },
  { id: '5g',   label: '5G Towers',    sublabel: '84 / 85 Active',     icon: Radio,      x: 20, y: 42,  ring: false, color: '#7CEBFF' },
  { id: 'core', label: 'Core Network', sublabel: '18 / 18 Online',     icon: Server,     x: 80, y: 42,  ring: false, color: '#3A6DFF' },
  { id: 'mesh', label: 'Mesh Nodes',   sublabel: '247 / 250 Active',   icon: Network,    x: 50, y: 58,  ring: false, color: '#00D4FF' },
  { id: 'edge', label: 'Edge GW',      sublabel: '63 / 64 Online',     icon: Router,     x: 20, y: 78,  ring: false, color: '#a78bfa' },
  { id: 'iot',  label: 'IoT Devices',  sublabel: '834 / 900 Active',   icon: Smartphone, x: 80, y: 78,  ring: false, color: '#f59e0b' },
];

/* Connections: [from, to, animated, direction] */
const connections = [
  { from: 'ai',   to: '5g',   animated: true  },
  { from: 'ai',   to: 'core', animated: true  },
  { from: 'ai',   to: 'mesh', animated: true  },
  { from: '5g',   to: 'mesh', animated: false },
  { from: 'core', to: 'mesh', animated: false },
  { from: 'mesh', to: 'edge', animated: true  },
  { from: 'mesh', to: 'iot',  animated: true  },
];

const nodeById = (id) => topologyNodes.find((n) => n.id === id);

const networkStats = [
  { label: 'Total Nodes',   value: '1,250', color: 'text-nodeslix-accent' },
  { label: 'Active Links',  value: '4,872', color: 'text-blue-400'        },
  { label: 'Avg Latency',   value: '8ms',   color: 'text-emerald-400'     },
  { label: 'Packet Loss',   value: '0.01%', color: 'text-violet-400'      },
];

/* ─────────────────────────────────────────
   TOPOLOGY PAGE
───────────────────────────────────────── */
const TopologyPage = () => {
  const [selected, setSelected] = useState(null);
  const selected_node = topologyNodes.find((n) => n.id === selected);

  return (
    <div className="p-5 md:p-6 space-y-7">
      {/* Page Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="section-kicker">Topology</p>
          <h1 className="text-2xl font-extrabold text-white mt-1">Network Topology Map</h1>
          <p className="text-sm text-nodeslix-muted mt-1">Visual representation of all connected telecom infrastructure layers.</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-nodeslix-accent/25 bg-nodeslix-accent/10 px-3.5 py-1.5 text-xs font-bold text-nodeslix-accent shrink-0">
          <Motion.span
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="block size-1.5 rounded-full bg-nodeslix-accent"
          />
          Live Topology
        </span>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {networkStats.map((s, i) => (
          <Motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.06 }}
            whileHover={{ y: -3 }}
            className="surface-card p-4 text-center"
          >
            <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
            <p className="text-[10px] text-nodeslix-muted/60 uppercase tracking-widest mt-1">{s.label}</p>
          </Motion.div>
        ))}
      </div>

      {/* Main topology area */}
      <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
        {/* SVG topology map */}
        <div className="panel-shell relative" style={{ minHeight: '520px' }}>
          <div className="pointer-events-none absolute inset-0 rounded-[1.25rem] overflow-hidden">
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'linear-gradient(rgba(0,212,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.4) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />
          </div>

          <div className="relative w-full h-full" style={{ minHeight: '480px' }}>
            {/* SVG connections */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {connections.map((conn, i) => {
                const from = nodeById(conn.from);
                const to = nodeById(conn.to);
                if (!from || !to) return null;
                return (
                  <g key={i}>
                    <line
                      x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                      stroke="rgba(0,212,255,0.12)" strokeWidth="0.5"
                    />
                    {conn.animated && (
                      <Motion.circle
                        r="0.8"
                        fill="#00D4FF"
                        animate={{ cx: [from.x, to.x], cy: [from.y, to.y], opacity: [0, 1, 0] }}
                        transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
                      />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Node badges */}
            {topologyNodes.map((node) => {
              const Icon = node.icon;
              const isSelected = selected === node.id;
              return (
                <Motion.button
                  key={node.id}
                  type="button"
                  onClick={() => setSelected(isSelected ? null : node.id)}
                  animate={{ y: [-3, 3, -3] }}
                  transition={{ duration: 4.2, repeat: Infinity, delay: Math.random() * 2, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.08 }}
                  style={{ position: 'absolute', left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
                  className={[
                    'flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-2xl border backdrop-blur-md transition-all duration-200 cursor-pointer z-10',
                    'shadow-[0_8px_24px_rgba(0,0,0,0.35)]',
                    isSelected
                      ? 'border-nodeslix-accent/60 bg-nodeslix-accent/15 shadow-[0_0_24px_rgba(0,212,255,0.25)]'
                      : 'border-white/15 bg-[#0A0A0A]/80 hover:border-nodeslix-accent/30',
                  ].join(' ')}
                >
                  {node.ring && (
                    <Motion.span
                      animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                      className="absolute inset-0 rounded-2xl border border-nodeslix-accent/30"
                    />
                  )}
                  <Icon size={16} style={{ color: node.color }} />
                  <span className="text-[10px] font-bold text-white whitespace-nowrap">{node.label}</span>
                  <Motion.span
                    animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="block size-1.5 rounded-full"
                    style={{ backgroundColor: node.color }}
                  />
                </Motion.button>
              );
            })}
          </div>
        </div>

        {/* Selected node detail / legend */}
        <div className="space-y-4">
          {selected_node ? (
            <Motion.div
              key={selected}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="panel-shell"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex size-10 items-center justify-center rounded-xl border border-white/12 bg-white/[0.04]">
                  <selected_node.icon size={18} style={{ color: selected_node.color }} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{selected_node.label}</p>
                  <p className="text-[10px] text-nodeslix-muted">{selected_node.sublabel}</p>
                </div>
              </div>
              {[
                { label: 'Status',    value: 'Online',   color: 'text-emerald-400' },
                { label: 'Uptime',    value: '99.97%',   color: 'text-white'       },
                { label: 'Latency',   value: '8ms',      color: 'text-white'       },
                { label: 'Packets/s', value: '48,200',   color: 'text-white'       },
              ].map((r) => (
                <div key={r.label} className="flex items-center justify-between py-2 border-b border-white/[0.06] last:border-0">
                  <span className="text-[11px] text-nodeslix-muted">{r.label}</span>
                  <span className={`text-[11px] font-bold ${r.color}`}>{r.value}</span>
                </div>
              ))}
            </Motion.div>
          ) : (
            <div className="panel-shell text-center py-8">
              <Network size={28} className="text-nodeslix-muted/30 mx-auto mb-3" />
              <p className="text-xs text-nodeslix-muted/50">Click a node to view details</p>
            </div>
          )}

          {/* Layer legend */}
          <div className="surface-card p-4 space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-nodeslix-muted/50">Network Layers</p>
            {topologyNodes.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => setSelected(selected === n.id ? null : n.id)}
                className="w-full flex items-center gap-3 hover:bg-white/[0.03] rounded-lg px-2 py-1.5 transition-colors"
              >
                <span className="block size-2 rounded-full shrink-0" style={{ backgroundColor: n.color }} />
                <span className="text-xs text-nodeslix-muted flex-1 text-left">{n.label}</span>
                <span className="text-[10px] text-nodeslix-muted/40">{n.sublabel.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="h-4" />
    </div>
  );
};

export default TopologyPage;
