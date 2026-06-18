const metrics = [
  { label: 'Active Nodes', value: '128' },
  { label: 'Uptime', value: '99.9%' },
  { label: 'Latency', value: '12ms' },
  { label: 'Throughput', value: '8.4Gbps' },
  { label: 'Efficiency', value: '92%' },
  { label: 'Congestion Risk', value: 'Low' },
  { label: 'AI Score', value: '94' },
];

const InfrastructureWidget = () => {
  return (
    <section className="panel-shell min-h-full space-y-7">
      {/* Widget C: static infrastructure health metric cards with dummy values. */}
      <div className="space-y-3">
        <p className="section-kicker">Widget C</p>
        <h2 className="text-2xl font-semibold text-nodeslix-text">Infrastructure Health</h2>
        <p className="text-sm leading-6 text-nodeslix-muted">
          Placeholder metric cards using dummy values.
        </p>
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-1">
        {metrics.map((metric) => (
          <article
            key={metric.label}
            className="surface-card p-4"
          >
            <p className="text-xs uppercase tracking-[0.16em] text-nodeslix-muted">
              {metric.label}
            </p>
            <p className="mt-3 text-2xl font-semibold text-nodeslix-text">{metric.value}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default InfrastructureWidget;
