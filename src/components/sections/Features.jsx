const capabilities = [
  'Network Intelligence',
  'Traffic Optimization',
  'Predictive Analytics',
  'Autonomous Operations',
];

const Features = () => {
  return (
    <section className="section-shell bg-nodeslix-primary">
      <div className="app-container space-y-12">
        {/* AI capabilities section: four-card responsive grid. */}
        <div className="max-w-2xl space-y-4">
          <p className="section-kicker">AI Capabilities</p>
          <h2 className="section-title">AI Capabilities</h2>
          <p className="section-copy">
            Placeholder text for AI capability layout review.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((capability) => (
            <article key={capability} className="panel-shell min-h-72 space-y-6">
              <div className="h-12 w-12 rounded-xl border border-nodeslix-border bg-nodeslix-secondary" />
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-nodeslix-text">{capability}</h3>
                <p className="text-sm leading-6 text-nodeslix-muted">
                  Placeholder text for this capability card.
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
