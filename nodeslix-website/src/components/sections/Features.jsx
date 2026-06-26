import { motion as Motion } from 'framer-motion';
import { ArrowRight, Network, Zap, Layers, Monitor } from 'lucide-react';
import Workflow from '../../assets/icons/AI Capabilities(Autonomous Operations).svg'
import Radar from '../../assets/icons/AI Capabilities(Network Intelligence).svg'
import BrainCircuit from '../../assets/icons/AI Capabilities(Predictive Analytics).svg'
import Gauge from '../../assets/icons/AI Capabilities(Traffic Optimization).svg'
import Activity from '../../assets/icons/AI Capabilities(Infrastructure Monitoring).svg'
import BarChart3 from '../../assets/icons/AI Capabilities(Performance Insights).svg'

/* ─── Staggered animation containers ─── */
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

/* ─── 6 Capability Cards ─── */
const capabilities = [
  {
    title: 'AI-Powered Telecom Network Intelligence',
    description: 'Transform complex telecom infrastructure into an autonomous, optimized, and resilient communication ecosystem with real-time AI intelligence.',
    icon: Radar,
  },
  {
    title: 'Network Intelligence Monitoring',
    description: 'Continuously monitor mesh networks, wireless infrastructure, edge systems, and distributed communication environments through a unified intelligence layer.',
    icon: Gauge,
  },
  {
    title: 'Autonomous Traffic Optimization',
    description: 'NodeSlix automatically analyzes traffic patterns and dynamically optimizes routing decisions to reduce latency, improve throughput, and maximize bandwidth utilization.',
    icon: BrainCircuit,
  },
  {
    title: 'Predictive Telecom Analytics',
    description: 'Leverage advanced machine learning models to forecast network congestion, identify degradation patterns, and predict service disruptions before they impact users.',
    icon: Workflow,
  },
  {
    title: 'Self-Healing Network Operations',
    description: 'Empower communication infrastructure with autonomous remediation capabilities. NodeSlix continuously evaluates network conditions and automatically initiates optimization workflows that improve service continuity.',
    icon: Activity,
  },
  {
    title: 'Mesh Network Topology Management',
    description: 'Visualize and manage distributed communication architectures through intelligent topology mapping. Monitor node relationships, connectivity paths, routing efficiency, and network expansion opportunities.',
    icon: BarChart3,
  },
  {
    title: 'Bandwidth & Latency Intelligence',
    description: 'Optimize network resources through AI-powered traffic balancing and performance analytics. Improve customer experience while reducing operational inefficiencies and infrastructure bottlenecks.',
    icon: Zap,
  },
  {
    title: 'Enterprise Telecom Integration',
    description: 'Connect telecom core systems, network monitoring platforms, 5G infrastructure, IoT communication layers, and edge computing environments through a scalable integration framework designed for enterprise deployment.',
    icon: Layers,
  },
  {
    title: 'Real-Time Operational Visibility',
    description: 'Access critical performance metrics including uptime, throughput, latency, congestion indicators, node activity, and optimization effectiveness through a centralized command-center dashboard.',
    icon: Monitor,
  },
];

/* ─── Capability Highlight Pills ─── */
const highlights = [
  '24/7 Monitoring',
  'Real-time Insights',
  'Predictive Learning',
  'Smart Optimization',
  'Enterprise Ready',
];

/* ─── Operational Workflow Steps ─── */
const workflowSteps = ['Monitor', 'Analyze', 'Predict', 'Optimize'];

/* ══════════════════════════════════════════════════ */

const Features = () => {
  return (
    <section id="capabilities" className="section-shell scroll-mt-20 bg-nodeslix-primary">
      <div className="space-y-16 app-container">
        
        {/* ── Section header ── */}
        <Motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl space-y-5"
        >
          <p className="section-kicker">Capability Center</p>
          <h2 className="section-title">Autonomous Network Features</h2>
          <p className="section-copy">
            Intelligent systems that continuously monitor and optimize telecom infrastructures.
          </p>
        </Motion.div>

        {/* ── Capability Cards Grid ── */}
        <Motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {capabilities.map((capability) => {
            const Icon = capability.icon;

            return (
              <Motion.article
                key={capability.title}
                variants={fadeUp}
                whileHover="hover"
                initial="rest"
                animate="rest"
                variants={{
                  rest:  { y: 0, borderColor: 'rgba(255,255,255,0.08)', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
                  hover: { y: -4, borderColor: '#00D4FF', boxShadow: '0 12px 32px rgba(0,212,255,0.12)' },
                }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="group flex flex-col h-full gap-5 rounded-3xl bg-white/[0.025] p-7 transition-colors"
              >
                {/* Header: Icon + Status Badge */}
                <div className="flex items-start justify-between">
                  <Motion.div
                    variants={{
                      rest:  { rotate: 0 },
                      hover: { rotate: 2 },
                    }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center justify-center transition-colors duration-300 border size-12 rounded-2xl border-white/10 bg-nodeslix-accent/10 text-nodeslix-accent group-hover:bg-nodeslix-accent/20"
                  >
                    {typeof Icon === 'string' ? (
                    <img src={Icon} className="object-contain w-8 h-8 opacity-90 text-nodeslix-accent" aria-hidden="true" />
                    ) : (
                      <Icon size={20} />
                    )}
                  </Motion.div>
                  
                  {/* Status Badge */}
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-nodeslix-accent/20 bg-nodeslix-accent/8 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-nodeslix-accent">
                    <Motion.span
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="block size-1.5 rounded-full bg-nodeslix-accent"
                    />
                    Active
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-2.5 flex-1 pt-1">
                  <h3 className="text-lg font-bold tracking-tight text-nodeslix-text">{capability.title}</h3>
                  <p className="text-sm leading-[1.7] text-nodeslix-muted line-clamp-2">
                    {capability.description}
                  </p>
                </div>
              </Motion.article>
            );
          })}
        </Motion.div>

        {/* ── Capability Highlight Bar ── */}
        <Motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {highlights.map((highlight, i) => (
            <Motion.span
              key={highlight}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2, delay: 0.1 + i * 0.05 }}
              className="inline-flex cursor-default items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-nodeslix-muted backdrop-blur-sm transition-colors hover:border-nodeslix-accent/40 hover:text-white"
            >
              {highlight}
            </Motion.span>
          ))}
        </Motion.div>

        {/* ── Operational Workflow Summary Panel ── */}
        <Motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl rounded-3xl border border-white/8 bg-[#0A0A0A]/60 p-6 sm:p-8"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            {/* Title */}
            <div className="text-center shrink-0 sm:text-left">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-nodeslix-muted/60">
                System flow
              </p>
              <h3 className="mt-1 text-base font-bold text-nodeslix-text">Operational Workflow</h3>
            </div>
            
            {/* Flow Steps */}
            <div className="flex flex-col items-center justify-end flex-1 gap-3 sm:flex-row sm:gap-4">
              {workflowSteps.map((step, index) => (
                <div key={step} className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
                  <div className="rounded-xl border border-white/6 bg-white/[0.02] px-4 py-2 text-sm font-semibold text-nodeslix-muted">
                    {step}
                  </div>
                  
                  {index < workflowSteps.length - 1 && (
                    <div className="flex items-center text-nodeslix-accent/50">
                      <Motion.div
                        animate={{ opacity: [0.3, 1, 0.3], x: [0, 2, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
                        className="hidden sm:block"
                      >
                        <ArrowRight size={14} />
                      </Motion.div>
                      <Motion.div
                        animate={{ opacity: [0.3, 1, 0.3], y: [0, 2, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
                        className="block sm:hidden"
                      >
                        <ArrowRight size={14} className="rotate-90" />
                      </Motion.div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Motion.div>

      </div>
    </section>
  );
};

export default Features;
