import { motion as Motion } from 'framer-motion';
import { BookOpen, Code2 } from 'lucide-react';
import bgImage from '../../assets/doc-background.png'

const resources = [
  'Network Intelligence API',
  'Telecom Telemetry Integration SDK',
  'Mesh Network Management API',
  'AI Optimization Engine API',
  'Enterprise Authentication Framework',
  'Infrastructure Deployment Guides',
  'Webhook & Event Streaming Services',
  'Integration Examples & Reference Architectures',
];

const Documentation = () => {
  return (
    <section id="docs" className="bg-center bg-no-repeat bg-cover section-shell scroll-mt-20" style={{backgroundImage: `url(${bgImage})`}}>
      <div className="flex justify-center app-container">
        {/* Documentation section for future docs area. */}
        <Motion.article
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55 }}
          className="max-w-3xl p-8 accent-card space-y-7"
        >
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center border size-12 rounded-2xl border-white/10 bg-nodeslix-accent/10 text-nodeslix-accent">
              <BookOpen size={20} />
            </span>
            <p className="section-kicker">DEVELOPER RESOURCES</p>
          </div>
          
          <div className="space-y-4">
            <h2 className="section-title">Developer Documentation</h2>
            <p className="max-w-xl section-copy">
              The NodeSlix Developer Platform will provide enterprise-grade APIs, integration frameworks, deployment guides, and technical resources for telecom ecosystem integration.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <span className="inline-flex items-center gap-2 rounded-full border border-nodeslix-accent/28 bg-nodeslix-accent/8 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-nodeslix-accent">
                <Code2 size={13} /> Coming Soon
              </span>
            </div>
          </div>

          <div className="space-y-4 border-t border-white/5 pt-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Planned Resources</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {resources.map((res, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-nodeslix-muted">
                  <span className="text-nodeslix-accent/80">•</span> {res}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 border-t border-white/5 pt-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Designed for Enterprise Integration</h3>
            <p className="text-sm leading-relaxed text-nodeslix-muted">
              Built to support telecommunications providers, network operators, infrastructure vendors, smart city ecosystems, and large-scale connectivity platforms seeking AI-driven network intelligence capabilities.
            </p>
          </div>

          <div className="space-y-2 border-t border-white/5 pt-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Developer Access Portal Coming Soon</h4>
            <p className="text-xs text-nodeslix-muted/60 leading-relaxed">
              Enterprise-grade integration for intelligent communication infrastructure.
            </p>
          </div>
        </Motion.article>
      </div>
    </section>
  );
};

export default Documentation;
