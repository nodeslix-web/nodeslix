import { useState } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { MoreHorizontal, Plus, Search, Shield, UserCheck, UserMinus, UserPlus, Users } from 'lucide-react';

/* ─── Mock Data ─── */
const users = [
  { id: 1, name: 'Alex Hartman',    email: 'a.hartman@nodeslix.io',  role: 'Admin',    status: 'Active',   region: 'Global',    lastSeen: 'Just now',  avatar: 'AH' },
  { id: 2, name: 'Priya Sharma',    email: 'p.sharma@nodeslix.io',   role: 'Operator', status: 'Active',   region: 'Region 1',  lastSeen: '3m ago',    avatar: 'PS' },
  { id: 3, name: 'Marco Ruiz',      email: 'm.ruiz@nodeslix.io',     role: 'Engineer', status: 'Active',   region: 'Region 3',  lastSeen: '8m ago',    avatar: 'MR' },
  { id: 4, name: 'Yuki Tanaka',     email: 'y.tanaka@nodeslix.io',   role: 'Operator', status: 'Active',   region: 'Region 2',  lastSeen: '12m ago',   avatar: 'YT' },
  { id: 5, name: 'Finn Larsen',     email: 'f.larsen@nodeslix.io',   role: 'Engineer', status: 'Inactive', region: 'Region 4',  lastSeen: '2h ago',    avatar: 'FL' },
  { id: 6, name: 'Aisha Nkosi',     email: 'a.nkosi@nodeslix.io',    role: 'Admin',    status: 'Active',   region: 'Global',    lastSeen: '15m ago',   avatar: 'AN' },
  { id: 7, name: 'Soren Beck',      email: 's.beck@nodeslix.io',     role: 'Engineer', status: 'Active',   region: 'Region 5',  lastSeen: '22m ago',   avatar: 'SB' },
  { id: 8, name: 'Lena Vogel',      email: 'l.vogel@nodeslix.io',    role: 'Operator', status: 'Inactive', region: 'Region 1',  lastSeen: '1d ago',    avatar: 'LV' },
  { id: 9, name: 'Tariq Al-Amin',   email: 't.alamin@nodeslix.io',   role: 'Engineer', status: 'Active',   region: 'Region 3',  lastSeen: '5m ago',    avatar: 'TA' },
  { id: 10, name: 'Ines Carvalho',  email: 'i.carvalho@nodeslix.io', role: 'Operator', status: 'Active',   region: 'Region 2',  lastSeen: '1m ago',    avatar: 'IC' },
];

const roleConfig = {
  Admin:    { text: 'text-nodeslix-accent', bg: 'bg-nodeslix-accent/10', border: 'border-nodeslix-accent/25', icon: Shield     },
  Operator: { text: 'text-amber-400',       bg: 'bg-amber-500/10',        border: 'border-amber-500/25',       icon: UserCheck  },
  Engineer: { text: 'text-violet-400',      bg: 'bg-violet-500/10',       border: 'border-violet-500/25',      icon: Users      },
};

const statusDot = {
  Active:   'bg-emerald-400',
  Inactive: 'bg-nodeslix-muted/30',
};

const avatarColors = [
  'from-nodeslix-accent/30 to-blue-600/30 text-nodeslix-accent',
  'from-violet-500/30 to-blue-600/30 text-violet-400',
  'from-amber-500/30 to-orange-600/30 text-amber-400',
  'from-emerald-500/30 to-teal-600/30 text-emerald-400',
];

/* ─────────────────────────────────────────
   USERS PAGE
───────────────────────────────────────── */
const UsersPage = () => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [openMenu, setOpenMenu] = useState(null);

  const roles = ['All', 'Admin', 'Operator', 'Engineer'];

  const filtered = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'All' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const counts = {
    total:    users.length,
    active:   users.filter((u) => u.status === 'Active').length,
    admins:   users.filter((u) => u.role === 'Admin').length,
    inactive: users.filter((u) => u.status === 'Inactive').length,
  };

  return (
    <div className="p-5 md:p-6 space-y-7">
      {/* Page Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="section-kicker">Users</p>
          <h1 className="text-2xl font-extrabold text-white mt-1">User Management</h1>
          <p className="text-sm text-nodeslix-muted mt-1">Manage operator access, roles, and permissions across all regions.</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-nodeslix-accent/15 border border-nodeslix-accent/30 text-nodeslix-accent text-xs font-bold hover:bg-nodeslix-accent/25 transition-all duration-200 shrink-0"
        >
          <UserPlus size={14} /> Invite User
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total Users',   value: counts.total,    color: 'text-white',             icon: Users      },
          { label: 'Active Now',    value: counts.active,   color: 'text-emerald-400',       icon: UserCheck  },
          { label: 'Admins',        value: counts.admins,   color: 'text-nodeslix-accent',   icon: Shield     },
          { label: 'Inactive',      value: counts.inactive, color: 'text-nodeslix-muted/60', icon: UserMinus  },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <Motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="surface-card p-4 flex items-center gap-4"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] text-nodeslix-muted">
                <Icon size={16} />
              </div>
              <div>
                <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
                <p className="text-[10px] text-nodeslix-muted/60 uppercase tracking-widest mt-0.5">{s.label}</p>
              </div>
            </Motion.div>
          );
        })}
      </div>

      {/* Filters & search */}
      <div className="flex flex-wrap gap-3 items-center">
        {/* Search */}
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 focus-within:border-nodeslix-accent/40 transition-colors min-w-[200px]">
          <Search size={13} className="text-nodeslix-muted/60 shrink-0" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
            className="bg-transparent text-xs text-white placeholder-nodeslix-muted/40 outline-none flex-1"
          />
        </div>
        {/* Role filter */}
        <div className="flex gap-1.5">
          {roles.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRoleFilter(r)}
              className={[
                'px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all duration-200',
                roleFilter === r
                  ? 'bg-nodeslix-accent/15 border-nodeslix-accent/40 text-nodeslix-accent'
                  : 'border-white/10 text-nodeslix-muted hover:border-white/20 hover:text-white',
              ].join(' ')}
            >{r}</button>
          ))}
        </div>
      </div>

      {/* Users table */}
      <div className="surface-card overflow-hidden">
        {/* Header */}
        <div className="hidden md:grid grid-cols-[1fr_180px_120px_100px_80px] items-center px-5 py-3.5 border-b border-white/[0.07] text-[10px] font-bold uppercase tracking-widest text-nodeslix-muted/50">
          <span>User</span>
          <span>Region</span>
          <span>Role</span>
          <span>Status</span>
          <span className="text-right">Actions</span>
        </div>

        {/* Rows */}
        <AnimatePresence>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <Users size={28} className="text-nodeslix-muted/30" />
              <p className="text-sm text-nodeslix-muted/50">No users match your search</p>
            </div>
          ) : (
            filtered.map((user, i) => {
              const rc = roleConfig[user.role];
              const RoleIcon = rc.icon;
              const avColor = avatarColors[i % avatarColors.length];
              return (
                <Motion.div
                  key={user.id}
                  layout
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ duration: 0.25, delay: i * 0.04 }}
                  className="grid grid-cols-[1fr] md:grid-cols-[1fr_180px_120px_100px_80px] items-center px-5 py-4 border-b border-white/[0.05] last:border-0 hover:bg-white/[0.02] transition-colors gap-y-2 md:gap-y-0"
                >
                  {/* User info */}
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <div className={`flex size-9 items-center justify-center rounded-full bg-gradient-to-br ${avColor} text-xs font-extrabold border border-white/10`}>
                        {user.avatar}
                      </div>
                      <span className={`absolute -bottom-0.5 -right-0.5 block size-2.5 rounded-full border-2 border-[#121212] ${statusDot[user.status]}`} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{user.name}</p>
                      <p className="text-[10px] text-nodeslix-muted/60">{user.email}</p>
                    </div>
                  </div>

                  {/* Region */}
                  <span className="text-xs text-nodeslix-muted md:block">{user.region}</span>

                  {/* Role */}
                  <div className="flex">
                    <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full border ${rc.text} ${rc.bg} ${rc.border}`}>
                      <RoleIcon size={10} />
                      {user.role}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-2">
                    <span className={`block size-1.5 rounded-full ${statusDot[user.status]}`} />
                    <span className="text-xs text-nodeslix-muted">{user.status}</span>
                  </div>

                  {/* Action menu */}
                  <div className="flex justify-end relative">
                    <button
                      type="button"
                      onClick={() => setOpenMenu(openMenu === user.id ? null : user.id)}
                      className="flex size-7 items-center justify-center rounded-lg border border-white/10 text-nodeslix-muted hover:text-white hover:border-white/20 transition-colors"
                    >
                      <MoreHorizontal size={14} />
                    </button>
                    <AnimatePresence>
                      {openMenu === user.id && (
                        <Motion.div
                          initial={{ opacity: 0, scale: 0.92, y: -4 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.92 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 top-9 z-20 w-36 rounded-xl border border-white/12 bg-[#141414] shadow-2xl overflow-hidden"
                        >
                          {['View Profile', 'Edit Role', 'Reset Access', 'Deactivate'].map((action, j) => (
                            <button
                              key={action}
                              type="button"
                              onClick={() => setOpenMenu(null)}
                              className={[
                                'w-full text-left px-4 py-2.5 text-xs transition-colors',
                                j === 3
                                  ? 'text-red-400 hover:bg-red-500/10'
                                  : 'text-nodeslix-muted hover:bg-white/[0.04] hover:text-white',
                              ].join(' ')}
                            >{action}</button>
                          ))}
                        </Motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      <div className="h-4" />
    </div>
  );
};

export default UsersPage;
