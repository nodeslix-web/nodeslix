import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion as Motion } from 'framer-motion';

const STORAGE_KEY = 'cookieConsent';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(() => {
    // Only show the banner when the visitor has not made a cookie preference choice.
    if (typeof window === 'undefined') return false;

    return !window.localStorage.getItem(STORAGE_KEY);
  });

  const savePreference = (preference) => {
    // This app only stores the preference locally. It does not enable analytics or tracking.
    window.localStorage.setItem(STORAGE_KEY, preference);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible ? (
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 18 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-6 left-6 right-6 z-[100] mx-auto max-w-[1100px]"
        >
          <div className="rounded-3xl border border-nodeslix-border bg-nodeslix-card/90 p-5 text-nodeslix-text shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="max-w-3xl space-y-2">
                <h2 className="text-lg font-semibold text-white">🍪 Cookie Preferences</h2>
                <p className="text-sm leading-6 text-nodeslix-muted">
                  We use cookies to improve site performance, analyze traffic, and enhance your browsing experience. Learn more in our{' '}
                  <Link to="/privacy-policy" className="text-nodeslix-accent hover:underline font-semibold">
                    Privacy Policy
                  </Link>.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row md:shrink-0">
                <button
                  type="button"
                  onClick={() => savePreference('declined')}
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-nodeslix-border bg-transparent px-5 text-sm font-semibold text-nodeslix-text transition-colors hover:border-nodeslix-accent hover:text-nodeslix-accent"
                >
                  Decline
                </button>
                <button
                  type="button"
                  onClick={() => savePreference('accepted')}
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-nodeslix-accent px-5 text-sm font-semibold text-nodeslix-primary transition-opacity hover:opacity-95"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </Motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default CookieBanner;
