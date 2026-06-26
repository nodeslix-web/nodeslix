import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import CookieBanner from '../common/CookieBanner.jsx';

const MainLayout = () => {
  const location = useLocation();

  /* ─── Global Scroll-to-Hash Handler ─── */
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const hash = location.hash.replace('#', '');
      
      // Map URLs hash segments to the local DOM element IDs
      let elementId = hash;
      if (hash === 'infrastructure') elementId = 'architecture';
      if (hash === 'features') elementId = 'capabilities';

      const timer = setTimeout(() => {
        const el = document.getElementById(elementId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <div className="flex min-h-screen flex-col bg-nodeslix-primary text-nodeslix-text">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
};

export default MainLayout;
