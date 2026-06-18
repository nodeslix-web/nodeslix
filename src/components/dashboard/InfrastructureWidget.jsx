import { motion as Motion } from 'framer-motion';
import { Gauge, RadioTower, ShieldCheck, Signal, Sparkles, Timer, Waves } from 'lucide-react';

const metrics = [
  { label: 'Active Nodes', value: '1250', status: 'Healthy', icon: RadioTower },
  { label: 'Uptime', value: '99.98%', status: 'Stable', icon: ShieldCheck },
  { label: 'Latency', value: '8ms', status: 'Optimal', icon: Timer },
  { label: 'Throughput', value: '7.8 Tbps', status: 'High', icon: Signal },
  { label: 'Efficiency', value: '94%', status: 'Excellent', icon: Gauge },
  { label: 'Congestion Risk', value: 'Low', status: 'Low', icon: Waves },
  { label: 'AI Score', value: '96%', status: 'Excellent', icon: Sparkles },
];

const InfrastructureWidget = () => {
  return (
    <section className="panel-shell min-h-full space-y-7 p-6 sm:p-8">
      {/* Static infrastructure health metric cards with dummy values. */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-nodeslix-text">Network Health & Performance</h2>
        <p className="text-sm leading-6 text-nodeslix-muted">
          Key performance indicators.
        </p>
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-1">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;

          return (
          <Motion.article
            key={metric.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25, delay: index * 0.035 }}
            className="surface-card p-6 hover:border-nodeslix-accent/45"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-nodeslix-muted">
                  {metric.label}
                </p>
                <p className="mt-3 text-2xl font-semibold text-nodeslix-text">{metric.value}</p>
                <span className="mt-3 inline-flex rounded-full border border-nodeslix-accent/30 bg-nodeslix-accent/10 px-2.5 py-1 text-xs font-semibold text-nodeslix-accent">
                  {metric.status}
                </span>
              </div>
              <span className="flex size-10 items-center justify-center rounded-xl bg-nodeslix-accent/10 text-nodeslix-accent">
                <Icon size={18} />
              </span>
            </div>
          </Motion.article>
          );
        })}
      </div>
    </section>
  );
};

export default InfrastructureWidget;
