import { motion as Motion } from 'framer-motion';
import { Activity, ArrowRight, BrainCircuit, Eye, Route, WandSparkles } from 'lucide-react';

const workflowSteps = [
  {
    step: '01',
    title: 'Telemetry Ingestion',
    description: 'Collect raw network telemetry from towers, gateways, and edge devices at scale.',
    icon: Activity,
  },
  {
    step: '02',
    title: 'AI Analysis',
    description: 'Process and analyze incoming infrastructure data to surface patterns and anomalies.',
    icon: BrainCircuit,
  },
  {
    step: '03',
    title: 'Action Recommendations',
    description: 'Generate targeted optimization actions ranked by priority and predicted impact.',
    icon: Route,
  },
  {
    step: '04',
    title: 'Continuous Monitoring',
    description: 'Track performance signals in real time and recalibrate models as conditions change.',
    icon: Eye,
  },
  {
    step: '05',
    title: 'Autonomous Execution',
    description: 'Execute approved improvements automatically without manual operator intervention.',
    icon: WandSparkles,
  },
];

const Workflow = () => {
  return (
    <section id="workflow" className="section-shell scroll-mt-20 bg-nodeslix-primary">
      <div className="app-container space-y-14">
        {/* AI workflow section: horizontal desktop flow with responsive stacking. */}
        <Motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl space-y-5"
        >
          <p className="section-kicker">AI Workflow</p>
          <h2 className="section-title">How NodeSlix Operates</h2>
          <p className="section-copy">
            The workflow shows how network signals move from collection to AI-assisted action.
          </p>
        </Motion.div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
          {workflowSteps.map((step, index) => (
            <div key={step.title} className="flex flex-1 flex-col gap-4 lg:flex-row lg:items-center">
              <Motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="accent-card relative flex min-h-52 flex-1 flex-col justify-between p-6 text-center"
              >
                {/* Step number badge */}
                <span className="absolute right-4 top-4 text-[10px] font-bold tracking-[0.22em] text-nodeslix-accent/38 select-none">
                  {step.step}
                </span>

                <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-nodeslix-accent/10 text-nodeslix-accent">
                  <step.icon size={21} />
                </span>

                <div className="space-y-2">
                  <h3 className="text-base font-bold tracking-tight text-nodeslix-text">{step.title}</h3>
                  <p className="text-sm leading-[1.7] text-nodeslix-muted">{step.description}</p>
                </div>
              </Motion.article>

              {/* Connector arrow */}
              {index < workflowSteps.length - 1 ? (
                <div className="flex items-center justify-center text-nodeslix-accent/50 lg:w-8 lg:shrink-0">
                  {/* Vertical on mobile, horizontal on desktop */}
                  <ArrowRight size={18} className="hidden lg:block" />
                  <ArrowRight size={18} className="rotate-90 lg:hidden" />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Workflow;
