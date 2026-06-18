import { Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { ArrowRight, Gauge, RadioTower, ShieldCheck, Wifi } from 'lucide-react';

const previewCards = [
  { label: 'Active Nodes', value: '1250', description: 'Connected network assets across the operations view.', icon: RadioTower },
  { label: 'Infrastructure Uptime', value: '99.98%', description: 'Availability snapshot for monitored systems.', icon: ShieldCheck },
  { label: 'Average Latency', value: '8ms', description: 'Performance signal across priority network routes.', icon: Gauge },
  { label: 'Mesh Segments', value: '842', description: 'Distributed mesh paths available for review.', icon: Wifi },
];

const DashboardPreview = () => {
  return (
    <section id="dashboard" className="section-shell scroll-mt-20 bg-nodeslix-secondary">
      <div className="app-container space-y-12">
        {/* Dashboard preview section: large preview frame with dashboard route button. */}
        <Motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55 }}
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-2xl space-y-4">
            <p className="section-kicker">Dashboard Preview</p>
            <h2 className="section-title">Telecom Operations Center</h2>
            <p className="section-copy">
              Track infrastructure performance and monitor network health from a centralized workspace.
            </p>
          </div>

          <Link
            to="/dashboard"
            className="primary-button gap-2"
          >
            Open Dashboard <ArrowRight size={16} />
          </Link>
        </Motion.div>

        <Motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="panel-shell"
        >
          <div className="grid min-h-[460px] gap-5 lg:grid-cols-3">
            {previewCards.map((card, index) => {
              const Icon = card.icon;

              return (
                <Motion.div
                  key={card.label}
                  whileHover={{ y: -4 }}
                  className={[
                    'surface-card flex flex-col justify-between p-5',
                    index === 1 || index === 2 ? 'lg:col-span-2' : '',
                  ].join(' ')}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-nodeslix-muted">{card.label}</span>
                    <Icon size={18} className="text-nodeslix-accent" />
                  </div>
                  <div>
                    <p className="text-4xl font-semibold text-white">{card.value}</p>
                    <p className="mt-3 text-sm leading-6 text-nodeslix-muted">
                      {card.description}
                    </p>
                  </div>
                </Motion.div>
              );
            })}
          </div>
        </Motion.div>
      </div>
    </section>
  );
};

export default DashboardPreview;
