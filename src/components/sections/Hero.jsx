import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion as Motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { ArrowDown, ArrowRight, Network, ShieldCheck, Zap, Server, Activity } from 'lucide-react';
import CommandCenterPanel from '../panels/CommandCenterPanel.jsx';

/* ─── Trust badges ─── */
const trustBadges = [
  { label: '99.98% Uptime',      icon: ShieldCheck },
  { label: '8ms Latency',        icon: Zap },
  { label: '1,250 Active Nodes', icon: Server },
  { label: 'Enterprise Ready',   icon: Activity },
];

/* ─── Activity ticker messages ─── */
const tickerMessages = [
  'Traffic optimized',
  'Path rerouted',
  'Congestion resolved',
  'Latency reduced',
  'Infrastructure healthy',
];

/* ─── Staggered reveal container ─── */
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const fadeSlide = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

/* ─── Ticker component ─── */
const ActivityTicker = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % tickerMessages.length), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-2.5">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-nodeslix-muted/60">
        Latest
      </span>
      <span className="w-px h-3 rounded-full bg-white/12" />
      <AnimatePresence mode="wait">
        <Motion.span
          key={index}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.32, ease: 'easeOut' }}
          className="text-xs font-semibold text-nodeslix-accent"
        >
          {tickerMessages[index]}
        </Motion.span>
      </AnimatePresence>
    </div>
  );
};

/* ══════════════════════════════════════ */

const Hero = () => {
  const panelRef = useRef(null);

  /* Mouse parallax — max 5px movement */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 60, damping: 18 });
  const springY = useSpring(rawY, { stiffness: 60, damping: 18 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      rawX.set(((e.clientX - cx) / cx) * 5);
      rawY.set(((e.clientY - cy) / cy) * 5);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [rawX, rawY]);

  return (
    <section
      id="hero"
      className="relative pt-10 pb-24 overflow-hidden scroll-mt-20 bg-nodeslix-primary sm:pb-28 sm:pt-14 lg:pb-32 lg:pt-16"
    >
      {/* ── Ambient aura ── */}
      <div className="pointer-events-none absolute -left-40 top-0 h-[600px] w-[600px] rounded-full bg-nodeslix-accent/[0.048] blur-[130px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full bg-nodeslix-accent/[0.028] blur-[110px]" />

      <div className="relative app-container">


        {/* ── Main two-column grid ── */}
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.92fr] lg:gap-16">

          {/* Left column — messaging */}
          <Motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Kicker */}
            <Motion.p variants={fadeSlide} className="section-kicker">
              NodeSlix Platform
            </Motion.p>

            {/* H1 with accent highlights */}
            <Motion.h1
              variants={fadeSlide}
              className="text-5xl font-extrabold leading-[1.04] tracking-tight text-nodeslix-text sm:text-6xl lg:text-[4.25rem]"
            >
              Smarter Telecom{' '}
              <span className="text-nodeslix-accent">Networks</span>{' '}
              Powered by AI{' '}
              <span className="text-nodeslix-accent">Intelligence</span>
            </Motion.h1>

            {/* Sub-copy */}
            <Motion.p
              variants={fadeSlide}
              className="max-w-[500px] text-base leading-[1.82] text-nodeslix-muted sm:text-lg"
            >
              Monitor, analyze, and optimize large-scale telecom infrastructure through a unified intelligence platform.
            </Motion.p>

            {/* CTA buttons */}
            <Motion.div variants={fadeSlide} className="flex flex-col gap-3 sm:flex-row">
              <Motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2, ease: 'easeOut' }}>
                <Link to="/dashboard" className="gap-2 primary-button">
                  View Dashboard <ArrowRight size={16} />
                </Link>
              </Motion.div>
              <Motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2, ease: 'easeOut' }}>
                <a href="#architecture" className="gap-2 secondary-button">
                  Explore Architecture <Network size={16} />
                </a>
              </Motion.div>
            </Motion.div>

            {/* Trust badges */}
            <Motion.div variants={fadeSlide} className="flex flex-wrap gap-2 pt-1">
              {trustBadges.map((badge) => {
                const Icon = badge.icon;
                return (
                  <Motion.span
                    key={badge.label}
                    whileHover={{ scale: 1.03, y: -1 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="inline-flex cursor-default items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-nodeslix-muted backdrop-blur-sm"
                  >
                    <Icon size={12} className="text-nodeslix-accent/80" aria-hidden="true" />
                    {badge.label}
                  </Motion.span>
                );
              })}
            </Motion.div>

            {/* Activity ticker */}
            <Motion.div
              variants={fadeSlide}
              className="flex items-center gap-3 rounded-xl border border-white/6 bg-white/[0.025] px-4 py-2.5 backdrop-blur-sm"
              style={{ maxWidth: 'fit-content' }}
            >
              <Motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="block size-1.5 rounded-full bg-emerald-400"
              />
              <ActivityTicker />
            </Motion.div>
          </Motion.div>

          {/* Right column — visualization with parallax */}
          <Motion.div
            ref={panelRef}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            style={{ x: springX, y: springY }}
            className="panel-shell min-h-[420px] sm:min-h-[540px]"
          >
            <CommandCenterPanel />
          </Motion.div>
        </div>

        {/* ── Highlight cards (below grid) ── */}
        <div className="grid gap-4 mt-12 md:grid-cols-3">
          {[
            { title: 'Network Intelligence', description: 'Unified visibility across telecom operations.', icon: Activity },
            { title: 'Mesh Optimization', description: 'Improve traffic flow across connected nodes.', icon: Network },
            { title: 'Infrastructure Signals', description: 'Monitor tower, gateway, and device health.', icon: Server },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <Motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.5 + index * 0.09 }}
                whileHover={{ y: -3, borderColor: 'rgba(0,212,255,0.28)' }}
                className="flex items-center gap-4 p-4 surface-card"
              >
                <span className="flex items-center justify-center size-11 shrink-0 rounded-xl bg-nodeslix-accent/10 text-nodeslix-accent">
                  <Icon size={19} />
                </span>
                <div>
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="text-sm text-nodeslix-muted">{item.description}</p>
                </div>
              </Motion.div>
            );
          })}
        </div>

        {/* ── Scroll indicator ── */}
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="flex flex-col items-center gap-2 mt-14"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-nodeslix-muted/50">
            Scroll to Explore
          </span>
          <Motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="flex items-center justify-center border rounded-full size-8 border-white/10 text-nodeslix-muted/50"
          >
            <ArrowDown size={14} aria-hidden="true" />
          </Motion.div>
        </Motion.div>

      </div>
    </section>
  );
};

export default Hero;
