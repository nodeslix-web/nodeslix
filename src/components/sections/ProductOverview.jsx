const overviewCards = ['Problem', 'Solution', 'Impact'];

const ProductOverview = () => {
  return (
    <section className="section-shell bg-nodeslix-secondary">
      <div className="app-container space-y-12">
        {/* Product overview section: three-card layout for approval. */}
        <div className="max-w-2xl space-y-4">
          <p className="section-kicker">Product Overview</p>
          <h2 className="section-title">Product Overview</h2>
          <p className="section-copy">
            Placeholder text for the product overview section.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {overviewCards.map((card) => (
            <article key={card} className="panel-shell min-h-60 space-y-6">
              <div className="h-11 w-11 rounded-xl border border-nodeslix-border bg-nodeslix-secondary" />
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-nodeslix-text">{card}</h3>
                <p className="text-sm leading-6 text-nodeslix-muted">
                  Placeholder text for designers to review spacing and card hierarchy.
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductOverview;
