import { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'nodeslix-settings';

const defaultToggles = {
  autoOptimize:     true,
  predictiveAlerts: true,
  autoReroute:      true,
  slaEnforcement:   false,
  emailAlerts:      true,
  smsAlerts:        false,
  criticalOnly:     false,
  slackIntegration: true,
  twoFactor:        false,
  auditLog:         true,
  sessionTimeout:   true,
  ipWhitelist:      false,
};

const hexToRgb = (hex) => {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return { r, g, b };
};

const AppSettingsContext = createContext(null);

export const AppSettingsProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [accentColor, setAccentColor] = useState(() => localStorage.getItem('accentColor') || '#00D4FF');
  const [compactMode, setCompactMode] = useState(() => localStorage.getItem('compactMode') === 'true');
  const [animationsEnabled, setAnimationsEnabled] = useState(() => {
    const saved = localStorage.getItem('animationsEnabled');
    return saved === null ? true : saved === 'true';
  });

  const [toggles, setToggles] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...defaultToggles, ...(parsed.toggles || {}) };
      }
    } catch (e) { /* ignore */ }
    return defaultToggles;
  });

  const [timezone, setTimezone] = useState('UTC+5:30 — Colombo');
  const [language, setLanguage] = useState('English (US)');
  const [refreshRate, setRefreshRate] = useState('5s');

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('accentColor', accentColor);
  }, [accentColor]);

  useEffect(() => {
    localStorage.setItem('compactMode', String(compactMode));
  }, [compactMode]);

  useEffect(() => {
    localStorage.setItem('animationsEnabled', String(animationsEnabled));
  }, [animationsEnabled]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (compactMode) {
      document.documentElement.setAttribute('data-compact', '');
    } else {
      document.documentElement.removeAttribute('data-compact');
    }
  }, [compactMode]);

  useEffect(() => {
    if (!animationsEnabled) {
      document.documentElement.setAttribute('data-no-animations', '');
    } else {
      document.documentElement.removeAttribute('data-no-animations');
    }
  }, [animationsEnabled]);

  useEffect(() => {
    const { r, g, b } = hexToRgb(accentColor);
    const root = document.documentElement;
    root.style.setProperty('--nodeslix-accent',     accentColor);
    root.style.setProperty('--nodeslix-accent-r',   r);
    root.style.setProperty('--nodeslix-accent-g',   g);
    root.style.setProperty('--nodeslix-accent-b',   b);
    root.style.setProperty('--scrollbar-color', `rgba(${r},${g},${b},0.55)`);
  }, [accentColor]);

  const togglesWithTheme = {
    ...toggles,
    compactView: compactMode,
    animationsOn: animationsEnabled,
    darkMode: theme === 'dark',
  };

  const toggle = (key) => {
    if (key === 'compactView') {
      setCompactMode(prev => !prev);
    } else if (key === 'animationsOn') {
      setAnimationsEnabled(prev => !prev);
    } else if (key === 'darkMode') {
      setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    } else {
      setToggles(prev => {
        const next = { ...prev, [key]: !prev[key] };
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ toggles: next }));
        return next;
      });
    }
  };

  const setToggle = (key, value) => {
    if (key === 'compactView') {
      setCompactMode(value);
    } else if (key === 'animationsOn') {
      setAnimationsEnabled(value);
    } else if (key === 'darkMode') {
      setTheme(value ? 'dark' : 'light');
    } else {
      setToggles(prev => {
        const next = { ...prev, [key]: value };
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ toggles: next }));
        return next;
      });
    }
  };

  return (
    <AppSettingsContext.Provider value={{
      theme, setTheme,
      accentColor, setAccentColor,
      compactMode, setCompactMode,
      animationsEnabled, setAnimationsEnabled,
      toggles: togglesWithTheme, toggle, setToggle, setToggles,
      timezone, setTimezone,
      language, setLanguage,
      refreshRate, setRefreshRate,
    }}>
      {children}
    </AppSettingsContext.Provider>
  );
};

export const useAppSettings = () => {
  const ctx = useContext(AppSettingsContext);
  if (!ctx) throw new Error('useAppSettings must be used inside AppSettingsProvider');
  return ctx;
};
