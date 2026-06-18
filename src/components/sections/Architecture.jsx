import { motion as Motion } from 'framer-motion';
import { Cloud, RadioTower, Router, Server, Smartphone } from 'lucide-react';

const architectureNodes = [
  { title: '5G Towers', subtitle: 'Radio Access Layer', icon: RadioTower },
  { title: 'Core Network', subtitle: 'Traffic Management', icon: Server },
  { title: 'Mesh Nodes', subtitle: 'Distributed Connectivity', icon: Router },
  { title: 'Edge Gateways', subtitle: 'Regional Processing', icon: Cloud },
  { title: 'IoT Devices', subtitle: 'Field Endpoints', icon: Smartphone },
];

const shouldShowTabletConnector = (index) => index === 0 || index === 1 || index === 3;

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
            <Motion.div
              animate={{ opacity: [0.32, 0.68, 0.32] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-6 top-0 h-full w-px bg-nodeslix-accent/45 shadow-[0_0_22px_rgba(0,212,255,0.28)] md:hidden"
            />

            <div className="relative grid gap-4 md:grid-cols-3 lg:grid-cols-5 lg:gap-5">
            {architectureNodes.map((node, index) => {
              const Icon = node.icon;
              const isLast = index === architectureNodes.length - 1;

              return (
                <div key={node.title} className="relative flex items-center md:block">
                  {index > 0 ? (
                    <span className="absolute left-6 top-[-1rem] h-4 w-px bg-nodeslix-accent/45 md:hidden" />
                  ) : null}

                  <span className="relative z-10 mr-4 flex size-12 shrink-0 items-center justify-center rounded-full border border-nodeslix-accent/60 bg-nodeslix-primary text-xs font-semibold text-nodeslix-accent shadow-[0_0_20px_rgba(0,212,255,0.18)] md:hidden">
                    0{index + 1}
                  </span>

                  {!isLast ? (
                    <span className="pointer-events-none absolute left-[21px] top-[3rem] h-[calc(100%-2rem)] w-2 overflow-hidden md:hidden">
                      <Motion.span
                        animate={{ y: [-10, 110] }}
                        transition={{
                          duration: 2.2,
                          repeat: Infinity,
                          delay: index * 0.28,
                          ease: 'linear',
                        }}
                        className="absolute left-0 top-0 size-2 rounded-full bg-[#D9F8FF] shadow-[0_0_14px_rgba(0,212,255,0.88)]"
                      />
                    </span>
                  ) : null}

                  {!isLast ? (
                    <span className="pointer-events-none absolute left-[calc(50%+90px)] right-[calc(-50%+90px)] top-[90px] z-0 hidden h-px overflow-hidden lg:block">
                      <Motion.span
                        animate={{ opacity: [0.36, 0.78, 0.36] }}
                        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute inset-0 bg-nodeslix-accent/65 shadow-[0_0_24px_rgba(0,212,255,0.3)]"
                      />
                      <Motion.span
                        animate={{ left: ['0%', '100%'] }}
                        transition={{
                          duration: 2.6,
                          repeat: Infinity,
                          delay: index * 0.22,
                          ease: 'linear',
                        }}
                        className="absolute -top-[3px] left-0 size-2 rounded-full bg-[#D9F8FF] shadow-[0_0_14px_rgba(0,212,255,0.9)]"
                      />
                    </span>
                  ) : null}

                  {shouldShowTabletConnector(index) ? (
                    <span className="pointer-events-none absolute left-[calc(50%+90px)] right-[calc(-50%+90px)] top-[90px] z-0 hidden h-px overflow-hidden md:block lg:hidden">
                      <Motion.span
                        animate={{ opacity: [0.3, 0.66, 0.3] }}
                        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute inset-0 bg-nodeslix-accent/55 shadow-[0_0_20px_rgba(0,212,255,0.24)]"
                      />
                      <Motion.span
                        animate={{ left: ['0%', '100%'] }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          delay: index * 0.25,
                          ease: 'linear',
                        }}
                        className="absolute -top-[3px] left-0 size-2 rounded-full bg-[#D9F8FF] shadow-[0_0_14px_rgba(0,212,255,0.86)]"
                      />
                    </span>
                  ) : null}

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
