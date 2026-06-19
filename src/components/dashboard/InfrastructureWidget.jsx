import { motion as Motion } from 'framer-motion';
import { Gauge, RadioTower, ShieldCheck, Signal, Sparkles, Timer } from 'lucide-react';

const metrics = [
  { label: 'Infrastructure Uptime', value: '99.98%', pct: 99.98, status: 'Excellent', icon: ShieldCheck },
  { label: 'Average Latency',       value: '8ms',    pct: 96,    status: 'Optimal',   icon: Timer },
  { label: 'Network Efficiency',    value: '94%',    pct: 94,    status: 'Excellent', icon: Gauge },
  { label: 'AI Score',              value: '96%',    pct: 96,    status: 'Excellent', icon: Sparkles },
  { label: 'Throughput',            value: '7.8 Tbps', pct: 88,  status: 'High',      icon: Signal },
  { label: 'Active Nodes',          value: '1,250',  pct: 78,    status: 'Healthy',   icon: RadioTower },
];

/* Circular progress ring */
const CircleProgress = ({ pct, size = 48, stroke = 3.5 }) => {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0 -rotate-90">
      {/* Track */}
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
      {/* Progress */}
      <Motion.circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none"
        stroke="#00D4FF"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.4, ease: 'easeOut', delay: 0.3 }}
        style={{ filter: 'drop-shadow(0 0 4px rgba(0,212,255,0.5))' }}
      />
    </svg>
  );
};

const InfrastructureWidget = () => (
  <section className="panel-shell flex h-full flex-col gap-6 p-6 sm:p-7">
    {/* Header */}
    <div className="space-y-1.5">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-nodeslix-muted/70">
        Network Health
      </p>
      <h2 className="text-xl font-bold tracking-tight text-nodeslix-text">
        Performance Metrics
      </h2>
      <p className="text-xs leading-[1.7] text-nodeslix-muted">
        Key performance indicators across distributed infrastructure.
      </p>
    </div>

    {/* Metric cards */}
    <div className="flex flex-col gap-2.5">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;

        return (
          <Motion.article
            key={metric.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -3, borderColor: 'rgba(0,212,255,0.32)' }}
            transition={{ duration: 0.25, delay: 0.06 + index * 0.05 }}
            className="surface-card flex items-center gap-4 px-4 py-3.5"
          >
            {/* Circular progress */}
            <div className="relative shrink-0">
              <CircleProgress pct={metric.pct} size={44} stroke={3} />
              <div className="absolute inset-0 flex items-center justify-center">
                <Icon size={13} className="text-nodeslix-accent" />
              </div>
            </div>

            {/* Text */}
            <div className="flex min-w-0 flex-1 flex-col">
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-nodeslix-muted/70 leading-none">{metric.label}</p>
              <p className="mt-1 text-xl font-extrabold leading-none tracking-tight text-white">{metric.value}</p>
            </div>

            {/* Status chip */}
            <span className="shrink-0 inline-flex items-center rounded-full border border-nodeslix-accent/20 bg-nodeslix-accent/8 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-nodeslix-accent">
              {metric.status}
            </span>
          </Motion.article>
        );
      })}
    </div>
  </section>
);

export default InfrastructureWidget;
