const workflowSteps = ['Input', 'AI Engine', 'Optimization', 'Monitoring', 'Autonomous Actions'];

const Workflow = () => {
  return (
    <section className="section-shell bg-nodeslix-primary">
      <div className="app-container space-y-12">
        {/* AI workflow section: horizontal desktop flow with responsive stacking. */}
        <div className="max-w-2xl space-y-4">
          <p className="section-kicker">AI Workflow</p>
          <h2 className="section-title">AI Workflow</h2>
          <p className="section-copy">
            Placeholder text for the AI workflow section.
          </p>
        </div>

        <div className="flex flex-col gap-5 lg:flex-row lg:items-stretch">
          {workflowSteps.map((step, index) => (
            <div key={step} className="flex flex-1 flex-col gap-5 lg:flex-row lg:items-center">
              <article className="panel-shell flex min-h-40 flex-1 items-center justify-center text-center">
                <h3 className="text-lg font-semibold text-nodeslix-text">{step}</h3>
              </article>
              {index < workflowSteps.length - 1 ? (
                <div className="flex items-center justify-center text-2xl text-nodeslix-accent lg:w-10">
                  ↓
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Workflow;
