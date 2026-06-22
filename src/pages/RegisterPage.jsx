import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import {
  Eye, EyeOff, Loader2, AlertCircle, CheckCircle2,
  Shield, BrainCircuit, Activity, Clock, Check, X as XIcon,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

/* ─── Left panel badges ─── */
const badges = [
  { icon: Shield,       label: 'Enterprise Ready'       },
  { icon: BrainCircuit, label: 'AI Active'              },
  { icon: CheckCircle2, label: 'Secure Authentication'  },
  { icon: Clock,        label: '24/7 Monitoring'        },
];

/* ─── Available roles (no Administrator) ─── */
const ROLES = ['Operator', 'Viewer'];

/* ─── Google G icon ─── */
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

/* ─── Animated grid background ─── */
const GridBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div
      className="absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage: `
          linear-gradient(to right, #00D4FF 1px, transparent 1px),
          linear-gradient(to bottom, #00D4FF 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }}
    />
    <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#00D4FF]/5 blur-[120px]" />
    <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-violet-600/5 blur-[100px]" />
  </div>
);

/* ─────────────────────────────────────────
   PASSWORD STRENGTH
───────────────────────────────────────── */
const getStrength = (pw) => {
  if (!pw) return { score: 0, label: '', color: '' };
  let score = 0;
  if (pw.length >= 8)              score++;
  if (/[A-Z]/.test(pw))           score++;
  if (/[a-z]/.test(pw))           score++;
  if (/[0-9]/.test(pw))           score++;
  if (/[^A-Za-z0-9]/.test(pw))    score++;

  const levels = [
    { label: '',          color: 'bg-transparent'  },
    { label: 'Very Weak', color: 'bg-red-500'      },
    { label: 'Weak',      color: 'bg-orange-500'   },
    { label: 'Fair',      color: 'bg-yellow-500'   },
    { label: 'Strong',    color: 'bg-emerald-400'  },
    { label: 'Very Strong', color: 'bg-emerald-400' },
  ];
  return { score, ...levels[score] };
};

const rules = [
  { label: 'At least 8 characters',      test: (pw) => pw.length >= 8          },
  { label: 'One uppercase letter (A–Z)',  test: (pw) => /[A-Z]/.test(pw)        },
  { label: 'One lowercase letter (a–z)',  test: (pw) => /[a-z]/.test(pw)        },
  { label: 'One number (0–9)',            test: (pw) => /[0-9]/.test(pw)        },
];

const PasswordStrength = ({ password }) => {
  const strength = getStrength(password);
  if (!password) return null;

  return (
    <Motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="overflow-hidden"
    >
      {/* Bars */}
      <div className="flex gap-1 mt-2 mb-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`flex-1 h-1 rounded-full transition-all duration-300 ${
              strength.score >= i ? strength.color : 'bg-white/10'
            }`}
          />
        ))}
      </div>
      {strength.label && (
        <p className={`text-[10px] font-semibold mb-2 ${
          strength.score <= 2 ? 'text-orange-400' : strength.score === 3 ? 'text-yellow-400' : 'text-emerald-400'
        }`}>
          {strength.label}
        </p>
      )}
      {/* Rules checklist */}
      <div className="space-y-1">
        {rules.map((r) => {
          const ok = r.test(password);
          return (
            <div key={r.label} className="flex items-center gap-2">
              {ok
                ? <Check size={10} className="text-emerald-400 shrink-0" />
                : <XIcon size={10} className="text-white/20 shrink-0" />
              }
              <span className={`text-[10px] ${ok ? 'text-emerald-400' : 'text-white/30'}`}>
                {r.label}
              </span>
            </div>
          );
        })}
      </div>
    </Motion.div>
  );
};

/* ─── Map Firebase error codes to friendly messages ─── */
const friendlyError = (code) => {
  const map = {
    'auth/email-already-in-use':    'An account with this email already exists.',
    'auth/invalid-email':           'Please enter a valid email address.',
    'auth/weak-password':           'Password is too weak. Please choose a stronger one.',
    'auth/operation-not-allowed':   'Email/password accounts are not enabled.',
    'auth/too-many-requests':       'Too many attempts. Please wait a moment.',
    'auth/network-request-failed':  'Network error. Check your connection and try again.',
    'auth/popup-closed-by-user':    'Sign-in popup was closed. Please try again.',
    'auth/cancelled-popup-request': 'Sign-in was cancelled.',
  };
  return map[code] ?? 'Something went wrong. Please try again.';
};

/* ─────────────────────────────────────────
   REGISTER PAGE
───────────────────────────────────────── */
const RegisterPage = () => {
  const { user, loading: authLoading, register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  /* Form fields */
  const [fullName,    setFullName]    = useState('');
  const [company,     setCompany]     = useState('');
  const [email,       setEmail]       = useState('');
  const [password,    setPassword]    = useState('');
  const [confirmPw,   setConfirmPw]   = useState('');
  const [role,        setRole]        = useState('Operator');

  /* UI state */
  const [showPw,      setShowPw]      = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting,  setSubmitting]  = useState(false);
  const [googleBusy,  setGoogleBusy]  = useState(false);
  const [error,       setError]       = useState('');
  const [success,     setSuccess]     = useState(false);

  /* Redirect if already authenticated */
  useEffect(() => {
    if (!authLoading && user) navigate('/dashboard', { replace: true });
  }, [user, authLoading, navigate]);

  const busy = submitting || googleBusy;

  /* Validate before submit */
  const validate = () => {
    if (!fullName.trim())  return 'Full name is required.';
    if (!company.trim())   return 'Company name is required.';
    if (!email.trim())     return 'Email address is required.';
    if (password.length < 8)           return 'Password must be at least 8 characters.';
    if (!/[A-Z]/.test(password))       return 'Password needs at least one uppercase letter.';
    if (!/[a-z]/.test(password))       return 'Password needs at least one lowercase letter.';
    if (!/[0-9]/.test(password))       return 'Password needs at least one number.';
    if (password !== confirmPw)        return 'Passwords do not match.';
    return null;
  };

  /* Email / Password submit */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    const validationError = validate();
    if (validationError) { setError(validationError); return; }

    setError('');
    setSubmitting(true);
    try {
      const displayName = `${fullName.trim()} · ${company.trim()}`;
      await register(email.trim(), password, displayName);
      setSuccess(true);
      setTimeout(() => navigate('/dashboard', { replace: true }), 1200);
    } catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setSubmitting(false);
    }
  };

  /* Google registration */
  const handleGoogle = async () => {
    if (googleBusy) return;
    setError('');
    setGoogleBusy(true);
    try {
      await loginWithGoogle();
      setSuccess(true);
      setTimeout(() => navigate('/dashboard', { replace: true }), 800);
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') {
        setError(friendlyError(err.code));
      }
    } finally {
      setGoogleBusy(false);
    }
  };

  const strength = getStrength(password);
  const canSubmit =
    fullName && company && email && password && confirmPw && role &&
    strength.score >= 3 && password === confirmPw;

  return (
    <div className="min-h-screen flex bg-[#0A0A0A] text-white overflow-hidden relative">

      {/* ─── Left Panel ─── */}
      <div className="hidden lg:flex flex-col justify-between w-[440px] shrink-0 relative border-r border-white/[0.06] p-12 overflow-hidden">
        <GridBackground />

        {/* Logo */}
        <Motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="relative z-10"
        >
          <Link to="/" className="inline-flex items-center gap-3 group mb-12">
            <div className="flex size-9 items-center justify-center rounded-xl bg-[#00D4FF]/10 border border-[#00D4FF]/20 group-hover:bg-[#00D4FF]/20 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-none">NodeSlix</p>
              <p className="text-[10px] text-white/30 mt-0.5">AI Telecom Intelligence</p>
            </div>
          </Link>

          <h1 className="text-3xl font-bold text-white leading-tight mb-3">
            Join<br />
            <span className="text-[#00D4FF]">NodeSlix</span>
          </h1>
          <p className="text-sm text-white/40 leading-relaxed max-w-[300px]">
            Create an account to access the Telecom Operations Command Center and manage your network infrastructure.
          </p>
        </Motion.div>

        {/* Badges */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2, ease: 'easeOut' }}
          className="relative z-10 space-y-3"
        >
          {badges.map((b, i) => (
            <Motion.div
              key={b.label}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06]"
            >
              <div className="flex size-7 items-center justify-center rounded-lg bg-[#00D4FF]/10 shrink-0">
                <b.icon size={13} className="text-[#00D4FF]" />
              </div>
              <span className="text-sm font-medium text-white/70">{b.label}</span>
              <div className="ml-auto flex size-4 items-center justify-center rounded-full bg-emerald-400/10">
                <Check size={9} className="text-emerald-400" />
              </div>
            </Motion.div>
          ))}
        </Motion.div>

        {/* Bottom: status */}
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="relative z-10"
        >
          <div className="flex items-center gap-2">
            <span className="flex size-2 rounded-full bg-emerald-400 relative">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
            </span>
            <span className="text-[11px] text-white/30">Platform fully operational · v3.12.1</span>
          </div>
        </Motion.div>
      </div>

      {/* ─── Right Panel (Form) ─── */}
      <div className="flex flex-1 items-start justify-center p-6 py-10 relative overflow-auto">
        <div className="absolute inset-0 lg:hidden">
          <GridBackground />
        </div>

        <Motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-[420px]"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="flex size-8 items-center justify-center rounded-xl bg-[#00D4FF]/10 border border-[#00D4FF]/20">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
            <span className="text-sm font-bold text-white">NodeSlix</span>
          </div>

          {/* Header */}
          <div className="mb-7">
            <h2 className="text-2xl font-bold text-white mb-1">Create your account</h2>
            <p className="text-sm text-white/40">Enterprise access to Telecom Operations Command Center</p>
          </div>

          {/* Error / Success Banner */}
          <AnimatePresence mode="wait">
            {error && !success && (
              <Motion.div
                key="error"
                initial={{ opacity: 0, y: -8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-start gap-3 mb-5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400"
              >
                <AlertCircle size={14} className="shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">{error}</span>
              </Motion.div>
            )}
            {success && (
              <Motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-3 mb-6 px-6 py-6 rounded-2xl bg-emerald-500/8 border border-emerald-500/20 text-center"
              >
                <div className="flex size-12 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-500/25">
                  <CheckCircle2 size={22} className="text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Account Created Successfully</p>
                  <p className="text-xs text-white/40 mt-0.5">Welcome to NodeSlix. Entering dashboard…</p>
                </div>
              </Motion.div>
            )}
          </AnimatePresence>

          {!success && (
            <>
              {/* Google button */}
              <button
                id="register-google"
                type="button"
                onClick={handleGoogle}
                disabled={busy}
                className="w-full flex items-center justify-center gap-3 py-3 rounded-xl
                           bg-white/[0.04] hover:bg-white/[0.08] active:scale-[0.98]
                           border border-white/10 hover:border-white/20
                           text-sm font-semibold text-white mb-5
                           disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
                           transition-all duration-200"
              >
                {googleBusy ? <Loader2 size={16} className="animate-spin text-white/50" /> : <GoogleIcon />}
                {googleBusy ? 'Connecting…' : 'Continue with Google'}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-white/[0.07]" />
                <span className="text-[10px] text-white/25 font-medium uppercase tracking-wider">or register with email</span>
                <div className="flex-1 h-px bg-white/[0.07]" />
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} noValidate className="space-y-4">

                {/* Row 1: Full Name + Company */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label htmlFor="reg-fullname" className="block text-[11px] font-semibold text-white/50 uppercase tracking-wider">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="reg-fullname"
                      type="text"
                      autoComplete="name"
                      value={fullName}
                      onChange={(e) => { setFullName(e.target.value); setError(''); }}
                      placeholder="John Doe"
                      disabled={busy}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/20
                                 focus:outline-none focus:border-[#00D4FF]/50 focus:bg-[#00D4FF]/[0.03]
                                 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="reg-company" className="block text-[11px] font-semibold text-white/50 uppercase tracking-wider">
                      Company <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="reg-company"
                      type="text"
                      autoComplete="organization"
                      value={company}
                      onChange={(e) => { setCompany(e.target.value); setError(''); }}
                      placeholder="Acme Corp"
                      disabled={busy}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/20
                                 focus:outline-none focus:border-[#00D4FF]/50 focus:bg-[#00D4FF]/[0.03]
                                 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="reg-email" className="block text-[11px] font-semibold text-white/50 uppercase tracking-wider">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="reg-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                    placeholder="you@company.com"
                    disabled={busy}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20
                               focus:outline-none focus:border-[#00D4FF]/50 focus:bg-[#00D4FF]/[0.03]
                               disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  />
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label htmlFor="reg-password" className="block text-[11px] font-semibold text-white/50 uppercase tracking-wider">
                    Password <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="reg-password"
                      type={showPw ? 'text' : 'password'}
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setError(''); }}
                      placeholder="Min. 8 characters"
                      disabled={busy}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 pr-11 text-sm text-white placeholder-white/20
                                 focus:outline-none focus:border-[#00D4FF]/50 focus:bg-[#00D4FF]/[0.03]
                                 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw((v) => !v)}
                      tabIndex={-1}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                    >
                      {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                  {/* Strength indicator */}
                  <AnimatePresence>
                    {password && <PasswordStrength password={password} />}
                  </AnimatePresence>
                </div>

                {/* Confirm Password */}
                <div className="space-y-1.5">
                  <label htmlFor="reg-confirm" className="block text-[11px] font-semibold text-white/50 uppercase tracking-wider">
                    Confirm Password <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="reg-confirm"
                      type={showConfirm ? 'text' : 'password'}
                      autoComplete="new-password"
                      value={confirmPw}
                      onChange={(e) => { setConfirmPw(e.target.value); setError(''); }}
                      placeholder="Re-enter password"
                      disabled={busy}
                      className={`w-full bg-white/[0.04] border rounded-xl px-4 py-2.5 pr-11 text-sm text-white placeholder-white/20
                                  focus:outline-none focus:bg-[#00D4FF]/[0.03]
                                  disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ${
                        confirmPw && confirmPw !== password
                          ? 'border-red-500/40 focus:border-red-500/60'
                          : confirmPw && confirmPw === password
                          ? 'border-emerald-500/40 focus:border-emerald-500/60'
                          : 'border-white/10 focus:border-[#00D4FF]/50'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      tabIndex={-1}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                    >
                      {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                    {/* Match indicator */}
                    {confirmPw && (
                      <div className="absolute right-9 top-1/2 -translate-y-1/2">
                        {confirmPw === password
                          ? <Check size={12} className="text-emerald-400" />
                          : <XIcon size={12} className="text-red-400" />
                        }
                      </div>
                    )}
                  </div>
                  {confirmPw && confirmPw !== password && (
                    <Motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[10px] text-red-400 mt-1"
                    >
                      Passwords do not match
                    </Motion.p>
                  )}
                </div>

                {/* Role */}
                <div className="space-y-1.5">
                  <label htmlFor="reg-role" className="block text-[11px] font-semibold text-white/50 uppercase tracking-wider">
                    Role <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="reg-role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      disabled={busy}
                      className="w-full appearance-none bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white
                                 focus:outline-none focus:border-[#00D4FF]/50 focus:bg-[#00D4FF]/[0.03]
                                 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
                    >
                      {ROLES.map((r) => (
                        <option key={r} value={r} className="bg-[#1a1a1a] text-white">{r}</option>
                      ))}
                    </select>
                    {/* Chevron */}
                    <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </div>
                  <p className="text-[10px] text-white/25">Administrator accounts are managed by your organization.</p>
                </div>

                {/* Submit */}
                <button
                  id="register-submit"
                  type="submit"
                  disabled={busy || !canSubmit}
                  className="w-full flex items-center justify-center gap-2.5 py-3 mt-2 rounded-xl
                             bg-[#00D4FF] hover:bg-[#00D4FF]/90 active:scale-[0.98]
                             text-[#0A0A0A] text-sm font-bold
                             disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100
                             transition-all duration-200 shadow-[0_0_20px_rgba(0,212,255,0.2)]"
                >
                  {submitting
                    ? <><Loader2 size={15} className="animate-spin" /> Creating account…</>
                    : 'Create Account'
                  }
                </button>
              </form>
            </>
          )}

          {/* Footer */}
          <div className="mt-6 text-center space-y-2">
            <p className="text-xs text-white/30">
              Already have an account?{' '}
              <Link to="/login" className="text-[#00D4FF]/70 hover:text-[#00D4FF] font-semibold transition-colors">
                Sign In
              </Link>
            </p>
            <p className="text-[10px] text-white/15">
              <Link to="/" className="hover:text-white/30 transition-colors">← Back to NodeSlix Home</Link>
            </p>
          </div>
        </Motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
