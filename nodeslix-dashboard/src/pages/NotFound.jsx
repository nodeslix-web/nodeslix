import React from 'react';
import { useNavigate } from 'react-router-dom';
import { color, motion } from 'framer-motion';

const NotFound = () => {
  const navigate = useNavigate();

  const openChat = () => {
    if (window.chatwootSDK && typeof window.chatwootSDK.toggle === 'function') {
      window.chatwootSDK.toggle();
    } else if (window.$chatwoot && typeof window.$chatwoot.toggle === 'function') {
      // fallback for older embed
      window.$chatwoot.toggle();
    } else if (import.meta.env.DEV) {
      console.warn('Chatwoot SDK not available to open live chat');
    }
  };

  return (
    <motion.div
      className="flex min-h-screen flex-col items-center justify-center bg-[#0A0A0A] p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-xl space-y-6 text-center">
        <h1 className="font-bold text-8xl" style={{ color: '#00D4FF',fontSize: '90px' }}>404</h1>
        <h2 className="text-3xl font-semibold">Network Route Not Found</h2>
        <p className="text-lg">
          The page you are looking for could not be located in our network. It might have been moved, removed,
          or never existed.
        </p>
        <div className="flex flex-col justify-center gap-4 mt-6 sm:flex-row">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-[#00D4FF] hover:bg-[#00B8E6] rounded transition" style={{color:"#080808"}}
          >
            Return Home
          </button>
          <button
            onClick={() => navigate('/Product')}
            className="px-6 py-2 bg-[#00D4FF] hover:bg-[#00B8E6] rounded transition" style={{color:"#080808"}}
          >
            Open Matrix
          </button>
        </div>
        <div className="mt-8">
          <p className="mb-2">Need assistance?</p>
          <button
            onClick={openChat}
            className="px-4 py-2 border border-[#00D4FF] text-[#00D4FF] hover:bg-[#00D4FF] hover:text-black rounded transition"
          >
            Open Live Chat
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default NotFound;
