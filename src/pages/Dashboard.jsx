import InputWidget from '../components/dashboard/InputWidget.jsx';
import AIProcessWidget from '../components/dashboard/AIProcessWidget.jsx';
import InfrastructureWidget from '../components/dashboard/InfrastructureWidget.jsx';

const Dashboard = () => {
  return (
    <section className="bg-nodeslix-primary py-12 sm:py-16 lg:py-20">
      <div className="app-container space-y-8 lg:space-y-10">
        {/* Dashboard header for telecom operations command center showcase. */}
        <header className="panel-shell">
          <div className="max-w-4xl space-y-5">
            <p className="section-kicker">Telecom Operations Command Center</p>
            <h1 className="text-4xl font-semibold leading-tight text-nodeslix-text sm:text-5xl lg:text-6xl">
              Title placeholder
            </h1>
            <p className="max-w-2xl text-base leading-7 text-nodeslix-muted sm:text-lg">
              Subtitle placeholder text for reviewing the command center dashboard layout.
            </p>
          </div>
        </header>

        {/* Command center widget grid with static layout-only content. */}
        <div className="grid gap-6 xl:grid-cols-12">
          <div className="xl:col-span-4">
            <InputWidget />
          </div>
          <div className="xl:col-span-4">
            <AIProcessWidget />
          </div>
          <div className="xl:col-span-4">
            <InfrastructureWidget />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
