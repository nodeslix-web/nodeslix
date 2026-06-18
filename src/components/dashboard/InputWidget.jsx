const inputSystems = [
  'Telecom Core Systems',
  'Wireless Mesh Nodes',
  '5G Infrastructure',
  'Edge Gateways',
  'Monitoring Platforms',
  'IoT Devices',
];

const InputWidget = () => {
  return (
    <section className="panel-shell min-h-full space-y-7">
      {/* Widget A: static input system cards for layout approval. */}
      <div className="space-y-3">
        <p className="section-kicker">Widget A</p>
        <h2 className="text-2xl font-semibold text-nodeslix-text">Input Systems</h2>
        <p className="text-sm leading-6 text-nodeslix-muted">
          Placeholder text for input source grouping.
        </p>
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-1">
        {inputSystems.map((system) => (
          <article
            key={system}
            className="surface-card p-4"
          >
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full border border-nodeslix-accent" />
              <h3 className="text-sm font-medium text-nodeslix-text">{system}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default InputWidget;
