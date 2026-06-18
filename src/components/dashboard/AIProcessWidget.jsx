const processSteps = [
  'Telemetry Ingestion',
  'Traffic Optimization',
  'Routing Intelligence',
  'Predictive Analytics',
  'Autonomous Orchestration',
];

const AIProcessWidget = () => {
  return (
    <section className="panel-shell min-h-full space-y-7">
      {/* Widget B: static AI process visualizer without live logic or charts. */}
      <div className="space-y-3">
        <p className="section-kicker">Widget B</p>
        <h2 className="text-2xl font-semibold text-nodeslix-text">AI Process</h2>
        <p className="text-sm leading-6 text-nodeslix-muted">
          Placeholder visualizer for command center review.
        </p>
      </div>

      <div className="rounded-xl border border-dashed border-nodeslix-border bg-nodeslix-secondary p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
        <div className="space-y-3.5">
          {processSteps.map((step, index) => (
            <div key={step} className="space-y-3.5">
              <article className="surface-card p-4">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-sm font-medium text-nodeslix-text">{step}</h3>
                  <span className="text-xs text-nodeslix-muted">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </article>
              {index < processSteps.length - 1 ? (
                <div className="flex justify-center text-lg leading-none text-nodeslix-accent">↓</div>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-nodeslix-border bg-nodeslix-secondary px-4 py-3 text-sm font-semibold text-nodeslix-accent shadow-[0_12px_30px_rgba(0,0,0,0.18)]">
        Powered by NVIDIA SDK
      </div>
    </section>
  );
};

export default AIProcessWidget;
