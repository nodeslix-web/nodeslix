import { motion as Motion } from 'framer-motion';
import {
  Activity,
  ArrowUpRight,
  Mail,
  Globe,
  Terminal,
  MessageSquare,
  ShieldCheck,
  AtSign,
  PlayCircle,
} from 'lucide-react';

/* ─── Animation variant ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: 'easeOut' },
  }),
};

/* ─── Smooth-scroll helper ─── */
const scrollTo = (id) => (e) => {
  e.preventDefault();
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

/* ─── Internal anchor link (smooth-scroll) ─── */
const SectionLink = ({ href, children }) => (
  <li>
    <a
      href={`#${href}`}
      onClick={scrollTo(href)}
      className="group relative inline-flex cursor-pointer items-center gap-1.5 text-sm text-nodeslix-muted transition-colors duration-200 hover:text-nodeslix-accent"
    >
      <Motion.span
        whileHover={{ y: -3 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="inline-flex items-center gap-1.5"
      >
        {children}
      </Motion.span>
      {/* Underline sweep */}
      <span className="absolute -bottom-px left-0 h-px w-0 rounded-full bg-nodeslix-accent/60 transition-all duration-[250ms] group-hover:w-full" />
    </a>
  </li>
);

/* ─── External / placeholder link ─── */
const ExternalLink = ({ href = '#', children, soon = false, target }) => (
  <li>
    {soon ? (
      <span className="inline-flex cursor-default items-center gap-2 text-sm text-nodeslix-muted/45">
        <Motion.span className="inline-flex items-center gap-1.5">
          {children}
          <span className="rounded-full border border-white/10 bg-white/5 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-nodeslix-muted/50">
            Soon
          </span>
        </Motion.span>
      </span>
    ) : (
      <a
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        className="group relative inline-flex cursor-pointer items-center gap-1.5 text-sm text-nodeslix-muted transition-colors duration-200 hover:text-nodeslix-accent"
      >
        <Motion.span
          whileHover={{ y: -3 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="inline-flex items-center gap-1.5"
        >
          {children}
        </Motion.span>
        <span className="absolute -bottom-px left-0 h-px w-0 rounded-full bg-nodeslix-accent/60 transition-all duration-[250ms] group-hover:w-full" />
      </a>
    )}
  </li>
);

/* ─── Social icon button ─── */
const SocialLink = ({ href, icon: Icon, label }) => (
  <Motion.a
    href={href}
    aria-label={label}
    whileHover={{ y: -3, scale: 1.12 }}
    transition={{ duration: 0.2, ease: 'easeOut' }}
    className="flex size-9 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-nodeslix-muted transition-colors duration-200 hover:border-nodeslix-accent/40 hover:text-nodeslix-accent"
  >
    <Icon size={15} aria-hidden="true" />
  </Motion.a>
);

/* ─── Column heading ─── */
const ColHeading = ({ children }) => (
  <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-nodeslix-muted/70">
    {children}
  </p>
);

/* ══════════════════════════════════════════════════ */

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-white/8 bg-nodeslix-secondary">
      {/* Ambient background aura */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[340px] w-[700px] -translate-x-1/2 rounded-full bg-nodeslix-accent/[0.04] blur-[100px]" />

      {/* ── Main grid ── */}
      <div className="app-container relative py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* ── Column 1: Brand ── */}
          <Motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-6"
          >
            {/* Logo mark */}
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-nodeslix-accent shadow-[0_0_18px_rgba(0,212,255,0.12)]">
                <Activity size={18} aria-hidden="true" />
              </span>
              <span className="text-base font-bold tracking-tight text-nodeslix-text">NodeSlix</span>
            </div>

            {/* Tagline */}
            <p className="max-w-[220px] text-sm font-semibold leading-snug text-nodeslix-text/90">
              Smarter Telecom Networks Powered by AI.
            </p>

            {/* Description */}
            <p className="max-w-[240px] text-sm leading-[1.75] text-nodeslix-muted">
              NodeSlix continuously monitors, predicts, and optimizes distributed telecom ecosystems through intelligent orchestration.
            </p>

            {/* Enterprise Ready badge */}
            <div className="inline-flex items-center gap-2 rounded-xl border border-nodeslix-accent/22 bg-nodeslix-accent/6 px-3.5 py-2.5">
              <ShieldCheck size={13} className="text-nodeslix-accent" aria-hidden="true" />
              <span className="text-xs font-bold tracking-wide text-nodeslix-accent">Enterprise Ready</span>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2 pt-1">
              <SocialLink href="#" icon={Globe}       label="NodeSlix on LinkedIn" />
              <SocialLink href="#" icon={Terminal}    label="NodeSlix on GitHub" />
              <SocialLink href="#" icon={AtSign}      label="NodeSlix on X (Twitter)" />
              <SocialLink href="#" icon={PlayCircle}  label="NodeSlix on YouTube" />
            </div>
          </Motion.div>

          {/* ── Column 2: Platform ── */}
          <Motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <ColHeading>Platform</ColHeading>
            <ul className="space-y-3.5">
              <SectionLink href="overview">Overview</SectionLink>
              <SectionLink href="dashboard">Dashboard</SectionLink>
              <SectionLink href="architecture">Infrastructure</SectionLink>
              <SectionLink href="capabilities">Features</SectionLink>
              <SectionLink href="architecture">Architecture</SectionLink>
            </ul>
          </Motion.div>

          {/* ── Column 3: Resources ── */}
          <Motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <ColHeading>Resources</ColHeading>
            <ul className="space-y-3.5">
              <SectionLink href="docs">Documentation</SectionLink>
              <ExternalLink soon>Developer API</ExternalLink>
              <ExternalLink href="#">Terms &amp; Conditions</ExternalLink>
              <ExternalLink href="#">Privacy Policy</ExternalLink>
              <ExternalLink href="#">Cookie Policy</ExternalLink>
            </ul>
          </Motion.div>

          {/* ── Column 4: Connect ── */}
          <Motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <ColHeading>Connect</ColHeading>
            <ul className="space-y-3.5">
              {/* Email */}
              <li>
                <a
                  href="mailto:support@nodeslix.com"
                  aria-label="Email NodeSlix support"
                  className="group relative inline-flex cursor-pointer items-center gap-2 text-sm text-nodeslix-muted transition-colors duration-200 hover:text-nodeslix-accent"
                >
                  <Motion.span
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="inline-flex items-center gap-2"
                  >
                    <Mail size={14} className="shrink-0 text-nodeslix-accent/70" aria-hidden="true" />
                    support@nodeslix.com
                  </Motion.span>
                  <span className="absolute -bottom-px left-0 h-px w-0 rounded-full bg-nodeslix-accent/60 transition-all duration-[250ms] group-hover:w-full" />
                </a>
              </li>

              {/* LinkedIn */}
              <li>
                <a href="#" aria-label="NodeSlix on LinkedIn"
                  className="group relative inline-flex cursor-pointer items-center gap-2 text-sm text-nodeslix-muted transition-colors duration-200 hover:text-nodeslix-accent">
                  <Motion.span whileHover={{ y: -3 }} transition={{ duration: 0.25, ease: 'easeOut' }} className="inline-flex items-center gap-2">
                    <Globe size={14} className="shrink-0 text-nodeslix-accent/70" aria-hidden="true" />
                    LinkedIn <ArrowUpRight size={11} className="text-nodeslix-muted/50" aria-hidden="true" />
                  </Motion.span>
                  <span className="absolute -bottom-px left-0 h-px w-0 rounded-full bg-nodeslix-accent/60 transition-all duration-[250ms] group-hover:w-full" />
                </a>
              </li>

              {/* GitHub */}
              <li>
                <a href="#" aria-label="NodeSlix on GitHub"
                  className="group relative inline-flex cursor-pointer items-center gap-2 text-sm text-nodeslix-muted transition-colors duration-200 hover:text-nodeslix-accent">
                  <Motion.span whileHover={{ y: -3 }} transition={{ duration: 0.25, ease: 'easeOut' }} className="inline-flex items-center gap-2">
                    <Terminal size={14} className="shrink-0 text-nodeslix-accent/70" aria-hidden="true" />
                    GitHub <ArrowUpRight size={11} className="text-nodeslix-muted/50" aria-hidden="true" />
                  </Motion.span>
                  <span className="absolute -bottom-px left-0 h-px w-0 rounded-full bg-nodeslix-accent/60 transition-all duration-[250ms] group-hover:w-full" />
                </a>
              </li>

              {/* X (Twitter) */}
              <li>
                <a href="#" aria-label="NodeSlix on X (Twitter)"
                  className="group relative inline-flex cursor-pointer items-center gap-2 text-sm text-nodeslix-muted transition-colors duration-200 hover:text-nodeslix-accent">
                  <Motion.span whileHover={{ y: -3 }} transition={{ duration: 0.25, ease: 'easeOut' }} className="inline-flex items-center gap-2">
                    <AtSign size={14} className="shrink-0 text-nodeslix-accent/70" aria-hidden="true" />
                    X (Twitter) <ArrowUpRight size={11} className="text-nodeslix-muted/50" aria-hidden="true" />
                  </Motion.span>
                  <span className="absolute -bottom-px left-0 h-px w-0 rounded-full bg-nodeslix-accent/60 transition-all duration-[250ms] group-hover:w-full" />
                </a>
              </li>

              {/* YouTube */}
              <li>
                <a href="#" aria-label="NodeSlix on YouTube"
                  className="group relative inline-flex cursor-pointer items-center gap-2 text-sm text-nodeslix-muted transition-colors duration-200 hover:text-nodeslix-accent">
                  <Motion.span whileHover={{ y: -3 }} transition={{ duration: 0.25, ease: 'easeOut' }} className="inline-flex items-center gap-2">
                    <PlayCircle size={14} className="shrink-0 text-nodeslix-accent/70" aria-hidden="true" />
                    YouTube <ArrowUpRight size={11} className="text-nodeslix-muted/50" aria-hidden="true" />
                  </Motion.span>
                  <span className="absolute -bottom-px left-0 h-px w-0 rounded-full bg-nodeslix-accent/60 transition-all duration-[250ms] group-hover:w-full" />
                </a>
              </li>

              {/* Contact */}
              <li>
                <a href="#" aria-label="Contact NodeSlix"
                  className="group relative inline-flex cursor-pointer items-center gap-2 text-sm text-nodeslix-muted transition-colors duration-200 hover:text-nodeslix-accent">
                  <Motion.span whileHover={{ y: -3 }} transition={{ duration: 0.25, ease: 'easeOut' }} className="inline-flex items-center gap-2">
                    <MessageSquare size={14} className="shrink-0 text-nodeslix-accent/70" aria-hidden="true" />
                    Contact
                  </Motion.span>
                  <span className="absolute -bottom-px left-0 h-px w-0 rounded-full bg-nodeslix-accent/60 transition-all duration-[250ms] group-hover:w-full" />
                </a>
              </li>
            </ul>
          </Motion.div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/6">
        <Motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="app-container flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-xs text-nodeslix-muted/70">
            © 2026 NodeSlix. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-nodeslix-muted/50">
            Built with
            <span className="inline-flex items-center rounded-md border border-white/8 bg-white/[0.03] px-1.5 py-0.5 font-mono text-[10px] text-nodeslix-muted/70">
              React
            </span>
            +
            <span className="inline-flex items-center rounded-md border border-nodeslix-accent/20 bg-nodeslix-accent/6 px-1.5 py-0.5 font-mono text-[10px] text-nodeslix-accent/80">
              AI Intelligence
            </span>
          </p>
        </Motion.div>
      </div>
    </footer>
  );
};

export default Footer;
