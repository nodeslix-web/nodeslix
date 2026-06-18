import { motion as Motion } from 'framer-motion';
import { AlertTriangle, Layers3, TrendingUp } from 'lucide-react';

const overviewCards = [
  {
    title: 'Lorem Challenge',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere.',
    icon: AlertTriangle,
  },
  {
    title: 'Ipsum Solution',
    description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    icon: Layers3,
  },
  {
    title: 'Dolor Impact',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    icon: TrendingUp,
  },
];

const ProductOverview = () => {
  return (
    <section className="section-shell bg-nodeslix-secondary">
      <div className="app-container space-y-12">
        {/* Product overview section: three-card layout for approval. */}
        <Motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl space-y-4"
        >
          <p className="section-kicker">Product Overview</p>
          <h2 className="section-title">Product Overview</h2>
          <p className="section-copy">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
          </p>
        </Motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {overviewCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <Motion.article
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="panel-shell min-h-60 space-y-6"
              >
              <div className="flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-nodeslix-accent/10 text-nodeslix-accent">
                <Icon size={21} />
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-nodeslix-text">{card.title}</h3>
                <p className="text-sm leading-6 text-nodeslix-muted">
                  {card.description}
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

export default ProductOverview;
