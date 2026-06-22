import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebase/config';

/* ─── Context ─── */
const AuthContext = createContext(null);

/* ─── Provider ─── */
export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate              = useNavigate();

  /* Listen to Firebase auth state */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  /* Email / Password sign-in */
  const login = useCallback((email, password) =>
    signInWithEmailAndPassword(auth, email, password),
  []);

  /* Google sign-in */
  const loginWithGoogle = useCallback(() => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    return signInWithPopup(auth, provider);
  }, []);

  /* Sign out → redirect to /login */
  const logout = useCallback(async () => {
    await signOut(auth);
    navigate('/login', { replace: true });
  }, [navigate]);

  const value = { user, loading, login, loginWithGoogle, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/* ─── Hook ─── */
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
};

export default AuthContext;
