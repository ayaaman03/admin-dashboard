import { createContext, useContext, useEffect, useState } from 'react';
import { AUTH_STORAGE_KEY, DEMO_CREDENTIALS } from '../utils/constants';

const AuthContext = createContext(null);

/**
 * AuthProvider — bonus feature: basic authentication.
 * This is a FAKE auth flow (no real backend auth endpoint), persisted to
 * localStorage so the session survives a refresh. Good enough to gate
 * the dashboard behind a login page as requested.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session on first load
  useEffect(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  function login(email, password) {
    if (
      email.trim().toLowerCase() === DEMO_CREDENTIALS.email &&
      password === DEMO_CREDENTIALS.password
    ) {
      const sessionUser = { name: 'Admin User', email };
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionUser));
      setUser(sessionUser);
      return { success: true };
    }
    return { success: false, message: 'Invalid email or password.' };
  }

  function logout() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
  }

  const value = {
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
