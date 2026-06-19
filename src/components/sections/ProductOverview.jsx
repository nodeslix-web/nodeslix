import { motion as Motion } from 'framer-motion';
import { AlertTriangle, Layers3, TrendingUp } from 'lucide-react';

const overviewCards = [
  {
    title: 'The Challenge',
    description:
      'Large telecom environments generate massive amounts of network data that are difficult to monitor manually at scale.',
    icon: AlertTriangle,
  },
  {
    title: 'The Solution',
    description:
      'NodeSlix centralizes infrastructure insights and surfaces the areas that need attention — automatically.',
    icon: Layers3,
  },
  {
    title: 'The Impact',
    description: 'Improve network reliability, reduce mean-time-to-resolve, and lower operational overhead.',
    icon: TrendingUp,
  },
];

const ProductOverview = () => {
  return (
    <section id="overview" className="section-shell scroll-mt-20 bg-nodeslix-secondary">
      <div className="app-container space-y-14">
        {/* Product overview section with three enterprise summary cards. */}
        <Motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl space-y-5"
        >
          <p className="section-kicker">Product Overview</p>
          <h2 className="section-title">The Intelligence Layer</h2>
          <p className="section-copy">
            A high-level view of the network operations challenge, platform direction, and expected operational impact.
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
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: index * 0.12 }}
                className="accent-card min-h-60 space-y-6 p-6"
              >
                <div className="flex size-13 items-center justify-center rounded-3xl border border-white/10 bg-nodeslix-accent/10 text-nodeslix-accent">
                  <Icon size={21} />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold tracking-tight text-nodeslix-text">{card.title}</h3>
                  <p className="text-sm leading-[1.75] text-nodeslix-muted">
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
