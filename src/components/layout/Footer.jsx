import { motion as Motion } from 'framer-motion';
import { Activity, ArrowUpRight, BookOpen, Code2, Cpu, RadioTower, ShieldCheck } from 'lucide-react';

const Footer = () => {
  return (
    <Motion.footer
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="border-t border-white/8 bg-nodeslix-secondary/80"
    >
      <div className="app-container py-14">
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-start">
          {/* Left: Brand block */}
          <div className="space-y-4 max-w-sm">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-nodeslix-accent">
                <Activity size={18} />
              </span>
              <div>
                <p className="font-bold text-nodeslix-text text-base">NodeSlix</p>
                <p className="text-xs text-nodeslix-muted">AI Telecom Command Center</p>
              </div>
            </div>
            <p className="text-sm leading-[1.75] text-nodeslix-muted">
              AI-powered orchestration for large-scale telecom infrastructure. Monitor, analyze, predict, and optimize — all from a single platform.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                { label: 'Network AI', icon: Cpu },
                { label: 'Telecom Systems', icon: RadioTower },
                { label: 'Reliable Operations', icon: ShieldCheck },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <span
                    key={item.label}
                    className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-nodeslix-muted"
                  >
                    <Icon size={12} className="text-nodeslix-accent" />
                    {item.label}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Right: Quick links */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm">
            <p className="col-span-2 text-xs font-bold uppercase tracking-[0.18em] text-nodeslix-muted mb-1">
              Platform
            </p>
            {[
              { label: 'Dashboard', icon: ArrowUpRight },
              { label: 'Capabilities', icon: ArrowUpRight },
              { label: 'Architecture', icon: ArrowUpRight },
              { label: 'Workflow', icon: ArrowUpRight },
            ].map((link) => (
              <span
                key={link.label}
                className="flex items-center gap-1 text-nodeslix-muted hover:text-nodeslix-text transition-colors duration-150 cursor-pointer"
              >
                {link.label}
              </span>
            ))}
            <div className="col-span-2 pt-4 mt-2 border-t border-white/6">
              <span className="flex items-center gap-2 text-nodeslix-muted text-xs">
                <BookOpen size={13} className="text-nodeslix-accent" />
                <span>Developer Docs</span>
                <Code2 size={11} className="text-nodeslix-accent/60" />
                <span className="text-nodeslix-accent/60 text-[10px] font-semibold uppercase tracking-wide">Coming Soon</span>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom divider + copyright */}
        <div className="mt-10 pt-6 border-t border-white/6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-nodeslix-muted">
            © 2025 NodeSlix. All rights reserved.
          </p>
          <p className="text-xs text-nodeslix-muted/60">
            AI Mesh Network Optimization Platform
          </p>
        </div>
      </div>
    </Motion.footer>
  );
};

export default Footer;
