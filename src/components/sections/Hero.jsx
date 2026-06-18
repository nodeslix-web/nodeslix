import { Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import LottieModule from 'lottie-react';
import { ArrowRight, Cpu, Network, RadioTower } from 'lucide-react';
import networkPulse from '../../data/networkPulse.json';

const Lottie = LottieModule.default ?? LottieModule;

const stats = [
  { label: 'Infrastructure Uptime', value: '99.98%' },
  { label: 'Average Latency', value: '8ms' },
  { label: 'Active Network Nodes', value: '1250' },
];

const highlights = [
  { title: 'Network Intelligence', description: 'Unified visibility across telecom operations.', icon: Cpu },
  { title: 'Mesh Optimization', description: 'Improve traffic flow across connected nodes.', icon: Network },
  { title: 'Infrastructure Signals', description: 'Monitor tower, gateway, and device health.', icon: RadioTower },
];

const Hero = () => {
  return (
    <section id="hero" className="relative scroll-mt-20 overflow-hidden bg-nodeslix-primary py-20 sm:py-28 lg:py-32">
      <div className="app-container">
        {/* Hero section with messaging and Lottie network visual. */}
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <Motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="max-w-3xl space-y-9"
          >
            <div className="space-y-6">
              <p className="section-kicker">NodeSlix</p>
              <h1 className="text-5xl font-semibold leading-[1.05] text-nodeslix-text sm:text-6xl lg:text-7xl">
                Smarter Telecom Networks Powered by AI
              </h1>
              <p className="max-w-xl text-base leading-7 text-nodeslix-muted sm:text-lg">
                Monitor, analyze, and optimize large-scale telecom infrastructure through a unified intelligence platform.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/dashboard"
                className="primary-button gap-2"
              >
                View Dashboard <ArrowRight size={16} />
              </Link>
              <a
                href="#architecture"
                className="secondary-button gap-2"
              >
                Explore Architecture <Network size={16} />
              </a>
            </div>
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="panel-shell min-h-[420px] sm:min-h-[540px]"
          >
            <div className="relative flex h-full min-h-[372px] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.16),transparent_38%),rgba(18,18,18,0.76)] p-5 sm:min-h-[476px]">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.16em] text-nodeslix-muted">
                <span>Network Visualization Area</span>
                <RadioTower size={17} className="text-nodeslix-accent" />
              </div>
              <div className="mx-auto w-full max-w-[360px]">
                <Lottie animationData={networkPulse} loop className="mx-auto" />
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <p className="text-xl font-semibold text-white">{stat.value}</p>
                    <p className="mt-2 text-xs text-nodeslix-muted">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Motion.div>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {highlights.map((item, index) => {
            const Icon = item.icon;

            return (
            <Motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 + index * 0.08 }}
              className="surface-card flex items-center gap-4 p-4"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-nodeslix-accent/10 text-nodeslix-accent">
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
      </div>
    </section>
  );
};

export default Hero;
