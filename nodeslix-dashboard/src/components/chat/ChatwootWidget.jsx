import { useEffect, useState, useRef } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Settings, X } from 'lucide-react';
import PositionSelector from './PositionSelector';

export default function ChatwootWidget() {
  const [position, setPosition] = useState(() => (typeof window !== 'undefined' ? localStorage.getItem('chatwootPosition') || 'right' : 'right'));
  const [hovered, setHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const popoverRef = useRef(null);
  const gearRef = useRef(null);
  const launcherRef = useRef(null);

  const isExpanded = hovered && !chatOpen;
  const isRight = position === 'right';

  // Lazy load SDK once on mount
  useEffect(() => {
    const baseUrl = import.meta.env.VITE_CHATWOOT_BASE_URL || 'https://app.chatwoot.com';
    const websiteToken = import.meta.env.VITE_CHATWOOT_WEBSITE_TOKEN;
    if (!websiteToken) return;

    window.chatwootSettings = { position: 'right', type: 'expanded_bubble', launcherTitle: 'NodeSlix Assistant' };

    if (!document.getElementById('chatwoot-sdk-script') && !window.chatwootSDK) {
      const script = document.createElement('script');
      script.id = 'chatwoot-sdk-script';
      script.src = `${baseUrl}/packs/js/sdk.js`;
      script.defer = script.async = true;
      script.onload = () => {
        if (window.chatwootSDK?.run) window.chatwootSDK.run({ websiteToken, baseUrl });
      };
      document.body.appendChild(script);
    } else if (window.chatwootSDK?.run) {
      window.chatwootSDK.run({ websiteToken, baseUrl });
    }
  }, []);

  // Update dynamic CSS overrides for widget holder height/sides and bubble hiding
  useEffect(() => {
    let styleEl = document.getElementById('chatwoot-custom-style-override');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'chatwoot-custom-style-override';
      document.head.appendChild(styleEl);
    }
    styleEl.innerHTML = `
      .woot-widget-bubble { display: none !important; }
      .woot-widget-holder {
        bottom: 88px !important;
        ${isRight ? 'right: 24px !important; left: auto !important;' : 'left: 24px !important; right: auto !important;'}
        z-index: 99999 !important;
        box-shadow: 0 24px 80px rgba(0,0,0,0.5) !important;
        border-radius: 16px !important;
        border: 1px solid rgba(255,255,255,0.08) !important;
        transition: bottom 0.3s cubic-bezier(0.16, 1, 0.3, 1), right 0.3s ease, left 0.3s ease !important;
      }
      @media (max-width: 768px) {
        .woot-widget-holder {
          bottom: 78px !important;
          ${isRight ? 'right: 16px !important; left: auto !important;' : 'left: 16px !important; right: auto !important;'}
          width: calc(100% - 32px) !important;
          max-height: 70% !important;
        }
      }
    `;
  }, [position, isRight]);

  // Handle resizing, click outside, and key events
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    const handleEscape = (e) => { e.key === 'Escape' && setMenuOpen(false); };
    const handleClickOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target) && gearRef.current && !gearRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const handleLauncherClick = () => {
    if (window.$chatwoot) {
      if (chatOpen) {
        window.$chatwoot.toggle("close");
        setChatOpen(false);
      } else {
        window.$chatwoot.toggle("open");
        setChatOpen(true);
      }
    }
  };

  if (typeof window !== 'undefined' && !import.meta.env.VITE_CHATWOOT_WEBSITE_TOKEN) return null;

  return (
    <Motion.div
      layout
      transition={{ type: 'spring', stiffness: 250, damping: 22 }}
      className={`fixed z-[99998] flex flex-col ${
        isMobile ? 'bottom-4' : 'bottom-6'
      } ${isRight ? 'right-4 md:right-6 items-end' : 'left-4 md:left-6 items-start'}`}
    >
      <AnimatePresence>
        {menuOpen && (
          <PositionSelector
            ref={popoverRef}
            position={position}
            launcherRef={launcherRef}
            onSelect={(pos) => {
              setPosition(pos);
              localStorage.setItem('chatwootPosition', pos);
              setMenuOpen(false);
            }}
          />
        )}
      </AnimatePresence>

      <Motion.div
        ref={launcherRef}
        role="button"
        tabIndex={0}
        aria-label={chatOpen ? 'Close NodeSlix Assistant' : 'Open NodeSlix Assistant'}
        onClick={handleLauncherClick}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleLauncherClick(); } }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        animate={{ width: isExpanded ? '208px' : (isMobile ? '52px' : '56px') }}
        transition={{ type: 'spring', stiffness: 260, damping: 24, duration: 0.28 }}
        className={`h-[52px] md:h-[56px] rounded-full bg-[#0A0A0A]/90 hover:bg-[#121212] border border-[#00D4FF]/20 hover:border-[#00D4FF]/40 text-white flex items-center shadow-xl shadow-black/40 hover:shadow-[0_0_20px_rgba(0,212,255,0.2)] backdrop-blur-md cursor-pointer outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]/50 relative select-none overflow-hidden ${isRight ? 'flex-row-reverse' : 'flex-row'}`}
      >
        <div className="w-[50px] md:w-[54px] h-full flex items-center justify-center flex-shrink-0">
          <AnimatePresence mode="wait">
            <Motion.div
              key={chatOpen ? 'close-icon' : 'chat-icon'}
              initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
              transition={{ duration: 0.18 }}
              className="flex items-center justify-center size-6"
            >
              {chatOpen ? <X size={24} className="text-[#00D4FF]" /> : <MessageCircle size={24} className="text-[#00D4FF]" />}
            </Motion.div>
          </AnimatePresence>
        </div>

        {isExpanded && (
          <>
            <Motion.div
              initial={{ opacity: 0, x: isRight ? 10 : -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isRight ? 10 : -10 }}
              transition={{ duration: 0.2 }}
              className={`flex-1 flex flex-col justify-center min-w-0 ${isRight ? 'items-end text-right mr-1' : 'items-start text-left ml-1'}`}
            >
              <span className="text-[11px] font-bold text-white leading-tight truncate w-full">NodeSlix Assistant</span>
              <span className="text-[9px] text-emerald-400 flex items-center gap-1 font-semibold mt-0.5 select-none">
                <span className="rounded-full size-1 bg-emerald-400 animate-pulse" />
                Online
              </span>
            </Motion.div>

            <Motion.button
              ref={gearRef}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              type="button"
              aria-label="Launcher settings"
              onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}
              className={`flex-shrink-0 size-7 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#B3B3B3] hover:text-white transition-colors cursor-pointer outline-none border border-white/5 hover:border-white/10 ${isRight ? 'ml-1 mr-2.5' : 'mr-1 ml-2.5'}`}
            >
              <Settings size={13} />
            </Motion.button>
          </>
        )}
      </Motion.div>
    </Motion.div>
  );
}
