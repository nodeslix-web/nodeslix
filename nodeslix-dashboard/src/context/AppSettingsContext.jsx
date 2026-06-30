import { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'nodeslix-settings';

const defaultToggles = {
  autoOptimize:     true,
  predictiveAlerts: true,
  autoReroute:      true,
  slaEnforcement:   false,
  darkMode:         true,
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

const AppSettingsContext = createContext(null);

export const AppSettingsProvider = ({ children }) => {
  const initial = loadSettings();
  const [toggles,     setToggles]     = useState(initial.toggles);
  const [timezone,    setTimezone]    = useState(initial.timezone);
  const [language,    setLanguage]    = useState(initial.language);
  const [refreshRate, setRefreshRate] = useState(initial.refreshRate);
  const [accentColor, setAccentColor] = useState(initial.accentColor);

  /* Persist every change */
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ toggles, timezone, language, refreshRate, accentColor }));
    } catch (e) { /* ignore */ }
  }, [toggles, timezone, language, refreshRate, accentColor]);

  /* Apply compact mode to <html> */
  useEffect(() => {
    if (toggles.compactView) {
      document.documentElement.setAttribute('data-compact', '');
    } else {
      document.documentElement.removeAttribute('data-compact');
    }
  }, [toggles.compactView]);

  /* Disable/enable animations globally */
  useEffect(() => {
    if (!toggles.animationsOn) {
      document.documentElement.setAttribute('data-no-animations', '');
    } else {
      document.documentElement.removeAttribute('data-no-animations');
    }
  }, [toggles.animationsOn]);

  /* Apply accent color CSS variable to :root */
  useEffect(() => {
    const hex = accentColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    document.documentElement.style.setProperty('--accent-r', r);
    document.documentElement.style.setProperty('--accent-g', g);
    document.documentElement.style.setProperty('--accent-b', b);
    document.documentElement.style.setProperty('--nodeslix-accent', accentColor);
  }, [accentColor]);

  const toggle = (key) => setToggles(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <AppSettingsContext.Provider value={{
      toggles, toggle, setToggles,
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
