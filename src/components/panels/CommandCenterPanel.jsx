import { motion as Motion } from 'framer-motion';
import { Activity, BrainCircuit, CheckCircle2, RadioTower, Route, ShieldCheck, Zap } from 'lucide-react';

const topologyNodes = [
  { label: '5G', detail: 'Radio layer', icon: RadioTower },
  { label: 'Core', detail: 'Traffic control', icon: ShieldCheck },
  { label: 'Mesh', detail: 'Node fabric', icon: Route },
  { label: 'Edge', detail: 'Regional compute', icon: Zap },
  { label: 'IoT', detail: 'Field endpoints', icon: Activity },
];

const activityItems = [
  'Traffic optimized',
  'Latency reduced',
  'Path rerouted',
  'Congestion resolved',
];

const metrics = [
  { value: '99.98%', label: 'Infrastructure Uptime' },
  { value: '8ms', label: 'Average Latency' },
  { value: '96%', label: 'AI Efficiency' },
];

const CommandCenterPanel = () => {
  return (
    <div className="flex h-full min-h-[372px] flex-col justify-between gap-5 rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_top,rgba(0,212,255,0.16),transparent_36%),rgba(10,10,10,0.72)] p-5 sm:min-h-[476px]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-nodeslix-muted">
            AI Telecom Command Center
          </p>
          <h3 className="mt-2 text-lg font-semibold text-white">Network Orchestration Panel</h3>
        </div>

        <Motion.div
          animate={{ opacity: [0.72, 1, 0.72] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-flex items-center gap-2 rounded-full border border-nodeslix-accent/35 bg-nodeslix-accent/10 px-3 py-2 text-xs font-semibold text-nodeslix-accent"
        >
          <span className="size-2 rounded-full bg-nodeslix-accent shadow-[0_0_14px_rgba(0,212,255,0.8)]" />
          AI Active
        </Motion.div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
            <BrainCircuit size={17} className="text-nodeslix-accent" />
            Mini Network Topology
          </div>

          <div className="space-y-2.5">
            {topologyNodes.map((node, index) => {
              const Icon = node.icon;

              return (
                <div key={node.label}>
                  <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-nodeslix-accent/10 text-nodeslix-accent">
                      <Icon size={17} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white">{node.label}</p>
                      <p className="text-xs text-nodeslix-muted">{node.detail}</p>
                    </div>
                  </div>

                  {index < topologyNodes.length - 1 ? (
                    <div className="relative mx-4 h-6 overflow-hidden">
                      <div className="absolute left-5 top-0 h-full w-px bg-nodeslix-accent/35" />
                      <Motion.span
                        animate={{ y: [-8, 28] }}
                        transition={{
                          duration: 1.9,
                          repeat: Infinity,
                          delay: index * 0.18,
                          ease: 'linear',
                        }}
                        className="absolute left-[17px] top-0 size-2 rounded-full bg-[#D9F8FF] shadow-[0_0_14px_rgba(0,212,255,0.85)]"
                      />
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-white">AI Activity Feed</p>
              <span className="text-xs text-nodeslix-muted">Auto updates</span>
            </div>

            <div className="space-y-3">
              {activityItems.map((item, index) => (
                <Motion.div
                  key={item}
                  animate={{ opacity: [0.62, 1, 0.62] }}
                  transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    delay: index * 0.55,
                    ease: 'easeInOut',
                  }}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5"
                >
                  <CheckCircle2 size={16} className="text-nodeslix-accent" />
                  <span className="text-sm text-nodeslix-text">{item}</span>
                </Motion.div>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <p className="text-xl font-semibold text-white">{metric.value}</p>
                <p className="mt-2 text-xs leading-5 text-nodeslix-muted">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandCenterPanel;
