import { motion as Motion } from 'framer-motion';
import { BookOpen, Code2 } from 'lucide-react';
import bgImage from '../../assets/doc-background.png'

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
          className="max-w-3xl p-8 accent-card min-h-72 space-y-7"
        >
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center border size-12 rounded-2xl border-white/10 bg-nodeslix-accent/10 text-nodeslix-accent">
              <BookOpen size={20} />
            </span>
            <p className="section-kicker">Documentation</p>
          </div>
          <div className="space-y-5">
            <h2 className="section-title">Developer Resources</h2>
            <p className="max-w-xl section-copy">
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
