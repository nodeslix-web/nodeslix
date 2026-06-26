import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/* Branded full-screen loader shown while Firebase resolves auth state */
const AuthLoader = () => (
  <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#080808]">
    {/* Pulsing ring */}
    <div className="relative flex size-16 items-center justify-center mb-6">
      <span className="absolute inline-flex size-full rounded-full bg-[#00D8FF]/20 animate-ping" />
      <span className="relative flex size-10 rounded-full bg-[#00D8FF]/10 border border-[#00D8FF]/30 items-center justify-center">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00D8FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      </span>
    </div>
    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#00D8FF]/70">
      Authenticating
    </p>
    <p className="text-[10px] text-white/20 mt-1">NodeSlix Platform</p>
  </div>
);

/* ─── Protected Route ─── */
const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <AuthLoader />;
  if (!user)   return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
