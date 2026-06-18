import { motion as Motion } from 'framer-motion';
import { BrainCircuit, Cpu, GitBranch, Radar, WandSparkles } from 'lucide-react';

const processSteps = [
  { label: 'Telemetry Ingestion', icon: Radar },
  { label: 'Traffic Optimization', icon: Cpu },
  { label: 'Routing Intelligence', icon: GitBranch },
  { label: 'Predictive Analytics', icon: BrainCircuit },
  { label: 'Autonomous Orchestration', icon: WandSparkles },
];

const AIProcessWidget = () => {
  return (
    <section className="panel-shell min-h-full space-y-7">
      {/* Widget B: static AI process visualizer without live logic or charts. */}
      <div className="space-y-3">
        <p className="section-kicker">Widget B</p>
        <h2 className="text-2xl font-semibold text-nodeslix-text">AI Process</h2>
        <p className="text-sm leading-6 text-nodeslix-muted">
          Lorem ipsum analysis pipeline.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/20 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
        <div className="space-y-3.5">
          {processSteps.map((step, index) => {
            const Icon = step.icon;

            return (
            <div key={step.label} className="space-y-3.5">
              <Motion.article
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ x: 3 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className="surface-card p-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-nodeslix-accent/10 text-nodeslix-accent">
                      <Icon size={17} />
                    </span>
                    <h3 className="text-sm font-medium text-nodeslix-text">{step.label}</h3>
                  </div>
                  <span className="text-xs text-nodeslix-muted">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </Motion.article>
              {index < processSteps.length - 1 ? (
                <div className="flex justify-center text-lg leading-none text-nodeslix-accent">↓</div>
              ) : null}
            </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl border border-nodeslix-border bg-nodeslix-secondary px-4 py-3 text-sm font-semibold text-nodeslix-accent shadow-[0_12px_30px_rgba(0,0,0,0.18)]">
        Powered by NVIDIA SDK
      </div>
    </section>
  );
};

export default AIProcessWidget;
