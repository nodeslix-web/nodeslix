import { motion as Motion } from 'framer-motion';
import { Cloud, RadioTower, Router, Server, Smartphone } from 'lucide-react';

const architectureNodes = [
  { title: '5G Towers', subtitle: 'Radio Access Layer', icon: RadioTower },
  { title: 'Core Network', subtitle: 'Traffic Management', icon: Server },
  { title: 'Mesh Nodes', subtitle: 'Distributed Connectivity', icon: Router },
  { title: 'Edge Gateways', subtitle: 'Regional Processing', icon: Cloud },
  { title: 'IoT Devices', subtitle: 'Field Endpoints', icon: Smartphone },
];

const Architecture = () => {
  return (
    <section id="architecture" className="scroll-mt-20 border-t border-white/10 bg-nodeslix-secondary py-16 sm:py-20 lg:py-24">
      <div className="app-container space-y-9">
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
          className="panel-shell overflow-hidden"
        >
          <div className="relative">
            <div className="absolute left-6 top-0 h-full w-px bg-nodeslix-accent/45 md:hidden" />

            <div className="hidden md:absolute md:left-[90px] md:right-[90px] md:top-[90px] md:block lg:left-[92px] lg:right-[92px]">
              <div className="h-px w-full bg-nodeslix-accent/65 shadow-[0_0_24px_rgba(0,212,255,0.28)]" />
            </div>

            <div className="relative grid gap-4 md:grid-cols-3 lg:grid-cols-5 lg:gap-5">
            {architectureNodes.map((node, index) => {
              const Icon = node.icon;

              return (
                <div key={node.title} className="relative flex items-center md:block">
                  {index > 0 ? (
                    <span className="absolute left-6 top-[-1rem] h-4 w-px bg-nodeslix-accent/45 md:hidden" />
                  ) : null}

                  <span className="relative z-10 mr-4 flex size-12 shrink-0 items-center justify-center rounded-full border border-nodeslix-accent/60 bg-nodeslix-primary text-xs font-semibold text-nodeslix-accent shadow-[0_0_20px_rgba(0,212,255,0.18)] md:hidden">
                    0{index + 1}
                  </span>

                <Motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="surface-card relative z-10 flex w-full max-w-[180px] flex-col justify-between gap-4 p-4 text-left md:mx-auto md:h-[180px] md:text-center"
                >
                  <div className="flex items-center justify-between gap-3 md:flex-col md:justify-start">
                    <span className="flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-nodeslix-accent/10 text-nodeslix-accent">
                      <Icon size={22} />
                    </span>
                    <span className="hidden rounded-full border border-nodeslix-accent/35 bg-nodeslix-accent/10 px-2.5 py-1 text-[0.65rem] font-semibold text-nodeslix-accent md:inline-flex">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-sm font-semibold text-nodeslix-text">{node.title}</h3>
                    <p className="text-xs leading-5 text-nodeslix-muted">{node.subtitle}</p>
                  </div>
                </Motion.div>
                </div>
              );
            })}
            </div>
          </div>
        </Motion.div>
      </div>
    </section>
  );
};

export default Architecture;
