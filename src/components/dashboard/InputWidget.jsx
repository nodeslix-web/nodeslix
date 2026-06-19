import { motion as Motion } from 'framer-motion';
import { Database, RadioTower, Router, Server, TabletSmartphone, Wifi } from 'lucide-react';

const inputSystems = [
  { label: '5G Infrastructure',    description: 'High-speed connectivity infrastructure.', icon: RadioTower, status: 'Healthy',   statusOk: true  },
  { label: 'Mesh Nodes',           description: 'Distributed communication nodes.',        icon: Wifi,        status: 'Connected', statusOk: true  },
  { label: 'Telecom Core Systems', description: 'Primary network management systems.',     icon: Server,      status: 'Stable',    statusOk: true  },
  { label: 'Edge Gateways',        description: 'Regional processing endpoints.',          icon: Router,      status: 'Optimal',   statusOk: true  },
  { label: 'Monitoring Platforms', description: 'System monitoring integrations.',         icon: Database,    status: 'Active',    statusOk: true  },
  { label: 'IoT Devices',          description: 'Connected field devices.',                icon: TabletSmartphone, status: 'Online', statusOk: true },
];

const InputWidget = () => (
  <section className="panel-shell flex h-full flex-col gap-6 p-6 sm:p-7">
    {/* Header */}
    <div className="space-y-1.5">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-nodeslix-muted/70">
        Connected Infrastructure
      </p>
      <h2 className="text-xl font-bold tracking-tight text-nodeslix-text">
        Infrastructure Sources
      </h2>
      <p className="text-xs leading-[1.7] text-nodeslix-muted">
        Systems continuously sending telemetry to NodeSlix.
      </p>
    </div>

    {/* Cards */}
    <div className="flex flex-col gap-2.5">
      {inputSystems.map((system, index) => {
        const Icon = system.icon;

        return (
          <Motion.article
            key={system.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -3, borderColor: 'rgba(0,212,255,0.32)' }}
            transition={{ duration: 0.25, delay: 0.06 + index * 0.05 }}
            className="surface-card flex items-center justify-between gap-3 px-4 py-3.5"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-nodeslix-accent/10 text-nodeslix-accent">
                <Icon size={16} />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-nodeslix-text leading-tight">{system.label}</h3>
                <p className="text-[11px] text-nodeslix-muted leading-snug">{system.description}</p>
              </div>
            </div>

            {/* Status indicator */}
            <span className={[
              'shrink-0 inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-bold',
              system.statusOk
                ? 'border-nodeslix-accent/20 bg-nodeslix-accent/8 text-nodeslix-accent'
                : 'border-white/10 bg-white/[0.04] text-nodeslix-muted',
            ].join(' ')}>
              <Motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.15 }}
                className="block size-1 rounded-full bg-nodeslix-accent"
              />
              {system.status}
            </span>
          </Motion.article>
        );
      })}
    </div>
  </section>
);

export default InputWidget;
