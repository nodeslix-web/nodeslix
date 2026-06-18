import { Link } from 'react-router-dom';

const DashboardPreview = () => {
  return (
    <section className="section-shell bg-nodeslix-secondary">
      <div className="app-container space-y-12">
        {/* Dashboard preview section: large preview frame with dashboard route button. */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="section-kicker">Dashboard Preview</p>
            <h2 className="section-title">Dashboard Preview</h2>
            <p className="section-copy">
              Placeholder text for the dashboard preview section.
            </p>
          </div>

          <Link
            to="/dashboard"
            className="primary-button"
          >
            Open Dashboard
          </Link>
        </div>

        <div className="panel-shell border-dashed">
          <div className="grid min-h-[460px] gap-5 lg:grid-cols-3">
            <div className="surface-card" />
            <div className="surface-card lg:col-span-2" />
            <div className="surface-card lg:col-span-2" />
            <div className="surface-card" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
