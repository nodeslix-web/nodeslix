import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import {
  CheckCircle2, Eye, KeyRound, Lock, MoreHorizontal,
  Search, Shield, UserCheck, UserMinus, UserPlus,
  UserX, Users, X, ChevronDown, MapPin, Clock,
  Server, Wifi, RadioTower,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

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

/* ─────────────────────────────────────────
   MOCK DATA
───────────────────────────────────────── */
const INITIAL_USERS = [
  {
    id: 1, name: 'Alex Hartman',  email: 'a.hartman@nodeslix.io', role: 'Admin',    status: 'Active',
    region: 'Global',   lastSeen: 'Just now', avatar: 'AH',
    lastLogin: 'Jun 20, 2026 — 10:51 AM', infrastructure: ['Core DC-1', '5G Tower Grid', 'Mesh Network Alpha'],
  },
  {
    id: 2, name: 'Priya Sharma',  email: 'p.sharma@nodeslix.io',  role: 'Operator', status: 'Active',
    region: 'Region 1', lastSeen: '3m ago',    avatar: 'PS',
    lastLogin: 'Jun 20, 2026 — 10:48 AM', infrastructure: ['Region 1 Mesh', 'Edge GW-01'],
  },
  {
    id: 3, name: 'Marco Ruiz',    email: 'm.ruiz@nodeslix.io',    role: 'Engineer', status: 'Active',
    region: 'Region 3', lastSeen: '8m ago',    avatar: 'MR',
    lastLogin: 'Jun 20, 2026 — 10:43 AM', infrastructure: ['Region 3 5G', 'IoT Cluster B'],
  },
  {
    id: 4, name: 'Yuki Tanaka',   email: 'y.tanaka@nodeslix.io',  role: 'Operator', status: 'Active',
    region: 'Region 2', lastSeen: '12m ago',   avatar: 'YT',
    lastLogin: 'Jun 20, 2026 — 10:39 AM', infrastructure: ['Region 2 Mesh', 'Edge GW-04'],
  },
  {
    id: 5, name: 'Finn Larsen',   email: 'f.larsen@nodeslix.io',  role: 'Engineer', status: 'Inactive',
    region: 'Region 4', lastSeen: '2h ago',    avatar: 'FL',
    lastLogin: 'Jun 20, 2026 — 08:51 AM', infrastructure: ['Region 4 Mesh'],
  },
  {
    id: 6, name: 'Aisha Nkosi',   email: 'a.nkosi@nodeslix.io',   role: 'Admin',    status: 'Active',
    region: 'Global',   lastSeen: '15m ago',   avatar: 'AN',
    lastLogin: 'Jun 20, 2026 — 10:36 AM', infrastructure: ['Core DC-2', 'Monitoring Platform'],
  },
  {
    id: 7, name: 'Soren Beck',    email: 's.beck@nodeslix.io',    role: 'Engineer', status: 'Active',
    region: 'Region 5', lastSeen: '22m ago',   avatar: 'SB',
    lastLogin: 'Jun 20, 2026 — 10:29 AM', infrastructure: ['Region 5 5G', 'Edge GW-07'],
  },
  {
    id: 8, name: 'Lena Vogel',    email: 'l.vogel@nodeslix.io',   role: 'Operator', status: 'Inactive',
    region: 'Region 1', lastSeen: '1d ago',    avatar: 'LV',
    lastLogin: 'Jun 19, 2026 — 04:12 PM', infrastructure: ['Region 1 IoT'],
  },
  {
    id: 9, name: 'Tariq Al-Amin', email: 't.alamin@nodeslix.io',  role: 'Engineer', status: 'Active',
    region: 'Region 3', lastSeen: '5m ago',    avatar: 'TA',
    lastLogin: 'Jun 20, 2026 — 10:46 AM', infrastructure: ['Region 3 Core', 'Mesh Segment 44'],
  },
  {
    id: 10, name: 'Ines Carvalho', email: 'i.carvalho@nodeslix.io', role: 'Operator', status: 'Active',
    region: 'Region 2', lastSeen: '1m ago',    avatar: 'IC',
    lastLogin: 'Jun 20, 2026 — 10:50 AM', infrastructure: ['Region 2 5G', 'Edge GW-05'],
  },
];

const ALL_ROLES = ['Administrator', 'Engineer', 'Operator', 'Analyst'];

const roleConfig = {
  Admin:        { text: 'text-nodeslix-accent', bg: 'bg-nodeslix-accent/10', border: 'border-nodeslix-accent/25', icon: Shield    },
  Administrator:{ text: 'text-nodeslix-accent', bg: 'bg-nodeslix-accent/10', border: 'border-nodeslix-accent/25', icon: Shield    },
  Operator:     { text: 'text-amber-400',        bg: 'bg-amber-500/10',       border: 'border-amber-500/25',       icon: UserCheck },
  Engineer:     { text: 'text-violet-400',       bg: 'bg-violet-500/10',      border: 'border-violet-500/25',      icon: Users     },
  Analyst:      { text: 'text-blue-400',         bg: 'bg-blue-500/10',        border: 'border-blue-500/25',        icon: Search    },
};

const getRoleConfig = (role) => roleConfig[role] ?? roleConfig.Operator;

const statusDot  = { Active: 'bg-emerald-400', Inactive: 'bg-nodeslix-muted/30' };

const avatarColors = [
  'from-nodeslix-accent/30 to-blue-600/30 text-nodeslix-accent',
  'from-violet-500/30 to-blue-600/30 text-violet-400',
  'from-amber-500/30 to-orange-600/30 text-amber-400',
  'from-emerald-500/30 to-teal-600/30 text-emerald-400',
];

const infraIcons = [Server, Wifi, RadioTower];

/* ─────────────────────────────────────────
   TOAST SYSTEM
───────────────────────────────────────── */
let toastId = 0;

const ToastContainer = ({ toasts, onRemove }) => (
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

/* ─────────────────────────────────────────
   PROFILE DRAWER
───────────────────────────────────────── */
const ProfileDrawer = ({ user, onClose }) => {
  const isMe = user.id === 'current-user';
  const avColor = isMe ? avatarColors[0] : avatarColors[user.id % avatarColors.length];
  const rc = getRoleConfig(user.role);
  const RoleIcon = rc.icon;

  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[100] bg-black/55 backdrop-blur-sm"
      onClick={onClose}
    >
      <Motion.aside
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="absolute inset-y-0 right-0 w-full max-w-[400px] bg-[#0e0e0e] border-l border-white/[0.08] flex flex-col overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.07] shrink-0">
          <div>
            <p className="section-kicker">User Profile</p>
            <p className="text-sm font-bold text-white mt-0.5">Account Details</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-xl border border-white/10 text-nodeslix-muted hover:text-white hover:border-white/20 transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        {/* Avatar + name */}
        <div className="flex flex-col items-center gap-3 py-8 px-6 border-b border-white/[0.06]">
          <div className="relative">
            {user.avatarURL ? (
              <img src={user.avatarURL} alt={user.name} className="size-20 rounded-2xl object-cover border border-white/12 shadow-xl" referrerPolicy="no-referrer" />
            ) : (
              <div className={`flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br ${avColor} text-xl font-extrabold border border-white/12 shadow-xl`}>
                {user.avatar}
              </div>
            )}
            <span className={`absolute -bottom-1 -right-1 block size-4 rounded-full border-[3px] border-[#0e0e0e] ${statusDot[user.status]}`} />
          </div>
          <div className="text-center">
            <p className="text-lg font-extrabold text-white">{user.name}</p>
            <p className="text-xs text-nodeslix-muted/70 mt-0.5">{user.email}</p>
          </div>
          <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-3 py-1 rounded-full border ${rc.text} ${rc.bg} ${rc.border}`}>
            <RoleIcon size={10} /> {user.role}
          </span>
        </div>

        {/* Details */}
        <div className="flex-1 px-6 py-5 space-y-5">
          {/* Info rows */}
          <div className="space-y-0 surface-card overflow-hidden divide-y divide-white/[0.05]">
            {isMe ? (
              <>
                <div className="flex items-center gap-3 px-4 py-3">
                  <Shield size={13} className="text-nodeslix-muted/50 shrink-0" />
                  <span className="text-xs text-nodeslix-muted flex-1">Authentication Provider</span>
                  <span className="text-xs font-semibold text-white">{user.provider}</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-3">
                  <Clock size={13} className="text-nodeslix-muted/50 shrink-0" />
                  <span className="text-xs text-nodeslix-muted flex-1">Account Created</span>
                  <span className="text-xs font-semibold text-white">{user.created}</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-3">
                  <Lock size={13} className="text-nodeslix-muted/50 shrink-0" />
                  <span className="text-xs text-nodeslix-muted flex-1">Last Login</span>
                  <span className="text-xs font-semibold text-nodeslix-muted/70">{user.lastLogin}</span>
                </div>
              </>
            ) : (
              [
                { icon: Shield,   label: 'Status',      value: user.status,    valueColor: user.status === 'Active' ? 'text-emerald-400' : 'text-nodeslix-muted/60' },
                { icon: MapPin,   label: 'Region',      value: user.region,    valueColor: 'text-white' },
                { icon: Clock,    label: 'Last Seen',   value: user.lastSeen,  valueColor: 'text-white' },
                { icon: Lock,     label: 'Last Login',  value: user.lastLogin, valueColor: 'text-nodeslix-muted/70' },
              ].map((row) => {
                const RowIcon = row.icon;
                return (
                  <div key={row.label} className="flex items-center gap-3 px-4 py-3">
                    <RowIcon size={13} className="text-nodeslix-muted/50 shrink-0" />
                    <span className="text-xs text-nodeslix-muted flex-1">{row.label}</span>
                    <span className={`text-xs font-semibold ${row.valueColor}`}>{row.value}</span>
                  </div>
                );
              })
            )}
          </div>

          {/* Assigned Infrastructure */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-nodeslix-muted/50 mb-3">
              Assigned Infrastructure
            </p>
            <div className="space-y-2">
              {user.infrastructure.map((infra, i) => {
                const InfraIcon = infraIcons[i % infraIcons.length];
                return (
                  <div key={infra} className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                    <InfraIcon size={13} className="text-nodeslix-accent/60 shrink-0" />
                    <span className="text-xs text-white font-medium">{infra}</span>
                    <span className="ml-auto text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded-full">
                      Active
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl border border-white/12 bg-white/[0.04] text-nodeslix-muted hover:text-white hover:border-white/20 text-xs font-semibold transition-all duration-200"
          >
            Close
          </button>
        </div>
      </Motion.aside>
    </Motion.div>
  );
};

/* ─────────────────────────────────────────
   EDIT ROLE MODAL
───────────────────────────────────────── */
const EditRoleModal = ({ user, onClose, onSave }) => {
  const [selectedRole, setSelectedRole] = useState(user.role);
  const rc = getRoleConfig(user.role);

  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <Motion.div
        initial={{ opacity: 0, scale: 0.92, y: 12 }}
        animate={{ opacity: 1, scale: 1,    y: 0  }}
        exit={{    opacity: 0, scale: 0.92, y: 12 }}
        transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[420px] bg-[#0e0e0e] border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.07]">
          <div>
            <p className="section-kicker">Permissions</p>
            <h3 className="text-base font-extrabold text-white mt-0.5">Edit User Role</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-xl border border-white/10 text-nodeslix-muted hover:text-white transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* User info */}
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.07]">
            <div className={`flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${avatarColors[user.id % avatarColors.length]} text-xs font-extrabold border border-white/10`}>
              {user.avatar}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">{user.name}</p>
              <p className="text-[10px] text-nodeslix-muted/60">{user.email}</p>
            </div>
            <span className={`ml-auto text-[9px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${rc.text} ${rc.bg} ${rc.border}`}>
              {user.role}
            </span>
          </div>

          {/* Role picker */}
          <div>
            <label className="block text-xs font-semibold text-nodeslix-muted mb-2">
              Select New Role
            </label>
            <div className="relative">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full appearance-none rounded-xl border border-white/12 bg-white/[0.04] text-white text-sm font-medium px-4 py-3 pr-10 outline-none focus:border-nodeslix-accent/50 transition-colors cursor-pointer"
              >
                {ALL_ROLES.map((r) => (
                  <option key={r} value={r} className="bg-[#141414]">{r}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-nodeslix-muted/50 pointer-events-none" />
            </div>
          </div>

          {/* Role descriptions */}
          <div className="text-[11px] text-nodeslix-muted/60 bg-white/[0.02] border border-white/[0.06] rounded-xl p-3.5 leading-relaxed">
            {selectedRole === 'Administrator' && 'Full platform access. Can manage all users, infrastructure, and AI systems.'}
            {selectedRole === 'Engineer'      && 'Technical access to infrastructure. Can view and modify network configurations.'}
            {selectedRole === 'Operator'      && 'Operational access. Can monitor and control live network traffic.'}
            {selectedRole === 'Analyst'       && 'Read-only access with analytics. Can view all data but cannot make changes.'}
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-5 border-t border-white/[0.07]">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-white/12 bg-white/[0.03] text-nodeslix-muted hover:text-white hover:border-white/20 text-xs font-semibold transition-all duration-200"
          >
            Cancel
          </button>
          <Motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSave(selectedRole)}
            className="flex-1 py-2.5 rounded-xl bg-nodeslix-accent/15 border border-nodeslix-accent/30 text-nodeslix-accent text-xs font-bold hover:bg-nodeslix-accent/25 transition-all duration-200"
          >
            Save Changes
          </Motion.button>
        </div>
      </Motion.div>
    </Motion.div>
  );
};

/* ─────────────────────────────────────────
   RESET ACCESS MODAL
───────────────────────────────────────── */
const ResetAccessModal = ({ user, onClose, onConfirm }) => (
  <Motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
    onClick={onClose}
  >
    <Motion.div
      initial={{ opacity: 0, scale: 0.92, y: 12 }}
      animate={{ opacity: 1, scale: 1,    y: 0  }}
      exit={{    opacity: 0, scale: 0.92, y: 12 }}
      transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
      onClick={(e) => e.stopPropagation()}
      className="w-full max-w-[400px] bg-[#0e0e0e] border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden"
    >
      <div className="px-6 py-6 flex flex-col gap-4">
        {/* Icon */}
        <div className="flex size-12 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20 mx-auto">
          <KeyRound size={22} className="text-amber-400" />
        </div>

        <div className="text-center">
          <h3 className="text-base font-extrabold text-white">Reset User Access?</h3>
          <p className="text-sm text-nodeslix-muted mt-2 leading-relaxed">
            This will regenerate access credentials for{' '}
            <span className="text-white font-semibold">{user.name}</span>.
            Their current session will be terminated and a new invite link will be issued.
          </p>
        </div>

        <div className="text-[11px] text-amber-400/80 bg-amber-500/8 border border-amber-500/15 rounded-xl p-3.5 text-center">
          ⚠ This action cannot be undone.
        </div>
      </div>

      <div className="flex gap-3 px-6 pb-6">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-2.5 rounded-xl border border-white/12 bg-white/[0.03] text-nodeslix-muted hover:text-white hover:border-white/20 text-xs font-semibold transition-all duration-200"
        >
          Cancel
        </button>
        <Motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={onConfirm}
          className="flex-1 py-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold hover:bg-amber-500/25 transition-all duration-200"
        >
          Confirm Reset
        </Motion.button>
      </div>
    </Motion.div>
  </Motion.div>
);

/* ─────────────────────────────────────────
   DEACTIVATE MODAL
───────────────────────────────────────── */
const DeactivateModal = ({ user, onClose, onConfirm }) => (
  <Motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
    onClick={onClose}
  >
    <Motion.div
      initial={{ opacity: 0, scale: 0.92, y: 12 }}
      animate={{ opacity: 1, scale: 1,    y: 0  }}
      exit={{    opacity: 0, scale: 0.92, y: 12 }}
      transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
      onClick={(e) => e.stopPropagation()}
      className="w-full max-w-[400px] bg-[#0e0e0e] border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden"
    >
      <div className="px-6 py-6 flex flex-col gap-4">
        {/* Icon */}
        <div className="flex size-12 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20 mx-auto">
          <UserX size={22} className="text-red-400" />
        </div>

        <div className="text-center">
          <h3 className="text-base font-extrabold text-white">Deactivate User?</h3>
          <p className="text-sm text-nodeslix-muted mt-2 leading-relaxed">
            <span className="text-white font-semibold">{user.name}</span> will lose all access
            to the NodeSlix platform. Their configuration and data will be retained.
          </p>
        </div>

        <div className="text-[11px] text-red-400/80 bg-red-500/8 border border-red-500/15 rounded-xl p-3.5 text-center">
          The user will be logged out immediately.
        </div>
      </div>

      <div className="flex gap-3 px-6 pb-6">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-2.5 rounded-xl border border-white/12 bg-white/[0.03] text-nodeslix-muted hover:text-white hover:border-white/20 text-xs font-semibold transition-all duration-200"
        >
          Cancel
        </button>
        <Motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={onConfirm}
          className="flex-1 py-2.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-bold hover:bg-red-500/25 transition-all duration-200"
        >
          Deactivate
        </Motion.button>
      </div>
    </Motion.div>
  </Motion.div>
);

/* ─────────────────────────────────────────
   EDIT PROFILE MODAL
───────────────────────────────────────── */
const EditProfileModal = ({ user, onClose, onSave }) => {
  const [displayName, setDisplayName] = useState(user.name);
  const [photoURL, setPhotoURL] = useState(user.avatarURL || '');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!displayName.trim()) {
      setError('Display name is required');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      await onSave(displayName.trim(), photoURL.trim() || null);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <Motion.div
        initial={{ opacity: 0, scale: 0.92, y: 12 }}
        animate={{ opacity: 1, scale: 1,    y: 0  }}
        exit={{    opacity: 0, scale: 0.92, y: 12 }}
        transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[420px] bg-[#0e0e0e] border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden"
      >
        <form onSubmit={handleSubmit}>
          {/* Modal header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.07]">
            <div>
              <p className="section-kicker">My Profile</p>
              <h3 className="text-base font-extrabold text-white mt-0.5">Edit Profile</h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex size-8 items-center justify-center rounded-xl border border-white/10 text-nodeslix-muted hover:text-white transition-colors"
            >
              <X size={15} />
            </button>
          </div>

          <div className="px-6 py-5 space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-nodeslix-muted">
                Display Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-nodeslix-accent/50 bg-[#121212]"
                placeholder="Full Name · Company"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-nodeslix-muted">
                Profile Picture URL
              </label>
              <input
                type="url"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-nodeslix-accent/50 bg-[#121212]"
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 px-6 py-5 border-t border-white/[0.07]">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="flex-1 py-2.5 rounded-xl border border-white/12 bg-white/[0.03] text-nodeslix-muted hover:text-white hover:border-white/20 text-xs font-semibold transition-all duration-200 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-2.5 rounded-xl bg-[#00D4FF] hover:bg-[#00D4FF]/90 text-[#0A0A0A] text-xs font-bold transition-all duration-200 disabled:opacity-50"
            >
              {submitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </Motion.div>
    </Motion.div>
  );
};

/* ─────────────────────────────────────────
   CHANGE PASSWORD MODAL
───────────────────────────────────────── */
const ChangePasswordModal = ({ onClose, onSave }) => {
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
      await onSave(newPassword);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to update password');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <Motion.div
        initial={{ opacity: 0, scale: 0.92, y: 12 }}
        animate={{ opacity: 1, scale: 1,    y: 0  }}
        exit={{    opacity: 0, scale: 0.92, y: 12 }}
        transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[420px] bg-[#0e0e0e] border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden"
      >
        <form onSubmit={handleSubmit}>
          {/* Modal header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.07]">
            <div>
              <p className="section-kicker">Security</p>
              <h3 className="text-base font-extrabold text-white mt-0.5">Change Password</h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex size-8 items-center justify-center rounded-xl border border-white/10 text-nodeslix-muted hover:text-white transition-colors"
            >
              <X size={15} />
            </button>
          </div>

          <div className="px-6 py-5 space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-nodeslix-muted">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-nodeslix-accent/50 bg-[#121212]"
                placeholder="Min. 8 characters"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-nodeslix-muted">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-nodeslix-accent/50 bg-[#121212]"
                placeholder="Re-enter password"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 px-6 py-5 border-t border-white/[0.07]">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="flex-1 py-2.5 rounded-xl border border-white/12 bg-white/[0.03] text-nodeslix-muted hover:text-white hover:border-white/20 text-xs font-semibold transition-all duration-200 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-2.5 rounded-xl bg-[#00D4FF] hover:bg-[#00D4FF]/90 text-[#0A0A0A] text-xs font-bold transition-all duration-200 disabled:opacity-50"
            >
              {submitting ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </Motion.div>
    </Motion.div>
  );
};

/* ─────────────────────────────────────────
   USERS PAGE
───────────────────────────────────────── */
const UsersPage = () => {
  const { user, updateUserProfile, updateUserPassword } = useAuth();

  /* ── User data (mutable local state) ── */
  const [userList, setUserList] = useState(INITIAL_USERS);

  /* ── UI state ── */
  const [search, setSearch]         = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [openMenu, setOpenMenu]     = useState(null);

  /* ── Active panels ── */
  const [profileUser,    setProfileUser]    = useState(null); // drawer
  const [editRoleUser,   setEditRoleUser]   = useState(null); // modal
  const [resetUser,      setResetUser]      = useState(null); // modal
  const [deactivateUser, setDeactivateUser] = useState(null); // modal
  const [editProfileOpen, setEditProfileOpen] = useState(false); // modal
  const [changePasswordOpen, setChangePasswordOpen] = useState(false); // modal

  /* ── Toast notifications ── */
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ title, desc, Icon, iconColor, iconBg }) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, title, desc, Icon, iconColor, iconBg }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  /* ── Close menu on outside click ── */
  const menuRef = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest('[data-menu-container]')) setOpenMenu(null);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* ─── ACTION HANDLERS ─── */
  const handleViewProfile = (user) => {
    setOpenMenu(null);
    setProfileUser(user);
    addToast({
      title: 'Profile Opened',
      desc: user.name,
      Icon: Eye,
      iconColor: 'text-nodeslix-accent',
      iconBg: 'bg-nodeslix-accent/15',
    });
  };

  const handleEditRole = (user) => {
    setOpenMenu(null);
    setEditRoleUser(user);
  };

  const handleSaveRole = (newRole) => {
    const prev = editRoleUser;
    setUserList((list) =>
      list.map((u) => u.id === prev.id ? { ...u, role: newRole } : u)
    );
    setEditRoleUser(null);
    addToast({
      title: 'Role Updated',
      desc: `${prev.name} → ${newRole}`,
      Icon: CheckCircle2,
      iconColor: 'text-nodeslix-accent',
      iconBg: 'bg-nodeslix-accent/15',
    });
  };

  const handleResetAccess = (user) => {
    setOpenMenu(null);
    setResetUser(user);
  };

  const handleConfirmReset = () => {
    const u = resetUser;
    setResetUser(null);
    addToast({
      title: 'Access Reset',
      desc: `New credentials issued for ${u.name}`,
      Icon: KeyRound,
      iconColor: 'text-amber-400',
      iconBg: 'bg-amber-500/15',
    });
  };

  const handleDeactivate = (user) => {
    setOpenMenu(null);
    setDeactivateUser(user);
  };

  const handleConfirmDeactivate = () => {
    const u = deactivateUser;
    setUserList((list) =>
      list.map((usr) => usr.id === u.id ? { ...usr, status: 'Inactive' } : usr)
    );
    setDeactivateUser(null);
    addToast({
      title: 'User Deactivated',
      desc: `${u.name} has been deactivated`,
      Icon: UserX,
      iconColor: 'text-red-400',
      iconBg: 'bg-red-500/15',
    });
  };

  const handleSaveProfile = async (displayName, photoURL) => {
    await updateUserProfile(displayName, photoURL);
    addToast({
      title: 'Profile Updated',
      desc: 'Display details updated in Firebase',
      Icon: UserCheck,
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-500/15',
    });
  };

  const handleSavePassword = async (newPassword) => {
    await updateUserPassword(newPassword);
    addToast({
      title: 'Password Updated',
      desc: 'Security credentials updated in Firebase',
      Icon: Lock,
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-500/15',
    });
  };

  /* ─── DERIVED ─── */
  const roles = ['All', 'Admin', 'Operator', 'Engineer'];

  const firebaseUserObj = user ? {
    id: 'current-user',
    name: user.displayName || user.email?.split('@')[0] || 'Administrator',
    email: user.email,
    role: 'Administrator',
    status: 'Active',
    region: 'Global',
    lastSeen: 'Just now',
    avatar: (user.displayName || user.email || 'A').slice(0, 2).toUpperCase(),
    avatarURL: user.photoURL,
    provider: getProviderLabel(user),
    created: formatDate(user.metadata.creationTime),
    lastLogin: formatDate(user.metadata.lastSignInTime),
    infrastructure: ['All Nodes', 'Core Command Grid'],
    isCurrentUser: true,
  } : null;

  const matchesFilter = (u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'All' || u.role === roleFilter;
    return matchSearch && matchRole;
  };

  const filtered = userList.filter((u) => u.id !== 'current-user' && matchesFilter(u));
  const filteredWithMe = [];
  if (firebaseUserObj && matchesFilter(firebaseUserObj)) {
    filteredWithMe.push(firebaseUserObj);
  }
  filteredWithMe.push(...filtered);

  const counts = {
    total:    userList.length + (firebaseUserObj ? 1 : 0),
    active:   userList.filter((u) => u.status === 'Active').length + (firebaseUserObj ? 1 : 0),
    admins:   userList.filter((u) => u.role === 'Admin' || u.role === 'Administrator').length + (firebaseUserObj ? 1 : 0),
    inactive: userList.filter((u) => u.status === 'Inactive').length,
  };

  /* ─── RENDER ─── */
  return (
    <>
      {/* ── Toast portal ── */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* ── Overlays ── */}
      <AnimatePresence>
        {profileUser    && <ProfileDrawer   user={profileUser}    onClose={() => setProfileUser(null)}    key="drawer"     />}
        {editRoleUser   && <EditRoleModal   user={editRoleUser}   onClose={() => setEditRoleUser(null)}   onSave={handleSaveRole}            key="editrole"   />}
        {resetUser      && <ResetAccessModal user={resetUser}     onClose={() => setResetUser(null)}      onConfirm={handleConfirmReset}     key="reset"      />}
        {deactivateUser && <DeactivateModal  user={deactivateUser} onClose={() => setDeactivateUser(null)} onConfirm={handleConfirmDeactivate} key="deactivate" />}
        {editProfileOpen && <EditProfileModal user={firebaseUserObj} onClose={() => setEditProfileOpen(false)} onSave={handleSaveProfile} key="editprofile" />}
        {changePasswordOpen && <ChangePasswordModal onClose={() => setChangePasswordOpen(false)} onSave={handleSavePassword} key="changepassword" />}
      </AnimatePresence>

      <div className="p-5 md:p-6 space-y-7">
        {/* Page Header */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="section-kicker">Users</p>
            <h1 className="text-2xl font-extrabold text-white mt-1">User Management</h1>
            <p className="text-sm text-nodeslix-muted mt-1">Manage operator access, roles, and permissions across all regions.</p>
          </div>
          <Motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => addToast({ title: 'Invite Sent', desc: 'Invite link copied to clipboard', Icon: UserPlus, iconColor: 'text-nodeslix-accent', iconBg: 'bg-nodeslix-accent/15' })}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-nodeslix-accent/15 border border-nodeslix-accent/30 text-nodeslix-accent text-xs font-bold hover:bg-nodeslix-accent/25 transition-all duration-200 shrink-0"
          >
            <UserPlus size={14} /> Invite User
          </Motion.button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Total Users', value: counts.total,    color: 'text-white',             icon: Users     },
            { label: 'Active Now',  value: counts.active,   color: 'text-emerald-400',       icon: UserCheck },
            { label: 'Admins',      value: counts.admins,   color: 'text-nodeslix-accent',   icon: Shield    },
            { label: 'Inactive',    value: counts.inactive, color: 'text-nodeslix-muted/60', icon: UserMinus },
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
        <div className="surface-card overflow-visible">
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
            {filteredWithMe.length === 0 ? (
              <Motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-12 gap-3"
              >
                <Users size={28} className="text-nodeslix-muted/30" />
                <p className="text-sm text-nodeslix-muted/50">No users match your search</p>
              </Motion.div>
            ) : (
              filteredWithMe.map((usrObj, i) => {
                const rc = getRoleConfig(usrObj.role);
                const RoleIcon = rc.icon;
                const avColor = avatarColors[usrObj.id === 'current-user' ? 0 : usrObj.id % avatarColors.length];
                const isMenuOpen = openMenu === usrObj.id;

                return (
                  <Motion.div
                    key={usrObj.id}
                    layout
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ duration: 0.25, delay: i * 0.04 }}
                    className="grid grid-cols-[1fr] md:grid-cols-[1fr_180px_120px_100px_80px] items-center px-5 py-4 border-b border-white/[0.05] last:border-0 hover:bg-white/[0.02] transition-colors gap-y-2 md:gap-y-0"
                  >
                    {/* User info */}
                    <div className="flex items-center gap-3">
                      <div className="relative shrink-0">
                        {usrObj.avatarURL ? (
                          <img src={usrObj.avatarURL} alt={usrObj.name} className="size-9 rounded-full object-cover border border-white/10" referrerPolicy="no-referrer" />
                        ) : (
                          <div className={`flex size-9 items-center justify-center rounded-full bg-gradient-to-br ${avColor} text-xs font-extrabold border border-white/10`}>
                            {usrObj.avatar}
                          </div>
                        )}
                        <span className={`absolute -bottom-0.5 -right-0.5 block size-2.5 rounded-full border-2 border-[#121212] ${statusDot[usrObj.status]}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-white">{usrObj.name}</p>
                          {usrObj.isCurrentUser && (
                            <span className="text-[9px] font-bold bg-[#00D4FF]/15 border border-[#00D4FF]/35 text-[#00D4FF] px-1.5 py-0.5 rounded-full">
                              You
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-nodeslix-muted/60">{usrObj.email}</p>
                      </div>
                    </div>

                    {/* Region */}
                    <span className="text-xs text-nodeslix-muted">{usrObj.region}</span>

                    {/* Role */}
                    <div className="flex">
                      <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full border ${rc.text} ${rc.bg} ${rc.border}`}>
                        <RoleIcon size={10} />
                        {usrObj.role}
                      </span>
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-2">
                      <span className={`block size-1.5 rounded-full ${statusDot[usrObj.status]}`} />
                      <span className="text-xs text-nodeslix-muted">{usrObj.status}</span>
                    </div>

                    {/* Action menu */}
                    <div className="flex justify-end relative" data-menu-container>
                      <Motion.button
                        type="button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setOpenMenu(isMenuOpen ? null : usrObj.id)}
                        className={[
                          'flex size-7 items-center justify-center rounded-lg border transition-all duration-200',
                          isMenuOpen
                            ? 'border-nodeslix-accent/40 bg-nodeslix-accent/10 text-nodeslix-accent'
                            : 'border-white/10 text-nodeslix-muted hover:text-white hover:border-white/20',
                        ].join(' ')}
                      >
                        <MoreHorizontal size={14} />
                      </Motion.button>

                      <AnimatePresence>
                        {isMenuOpen && (
                          <Motion.div
                            initial={{ opacity: 0, scale: 0.92, y: -4 }}
                            animate={{ opacity: 1, scale: 1,    y: 0  }}
                            exit={{    opacity: 0, scale: 0.92, y: -4 }}
                            transition={{ duration: 0.15, ease: [0.32, 0.72, 0, 1] }}
                            className="absolute right-0 top-9 z-30 w-44 rounded-2xl border border-white/12 bg-[#141414] shadow-2xl overflow-hidden"
                          >
                            {/* View Profile */}
                            <button
                              type="button"
                              onClick={() => handleViewProfile(usrObj)}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-nodeslix-muted hover:bg-white/[0.05] hover:text-white transition-colors"
                            >
                              <Eye size={13} className="text-nodeslix-accent/70 shrink-0" />
                              View Profile
                            </button>

                            {usrObj.isCurrentUser ? (
                              <>
                                {/* Edit Profile */}
                                <button
                                  type="button"
                                  onClick={() => { setOpenMenu(null); setEditProfileOpen(true); }}
                                  className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-nodeslix-muted hover:bg-white/[0.05] hover:text-white transition-colors"
                                >
                                  <UserCheck size={13} className="text-violet-400/70 shrink-0" />
                                  Edit Profile
                                </button>

                                {/* Change Password */}
                                <button
                                  type="button"
                                  onClick={() => { setOpenMenu(null); setChangePasswordOpen(true); }}
                                  className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-nodeslix-muted hover:bg-white/[0.05] hover:text-white transition-colors"
                                >
                                  <Lock size={13} className="text-amber-400/70 shrink-0" />
                                  Change Password
                                </button>
                              </>
                            ) : (
                              <>
                                {/* Edit Role */}
                                <button
                                  type="button"
                                  onClick={() => handleEditRole(usrObj)}
                                  className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-nodeslix-muted hover:bg-white/[0.05] hover:text-white transition-colors"
                                >
                                  <Shield size={13} className="text-violet-400/70 shrink-0" />
                                  Edit Role
                                </button>

                                {/* Reset Access */}
                                <button
                                  type="button"
                                  onClick={() => handleResetAccess(usrObj)}
                                  className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-nodeslix-muted hover:bg-white/[0.05] hover:text-white transition-colors"
                                >
                                  <KeyRound size={13} className="text-amber-400/70 shrink-0" />
                                  Reset Access
                                </button>

                                <div className="mx-3 border-t border-white/[0.07]" />

                                {/* Deactivate */}
                                <button
                                  type="button"
                                  onClick={() => handleDeactivate(usrObj)}
                                  className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-red-400 hover:bg-red-500/10 transition-colors"
                                >
                                  <UserX size={13} className="shrink-0" />
                                  Deactivate
                                </button>
                              </>
                            )}
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
    </>
  );
};

export default UsersPage;
