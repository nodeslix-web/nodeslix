import { motion as Motion } from 'framer-motion';
import { BookOpen, Code2 } from 'lucide-react';

const Documentation = () => {
  return (
    <section id="docs" className="section-shell scroll-mt-20 bg-nodeslix-primary">
      <div className="app-container">
        {/* Documentation section for future docs area. */}
        <Motion.article
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55 }}
          className="accent-card min-h-72 max-w-3xl space-y-7 p-8"
        >
          <div className="flex items-center gap-3">
            <span className="flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-nodeslix-accent/10 text-nodeslix-accent">
              <BookOpen size={20} />
            </span>
            <p className="section-kicker">Documentation</p>
          </div>
          <div className="space-y-5">
            <h2 className="section-title">Developer Resources</h2>
            <p className="section-copy max-w-xl">
              API references, integration guides, and SDK documentation for building on top of the NodeSlix intelligence platform.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <span className="inline-flex items-center gap-2 rounded-full border border-nodeslix-accent/28 bg-nodeslix-accent/8 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-nodeslix-accent">
                <Code2 size={13} /> Coming Soon
              </span>
              <span className="text-xs text-nodeslix-muted/60">
                Early access available for enterprise partners.
              </span>
            </div>
          </div>
        </Motion.article>
      </div>
    </section>
  );
};

export default Documentation;
