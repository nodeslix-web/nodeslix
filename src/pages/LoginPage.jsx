import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle2, Wifi, BrainCircuit, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logo from "../assets/logo.png";

/* ─── Feature bullets on the left panel ─── */
const features = [
  { icon: Wifi,         label: 'Real-time Telemetry',   desc: 'Monitor network nodes at sub-second resolution' },
  { icon: BrainCircuit, label: 'AI-Powered Insights',   desc: 'Predictive analytics across your entire mesh'  },
  { icon: Shield,       label: 'Enterprise Security',   desc: 'Zero-trust access with role-based permissions'  },
];

/* ─── Google G icon ─── */
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

/* ─── Animated background grid ─── */
const GridBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div
      className="absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage: `
          linear-gradient(to right, #00D8FF 1px, transparent 1px),
          linear-gradient(to bottom, #00D8FF 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }}
    />
    {/* Glow orbs */}
    <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#00D8FF]/5 blur-[120px]" />
    <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-blue-600/5 blur-[100px]" />
  </div>
);

/* ─────────────────────────────────────────
   LOGIN PAGE
───────────────────────────────────────── */
const LoginPage = () => {
  const { user, loading: authLoading, login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [email,       setEmail]       = useState('');
  const [password,    setPassword]    = useState('');
  const [showPass,    setShowPass]    = useState(false);
  const [submitting,  setSubmitting]  = useState(false);
  const [googleBusy,  setGoogleBusy]  = useState(false);
  const [error,       setError]       = useState('');
  const [success,     setSuccess]     = useState(false);
  const emailRef = useRef(null);

  /* Redirect if already authenticated */
  useEffect(() => {
    if (!authLoading && user) navigate('/dashboard', { replace: true });
  }, [user, authLoading, navigate]);

  useEffect(() => { emailRef.current?.focus(); }, []);

  /* Map Firebase error codes to human-readable messages */
  const friendlyError = (code) => {
    const map = {
      'auth/user-not-found':        'No account found with this email.',
      'auth/wrong-password':        'Incorrect password. Please try again.',
      'auth/invalid-email':         'Please enter a valid email address.',
      'auth/too-many-requests':     'Too many attempts. Please wait a moment.',
      'auth/user-disabled':         'This account has been disabled.',
      'auth/invalid-credential':    'Invalid email or password.',
      'auth/popup-closed-by-user':  'Sign-in popup was closed. Please try again.',
      'auth/cancelled-popup-request': 'Sign-in was cancelled.',
    };
    return map[code] ?? 'Something went wrong. Please try again.';
  };

  /* Email / Password submit */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setError('');
    setSubmitting(true);
    try {
      await login(email.trim(), password);
      setSuccess(true);
      setTimeout(() => navigate('/dashboard', { replace: true }), 500);
    } catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setSubmitting(false);
    }
  };

  /* Google sign-in */
  const handleGoogle = async () => {
    if (googleBusy) return;
    setError('');
    setGoogleBusy(true);
    try {
      await loginWithGoogle();
      setSuccess(true);
      setTimeout(() => navigate('/dashboard', { replace: true }), 500);
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') {
        setError(friendlyError(err.code));
      }
    } finally {
      setGoogleBusy(false);
    }
  };

  const busy = submitting || googleBusy;

  return (
    <div className="min-h-screen flex bg-[#080808] text-white overflow-hidden relative">

      {/* ─── Left Panel ─── */}
      <div className="hidden lg:flex flex-col justify-between w-[480px] shrink-0 relative border-r border-white/[0.06] p-12 overflow-hidden">
        <GridBackground />

        {/* Top: Logo + brand */}
        <Motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative z-10"
        >
          <Link to="/" className="inline-flex items-center gap-3 mb-16 group">
            <img src={logo} alt="Logo" height={"100px"} style={{maxWidth: "50%"}}/>
          </Link>

          <h1 className="mb-3 text-3xl font-bold leading-tight text-white">
            The Intelligence<br />
            Behind Modern<br />
            <span className="text-[#00D8FF]">Telecom Networks.</span>
          </h1>
          <p className="text-sm text-white/40 leading-relaxed max-w-[320px]">
            Real-time visibility, AI-driven optimization, and autonomous orchestration across your entire infrastructure.
          </p>
        </Motion.div>

        {/* Middle: Feature bullets */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="relative z-10 space-y-5"
        >
          {features.map((f, i) => (
            <Motion.div
              key={f.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.07]">
                <f.icon size={15} className="text-[#00D8FF]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{f.label}</p>
                <p className="text-[11px] text-white/35 mt-0.5">{f.desc}</p>
              </div>
            </Motion.div>
          ))}
        </Motion.div>

        {/* Bottom: Status */}
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="relative z-10"
        >
          <div className="flex items-center gap-2">
            <span className="relative flex rounded-full size-2 bg-emerald-400">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
            </span>
            <span className="text-[11px] text-white/30">All systems operational</span>
          </div>
        </Motion.div>
      </div>

      {/* ─── Right Panel (Form) ─── */}
      <div className="relative flex items-center justify-center flex-1 p-6 overflow-hidden">
        {/* Mobile background */}
        <div className="absolute inset-0 lg:hidden">
          <GridBackground />
        </div>

        <Motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-[400px]"
        >
          {/* Mobile logo only */}
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <img src={logo} alt="Logo" height={"100px"} style={{maxWidth: "30%"}}/>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h2 className="mb-2 text-2xl font-bold text-white">Welcome back</h2>
            <p className="text-sm text-white/40">Sign in to your NodeSlix dashboard</p>
          </div>

          {/* Error Banner */}
          <AnimatePresence mode="wait">
            {error && (
              <Motion.div
                key="error"
                initial={{ opacity: 0, y: -8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-start gap-3 px-4 py-3 mb-5 text-red-400 border rounded-xl bg-red-500/10 border-red-500/20"
              >
                <AlertCircle size={14} className="shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">{error}</span>
              </Motion.div>
            )}
            {success && (
              <Motion.div
                key="success"
                initial={{ opacity: 0, y: -8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3 px-4 py-3 mb-5 border rounded-xl bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
              >
                <CheckCircle2 size={14} />
                <span className="text-xs font-medium">Authenticated — entering dashboard…</span>
              </Motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="login-email" className="block text-[11px] font-semibold text-white/50 uppercase tracking-wider">
                Email address
              </label>
              <input
                id="login-email"
                ref={emailRef}
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                placeholder="you@company.com"
                disabled={busy || success}
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20
                           focus:outline-none focus:border-[#00D8FF]/50 focus:bg-[#00D8FF]/[0.03]
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transition-all duration-200"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label htmlFor="login-password" className="block text-[11px] font-semibold text-white/50 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPass ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  placeholder="••••••••••"
                  disabled={busy || success}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 pr-11 text-sm text-white placeholder-white/20
                             focus:outline-none focus:border-[#00D8FF]/50 focus:bg-[#00D8FF]/[0.03]
                             disabled:opacity-50 disabled:cursor-not-allowed
                             transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  tabIndex={-1}
                  className="absolute transition-colors -translate-y-1/2 right-3 top-1/2 text-white/30 hover:text-white/60"
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              id="login-submit"
              type="submit"
              disabled={busy || success || !email || !password}
              className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl
                         bg-[#00D8FF] hover:bg-[#00D8FF]/90 active:scale-[0.98]
                         text-[#080808] text-sm font-bold
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
                         transition-all duration-200 shadow-[0_0_20px_rgba(0,216,255,0.25)]"
            >
              {submitting ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Signing in…
                </>
              ) : success ? (
                <>
                  <CheckCircle2 size={15} />
                  Authenticated
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-white/[0.07]" />
            <span className="text-[10px] text-white/25 font-medium uppercase tracking-wider">or continue with</span>
            <div className="flex-1 h-px bg-white/[0.07]" />
          </div>

          {/* Google button */}
          <button
            id="login-google"
            type="button"
            onClick={handleGoogle}
            disabled={busy || success}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl
                       bg-white/[0.04] hover:bg-white/[0.08] active:scale-[0.98]
                       border border-white/10 hover:border-white/20
                       text-sm font-semibold text-white
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
                       transition-all duration-200"
          >
            {googleBusy ? (
              <Loader2 size={16} className="animate-spin text-white/50" />
            ) : (
              <GoogleIcon />
            )}
            {googleBusy ? 'Connecting…' : 'Continue with Google'}
          </button>

          {/* Footer links */}
          <div className="mt-8 space-y-2 text-center">
            <p className="text-xs text-white/30">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#00D8FF]/70 hover:text-[#00D8FF] font-semibold transition-colors">
                Sign Up
              </Link>
            </p>
            <p className="text-[11px] text-white/25">
              <Link to="/" className="text-[#00D8FF]/60 hover:text-[#00D8FF] transition-colors">
                ← Back to NodeSlix Home
              </Link>
            </p>
            <p className="text-[10px] text-white/15">
              Protected by Firebase Authentication + Cloudflare
            </p>
          </div>
        </Motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
