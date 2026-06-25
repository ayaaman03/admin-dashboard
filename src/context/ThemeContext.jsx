import { createContext, useContext, useEffect, useState } from 'react';
import { THEME_STORAGE_KEY } from '../utils/constants';

const ThemeContext = createContext(null);

/**
 * ThemeProvider — bonus feature: dark mode.
 * Persists choice to localStorage and toggles a `data-theme` attribute
 * on <html>, which the CSS reads via variables.
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(THEME_STORAGE_KEY) || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}
