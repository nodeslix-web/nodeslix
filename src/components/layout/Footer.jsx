import { useLocation, useNavigate } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import logo from '../../assets/logo.png';
import {
  ArrowUpRight,
  Mail,
  ShieldCheck,
} from 'lucide-react';

const Twitter = ({ className, size = 20 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const Facebook = ({ className, size = 20 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Youtube = ({ className, size = 20 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
  </svg>
);

const Pinterest = ({ className, size = 20 }) => (
  <svg className={className} width={size} height={size} viewBox="-15 272 256 256" fill="currentColor">
    <path d="M113,528.3c-12.6,0-24.8-1.9-36.3-5.3c4.9-7.7,10.2-17.6,12.9-27.4c1.6-5.7,9-35.2,9-35.2
	c4.4,8.5,17.4,15.9,31.3,15.9c41.2,0,69.1-37.5,69.1-87.7c0-38-32.2-73.3-81-73.3c-60.8,0-91.5,43.6-91.5,80
	c0,22,8.3,41.6,26.2,48.9c2.9,1.2,5.5,0,6.4-3.2c0.6-2.2,2-7.9,2.6-10.3c0.9-3.2,0.5-4.3-1.8-7.1c-5.1-6.1-8.4-13.9-8.4-25.1
	c0-32.3,24.2-61.3,63-61.3c34.4,0,53.3,21,53.3,49c0,36.9-16.3,68-40.6,68c-13.4,0-23.4-11.1-20.2-24.6
	c3.8-16.2,11.3-33.7,11.3-45.4c0-10.5-5.6-19.2-17.3-19.2c-13.7,0-24.7,14.2-24.7,33.1c0,12.1,4.1,20.2,4.1,20.2s-14,59.4-16.5,69.7
	c-2.3,9.7-2.6,20.5-2.2,29.4C16.5,497.8-15,452.7-15,400.3c0-70.7,57.3-128,128-128s128,57.3,128,128S183.7,528.3,113,528.3z"/>
  </svg>
);

/* ─── Animation variant ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: 'easeOut' },
  }),
};

/* ─── Internal anchor link (smooth-scroll & multi-page hash mapping) ─── */
const SectionLink = ({ href, children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e) => {
    e.preventDefault();
    const isHome = location.pathname === '/';

    // Map the external hash name to the internal DOM element ID
    let elementId = href;
    if (href === 'infrastructure') elementId = 'architecture';
    if (href === 'features') elementId = 'capabilities';

    const runScroll = () => {
      const el = document.getElementById(elementId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    if (isHome) {
      runScroll();
      navigate(`/#${href}`, { replace: true });
    } else {
      navigate(`/#${href}`);
      setTimeout(runScroll, 120);
    }
  };

  return (
    <li>
      <a
        href={`/#${href}`}
        onClick={handleClick}
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
};

/* ─── External / placeholder link ─── */
const ExternalLink = ({ href = '#', children, soon = false, target }) => (
  <li>
    {soon ? (
      <span className="inline-flex items-center gap-2 text-sm cursor-default text-nodeslix-muted/45">
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
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ y: -2 }}
    transition={{ duration: 0.2, ease: 'easeOut' }}
    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-nodeslix-muted transition-all duration-200 hover:border-nodeslix-accent/40 hover:text-nodeslix-accent hover:shadow-[0_0_15px_rgba(0,212,255,0.35)]"
  >
    <Icon className="h-[18px] w-[18px] md:h-[20px] md:w-[20px]" aria-hidden="true" />
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
      <div className="relative py-16 app-container">
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
            {/* Logo */}
            <img
              src={logo}
              alt="NodeSlix Logo"
              className="h-[64px] lg:h-[80px] w-auto object-contain"
              loading="lazy"
            />

            {/* Tagline */}
            <p className="max-w-[220px] text-sm font-semibold leading-snug text-nodeslix-text/90">
              Smarter Telecom Networks Powered by AI
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
              <SocialLink href="https://x.com/NodeSlix" icon={Twitter} label="Visit NodeSlix Twitter" />
              <SocialLink href="https://www.facebook.com/NodeSlix/" icon={Facebook} label="Visit NodeSlix Facebook" />
              <SocialLink href="https://www.pinterest.com/NodeSlix/" icon={Pinterest} label="Visit NodeSlix Pinterest" />
              <SocialLink href="https://www.youtube.com/@NodeSlix" icon={Youtube} label="Visit NodeSlix YouTube" />
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
              <SectionLink href="infrastructure">Infrastructure</SectionLink>
              <SectionLink href="features">Features</SectionLink>
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
                  className="relative inline-flex items-center gap-2 text-sm transition-colors duration-200 cursor-pointer group text-nodeslix-muted hover:text-nodeslix-accent"
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

              {/* X (Twitter) */}
              <li>
                <a href="https://x.com/NodeSlix" target="_blank" rel="noopener noreferrer" aria-label="Visit NodeSlix Twitter"
                  className="relative inline-flex items-center gap-2 text-sm transition-colors duration-200 cursor-pointer group text-nodeslix-muted hover:text-nodeslix-accent">
                  <Motion.span whileHover={{ y: -3 }} transition={{ duration: 0.25, ease: 'easeOut' }} className="inline-flex items-center gap-2">
                    <Twitter size={14} className="shrink-0 text-nodeslix-accent/70" aria-hidden="true" />
                    X (Twitter) <ArrowUpRight size={11} className="text-nodeslix-muted/50" aria-hidden="true" />
                  </Motion.span>
                  <span className="absolute -bottom-px left-0 h-px w-0 rounded-full bg-nodeslix-accent/60 transition-all duration-[250ms] group-hover:w-full" />
                </a>
              </li>

              {/* Facebook */}
              <li>
                <a href="https://www.facebook.com/NodeSlix/" target="_blank" rel="noopener noreferrer" aria-label="Visit NodeSlix Facebook"
                  className="relative inline-flex items-center gap-2 text-sm transition-colors duration-200 cursor-pointer group text-nodeslix-muted hover:text-nodeslix-accent">
                  <Motion.span whileHover={{ y: -3 }} transition={{ duration: 0.25, ease: 'easeOut' }} className="inline-flex items-center gap-2">
                    <Facebook size={14} className="shrink-0 text-nodeslix-accent/70" aria-hidden="true" />
                    Facebook <ArrowUpRight size={11} className="text-nodeslix-muted/50" aria-hidden="true" />
                  </Motion.span>
                  <span className="absolute -bottom-px left-0 h-px w-0 rounded-full bg-nodeslix-accent/60 transition-all duration-[250ms] group-hover:w-full" />
                </a>
              </li>

              {/* Pinterest */}
              <li>
                <a href="https://www.pinterest.com/NodeSlix/" target="_blank" rel="noopener noreferrer" aria-label="Visit NodeSlix Pinterest"
                  className="relative inline-flex items-center gap-2 text-sm transition-colors duration-200 cursor-pointer group text-nodeslix-muted hover:text-nodeslix-accent">
                  <Motion.span whileHover={{ y: -3 }} transition={{ duration: 0.25, ease: 'easeOut' }} className="inline-flex items-center gap-2">
                    <Pinterest size={14} className="shrink-0 text-nodeslix-accent/70" aria-hidden="true" />
                    Pinterest <ArrowUpRight size={11} className="text-nodeslix-muted/50" aria-hidden="true" />
                  </Motion.span>
                  <span className="absolute -bottom-px left-0 h-px w-0 rounded-full bg-nodeslix-accent/60 transition-all duration-[250ms] group-hover:w-full" />
                </a>
              </li>

              {/* YouTube */}
              <li>
                <a href="https://www.youtube.com/@NodeSlix" target="_blank" rel="noopener noreferrer" aria-label="Visit NodeSlix YouTube"
                  className="relative inline-flex items-center gap-2 text-sm transition-colors duration-200 cursor-pointer group text-nodeslix-muted hover:text-nodeslix-accent">
                  <Motion.span whileHover={{ y: -3 }} transition={{ duration: 0.25, ease: 'easeOut' }} className="inline-flex items-center gap-2">
                    <Youtube size={14} className="shrink-0 text-nodeslix-accent/70" aria-hidden="true" />
                    YouTube <ArrowUpRight size={11} className="text-nodeslix-muted/50" aria-hidden="true" />
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
          className="flex flex-col gap-3 py-5 app-container sm:flex-row sm:items-center sm:justify-between"
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
