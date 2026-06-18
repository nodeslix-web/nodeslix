import { NavLink } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { Activity, ArrowUpRight } from 'lucide-react';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Dashboard', path: '/dashboard' },
];

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-nodeslix-primary/80 shadow-[0_12px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl">
      <nav className="app-container flex h-20 items-center justify-between gap-4">
        {/* Brand area for the application identity. */}
        <NavLink
          to="/"
          className="group flex items-center gap-3 text-sm font-semibold tracking-wide text-nodeslix-text"
        >
          <span className="flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-nodeslix-accent shadow-[0_10px_30px_rgba(0,0,0,0.22)] transition-colors group-hover:border-nodeslix-accent/50">
            <Activity size={19} aria-hidden="true" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-base">NodeSlix</span>
            <span className="hidden text-xs font-medium text-nodeslix-muted sm:block">
              AI Mesh Network Optimization Platform
            </span>
          </span>
        </NavLink>

        {/* Primary route navigation. */}
        <div className="flex items-center gap-1 rounded-2xl border border-white/10 bg-white/[0.04] p-1 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                [
                  'rounded-lg px-3 py-2 text-sm font-medium transition-colors sm:px-4',
                  isActive
                    ? 'bg-white/[0.08] text-nodeslix-accent shadow-[0_8px_22px_rgba(0,0,0,0.24)]'
                    : 'text-nodeslix-muted hover:bg-white/[0.05] hover:text-nodeslix-text',
                ].join(' ')
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Motion.span
            whileHover={{ y: -1 }}
            className="hidden size-9 items-center justify-center rounded-xl border border-white/10 text-nodeslix-muted md:flex"
          >
            <ArrowUpRight size={16} />
          </Motion.span>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
