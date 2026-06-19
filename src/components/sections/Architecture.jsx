import { motion as Motion } from 'framer-motion';
import { BrainCircuit, Cloud, RadioTower, Router, Server, Smartphone } from 'lucide-react';

const architectureNodes = [
  { title: '5G Towers', subtitle: 'Radio Access Layer', icon: RadioTower, position: 'top' },
  { title: 'Core Network', subtitle: 'Traffic Management', icon: Server, position: 'left' },
  { title: 'Mesh Nodes', subtitle: 'Distributed Connectivity', icon: Router, position: 'right' },
  { title: 'Edge Gateways', subtitle: 'Regional Processing', icon: Cloud, position: 'bottom-left' },
  { title: 'IoT Devices', subtitle: 'Field Endpoints', icon: Smartphone, position: 'bottom-right' },
];

const desktopPlacement = {
  top: 'left-1/2 top-0 -translate-x-1/2',
  left: 'left-0 top-1/2 -translate-y-1/2',
  right: 'right-0 top-1/2 -translate-y-1/2',
  'bottom-left': 'bottom-0 left-[16%]',
  'bottom-right': 'bottom-0 right-[16%]',
};

const lineCoordinates = {
  top: { x1: 50, y1: 22, x2: 50, y2: 47 },
  left: { x1: 20, y1: 50, x2: 43, y2: 50 },
  right: { x1: 80, y1: 50, x2: 57, y2: 50 },
  'bottom-left': { x1: 31, y1: 78, x2: 45, y2: 58 },
  'bottom-right': { x1: 69, y1: 78, x2: 55, y2: 58 },
};

const Architecture = () => {
  return (
    <section id="architecture" className="scroll-mt-20 border-t border-white/8 bg-nodeslix-secondary py-16 sm:py-20 lg:py-24">
      <div className="app-container space-y-11">
        {/* Network architecture section with labeled nodes. */}
        <Motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl space-y-5"
        >
          <p className="section-kicker">Network Architecture</p>
          <h2 className="section-title">Infrastructure Ecosystem</h2>
          <p className="section-copy">
            NodeSlix acts as an intelligent orchestration layer that continuously monitors and optimizes your telecom infrastructure.
          </p>
        </Motion.div>

        <Motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="panel-shell overflow-hidden"
        >
          <div className="relative">
            {/* AI Active badge with pulsing dot */}
            <div className="mb-6 flex justify-end">
              <Motion.span
                animate={{ opacity: [0.72, 1, 0.72] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-flex items-center gap-2 rounded-full border border-nodeslix-accent/35 bg-nodeslix-accent/10 px-3 py-2 text-xs font-semibold text-nodeslix-accent"
              >
                <Motion.span
                  animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  className="block size-1.5 rounded-full bg-nodeslix-accent"
                />
                AI Active
              </Motion.span>
            </div>

            {/* Mobile / tablet fallback grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:hidden">
              <div className="surface-card flex flex-col items-center justify-center gap-4 p-6 text-center md:col-span-2">
                <Motion.span
                  animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex size-20 items-center justify-center rounded-full border border-nodeslix-accent/45 bg-nodeslix-accent/10 text-nodeslix-accent shadow-[0_0_42px_rgba(0,212,255,0.22)]"
                >
                  <BrainCircuit size={30} />
                </Motion.span>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white">AI Orchestration Layer</h3>
                  <p className="text-sm text-nodeslix-muted">Monitor • Analyze • Predict • Optimize</p>
                </div>
              </div>

              {architectureNodes.map((node) => {
                const Icon = node.icon;

                return (
                  <Motion.div
                    key={node.title}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="surface-card flex items-center gap-4 p-4"
                  >
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-nodeslix-accent/10 text-nodeslix-accent">
                      <Icon size={22} />
                    </span>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-nodeslix-text">{node.title}</h3>
                      <p className="text-xs leading-5 text-nodeslix-muted">{node.subtitle}</p>
                    </div>
                  </Motion.div>
                );
              })}
            </div>

            {/* Desktop SVG architecture diagram */}
            <div className="relative hidden h-[520px] lg:block">
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Solid signal lines */}
                {architectureNodes.map((node, index) => {
                  const line = lineCoordinates[node.position];

                  return (
                    <Motion.line
                      key={`solid-${node.title}`}
                      x1={line.x1}
                      y1={line.y1}
                      x2={line.x2}
                      y2={line.y2}
                      stroke="#00D4FF"
                      strokeWidth="0.3"
                      strokeLinecap="round"
                      animate={{ opacity: [0.18, 0.55, 0.18] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: index * 0.22,
                        ease: 'easeInOut',
                      }}
                    />
                  );
                })}
                {/* Dashed overlay lines for signal-flow effect */}
                {architectureNodes.map((node, index) => {
                  const line = lineCoordinates[node.position];

                  return (
                    <Motion.line
                      key={`dashed-${node.title}`}
                      x1={line.x1}
                      y1={line.y1}
                      x2={line.x2}
                      y2={line.y2}
                      stroke="#00D4FF"
                      strokeWidth="0.22"
                      strokeLinecap="round"
                      strokeDasharray="1.2 2.5"
                      animate={{ opacity: [0.08, 0.35, 0.08] }}
                      transition={{
                        duration: 3.2,
                        repeat: Infinity,
                        delay: index * 0.3 + 0.6,
                        ease: 'easeInOut',
                      }}
                    />
                  );
                })}
              </svg>

              {/* Center AI core */}
              <div className="absolute left-1/2 top-1/2 z-20 flex size-56 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-nodeslix-accent/45 bg-nodeslix-accent/8 text-center shadow-[0_0_62px_rgba(0,212,255,0.2)] backdrop-blur-md">
                <Motion.span
                  animate={{ scale: [1, 1.06, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="mb-4 flex size-16 items-center justify-center rounded-full border border-white/10 bg-nodeslix-primary/80 text-nodeslix-accent"
                >
                  <BrainCircuit size={28} />
                </Motion.span>
                <h3 className="max-w-36 text-lg font-bold leading-tight text-white">
                  AI Orchestration Layer
                </h3>
                <p className="mt-3 max-w-40 text-xs leading-5 text-nodeslix-muted">
                  Monitor • Analyze • Predict • Optimize
                </p>
              </div>

              {/* Peripheral nodes */}
              {architectureNodes.map((node) => {
                const Icon = node.icon;

                return (
                  <Motion.div
                    key={node.title}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    className={[
                      'surface-card absolute z-30 flex h-[180px] w-[180px] flex-col justify-between gap-4 p-4 text-center',
                      'shadow-[0_24px_60px_rgba(0,0,0,0.42)]',
                      desktopPlacement[node.position],
                    ].join(' ')}
                  >
                    <span className="mx-auto flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-nodeslix-accent/10 text-nodeslix-accent">
                      <Icon size={22} />
                    </span>

                    <div className="space-y-1.5">
                      <h3 className="text-sm font-bold text-nodeslix-text">{node.title}</h3>
                      <p className="text-xs leading-5 text-nodeslix-muted">{node.subtitle}</p>
                    </div>
                  </Motion.div>
                );
              })}
            </div>
          </div>
        </Motion.div>
      </div>
    </section>
  );
};

export default Architecture;
