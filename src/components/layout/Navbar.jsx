import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion as Motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Activity, ArrowUpRight, Menu, X } from 'lucide-react';

/* ─── Nav items: label shown + actual section id to scroll to ─── */
const navItems = [
  { label: 'Overview',       id: 'overview' },
  { label: 'Features',       id: 'capabilities' },
  { label: 'Architecture',   id: 'architecture' },
  { label: 'Workflow',   id: 'workflow' },
  { label: 'Dashboard',      id: 'dashboard' },
  { label: 'Docs',           id: 'docs' },
];

/* ─── All section ids for active-tracking ─── */
const sectionIds = ['hero', 'overview', 'dashboard', 'architecture', 'capabilities', 'workflow', 'docs'];

/* ─── Drawer item stagger ─── */
const drawerItemVariants = {
  hidden:  { opacity: 0, x: 22 },
  visible: (i) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.24, delay: i * 0.05, ease: 'easeOut' },
  }),
};

/* ══════════════════════════════════════════ */

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled,    setIsScrolled]    = useState(false);
  const [isDrawerOpen,  setIsDrawerOpen]  = useState(false);
  const [scrollPct,     setScrollPct]     = useState(0);

  const drawerRef = useRef(null);
  const navigate  = useNavigate();
  const location  = useLocation();

  /* ── Smooth scroll to section ── */
  const scrollToSection = (sectionId) => {
    const run = () => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    setIsDrawerOpen(false);
    setActiveSection(sectionId);

    if (location.pathname !== '/') {
      navigate('/');
      window.setTimeout(run, 120);
      return;
    }
    run();
  };

  /* ── Scroll state: progress + section tracking ── */
  useEffect(() => {
    const onScroll = () => {
      const scrollY  = window.scrollY;
      const docH     = document.documentElement.scrollHeight - window.innerHeight;
      setIsScrolled(scrollY > 12);
      setScrollPct(docH > 0 ? (scrollY / docH) * 100 : 0);

      const offsets = sectionIds
        .map((id) => {
          const el = document.getElementById(id);
          if (!el) return null;
          return { id, top: Math.abs(el.getBoundingClientRect().top - 100) };
        })
        .filter(Boolean);

      const nearest = offsets.sort((a, b) => a.top - b.top)[0];
      if (nearest) setActiveSection(nearest.id);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  /* ── Close drawer on outside click ── */
  useEffect(() => {
    const onPointerDown = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        setIsDrawerOpen(false);
      }
    };
    if (isDrawerOpen) document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [isDrawerOpen]);

  /* ── Close drawer on Escape ── */
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setIsDrawerOpen(false); };
    if (isDrawerOpen) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isDrawerOpen]);

  const isHome = location.pathname === '/';

  return (
    <header
      role="banner"
      className={[
        'sticky top-0 z-50 transition-all duration-300',
        isScrolled
          ? 'border-b border-nodeslix-accent/12 bg-nodeslix-primary/94 shadow-[0_8px_40px_rgba(0,0,0,0.40)] backdrop-blur-2xl'
          : 'border-b border-white/5 bg-nodeslix-primary/40 backdrop-blur-xl',
      ].join(' ')}
    >
      {/* ── Scroll progress bar ── */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] overflow-hidden">
        <Motion.div
          className="h-full origin-left bg-gradient-to-r from-nodeslix-accent/70 via-nodeslix-accent to-nodeslix-accent/70"
          style={{ scaleX: scrollPct / 100, transformOrigin: 'left' }}
        />
      </div>

      <nav
        aria-label="Primary navigation"
        className="flex items-center justify-between h-20 gap-4 app-container"
      >

        {/* ══ LEFT: Logo ══ */}
        <button
          type="button"
          aria-label="Go to top of page"
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-3 text-left cursor-pointer group shrink-0"
        >
          {/* Icon mark */}
          <Motion.span
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="flex size-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-nodeslix-accent transition-all duration-200 group-hover:border-nodeslix-accent/45 group-hover:bg-nodeslix-accent/8 group-hover:shadow-[0_0_16px_rgba(0,212,255,0.2)]"
          >
            <Activity size={18} aria-hidden="true" />
          </Motion.span>

          {/* Wordmark + subtitle */}
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-bold tracking-tight text-nodeslix-text">NodeSlix</span>
            <span className="hidden text-[10px] font-medium tracking-wide text-nodeslix-muted/70 sm:block">
              AI Telecom Intelligence Platform
            </span>
          </span>
        </button>

        {/* ══ CENTER: Nav links (desktop) ══ */}
        <div className="hidden xl:flex items-center gap-0.5 rounded-2xl border border-white/8 bg-white/[0.03] p-1 backdrop-blur-xl">
          {navItems.map((item) => {
            const isActive = isHome && activeSection === item.id;

            return (
              <button
                key={`${item.label}-${item.id}`}
                type="button"
                aria-current={isActive ? 'page' : undefined}
                onClick={() => scrollToSection(item.id)}
                className={[
                  'group relative cursor-pointer rounded-xl px-3.5 py-2 text-sm font-medium outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-nodeslix-accent/50',
                  isActive
                    ? 'text-nodeslix-accent'
                    : 'text-nodeslix-muted hover:text-nodeslix-text',
                ].join(' ')}
              >
                {/* Active bg pill */}
                {isActive && (
                  <Motion.span
                    layoutId="navActivePill"
                    className="absolute inset-0 rounded-xl bg-nodeslix-accent/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}

                {/* Label */}
                <span className="relative z-10">{item.label}</span>

                {/* Hover underline */}
                <span
                  className={[
                    'absolute bottom-1 left-1/2 h-px -translate-x-1/2 rounded-full bg-nodeslix-accent transition-all duration-250',
                    isActive
                      ? 'w-5 opacity-100'
                      : 'w-0 opacity-0 group-hover:w-4 group-hover:opacity-50',
                  ].join(' ')}
                />
              </button>
            );
          })}
        </div>

        {/* ══ RIGHT: Status badge + CTA ══ */}
        <div className="items-center hidden gap-3 xl:flex">

          {/* AI Active status badge */}
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1.5">
              <Motion.span
                animate={{ scale: [1, 1.55, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
                className="block size-1.5 rounded-full bg-nodeslix-accent"
              />
              <span className="text-xs font-bold tracking-wide text-nodeslix-accent">AI Active</span>
            </div>
            <span className="text-[10px] font-medium text-nodeslix-muted/60 tracking-wide">
              Live Optimization
            </span>
          </div>

          {/* Separator */}
          <div className="w-px rounded-full h-7 bg-white/10" />

          {/* Launch Dashboard button */}
          <Motion.button
            type="button"
            aria-label="Launch Dashboard"
            whileHover={{ y: -3, boxShadow: '0 10px 32px rgba(0,212,255,0.28)' }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={() => navigate('/dashboard')}
            className="gap-2 cursor-pointer primary-button"
          >
            Launch Dashboard <ArrowUpRight size={15} aria-hidden="true" />
          </Motion.button>
        </div>

        {/* ══ MOBILE: Hamburger ══ */}
        <button
          type="button"
          aria-label="Open navigation menu"
          aria-expanded={isDrawerOpen}
          aria-controls="mobile-drawer"
          onClick={() => setIsDrawerOpen(true)}
          className="flex size-10 cursor-pointer items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-nodeslix-text transition-all duration-200 hover:border-nodeslix-accent/40 hover:bg-nodeslix-accent/6 hover:text-nodeslix-accent xl:hidden"
        >
          <Menu size={20} />
        </button>
      </nav>

      {/* ══════ MOBILE DRAWER ══════ */}
      <AnimatePresence>
        {isDrawerOpen && (
          <Motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm xl:hidden"
            aria-hidden="true"
          >
            <Motion.aside
              id="mobile-drawer"
              ref={drawerRef}
              role="dialog"
              aria-label="Mobile navigation"
              aria-modal="true"
              initial={{ x: 320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 320, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
              className="ml-auto flex h-dvh w-[320px] max-w-[calc(100vw-1.5rem)] flex-col border-l border-white/10 bg-[#0c0c0c]/98 shadow-[0_0_80px_rgba(0,0,0,0.6)] backdrop-blur-2xl"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between p-5 border-b border-white/8">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-nodeslix-accent">
                    <Activity size={16} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-bold leading-tight text-white">NodeSlix</p>
                    <p className="text-[10px] text-nodeslix-muted">AI Telecom Intelligence Platform</p>
                  </div>
                </div>

                <button
                  type="button"
                  aria-label="Close navigation menu"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex items-center justify-center transition-colors duration-200 border cursor-pointer size-9 rounded-xl border-white/10 text-nodeslix-muted hover:border-white/20 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              {/* AI Active badge in drawer */}
              <div className="px-5 py-3 border-b border-white/6">
                <div className="inline-flex items-center gap-2 rounded-full border border-nodeslix-accent/25 bg-nodeslix-accent/8 px-3 py-1.5">
                  <Motion.span
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
                    className="block size-1.5 rounded-full bg-nodeslix-accent"
                  />
                  <span className="text-xs font-bold text-nodeslix-accent">AI Active</span>
                  <span className="text-[10px] text-nodeslix-muted/70">· Live Optimization</span>
                </div>
              </div>

              {/* Nav items */}
              <nav aria-label="Mobile navigation links" className="flex-1 px-3 py-4 overflow-y-auto">
                <ul className="flex flex-col gap-0.5">
                  {navItems.map((item, i) => {
                    const isActive = isHome && activeSection === item.id;

                    return (
                      <Motion.li
                        key={`${item.label}-${item.id}-mobile`}
                        custom={i}
                        variants={drawerItemVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <button
                          type="button"
                          onClick={() => scrollToSection(item.id)}
                          aria-current={isActive ? 'page' : undefined}
                          className={[
                            'flex w-full cursor-pointer items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium transition-all duration-200',
                            isActive
                              ? 'bg-nodeslix-accent/10 text-nodeslix-accent'
                              : 'text-nodeslix-muted hover:bg-white/[0.04] hover:text-white',
                          ].join(' ')}
                        >
                          <span>{item.label}</span>
                          {isActive && (
                            <Motion.span
                              layoutId="mobileActiveBar"
                              className="w-5 h-px rounded-full bg-nodeslix-accent"
                              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                            />
                          )}
                        </button>
                      </Motion.li>
                    );
                  })}
                </ul>
              </nav>

              {/* Drawer CTA */}
              <div className="p-5 border-t border-white/8">
                <Motion.button
                  type="button"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => { setIsDrawerOpen(false); navigate('/dashboard'); }}
                  className="w-full gap-2 cursor-pointer primary-button"
                >
                  Launch Dashboard <ArrowUpRight size={15} aria-hidden="true" />
                </Motion.button>
              </div>
            </Motion.aside>
          </Motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
