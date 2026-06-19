import { Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { ArrowRight, Gauge, RadioTower, ShieldCheck, Wifi } from 'lucide-react';

const previewCards = [
  {
    label: 'Active Nodes',
    value: '1,250',
    trend: '+12 today',
    trendUp: true,
    description: 'Connected network assets across all monitored regions.',
    icon: RadioTower,
    barWidth: 78,
  },
  {
    label: 'Infrastructure Uptime',
    value: '99.98%',
    trend: 'Last 30 days',
    trendUp: true,
    description: 'Availability snapshot for all monitored infrastructure systems.',
    icon: ShieldCheck,
    barWidth: 99,
  },
  {
    label: 'Average Latency',
    value: '8ms',
    trend: '↓ 2ms vs yesterday',
    trendUp: true,
    description: 'Performance signal across priority network routes.',
    icon: Gauge,
    barWidth: 92,
  },
  {
    label: 'Mesh Segments',
    value: '842',
    trend: '+6 since last sync',
    trendUp: true,
    description: 'Distributed mesh paths available for review and analysis.',
    icon: Wifi,
    barWidth: 64,
  },
];

const DashboardPreview = () => {
  return (
    <section id="dashboard" className="section-shell scroll-mt-20 bg-nodeslix-secondary">
      <div className="app-container space-y-14">
        {/* Dashboard preview section: large preview frame with dashboard route button. */}
        <Motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55 }}
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-2xl space-y-5">
            <p className="section-kicker">Dashboard Preview</p>
            <h2 className="section-title">Telecom Operations Center</h2>
            <p className="section-copy">
              Track infrastructure performance and monitor network health from a centralized workspace.
            </p>
          </div>

          <Link
            to="/dashboard"
            className="primary-button gap-2 shrink-0"
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
          {/* LIVE indicator */}
          <div className="mb-5 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-nodeslix-muted">
              Key Metrics
            </p>
            <Motion.span
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/8 px-3 py-1.5 text-xs font-bold text-emerald-400"
            >
              <Motion.span
                animate={{ scale: [1, 1.6, 1] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                className="block size-1.5 rounded-full bg-emerald-400"
              />
              LIVE
            </Motion.span>
          </div>

          <div className="grid min-h-[420px] gap-5 lg:grid-cols-3">
            {previewCards.map((card, index) => {
              const Icon = card.icon;

              return (
                <Motion.div
                  key={card.label}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className={[
                    'surface-card flex min-h-[180px] flex-col justify-between p-5',
                    index === 1 || index === 2 ? 'lg:col-span-2' : '',
                  ].join(' ')}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-medium text-nodeslix-muted">{card.label}</span>
                      <p className="mt-1.5 text-5xl font-bold tracking-tight text-white leading-none">
                        {card.value}
                      </p>
                    </div>
                    <span className="flex size-9 items-center justify-center rounded-xl bg-nodeslix-accent/10 text-nodeslix-accent">
                      <Icon size={17} />
                    </span>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm leading-[1.7] text-nodeslix-muted">
                      {card.description}
                    </p>
                    {/* Sparkline bar */}
                    <div className="space-y-1.5">
                      <div className="h-1 w-full overflow-hidden rounded-full bg-white/6">
                        <Motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${card.barWidth}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: index * 0.1, ease: 'easeOut' }}
                          className="h-full rounded-full bg-gradient-to-r from-nodeslix-accent/60 to-nodeslix-accent"
                        />
                      </div>
                      <span className="text-xs font-semibold text-nodeslix-accent/70">
                        {card.trend}
                      </span>
                    </div>
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
