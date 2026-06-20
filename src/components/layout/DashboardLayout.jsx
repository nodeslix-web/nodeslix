import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import logo from '../../assets/logo.png';
import {
  Activity, BarChart3, Bell, BrainCircuit, ChevronDown,
  LayoutDashboard, LogOut, Menu, Network, Search, Server,
  Settings, Sliders, Users, X,
} from 'lucide-react';

/* ─── Nav items (links to nested routes) ─── */
const navItems = [
  { label: 'Overview',       icon: LayoutDashboard, path: '/dashboard'                },
  { label: 'Infrastructure', icon: Server,           path: '/dashboard/infrastructure' },
  { label: 'AI Engine',      icon: BrainCircuit,     path: '/dashboard/ai-engine'      },
  { label: 'Operations',     icon: Sliders,          path: '/dashboard/operations'     },
  { label: 'Topology',       icon: Network,          path: '/dashboard/topology'       },
  { label: 'Analytics',      icon: BarChart3,        path: '/dashboard/analytics'      },
  { label: 'Users',          icon: Users,            path: '/dashboard/users'          },
  { label: 'Settings',       icon: Settings,         path: '/dashboard/settings'       },
];

/* ─────────────────────────────────────────
   SIDEBAR
───────────────────────────────────────── */
const Sidebar = ({ collapsed, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) =>
    path === '/dashboard'
      ? location.pathname === '/dashboard' || location.pathname === '/dashboard/'
      : location.pathname.startsWith(path);

  return (
    <aside className={[
      'flex flex-col h-full bg-[#0c0c0c] border-r border-white/[0.07] transition-all duration-300',
      collapsed ? 'w-[70px]' : 'w-[280px]',
    ].join(' ')}>

      {/* Logo */}
      <div className={['flex items-center gap-3 border-b border-white/[0.07] shrink-0',
        collapsed ? 'justify-center px-3 py-5' : 'px-6 py-5',
      ].join(' ')}>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex items-center gap-3 cursor-pointer min-w-0"
          aria-label="Go to homepage"
        >
          <img src={logo} alt="NodeSlix Logo" className="h-9 w-auto object-contain shrink-0" />
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm font-bold text-white leading-tight truncate">NodeSlix</p>
              <p className="text-[10px] text-nodeslix-muted/70 leading-tight truncate">AI Telecom Intelligence Platform</p>
            </div>
          )}
        </button>
        {onClose && (
          <button onClick={onClose} className="ml-auto text-nodeslix-muted hover:text-white lg:hidden shrink-0">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav label */}
      {!collapsed && (
        <p className="px-6 pt-6 pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-nodeslix-muted/40">
          Navigation
        </p>
      )}

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Motion.div
              key={item.path}
              whileHover={{ x: collapsed ? 0 : 3 }}
              transition={{ duration: 0.18 }}
            >
              <Link
                to={item.path}
                title={collapsed ? item.label : undefined}
                onClick={onClose}
                className={[
                  'relative w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  collapsed ? 'justify-center' : '',
                  active
                    ? 'bg-nodeslix-accent/10 text-nodeslix-accent'
                    : 'text-nodeslix-muted hover:bg-white/[0.04] hover:text-white',
                ].join(' ')}
              >
                {active && (
                  <Motion.span
                    layoutId="sidebarActivePill"
                    className="absolute inset-0 rounded-xl bg-nodeslix-accent/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                {active && !collapsed && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-full bg-nodeslix-accent" />
                )}
                <Icon size={16} className="relative z-10 shrink-0" />
                {!collapsed && <span className="relative z-10 truncate">{item.label}</span>}
              </Link>
            </Motion.div>
          );
        })}
      </nav>

      {/* Profile section */}
      <div className={['border-t border-white/[0.07] shrink-0', collapsed ? 'px-2 py-4' : 'px-4 py-4'].join(' ')}>
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-nodeslix-accent/30 to-blue-600/30 text-nodeslix-accent text-sm font-bold border border-nodeslix-accent/20">
                A
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 block size-2.5 rounded-full bg-emerald-400 border-2 border-[#0c0c0c]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white leading-tight">Administrator</p>
              <p className="text-[10px] text-emerald-400 font-medium">● Online</p>
            </div>
            <button type="button" title="Logout" className="text-nodeslix-muted hover:text-red-400 transition-colors shrink-0">
              <LogOut size={14} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-nodeslix-accent/30 to-blue-600/30 text-nodeslix-accent text-xs font-bold border border-nodeslix-accent/20">
                A
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 block size-2 rounded-full bg-emerald-400 border-2 border-[#0c0c0c]" />
            </div>
            <button type="button" title="Logout" className="text-nodeslix-muted hover:text-red-400 transition-colors">
              <LogOut size={13} />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

/* ─────────────────────────────────────────
   TOP NAVBAR
───────────────────────────────────────── */
const TopNavbar = ({ onMenuClick }) => {
  const location = useLocation();
  const activeLabel = navItems.find(n =>
    n.path === '/dashboard'
      ? location.pathname === '/dashboard' || location.pathname === '/dashboard/'
      : location.pathname.startsWith(n.path)
  )?.label ?? 'Overview';

  return (
    <header className="flex items-center justify-between h-16 px-6 border-b border-white/[0.07] bg-[#0a0a0a]/90 backdrop-blur-xl shrink-0">
      {/* Left */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onMenuClick}
          className="lg:hidden flex items-center justify-center size-9 rounded-xl border border-white/10 text-nodeslix-muted hover:text-white hover:border-white/20 transition-colors shrink-0"
        >
          <Menu size={16} />
        </button>
        <div className="min-w-0">
          <h1 className="text-sm font-bold text-white truncate">Telecom Operations Command Center</h1>
          <p className="hidden sm:block text-[10px] text-nodeslix-muted/60 truncate">
            {activeLabel} · Live Monitoring Active
          </p>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2 shrink-0">
        {/* AI Active badge */}
        <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-nodeslix-accent/25 bg-nodeslix-accent/8 px-3 py-1.5">
          <Motion.span
            animate={{ scale: [1, 1.55, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
            className="block size-1.5 rounded-full bg-nodeslix-accent"
          />
          <span className="text-[10px] font-bold text-nodeslix-accent">AI Active</span>
        </div>

        {/* Search */}
        <div className="hidden md:flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 focus-within:border-nodeslix-accent/40 transition-colors">
          <Search size={13} className="text-nodeslix-muted/60 shrink-0" />
          <input
            type="search"
            placeholder="Search..."
            className="bg-transparent text-xs text-nodeslix-muted placeholder-nodeslix-muted/40 outline-none w-28 focus:w-36 transition-all duration-300"
          />
        </div>

        {/* Notifications */}
        <button type="button" className="relative flex size-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-nodeslix-muted hover:text-white hover:border-white/20 transition-colors">
          <Bell size={14} />
          <span className="absolute top-1.5 right-1.5 block size-1.5 rounded-full bg-nodeslix-accent" />
        </button>

        {/* Profile button */}
        <button type="button" className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-2.5 py-1.5 hover:border-white/20 transition-colors">
          <div className="flex size-6 items-center justify-center rounded-full bg-gradient-to-br from-nodeslix-accent/30 to-blue-600/30 text-nodeslix-accent text-xs font-bold">
            A
          </div>
          <span className="hidden sm:block text-xs font-medium text-white">Admin</span>
          <ChevronDown size={11} className="text-nodeslix-muted" />
        </button>
      </div>
    </header>
  );
};

/* ─────────────────────────────────────────
   DASHBOARD LAYOUT
───────────────────────────────────────── */
const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  // Close mobile drawer on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile drawer open
  useEffect(() => {
    if (sidebarOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen]);

  return (
    <div className="flex h-screen bg-nodeslix-primary overflow-hidden">

      {/* ── DESKTOP SIDEBAR ── */}
      <div
        className="hidden lg:flex flex-col flex-shrink-0 h-full transition-all duration-300"
        style={{ width: sidebarCollapsed ? 70 : 280 }}
      >
        <Sidebar collapsed={sidebarCollapsed} />
      </div>

      {/* ── MOBILE DRAWER OVERLAY ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <Motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <Motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="flex flex-col h-full w-[280px]"
            >
              <Sidebar collapsed={false} onClose={() => setSidebarOpen(false)} />
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>

      {/* ── RIGHT SIDE ── */}
      <div className="flex flex-col flex-1 min-w-0 h-full">

        {/* Top Navbar */}
        <TopNavbar onMenuClick={() => setSidebarOpen(true)} />

        {/* Collapse toggle (desktop only) */}
        <div className="hidden lg:flex items-center h-8 px-4 border-b border-white/[0.04] bg-[#0a0a0a]/60">
          <button
            type="button"
            onClick={() => setSidebarCollapsed((c) => !c)}
            className="flex items-center gap-1.5 text-[10px] text-nodeslix-muted/50 hover:text-nodeslix-muted transition-colors"
          >
            <Menu size={11} />
            {sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          </button>
        </div>

        {/* ── PAGE CONTENT (Outlet) ── */}
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <Motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="h-full"
            >
              <Outlet />
            </Motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
