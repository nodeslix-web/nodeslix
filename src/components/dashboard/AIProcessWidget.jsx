import { motion as Motion } from 'framer-motion';
import { BrainCircuit, Cpu, GitBranch, Radar, WandSparkles } from 'lucide-react';

const processSteps = [
  { label: 'Telemetry Ingestion', description: 'Collect operational data.', icon: Radar },
  { label: 'Traffic Optimization', description: 'Balance network workloads.', icon: Cpu },
  { label: 'Routing Intelligence', description: 'Improve path selection.', icon: GitBranch },
  { label: 'Predictive Analytics', description: 'Forecast possible incidents.', icon: BrainCircuit },
  { label: 'Autonomous Orchestration', description: 'Apply automated improvements.', icon: WandSparkles },
];

const AIProcessWidget = () => {
  return (
    <section className="panel-shell min-h-full space-y-7 p-6 sm:p-8">
      {/* AI process visualizer without live logic or charts. */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-nodeslix-text">AI Intelligence Engine</h2>
        <div className="inline-flex rounded-full border border-nodeslix-accent/35 bg-nodeslix-accent/10 px-3 py-1.5 text-xs font-semibold text-nodeslix-accent">
          Powered by NVIDIA SDK
        </div>
        <p className="text-sm leading-6 text-nodeslix-muted">
          AI-powered analysis pipeline.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/20 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
        <div className="space-y-0">
          {processSteps.map((step, index) => {
            const Icon = step.icon;

            return (
            <div key={step.label} className="relative">
              {index < processSteps.length - 1 ? (
                <div className="pointer-events-none absolute left-[1.65rem] top-14 h-[calc(100%-1.5rem)] w-px overflow-hidden">
                  <Motion.span
                    animate={{ opacity: [0.24, 0.72, 0.24] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.18,
                      ease: 'easeInOut',
                    }}
                    className="absolute inset-0 bg-nodeslix-accent/55 shadow-[0_0_20px_rgba(0,212,255,0.3)]"
                  />
                  <Motion.span
                    animate={{ y: [-8, 72] }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      delay: index * 0.28,
                      ease: 'linear',
                    }}
                    className="absolute -left-[3px] top-0 size-2 rounded-full bg-[#D9F8FF] shadow-[0_0_14px_rgba(0,212,255,0.9)]"
                  />
                </div>
              ) : null}
              <Motion.article
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, delay: index * 0.04 }}
                className="surface-card mb-3 p-6 hover:border-nodeslix-accent/45"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-nodeslix-accent/10 text-nodeslix-accent">
                      <Icon size={17} />
                    </span>
                    <div>
                      <h3 className="text-sm font-medium text-nodeslix-text">{step.label}</h3>
                      <p className="mt-1 text-xs text-nodeslix-muted">{step.description}</p>
                    </div>
                  </div>
                  <span className="size-2 rounded-full bg-nodeslix-accent shadow-[0_0_12px_rgba(0,212,255,0.65)]" />
                </div>
              </Motion.article>
              {index < processSteps.length - 1 ? (
                <div className="mb-3 h-5" />
              ) : null}
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AIProcessWidget;
