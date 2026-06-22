import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  updatePassword,
} from 'firebase/auth';
import { auth } from '../firebase/config';

/* ─── Context ─── */
const AuthContext = createContext(null);

/* ─── Provider ─── */
export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate              = useNavigate();

  /* Listen to Firebase auth state — handles session persistence automatically */
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

  /* Email / Password registration with display name */
  const register = useCallback(async (email, password, displayName) => {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(credential.user, { displayName });
    // Refresh the user object so displayName is immediately available
    setUser({ ...credential.user, displayName });
    return credential;
  }, []);

  /* Google sign-in (works for both login and register) */
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

  /* Update Profile */
  const updateUserProfile = useCallback(async (displayName, photoURL) => {
    if (!auth.currentUser) throw new Error('No user is currently logged in');
    await updateProfile(auth.currentUser, { displayName, photoURL });
    setUser({ ...auth.currentUser });
  }, []);

  /* Update Password */
  const updateUserPassword = useCallback(async (newPassword) => {
    if (!auth.currentUser) throw new Error('No user is currently logged in');
    await updatePassword(auth.currentUser, newPassword);
    setUser({ ...auth.currentUser });
  }, []);

  const value = { user, loading, login, register, loginWithGoogle, logout, updateUserProfile, updateUserPassword };

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
