import { motion as Motion } from 'framer-motion';
import { Database, Brain, Zap, Rocket, BarChart3, Shield, Eye } from 'lucide-react';
import PlugSvg from '../../assets/icons/AI Workflow(Step 1).svg'
import DatabaseSvg from '../../assets/icons/AI Workflow(Step 2).svg'
import BrainSvg from '../../assets/icons/AI Workflow(Step 3).svg'
import ZapSvg from '../../assets/icons/AI Workflow(Step 4).svg'
import RocketSvg from '../../assets/icons/AI Workflow(Step 5).svg'

/* ─── Workflow steps data with specific icons, descriptions, and statuses ─── */
const workflowSteps = [
  {
    num: '01',
    title: 'Connect Infrastructure',
    description: 'Integrate telecom core systems, wireless mesh nodes, 5G components, IoT communication layers, edge gateways, and monitoring platforms into the NodeSlix intelligence environment.',
    icon: PlugSvg,
    status: 'Connected',
  },
  {
    num: '02',
    title: 'Collect Telemetry',
    description: 'The platform continuously ingests network telemetry, operational metrics, traffic data, connectivity information, and performance indicators from distributed infrastructure sources.',
    icon: DatabaseSvg,
    status: 'Ingesting',
  },
  {
    num: '03',
    title: 'Analyze Network Behavior',
    description: 'AI models evaluate network conditions in real time, identifying anomalies, inefficiencies, congestion patterns, and optimization opportunities across the ecosystem.',
    icon: BrainSvg,
    status: 'Analyzing',
  },
  {
    num: '04',
    title: 'Predict Operational Risks',
    description: 'Machine learning algorithms forecast service disruptions, capacity challenges, routing inefficiencies, and infrastructure degradation before they affect service delivery.',
    icon: ZapSvg,
    status: 'Predicting',
  },
  {
    num: '05',
    title: 'Optimize Network Performance',
    description: 'NodeSlix autonomously recommends or executes routing improvements, traffic balancing actions, bandwidth optimization strategies, and resource allocation adjustments.',
    icon: RocketSvg,
    status: 'Optimizing',
  },
  {
    num: '06',
    title: 'Improve Service Reliability',
    description: 'Continuous optimization and self-healing workflows enhance uptime, reduce latency, minimize packet loss, and strengthen overall network resilience.',
    icon: Shield,
    status: 'Self-Healing',
  },
  {
    num: '07',
    title: 'Visualize Outcomes',
    description: 'Operators access real-time intelligence dashboards, topology visualizations, optimization reports, and performance analytics to monitor improvements and operational health.',
    icon: Eye,
    status: 'Visualizing',
  },
];

/* ─── Live indicators config ─── */
const liveIndicators = [
  { label: 'Traffic Healthy' },
  { label: 'Latency Stable' },
  { label: 'Congestion Low' },
  { label: 'Infrastructure Connected' },
];

/* ─── Framer Motion variants for stagger entry ─── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
};

const Workflow = () => {
  return (
    <section id="workflow" className="overflow-hidden section-shell scroll-mt-20 bg-nodeslix-primary">
      <div className="space-y-16 app-container">
        
        {/* ─── Header Section ─── */}
        <Motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between"
        >
          <div className="max-w-2xl space-y-3">
            <p className="section-kicker">Workflow</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Autonomous Telecom Operations Lifecycle
            </h2>
            <p className="text-sm leading-relaxed text-nodeslix-muted sm:text-base">
              From infrastructure onboarding to continuous optimization.
            </p>
          </div>
          
          {/* Status Badge */}
          <div className="flex items-start shrink-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-nodeslix-accent/25 bg-nodeslix-accent/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-nodeslix-accent">
              <Motion.span
                animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="block size-1.5 rounded-full bg-nodeslix-accent"
              />
              Live Workflow
            </span>
          </div>
        </Motion.div>

        {/* ─── Live Indicators Status Bar ─── */}
        <Motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap items-center gap-3 py-4 border-t border-b border-white/5"
        >
          <span className="mr-2 font-mono text-xs text-nodeslix-muted/60">System Status:</span>
          {liveIndicators.map((ind, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-nodeslix-accent/[0.04] border border-nodeslix-accent/10 text-xs font-mono text-white/90"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-nodeslix-accent"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-nodeslix-accent"></span>
              </span>
              {ind.label}
            </div>
          ))}
        </Motion.div>

        {/* ─── Cards Layout (Desktop/Tablet Grid) ─── */}
        <Motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="relative hidden gap-6 md:grid md:grid-cols-3 lg:grid-cols-6"
        >
          {workflowSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                transition={{
                  y: { duration: 0.25, ease: 'easeInOut' },
                  default: { duration: 0.45, ease: 'easeOut' },
                }}
                className="relative group rounded-2xl border border-white/6 bg-[#0E0E0E]/85 backdrop-blur-xl p-5 flex flex-col justify-between min-h-[220px] transition-colors duration-300 hover:border-nodeslix-accent/40 hover:shadow-[0_0_20px_rgba(0,212,255,0.06)]"
              >
                {/* Step Indicator Top */}
                <div className="flex items-start justify-between mb-4">
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-nodeslix-muted/40">
                    STEP {step.num}
                  </span>
                  <span className="flex items-center justify-center transition-colors border size-9 rounded-xl bg-nodeslix-accent/5 text-nodeslix-accent border-nodeslix-accent/15 group-hover:bg-nodeslix-accent/10">
                    {typeof Icon === 'string' ? (
                      <img src={Icon} className="object-contain w-6 h-6 opacity-90" aria-hidden="true" />
                    ) : (
                      <Icon size={18} />
                    )}
                  </span>
                </div>

                {/* Content */}
                <div className="mt-auto mb-4 space-y-2">
                  <h3 className="text-sm font-semibold tracking-tight text-white transition-colors group-hover:text-nodeslix-accent">
                    {step.title}
                  </h3>
                  <p className="text-[12px] leading-relaxed text-nodeslix-muted/80 line-clamp-2">
                    {step.description}
                  </p>
                </div>

                {/* Status Indicator */}
                <div className="flex items-center gap-1.5 border-t border-white/5 pt-3 mt-auto text-[9px] font-mono tracking-wider uppercase text-nodeslix-accent/80">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-nodeslix-accent"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-nodeslix-accent"></span>
                  </span>
                  {step.status}
                </div>

                {/* --- Animated Connectors --- */}
                {/* Desktop Horizontal Connector (index < 5) */}
                {index < 5 && (
                  <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-7 h-[2px] hidden lg:block overflow-hidden pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 28 2" fill="none">
                      <Motion.line
                        x1="0"
                        y1="1"
                        x2="28"
                        y2="1"
                        stroke="#00D4FF"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                        animate={{ strokeDashoffset: [-8, 0] }}
                        transition={{ repeat: Infinity, ease: 'linear', duration: 1 }}
                      />
                    </svg>
                  </div>
                )}

                {/* Tablet Horizontal Connector */}
                {(index === 0 || index === 1 || index === 3 || index === 4) && (
                  <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-7 h-[2px] hidden md:block lg:hidden overflow-hidden pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 28 2" fill="none">
                      <Motion.line
                        x1="0"
                        y1="1"
                        x2="28"
                        y2="1"
                        stroke="#00D4FF"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                        animate={{ strokeDashoffset: [-8, 0] }}
                        transition={{ repeat: Infinity, ease: 'linear', duration: 1 }}
                      />
                    </svg>
                  </div>
                )}

                {/* Tablet Downward Connector after Row 1 */}
                {index === 2 && (
                  <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-[2px] h-6 hidden md:block lg:hidden overflow-hidden pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 2 24" fill="none">
                      <Motion.line
                        x1="1"
                        y1="0"
                        x2="1"
                        y2="24"
                        stroke="#00D4FF"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                        animate={{ strokeDashoffset: [-8, 0] }}
                        transition={{ repeat: Infinity, ease: 'linear', duration: 1 }}
                      />
                    </svg>
                  </div>
                )}
              </Motion.div>
            );
          })}
        </Motion.div>

        {/* ─── Mobile Timeline Layout ─── */}
        <Motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="relative block pl-6 space-y-6 md:hidden"
        >
          {/* Continuous vertical timeline connector line */}
          <div className="absolute left-[13px] top-2 bottom-2 w-[1px] bg-white/5 overflow-hidden">
            <Motion.div
              className="w-full h-full bg-gradient-to-b from-[#00D4FF] via-[#00D4FF]/30 to-transparent origin-top"
              animate={{ y: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, ease: 'linear', duration: 4 }}
            />
          </div>

          {workflowSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Motion.div
                key={index}
                variants={cardVariants}
                className="relative flex gap-4"
              >
                {/* Timeline Node Icon */}
                <div className="absolute left-[-22px] top-1.5 z-10 flex size-7 items-center justify-center rounded-full bg-[#0A0A0A] border border-nodeslix-accent/40 text-nodeslix-accent">
                  {typeof Icon === 'string' ? (
                    <img src={Icon} className="object-contain w-3 h-3 opacity-90" aria-hidden="true" />
                  ) : (
                    <Icon size={12} />
                  )}
                </div>

                {/* Card Content */}
                <div className="flex-1 rounded-xl border border-white/6 bg-[#0E0E0E]/85 backdrop-blur-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono font-bold tracking-wider text-nodeslix-muted/40">
                      STEP {step.num}
                    </span>
                    <div className="flex items-center gap-1.5 text-[9px] font-mono tracking-wider uppercase text-nodeslix-accent/80">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-nodeslix-accent"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-nodeslix-accent"></span>
                      </span>
                      {step.status}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold tracking-tight text-white">
                      {step.title}
                    </h3>
                    <p className="text-[12px] leading-relaxed text-nodeslix-muted/80">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Motion.div>
            );
          })}
        </Motion.div>
      </div>
    </section>
  );
};

export default Workflow;
