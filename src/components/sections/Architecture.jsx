const architectureNodes = ['Core Network', '5G Tower', 'Mesh Nodes', 'Edge Gateway', 'IoT Devices'];

const Architecture = () => {
  return (
    <section id="architecture" className="section-shell bg-nodeslix-secondary">
      <div className="app-container space-y-12">
        {/* Network architecture section: large diagram placeholder with labeled nodes. */}
        <div className="max-w-2xl space-y-4">
          <p className="section-kicker">Network Architecture</p>
          <h2 className="section-title">Network Architecture</h2>
          <p className="section-copy">
            Placeholder text for the architecture section.
          </p>
        </div>

        <div className="panel-shell border-dashed">
          <div className="grid min-h-[460px] gap-5 lg:grid-cols-5">
            {architectureNodes.map((node) => (
              <div
                key={node}
                className="surface-card flex min-h-36 items-center justify-center p-5 text-center text-sm font-semibold text-nodeslix-text"
              >
                {node}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Architecture;
