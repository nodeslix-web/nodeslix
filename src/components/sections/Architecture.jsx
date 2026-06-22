import { motion as Motion } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import DatabaseSvg from '../../assets/icons/Technical Journey.svg'
import RadarSvg from '../../assets/icons/Technical Journey (2).svg'
import BrainSvg from '../../assets/icons/Technical Journey (3).svg'
import ZapSvg from '../../assets/icons/Technical Journey (4).svg'
import ActivitySvg from '../../assets/icons/Technical Journey (5).svg'

/* ─── 5-Step Journey ─── */
const steps = [
  { num: '01', title: 'Collect',  description: 'Gather telemetry from distributed infrastructures.', icon: DatabaseSvg },
  { num: '02', title: 'Analyze',  description: 'Identify patterns and operational anomalies.', icon: RadarSvg },
  { num: '03', title: 'Predict',  description: 'Forecast future bottlenecks and risks.', icon: BrainSvg },
  { num: '04', title: 'Optimize', description: 'Generate intelligent optimization actions.', icon: ZapSvg },
  { num: '05', title: 'Monitor',  description: 'Continuously track infrastructure health.', icon: ActivitySvg },
];

/* ─── Summary Panel Pills ─── */
const loopSteps = ['24/7 Monitoring', 'AI Learning', 'Continuous Improvement'];

/* ─── Animation variants ─── */
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const Architecture = () => {
  return (
    <section id="architecture" className="py-16 border-t scroll-mt-20 border-white/8 bg-nodeslix-secondary sm:py-20">
      <div className="space-y-12 app-container">
        
        {/* ── Section header ── */}
        <Motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between"
        >
          <div className="max-w-2xl space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-nodeslix-muted/70">
              How NodeSlix Works
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Technical Journey
            </h2>
            <p className="text-sm leading-relaxed text-nodeslix-muted sm:text-base">
              Transforming infrastructure telemetry into intelligent optimization decisions.
            </p>
          </div>
          
          {/* Status Badge */}
          <div className="flex items-start shrink-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-nodeslix-accent/25 bg-nodeslix-accent/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-nodeslix-accent">
              <Motion.span
                animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="block size-1.5 rounded-full bg-nodeslix-accent"
              />
              Operational Flow
            </span>
          </div>
        </Motion.div>

        {/* ── 5-Step Journey Timeline ── */}
        <div className="relative max-w-6xl mx-auto">
          
          {/* Central Glow (Intelligence Engine) */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-nodeslix-accent/10 blur-[60px]" />

          {/* Desktop/Tablet Horizontal Connector Line */}
          <div className="pointer-events-none absolute left-[10%] right-[10%] top-[45px] z-0 hidden h-px lg:block">
            <div className="relative w-full h-full bg-white/10">
              <Motion.div
                animate={{ left: ['0%', '100%'], opacity: [0, 1, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="absolute top-1/2 h-[2px] w-28 -translate-y-1/2 -translate-x-1/2 rounded-full bg-nodeslix-accent shadow-[0_0_12px_rgba(0,212,255,0.8)]"
              />
            </div>
          </div>


          <Motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="relative z-10 grid gap-5 md:grid-cols-3 lg:grid-cols-5"
          >
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isMiddle = index === 2; // Step 3 - Predict (center)
              
              return (
                <Motion.article
                  key={step.num}
                  variants={fadeUp}
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                  variants={{
                    rest:  { y: 0, borderColor: isMiddle ? 'rgba(0,212,255,0.3)' : 'rgba(255,255,255,0.08)' },
                    hover: { y: -4, borderColor: '#00D4FF' },
                  }}
                  transition={{ duration: 0.25 }}
                  className={[
                    'group relative flex flex-col gap-4 rounded-2xl bg-[#0a0a0a] p-5 shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-colors',
                    isMiddle ? 'shadow-[0_0_32px_rgba(0,212,255,0.1)]' : '',
                  ].join(' ')}
                >
                  {/* Top Row: Step Number & Status */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-white/40 group-hover:text-nodeslix-accent/70 transition-colors">
                      STEP {step.num}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-nodeslix-accent/20 bg-nodeslix-accent/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-nodeslix-accent">
                      <Motion.span
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }}
                        className="block rounded-full size-1 bg-nodeslix-accent"
                      />
                      Running
                    </span>
                  </div>

                  {/* Icon Node */}
                  <div className="flex size-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white transition-colors group-hover:border-nodeslix-accent/30 group-hover:bg-nodeslix-accent/10 group-hover:text-nodeslix-accent">
                    {typeof Icon === 'string' ? (
                      <img src={Icon} className="object-contain w-6 h-6 opacity-95 group-hover:opacity-100" aria-hidden="true" />
                    ) : (
                      <Icon size={20} />
                    )}
                  </div>

                  {/* Content */}
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-bold text-white">{step.title}</h3>
                    <p className="text-[12px] leading-relaxed text-nodeslix-muted line-clamp-2">
                      {step.description}
                    </p>
                  </div>

                  {/* Mobile downward arrow */}
                  {index !== steps.length - 1 && (
                    <div className="absolute -bottom-[22px] left-1/2 flex -translate-x-1/2 md:hidden">
                      <Motion.div
                        animate={{ opacity: [0.2, 1, 0.2], y: [0, 2, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }}
                      >
                        <ArrowDown size={14} className="text-nodeslix-accent" />
                      </Motion.div>
                    </div>
                  )}

                  {/* Desktop right arrow (between cards) */}
                  {index !== steps.length - 1 && (
                    <div className="absolute -right-[15px] top-[40px] hidden lg:flex">
                      <Motion.div
                        animate={{ opacity: [0.3, 1, 0.3], x: [0, 2, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }}
                      >
                        <ArrowRight size={14} className="text-nodeslix-accent/70" />
                      </Motion.div>
                    </div>
                  )}
                </Motion.article>
              );
            })}
          </Motion.div>
        </div>

        {/* ── Summary Panel ── */}
        <Motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="mx-auto flex max-w-fit flex-col items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.02] px-6 py-5 sm:flex-row sm:px-8"
        >
          <p className="shrink-0 text-[10px] font-bold uppercase tracking-[0.2em] text-nodeslix-muted/70">
            Autonomous Optimization Loop
          </p>
          
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
            {loopSteps.map((pill, idx) => (
              <div key={pill} className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
                <span className="inline-flex rounded-full border border-nodeslix-accent/15 bg-nodeslix-accent/5 px-3 py-1 text-[11px] font-semibold text-nodeslix-accent">
                  {pill}
                </span>
                
                {idx !== loopSteps.length - 1 && (
                  <Motion.div
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    className="flex text-nodeslix-accent/40"
                  >
                    <ArrowRight size={12} className="hidden sm:block" />
                    <ArrowDown size={12} className="block sm:hidden" />
                  </Motion.div>
                )}
              </div>
            ))}
          </div>
        </Motion.div>

      </div>
    </section>
  );
};

export default Architecture;
