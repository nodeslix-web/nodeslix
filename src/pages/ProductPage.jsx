import React from "react";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import {
  Server,
  Cpu,
  Zap,
  Network,
  BarChart3,
  Users,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Activity,
  Shield,
  Layers,
  Search,
  Settings,
} from "lucide-react";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const modulesData = [
  {
    title: "Infrastructure",
    icon: Server,
    desc: "Unified visibility across telecom cell towers, gateways, and distributed cloud edge nodes.",
    status: "Healthy",
    statusColor: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
  },
  {
    title: "AI Engine",
    icon: Cpu,
    desc: "Deep learning models that automatically detect anomalies and optimize physical pathways.",
    status: "Active",
    statusColor: "text-[#00D4FF] border-[#00D4FF]/20 bg-[#00D4FF]/5",
  },
  {
    title: "Operations",
    icon: Zap,
    desc: "Real-time telemetry intake coupled with automated alert handling and incident tracking.",
    status: "Running",
    statusColor: "text-amber-400 border-amber-500/20 bg-amber-500/5",
  },
  {
    title: "Topology",
    icon: Network,
    desc: "Dynamic graph layouts mapping mesh segment routing pathways and active antenna sectors.",
    status: "Synchronized",
    statusColor: "text-purple-400 border-purple-500/20 bg-purple-500/5",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    desc: "Advanced metrics dashboards tracking jitter, packet loss, bandwidth spikes, and SLA targets.",
    status: "Online",
    statusColor: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
  },
  {
    title: "Users",
    icon: Users,
    desc: "Role-based access management for operators, analysts, network engineers, and system admins.",
    status: "Secured",
    statusColor: "text-blue-400 border-blue-500/20 bg-blue-500/5",
  },
];

const stepsData = [
  { label: "Connect", desc: "Securely link network assets" },
  { label: "Collect", desc: "Ingest raw telemetry data" },
  { label: "Analyze", desc: "Execute real-time ML modeling" },
  { label: "Optimize", desc: "Compute path corrections" },
  { label: "Deploy", desc: "Apply network adjustments" },
  { label: "Monitor", desc: "Observe feedback loops" },
];

const capabilitiesData = [
  {
    title: "Real-time Monitoring",
    desc: "Instant streaming analytics on network bandwidth utilization and node packet success rates.",
  },
  {
    title: "Predictive Analytics",
    desc: "Forecast path bottlenecks up to 45 minutes in advance using integrated AI telemetry modeling.",
  },
  {
    title: "Traffic Optimization",
    desc: "Dynamic load balancing across active microwave backhauls and physical fiber lines.",
  },
  {
    title: "Autonomous Orchestration",
    desc: "Self-healing routing configurations that bypass high-jitter sectors without human delay.",
  },
  {
    title: "Topology Intelligence",
    desc: "Fully interactive geographical and logical diagramming of cellular towers and fiber pathways.",
  },
  {
    title: "Performance Tracking",
    desc: "Comprehensive compliance reporting against enterprise-grade SLA indicators and KPIs.",
  },
];

const ProductPage = () => {
  const scrollToModules = () => {
    const el = document.getElementById("modules");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] overflow-hidden">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute -left-40 top-0 h-[600px] w-[600px] rounded-full bg-nodeslix-accent/[0.04] blur-[130px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full bg-[#3a6dff]/[0.028] blur-[110px]" />

      {/* SECTION 1: HERO */}
      <section className="relative pt-24 pb-20 sm:pt-32 sm:pb-28 lg:pt-40 lg:pb-32">
        <div className="app-container">
          <Motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto space-y-8"
          >
            <Motion.span
              variants={fadeUp}
              className="inline-flex items-center rounded-full border border-[#00D4FF]/25 bg-[#00D4FF]/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#00D4FF]"
            >
              Product
            </Motion.span>

            <Motion.h1
              variants={fadeUp}
              className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl leading-tight"
            >
              NodeSlix Telecom <br />
              <span className="bg-gradient-to-r from-[#00D4FF] to-blue-400 bg-clip-text text-transparent">
                Intelligence Ecosystem
              </span>
            </Motion.h1>

            <Motion.p
              variants={fadeUp}
              className="max-w-2xl mx-auto text-lg text-nodeslix-muted leading-relaxed"
            >
              A unified platform for monitoring, optimizing, and orchestrating
              next-generation telecom infrastructures.
            </Motion.p>

            <Motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <Motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
                <Link to="/dashboard" className="primary-button gap-2">
                  Launch Telemetry <ArrowRight size={16} />
                </Link>
              </Motion.div>
              <Motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
                <button
                  onClick={scrollToModules}
                  className="secondary-button gap-2"
                >
                  View Modules <Layers size={16} />
                </button>
              </Motion.div>
            </Motion.div>
          </Motion.div>
        </div>
      </section>

      {/* SECTION 2: PRODUCT MODULES */}
      <section
        id="modules"
        className="section-shell bg-gradient-to-b from-black/20 to-transparent"
      >
        <div className="app-container">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
            <p className="section-kicker">Core Modules</p>
            <h2 className="section-title">
              Built for Next-Gen Network Architecture
            </h2>
            <p className="section-copy">
              Explore the critical software engines driving optimization across
              global network segments.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {modulesData.map((m, idx) => {
              const Icon = m.icon;
              return (
                <Motion.div
                  key={m.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: idx * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="surface-card p-6 flex flex-col justify-between min-h-[220px] border-white/5 bg-[#121212]/50 hover:border-[#00D4FF]/30 hover:shadow-[0_0_20px_rgba(0,212,255,0.05)]"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center justify-center size-10 rounded-xl bg-[#00D4FF]/10 text-[#00D4FF]">
                        <Icon size={20} />
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${m.statusColor}`}
                      >
                        {m.status}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">
                        {m.title}
                      </h3>
                      <p className="text-sm text-nodeslix-muted leading-relaxed">
                        {m.desc}
                      </p>
                    </div>
                  </div>
                </Motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: OPERATIONAL PIPELINE */}
      <section className="section-shell border-y border-white/5 bg-black/40">
        <div className="app-container">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
            <p className="section-kicker">Operational Flow</p>
            <h2 className="section-title">The NodeSlix Pipeline</h2>
            <p className="section-copy">
              A continuous, automated lifecycle for telecom telemetry and
              configuration operations.
            </p>
          </div>

          {/* Pipeline flow container */}
          <div className="relative">
            {/* Background line connecting pipeline steps */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent hidden lg:block" />

            <div className="grid gap-8 lg:grid-cols-6 relative">
              {stepsData.map((step, idx) => (
                <Motion.div
                  key={step.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="flex flex-col items-center text-center relative group"
                >
                  {/* Circle number index */}
                  <div className="relative z-10 flex items-center justify-center size-14 rounded-full border border-white/10 bg-[#0A0A0A] text-white font-bold group-hover:border-[#00D4FF] group-hover:text-[#00D4FF] transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                    <Motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: idx * 0.3,
                      }}
                      className="absolute inset-0 rounded-full bg-[#00D4FF]/5 pointer-events-none"
                    />
                    <span className="text-sm font-mono">{idx + 1}</span>
                  </div>

                  <h3 className="text-base font-bold text-white mt-4 mb-1 group-hover:text-[#00D4FF] transition-colors">
                    {step.label}
                  </h3>
                  <p className="text-xs text-nodeslix-muted max-w-[150px]">
                    {step.desc}
                  </p>

                  {/* Connecting Arrow for mobile and desktop */}
                  {idx < stepsData.length - 1 && (
                    <>
                      {/* Mobile Arrow */}
                      <div className="lg:hidden text-nodeslix-muted/30 my-4 text-center">
                        ↓
                      </div>
                      {/* Desktop Glow Line */}
                      <Motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: idx * 0.15 }}
                        className="hidden lg:block absolute top-7 left-[calc(50%+1.75rem)] w-[calc(100%-3.5rem)] h-0.5 bg-gradient-to-r from-[#00D4FF]/40 to-transparent origin-left"
                      />
                    </>
                  )}
                </Motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: CAPABILITIES */}
      <section className="section-shell">
        <div className="app-container">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
            <p className="section-kicker">Core System Capabilities</p>
            <h2 className="section-title">Engineered for Massive Throughput</h2>
            <p className="section-copy">
              Maintain persistent state tracking, high-speed ML optimizations,
              and predictive path analysis.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {capabilitiesData.map((c, idx) => (
              <Motion.div
                key={c.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -4 }}
                className="accent-card p-6 border-white/5 hover:shadow-[0_0_24px_rgba(0,212,255,0.06)]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex items-center justify-center size-7 rounded-lg bg-[#00D4FF]/10 text-[#00D4FF]">
                    <CheckCircle2 size={16} />
                  </span>
                  <h3 className="text-md font-bold text-white">{c.title}</h3>
                </div>
                <p className="text-sm text-nodeslix-muted leading-relaxed">
                  {c.desc}
                </p>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: PLATFORM PREVIEW */}
      <section className="section-shell border-t border-white/5 bg-gradient-to-b from-transparent to-black/30">
        <div className="app-container">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
            <p className="section-kicker">Interactive System Preview</p>
            <h2 className="section-title">Dashboard Viewports</h2>
            <p className="section-copy">
              Static previews of administrative portals, mapping tools, and data
              grids available inside.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {/* Preview Card 1: Dashboard */}
            <Motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="panel-shell flex flex-col justify-between h-[320px] bg-gradient-to-b from-[#131313] to-[#0A0A0A]/90 border-white/5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className="rounded-full size-2 bg-[#00D4FF]" />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-nodeslix-muted">
                    Command Overview
                  </span>
                </div>
                <span className="text-[9px] font-mono text-nodeslix-accent bg-nodeslix-accent/5 px-2 py-0.5 rounded border border-nodeslix-accent/10">
                  Preview Only
                </span>
              </div>

              {/* Skeleton Metrics Grid */}
              <div className="grid grid-cols-3 gap-3 my-4">
                {[
                  { l: "Network Health", v: "99.9%", c: "text-emerald-400" },
                  { l: "Avg Latency", v: "8ms", c: "text-sky-400" },
                  { l: "Active Links", v: "2,401", c: "text-purple-400" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="border border-white/5 bg-black/40 rounded-lg p-3 text-center"
                  >
                    <span className="block text-[9px] text-nodeslix-muted/70 mb-1">
                      {item.l}
                    </span>
                    <span className={`text-md font-mono font-bold ${item.c}`}>
                      {item.v}
                    </span>
                  </div>
                ))}
              </div>

              {/* System summary block */}
              <div className="border border-white/5 bg-black/20 p-3 rounded-lg flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Activity
                    size={14}
                    className="text-[#00D4FF] animate-pulse"
                  />
                  <span className="text-nodeslix-muted">
                    Anomaly Telemetry Stream
                  </span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono">
                  Running (0 faults)
                </span>
              </div>
            </Motion.div>

            {/* Preview Card 2: Analytics */}
            <Motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="panel-shell flex flex-col justify-between h-[320px] bg-gradient-to-b from-[#131313] to-[#0A0A0A]/90 border-white/5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className="rounded-full size-2 bg-[#00D4FF]" />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-nodeslix-muted">
                    Traffic Analytics
                  </span>
                </div>
                <span className="text-[9px] font-mono text-[#00D4FF] bg-[#00D4FF]/5 px-2 py-0.5 rounded border border-[#00D4FF]/10">
                  Preview Only
                </span>
              </div>

              {/* Visual mini bar chart representation */}
              <div className="flex items-end justify-between gap-2 h-36 px-4 py-2 my-auto">
                {[45, 60, 30, 80, 50, 95, 70, 85].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-white/5 rounded-t-sm h-full flex flex-col justify-end"
                  >
                    <Motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: `${height}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.05 }}
                      className="w-full bg-gradient-to-t from-[#00D4FF]/40 to-[#00D4FF] rounded-t-sm"
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between text-[10px] text-nodeslix-muted font-mono pt-2 border-t border-white/5">
                <span>08:00 AM</span>
                <span>12:00 PM</span>
                <span>04:00 PM</span>
              </div>
            </Motion.div>

            {/* Preview Card 3: Topology */}
            <Motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="panel-shell flex flex-col justify-between h-[320px] bg-gradient-to-b from-[#131313] to-[#0A0A0A]/90 border-white/5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className="rounded-full size-2 bg-[#00D4FF]" />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-nodeslix-muted">
                    Network Topology map
                  </span>
                </div>
                <span className="text-[9px] font-mono text-[#00D4FF] bg-[#00D4FF]/5 px-2 py-0.5 rounded border border-[#00D4FF]/10">
                  Preview Only
                </span>
              </div>

              {/* Topology SVG design */}
              <div className="relative flex-1 flex items-center justify-center">
                <svg className="w-full h-full max-h-36" viewBox="0 0 200 100">
                  {/* Connections */}
                  <line
                    x1="30"
                    y1="50"
                    x2="80"
                    y2="25"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="1"
                  />
                  <line
                    x1="30"
                    y1="50"
                    x2="80"
                    y2="75"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="1"
                  />
                  <line
                    x1="80"
                    y1="25"
                    x2="130"
                    y2="25"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="1"
                  />
                  <line
                    x1="80"
                    y1="75"
                    x2="130"
                    y2="75"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="1"
                  />
                  <line
                    x1="130"
                    y1="25"
                    x2="170"
                    y2="50"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="1"
                  />
                  <line
                    x1="130"
                    y1="75"
                    x2="170"
                    y2="50"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="1"
                  />
                  <line
                    x1="80"
                    y1="25"
                    x2="80"
                    y2="75"
                    stroke="#00D4FF"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />

                  {/* Nodes */}
                  <circle cx="30" cy="50" r="4" fill="#a8a8a8" />
                  <circle
                    cx="80"
                    cy="25"
                    r="5"
                    fill="#00D4FF"
                    className="shadow-lg shadow-[#00D4FF]/50"
                  />
                  <circle cx="80" cy="75" r="5" fill="#00D4FF" />
                  <circle cx="130" cy="25" r="5" fill="#a8a8a8" />
                  <circle cx="130" cy="75" r="5" fill="#a8a8a8" />
                  <circle cx="170" cy="50" r="4" fill="#a8a8a8" />
                </svg>
              </div>

              <div className="flex justify-between items-center text-[10px] text-nodeslix-muted">
                <span>Active Nodes: 6</span>
                <span className="text-[#00D4FF] font-mono">
                  Routing Path Optimized
                </span>
              </div>
            </Motion.div>

            {/* Preview Card 4: Users */}
            <Motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="panel-shell flex flex-col justify-between h-[320px] bg-gradient-to-b from-[#131313] to-[#0A0A0A]/90 border-white/5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className="rounded-full size-2 bg-[#00D4FF]" />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-nodeslix-muted">
                    Team Access control
                  </span>
                </div>
                <span className="text-[9px] font-mono text-[#00D4FF] bg-[#00D4FF]/5 px-2 py-0.5 rounded border border-[#00D4FF]/10">
                  Preview Only
                </span>
              </div>

              {/* User row list skeleton */}
              <div className="flex-1 flex flex-col justify-center gap-3 my-4">
                {[
                  {
                    name: "Sarah Jenkins",
                    role: "Administrator",
                    status: "Online",
                    badge: "bg-emerald-400",
                  },
                  {
                    name: "Marcus Brody",
                    role: "Network Engineer",
                    status: "Active",
                    badge: "bg-[#00D4FF]",
                  },
                  {
                    name: "Dr. Evelyn Carter",
                    role: "Operations Analyst",
                    status: "Offline",
                    badge: "bg-white/20",
                  },
                ].map((user, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 rounded-lg bg-black/30 border border-white/5"
                  >
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-full bg-white/10 flex items-center justify-center text-[9px] font-bold text-white">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <span className="block text-xs font-semibold text-white">
                          {user.name}
                        </span>
                        <span className="block text-[9px] text-nodeslix-muted">
                          {user.role}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={`size-1.5 rounded-full ${user.badge}`} />
                      <span className="text-[10px] text-nodeslix-muted">
                        {user.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center text-[9px] text-nodeslix-muted/40 font-mono">
                <span>Active Sessions: 2</span>
                <span>Security Level: Tier 3</span>
              </div>
            </Motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 6: CALL TO ACTION */}
      <section className="section-shell border-t border-white/5 bg-gradient-to-t from-[#0d0d0d] via-[#0A0A0A] to-transparent">
        <div className="app-container">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="panel-shell max-w-4xl mx-auto text-center p-8 sm:p-12 lg:p-16 bg-gradient-to-b from-[#121212] to-black border-[#00D4FF]/20 relative overflow-hidden"
          >
            {/* Absolute background glows */}
            <div className="pointer-events-none absolute -left-1/3 -top-1/3 h-[300px] w-[300px] rounded-full bg-nodeslix-accent/[0.04] blur-[80px]" />
            <div className="pointer-events-none absolute -right-1/3 -bottom-1/3 h-[300px] w-[300px] rounded-full bg-blue-500/[0.03] blur-[80px]" />

            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Ready to enter the Telecom <br />
                Operations Command Center?
              </h2>
              <p className="text-md text-nodeslix-muted max-w-2xl mx-auto leading-relaxed">
                Unlock autonomous path routing, granular infrastructure signals,
                and advanced telemetry insights.
              </p>

              <div className="pt-6">
                <Motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="inline-block"
                >
                  <Link
                    to="/dashboard"
                    className="primary-button gap-2 shadow-2xl shadow-[#00D4FF]/20"
                  >
                    Launch Telemetry <ArrowUpRight size={16} />
                  </Link>
                </Motion.div>
              </div>
            </div>
          </Motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
