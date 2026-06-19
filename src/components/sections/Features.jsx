import { motion as Motion } from 'framer-motion';
import { BrainCircuit, Gauge, Radar, Workflow } from 'lucide-react';

const capabilities = [
  {
    title: 'Network Intelligence',
    description: 'Understand network behavior in real time with AI-driven signal analysis and anomaly detection.',
    stat: 'Up to 40% fewer incidents',
    icon: Radar,
  },
  {
    title: 'Traffic Optimization',
    description: 'Detect bottlenecks and redistribute traffic intelligently across all connected segments.',
    stat: '3× faster rerouting',
    icon: Gauge,
  },
  {
    title: 'Predictive Analytics',
    description: 'Identify potential failures before they impact users using historical pattern modeling.',
    stat: '72h advance warning',
    icon: BrainCircuit,
  },
  {
    title: 'Autonomous Operations',
    description: 'Automate repetitive optimization tasks and reduce manual intervention across your fleet.',
    stat: '85% ops automation rate',
    icon: Workflow,
  },
];

const Features = () => {
  return (
    <section id="capabilities" className="section-shell scroll-mt-20 bg-nodeslix-primary">
      <div className="app-container space-y-14">
        {/* AI capabilities section: four-card responsive grid. */}
        <Motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl space-y-5"
        >
          <p className="section-kicker">AI Capabilities</p>
          <h2 className="section-title">Built for Intelligent Networks</h2>
          <p className="section-copy">
            AI capabilities organized around visibility, performance, prediction, and assisted operations.
          </p>
        </Motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;

            return (
              <Motion.article
                key={capability.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: index * 0.07 }}
                className="accent-card min-h-72 space-y-5 p-6"
              >
                <div className="flex size-14 items-center justify-center rounded-3xl border border-white/10 bg-nodeslix-accent/10 text-nodeslix-accent">
                  <Icon size={22} />
                </div>
                <div className="space-y-3 flex-1">
                  <h3 className="text-lg font-bold tracking-tight text-nodeslix-text">{capability.title}</h3>
                  <p className="text-sm leading-[1.75] text-nodeslix-muted">
                    {capability.description}
                  </p>
                </div>
                {/* Stat badge */}
                <div className="pt-3 border-t border-white/6">
                  <span className="text-xs font-semibold text-nodeslix-accent tracking-wide">
                    {capability.stat}
                  </span>
                </div>
              </Motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
