import { motion as Motion } from 'framer-motion';
import { Database, RadioTower, Router, Server, TabletSmartphone, Wifi } from 'lucide-react';

const inputSystems = [
  { label: 'Telecom Core Systems', description: 'Primary network management systems.', icon: Server },
  { label: 'Wireless Mesh Nodes', description: 'Distributed communication nodes.', icon: Wifi },
  { label: '5G Infrastructure', description: 'High-speed connectivity infrastructure.', icon: RadioTower },
  { label: 'Edge Gateways', description: 'Regional processing endpoints.', icon: Router },
  { label: 'Monitoring Platforms', description: 'System monitoring integrations.', icon: Database },
  { label: 'IoT Devices', description: 'Connected field devices.', icon: TabletSmartphone },
];

const InputWidget = () => {
  return (
    <section className="panel-shell min-h-full space-y-7 p-6 sm:p-8">
      {/* Connected infrastructure source cards. */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-nodeslix-text">Connected Infrastructure</h2>
        <p className="text-sm leading-6 text-nodeslix-muted">
          Infrastructure systems continuously sending telemetry data.
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
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25, delay: index * 0.04 }}
            className="surface-card p-6 hover:border-nodeslix-accent/45"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-nodeslix-accent/10 text-nodeslix-accent">
                <Icon size={18} />
              </span>
              <div>
                <h3 className="text-sm font-medium text-nodeslix-text">{system.label}</h3>
                <p className="mt-1 text-xs text-nodeslix-muted">{system.description}</p>
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
