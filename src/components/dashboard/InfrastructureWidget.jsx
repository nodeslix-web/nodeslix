import { motion as Motion } from 'framer-motion';
import { Gauge, RadioTower, ShieldCheck, Signal, Sparkles, Timer, Waves } from 'lucide-react';

const metrics = [
  { label: 'Active Nodes', value: '1250', icon: RadioTower },
  { label: 'Uptime', value: '99.98%', icon: ShieldCheck },
  { label: 'Latency', value: '8ms', icon: Timer },
  { label: 'Throughput', value: '7.8 Tbps', icon: Signal },
  { label: 'Efficiency', value: '94%', icon: Gauge },
  { label: 'Congestion Risk', value: 'Low', icon: Waves },
  { label: 'AI Score', value: '96%', icon: Sparkles },
];

const InfrastructureWidget = () => {
  return (
    <section className="panel-shell min-h-full space-y-7">
      {/* Widget C: static infrastructure health metric cards with dummy values. */}
      <div className="space-y-3">
        <p className="section-kicker">Widget C</p>
        <h2 className="text-2xl font-semibold text-nodeslix-text">Infrastructure Health</h2>
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
            whileHover={{ y: -3 }}
            transition={{ duration: 0.35, delay: index * 0.035 }}
            className="surface-card p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-nodeslix-muted">
                  {metric.label}
                </p>
                <p className="mt-3 text-2xl font-semibold text-nodeslix-text">{metric.value}</p>
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
