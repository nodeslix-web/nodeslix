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
          className="panel-shell min-h-72 max-w-3xl space-y-6"
        >
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-nodeslix-accent/10 text-nodeslix-accent">
              <BookOpen size={20} />
            </span>
            <p className="section-kicker">Documentation</p>
          </div>
          <div className="space-y-4">
            <h2 className="section-title">Developer Resources</h2>
            <p className="section-copy">
              API references and integration guides will be available here.
            </p>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-nodeslix-accent">
              <Code2 size={14} /> Coming Soon
            </span>
          </div>
        </Motion.article>
      </div>
    </section>
  );
};

export default Documentation;
