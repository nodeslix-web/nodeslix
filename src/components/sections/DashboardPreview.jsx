import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { ArrowRight, LineChart, ShieldAlert, Sliders } from "lucide-react";
import RadioTower from "../../assets/icons/Inside The Command Center.svg";
import Brain from "../../assets/icons/Inside The Command Center (2).svg";
import Gauge from "../../assets/icons/Inside The Command Center (3).svg";
import Workflow from "../../assets/icons/Inside The Command Center (4).svg";
import Activity from "../../assets/icons/Dashboard Preview(Average Latency).svg";
import ShieldCheck from "../../assets/icons/Dashboard Preview(Infrastructure Uptime).svg";
import Cpu from "../../assets/icons/Dashboard Preview(Mesh Segments).svg";

/* ─── Compact metrics configuration for the Mockup Panel ─── */
const metrics = [
  {
    label: "Infrastructure Uptime",
    value: "99.98%",
    icon: ShieldCheck,
    sub: "Target: 99.99%",
  },
  {
    label: "Average Latency",
    value: "8ms",
    icon: Activity,
    sub: "Optimal Route",
  },
  {
    label: "Active Nodes",
    value: "1,250",
    icon: RadioTower,
    sub: "Global Terminals",
  },
  { label: "AI Efficiency", value: "94%", icon: Cpu, sub: "Optimized Pathing" },
];

/* ─── Right column capabilities checklist ─── */
const commandCapabilities = [
  {
    title: "Telecom Operations Command Center",
    description:
      "The NodeSlix Dashboard provides a centralized operational environment for monitoring, analyzing, and optimizing telecom infrastructure at scale.",
    icon: RadioTower,
  },
  {
    title: "Infrastructure Health Monitoring",
    description:
      "Track active network nodes, uptime percentages, throughput performance, latency metrics, and service availability across distributed communication systems.",
    icon: Brain,
  },
  {
    title: "AI Optimization Performance",
    description:
      "Measure optimization effectiveness through real-time intelligence scoring, traffic efficiency indicators, bandwidth utilization analytics, and autonomous orchestration metrics.",
    icon: Gauge,
  },
  {
    title: "Network Topology Visualization",
    description:
      "Explore interactive mesh network maps, connectivity relationships, routing pathways, node dependencies, and communication flow patterns.",
    icon: Workflow,
  },
  {
    title: "Traffic Intelligence",
    description:
      "Analyze traffic distribution, congestion risks, network demand fluctuations, and infrastructure utilization trends through advanced visual analytics.",
    icon: LineChart,
  },
  {
    title: "Predictive Risk Center",
    description:
      "Receive early warnings for service degradation, congestion events, infrastructure anomalies, and operational vulnerabilities before they impact network performance.",
    icon: ShieldAlert,
  },
  {
    title: "Autonomous Operations Console",
    description:
      "Monitor AI-driven optimization workflows, self-healing actions, automated routing decisions, and network orchestration activities in real time.",
    icon: Sliders,
  },
];

/* ─── Running activity feed log items ─── */
const activities = [
  "Traffic optimized",
  "Congestion reduced",
  "Path rerouted",
  "Node recovered",
  "Infrastructure healthy",
];

const DashboardPreview = () => {
  const [feed, setFeed] = useState([
    "Traffic optimized",
    "Congestion reduced",
    "Path rerouted",
  ]);

  /* ─── Cycle the activity feed every 2.5 seconds ─── */
  useEffect(() => {
    const interval = setInterval(() => {
      setFeed((prev) => {
        const nextIndex = (activities.indexOf(prev[0]) + 1) % activities.length;
        return [activities[nextIndex], prev[0], prev[1]];
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="dashboard"
      className="overflow-hidden section-shell scroll-mt-20 bg-nodeslix-secondary"
    >
      <div className="app-container space-y-14">
        {/* ─── Section Header ─── */}
        <Motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between"
        >
          <div className="max-w-2xl space-y-3">
            <p className="section-kicker">Dashboard Preview</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Telecom Operations Command Center
            </h2>
            <p className="text-sm leading-relaxed text-nodeslix-muted sm:text-base">
              Explore how NodeSlix monitors, predicts, and optimizes telecom
              infrastructures in real time.
            </p>
          </div>

          {/* Status Badge */}
          <div className="flex items-start shrink-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-nodeslix-accent/25 bg-nodeslix-accent/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-nodeslix-accent">
              <Motion.span
                animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="block size-1.5 rounded-full bg-nodeslix-accent"
              />
              Live Preview
            </span>
          </div>
        </Motion.div>

        {/* ─── Two-Column Preview Grid ─── */}
        <div className="grid items-stretch grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* ─── Left Side: Dashboard Mockup Panel ─── */}
          <Motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-6 panel-shell relative flex flex-col justify-between space-y-6 overflow-hidden bg-gradient-to-b from-[#131313] to-[#0A0A0A]"
          >
            {/* Header / Badges */}
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
              <div className="flex items-center gap-2">
                <span className="rounded-full size-2 bg-nodeslix-accent animate-pulse" />
                <span className="text-[10px] font-mono tracking-wider uppercase text-nodeslix-muted/80">
                  Command Preview
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full border border-nodeslix-accent/20 bg-nodeslix-accent/5 text-[9px] font-mono text-nodeslix-accent tracking-wider font-bold">
                Simulation Environment
              </span>
            </div>

            {/* Metrics 2x2 Grid */}
            <div className="grid grid-cols-2 gap-4">
              {metrics.map((m, idx) => {
                const MetricIcon = m.icon;
                return (
                  <Motion.div
                    key={idx}
                    whileHover={{ y: -4 }}
                    transition={{
                      type: "tween",
                      ease: "easeInOut",
                      duration: 0.25,
                    }}
                    className="surface-card p-4 flex flex-col justify-between min-h-[95px] group border-white/5 bg-[#0A0A0A]/50 hover:border-nodeslix-accent/30 hover:shadow-[0_0_15px_rgba(0,212,255,0.04)]"
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-[11px] text-nodeslix-muted font-medium">
                        {m.label}
                      </span>
                      {typeof MetricIcon === "string" ? (
                        <img
                          src={MetricIcon}
                          className="object-contain w-6 h-6 opacity-90 text-nodeslix-accent"
                          aria-hidden="true"
                        />
                      ) : (
                        <MetricIcon
                          size={14}
                          className="transition-transform text-nodeslix-accent/80 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="flex items-baseline justify-between mt-3">
                      <span className="text-2xl font-bold leading-none tracking-tight text-white">
                        {m.value}
                      </span>
                      <span className="text-[9px] font-mono text-nodeslix-muted/40">
                        {m.sub}
                      </span>
                    </div>
                  </Motion.div>
                );
              })}
            </div>

            {/* Mini Network Visual (Hub & Spoke Topology) */}
            <div className="relative py-4 bg-black/30 rounded-xl border border-white/5 flex flex-col items-center justify-center min-h-[140px]">
              <div className="relative flex flex-col items-center justify-between w-full max-w-sm px-4 h-28">
                {/* Center Hub */}
                <div className="z-10 flex flex-col items-center">
                  <span className="px-3 py-1 rounded-md bg-nodeslix-accent/10 border border-nodeslix-accent/25 text-[9px] font-mono font-bold text-nodeslix-accent shadow-[0_0_10px_rgba(0,212,255,0.15)] uppercase tracking-wider">
                    AI Core
                  </span>
                </div>

                {/* Animated connectors */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none select-none"
                  viewBox="0 0 300 112"
                >
                  <path
                    d="M 150 25 L 30 85"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="1"
                  />
                  <path
                    d="M 150 25 L 90 85"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="1"
                  />
                  <path
                    d="M 150 25 L 150 85"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="1"
                  />
                  <path
                    d="M 150 25 L 210 85"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="1"
                  />
                  <path
                    d="M 150 25 L 270 85"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="1"
                  />

                  {/* Dynamic glowing packet dots */}
                  <Motion.circle
                    r="2"
                    fill="#00D4FF"
                    animate={{ cx: [150, 30], cy: [25, 85] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                      delay: 0,
                    }}
                  />
                  <Motion.circle
                    r="2"
                    fill="#00D4FF"
                    animate={{ cx: [150, 90], cy: [25, 85] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                      delay: 0.4,
                    }}
                  />
                  <Motion.circle
                    r="2"
                    fill="#00D4FF"
                    animate={{ cx: [150, 150], cy: [25, 85] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                      delay: 0.8,
                    }}
                  />
                  <Motion.circle
                    r="2"
                    fill="#00D4FF"
                    animate={{ cx: [150, 210], cy: [25, 85] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                      delay: 1.2,
                    }}
                  />
                  <Motion.circle
                    r="2"
                    fill="#00D4FF"
                    animate={{ cx: [150, 270], cy: [25, 85] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                      delay: 1.6,
                    }}
                  />
                </svg>

                {/* Target spokes row */}
                <div className="z-10 flex items-center justify-between w-full px-2 mt-auto">
                  {["5G", "Core", "Mesh", "Edge", "IoT"].map((node) => (
                    <span
                      key={node}
                      className="px-2 py-0.5 rounded border border-white/5 bg-[#0A0A0A]/90 text-[9px] font-mono font-semibold text-nodeslix-muted"
                    >
                      {node}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Scrolling Activity Feed */}
            <div className="border border-white/5 bg-black/40 rounded-xl p-4 font-mono text-[11px] space-y-2">
              <div className="flex justify-between items-center text-[9px] text-nodeslix-muted/40 border-b border-white/5 pb-1.5 mb-2">
                <span>SYSTEM LOG</span>
                <span>STREAM ACTIVE</span>
              </div>
              <div className="relative h-[62px] overflow-hidden flex flex-col gap-1.5">
                <AnimatePresence mode="popLayout">
                  {feed.map((act, index) => (
                    <Motion.div
                      key={act}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: index === 0 ? 1 : 0.4, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="flex items-center gap-2"
                    >
                      <span
                        className={
                          index === 0
                            ? "text-nodeslix-accent"
                            : "text-nodeslix-muted/30"
                        }
                      >
                        ▶
                      </span>
                      <span
                        className={
                          index === 0
                            ? "text-white font-medium"
                            : "text-nodeslix-muted"
                        }
                      >
                        {act}
                      </span>
                      {index === 0 && (
                        <span className="ml-auto text-[8px] px-1 py-0.2 bg-nodeslix-accent/15 text-nodeslix-accent rounded font-mono font-bold scale-90">
                          NEW
                        </span>
                      )}
                    </Motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </Motion.div>

          {/* ─── Right Side: Capability Sidebar ─── */}
          <Motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="flex flex-col justify-between h-full space-y-8 lg:col-span-6"
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                  Inside The Command Center
                </h3>
                <p className="text-sm leading-relaxed text-nodeslix-muted">
                  Unlock high-fidelity insights and autonomous configuration
                  controls across your entire network fabric.
                </p>
              </div>

              {/* Capability cards list */}
              <div className="pt-2 space-y-4">
                {commandCapabilities.map((cap, idx) => {
                  const CapIcon = cap.icon;
                  return (
                    <Motion.div
                      key={idx}
                      whileHover={{ x: 4 }}
                      transition={{
                        type: "tween",
                        ease: "easeOut",
                        duration: 0.2,
                      }}
                      className="flex items-start gap-4 p-3 rounded-xl border border-transparent hover:border-white/5 hover:bg-white/[0.02] transition-colors group"
                    >
                      <span className="flex items-center justify-center transition-transform border rounded-lg size-10 shrink-0 bg-nodeslix-accent/5 text-nodeslix-accent border-nodeslix-accent/15 group-hover:scale-105">
                        {typeof CapIcon === "string" ? (
                          <img
                            src={CapIcon}
                            className="object-contain w-6 h-6 opacity-90"
                            aria-hidden="true"
                          />
                        ) : (
                          <CapIcon size={16} />
                        )}
                      </span>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold text-white transition-colors group-hover:text-nodeslix-accent">
                          {cap.title}
                        </h4>
                        <p className="text-xs leading-relaxed text-nodeslix-muted line-clamp-2">
                          {cap.description}
                        </p>
                      </div>
                    </Motion.div>
                  );
                })}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-6 mt-auto border-t border-white/5">
              <Link
                to="/Product"
                className="primary-button inline-flex items-center justify-center gap-2 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,212,255,0.15)] shadow-md"
              >
                Launch Matrix <ArrowRight size={15} />
              </Link>
              <a
                href="#architecture"
                className="secondary-button inline-flex items-center justify-center gap-2 text-sm font-semibold border border-white/10 hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5"
              >
                View Architecture
              </a>
            </div>
          </Motion.div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
