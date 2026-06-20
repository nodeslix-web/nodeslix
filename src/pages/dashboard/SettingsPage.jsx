import { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import {
  Bell, CheckCircle2, Globe, Key, Lock,
  Monitor, Moon, Palette, Save, Shield, Sliders, Sun, Wifi,
} from 'lucide-react';

/* ─── Tabs ─── */
const tabs = [
  { id: 'general',       label: 'General',       icon: Sliders  },
  { id: 'appearance',    label: 'Appearance',     icon: Palette  },
  { id: 'notifications', label: 'Notifications',  icon: Bell     },
  { id: 'security',      label: 'Security',       icon: Shield   },
];

/* ─── Toggle Switch ─── */
const Toggle = ({ enabled, onChange, id }) => (
  <button
    id={id}
    type="button"
    role="switch"
    aria-checked={enabled}
    onClick={() => onChange(!enabled)}
    className={[
      'relative w-10 h-5.5 rounded-full border transition-all duration-300 shrink-0',
      enabled
        ? 'bg-nodeslix-accent/20 border-nodeslix-accent/50'
        : 'bg-white/[0.06] border-white/12',
    ].join(' ')}
    style={{ height: '22px' }}
  >
    <Motion.span
      layout
      transition={{ type: 'spring', stiffness: 500, damping: 38 }}
      className={[
        'absolute top-0.5 size-4 rounded-full',
        enabled ? 'bg-nodeslix-accent left-[calc(100%-18px)]' : 'bg-nodeslix-muted/40 left-0.5',
      ].join(' ')}
    />
  </button>
);

/* ─── Settings Row ─── */
const SettingRow = ({ label, desc, children }) => (
  <div className="flex items-center justify-between gap-4 py-4 border-b border-white/[0.06] last:border-0">
    <div className="min-w-0">
      <p className="text-sm font-semibold text-white">{label}</p>
      {desc && <p className="text-[11px] text-nodeslix-muted/60 mt-0.5">{desc}</p>}
    </div>
    <div className="shrink-0">{children}</div>
  </div>
);

/* ─────────────────────────────────────────
   SETTINGS PAGE
───────────────────────────────────────── */
const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [saved, setSaved] = useState(false);

  /* Toggle states */
  const [toggles, setToggles] = useState({
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
  });

  const toggle = (key) => setToggles((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const [timezone, setTimezone] = useState('UTC+5:30 — Colombo');
  const [language, setLanguage] = useState('English (US)');
  const [refreshRate, setRefreshRate] = useState('5s');

  return (
    <div className="p-5 md:p-6 space-y-7">
      {/* Page Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="section-kicker">Settings</p>
          <h1 className="text-2xl font-extrabold text-white mt-1">Platform Settings</h1>
          <p className="text-sm text-nodeslix-muted mt-1">Configure platform behaviour, appearance, and security policies.</p>
        </div>
        <Motion.button
          type="button"
          onClick={handleSave}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={[
            'inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold border transition-all duration-300 shrink-0',
            saved
              ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
              : 'bg-nodeslix-accent/15 border-nodeslix-accent/30 text-nodeslix-accent hover:bg-nodeslix-accent/25',
          ].join(' ')}
        >
          {saved ? <><CheckCircle2 size={15} /> Saved!</> : <><Save size={15} /> Save Changes</>}
        </Motion.button>
      </div>

      {/* Tab nav */}
      <div className="flex gap-1.5 p-1.5 rounded-2xl border border-white/8 bg-white/[0.02] w-fit flex-wrap">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={[
                'flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all duration-200',
                activeTab === tab.id
                  ? 'bg-nodeslix-accent/15 border-nodeslix-accent/30 text-nodeslix-accent'
                  : 'border-transparent text-nodeslix-muted hover:text-white',
              ].join(' ')}
            >
              <Icon size={13} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <Motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="grid gap-5 lg:grid-cols-[1fr_320px]"
      >
        <div className="space-y-5">
          {/* ── GENERAL ── */}
          {activeTab === 'general' && (
            <>
              <div className="panel-shell space-y-0">
                <p className="text-[10px] font-bold uppercase tracking-widest text-nodeslix-muted/50 mb-2">AI Automation</p>
                <SettingRow label="Auto Traffic Optimization" desc="Let AI autonomously reroute traffic based on congestion patterns.">
                  <Toggle id="auto-optimize" enabled={toggles.autoOptimize} onChange={() => toggle('autoOptimize')} />
                </SettingRow>
                <SettingRow label="Predictive Alerts" desc="Receive warnings before network failures occur.">
                  <Toggle id="predictive-alerts" enabled={toggles.predictiveAlerts} onChange={() => toggle('predictiveAlerts')} />
                </SettingRow>
                <SettingRow label="Auto Reroute on Failure" desc="Immediately switch to backup paths when a node fails.">
                  <Toggle id="auto-reroute" enabled={toggles.autoReroute} onChange={() => toggle('autoReroute')} />
                </SettingRow>
                <SettingRow label="SLA Enforcement Mode" desc="Block AI actions that would violate active SLA thresholds.">
                  <Toggle id="sla-enforcement" enabled={toggles.slaEnforcement} onChange={() => toggle('slaEnforcement')} />
                </SettingRow>
              </div>

              <div className="panel-shell space-y-0">
                <p className="text-[10px] font-bold uppercase tracking-widest text-nodeslix-muted/50 mb-2">Regional</p>
                <SettingRow label="Timezone" desc="All timestamps will display in your local timezone.">
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="rounded-xl border border-white/12 bg-white/[0.04] text-white text-xs font-medium px-3 py-2 outline-none focus:border-nodeslix-accent/40 transition-colors cursor-pointer"
                  >
                    <option>UTC+5:30 — Colombo</option>
                    <option>UTC+0:00 — London</option>
                    <option>UTC-5:00 — New York</option>
                    <option>UTC+9:00 — Tokyo</option>
                  </select>
                </SettingRow>
                <SettingRow label="Language">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="rounded-xl border border-white/12 bg-white/[0.04] text-white text-xs font-medium px-3 py-2 outline-none focus:border-nodeslix-accent/40 transition-colors cursor-pointer"
                  >
                    <option>English (US)</option>
                    <option>Japanese</option>
                    <option>German</option>
                    <option>French</option>
                  </select>
                </SettingRow>
                <SettingRow label="Dashboard Refresh Rate">
                  <select
                    value={refreshRate}
                    onChange={(e) => setRefreshRate(e.target.value)}
                    className="rounded-xl border border-white/12 bg-white/[0.04] text-white text-xs font-medium px-3 py-2 outline-none focus:border-nodeslix-accent/40 transition-colors cursor-pointer"
                  >
                    <option>1s</option>
                    <option>5s</option>
                    <option>15s</option>
                    <option>30s</option>
                    <option>60s</option>
                  </select>
                </SettingRow>
              </div>
            </>
          )}

          {/* ── APPEARANCE ── */}
          {activeTab === 'appearance' && (
            <div className="panel-shell space-y-0">
              <p className="text-[10px] font-bold uppercase tracking-widest text-nodeslix-muted/50 mb-2">Theme</p>
              <SettingRow label="Dark Mode" desc="Use the dark theme across the dashboard.">
                <Toggle id="dark-mode" enabled={toggles.darkMode} onChange={() => toggle('darkMode')} />
              </SettingRow>
              <SettingRow label="Compact View" desc="Reduce spacing for higher information density.">
                <Toggle id="compact-view" enabled={toggles.compactView} onChange={() => toggle('compactView')} />
              </SettingRow>
              <SettingRow label="Enable Animations" desc="Framer Motion micro-interactions and transitions.">
                <Toggle id="animations" enabled={toggles.animationsOn} onChange={() => toggle('animationsOn')} />
              </SettingRow>

              <p className="text-[10px] font-bold uppercase tracking-widest text-nodeslix-muted/50 mb-2 mt-6">Accent Color</p>
              <div className="flex gap-3 py-4">
                {['#00D4FF', '#3A6DFF', '#a78bfa', '#10b981', '#f59e0b', '#ef4444'].map((c) => (
                  <button
                    key={c}
                    type="button"
                    className="size-8 rounded-full border-2 border-transparent hover:border-white/40 transition-all"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ── NOTIFICATIONS ── */}
          {activeTab === 'notifications' && (
            <div className="panel-shell space-y-0">
              <p className="text-[10px] font-bold uppercase tracking-widest text-nodeslix-muted/50 mb-2">Alert Channels</p>
              <SettingRow label="Email Notifications" desc="Receive alerts at your registered email address.">
                <Toggle id="email-alerts" enabled={toggles.emailAlerts} onChange={() => toggle('emailAlerts')} />
              </SettingRow>
              <SettingRow label="SMS Notifications" desc="Critical-only alerts via SMS to your registered number.">
                <Toggle id="sms-alerts" enabled={toggles.smsAlerts} onChange={() => toggle('smsAlerts')} />
              </SettingRow>
              <SettingRow label="Critical Alerts Only" desc="Suppress informational and low-severity notifications.">
                <Toggle id="critical-only" enabled={toggles.criticalOnly} onChange={() => toggle('criticalOnly')} />
              </SettingRow>
              <SettingRow label="Slack Integration" desc="Forward alerts to your team Slack workspace.">
                <Toggle id="slack-integration" enabled={toggles.slackIntegration} onChange={() => toggle('slackIntegration')} />
              </SettingRow>
            </div>
          )}

          {/* ── SECURITY ── */}
          {activeTab === 'security' && (
            <div className="panel-shell space-y-0">
              <p className="text-[10px] font-bold uppercase tracking-widest text-nodeslix-muted/50 mb-2">Access Control</p>
              <SettingRow label="Two-Factor Authentication" desc="Require TOTP code on login for all admin accounts.">
                <Toggle id="two-factor" enabled={toggles.twoFactor} onChange={() => toggle('twoFactor')} />
              </SettingRow>
              <SettingRow label="Audit Log" desc="Record all admin actions and configuration changes.">
                <Toggle id="audit-log" enabled={toggles.auditLog} onChange={() => toggle('auditLog')} />
              </SettingRow>
              <SettingRow label="Session Auto-Timeout" desc="Automatically log out inactive sessions after 30 minutes.">
                <Toggle id="session-timeout" enabled={toggles.sessionTimeout} onChange={() => toggle('sessionTimeout')} />
              </SettingRow>
              <SettingRow label="IP Whitelist" desc="Restrict dashboard access to pre-approved IP ranges.">
                <Toggle id="ip-whitelist" enabled={toggles.ipWhitelist} onChange={() => toggle('ipWhitelist')} />
              </SettingRow>
            </div>
          )}
        </div>

        {/* Sidebar summary */}
        <div className="space-y-4">
          <div className="panel-shell">
            <p className="text-[10px] font-bold uppercase tracking-widest text-nodeslix-muted/50 mb-4">Platform Info</p>
            {[
              { icon: Monitor,  label: 'Version',     value: '3.12.1'            },
              { icon: Globe,    label: 'Region',      value: 'Global'            },
              { icon: Wifi,     label: 'Uptime',      value: '99.98%'            },
              { icon: Key,      label: 'API Access',  value: 'Enabled'           },
              { icon: Lock,     label: 'Security',    value: 'TLS 1.3'           },
            ].map((r) => {
              const Icon = r.icon;
              return (
                <div key={r.label} className="flex items-center gap-3 py-3 border-b border-white/[0.06] last:border-0">
                  <Icon size={13} className="text-nodeslix-muted/50 shrink-0" />
                  <span className="text-xs text-nodeslix-muted flex-1">{r.label}</span>
                  <span className="text-xs font-bold text-white">{r.value}</span>
                </div>
              );
            })}
          </div>

          <div className="surface-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 size={14} className="text-emerald-400" />
              <p className="text-xs font-bold text-white">All systems operational</p>
            </div>
            <p className="text-[11px] text-nodeslix-muted/60 leading-relaxed">
              Last configuration sync: 4 minutes ago. No pending changes.
            </p>
          </div>
        </div>
      </Motion.div>

      <div className="h-4" />
    </div>
  );
};

export default SettingsPage;
