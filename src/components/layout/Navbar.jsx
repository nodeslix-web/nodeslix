import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { Activity, ArrowUpRight, Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', id: 'hero' },
  { label: 'Overview', id: 'overview' },
  { label: 'Capabilities', id: 'capabilities' },
  { label: 'Architecture', id: 'architecture' },
  { label: 'Workflow', id: 'workflow' },
  { label: 'Dashboard', id: 'dashboard' },
  { label: 'Docs', id: 'docs' },
];

const drawerItemVariants = {
  hidden: { opacity: 0, x: 18 },
  visible: (i) => ({ opacity: 1, x: 0, transition: { duration: 0.22, delay: i * 0.045, ease: 'easeOut' } }),
};

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    const runScroll = () => {
      const target = document.getElementById(sectionId);

      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    setIsDrawerOpen(false);
    setActiveSection(sectionId);

    if (location.pathname !== '/') {
      navigate('/');
      window.setTimeout(runScroll, 120);
      return;
    }

    runScroll();
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);

      const sectionOffsets = navItems
        .map((item) => {
          const section = document.getElementById(item.id);

          if (!section) return null;

          return {
            id: item.id,
            top: Math.abs(section.getBoundingClientRect().top - 110),
          };
        })
        .filter(Boolean);

      const nearest = sectionOffsets.sort((a, b) => a.top - b.top)[0];

      if (nearest) {
        setActiveSection(nearest.id);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setIsDrawerOpen(false);
      }
    };

    if (isDrawerOpen) {
      document.addEventListener('mousedown', handlePointerDown);
    }

    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [isDrawerOpen]);

  return (
    <header
      className={[
        'sticky top-0 z-50 border-b backdrop-blur-xl transition-all duration-300',
        isScrolled
          ? 'border-nodeslix-accent/12 bg-nodeslix-primary/92 shadow-[0_18px_60px_rgba(0,0,0,0.38)]'
          : 'border-white/5 bg-nodeslix-primary/45',
      ].join(' ')}
    >
      <nav className="flex items-center justify-between h-20 gap-6 app-container">
        <button
          type="button"
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-3 text-sm font-semibold tracking-wide text-left group text-nodeslix-text cursor-pointer"
        >
          <span className="flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-nodeslix-accent transition-all duration-200 group-hover:border-nodeslix-accent/50 group-hover:shadow-[0_0_18px_rgba(0,212,255,0.22)] group-hover:bg-nodeslix-accent/8">
            <Activity size={19} aria-hidden="true" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-base">NodeSlix</span>
            <span className="hidden text-xs font-medium text-nodeslix-muted sm:block">
              AI Telecom Command Center
            </span>
          </span>
        </button>

        <div className="hidden items-center gap-1 rounded-2xl border border-white/10 bg-white/[0.04] p-1 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl xl:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.id && location.pathname === '/';

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={[
                  'group relative rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer',
                  isActive
                    ? 'text-nodeslix-accent bg-nodeslix-accent/8'
                    : 'text-nodeslix-muted hover:bg-white/[0.05] hover:text-nodeslix-text',
                ].join(' ')}
              >
                {item.label}
                <span
                  className={[
                    'absolute bottom-1.5 left-1/2 h-px -translate-x-1/2 rounded-full bg-nodeslix-accent transition-all duration-300',
                    isActive ? 'w-6 opacity-100' : 'w-0 opacity-0 group-hover:w-4 group-hover:opacity-60',
                  ].join(' ')}
                />
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="hidden gap-2 primary-button xl:inline-flex"
        >
          Launch Dashboard <ArrowUpRight size={16} />
        </button>

        <button
          type="button"
          onClick={() => setIsDrawerOpen(true)}
          className="flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-nodeslix-text transition-all duration-200 hover:border-nodeslix-accent/40 hover:text-nodeslix-accent hover:bg-nodeslix-accent/6 xl:hidden cursor-pointer"
          aria-label="Open navigation menu"
        >
          <Menu size={21} />
        </button>
      </nav>

      <AnimatePresence>
        {isDrawerOpen ? (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/58 backdrop-blur-sm xl:hidden"
          >
            <Motion.aside
              ref={drawerRef}
              initial={{ x: 320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 320, opacity: 0 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              className="ml-auto flex h-dvh w-[300px] max-w-[calc(100vw-24px)] flex-col border-l border-white/10 bg-nodeslix-primary/97 p-5 shadow-[0_0_60px_rgba(0,0,0,0.56)]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-nodeslix-accent">
                    <Activity size={18} />
                  </span>
                  <div>
                    <p className="font-semibold text-white">NodeSlix</p>
                    <p className="text-xs text-nodeslix-muted">Command Center</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex items-center justify-center transition-colors border size-10 rounded-xl border-white/10 text-nodeslix-muted hover:text-white cursor-pointer"
                  aria-label="Close navigation menu"
                >
                  <X size={19} />
                </button>
              </div>

              <div className="flex flex-col gap-1 mt-8">
                {navItems.map((item, i) => {
                  const isActive = activeSection === item.id && location.pathname === '/';

                  return (
                    <Motion.button
                      key={item.id}
                      custom={i}
                      variants={drawerItemVariants}
                      initial="hidden"
                      animate="visible"
                      type="button"
                      onClick={() => scrollToSection(item.id)}
                      className={[
                        'flex items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium transition-colors cursor-pointer',
                        isActive
                          ? 'bg-nodeslix-accent/8 text-nodeslix-accent'
                          : 'text-nodeslix-muted hover:bg-white/[0.04] hover:text-white',
                      ].join(' ')}
                    >
                      {item.label}
                      <span
                        className={[
                          'h-px rounded-full bg-nodeslix-accent transition-all duration-300',
                          isActive ? 'w-5 opacity-100' : 'w-0 opacity-0',
                        ].join(' ')}
                      />
                    </Motion.button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsDrawerOpen(false);
                  navigate('/dashboard');
                }}
                className="gap-2 mt-6 primary-button cursor-pointer"
              >
                Launch Dashboard <ArrowUpRight size={16} />
              </button>
            </Motion.aside>
          </Motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
