import { useEffect } from 'react';

export default function ChatwootWidget() {
  useEffect(() => {
    // Read environment variables
    const baseUrl = import.meta.env.VITE_CHATWOOT_BASE_URL || 'https://app.chatwoot.com';
    const websiteToken = import.meta.env.VITE_CHATWOOT_WEBSITE_TOKEN;

    if (!websiteToken) {
      if (import.meta.env.DEV) {
        console.warn('Chatwoot website token is missing. Widget will not load.');
      }
      return;
    }

    // Configure Chatwoot settings using supported properties only
    window.chatwootSettings = {
      position: 'right',
      type: 'expanded_bubble',
      launcherTitle: 'NodeSlix Assistant'
    };

    // Check if script already exists to prevent duplicate loading
    const existingScript = document.getElementById('chatwoot-sdk-script');
    if (existingScript || window.chatwootSDK) {
      if (window.chatwootSDK && typeof window.chatwootSDK.run === 'function') {
        try {
          window.chatwootSDK.run({
            websiteToken,
            baseUrl
          });
        } catch (e) {
          if (import.meta.env.DEV) {
            console.warn('Failed to rerun Chatwoot SDK:', e);
          }
        }
      }
      return;
    }

    // Lazy load the script
    const script = document.createElement('script');
    script.id = 'chatwoot-sdk-script';
    script.src = `${baseUrl}/packs/js/sdk.js`;
    script.defer = true;
    script.async = true;
    
    script.onload = () => {
      if (window.chatwootSDK && typeof window.chatwootSDK.run === 'function') {
        try {
          window.chatwootSDK.run({
            websiteToken,
            baseUrl
          });
        } catch (e) {
          if (import.meta.env.DEV) {
            console.warn('Failed to run Chatwoot SDK:', e);
          }
        }
      }
    };

    script.onerror = (err) => {
      if (import.meta.env.DEV) {
        console.warn('Failed to load Chatwoot SDK script:', err);
      }
    };

    document.body.appendChild(script);

    // Apply custom styling dynamically to customize bubble positioning and accent colors
    const styleEl = document.createElement('style');
    styleEl.id = 'chatwoot-custom-style';
    styleEl.innerHTML = `
      /* Positioning for Chatwoot Widget Holder */
      .woot-widget-holder {
        bottom: 24px !important;
        right: 24px !important;
        z-index: 99999 !important;
      }
      .woot-widget-bubble {
        bottom: 24px !important;
        right: 24px !important;
        z-index: 99999 !important;
        background-color: #00D4FF !important;
      }
      
      @media (max-width: 768px) {
        .woot-widget-holder {
          bottom: 16px !important;
          right: 16px !important;
        }
        .woot-widget-bubble {
          bottom: 16px !important;
          right: 16px !important;
        }
      }
    `;
    document.head.appendChild(styleEl);

    return () => {
      // Keep widget persisted globally across pages
    };
  }, []);

  return null;
}
