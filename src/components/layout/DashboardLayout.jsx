import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import logo from '../../assets/logo.png';
import {
  Activity, BarChart3, Bell, BrainCircuit, ChevronDown, CheckCircle2,
  LayoutDashboard, LogOut, Menu, Network, Search, Server,
  Settings, Sliders, Users, X, RefreshCw, User as UserIcon, Moon, Lock as LockIcon,
  HelpCircle, Command, Palette, Check
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

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

/* ─── Mock Data ─── */
const mockNotifications = [
  { id: 1, text: 'Traffic optimized', time: '2 min ago', read: false },
  { id: 2, text: 'Congestion reduced', time: '6 min ago', read: false },
  { id: 3, text: 'Node recovered', time: '11 min ago', read: false },
  { id: 4, text: 'Latency stabilized', time: '18 min ago', read: true },
  { id: 5, text: 'New engineer signed in', time: '22 min ago', read: true },
];

const searchIndex = [
  { title: 'Users', path: '/dashboard/users', type: 'Page' },
  { title: 'Analytics', path: '/dashboard/analytics', type: 'Page' },
  { title: 'Topology', path: '/dashboard/topology', type: 'Page' },
  { title: 'Operations', path: '/dashboard/operations', type: 'Page' },
  { title: 'Infrastructure', path: '/dashboard/infrastructure', type: 'Page' },
  { title: 'AI Engine', path: '/dashboard/ai-engine', type: 'Page' },
  { title: 'Settings', path: '/dashboard/settings', type: 'Page' },
  { title: 'Mesh Nodes', path: '/dashboard/topology', type: 'Widget' },
  { title: 'Latency', path: '/dashboard/analytics', type: 'Widget' },
];

/* ─────────────────────────────────────────
   SIDEBAR
───────────────────────────────────────── */
const Sidebar = ({ collapsed, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const displayName = user?.displayName || 'NodeSlix User';
  const initials    = displayName.slice(0, 2).toUpperCase();
  const photoURL    = user?.photoURL ?? null;

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
              {photoURL ? (
                <img src={photoURL} alt={displayName} className="size-9 rounded-full object-cover border border-nodeslix-accent/20" referrerPolicy="no-referrer" />
              ) : (
                <div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-nodeslix-accent/30 to-blue-600/30 text-nodeslix-accent text-sm font-bold border border-nodeslix-accent/20">
                  {initials}
                </div>
              )}
              <span className="absolute -bottom-0.5 -right-0.5 block size-2.5 rounded-full bg-emerald-400 border-2 border-[#0c0c0c]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white leading-tight truncate">{displayName}</p>
              <p className="text-[10px] text-emerald-400 font-medium">● Online</p>
            </div>
            <button
              type="button"
              title="Logout"
              onClick={() => document.dispatchEvent(new CustomEvent('open-logout'))}
              className="text-nodeslix-muted hover:text-red-400 transition-colors shrink-0"
            >
              <LogOut size={14} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              {photoURL ? (
                <img src={photoURL} alt={displayName} className="size-8 rounded-full object-cover border border-nodeslix-accent/20" referrerPolicy="no-referrer" />
              ) : (
                <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-nodeslix-accent/30 to-blue-600/30 text-nodeslix-accent text-xs font-bold border border-nodeslix-accent/20">
                  {initials}
                </div>
              )}
              <span className="absolute -bottom-0.5 -right-0.5 block size-2 rounded-full bg-emerald-400 border-2 border-[#0c0c0c]" />
            </div>
            <button
              type="button"
              title="Logout"
              onClick={() => document.dispatchEvent(new CustomEvent('open-logout'))}
              className="text-nodeslix-muted hover:text-red-400 transition-colors"
            >
              <LogOut size={13} />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

/* ─────────────────────────────────────────
   TOAST SYSTEM
───────────────────────────────────────── */
let toastId = 0;
export const addToastEvent = (title, desc = '', Icon = CheckCircle2, iconColor = 'text-emerald-400', iconBg = 'bg-emerald-500/15') => {
  document.dispatchEvent(new CustomEvent('add-toast', { detail: { title, desc, Icon, iconColor, iconBg } }));
};

const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handleAdd = (e) => {
      const id = ++toastId;
      setToasts((prev) => [...prev, { id, ...e.detail }]);
      setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
    };
    document.addEventListener('add-toast', handleAdd);
    return () => document.removeEventListener('add-toast', handleAdd);
  }, []);

  const onRemove = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <div className="fixed top-5 right-5 z-[200] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <Motion.div
            key={t.id}
            initial={{ opacity: 0, x: 60, scale: 0.92 }}
            animate={{ opacity: 1, x: 0,  scale: 1    }}
            exit={{    opacity: 0, x: 60, scale: 0.92 }}
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            className="pointer-events-auto flex items-center gap-3 pl-4 pr-3 py-3 rounded-2xl border border-white/10 bg-[#141414]/95 backdrop-blur-xl shadow-2xl min-w-[260px] max-w-[340px]"
          >
            <div className={`flex size-7 shrink-0 items-center justify-center rounded-lg ${t.iconBg}`}>
              <t.Icon size={14} className={t.iconColor} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white">{t.title}</p>
              {t.desc && <p className="text-[10px] text-nodeslix-muted/70 mt-0.5 truncate">{t.desc}</p>}
            </div>
            <button
              type="button"
              onClick={() => onRemove(t.id)}
              className="shrink-0 flex size-5 items-center justify-center rounded-md text-nodeslix-muted/40 hover:text-white transition-colors"
            >
              <X size={11} />
            </button>
          </Motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

/* ─────────────────────────────────────────
   TOP NAVBAR
───────────────────────────────────────── */
const TopNavbar = ({ onMenuClick, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const [aiOpen, setAiOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [notifications, setNotifications] = useState(mockNotifications);
  const [lastSync, setLastSync] = useState('2 seconds ago');
  const [isRefreshing, setIsRefreshing] = useState(false);

  /* Derive display name and initials from Firebase user */
  const displayName = user?.displayName || 'NodeSlix User';
  const initials    = displayName.slice(0, 2).toUpperCase();
  const userEmail   = user?.email || 'admin@nodeslix.com';
  const photoURL    = user?.photoURL ?? null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleRefreshSync = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastSync('Just now');
      setIsRefreshing(false);
    }, 600);
  };

  const activeLabel = navItems.find(n =>
    n.path === '/dashboard'
      ? location.pathname === '/dashboard' || location.pathname === '/dashboard/'
      : location.pathname.startsWith(n.path)
  )?.label ?? 'Overview';

  const filteredSearch = searchIndex.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const clearNotifications = () => {
    setNotifications([]);
    addToastEvent('Notifications cleared', 'All alerts removed from panel', CheckCircle2, 'text-emerald-400', 'bg-emerald-500/15');
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  /* Close popovers on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest('[data-popover="ai"]')) setAiOpen(false);
      if (!e.target.closest('[data-popover="search"]')) setSearchFocused(false);
      if (!e.target.closest('[data-popover="notif"]')) setNotifOpen(false);
      if (!e.target.closest('[data-popover="profile"]')) setProfileOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className="relative flex items-center justify-between h-16 px-6 border-b border-white/[0.07] bg-[#0a0a0a]/90 backdrop-blur-xl shrink-0 z-40">
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
        <div className="relative" data-popover="ai">
          <button
            type="button"
            onClick={() => { setAiOpen(!aiOpen); setNotifOpen(false); setProfileOpen(false); }}
            className={`hidden sm:flex items-center gap-1.5 rounded-full border px-3 py-1.5 transition-colors ${
              aiOpen ? 'bg-nodeslix-accent/15 border-nodeslix-accent/40' : 'bg-nodeslix-accent/8 border-nodeslix-accent/25 hover:bg-nodeslix-accent/15'
            }`}
          >
            <Motion.span
              animate={{ scale: [1, 1.55, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
              className="block size-1.5 rounded-full bg-nodeslix-accent"
            />
            <span className="text-[10px] font-bold text-nodeslix-accent">AI Active</span>
          </button>
          <AnimatePresence>
            {aiOpen && (
              <Motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-[calc(100%+12px)] w-64 rounded-2xl bg-[#141414] border border-white/10 shadow-2xl p-4 z-50"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-white">AI System Status</h3>
                  <BrainCircuit size={14} className="text-nodeslix-accent" />
                </div>
                <div className="space-y-3 mb-4">
                  {[
                    { label: 'Telemetry Engine', status: 'Healthy', color: 'text-emerald-400' },
                    { label: 'Traffic Optimization', status: 'Running', color: 'text-nodeslix-accent' },
                    { label: 'Predictive Analytics', status: 'Running', color: 'text-nodeslix-accent' },
                    { label: 'Autonomous Orchestration', status: 'Active', color: 'text-emerald-400' },
                  ].map((s) => (
                    <div key={s.label} className="flex justify-between items-center text-xs">
                      <span className="text-nodeslix-muted">{s.label}</span>
                      <span className={`font-semibold ${s.color}`}>{s.status}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center text-xs pt-2 border-t border-white/10">
                    <span className="text-nodeslix-muted">Last Sync</span>
                    <span className="text-white font-medium">{lastSync}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleRefreshSync}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-white transition-colors"
                  >
                    <Motion.div animate={{ rotate: isRefreshing ? 360 : 0 }} transition={{ duration: 0.6, repeat: isRefreshing ? Infinity : 0, ease: 'linear' }}>
                      <RefreshCw size={12} />
                    </Motion.div>
                    Refresh
                  </button>
                  <button
                    onClick={() => setAiOpen(false)}
                    className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-white transition-colors"
                  >
                    Close
                  </button>
                </div>
              </Motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Search */}
        <div className="relative hidden md:block" data-popover="search">
          <div className={`flex items-center gap-2 rounded-xl border px-3 py-2 transition-colors ${
            searchFocused ? 'border-nodeslix-accent/40 bg-white/5' : 'border-white/10 bg-white/[0.03]'
          }`}>
            <Search size={13} className="text-nodeslix-muted/60 shrink-0" />
            <input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              className="bg-transparent text-xs text-white placeholder-nodeslix-muted/40 outline-none w-28 focus:w-48 transition-all duration-300"
            />
          </div>
          <AnimatePresence>
            {searchFocused && searchQuery.length > 0 && (
              <Motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-[calc(100%+12px)] w-64 rounded-2xl bg-[#141414] border border-white/10 shadow-2xl py-2 z-50 max-h-[300px] overflow-y-auto"
              >
                {filteredSearch.length > 0 ? (
                  filteredSearch.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        navigate(item.path);
                        setSearchFocused(false);
                        setSearchQuery('');
                        addToastEvent('Search navigated', `Went to ${item.title}`, Search, 'text-nodeslix-accent', 'bg-nodeslix-accent/15');
                      }}
                      className="w-full flex items-center justify-between px-4 py-2 hover:bg-white/5 transition-colors text-left"
                    >
                      <span className="text-xs font-medium text-white">{item.title}</span>
                      <span className="text-[10px] text-nodeslix-muted">{item.type}</span>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-xs text-nodeslix-muted text-center">
                    No results found.
                  </div>
                )}
              </Motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Notifications */}
        <div className="relative" data-popover="notif">
          <button
            type="button"
            onClick={() => { setNotifOpen(!notifOpen); setAiOpen(false); setProfileOpen(false); }}
            className={`relative flex size-9 items-center justify-center rounded-xl border transition-colors ${
              notifOpen ? 'bg-white/10 border-white/20 text-white' : 'border-white/10 bg-white/[0.03] text-nodeslix-muted hover:text-white hover:border-white/20'
            }`}
          >
            <Bell size={14} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex size-2 rounded-full bg-nodeslix-accent items-center justify-center">
                <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-nodeslix-accent" />
              </span>
            )}
          </button>
          <AnimatePresence>
            {notifOpen && (
              <Motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-[calc(100%+12px)] w-72 rounded-2xl bg-[#141414] border border-white/10 shadow-2xl overflow-hidden z-50"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                  <h3 className="text-sm font-bold text-white">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="text-[10px] bg-nodeslix-accent/20 text-nodeslix-accent px-2 py-0.5 rounded-full font-bold">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                <div className="max-h-[280px] overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((n) => (
                      <div key={n.id} className={`flex flex-col px-4 py-3 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors ${!n.read ? 'bg-white/[0.02]' : ''}`}>
                        <span className={`text-xs ${!n.read ? 'font-bold text-white' : 'font-medium text-nodeslix-muted'}`}>
                          {n.text}
                        </span>
                        <span className="text-[10px] text-nodeslix-muted/60 mt-1">{n.time}</span>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-6 text-center">
                      <Bell size={24} className="mx-auto text-nodeslix-muted/30 mb-2" />
                      <p className="text-xs text-nodeslix-muted">You're all caught up!</p>
                    </div>
                  )}
                </div>
                {notifications.length > 0 && (
                  <div className="flex border-t border-white/5">
                    <button
                      onClick={markAllRead}
                      className="flex-1 py-2.5 text-xs font-semibold text-nodeslix-muted hover:text-white hover:bg-white/5 transition-colors"
                    >
                      Mark all as read
                    </button>
                    <div className="w-px bg-white/5" />
                    <button
                      onClick={clearNotifications}
                      className="flex-1 py-2.5 text-xs font-semibold text-nodeslix-muted hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      Clear All
                    </button>
                  </div>
                )}
              </Motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile button */}
        <div className="relative" data-popover="profile">
          <button
            type="button"
            onClick={() => { setProfileOpen(!profileOpen); setAiOpen(false); setNotifOpen(false); }}
            className={`flex items-center gap-2 rounded-xl border px-2.5 py-1.5 transition-colors ${
              profileOpen ? 'bg-white/10 border-white/20' : 'border-white/10 bg-white/[0.03] hover:border-white/20'
            }`}
          >
            {photoURL ? (
              <img src={photoURL} alt={displayName} className="size-6 rounded-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <div className="flex size-6 items-center justify-center rounded-full bg-gradient-to-br from-nodeslix-accent/30 to-blue-600/30 text-nodeslix-accent text-[10px] font-bold">
                {initials}
              </div>
            )}
            <span className="hidden sm:block text-xs font-medium text-white max-w-[100px] truncate">{displayName}</span>
            <ChevronDown size={11} className="text-nodeslix-muted" />
          </button>
          <AnimatePresence>
            {profileOpen && (
              <Motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-[calc(100%+12px)] w-52 rounded-2xl bg-[#141414] border border-white/10 shadow-2xl overflow-hidden z-50 py-1"
              >
                <div className="px-4 py-3 border-b border-white/5 mb-1 flex items-center gap-3">
                  {photoURL ? (
                    <img src={photoURL} alt={displayName} className="size-8 rounded-full object-cover shrink-0" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-nodeslix-accent/30 to-blue-600/30 text-nodeslix-accent text-xs font-bold">
                      {initials}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">{displayName}</p>
                    <p className="text-[10px] text-nodeslix-muted truncate">{userEmail}</p>
                  </div>
                </div>
                {[
                  { label: 'View Profile', icon: UserIcon, action: 'profile' },
                  { label: 'Account Settings', icon: Settings, action: 'settings' },
                  { label: 'Change Password', icon: LockIcon, action: 'password' },
                  { label: 'Dashboard Preferences', icon: Sliders, action: 'prefs' },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      setProfileOpen(false);
                      document.dispatchEvent(new CustomEvent(`open-${item.action}`));
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-nodeslix-muted hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <item.icon size={13} />
                    {item.label}
                  </button>
                ))}
                
                <div className="mx-3 my-1 border-t border-white/5" />
                
                {/* Theme toggle dummy */}
                <button
                  className="w-full flex items-center justify-between px-4 py-2 text-xs text-nodeslix-muted hover:text-white hover:bg-white/5 transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <Moon size={13} />
                    Theme (Dark)
                  </div>
                  <span className="text-[9px] bg-white/10 px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">Locked</span>
                </button>

                <button
                  onClick={() => { setProfileOpen(false); document.dispatchEvent(new CustomEvent('open-help')); }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-nodeslix-muted hover:text-white hover:bg-white/5 transition-colors"
                >
                  <HelpCircle size={13} />
                  Help Center
                </button>

                <div className="mx-3 my-1 border-t border-white/5" />

                <button
                  onClick={() => { setProfileOpen(false); document.dispatchEvent(new CustomEvent('open-logout')); }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut size={13} />
                  Logout
                </button>
              </Motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

/* ─────────────────────────────────────────
   PROFILE MODALS / DRAWERS
───────────────────────────────────────── */

const ModalOverlay = ({ children, onClose }) => (
  <Motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
    onClick={onClose}
  >
    {children}
  </Motion.div>
);

/* ─── Helpers for Firebase User Data ─── */
const getProviderLabel = (user) => {
  const provider = user?.providerData?.[0]?.providerId;
  if (provider === 'password') return 'Email & Password';
  if (provider === 'google.com') return 'Google';
  return 'Firebase Auth';
};

const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }) + ' — ' + d.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (e) {
    return dateStr;
  }
};

const ViewProfileModal = ({ onClose }) => {
  const { user } = useAuth();
  useEffect(() => {
    addToastEvent('Profile opened', 'Viewing administrator details', UserIcon, 'text-nodeslix-accent', 'bg-nodeslix-accent/15');
  }, []);

  const displayName = user?.displayName || 'NodeSlix User';
  const initials    = displayName.slice(0, 2).toUpperCase();
  const userEmail   = user?.email || 'admin@nodeslix.com';
  const photoURL    = user?.photoURL ?? null;
  const provider    = getProviderLabel(user);
  const created     = formatDate(user?.metadata?.creationTime);
  const lastLogin   = formatDate(user?.metadata?.lastSignInTime);
  const uid         = user?.uid || 'N/A';

  return (
    <ModalOverlay onClose={onClose}>
      <Motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[400px] bg-[#0e0e0e] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
          <h3 className="text-base font-bold text-white">View Profile</h3>
          <button onClick={onClose} className="text-nodeslix-muted hover:text-white transition-colors">
            <X size={16} />
          </button>
        </div>
        <div className="p-6 flex flex-col items-center gap-4 border-b border-white/5">
          <div className="relative">
            {photoURL ? (
              <img src={photoURL} alt={displayName} className="size-20 rounded-2xl object-cover border border-nodeslix-accent/20" referrerPolicy="no-referrer" />
            ) : (
              <div className="flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-nodeslix-accent/30 to-blue-600/30 text-nodeslix-accent text-2xl font-bold border border-nodeslix-accent/20">
                {initials}
              </div>
            )}
            <span className="absolute -bottom-1 -right-1 block size-4 rounded-full bg-emerald-400 border-[3px] border-[#0e0e0e]" />
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-white">{displayName}</p>
            <p className="text-xs text-nodeslix-muted">{userEmail}</p>
          </div>
        </div>
        <div className="p-6 space-y-3.5">
          <div className="flex justify-between text-xs">
            <span className="text-nodeslix-muted">Status</span>
            <span className="text-emerald-400 font-semibold">Online</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-nodeslix-muted">Authentication Provider</span>
            <span className="text-white font-medium">{provider}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-nodeslix-muted">Account Created</span>
            <span className="text-white font-medium">{created}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-nodeslix-muted">Last Login</span>
            <span className="text-white font-medium">{lastLogin}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-nodeslix-muted">UID</span>
            <span className="text-nodeslix-muted/80 font-mono select-all">{uid}</span>
          </div>
        </div>
        <div className="p-6 pt-0">
          <button onClick={onClose} className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-colors">
            Close
          </button>
        </div>
      </Motion.div>
    </ModalOverlay>
  );
};

const AccountSettingsModal = ({ onClose }) => {
  const { user, updateUserProfile } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || 'NodeSlix User');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async (e) => {
    e.preventDefault();
    if (!displayName.trim()) {
      setError('Display name is required');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      await updateUserProfile(displayName.trim(), photoURL.trim() || null);
      addToastEvent('Settings saved', 'Account info updated in Firebase', CheckCircle2, 'text-emerald-400', 'bg-emerald-500/15');
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ModalOverlay onClose={onClose}>
      <Motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[420px] bg-[#0e0e0e] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
      >
        <form onSubmit={handleSave}>
          <div className="px-6 py-5 border-b border-white/5">
            <h3 className="text-base font-bold text-white">Account Settings</h3>
          </div>
          <div className="p-6 space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                {error}
              </div>
            )}
            <div className="space-y-1.5">
              <label className="text-xs text-nodeslix-muted">Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-nodeslix-accent/50 bg-[#121212]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-nodeslix-muted">Photo URL</label>
              <input
                type="text"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-nodeslix-accent/50 bg-[#121212]"
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
          </div>
          <div className="flex gap-3 px-6 pb-6">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="flex-1 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-nodeslix-muted hover:text-white text-xs font-semibold transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-2.5 rounded-xl bg-[#00D4FF] text-[#0A0A0A] hover:bg-[#00D4FF]/90 text-xs font-bold transition-colors disabled:opacity-50"
            >
              {submitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </Motion.div>
    </ModalOverlay>
  );
};

const ChangePasswordModal = ({ onClose }) => {
  const { updateUserPassword } = useAuth();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      await updateUserPassword(newPassword);
      addToastEvent('Password changed', 'Security credentials updated in Firebase', CheckCircle2, 'text-emerald-400', 'bg-emerald-500/15');
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to update password');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ModalOverlay onClose={onClose}>
      <Motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[420px] bg-[#0e0e0e] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
      >
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-5 border-b border-white/5">
            <h3 className="text-base font-bold text-white">Change Password</h3>
          </div>
          <div className="p-6 space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                {error}
              </div>
            )}
            <div className="space-y-1.5">
              <label className="text-xs text-nodeslix-muted">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-nodeslix-accent/50 bg-[#121212]"
                placeholder="Min. 8 characters"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-nodeslix-muted">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-nodeslix-accent/50 bg-[#121212]"
                placeholder="Re-enter password"
              />
            </div>
          </div>
          <div className="flex gap-3 px-6 pb-6">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="flex-1 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-nodeslix-muted hover:text-white text-xs font-semibold transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-2.5 rounded-xl bg-[#00D4FF] text-[#0A0A0A] hover:bg-[#00D4FF]/90 text-xs font-bold transition-colors disabled:opacity-50"
            >
              {submitting ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </Motion.div>
    </ModalOverlay>
  );
};

const PreferencesDrawer = ({ onClose }) => {
  const [density, setDensity] = useState('Compact');
  
  const handleSave = () => {
    addToastEvent('Preferences updated', 'Dashboard layout refreshed', Sliders, 'text-nodeslix-accent', 'bg-nodeslix-accent/15');
    onClose();
  };

  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[150] bg-black/55 backdrop-blur-sm"
      onClick={onClose}
    >
      <Motion.aside
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="absolute inset-y-0 right-0 w-full max-w-[360px] bg-[#0e0e0e] border-l border-white/[0.08] flex flex-col overflow-y-auto"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 shrink-0">
          <h3 className="text-base font-bold text-white">Dashboard Preferences</h3>
          <button onClick={onClose} className="text-nodeslix-muted hover:text-white transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 p-6 space-y-6">
          <div className="space-y-3">
            <label className="text-xs font-semibold text-nodeslix-muted uppercase tracking-wider">Layout Mode</label>
            <div className="grid grid-cols-2 gap-3">
              {['Compact Mode', 'Expanded Mode'].map((m) => (
                <button
                  key={m}
                  onClick={() => setDensity(m === 'Compact Mode' ? 'Compact' : 'Expanded')}
                  className={`py-3 rounded-xl border text-xs font-medium transition-colors ${
                    (m === 'Compact Mode' && density === 'Compact') || (m === 'Expanded Mode' && density === 'Expanded')
                    ? 'bg-nodeslix-accent/15 border-nodeslix-accent/40 text-nodeslix-accent'
                    : 'bg-white/5 border-white/10 text-nodeslix-muted hover:text-white'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-semibold text-nodeslix-muted uppercase tracking-wider">Widget Density</label>
            <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none appearance-none">
              <option>High Density</option>
              <option>Standard</option>
              <option>Spacious</option>
            </select>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-semibold text-nodeslix-muted uppercase tracking-wider">Default Landing Page</label>
            <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none appearance-none">
              <option>Overview</option>
              <option>Topology</option>
              <option>Operations</option>
            </select>
          </div>
        </div>

        <div className="p-6 border-t border-white/5 shrink-0 flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/10 bg-white/5 text-nodeslix-muted hover:text-white text-xs font-semibold transition-colors">
            Cancel
          </button>
          <button onClick={handleSave} className="flex-1 py-2.5 rounded-xl bg-nodeslix-accent/15 border border-nodeslix-accent/30 text-nodeslix-accent hover:bg-nodeslix-accent/25 text-xs font-bold transition-colors">
            Apply
          </button>
        </div>
      </Motion.aside>
    </Motion.div>
  );
};

const HelpCenterModal = ({ onClose }) => (
  <ModalOverlay onClose={onClose}>
    <Motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      onClick={(e) => e.stopPropagation()}
      className="w-full max-w-[500px] bg-[#0e0e0e] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
    >
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <HelpCircle size={18} className="text-nodeslix-accent" />
          Help Center
        </h3>
        <button onClick={onClose} className="text-nodeslix-muted hover:text-white transition-colors">
          <X size={16} />
        </button>
      </div>
      <div className="p-6 grid grid-cols-2 gap-4">
        {[
          { label: 'Documentation', desc: 'Platform guides', icon: Menu },
          { label: 'Support', desc: 'Contact 24/7 team', icon: Users },
          { label: 'Keyboard Shortcuts', desc: 'Speed up workflow', icon: Command },
          { label: 'System Version', desc: 'v3.12.1', icon: Server },
        ].map((item) => (
          <button key={item.label} onClick={() => { addToastEvent(`Opened ${item.label}`, '', item.icon, 'text-nodeslix-accent', 'bg-nodeslix-accent/15'); onClose(); }} className="flex flex-col items-start gap-2 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-left">
            <item.icon size={20} className="text-nodeslix-muted" />
            <div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="text-[10px] text-nodeslix-muted">{item.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </Motion.div>
  </ModalOverlay>
);

const LogoutModal = ({ onClose, onConfirm }) => (
  <ModalOverlay onClose={onClose}>
    <Motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      onClick={(e) => e.stopPropagation()}
      className="w-full max-w-[360px] bg-[#0e0e0e] border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-center p-6"
    >
      <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20 mb-4">
        <LogOut size={20} className="text-red-400" />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">Sign out?</h3>
      <p className="text-sm text-nodeslix-muted mb-6">Are you sure you want to end your session? You will be returned to the home screen.</p>
      
      <div className="flex gap-3">
        <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-colors">
          Cancel
        </button>
        <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-red-500/15 border border-red-500/30 hover:bg-red-500/25 text-red-400 text-xs font-bold transition-colors">
          Logout
        </button>
      </div>
    </Motion.div>
  </ModalOverlay>
);

/* ─────────────────────────────────────────
   DASHBOARD LAYOUT
───────────────────────────────────────── */
const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Modals state
  const [activeModal, setActiveModal] = useState(null); // 'profile', 'settings', 'password', 'prefs', 'help', 'logout'

  useEffect(() => {
    const handleProfile = () => setActiveModal('profile');
    const handleSettings = () => setActiveModal('settings');
    const handlePassword = () => setActiveModal('password');
    const handlePrefs = () => setActiveModal('prefs');
    const handleHelp = () => setActiveModal('help');
    const handleLogout = () => setActiveModal('logout');

    document.addEventListener('open-profile', handleProfile);
    document.addEventListener('open-settings', handleSettings);
    document.addEventListener('open-password', handlePassword);
    document.addEventListener('open-prefs', handlePrefs);
    document.addEventListener('open-help', handleHelp);
    document.addEventListener('open-logout', handleLogout);

    return () => {
      document.removeEventListener('open-profile', handleProfile);
      document.removeEventListener('open-settings', handleSettings);
      document.removeEventListener('open-password', handlePassword);
      document.removeEventListener('open-prefs', handlePrefs);
      document.removeEventListener('open-help', handleHelp);
      document.removeEventListener('open-logout', handleLogout);
    };
  }, []);

  const handleLogoutConfirm = async () => {
    setActiveModal(null);
    await logout(); // Firebase signOut → redirects to /
  };

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
      
      {/* ── GLOBAL TOASTS ── */}
      <ToastContainer />

      {/* ── MODALS ── */}
      <AnimatePresence>
        {activeModal === 'profile' && <ViewProfileModal onClose={() => setActiveModal(null)} />}
        {activeModal === 'settings' && <AccountSettingsModal onClose={() => setActiveModal(null)} />}
        {activeModal === 'password' && <ChangePasswordModal onClose={() => setActiveModal(null)} />}
        {activeModal === 'prefs' && <PreferencesDrawer onClose={() => setActiveModal(null)} />}
        {activeModal === 'help' && <HelpCenterModal onClose={() => setActiveModal(null)} />}
        {activeModal === 'logout' && <LogoutModal onClose={() => setActiveModal(null)} onConfirm={handleLogoutConfirm} />}
      </AnimatePresence>

      {/* ── DESKTOP SIDEBAR ── */}
      <div
        className="hidden lg:flex flex-col flex-shrink-0 h-full transition-all duration-300 relative z-30"
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
      <div className="flex flex-col flex-1 min-w-0 h-full relative z-20">

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
        <main className="flex-1 overflow-y-auto z-10">
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
