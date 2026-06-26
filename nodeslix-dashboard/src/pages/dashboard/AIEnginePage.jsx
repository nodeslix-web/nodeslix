import { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import {
  BrainCircuit, ChevronRight, Cpu, Database,
  Layers, Network, Rocket, Zap,
} from 'lucide-react';

/* ─── Mock Data ─── */
const pipeline = [
  {
    step: '01',
    title: 'Telemetry Ingestion',
    desc: 'Raw data streams collected from all network endpoints and aggregated into the processing layer.',
    icon: Database,
    pct: 100,
    status: 'Active',
    metrics: [{ label: 'Data Rate', value: '4.2 GB/s' }, { label: 'Streams', value: '18,450' }, { label: 'Errors', value: '0.002%' }],
    color: '#00D4FF',
  },
  {
    step: '02',
    title: 'Traffic Optimization',
    desc: 'AI models analyze routing patterns and autonomously balance workloads across mesh segments.',
    icon: Network,
    pct: 97,
    status: 'Active',
    metrics: [{ label: 'Routes/s', value: '214' }, { label: 'Savings', value: '18%' }, { label: 'Conflicts', value: '0' }],
    color: '#3A6DFF',
  },
  {
    step: '03',
    title: 'Routing Intelligence',
    desc: 'Multi-path routing decisions based on real-time congestion maps and SLA requirements.',
    icon: Layers,
    pct: 94,
    status: 'Active',
    metrics: [{ label: 'Paths Active', value: '2,140' }, { label: 'Reroutes/h', value: '87' }, { label: 'Latency', value: '8ms' }],
    color: '#7CEBFF',
  },
  {
    step: '04',
    title: 'Predictive Analytics',
    desc: 'Forecasting capacity needs and identifying failure risks 48 hours in advance.',
    icon: BrainCircuit,
    pct: 91,
    status: 'Active',
    metrics: [{ label: 'Accuracy', value: '96.2%' }, { label: 'Forecasts/d', value: '1,440' }, { label: 'Warnings', value: '3' }],
    color: '#a78bfa',
  },
  {
    step: '05',
    title: 'Autonomous Orchestration',
    desc: 'Policy-driven configuration management and automated remediation without human intervention.',
    icon: Rocket,
    pct: 89,
    status: 'Learning',
    metrics: [{ label: 'Actions/h', value: '156' }, { label: 'Confidence', value: '89%' }, { label: 'Rollbacks', value: '2' }],
    color: '#f59e0b',
  },
];

const modelStats = [
  { label: 'Active Models',   value: '4',    suffix: '',    desc: 'Neural networks running' },
  { label: 'Decisions / sec', value: '214',  suffix: '',    desc: 'Real-time routing choices' },
  { label: 'Model Accuracy',  value: '96.2', suffix: '%',   desc: 'Validation accuracy avg.' },
  { label: 'GPU Utilization', value: '74',   suffix: '%',   desc: 'NVIDIA A100 cluster load'  },
  { label: 'Inference Time',  value: '1.2',  suffix: 'ms',  desc: 'Average response latency'  },
  { label: 'Training Epoch',  value: '1,248', suffix: '',   desc: 'Continuous online learning' },
];

const nvidiaModules = [
  { name: 'NVIDIA DOCA',          status: 'Running', version: '2.7.0' },
  { name: 'cuOpt Engine',         status: 'Running', version: '24.03' },
  { name: 'Morpheus Pipeline',    status: 'Running', version: '24.06' },
  { name: 'Triton Inference',     status: 'Running', version: '2.46'  },
];

/* ─────────────────────────────────────────
   AI ENGINE PAGE
───────────────────────────────────────── */
const AIEnginePage = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="p-5 md:p-6 space-y-7">
      {/* Page Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="section-kicker">AI Engine</p>
          <h1 className="text-2xl font-extrabold text-white mt-1">Intelligence Pipeline</h1>
          <p className="text-sm text-nodeslix-muted mt-1">NVIDIA-powered AI processing engine for autonomous telecom operations.</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <span className="inline-flex items-center gap-2 rounded-full border border-nodeslix-accent/25 bg-nodeslix-accent/10 px-3.5 py-1.5 text-xs font-bold text-nodeslix-accent">
            <Motion.span
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="block size-1.5 rounded-full bg-nodeslix-accent"
            />
            Pipeline Active
          </span>
        </div>
      </div>

      {/* Model Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {modelStats.map((s, i) => (
          <Motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
            whileHover={{ y: -4, borderColor: 'rgba(0,212,255,0.28)' }}
            className="surface-card p-4 text-center"
          >
            <p className="text-xl font-extrabold text-nodeslix-accent">{s.value}{s.suffix}</p>
            <p className="text-[11px] font-semibold text-white mt-1">{s.label}</p>
            <p className="text-[9px] text-nodeslix-muted/60 mt-0.5">{s.desc}</p>
          </Motion.div>
        ))}
      </div>

      {/* Pipeline Steps (interactive) */}
      <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
        {/* Step list */}
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-nodeslix-muted/50 mb-3">Pipeline Stages</p>
          {pipeline.map((step, i) => {
            const Icon = step.icon;
            return (
              <Motion.button
                key={step.step}
                type="button"
                onClick={() => setActiveStep(i)}
                whileHover={{ x: 3 }}
                transition={{ duration: 0.18 }}
                className={[
                  'w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-200',
                  activeStep === i
                    ? 'border-nodeslix-accent/40 bg-nodeslix-accent/10'
                    : 'border-white/8 hover:border-white/16 hover:bg-white/[0.02]',
                ].join(' ')}
              >
                <div className={[
                  'flex size-8 shrink-0 items-center justify-center rounded-lg border',
                  activeStep === i
                    ? 'bg-nodeslix-accent/15 border-nodeslix-accent/40 text-nodeslix-accent'
                    : 'bg-white/[0.04] border-white/10 text-nodeslix-muted',
                ].join(' ')}>
                  <Icon size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-semibold truncate ${activeStep === i ? 'text-nodeslix-accent' : 'text-white'}`}>
                    {step.title}
                  </p>
                  <p className="text-[9px] text-nodeslix-muted/60 mt-0.5">{step.pct}% active</p>
                </div>
                {activeStep === i && <ChevronRight size={12} className="text-nodeslix-accent shrink-0" />}
              </Motion.button>
            );
          })}
        </div>

        {/* Active step detail */}
        {(() => {
          const step = pipeline[activeStep];
          const Icon = step.icon;
          return (
            <Motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="panel-shell relative overflow-hidden"
            >
              <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-48 w-72 rounded-full blur-[80px]"
                style={{ backgroundColor: `${step.color}15` }} />
              <div className="relative">
                {/* Step header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="flex size-12 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.04]">
                      <Icon size={22} style={{ color: step.color }} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-nodeslix-muted/60 uppercase tracking-widest">Step {step.step}</p>
                      <h3 className="text-xl font-extrabold text-white">{step.title}</h3>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold text-emerald-400">
                    <span className="block size-1 rounded-full bg-emerald-400 animate-pulse" />
                    {step.status}
                  </span>
                </div>

                <p className="text-sm text-nodeslix-muted leading-relaxed mb-6">{step.desc}</p>

                {/* Progress */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-white">Processing Efficiency</span>
                    <span className="text-sm font-extrabold" style={{ color: step.color }}>{step.pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/8">
                    <Motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: step.pct / 100 }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      style={{ originX: 0, background: `linear-gradient(90deg, ${step.color}, ${step.color}99)` }}
                      className="h-full rounded-full"
                    />
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3">
                  {step.metrics.map((m) => (
                    <div key={m.label} className="bg-white/[0.03] border border-white/8 rounded-xl p-3 text-center">
                      <p className="text-base font-extrabold text-white">{m.value}</p>
                      <p className="text-[10px] text-nodeslix-muted/60 mt-0.5">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Motion.div>
          );
        })()}
      </div>

      {/* NVIDIA Modules */}
      <section>
        <p className="section-kicker mb-1">Runtime</p>
        <h2 className="text-base font-bold text-white mb-4">NVIDIA SDK Modules</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {nvidiaModules.map((mod, i) => (
            <Motion.div
              key={mod.name}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.07 }}
              whileHover={{ y: -3, borderColor: 'rgba(0,212,255,0.3)' }}
              className="surface-card p-4 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <Cpu size={16} className="text-nodeslix-accent" />
                <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded-full">
                  {mod.status}
                </span>
              </div>
              <div>
                <p className="text-xs font-bold text-white">{mod.name}</p>
                <p className="text-[9px] text-nodeslix-muted/60 mt-0.5">v{mod.version}</p>
              </div>
            </Motion.div>
          ))}
        </div>
      </section>

      <div className="h-4" />
    </div>
  );
};

export default AIEnginePage;
