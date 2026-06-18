import { NavLink } from 'react-router-dom';
import { FiActivity } from 'react-icons/fi';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Dashboard', path: '/dashboard' },
];

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-nodeslix-border/80 bg-nodeslix-primary/95 shadow-[0_12px_40px_rgba(0,0,0,0.28)]">
      <nav className="app-container flex h-20 items-center justify-between gap-4">
        {/* Brand area for the application identity. */}
        <NavLink
          to="/"
          className="group flex items-center gap-3 text-sm font-semibold tracking-wide text-nodeslix-text"
        >
          <span className="flex size-10 items-center justify-center rounded-xl border border-nodeslix-border bg-nodeslix-card text-nodeslix-accent shadow-[0_10px_30px_rgba(0,0,0,0.22)] transition-colors group-hover:border-nodeslix-accent/50">
            <FiActivity aria-hidden="true" />
          </span>
          <span className="text-base">NodeSlix</span>
        </NavLink>

        {/* Primary route navigation. */}
        <div className="flex items-center gap-1 rounded-xl border border-nodeslix-border bg-nodeslix-secondary p-1 shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                [
                  'rounded-lg px-3 py-2 text-sm font-medium transition-colors sm:px-4',
                  isActive
                    ? 'bg-nodeslix-card text-nodeslix-accent shadow-[0_8px_22px_rgba(0,0,0,0.24)]'
                    : 'text-nodeslix-muted hover:bg-nodeslix-card/70 hover:text-nodeslix-text',
                ].join(' ')
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
