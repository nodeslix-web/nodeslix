import { motion as Motion } from 'framer-motion';
import { BrainCircuit, Cloud, RadioTower, Router, Server, Smartphone } from 'lucide-react';
import RadioTowerSvg from '../../assets/icons/Network Architecture(5G Towers).svg'
import ServerSvg from '../../assets/icons/Network Architecture(Core Network).svg'
import RouterSvg from '../../assets/icons/Network Architecture(Mesh Nodes).svg'
import CloudSvg from '../../assets/icons/Network Architecture(Edge Gateways).svg'
import SmartphoneSvg from '../../assets/icons/Network Architecture(IoT Devices).svg'

const nodes = [
  { label: '5G', position: 'left-1/2 top-[8%] -translate-x-1/2', point: { x: 50, y: 16 }, icon: RadioTowerSvg },
  { label: 'Core', position: 'left-[7%] top-1/2 -translate-y-1/2', point: { x: 16, y: 50 }, icon: ServerSvg },
  { label: 'Mesh', position: 'right-[7%] top-1/2 -translate-y-1/2', point: { x: 84, y: 50 }, icon: RouterSvg },
  { label: 'Edge', position: 'bottom-[10%] left-[18%]', point: { x: 26, y: 82 }, icon: CloudSvg },
  { label: 'IoT', position: 'bottom-[10%] right-[18%]', point: { x: 74, y: 82 }, icon: SmartphoneSvg },
];

const metrics = [
  { value: '99.98%', label: 'Infrastructure Uptime' },
  { value: '8ms',    label: 'Average Latency' },
  { value: '1,250',  label: 'Active Nodes' },
  { value: '96%',    label: 'AI Efficiency' },
];

/* Floating info chips — placed around the visualization */
const floatingChips = [
  { label: 'Traffic Optimized',  top: '6%',  left: '-2%',  delay: 0 },
  { label: 'Latency Reduced',    top: '18%', right: '-2%', delay: 0.6 },
  { label: 'Congestion Low',     top: '72%', left: '-4%',  delay: 1.1 },
  { label: 'AI Learning',        top: '80%', right: '-2%', delay: 0.3 },
  { label: 'Path Rerouted',      top: '44%', right: '-4%', delay: 0.9 },
];

const center = { x: 50, y: 52 };

const CommandCenterPanel = () => {
  return (
    <div className="flex h-full min-h-[372px] flex-col justify-between gap-5 rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.12),transparent_40%),rgba(10,10,10,0.80)] p-5 sm:min-h-[476px]">

      {/* ── Header ── */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-nodeslix-muted">
            AI Network Core
          </p>
          <h3 className="mt-1.5 text-lg font-bold text-white">Telecom orchestration system</h3>
        </div>
        <Motion.span
          animate={{ opacity: [0.72, 1, 0.72] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center gap-1.5 rounded-full border border-nodeslix-accent/35 bg-nodeslix-accent/10 px-3 py-2 text-xs font-semibold text-nodeslix-accent"
        >
          <Motion.span
            animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="block size-1.5 rounded-full bg-nodeslix-accent"
          />
          AI Active
        </Motion.span>
      </div>

      {/* ── Visualization container ── */}
      <div className="relative mx-auto h-[330px] w-full max-w-[520px] sm:h-[360px]">

        {/* Floating info chips */}
        {floatingChips.map((chip) => (
          <Motion.div
            key={chip.label}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3.6 + chip.delay, repeat: Infinity, delay: chip.delay, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: chip.top,
              left: chip.left,
              right: chip.right,
              zIndex: 30,
              pointerEvents: 'none',
            }}
          >
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-nodeslix-accent/22 bg-nodeslix-primary/85 px-2.5 py-1.5 text-[10px] font-semibold text-nodeslix-accent/90 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
              <Motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, delay: chip.delay, ease: 'easeInOut' }}
                className="block rounded-full size-1 bg-nodeslix-accent"
              />
              {chip.label}
            </span>
          </Motion.div>
        ))}

        {/* Clipped inner visualization */}
        <div className="absolute inset-0 overflow-hidden rounded-[1.5rem] border border-white/8 bg-black/22">

          {/* SVG connection lines + packets */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Ambient radial pulse from center */}
            <Motion.circle
              cx={center.x} cy={center.y} r="8"
              fill="none" stroke="#00D4FF" strokeWidth="0.15"
              animate={{ r: [6, 18, 6], opacity: [0.35, 0, 0.35] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeOut' }}
            />

            {nodes.map((node, index) => (
              <g key={node.label}>
                <Motion.line
                  x1={node.point.x} y1={node.point.y} x2={center.x} y2={center.y}
                  stroke="#00D4FF" strokeWidth="0.3" strokeLinecap="round"
                  animate={{ opacity: [0.18, 0.55, 0.18] }}
                  transition={{ duration: 3.6, repeat: Infinity, delay: index * 0.22, ease: 'easeInOut' }}
                />
                <Motion.line
                  x1={node.point.x} y1={node.point.y} x2={center.x} y2={center.y}
                  stroke="#00D4FF" strokeWidth="0.18" strokeLinecap="round" strokeDasharray="1.2 2.8"
                  animate={{ opacity: [0.05, 0.3, 0.05] }}
                  transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.32 + 0.5, ease: 'easeInOut' }}
                />
                <Motion.circle
                  r="0.8" fill="#D9F8FF"
                  animate={{ cx: [node.point.x, center.x], cy: [node.point.y, center.y], opacity: [0, 1, 0] }}
                  transition={{ duration: 3.8, repeat: Infinity, delay: index * 0.45, ease: 'easeInOut' }}
                  filter="url(#packetGlow)"
                />
              </g>
            ))}

            <defs>
              <filter id="packetGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="1.4" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
          </svg>

          {/* AI Core — dual-orbit rings */}
          <div className="absolute left-1/2 top-[52%] z-20 -translate-x-1/2 -translate-y-1/2">
            <div className="absolute inset-0 -m-8 rounded-full bg-nodeslix-accent/[0.06] blur-xl" />
            <Motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 -m-6 border border-dashed rounded-full border-nodeslix-accent/16"
            />
            <Motion.div
              animate={{ rotate: 360, scale: [1, 1.04, 1] }}
              transition={{
                rotate: { duration: 26, repeat: Infinity, ease: 'linear' },
                scale:  { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
              }}
              className="flex size-28 items-center justify-center rounded-full border border-nodeslix-accent/50 bg-nodeslix-accent/10 shadow-[0_0_52px_rgba(0,212,255,0.28)]"
            >
              <div className="flex size-20 items-center justify-center rounded-full border border-white/12 bg-[#00D4FF]/12 text-[#D9F8FF] shadow-[inset_0_0_26px_rgba(0,212,255,0.16)]">
                <BrainCircuit size={28} />
              </div>
            </Motion.div>
          </div>

          {/* AI Core label */}
          <div className="absolute left-1/2 top-[calc(52%+72px)] z-20 -translate-x-1/2 text-center">
            <p className="text-sm font-bold text-white">AI Core</p>
            <p className="text-xs text-nodeslix-muted">Optimization brain</p>
          </div>

          {/* Node badges */}
          {nodes.map((node, index) => {
            const Icon = node.icon;
            return (
              <Motion.div
                key={node.label}
                animate={{ y: [-3, 3, -3] }}
                transition={{ duration: 4.4, repeat: Infinity, delay: index * 0.28, ease: 'easeInOut' }}
                className={[
                  'absolute z-20 flex size-[74px] flex-col items-center justify-center gap-1 rounded-2xl border border-nodeslix-accent/18 bg-[#0A0A0A]/85 text-center backdrop-blur-md sm:size-20',
                  'shadow-[0_0_20px_rgba(0,212,255,0.08),0_18px_40px_rgba(0,0,0,0.36)]',
                  'transition-all duration-300 hover:border-nodeslix-accent/40 hover:shadow-[0_0_28px_rgba(0,212,255,0.16)]',
                  node.position,
                ].join(' ')}
              >
                {typeof Icon === 'string' ? (
                  <img src={Icon} className="w-[17px] h-[17px] opacity-90 object-contain text-[#7BE7FF]" aria-hidden="true" />
                ) : (
                  <Icon size={17} className="text-[#7BE7FF]" />
                )}
                <span className="text-xs font-bold text-[#D9F8FF]">{node.label}</span>
                <Motion.span
                  animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.4, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.2, ease: 'easeInOut' }}
                  className="block size-1.5 rounded-full bg-nodeslix-accent"
                />
              </Motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Metrics row ── */}
      <div className="grid gap-3 sm:grid-cols-4">
        {metrics.map((metric, index) => (
          <Motion.div
            key={metric.label}
            whileHover={{ borderColor: 'rgba(0,212,255,0.30)', y: -2 }}
            transition={{ duration: 0.2 }}
            className="p-4 space-y-2 border rounded-2xl border-white/8 bg-black/28"
          >
            <p className="text-xl font-bold leading-none text-white">{metric.value}</p>
            <p className="text-xs leading-5 text-nodeslix-muted">{metric.label}</p>
            <div className="w-full h-px overflow-hidden rounded-full bg-white/6">
              <Motion.div
                initial={{ width: 0 }}
                animate={{ width: ['0%', '100%', '0%'] }}
                transition={{ duration: 5 + index * 0.8, repeat: Infinity, ease: 'easeInOut', delay: index * 0.4 }}
                className="h-full rounded-full bg-gradient-to-r from-nodeslix-accent/30 to-nodeslix-accent/70"
              />
            </div>
          </Motion.div>
        ))}
      </div>
    </div>
  );
};

export default CommandCenterPanel;
