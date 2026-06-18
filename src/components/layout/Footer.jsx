import { Cpu, RadioTower, ShieldCheck } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-nodeslix-secondary/80">
      <div className="app-container grid gap-8 py-10 text-sm text-nodeslix-muted md:grid-cols-[1fr_auto] md:items-center">
        {/* Footer shell reserved for approval-stage navigation or legal links. */}
        <div className="space-y-2">
          <p className="font-semibold text-nodeslix-text">NodeSlix</p>
          <p>AI Mesh Network Optimization Platform</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'Network AI', icon: Cpu },
            { label: 'Telecom Systems', icon: RadioTower },
            { label: 'Reliable Operations', icon: ShieldCheck },
          ].map((item) => {
            const Icon = item.icon;

            return (
            <span
              key={item.label}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2"
            >
              <Icon size={15} className="text-nodeslix-accent" />
              {item.label}
            </span>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
