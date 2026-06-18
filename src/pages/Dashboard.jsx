import { motion as Motion } from 'framer-motion';
import { Command, Network } from 'lucide-react';
import InputWidget from '../components/dashboard/InputWidget.jsx';
import AIProcessWidget from '../components/dashboard/AIProcessWidget.jsx';
import InfrastructureWidget from '../components/dashboard/InfrastructureWidget.jsx';

const Dashboard = () => {
  return (
    <section className="bg-nodeslix-primary py-12 sm:py-16 lg:py-20">
      <div className="app-container space-y-8 lg:space-y-10">
        {/* Dashboard header for telecom operations command center showcase. */}
        <Motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="panel-shell"
        >
          <div className="max-w-4xl space-y-5">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-nodeslix-accent/10 text-nodeslix-accent">
                <Command size={20} />
              </span>
              <p className="section-kicker">Telecom Operations Command Center</p>
            </div>
            <h1 className="text-4xl font-semibold leading-tight text-nodeslix-text sm:text-5xl lg:text-6xl">
              Telecom Operations Center
            </h1>
            <p className="max-w-2xl text-base leading-7 text-nodeslix-muted sm:text-lg">
              Track infrastructure performance and monitor network health from a centralized workspace.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {['Core Systems', 'Mesh Network', 'Edge Operations'].map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-nodeslix-muted"
              >
                <Network size={15} className="text-nodeslix-accent" />
                {item}
              </span>
            ))}
          </div>
        </Motion.header>

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
