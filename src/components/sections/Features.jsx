import { motion as Motion } from 'framer-motion';
import { BrainCircuit, Gauge, Radar, Workflow } from 'lucide-react';

const capabilities = [
  {
    title: 'Network Intelligence',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    icon: Radar,
  },
  {
    title: 'Traffic Optimization',
    description: 'Sed do eiusmod tempor incididunt ut labore et dolore.',
    icon: Gauge,
  },
  {
    title: 'Predictive Analytics',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation.',
    icon: BrainCircuit,
  },
  {
    title: 'Autonomous Operations',
    description: 'Duis aute irure dolor in reprehenderit in voluptate.',
    icon: Workflow,
  },
];

const Features = () => {
  return (
    <section className="section-shell bg-nodeslix-primary">
      <div className="app-container space-y-12">
        {/* AI capabilities section: four-card responsive grid. */}
        <Motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl space-y-4"
        >
          <p className="section-kicker">AI Capabilities</p>
          <h2 className="section-title">AI Capabilities</h2>
          <p className="section-copy">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
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
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="panel-shell min-h-72 space-y-6"
              >
              <div className="flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-nodeslix-accent/10 text-nodeslix-accent">
                <Icon size={21} />
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-nodeslix-text">{capability.title}</h3>
                <p className="text-sm leading-6 text-nodeslix-muted">
                  {capability.description}
                </p>
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
