import { motion as Motion } from 'framer-motion';
import { BrainCircuit, Cpu, GitBranch, Radar, WandSparkles } from 'lucide-react';

const processSteps = [
  { label: 'Telemetry Ingestion',    description: 'Collect raw operational data from all network layers.',  icon: Radar,         chip: 'Running',   chipColor: 'emerald' },
  { label: 'Traffic Optimization',   description: 'Balance and redistribute network workloads dynamically.', icon: Cpu,           chip: 'Analyzing',  chipColor: 'accent' },
  { label: 'Routing Intelligence',   description: 'Select optimal signal paths using live topology data.',   icon: GitBranch,     chip: 'Learning',   chipColor: 'accent' },
  { label: 'Predictive Analytics',   description: 'Forecast failure probability across infrastructure nodes.', icon: BrainCircuit,  chip: 'Optimizing', chipColor: 'accent' },
  { label: 'Autonomous Orchestration', description: 'Apply AI-generated improvements without human input.', icon: WandSparkles,  chip: 'Executing',  chipColor: 'emerald' },
];

const chipClass = {
  emerald: 'border-emerald-500/25 bg-emerald-500/8 text-emerald-400',
  accent:  'border-nodeslix-accent/22 bg-nodeslix-accent/8 text-nodeslix-accent',
};

const AIProcessWidget = () => (
  <section className="panel-shell flex h-full flex-col gap-6 p-6 sm:p-7">
    {/* Header */}
    <div className="space-y-1.5">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-nodeslix-muted/70">
        AI Intelligence Engine
      </p>
      <div className="flex items-center gap-2.5">
        <h2 className="text-xl font-bold tracking-tight text-nodeslix-text">
          AI Process Pipeline
        </h2>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-nodeslix-accent/25 bg-nodeslix-accent/8 px-2.5 py-1 text-[10px] font-bold text-nodeslix-accent">
          <Motion.span
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="block size-1.5 rounded-full bg-nodeslix-accent"
          />
          Live
        </span>
      </div>
      <p className="text-xs leading-[1.7] text-nodeslix-muted">
        AI-powered analysis and optimization pipeline.
      </p>
    </div>

    {/* Vertical timeline */}
    <div className="relative flex flex-col gap-0">
      {processSteps.map((step, index) => {
        const Icon = step.icon;
        const isLast = index === processSteps.length - 1;

        return (
          <div key={step.label} className="relative flex gap-4">
            {/* Timeline spine */}
            <div className="flex flex-col items-center">
              {/* Node circle */}
              <Motion.div
                animate={{ boxShadow: ['0 0 0px rgba(0,212,255,0)', '0 0 14px rgba(0,212,255,0.5)', '0 0 0px rgba(0,212,255,0)'] }}
                transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.3, ease: 'easeInOut' }}
                className="z-10 flex size-9 shrink-0 items-center justify-center rounded-xl border border-nodeslix-accent/28 bg-nodeslix-accent/10 text-nodeslix-accent"
              >
                <Icon size={15} />
              </Motion.div>
              {/* Connector line */}
              {!isLast && (
                <div className="relative w-px flex-1 overflow-hidden bg-white/8" style={{ minHeight: 28 }}>
                  <Motion.span
                    animate={{ y: ['-100%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.28, ease: 'linear' }}
                    className="absolute inset-x-0 h-1/2 rounded-full bg-nodeslix-accent/50 shadow-[0_0_8px_rgba(0,212,255,0.6)]"
                  />
                </div>
              )}
            </div>

            {/* Step content */}
            <Motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ x: 3 }}
              transition={{ duration: 0.28, delay: 0.08 + index * 0.06 }}
              className={['pb-5', isLast ? 'pb-0' : ''].join(' ')}
            >
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-bold text-nodeslix-text">{step.label}</h3>
                <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${chipClass[step.chipColor]}`}>
                  {step.chip}
                </span>
              </div>
              <p className="mt-1 text-[11px] leading-[1.65] text-nodeslix-muted">{step.description}</p>
            </Motion.div>
          </div>
        );
      })}
    </div>
  </section>
);

export default AIProcessWidget;
