import { motion as Motion } from 'framer-motion';
import { Activity, BrainCircuit, Command, RadioTower } from 'lucide-react';
import InputWidget from '../components/dashboard/InputWidget.jsx';
import AIProcessWidget from '../components/dashboard/AIProcessWidget.jsx';
import InfrastructureWidget from '../components/dashboard/InfrastructureWidget.jsx';

const Dashboard = () => {
  const flowSteps = [
    { label: 'Connected Infrastructure', icon: RadioTower },
    { label: 'AI Intelligence Engine', icon: BrainCircuit },
    { label: 'Network Health', icon: Activity },
  ];

  return (
    <section className="bg-nodeslix-primary py-12 sm:py-16 lg:py-20">
      <div className="app-container space-y-8 lg:space-y-10">
        {/* Dashboard header for telecom operations command center showcase. */}
        <Motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="panel-shell flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between"
        >
          <div className="max-w-4xl space-y-5">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-nodeslix-accent/10 text-nodeslix-accent">
                <Command size={20} />
              </span>
              <p className="section-kicker">Telecom Operations Command Center</p>
            </div>
            <h1 className="text-4xl font-semibold leading-tight text-nodeslix-text sm:text-5xl lg:text-6xl">
              Telecom Operations Command Center
            </h1>
            <p className="max-w-2xl text-base leading-7 text-nodeslix-muted sm:text-lg">
              Real-time infrastructure intelligence powered by autonomous AI optimization.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-nodeslix-accent/35 bg-nodeslix-accent/10 px-4 py-2 text-sm font-semibold text-nodeslix-accent">
            <span className="size-2 rounded-full bg-nodeslix-accent shadow-[0_0_14px_rgba(0,212,255,0.75)]" />
            AI Active
          </div>
        </Motion.header>

        <Motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="panel-shell p-6 sm:p-8"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
            {flowSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div key={step.label} className="flex flex-1 flex-col gap-5 lg:flex-row lg:items-center">
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-nodeslix-accent/10 text-nodeslix-accent">
                      <Icon size={18} />
                    </span>
                    <span className="text-sm font-semibold text-white">{step.label}</span>
                  </div>

                  {index < flowSteps.length - 1 ? (
                    <div className="relative flex h-8 items-center justify-center overflow-hidden lg:h-px lg:flex-1">
                      <Motion.span
                        animate={{ opacity: [0.28, 0.72, 0.28] }}
                        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute h-full w-px bg-nodeslix-accent/55 lg:h-px lg:w-full"
                      />
                      <span className="text-nodeslix-accent lg:hidden">↓</span>
                      <span className="hidden text-nodeslix-accent lg:block">→</span>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </Motion.div>

        {/* Command center widget grid with static layout-only content. */}
        <div className="grid gap-8 xl:grid-cols-12">
          <Motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16 }}
            className="xl:col-span-4"
          >
            <InputWidget />
          </Motion.div>
          <Motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.24 }}
            className="xl:col-span-4"
          >
            <AIProcessWidget />
          </Motion.div>
          <Motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.32 }}
            className="xl:col-span-4"
          >
            <InfrastructureWidget />
          </Motion.div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
