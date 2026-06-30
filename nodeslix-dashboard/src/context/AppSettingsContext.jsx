import { createContext, useContext, useEffect, useState } from 'react';

/* ── Single localStorage key for all appearance preferences ── */
const STORAGE_KEY = 'nodeslix-settings';

/* ── Defaults ── */
const defaultToggles = {
  autoOptimize:     true,
  predictiveAlerts: true,
  autoReroute:      true,
  slaEnforcement:   false,
  darkMode:         true,   // always dark — toggle is informational only
  compactView:      false,
  animationsOn:     true,
  emailAlerts:      true,
  smsAlerts:        false,
  criticalOnly:     false,
  slackIntegration: true,
  twoFactor:        false,
  auditLog:         true,
  sessionTimeout:   true,
  ipWhitelist:      false,
};

const loadSettings = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        toggles:     { ...defaultToggles, ...(parsed.toggles || {}) },
        timezone:    parsed.timezone    || 'UTC+5:30 — Colombo',
        language:    parsed.language    || 'English (US)',
        refreshRate: parsed.refreshRate || '5s',
        accentColor: parsed.accentColor || '#00D4FF',
      };
    }
  } catch (e) { /* ignore */ }
  return {
    toggles:     defaultToggles,
    timezone:    'UTC+5:30 — Colombo',
    language:    'English (US)',
    refreshRate: '5s',
    accentColor: '#00D4FF',
  };
};

/* ── Convert hex to CSS rgb() string for box-shadow/ring utilities ── */
const hexToRgb = (hex) => {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return { r, g, b };
};

const AppSettingsContext = createContext(null);

export const AppSettingsProvider = ({ children }) => {
  const initial = loadSettings();
  const [toggles,     setToggles]     = useState(initial.toggles);
  const [timezone,    setTimezone]    = useState(initial.timezone);
  const [language,    setLanguage]    = useState(initial.language);
  const [refreshRate, setRefreshRate] = useState(initial.refreshRate);
  const [accentColor, setAccentColor] = useState(initial.accentColor);

  /* ── Persist all settings whenever anything changes ── */
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ toggles, timezone, language, refreshRate, accentColor }));
    } catch (e) { /* ignore */ }
  }, [toggles, timezone, language, refreshRate, accentColor]);

  /* ── Compact mode → data-compact on <html> ── */
  useEffect(() => {
    if (toggles.compactView) {
      document.documentElement.setAttribute('data-compact', '');
    } else {
      document.documentElement.removeAttribute('data-compact');
    }
  }, [toggles.compactView]);

  /* ── Animations → data-no-animations on <html> ── */
  useEffect(() => {
    if (!toggles.animationsOn) {
      document.documentElement.setAttribute('data-no-animations', '');
    } else {
      document.documentElement.removeAttribute('data-no-animations');
    }
  }, [toggles.animationsOn]);

  /* ── Accent color → CSS custom properties on :root ── */
  useEffect(() => {
    const { r, g, b } = hexToRgb(accentColor);
    const root = document.documentElement;
    root.style.setProperty('--nodeslix-accent',     accentColor);
    root.style.setProperty('--nodeslix-accent-r',   r);
    root.style.setProperty('--nodeslix-accent-g',   g);
    root.style.setProperty('--nodeslix-accent-b',   b);
    // Also write the scrollbar color so it matches
    root.style.setProperty('--scrollbar-color', `rgba(${r},${g},${b},0.55)`);
  }, [accentColor]);

  /* ── Apply saved accent on startup (before any paint) ── */
  useEffect(() => {
    const { r, g, b } = hexToRgb(accentColor);
    const root = document.documentElement;
    root.style.setProperty('--nodeslix-accent',   accentColor);
    root.style.setProperty('--nodeslix-accent-r', r);
    root.style.setProperty('--nodeslix-accent-g', g);
    root.style.setProperty('--nodeslix-accent-b', b);
    root.style.setProperty('--scrollbar-color', `rgba(${r},${g},${b},0.55)`);
    // Apply compact/animations on startup
    if (toggles.compactView)    root.setAttribute('data-compact', '');
    if (!toggles.animationsOn)  root.setAttribute('data-no-animations', '');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  const toggle = (key) => setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  const setToggle = (key, value) => setToggles(prev => ({ ...prev, [key]: value }));

  return (
    <AppSettingsContext.Provider value={{
      toggles, toggle, setToggle, setToggles,
      timezone, setTimezone,
      language, setLanguage,
      refreshRate, setRefreshRate,
      accentColor, setAccentColor,
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
