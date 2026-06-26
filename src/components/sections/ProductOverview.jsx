import { motion as Motion } from 'framer-motion';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import AlertTriangleSvg from '../../assets/icons/Product Overview(Challenge).svg'
import BrainCircuitSvg from '../../assets/icons/Product Overview(Solution).svg'
import TrendingUpSvg from '../../assets/icons/Product Overview(Impact).svg'

/* ─── Stagger container ─── */
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11 } },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

/* ─── Storytelling cards ─── */
const storyCards = [
  {
    id:          'challenge',
    label:       '01 — Challenge',
    title:       'The Problem',
    description: 'Modern telecom infrastructures generate massive amounts of operational data that are difficult to monitor manually.',
    icon:        AlertTriangleSvg,
    accent:      false,
  },
  {
    id:          'intelligence',
    label:       '02 — Intelligence',
    title:       'The Solution',
    description: 'NodeSlix continuously analyzes network behavior and identifies opportunities for optimization.',
    icon:        BrainCircuitSvg,
    accent:      true,   /* featured card */
  },
  {
    id:          'impact',
    label:       '03 — Impact',
    title:       'The Result',
    description: 'Improve reliability, reduce latency, and increase infrastructure efficiency across every node.',
    icon:        TrendingUpSvg,
    accent:      false,
  },
];

/* ─── Stat pills ─── */
const stats = [
  { label: '99.98% Uptime' },
  { label: '8ms Latency' },
  { label: '1,250 Active Nodes' },
  { label: '94% Efficiency' },
];

/* ─── Mini steps ─── */
const miniSteps = [
  { num: '01', label: 'Connect' },
  { num: '02', label: 'Analyze' },
  { num: '03', label: 'Optimize' },
  { num: '04', label: 'Monitor' },
];

/* ══════════════════════════════════════════════════ */

const ProductOverview = () => (
  <section id="overview" className="section-shell scroll-mt-20 bg-nodeslix-secondary">
    <div className="space-y-16 app-container">

      {/* ── Section header ── */}
      <Motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55 }}
        className="max-w-2xl space-y-5"
      >
        <p className="section-kicker">Product Overview</p>
        <h2 className="section-title">The Intelligence Layer</h2>
        <p className="section-copy">
          NodeSlix acts as an AI orchestration layer that monitors, predicts, and optimizes telecom infrastructure — end to end.
        </p>
      </Motion.div>

      {/* ── Storytelling cards + connector ── */}
      <div className="relative">
        {/* Horizontal connector line — desktop only */}
        <div className="pointer-events-none absolute left-0 right-0 top-[52px] hidden items-center lg:flex" aria-hidden="true">
          <div className="flex flex-1 items-center gap-0 px-[12.5%]">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-nodeslix-accent/25 to-nodeslix-accent/40" />
            <Motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              className="mx-2 block size-1.5 shrink-0 rounded-full bg-nodeslix-accent"
            />
            <div className="flex-1 h-px bg-gradient-to-r from-nodeslix-accent/40 via-nodeslix-accent/25 to-transparent" />
          </div>
        </div>

        {/* Vertical connector line — mobile & tablet only */}
        <div className="pointer-events-none absolute bottom-[10%] left-1/2 top-[10%] flex w-px -translate-x-1/2 flex-col items-center lg:hidden" aria-hidden="true">
          <div className="flex-1 w-full bg-gradient-to-b from-transparent via-nodeslix-accent/20 to-nodeslix-accent/40" />
          <Motion.span
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="my-2 block size-1.5 shrink-0 rounded-full bg-nodeslix-accent"
          />
          <div className="flex-1 w-full bg-gradient-to-b from-nodeslix-accent/40 via-nodeslix-accent/20 to-transparent" />
        </div>

        <Motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative z-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {storyCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <Motion.article
                key={card.id}
                variants={fadeUp}
                whileHover={{ y: -4, transition: { duration: 0.25, ease: 'easeOut' } }}
                className={[
                  'group relative flex flex-col h-full gap-6 overflow-hidden rounded-3xl border p-7 transition-all duration-300',
                  index === 2 ? 'sm:col-span-2 lg:col-span-1' : '', // 2 + 1 layout on tablet
                  card.accent
                    ? 'border-nodeslix-accent/28 bg-gradient-to-b from-nodeslix-accent/8 to-nodeslix-accent/[0.03] hover:border-nodeslix-accent/45'
                    : 'border-white/8 bg-[#0a0a0a]/95 hover:border-white/16', // solid background to hide the vertical line underneath
                ].join(' ')}
              >
                {/* Subtle inner glow on featured card */}
                {card.accent && (
                  <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_at_top,rgba(0,212,255,0.06),transparent_65%)]" />
                )}

                {/* Step label */}
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-nodeslix-muted/60">
                  {card.label}
                </p>

                {/* Icon */}
                <div className={[
                  'flex size-12 items-center justify-center rounded-2xl border transition-all duration-300',
                  card.accent
                    ? 'border-nodeslix-accent/30 bg-nodeslix-accent/10 text-nodeslix-accent group-hover:shadow-[0_0_20px_rgba(0,212,255,0.22)]'
                    : 'border-white/10 bg-white/[0.04] text-nodeslix-accent/80',
                ].join(' ')}>
                  {typeof Icon === 'string' ? (
                    <img src={Icon} className="object-contain w-8 h-8 opacity-90" aria-hidden="true" />
                  ) : (
                    <Icon size={20} aria-hidden="true" />
                  )}
                </div>

                {/* Text */}
                <div className="space-y-2.5">
                  <h3 className="text-lg font-bold tracking-tight text-nodeslix-text">{card.title}</h3>
                  <p className="text-sm leading-[1.78] text-nodeslix-muted">{card.description}</p>
                </div>

                {/* Bottom accent bar on active card */}
                {card.accent && (
                  <Motion.div
                    className="absolute bottom-0 left-0 h-[2px] w-full origin-left rounded-full bg-gradient-to-r from-nodeslix-accent/60 to-nodeslix-accent/20"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.35, ease: 'easeOut' }}
                  />
                )}
              </Motion.article>
            );
          })}
        </Motion.div>
      </div>

      {/* ── Stat pills ── */}
      <Motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.45 }}
        className="flex flex-wrap items-center gap-2.5"
      >
        <span className="mr-1 text-[11px] font-bold uppercase tracking-[0.18em] text-nodeslix-muted/50">
          At a glance
        </span>
        {stats.map((s, i) => (
          <Motion.span
            key={s.label}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03, y: -1 }}
            transition={{ duration: 0.2, delay: 0.1 + i * 0.06 }}
            className="inline-flex cursor-default items-center gap-1.5 rounded-full border border-nodeslix-accent/20 bg-nodeslix-accent/6 px-3.5 py-2 text-xs font-bold text-nodeslix-accent"
          >
            <Motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              className="block size-1.5 rounded-full bg-nodeslix-accent"
            />
            {s.label}
          </Motion.span>
        ))}
      </Motion.div>

      {/* ── "How NodeSlix Works" summary card ── */}
      <Motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl border border-white/8 bg-white/[0.025] p-8 sm:p-10"
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16">
          {/* Left — text */}
          <div className="max-w-sm space-y-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-nodeslix-accent/25 bg-nodeslix-accent/8 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-nodeslix-accent">
                <ShieldCheck size={11} className="text-nodeslix-accent" aria-hidden="true" />
                Enterprise Ready
              </span>
            </div>
            <h3 className="text-xl font-bold tracking-tight text-nodeslix-text">
              How NodeSlix Works
            </h3>
            <p className="text-sm leading-[1.78] text-nodeslix-muted">
              Connect infrastructure systems, analyze telemetry, generate intelligent recommendations, and continuously optimize operations.
            </p>
          </div>

          {/* Right — 4-step mini flow */}
          <div className="flex flex-col flex-1 gap-3 sm:flex-row sm:items-center sm:gap-0">
            {miniSteps.map((step, index) => (
              <div key={step.label} className="flex items-center sm:flex-1">
                {/* Step pill */}
                <Motion.div
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="flex flex-col items-center flex-1 gap-2 px-4 py-4 text-center border rounded-2xl border-white/8 bg-black/20 sm:mx-1"
                >
                  <span className="text-[10px] font-bold text-nodeslix-accent/60">{step.num}</span>
                  <span className="text-sm font-bold text-nodeslix-text">{step.label}</span>
                  {/* Animated underline */}
                  <Motion.div
                    className="w-0 h-px rounded-full bg-nodeslix-accent/50"
                    whileInView={{ width: '40%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.12, ease: 'easeOut' }}
                  />
                </Motion.div>

                {/* Arrow connector */}
                {index < miniSteps.length - 1 && (
                  <div className="items-center hidden sm:flex">
                    <Motion.div
                      animate={{ opacity: [0.3, 1, 0.3], x: [0, 3, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.4 }}
                    >
                      <ArrowRight size={14} className="text-nodeslix-accent/50" aria-hidden="true" />
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

export default ProductOverview;
