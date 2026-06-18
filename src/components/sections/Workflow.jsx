import { motion as Motion } from 'framer-motion';
import { Activity, ArrowDown, BrainCircuit, Eye, Route, WandSparkles } from 'lucide-react';

const workflowSteps = [
  {
    title: 'Step 1',
    description: 'Collect network telemetry.',
    icon: Activity,
  },
  {
    title: 'Step 2',
    description: 'Analyze incoming infrastructure data.',
    icon: BrainCircuit,
  },
  {
    title: 'Step 3',
    description: 'Recommend optimization actions.',
    icon: Route,
  },
  {
    title: 'Step 4',
    description: 'Monitor performance continuously.',
    icon: Eye,
  },
  {
    title: 'Step 5',
    description: 'Execute automated improvements.',
    icon: WandSparkles,
  },
];

const Workflow = () => {
  return (
    <section className="section-shell bg-nodeslix-primary">
      <div className="app-container space-y-12">
        {/* AI workflow section: horizontal desktop flow with responsive stacking. */}
        <Motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl space-y-4"
        >
          <p className="section-kicker">AI Workflow</p>
          <h2 className="section-title">AI Workflow</h2>
          <p className="section-copy">
            The workflow shows how network signals move from collection to AI-assisted action.
          </p>
        </Motion.div>

        <div className="flex flex-col gap-5 lg:flex-row lg:items-stretch">
          {workflowSteps.map((step, index) => (
            <div key={step.title} className="flex flex-1 flex-col gap-5 lg:flex-row lg:items-center">
              <Motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="panel-shell flex min-h-48 flex-1 items-center justify-center text-center"
              >
                <div className="space-y-3">
                  <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-nodeslix-accent/10 text-nodeslix-accent">
                    <step.icon size={21} />
                  </span>
                  <h3 className="text-lg font-semibold text-nodeslix-text">{step.title}</h3>
                  <p className="text-sm leading-6 text-nodeslix-muted">{step.description}</p>
                </div>
              </Motion.article>
              {index < workflowSteps.length - 1 ? (
                <div className="flex items-center justify-center text-2xl text-nodeslix-accent lg:w-10">
                  <ArrowDown size={20} />
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
