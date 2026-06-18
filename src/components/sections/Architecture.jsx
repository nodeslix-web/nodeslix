import { motion as Motion } from 'framer-motion';
import { Cloud, RadioTower, Router, Server, Smartphone } from 'lucide-react';

const architectureNodes = [
  { label: '5G Towers', icon: RadioTower },
  { label: 'Core Network', icon: Server },
  { label: 'Mesh Nodes', icon: Router },
  { label: 'Edge Gateways', icon: Cloud },
  { label: 'IoT Devices', icon: Smartphone },
];

const Architecture = () => {
  return (
    <section id="architecture" className="section-shell bg-nodeslix-secondary">
      <div className="app-container space-y-12">
        {/* Network architecture section with labeled nodes. */}
        <Motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl space-y-4"
        >
          <p className="section-kicker">Network Architecture</p>
          <h2 className="section-title">Network Architecture</h2>
          <p className="section-copy">
            Visual representation of a connected telecom ecosystem.
          </p>
        </Motion.div>

        <Motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="panel-shell"
        >
          <div className="grid min-h-[460px] gap-5 lg:grid-cols-5">
            {architectureNodes.map((node, index) => {
              const Icon = node.icon;

              return (
                <Motion.div
                key={node.label}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="surface-card flex min-h-40 flex-col items-center justify-center gap-4 p-5 text-center text-sm font-semibold text-nodeslix-text"
              >
                <span className="flex size-14 items-center justify-center rounded-2xl border border-white/10 bg-nodeslix-accent/10 text-nodeslix-accent">
                  <Icon size={24} />
                </span>
                {node.label}
                <span className="text-xs font-normal text-nodeslix-muted">0{index + 1}</span>
                </Motion.div>
              );
            })}
          </div>
        </Motion.div>
      </div>
    </section>
  );
};

export default Architecture;
