import { motion as Motion } from 'framer-motion';
import { BrainCircuit, Cloud, RadioTower, Router, Server, Smartphone } from 'lucide-react';

const nodes = [
  { label: '5G', position: 'left-1/2 top-[8%] -translate-x-1/2', point: { x: 50, y: 16 }, icon: RadioTower },
  { label: 'Core', position: 'left-[7%] top-1/2 -translate-y-1/2', point: { x: 16, y: 50 }, icon: Server },
  { label: 'Mesh', position: 'right-[7%] top-1/2 -translate-y-1/2', point: { x: 84, y: 50 }, icon: Router },
  { label: 'Edge', position: 'bottom-[10%] left-[18%]', point: { x: 26, y: 82 }, icon: Cloud },
  { label: 'IoT', position: 'bottom-[10%] right-[18%]', point: { x: 74, y: 82 }, icon: Smartphone },
];

const metrics = [
  { value: '99.98%', label: 'Infrastructure Uptime' },
  { value: '8ms', label: 'Average Latency' },
  { value: '1,250', label: 'Active Nodes' },
  { value: '96%', label: 'AI Efficiency' },
];

const center = { x: 50, y: 52 };

const CommandCenterPanel = () => {
  return (
    <div className="flex h-full min-h-[372px] flex-col justify-between gap-5 rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.14),transparent_38%),rgba(10,10,10,0.78)] p-5 sm:min-h-[476px]">
      {/* Header */}
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

      {/* SVG network visualization */}
      <div className="relative mx-auto h-[330px] w-full max-w-[520px] overflow-hidden rounded-[1.5rem] border border-white/8 bg-black/25 sm:h-[360px]">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {nodes.map((node, index) => (
            <g key={node.label}>
              {/* Solid line */}
              <Motion.line
                x1={node.point.x}
                y1={node.point.y}
                x2={center.x}
                y2={center.y}
                stroke="#00D4FF"
                strokeWidth="0.28"
                strokeLinecap="round"
                animate={{ opacity: [0.2, 0.65, 0.2] }}
                transition={{ duration: 3.4, repeat: Infinity, delay: index * 0.2, ease: 'easeInOut' }}
              />
              {/* Dashed overlay */}
              <Motion.line
                x1={node.point.x}
                y1={node.point.y}
                x2={center.x}
                y2={center.y}
                stroke="#00D4FF"
                strokeWidth="0.18"
                strokeLinecap="round"
                strokeDasharray="1 2.5"
                animate={{ opacity: [0.06, 0.28, 0.06] }}
                transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.3 + 0.5, ease: 'easeInOut' }}
              />
              {/* Data packet traveling node → center */}
              <Motion.circle
                r="0.85"
                fill="#D9F8FF"
                animate={{
                  cx: [node.point.x, center.x],
                  cy: [node.point.y, center.y],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3.8,
                  repeat: Infinity,
                  delay: index * 0.42,
                  ease: 'easeInOut',
                }}
                filter="url(#packetGlow)"
              />
            </g>
          ))}
          <defs>
            <filter id="packetGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="1.6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>

        {/* AI Core — dual-orbit rings */}
        <div className="absolute left-1/2 top-[52%] z-20 -translate-x-1/2 -translate-y-1/2">
          {/* Outer counter-rotating ring */}
          <Motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 -m-5 rounded-full border border-nodeslix-accent/18 border-dashed"
          />
          {/* Primary rotating ring */}
          <Motion.div
            animate={{ rotate: 360, scale: [1, 1.045, 1] }}
            transition={{
              rotate: { duration: 28, repeat: Infinity, ease: 'linear' },
              scale: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="flex size-28 items-center justify-center rounded-full border border-nodeslix-accent/50 bg-nodeslix-accent/10 shadow-[0_0_48px_rgba(0,212,255,0.3)]"
          >
            <div className="flex size-20 items-center justify-center rounded-full border border-white/12 bg-[#00D4FF]/12 text-[#D9F8FF] shadow-[inset_0_0_28px_rgba(0,212,255,0.14)]">
              <BrainCircuit size={30} />
            </div>
          </Motion.div>
        </div>

        <div className="absolute left-1/2 top-[calc(52%+72px)] z-20 -translate-x-1/2 text-center">
          <p className="text-sm font-bold text-white">AI Core</p>
          <p className="text-xs text-nodeslix-muted">Optimization brain</p>
        </div>

        {/* Node badges with status dots */}
        {nodes.map((node, index) => {
          const Icon = node.icon;

          return (
            <Motion.div
              key={node.label}
              animate={{ y: [-3, 3, -3] }}
              transition={{ duration: 4.4, repeat: Infinity, delay: index * 0.25, ease: 'easeInOut' }}
              className={[
                'absolute z-20 flex size-[74px] flex-col items-center justify-center gap-1 rounded-2xl border border-white/10 bg-[#0A0A0A]/82 text-center shadow-[0_18px_45px_rgba(0,0,0,0.32)] backdrop-blur-md sm:size-20',
                node.position,
              ].join(' ')}
            >
              <Icon size={17} className="text-[#7BE7FF]" />
              <span className="text-xs font-bold text-[#D9F8FF]">{node.label}</span>
              {/* Live status dot */}
              <Motion.span
                animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.3, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.18, ease: 'easeInOut' }}
                className="block size-1 rounded-full bg-nodeslix-accent"
              />
            </Motion.div>
          );
        })}
      </div>

      {/* Metrics row with animated bars */}
      <div className="grid gap-3 sm:grid-cols-4">
        {metrics.map((metric, index) => (
          <div key={metric.label} className="rounded-2xl border border-white/8 bg-black/28 p-4 space-y-2">
            <p className="text-xl font-bold text-white leading-none">{metric.value}</p>
            <p className="text-xs leading-5 text-nodeslix-muted">{metric.label}</p>
            {/* Animated accent bar */}
            <div className="h-0.5 w-full overflow-hidden rounded-full bg-white/6">
              <Motion.div
                initial={{ width: 0 }}
                animate={{ width: ['0%', '100%', '0%'] }}
                transition={{ duration: 5 + index * 0.8, repeat: Infinity, ease: 'easeInOut', delay: index * 0.4 }}
                className="h-full rounded-full bg-nodeslix-accent/50"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommandCenterPanel;
