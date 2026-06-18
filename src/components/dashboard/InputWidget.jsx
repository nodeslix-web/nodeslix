import { motion as Motion } from 'framer-motion';
import { Database, RadioTower, Router, Server, TabletSmartphone, Wifi } from 'lucide-react';

const inputSystems = [
  { label: 'Lorem Core', icon: Server },
  { label: 'Ipsum Mesh', icon: Wifi },
  { label: 'Dolor 5G', icon: RadioTower },
  { label: 'Amet Gateways', icon: Router },
  { label: 'Tempor Monitor', icon: Database },
  { label: 'Elit Devices', icon: TabletSmartphone },
];

const InputWidget = () => {
  return (
    <section className="panel-shell min-h-full space-y-7">
      {/* Widget A: static input system cards. */}
      <div className="space-y-3">
        <p className="section-kicker">Widget A</p>
        <h2 className="text-2xl font-semibold text-nodeslix-text">Input Systems</h2>
        <p className="text-sm leading-6 text-nodeslix-muted">
          Lorem ipsum dolor sit amet connected sources.
        </p>
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-1">
        {inputSystems.map((system, index) => {
          const Icon = system.icon;

          return (
          <Motion.article
            key={system.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ x: 3 }}
            transition={{ duration: 0.35, delay: index * 0.04 }}
            className="surface-card p-4"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-nodeslix-accent/10 text-nodeslix-accent">
                <Icon size={18} />
              </span>
              <div>
                <h3 className="text-sm font-medium text-nodeslix-text">{system.label}</h3>
                <p className="mt-1 text-xs text-nodeslix-muted">Lorem ipsum status</p>
              </div>
            </div>
          </Motion.article>
          );
        })}
      </div>
    </section>
  );
};

export default InputWidget;
